import { Action, AnyAction, Reducer } from "redux";
import { EventChannel, eventChannel } from "redux-saga";
import { select } from "redux-saga/effects";
import { BaseAction, Handler } from "./types";
import { AppState } from "./Reducers/RootReducer";

export type ActionType = "REQUEST" | "SUCCESS" | "FAILURE";
export type ActionTypes = { [key in ActionType]: string };
export type ActionGroup<RequestType, SuccessType> = {
  request: (payload?: RequestType) => BaseAction<RequestType>;
  success: (payload?: SuccessType) => BaseAction<SuccessType>;
  failure: (payload: any) => BaseAction<any>;
};

export const generateActionTypes = (name: string): ActionTypes => ({
  REQUEST: `${name}-request`,
  SUCCESS: `${name}-success`,
  FAILURE: `${name}-failure`,
});

export const generateActionsGroup = <RequestType, SuccessType = void>(
  types: ActionTypes
): ActionGroup<RequestType, SuccessType> => ({
  request: (payload?: RequestType) => ({
    type: types.REQUEST,
    payload,
  }),
  success: (data?: SuccessType) => ({
    type: types.SUCCESS,
    payload: data,
  }),
  failure: (error: string | object) => ({
    type: types.FAILURE,
    payload: error,
  }),
});

export const createReducer =
  <State, A extends Action = AnyAction>(
    initialState: State,
    handlers: { [key: string]: Handler<State> }
  ): Reducer<State, A> =>
  (state = initialState, action: any) => {
    // eslint-disable-next-line no-prototype-builtins
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };

export const createChannel = <T>(fn: any): EventChannel<T> => eventChannel(fn);

export function* selectState<T>(fn: (state: AppState) => T) {
  const res: T = yield select(fn);
  return res;
}
