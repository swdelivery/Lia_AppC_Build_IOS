import Column from '@Components/Column';
import Row from '@Components/Row';
import Text from '@Components/Text';
import { WHITE } from '@Constant/Color';
import { URL_ORIGINAL } from '@Constant/Url';
import { getInfoUserReducer } from '@Redux/Selectors';
import { Post } from "@typings/newfeeds";
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

type Props = {
  data: Post
};

const CountCommentLike = ({ data }: Props) => {

  const { infoUser } = useSelector(getInfoUserReducer);

  const { reactionCount, commentsCount } = data

  return (
    <Column paddingHorizontal={8 * 2}>
      <Row>
        <Row
          flex={1}
          gap={8}
          paddingLeft={8}>
          <Row>
            {
              Array.from(new Array(reactionCount), (x, i) => i)?.map((item, index) => {
                return (
                  <Image
                    style={styles.image}
                    source={{ uri: `${URL_ORIGINAL}${infoUser?.fileAvatar?.link}` }} />
                )
              })
            }
          </Row>
          <Text>{reactionCount} Người thích bài viết này</Text>
        </Row>

        <TouchableOpacity>
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
