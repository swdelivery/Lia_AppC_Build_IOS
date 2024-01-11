import React, { memo, useEffect } from 'react';
import { Platform, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import {
  BASE_COLOR,
  BG_GREY_OPACITY_7,
  WHITE,
  BLACK,
} from "../../Constant/Color";
import { _moderateScale } from "../../Constant/Scale";
import YoutubePlayer from "react-native-youtube-iframe";

const ModalIframeYoutube = memo((props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ props });
  }, []);

  return (
    <>
      <Modal
        supportedOrientations={["portrait", "landscape"]}
        style={{
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BLACK,

          // paddingHorizontal: _moderateScale(8 * 2),
          // paddingVertical: _moderateScale(8 * 2),
          // paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() + _moderateScale(8 * 2) : _moderateScale(8 * 2)
        }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={100}
        isVisible={props?.show}
        useNativeDriver={true}
        coverScreen={Platform.OS == "ios" ? true : true}
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => {
          props?.hide();
        }}
        onBackdropPress={() => {
          props?.hide();
        }}
        hideModalContentWhileAnimating
      >
        <View style={styles.modalFilter}>
          <YoutubePlayer
            playListStartIndex={3}
            // playListStartIndex={props?.playListStartIndex ? props?.playListStartIndex  : 0}
            height={300}
            videoId={
              props?.playList[
                props?.playListStartIndex ? props?.playListStartIndex : 0
              ]
            }
            play={true}
          />
        </View>
      </Modal>
    </>
  );
});

const gradient = {
  container: {
    width: "100%",
    height: "100%",
    // paddingVertical: basePadding.sm,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  color: ["rgba(104, 47, 144,.7)", BASE_COLOR],
};

const styles = StyleSheet.create({
  btnGoBack: {
    marginVertical: _moderateScale(12),
  },
  btnCancel: {
    height: _moderateScale(8 * 4),
    backgroundColor: WHITE,
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_7,
    width: _moderateScale(8 * 12),
    borderRadius: _moderateScale(8),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  modalFilter: {
    width: "100%",
    // paddingVertical: _heightScale(30),
    // paddingTop: _moderateScale(getStatusBarHeight() + 8 * 1),
    // paddingBottom: _moderateScale(8 * 2),
    // backgroundColor: WHITE,
    // paddingHorizontal: _moderateScale(23),
    // borderRadius: _moderateScale(8),
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: _moderateScale(8 * 2),
    // maxHeight: "100%",
    // height: "100%"
  },
});

export default ModalIframeYoutube;
