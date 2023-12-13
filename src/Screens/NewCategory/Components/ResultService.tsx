import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment';
import Column from '@Components/Column';
import { getServices } from '@Redux/service/actions';
import { getServiceListState } from '@Redux/service/selectors';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import useListFilter from 'src/Hooks/useListFilter';
import ItemService from './ItemService';

const ResultService = () => {
  const { data: dataService, getData: getDataService } = useListFilter(
    getServiceListState,
    getServices,
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      getDataService()
    });
  }, [])

  const _renderItemService = ({ item, index }) => {
    return (
      <ItemService data={item} />
    )
  }

  return (
    <AfterTimeoutFragment timeout={200}>
      <Column
        flex={1}
        alignItems='center'>
        <FlatList
          contentContainerStyle={{ justifyContent: 'space-between', paddingVertical: 8 }}
          renderItem={_renderItemService}
          keyExtractor={(item, index) => item?.id}
          numColumns={2}
          data={dataService} />
      </Column>
    </AfterTimeoutFragment>
  )
}

export default ResultService

const styles = StyleSheet.create({})
