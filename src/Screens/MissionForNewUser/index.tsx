import { ScrollView, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
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

const MissionForNewUser = () => {
  const _handleConfirm = useCallback(() => {

  }, [])

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
        onPress={_handleConfirm}
        title='Nhận thưởng' />
    </Screen>

  )
}

export default MissionForNewUser

const styles = StyleSheet.create({})
