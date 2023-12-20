import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import LiAHeader from '@Components/Header/LiAHeader'
import { BACKGROUND_COLOR, BLACK_OPACITY_7, GREY, NEW_BASE_COLOR } from '@Constant/Color'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Icon from '@Components/Icon'
import { formatMonney } from '@Constant/Utils'
import HorizontalProgress from '@Components/HoriontalProgress'
import Avatar from '@Components/Avatar'
import ActionButton from '@Components/ActionButton/ActionButton'

const ListCompanion = () => {
  return (
    <Screen
      safeBottom
      backgroundColor={BACKGROUND_COLOR}>
      <FocusAwareStatusBar barStyle='light-content' />
      <LiAHeader
        bg={NEW_BASE_COLOR}
        safeTop
        title='Danh sách đồng hành gây quỹ' />
      <ScrollView>
        <Column margin={8 * 2}>
          <Text
            size={16}
            weight='bold'
            color={NEW_BASE_COLOR}>
            Chiến dịch tình nguyện mang nhà vệ sinh đến trẻ em vùng cao  mầm non!
          </Text>
        </Column>
        <Row marginHorizontal={8 * 2}>
          <Row gap={8} flex={1}>
            <Column
              width={36}
              aspectRatio={1}
              backgroundColor={NEW_BASE_COLOR}
              borderRadius={6}
              alignItems="center"
              justifyContent="center">
              <Icon name="target" color="white" />
            </Column>
            <Column>
              <Text size={12} color={BLACK_OPACITY_7}>
                Mục tiêu chiến dịch
              </Text>
              <Text weight="bold">{formatMonney(120000000, true)}</Text>
            </Column>
          </Row>
          <Row gap={8}>
            <Column
              width={36}
              aspectRatio={1}
              backgroundColor={NEW_BASE_COLOR}
              borderRadius={6}
              alignItems="center"
              justifyContent="center">
              <Icon name="timer-sand" color="white" />
            </Column>
            <Column>
              <Text size={12} color={BLACK_OPACITY_7}>
                Thời gian còn lại
              </Text>
              <Text weight="bold">79 ngày</Text>
            </Column>
          </Row>
        </Row>
        <Column margin={8 * 2}>
          <HorizontalProgress percent={80} />
          <Row marginTop={8}>
            <Text>Đã kêu gọi được </Text>
            <Text weight="bold" color={NEW_BASE_COLOR} flex={1}>
              {formatMonney(100000000, true)}
            </Text>
            <Text weight="bold">80%</Text>
          </Row>
        </Column>
        <Column
          gap={8 * 2}
          margin={8 * 2}>
          <Text weight='bold'>
            Danh sách tài khoản đồng hành (4)
          </Text>
          <ItemPerson />
          <ItemPerson />
          <ItemPerson />
          <ItemPerson />
        </Column>

      </ScrollView>
      <ActionButton
        colors={["#34759b", "#1a3e67"]}
        onPress={() => { }}
        title='Đồng hành' />

    </Screen>
  )
}

export default ListCompanion

const ItemPerson = () => {
  return (
    <Row gap={8}>
      <Avatar
        size={8 * 8}
        avatar={null} />
      <Column>
        <Text
          color={NEW_BASE_COLOR}
          weight='bold'>
          Hoàng Oanh
        </Text>
        <Text fontStyle='italic'>
          Đã kêu gọi 10.000 VND
        </Text>
        <Text
          size={12}
          fontStyle='italic'>
          Ngày bắt đầu 18/12/2023
        </Text>
      </Column>
    </Row>
  )
}

const styles = StyleSheet.create({})
