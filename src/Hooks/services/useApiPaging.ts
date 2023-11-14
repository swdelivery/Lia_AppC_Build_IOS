import { PagingInfo } from "@Redux/types";
import { ApiMeta, ApiResponse } from "@typings/api";
import { useCallback, useEffect, useRef, useState } from "react";
import configs from "src/configs";

type Request<T, R> = (
  params: R,
  page?: number,
  pageSize?: number
) => Promise<ApiResponse<T[]>>;

export default function useApiPaging<T, R>(
  request: Request<T, R>,
  defaultPayload?: R
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const savedRequest = useRef<Request<T, R>>(request);
  // @ts-ignore
  const filterParams = useRef<R>({});
  const paging = useRef<PagingInfo>();
  const meta = useRef<ApiMeta>();
  const total = useRef(0);

  useEffect(() => {
    savedRequest.current = request;
  }, [request]);

  const internalGetData = useCallback(
    async (payload?: any, page?: number, pageSize?: number) => {
      try {
        filterParams.current = {
          ...defaultPayload,
          ...filterParams.current,
          ...payload,
        };
        const response: ApiResponse<T[]> = await savedRequest.current(
          filterParams.current,
          page,
          pageSize
        );
        return response;
      } catch (error: any) {
        console.log(error.message);
      }
      return null;
    },
    [defaultPayload]
  );

  const getData = useCallback(
    async (params?: R, page?: number, pageSize?: number) => {
      setLoading(true);
      const response = await internalGetData(params, page, pageSize);
      if (response) {
        total.current = response.total;
        paging.current = {
          page: 1,
          canLoadMore: response.data.length === configs.apiPageSize,
        };
        meta.current = response.meta;
        setData(response.data);
      }
      setLoading(false);
    },
    []
  );

  const refresh = useCallback(() => {
    getData(filterParams.current);
  }, []);

  const loadMore = useCallback(async () => {
    if (!paging.current || !paging.current.canLoadMore) {
      return;
    }
    setLoadingMore(true);
    const response = await internalGetData(
      filterParams.current,
      paging.current.page + 1
    );
    if (response) {
      setData((prev) => [...prev, ...response.data]);
      paging.current = {
        page: paging.current.page + 1,
        canLoadMore: response.data.length === configs.apiPageSize,
      };
    }
    setLoadingMore(false);
  }, []);

  return {
    data,
    isLoading,
    getData,
    loadMore,
    refresh,
    isLoadingMore,
    total: total.current,
    meta: meta.current,
  };
}
