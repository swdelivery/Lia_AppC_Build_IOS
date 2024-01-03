import { StyleSheet, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column'
import Avatar from '@Components/Avatar'
import { _heightScale } from '@Constant/Scale'
import { WHITE } from '@Constant/Color'
import Text from '@Components/Text'

const InfoUser = () => {
  return (
    <Column
      gap={8}
      alignItems='center'
      alignSelf='center'>
      <Avatar
        circle
        size={_heightScale(8 * 6)}
        avatar={null} />
      <Column
        alignItems='center'>
        <Text
          size={_heightScale(12)}
          color={WHITE}
          weight='bold'>
          LE THANH AN
        </Text>
        <Text
          size={_heightScale(12)}
          color={WHITE}
          weight='bold'>
          BẠCH KIM
        </Text>
      </Column>
    </Column>
  )
}

export default InfoUser

const styles = StyleSheet.create({})
