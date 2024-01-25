import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import Text from '@Components/Text'
import { FileAvatar } from '@typings/common'
import { FlashList } from '@shopify/flash-list'
import { _width } from '@Constant/Scale'
import { WHITE } from '@Constant/Color'
import Image from '@Components/Image'
import { RenderItemProps } from '@typings/common'
import useVisible from 'src/Hooks/useVisible'
import Screen from '@Components/Screen'
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import { getImageAvataUrl } from 'src/utils/avatar'


type Props = {
  data: FileAvatar[];
}

const ListImages = ({ data }: Props) => {
  const imageViewer = useVisible()

  const listImage = useMemo(() => {
    return data?.filter(item => item?.type == 'image');
  }, [data])
  const listImageForViewing = useMemo(() => {
    return listImage?.map((item, index) => {
      return {
        uri: getImageAvataUrl(item)
      }
    })
  }, [listImage])

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

  return (
    <Screen>
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

export default ListImages

const styles = StyleSheet.create({
  image: {
    width: _width / 3,
    height: _width / 3,
    borderWidth: 1,
    borderColor: WHITE
  }
})
