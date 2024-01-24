import CardReportGroupByDate from '@Components/Charity/CardReportGroupByDate'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Spacer from '@Components/Spacer'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { getVolunteerHistory } from '@Redux/charity/actions'
import { getDetailCampainState, getVolunteerHistoryState } from '@Redux/charity/selectors'
import CardCash from '@Screens/CharityAccountStatement/Components/CardCash'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

const Report = () => {
  const dispatch = useDispatch()
  const { navigate } = useNavigate()
  const { data: { _id: idVolunteer } } = useSelector(getDetailCampainState)
  const { data: dataHistory } = useSelector(getVolunteerHistoryState)

  useEffect(() => {
    if (idVolunteer) {
      dispatch(getVolunteerHistory.request({
        condition: {
          "volunteerId": { "equal": idVolunteer },
        }
      }))
    }
  }, [idVolunteer])

  const listData = useMemo(() => {
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

  if (isEmpty(listData)) return null
  return (
    <Column >
      <Row margin={8 * 2} marginBottom={0} justifyContent='space-between'>
        <Text weight='bold'>Báo cáo phân phối nguồn ủng hộ</Text>
        <TouchableOpacity onPress={navigate(ScreenKey.LIST_REPORTS)}>
          <Text color={NEW_BASE_COLOR}>
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </Row>

      {
        listData?.map((i, idx) => {
          return (
            <Column>
              <Row
                padding={8 * 2}
                justifyContent='space-between'>
                <Text size={12} weight='bold'>
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

export default Report

const styles = StyleSheet.create({})
