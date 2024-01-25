import Column from '@Components/Column'
import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY } from '@Constant/Color'
import { getDetailVolunteerActionState } from '@Redux/charity/selectors'
import moment from 'moment'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const Info = () => {
  const { data } = useSelector(getDetailVolunteerActionState)

  return (
    <Column gap={8} padding={8 * 2}>
      <Column gap={8}>
        <Text weight='bold'>
          {data?.name}
        </Text>
        <Row gap={4}>
          <Icon size={18} color={GREY} name='calendar' />
          <Text color={GREY} fontStyle='italic'>
            {moment(data?.created).format('DD/MM/YYYY')}
          </Text>
        </Row>
        <Row alignItems='flex-start' gap={4}>
          <Icon size={8 * 2.5} color={GREY} name={'map-marker-outline'} />
          <Text color={GREY} fontStyle='italic'>
            {data?.address?.fullAddress}
          </Text>
        </Row>
      </Column>
    </Column>
  )
}

export default Info

const styles = StyleSheet.create({})
