import { Message } from "@typings/chat";
import React from "react";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";
import Text from "@Components/Text";
import { GREY, RECEIVER_BG, SENDER_BG } from "@Constant/Color";
import VideoMessage from "./VideoMessage";
import { StyleSheet } from "react-native";
import moment from "moment";
import ServiceReviewMessage from "./ServiceReviewMessage";

type Props = {
  item: Message;
  isMyMessage?: boolean;
};

export default function MessageContent({ item, isMyMessage = false }: Props) {
  function renderContent() {
    if (item.type === "template") {
      console.log({ template: item?.template });

      switch (item?.template?.type) {
        case "SERVICE_REVIEW":
        case "REVIEW_DETAIL":
        case "TREATMENT_DETAIL":
          return <ServiceReviewMessage item={item} />;

        // case "SERVICE":
        //   return <ItemTemplateService item={item} index={index} />;
        // case "NEWS":
        //   return <ItemTemplateNews item={item} index={index} />;
        // case "BOOKING":
        //   return <ItemNavigateBooking item={item} index={index} />;
        // case "COLLABORATOR":
        //   return <ItemNavigateCTV item={item} index={index} />;
        // case "SPIN_WHEEL":
        //   return <ItemNavigateSpinWheel item={item} index={index} />;

        default:
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
