import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RenderHTML from '../../Components/RenderHTML/RenderHTML'
import { _moderateScale } from '@Constant/Scale'

const Parameter = (props) => {

  const {infoMaterial} = props

  return (
    <View style={{paddingHorizontal:_moderateScale(8*2)}}>
        <RenderHTML data={infoMaterial?.specs} />
    </View>
  )
}

export default Parameter

const styles = StyleSheet.create({})