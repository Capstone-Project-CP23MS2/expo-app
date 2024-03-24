import categoriesApi from "@/api/category";
import { useQuery } from "@tanstack/react-query";

export function UseGetCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: categoriesApi.getCategories,
    });
    // TODO
    // return { data: categories, paginationInfo: ..., ...otherRes }
};

export function UseGetCategory(id: string | number | string[] | undefined) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => categoriesApi.getCategoryById(id),
    });
};