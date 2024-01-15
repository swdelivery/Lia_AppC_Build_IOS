import Column from "@Components/Column";
import Text from "@Components/Text";
import { getDoctorsByResEye } from "@Redux/resultcanningeyes/actions";
import { getDoctorByResScanningListState } from "@Redux/resultcanningeyes/selectors";
import DoctorItem from "@Screens/SoYoungDoctor/components/DoctorItem";
import React, { useEffect, useMemo } from "react";
import { InteractionManager, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NEW_BASE_COLOR } from "../../../Constant/Color";
import { _moderateScale, _width } from "../../../Constant/Scale";
import Row from "@Components/Row";
import Icon from "@Components/Icon";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

const RecomendDoctor = () => {
  const { navigate } = useNavigate();
  const dispatch = useDispatch();
  const { dataDoctors } = useSelector(getDoctorByResScanningListState);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      dispatch(getDoctorsByResEye.request({}));
    });
  }, []);

  const doctors = useMemo(() => {
    if (dataDoctors) {
      return dataDoctors.slice(0, 3);
    }
    return [];
  }, [dataDoctors]);

  return (
    <Column marginHorizontal={16}>
      <Row justifyContent="space-between" marginVertical={16}>
        <Text color={NEW_BASE_COLOR} weight="bold">
          BÁC SĨ / CHUYÊN VIÊN
        </Text>
        <Row onPress={navigate(ScreenKey.DOCTOR_LIST)}>
          <Text color={NEW_BASE_COLOR}>{"Xem thêm"}</Text>
          <Icon name="chevron-right" />
        </Row>
      </Row>
      {doctors.map((item, index) => {
        return (
          <DoctorItem
            key={item?._id}
            item={item}
            styleContainer={styles.doctor}
          />
        );
      })}
    </Column>
  );
};

export default RecomendDoctor;

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
  main: { marginTop: _moderateScale(4) },
  doctor: {
    width: _width - 32,
  },
});
