import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Column from '@Components/Column'
import { BG_BEAUTY, BLACK, WHITE } from '@Constant/Color'
import Text from '@Components/Text';


type Props = {
  title: string;
  isActive?: boolean;
  flag: string;
  onPress?: (flag) => void;
};

const BtnMenu = ({ title = '', isActive = false, flag = "", onPress }: Props) => {

  const _handleChoice = useCallback(() => {
    onPress(flag)
  }, [flag, onPress])

  return (
    <TouchableOpacity onPress={_handleChoice}>
      <Column
        paddingVertical={8}
        paddingHorizontal={4}
        backgroundColor={isActive ? WHITE : BG_BEAUTY}>
        <Text
          size={12}
          color={BLACK}
          weight={isActive ? 'bold' : 'regular'}>
          {title}
        </Text>
      </Column>
    </TouchableOpacity>
  )
}

export default BtnMenu

const styles = StyleSheet.create({})
