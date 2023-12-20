import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { getConfigData } from '@Redux/Action/OrtherAction'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

const BankInfo = () => {
  const [bankName, setBankName] = useState(null)
  const [bankNumber, setBankNumber] = useState(null)
  const [bankOwner, setBankOwner] = useState(null)

  useEffect(() => {
    _getDataConfig()
  }, [])

  const _getDataConfig = async () => {
    let resultName = await getConfigData("BANK_NAME");
    let resultNumber = await getConfigData("BANK_NUMBER");
    let resultOwnerName = await getConfigData("BANK_OWNER");
    setBankName(resultName?.value)
    setBankNumber(resultNumber?.value)
    setBankOwner(resultOwnerName?.value)
  }

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
          {bankName}
        </Text>
      </Row>
      <Row gap={4}>
        <Text color={NEW_BASE_COLOR}>
          Số tài khoản LIA:
        </Text>
        <Text>
          {bankNumber}
        </Text>
      </Row>
      <Row gap={4}>
        <Text color={NEW_BASE_COLOR}>
          Tên người thụ hưởng:
        </Text>
        <Text>
          {bankOwner}
        </Text>
      </Row>
    </Column>
  )
}

export default BankInfo

const styles = StyleSheet.create({})
