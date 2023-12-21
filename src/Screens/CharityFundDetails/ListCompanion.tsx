import ActionButton from '@Components/ActionButton/ActionButton'
import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import HorizontalProgress from '@Components/HoriontalProgress'
import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BACKGROUND_COLOR, BLACK_OPACITY_7, NEW_BASE_COLOR } from '@Constant/Color'
import { formatMonney } from '@Constant/Utils'
import ScreenKey from '@Navigation/ScreenKey'
import { getDetailCampainState, getListCompanionRequestAcceptState } from '@Redux/charity/selectors'
import moment from 'moment'
import React, { useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

const ListCompanion = () => {
  const { navigate } = useNavigate()
  const { data: dataCompanionAccept } = useSelector(getListCompanionRequestAcceptState)

  const { data: {
    fundCurrent,
    fundTarget,
    name,
    endDate
  } } = useSelector(getDetailCampainState)

  const dayLeft = useMemo(() => {
    return moment(endDate).diff(moment(), 'days')
  }, [endDate])

  const percent = useMemo(() => {
    return parseFloat((fundCurrent / fundTarget * 100).toFixed(2))
  }, [fundTarget, fundCurrent])

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
            {name}
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
              <Text weight="bold">{formatMonney(fundTarget, true)}</Text>
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
              <Text weight="bold">{dayLeft} ngày</Text>
            </Column>
          </Row>
        </Row>
        <Column margin={8 * 2}>
          <HorizontalProgress percent={percent} />
          <Row marginTop={8}>
            <Text>Đã kêu gọi được </Text>
            <Text weight="bold" color={NEW_BASE_COLOR} flex={1}>
              {formatMonney(fundCurrent, true)}
            </Text>
            <Text weight="bold">{percent}%</Text>
          </Row>
        </Column>
        <Column
          gap={8 * 2}
          margin={8 * 2}>
          <Text weight='bold'>
            Danh sách tài khoản đồng hành ({dataCompanionAccept?.length})
          </Text>
          {
            dataCompanionAccept?.map((item, index) => {
              return (
                <ItemPerson data={item} key={item?._id} />
              )
            })
          }
        </Column>

      </ScrollView>
      <ActionButton
        colors={["#34759b", "#1a3e67"]}
        onPress={navigate(ScreenKey.CHARITY_COMPANION)}
        title='Đồng hành' />

    </Screen>
  )
}

export default ListCompanion

const ItemPerson = ({ data }) => {
  return (
    <Row gap={8}>
      <Avatar
        size={8 * 8}
        avatar={null} />
      <Column>
        <Text
          color={NEW_BASE_COLOR}
          weight='bold'>
          {data?.partner?.name}
        </Text>
        <Text fontStyle='italic'>
          Đã kêu gọi {formatMonney(data?.targetDeposit, true)}
        </Text>
        <Text
          size={12}
          fontStyle='italic'>
          Ngày bắt đầu {moment(data?.created).format('DD/MM/YYYY')}
        </Text>
      </Column>
    </Row>
  )
}

const styles = StyleSheet.create({})
