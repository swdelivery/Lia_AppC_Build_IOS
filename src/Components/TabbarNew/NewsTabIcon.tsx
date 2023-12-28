import React, { memo } from "react";
import { StyleSheet } from "react-native";

import IconINews from "../../SGV/i_news.svg";
import IconANews from "../../SGV/a_news.svg";

import { _moderateScale } from "../../Constant/Scale";

const NewsTabIcon = memo((props) => {
  return (
    <>
      {props?.focused ? (
        <IconANews width={24} height={24} />
      ) : (
        <IconINews width={24} height={24} />
      )}
    </>
  );
});

const styles = StyleSheet.create({});

export default NewsTabIcon;
