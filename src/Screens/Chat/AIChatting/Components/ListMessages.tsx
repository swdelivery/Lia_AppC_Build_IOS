import { getInfoUserReducer } from "@Redux/Selectors";
import { getMoreAIMessages } from "@Redux/aichat/actions";
import { getAIMessagesState } from "@Redux/aichat/selectors";
import { Message } from "@typings/chat";
import { RenderItemProps } from "@typings/common";
import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import EachMessage from "./messages/EachMessage";

const ListMessages = () => {
  const dispatch = useDispatch();
  const { data: messages, meta, isLoading, isLoadingMore } = useSelector(getAIMessagesState);
  const { infoUser } = useSelector(getInfoUserReducer);

  const handleListEndReached = () => {
    onLoadMoreMessages();
  }

  const onLoadMoreMessages = () => {
    if (meta?.page && meta?.page < meta?.totalPage) {
      dispatch(getMoreAIMessages.request({
        condition: {
          "partnerId": { "equal": infoUser?._id }
        },
        page: meta?.page + 1,
        limit: 10
      }))
    }
  }

  const handleScrollBegin = useCallback(() => {
  }, []);

  const _renderMessage = ({ item, index }: RenderItemProps<Message>) => {
    return (
      <EachMessage
        index={index}
        item={item}
        previousMessage={messages[index - 1]}
        nextMessage={messages[index + 1]}
      />
    );
  };

  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <>
      <FlatList
        inverted
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        data={messages}
        renderItem={_renderMessage}
        keyExtractor={_awesomeChildListKeyExtractor}
        onMomentumScrollBegin={handleScrollBegin}
        onEndReached={handleListEndReached}
        onEndReachedThreshold={0.2}
      />
    </>
  );
};

export default ListMessages;

const styles = StyleSheet.create({
  content: { backgroundColor: "#EEF2F1" },
  contentContainer: { flexGrow: 1, paddingBottom: 60, paddingTop: 60 },
});
