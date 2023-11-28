import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useConfirmation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => { });
  const [confirmationTitle, setConfirmationTitle] = useState('Xác nhận');
  const [confirmationDescription, setConfirmationDescription] = useState(
    'Bạn có chắc chắn muốn thực hiện hành động này?'
  );

  const showConfirmation = (
    title = 'Xác nhận',
    description = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    onConfirmCallback
  ) => {
    setOnConfirm(() => onConfirmCallback);
    setConfirmationTitle(title);
    setConfirmationDescription(description);
    setIsVisible(true);
  };

  const hideConfirmation = () => {
    setIsVisible(false);
    setOnConfirm(() => { });
  };

  useEffect(() => {
    if (isVisible) {
      Alert.alert(
        confirmationTitle,
        confirmationDescription,
        [
          {
            text: 'Huỷ',
            onPress: () => hideConfirmation(),
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
            onPress: () => {
              onConfirm();
              hideConfirmation();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [isVisible, onConfirm, confirmationTitle, confirmationDescription]);

  return { showConfirmation };
};

export default useConfirmation;
