import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import ReviewItem from "@Components/ReviewItem";
import { Review } from "@typings/review";
import Text from "@Components/Text";
import { _moderateScale, _widthScale } from "@Constant/Scale";

type Props = {
  items: Review[];
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const PartnerFeedback = ({ items, title, containerStyle }: Props) => {
  function renderItem(item: Review, index: number) {
    return <ReviewItem item={item} type="branch" />;
  }
  return (
    <View style={[styles.container, containerStyle]}>
      {!!title && (
        <Text weight="bold" bottom={8}>
          {title}
        </Text>
      )}
      {items?.map(renderItem)}
    </View>
  );
};

export default PartnerFeedback;

const styles = StyleSheet.create({
  container: {
    width: _widthScale(360),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
