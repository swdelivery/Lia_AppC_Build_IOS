import { StyleSheet, View, Image } from "react-native";
import React, { memo } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { styleText } from "../../../Constant/StyleText";
import { ScrollView } from "react-native-gesture-handler";
import Text from "@Components/Text";
import FastImage from "@Components/FastImage";
import { styleElement } from "@Constant/StyleElement";

const ListDiary = memo(() => {
  return (
    <View>
      <Text weight="bold" color="black" left={_moderateScale(8 * 2)} bottom={8}>
        Nhật ký từ khách hàng
      </Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: _moderateScale(8 * 2) }}
        horizontal
      >
        {[1, 2, 3, 4]?.map((item, index) => {
          return (
            <View style={[styles.box__diary]}>
              <View
                style={{
                  flexDirection: "row",
                  margin: _moderateScale(8),
                }}
              >
                <FastImage
                  style={styles.avatar__customer}
                  uri={`https://i.ibb.co/7jbTH44/A-nh-ma-n-hi-nh-2023-09-26-lu-c-14-36-22.png`}
                />
                <View style={styleElement.flex}>
                  <Text numberOfLines={1} style={styles.customer__name}>
                    Trần Thị Thu
                  </Text>
                  <Text numberOfLines={1} style={styles.customer__updateTime}>
                    Cập nhật <Text>2 Ngày trước</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.box__diary__name}>
                <View style={styles.verticalLine} />
                <Text style={styles.box__diary__nameService}>
                  Cắt mí T-2022
                </Text>
              </View>

              <View style={styles.imagesContainer}>
                <View style={styles.box__diary__image}>
                  <View style={styles.absoluteText}>
                    <Text size={12} weight="bold" color="white">
                      Trước
                    </Text>
                  </View>
                  <FastImage
                    style={styles.box__diary__image}
                    uri={`https://i.ibb.co/mHZWXF6/IMG-3225.jpg`}
                  />
                </View>
                <View style={styles.box__diary__image}>
                  <View style={styles.absoluteText}>
                    <Text size={12} weight="bold" color="white">
                      Sau
                    </Text>
                  </View>
                  <FastImage
                    style={styles.box__diary__image}
                    uri={`https://i.ibb.co/8mbV6QR/IMG-3226.jpg`}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});

export default ListDiary;

const styles = StyleSheet.create({
  box__diary__name: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: _moderateScale(8),
    marginBottom: _moderateScale(8),
  },
  box__diary__nameService: {
    fontSize: _moderateScale(14),
    fontWeight: "500",
  },
  verticalLine: {
    width: _moderateScale(2),
    height: _moderateScale(8 * 3),
    backgroundColor: "red",
    marginRight: _moderateScale(4),
  },
  absoluteText: {
    paddingHorizontal: _moderateScale(8),
    paddingVertical: _moderateScale(4),
    backgroundColor: "rgba(0,0,0,.5)",
    position: "absolute",
    left: 0,
    zIndex: 1,
    bottom: 0,
    borderTopRightRadius: _moderateScale(8),
  },
  box__diary__image: {
    width: _moderateScale(8 * 11.5),
    height: _moderateScale(8 * 11.5),
    borderRadius: _moderateScale(8),
    overflow: "hidden",
  },
  box__diary: {
    width: _moderateScale(8 * 26),
    // height: _moderateScale(8 * 15),
    marginRight: _moderateScale(8),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.2)",
    paddingBottom: _moderateScale(8),
  },
  customer__updateTime: {
    fontSize: _moderateScale(12),
    flex: 1,
    marginLeft: _moderateScale(4),
    color: "grey",
  },
  customer__name: {
    fontSize: _moderateScale(14),
    flex: 1,
    marginLeft: _moderateScale(4),
    fontWeight: "500",
  },
  avatar__customer: {
    width: _moderateScale(8 * 4),
    height: _moderateScale(8 * 4),
    borderRadius: _moderateScale((8 * 4) / 2),
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: _moderateScale(8),
  },
});
