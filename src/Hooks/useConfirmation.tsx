import { useCallback } from 'react';
import { Alert } from 'react-native';

const useConfirmation = () => {

  const showConfirmation = useCallback((title = 'Xác nhận',
    description = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    onConfirmCallback) => {
    Alert.alert(
      title,
      description,
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            onConfirmCallback();
          },
        },
      ],
      { cancelable: false }
    );
  }, [])
  return { showConfirmation };
};

export default useConfirmation;
