import Column from '@Components/Column'
import Icon from "@Components/Icon"
import { IconTrashRed } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BG_BEAUTY, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const ListSuggestKey = () => {
  const [listKeyHistory, setListKeyHistory] = useState([
    'Mang nhà vệ sinh đến trẻ em vùng cao',
    'Ta thêm lòng tiếp sức để bớt cuộc chia ly',
    'Gấp đôi yêu thương',
  ])

  return (
    <Column>

      <Column
        gap={8}
        paddingHorizontal={8 * 4}
        padding={8 * 2}>

        <TouchableOpacity>
          <Row alignItems='flex-start' gap={8}>
            <Column style={styles.tag}>
              <Text
                weight='bold'
                color={WHITE}
                size={12}>
                HOT
              </Text>
            </Column>
            <Text style={styleElement.flex}>HiGreen - Bình minh</Text>
          </Row>
        </TouchableOpacity>

        <TouchableOpacity>
          <Row alignItems='flex-start' gap={8}>
            <Column style={styles.tag}>
              <Row>
                <Icon name={'heart'} color={WHITE} size={10} />
                <Icon name={'heart'} color={WHITE} size={10} />
                <Icon name={'heart'} color={WHITE} size={10} />
              </Row>
            </Column>
            <Text style={styleElement.flex}>Như chưa hề có cuộc chia ly</Text>
          </Row>
        </TouchableOpacity>
      </Column>
      <Column gap={8}>
        <Row
          justifyContent='space-between'
          paddingHorizontal={8 * 2}>
          <Text>
            Lịch sử tìm kiếm
          </Text>
          <TouchableOpacity hitSlop={styleElement.hitslopSm}>
            <IconTrashRed />
          </TouchableOpacity>
        </Row>
        <Row
          gap={8}
          paddingHorizontal={8 * 2}
          flexWrap='wrap'>
          {
            listKeyHistory?.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.btnKeyHistory}>
                  <Text
                    size={12}
                    color={GREY}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </Row>
      </Column>

    </Column>
  )
}

export default ListSuggestKey

const styles = StyleSheet.create({
  btnKeyHistory: {
    paddingHorizontal: 8 * 2,
    paddingVertical: 4,
    backgroundColor: BG_BEAUTY,
    borderRadius: 8
  },
  tag: {
    width: 8 * 6,
    backgroundColor: NEW_BASE_COLOR,
    height: 8 * 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  }
})
