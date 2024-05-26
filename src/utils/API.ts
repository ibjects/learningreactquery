import axios from 'axios';

/**
 * POST: Create a product
 * GET: Retrieve all products
 * GET: Retrieve one product
 * PUT: Update a product
 * PATCH: Partial update a product
 * DELETE: Delete a product
 */
    // Leaving them here for demo. If the error code is 429 this means the API has hit its limit, so change the URL and try.
    // baseURL: 'https://ibjects.free.beeceptor.com/api'
    // baseURL: 'https://ibj-testapi.free.beeceptor.com/api',
    // baseURL: 'https://ibj-testapi2.free.beeceptor.com/api',
    //           https://ibj-testapi3.free.beeceptor.com/api',

const api = axios.create({
    baseURL: 'https://ibj-testapi.free.beeceptor.com/api',
});

export const fetchProducts = async () => {
    const { data } = await api.get('/products');
    return data;
};

// NOT IMPLEMENTED: Part of 🏆 ChallengeA
export const fetchProductById = async (id: ProductsCatalog.Product['id']) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const createProduct = async (product: Omit<ProductsCatalog.Product, 'id'>) => {
    const { data } = await api.post('/products', product);
    return data;
};

export const updateProduct = async (id: ProductsCatalog.Product['id'], product: ProductsCatalog.Product) => {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
};

// NOT IMPLEMENTED
// export const patchProduct = async (id: ProductsCatalog.Product['id'], partialProduct: ProductsCatalog.PartialProduct) => {
//     const { data } = await api.patch(`/products/${id}`, partialProduct);
//     return data;
// };

export const deleteProduct = async (id: ProductsCatalog.Product['id']) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
};