import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SocketInstance from "../../../../../SocketInstance";
import ModalShowListUserHasSeenMessage from "../../../../Components/Message/ModalShowListUserHasSeenMessage";
import ModalRemoveMessage from "../../../../Components/Message/ModalRemoveMessage";
import {
  _getMoreMessageByLastedId,
  _getNewestMessageByFirstMessageId,
} from "../../../../Services/api";
import { CSS_PARTNER_SEEN_MESSAGE } from "../../../../Sockets/type";
import EachMessage from "./messages/EachMessage";
import ItemServiceReview from "./messages/ItemServiceReview";
import ItemTemplateService from "../ItemTemplateService";
import ItemTemplateNews from "../ItemTemplateNews";
import ItemNavigateBooking from "../ItemNavigateBooking";
import ItemNavigateCTV from "../ItemNavigateCTV";
import ItemNavigateSpinWheel from "../ItemNavigateSpinWheel";
import { Conversation, Message } from "@typings/chat";
import {
  getConversationMessages,
  loadMoreConversationMessagesHistory,
} from "@Redux/chat/actions";
import { getMessagesState } from "@Redux/chat/selectors";
import { RenderItemProps } from "@typings/common";
import { LoadingView } from "@Components/Loading/LoadingView";
import Fade from "@Components/Fade";
import MediaPicker from "./MediaPicker";

type Props = {
  conversation: Conversation;
};

const ListMessages = ({ conversation }: Props) => {
  const dispatch = useDispatch();
  const {
    data: messages,
    isLoading,
    isLoadingMore,
  } = useSelector(getMessagesState);

  const [isShowModalListUserHasSeenMessage, setIsModalListUserHasSeenMessage] =
    useState(false);
  const [isShowModalRemoveMessage, setIsShowModalRemoveMessage] =
    useState(false);
  const [currFocusMessage, setCurrFocusMessage] = useState({});
  const [currMessageForRemove, setCurrMessageForRemove] = useState({});
  const isEndReachedCalledDuringMomentum = useRef(false);

  useEffect(() => {
    dispatch(getConversationMessages.request(conversation._id));
  }, [conversation._id]);

  useEffect(() => {
    if (!isLoadingMore) {
      isEndReachedCalledDuringMomentum.current = false;
    }
  }, [isLoadingMore]);

  const _setIsModalListUserHasSeenMessage = useCallback((flag) => {
    setIsModalListUserHasSeenMessage(flag);
  }, []);
  const _setIsShowModalRemoveMessage = useCallback((flag) => {
    setIsShowModalRemoveMessage(flag);
  }, []);

  useEffect(() => {
    if (isEmpty(messages)) return;
    if (messages[0]?.isPartnerSeen == true) return;

    let data = {
      conversationId: conversation._id,
      messageIds: [messages[0]?._id],
    };
    SocketInstance?.socketConn?.emit(CSS_PARTNER_SEEN_MESSAGE, data);
  }, [messages, conversation]);

  const onLoadMoreMessages = useCallback(async () => {
    dispatch(loadMoreConversationMessagesHistory.request());
  }, []);

  const handleListEndReached = useCallback(() => {
    if (!isLoading && !isLoadingMore) {
      if (!isEndReachedCalledDuringMomentum.current) {
        onLoadMoreMessages();
        isEndReachedCalledDuringMomentum.current = true;
      }
    }
  }, [isLoading, isLoadingMore]);

  const handleScrollBegin = useCallback(() => {
    isEndReachedCalledDuringMomentum.current = false;
  }, []);

  const _renderMessage = ({ item, index }: RenderItemProps<Message>) => {
    return (
      <EachMessage
        setCurrFocusMessage={setCurrFocusMessage}
        setCurrMessageForRemove={setCurrMessageForRemove}
        setIsModalListUserHasSeenMessage={_setIsModalListUserHasSeenMessage}
        setIsShowModalRemoveMessage={_setIsShowModalRemoveMessage}
        index={index}
        item={item}
        previousMessage={messages[index - 1]}
        nextMessage={messages[index + 1]}
        // isOnline={
        //     !isEmpty(listUserOnlineRedux) && listUserOnlineRedux.find(itemFind => itemFind == item.senderId)
        // }
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
        ListHeaderComponent={
          <Fade visible={isLoading}>
            <LoadingView height={40} />
          </Fade>
        }
        ListFooterComponent={
          <Fade visible={isLoadingMore}>
            <LoadingView height={60} />
          </Fade>
        }
      />
      <ModalShowListUserHasSeenMessage
        data={currFocusMessage}
        closeModalListUserHasSeenMessage={() =>
          setIsModalListUserHasSeenMessage(false)
        }
        isShowModalListUserHasSeenMessage={isShowModalListUserHasSeenMessage}
      />

      <ModalRemoveMessage
        data={currMessageForRemove}
        closeModalRemoveMessage={() => setIsShowModalRemoveMessage(false)}
        isShowModalRemoveMessage={isShowModalRemoveMessage}
      />
    </>
  );
};

export default ListMessages;

const styles = StyleSheet.create({
  content: { backgroundColor: "#EEF2F1" },
  contentContainer: { flexGrow: 1, paddingBottom: 60 },
});
