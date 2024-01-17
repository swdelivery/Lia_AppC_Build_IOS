import { useCallback } from 'react';
import { Alert } from 'react-native';

const useConfirmation = () => {

  const showConfirmation = useCallback(
    (
      title = "Xác nhận",
      description = "Bạn có chắc chắn muốn thực hiện hành động này?",
      onConfirmCallback = () => null,
      onCancelCallback = undefined
    ) => {
      Alert.alert(
        title,
        description,
        [
          {
            text: "Huỷ",
            style: "cancel",
            onPress: onCancelCallback,
          },
          {
            text: "Đồng ý",
            onPress: () => {
              onConfirmCallback();
            },
          },
        ],
        { cancelable: false }
      );
    },
    []
  );
  return { showConfirmation };
};

export default useConfirmation;
