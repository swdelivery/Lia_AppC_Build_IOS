import Column from '@Components/Column';
import Text from '@Components/Text';
import { BASE_COLOR } from '@Constant/Color';
import { PartnerDiary } from '@typings/newfeeds';
import React from 'react';
import { StyleSheet } from 'react-native';


type Props = {
  data: PartnerDiary
};

const NameDiary = ({ data }: Props) => {

  const { serviceName } = data

  return (
    <Column margin={8 * 2}>
      <Text
        weight='bold'
        color={BASE_COLOR}>Nhật ký {serviceName}</Text>
    </Column>
  )
}

export default NameDiary

const styles = StyleSheet.create({})
