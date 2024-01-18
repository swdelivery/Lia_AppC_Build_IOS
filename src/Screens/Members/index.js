import match from "autosuggest-highlight/match";
import { escapeRegExp, isEmpty } from "lodash";
import React, { memo, useCallback, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import slugify from "slugify";
import { navigation } from "../../../rootNavigation";
import * as Color from "../../Constant/Color";
import { WHITE } from "../../Constant/Color";
import { sizeIcon } from "../../Constant/Icon";
import { _moderateScale, _width, _widthScale } from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import EachMember from "./EachMember";
import TextInput from "@Components/TextInput";

const index = memo((props) => {
  const membersRedux = useSelector((state) => state.membersReducer);
  const infoUserRedux = useSelector((state) => state.infoUserReducer);

  const [valueInput, setValueInput] = useState("");
  const [listMembersOfSystemLocalComp, setListMembersOfSystemLocalComp] =
    useState(membersRedux?.listMembersOfSystem);
  const [listMembersAfterFilter, setListMembersAfterFilter] = useState([]);

  const filterByNames = (data, inputValue) => {
    const re = new RegExp(escapeRegExp(inputValue), "i");
    const results = data.filter((item) => {
      console.log(slugify(item.profile.lastName, ""));

      if (re.test(slugify(item.profile.lastName, " "))) {
        const matches = match(slugify(item.profile.lastName, ""), inputValue);
        // item["parts"] = parse(item.profile.lastName, matches);
        return true;
      }
      if (re.test(slugify(item.profile.firstName, " "))) {
        const matches = match(slugify(item.profile.firstName, ""), inputValue);
        // item["parts"] = parse(item.profile.firstName, matches);
        return true;
      } else {
        return false;
      }
    });
    console.log({ results });

    if (!isEmpty(results)) {
      setListMembersAfterFilter(results);
    }

    // return results;
  };

  const _renderItemMember = ({ item, index }) => {
    if (item._id == infoUserRedux.infoUser._id) return;
    return (
      <EachMember
        item={item}
        // setCurrReplyComment={xyz}
        // item={item}
        // lasted={index == postsRedux?.currSeeCommentPost?.data?.length - 1}
      />
    );
  };
  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : null}
        style={{
          flexGrow: 1,
        }}
      >
        {/* <Text>
                ListUsers
            </Text>

            <TextInput
                onChangeText={(c) => {
                    setValueInput(c)
                }}
                value={valueInput}
                placeholder={'Aa'} />

            <TouchableOpacity onPress={() => filterByNames(listMembersOfSystemLocalComp, valueInput)}>
                <Text>
                    find
                    </Text>
            </TouchableOpacity> */}

        <View style={styles.headerSearch}>
          <View
            style={[
              styleElement.rowAliCenter,
              { flex: 1, backgroundColor: Color.BASE_COLOR },
            ]}
          >
            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                style={[sizeIcon.lg, { marginHorizontal: _widthScale(16) }]}
                source={require("../../Icon/back_white2.png")}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                backgroundColor: Color.WHITE,
                // height: _moderateScale(8 * 3.5),
                borderRadius: _moderateScale(4),
              }}
            >
              <TextInput
                autoFocus
                style={[
                  {
                    fontSize: _moderateScale(14),
                    color: Color.BLACK,
                    // marginRight: _moderateScale(8),
                    paddingHorizontal: _moderateScale(8 * 2),
                    paddingVertical:
                      Platform.OS == "ios" ? _moderateScale(6) : 0,
                  },
                ]}
                placeholderTextColor={"grey"}
                onChangeText={(c) => {
                  filterByNames(listMembersOfSystemLocalComp, c);
                  setValueInput(c);
                }}
                value={valueInput}
                // placeholderTextColor={'rgba(255, 255, 255,.7)'}
                placeholder={"Tìm bạn bè"}
              />
            </View>
            <Image
              style={[sizeIcon.lg, { marginHorizontal: _widthScale(16) }]}
              source={require("../../Icon/find.png")}
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {!isEmpty(listMembersAfterFilter) ? (
            <FlatList
              data={
                !isEmpty(listMembersAfterFilter) ? listMembersAfterFilter : []
              }
              renderItem={_renderItemMember}
              keyExtractor={_awesomeChildListKeyExtractor}
            />
          ) : (
            <>
              {!isEmpty(listMembersOfSystemLocalComp) ? (
                <FlatList
                  data={
                    !isEmpty(listMembersOfSystemLocalComp)
                      ? listMembersOfSystemLocalComp
                      : []
                  }
                  renderItem={_renderItemMember}
                  keyExtractor={_awesomeChildListKeyExtractor}
                />
              ) : (
                <></>
              )}
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headerSearch: {
    width: _width,
    height: _moderateScale(8 * 6),
  },
});

export default index;
