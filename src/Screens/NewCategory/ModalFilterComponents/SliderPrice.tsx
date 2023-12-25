import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { _widthScale } from '@Constant/Scale'
import { formatMonney } from '@Constant/Utils'
import Slider from '@react-native-community/slider'
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'


type Props = {
  selectedPrice: number;
  setSelectedPrice?: (item) => void;
};

const SliderPrice = ({ selectedPrice, setSelectedPrice }: Props) => {
  const [currValuePrice, setCurrValuePrice] = useState(0)

  const _handleValueChange = (e) => {
    setCurrValuePrice(e)
  }

  useEffect(() => {
    setCurrValuePrice(selectedPrice)
  }, [selectedPrice])

  return (
    <Column gap={8} margin={8 * 2}>
      <Text weight='bold'>Giá</Text>
      <Text
        weight='bold'
        color={NEW_BASE_COLOR}>
        {formatMonney(currValuePrice)} VNĐ
      </Text>

      <Column alignSelf='flex-start'>
        <Slider
          value={selectedPrice}
          onSlidingComplete={setSelectedPrice}
          onValueChange={_handleValueChange}
          style={styles.slider}
          minimumValue={0}
          step={100000}
          thumbTintColor={Platform.OS == 'ios' ? null : NEW_BASE_COLOR}
          maximumValue={50000000}
          minimumTrackTintColor={NEW_BASE_COLOR}
          maximumTrackTintColor={'#C7CBD8'}
        />
        <Row justifyContent='space-between'>
          <Text color={NEW_BASE_COLOR}>0 VNĐ</Text>
          <Text color={NEW_BASE_COLOR}>50.000.000 VNĐ</Text>
        </Row>
      </Column>
    </Column>
  )
}

export default SliderPrice

const styles = StyleSheet.create({
  slider: { width: _widthScale(280), height: 20 }
})

