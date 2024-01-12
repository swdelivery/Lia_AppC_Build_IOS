import Button from '@Components/Button/Button'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import { IconEmptyData } from '@Components/Icon/Icon'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import ScreenKey from '@Navigation/ScreenKey'
import { getListPartnerTreatment } from '@Redux/takecare/actions'
import { getListPartnerTreatmentState } from '@Redux/takecare/selectors'
import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'
import ItemTreatment from './Components/ItemTreatment'

const TakeCare = () => {
  const { navigate } = useNavigate()
  const dispatch = useDispatch()
  const { data: dataListPartnerTreatment, isLoading } = useSelector(getListPartnerTreatmentState)

  useEffect(() => {
    dispatch(getListPartnerTreatment.request())
  }, [])

  const _renderItem = ({ item, index }) => {
    return (
      <ItemTreatment data={item} />
    )
  }

  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  const _handleCreateBooking = useCallback(() => {
    navigate(ScreenKey.CREATE_BOOKING)()
  }, [])

  return (
    <Screen
      safeBottom>
      <FocusAwareStatusBar barStyle="light-content" />
      <LiAHeader
        safeTop
        title='Chăm sóc' />
      <FlatList
        ListEmptyComponent={
          isLoading ? (
            <></>
          ) : (
            <Column marginTop={8 * 20} flex={1}>
              <EmptyResultData>
                <Column gap={8} alignItems='center'>
                  <IconEmptyData width={8 * 8} height={8 * 8} />
                  <Text>
                    Làm đẹp cùng LiA
                  </Text>
                  <Button.Gradient
                    onPress={_handleCreateBooking}
                    height={8 * 4}
                    borderRadius={8 * 4}
                    width={8 * 20}
                    horizontal
                    colors={['#2A78BD', '#21587E']}
                    title='Đặt hẹn ngay' />
                </Column>
              </EmptyResultData>
            </Column>
          )
        }
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={_renderItem}
        keyExtractor={_awesomeChildListKeyExtractor}
        data={dataListPartnerTreatment} />
    </Screen>
  )
}

export default TakeCare

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 8 * 2,
    gap: 8 * 2
  }
})
