import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Column from '@Components/Column'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Row from '@Components/Row'
import { IconBackBase, IconBackBlue, IconBackGrey, IconFindGrey, IconLike } from '@Components/Icon/Icon'
import Text from '@Components/Text'
import { sizeIcon } from '@Constant/Icon'
import { styleElement } from '@Constant/StyleElement'
import { useNavigate } from 'src/Hooks/useNavigation'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { BORDER_COLOR, WHITE } from '@Constant/Color'
import { _widthScale } from '@Constant/Scale'

const Header = () => {
  const { top } = useSafeAreaInsets()
  const { navigation } = useNavigate()
  const RefTextInput = useRef(null)

  const widthExpandInput = useSharedValue(0)
  const opacityExpandInput = useSharedValue(0);

  const opacityTitle = useSharedValue(1);

  const [isExpandTextInput, setIsExpandTextInput] = useState(false)

  const _handleToggle = () => {
    setIsExpandTextInput(old => !old)
  }

  useEffect(() => {
    if (isExpandTextInput) {
      RefTextInput?.current?.focus();
      widthExpandInput.value = withTiming(_widthScale(230), { duration: 500 })
      opacityExpandInput.value = withTiming(1, { duration: 300 })
      opacityTitle.value = withTiming(0, { duration: 200 })
    } else {
      widthExpandInput.value = withTiming(0, { duration: 500 })
      opacityExpandInput.value = withTiming(0, { duration: 500 }, (isFns) => {
        if (isFns) {
          opacityTitle.value = withTiming(1, { duration: 200 })
        }
      })
    }
  }, [isExpandTextInput])

  const animWidthExpandInput = useAnimatedStyle(() => {
    return {
      width: widthExpandInput.value,
      opacity: opacityExpandInput.value
    }
  })
  const animTitle = useAnimatedStyle(() => {
    return {
      opacity: opacityTitle.value
    }
  })

  return (
    <View>
      <Column height={top} />
      <Row
        paddingTop={8}
        justifyContent='space-between'
        padding={8 * 2}>
        <Column width={_widthScale(70)}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={styleElement.hitslopSm}>
            <IconBackBlue />
          </TouchableOpacity>
        </Column>
        <Row justifyContent='center' flex={1}>
          {
            isExpandTextInput ?
              <>
              </>
              :
              <Column alignSelf='center' position='absolute'>
                <Animated.View style={animTitle}>
                  <Text color={'#366792'} weight="bold" size={16}>
                    Danh sách dịch vụ
                  </Text>
                </Animated.View>
              </Column>
          }
          <Animated.View style={[styles.containerExpandInput, animWidthExpandInput]}>
            <Row
              gap={8}
              paddingHorizontal={8}>
              <IconFindGrey style={sizeIcon.lg} />
              <TextInput
                style={{ flex: 1 }}
                ref={RefTextInput}
                onBlur={_handleToggle}
                placeholder='Nhập thông tin tìm kiếm' />
            </Row>
          </Animated.View>
        </Row>
        <Row gap={8 * 2} justifyContent='flex-end' width={_widthScale(70)}>
          {
            isExpandTextInput ?
              <>
              </>
              :
              <TouchableOpacity onPress={_handleToggle}>
                <IconFindGrey style={sizeIcon.lg} />
              </TouchableOpacity>
          }
          <TouchableOpacity style={{ opacity: .6 }}>
            <IconLike />
          </TouchableOpacity>
        </Row>
      </Row>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  containerExpandInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: BORDER_COLOR,
    backgroundColor: WHITE,
    justifyContent: 'center'
  }
})
