import React, { useState } from "react";
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
import { BASE_COLOR } from "@Constant/Color";
import Toast from "react-native-toast-message";
import ModalPickToppingNew from "@Screens/Booking/bookingForBranch/ModalPickToppingNew";
import { cloneDeep, isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { getPartnerConversationsState } from "@Redux/chat/selectors";

type Props = {
  service?: Service;
};

const BottomAction = ({ service }: Props) => {
  const { navigate, navigation } = useNavigate();
  const { data } = useSelector(getPartnerConversationsState);

  const [showModalPickTopping, setShowModalPickTopping] = useState({
    data: {} as Service,
    isShow: false,
  });

  const handleBooking = useRequireLoginCallback(() => {
    const isOutOfStock =
      service.preferentialInCurrentFlashSale?.limit &&
      service.preferentialInCurrentFlashSale.limit ===
        service.preferentialInCurrentFlashSale.usage;
    if (isOutOfStock) {
      Toast.show({
        type: "error",
        text1: "Dịch vụ đã hết số lượng ưu đãi",
      });
      return;
    }
    if (
      service?.options != null &&
      service?.options?.length > 0 &&
      service?.options?.some(
        (option) => option.data != null && option.data.length > 0
      )
    ) {
      setShowModalPickTopping({
        data: service,
        isShow: true,
      });
    } else {
      navigate(ScreenKey.CREATE_BOOKING, { service })();
    }
  }, [service]);

  const handleChatPress = useRequireLoginCallback(() => {
    const consultantConv = data.find((c) => c.type === "consultation");
    if (consultantConv) {
      navigation.navigate(ScreenKey.CHATTING, {
        conversation: consultantConv,
      });
    }
  }, []);

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
          <TouchableOpacity
            style={styles.phoneBtn}
            onPress={navigate(ScreenKey.ABOUT_LIA)}
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
      <ModalPickToppingNew
        confirm={(currChoice, listTopping) => {
          let options = cloneDeep(service.options);

          for (let i = 0; i < options.length; i++) {
            options[i].data = listTopping.filter(
              (item) => item.groupCode === options[i].groupCode
            );
          }

          let optionsFinal = options.filter((item) => !isEmpty(item.data));
          service.optionsSelected = cloneDeep(optionsFinal);
          navigate(ScreenKey.CREATE_BOOKING, { service: service })();
        }}
        data={showModalPickTopping?.data}
        show={showModalPickTopping?.isShow}
        hide={() => {
          setShowModalPickTopping({
            data: {} as Service,
            isShow: false,
          });
        }}
      />
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
    backgroundColor: BASE_COLOR,
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
    backgroundColor: BASE_COLOR,
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
