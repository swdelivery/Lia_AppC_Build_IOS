import { _moderateScale } from '@Constant/Scale'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import RenderHTML from '../../Components/RenderHTML/RenderHTML'
import { Insurance } from "@typings/insurance";

type Props = {
  insurance: Insurance;
};

const Benefit = ({ insurance }: Props) => {
  return (
    <View style={styles.container}>
      <RenderHTML data={insurance.benefit} />
    </View>
  );
};

export default Benefit

const styles = StyleSheet.create({
  container: { paddingHorizontal: _moderateScale(8 * 2), paddingBottom: 30 },
});
