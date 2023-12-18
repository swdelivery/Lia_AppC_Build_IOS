import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Column from '@Components/Column'
import { BORDER_COLOR, GREEN_SUCCESS, NEW_BASE_COLOR, RED } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import CardSmallCharity from '@Screens/Charity/Components/CardSmallCharity'
import { ScrollView } from 'react-native-gesture-handler'

const MoneyOut = () => {
  return (
    <View style={styles.container}>
      <Row
        padding={8 * 2}
        justifyContent='space-between'>
        <Text
          weight='bold'>
          Ngày 12 tháng 12
        </Text>
        <Text>
          64 Giao dịch
        </Text>
      </Row>

      <Column
        gap={8 * 4}
        borderRadius={8}
        backgroundColor={'#F4F4F4'}
        padding={8 * 2}
        marginHorizontal={8 * 2}>
        {
          [1, 2, 4]?.map((item, index) => {
            return (
              <Column key={index} gap={8}>
                <Row gap={8}>
                  <Text>
                    Đến:
                  </Text>
                  <Text numberOfLines={1} flex={1} weight='bold'>
                    NGUYEN NGOC HUAN
                  </Text>
                  <Text
                    color={RED}
                    weight='bold'>
                    - 1.000.000
                  </Text>
                </Row>
                <Row alignItems='flex-start'>
                  <Text style={styleElement.flex} size={12}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                  </Text>
                  <Text size={12}>
                    9:36
                  </Text>
                </Row>
              </Column>
            )
          })
        }
      </Column>

      <Column margin={8 * 2}>
        <Text
          weight='bold'
          color={NEW_BASE_COLOR}>
          Dự án của tháng
        </Text>
      </Column>

      <ScrollView
        contentContainerStyle={{ gap: 8 * 2, paddingHorizontal: 8 * 2 }}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {
          [1, 2, 3, 5, 6]?.map((item, index) => {
            return (
              <CardSmallCharity key={index} />
            )
          })
        }
      </ScrollView>


      <View style={{ height: 1000 }} />
    </View>
  )
}

export default MoneyOut

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
