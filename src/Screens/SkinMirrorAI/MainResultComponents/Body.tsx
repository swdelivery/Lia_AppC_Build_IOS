import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Column from '@Components/Column'
import { NEW_BASE_COLOR } from '@Constant/Color'
import Icon from '@Components/Icon'
import { styleElement } from '@Constant/StyleElement'
import ListImages from './ListImages'
import TypeSkin from './TypeSkin'

const Body = () => {
  return (
    <View>
      <ListImages />
      <TypeSkin />
    </View>
  )
}

export default Body

const styles = StyleSheet.create({

})
