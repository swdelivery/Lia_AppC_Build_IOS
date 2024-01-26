import { IconPlayWhite } from '@Components/Icon/Icon'
import Screen from '@Components/Screen'
import { WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import { FlashList } from '@shopify/flash-list'
import { FileAvatar, RenderItemProps } from '@typings/common'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { createThumbnail } from 'react-native-create-thumbnail'
import { useNavigate } from 'src/Hooks/useNavigation'
import { getImageAvataUrl } from 'src/utils/avatar'


type Props = {
  data: FileAvatar[];
}
const ListVideos = ({ data }: Props) => {
  const { navigate } = useNavigate()

  const listVideo = useMemo(() => {
    return data?.filter(item => item?.type == 'video');
  }, [data])

  function renderItem({ item, index }: RenderItemProps<any>) {
    const _handlePress = (data) => {
      console.log({ data, index });
      navigate(ScreenKey.VERTICAL_VIDEO_PLAYER, {
        data: listVideo?.map(item => {
          return {
            video: item
          }
        }),
        idx: index,
      })()
    }
    return (
      <Thumbnail onPress={_handlePress} data={item} />
    )
  }

  return (
    <Screen>
      <FlashList
        contentContainerStyle={{}}
        data={listVideo}
        numColumns={3}
        renderItem={renderItem}
        estimatedItemSize={100}
      />
    </Screen>
  )
}


type PropsThumbail = {
  data: FileAvatar;
  onPress: (item) => void;
}
const Thumbnail = ({ data, onPress }: PropsThumbail) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    let url = getImageAvataUrl(data);
    createThumbnail({
      url: url,
      timeStamp: 1000,
    })
      .then(response => {
        setImage({
          thumbnail: response?.path
        })
      })
      .catch(err => console.log({ err }));
  }, [data])

  const _handlePress = useCallback(() => {
    onPress(data)
  }, [data])

  return (
    <TouchableOpacity onPress={_handlePress}>
      <View style={[StyleSheet.absoluteFillObject, styles.backDrop]}>
        <IconPlayWhite />
      </View>
      <Image style={styles.image} source={{ uri: image?.thumbnail }} />
    </TouchableOpacity>
  )
}

export default ListVideos

const styles = StyleSheet.create({
  backDrop: {
    backgroundColor: 'rgba(0,0,0,.3)',
    zIndex: 1,
    ...styleElement.centerChild
  },
  image: {
    width: _width / 3,
    height: _width / 3,
    borderWidth: 1,
    borderColor: WHITE
  }
})
