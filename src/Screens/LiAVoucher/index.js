import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import LiAHeader from '../../Components/Header/LiAHeader'
import HorizontalBanner from './Components/HorizontalBanner'
import HorizontalTab from './Components/HorizontalTab'
import ListVoucher from './Components/ListVoucher'

const LiAVoucher = memo(() => {
  return (
    <View style={styles.container}>
      <LiAHeader title={'LIA VOUCHER'} />
      <HorizontalBanner />
      <HorizontalTab />

      <ListVoucher />

    </View>
  )
})

export default LiAVoucher

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLOR
  }
})