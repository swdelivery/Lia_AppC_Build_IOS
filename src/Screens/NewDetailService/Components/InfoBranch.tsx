import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import Certificate from "@Components/Certificate/Certificate";
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

type Props = {
  service: Service;
};

const InfoBranch = ({ service }: Props) => {
  const handlePress = useBranchDetailsNavigation();
  const handleDoctorPress = useDoctorDetailsNavigation();

  const branch = useMemo(() => {
    return (service?.branchServices || [])[0]?.branch;
  }, [service]);

  const _handleGoDetailBranch = useCallback(() => {
    if (!branch) {
      return;
    }
    handlePress(branch);
  }, [branch]);

  const _handleGoDetailDoctor = useCallback(
    (doctor: Doctor) => () => {
      handleDoctorPress(doctor);
    },
    [handleDoctorPress]
  );

  return (
    <View style={styles.container}>
      <Row alignItems="flex-start">
        <Avatar style={styles.avatarBranch} avatar={branch?.avatar} />
        <Column flex={1} marginLeft={_moderateScale(8)}>
          <Text style={styles.name}>{branch?.name}</Text>
          <CountStar2
            count={service?.branchServices[0]?.branch?.reviewCount}
            rating={5}
            size={10}
          />
          {branch?.branchFileArr && (
            <Row flexWrap="wrap" top={4} gap={4}>
              {branch.branchFileArr.map((item) => {
                return <Certificate item={item} key={item._id} />;
              })}
            </Row>
          )}
        </Column>
        <TouchableOpacity onPress={_handleGoDetailBranch} style={styles.more}>
          <Text weight="bold" size={12} color={"white"} bottom={3}>
            {`Xem thêm`}
          </Text>
          <Icon name="chevron-right" size={14} color={"white"} />
        </TouchableOpacity>
      </Row>

      <Separator color="#dcdedc" top={16} bottom={16} />

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
});
