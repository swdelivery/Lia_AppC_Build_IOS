import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import CardSmallCharity from '@Screens/Charity/Components/CardSmallCharity'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CardCash from './CardCash'

const MoneyIn = () => {
  return (
    <View style={styles.container}>
      <Row
        padding={8 * 2}
        justifyContent='space-between'>
        <Text
          weight='bold'>
          Ngày 11 tháng 12
        </Text>
        <Text>
          64 Giao dịch
        </Text>
      </Row>

      <Column
        borderRadius={8}
        backgroundColor={'#F4F4F4'}
        marginHorizontal={8 * 2}>
        {
          [1, 2, 4, 5, 6, 7, 8, 9]?.map((item, index) => {
            return (
              <CardCash key={index} isCashIn />
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


      <View style={{ height: 100 }} />
    </View>
  )
}

export default MoneyIn

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
