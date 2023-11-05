import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { styleText } from "../../../Constant/StyleText";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import LinearGradient from "react-native-linear-gradient";
import { styleElement } from "../../../Constant/StyleElement";
import { ScrollView } from "react-native-gesture-handler";
import Text from "@Components/Text";

const ConsultanCus = () => {
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
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={styles.imageConsul}
              source={require(`../../../Image/consul1.png`)}
            />
            <Text
              style={[
                styleText.textBlackSmall500,
                { marginTop: _moderateScale(4) },
              ]}
            >
              Cơ da mặt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={styles.imageConsul}
              source={require(`../../../Image/consul2.png`)}
            />
            <Text
              style={[
                styleText.textBlackSmall500,
                { marginTop: _moderateScale(4) },
              ]}
            >
              Mí mắt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={styles.imageConsul}
              source={require(`../../../Image/consul3.png`)}
            />
            <Text
              style={[
                styleText.textBlackSmall500,
                { marginTop: _moderateScale(4) },
              ]}
            >
              Mụn viêm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={styles.imageConsul}
              source={require(`../../../Image/consul4.png`)}
            />
            <Text
              style={[
                styleText.textBlackSmall500,
                { marginTop: _moderateScale(4) },
              ]}
            >
              Cấu trúc mũi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={styles.imageConsul}
              source={require(`../../../Image/consul1.png`)}
            />
            <Text
              style={[
                styleText.textBlackSmall500,
                { marginTop: _moderateScale(4) },
              ]}
            >
              Cơ da mặt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={styles.imageConsul}
              source={require(`../../../Image/consul2.png`)}
            />
            <Text
              style={[
                styleText.textBlackSmall500,
                { marginTop: _moderateScale(4) },
              ]}
            >
              Cơ da mặt
            </Text>
          </TouchableOpacity>
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
