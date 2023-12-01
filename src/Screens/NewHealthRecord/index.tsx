import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "@Components/Screen";
import Column from "@Components/Column";
import { _moderateScale } from "@Constant/Scale";
import HealthData from "./Components/HealthData";
import Bloods from "./Components/Bloods";
import TallWeight from "./Components/TallWeight";
import CheckList from "./Components/CheckList";
import Other from "./Components/Other";
import ActionButton from "@Components/ActionButton/ActionButton";
import useVisible from "src/Hooks/useVisible";
import ModalScrollPicker from "@Components/ModalBottom/ModalScrollPicker";
import useConfirmation from "src/Hooks/useConfirmation";
import {
  getHealthRecord,
  updateHealthRecord,
} from "@Redux/Action/ProfileAction";
import LiAHeader from "@Components/Header/LiAHeader";

const NewHealthRecord = () => {
  const { showConfirmation } = useConfirmation();

  const heightPicker = useVisible();
  const weightPicker = useVisible();

  // healthMetric
  const [bloodPressure, setBloodPressure] = useState(null);
  const [bloodSugar, setBloodSugar] = useState(null);
  const [axitUric, setAxitUric] = useState(null);
  const [cholesteron, setCholesteron] = useState(null);

  // basicInfo
  const [bloodGroup, setBloodGroup] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  // medicalHistory
  const [anamnesis, setAnamnesis] = useState([]);
  const [otherIllness, setOtherIllness] = useState(null);

  useEffect(() => {
    _getPartnerHealthData();
  }, []);

  const _getPartnerHealthData = async () => {
    var result = await getHealthRecord();
    if (result?.isAxiosError) return;
    console.log({ result });
    setBloodPressure(result?.healthMetric?.bloodPressure);
    setBloodSugar(result?.healthMetric?.bloodSugar);
    setAxitUric(result?.healthMetric?.axitUric);
    setCholesteron(result?.healthMetric?.cholesteron);
    setBloodGroup(result?.basicInfo?.bloodGroup);
    setHeight(result?.basicInfo?.height);
    setWeight(result?.basicInfo?.weight);
    setAnamnesis(result?.medicalHistory?.anamnesis);
    setOtherIllness(result?.medicalHistory?.otherIllness);
  };

  const _handleConfirmHeight = (data) => {
    setHeight(`${data?.valueInteger}.${data?.valueDecimal}`);
  };
  const _handleConfirmWeight = (data) => {
    setWeight(`${data?.valueInteger}.${data?.valueDecimal}`);
  };

  const _handleConfirmUpdateHealth = () => {
    console.log({
      bloodPressure,
      bloodSugar,
      axitUric,
      cholesteron,
      bloodGroup,
      height,
      weight,
      anamnesis,
      otherIllness,
    });
    let dataFetch = {
      basicInfo: {
        bloodGroup: bloodGroup,
        height: height,
        weight: weight,
      },
      healthMetric: {
        bloodPressure: bloodPressure,
        bloodSugar: bloodSugar,
        axitUric: axitUric,
        cholesteron: cholesteron,
      },
      medicalHistory: {
        anamnesis: anamnesis,
        otherIllness: otherIllness,
      },
    };
    showConfirmation(
      "Xác nhận",
      "Xác nhận cập nhật thông tin sức khỏe?",
      async () => {
        await updateHealthRecord(dataFetch);
      }
    );
  };

  return (
    <Screen safeBottom style={styles.container}>
      <LiAHeader safeTop title={"Sức khỏe cá nhân"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Column gap={8 * 3}>
            <HealthData
              bloodPressure={bloodPressure}
              bloodSugar={bloodSugar}
              axitUric={axitUric}
              cholesteron={cholesteron}
              setBloodPressure={setBloodPressure}
              setBloodSugar={setBloodSugar}
              setAxitUric={setAxitUric}
              setCholesteron={setCholesteron}
            />
            <Bloods bloodGroup={bloodGroup} setBloodGroup={setBloodGroup} />
            <TallWeight
              height={height}
              weight={weight}
              heightPicker={heightPicker}
              weightPicker={weightPicker}
            />
            <CheckList anamnesis={anamnesis} setAnamnesis={setAnamnesis} />
            <Other
              otherIllness={otherIllness}
              setOtherIllness={setOtherIllness}
            />
          </Column>
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionButton
        onPress={_handleConfirmUpdateHealth}
        title="Cập nhật thông tin"
      />
      <ModalScrollPicker
        title={"Đặt chiều cao"}
        unit={"cm"}
        dataInteger={["", ...Array.from(new Array(50), (x, i) => i + 140), ""]}
        dataDecimal={["", ...Array.from(new Array(10), (x, i) => i), ""]}
        onConfirm={_handleConfirmHeight}
        visible={heightPicker.visible}
        onClose={heightPicker.hide}
      />
      <ModalScrollPicker
        title={"Đặt cân nặng"}
        unit={"kg"}
        dataInteger={["", ...Array.from(new Array(65), (x, i) => i + 35), ""]}
        dataDecimal={["", ...Array.from(new Array(10), (x, i) => i), ""]}
        onConfirm={_handleConfirmWeight}
        visible={weightPicker.visible}
        onClose={weightPicker.hide}
      />
    </Screen>
  );
};

export default NewHealthRecord;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1FCF9",
  },
});
