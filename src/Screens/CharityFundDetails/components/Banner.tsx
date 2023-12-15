import Column from "@Components/Column";
import Text from "@Components/Text";
import {
  BG_MAIN_OPACITY,
  BLACK_OPACITY_4,
  NEW_BASE_COLOR,
} from "@Constant/Color";
import HorizonListImage from "@Screens/NewDetailService/Components/HorizonListImage";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

export default function Banner({}: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <Column backgroundColor={BG_MAIN_OPACITY}>
      <HorizonListImage images={[]} />
      <Column
        position="absolute"
        top={top + 20}
        right={20}
        paddingTop={2}
        paddingBottom={4}
        paddingHorizontal={12}
        borderRadius={16}
        backgroundColor={BLACK_OPACITY_4}
      >
        <Text weight="bold" color={"white"}>
          Chia sẻ
        </Text>
      </Column>
      <Column
        backgroundColor={"white"}
        position="absolute"
        bottom={20}
        left={20}
        borderRadius={20}
        paddingHorizontal={8}
        paddingTop={2}
        paddingBottom={4}
      >
        <Text weight="bold" color={NEW_BASE_COLOR}>
          Trẻ em
        </Text>
      </Column>
    </Column>
  );
}

const styles = StyleSheet.create({
  //
});
