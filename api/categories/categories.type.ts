import { Place } from "../places/places.type";
import { PaginateParams } from "../type";

export type Category = {
  categoryId: number;
  name: string;
  description: string;
};

export type CategoriesParams = Pick<PaginateParams, 'page' | 'pageSize'> & {

};