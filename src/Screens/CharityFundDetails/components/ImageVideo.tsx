import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { NEW_BASE_COLOR } from '@Constant/Color'
import Image from '@Components/Image'
import Spacer from '@Components/Spacer'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'

const ImageVideo = () => {
  const { navigate } = useNavigate()

  const _handleGoToDetail = useCallback(() => {
    navigate(ScreenKey.LIST_IMAGE_VIDEO)()
  }, [])

  const _renderItem = useCallback(() => {
    return (
      <TouchableOpacity activeOpacity={.7}>
        <Image
          style={styles.image}
          avatar={null} />
      </TouchableOpacity>
    )
  }, [])

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
        data={[1, 2, 3, 4, 5]} />
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
