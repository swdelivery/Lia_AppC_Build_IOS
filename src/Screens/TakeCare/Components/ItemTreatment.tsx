import Column from '@Components/Column'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Text from '@Components/Text'
import TreatmentStatusDot from '@Components/TreatmentStatusDot/TreatmentStatusDot'
import { BASE_COLOR, BORDER_COLOR, GREY_FOR_TITLE, WHITE } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { PartnerTreatment } from "@typings/takecare"
import moment from 'moment'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'



type Props = {
  data: PartnerTreatment;
};

const ItemTreatment = ({ data }: Props) => {
  const { navigate } = useNavigate()

  const {
    serviceName,
    doctor: { name: doctorName },
    created,
    status: statusCode
  } = data

  return (
    <Column
      borderRadius={8}
      gap={8}
      backgroundColor={WHITE}
      padding={8 * 2}
      borderWidth={1}
      borderColor={BORDER_COLOR}
      marginHorizontal={8 * 2}>
      <Row
        alignItems='flex-start'
        gap={8 * 2}
        justifyContent='space-between'>
        <Column flex={1}>
          <Text
            color={GREY_FOR_TITLE}
            weight='bold'>{serviceName}</Text>
        </Column>
        <TreatmentStatusDot statusCode={statusCode} />
      </Row>
      <Text
        color={GREY_FOR_TITLE}
        weight='bold'>{doctorName}</Text>

      <Row gap={4}>
        <Text>{moment(created).format('HH:mm')}</Text>
        <Text>|</Text>
        <Text>{moment(created).format('DD/MM/YYYY')}</Text>
      </Row>

      <HorizontalLine style={{ marginVertical: 8 }} />

      <TouchableOpacity onPress={navigate(ScreenKey.UPDATE_DAILY_DIARIES, { dataPartnerTreatment: data })}>
        <Column alignItems='center'>
          <Text
            weight='bold'
            color={BASE_COLOR}>
            {`Cập nhật hậu phẫu >>>`}
          </Text>
        </Column>
      </TouchableOpacity>

    </Column>
  )
}

export default ItemTreatment

const styles = StyleSheet.create({})
