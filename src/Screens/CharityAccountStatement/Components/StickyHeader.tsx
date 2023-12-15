import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _width } from '@Constant/Scale'
import { BORDER_COLOR, GREEN_SUCCESS, GREY, RED, WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import { IconBackBlue } from '@Components/Icon/Icon'
import Column from '@Components/Column'
import Text from '@Components/Text'
import { styleElement } from '@Constant/StyleElement'

const StickyHeader = () => {
  return (
    <Row
      backgroundColor={WHITE}
      width={_width}
      height={8 * 5}>
      <TouchableOpacity style={[styles.btn, styleElement.centerChild, { borderBottomColor: GREEN_SUCCESS }]}>
        <Text
          color={GREEN_SUCCESS}
          weight='bold'>
          Thu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styleElement.centerChild]}>
        <Text
          color={GREY}
          weight='bold'>
          Chi
        </Text>
      </TouchableOpacity>
    </Row>
  )
}

export default StickyHeader

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    height: 8 * 5
  }
})
