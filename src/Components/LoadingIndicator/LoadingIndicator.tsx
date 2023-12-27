import Column from '@Components/Column'
import Text from '@Components/Text'
import { GREY } from '@Constant/Color'
import React from 'react'
import { ActivityIndicator } from 'react-native'

type Props = {
  title?: string;
  color?: any;
}

const LoadingIndicator = ({ title = "Đang tải dữ liệu", color = GREY }: Props) => {
  return (
    <Column
      alignItems='center'
      justifyContent='center'
      gap={8}
      flex={1}>
      <ActivityIndicator color={color} />
      <Text color={color}>{title}</Text>
    </Column>
  )
}

export default LoadingIndicator
