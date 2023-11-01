import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import Row from "@Components/Row";

type Props = {
  rating: number;
  count: number;
  larger?: boolean;
  lightContent?: boolean;
};

const CountStar2 = ({
  rating,
  count,
  larger = false,
  lightContent = false,
}: Props) => {
  return (
    <Row top={2}>
      <Image
        style={[styles.star, larger && styles.starLarge]}
        source={require("../../Image/a_star2.png")}
      />
      <Image
        style={[styles.star, larger && styles.starLarge]}
        source={require("../../Image/a_star2.png")}
      />
      <Image
        style={[styles.star, larger && styles.starLarge]}
        source={require("../../Image/a_star2.png")}
      />
      <Image
        style={[styles.star, larger && styles.starLarge]}
        source={require("../../Image/a_star2.png")}
      />
      <Image
        style={[styles.star, larger && styles.starLarge]}
        source={require("../../Image/a_star2.png")}
      />
      <Text
        style={[
          {
            fontSize: 10,
            marginLeft: 4,
          },
          lightContent && { color: "white" },
        ]}
      >
        {`(${rating})`}
      </Text>

      <Text style={[lightContent && { color: "white" }]}>|</Text>

      <Row>
        <Image style={styles.star} source={require("../../Image/people.png")} />
        <Text
          style={[
            {
              fontSize: 10,
              marginLeft: 4,
            },
            lightContent && { color: "white" },
          ]}
        >
          {`(${count})`}
        </Text>
      </Row>
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
