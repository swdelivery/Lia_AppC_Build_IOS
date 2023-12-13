import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment';
import Column from '@Components/Column';
import { getBranchList } from '@Redux/branch/actions';
import { getBranchListState } from '@Redux/branch/selectors';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import useListFilter from 'src/Hooks/useListFilter';
import ItemBranch from './ItemBranch';

const ResultBranch = () => {

  const { data: dataBranch, getData: getDataBranch } = useListFilter(
    getBranchListState,
    getBranchList,
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      getDataBranch()
    });
  }, [])

  const _renderItemBranch = ({ item, index }) => {
    return (
      <ItemBranch data={item} />
    )
  }

  return (
    <AfterTimeoutFragment timeout={200}>
      <Column
        flex={1}>
        <FlatList
          renderItem={_renderItemBranch}
          keyExtractor={(item, index) => item?.id}
          data={dataBranch} />
      </Column>
    </AfterTimeoutFragment>
  )
}

export default ResultBranch

const styles = StyleSheet.create({})
