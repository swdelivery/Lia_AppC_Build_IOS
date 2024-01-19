import Column from "@Components/Column";
import Image from "@Components/Image";
import { BASE_COLOR } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { ConfigFileCode } from "@typings/configFile";
import { head } from "lodash";
import React from "react";
import { View, StyleSheet } from "react-native";
import useConfigFile from "src/Hooks/useConfigFile";

type Props = {};

export default function Banner({}: Props) {
  const image = useConfigFile(ConfigFileCode.BannerContactCollaboration);
  return (
    <Column width={_width} height={(_width * 9) / 16}>
      <Image
        avatar={head(image?.fileArr)}
        style={styles.image}
        placeholderColors={[BASE_COLOR, BASE_COLOR]}
      />
    </Column>
  );
}

const styles = StyleSheet.create({
  image: {
    width: _width,
    height: (_width * 9) / 16,
  },
});
