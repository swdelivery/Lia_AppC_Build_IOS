import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import Screen from "@Components/Screen";
import Placeholder from "@Screens/NewDetailService/Components/Placeholder";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Banner from "./components/Banner";
import FundInfo from "./components/FundInfo";
import DonationInfo from "./components/DonationInfo";
import CoFounders from "./components/CoFounders";
import Button from "@Components/Button/Button";
import Row from "@Components/Row";
import { NEW_BASE_COLOR } from "@Constant/Color";
import { FocusAwareStatusBar } from "@Components/StatusBar";

type Props = {};

export default function CharityFundDetails({ }: Props) {
  return (
    <Screen safeBottom>
      <FocusAwareStatusBar barStyle="dark-content" />
      <AfterTimeoutFragment placeholder={<Placeholder />} timeout={500}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Banner />
          <FundInfo />
          <DonationInfo />
          <CoFounders />
        </ScrollView>
        <Row paddingHorizontal={16} paddingVertical={8} gap={8}>
          <Button.Outline
            flex={1}
            title="Đồng hành"
            borderColor={NEW_BASE_COLOR}
            titleColor={NEW_BASE_COLOR}
            titleSize={16}
            height={40}
            borderRadius={12}
          />
          <Button.Gradient
            title="Ủng hộ"
            titleSize={16}
            height={40}
            flex={1}
            borderRadius={12}
            horizontal
            colors={["#1a3e67", "#34759b"]}
          />
        </Row>
      </AfterTimeoutFragment>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#F7F8FA",
  },
  contentContainer: {
    paddingBottom: 60,
  },
});
