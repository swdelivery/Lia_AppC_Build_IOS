import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import LiAHeader from '@Components/Header/LiAHeader'
import Column from '@Components/Column'
import useItemExtractor from 'src/Hooks/useItemExtractor'
import { ExaminationResult } from '@typings/examinationResult'
import CardExaminationResult from './Components/CardExaminationResult'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'
import { IconEmptyData } from '@Components/Icon/Icon'
import Button from '@Components/Button/Button'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'

const ListExaminationResults = () => {
  const { navigate } = useNavigate()
  const [listResults, setListResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const _handleCreateBooking = useCallback(() => {
    navigate(ScreenKey.CREATE_BOOKING)()
  }, [])

  const _renderItem = useCallback(() => {
    return (
      <CardExaminationResult />
    )
  }, [])

  const { keyExtractor } = useItemExtractor<ExaminationResult>((item) => item._id);

  return (
    <Screen>
      <LiAHeader safeTop title='Kết quả thăm khám' />
      <FlatList
        ListEmptyComponent={
          isLoading ? (
            <></>
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
        data={listResults} />
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
