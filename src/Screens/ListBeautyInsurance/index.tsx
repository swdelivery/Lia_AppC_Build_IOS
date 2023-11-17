import Column from '@Components/Column'
import Image from '@Components/Image'
import Header from '@Components/NewHeader/Header'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { PRICE_ORANGE, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import ScreenKey from '@Navigation/ScreenKey'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { navigation } from 'rootNavigation'
import { useNavigate } from 'src/Hooks/useNavigation'
import ItemBeautyInsurance from './Components/ItemBeautyInsurance'

const ListBeautyInsurance = () => {


  const _renderItem = () => {
    return (
      <ItemBeautyInsurance />
    )
  }

  return (
    <Screen>
      <Header title={'Danh sách bảo hiểm'} />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={_renderItem}
        keyExtractor={({ item, index }) => item?._id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </Screen>
  )
}

export default ListBeautyInsurance


