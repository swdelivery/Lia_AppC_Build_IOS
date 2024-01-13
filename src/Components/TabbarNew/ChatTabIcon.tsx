import React, { memo, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";

import IconAChat from "../../SGV/a_chat.svg";
import IconIChat from "../../SGV/i_chat.svg";

import { BASE_COLOR, RED, WHITE } from "@Constant/Color";
import {
  getPartnerConversations
} from "@Redux/chat/actions";
import { getPartnerConversationsState } from "@Redux/chat/selectors";
import useListFilter from "src/Hooks/useListFilter";
import Column from "@Components/Column";
import Text from "@Components/Text";
import { styleElement } from "@Constant/StyleElement";

const ChatTabIcon = memo((props) => {
  const { data, refreshData } = useListFilter(
    getPartnerConversationsState,
    getPartnerConversations,
  );

  useEffect(() => {
    refreshData();
  }, []);

  const countUnReadMessage = useMemo(() => {
    let count = data?.reduce((total, item) => {
      return (total += item?.unreadCount ? item?.unreadCount : 0);
    }, 0)
    return count
  }, [data])

  return (
    <>
      {
        countUnReadMessage ?
          <Column
            style={styleElement.centerChild}
            zIndex={1}
            left={8 * 2}
            position="absolute"
            borderRadius={8 * 2 / 2}
            backgroundColor={RED}
            height={8 * 2}
            width={8 * 2}>
            <Text
              size={12}
              weight="bold"
              color={WHITE} style={{ bottom: 0 }}>
              {countUnReadMessage}
            </Text>
          </Column>
          : <></>
      }

      {props?.focused ? (
        <IconAChat width={24} height={24} color={BASE_COLOR} />
      ) : (
        <IconIChat width={24} height={24} />
      )}
    </>
  );
});

const styles = StyleSheet.create({});

export default ChatTabIcon;
