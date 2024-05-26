import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, updateProduct, deleteProduct } from './API';

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        // No need to mutationKey as there is no need for caching it
        mutationFn: (product: Omit<ProductsCatalog.Product, 'id'>) => createProduct(product), 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})
        },
        networkMode: 'online',
        retry:  1,
    });``
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteProduct(`${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})
        },
        networkMode: 'online',
        retry:  1,
    });
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product: ProductsCatalog.Product) => updateProduct(product.id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})
        },
        networkMode: 'online',
        retry:  1,
    });
}

