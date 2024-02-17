import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { _moderateScale, _width, _widthScale } from "@Constant/Scale";
import { RED, WHITE } from "@Constant/Color";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import useConfigFile from "src/Hooks/useConfigFile";
import { ConfigFileCode } from "@typings/configFile";
import { first, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUserReducer } from "@Redux/Selectors";
import { getMemberFirstMissionState } from "@Redux/memberFirstMission/selectors";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { getMemberFirstMission } from "@Redux/memberFirstMission/actions";
import CachedImageView from "@Components/CachedImage";
import { CacheManager, CachedImage } from "@georstat/react-native-image-cache";
import { getImageAvataUrl } from "src/utils/avatar";

const Mission = () => {
  const dispatch = useDispatch();
  const scaleMainText = useSharedValue(0);
  const scaleMainBG = useSharedValue(1);
  const { navigate } = useNavigate();
  const { infoUser } = useSelector(getInfoUserReducer);
  const [isReady, setReady] = useState(false);
  const { data: memberFirstMission } = useSelector(getMemberFirstMissionState);

  const data = useConfigFile(ConfigFileCode.BannerMissionNewUser);

  useFocused(() => {
    if (!isEmpty(infoUser)) {
      dispatch(getMemberFirstMission.request());
    }
  });

  useEffect(() => {
    scaleMainText.value = withRepeat(
      withSequence(withDelay(5000, withSpring(0.5)), withSpring(1)),
      20
    );
    scaleMainBG.value = withRepeat(
      withSequence(
        withDelay(2000, withTiming(1.2, { duration: 10000 })),
        withTiming(1, { duration: 10000 })
      ),
      -1
    );
  }, []);

  const _handleGoToDetail = useRequireLoginCallback(() => {
    navigate(ScreenKey.MISSION_FOR_NEW_USER)();
  }, []);

  const bannerMission = useMemo(() => {
    if (!data) {
      return null;
    }
    return first(data.fileArr);
  }, [data]);

  useEffect(() => {
    if (bannerMission) {
      CacheManager.prefetchBlob(getImageAvataUrl(bannerMission)).then(() =>
        setReady(true)
      );
    }
  }, [bannerMission]);

  const animScaleMainText = useAnimatedStyle(() => {
    const interpolateOpacity = interpolate(scaleMainText.value, [0, 1], [0, 1]);
    return {
      transform: [
        {
          scale: scaleMainText.value,
        },
      ],
      opacity: interpolateOpacity,
    };
  });
  const animScaleMainBG = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleMainBG.value,
        },
      ],
    };
  });

  const ratioImage = useMemo(() => {
    return bannerMission?.dimensions?.width / bannerMission?.dimensions?.height;
  }, [bannerMission]);

  if (
    // memberFirstMission?.missionStatus == 'FINISHED' ||
    !ratioImage ||
    !isReady
  )
    return null;

  return (
    <TouchableOpacity onPress={_handleGoToDetail} activeOpacity={0.7}>
      <Column
        alignSelf="center"
        overflow="hidden"
        borderRadius={8}
        width={_width - _moderateScale(16) * 2}
        height={(_width - _moderateScale(16) * 2) / ratioImage}
        alignItems="center"
      >
        {/* <CachedImageView auto avatar={bannerMission} style={styles.image} /> */}
        <Animated.View
          style={[
            {
              width: _width - _moderateScale(16) * 2,
              height: (_width - _moderateScale(16) * 2) / ratioImage,
            },
            animScaleMainBG,
          ]}
        >
          <CachedImageView
            avatar={bannerMission}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <Animated.View
          style={[
            {
              width: 8 * 22,
              height: 8 * 7,
              position: "absolute",
              left: 8 * 10,
              top: 8,
            },
            animScaleMainText,
          ]}
        >
          <CachedImage
            source={"https://i.ibb.co/5GW6dtq/banner-text.png"}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <Column
          right={8}
          bottom={8 * 2}
          borderRadius={8 * 2}
          backgroundColor={WHITE}
          paddingVertical={4}
          borderWidth={2}
          borderColor={RED}
          paddingHorizontal={8 * 1.5}
          position="absolute"
        >
          <Text size={_moderateScale(12)} color={RED} weight="bold">
            NHẬN NGAY
          </Text>
        </Column>
      </Column>
    </TouchableOpacity>
  );
};

export default Mission;
