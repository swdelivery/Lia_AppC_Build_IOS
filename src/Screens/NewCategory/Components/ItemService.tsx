import Column from '@Components/Column'
import Icon from "@Components/Icon"
import Image from '@Components/Image'
import CountStar2 from '@Components/NewCountStar/CountStar'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, RED } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import { Service } from '@typings/serviceGroup'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const WIDTH_IMAGE_SERVICE = ((_width - 80) / 2) - 8 * 2

type Props = {
  data: Service
};

const ItemService = ({ data }: Props) => {

  const {
    avatar,
    name,
    averageRating,
    reviewCount,
    price,
    countPartner
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
          numberOfLines={2}>
          {name}
        </Text>
        <CountStar2
          rating={averageRating}
          count={reviewCount}
          size={10} />
        <Row>
          <Text size={12} weight="bold" color={RED} style={styleElement.flex}>
            {`${formatMonney(price, true)}`}
          </Text>
          <Icon name="account-multiple" size={14} color={GREY} />
          <Text
            size={10}
            bottom={2}
            left={2}
          >{`(${countPartner})`}</Text>
        </Row>
      </Column>

    </Column>
  )
}

export default ItemService

const styles = StyleSheet.create({})
