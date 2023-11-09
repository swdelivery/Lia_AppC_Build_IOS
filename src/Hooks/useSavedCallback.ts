import { useEffect, useRef } from 'react';

export default function useSavedCallback<T = any>(callback: T) {
  const savedCallback = useRef<T>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  return savedCallback;
}
