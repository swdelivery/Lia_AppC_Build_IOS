import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  _heightScale,
  _moderateScale,
  _width,
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

const WIDTH_ITEM = (_width - _widthScale(16) * 2) / 5

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

  const _handleGoCategory = useCallback((item) => {
    navigation.navigate(ScreenKey.NEW_CATEGORY, { parentCodeParam: item });
  }, []);

  const _renderItem = useCallback(({ item, index }) => {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => _handleGoCategory(item)}
        style={styles.itemContainer}
      >
        <Image
          style={styles.item__option}
          avatar={item?.fileAvatar}
          placeholderColors={["white", "white"]}
        />
        <Text color={WHITE} weight="bold" size={12}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }, [])

  return (
    // <FlatList
    //   horizontal
    //   numColumns={2}
    //   renderItem={_renderItem}
    //   data={data} />
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
            onPress={() => _handleGoCategory(item)}
            style={styles.itemContainer}
          >
            <Image
              style={styles.item__option}
              avatar={item?.fileAvatar}
              placeholderColors={["white", "white"]}
            />
            <Text color={WHITE} weight="bold" size={12}>
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
    // justifyContent: "space-between",
    paddingVertical: 8,
    width: _width - _widthScale(16) * 2,
  },
  item__option: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  itemContainer: {
    alignItems: "center",
    width: WIDTH_ITEM,
    marginTop: 4,
    // backgroundColor: "white",
  },
});

export default OptionService;
