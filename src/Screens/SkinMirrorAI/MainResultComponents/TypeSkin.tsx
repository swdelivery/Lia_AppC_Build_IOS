import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { NEW_BASE_COLOR } from '@Constant/Color'
import Row from '@Components/Row'
import Icon from '@Components/Icon'

const TypeSkin = () => {
  return (
    <Column
      marginTop={0}
      margin={8 * 2}>
      <Row justifyContent='space-between'>
        <Text
          weight='bold'
          color={NEW_BASE_COLOR}>
          LOẠI DA
        </Text>
        <Icon color={NEW_BASE_COLOR} name='information-outline' />
      </Row>
    </Column>
  )
}

export default TypeSkin

const styles = StyleSheet.create({})
