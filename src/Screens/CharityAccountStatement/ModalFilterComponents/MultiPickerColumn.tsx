import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import Column from '@Components/Column'
import Text from '@Components/Text'
import Row from '@Components/Row';
import SquareTick from '@Components/SquareTick/SquareTick';

// NOTICE To update type any
type Props = {
  title: string;
  data: any;
  onChange: (data) => void;
  choiced: any
};

const MultiPickerColumn = ({ title, data, onChange, choiced }: Props) => {

  const Item = useCallback(({ item }) => {

    const _handleOnchange = useCallback(() => {
      onChange(item)
    }, [data])

    const isSelected = useMemo(() => {
      return choiced && !!choiced.find(itemFind => itemFind?.code == item?.code);
    }, [choiced, item])

    return (
      <TouchableOpacity onPress={_handleOnchange}>
        <Row gap={8 * 2}>
          <SquareTick isTicked={isSelected} />
          <Text>
            {item?.name}
          </Text>
        </Row>
      </TouchableOpacity>
    )
  }, [data, choiced])

  return (
    <Column
      marginTop={8 * 2}
      paddingHorizontal={8 * 2}>
      <Text
        weight='bold'>
        {title}
      </Text>
      <Column
        marginTop={8}
        gap={8}>
        {
          data?.map((item, index) => {
            return <Item item={item} key={index} />
          })
        }
      </Column>
    </Column>
  )
}

export default MultiPickerColumn

const styles = StyleSheet.create({})
