import { IconSortPrice, IconSortPriceDown, IconSortPriceUp } from '@Components/Icon/Icon';
import Row from '@Components/Row';
import Text from '@Components/Text';
import { WHITE } from '@Constant/Color';
import { selectServiceMostPopular, selectServiceSortPrice } from '@Redux/category/actions';
import { getDataFilterServiceState } from '@Redux/category/selectors';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useHapticCallback from 'src/Hooks/useHapticCallback';


const BtnChangePrice = () => {
  const dispatch = useDispatch()
  const { dataServiceSortPrice } = useSelector(getDataFilterServiceState)

  const _handlePress = useHapticCallback(() => {
    dispatch(selectServiceMostPopular(false))
    if (!dataServiceSortPrice) {
      dispatch(selectServiceSortPrice(1))
    } else if (dataServiceSortPrice == 1) {
      dispatch(selectServiceSortPrice(-1))
    } else if (dataServiceSortPrice == -1) {
      dispatch(selectServiceSortPrice(1))
    }
  }, [dataServiceSortPrice])

  return (
    <TouchableOpacity onPress={_handlePress}>
      <Row gap={4}>
        <Text
          style={{ opacity: dataServiceSortPrice ? 1 : .7 }}
          weight={dataServiceSortPrice ? 'bold' : 'regular'}
          color={WHITE}>
          Giá
        </Text>
        {
          !dataServiceSortPrice ?
            <IconSortPrice
              style={{ opacity: dataServiceSortPrice ? 1 : .7 }}
              width={8 * 1.5}
              height={8 * 1.5} />
            :
            <>
              {
                dataServiceSortPrice == -1 ?
                  <IconSortPriceDown
                    width={8 * 1.5}
                    height={8 * 1.5} />
                  :
                  <IconSortPriceUp
                    width={8 * 1.5}
                    height={8 * 1.5} />
              }
            </>
        }

      </Row>
    </TouchableOpacity>
  )
}

export default BtnChangePrice

const styles = StyleSheet.create({})
