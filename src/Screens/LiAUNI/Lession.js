import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { navigation } from "../../../rootNavigation";
import { BG_GREY_OPACITY_5, BLACK, BLUE_FB, WHITE } from "../../Constant/Color";
import { _moderateScale, _width, _widthScale } from "../../Constant/Scale";
import { getBottomSpace } from "react-native-iphone-x-helper";
import RenderHtml from "react-native-render-html";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  completeLessionById,
  takeLessionById,
} from "../../Redux/Action/LiaUniAction";
import { sizeIcon } from "../../Constant/Icon";
import { stylesFont } from "../../Constant/Font";

const Lession = (props) => {
  const [infoLession, setInfoLession] = useState({});

  useEffect(() => {
    _getData();
  }, []);

  const _getData = async () => {
    let result = await takeLessionById(props?.route?.params?.id);
    if (result?.isAxiosError) return;
    setInfoLession(result?.data?.data);
  };

  const _handleConfirm = async () => {
    let result = await completeLessionById(props?.route?.params?.id);
    if (props?.route?.params?._onModalShow) {
      props?.route?.params?._onModalShow();
    }
    if (result?.isAxiosError) return;
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={sizeIcon.lxlg}
            source={require("../../Icon/backBlack.png")}
          />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={[styles.header__title, { width: _moderateScale(280) }]}
        >
          {infoLession?.name}
        </Text>
        <Image
          style={[sizeIcon.lxlg, { opacity: 0 }]}
          source={require("../../Icon/backBlack.png")}
        />
      </View>
      <ScrollView contentContainerStyle={{}}>
        {infoLession?.videoYoutubeCodeArr?.length > 0 ? (
          <YoutubePlayer
            height={210}
            play={false}
            playList={infoLession?.videoYoutubeCodeArr}
            // onChangeState={onStateChange}
          />
        ) : (
          <></>
        )}

        <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
          <RenderHtml
            contentWidth={_width - _widthScale(0)}
            //     source={{
            //         html: `<div>
            //     {/* Hello world */}
            //     <div className="awesome" style={{border: '1px solid red'}}>
            //       <label htmlFor="name">Enter your name: </label>
            //       <input type="text" id="name" />
            //     </div>
            //     <p>Enter your HTML here</p>
            //   </div>` }}
            source={{
              html: infoLession?.content,
            }}
            enableExperimentalBRCollapsing={true}
            enableExperimentalMarginCollapsing={true}
          />
        </View>

        {Platform.OS == "ios" ? (
          <View style={{ height: 100 }} />
        ) : (
          <View style={{ height: 300 }} />
        )}
      </ScrollView>

      <View
        style={[
          {
            paddingVertical: _moderateScale(8),
            paddingBottom: getBottomSpace() + _moderateScale(8),
            paddingHorizontal: _moderateScale(8 * 2),
            backgroundColor: WHITE,
            borderTopWidth: 0.5,
            borderColor: BG_GREY_OPACITY_5,
            width: "100%",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            _handleConfirm();
          }}
          style={[
            {
              height: _moderateScale(8 * 5),
              backgroundColor: WHITE,
              borderRadius: _moderateScale(8),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: BLUE_FB,
            },
          ]}
        >
          <Text
            style={[
              stylesFont.fontNolanBold,
              { fontSize: _moderateScale(16), color: WHITE },
            ]}
          >
            Hoàn thành
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemConsultingTag: {
    paddingVertical: _moderateScale(8 * 2),
    borderBottomWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_5,
    paddingHorizontal: _moderateScale(8 * 2.5),
    flexDirection: "row",
  },
  itemConsultingTag__text: {
    ...stylesFont.fontNolan500,
    color: BLACK,
    fontSize: _moderateScale(15),
    flex: 1,
  },
  header__title: {
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(16),
    color: BLACK,
  },
  header: {
    width: "100%",
    height: _moderateScale(8 * 7),
    borderBottomWidth: 0.5,
    borderBottomColor: BG_GREY_OPACITY_5,
    alignItems: "center",
    paddingHorizontal: _moderateScale(8 * 1),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default Lession;
