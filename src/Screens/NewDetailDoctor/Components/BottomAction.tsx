import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { _moderateScale, _width } from "../../../Constant/Scale";
import ScreenKey from "@Navigation/ScreenKey";
import { Doctor } from "@typings/doctor";
import Text from "@Components/Text";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import Row from "@Components/Row";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Column from "@Components/Column";
import { useNavigate } from "src/Hooks/useNavigation";
import { useDispatch } from "react-redux";
import { startChat } from "@Redux/chat/actions";
import { BASE_COLOR } from "@Constant/Color";

type Props = {
  doctor: Doctor;
};
const BottomAction = ({ doctor }: Props) => {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { navigation } = useNavigate();

  const handleBooking = useRequireLoginCallback(() => {
    navigation.navigate(ScreenKey.CREATE_BOOKING, {
      doctor,
      branch: doctor.branch,
    });
  }, []);

  const handleStartChat = useRequireLoginCallback(async () => {
    dispatch(
      startChat.request({
        type: "treatment",
        doctorId: doctor?.userId,
      })
    );
  }, []);

  return (
    <Column style={styles.container} paddingBottom={bottom}>
      <View
        style={{
          width: _width,
          height: _moderateScale(8 * 8),
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: _moderateScale(8 * 3),
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Tính năng đang phát triển");
          }}
          style={{ alignItems: "center" }}
        >
          <Image
            style={styles.care}
            source={require("../../../Image/care.png")}
          />
          <Text>Yêu cầu tư vấn</Text>
        </TouchableOpacity>

        <Row gap={16}>
          <TouchableOpacity onPress={handleBooking} style={styles.bookingBtn}>
            <Text style={styles.bookingBtn__text}>Đặt Hẹn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStartChat} style={styles.chatBtn}>
            <Text style={styles.chatBtn__text}>Trò Chuyện</Text>
          </TouchableOpacity>
        </Row>
      </View>
    </Column>
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
    width: _moderateScale(8 * 13),
    height: _moderateScale(8 * 5),
    borderWidth: 2,
    borderRadius: _moderateScale(8 * 2),
    alignItems: "center",
    justifyContent: "center",
    borderColor: BASE_COLOR,
    backgroundColor: BASE_COLOR,
  },
  bookingBtn__text: {
    fontSize: _moderateScale(14),
    color: BASE_COLOR,
    fontWeight: "bold",
  },
  bookingBtn: {
    width: _moderateScale(8 * 13),
    height: _moderateScale(8 * 5),
    borderWidth: 1,
    borderRadius: _moderateScale(8 * 2),
    alignItems: "center",
    justifyContent: "center",
    borderColor: BASE_COLOR,
  },
  care: {
    width: _moderateScale(8 * 3),
    height: _moderateScale(8 * 3),
  },
  container: {
    width: _width,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderColor: BASE_COLOR,
  },
});
