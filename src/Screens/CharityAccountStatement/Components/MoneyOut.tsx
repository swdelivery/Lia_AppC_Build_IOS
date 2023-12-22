import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import CardSmallCharity from '@Screens/Charity/Components/CardSmallCharity'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CardCash from './CardCash'
import { useSelector } from 'react-redux'
import { getVolunteerHistoryState } from '@Redux/charity/selectors'
import moment from 'moment'

const MoneyOut = () => {
  const { data: dataHistory } = useSelector(getVolunteerHistoryState)
  const [listHistoryMoneyOut, setListHistoryMoneyOut] = useState([])

  useEffect(() => {
    let historyMoneyIn = dataHistory?.filter(item => item?.status == 'REDUCE');
    const groupedTransactions = historyMoneyIn.reduce((grouped, transaction) => {
      const date = moment(transaction.created).format('YYYY-MM-DD');
      if (!grouped[date]) {
        grouped[date] = { date: transaction.created, data: [] };
      }
      grouped[date].data.push(transaction);
      return grouped;
    }, {});
    const groupedTransactionsArray = Object.values(groupedTransactions);
    setListHistoryMoneyOut(groupedTransactionsArray)
  }, [dataHistory])

  return (
    <View style={styles.container}>

      {
        listHistoryMoneyOut?.map((i, idx) => {
          return (
            <Column>
              <Row
                padding={8 * 2}
                justifyContent='space-between'>
                <Text
                  weight='bold'>
                  Ngày {moment(i?.date).format('DD/MM/YYYY')}
                </Text>
                <Text>
                  {i?.data?.length} Giao dịch
                </Text>
              </Row>

              <Column
                borderRadius={8}
                backgroundColor={'#F4F4F4'}
                marginHorizontal={8 * 2}>
                {
                  i?.data?.map((item, index) => {
                    return (
                      <CardCash data={item} key={index} />
                    )
                  })
                }
              </Column>
            </Column>
          )
        })
      }

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

export default MoneyOut

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
