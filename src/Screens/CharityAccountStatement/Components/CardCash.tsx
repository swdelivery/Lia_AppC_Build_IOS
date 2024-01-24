import Column from '@Components/Column'
import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREEN_SUCCESS, GREY_FOR_TITLE, NEW_BASE_COLOR, RED } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import ScreenKey from '@Navigation/ScreenKey'
import { Transaction } from '@typings/charity'
import moment from 'moment'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  data: Transaction
};

const CardCash = ({ data }: Props) => {
  const { navigate } = useNavigate()

  const {
    status,
    partner,
    message,
    donateVolunteerRequest,
    volunteerFundRequest,
    depositAmount,
    created
  } = data

  const _handleGoToDetail = useCallback(() => {
    navigate(ScreenKey.EXPENSE_DETAIL, { data })()
  }, [data])

  const isCashIn = useMemo(() => {
    if (status == 'INCREASE') {
      return true
    } else {
      return false
    }
  }, [status])

  return (
    <Column gap={4}>
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
            <Text weight='bold'>{formatMonney(depositAmount, true)}</Text>
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
          {message}
        </Text>
      </Column>
    </Column>
  )
}

export default CardCash

const styles = StyleSheet.create({})
