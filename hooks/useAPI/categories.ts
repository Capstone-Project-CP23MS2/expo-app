import { getCategories, getCategory } from "@/api/category";
import { useQuery } from "@tanstack/react-query";

export function UseGetCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
};

export function UseGetCategory(id: string | number | string[] | undefined) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => getCategory(id),
    });
};