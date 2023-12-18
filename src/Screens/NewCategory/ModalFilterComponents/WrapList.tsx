import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BLACK, BORDER_COLOR, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import useHapticCallback from 'src/Hooks/useHapticCallback'


type Props = {
  title: string;
  data: any;
  onSelected: (item) => void;
  selected?: any;
};


const WrapList = ({ title, data, onSelected, selected }: Props) => {


  const ItemTag = ({ item }) => {
    const _handleSelect = useHapticCallback(() => {
      onSelected(item)
    }, [])

    const isSelected = useMemo(() => {
      return selected && !!selected.find(itemFind => itemFind?.code == item?.code);
    }, [selected, item])

    return (
      <TouchableOpacity
        onPress={_handleSelect}>
        <Column
          paddingVertical={4}
          paddingHorizontal={8}
          borderWidth={1}
          borderColor={isSelected ? NEW_BASE_COLOR : BORDER_COLOR}
          backgroundColor={isSelected ? NEW_BASE_COLOR : null}
          borderRadius={8}>
          <Text
            color={isSelected ? WHITE : BLACK}
            size={12}>
            {item?.name}
          </Text>
        </Column>
      </TouchableOpacity>
    )
  }

  return (
    <Column padding={8 * 2}>
      <Text
        weight='bold'>{title}</Text>
      <Row
        marginTop={8}
        gap={8}
        flexWrap='wrap'>
        {
          data?.map((item, index) => {
            return (
              <ItemTag item={item} key={index} />
            )
          })
        }
      </Row>
    </Column>
  )
}

export default WrapList

const styles = StyleSheet.create({})
