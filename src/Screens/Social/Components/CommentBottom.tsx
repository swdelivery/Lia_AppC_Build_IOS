import { IconLike, IconPostComment } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BG_GREY_OPACITY_5, BORDER_COLOR, GREY } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { Post } from '@typings/newfeeds'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  data: Post
};

const CommentBottom = ({ data }: Props) => {
  const { navigate } = useNavigate()
  return (
    <Row
      gap={8 * 2}
      paddingHorizontal={8 * 2}
      paddingVertical={8 * 2}
      borderColor={BORDER_COLOR}
      borderTopWidth={1}>
      <TouchableOpacity
        onPress={navigate(ScreenKey.LIST_COMMENTS, { _idPost: data?._id, focusTextInput: true })}
        style={styles.btnAddComment}>
        <Text color={GREY} fontStyle='italic'>
          Thêm bình luận của bạn...
        </Text>
      </TouchableOpacity>
      <Row gap={8 * 2}>
        <TouchableOpacity>
          <Row gap={8}>
            <IconLike />
            <Text weight='bold'>{data?.reactionCount}</Text>
          </Row>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigate(ScreenKey.LIST_COMMENTS, { _idPost: data?._id })}>
          <Row gap={8}>
            <IconPostComment />
            <Text weight='bold'>{data?.commentsCount}</Text>
          </Row>
        </TouchableOpacity>
      </Row>
    </Row>
  )
}

export default CommentBottom

const styles = StyleSheet.create({
  btnAddComment: {
    height: 8 * 5,
    flex: 1,
    backgroundColor: BG_GREY_OPACITY_5,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 8
  }
})
