import { AppState } from "@Redux/Reducers/RootReducer";
import { ActionGroup } from "@Redux/helper";
import { isEqual } from "lodash";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataPagingPayload } from "@typings/api";

type BaseState<T> = {
  isLoading: boolean;
  data: T[];
  total: number;
  isLoadingMore: boolean;
  [key: string]: any;
};

// type Selector<T> = (state: AppState) => State<T>;

type FilterData = {
  search?: string;
  [key: string]: any;
};

export default function useListFilter<
  T,
  State extends BaseState<T>,
  Params = FilterData
>(
  selectorFn: (state: AppState) => State,
  getListActionsGroup: ActionGroup<Params, DataPagingPayload<State["data"]>>,
  loadMoreActionsGroup?: ActionGroup<Params, DataPagingPayload<State["data"]>>,
  additionalOptions?: Partial<Params>
) {
  const dispatch = useDispatch();
  const { isLoading, isLoadingMore, data, total, ...otherStates } =
    useSelector(selectorFn);
  const lastFilter = useRef<Params>();
  const filterEnabled = useRef(false);

  const getData = useCallback(
    (filter?: Params) => {
      // @ts-ignore
      const filterData: Params = {
        ...lastFilter.current,
        ...filter,
        ...additionalOptions,
      };
      if (isEqual(filterData, lastFilter.current)) {
        return;
      }
      lastFilter.current = filterData;
      dispatch(getListActionsGroup.request(filterData));
    },
    [additionalOptions]
  );

  const searchData = useCallback(
    (search?: string) => {
      // @ts-ignore
      getData({ search });
    },
    [getData]
  );

  const loadMoreData = useCallback(() => {
    if (loadMoreActionsGroup) {
      // @ts-ignore
      dispatch(loadMoreActionsGroup.request(lastFilter.current));
    }
  }, []);

  const refreshData = useCallback(() => {
    // @ts-ignore
    dispatch(getListActionsGroup.request(lastFilter.current));
  }, []);

  const applyFilter = useCallback(
    (filter: Params, hasFilter?: boolean) => {
      filterEnabled.current = hasFilter ?? false;
      getData(filter);
    },
    [getData]
  );

  return {
    isLoading,
    isLoadingMore,
    data,
    getData,
    searchData,
    loadMoreData,
    refreshData,
    applyFilter,
    total,
    filterEnabled: filterEnabled.current,
    currentFilters: lastFilter.current,
    ...otherStates,
  };
}
