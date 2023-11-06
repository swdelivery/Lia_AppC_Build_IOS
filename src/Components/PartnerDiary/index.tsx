import Text from "@Components/Text";
import { Diary } from "@typings/diary";
import React from "react";
import { View, StyleSheet } from "react-native";
import DiaryItem from "./components/DiaryItem";
import { _moderateScale } from "@Constant/Scale";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  items: Diary[];
};

export default function PartnerDiary({ items }: Props) {
  function renderItem(item: Diary, index: number) {
    return <DiaryItem key={item._id} item={item} />;
  }
  return (
    <View>
      <Text weight="bold" color="black" left={16} bottom={8}>
        Nhật ký từ khách hàng
      </Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        horizontal
      >
        {items.map(renderItem)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: _moderateScale(8 * 2),
  },
});
