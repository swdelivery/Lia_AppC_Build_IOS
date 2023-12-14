import { IconFilter } from '@Components/Icon/Icon';
import Row from '@Components/Row';
import Text from '@Components/Text';
import { WHITE } from '@Constant/Color';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import useHapticCallback from 'src/Hooks/useHapticCallback';


type Props = {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
  icon?: any;
};

const BtnFilter = ({ title = '', isActive = false, onPress, icon = null }: Props) => {

  const _handlePress = useHapticCallback(() => {
    onPress ? onPress() : null
  }, [])

  return (
    <TouchableOpacity onPress={_handlePress}>
      <Row gap={4}>
        <Text
          color={WHITE}
          weight={isActive ? 'bold' : 'regular'}>
          {title.toUpperCase()}
        </Text>
        {
          icon ?
            <>
              {icon}
            </>
            : <></>
        }
      </Row>
    </TouchableOpacity>
  )
}

export default BtnFilter

const styles = StyleSheet.create({})
