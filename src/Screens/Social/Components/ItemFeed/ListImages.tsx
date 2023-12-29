import Column from '@Components/Column'
import Image from '@Components/Image'
import Row from '@Components/Row'
import { WHITE } from '@Constant/Color'
import { stylesFont } from '@Constant/Font'
import { Post } from "@typings/newfeeds"
import React, { useCallback, useMemo } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import useVisible from 'src/Hooks/useVisible'
import { getImageAvataUrl } from 'src/utils/avatar'

type Props = {
  data: Post
};

const ListImages = ({ data }: Props) => {
  const imageViewer = useVisible<number>();
  const imageViewerMore = useVisible<number>();

  const { imageBeforeTreatment, imageAfterTreatment } = data?.template?.data
  const { images } = data


  const _handlePressImage = useCallback((idx: number) => () => {
    imageViewer.show(idx)
  }, [])
  const _handlePressImageMore = useCallback((idx: number) => () => {
    imageViewerMore.show(idx)
  }, [])

  const listImage = useMemo(() => {
    return [{ uri: getImageAvataUrl(imageBeforeTreatment[0]) }, { uri: getImageAvataUrl(imageAfterTreatment[0]) }]
  }, [imageBeforeTreatment, imageAfterTreatment])

  const listImageMore = useMemo(() => {
    return images?.map(item => {
      return {
        uri: getImageAvataUrl(item)
      }
    })
  }, [images])

  return (
    <Column gap={8 * 2}>
      <Row
        marginHorizontal={8 * 2}
        gap={8 * 2}>
        <TouchableOpacity
          onPress={_handlePressImage(0)}
          style={styles.containerImage}>
          <Image
            style={styles.image}
            avatar={imageBeforeTreatment[0]} />
          <View style={styles.containerText}>
            <Text style={styles.containerText__text}>
              Trước điều trị
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_handlePressImage(1)}
          style={styles.containerImage}>
          <Image
            style={styles.image}
            avatar={imageAfterTreatment[0]} />
          <View style={styles.containerText}>
            <Text style={styles.containerText__text}>
              Sau điều trị
            </Text>
          </View>
        </TouchableOpacity>
      </Row>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 * 2, gap: 8 }}
        horizontal>
        {
          images?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={_handlePressImageMore(index)}
                key={item._id}>
                <Image style={styles.otherImage} avatar={item} />
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>

      <EnhancedImageViewing
        images={listImage}
        imageIndex={imageViewer.selectedItem.current}
        onRequestClose={imageViewer.hide}
        visible={imageViewer.visible}
      />
      <EnhancedImageViewing
        imageIndex={imageViewerMore.selectedItem.current}
        images={listImageMore}
        onRequestClose={imageViewerMore.hide}
        visible={imageViewerMore.visible}
      />
    </Column>
  )
}

export default ListImages


const styles = StyleSheet.create({
  otherImage: {
    width: 8 * 8,
    height: 8 * 8,
    borderRadius: 8
  },
  containerText__text: {
    color: WHITE,
    ...stylesFont.fontNolan500,
    fontSize: 14
  },
  containerText: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    padding: 8,
    borderTopEndRadius: 8,
    paddingVertical: 4,
    fontSize: 14
  },
  containerImage: {
    flex: 1,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    flex: 1
  },
})

