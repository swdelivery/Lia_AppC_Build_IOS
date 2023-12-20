import Column from '@Components/Column'
import Icon from "@Components/Icon"
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, NEW_BASE_COLOR } from '@Constant/Color'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const Banner = () => {
  return (
    <Column>
      <Row
        margin={8 * 2}
        justifyContent='space-between'>
        <Text
          weight='bold'>
          Danh sách giao dịch
        </Text>
        <TouchableOpacity style={styles.btnFilter}>
          <Icon name="filter-variant" color={NEW_BASE_COLOR} size={24} />
        </TouchableOpacity>
      </Row>

      <Column
        marginBottom={8}
        paddingHorizontal={8 * 2}>
        <Text>
          Sao kê chỉ hiển thị lịch sử giao dịch trong vòng 90 ngày. Vui lòng sử dụng tính năng Lọc giao dịch để truy vấn giao dịch phát sinh ngoài khoảng thời gian trên.
        </Text>
      </Column>

    </Column>
  )
}

export default Banner

const styles = StyleSheet.create({
  btnFilter: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: BORDER_COLOR
  }
})
