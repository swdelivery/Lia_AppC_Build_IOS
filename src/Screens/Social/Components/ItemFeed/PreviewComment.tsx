import Column from '@Components/Column'
import { IconLikeFilled } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BG_GREY_OPACITY_5, BLUE_FB, GREY_FOR_TITLE } from '@Constant/Color'
import { stylesFont } from '@Constant/Font'
import { URL_ORIGINAL } from '@Constant/Url'
import { Post } from "@typings/newfeeds"
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'


type Props = {
  data: Post
};

const PreviewComment = ({ data }: Props) => {
  const { comments } = data
  if (comments?.length == 0) {
    return null
  }
  return (
    <View>
      {
        comments?.length > 0 ?
          <Row
            flex={1}
            gap={8}
            padding={8 * 2}
            paddingTop={0}
            alignItems='flex-start'>
            <Image
              style={styles.containerAvatar}
              source={{ uri: `${URL_ORIGINAL}${comments[0]?.partner?.fileAvatar?.link}` }}
            />
            <Column gap={4}>
              <Column
                minWidth={8 * 30}
                alignSelf='flex-start'
                backgroundColor={'#EFF2F5'}
                padding={8}
                borderRadius={8}>
                <Column
                  alignItems='flex-start'>
                  <Text
                    weight='bold'
                    color={GREY_FOR_TITLE}>
                    {comments[0]?.partner?.name}
                  </Text>
                  <Column
                    alignSelf='flex-start'>
                    <Text>
                      {comments[0]?.content}
                    </Text>
                  </Column>
                </Column>
              </Column>

              <Row gap={8}>
                <TouchableOpacity>
                  <Text size={12} weight='bold'>
                    Thích
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text size={12} weight='bold'>
                    Trả lời
                  </Text>
                </TouchableOpacity>
                <Column flex={1} />
                <Row gap={4} alignItems='flex-start'>
                  <IconLikeFilled />
                  <Text size={12}>
                    (13)
                  </Text>
                </Row>
              </Row>
            </Column>
          </Row>
          :
          <></>
      }

    </View>
  )
}

export default PreviewComment


const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    ...stylesFont.fontNolanBold
  },
  containerAvatar: {
    width: 8 * 5,
    height: 8 * 5,
    borderRadius: 8 * 5 / 2
  }
})
