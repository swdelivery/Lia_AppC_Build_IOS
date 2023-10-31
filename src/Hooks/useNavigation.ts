import {
  useRoute,
  useNavigation,
  NavigationProp,
  RouteProp,
  ParamListBase,
  useIsFocused,
} from "@react-navigation/native";
import { RootStackParamsList } from "@Navigation/types";
import { useCallback, useEffect, useMemo, useRef } from "react";
import useSavedCallback from "./useSavedCallback";

export function useNavigationParam<
  T extends RouteProp<ParamListBase>,
  K extends keyof T["params"]
>(paramName: K | string, defaultValue?: T["params"][K]): T["params"][K] {
  const route = useRoute<T>();

  // @ts-ignore
  return route.params && route.params[paramName]
    ? // @ts-ignore
      route.params[paramName]
    : defaultValue;
}

export function useNavigationParams<
  T extends RouteProp<ParamListBase>
>(): T["params"] {
  const route = useRoute<T>();
  const cacheValue = useRef<any>();

  return useMemo(() => {
    const value = {
      ...cacheValue.current,
      ...route.params,
    };
    cacheValue.current = value;
    return value;
  }, [route.params]);
}

export function useNavigationState() {
  return useNavigation().getState();
}

export function useNavigate() {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const navigate = useCallback(
    <ScreenKey extends keyof RootStackParamsList>(
        screen: ScreenKey,
        params?: RootStackParamsList[ScreenKey]
      ) =>
      () => {
        // @ts-ignore
        navigation.navigate(screen, params);
      },
    []
  );

  return { navigate, navigation };
}

export function useFocused(callback: () => void, ignoreFirst = false) {
  const isFocused = useIsFocused();
  const isInitialize = useRef(false);
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (ignoreFirst && !isInitialize.current) {
      isInitialize.current = true;
      return;
    }

    if (isFocused) {
      requestAnimationFrame(() => {
        savedCallback.current();
      });
    }
  }, [isFocused]);
}

export function useScreenExit(callback: () => void) {
  const savedCallback = useSavedCallback(callback);

  useEffect(
    () => () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    },
    []
  );
}

export { useNavigation };
