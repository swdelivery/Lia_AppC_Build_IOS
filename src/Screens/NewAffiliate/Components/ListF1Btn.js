import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale } from '../../../Constant/Scale'
import { IconAffiliateListF1 } from '../../../Components/Icon/Icon'
import { WHITE } from '../../../Constant/Color'
import { stylesFont } from '../../../Constant/Font'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const ListF1Btn = memo(() => {
  return (
    <View style={styles.options}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenKey.LIST_F1)
        }}
        style={[styles.options__btn]}>
        <IconAffiliateListF1 width={8 * 2.5} height={8 * 2.5} />

        <View style={{ width: _moderateScale(8) }} />
        <Text style={[{ flex: 1, color: WHITE, fontSize: _moderateScale(14) }, stylesFont.fontNolan500]}>
          Danh sách người đã giới thiệu
        </Text>

      </TouchableOpacity>
    </View>
  )
})

export default ListF1Btn

const styles = StyleSheet.create({
  options__btn: {
    width: '100%',
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: _moderateScale(8 * 2),
    backgroundColor: "#182128",

  },
  options: {
    paddingVertical: 8
  }
})


const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 2,

  elevation: 5
}
