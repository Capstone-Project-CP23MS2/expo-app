import { CategoriesParams } from "@/api/categories/categories.type";
import categoriesApi from "@/api/categories";
import categories from "@/modules/test/demo/components/ExploreHeader/categories";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { initialDataAPIPagination } from "./type";
import { useState } from "react";


export function UseGetCategories(params: CategoriesParams = { pageSize: 25 }) {
    // const [searchQuery, setSearchQuery] = useState<string>('');
    // const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const res = useInfiniteQuery({
        queryKey: ['categories'],
        queryFn: ({ pageParam }) => categoriesApi.getCategories({
            ...params,
            page: pageParam,
        }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.last ? undefined : lastPage.number + 1;
        },
        select: (data) => {
            const categories = data.pages.flatMap(page => page.content);
            return { categories, ...data };
        },
    });
    return { ...res };

};

export function UseGetCategory(id: string | number | string[] | undefined) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => categoriesApi.getCategoryById(Number(id)),
    });
};