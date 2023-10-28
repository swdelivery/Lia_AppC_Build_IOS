import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { BASE_COLOR, RED, WHITE } from "../../../Constant/Color";
import { _moderateScale } from "../../../Constant/Scale";
import {
  IconBXH,
  IconBackBase,
  IconBackGrey,
  IconBackWhite,
  IconCancelWhite,
  IconFindGrey,
  IconWallet,
} from "../../../Components/Icon/Icon";
import { stylesFont } from "../../../Constant/Font";
import { navigation } from "../../../../rootNavigation";
import ScreenKey from "../../../Navigation/ScreenKey";
import { sizeIcon } from "../../../Constant/Icon";
import { styleElement } from "../../../Constant/StyleElement";
import { getDataSuggestionSearch } from "../../../Redux/Action/Service";

const Header = memo((props) => {
  return (
    <View style={styles.header}>
      <View style={styles.header__box}>
        <View style={{}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBackGrey style={sizeIcon.lllg} />
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <IconFindGrey style={sizeIcon.llg} />
          <TextInput
            value={props?.value}
            onChangeText={(e) => {
              props?.onchangeText(e);
            }}
            style={{
              flex: 1,
              marginLeft: _moderateScale(8),
            }}
            placeholder="Nhập nội dung tìm kiếm..."
          />
          {props?.value?.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                // props?.pressSearch('')
                props?.setKeySearch("");
              }}
              style={{
                width: _moderateScale(8 * 2),
                height: _moderateScale(8 * 2),
                borderRadius: _moderateScale(8 * 1),
                backgroundColor: RED,
                ...styleElement.centerChild,
              }}
            >
              <IconCancelWhite
                style={{
                  width: _moderateScale(8),
                  height: _moderateScale(8),
                }}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={[
              {
                width: _moderateScale(8 * 7),
                height: _moderateScale(8 * 4),
                borderRadius: _moderateScale(4),
                backgroundColor: BASE_COLOR,
              },
              styleElement.centerChild,
            ]}
            onPress={() => {
              props?.pressSearch(props?.value);
            }}
          >
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
                color: WHITE,
              }}
            >
              Tìm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  input: {
    height: _moderateScale(8 * 5),
    paddingHorizontal: _moderateScale(8),
    marginHorizontal: _moderateScale(8),
    flex: 1,
    borderWidth: 2,
    flexDirection: "row",
    borderColor: BASE_COLOR,
    borderRadius: _moderateScale(8),
    alignItems: "center",
    marginRight: _moderateScale(8 * 1.5),
  },
  header__box: {
    height: _moderateScale(8 * 6),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8 * 1),
    paddingRight: _moderateScale(8 * 2),
  },
  header: {
    backgroundColor: WHITE,
  },
});
