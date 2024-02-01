import { StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { formatMonney } from '@Constant/Utils'
import { styleElement } from '@Constant/StyleElement'
import { useSelector } from 'react-redux'
import { getDetailCampainState, getVolunteerHistoryState } from '@Redux/charity/selectors'
import moment from 'moment'
import CardCash from '@Screens/CharityAccountStatement/Components/CardCash'

const Info = () => {
  const { data: dataHistory } = useSelector(getVolunteerHistoryState)
  const { data: { fundCurrent } } = useSelector(getDetailCampainState)

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

  return (
    <Column
      gap={8}
      margin={8 * 2}>
      <Column
        gap={4}
        backgroundColor={"#F4F4F4"}
        borderRadius={8}
        padding={8 * 2}>
        <Row>
          <Text style={styleElement.flex}>Tổng số tiền ủng hộ</Text>
          <Text weight='bold'>{formatMonney(fundCurrent, true)}</Text>
        </Row>
        <Row>
          <Text style={styleElement.flex}>Tổng số tiền chi</Text>
          <Text weight='bold'>{formatMonney(totalMoneyOut, true)}</Text>
        </Row>
        <Row>
          <Text style={styleElement.flex}>Tổng số tiền còn dư</Text>
          <Text weight='bold'>{formatMonney((fundCurrent - totalMoneyOut), true)}</Text>
        </Row>
      </Column>
      {/* <Column
        gap={4}
        backgroundColor={"#F4F4F4"}
        borderRadius={8}
        padding={8 * 2}>
        <Column>
          <Text weight='bold' style={styleElement.flex}>Mô tả / ghi chú</Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </Text>
        </Column>
      </Column> */}
    </Column>
  )
}

export default Info

const styles = StyleSheet.create({})
