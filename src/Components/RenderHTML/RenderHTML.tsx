import React from "react";
import RenderHtml from "react-native-render-html";
import { BLACK } from "../../Constant/Color";
import { _width } from "../../Constant/Scale";
import { FONT_WEIGHTS } from "@Components/Text";

const RenderHTML = (props) => {
  return (
    <RenderHtml
      contentWidth={props?.contentWidth ? props?.contentWidth : _width}
      source={{ html: `${props.data}` }}
      enableExperimentalBRCollapsing={true}
      enableExperimentalMarginCollapsing={true}
      systemFonts={[FONT_WEIGHTS?.regular]}
      baseStyle={{
        fontFamily: FONT_WEIGHTS?.regular,
        fontSize: 14,
        color: BLACK,
      }}
    />
  );
};

export default RenderHTML;
