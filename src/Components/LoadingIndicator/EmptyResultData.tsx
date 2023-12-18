import { StyleSheet, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column'
import Text from '@Components/Text'
import { GREY } from '@Constant/Color'


type Props = {
  title?: string;
};

const EmptyResultData = ({ title = 'Chưa có dữ liệu' }: Props) => {
  return (
    <Column
      alignItems='center'
      justifyContent='center'
      flex={1}>
      <Text
        color={GREY}
        fontStyle='italic'>
        {title}
      </Text>
    </Column>
  )
}

export default EmptyResultData

const styles = StyleSheet.create({})
