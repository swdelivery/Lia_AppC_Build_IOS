import { useEffect, useRef } from 'react';
import { useNavigation, useNavigationParam } from './useNavigation';

export default function useNavigationParamUpdate<T>(
  param: string,
  callback: (value: T) => void,
) {
  const navigation = useNavigation();
  // @ts-ignore
  const updatedValue: T = useNavigationParam(param);

  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (updatedValue !== undefined && updatedValue !== null) {
      if (savedCallback.current) {
        savedCallback.current(updatedValue);
      }
      // @ts-ignore
      navigation.setParams({ [param]: undefined });
    }
  }, [updatedValue]);
}
