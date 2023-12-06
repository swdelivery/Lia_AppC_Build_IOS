import Column from '@Components/Column'
import { IconLike } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY_FOR_TITLE } from '@Constant/Color'
import { getChildCommentsPost, selectCommentToReply } from '@Redux/newfeeds/actions'
import { CommentPost } from '@typings/newfeeds'
import moment from 'moment'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import ChildComment from './ChildComment'

type Props = {
  data: CommentPost
}

const EachComment = ({ data }: Props) => {
  const dispatch = useDispatch()
  const { postId, partner, content, created, commentsCount, _id, childComments } = data

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

  return (
    <View>
      <Row
        gap={8}
        alignItems='flex-start'
        marginHorizontal={8 * 2}>
        <Image
          style={styles.avatar}
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
            <TouchableOpacity>
              <Row gap={4}>
                <IconLike />
                <Text>10</Text>
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

const styles = StyleSheet.create({
  avatar: {
    width: 8 * 5,
    height: 8 * 5,
    borderRadius: 8 * 5 / 2
  }
})
