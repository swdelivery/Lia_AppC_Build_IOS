import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'
import Column from '@Components/Column'
import { getPractitionerList } from '@Redux/practitioner/actions'
import { getPractitionerListState } from '@Redux/practitioner/selectors'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import useListFilter from 'src/Hooks/useListFilter'
import ItemPractitioner from './ItemPractitioner'

const ResultPractitioner = () => {
  const { data: dataPractitioner, getData: getDataPractitioner } = useListFilter(
    getPractitionerListState,
    getPractitionerList,
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      getDataPractitioner()
    });
  }, [])

  const _renderItemPractitioner = ({ item, index }) => {
    return (
      <ItemPractitioner data={item} />
    )
  }

  return (
    <AfterTimeoutFragment timeout={200}>
      <Column
        flex={1}>
        <FlatList
          renderItem={_renderItemPractitioner}
          keyExtractor={(item, index) => item?.id}
          data={dataPractitioner} />
      </Column>
    </AfterTimeoutFragment>
  )
}

export default ResultPractitioner

const styles = StyleSheet.create({})
