import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment';
import Column from '@Components/Column';
import { getDoctorList } from '@Redux/doctor/actions';
import { getDoctorListState } from '@Redux/doctor/selectors';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import useListFilter from 'src/Hooks/useListFilter';
import ItemDoctor from './ItemDoctor';

const ResultDoctor = () => {
  const { data: dataDoctor, getData: getDataDoctor } = useListFilter(
    getDoctorListState,
    getDoctorList,
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      getDataDoctor()
    });
  }, [])

  const _renderItemDoctor = ({ item, index }) => {
    return (
      <ItemDoctor data={item} />
    )
  }

  return (
    <AfterTimeoutFragment timeout={200}>
      <Column
        flex={1}>
        <FlatList
          renderItem={_renderItemDoctor}
          keyExtractor={(item, index) => item?.id}
          data={dataDoctor} />
      </Column>
    </AfterTimeoutFragment>
  )
}

export default ResultDoctor

const styles = StyleSheet.create({})
