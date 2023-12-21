import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import React from 'react'
import { StyleSheet } from 'react-native'

const Report = ({ data }) => {
  return (
    <Column gap={8 * 2}>
      <Row
        gap={8 * 2}
        paddingHorizontal={8 * 2}>
        <Column
          gap={8}
          paddingVertical={8 * 2}
          borderRadius={8 * 2}
          backgroundColor={NEW_BASE_COLOR}
          style={styleElement.centerChild}
          flex={1}>
          <Text weight='bold' color={WHITE}>
            Mục tiêu đồng hành
          </Text>
          <Text weight='bold' color={WHITE}>
            {formatMonney(data?.targetDeposit, true)}
          </Text>
        </Column>

        <Column
          gap={8}
          paddingVertical={8 * 2}
          borderRadius={8 * 2}
          borderWidth={1}
          borderColor={NEW_BASE_COLOR}
          style={styleElement.centerChild}
          flex={1}>
          <Text weight='bold' color={NEW_BASE_COLOR}>
            Số tiền đã đạt
          </Text>
          <Text weight='bold' color={NEW_BASE_COLOR}>
            {formatMonney(data?.currentDeposit, true)}
          </Text>
        </Column>
      </Row>

      <Column
        gap={8}
        margin={8 * 2}>
        <Row gap={8}>
          <Avatar size={8 * 5} avatar={null} />
          <Avatar size={8 * 5} avatar={null} />
          <Avatar size={8 * 5} avatar={null} />
        </Row>
        <Text size={12}>
          3 Người đã ủng hộ
        </Text>
      </Column>

    </Column>
  )
}

export default Report

const styles = StyleSheet.create({})
