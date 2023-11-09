import Text from "@Components/Text";
import { Diary } from "@typings/diary";
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import DiaryItem from "./components/DiaryItem";
import { _moderateScale } from "@Constant/Scale";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

type Props = {
  items: Diary[];
  title?: string;
};

export default function PartnerDiary({ title, items }: Props) {
  const { navigation } = useNavigate();

  const handleItemPress = useCallback((item: Diary) => {
    navigation.navigate(ScreenKey.DETAIL_NEW_FEED, {
      idPost: item?.postId,
    });
  }, []);

  function renderItem(item: Diary, index: number) {
    return <DiaryItem key={item._id} item={item} onPress={handleItemPress} />;
  }
  return (
    <View>
      {!!title && (
        <Text weight="bold" color="black" left={16} bottom={8}>
          {title}
        </Text>
      )}

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
