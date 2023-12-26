import { Message } from "@typings/chat";
import React from "react";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";
import Text from "@Components/Text";
import { GREY } from "@Constant/Color";
import VideoMessage from "./VideoMessage";
import { StyleSheet } from "react-native";
import moment from "moment";
import TemplateReviewMessage from "./TemplateReviewMessage";
import TemplateService from "./TemplateService";
import TemplateNews from "./TemplateNews";
import TemplateOnlyAction from "./TemplateOnlyAction";
import ConsultedMessage from "./ConsultedMessage";
import BookingCreatedMessage from "./BookingCreatedMessage";
import RemindBookingMessage from "./RemindBookingMessage";

type Props = {
  item: Message;
  isMyMessage?: boolean;
};

export default function MessageContent({ item, isMyMessage = false }: Props) {
  function renderContent() {
    if (item.type === "template") {
      switch (item?.template?.type) {
        case "SERVICE_REVIEW":
        case "REVIEW_DETAIL":
        case "TREATMENT_DETAIL":
          return <TemplateReviewMessage item={item} />;
        case "SERVICE":
          return <TemplateService item={item} />;
        case "NEWS":
          return <TemplateNews item={item} />;
        case "WAS_CONSULTED":
          return <ConsultedMessage item={item} />;
        case "CREATE_BOOKING":
          return <BookingCreatedMessage item={item} />;
        case "REMIND_BOOKING":
          return <RemindBookingMessage item={item} />;
        case "BOOKING":
        case "COLLABORATOR":
        case "SPIN_WHEEL":
          return <TemplateOnlyAction item={item} />;

        default:
          console.log("template not found", item?.template?.type);
          return null;
      }
    }
    if (!item.isActive) {
      return (
        <Text weight="bold" fontStyle="italic" color={GREY}>
          "Tin nhắn đã thu hồi"
        </Text>
      );
    }
    if (item.type === "image") {
      return <ImageMessage item={item} />;
    }
    if (item.type === "video" || item.type === "document") {
      return <VideoMessage item={item} isMyMessage={isMyMessage} />;
    }
    if (item.content) {
      return <TextMessage item={item} />;
    }
  }

  return (
    <>
      {renderContent()}
      {item.type !== "video" && (
        <Text
          style={styles.time}
          size={10}
          top={5}
          bottom={5}
          right={10}
          color={"#8A8A8E"}
        >
          {moment(item.created).format("HH:mm")}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  time: {
    textAlign: "right",
  },
});
