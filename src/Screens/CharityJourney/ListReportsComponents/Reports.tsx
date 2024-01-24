import CardReportGroupByDate from '@Components/Charity/CardReportGroupByDate'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Spacer from '@Components/Spacer'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { getVolunteerHistoryState } from '@Redux/charity/selectors'
import moment from 'moment'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import CardCash from '@Screens/CharityAccountStatement/Components/CardCash'

const Reports = () => {
  const { data: dataHistory } = useSelector(getVolunteerHistoryState)

  const listDataCashOut = useMemo(() => {
    let historyMoneyIn = dataHistory?.filter(item => item?.status == 'REDUCE');
    const groupedTransactions = historyMoneyIn.reduce((grouped, transaction) => {
      const date = moment(transaction.created).format('YYYY-MM-DD');
      if (!grouped[date]) {
        grouped[date] = { date: transaction.created, data: [] };
      }
      grouped[date].data.push(transaction);
      return grouped;
    }, {});
    return Object.values(groupedTransactions);
  }, [dataHistory])

  const count = useMemo(() => {
    return dataHistory?.filter(item => item?.status == 'REDUCE').length;
  }, [dataHistory])

  return (
    <Column>
      <Row margin={8 * 2} gap={4}>
        <Text weight='bold'>Chi tiết các khoản chi theo ngày</Text>
        <Text weight='bold' color={NEW_BASE_COLOR}>({count})</Text>
      </Row>
      {
        listDataCashOut?.map((i, idx) => {
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
    </Column>
  )
}

export default Reports

const styles = StyleSheet.create({})
