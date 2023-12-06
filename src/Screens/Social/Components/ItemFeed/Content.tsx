import Column from '@Components/Column'
import { BLUE_FB } from '@Constant/Color'
import { stylesFont } from '@Constant/Font'
import { Post } from "@typings/newfeeds"
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'

type Props = {
  data: Post
};

const Content = ({ data }: Props) => {
  const [isCollap, setIsCollap] = useState(false)

  const { content } = data

  useEffect(() => {
    if (content.length > 150) {
      setIsCollap(true)
    } else {
      setIsCollap(false)
    }
  }, [content])

  return (
    <Column marginHorizontal={8 * 2}>
      {
        isCollap ?
          <Text
            style={styles.content}>
            {content?.slice(0, 150)}
            <Text
              style={styles.expandText}
              onPress={() => setIsCollap(old => !old)}>
              {`  Xem thêm`}
            </Text>
          </Text>
          :
          <Text style={styles.content}>{content}</Text>
      }
    </Column>
  )
}

export default Content


const styles = StyleSheet.create({
  content: {
    fontSize: 14,
    ...stylesFont.fontNolan500,
  },
  expandText: {
    fontSize: 14,
    ...stylesFont.fontNolan,
    color: BLUE_FB,
  },
})
