import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREEN, GREEN_SUCCESS, NEW_BASE_COLOR, RED, WHITE } from '@Constant/Color'
import { _heightScale, _width, _widthScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import { getDetailCampainState, getVolunteerHistoryState } from '@Redux/charity/selectors'
import moment from 'moment'
import React, { useMemo } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

const Banner = () => {
  const { data: dataHistory } = useSelector(getVolunteerHistoryState)
  const { data: infoCampain } = useSelector(getDetailCampainState)

  const totalMoney = useMemo(() => {
    let total = dataHistory.reduce((sum, { depositAmount, status }) => {
      if (status == 'INCREASE') {
        return sum + depositAmount
      } else {
        return sum - depositAmount
      }
    }, 0)
    return total
  }, [dataHistory])

  const totalMoneyIn = useMemo(() => {
    let temp = [...dataHistory];
    let total = temp?.filter(item => item?.status == 'INCREASE').reduce((sum, { depositAmount }) => {
      return sum + depositAmount
    }, 0)
    return total
  }, [dataHistory])

  const totalMoneyOut = useMemo(() => {
    let temp = [...dataHistory];
    let total = temp?.filter(item => item?.status == 'REDUCE').reduce((sum, { depositAmount }) => {
      return sum + depositAmount
    }, 0)
    return total
  }, [dataHistory])

  const lastedUpdate = useMemo(() => {
    let lasted = dataHistory[0]?.created;
    return moment(lasted).format('DD/MM/YYYY')
  }, [dataHistory])

  const dayCreatedCampain = useMemo(() => {
    return moment(infoCampain?.created).format('DD/MM/YYYY')
  }, [infoCampain])

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
              {formatMonney(totalMoney, true)}
            </Text>
            <Text
              size={12}
              color={WHITE}>
              Cập nhật gần nhất {lastedUpdate}
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
                    <Text weight='bold' color={GREEN_SUCCESS}>+</Text> {formatMonney(totalMoneyIn, true)}
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
                    <Text weight='bold' color={RED}>-</Text> {formatMonney(totalMoneyOut, true)}
                  </Text>
                </Column>
              </Column>
            </Row>
            <Row
              gap={8 * 2}
              paddingHorizontal={8 * 2}
              width={'100%'}
              bottom={8 * 1.5}
              position='absolute'
              justifyContent='space-between'>
              <Text
                style={styleElement.flex}
                numberOfLines={1}
                color={WHITE}>
                {infoCampain?.createBy}
              </Text>
              <Text color={WHITE}>
                {dayCreatedCampain}
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
    height: _widthScale(360)
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
