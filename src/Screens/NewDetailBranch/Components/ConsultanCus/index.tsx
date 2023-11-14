import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { styleText } from "../../../../Constant/StyleText";
import { _moderateScale, _widthScale } from "../../../../Constant/Scale";
import LinearGradient from "react-native-linear-gradient";
import { styleElement } from "../../../../Constant/StyleElement";
import { ScrollView } from "react-native-gesture-handler";
import Text from "@Components/Text";
import ProblemItem from "./ProblemItem";
import { FileUpload } from "@typings/common";
import useSelectedItems from "src/Hooks/useSelectedItems";
import { Branch } from "@typings/branch";

type Props = {
  branch: Branch;
};

const ConsultanCus = ({ branch }: Props) => {
  const { selectedItems, handleItemSelect, isItemSelected } =
    useSelectedItems<FileUpload>([], {
      keyExtractor: (item) => item._id,
    });

  function renderItem(item: FileUpload) {
    return (
      <ProblemItem
        key={item._id}
        item={item}
        onPress={handleItemSelect(item)}
        isSelected={isItemSelected(item)}
      />
    );
  }

  return (
    <View>
      <Text
        style={[
          styleText.textBlackNorBold,
          {
            paddingHorizontal: _moderateScale(8 * 2),
            paddingBottom: _moderateScale(8),
          },
        ]}
      >
        Bạn đang gặp vấn đề gì?
      </Text>

      <View style={styles.box}>
        <LinearGradient
          style={[
            StyleSheet.absoluteFill,
            { zIndex: -1, borderRadius: _moderateScale(8) },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.8]}
          colors={["#D2C6BA", "rgba(210, 198, 186,0.1)"]}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{ padding: _moderateScale(8 * 1.5) }}
          horizontal
        >
          {branch.branchProblemFileArr.map(renderItem)}
        </ScrollView>

        <TouchableOpacity style={[styles.btnConsul, styleElement.centerChild]}>
          <Text style={styleText.textWhiteNor500}>Tư vấn ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConsultanCus;

const styles = StyleSheet.create({
  // btnConsul__text:{
  //     fontSize:_moderateScale(14),
  //     fontWeight:'bold'
  // },
  btnConsul: {
    width: _moderateScale(8 * 14),
    height: _moderateScale(8 * 3.5),
    borderRadius: _moderateScale(8),
    backgroundColor: "#866946",
    alignSelf: "center",
    marginTop: _moderateScale(0),
  },
  imageConsul: {
    width: _moderateScale(8 * 12),
    height: _moderateScale(8 * 12),
    borderRadius: _moderateScale(8),
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.3)",
    marginRight: _moderateScale(8),
  },
  box: {
    width: _widthScale(350),
    alignSelf: "center",
    borderRadius: _moderateScale(8),
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.2)",
    paddingBottom: _moderateScale(8 * 1.5),
  },
});
