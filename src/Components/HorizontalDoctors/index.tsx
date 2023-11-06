import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import { Doctor } from "@typings/doctor";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import DoctorItem from "./components/DoctorItem";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  title?: string;
  items: Doctor[];
  containerStyle?: StyleProp<ViewStyle>;
};

export default function HorizontalDoctors({
  title,
  items,
  containerStyle,
}: Props) {
  function renderItem(item: Doctor, index: number) {
    return <DoctorItem item={item} key={item._id} />;
  }

  return (
    <View style={containerStyle}>
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
  contentContainer: { paddingHorizontal: 8, gap: 8 },
});
