import React, { memo } from "react";
import { StyleSheet } from "react-native";

import IconIChat from "../../SGV/i_chat.svg";
import IconAChat from "../../SGV/a_chat.svg";

import { _moderateScale } from "../../Constant/Scale";
import { BASE_COLOR } from "@Constant/Color";

const ChatTabIcon = memo((props) => {
  return (
    <>
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
