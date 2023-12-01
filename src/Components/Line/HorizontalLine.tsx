import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDER_COLOR } from '@Constant/Color'

const HorizontalLine = ({ style = {} }) => {
  return (
    <View style={[styles.line, style]}>

    </View>
  )
}

export default HorizontalLine

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: BORDER_COLOR
  }
})
