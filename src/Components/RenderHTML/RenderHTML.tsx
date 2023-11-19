import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BASE_COLOR,
  BG_BEAUTY,
  BLACK,
  TEXT_COLOR_FORGET_PASS,
} from "../../Constant/Color";
import { _moderateScale, _width, _widthScale } from "../../Constant/Scale";
import { useSharedValue } from "react-native-reanimated";
import { isEmpty } from "lodash-es";
import { Dimensions, Image } from "react-native";
import RenderHtml from "react-native-render-html";
import { WebView } from "react-native-webview";
import { styleTo, styleToComponent } from "../../Constant/styleTo";
import { FONT_WEIGHTS } from "@Components/Text";

let arrParent = [];
let styleIdex = [];

const RenderHTML = (props) => {
  const [isExpaned, setIsExpaned] = useState(true);
  const rotateIcon = useSharedValue(0);

  useEffect(() => {
    console.log({ props });
  }, []);

  const getVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const getParentName = (node) => {
    if (node.parent) {
      arrParent.push({
        name: node?.parent?.name,
        attr: node?.parent?.attribs,
      });
      if (!isEmpty(node?.parent?.attribs)) {
        styleIdex.push(arrParent.length - 1);
      }
      return getParentName(node.parent); // <- recursive call
    } else {
      // node must be a leaf node
      arrParent.push({
        name: node?.name,
        attr: node?.attribs,
      });
      if (!isEmpty(node?.parent?.attribs)) {
        styleIdex.push(arrParent.length - 1);
      }
      // return node.name;
    }
    return arrParent;
  };

  const _customRender = (node, index, siblings, parent, defaultRenderer) => {
    if (!isEmpty(node.name) && node.data !== "&nbsp;") {
      const w = Dimensions.get("window").width - 32;
      const h = Math.floor((Dimensions.get("window").width / 16) * 9);

      if (node.name == "img") {
        const a = node.attribs;
        return (
          <Image
            style={{ width: w, height: h }}
            source={{ uri: a.src }}
            resizeMode="contain"
          />
        );
      }
      if (node.name == "iframe" || node.name == "oembed") {
        const a = node.attribs;

        const videoId = getVideoId(a.url);
        const iframeMarkup =
          "https://www.youtube.com/embed/" +
          videoId +
          "?rel=0&autoplay=0&showinfo=0&controls=0";

        return (
          <View
            key={index}
            style={{ width: w, height: h, backgroundColor: BG_BEAUTY }}
          >
            <WebView
              style={{ width: "100%" }}
              javaScriptEnabled={true}
              source={{ uri: iframeMarkup }}
            />
          </View>
        );
      }
    }

    if (node?.data && node?.data !== "&nbsp;") {
      console.log("node-data", node);
      arrParent = [];
      styleIdex = [];
      var arr = getParentName(node);

      var tmpStyleCom = arr.filter(
        (item) => item.name !== "span" && item.name !== "p"
      );
      var sty = {};
      var cssTmp = {};
      tmpStyleCom.map((css) => {
        sty = styleToComponent(css.name, sty);
      });

      if (styleIdex.length > 0) {
        var tmpCss = arr[styleIdex[0]]?.attr?.style.split(";");
        tmpCss.map((css) => {
          cssTmp = { ...cssTmp, ...styleTo(css) };
        });
      }

      return (
        <Text style={{ ...cssTmp, ...sty }}>
          {node?.data.replace("&nbsp;", "")}
        </Text>
      );
    }
  };

  return (
    <View>
      <RenderHtml
        contentWidth={_width}
        source={{ html: `${props.data}` }}
        enableExperimentalBRCollapsing={true}
        enableExperimentalMarginCollapsing={true}
        baseStyle={{
          fontFamily: FONT_WEIGHTS["regular"],
          fontSize: _moderateScale(14),
          color: BLACK,
        }}
      />
    </View>
  );
};

export default RenderHTML;

const styles = StyleSheet.create({
  header__box: {
    height: _moderateScale(8 * 6),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8 * 2),
  },
  header: {
    backgroundColor: BASE_COLOR,
  },
});
