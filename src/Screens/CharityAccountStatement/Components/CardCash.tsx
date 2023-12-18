import Column from '@Components/Column'
import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREEN_SUCCESS, NEW_BASE_COLOR, RED } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import React from 'react'
import { StyleSheet } from 'react-native'

type Props = {
  isCashIn?: boolean;
};

const CardCash = ({ isCashIn = false }: Props) => {
  return (
    <Column
      gap={8}
      padding={8 * 2}
      borderRadius={8}
      backgroundColor={"#F4F4F4"}>
      <Row gap={8}>
        <Text>
          {isCashIn ? 'Từ' : "Đến"}
        </Text>
        <Text numberOfLines={1} flex={1} weight='bold'>
          SACOMBANK CK TU SACOMBANK
        </Text>
        {
          isCashIn ?
            <Text
              color={GREEN_SUCCESS}
              weight='bold'>
              + 1.000.000
            </Text>
            :
            <Text
              color={RED}
              weight='bold'>
              - 1.000.000
            </Text>
        }

      </Row>
      <Row gap={8 * 2} alignItems='flex-end'>
        <Text style={styleElement.flex} size={12}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </Text>
        <Row gap={4}>
          <Text size={12}>
            9:36
          </Text>
          <Icon color={isCashIn ? NEW_BASE_COLOR : RED} name="note-text-outline" size={18} />
        </Row>
      </Row>
    </Column>
  )
}

export default CardCash

const styles = StyleSheet.create({})
