import { CategoriesRequestParameters } from "@/api/categories/categories.type";
import categoriesApi from "@/api/categories";
import categories from "@/modules/test/demo/components/ExploreHeader/categories";
import { useQuery } from "@tanstack/react-query";
import { initialDataAPIPagination } from "./type";


type CategoriesParameters = {
    page?: number;
    pageSize?: number;
};



export function UseGetCategories(params: CategoriesRequestParameters = { pageSize: 25 }) {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesApi.getCategories(params),
        select: (data) => {
            const { content, ...paginationData } = data;
            return { categories: content, paginationData };
        },
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