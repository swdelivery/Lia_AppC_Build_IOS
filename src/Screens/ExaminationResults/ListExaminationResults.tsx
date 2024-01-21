import Button from '@Components/Button/Button'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import { IconEmptyData } from '@Components/Icon/Icon'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'
import LoadingIndicator from '@Components/LoadingIndicator/LoadingIndicator'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import ScreenKey from '@Navigation/ScreenKey'
import { getListExaminationResults } from '@Redux/examinationResults/actions'
import { getListExaminationResultsState } from '@Redux/examinationResults/selectors'
import { ExaminationResult } from '@typings/examinationResult'
import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useItemExtractor from 'src/Hooks/useItemExtractor'
import { useNavigate } from 'src/Hooks/useNavigation'
import CardExaminationResult from './Components/CardExaminationResult'

const ListExaminationResults = () => {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector(getListExaminationResultsState)
  const { navigate } = useNavigate()

  useEffect(() => {
    dispatch(getListExaminationResults.request())
  }, [])

  const _handleCreateBooking = useCallback(() => {
    navigate(ScreenKey.CREATE_BOOKING)()
  }, [])

  const _renderItem = useCallback(({ item }) => {
    return (
      <CardExaminationResult data={item} />
    )
  }, [])

  const { keyExtractor } = useItemExtractor<ExaminationResult>((item) => item._id);

  return (
    <Screen>
      <LiAHeader safeTop title='Kết quả thăm khám' />
      <FlatList
        ListEmptyComponent={
          isLoading ? (
            <LoadingIndicator />
          ) : (
            <Column marginTop={8 * 20} flex={1}>
              <EmptyResultData>
                <Column gap={8} alignItems="center">
                  <IconEmptyData width={8 * 8} height={8 * 8} />
                  <Text>Làm đẹp cùng LiA</Text>
                  <Button.Gradient
                    onPress={_handleCreateBooking}
                    height={8 * 4}
                    borderRadius={8 * 4}
                    width={8 * 20}
                    horizontal
                    colors={["#2A78BD", "#21587E"]}
                    title="Đặt hẹn ngay"
                  />
                </Column>
              </EmptyResultData>
            </Column>
          )
        }
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={keyExtractor}
        renderItem={_renderItem}
        data={data} />
    </Screen>
  )
}

export default ListExaminationResults

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 8 * 2,
    paddingVertical: 8 * 2,
    gap: 8 * 2
  }
})
