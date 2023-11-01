import { Action } from "redux";

export type Handler<State, A = any> = (
  state: State,
  action: BaseAction<A>
) => State;

export type PagingInfo = {
  after: string;
  canLoadMore: boolean;
};

export interface BaseAction<P> extends Action {
  payload: P;
  [key: string]: any;
}
