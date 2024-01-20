import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { BASE_COLOR, BG_BEAUTY, BLACK, GREY } from "@Constant/Color";
import { getListPosts, getMorePosts } from "@Redux/newfeeds/actions";
import { getListPostsState } from "@Redux/newfeeds/selectors";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import ItemFeed from "./Components/ItemFeed/ItemFeed";
import ListEmpty from "@Components/ListEmpty";
import IconINews from "src/SGV/i_news.svg";
import Column from "@Components/Column";
import { _height } from "@Constant/Scale";

const Social = () => {
  const dispatch = useDispatch();
  const { data: listPosts, meta, isLoading } = useSelector(getListPostsState);

  useEffect(() => {
    _getData();
  }, []);

  const _getData = () => {
    dispatch(
      getListPosts.request({
        condition: {},
        page: 1,
        limit: 10,
      })
    );
  };

  const handleListEndReached = () => {
    onLoadMore();
  };

  const onLoadMore = () => {
    if (meta?.page && meta?.page < meta?.totalPage) {
      dispatch(
        getMorePosts.request({
          condition: {},
          page: meta?.page + 1,
          limit: 10,
        })
      );
    }
  };

  const _handleRefresh = () => {
    _getData();
  };

  const _renderItem = ({ item, index }) => {
    return <ItemFeed data={item} />;
  };

  return (
    <Screen style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Header />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={_handleRefresh}
            colors={[BASE_COLOR]}
            tintColor={BASE_COLOR}
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
        ListEmptyComponent={
          !isLoading ? (
            <Column
              alignItems="center"
              justifyContent="center"
              marginTop={_height / 4}
            >
              <ListEmpty
                title="Chưa có thông tin hoạt động được chia sẽ"
                image={<IconINews width={80} height={80} />}
              />
            </Column>
          ) : null
        }
      />
    </Screen>
  );
};

export default Social

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_BEAUTY
  }
})
