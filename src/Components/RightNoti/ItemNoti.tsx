import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "@Components/Text";
import { PartnerNoti } from "@typings/partnerNotification";
import Column from "@Components/Column";
import { BLACK, BORDER_COLOR, GREY, GREY_FOR_TITLE } from "@Constant/Color";
import moment from "moment";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { navigation } from "rootNavigation";

type Props = {
  data: PartnerNoti;
  onClose: () => void;
};

const ItemNoti = ({ data, onClose }: Props) => {
  const { content, created, event, seenAt, entityId } = data;

  const _renderTitle = (event) => {
    switch (event) {
      case "CREATE_PARTNER_NOTIFICATION_REVIEW":
        return `Thưởng đánh giá dịch vụ`;
      case "HANDLED_COLLABORATOR_REQUEST":
        return `Cộng tác viên`;
      case "LIA_REFUND_BONUS":
        return `Thu hồi vé `;
      case "LIA_BONUS":
        return `Quà tặng`;
      case "REMIND_MEDICAL":
      case "TAKE_MEDICINES":
        return `Nhắc nhở uống thuốc`;
      case "ADD_PARTNER_POST_COMMENT":
        return `Bình luận mới`;
      case "CALL_TREATMENT_QUEUE":
        return `Gọi điều trị`;
      case "CALL_QUEUE_CONSULTATION":
        return `Gọi tư vấn`;
      case "ADD_BOOKING":
        return `Đặt lịch thành công`;
      case "REMIND_UPCOMING_BOOKING_BEFORE":
      case "UPCOMING_BOOKING_BEFORE_FIVE_DAY":
      case "UPCOMING_BOOKING_BEFORE_ONE_DAY":
        return `Đặt hẹn sắp diễn ra`;
      case "LATE_BOOKING_TIME":
        return `Thông báo trễ hẹn`;
      case "HAVE_COME_BOOKING_TIME":
        return `Thông báo đến giờ hẹn`;
      case "UPCOMING_BOOKING_TIME":
        return `Thông báo sắp đến giờ hẹn`;
      case "CHECK_IN_BOOKING":
        return `CheckIn thành công`;
      case "CHECK_OUT_BOOKING":
        return `CheckOut thành công`;
      case "WAS_CONSULTED_BOOKING":
        return "Tư vấn thành công";
      case "COMPLETE_TREATMENT":
        return "Hoàn thành điều trị";
      case "UPDATE_POSTOPERATIVE":
        return "Chăm sóc hậu phẫu";
      case "HANDLED_PAYMENT_REQUEST":
        return `Yêu cầu cọc`;
      case "HANDLED_DONATE_VOLUNTEER_REQUEST":
        return `Yêu cầu ủng hộ`;
      case "HANDLED_ACCEPT_DONATE_VOLUNTEER_REQUEST":
        return "Ủng hộ thành công";
      case "PERSONAL_HYGIENE":
        return "Nhắc nhở";
      case "HANDLED_DELETE_PARTNER_POST_COMMENT":
        return "Xóa bình luận";
      case "CREATE_PARTNER_NOTIFICATION_CAMPAIGN":
        return "Tạo campaign";
      default:
        return `Nhắc nhở`;
    }
  };

  const _handlePress = () => {
    onClose();

    switch (event) {
      case "ADD_PARTNER_POST_COMMENT":
        return navigation.navigate(ScreenKey.LIST_COMMENTS, {
          _idPost: entityId,
        });
      default:
        return;
    }
  };

  return (
    <TouchableOpacity onPress={_handlePress}>
      <Column
        backgroundColor={seenAt ? "transparent" : "#E9F3FE"}
        gap={4}
        borderBottomWidth={1}
        borderColor={BORDER_COLOR}
        padding={8 * 2}
      >
        <Text weight="bold" color={BLACK}>
          {_renderTitle(event)}
        </Text>

        <Text>{content}</Text>

        <Text fontStyle="italic" color={GREY} size={12}>
          {moment(created).startOf("minute").fromNow()}
        </Text>
      </Column>
    </TouchableOpacity>
  );
};

export default ItemNoti;

const styles = StyleSheet.create({});
