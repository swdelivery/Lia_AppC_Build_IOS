import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback } from "react";
import Screen from "@Components/Screen";
import Header from "./Components/Header";
import { WHITE } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import ItemLastedMessage, {
  PLACEHOLDER_HEIGHT,
  Placeholder,
} from "./Components/ItemLastedMessage";
import useListFilter from "src/Hooks/useListFilter";
import {
  getPartnerConversations,
  loadMorePartnerConversations,
} from "@Redux/chat/actions";
import { getPartnerConversationsState } from "@Redux/chat/selectors";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";
import HeaderList from "./Components/HeaderList";
import { RenderItemProps } from "@typings/common";
import { LastMessage } from "@typings/chat";
import useItemExtractor from "src/Hooks/useItemExtractor";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import ScreenKey from "@Navigation/ScreenKey";
import { FROM_GROUP_CHAT_ID } from "@Constant/Flag";

const NewListLastedMessage = () => {
  const { navigation } = useNavigate();
  const { isLoading, data, getData, refreshData, loadMoreData } = useListFilter(
    getPartnerConversationsState,
    getPartnerConversations,
    loadMorePartnerConversations
  );

  useFocused(() => {
    getData();
  });

  const handleOpenChat = useCallback((item: LastMessage) => {
    navigation.navigate(ScreenKey.CHATTING, {
      propsData: item,
      flag: FROM_GROUP_CHAT_ID,
    });
  }, []);

  const _renderItem = ({ item, index }: RenderItemProps<LastMessage>) => {
    return <ItemLastedMessage item={item} onPress={handleOpenChat} />;
  };

  const { keyExtractor } = useItemExtractor<LastMessage>((item) => item._id);

  return (
    <Screen safeTop style={styles.container}>
      <Header />
      <FlatList
        ListHeaderComponent={<HeaderList />}
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.flatlistStyle}
        data={data}
        renderItem={_renderItem}
        keyExtractor={keyExtractor}
        refreshing={isLoading}
        onRefresh={refreshData}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={
          isLoading ? (
            <>
              <PlaceholderSkeletons count={10} itemHeight={PLACEHOLDER_HEIGHT}>
                <Placeholder />
              </PlaceholderSkeletons>
            </>
          ) : null
        }
      />
    </Screen>
  );
};

export default NewListLastedMessage

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: _moderateScale(8 * 2)
  },
  flatlistStyle: {
    paddingHorizontal: _moderateScale(8 * 2)
  },
  body: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: WHITE
  }
})
