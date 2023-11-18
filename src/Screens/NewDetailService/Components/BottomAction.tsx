import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { _moderateScale, _width } from "../../../Constant/Scale";
import IconCalendar from "../../../SGV/calendar.svg";
import IconChatWhite from "../../../SGV/chatWhite.svg";
import IconPhoneWhite from "../../../SGV/phoneWhite.svg";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { Service } from "@typings/serviceGroup";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

type Props = {
  service?: Service;
};

const BottomAction = ({ service }: Props) => {

  const { navigate } = useNavigate()

  const handleBooking = useRequireLoginCallback(() => {
    navigate(ScreenKey.CREATE_BOOKING)();
  }, [service]);

  const handlePhonePress = useCallback(() => { }, [service]);

  const handleChatPress = useRequireLoginCallback(() => { }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleBooking} style={styles.bookingBtn}>
          <IconCalendar
            height={_moderateScale(8 * 3)}
            width={_moderateScale(8 * 3)}
          />
          <Text size={12} weight="bold" top={4}>
            Đặt Hẹn
          </Text>
        </TouchableOpacity>

        <Row gap={16}>
          <TouchableOpacity style={styles.phoneBtn} onPress={handlePhonePress}>
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
    alignItems: "center",
  },
  phoneBtn: {
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
