import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  _Image,
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  _height,
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "@Constant/Scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Video from "react-native-video";
import { BLACK, WHITE } from "@Constant/Color";
import Text from "@Components/Text";
import LinearGradient from "react-native-linear-gradient";
import { IconPlayWhite } from "@Components/Icon/Icon";
import { sizeIcon } from "@Constant/Icon";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { URL_ORIGINAL } from "@Constant/Url";
// import LottieView from "lottie-react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { styleElement } from "@Constant/StyleElement";
import LoadingIndicator from "@Components/LoadingIndicator/LoadingIndicator";

// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const WIDTH_PROCESS_BAR = _width - _widthScale(8 * 2);

const VideoPlayer = memo((props) => {
  const videoRef = useRef(null);
  const currPlayingTimeRef = useRef(0);

  const { top } = useSafeAreaInsets();

  const [currVideoData, setCurrVideoData] = useState(null);
  const [currPlayingTime, setCurrPlayingTime] = useState(0);
  const [isPlaying, setIsIsPlaying] = useState(false);

  const [isHearted, setIsHearted] = useState(false);
  const [startHeartedAnimation, setStartHeartedAnimation] = useState(null);

  const [onEndSwipSeekVideo, setOnEndSwipSeekVideo] = useState(null);
  const [onLoadDone, setOnLoadDone] = useState(false);

  const tranDotX = useSharedValue(0);

  const { data } = props;
  const { isActive } = props;

  useEffect(() => { }, []);

  useEffect(() => {
    if (isActive) {
      setIsIsPlaying(true);
    } else {
      setIsIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isHearted) {
    }
  }, [isHearted]);

  useEffect(() => {
    if (onEndSwipSeekVideo) {
      console.log({ onEndSwipSeekVideo });
      videoRef?.current?.seek(onEndSwipSeekVideo);
      currPlayingTimeRef.current = onEndSwipSeekVideo;
      setIsIsPlaying(true);
    }
  }, [onEndSwipSeekVideo]);

  useEffect(() => {
    if (currVideoData?.duration && isPlaying) {
      console.log({ currPlayingTimeRef });

      tranDotX.value = withTiming(WIDTH_PROCESS_BAR, {
        duration:
          currVideoData.duration * 1000 - currPlayingTimeRef.current * 1000,
      });
    } else {
      if (currVideoData?.duration) {
        tranDotX.value = tranDotX.value;
      } else {
        tranDotX.value = 0;
      }
    }
  }, [currVideoData, isPlaying]);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      runOnJS(setIsIsPlaying)(false);
      ctx.startX = tranDotX.value;
    },
    onActive: (event, ctx) => {
      console.log({ onActive: "onActive", event, ctx });
      tranDotX.value = event.translationX + ctx.startX;
    },
    onEnd: (event, ctx) => {
      // console.log({ onEnd: "onEnd", event, ctx });
      // console.log({ x: event.absoluteX, y: refDurationTimeTrack.current, z: WIDTH_PROGESS_BAR });
      let timeSeek =
        (event.absoluteX * currVideoData?.duration) / WIDTH_PROCESS_BAR;
      runOnJS(setOnEndSwipSeekVideo)(timeSeek);
      // videoRef?.current.seek(timeSeek)
      // SoundPlayer.seek(x)
    },
  });

  const _handleSeekVideo = (timeSeek) => {
    console.log({ timeSeek });
  };

  const animDotX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tranDotX.value,
        },
      ],
    };
  });

  const progressBarFillAnim = useAnimatedStyle(() => {
    const interpolateFillProgressBar = interpolate(
      tranDotX.value,
      [0, WIDTH_PROCESS_BAR],
      [0, WIDTH_PROCESS_BAR]
    );

    return {
      width: interpolateFillProgressBar,
    };
  });

  return (
    <View
      style={{
        width: _width,
        height: Platform.OS == "ios" ? _height : _height,
      }}
    >
      {/* <View style={styles.rightBox}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: `https://avatars.githubusercontent.com/u/44693779?v=4`
                    }}
                />

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            if (!isHearted) {
                                setStartHeartedAnimation('doing')
                            }
                            setIsHearted(old => !old)
                        }}
                        style={{
                            marginTop: _moderateScale(8 * 2),
                            alignItems: 'center'
                        }}>
                        {
                            isHearted ?
                                <IconHeartFilled style={sizeIcon.lllg} />
                                :
                                <IconHeartWhite style={sizeIcon.lllg} />
                        }

                    </TouchableOpacity>
                    <Text color={WHITE} weight='bold' size={14}>
                        34,2K
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        props?.setShowModalComment({
                            isShow: true,
                            data: null
                        })
                    }}
                    style={{
                        marginTop: _moderateScale(8 * 2),
                        alignItems: 'center'
                    }}>
                    <IconCommentWhite style={sizeIcon.lllg} />

                    <Text color={WHITE} weight='bold' size={14}>
                        68
                    </Text>
                </TouchableOpacity>
            </View> */}

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setIsIsPlaying((old) => !old);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HeartedAnimation
          startHeartedAnimation={startHeartedAnimation}
          setStartHeartedAnimation={setStartHeartedAnimation}
        />

        {isPlaying ? (
          <></>
        ) : (
          <View style={{ opacity: 0.5, position: "absolute" }}>
            <IconPlayWhite style={sizeIcon.lllg} />
          </View>
        )}
      </TouchableOpacity>

      {!onLoadDone ? (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { ...styleElement.centerChild, zIndex: 10 },
          ]}
        >
          <LoadingIndicator color={WHITE} title={"Đang tải Video..."} />
        </View>
      ) : (
        <></>
      )}

      <Video
        ref={videoRef}
        onLoad={(e) => {
          setCurrVideoData(e);
          setOnLoadDone(true);
        }}
        source={{ uri: `${URL_ORIGINAL}${data?.video?.link}` }}
        // source={{ uri: `${data?.uri}` }}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="contain"
        paused={!isPlaying}
        repeat={false}
        onProgress={(e) => {
          // setCurrPlayingTime(e.currentTime)
          currPlayingTimeRef.current = e.currentTime;
        }}
        onSeek={(e) => {
          console.log({ e });
          if (currPlayingTimeRef.current == 0) {
            setIsIsPlaying(false);
          }
        }}
        onEnd={() => {
          tranDotX.value = 0;
          currPlayingTimeRef.current = 0;
          videoRef?.current?.seek(0);
        }}
      />

      <LinearGradient
        style={styles.linearStyle}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["transparent", "#000"]}
      ></LinearGradient>

      <View style={styles.bottomBox}>
        <Text weight={"bold"} color={"white"} size={16}>
          {data?.name}
        </Text>
        <Text weight={"regular"} color={"white"} size={16}>
          {data?.description}
        </Text>
      </View>

      <View
        style={{
          width: _width,
          height: _heightScale(8 * 8),
          position: "absolute",
          zIndex: 4,
          bottom: 0,
          backgroundColor: BLACK,
        }}
      >
        <Animated.View
          style={[
            {
              height: _moderateScale(4),
              backgroundColor: "rgba(256,256,256,1)",
              position: "absolute",
              top: -_moderateScale(2),
            },
            progressBarFillAnim,
          ]}
        />

        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View
            hitSlop={styleElement.hitslopMd}
            style={[
              {
                width: _moderateScale(8 * 2),
                height: _moderateScale(8 * 2),
                borderRadius: _moderateScale(8),
                backgroundColor: WHITE,
                position: "absolute",
                top: -_moderateScale(8),
                zIndex: 10,
              },
              animDotX,
            ]}
          />
        </PanGestureHandler>

        <View
          style={{
            width: _width,
            height: _moderateScale(4),
            backgroundColor: "rgba(256,256,256,0.3)",
            position: "absolute",
            top: -_moderateScale(2),
          }}
        ></View>
      </View>
    </View>
  );
});

export default VideoPlayer;

const HeartedAnimation = memo((props) => {
  const animationHeartedProgress = useSharedValue(0);
  const opacityHearted = useSharedValue(0);

  const tranY = useSharedValue(0);

  useEffect(() => {
    if (props?.startHeartedAnimation == "doing") {
      tranY.value = withSpring(-100, {
        mass: 1,
        damping: 10,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
      });

      opacityHearted.value = withTiming(1, { duration: 200 }, (fns) => {
        if (fns) {
          animationHeartedProgress.value = withTiming(
            1,
            { duration: 1000 },
            (fns) => {
              if (fns) {
                opacityHearted.value = withTiming(
                  0,
                  { duration: 500 },
                  (fns) => {
                    animationHeartedProgress.value = 0;
                    opacityHearted.value = 0;
                    tranY.value = 0;
                    runOnJS(props?.setStartHeartedAnimation)("done");
                  }
                );
              }
            }
          );
        }
      });
    }
  }, [props?.startHeartedAnimation]);

  const animOpacityHearted = useAnimatedStyle(() => {
    return {
      opacity: opacityHearted.value,
    };
  });
  const animTranYHeart = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: tranY.value,
        },
      ],
    };
  });

  return (
    <>
      {/* {props?.startHeartedAnimation == "doing" ? (
        <AnimatedLottieView
          style={[
            { width: 300, height: 300 },
            animOpacityHearted,
            animTranYHeart,
          ]}
          source={require("../../../Json/hearted.json")}
          progress={animationHeartedProgress}
        />
      ) : (
        <></>
      )} */}
    </>
  );
});

const styles = StyleSheet.create({
  bottomBox: {
    width: _width,
    position: "absolute",
    bottom: _heightScale(8 * 11),
    paddingHorizontal: _moderateScale(8 * 2),
    zIndex: 2,
  },
  linearStyle: {
    width: _width,
    height: _moderateScale(8 * 40),
    position: "absolute",
    zIndex: 1,
    bottom: 0,
  },
  avatar: {
    width: _moderateScale(8 * 6),
    height: _moderateScale(8 * 6),
    borderRadius: _moderateScale(8 * 3),
    borderWidth: 2,
    borderColor: WHITE,
  },
  rightBox: {
    width: _widthScale(8 * 10),
    height: _moderateScale(8 * 50),
    position: "absolute",
    right: 0,
    zIndex: 3,
    bottom: _heightScale(8 * 8),
    alignItems: "center",
  },
});
