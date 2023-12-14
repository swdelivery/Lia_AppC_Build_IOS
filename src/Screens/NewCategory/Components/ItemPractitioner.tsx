import Avatar from "@Components/Avatar";
import Certificate, { Certificates } from "@Components/Certificate/Certificate";
import Column from "@Components/Column";
import HorizontalServices from "@Components/HorizontalServices";
import Icon from "@Components/Icon";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BORDER_COLOR, RED } from "@Constant/Color";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import { Practitioner } from "@typings/practitioner";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  data: Practitioner;
};

export default function ItemPractitioner({ data }: Props) {
  const { navigation } = useNavigate();

  const {
    avatar,
    name,
    reviewCount,
    countPartner,
    branch,
    practitionerFileArr,
    practitionerServices

  } = data

  const handleItemPress = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_PRACTITIONER, {
      practitioner: data,
    });
  }, [data]);

  return (
    <Column
      style={[styles.card]}>
      <Row alignItems="flex-start" gap={8}>
        <Avatar size={48} avatar={avatar} circle />
        <View style={styleElement.flex}>
          <Row justifyContent="space-between">
            <Column flex={1}>
              <Text size={12} numberOfLines={1} weight="bold">
                {name}
              </Text>
            </Column>

            <TouchableOpacity style={styles.consultButton}>
              <Text size={12} weight="bold" color={"white"}>
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>

          <Row marginTop={2} gap={8}>
            <CountStar2 count={reviewCount} rating={5} size={10} />
            <Text size={10}>|</Text>
            <Row gap={4} marginTop={2}>
              <Icon name="account-multiple" size={14} color="grey" />
              <Text size={10}>({countPartner})</Text>
            </Row>
          </Row>

          <Row gap={4}>
            <Icon name="map-marker" color={RED} size={14} />
            <Text size={12} color={"grey"}>
              {branch?.name}
            </Text>
          </Row>
          <Certificates data={practitionerFileArr} />
        </View>
      </Row>
      {practitionerServices?.length > 0 && (
        <HorizontalServices items={practitionerServices} />
      )}
    </Column>
  );
}


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
    paddingVertical: 8,
    paddingHorizontal: 8 * 1,
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  consultButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4BA888",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2,
  },
});
