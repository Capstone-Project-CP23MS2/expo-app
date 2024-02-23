import { getCategories, getCategory } from "@/api/category";
import { useQuery } from "@tanstack/react-query";

export const UseGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
};

export const UseGetCategory = (id: string | number | string[] | undefined) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => getCategory(id),
    });
};