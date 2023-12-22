import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { getVolunteerHistoryFilterState } from '@Redux/charity/selectors'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import CardCash from '../Components/CardCash'

const HistoryCashIn = () => {
  const { data: dataHistory } = useSelector(getVolunteerHistoryFilterState)
  const [listHistoryMoneyIn, setListHistoryMoneyIn] = useState([])

  useEffect(() => {
    let historyMoneyIn = dataHistory?.filter(item => item?.status == 'INCREASE');
    const groupedTransactions = historyMoneyIn.reduce((grouped, transaction) => {
      const date = moment(transaction.created).format('YYYY-MM-DD');
      if (!grouped[date]) {
        grouped[date] = { date: transaction.created, data: [] };
      }
      grouped[date].data.push(transaction);
      return grouped;
    }, {});
    const groupedTransactionsArray = Object.values(groupedTransactions);
    setListHistoryMoneyIn(groupedTransactionsArray)
  }, [dataHistory])

  return (

    <Column>
      {
        !isEmpty(listHistoryMoneyIn) ?
          <>
            {
              listHistoryMoneyIn?.map((i, idx) => {
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
          </>
          :
          <>
            <Column margin={8 * 2}>
              <Text fontStyle='italic'>
                Không tìm thấy dữ liệu trùng khớp
              </Text>
            </Column>
          </>
      }
    </Column>
  )
}

export default HistoryCashIn

const styles = StyleSheet.create({})
