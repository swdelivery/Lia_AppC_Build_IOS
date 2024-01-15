import Avatar from "@Components/Avatar";
import Certificate, { Certificates } from "@Components/Certificate/Certificate";
import HorizontalServices from "@Components/HorizontalServices";
import Icon from "@Components/Icon";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, RED } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import { Doctor } from "@typings/doctor";
import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigate } from "src/Hooks/useNavigation";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import Column from "@Components/Column";
import { LocationIcon } from "src/SGV";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import { useDispatch } from "react-redux";
import { startChat } from "@Redux/chat/actions";
import { StyleProp } from "react-native";

type Props = {
  item: Doctor;
  styleContainer?: StyleProp<ViewStyle>;
};

function DoctorItem({ item, styleContainer }: Props) {
  const { navigation } = useNavigate();
  const dispatch = useDispatch();

  const services = useMemo(() => {
    return item.doctorServices
      .filter((i) => i.service && i.service.isActive && i.service.isDisplayed)
      .slice(0, 5);
  }, [item]);

  const handleItemPress = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_DOCTOR, { doctor: item });
  }, [item]);

  const handleStartChat = useRequireLoginCallback(async () => {
    dispatch(
      startChat.request({
        type: "treatment",
        doctorId: item?.userId,
      })
    );
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleItemPress}
      style={[styles.card, styleElement.shadow, styleContainer]}
    >
      <Row alignItems="flex-start" gap={8} marginBottom={8}>
        <Avatar size={48} avatar={item.avatar} circle />
        <Column style={styleElement.flex}>
          <Row justifyContent="space-between">
            <Column>
              <Text numberOfLines={1} weight="bold">
                {item?.name}
              </Text>
              <CountStar2
                rating={4}
                count={item?.reviewCount}
                size={12}
                countPartner={item?.countPartner}
              />
            </Column>

            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={handleStartChat}
              style={styles.consultButton}
            >
              <Text size={12} weight="bold" color={"white"}>
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>

          <Row gap={4} marginTop={2}>
            <LocationIcon />
            <Text size={12} color={"grey"}>
              {item?.branch?.name}
            </Text>
          </Row>
          <Certificates data={item.treatmentDoctorFileArr} />
        </Column>
      </Row>
      {item.doctorServices.length > 0 && (
        <HorizontalServices items={services} />
      )}
    </TouchableOpacity>
  );
}

export const PLACEHOLDER_HEIGHT = 200;

export function Placeholder() {
  return (
    <View style={[styles.container, styles.placeholderItem]}>
      <ContentLoader>
        <Circle x="20" y="20" r="20" />
        <Rect x="60" y="0" rx="4" ry="4" width="80" height="13" />
        <Rect x="60" y="20" rx="3" ry="3" width="100%" height="15" />
        <Rect x="60" y="40" rx="3" ry="3" width="100" height="12" />
        <Rect x="0" y="60" rx="3" ry="3" width="100%" height="120" />
      </ContentLoader>
    </View>
  );
}

export default React.memo(DoctorItem);

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  start2: {
    width: 8 * 1,
    height: 8 * 1,
    marginLeft: 1,
    resizeMode: "contain",
  },
  card: {
    width: _width - 8 * 2,
    paddingVertical: 8,
    paddingHorizontal: 8 * 1,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  consultButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BASE_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2,
  },
  placeholderItem: {
    height: PLACEHOLDER_HEIGHT,
    borderWidth: 0,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
