import Column from '@Components/Column'
import Icon from '@Components/Icon'
import { IconBackWhite, IconFacebook, IconWWW } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import { StatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BLACK_OPACITY_4, GREY, GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { getAboutLiA } from '@Redux/aboutLiA/actions'
import { getAboutLiAState } from '@Redux/aboutLiA/selectors'
import React, { useCallback, useEffect } from 'react'
import { ImageBackground, Linking, ScrollView, StyleSheet } from 'react-native'
import Rate, { AndroidMarket } from 'react-native-rate'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

const AboutLiA = () => {
  const { data } = useSelector(getAboutLiAState)
  const { top } = useSafeAreaInsets()
  const { navigation } = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAboutLiA.request())
  }, [])

  const _handleRateApp = useCallback(() => {
    const options = {
      AppleAppID: "id6474897526",
      GooglePackageName: "com.digitech.lia",
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
    };
    Rate.rate(options, (success, errorMessage) => {
      if (success) {
        console.log({ success });
      }
      if (errorMessage) {
        console.error(`Example page Rate.rate() error: ${errorMessage}`)
      }
    })
  }, [])

  const _handleLinking = useCallback((link) => () => {
    Linking.openURL(link)
  }, [])

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        resizeMode={"stretch"}
        style={styleElement.flex}
        source={require("../../NewImage/ExaminationResult/bgExaminationResult.png")}
      >
        <Column
          onPress={navigation.goBack}
          backgroundColor={BLACK_OPACITY_4}
          top={top + 20}
          borderRadius={8 * 10}
          left={20}
          position="absolute"
        >
          <IconBackWhite />
        </Column>

        <Column
          borderTopLeftRadius={8 * 2}
          borderTopRightRadius={8 * 2}
          marginTop={8 * 20}
          backgroundColor={WHITE}
          flex={1}
        >
          <Image style={[styles.logo]} avatar={data?.logo ?? null} />

          <ScrollView>
            <Column alignItems="center" marginTop={40} marginHorizontal={16}>
              <Text size={18} weight="bold">
                {data?.name ?? ""}
              </Text>
              <Text>{data?.description ?? ""}</Text>
              <Text>{data?.slogan ?? ""}</Text>

              <Row gap={8} marginTop={8 * 2}>
                <Column onPress={_handleLinking(data?.facebook_link)}>
                  <IconFacebook width={8 * 4} height={8 * 4} />
                </Column>
                <Column
                  onPress={_handleLinking(data?.website)}
                  style={styleElement.centerChild}
                  backgroundColor={NEW_BASE_COLOR}
                  width={8 * 4}
                  borderRadius={4}
                  height={8 * 4}
                >
                  <IconWWW width={8 * 3} height={8 * 3} />
                </Column>
                <Row
                  onPress={_handleRateApp}
                  borderRadius={4}
                  paddingHorizontal={8}
                  backgroundColor={NEW_BASE_COLOR}
                  height={8 * 4}
                  gap={4}
                >
                  <Icon name="star" color="#FFC007" />
                  <Text weight="bold" color={WHITE}>
                    Đánh giá
                  </Text>
                </Row>
              </Row>
            </Column>
            <Spacer top={8 * 3} />

            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 8 * 2 }}
              horizontal
            >
              {data?.image?.map((item, index) => {
                return (
                  <Image key={item?._id} style={styles.image} avatar={item} />
                );
              })}
            </ScrollView>

            <HorizontalLine
              marginTop={8 * 2}
              height={4}
              backgroundColor={"#F3F4F9"}
            />

            <Column gap={8} padding={8 * 2}>
              <Text weight="bold" size={16}>
                Thông tin về LiA
              </Text>

              <Row>
                <Column flex={1}>
                  <Text color={GREY} weight="bold">
                    Hotline
                  </Text>
                </Column>
                <Column flex={5}>
                  <Text color={GREY_FOR_TITLE} weight="bold">
                    {data?.hotline}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column flex={1}>
                  <Text color={GREY} weight="bold">
                    Email
                  </Text>
                </Column>
                <Column flex={5}>
                  <Text color={GREY}>{data?.email}</Text>
                </Column>
              </Row>
              <Column>
                <Column>
                  <Text color={GREY} weight="bold">
                    Địa chỉ
                  </Text>
                </Column>
                <Column>
                  <Text color={GREY}>434 CAO THANG P12 Q10 TPHCM</Text>
                </Column>
              </Column>
            </Column>
          </ScrollView>
        </Column>
      </ImageBackground>
    </Screen>
  );
}

export default AboutLiA

const styles = StyleSheet.create({
  image: {
    width: 8 * 20,
    height: 8 * 20,
    borderRadius: 8
  },
  logo: {
    width: 8 * 10,
    height: 8 * 10,
    borderRadius: 8 * 10 / 2,
    alignSelf: 'center',
    top: - 8 * 2.5,
    position: 'absolute',
    zIndex: 1
  }
})
