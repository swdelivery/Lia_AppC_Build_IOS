import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { GREY, GREY_FOR_TITLE, NEW_BASE_COLOR } from '@Constant/Color'
import moment from 'moment'
import { formatMonney } from '@Constant/Utils'
import Icon from '@Components/Icon'
import Spacer from '@Components/Spacer'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'

const CardReportGroupByDate = () => {
  const { navigate } = useNavigate()

  const _handleGoToDetail = useCallback(() => {
    navigate(ScreenKey.EXPENSE_DETAIL)()
  }, [])

  return (
    <Column gap={4}>
      <Text color={'#373737'} weight='bold'>
        {moment().format('DD/MM/YYYY')} <Text weight='bold' color={NEW_BASE_COLOR}>(2)</Text>
      </Text>
      <Column
        gap={4}
        backgroundColor={'#F4F4F4'}
        borderRadius={8 * 2}
        padding={8 * 2}
        paddingVertical={8}>
        <Row justifyContent='space-between'>
          <Row gap={8}>
            <Text>
              Khoản chi:
            </Text>
            <Text weight='bold'>{formatMonney(350000, true)}</Text>
          </Row>
          <TouchableOpacity onPress={_handleGoToDetail}>
            <Row gap={4}>
              <Icon color={GREY_FOR_TITLE} size={8 * 2.5} name='file-document-outline' />
              <Text color={GREY_FOR_TITLE}>
                Chi tiết
              </Text>
            </Row>
          </TouchableOpacity>
        </Row>
        <Text fontStyle='italic'>
          Tặng 20 phần quà cho các em thiếu nhi học sinh tiểu học khó khăn tại Hà Giang
        </Text>
      </Column>
    </Column>
  )
}

export default CardReportGroupByDate

const styles = StyleSheet.create({})
