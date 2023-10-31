import React, { memo, useCallback, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../../Constant/Scale";
import { useDispatch, useSelector } from "react-redux";
import { URL_ORIGINAL } from "../../../Constant/Url";
import { navigation } from "../../../../rootNavigation";
import { stylesFont } from "../../../Constant/Font";
import ScreenKey from "../../../Navigation/ScreenKey";
import { getServiceGroup } from "@Redux/home/actions";
import { getServiceGroupState } from "@Redux/home/selectors";

const OptionService = memo(() => {
  const { data } = useSelector(getServiceGroupState);
  const dispatch = useDispatch();

  useEffect(() => {
    _getData();
  }, []);

  const _getData = useCallback(() => {
    const condition = {
      condition: {
        parentCode: {
          equal: null,
        },
      },
      sort: {
        orderNumber: -1,
      },
      limit: 100,
      page: 1,
    };

    dispatch(getServiceGroup.request(condition));
  }, []);

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              navigation.navigate(ScreenKey.LIST_SERVICE, {
                currServiceGr: item,
              });
            }}
            style={{
              alignItems: "center",
              width: _widthScale(65),
              marginTop: _moderateScale(4),
            }}
          >
            <View style={styles.item__option}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }}
              />
            </View>
            <Text
              style={[
                stylesFont.fontNolan500,
                {
                  fontSize: _moderateScale(12),
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginHorizontal: 12,
  },
  item__option: {
    width: _widthScale(8 * 5),
    height: _widthScale(8 * 5),
    borderRadius: _widthScale((8 * 5) / 2),
  },
});

export default OptionService;
