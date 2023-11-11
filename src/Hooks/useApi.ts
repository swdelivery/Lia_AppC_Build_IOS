import { useCallback, useEffect, useRef, useState } from "react";

type Request<T, R> = (params: R) => Promise<T>;

export default function useApi<T, R = any>(
  request: Request<T, R>,
  defaultValue: T
) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setLoading] = useState(false);
  const savedRequest = useRef<Request<T, R>>();
  const currentFilter = useRef<any>();

  useEffect(() => {
    savedRequest.current = request;
  }, [request]);

  const getData = useCallback(async (params: R) => {
    if (!savedRequest.current) {
      return null;
    }
    setLoading(true);
    try {
      const response: T = await savedRequest.current(params);
      setLoading(false);
      setData(response);
      return response;
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    }
    return null;
  }, []);

  /**
   * Perform request
   */
  const performRequest = useCallback(
    async (params: R) => getData(params),
    [getData]
  );

  const refresh = useCallback(() => {
    getData(currentFilter.current);
  }, []);

  return {
    data,
    setData,
    isLoading,
    performRequest,
    refresh,
  };
}
