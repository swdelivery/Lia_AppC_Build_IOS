import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import { WHITE } from '@Constant/Color'


type Props = {
  title: string;
  isActive?: boolean;
};

const BtnFilter = ({ title = '', isActive = false }: Props) => {
  return (
    <TouchableOpacity>
      <Text
        color={WHITE}
        weight={isActive ? 'bold' : 'regular'}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default BtnFilter

const styles = StyleSheet.create({})
