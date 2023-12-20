import Column from '@Components/Column'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { formatMonney } from '@Constant/Utils'
import { getWallet } from '@Redux/wallet/actions'
import { getWalletState } from '@Redux/wallet/selectors'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const WalletInfo = () => {
  const dispatch = useDispatch()
  const { data: wallet } = useSelector(getWalletState)

  useEffect(() => {
    dispatch(getWallet.request())
  }, [])

  return (
    <Column
      gap={8}
      marginHorizontal={8 * 2}>
      <Text>
        Số dư khả dụng  Ví LiA
      </Text>
      <Text
        color={NEW_BASE_COLOR}
        size={18}
        weight='bold'>
        {formatMonney(wallet?.depositAmount + wallet?.commissionAmount)} VND
      </Text>

    </Column>
  )
}

export default WalletInfo

const styles = StyleSheet.create({})
