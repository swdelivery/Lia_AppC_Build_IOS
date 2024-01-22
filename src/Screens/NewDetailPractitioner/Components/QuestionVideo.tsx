import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import ScreenKey from "@Navigation/ScreenKey";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import { URL_ORIGINAL } from "@Constant/Url";
import LinearGradient from "react-native-linear-gradient";
import Column from "@Components/Column";
import { IconPlayWhite } from "@Components/Icon/Icon";
import { Practitioner } from "@typings/practitioner";

type Props = {
  practitioner: Practitioner;
};

const QuestionVideo = ({ practitioner }: Props) => {
  const { navigate } = useNavigate();
  return (
    <View style={styles.container}>
      <Text weight="bold" bottom={8} left={16}>
        Hỏi đáp cùng chuyên viên
      </Text>

      <View style={styles.content}>
        {practitioner?.questionVideoPractitionerArr?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={navigate(ScreenKey.VERTICAL_VIDEO_PLAYER, {
                data: practitioner?.questionVideoPractitionerArr,
              })}
              key={index}
              style={[
                {
                  width: "50%",
                  height: _heightScale(8 * 36),
                  marginBottom: _moderateScale(8),
                },
                index % 2 == 0
                  ? { alignItems: "flex-start" }
                  : { alignItems: "flex-end" },
              ]}
            >
              <View
                style={{
                  width: "97%",
                  height: "100%",
                }}
              >
                <LinearGradient
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      justifyContent: "flex-end",
                      zIndex: 1,
                      borderRadius: _moderateScale(8),
                    },
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["transparent", "#000"]}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: "45%",
                      alignSelf: "center",
                      opacity: 0.5,
                    }}
                  >
                    <IconPlayWhite />
                  </View>

                  <View style={{ margin: 8 * 2 }}>
                    <Column gap={8}>
                      <Text weight="bold" color={"white"}>
                        {item?.name}
                      </Text>
                      <Text numberOfLines={3} color={"white"}>
                        {item?.description}
                      </Text>
                    </Column>
                  </View>
                </LinearGradient>

                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: _moderateScale(8),
                  }}
                  source={{ uri: `${URL_ORIGINAL}${item?.avatar?.link}` }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default QuestionVideo;

const styles = StyleSheet.create({
  box__diary__name: {
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: _moderateScale(8),
    marginBottom: _moderateScale(8),
  },
  box__diary__nameService: {
    fontSize: _moderateScale(12),
    fontWeight: "bold",
  },
  verticalLine: {
    width: _moderateScale(2),
    height: _moderateScale(8 * 3),
    backgroundColor: "red",
    marginRight: _moderateScale(4),
  },
  name: {
    fontSize: _moderateScale(14),
    fontWeight: "500",
  },
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  avatar: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
  },
  feedBackText: {
    fontSize: _moderateScale(14),
    fontWeight: "bold",
    marginLeft: _moderateScale(8 * 2),
  },
  container: {
    width: _width,
    minHeight: 200,
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: _moderateScale(8),
    paddingTop: _moderateScale(8 * 2),
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: _width,
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
