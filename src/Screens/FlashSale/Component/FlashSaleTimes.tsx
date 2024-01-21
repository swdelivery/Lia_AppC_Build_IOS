import Column from "@Components/Column";
import Text from "@Components/Text";
import { MAIN_RED_500, MAIN_RED_700 } from "@Constant/Color";
import React, { useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FlashSaleEnds from "./FlashSaleEnds";
import { FlashSale } from "@typings/flashsale";
import Fade from "@Components/Fade";
import LinearGradient from "react-native-linear-gradient";
import { getTwoDigits } from "src/utils/date";
import useFlashSales from "@Screens/SoyoungHome/Components/useFlashSale";

type Props = {
  selectedFlashSale?: FlashSale;
  onFlashSaleSelect: (item: FlashSale) => void;
  onFlashSaleUpdate: () => void;
};

export default function FlashSaleTimes({
  onFlashSaleSelect,
  selectedFlashSale,
  onFlashSaleUpdate,
}: Props) {
  const flashSales = useFlashSales((fs) => {
    if (onFlashSaleSelect) {
      onFlashSaleSelect(fs[0]);
    }
  });

  const handleSelectFlashSale = useCallback(
    (item: FlashSale) => () => {
      onFlashSaleSelect(item);
    },
    [onFlashSaleSelect]
  );

  function renderItem(item: FlashSale) {
    return (
      <Column
        key={item._id}
        borderBottomWidth={selectedFlashSale?._id === item._id ? 1 : 0}
        borderColor={"white"}
        alignItems="center"
        paddingVertical={6}
        onPress={handleSelectFlashSale(item)}
      >
        <Text weight="bold" color={"white"} size={16}>
          {`${getTwoDigits(item.timeRange.from.hour)}:${getTwoDigits(
            item.timeRange.from.minute
          )}`}
        </Text>
        <Text weight="bold" size={12} color={"white"}>
          {item.isUpcoming ? "Sắp diễn ra" : "Đang diễn ra"}
        </Text>
      </Column>
    );
  }

  return (
    <Column>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={[MAIN_RED_500, MAIN_RED_700]}
      />
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        {flashSales.map(renderItem)}
      </ScrollView>
      <Fade visible={!!selectedFlashSale} style={styles.flashSaleEnds}>
        <FlashSaleEnds
          flashSale={selectedFlashSale}
          onFlashSaleUpdate={onFlashSaleUpdate}
        />
      </Fade>
    </Column>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    gap: 30,
    paddingBottom: 8,
  },
  flashSaleEnds: {
    marginTop: 8,
    marginBottom: 16,
  },
});
