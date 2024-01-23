import CardReportGroupByDate from '@Components/Charity/CardReportGroupByDate'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Spacer from '@Components/Spacer'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

const Report = () => {
  const { navigate } = useNavigate()

  return (
    <Column margin={8 * 2}>
      <Row justifyContent='space-between'>
        <Text weight='bold'>Báo cáo phân phối nguồn ủng hộ</Text>
        <TouchableOpacity onPress={navigate(ScreenKey.LIST_REPORTS)}>
          <Text color={NEW_BASE_COLOR}>
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </Row>
      <Spacer top={8 * 2} />

      <Column gap={8 * 2}>
        {
          [1, 2, 3, 4].map((item, index) => {
            return (
              <CardReportGroupByDate />
            )
          })
        }
      </Column>

    </Column>
  )
}

export default Report

const styles = StyleSheet.create({})
