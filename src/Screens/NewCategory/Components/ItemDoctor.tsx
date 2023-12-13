import Avatar from "@Components/Avatar";
import { Certificates } from "@Components/Certificate/Certificate";
import Column from "@Components/Column";
import HorizontalServices from "@Components/HorizontalServices";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BORDER_COLOR } from "@Constant/Color";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import { startChat } from "@Redux/chat/actions";
import { Doctor } from "@typings/doctor";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import { LocationIcon } from "src/SGV";

type Props = {
  data: Doctor
};

const ItemDoctor = ({ data }: Props) => {

  const { navigation } = useNavigate();
  const dispatch = useDispatch();

  const {
    userId,
    avatar,
    name,
    reviewCount,
    countPartner,
    branch,
    treatmentDoctorFileArr,
    doctorServices
  } = data

  const handleItemPress = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_DOCTOR, { doctor: data });
  }, [data]);

  const handleStartChat = useRequireLoginCallback(async () => {
    dispatch(
      startChat.request({
        type: "treatment",
        doctorId: userId,
      })
    );
  }, []);

  return (
    <Column
      style={[styles.card]}>
      <Row alignItems="flex-start" gap={8} marginBottom={8}>
        <Avatar size={48} avatar={avatar} circle />
        <Column style={styleElement.flex}>
          <Row justifyContent="space-between">
            <Column>
              <Text numberOfLines={1} weight="bold">
                {name}
              </Text>
              <CountStar2
                rating={4}
                count={reviewCount}
                size={12}
                countPartner={countPartner}
              />
            </Column>

            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={handleStartChat}
              style={styles.consultButton}>
              <Text size={12} weight="bold" color={"white"}>
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>

          <Row gap={4} marginTop={2}>
            <LocationIcon />
            <Text size={12} color={"grey"}>
              {branch?.name}
            </Text>
          </Row>
          <Certificates data={treatmentDoctorFileArr} />
        </Column>
      </Row>
      {doctorServices.length > 0 && (
        <HorizontalServices items={doctorServices} />
      )}
    </Column>
  )
}

export default ItemDoctor


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
    // width: _width - 8 * 2,
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
