import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import { BORDER_COLOR, BRONZE, WHITE } from '@Constant/Color'
import { IconRightArrow, IconRightWhite } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import { sizeIcon } from '@Constant/Icon'


type Props = {
  name: string,
  bgColor: string
};

const BtnLevelCode = ({ name, bgColor }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.btnLevelCode, { backgroundColor: bgColor }]}>
      <Row gap={8}>
        <Text size={12} weight='bold' color={WHITE}>
          {name}
        </Text>
        <IconRightWhite style={sizeIcon.xxs} />
      </Row>
    </TouchableOpacity>
  )
}

export default BtnLevelCode

const styles = StyleSheet.create({
  btnLevelCode: {
    paddingHorizontal: 8 * 2,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
    paddingRight: 4
  },
})
