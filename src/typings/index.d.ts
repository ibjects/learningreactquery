
declare namespace ProductsCatalog {

type Product = {
    id: string;
    price: number;
    name: string;
  };

type PartialProduct = Omit<Product, "id">;

}