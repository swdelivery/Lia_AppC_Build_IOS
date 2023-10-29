import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BASE_COLOR, SECOND_COLOR, WHITE } from "../../../Constant/Color";
import { _moderateScale } from "../../../Constant/Scale";
import { styleElement } from "../../../Constant/StyleElement";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUserReducer } from "../../../Redux/Selectors";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenKey from "../../../Navigation/ScreenKey";
import * as ActionType from "../../../Redux/Constants/ActionType";
import { URL_ORIGINAL } from "../../../Constant/Url";
import AlarmNotifi from "../../../Components/AlarmNotifi/AlarmNotifi";
import { sizeIcon } from "../../../Constant/Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { stylesFont } from "../../../Constant/Font";

type Props = {};

export default function Header({}: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { infoUser } = useSelector(getInfoUserReducer);
  const { top } = useSafeAreaInsets();

  const route = useRoute();

  const contentStyle = useMemo(() => {
    return {
      paddingTop: top + 8,
    };
  }, [top]);

  const handleProfilePress = useCallback(() => {
    if (!infoUser?._id) {
      dispatch({
        type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
        payload: {
          flag: true,
          currRouteName: route?.name,
        },
      });
      return;
    }
    navigation.navigate(ScreenKey.MY_PERSONAL_PAGE);
  }, [route, infoUser]);

  const handleCreateNewFeed = useCallback(() => {
    if (!infoUser?._id) {
      dispatch({
        type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
        payload: {
          flag: true,
          currRouteName: route?.name,
        },
      });
      return;
    }
    navigation.navigate(ScreenKey.CREATE_NEW_FEED);
  }, [route, infoUser]);

  const handleSearchNewFeed = useCallback(() => {
    navigation.navigate(ScreenKey.SEARCH_NEW_FEED);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.6, 1]}
        colors={[BASE_COLOR, "#8c104e", "#db0505"]}
        style={styles.linear}
      />

      <View style={[styleElement.rowAliCenter, styles.content, contentStyle]}>
        <View style={[styleElement.rowAliCenter, styleElement.flex]}>
          <TouchableOpacity
            onPress={handleProfilePress}
            style={styles.profileButton}
          >
            <Image
              style={styles.profileImage}
              source={{
                uri: `${URL_ORIGINAL}${infoUser?.fileAvatar?.link}`,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCreateNewFeed}
            style={[styleElement.rowAliCenter, styles.createNewFeed]}
          >
            <Text style={[stylesFont.fontNolan500, styles.createNewFeedText]}>
              Chạm để chia sẻ nhật ký của bạn
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSearchNewFeed}
          style={[styleElement.centerChild, styles.searchButton]}
        >
          <Image
            style={sizeIcon.lg}
            source={require("../../../NewIcon/searchLinear.png")}
          />
        </TouchableOpacity>
        <AlarmNotifi />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: BASE_COLOR,
  },
  linear: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  content: {
    justifyContent: "space-between",
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: 8,
  },
  profileButton: { marginLeft: _moderateScale(4) },
  profileImage: {
    width: _moderateScale(8 * 4),
    height: _moderateScale(8 * 4),
    borderRadius: _moderateScale(8 * 2),
    borderWidth: 1,
    borderColor: WHITE,
  },
  createNewFeed: {
    flex: 1,
    height: _moderateScale(8 * 4),
    backgroundColor: SECOND_COLOR,
    paddingHorizontal: _moderateScale(8 * 2),
    borderRadius: _moderateScale(16),
    marginLeft: _moderateScale(8),
    marginRight: _moderateScale(8),
  },
  createNewFeedText: {
    color: WHITE,
    fontSize: _moderateScale(12),
  },
  searchButton: {
    width: _moderateScale(8 * 4),
    height: _moderateScale(8 * 4),
    borderRadius: _moderateScale(4),
    marginRight: _moderateScale(4),
  },
});
