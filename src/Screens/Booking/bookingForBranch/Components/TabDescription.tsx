import Column from "@Components/Column";
import Text from "@Components/Text";
import { BASE_COLOR, GREY, WHITE } from "@Constant/Color";
import { stylesFont } from "@Constant/Font";
import { sizeIcon } from "@Constant/Icon";
import { _moderateScale, _width, _widthScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  currDescriptionTopping?: any
  setIndex?: (number) => void
  confirmTopping?: (any) => void
}

export const TabDescription = ({ currDescriptionTopping, setIndex, confirmTopping }: Props) => {
  const { top } = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, paddingBottom: _moderateScale(8 * 3), paddingTop: top + 8 }}>
      <View style={{ flex: 1 }}>
        {currDescriptionTopping?.content ? (
          <ScrollView
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2) }}
          >
            <RenderHTML
              contentWidth={_width - _widthScale(0)}
              source={{
                html: currDescriptionTopping?.content,
              }}
              enableExperimentalBRCollapsing={true}
              enableExperimentalMarginCollapsing={true}
            />
            <View style={{ height: 100 }} />
          </ScrollView>
        ) : (
          <Column flex={1} justifyContent="center">
            <Text
              color={GREY}
              size={_moderateScale(16)}
              fontStyle="italic"
              style={{ textAlign: "center" }}
            >
              Chưa có mô tả
            </Text>
          </Column>
        )}

        <View
          style={[
            styleElement.rowAliCenter,
            { alignSelf: "center", paddingTop: 8 },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setIndex(0);
            }}
            style={{ alignItems: "center" }}
          >
            <View
              style={[
                styleElement.centerChild,
                {
                  width: _moderateScale(8 * 6),
                  height: _moderateScale(8 * 6),
                  borderRadius: _moderateScale(8 * 5),
                  borderWidth: 2,
                  borderColor: "#FE405B",
                  backgroundColor: WHITE,
                },
              ]}
            >
              <Image
                style={sizeIcon.lllg}
                source={require("../../../../NewIcon/backRed.png")}
              />
            </View>
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(15),
              }}
            >
              Quay lại
            </Text>
          </TouchableOpacity>
          <View style={{ width: 64 }} />
          <TouchableOpacity
            onPress={() => {
              confirmTopping(currDescriptionTopping);
              setIndex(0);
            }}
            style={{ alignItems: "center" }}
          >
            <View
              style={[
                styleElement.centerChild,
                {
                  width: _moderateScale(8 * 6),
                  height: _moderateScale(8 * 6),
                  borderRadius: _moderateScale(8 * 5),
                  backgroundColor: BASE_COLOR,
                },
              ]}
            >
              <Image
                style={sizeIcon.lllg}
                source={require("../../../../NewIcon/tickWhite.png")}
              />
            </View>
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(15),
              }}
            >
              Chọn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
