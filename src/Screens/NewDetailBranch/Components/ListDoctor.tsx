import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { ScrollView } from "react-native-gesture-handler";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import FastImage from "@Components/FastImage";

const ListDoctor = memo(() => {
  const [listDoctor, setListDoctor] = useState([]);

  useEffect(() => {
    setListDoctor([
      {
        _id: "1",
        url: `https://img2.soyoung.com/tieba/android/shortpost/20220917/6/0815271a9df9b46916123420ac8afcfb.jpg`,
      },
      {
        _id: "2",
        url: `https://img2.soyoung.com/message/ios/20200530/9/3d02989d3d3baa00b484de8b61093828.jpg`,
      },
      {
        _id: "3",
        url: `https://img2.soyoung.com/tieba/ios/shortpost/20221105/4/67b048799b6d9303d2cfe3037bec1be2.jpg`,
      },
      {
        _id: "4",
        url: `https://img2.soyoung.com/tieba/ios/shortpost/20210402/6/b45afb7b245aa9309851183a5294654e.jpg`,
      },
      {
        _id: "5",
        url: `https://img2.soyoung.com/tieba/ios/shortpost/20221105/4/67b048799b6d9303d2cfe3037bec1be2.jpg`,
      },
      {
        _id: "6",
        url: `https://img2.soyoung.com/tieba/ios/shortpost/20210402/6/b45afb7b245aa9309851183a5294654e.jpg`,
      },
    ]);
  }, []);

  return (
    <View>
      <Text
        weight="bold"
        color={"black"}
        left={_moderateScale(8 * 2)}
        bottom={8}
      >
        Đội ngũ Bác sĩ nhiều năm kinh nghiệm
      </Text>

      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: _moderateScale(8) }}
          horizontal
        >
          {listDoctor?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item?._id}
                onPress={() => {
                  // navigation.navigate(ScreenKey.DETAIL_DOCTOR)
                }}
                style={{
                  marginLeft: 8,
                  // alignItems: 'center',
                  justifyContent: "center",
                }}
              >
                <FastImage style={styles.image} uri={`${item.url}`} />
                <Text weight="bold" size={12} top={4}>
                  BS. Pham Thi A
                </Text>
                <CountStar2 size={12} rating={4} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
});

export default ListDoctor;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
});
