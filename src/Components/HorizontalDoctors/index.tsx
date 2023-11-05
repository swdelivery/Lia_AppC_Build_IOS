import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import { Doctor } from "@typings/doctor";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import DoctorItem from "./components/DoctorItem";

type Props = {
  title?: string;
  items: Doctor[];
};

export default function HorizontalDoctors({ title, items }: Props) {
  function renderItem(item: Doctor, index: number) {
    return <DoctorItem item={item} key={item._id} />;
  }

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
          {items?.map(renderItem)}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 16, gap: 8 },
});
