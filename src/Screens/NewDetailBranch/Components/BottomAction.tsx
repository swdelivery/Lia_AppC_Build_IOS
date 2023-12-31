import React, { memo, useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { _moderateScale, _width } from "../../../Constant/Scale";
import IconCalendar from "../../../SGV/calendar.svg";
import IconChatWhite from "../../../SGV/chatWhite.svg";
import IconPhoneWhite from "../../../SGV/phoneWhite.svg";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUserReducer } from "@Redux/Selectors";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import { useNavigation } from "@react-navigation/native";
import ScreenKey from "@Navigation/ScreenKey";
import { useFocused } from "src/Hooks/useNavigation";
import { getBranchDetailsState } from "@Redux/branch/selectors";
import Row from "@Components/Row";
import linking from "src/utils/linking";
import Text from "@Components/Text";

const BottomAction = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data } = useSelector(getBranchDetailsState);

  const handleBooking = useRequireLoginCallback(() => {
    // navigation.navigate(ScreenKey.CREATE_BOOKING, {
    //   //   choiceBranch: currentBranch,
    // });
    navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, {
      infoBranch: data,
      branchCode: data?.code,
      refCode: "",
    });
  }, [data]);

  const handlePhonePress = useCallback(() => {
    linking.openPhone(data.phone);
  }, [data]);

  const handleChatPress = useRequireLoginCallback(() => {
    //
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handleBooking}
        >
          <IconCalendar
            height={_moderateScale(8 * 3)}
            width={_moderateScale(8 * 3)}
          />
          <Text size={12} weight="bold" top={4}>
            Đặt Hẹn
          </Text>
        </TouchableOpacity>

        <Row gap={16}>
          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={handlePhonePress}
          >
            <IconPhoneWhite
              height={_moderateScale(8 * 3)}
              width={_moderateScale(8 * 3)}
            />
            <Text style={styles.bookingBtn__text}>Liên Hệ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatBtn} onPress={handleChatPress}>
            <IconChatWhite
              height={_moderateScale(8 * 3)}
              width={_moderateScale(8 * 3)}
            />
            <Text style={styles.chatBtn__text}>Trò Chuyện</Text>
          </TouchableOpacity>
        </Row>
      </View>
    </View>
  );
};

export default BottomAction;

const styles = StyleSheet.create({
  chatBtn__text: {
    fontSize: _moderateScale(14),
    color: "white",
    fontWeight: "bold",
  },
  chatBtn: {
    width: _moderateScale(8 * 16),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale(8 * 2),
    alignItems: "center",
    justifyContent: "center",
    // borderColor: '#1E463E',
    backgroundColor: "#876947",
    flexDirection: "row",
    gap: 8,
  },
  bookingBtn__text: {
    fontSize: _moderateScale(14),
    color: "white",
    fontWeight: "bold",
  },
  bookingBtn: {
    width: _moderateScale(8 * 15),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale(8 * 2),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#1E463E",
    backgroundColor: "#B99A60",
    flexDirection: "row",
    gap: 8,
  },
  care: {
    width: _moderateScale(8 * 3),
    height: _moderateScale(8 * 3),
  },
  container: {
    width: _width,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderColor: "rgba(0,0,0,.2)",
    paddingVertical: 8,
  },
  content: {
    width: _width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8 * 3),
    justifyContent: "space-between",
  },
});
