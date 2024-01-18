import { StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Row from '@Components/Row'
import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Text from '@Components/Text'
import CountStar2 from '@Components/NewCountStar/CountStar'
import { LocationIcon } from 'src/SGV'
import { GREY, GREY_FOR_TITLE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import CircleTick from '@Components/CircleTick/CircleTick'
import Icon from '@Components/Icon'

const WIDTH_ITEM = _width / 2

const PatientInfo = () => {
  const [listData, setListData] = useState([1, 2, 3, 4, 5, 6, 7])

  const Patient = useCallback(({ isTicked }) => {
    return (
      <Column
        padding={8 * 2}
        paddingVertical={4}
        width={WIDTH_ITEM}>
        <Row gap={8}>
          {
            isTicked ?
              <Icon size={8 * 2} color={"#383838"} name='circle-slice-8' />
              :
              <Icon size={8 * 2} color={"#383838"} name='circle-outline' />
          }
          <Text>
            Tiền sử bệnh tim mạch
          </Text>
        </Row>
      </Column>
    )
  }, [])

  return (
    <Column gap={8}>
      <Column marginHorizontal={8 * 2}>
        <Text
          size={16}
          color={GREY_FOR_TITLE}
          weight='bold'>
          Tiền sử bệnh án
        </Text>
      </Column>

      <Row flexWrap='wrap'>
        {
          listData?.map((item, index) => {
            return (
              <Patient isTicked={index > 3} key={index} />
            )
          })
        }
        <Column>
        </Column>
      </Row>

    </Column>
  )
}

export default PatientInfo

const styles = StyleSheet.create({})
