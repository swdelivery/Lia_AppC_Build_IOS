import Text from "@Components/Text";
import { getBranchsByResEye } from "@Redux/resultcanningeyes/actions";
import { getBranchByResScanningListState } from "@Redux/resultcanningeyes/selectors";
import BranchItem from "@Screens/SoYoungBranch/components/BranchItem";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { GREY_FOR_TITLE, NEW_BASE_COLOR } from "../../../Constant/Color";
import { _moderateScale } from "../../../Constant/Scale";
import Row from "@Components/Row";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import Icon from "@Components/Icon";

const RecomendBrach = () => {
  const { navigate } = useNavigate();
  const dispatch = useDispatch();
  const { dataBranchs } = useSelector(getBranchByResScanningListState);

  useEffect(() => {
    requestAnimationFrame(() => {
      dispatch(getBranchsByResEye.request({}));
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.child}>
        <LinearGradient
          style={[StyleSheet.absoluteFill, styles.linear]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#C4E5FC", "white"]}
        />
        <Row margin={8 * 2} justifyContent="space-between">
          <Text weight="bold" color={GREY_FOR_TITLE}>
            PHÒNG KHÁM
          </Text>
          <Row onPress={navigate(ScreenKey.BRANCH_LIST)}>
            <Text color={NEW_BASE_COLOR}>{"Xem thêm"}</Text>
            <Icon name="chevron-right" />
          </Row>
        </Row>
        <View style={{ alignItems: "center" }}>
          {dataBranchs
            ?.filter((item) => item.isActive)
            .map((item, index) => {
              return <BranchItem item={item} key={item?._id} />;
            })}
        </View>
      </View>
    </View>
  );
};

export default RecomendBrach;

const styles = StyleSheet.create({
  linear: {
    zIndex: -1,
    borderTopStartRadius: _moderateScale(8),
    borderTopEndRadius: _moderateScale(8),
  },
  child: {
    width: "100%",
    borderTopStartRadius: _moderateScale(8),
    borderTopEndRadius: _moderateScale(8),
  },
  main: {
    paddingHorizontal: _moderateScale(4),
    marginTop: _moderateScale(4),
  },
});
