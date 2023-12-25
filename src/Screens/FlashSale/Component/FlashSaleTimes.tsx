import Column from "@Components/Column";
import Text from "@Components/Text";
import { MAIN_RED_500, MAIN_RED_700 } from "@Constant/Color";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FlashSaleEnds from "./FlashSaleEnds";
import { getFlashSaleState } from "@Redux/flashSale/selectors";
import { useSelector } from "react-redux";
import { FlashSale } from "@typings/flashsale";
import Fade from "@Components/Fade";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import { fromUtc } from "src/utils/date";

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
  const { currentFlashSale, nextFlashSale } = useSelector(getFlashSaleState);

  const flashSales = useMemo(() => {
    const result: FlashSale[] = [];
    if (currentFlashSale) {
      const { hour, minute } = currentFlashSale.timeRange.to;
      const endTimestamp = moment(fromUtc(currentFlashSale.dateRange.to))
        .add(hour, "hours")
        .add(minute, "minutes")
        .toDate()
        .getTime();
      if (Date.now() < endTimestamp) {
        result.push(currentFlashSale);
      }
    }
    result.push(
      ...(nextFlashSale || []).map((item) => ({ ...item, isUpcoming: true }))
    );
    if (onFlashSaleSelect) {
      onFlashSaleSelect(result[0]);
    }
    return result;
  }, [currentFlashSale, ...nextFlashSale]);

  function renderItem(item: FlashSale) {
    return (
      <Column
        key={item._id}
        borderBottomWidth={selectedFlashSale?._id === item._id ? 1 : 0}
        borderColor={"white"}
        alignItems="center"
        paddingVertical={6}
      >
        <Text weight="bold" color={"white"}>
          {`${item.timeRange.from.hour}:${item.timeRange.from.minute}`}
        </Text>
        <Text weight="bold" size={10} color={"white"}>
          {item.isUpcoming ? "Sắp diễn ra" : "Đang diễn ra"}
        </Text>
      </Column>
    );
  }

  return (
    <Column height={95}>
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
