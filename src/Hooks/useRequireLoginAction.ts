import { SHOW_MODAL_REQUIRE_LOGIN } from "@Redux/Constants/ActionType";
import { getInfoUserReducer } from "@Redux/Selectors";
import { useRoute } from "@react-navigation/native";
import { DependencyList, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useRequireLoginCallback<T extends Function>(
  callback: T,
  deps: DependencyList
): T {
  const dispatch = useDispatch();
  const route = useRoute();
  const { infoUser } = useSelector(getInfoUserReducer);

  return useCallback(() => {
    if (!infoUser?._id) {
      dispatch({
        type: SHOW_MODAL_REQUIRE_LOGIN,
        payload: {
          flag: true,
          currRouteName: route?.name,
        },
      });
      return;
    }
    return callback();
  }, [route, infoUser, ...deps]);
}
