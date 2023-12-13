import React, { useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../../Constant/Scale";
import { useDispatch, useSelector } from "react-redux";
import ScreenKey from "../../../Navigation/ScreenKey";
import { getServiceGroup } from "@Redux/home/actions";
import { getServiceGroupState } from "@Redux/home/selectors";
import Image from "@Components/Image";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import LinearGradient from "react-native-linear-gradient";
import { WHITE } from "@Constant/Color";
// import { navigation } from "rootNavigation";

const OptionService = () => {
  const { data } = useSelector(getServiceGroupState);
  const dispatch = useDispatch();
  const { navigate, navigation } = useNavigate();

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

  const _handleGoCategory = useCallback(() => {
    navigation.navigate(ScreenKey.NEW_CATEGORY)
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[StyleSheet.absoluteFill, { borderRadius: 8 }]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={["#f01311", "#861000"]}
      />
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={item._id}
            onPress={_handleGoCategory}
            style={styles.itemContainer}>
            <Image
              style={styles.item__option}
              avatar={item?.fileAvatar}
              placeholderColors={["white", "white"]} />
            <Text
              color={WHITE}
              weight="bold" size={12}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

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
  itemContainer: {
    alignItems: "center",
    width: _widthScale(65),
    marginTop: _moderateScale(4),
    // backgroundColor: "white",
  },
});

export default OptionService;
