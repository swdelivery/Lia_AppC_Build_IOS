import CircleTick from '@Components/CircleTick/CircleTick'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { selectPaymentMethodCode } from '@Redux/charity/actions'
import { getDataCreateDonateState } from '@Redux/charity/selectors'
import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const TypeDonate = () => {
  const dispatch = useDispatch()
  const { paymentMethodCode } = useSelector(getDataCreateDonateState)

  const _handleSetType = useCallback((data) => () => {
    dispatch(selectPaymentMethodCode(data))
  }, [])

  return (
    <Column
      top={-8 * 2}
      gap={8 * 2}
      marginHorizontal={8 * 2}>
      <Text>Hình thức ủng hộ</Text>
      <Row gap={8 * 4}>
        <TouchableOpacity onPress={_handleSetType('BANK_TRANSFER')}>
          <Row gap={8}>
            <CircleTick isTicked={paymentMethodCode == "BANK_TRANSFER"} color={NEW_BASE_COLOR} />
            <Text>
              Chuyển khoản
            </Text>
          </Row>
        </TouchableOpacity>
        <TouchableOpacity onPress={_handleSetType('WALLET_TRANSFER')}>
          <Row gap={8}>
            <CircleTick isTicked={paymentMethodCode == "WALLET_TRANSFER"} color={NEW_BASE_COLOR} />
            <Text>
              Ví LiA
            </Text>
          </Row>
        </TouchableOpacity>
      </Row>
    </Column>
  )
}

export default TypeDonate

const styles = StyleSheet.create({})
