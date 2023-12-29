import React, { memo } from "react";
import { StyleSheet } from "react-native";

import IconIProfile from "../../SGV/i_profile.svg";
import IconAProfile from "../../SGV/a_profile.svg";

import { _moderateScale } from "../../Constant/Scale";
import { BASE_COLOR } from "@Constant/Color";

const ProfileTabIcon = memo((props) => {
  return (
    <>
      {props?.focused ? (
        <IconAProfile width={24} height={24} color={BASE_COLOR} />
      ) : (
        <IconIProfile width={24} height={24} />
      )}
    </>
  );
});

const styles = StyleSheet.create({});

export default ProfileTabIcon;
