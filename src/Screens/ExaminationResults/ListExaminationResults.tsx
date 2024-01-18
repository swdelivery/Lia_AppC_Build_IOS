import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import LiAHeader from '@Components/Header/LiAHeader'
import Column from '@Components/Column'
import useItemExtractor from 'src/Hooks/useItemExtractor'
import { ExaminationResult } from '@typings/examinationResult'
import CardExaminationResult from './Components/CardExaminationResult'

const ListExaminationResults = () => {
  const [listResults, setListResults] = useState([1, 2, 3, 4, 5])

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
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={keyExtractor}
        renderItem={_renderItem}
        data={listResults} />
      <Text>ListExaminationResults</Text>
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
