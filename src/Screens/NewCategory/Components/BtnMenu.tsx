import Column from '@Components/Column';
import Text from '@Components/Text';
import { BG_BEAUTY, BLACK, WHITE } from '@Constant/Color';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import useHapticCallback from 'src/Hooks/useHapticCallback';


type Props = {
  title: string;
  isActive?: boolean;
  flag: string;
  onPress?: (flag) => void;
};

const BtnMenu = ({ title = '', isActive = false, flag = "", onPress }: Props) => {

  const _handleChoice = useHapticCallback(() => {
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
