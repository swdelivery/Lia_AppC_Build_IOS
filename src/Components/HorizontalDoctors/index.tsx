import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import { Doctor } from "@typings/doctor";
import React, { useMemo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import DoctorItem from "./components/DoctorItem";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { IconRightArrowBase } from "@Components/Icon/Icon";
import Column from "@Components/Column";
import { BASE_COLOR } from "@Constant/Color";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

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
  const { navigate } = useNavigate();

  const doctors = useMemo(() => {
    return items?.slice(0, 10) || [];
  }, [items]);

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
          {title}
        </Text>
      )}
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          horizontal
        >
          {doctors?.map(renderItem)}

          <TouchableOpacity
            onPress={navigate(ScreenKey.DOCTOR_LIST)}
            style={styles.btnSeeAll}
          >
            <Column alignItems="center" gap={8}>
              <IconRightArrowBase color={BASE_COLOR} />
              <Text color={BASE_COLOR} size={12}>
                Xem tất cả
              </Text>
            </Column>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSeeAll: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8 * 2
  },
  contentContainer: { paddingHorizontal: 8 * 2, gap: 8 },
});
