import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_PRODUCTS, LOAD_MORE_PRODUCTS } from "./types";
import * as actions from "./actions";
import ProductService from "src/Services/ProductService";
import configs from "src/configs";
import { getProductsState } from "./selectors";
import { selectState } from "@Redux/helper";

function* getProducts() {
  try {
    const response = yield call(ProductService.getProducts, {});
    yield put(
      actions.getProducts.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getProducts.failure(error.message));
  }
}

function* loadMoreProducts() {
  try {
    const { paging } = yield* selectState(getProductsState);
    if (!paging || !paging.canLoadMore) {
      throw new Error("empty");
    }
    const response = yield call(ProductService.getProducts, paging.page + 1);
    yield put(
      actions.loadMoreProducts.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: paging.page + 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.loadMoreProducts.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_PRODUCTS.REQUEST, getProducts),
    takeLatest(LOAD_MORE_PRODUCTS.REQUEST, loadMoreProducts),
  ]);
}
