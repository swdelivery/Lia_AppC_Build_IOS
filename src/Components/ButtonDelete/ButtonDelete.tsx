import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RED, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'


type Props = {
  onPress: () => void;
};

const ButtonDelete = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={styleElement.hitslopSm}
      style={styles.container}>
      <View style={styles.lineDot} />
    </TouchableOpacity>
  )
}

export default ButtonDelete

const styles = StyleSheet.create({
  lineDot: {
    width: 8,
    height: 2,
    backgroundColor: WHITE
  },
  container: {
    width: 8 * 2,
    height: 8 * 2,
    borderRadius: 8,
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
