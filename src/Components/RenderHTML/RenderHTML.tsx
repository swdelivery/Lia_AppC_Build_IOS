import { FONT_WEIGHTS } from "@Components/Text";
import React from "react";
import { StyleSheet } from "react-native";
import RenderHtml from "react-native-render-html";
import {
  BLACK
} from "../../Constant/Color";
import { _width } from "../../Constant/Scale";


const RenderHTML = (props) => {

  return (
    <RenderHtml
      contentWidth={_width}
      source={{ html: `${props.data}` }}
      enableExperimentalBRCollapsing={true}
      enableExperimentalMarginCollapsing={true}
      systemFonts={[FONT_WEIGHTS["regular"]]}
      baseStyle={{
        fontFamily: FONT_WEIGHTS["regular"],
        fontSize: 14,
        color: BLACK,
      }}
    />
  );
};

export default RenderHTML;

const styles = StyleSheet.create({
});
