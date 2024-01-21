import Column from '@Components/Column'
import { IconLike, IconLikeFilled } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY_FOR_TITLE } from '@Constant/Color'
import { createReactionComment, getChildCommentsPost, selectCommentToReply } from '@Redux/newfeeds/actions'
import { CommentPost } from '@typings/newfeeds'
import moment from 'moment'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import ChildComment from './ChildComment'
import useHapticCallback from 'src/Hooks/useHapticCallback'
import { styleElement } from '@Constant/StyleElement'
import Avatar from '@Components/Avatar'

type Props = {
  data: CommentPost
}

const EachComment = ({ data }: Props) => {
  const dispatch = useDispatch()
  const {
    postId,
    partner,
    content,
    created,
    commentsCount,
    _id,
    childComments,
    reactionCount,
    reaction
  } = data

  useEffect(() => {
    if (commentsCount) {
      dispatch(getChildCommentsPost.request({
        params: {
          "condition": {
            "parentId": {
              equal: _id
            }
          },
          "sort": {
            "created": 1
          },
        },
        _idPost: postId
      }))
    }
  }, [commentsCount, _id])

  const _handleSelectCommentToReply = () => {
    dispatch(selectCommentToReply(data))
  }
  const _handleLikeComment = useHapticCallback(() => {
    if (reaction?._id) {
      dispatch(createReactionComment.request({
        "commentId": data?._id,
      }))
    } else {
      dispatch(createReactionComment.request({
        "commentId": data?._id,
        "type": "LIKE"
      }))
    }
  }, [reaction])

  return (
    <View>
      <Row
        gap={8}
        alignItems='flex-start'
        marginHorizontal={8 * 2}>
        <Avatar
          circle
          size={8 * 5}
          avatar={partner?.fileAvatar} />
        <Column flex={1} gap={4}>
          <Column
            flex={1}
            alignSelf='flex-start'
            backgroundColor={'#EFF2F5'}
            padding={8}
            paddingHorizontal={8 * 2}
            borderRadius={8}>
            <Column
              gap={4}
              flex={1}
              alignItems='flex-start'>
              <Text
                weight='bold'
                color={GREY_FOR_TITLE}>
                {partner?.name}
              </Text>
              <Column
                flex={1}
                alignSelf='flex-start'>
                <Text>
                  {content.trim()}
                </Text>
              </Column>
            </Column>
          </Column>

          <Row gap={8 * 2}>
            <Text size={12}>{moment(created).fromNow()}</Text>
            <TouchableOpacity
              onPress={_handleSelectCommentToReply}>
              <Text>Trả lời</Text>
            </TouchableOpacity>
            {/* PENDING */}
            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={_handleLikeComment}>
              <Row gap={4}>
                {
                  reaction?._id ?
                    <IconLikeFilled />
                    :
                    <IconLike />
                }
                <Text>{reactionCount}</Text>
              </Row>
            </TouchableOpacity>
          </Row>
          {
            childComments?.length > 0 ?
              <Column
                marginTop={8}
                gap={8}>
                {
                  childComments?.map((item, index) => {
                    return (
                      <ChildComment key={item?._id} data={item} />
                    )
                  })
                }
              </Column>
              :
              <></>
          }

        </Column>
      </Row>
    </View>
  )
}

export default EachComment

