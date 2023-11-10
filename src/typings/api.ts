import { PagingInfo } from "@Redux/types";

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  code?: string;
  data: T;
  total: number;
  [key: string]: any;
};

export type DataPagingPayload<T = any> = {
  data: T;
  total?: number;
  paging: PagingInfo;
  [key: string]: any;
};

export type ApiMeta = {
  page: number;
  perPage: number;
  totalDocuments: number;
  totalPage: number
};