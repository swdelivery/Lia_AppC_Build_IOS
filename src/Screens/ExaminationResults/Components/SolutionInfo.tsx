import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Icon from '@Components/Icon'
import { GREY_FOR_TITLE, NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'

const SolutionInfo = () => {
  return (
    <Row
      gap={4}
      alignItems='flex-start'
      marginHorizontal={8 * 2}>
      <Row gap={4}>
        <Icon size={8 * 2} color={NEW_BASE_COLOR} name='star' />
        <Text weight='bold'>Giải pháp: </Text>
      </Row>
      <Text style={styleElement.flex}>
        Cần xử lý lượng da thừa mí dưới và giải quyết bọng mỡ
      </Text>
    </Row>
  )
}

export default SolutionInfo

const styles = StyleSheet.create({})
