import { IconAI } from '@Components/Icon/Icon';
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Screen from "@Components/Screen";
import { BASE_COLOR, WHITE } from "@Constant/Color";
import { FROM_GROUP_CHAT_ID } from "@Constant/Flag";
import { _moderateScale } from "@Constant/Scale";
import ScreenKey from "@Navigation/ScreenKey";
import {
  getPartnerConversations,
  loadMorePartnerConversations,
} from "@Redux/chat/actions";
import { getPartnerConversationsState } from "@Redux/chat/selectors";
import { Conversation } from "@typings/chat";
import { RenderItemProps } from "@typings/common";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import useItemExtractor from "src/Hooks/useItemExtractor";
import useListFilter from "src/Hooks/useListFilter";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";
import Header from "./Components/Header";
import HeaderList from "./Components/HeaderList";
import ItemLastedMessage, {
  PLACEHOLDER_HEIGHT,
  Placeholder,
} from "./Components/ItemLastedMessage";

const NewListLastedMessage = () => {
  const { navigation } = useNavigate();
  const { isLoading, data, refreshData, loadMoreData } = useListFilter(
    getPartnerConversationsState,
    getPartnerConversations,
    loadMorePartnerConversations
  );

  useFocused(() => {
    refreshData();
  });

  const handleOpenChat = useCallback((item: Conversation) => {
    navigation.navigate(ScreenKey.CHATTING, {
      conversation: item,
      flag: FROM_GROUP_CHAT_ID,
    });
  }, []);
  const handleOpenAIChat = useCallback(() => {
    navigation.navigate(ScreenKey.AI_CHATTING)
  }, []);

  const _renderItem = ({ item, index }: RenderItemProps<Conversation>) => {
    return <ItemLastedMessage item={item} onPress={handleOpenChat} />;
  };

  const { keyExtractor } = useItemExtractor<Conversation>((item) => item._id);

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
      <TouchableOpacity
        onPress={handleOpenAIChat}
        style={[styles.btnAI, shadow]}>
        <IconAI width={8 * 8} height={8 * 8} />
      </TouchableOpacity>

    </Screen>
  );
};

export default NewListLastedMessage

const styles = StyleSheet.create({
  btnAI: {
    width: 8 * 8,
    height: 8 * 8,
    borderRadius: 8 * 4,
    position: 'absolute',
    zIndex: 1,
    right: 8 * 3,
    bottom: 8 * 3,
    backgroundColor: WHITE
  },
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


const shadow = {
  shadowColor: BASE_COLOR,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,

  elevation: 2,
};
