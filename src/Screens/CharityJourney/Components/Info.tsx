import Column from '@Components/Column'
import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY } from '@Constant/Color'
import moment from 'moment'
import React from 'react'
import { StyleSheet } from 'react-native'

const Info = () => {
  return (
    <Column gap={8} padding={8 * 2}>
      <Text weight='bold'>Điểm đến số 01</Text>
      <Column gap={8}>
        <Text weight='bold'>
          Xây nhà vệ sinh số 1 tại Mèo Vạc, Hà Giang
        </Text>
        <Row gap={4}>
          <Icon size={18} color={GREY} name='calendar' />
          <Text color={GREY} fontStyle='italic'>
            {moment().format('DD/MM/YYYY')}
          </Text>
        </Row>
        <Row alignItems='flex-start' gap={4}>
          <Icon size={8 * 2.5} color={GREY} name={'map-marker-outline'} />
          <Text color={GREY} fontStyle='italic'>
            UBND Mèo Vạc, Thị trấn Mèo Vạc, Huyện Mèo Vạc, Tỉnh Hà Giang
          </Text>
        </Row>
      </Column>
    </Column>
  )
}

export default Info

const styles = StyleSheet.create({})
