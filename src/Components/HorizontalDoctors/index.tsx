import FastImage from "@Components/FastImage";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import ScreenKey from "@Navigation/ScreenKey";
import { Doctor } from "@typings/doctor";
import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  title?: string;
  items: Doctor[];
};

export default function HorizontalDoctors({ title, items }: Props) {
  const { navigate } = useNavigate();
  return (
    <View>
      {!!title && (
        <Text
          weight="bold"
          color={"black"}
          left={_moderateScale(8 * 2)}
          bottom={8}
        >
          Đội ngũ Bác sĩ nhiều năm kinh nghiệm
        </Text>
      )}
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          horizontal
        >
          {items?.map((item, index) => {
            return (
              <Pressable
                key={item?._id}
                onPress={navigate(ScreenKey.DETAIL_DOCTOR)}
                style={styles.doctorItem}
              >
                <FastImage style={styles.image} uri={`${item.url}`} />
                <Text weight="bold" size={12} top={4}>
                  BS. Pham Thi A
                </Text>
                <CountStar2 size={12} rating={4} />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingLeft: _moderateScale(8), gap: 8 },
  doctorItem: {
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
});
