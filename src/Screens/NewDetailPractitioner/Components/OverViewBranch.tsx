import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import { Branch } from "@typings/branch";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Certificate from "@Components/Certificate/Certificate";
import { styleElement } from "@Constant/StyleElement";
import Icon from "@Components/Icon";
import useBranchDetailsNavigation from "src/Hooks/navigation/useBranchDetailsNavigation";

type Props = {
  branch: Branch;
};
const OverViewBranch = ({ branch }: Props) => {
  const handlePress = useBranchDetailsNavigation();

  const handleBranchPress = useCallback(() => {
    handlePress(branch);
  }, [branch]);

  return (
    <View style={styles.container}>
      <Text weight="bold">Địa điểm công tác</Text>
      <Row marginTop={8} gap={8}>
        <Image style={styles.avatarBranch} avatar={branch?.avatar} />
        <View style={styleElement.flex}>
          <Text style={styles.name}>{branch?.name}</Text>
          <CountStar2 rating={5} count={branch?.reviewCount} />
          {branch?.branchFileArr && (
            <Row flexWrap="wrap">
              {branch.branchFileArr.map((item) => {
                return <Certificate item={item} key={item._id} />;
              })}
            </Row>
          )}
        </View>
        <TouchableOpacity onPress={handleBranchPress} style={styles.button}>
          <Text weight="bold" color="white" size={12}>
            {`Chi tiết`}
          </Text>
          <Icon name="chevron-right" size={14} color="white" />
        </TouchableOpacity>
      </Row>
    </View>
  );
};

export default OverViewBranch;

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
    width: _width,
    paddingVertical: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 2),
    alignSelf: "center",
    backgroundColor: "white",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4BA888",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2,
  },
});
