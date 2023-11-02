import { Image, StyleSheet, View } from "react-native";
import React, { memo, useMemo } from "react";
import Row from "@Components/Row";
import Text from "@Components/Text";

type Props = {
  rating: number;
  count: number;
  size?: number;
  larger?: boolean;
  lightContent?: boolean;
};

const CountStar2 = ({
  rating,
  count,
  size = 14,
  lightContent = false,
}: Props) => {
  const starStyle = useMemo(() => {
    return {
      width: size,
      aspectRatio: 1,
    };
  }, [size]);

  return (
    <Row top={2} gap={4}>
      <Row>
        <Image
          style={[styles.star, starStyle]}
          source={require("../../Image/a_star2.png")}
        />
        <Image
          style={[styles.star, starStyle]}
          source={require("../../Image/a_star2.png")}
        />
        <Image
          style={[styles.star, starStyle]}
          source={require("../../Image/a_star2.png")}
        />
        <Image
          style={[styles.star, starStyle]}
          source={require("../../Image/a_star2.png")}
        />
        <Image
          style={[styles.star, starStyle]}
          source={require("../../Image/a_star2.png")}
        />
      </Row>

      <Text color={lightContent ? "white" : "black"} size={size}>
        {`(${rating})`}
      </Text>
      {count !== undefined && (
        <>
          <Text color={lightContent ? "white" : "black"} size={size}>
            |
          </Text>
          <Image
            style={styles.star}
            source={require("../../Image/people.png")}
          />
          <Text color={lightContent ? "white" : "black"} size={size}>
            {`(${count})`}
          </Text>
        </>
      )}
    </Row>
  );
};

export default CountStar2;

const styles = StyleSheet.create({
  starLarge: {
    width: 8 * 2,
    height: 8 * 2,
    marginLeft: 1,
    resizeMode: "contain",
  },
  star: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  lightContent: { color: "white" },
});
