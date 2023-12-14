import Column from '@Components/Column'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, RED } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import { Material } from '@typings/material'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const WIDTH_IMAGE_SERVICE = ((_width - 80) / 2) - 8 * 2

type Props = {
  data: Material
};

const ItemMaterial = ({ data }: Props) => {

  const {
    avatar,
    name,
    price,
  } = data

  return (
    <Column
      margin={4}
      width={WIDTH_IMAGE_SERVICE}>
      <Image
        style={{
          width: WIDTH_IMAGE_SERVICE,
          height: WIDTH_IMAGE_SERVICE * 9 / 16,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}
        avatar={avatar} />
      <Column
        padding={4}
        borderColor={BORDER_COLOR}
        borderTopWidth={0}
        borderBottomLeftRadius={8}
        borderBottomRightRadius={8}
        borderWidth={1}>
        <View style={styleElement.flex} />
        <Text
          size={12}
          numberOfLines={1}>
          {name}
        </Text>
        <Row>
          <Text size={12} weight="bold" color={RED} style={styleElement.flex}>
            {`${formatMonney(price, true)}`}
          </Text>
        </Row>
      </Column>

    </Column>
  )
}

export default ItemMaterial

const styles = StyleSheet.create({})
