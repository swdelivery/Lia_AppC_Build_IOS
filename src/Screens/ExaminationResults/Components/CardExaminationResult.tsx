import Column from '@Components/Column'
import Icon from '@Components/Icon'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import { ExaminationResult } from '@typings/examinationResult'
import moment from 'moment'
import React, { useCallback, useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  data: ExaminationResult
}

const CardExaminationResult = ({ data }: Props) => {
  const { navigation } = useNavigate()
  const { branch, created, services } = data

  const _handleGoToDetail = useCallback(() => {
    let { _id } = data;
    navigation.navigate(ScreenKey.DETAIL_EXAMINATION_RESULT, { _id: _id })
  }, [data])

  const generateListNameService = useMemo(() => {
    return services?.map((item, index) => {
      if (index !== services?.length - 1) {
        return `${item?.service?.name}, `
      } else {
        return `${item?.service?.name}.`
      }
    })
  }, [services])

  return (
    <TouchableOpacity
      onPress={_handleGoToDetail}
      activeOpacity={.7}>
      <Column
        borderColor={NEW_BASE_COLOR}
        borderRadius={8}
        borderWidth={1}>
        <Column
          paddingVertical={8}
          padding={8 * 2}>
          <Row alignItems='flex-start' gap={8}>
            <Text
              numberOfLines={2}
              weight='bold'
              color={'#1C5579'}
              style={styleElement.flex}>Kết quả thăm khám {generateListNameService}</Text>
            <Text
              color={"#4A4A4A"}
              fontStyle='italic'>
              {moment(created).format('HH:mm')}, {moment(created).format('DD/MM/YYYY')}
            </Text>
          </Row>
          <Row gap={4} marginTop={4} alignItems='flex-start'>
            <Icon top={4} size={8 * 2} color='#4A4A4A' name='map-marker' />
            <Column flex={1}>
              <Text flex={1} color={"#4A4A4A"}>
                {branch?.name}
              </Text>
              <Text flex={1} size={12} fontStyle='italic' color={"#4A4A4A"}>
                {branch?.addressDetails.fullAddress}
              </Text>
            </Column>
          </Row>
        </Column>
        <HorizontalLine />
        <Column
          alignItems='flex-end'
          paddingVertical={2}
          padding={8 * 2}>
          <Row>
            <Text
              fontStyle='italic'
              color={"#4A4A4A"}>
              Chi tiết
            </Text>
            <Icon color='#1C5579' name='chevron-right' />
          </Row>
        </Column>
      </Column>
    </TouchableOpacity>
  )
}

export default CardExaminationResult
