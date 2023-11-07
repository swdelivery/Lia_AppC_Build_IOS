import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import Certificate from "@Components/Certificate/Certificate";
import Row from "@Components/Row";
import FastImage from "@Components/FastImage";
import Icon from "@Components/Icon";
import Separator from "@Components/Separator/Separator";
import { ScrollView } from "react-native-gesture-handler";
import Column from "@Components/Column";

const InfoBranch = () => {
  return (
    <View style={styles.container}>
      <Row alignItems="flex-start">
        <FastImage
          style={styles.avatarBranch}
          uri={`https://cfw.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibGlhYmVhdXR5LnZuIiwidiI6OTczNjIwMDQ3LCJpIjoiZjgxYWIyZTctMGZlZi00YmU2LTZhNmItODI5MWI4YWExZTAwIn0/wp-content/uploads/2023/06/photo.png`}
        />
        <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
          <Text style={styles.name}>LiA Beauty 434 Cao Thắng</Text>
          <CountStar2 rating={4} size={10} />
          <Row top={4}>
            <Certificate name="Giấy phép" />
          </Row>
        </View>
        <TouchableOpacity style={styles.more}>
          <Text weight="bold" size={12} color={"white"} bottom={3}>
            {`Xem thêm`}
          </Text>
          <Icon name="chevron-right" size={14} color={"white"} />
        </TouchableOpacity>
      </Row>

      <Separator color="#dcdedc" top={16} bottom={16} />

      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {[1, 2, 3]?.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.doctorCard}>
              <Image
                style={styles.avatarDoctor}
                source={{
                  uri: `https://img2.soyoung.com/tieba/android/shortpost/20220917/6/0815271a9df9b46916123420ac8afcfb.jpg`,
                }}
              />
              <Column>
                <Text weight="bold">BS. Vũ Thị Nga</Text>
                <Text size={12} color={"grey"}>
                  Hơn 10 năm kinh nghiệm
                </Text>
              </Column>

              <TouchableOpacity style={{ marginLeft: _moderateScale(8) }}>
                <Image
                  style={styles.iconChat}
                  source={require("../../../Image/comment.png")}
                />
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
    marginTop: _moderateScale(4),
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
