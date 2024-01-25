import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { NEW_BASE_COLOR } from '@Constant/Color'
import Image from '@Components/Image'
import Spacer from '@Components/Spacer'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import { getDetailCampainState } from '@Redux/charity/selectors'
import { useSelector } from 'react-redux'
import useVisible from 'src/Hooks/useVisible'
import { getImageAvataUrl } from 'src/utils/avatar'
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import { isEmpty } from 'lodash'

const ImageVideo = () => {
  const { data: { representationFileArr } } = useSelector(getDetailCampainState)
  const imageViewer = useVisible()
  const { navigate } = useNavigate()

  const _handleGoToDetail = useCallback(() => {
    navigate(ScreenKey.LIST_IMAGE_VIDEO)()
  }, [])

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

  const _renderItem = useCallback(({ item, index }) => {
    const _handlePressImage = ((idx: number) => () => {
      imageViewer.show(index)
    })
    return (
      <TouchableOpacity
        onPress={_handlePressImage(index)}
        activeOpacity={.7}>
        <Image
          style={styles.image}
          avatar={item} />
      </TouchableOpacity>
    )
  }, [])

  if (isEmpty(listImage)) return null;
  return (
    <Column
      marginTop={8 * 4}
      margin={8 * 2}>
      <Row justifyContent='space-between'>
        <Text weight='bold'>Ảnh/Video</Text>
        <TouchableOpacity onPress={_handleGoToDetail}>
          <Text color={NEW_BASE_COLOR}>
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </Row>
      <Spacer top={8} />
      <FlatList
        contentContainerStyle={{ gap: 8 }}
        horizontal
        renderItem={_renderItem}
        data={listImage} />
      <EnhancedImageViewing
        images={listImageForViewing}
        imageIndex={imageViewer.selectedItem.current}
        onRequestClose={imageViewer.hide}
        visible={imageViewer.visible}
      />
    </Column>
  )
}

export default ImageVideo

const styles = StyleSheet.create({
  image: {
    width: 8 * 16,
    height: 8 * 16,
    borderRadius: 8
  }
})
