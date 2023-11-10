import Avatar from "@Components/Avatar";
import Certificate from "@Components/Certificate/Certificate";
import HorizontalServices from "@Components/HorizontalServices";
import Icon from "@Components/Icon";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import { selectDoctor } from "@Redux/doctor/actions";
import { Doctor } from "@typings/doctor";
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  item: Doctor;
};

export default function DoctorItem({ item }: Props) {
  const { navigation } = useNavigate();
  const dispatch = useDispatch();

  const handleItemPress = useCallback(() => {
    dispatch(selectDoctor(item));
    navigation.navigate(ScreenKey.DETAIL_DOCTOR, { idDoctor: item._id });
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleItemPress}
      style={[styles.card, styleElement.shadow]}
    >
      <Row alignItems="flex-start" gap={8}>
        <Avatar size={48} avatar={item.avatar} circle />
        <View style={styleElement.flex}>
          <Row justifyContent="space-between">
            <Text numberOfLines={1} weight="bold">
              {item?.name}
            </Text>

            <TouchableOpacity style={styles.consultButton}>
              <Text size={12} weight="bold" color={"white"}>
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>

          <Row marginTop={2} gap={8}>
            <CountStar2 rating={4} size={10} />
            <Text size={10}>|</Text>
            <Row gap={4} marginTop={2}>
              <Icon name="account-multiple" size={14} color="grey" />
              <Text size={10}>({item?.countPartner})</Text>
            </Row>
          </Row>

          <Row gap={4}>
            <Icon name="map-marker" color={RED} size={14} />
            <Text size={12} color={"grey"}>
              {item?.branch?.name}
            </Text>
          </Row>
          {item?.treatmentDoctorFileArr.length > 0 && (
            <Row marginTop={8} flexWrap={"wrap"} gap={4} bottom={8}>
              {item.treatmentDoctorFileArr.map((item, i) => (
                <Certificate
                  key={item._id}
                  item={item}
                  backgroundColor={i % 2 === 0 ? "#414378" : "#151617"}
                />
              ))}
            </Row>
          )}
        </View>
      </Row>
      {item.doctorServices.length > 0 && (
        <HorizontalServices items={item.doctorServices} />
      )}
    </TouchableOpacity>
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
    backgroundColor: "#4BA888",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2,
  },
});
