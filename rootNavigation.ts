import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();
// export const navigation = navigationRef.current
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
export function dispatch(action) {
  navigationRef.current?.dispatch(action);
}
export function jumpTo(name, params) {
  navigationRef.current?.jumpTo(name, params);
}
export function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function push(name, params) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
export function goBack() {
  navigationRef.current?.goBack();
}
export function checkRoute() {
  return navigationRef.current.getCurrentRoute();
}

export function reset() {
  return navigationRef.current.reset({
    index: 0,
  });
}

function setParams(params: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.setParams(params));
  }
}

export const navigation = {
  navigate,
  dispatch,
  jumpTo,
  replace,
  push,
  goBack,
  checkRoute,
  reset,
  setParams,
};
