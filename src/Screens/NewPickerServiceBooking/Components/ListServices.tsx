import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ItemService from './ItemService';

const ListServices = (props) => {
  const { route } = props

  const _renderItem = ({ item, index }) => {
    return (
      <ItemService data={item} />
    )
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 8 }}
      numColumns={2}
      data={route?.listService}
      renderItem={_renderItem}
      keyExtractor={({ item, index }) => index}
    />
  )
};

export default ListServices;

const styles = StyleSheet.create({})
