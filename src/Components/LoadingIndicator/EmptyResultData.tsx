import { StyleSheet, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column'
import Text from '@Components/Text'
import { GREY } from '@Constant/Color'

const EmptyResultData = () => {
  return (
    <Column
      alignItems='center'
      justifyContent='center'
      flex={1}>
      <Text
        color={GREY}
        fontStyle='italic'>
        Chưa có dữ liệu
      </Text>
    </Column>
  )
}

export default EmptyResultData

const styles = StyleSheet.create({})
