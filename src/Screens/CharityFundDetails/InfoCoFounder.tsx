import ActionButton from '@Components/ActionButton/ActionButton'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BACKGROUND_COLOR, NEW_BASE_COLOR } from '@Constant/Color'
import { getListCompanionByUser } from '@Redux/charity/actions'
import { getListCompanionByUserState } from '@Redux/charity/selectors'
import React, { useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useNavigationParams } from 'src/Hooks/useNavigation'
import CardCampaign from './InfoCoFounderComponents/CardCampaign'
import InfoPerson from './InfoCoFounderComponents/InfoPerson'
import Quotes from './InfoCoFounderComponents/Quotes'
import Report from './InfoCoFounderComponents/Report'
import ScreenKey from '@Navigation/ScreenKey'

const InfoCoFounder = () => {
  const { navigate } = useNavigate()
  const { data } = useNavigationParams();
  const dispatch = useDispatch();
  const { data: listCompanionByUser } = useSelector(getListCompanionByUserState)

  useEffect(() => {
    if (data?._id) {
      dispatch(getListCompanionByUser.request({
        condition: {
          "status": { "equal": "ACCEPT" }, "partnerId": { "equal": data?.partner?._id }
        }
      }))
    }
  }, [data])

  const _handleConfirm = useCallback(() => {
    navigate(ScreenKey.CHARITY_DONATION, { volunteerCompanion: data })()
  }, [])

  return (
    <Screen
      safeBottom
      backgroundColor={BACKGROUND_COLOR}>
      <FocusAwareStatusBar barStyle='light-content' />
      <LiAHeader
        bg={NEW_BASE_COLOR}
        safeTop
        title='Chiến dịch đồng hành' />
      <ScrollView>
        <InfoPerson data={data} />
        <Quotes data={data} />
        <Report data={data} />
        <Column
          marginTop={8 * 2}
          gap={8 * 2}
          marginHorizontal={8 * 2}>
          <Text weight='bold' color={NEW_BASE_COLOR}>
            Chiến dịch đang đồng hành
          </Text>
          {
            listCompanionByUser?.map((item, index) => {
              return (
                <CardCampaign data={item} key={item?._id} />
              )
            })
          }
        </Column>
        <Spacer top={100} />
      </ScrollView>
      <ActionButton
        colors={["#34759b", "#1a3e67"]}
        onPress={_handleConfirm}
        title="Ủng hộ"
      />
    </Screen>
  )
}

export default InfoCoFounder

const styles = StyleSheet.create({
})
