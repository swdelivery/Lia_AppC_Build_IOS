import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { _heightScale, _width, _widthScale } from '@Constant/Scale'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

const Banner = () => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('../../../Image/charity/BG.png')}>

      <View style={[styles.containerCard, shadow]}>
        <ImageBackground
          style={styles.creditCard}
          source={require('../../../Image/charity/Card.png')} >
          <Column
            paddingBottom={8 * 2}
            gap={8}
            alignItems='center'
            justifyContent='center'
            flex={1}>
            <Text
              size={16}
              color={WHITE}>
              Số dư hiện tại
            </Text>
            <Text
              weight='bold'
              size={20}
              color={WHITE}>
              420.000.000
            </Text>
            <Text
              size={12}
              color={WHITE}>
              Cập nhật gần nhất 12/12/2023
            </Text>

            <Row marginTop={8}>
              <Column
                alignItems='center'
                flex={1}>
                <Column
                  gap={4}
                  alignItems='center'>
                  <Text color={WHITE}>
                    Tổng thu
                  </Text>
                  <Text
                    color={WHITE}
                    weight='bold'>
                    + 500.000.000
                  </Text>
                </Column>
              </Column>
              <Column
                height={8 * 4}
                width={1}
                backgroundColor={WHITE}
              />
              <Column
                alignItems='center'
                flex={1}>
                <Column
                  gap={4}
                  alignItems='center'>
                  <Text color={WHITE}>
                    Tổng chi
                  </Text>
                  <Text
                    color={WHITE}
                    weight='bold'>
                    - 80.000.000
                  </Text>
                </Column>
              </Column>
            </Row>
            <Row
              paddingHorizontal={8 * 2}
              width={'100%'}
              bottom={8 * 1.5}
              position='absolute'
              justifyContent='space-between'>
              <Text
                color={WHITE}>
                Full Name User
              </Text>
              <Text color={WHITE}>
                12/23
              </Text>
            </Row>
          </Column>
        </ImageBackground>
      </View>

    </ImageBackground>
  )
}

export default Banner

const styles = StyleSheet.create({
  containerCard: {
    alignSelf: 'center',
    borderRadius: 8 * 2,
    backgroundColor: WHITE,
    position: 'absolute',
    bottom: 8 * 4
  },
  creditCard: {
    width: _widthScale(320),
    height: _widthScale(320) * 441 / 700,
    alignSelf: 'center',
    borderRadius: 8 * 2
  },
  imageBackground: {
    width: _width,
    height: _heightScale(360)
  }
})

const shadow = {
  shadowColor: NEW_BASE_COLOR,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 1,
  shadowRadius: 5,

  elevation: 3,
}
