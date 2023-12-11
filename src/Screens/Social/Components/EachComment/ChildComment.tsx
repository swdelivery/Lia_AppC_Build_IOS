import Column from '@Components/Column'
import { IconLike } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BLUE_FB, GREY_FOR_TITLE } from '@Constant/Color'
import { CommentPost } from '@typings/newfeeds'
import moment from 'moment'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { selectCommentToReply } from '@Redux/newfeeds/actions'

type Props = {
  data: CommentPost
}

const ChildComment = ({ data }: Props) => {
  const dispatch = useDispatch()
  const { partner, content, created, parentInfo } = data

  const _handleReplyChildComment = () => {
    dispatch(selectCommentToReply(data))
  }

  return (
    <View>
      <Row
        gap={8}
        alignItems='flex-start'
        marginHorizontal={0}>
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
            {/* <TouchableOpacity>
              <Row gap={4}>
                <IconLike />
                <Text>10</Text>
              </Row>
            </TouchableOpacity> */}
          </Row>

        </Column>
      </Row>
    </View>
  )
}

export default ChildComment

const styles = StyleSheet.create({
  avatar: {
    width: 8 * 3,
    height: 8 * 3,
    borderRadius: 8 * 3 / 2
  }
})
