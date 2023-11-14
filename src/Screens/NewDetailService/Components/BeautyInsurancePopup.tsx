import Column from "@Components/Column";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text, { FONT_WEIGHTS } from "@Components/Text";
import { BASE_COLOR, WHITE } from "@Constant/Color";
import { _height, _heightScale, _moderateScale, _width } from "@Constant/Scale";
import React, { useState } from "react";
import { StyleSheet, Platform, Pressable } from "react-native";
import Modal from "react-native-modal";
import { TabBar, TabView } from "react-native-tab-view";

const routes = [
  { key: "first", title: "Lợi ích" },
  { key: "second", title: "Yêu cầu bảo hiểm" },
  { key: "third", title: "Điều khoản" },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function BeautyInsurancePopup({ visible, onClose }: Props) {
  const [index, setIndex] = useState(0);

  function renderTabBar(props) {
    return (
      <TabBar
        {...props}
        tabStyle={styles.tabBar}
        indicatorStyle={styles.tabBarIndicator}
        style={styles.tabBarStyle}
        inactiveColor="grey"
        activeColor={BASE_COLOR}
        labelStyle={styles.tabBarLabel}
        gap={0}
      />
    );
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <Text top={8} bottom={8} left={8}>
            Chưa có thông tin Lợi ích
          </Text>
        );
      case "second":
        return (
          <Text top={8} bottom={8} left={8}>
            Chưa có thông tin Yêu cầu bảo hiểm
          </Text>
        );
      case "third":
        return (
          <Text top={8} bottom={8} left={8}>
            Chưa có thông tin Điều khoản
          </Text>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      useNativeDriver={true}
      coverScreen={Platform.OS !== "ios"}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <Column style={styles.content}>
        <Row
          height={40}
          justifyContent="center"
          borderBottomWidth={1}
          borderColor={"#E2E2E0"}
        >
          <Text weight="bold">Bảo hiểm dịch vụ làm đẹp</Text>
          <Pressable onPress={onClose} style={styles.closeIcon}>
            <Icon name="close" color="#D9D9D9" size={20} />
          </Pressable>
        </Row>
        <TabView
          renderTabBar={renderTabBar}
          swipeEnabled={true}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          lazy
        />
      </Column>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  content: {
    width: _width,
    height: _heightScale((_height * 2) / 3),
    backgroundColor: WHITE,
    borderTopLeftRadius: _moderateScale(8 * 2),
    borderTopRightRadius: _moderateScale(8 * 2),
    paddingBottom: _moderateScale(8 * 4),
  },
  closeIcon: {
    position: "absolute",
    right: 20,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomWidth: 0,
  },
  tabBarIndicator: { backgroundColor: BASE_COLOR },
  tabBarStyle: {
    backgroundColor: WHITE,
    elevation: 0,
    zIndex: 0,
    shadowColor: "transparent",
  },
  tabBarLabel: {
    fontFamily: FONT_WEIGHTS["bold"],
    fontWeight: Platform.OS === "ios" ? "bold" : undefined,
    fontSize: 14,
    textTransform: "none",
  },
});
