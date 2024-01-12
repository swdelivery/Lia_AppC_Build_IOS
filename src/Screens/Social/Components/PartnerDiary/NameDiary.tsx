import Column from '@Components/Column';
import Text from '@Components/Text';
import { BASE_COLOR } from '@Constant/Color';
import { PartnerDiary } from '@typings/newfeeds';
import moment from 'moment';
import React from 'react';
import { StyleSheet } from 'react-native';


type Props = {
  data: PartnerDiary
};

const NameDiary = ({ data }: Props) => {

  const { serviceName, treatmentDate } = data

  return (
    <Column gap={4} margin={8 * 2}>
      <Text
        weight='bold'
        color={BASE_COLOR}>Nhật ký {serviceName}</Text>
      <Text>
        Bắt đầu từ: {moment(treatmentDate).format('DD/MM/YYYY')}
      </Text>
    </Column>
  )
}

export default NameDiary

const styles = StyleSheet.create({})
