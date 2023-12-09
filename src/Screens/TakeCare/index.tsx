import LiAHeader from '@Components/Header/LiAHeader'
import Screen from '@Components/Screen'
import { getListPartnerTreatment } from '@Redux/takecare/actions'
import { getListPartnerTreatmentState } from '@Redux/takecare/selectors'
import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ItemTreatment from './Components/ItemTreatment'

const TakeCare = () => {
  const dispatch = useDispatch()
  const { data: dataListPartnerTreatment } = useSelector(getListPartnerTreatmentState)

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

  return (
    <Screen
      safeBottom
      backgroundColor='#F1FCF9'>
      <LiAHeader
        safeTop
        title='Lịch sử điều trị' />
      <FlatList
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
