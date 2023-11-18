import { StyleSheet, View } from 'react-native'
import React from "react";
import { _moderateScale } from '@Constant/Scale'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { BLACK, PRICE_ORANGE } from '@Constant/Color'
import { formatMonney } from '@Constant/Utils'
import { Insurance } from "@typings/insurance";

type Props = {
  insurance: Insurance;
};

const MainInfo = ({ insurance }: Props) => {
  return (
    <View style={styles.box}>
      <Column gap={8}>
        <Text weight="bold" size={14}>
          {insurance.name}
        </Text>
        <Text weight="bold" size={14} color={PRICE_ORANGE}>
          {formatMonney(insurance.price)} VNĐ
        </Text>
        <Text weight="regular" size={14} color={BLACK}>
          {insurance.description}
        </Text>
      </Column>
    </View>
  );
};

export default MainInfo

const styles = StyleSheet.create({
    box: {
        margin: _moderateScale(8 * 2)
    }
})
