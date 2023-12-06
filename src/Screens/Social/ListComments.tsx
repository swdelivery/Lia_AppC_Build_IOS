import { IconCancelGrey, IconLikeFilled } from '@Components/Icon/Icon'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { BASE_COLOR, BG_GREY_OPACITY_5, BORDER_COLOR, GREY_FOR_TITLE, RED, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { clearCommentsPost, createCommentPost, getCommentsPost, getMoreCommentsPost, selectCommentToReply } from '@Redux/newfeeds/actions'
import { getInfoPostState, getListCommentsState } from '@Redux/newfeeds/selectors'
import { isEmpty } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'
import {
  SendIcon,
} from "src/SGV"
import EachComment from './Components/EachComment/EachComment'

const ListComments = (props) => {
  const { navigation } = useNavigate()
  const dispatch = useDispatch()
  const { _idPost, focusTextInput } = props?.route?.params
  const { bottom } = useSafeAreaInsets()

  let RefTextInput = useRef(null)
  const [valueComment, setValueComment] = useState('')

  const { data: dataListComments, selectedCommentToReply, meta: metaListCommentsPost } = useSelector(getListCommentsState)
  const { data: { reactionCount } } = useSelector(getInfoPostState)

  useEffect(() => {

    return () => {
      dispatch(clearCommentsPost())
    };
  }, [])

  useEffect(() => {
    if (!isEmpty(selectedCommentToReply)) {
      RefTextInput.focus()
    }
  }, [selectedCommentToReply])

  useEffect(() => {
    dispatch(getCommentsPost.request({
      params: {
        "condition": {
          "parentId": {
            equal: null
          }
        },
        "sort": {
          "created": -1
        },
        "limit": 10,
        "page": 1
      },
      _idPost: _idPost
    }))
  }, [_idPost])

  // Enable keyboard when sreen showing
  useEffect(() => {
    if (focusTextInput) {
      RefTextInput?.focus()
    }
  }, [focusTextInput])

  const _handleOnchangeText = (value) => {
    setValueComment(value)
  }

  const _handleConfirmSendComment = () => {
    if (!valueComment.trim()) {
      return Alert.alert('Vui lòng nhập bình luận')
    }
    let dataFetch = {
      "content": valueComment,
      "postId": _idPost,
    }
    // Check if exist selectedCommentToReply 
    if (!isEmpty(selectedCommentToReply)) {
      dataFetch['parentId'] = selectedCommentToReply?._id
    }
    dispatch(createCommentPost.request(dataFetch))
    setValueComment('')
    setTimeout(() => {
      RefTextInput?.blur()
    }, 0);
  }

  const _handleUnSelectCommentToReply = () => {
    dispatch(selectCommentToReply(null))
  }

  const _handleGetMoreCommentsPost = () => {
    dispatch(getMoreCommentsPost.request({
      params: {
        "condition": {
          "parentId": {
            equal: null
          }
        },
        "sort": {
          "created": -1
        },
        "limit": 10,
        "page": metaListCommentsPost?.page + 1
      },
      _idPost: _idPost
    }))
  }

  const _renderItem = ({ item, index }) => {
    return (
      <EachComment data={item} />
    )
  }
  const _renderFooterFlatlist = () => {
    if (!isEmpty(metaListCommentsPost) && metaListCommentsPost?.page < metaListCommentsPost?.totalPage) {
      return (
        <TouchableOpacity onPress={_handleGetMoreCommentsPost}>
          <Row margin={8 * 2}>
            <Text
              color={GREY_FOR_TITLE}
              weight='bold'>
              Tải thêm bình luận
            </Text>
          </Row>
        </TouchableOpacity>
      )
    }
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-bottom}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Screen
        safeBottom
        safeTop
        style={styles.container}>
        <Row
          justifyContent='space-between'
          padding={8 * 2}>
          <Row gap={8}>
            <IconLikeFilled />
            <Text>
              {reactionCount} lượt yêu thích bài viết
            </Text>
          </Row>
          <TouchableOpacity onPress={navigation.goBack}>
            <IconCancelGrey style={sizeIcon.lg} />
          </TouchableOpacity>
        </Row>
        <HorizontalLine
          style={{ backgroundColor: BORDER_COLOR }} />
        <FlatList
          contentContainerStyle={styles.containerFlatlist}
          data={dataListComments}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item?._id.toString()}
          ListFooterComponent={_renderFooterFlatlist}
          onEndReachedThreshold={1} />
        <View style={styles.containerInput}>
          {
            selectedCommentToReply ?
              <Row
                gap={8}
                padding={8 * 2}
                paddingBottom={0}>
                <View style={styles.verticalLine} />
                <Text>
                  Đang trả lời <Text weight='bold' color={BASE_COLOR}>{selectedCommentToReply?.partner?.name}</Text>
                </Text>
                <TouchableOpacity
                  onPress={_handleUnSelectCommentToReply}
                  style={styles.btnCancel}>
                  <IconCancelGrey style={sizeIcon.xxxs} />
                </TouchableOpacity>
              </Row>
              : <></>
          }

          <Row
            gap={8 * 2}
            marginHorizontal={8 * 2}>
            <View style={styles.containerTextInput}>
              <TextInput
                ref={ref => RefTextInput = ref}
                value={valueComment}
                onChangeText={_handleOnchangeText}
                style={styles.textInput}
                multiline
                placeholder='Nhập bình luận...' />
            </View>
            <TouchableOpacity
              onPress={_handleConfirmSendComment}>
              <SendIcon width={8 * 3} height={8 * 3} />
            </TouchableOpacity>
          </Row>
        </View>
      </Screen>
    </KeyboardAvoidingView>

  )
}

export default ListComments

const styles = StyleSheet.create({
  btnCancel: {
    marginLeft: 8,
    padding: 4,
    borderRadius: 4,
    backgroundColor: BG_GREY_OPACITY_5
  },
  verticalLine: {
    width: 2,
    height: 8 * 2.5,
    backgroundColor: RED,
    marginRight: 4
  },
  containerFlatlist: {
    gap: 8 * 2,
    paddingTop: 8 * 2,
    paddingBottom: 50
  },
  textInput: {
    margin: 0,
    padding: 0
  },
  containerInput: {
    borderTopWidth: 1,
    borderColor: BORDER_COLOR
  },
  containerTextInput: {
    margin: 8 * 2,
    marginHorizontal: 0,
    padding: 8 * 2,
    paddingVertical: 8,
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    flex: 1,
    minHeight: 8 * 5
  },
  container: {
    backgroundColor: WHITE,
    flex: 1
  }
})
