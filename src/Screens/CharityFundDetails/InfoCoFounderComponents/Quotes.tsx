import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { BORDER_COLOR, GREY, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import Icon from '@Components/Icon'

const Quotes = () => {
  return (
    <Column>
      <Column
        gap={4}
        marginHorizontal={8 * 6}>
        <Text size={12}>
          Đồng hành cùng NGUYEN HOANG ANH ủng hộ cho chiến dịch
        </Text>
        <Text
          style={{ textAlign: 'center' }}
          weight='bold'
          color={GREY}
          size={12}>
          "Chiến dịch thiện nguyện mang nhà vệ sinh đến trẻ em mầm non vùng cao"
        </Text>
      </Column>

      <Row
        gap={8 * 2}
        marginHorizontal={8 * 8}
        margin={8 * 2}>
        <Column
          backgroundColor={BORDER_COLOR}
          height={1}
          flex={1} />
        <Column
          width={8 * 3}
          height={8 * 3}
          borderRadius={8 * 3}
          backgroundColor={GREY}
          style={styleElement.centerChild}>
          <Icon name="format-quote-close" color={WHITE} size={18} />
        </Column>
        <Column
          backgroundColor={BORDER_COLOR}
          height={1}
          flex={1} />
      </Row>
    </Column>
  )
}

export default Quotes

const styles = StyleSheet.create({})
