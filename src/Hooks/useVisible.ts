import {delay} from 'src/utils/common';
import {useCallback, useRef, useState} from 'react';

function useVisible<T>(initialValue: boolean | undefined = false) {
  const [visible, setVisible] = useState(initialValue);
  const selectedItem = useRef<T>();

  const show = useCallback(
    async (item?: T) => {
      selectedItem.current = item;
      if (visible) {
        setVisible(false);
        await delay(100);
        setVisible(true);
      }
      setVisible(true);
    },
    [visible],
  );

  const hide = useCallback(() => setVisible(false), []);

  const toggle = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return {visible, show, hide, toggle, setVisible, selectedItem};
}

export default useVisible;
