import { IconChat } from "@Components/Icon/Icon";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Screen from "@Components/Screen";
import { WHITE } from "@Constant/Color";
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
import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import useListFilter from "src/Hooks/useListFilter";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";
import Header from "./Components/Header";
import HeaderList from "./Components/HeaderList";
import ItemLastedMessage, {
  PLACEHOLDER_HEIGHT,
  Placeholder,
} from "./Components/ItemLastedMessage";
import Icon from "@Components/Icon";
import { FlashList } from "@shopify/flash-list";

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

  const conversations = useMemo(() => {
    const result: any[] = ["lia"];
    const aiConversation = data.find((item) => item.type === "assistant");
    const liaConversation = data.find((item) => item.type === "consultation");
    if (aiConversation) {
      result.push(aiConversation);
    }
    if (liaConversation) {
      result.push(liaConversation);
    }
    result.push("others");
    result.push(
      ...data.filter(
        (item) => item.type !== "assistant" && item.type !== "consultation"
      )
    );
    return result;
  }, [data]);

  const handleOpenChat = useCallback((item: Conversation) => {
    if (item.type === "assistant") {
      navigation.navigate(ScreenKey.AI_CHATTING);
    } else {
      navigation.navigate(ScreenKey.CHATTING, {
        conversation: item,
        flag: FROM_GROUP_CHAT_ID,
      });
    }
  }, []);

  const _renderItem = ({ item, index }: RenderItemProps<Conversation>) => {
    if (typeof item === "string") {
      return (
        <HeaderList
          icon={item === "lia" ? <Icon name="pin" size={20} /> : <IconChat />}
          title={item === "lia" ? "Trợ lý" : "Cuộc trò chuyện"}
        />
      );
    }
    return <ItemLastedMessage item={item} onPress={handleOpenChat} />;
  };

  return (
    <Screen safeTop style={styles.container}>
      <Header />
      <FlashList
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.flatlistStyle}
        data={conversations}
        renderItem={_renderItem}
        // keyExtractor={keyExtractor}
        refreshing={isLoading}
        onRefresh={refreshData}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
        estimatedItemSize={50}
        ListEmptyComponent={
          isLoading ? (
            <>
              <PlaceholderSkeletons count={10} itemHeight={PLACEHOLDER_HEIGHT}>
                <Placeholder />
              </PlaceholderSkeletons>
            </>
          ) : null
        }
        getItemType={(item) => {
          // To achieve better performance, specify the type based on the item
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
      />
    </Screen>
  );
};

export default NewListLastedMessage;

const styles = StyleSheet.create({
  btnAI: {
    width: 8 * 8,
    height: 8 * 8,
    borderRadius: 8 * 4,
    position: "absolute",
    zIndex: 1,
    right: 8 * 3,
    bottom: 8 * 3,
    backgroundColor: WHITE,
  },
  contentContainerStyle: {
    paddingHorizontal: _moderateScale(8 * 2),
    paddingBottom: 60,
  },
  flatlistStyle: {
    paddingHorizontal: _moderateScale(8 * 2),
  },
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
