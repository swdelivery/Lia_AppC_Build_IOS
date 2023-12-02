import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR } from "@Constant/Color";
import { AIMessage } from "@typings/aichat";
import moment from "moment";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import TextMessage from "./TextMessage";

type Props = {
  item: AIMessage;
  isMyMessage?: boolean;
};


export default function MessageContent({ item, isMyMessage = false }: Props) {

  function renderContent() {
    if (item.content) {
      return <TextMessage item={item} />;
    }
  }
  return (
    <>
      {
        (item?.role == 'assistant' && item?.isTemp) ?
          <Row>
            {renderContent()}
            <ActivityIndicator
              color={BASE_COLOR}
              style={{ paddingRight: 8 }}
              size="small" />
          </Row>
          :
          renderContent()
      }
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
    </>
  );
}

const styles = StyleSheet.create({
  time: {
    textAlign: "right",
  },
});
