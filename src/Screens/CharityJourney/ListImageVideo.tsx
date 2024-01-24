import Image from '@Components/Image'
import Screen from '@Components/Screen'
import { WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { FlashList } from '@shopify/flash-list'
import { RenderItemProps } from '@typings/common'
import React from 'react'
import { StyleSheet } from 'react-native'
import Header from './Components/Header'

const ListImageVideo = () => {

  function renderItem({ item }: RenderItemProps<any>) {
    return (
      <Image style={styles.image} avatar={null} />
    )
  }

  return (
    <Screen>
      <Header title='Ảnh/Video' />
      <FlashList
        contentContainerStyle={{}}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        numColumns={3}
        renderItem={renderItem}
        estimatedItemSize={100}
      />
    </Screen>
  )
}

export default ListImageVideo

const styles = StyleSheet.create({
  image: {
    width: _width / 3,
    height: _width / 3,
    borderWidth: 1,
    borderColor: WHITE
  }
})
