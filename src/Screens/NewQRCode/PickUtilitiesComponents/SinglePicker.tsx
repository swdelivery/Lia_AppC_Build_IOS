import Column from '@Components/Column'
import Row from '@Components/Row'
import SquareTick from '@Components/SquareTick/SquareTick'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const WIDTH_ITEM = (_width - 8 * 8 - 8 * 4) / 2

type Props = {
  data: any;
  onChoice: (data) => void;
  idx: number
}

const SinglePicker = ({ data, onChoice, idx }: Props) => {
  const { value, name } = data

  const _handleChoice = useCallback((item) => () => {
    onChoice({
      code: data?.code,
      data: item
    })
  }, [data])

  return (
    <Column>
      <Text
        size={16}
        weight='bold'
        color={NEW_BASE_COLOR}>{idx}/ {name}</Text>
      <Row
        paddingHorizontal={8 * 2}
        flexWrap='wrap'>
        {
          value?.map((_i, idx) => {
            return (
              <TouchableOpacity onPress={_handleChoice(_i)}>
                <Row
                  paddingRight={8 * 2}
                  marginTop={8}
                  gap={4}
                  minWidth={WIDTH_ITEM}>
                  <SquareTick isTicked={_i?.isChoice} />
                  <Text
                    weight={_i?.isChoice ? 'bold' : 'regular'}
                    color={NEW_BASE_COLOR}>
                    {_i?.name}
                  </Text>
                </Row>
              </TouchableOpacity>
            )
          })
        }

      </Row>
    </Column>
  )
}

export default SinglePicker

const styles = StyleSheet.create({})
