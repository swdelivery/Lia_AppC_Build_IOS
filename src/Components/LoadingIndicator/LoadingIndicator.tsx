import Column from '@Components/Column'
import Text from '@Components/Text'
import { GREY } from '@Constant/Color'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const LoadingIndicator = () => {
  return (
    <Column
      alignItems='center'
      justifyContent='center'
      gap={8}
      flex={1}>
      <ActivityIndicator color={GREY} />
      <Text color={GREY}>Đang tải dữ liệu</Text>
    </Column>
  )
}

export default LoadingIndicator
