import { View, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import Text from '@Components/Text'
import { BLACK, GREY } from '@Constant/Color';
import { styleElement } from '@Constant/StyleElement';


type Props = {
  title: string;
  isActive: boolean;
  flag: string;
  onPress: (flag) => void;
};

const BtnCategory = ({ title = '', isActive = false, flag = "", onPress }: Props) => {

  const _handleChoice = useCallback(() => {
    onPress(flag)
  }, [flag, onPress])

  return (
    <TouchableOpacity
      hitSlop={styleElement.hitslopSm}
      onPress={_handleChoice}>
      <Text
        color={isActive ? "#366792" : GREY}
        textDecorationLine={isActive ? 'underline' : 'none'}
        weight={isActive ? 'bold' : 'bold'}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default BtnCategory
