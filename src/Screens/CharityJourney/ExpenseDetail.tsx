import Column from '@Components/Column'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import Text from '@Components/Text'
import { WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import moment from 'moment'
import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Header from './Components/Header'

type InfoProps = {
  title: string;
  value: string;
  right?: React.ReactElement;
}

const ExpenseDetail = () => {

  const Info = useCallback(({ title, value, right }: InfoProps) => {
    return (
      <Column
        gap={8}
        marginHorizontal={8 * 2}>
        <Text>
          {title}
        </Text>
        <Column
          backgroundColor={"#F4F4F4"}
          padding={8 * 2}
          borderRadius={8}>
          <Row>
            <Text style={styleElement.flex}>
              {value}
            </Text>
            {right}
          </Row>
        </Column>
      </Column>
    )
  }, [])

  return (
    <Screen>
      <Header title='Chi tiết khoản chi' />
      <ScrollView>
        <Spacer top={8 * 2} />
        <Column gap={8 * 2}>
          <Info
            title='Loại khoản chi'
            value='Chi phí hoạt động vận động phân phối' />
          <Info
            title='Ngày chi'
            value={moment().format("DD/MM/YYYY")} />
          <Info
            title='Nội dung khoản chi'
            value='Tặng 20 phần quà cho các em học sinh khó khăn tại vùng cao' />
          <Info
            title='Tổng số tiền'
            value={formatMonney(200000)}
            right={<Text weight='bold'>VND</Text>} />
        </Column>
        <Column margin={8 * 2}>
          <Text>
            Ảnh
          </Text>
          <Row flexWrap='wrap'>
            {
              [1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                return (
                  <Image
                    style={styles.image}
                    avatar={null} />
                )
              })
            }
          </Row>
        </Column>
      </ScrollView>

    </Screen>
  )
}

export default ExpenseDetail

const styles = StyleSheet.create({
  image: {
    width: (_width - 8 * 4) / 4,
    height: (_width - 8 * 4) / 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: WHITE
  }
})
