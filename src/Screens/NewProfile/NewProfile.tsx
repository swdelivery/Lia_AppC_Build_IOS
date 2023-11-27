import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '@Components/Screen'
import Banner from './Components/Banner'
import Separator from '@Components/Separator/Separator'
import MainList from './Components/MainList'
import Column from '@Components/Column'
import Menu from './Components/Menu'
import { IconBooking, IconProfileBooking, IconProfileCare, IconProfileCoin, IconProfileEducation, IconProfileFindJob, IconProfileHandHeartIn, IconProfileHistory, IconProfileInsurance, IconProfileLoveCare, IconProfileMedical, IconProfilePartnerShip, IconProfilePayLater, IconProfilePayment, IconProfilePolicy, IconProfileProtect, IconProfileShield, IconProfileStar, IconProfileVoucher, IconProfileWallet } from '@Components/Icon/Icon'

const NewProfile = () => {
  return (
    <Screen>
      <StatusBar barStyle='light-content' />
      <ScrollView>
        <Banner />
        <View style={styles.body}>
          <Column gap={8 * 2} marginTop={8 * 2}>
            <MainList />
            <Menu
              type={'row'}
              title={"Đơn hàng của tôi"}
              data={[
                { name: 'Lịch hẹn', icon: <IconProfileBooking /> },
                { name: 'Lịch sử điều trị', icon: <IconProfileHistory /> },
                { name: 'Đơn thuốc', icon: <IconProfileMedical /> },
                { name: 'Thanh toán', icon: <IconProfilePayment /> },
                { name: 'Chăm sóc', icon: <IconProfileCare /> },
                { name: 'Hoàn tiền', icon: <IconProfileCoin /> },
                { name: 'Bảo hành', icon: <IconProfileShield /> },
                { name: 'Đánh giá', icon: <IconProfileStar /> },
              ]}
            />
            <Menu
              type={'row'}
              title={"Tiện ích của tôi"}
              data={[
                { name: 'Ví Lia', icon: <IconProfileWallet /> },
                { name: 'Kho Voucher', icon: <IconProfileVoucher /> },
                { name: 'LPay Later', icon: <IconProfilePayLater /> },
                { name: 'Bảo hiểm', icon: <IconProfileInsurance /> },
              ]}
            />
            <Menu
              type={'row'}
              title={"Phụng sự"}
              data={[
                { name: 'Lá lành\nđùm lá rách', icon: <IconProfileHandHeartIn /> },
                { name: 'Quỹ thiện\nnguyện LiA', icon: <IconProfileLoveCare /> },
                { name: 'Tuyển dụng', icon: <IconProfileFindJob /> },
                { name: 'Đào tạo', icon: <IconProfileEducation /> },
              ]}
            />
            <Menu
              type={'column'}
              title={"Phụng sự"}
              data={[
                { name: 'Chính sách và quy định chung', icon: <IconProfilePolicy /> },
                { name: 'Chính sách bảo mật', icon: <IconProfileProtect /> },
                { name: 'Liên hệ hợp tác', icon: <IconProfilePartnerShip /> },
              ]}
            />
            <View style={{ height: 100 }} />
          </Column>
        </View>
      </ScrollView>
    </Screen>
  )
}

export default NewProfile

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#E8F4F1"
  }
})
