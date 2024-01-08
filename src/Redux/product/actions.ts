import { generateActionsGroup } from "@Redux/helper";
import { GET_PRODUCTS, LOAD_MORE_PRODUCTS } from "./types";
import { DataPagingPayload } from "@typings/api";
import { Product } from "@typings/product";

export const getProducts = generateActionsGroup<
  void,
  DataPagingPayload<Product[]>
>(GET_PRODUCTS);

export const loadMoreProducts = generateActionsGroup<
  void,
  DataPagingPayload<Product[]>
>(LOAD_MORE_PRODUCTS);
