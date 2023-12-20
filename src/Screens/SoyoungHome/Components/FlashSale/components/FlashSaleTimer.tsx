import Column from "@Components/Column";
import NumberTicker from "@Components/NumberTicker";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { useInterval } from "@r0b0t3d/react-native-hooks";
import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { formatDuration } from "src/utils/date";

type Props = {
  endDate: Date;
};

export default function FlashSaleTimer({ endDate }: Props) {
  const [timer, setTimer] = useState(1000 * 60 * 30);

  useInterval(
    () => {
      setTimer((prev) => prev - 1000);
    },
    timer > 0 ? 1000 : -1
  );

  const { hours, minutes, seconds } = useMemo(() => {
    return formatDuration(timer);
  }, [timer]);

  return (
    <Row gap={2}>
      <Column style={styles.numberContainer}>
        <NumberTicker
          color={"white"}
          weight="bold"
          textSize={10}
          value={hours}
        />
      </Column>
      <Text
        weight="bold"
        color={"#e3161d"}
        removePadding
        size={10}
        right={-1}
        bottom={3}
      >
        :
      </Text>
      <Column style={styles.numberContainer}>
        <NumberTicker
          color={"white"}
          weight="bold"
          textSize={10}
          value={minutes}
        />
      </Column>
      <Text
        weight="bold"
        color={"#e3161d"}
        removePadding
        size={10}
        right={-1}
        bottom={3}
      >
        :
      </Text>
      <Column style={styles.numberContainer}>
        <NumberTicker
          color={"white"}
          weight="bold"
          textSize={10}
          value={seconds}
        />
      </Column>
    </Row>
  );
}

const styles = StyleSheet.create({
  numberContainer: {
    backgroundColor: "#e3161d",
    borderRadius: 4,
    paddingHorizontal: 2,
    paddingBottom: 1,
  },
});
