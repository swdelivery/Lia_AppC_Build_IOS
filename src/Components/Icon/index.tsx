/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
import React, { useMemo } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import { IconProps as VIconProps } from "react-native-vector-icons/Icon";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export type IconType =
  | "material"
  | "material-community"
  | "simple-line-icon"
  | "zocial"
  | "font-awesome"
  | "font-awesome5"
  | "octicon"
  | "ionicon"
  | "foundation"
  | "evilicon"
  | "entypo"
  | "antdesign"
  | "feather"
  | "fontisto";

export interface IconProps extends VIconProps {
  type?: IconType;
}

function IconFromType(type: IconType) {
  switch (type) {
    case "material":
      return MaterialIcons;
    case "material-community":
      return MaterialCommunityIcons;
    case "simple-line-icon":
      return SimpleLineIcons;
    case "zocial":
      return Zocial;
    case "font-awesome":
      return FontAwesome;
    case "font-awesome5":
      return FontAwesome5;
    case "octicon":
      return Octicons;
    case "ionicon":
      return Ionicons;
    case "foundation":
      return Foundation;
    case "evilicon":
      return EvilIcons;
    case "entypo":
      return Entypo;
    case "antdesign":
      return AntDesign;
    case "feather":
      return Feather;
    case "fontisto":
      return Fontisto;
    default:
      throw new Error(`Icon type invalid ${type}`);
  }
}

type Props = IconProps & {
  /**
   * Name of icon, for now only support material-community
   * If you'd like to support more icon, follow instruction here to add for both android and ios
   * https://github.com/oblador/react-native-vector-icons#ios-setup
   */
  name?: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export default function Icon(props: Props) {
  const {
    type = "material-community",
    name,
    color = "black",
    size = 24,
    style,
    ...rest
  } = props;
  const VIcon = IconFromType(type);
  return (
    <VIcon name={name} color={color} style={style} size={size} {...rest} />
  );
}
