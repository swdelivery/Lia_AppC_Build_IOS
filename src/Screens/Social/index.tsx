import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { BG_BEAUTY } from '@Constant/Color'
import { getListPosts, getMorePosts } from '@Redux/newfeeds/actions'
import { getListPostsState } from '@Redux/newfeeds/selectors'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Components/Header'
import ItemFeed from './Components/ItemFeed/ItemFeed'

const Social = () => {
  const dispatch = useDispatch()
  const { data: listPosts, meta, isLoading } = useSelector(getListPostsState)

  useEffect(() => {
    _getData()
  }, [])

  const _getData = () => {
    dispatch(getListPosts.request({
      condition: {
      },
      page: 1,
      limit: 10
    }))
  }

  const handleListEndReached = () => {
    onLoadMore();
  }

  const onLoadMore = () => {
    if (meta?.page && meta?.page < meta?.totalPage) {
      dispatch(getMorePosts.request({
        condition: {
        },
        page: meta?.page + 1,
        limit: 10
      }))
    }
  }

  const _handleRefresh = () => {
    _getData()
  };

  const _renderItem = ({ item, index }) => {
    return (
      <ItemFeed data={item} />
    )
  }

  return (
    <Screen style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Header />
      <FlatList
        refreshControl={
          <RefreshControl
            title={"Đang tải.."}
            refreshing={isLoading}
            onRefresh={_handleRefresh}
          />
        }
        contentContainerStyle={{
          gap: 8,
        }}
        data={listPosts}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item?._id.toString()}
        onEndReached={handleListEndReached}
        onEndReachedThreshold={1}
      />
    </Screen>
  )
}

export default Social

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_BEAUTY
  }
})
