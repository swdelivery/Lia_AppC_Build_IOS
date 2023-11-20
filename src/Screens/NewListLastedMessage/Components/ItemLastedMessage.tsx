import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Image from '@Components/Image'
import { _moderateScale } from '@Constant/Scale'
import Row from '@Components/Row'
import Column from '@Components/Column'
import { RED, WHITE } from '@Constant/Color'

const ItemLastedMessage = () => {
  return (
    <View>
      <Row gap={_moderateScale(8 * 2)}>
        <Image style={styles.avatar} avatar={null} />
        <Column
          gap={_moderateScale(4)}
          flex={1}>
          <Text weight='bold'>BS. Nguyễn Huỳnh Như</Text>
          <Text size={12} weight='bold' numberOfLines={1}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
        </Column>
        <Column
          gap={_moderateScale(4)}
          alignItems='flex-end'>
          <Text weight='bold' size={12}>1 phút trước</Text>
          <View style={styles.countBox}>
            <Text weight='bold' size={12} color={WHITE}>
              +5
            </Text>
          </View>
        </Column>
      </Row>
    </View>
  )
}

export default ItemLastedMessage

const styles = StyleSheet.create({
  countBox: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 2),
    borderRadius: _moderateScale(4),
    backgroundColor: '#EB4303',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale(8 * 5 / 2)
  }
})
