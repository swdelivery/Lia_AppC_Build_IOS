import Column from "@Components/Column";
import NumberTicker from "@Components/NumberTicker";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { MAIN_RED_500 } from "@Constant/Color";
import { useInterval } from "@r0b0t3d/react-native-hooks";
import { FlashSale } from "@typings/flashsale";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { ColorValue, StyleSheet } from "react-native";
import { formatDuration, fromUtc } from "src/utils/date";

type Props = {
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  textSize?: number;
  flashSale: FlashSale;
  useUnit?: boolean;
  onFlashSaleUpdate: () => void;
};

export default function FlashSaleTimer({
  backgroundColor = MAIN_RED_500,
  textColor = "white",
  textSize = 10,
  useUnit = false,
  flashSale,
  onFlashSaleUpdate,
}: Props) {
  const [timer, setTimer] = useState(0);

  const endTimestamp = useMemo(() => {
    const { hour, minute } = flashSale.timeRange.to;
    return moment(fromUtc(flashSale.dateRange.to))
      .add(hour, "hours")
      .add(minute, "minutes")
      .toDate()
      .getTime();
  }, [flashSale]);

  const startTimestamp = useMemo(() => {
    const { hour, minute } = flashSale.timeRange.from;
    return moment(fromUtc(flashSale.dateRange.from))
      .add(hour, "hours")
      .add(minute, "minutes")
      .toDate()
      .getTime();
  }, [flashSale]);

  useInterval(
    () => {
      let timer = 0;
      if (Date.now() < startTimestamp) {
        timer = startTimestamp - Date.now();
      } else {
        timer = endTimestamp - Date.now();
      }
      setTimer(timer);
      if (timer <= 0) {
        onFlashSaleUpdate();
      }
    },
    timer >= 0 ? 1000 : -1
  );

  const { hours, minutes, seconds } = useMemo(() => {
    return formatDuration(timer);
  }, [timer]);

  return (
    <>
      <Row gap={2}>
        <Column
          style={styles.numberContainer}
          backgroundColor={backgroundColor}
        >
          <NumberTicker
            color={textColor}
            weight="bold"
            textSize={textSize}
            value={hours}
          />
        </Column>
        <Text weight="bold" color={backgroundColor} size={10}>
          {useUnit ? " giờ " : ":"}
        </Text>
        <Column
          style={styles.numberContainer}
          backgroundColor={backgroundColor}
        >
          <NumberTicker
            color={textColor}
            weight="bold"
            textSize={textSize}
            value={minutes}
          />
        </Column>
        <Text weight="bold" color={backgroundColor} size={10}>
          {useUnit ? " phút " : ":"}
        </Text>
        <Column
          style={styles.numberContainer}
          backgroundColor={backgroundColor}
        >
          <NumberTicker
            color={textColor}
            weight="bold"
            textSize={textSize}
            value={seconds}
          />
        </Column>
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  numberContainer: {
    borderRadius: 4,
    paddingHorizontal: 2,
    paddingBottom: 1,
  },
});
