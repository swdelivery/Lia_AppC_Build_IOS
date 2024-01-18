import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  _height,
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../Constant/Scale";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import RightEffectDotEye from "./Components/RightEffectDotEye";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import RightEffectTextEye from "./Components/RightEffectTextEye";
import RightEyeResult from "./Components/RightEyeResult";
import LeftEffectDotEye from "./Components/LeftEffectDotEye";
import LeftEffectTextEye from "./Components/LeftEffectTextEye";
import LeftEyeResult from "./Components/LeftEyeResult";
import ScreenKey from "../../Navigation/ScreenKey";
import { scanningEyes } from "../../Redux/Action/FaceAiAction";
import BackDropOpacity from "./Components/BackDropOpacity";
import RightCircle from "./Components/RightCircle";
import LeftCircle from "./Components/LeftCircle";
import { convertImageCoordsToDeviceCoords } from "src/utils/common";
import useConfirmation from "src/Hooks/useConfirmation";
import { isAndroid } from "src/utils/platform";
import useVolume from "./Components/useVolume";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackIcon } from "@Components/Icon/Icon";
import IconButton from "@Components/IconButton";
import { useTimeout } from "@r0b0t3d/react-native-hooks";
import { useIsFocused } from "@react-navigation/native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Screen from "@Components/Screen";
import useImagePicker from "./useImagePicker";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { StatusBar } from "@Components/StatusBar";
import Column from "@Components/Column";
import { useNavigate } from "src/Hooks/useNavigation";
import { BASE_COLOR } from "@Constant/Color";
import { useSelector } from "react-redux";
import { getEyeHistoryState } from "@Redux/resultcanningeyes/selectors";

const EYE_INDICATOR_SIZE = 10;

const FaceAI = () => {
  const { navigate, navigation } = useNavigate();
  const eyeHistory = useSelector(getEyeHistoryState);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  // const format = useCameraFormat(device, Templates.Instagram)

  const refCamera = useRef<Camera>(null);
  const { showConfirmation } = useConfirmation();

  const tranImageX = useSharedValue(0);
  const tranImageY = useSharedValue(0);
  const scaleImage = useSharedValue(1);

  const [posRightEyeX, setPosRightEyeX] = useState(null);
  const [posRightEyeY, setPosRightEyeY] = useState(null);
  const [posLeftEyeX, setPosLeftEyeX] = useState(null);
  const [posLeftEyeY, setPosLeftEyeY] = useState(null);

  const [imageScan, setImageScan] = useState(null);

  const [scanningResult, setScanningResult] = useState({});

  const [startDotRightEye, setStartDotRightEye] = useState(null);
  const [startCirlRightEye, setStartCirlRightEye] = useState(null);
  const [startTextRightEye, setStartTextRightEye] = useState(null);
  const [startResultRightEye, setStartResultRightEye] = useState(null);

  const [startZoomLeftEye, setStartZoomLeftEye] = useState(null);
  const [startDotLeftEye, setStartDotLeftEye] = useState(null);
  const [startCirlLeftEye, setStartCirlLeftEye] = useState(null);
  const [startTextLeftEye, setStartTextLeftEye] = useState(null);
  const [startResultLeftEye, setStartResultLeftEye] = useState(null);
  const [showBackDropOpacity, setShowBackDropOpacity] = useState(null);
  const [isReady, setIsReady] = React.useState(false);

  const { top } = useSafeAreaInsets();
  const isFocused = useIsFocused();

  // FIXME: This code is used for testing on emulator
  // __DEV__ &&
  // useImagePicker((image) => {
  //   console.log({ image });
  //   processImage({
  //     path: image,
  //   });
  // });

  const volumne = isAndroid ? useVolume() : -1;

  useTimeout(
    () => {
      setIsReady(true);
    },
    hasPermission ? 1500 : -1
  );

  //ASK PERMISSION CAMERA
  useEffect(() => {
    _checkPermission();
  }, []);

  const _checkPermission = async () => {
    let isEnablePerCamera = hasPermission;
    if (!isEnablePerCamera) {
      let result = await requestPermission();
      if (!result) {
        showConfirmation(
          "Cấp quyền truy cập",
          "Hãy bật quyền truy cập máy ảnh để sử dụng chức năng này nhé?",
          async () => {
            await Linking.openSettings();
          }
        );
      }
    }
  };

  useEffect(() => {
    if (posRightEyeX && posRightEyeY) {
      setTimeout(() => {
        tranImageX.value = withTiming(-(posRightEyeX - _width / 2), {
          duration: 500,
        });
        tranImageY.value = withTiming(-(posRightEyeY - _height / 2), {
          duration: 700,
        });
        setTimeout(() => {
          scaleImage.value = withTiming(
            2,
            {
              duration: 500,
            },
            (isFinished) => {
              if (isFinished) {
                runOnJS(setStartDotRightEye)("doing");
              }
            }
          );
        }, 0);
      }, 2000);
    }
  }, [posRightEyeX, posRightEyeY]);

  useEffect(() => {
    if (startDotRightEye == "done") {
      setStartCirlRightEye("doing");
      setStartTextRightEye("doing");
    }
  }, [startDotRightEye]);

  useEffect(() => {
    if (startDotLeftEye == "done") {
      setStartCirlLeftEye("doing");
      setStartTextLeftEye("doing");
    }
  }, [startDotLeftEye]);

  useEffect(() => {
    if (startCirlRightEye == "done") {
      setTimeout(() => {
        scaleImage.value = withTiming(
          1,
          {
            duration: 500,
          },
          (isFinished) => {
            if (isFinished) {
              tranImageX.value = withTiming(0, {
                duration: 500,
              });
              tranImageY.value = withTiming(0, {
                duration: 700,
              });
              runOnJS(setStartZoomLeftEye)("doing");
            }
          }
        );
      }, 0);
    }
  }, [startCirlRightEye]);

  useEffect(() => {
    if (startCirlLeftEye == "done") {
      setTimeout(() => {
        scaleImage.value = withTiming(
          1,
          {
            duration: 500,
          },
          (isFinished) => {
            if (isFinished) {
              tranImageX.value = withTiming(0, {
                duration: 500,
              });
              tranImageY.value = withTiming(0, {
                duration: 700,
              });
              // runOnJS(setStartZoomLeftEye)('doing')
            }
          }
        );
        setShowBackDropOpacity("hiding");
        setStartResultRightEye(true);
        setStartResultLeftEye(true);

        setTimeout(() => {
          navigation.navigate(ScreenKey.RESULT_AI_SCAN_EYES, {
            scanningResult,
            imageScan,
          });
          // Reset all state
          setScanningResult(null);
          setImageScan(null);
          setStartResultRightEye(null);
          setStartResultLeftEye(null);
          setStartZoomLeftEye(null);
          setStartDotLeftEye(null);
          setStartCirlLeftEye(null);
          setStartTextLeftEye(null);
          setStartDotRightEye(null);
          setStartCirlRightEye(null);
          setStartTextRightEye(null);
          setShowBackDropOpacity(null);
        }, 3000);
      }, 1000);
    }
  }, [startCirlLeftEye]);

  useEffect(() => {
    if (startZoomLeftEye == "doing") {
      setTimeout(() => {
        tranImageX.value = withTiming(-(posLeftEyeX - _width / 2), {
          duration: 500,
        });
        tranImageY.value = withTiming(-(posLeftEyeY - _height / 2), {
          duration: 700,
        });
        setTimeout(() => {
          scaleImage.value = withTiming(
            2,
            {
              duration: 500,
            },
            (isFinished) => {
              if (isFinished) {
                runOnJS(setStartDotLeftEye)("doing");
              }
            }
          );
        }, 0);
      }, 1000);
    }
  }, [startZoomLeftEye]);

  const processImage = async (photo) => {
    setImageScan(photo?.path);
    let result = await scanningEyes(photo);
    // console.log({ message: result?.data?.message });
    if (result?.data?.message == "SUCCESS") {
      // console.log("DONE" + result?.data?.data?.right?.coordinate_eye_origi);
      const { left, right, width, height } = result?.data?.data;

      // console.log({ x: result?.data?.data?.right?.coordinate_eye_origi[0] });
      // console.log({ y: result?.data?.data?.right?.coordinate_eye_origi[1] });
      // console.log({ _width, _height });

      let [valueRightX, valueRightY] = convertImageCoordsToDeviceCoords(
        right?.coordinate_eye_origi,
        width,
        height
      );
      let [valueLeftX, valueLeftY] = convertImageCoordsToDeviceCoords(
        left?.coordinate_eye_origi,
        width,
        height
      );

      // console.log({
      //   valueRightX,
      //   valueRightY,
      //   valueLeftX,
      //   valueLeftY,
      // });
      // return navigation.replace(ScreenKey.RESULT_AI_SCAN_EYES, { scanningResult: result?.data?.data, imageScan: photo?.path });
      setShowBackDropOpacity("doing");

      setPosRightEyeX(valueRightX);
      setPosRightEyeY(valueRightY);

      setPosLeftEyeX(valueLeftX);
      setPosLeftEyeY(valueLeftY);

      setScanningResult(result?.data?.data);
    } else {
      if (result?.data?.code === 400) {
        Alert.alert(result?.data?.data);
      } else {
        Alert.alert(
          "Hình chưa hợp lệ!",
          "Xin hãy chú ý về vị trí khuôn mặt, độ nét và môi trường ánh sáng"
        );
      }
      setImageScan(null);
    }
  };

  const _handleTakePhoto = async () => {
    const photo = await refCamera.current.takePhoto({
      enableShutterSound: volumne !== 0,
      qualityPrioritization: "quality",
    });
    if (__DEV__) {
      await CameraRoll.save(`file://${photo.path}`, {
        type: "photo",
      });
    }
    processImage(photo);
  };

  // ANIMATED
  const animScaleImage = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleImage.value,
        },
        {
          translateX: tranImageX.value,
        },
        {
          translateY: tranImageY.value,
        },
      ],
    };
  });

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      {/* <View
        style={{
          width: EYE_INDICATOR_SIZE,
          aspectRatio: 1,
          backgroundColor: "red",
          position: "absolute",
          zIndex: 100,
          top: posRightEyeY - EYE_INDICATOR_SIZE / 2,
          left: posRightEyeX - EYE_INDICATOR_SIZE / 2,
        }}
      />
      <View
        style={{
          width: EYE_INDICATOR_SIZE,
          aspectRatio: 1,
          backgroundColor: "red",
          position: "absolute",
          zIndex: 100,
          top: posLeftEyeY - EYE_INDICATOR_SIZE / 2,
          left: posLeftEyeX - EYE_INDICATOR_SIZE / 2,
        }}
      /> */}

      <BackDropOpacity
        setShowBackDropOpacity={setShowBackDropOpacity}
        show={showBackDropOpacity}
      />

      <RightEffectDotEye
        setStartDotRightEye={setStartDotRightEye}
        startDotRightEye={startDotRightEye}
      />

      <LeftEffectDotEye
        setStartDotLeftEye={setStartDotLeftEye}
        startDotLeftEye={startDotLeftEye}
      />

      <RightCircle
        startTextRightEye={startTextRightEye}
        startCirlRightEye={startCirlRightEye}
        setStartCirlRightEye={setStartCirlRightEye}
      />
      <LeftCircle
        startTextLeftEye={startTextLeftEye}
        startCirlLeftEye={startCirlLeftEye}
        setStartCirlLeftEye={setStartCirlLeftEye}
      />
      <RightEffectTextEye
        scanningResult={scanningResult}
        setStartTextRightEye={setStartTextRightEye}
        startTextRightEye={startTextRightEye}
      />
      <LeftEffectTextEye
        scanningResult={scanningResult}
        setStartTextLeftEye={setStartTextLeftEye}
        startTextLeftEye={startTextLeftEye}
      />

      <RightEyeResult
        scanningResult={scanningResult}
        startRightResult={startResultRightEye}
      />
      <LeftEyeResult
        scanningResult={scanningResult}
        startRightResult={startResultLeftEye}
      />

      {imageScan ? (
        <View
          style={{
            width: _width,
            height: _height,
            position: "absolute",
            zIndex: -1,
          }}
        >
          <Animated.View style={animScaleImage}>
            {Platform.OS == "ios" ? (
              <Image
                style={[
                  {
                    width: _width,
                    height: _height,
                  },
                ]}
                source={{ uri: `${imageScan}` }}
              />
            ) : (
              <Image
                style={[
                  {
                    width: _width,
                    height: _height,
                  },
                ]}
                resizeMode="cover"
                source={{ uri: `file://${imageScan}` }}
              />
            )}

            {/* <View
              style={{
                position: "absolute",
                width: EYE_INDICATOR_SIZE,
                aspectRatio: 1,
                borderRadius: 5,
                // backgroundColor: 'green',
                zIndex: 100,
                top: posRightEyeY,
                left: posRightEyeX,
              }}
            >
              <RightEffectDotEye
                setStartDotRightEye={setStartDotRightEye}
                startDotRightEye={startDotRightEye}
              />
            </View> */}

            {/* <View
              style={{
                position: "absolute",
                width: EYE_INDICATOR_SIZE,
                aspectRatio: 1,
                borderRadius: 5,
                // backgroundColor: 'green',
                zIndex: 100,
                top: posLeftEyeY,
                left: posLeftEyeX,
              }}
            >
              <LeftEffectDotEye
                setStartDotLeftEye={setStartDotLeftEye}
                startDotLeftEye={startDotLeftEye}
              />
            </View> */}
          </Animated.View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...StyleSheet.absoluteFill,
              position: "absolute",
              borderWidth: 1,
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,.5)",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {device && (
                <Camera
                  enableHighQualityPhotos={true}
                  orientation={"portrait"}
                  ref={refCamera}
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={isReady && isFocused}
                  photo={true}
                  // photoHdr={true}
                  enableDepthData={true}
                  enablePortraitEffectsMatteDelivery={true}
                  // format={format}
                />
              )}
              <View
                style={{
                  position: "absolute",
                  top: _heightScale(8 * 16),
                }}
              >
                <Text
                  style={{
                    fontSize: _moderateScale(14),
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {`Giữ gương mặt ở giữa vòng tròn ${`\n`} Nhìn thẳng vào camera và nhấn chụp`}
                </Text>
              </View>

              <Animated.Image
                source={require("../../Image/circle.png")}
                style={{
                  width: _widthScale(360),
                  height: _widthScale(360),
                }}
              />

              <TouchableOpacity
                onPress={_handleTakePhoto}
                style={{
                  position: "absolute",
                  bottom: _heightScale(8 * 10),
                  width: _moderateScale(8 * 10),
                  height: _moderateScale(8 * 10),
                  borderRadius: _moderateScale(8 * 10) / 2,
                  borderWidth: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "white",
                }}
              >
                <View
                  style={{
                    width: _moderateScale(8 * 8),
                    height: _moderateScale(8 * 8),
                    borderRadius: _moderateScale(8 * 8) / 2,
                    backgroundColor: "white",
                  }}
                ></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <Row
        position="absolute"
        top={top}
        left={0}
        right={0}
        marginHorizontal={16}
        marginVertical={8}
        justifyContent="space-between"
        zIndex={10}
      >
        <IconButton onPress={navigation.goBack}>
          <BackIcon />
        </IconButton>
        <Column
          onPress={navigate(ScreenKey.RESULT_AI_SCAN_EYES, {
            ...eyeHistory,
            fromHistory: true,
          })}
        >
          <Text color={"white"} fontStyle="italic">
            Kết quả phân tích
          </Text>
        </Column>
      </Row>
    </Screen>
  );
};

export default FaceAI;
