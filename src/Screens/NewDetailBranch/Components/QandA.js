import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { styleText } from '../../../Constant/StyleText'
import { _moderateScale } from '../../../Constant/Scale'
import IconArrowRight from '../../../SGV/arrowRight.svg'

const QandA = memo(() => {


  return (
    <View>
      <Text style={[styleText.textBlackNorBold, { padding: _moderateScale(8 * 2), paddingBottom: _moderateScale(8) }]}>
        Các câu hỏi thường gặp
      </Text>

      <View style={{paddingHorizontal:_moderateScale(8*2)}}>
        {
          [1,2,3,4,5]?.map((item, index) => {
            return (
              <TouchableOpacity style={{flexDirection:'row',marginBottom:_moderateScale(8*2)}}>
                <Text style={{flex:1}}>
                 {index+1}. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Text>
                <IconArrowRight 
                width ={_moderateScale(8*2)}
                height={_moderateScale(8*2)}
                />
              </TouchableOpacity>
            )
          })
        }
      </View>

    </View>
  )
})

export default QandA

const styles = StyleSheet.create({})