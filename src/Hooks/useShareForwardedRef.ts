/* eslint-disable no-param-reassign */
import { Ref, useEffect, useRef } from 'react';

export default function useShareForwardedRef<T>(forwardedRef: Ref<T>) {
  // final ref that will share value with forward ref. this is the one we will attach to components
  const innerRef = useRef<T>(null);

  useEffect(() => {
    // after every render - try to share current ref value with forwarded ref
    if (!forwardedRef) {
      return;
    }
    if (typeof forwardedRef === 'function') {
      forwardedRef(innerRef.current);
    } else {
      // by default forwardedRef.current is readonly. Let's ignore it
      // @ts-ignore
      forwardedRef.current = innerRef.current;
    }
  });

  return innerRef;
}
