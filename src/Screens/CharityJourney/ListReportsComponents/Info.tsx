import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { formatMonney } from '@Constant/Utils'
import { styleElement } from '@Constant/StyleElement'

const Info = () => {
  return (
    <Column
      gap={8}
      margin={8 * 2}>
      <Column
        gap={4}
        backgroundColor={"#F4F4F4"}
        borderRadius={8}
        padding={8 * 2}>
        <Row>
          <Text style={styleElement.flex}>Tổng số tiền ủng hộ</Text>
          <Text weight='bold'>{formatMonney(120000, true)}</Text>
        </Row>
        <Row>
          <Text style={styleElement.flex}>Tổng số tiền chi</Text>
          <Text weight='bold'>{formatMonney(100000, true)}</Text>
        </Row>
        <Row>
          <Text style={styleElement.flex}>Tổng số tiền còn dư</Text>
          <Text weight='bold'>{formatMonney(20000, true)}</Text>
        </Row>
      </Column>

      <Column
        gap={4}
        backgroundColor={"#F4F4F4"}
        borderRadius={8}
        padding={8 * 2}>
        <Column>
          <Text weight='bold' style={styleElement.flex}>Mô tả / ghi chú</Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </Text>
        </Column>
      </Column>
    </Column>
  )
}

export default Info

const styles = StyleSheet.create({})
