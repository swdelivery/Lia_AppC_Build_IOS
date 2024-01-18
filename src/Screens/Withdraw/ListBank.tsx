import LiAHeader from "@Components/Header/LiAHeader";
import Screen from "@Components/Screen";
import Text from "@Components/Text";
import TextInput from "@Components/TextInput";
import { BG_GREY_OPACITY_2, BLACK, GREY, WHITE } from "@Constant/Color";
import { stylesFont } from "@Constant/Font";
import { sizeIcon } from "@Constant/Icon";
import { _moderateScale, _widthScale } from "@Constant/Scale";
import { getListBank } from "@Redux/Action/Affiilate";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";

const ListBank = (props) => {
  const { navigation } = useNavigate();
  const [listBank, setListBank] = useState([]);
  const [listBankAfterFilter, setListBankAfterFilter] = useState([]);

  useEffect(() => {
    _getListBank();
  }, []);

  const _getListBank = async () => {
    let resultGetListBank = await getListBank();
    setListBank(resultGetListBank?.data);
  };

  const filterByNames = (data, inputValue) => {
    const re = new RegExp(escapeRegExp(inputValue), "i");
    const results = data.filter((item) => {
      if (item?.short_name) {
        if (re.test(slugify(item?.short_name, " "))) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (!isEmpty(results)) {
      setListBankAfterFilter(results);
    }
  };

  const _handleChoiceBank = (bank) => {
    if (props?.route?.params?.flag == "confirm") {
      props?.route?.params?.setBankName(bank?.short_name);
      navigation.goBack();
      return;
    }
  };

  return (
    <Screen>
      <LiAHeader
        titleColor={BLACK}
        barStyle={"dark-content"}
        bg={WHITE}
        safeTop
        title={"Danh sách ngân hàng"}
      />
      <View style={styles.inputHeader}>
        <TextInput
          onChangeText={(c) => {
            filterByNames(listBank, c);
          }}
          placeholderTextColor={GREY}
          style={[stylesFont.fontNolan, { flex: 1, paddingVertical: 0 }]}
          placeholder={"Tìm kiếm ngân hàng"}
        />
        <Image
          style={[sizeIcon.sm]}
          source={require("../../Icon/search_grey.png")}
        />
      </View>
      <ScrollView>
        {!isEmpty(listBankAfterFilter) ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: _moderateScale(8 * 3),
            }}
          >
            {listBankAfterFilter?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    _handleChoiceBank(item);
                  }}
                  key={item?.id}
                  style={{
                    marginHorizontal: _moderateScale(8),
                    width: _widthScale(100),
                    alignItems: "center",
                    marginBottom: _moderateScale(8 * 4),
                  }}
                >
                  <View style={styles.btnBank}>
                    <Image
                      style={styles.logoBank}
                      source={{ uri: `${item?.logo}` }}
                    />
                  </View>
                  <Text
                    style={[
                      stylesFont.fontNolan500,
                      { fontSize: _moderateScale(12), alignSelf: "center" },
                    ]}
                    numberOfLines={1}
                  >
                    {item?.short_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: _moderateScale(8 * 3),
            }}
          >
            {listBank?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    _handleChoiceBank(item);
                  }}
                  key={item?.id}
                  style={{
                    marginHorizontal: _moderateScale(8),
                    width: _widthScale(100),
                    alignItems: "center",
                    marginBottom: _moderateScale(8 * 4),
                  }}
                >
                  <View style={styles.btnBank}>
                    <Image
                      style={styles.logoBank}
                      source={{ uri: `${item?.logo}` }}
                    />
                  </View>
                  <Text
                    style={[
                      stylesFont.fontNolan500,
                      { fontSize: _moderateScale(12), alignSelf: "center" },
                    ]}
                    numberOfLines={1}
                  >
                    {item?.short_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

export default ListBank;

const styles = StyleSheet.create({
  btnBank: {
    backgroundColor: BG_GREY_OPACITY_2,
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    borderRadius: _moderateScale((8 * 8) / 2),
    justifyContent: "center",
    alignItems: "center",
  },
  logoBank: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    resizeMode: "contain",
  },
  inputHeader: {
    marginHorizontal: _moderateScale(8 * 3),
    marginTop: _moderateScale(8),
    backgroundColor: "rgba(244, 244, 244,0.7)",
    borderRadius: _moderateScale(8),
    paddingVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    fontSize: _moderateScale(14),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_2,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
