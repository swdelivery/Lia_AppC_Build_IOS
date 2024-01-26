import { ScrollView, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo } from 'react'
import Screen from '@Components/Screen'
import LiAHeader from '@Components/Header/LiAHeader'
import Column from '@Components/Column'
import ListMission from './Components/ListMission'
import Info from './Components/Info'
import HorizontalLine from '@Components/Line/HorizontalLine'
import ActionButton from '@Components/ActionButton/ActionButton'
import { StatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { GREY } from '@Constant/Color'
import { getMemberFirstMissionState } from '@Redux/memberFirstMission/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getMemberFirstMission, takeAwardMemberFirstMission } from '@Redux/memberFirstMission/actions'
import { getInfoUserReducer } from '@Redux/Selectors'
import { isEmpty } from 'lodash'

const MissionForNewUser = () => {
  const dispatch = useDispatch();
  const { data: memberFirstMission } = useSelector(getMemberFirstMissionState)
  const { infoUser } = useSelector(getInfoUserReducer);

  useEffect(() => {
    if (!isEmpty(infoUser)) {
      dispatch(getMemberFirstMission.request())
    }
  }, [infoUser])

  const _handleConfirm = useCallback(() => {
    dispatch(takeAwardMemberFirstMission.request())
  }, [])

  const enableButton = useMemo(() => {
    if (memberFirstMission?.missionStatus == "FINISHED") {
      return true
    } else {
      return false
    }
  }, [memberFirstMission])

  return (
    <Screen safeBottom>
      <StatusBar barStyle="dark-content" />
      <LiAHeader
        safeTop
        title='Nhiệm vụ chào bạn mới' />
      <ScrollView>
        <Column margin={8 * 2}>
          <Text color={GREY} fontStyle='italic'>(*) Để có thể nhận thưởng, bạn hãy hoàn thành tất cả các bước bên dưới nhé!</Text>
        </Column>
        <ListMission />
        <HorizontalLine
          marginVertical={8 * 2}
          height={4} />
        <Info />
      </ScrollView>
      <ActionButton
        disabled={!enableButton}
        onPress={_handleConfirm}
        title='Nhận thưởng' />
    </Screen>

  )
}

export default MissionForNewUser

const styles = StyleSheet.create({})
