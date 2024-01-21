import Column from '@Components/Column'
import { IconLike, IconLikeFilled } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BLUE_FB, GREY_FOR_TITLE } from '@Constant/Color'
import { CommentPost } from '@typings/newfeeds'
import moment from 'moment'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { createReactionComment, selectCommentToReply } from '@Redux/newfeeds/actions'
import useHapticCallback from 'src/Hooks/useHapticCallback'
import { styleElement } from '@Constant/StyleElement'
import Avatar from '@Components/Avatar'

type Props = {
  data: CommentPost
}

const ChildComment = ({ data }: Props) => {
  const dispatch = useDispatch()
  const { partner, content, created, parentInfo, reactionCount, reaction } = data

  const _handleReplyChildComment = () => {
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
        marginHorizontal={0}>
        <Avatar
          circle
          size={8 * 3}
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
              flex={1}
              gap={4}
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
                  {
                    parentInfo?._id ?
                      <Text
                        color={BLUE_FB}>
                        {
                          `${parentInfo?.name} `
                        }
                      </Text>
                      : <></>
                  }
                  {content.trim()}
                </Text>
              </Column>
            </Column>
          </Column>
          <Row gap={8 * 2}>
            <Text size={12}>{moment(created).fromNow()}</Text>
            <TouchableOpacity onPress={_handleReplyChildComment}>
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

        </Column>
      </Row>
    </View>
  )
}

export default ChildComment
