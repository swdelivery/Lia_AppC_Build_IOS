import * as React from "react";
import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { RootStackParamsList } from "@Navigation/types";

type RouteName = keyof RootStackParamsList;

export const navigationRef =
  createNavigationContainerRef<RootStackParamsList>();
// export const navigation = navigationRef.current
export function navigate(routeName: RouteName, params?: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(routeName, params);
  } else {
    console.error("Trying to navigatte but hasnt mounted");
  }
}
export function dispatch(action) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}

function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function push(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

function setParams(params: any) {
  navigationRef.current?.dispatch(CommonActions.setParams(params));
}

export function getCurrentRouteName(state: any): RouteName | null {
  if (!state || !state.routes) return null;

  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getCurrentRouteName(route.state);
  }
  return route.name;
}

// add other navigation functions that you need and export them
function currentRouteName(): RouteName | null {
  // @ts-ignore
  const navigationState = navigationRef.current?.getRootState();
  return getCurrentRouteName(navigationState);
}

export function getCurrentRoute(state: any): any {
  if (!state || !state.routes) return null;

  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getCurrentRoute(route.state);
  }

  return route;
}

export const navigation = {
  navigate,
  dispatch,
  replace,
  push,
  goBack,
  setParams,
  currentRouteName,
};
