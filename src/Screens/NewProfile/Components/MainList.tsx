import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '@Components/Text'
import { IconDiary, IconHandHeart, IconHeart, IconHome } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import { WHITE } from '@Constant/Color'


const MainList = () => {
  return (
    <View style={styles.container}>
      <Row gap={8 * 2} justifyContent='space-between'>
        <BtnIcon text={'Nhật ký'} icon={<IconDiary />} />
        <BtnIcon text={'Sức khoẻ'} icon={<IconHeart />} />
        <BtnIcon text={'Người thân'} icon={<IconHome />} />
        <BtnIcon text={'Tri ân'} icon={<IconHandHeart />} />
      </Row>
    </View>
  )
}

export default MainList

const BtnIcon = ({ icon = null, text = '' }) => {
  return (
    <TouchableOpacity style={[styles.btn, shadow]}>
      <View style={styles.btn__icon}>
        {icon}
      </View>
      <Text size={13} style={styles.btn__text} weight='bold'>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn__icon: {
    position: 'absolute',
    top: 8 * 3
  },
  btn__text: {
    position: 'absolute',
    bottom: 8 * 1.5
  },
  btn: {
    alignItems: 'center',
    flex: 1,
    height: 8 * 12,
    backgroundColor: WHITE,
    justifyContent: 'center',
    borderRadius: 8
  },
  container: {
    paddingHorizontal: 8 * 2
  }
})

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 5,

  elevation: 3
}
