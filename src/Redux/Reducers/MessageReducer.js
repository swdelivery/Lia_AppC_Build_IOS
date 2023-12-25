import { isEmpty } from 'lodash';
import * as ActionType from "../Constants/ActionType";

let initialState = {
    listLastedMessages: [],
    listNewMessages: {},
    newMessageHasSeen: {},
    currChatting: {},
    currRoomChatting: {
        infoCurrRoomChatting: {},
        messages: [],
        infoCurrPartner: {},
    }
};

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionType.SAVE_LIST_MESSAGE_CURR_CHATTING:
        return {
          ...state,
          currRoomChatting: {
            ...state?.currRoomChatting,
            messages: action?.payload?.data,
          },
        };
      case ActionType.SAVE_INFO_CURR_CHATTING:
        return {
          ...state,
          currRoomChatting: {
            ...state?.currRoomChatting,
            infoCurrRoomChatting: action?.payload?.data,
          },
        };

      // case ActionType.UPDATE_STATUS_ACTIVE_MESSAGE:

      //     console.log({ actionaaaa: action.payload });

      //     let tempCurrChattingForRemoveMessage = { ...state.currChatting }
      //     let tempListLastedMessagesForRemoveMessage = [...state.listLastedMessages];

      //     let indexForRemoveMessage = tempCurrChattingForRemoveMessage?.messages?.findIndex(itemFind => itemFind._id == action.payload.data.message._id)
      //     if (indexForRemoveMessage !== -1) {
      //         if (tempCurrChattingForRemoveMessage.messages) {
      //             tempCurrChattingForRemoveMessage.messages[indexForRemoveMessage] = action.payload.data.message
      //         }
      //     }

      //     let indexLastedMessageIdForRemove = tempListLastedMessagesForRemoveMessage.findIndex(itemFind => itemFind._id == action.payload.data.message._id);
      //     if (indexLastedMessageIdForRemove !== -1) {
      //         tempListLastedMessagesForRemoveMessage[indexLastedMessageIdForRemove] = action.payload.data.message
      //     }

      //     return {
      //         ...state,
      //         currChatting: tempCurrChattingForRemoveMessage,
      //         listLastedMessages: tempListLastedMessagesForRemoveMessage,
      //     }
      // case ActionType.UPDATE_MEMBERS_CURR_CHATTING:

      //     return {
      //         ...state,
      //         currChatting: {
      //             ...state.currChatting,
      //             memberArr: action.payload.data
      //         }
      //     }
      // case ActionType.REMOVE_MEMBERS_CURR_CHATTING:

      //     let tempMemberArrremove = [...state.currChatting.memberArr].filter(itemFilter => itemFilter.userId._id !== action.payload.data)

      //     return {
      //         ...state,
      //         currChatting: {
      //             ...state.currChatting,
      //             memberArr: tempMemberArrremove
      //         }
      //     }
      case ActionType.GET_MORE_MESSAGE:
        return {
          ...state,
          currRoomChatting: {
            ...state.currRoomChatting,
            messages: [
              ...state.currRoomChatting.messages,
              ...action.payload.data,
            ],
          },
        };
      case ActionType.GET_NEWEST_MESSAGE:
        // alert(JSON.stringify(action?.payload?.data))
        // console.log({x:action?.payload?.data});

        return {
          ...state,
          currRoomChatting: {
            ...state.currRoomChatting,
            messages: [
              ...action.payload.data,
              ...state.currRoomChatting.messages,
            ],
          },
        };

      case ActionType.CLEAR_DATA_CURR_CHATTING:
        return {
          ...state,
          currChatting: {},
          currRoomChatting: initialState?.currRoomChatting,
        };
      // case ActionType.SAVE_INFO_CURR_CHATTING:

      //     return {
      //         ...state,
      //         currChatting: action.payload.data
      //     }

      case ActionType.SET_LIST_LASTED_MESSAGES:
        console.log("setmessage======");

        return {
          ...state,
          listLastedMessages: action.payload.data,
        };
      case ActionType.UPDATE_LIST_LASTED_MESSAGES:
        console.log("setmessage======");

        return {
          ...state,
          listLastedMessages: [
            ...state.listLastedMessages,
            ...action.payload.data,
          ],
        };

      case ActionType.GET_NEW_MESSAGE:
        console.log({
          ACTION: `----NEW_MESSAGE_ACTION---`,
          data: action.payload.data,
        });

        let tempListLastedMessages = [...state.listLastedMessages].filter(
          (itemFilter) => itemFilter._id !== action.payload.data.conversationId
        );

        if (!isEmpty(state.currRoomChatting)) {
          if (
            state?.currRoomChatting?.infoCurrRoomChatting?._id ==
            action.payload.data.conversationId
          ) {
            return {
              ...state,
              currRoomChatting: {
                ...state.currRoomChatting,
                messages: [
                  action.payload.data.message,
                  ...state.currRoomChatting.messages,
                ],
              },
              listLastedMessages: [
                action.payload.data.conversation,
                ...tempListLastedMessages,
              ],
            };
          }
        }
        return {
          ...state,
          listLastedMessages: [
            action.payload.data.conversation,
            ...tempListLastedMessages,
          ],
        };

      case ActionType.UPDATE_SPECIFIC_MESSAGE:
        let tempCurrRoomChattingForUpdateSpecific = {
          ...state.currRoomChatting,
        };

        if (
          !isEmpty(
            tempCurrRoomChattingForUpdateSpecific?.infoCurrRoomChatting
          ) &&
          tempCurrRoomChattingForUpdateSpecific?.infoCurrRoomChatting?._id ==
            action?.payload?.data?.message?.conversationId
        ) {
          // tempCurrChatting = { ...state.currChatting }
          let findIndexItemMessageHasSeen =
            tempCurrRoomChattingForUpdateSpecific.messages.findIndex(
              (itemFind) => itemFind._id == action.payload.data.message?._id
            );
          if (findIndexItemMessageHasSeen !== -1) {
            tempCurrRoomChattingForUpdateSpecific.messages[
              findIndexItemMessageHasSeen
            ] = action.payload.data.message;
          }
        }

        return {
          ...state,
          currRoomChatting: {
            ...state?.currRoomChatting,
            messages: tempCurrRoomChattingForUpdateSpecific?.messages,
          },
        };

      case ActionType.UPDATE_VIEWER_MESSAGE:
        let tempListLastedMessagesUpdateViewer = [...state.listLastedMessages];
        let tempCurrRoomChatting = { ...state.currRoomChatting };

        if (
          !isEmpty(tempCurrRoomChatting?.infoCurrRoomChatting) &&
          tempCurrRoomChatting?.infoCurrRoomChatting?._id ==
            action?.payload?.data?.conversationId
        ) {
          // tempCurrChatting = { ...state.currChatting }
          let findIndexItemMessageHasSeen =
            tempCurrRoomChatting.messages.findIndex(
              (itemFind) =>
                itemFind._id == action.payload.data.data.messages[0]?._id
            );
          if (findIndexItemMessageHasSeen !== -1) {
            tempCurrRoomChatting.messages[findIndexItemMessageHasSeen] =
              action.payload.data.data.messages[0];
          }
        }

        let finding = tempListLastedMessagesUpdateViewer.findIndex(
          (itemFind) => itemFind?._id == action?.payload?.data?.conversationId
        );

        if (finding !== -1) {
          tempListLastedMessagesUpdateViewer[finding].latestMessage =
            action.payload.data.data.messages[0];
        }

        return {
          ...state,
          listLastedMessages: tempListLastedMessagesUpdateViewer,
          currRoomChatting: {
            ...state?.currRoomChatting,
            messages: tempCurrRoomChatting?.messages,
          },
        };

      default:
        return state;
    }
};

export default MessageReducer;
