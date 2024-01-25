import Icon from '@Components/Icon'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Header from './Components/Header'
import Info from './ListReportsComponents/Info'
import Reports from './ListReportsComponents/Reports'
import { useSelector } from 'react-redux'
import { getDetailCampainState, getVolunteerHistoryState } from '@Redux/charity/selectors'

const ListReports = () => {
  const { data: dataHistory } = useSelector(getVolunteerHistoryState)
  const { data: { name } } = useSelector(getDetailCampainState)

  return (
    <Screen>
      <Header title='Báo cáo phân phối nguồn ủng hộ' />
      <ScrollView>
        <Row gap={4} margin={8 * 2}>
          <Icon color={NEW_BASE_COLOR} name='target' />
          <Text weight='bold' color={NEW_BASE_COLOR}>
            {name}
          </Text>
        </Row>
        <Info />
        <HorizontalLine height={4} />
        <Reports />
      </ScrollView>
    </Screen>
  )
}

export default ListReports

const styles = StyleSheet.create({})
