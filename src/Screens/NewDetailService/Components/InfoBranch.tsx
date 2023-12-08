import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import { Certificates } from "@Components/Certificate/Certificate";
import Row from "@Components/Row";
import Icon from "@Components/Icon";
import Separator from "@Components/Separator/Separator";
import { ScrollView } from "react-native-gesture-handler";
import Column from "@Components/Column";
import Image from "@Components/Image";
import { GREY } from "@Constant/Color";
import Avatar from "@Components/Avatar";
import { Service } from "@typings/serviceGroup";
import { Doctor } from "@typings/doctor";
import useBranchDetailsNavigation from "src/Hooks/navigation/useBranchDetailsNavigation";
import useDoctorDetailsNavigation from "src/Hooks/navigation/useDoctorDetailsNavigation";
import { Branch } from "@typings/branch";

type Props = {
  service: Service;
};

const InfoBranch = ({ service }: Props) => {
  const handlePress = useBranchDetailsNavigation();
  const handleDoctorPress = useDoctorDetailsNavigation();

  const branches = useMemo(() => {
    return (service?.branchServices || []).map((item) => item.branch);
  }, [service]);

  const _handleGoDetailBranch = useCallback(
    (item: Branch) => () => {
      handlePress(item);
    },
    []
  );

  const _handleGoDetailDoctor = useCallback(
    (doctor: Doctor) => () => {
      handleDoctorPress(doctor);
    },
    [handleDoctorPress]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        scrollEnabled={branches.length > 1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.branchesContainer}
      >
        {branches.map((item) => {
          return (
            <Row
              alignItems="flex-start"
              width={branches.length > 1 ? _width * 0.8 : _width - 16 * 3}
              backgroundColor={branches.length > 1 ? "#F7F8FA" : "white"}
              borderRadius={8}
              padding={branches.length > 1 ? 4 : 0}
              key={item?._id}
            >
              <Avatar style={styles.avatarBranch} avatar={item?.avatar} />
              <Column flex={1} marginLeft={_moderateScale(8)} marginBottom={8}>
                <Row alignItems="flex-start">
                  <Column flex={1}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <CountStar2
                      count={item?.reviewCount}
                      rating={item.averageRating}
                      size={10}
                    />
                  </Column>
                  <TouchableOpacity
                    onPress={_handleGoDetailBranch(item)}
                    style={styles.more}
                  >
                    <Text weight="bold" size={12} color={"white"} bottom={3}>
                      {`Xem thêm`}
                    </Text>
                    <Icon name="chevron-right" size={14} color={"white"} />
                  </TouchableOpacity>
                </Row>
                <Certificates data={item?.branchFileArr} />
              </Column>
            </Row>
          );
        })}
      </ScrollView>

      <Separator color="#dcdedc" top={8} bottom={16} />

      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {service?.doctorServices?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={_handleGoDetailDoctor(item.treatmentDoctor)}
              key={index}
              style={styles.doctorCard}
            >
              <Image
                style={styles.avatarDoctor}
                avatar={item?.treatmentDoctor?.avatar}
              />
              <Column maxWidth={_widthScale(200)} marginRight={8} flex={1}>
                <Text weight="bold">{item?.treatmentDoctor?.name}</Text>
                <Text size={12} color={"grey"} numberOfLines={2}>
                  {item?.treatmentDoctor?.description}
                </Text>
              </Column>

              <TouchableOpacity onPress={() => {}}>
                <Icon name="message-text-outline" size={22} color={GREY} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default InfoBranch;

const styles = StyleSheet.create({
  iconChat: {
    width: _moderateScale(8 * 2),
    height: _moderateScale(8 * 2),
  },
  avatarDoctor: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
  },
  doctorCard: {
    minWidth: _widthScale(200),
    borderRadius: _moderateScale(8),
    marginRight: _moderateScale(8),
    backgroundColor: "#F7F8FA",
    flexDirection: "row",
    paddingVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8),
    gap: 8,
  },
  name: {
    fontSize: _moderateScale(14),
    fontWeight: "bold",
  },
  avatarBranch: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
    resizeMode: "contain",
  },
  container: {
    width: _widthScale(360),
    paddingVertical: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 2),
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: _moderateScale(8),
    marginTop: _moderateScale(8),
  },
  more: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4BA888",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2,
  },
  branchesContainer: {
    gap: 8,
    paddingBottom: 4,
  },
});
