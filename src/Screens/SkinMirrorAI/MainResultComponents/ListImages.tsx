import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Column from '@Components/Column'
import { NEW_BASE_COLOR } from '@Constant/Color'
import Icon from '@Components/Icon'
import { styleElement } from '@Constant/StyleElement'

const ListImages = () => {
  return (
    <Row gap={8 * 2} padding={8 * 2}>
      <Column
        gap={4}
        alignItems='center'>
        <Image
          style={styles.image}
          source={require('../../../Image/demoSkinAI/demo.png')} />
        <Text color={NEW_BASE_COLOR}>
          Chính diện
        </Text>
      </Column>
      <Column
        gap={4}
        alignItems='center'>
        <Image
          style={styles.image}
          source={require('../../../Image/demoSkinAI/demo.png')} />
        <Text color={NEW_BASE_COLOR}>
          Góc trái
        </Text>
      </Column>
      <Column
        gap={4}
        alignItems='center'>
        <Image
          style={styles.image}
          source={require('../../../Image/demoSkinAI/demo.png')} />
        <Text color={NEW_BASE_COLOR}>
          Góc phải
        </Text>
      </Column>

      <TouchableOpacity>
        <Column
          bottom={8}
          style={styleElement.centerChild}
          height={8 * 6}
          borderRadius={8}
          borderWidth={1}
          borderColor={NEW_BASE_COLOR}
          width={8 * 6}>
          <Icon color={NEW_BASE_COLOR} name='camera-outline' />
        </Column>
      </TouchableOpacity>

    </Row>
  )
}

export default ListImages

const styles = StyleSheet.create({
  image: {
    width: 8 * 10,
    height: 8 * 10,
    borderRadius: 8
  }
})
