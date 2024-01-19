import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Screen from '@Components/Screen'
import { styleElement } from '@Constant/StyleElement'
import Column from '@Components/Column'
import { BLACK_OPACITY_4, BORDER_COLOR, GREY, GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Image from '@Components/Image'
import { IconBackWhite, IconFacebook, IconWWW } from '@Components/Icon/Icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigate } from 'src/Hooks/useNavigation'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Icon from '@Components/Icon'
import Spacer from '@Components/Spacer'
import HorizontalLine from '@Components/Line/HorizontalLine'

const AboutLiA = () => {
  const { top } = useSafeAreaInsets()
  const { navigation } = useNavigate()

  return (
    <Screen>
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
          position="absolute">
          <IconBackWhite />
        </Column>

        <Column
          borderTopLeftRadius={8 * 2}
          borderTopRightRadius={8 * 2}
          marginTop={8 * 20}
          backgroundColor={WHITE}
          flex={1}>
          <Image
            style={[styles.logo, styleElement.shadow]}
            avatar={null} />

          <ScrollView style={{ paddingTop: 8 * 6 }}>
            <Column alignItems='center'>
              <Text
                size={18}
                weight='bold'>
                LiA
              </Text>
              <Text>
                Giới thiệu vắn tắt
              </Text>
              <Text>
                Slogan thương hiệu
              </Text>

              <Row gap={8} marginTop={8 * 2}>
                <IconFacebook width={8 * 4} height={8 * 4} />
                <Column
                  style={styleElement.centerChild}
                  backgroundColor={NEW_BASE_COLOR}
                  width={8 * 4}
                  borderRadius={4}
                  height={8 * 4}>
                  <IconWWW width={8 * 3} height={8 * 3} />
                </Column>
                <Row
                  borderRadius={4}
                  paddingHorizontal={8}
                  backgroundColor={NEW_BASE_COLOR}
                  height={8 * 4}
                  gap={4}>
                  <Icon name='star' color='#FFC007' />
                  <Text weight='bold' color={WHITE}>
                    Đánh giá
                  </Text>
                </Row>
              </Row>
            </Column>
            <Spacer top={8 * 3} />

            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 8 * 2 }}
              horizontal>
              {
                [1, 2, 3, 4, 5, 6].map((item, index) => {
                  return (
                    <Image
                      style={styles.image}
                      avatar={null} />
                  )
                })
              }
            </ScrollView>

            <HorizontalLine marginTop={8 * 2} height={4} backgroundColor={"#F3F4F9"} />

            <Column
              gap={8}
              padding={8 * 2}>
              <Text
                weight='bold'
                size={16}>
                Thông tin về LiA
              </Text>

              <Row>
                <Column flex={1}>
                  <Text
                    color={GREY}
                    weight='bold'>
                    Hotline
                  </Text>
                </Column>
                <Column flex={5}>
                  <Text
                    color={GREY_FOR_TITLE}
                    weight='bold'>
                    0961096101
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column flex={1}>
                  <Text
                    color={GREY}
                    weight='bold'>
                    Email
                  </Text>
                </Column>
                <Column flex={5}>
                  <Text
                    color={GREY}>
                    hotro247@lia.vn
                  </Text>
                </Column>
              </Row>
              <Column>
                <Column>
                  <Text
                    color={GREY}
                    weight='bold'>
                    Địa chỉ
                  </Text>
                </Column>
                <Column>
                  <Text
                    color={GREY}>
                    434 CAO THANG P12 Q10 TPHCM
                  </Text>
                </Column>
              </Column>
            </Column>

          </ScrollView>

        </Column>
      </ImageBackground>

    </Screen>
  )
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
