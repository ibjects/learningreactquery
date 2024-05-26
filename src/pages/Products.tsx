import { FC, useId, useState } from "react";
import '../App.css'

import { useProducts } from '../utils/FetchingProducts';
import { useCreateProduct, useDeleteProduct, useUpdateProduct } from "../utils/MutatingProducts";
import { ProductCell } from "../components/ProductCell";

interface ProductsProps {
    title: string
};

const Products: FC<ProductsProps> = ({ title }: ProductsProps) => {

    const priceInput = useId();
    const [error, setError] = useState('');
    const [formCTATitle, setFormCTATitle] = useState("Add Product")

    const [editingProduct, setEditingProduct] = useState<ProductsCatalog.Product | null>(null);
    const [formData, setFormData] = useState({ productName: '', price: '' });

    const { data, isLoading, error: apiError } = useProducts();
    const { mutate: creatProductMutate, error: createProductError } = useCreateProduct();
    const { mutate: deleteProductMutate, error: deleteProductError } = useDeleteProduct();
    const { mutate: updateProductMutate, error: updateProductError } = useUpdateProduct();

    //#region Handler for form input changes
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // if (isError) {
    //     return (
    //         <div>
    //             <h1>Error Occured</h1>
    //             <p>Please try again later</p>
    //             <p>Error Message</p>
    //             <p>{apiError.message ?? createProductError?.message}</p>
    //             <pre>If the error code is 429 this means the API has hit {'\n'}it's limit and you need to change the URl or wait for 24 hours. {'\n'}The API used has 50 request per day limit.</pre>
    //         </div>
    //     )
    // }

    const renderData = () => {
        if (Array.isArray(data)) {
            if (data.length > 0) {
                return data.map((product: ProductsCatalog.Product) => <ProductCell
                    key={product.id}
                    productData={product}
                    onEditPressed={() => handleEditProduct(product)}
                    onDeletePressed={() => handleDeleteProduct(product.id)}
                />)
            } else {
                return <div>No products data. Please add some products to be displayed here.</div>
            }
        } else {
            /**
             * This means this API has returned a string
             * I've just handled it accordingly to what beeceptor API is doing in this case
             */
            return <>
                <div>{data}</div>
            </>
        }
    }

    // #endregion

    //#region Form Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        setError('');  // Clearing any previous errors
        const form = e.currentTarget as HTMLFormElement;
        const newFormData = new FormData(form);

        const formJson = Object.fromEntries(newFormData.entries()) as { productName: string, price: string };

        // Check if productName is entered and is not just an empty string
        if (!formJson.productName || formJson.productName.trim() === '') {
            setError('Please enter a product name.');
            return;  // Stop further execution if validation fails
        }

        if (editingProduct) {
            try {
                updateProductMutate({
                    id: editingProduct.id,
                    name: formJson.productName,
                    price: parseFloat(formJson.price)
                });
                setEditingProduct(null); // Clear editing mode
              } catch (error) {
                // Handle update errors gracefully
                setError('Error updating product: ' + editingProduct.name);
              }
        } else {
            // Add new product
            creatProductMutate({
                name: formJson.productName,
                price: parseFloat(formJson.price)
            })
        }

        // Reset the form to initial values
        form.reset();
        // Reset form after submit
        setFormData({ productName: '', price: '' });
        setFormCTATitle("Add Product");
        setEditingProduct(null);
    };

    const handleEditProduct = (product: ProductsCatalog.Product) => {
        setEditingProduct(product);
        setFormCTATitle("Update Product");
        setFormData({ productName: product.name, price: product.price.toString() });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleDeleteProduct = (productId: string) => {
        deleteProductMutate(productId);
    };
    // #endregion

    const renderForm = () => {
        return (
            <div className="productForm">
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="name">Product Name
                        <br /><input
                            type="text" className="textField"
                            id="name"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange} />
                    </label>
                    <br />
                    <label htmlFor={priceInput}>Price
                        <br />
                        <input id={priceInput} className="textField"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            min={0} />
                    </label>
                    <br />
                    <button type="submit">
                        {formCTATitle}
                    </button>
                </form>
            </div>
        );
    };

    return (
        <div>
            <h2>{title}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderForm()}
            <pre>Here is a list of all products that are added in the database</pre>
            <hr />
            {renderData()}
            <hr />
            <pre>
                <h6>
                    Below is just a section I'm using for consoling logs.
                    {'\n'} If the error code is 429 this means the API has hit its limit.
                </h6>
                <p>{apiError ? apiError.message :
                    createProductError ? createProductError.message :
                        deleteProductError ? deleteProductError.message :
                        updateProductError ? updateProductError.message :
                        error}</p>
            </pre>
        </div>
    );
}

export default Products;
