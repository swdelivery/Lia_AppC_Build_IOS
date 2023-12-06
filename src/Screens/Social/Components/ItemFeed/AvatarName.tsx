import Column from '@Components/Column'
import { IconEarth } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { stylesFont } from '@Constant/Font'
import { Post } from "@typings/newfeeds"
import moment from 'moment'
import React from 'react'
import { StyleSheet } from 'react-native'

type Props = {
  data: Post
};

const AvatarName = ({ data }: Props) => {
  return (
    <Row
      gap={8 * 2}
      marginTop={8 * 2}
      marginHorizontal={8 * 2}>
      <Image
        style={styles.containerAvatar}
        avatar={data?.partner?.fileAvatar} />
      <Column
        flex={1}
        gap={4}>
        <Text weight='bold' >
          {data?.partner?.name}
        </Text>
        <Row
          gap={4}>
          <IconEarth />
          <Text size={12} >
            {moment(data?.created).fromNow()}
          </Text>
        </Row>
      </Column>
    </Row>
  )
}

export default AvatarName

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
