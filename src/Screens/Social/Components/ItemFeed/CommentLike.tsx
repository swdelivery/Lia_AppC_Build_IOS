import { IconLike, IconPostComment } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY } from '@Constant/Color'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const CommentLike = () => {
  return (
    <Row
      borderColor={BORDER_COLOR}
      borderTopWidth={1}
      borderBottomWidth={1}>
      <TouchableOpacity style={styles.containerBtn}>
        <Row gap={8}>
          <IconLike />
          <Text color={GREY}>Yêu thích</Text>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerBtn}>
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
