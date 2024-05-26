import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from './API';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 30, // 30 minutes
    });
};

// 🏆 ChallengeA > Using the knowledge you have just obtained, extend this example where products
// have description and upon clicking a product we'll show the description.
// This will require implementing fetchProductById API.
export const useProductById = (id: string) => {
    return useQuery({
        queryKey: ['product', id], // This query is fetching a specific product identified by id
        queryFn: () => fetchProductById(id),
        enabled: !!id, // This query will only fetch products if id is defined
        // staleTime: 1000 * 60 * 30, // 30 minutes // stale time can also be added here, based on your use case
        retry:  1,
    });
};
