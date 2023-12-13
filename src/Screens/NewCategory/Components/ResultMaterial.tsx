import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment';
import Column from '@Components/Column';
import { getMaterialList } from '@Redux/material/actions';
import { getMaterialListState } from '@Redux/material/selectors';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import useListFilter from 'src/Hooks/useListFilter';
import ItemMaterial from './ItemMaterial';

const ResultMaterial = () => {

  const { data: dataMaterial, getData: getDataMaterial } = useListFilter(
    getMaterialListState,
    getMaterialList,
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      getDataMaterial()
    });
  }, [])

  const _renderItemMaterial = ({ item, index }) => {
    return (
      <ItemMaterial data={item} />
    )
  }

  return (
    <AfterTimeoutFragment timeout={200}>
      <Column
        flex={1}
        alignItems='center'>
        <FlatList
          contentContainerStyle={{ justifyContent: 'space-between', paddingVertical: 8 }}
          renderItem={_renderItemMaterial}
          keyExtractor={(item, index) => item?.id}
          numColumns={2}
          data={dataMaterial} />
      </Column>
    </AfterTimeoutFragment>
  )
}

export default ResultMaterial

const styles = StyleSheet.create({})
