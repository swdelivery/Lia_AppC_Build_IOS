import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { ConfigDataCode } from '@typings/configData'
import React from 'react'
import { StyleSheet } from 'react-native'
import useConfigData from 'src/Hooks/useConfigData'

const BankInfo = () => {

  const bankName = useConfigData(ConfigDataCode.BankName);
  const bankNumber = useConfigData(ConfigDataCode.BankNumber);
  const bankOwner = useConfigData(ConfigDataCode.BankOwner);

  return (
    <Column
      gap={8}
      marginHorizontal={8 * 2}>
      <Text>
        Thông tin chuyển khoản
      </Text>
      <Row gap={4}>
        <Text color={NEW_BASE_COLOR}>
          Ngân hàng:
        </Text>
        <Text>
          {bankName?.value}
        </Text>
      </Row>
      <Row gap={4}>
        <Text color={NEW_BASE_COLOR}>
          Số tài khoản LIA:
        </Text>
        <Text>
          {bankNumber?.value}
        </Text>
      </Row>
      <Row gap={4}>
        <Text color={NEW_BASE_COLOR}>
          Tên người thụ hưởng:
        </Text>
        <Text>
          {bankOwner?.value}
        </Text>
      </Row>
    </Column>
  )
}

export default BankInfo

const styles = StyleSheet.create({})
