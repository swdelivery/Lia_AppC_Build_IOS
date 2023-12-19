import { ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import { BLACK_OPACITY_7, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import LinearGradient from 'react-native-linear-gradient'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Avatar from '@Components/Avatar'

const CardCampaign = () => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 8 }}
      style={styles.imgBG}
      source={{ uri: `https://ninhbinh.edu.vn/upload/46569/fck/files/2021_02_28_09_22_181.png` }}>
      <LinearGradient
        style={[StyleSheet.absoluteFill, { borderRadius: 8 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["transparent", BLACK_OPACITY_7]} />

      <Column
        top={8}
        left={8}
        position='absolute'
        paddingVertical={2}
        borderRadius={8}
        backgroundColor={WHITE}
        paddingHorizontal={8}>
        <Text size={12} color={NEW_BASE_COLOR}>
          70 Ngày
        </Text>
      </Column>

      <Column
        gap={8}
        position='absolute'
        bottom={8}
        marginHorizontal={8 * 2}>
        <Text
          weight='bold'
          color={WHITE}>
          Chiến dịch mang nhà vệ sinh đến trẻ em vùng cao
        </Text>
        <Row gap={8}>
          <Avatar size={8 * 3} avatar={null} />
          <Text
            color={WHITE}
            weight='bold'>Quỹ thiện nguyện sinh viên</Text>
        </Row>
      </Column>
    </ImageBackground>
  )
}

export default CardCampaign

const styles = StyleSheet.create({
  imgBG: {
    height: 8 * 18,
  }
})
