import Column from '@Components/Column';
import Image from '@Components/Image';
import Row from '@Components/Row';
import Text from '@Components/Text';
import { WHITE } from '@Constant/Color';
import ScreenKey from '@Navigation/ScreenKey';
import { getInfoUserReducer } from '@Redux/Selectors';
import { selectPost } from '@Redux/newfeeds/actions';
import { Post } from "@typings/newfeeds";
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'src/Hooks/useNavigation';

type Props = {
  data: Post
};

const CountCommentLike = ({ data }: Props) => {
  const { navigate } = useNavigate()
  const dispatch = useDispatch()
  const { reactionCount, commentsCount, _id, partnersReaction } = data

  const _handleGoToListComments = () => {
    dispatch(selectPost(data))
    navigate(ScreenKey.LIST_COMMENTS, { _idPost: _id })()
  }

  return (
    <Column paddingHorizontal={8 * 2}>
      <Row>
        <Row
          flex={1}
          gap={8}
          paddingLeft={8}>
          <Row>
            {
              partnersReaction?.map((item, index) => {
                return (
                  <Image
                    style={styles.image}
                    avatar={item?.partner?.fileAvatar} />
                )
              })
            }
          </Row>
          <Text>{reactionCount} Lượt thích bài viết này</Text>
        </Row>
        <TouchableOpacity
          onPress={_handleGoToListComments}>
          <Text>
            {commentsCount} Lượt bình luận
          </Text>
        </TouchableOpacity>

      </Row>
    </Column>
  )
}

export default CountCommentLike

const styles = StyleSheet.create({
  image: {
    width: 8 * 3,
    height: 8 * 3,
    borderRadius: 8 * 3 / 2,
    marginLeft: -8,
    borderWidth: 1,
    borderColor: WHITE
  }
})
