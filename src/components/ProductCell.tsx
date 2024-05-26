import { FC } from "react";

interface ProductCellProps {
    productData: ProductsCatalog.Product;
    onEditPressed: () => void;
    onDeletePressed: () => void;
};

export const ProductCell: FC<ProductCellProps> = ({ productData, onEditPressed, onDeletePressed }: ProductCellProps) => {
    return (
        <div className="card">
            <p>{productData.name ?? ''} - ${productData.price.toString()}</p>
            <hr />
            <span>
                <a onClick={onEditPressed}> Edit </a>
                -
                <a onClick={onDeletePressed} className="deleteLink"> Delete </a>
            </span>
        </div>
    );
}
 