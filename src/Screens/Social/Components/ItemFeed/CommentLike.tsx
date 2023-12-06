import { IconLike, IconLikeFilled, IconPostComment } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, RED } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { createReactionPost, selectPost } from '@Redux/newfeeds/actions'
import { Post } from '@typings/newfeeds'
import { isEmpty } from 'lodash'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import useHapticCallback from 'src/Hooks/useHapticCallback'
import { useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  data: Post
};

const CommentLike = ({ data }: Props) => {
  const { navigate } = useNavigate()
  const dispatch = useDispatch()
  const { _id } = data

  const _handleGoToListComments = () => {
    dispatch(selectPost(data))
    navigate(ScreenKey.LIST_COMMENTS, { _idPost: _id })()
  }

  const _handleLikePost = useHapticCallback(() => {
    const dataFetch = {
      postId: _id,
    }
    if (isEmpty(data?.reaction)) {
      dataFetch['type'] = "LIKE"
    }
    dispatch(createReactionPost.request(dataFetch))
  }, [])

  return (
    <Row
      borderColor={BORDER_COLOR}
      borderTopWidth={1}
      borderBottomWidth={1}>
      <TouchableOpacity
        onPress={_handleLikePost}
        style={styles.containerBtn}>
        <Row gap={8}>
          {
            data?.reaction?._id ?
              <IconLikeFilled />
              :
              <IconLike />
          }
          <Text
            weight={data?.reaction?._id ? 'bold' : 'regular'}
            color={data?.reaction?._id ? RED : GREY}>
            Yêu thích
          </Text>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_handleGoToListComments}
        style={styles.containerBtn}>
        <Row gap={8}>
          <IconPostComment />
          <Text color={GREY}>Bình luận</Text>
        </Row>

      </TouchableOpacity>
    </Row>
  )
}

export default CommentLike

const styles = StyleSheet.create({
  containerBtn: {
    flex: 1,
    height: 8 * 6,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
