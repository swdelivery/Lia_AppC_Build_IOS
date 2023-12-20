import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import { NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Icon from '@Components/Icon'

const InfoPerson = () => {
  return (
    <Row
      alignItems='flex-start'
      gap={8 * 2}
      backgroundColor={WHITE}
      borderRadius={8}
      padding={8 * 2}
      margin={8 * 2}>
      <Avatar
        size={8 * 8}
        avatar={null} />
      <Column
        flex={1}
        gap={2}>
        <Text>
          Tài khoản đồng hành gây quỹ
        </Text>
        <Text
          weight='bold'
          color={NEW_BASE_COLOR}>
          NGUYEN HOANG ANH
        </Text>
        <Text fontStyle='italic' size={12}>
          Ngày bắt đầu 18/12/2023
        </Text>
      </Column>
      <TouchableOpacity>
        <Icon name="share-variant" color={NEW_BASE_COLOR} size={18} />
      </TouchableOpacity>
    </Row>
  )
}

export default InfoPerson

const styles = StyleSheet.create({})
