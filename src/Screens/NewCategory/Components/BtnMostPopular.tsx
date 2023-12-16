import Row from '@Components/Row';
import Text from '@Components/Text';
import { WHITE } from '@Constant/Color';
import { selectServiceMostPopular } from '@Redux/category/actions';
import { getDataFilterServiceState } from '@Redux/category/selectors';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useHapticCallback from 'src/Hooks/useHapticCallback';


const BtnMostPopular = () => {
  const dispatch = useDispatch()
  const { dataServiceMostPopular } = useSelector(getDataFilterServiceState)

  const _handlePress = useHapticCallback(() => {
    dispatch(selectServiceMostPopular())
  }, [])

  return (
    <TouchableOpacity onPress={_handlePress}>
      <Row gap={4}>
        <Text
          style={{ opacity: dataServiceMostPopular ? 1 : .7 }}
          weight={dataServiceMostPopular ? 'bold' : 'regular'}
          color={WHITE}>
          Phổ biến nhất
        </Text>
      </Row>
    </TouchableOpacity>
  )
}

export default BtnMostPopular

const styles = StyleSheet.create({})
