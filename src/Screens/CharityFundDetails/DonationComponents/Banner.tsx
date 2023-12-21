import Column from '@Components/Column'
import { IconBackWhite } from '@Components/Icon/Icon'
import Text from '@Components/Text'
import { BG_BEAUTY, BLACK_OPACITY_4, BLACK_OPACITY_7, WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { getDetailCampainState } from '@Redux/charity/selectors'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'
import { getImageAvataUrl } from 'src/utils/avatar'

const Banner = () => {
  const { top } = useSafeAreaInsets();
  const { navigation } = useNavigate()
  const { data: { bannerFileArr } } = useSelector(getDetailCampainState)

  return (
    <ImageBackground
      style={styles.imageBG}
      source={{ uri: getImageAvataUrl(bannerFileArr[0]) }}>

      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["transparent", BLACK_OPACITY_7]} />

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
        marginHorizontal={8 * 2}
        bottom={8 * 6}
        position='absolute'>
        <Text
          weight='bold'
          color={WHITE}>
          Chiến dịch thiện nguyện mang nhà vệ sinh đến trẻ em mầm non vùng cao
        </Text>
      </Column>

      <View style={styles.wave} />

    </ImageBackground>
  )
}

export default Banner

const styles = StyleSheet.create({
  wave: {
    width: _width,
    height: 8 * 5,
    backgroundColor: WHITE,
    bottom: 0,
    position: 'absolute',
    borderTopEndRadius: 8 * 4,
    borderTopStartRadius: 8 * 4,
  },
  imageBG: {
    height: _width * 9 / 16,
    backgroundColor: BG_BEAUTY
  }
})
