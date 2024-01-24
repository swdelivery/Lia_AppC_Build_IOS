import Image from '@Components/Image'
import Screen from '@Components/Screen'
import { WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { FlashList } from '@shopify/flash-list'
import { RenderItemProps } from '@typings/common'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Header from './Components/Header'
import { useSelector } from 'react-redux'
import { getDetailCampainState } from '@Redux/charity/selectors'
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import useVisible from 'src/Hooks/useVisible'
import { getImageAvataUrl } from 'src/utils/avatar'

const ListImageVideo = () => {
  const { data: { representationFileArr } } = useSelector(getDetailCampainState)
  const imageViewer = useVisible()

  function renderItem({ item, index }: RenderItemProps<any>) {

    const _handlePressImage = ((idx: number) => () => {
      imageViewer.show(index)
    })

    return (
      <TouchableOpacity onPress={_handlePressImage(index)}>
        <Image style={styles.image} avatar={item} />
      </TouchableOpacity>
    )
  }

  const listImage = useMemo(() => {
    return representationFileArr?.filter(item => item?.type == 'image');
  }, [representationFileArr])

  const listImageForViewing = useMemo(() => {
    return listImage?.map((item, index) => {
      return {
        uri: getImageAvataUrl(item)
      }
    })
  }, [listImage])

  return (
    <Screen>
      <Header title='Ảnh/Video' />
      <FlashList
        contentContainerStyle={{}}
        data={listImage}
        numColumns={3}
        renderItem={renderItem}
        estimatedItemSize={100}
      />
      <EnhancedImageViewing
        images={listImageForViewing}
        imageIndex={imageViewer.selectedItem.current}
        onRequestClose={imageViewer.hide}
        visible={imageViewer.visible}
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
