import Text from "@Components/Text";
import { Diary } from "@typings/diary";
import React, { useCallback } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import DiaryItem from "./components/DiaryItem";
import { _moderateScale } from "@Constant/Scale";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { getPostByIdv2 } from "@Redux/Action/PostAction";
import { selectPost } from "@Redux/newfeeds/actions";
import { useDispatch } from "react-redux";

type Props = {
  items: Diary[];
  title?: string;
  contentScrollViewStyle?: StyleProp<ViewStyle>;
};

export default function PartnerDiary({ title, items, contentScrollViewStyle }: Props) {
  const { navigation } = useNavigate();
  const dispatch = useDispatch()

  const handleItemPress = useCallback(async (item: Diary) => {
    const resultDataPost = await getPostByIdv2(item?.postId);
    if (resultDataPost?.isAxiosError) return;
    dispatch(selectPost(resultDataPost?.data?.data))
    navigation.navigate(ScreenKey.DETAIL_POST)
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
        contentContainerStyle={[styles.contentContainer, contentScrollViewStyle]}
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
