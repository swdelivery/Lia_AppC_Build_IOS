import { is } from "ramda";
import { Action, AnyAction, Reducer } from "redux";
import { LOG_OUT } from "./Constants/ActionType";
/**
 * Allows your reducers to be reset.
 *
 * @param {string} typeToReset - The action type to listen for.
 * @param {function} originalReducer - The reducer to wrap.
 */
export function resettableReducer<S, A extends Action = AnyAction>(
  typeToReset: string,
  originalReducer: Reducer<S, A>
): Reducer<S, A> {
  // a valid type is required
  if (!is(String, typeToReset) || typeToReset === "") {
    throw new Error("A valid reset type is required.");
  }

  // an original reducer is required
  if (typeof originalReducer !== "function") {
    throw new Error("A reducer is required.");
  }
  // run it through first to get what the default state should be
  // @ts-ignore
  const resetState = originalReducer(undefined, {});

  // create our own reducer that wraps the original one and hijacks the reset
  function reducer(state = resetState, action: A) {
    if (action && action.type === typeToReset) {
      return resetState;
    }
    return originalReducer(state, action);
  }
  return reducer;
}

export function resetable<S, A extends Action = AnyAction>(
  originalReducer: Reducer<S, A>
): Reducer<S, A> {
  return resettableReducer(LOG_OUT, originalReducer);
}
