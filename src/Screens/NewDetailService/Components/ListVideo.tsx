import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '@Components/Text'
import { _moderateScale, _widthScale } from '@Constant/Scale'
import Column from '@Components/Column'
import ItemVideo from '@Components/Video/ItemVideo'

const ListVideo = () => {


  return (
    <Column style={styles.container} gap={8}>
      <Text weight="bold">Video hướng dẫn</Text>

      <ScrollView contentContainerStyle={{ gap: 8 }} horizontal>
        {
          [1, 2, 3, 4]?.map((_i, idx) => {
            return (
              <ItemVideo />
            )
          })
        }
      </ScrollView>
    </Column>
  )
}

export default ListVideo

const styles = StyleSheet.create({
  container: {
    width: _widthScale(360),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: _moderateScale(8),
    padding: _moderateScale(8 * 2),
  },
})
