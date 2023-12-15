import { StyleSheet, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column'
import Text from '@Components/Text'
import Image from '@Components/Image'
import { GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Button from '@Components/Button/Button'

const CardSmallCharity = () => {
  return (
    <Column
      alignItems='center'
      gap={8}
      alignSelf='flex-start'>
      <Text
        weight='bold'
        color={GREY}
        size={12}
        style={{ textAlign: 'center' }}>Dự án {`\n`} nổi bật 1</Text>
      <Column
        borderRadius={8}
        backgroundColor={'#F4F4F4'}
        padding={8}
        paddingBottom={8 * 2}>
        <Column
          top={8 * 2}
          borderTopRightRadius={4}
          borderBottomRightRadius={4}
          zIndex={1}
          paddingHorizontal={4}
          paddingVertical={2}
          backgroundColor={NEW_BASE_COLOR}
          position='absolute'>
          <Text
            color={WHITE}
            size={10}>
            420 Ngày
          </Text>
        </Column>
        <Image
          style={styles.avatar}
          avatar={null} />
      </Column>
      <Button.Gradient
        onPress={() => { }}
        title="Ủng hộ"
        titleSize={12}
        height={8 * 3}
        width={8 * 8}
        borderRadius={8}
        horizontal
        colors={["#1a3e67", "#34759b"]}
      />
    </Column>
  )
}

export default CardSmallCharity

const styles = StyleSheet.create({
  avatar: {
    width: 8 * 10,
    height: 8 * 10,
    borderRadius: 8
  }
})
