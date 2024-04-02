import { CategoriesRequestParameters } from "@/api/categories/categories.type";
import categoriesApi from "@/api/category";
import { useQuery } from "@tanstack/react-query";


type CategoriesParameters = {
    page?: number;
    pageSize?: number;
};

export function UseGetCategories(params: CategoriesRequestParameters = { pageSize: 25 }) {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesApi.getCategories(params),
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