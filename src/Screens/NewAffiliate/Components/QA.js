import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale } from '../../../Constant/Scale'
import { IconAffiliateQA } from '../../../Components/Icon/Icon'
import { WHITE } from '../../../Constant/Color'
import { stylesFont } from '../../../Constant/Font'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const QA = memo(() => {
  return (
    <View style={styles.options}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenKey.QA_NEW_AFFILIATE)
        }}
        style={[styles.options__btn]}>
        <IconAffiliateQA width={8 * 2.5} height={8 * 2.5} />

        <View style={{ width: _moderateScale(8) }} />
        <Text style={[{ flex: 1, color: WHITE, fontSize: _moderateScale(14) }, stylesFont.fontNolan500]}>
          Hỏi đáp
        </Text>

      </TouchableOpacity>
    </View>
  )
})

export default QA

const styles = StyleSheet.create({
  options__btn: {
    width: '100%',
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: _moderateScale(8 * 2),
    backgroundColor: "#182128"
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
