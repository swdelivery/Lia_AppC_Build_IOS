import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _moderateScale } from '@Constant/Scale'
import { BG_GREY_OPACITY_7, GREEN_SUCCESS, WHITE } from '@Constant/Color'


type Props = {
  active?: boolean
};

const OnOffButton = ({ active }: Props) => {

  if (active) {
    return (
      <TouchableOpacity style={styles.btnActive}>
        <View style={styles.btnActive__child} />
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity style={styles.btnInActive}>
        <View style={styles.btnInActive__child} />
      </TouchableOpacity>
    )
  }


}

export default OnOffButton

const styles = StyleSheet.create({
  btnInActive__child: {
    width: _moderateScale(8 * 2.5),
    height: _moderateScale(8 * 2.5),
    borderRadius: _moderateScale(8 * 1.5),
    backgroundColor: WHITE,
  },
  btnInActive: {
    width: _moderateScale(8 * 5.5),
    height: _moderateScale(8 * 3),
    borderRadius: _moderateScale(8 * 2),
    backgroundColor: BG_GREY_OPACITY_7,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: _moderateScale(2),
  },
  btnActive__child: {
    width: _moderateScale(8 * 2.5),
    height: _moderateScale(8 * 2.5),
    borderRadius: _moderateScale(8 * 1.5),
    backgroundColor: WHITE,
  },
  btnActive: {
    width: _moderateScale(8 * 5.5),
    height: _moderateScale(8 * 3),
    borderRadius: _moderateScale(8 * 2),
    backgroundColor: GREEN_SUCCESS,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: _moderateScale(2),
  },
})
