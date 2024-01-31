import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { _moderateScale, _width, _widthScale } from '@Constant/Scale'
import { GREY_FOR_TITLE, NEW_BASE_COLOR, RED, WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import { useFocused, useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import useRequireLoginCallback from 'src/Hooks/useRequireLoginAction'
import useConfigFile from 'src/Hooks/useConfigFile'
import { ConfigFileCode } from '@typings/configFile'
import { first, isEmpty } from 'lodash'
import CachedImageView from "@Components/CachedImage";
import useApi from 'src/Hooks/services/useApi'
import PartnerService from 'src/Services/PartnerService'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoUserReducer } from '@Redux/Selectors'
import { getMemberFirstMissionState } from '@Redux/memberFirstMission/selectors'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { getImageAvataUrl } from 'src/utils/avatar'
import { getMemberFirstMission } from '@Redux/memberFirstMission/actions'

const Mission = () => {
  const dispatch = useDispatch()
  const scaleMainText = useSharedValue(0);
  const scaleMainBG = useSharedValue(1);
  const { navigate } = useNavigate()
  const { isLoading, performRequest } = useApi(
    PartnerService.getMemberFirstMission,
    null
  );
  const { infoUser } = useSelector(getInfoUserReducer);
  const { data: memberFirstMission } = useSelector(getMemberFirstMissionState)

  const data = useConfigFile(ConfigFileCode.BannerMissionNewUser);

  useFocused(() => {
    if (!isEmpty(infoUser)) {
      dispatch(getMemberFirstMission.request())
    }
  })

  useEffect(() => {
    scaleMainText.value = withRepeat(withSequence(withDelay(5000, withSpring(.5)), withSpring(1)), 20);
    scaleMainBG.value = withRepeat(withSequence(withDelay(2000, withTiming(1.2, { duration: 10000 })), withTiming(1, { duration: 10000 })), -1);
  }, [])

  const _handleGoToDetail = useRequireLoginCallback(() => {
    navigate(ScreenKey.MISSION_FOR_NEW_USER)()
  }, [])

  const bannerMission = useMemo(() => {
    if (!data) {
      return null;
    }
    return first(data.fileArr);
  }, [data]);

  const animScaleMainText = useAnimatedStyle(() => {
    const interpolateOpacity = interpolate(scaleMainText.value, [0, 1], [0, 1])
    return {
      transform: [
        {
          scale: scaleMainText.value
        },
      ],
      opacity: interpolateOpacity
    }
  })
  const animScaleMainBG = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleMainBG.value
        },
      ],
    }
  })

  const ratioImage = useMemo(() => {
    return bannerMission?.dimensions?.width / bannerMission?.dimensions?.height
  }, [bannerMission])

  if (
    // memberFirstMission?.missionStatus == 'FINISHED' ||
    !ratioImage) return null

  return (
    <TouchableOpacity
      onPress={_handleGoToDetail}
      activeOpacity={.7}>
      <Column alignSelf='center'
        overflow='hidden'
        borderRadius={8}
        width={_width - _moderateScale(16) * 2}
        height={(_width - _moderateScale(16) * 2) / ratioImage}
        alignItems="center" >
        {/* <CachedImageView auto avatar={bannerMission} style={styles.image} /> */}
        <Animated.Image
          style={[{
            width: _width - _moderateScale(16) * 2,
            height: (_width - _moderateScale(16) * 2) / ratioImage
          }, animScaleMainBG]}
          source={{ uri: getImageAvataUrl(bannerMission) }} />
        <Animated.Image
          style={[{
            width: 8 * 22,
            height: 8 * 7,
            position: 'absolute',
            left: 8 * 10,
            top: 8,
            resizeMode: 'contain'
          }, animScaleMainText]}
          source={{ uri: 'https://i.ibb.co/5GW6dtq/banner-text.png' }} />
        <Column
          right={8}
          bottom={8 * 2}
          borderRadius={8 * 2}
          backgroundColor={WHITE}
          paddingVertical={4}
          borderWidth={2}
          borderColor={RED}
          paddingHorizontal={8 * 1.5}
          position='absolute'>
          <Text
            size={_moderateScale(12)}
            color={RED}
            weight='bold'>
            NHẬN NGAY
          </Text>
        </Column>
      </Column>
    </TouchableOpacity>
  )
}

export default Mission

const styles = StyleSheet.create({
  image: {
    width: _width - _moderateScale(16) * 2,
    borderRadius: _moderateScale(8),
    overflow: "hidden",
  },
  container: {
    width: _width - _widthScale(16) * 2,
    alignSelf: 'center',
    backgroundColor: WHITE,
    padding: 8 * 2,
    borderRadius: 8
  }
})
