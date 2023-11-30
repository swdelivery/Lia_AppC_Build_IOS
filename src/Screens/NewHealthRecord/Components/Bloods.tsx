import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import { BASE_COLOR, BLACK, WHITE } from '@Constant/Color'
import Column from '@Components/Column'
import TitleIcon from './TitleIcon'
import { IconBlood } from '@Components/Icon/Icon'

const Bloods = ({ bloodGroup, setBloodGroup }) => {

  const [bloods, setBloods] = useState([
    { value: 'A+' },
    { value: 'A-' },
    { value: 'B+' },
    { value: 'B-' },
    { value: 'AB+' },
    { value: 'AB-' },
    { value: 'O+' },
    { value: 'O-' },
  ])

  // const [selected, setSelected] = useState(null)

  return (
    <Column
      gap={8 * 2}
      marginHorizontal={8 * 2}>
      <TitleIcon
        title={'Nhóm máu'}
        icon={<IconBlood width={8 * 3} height={8 * 3} />} />
      <Row
        gap={8}>
        {
          bloods?.map((item, index) => {
            return (
              <ItemBlood
                onSelect={() => setBloodGroup(item.value)}
                isSelected={bloodGroup == item.value}
                data={item}
                key={index} />
            )
          })
        }
      </Row>
    </Column>
  )
}

export default Bloods

const ItemBlood = ({ data, onSelect, isSelected }) => {
  const { value } = data

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.itemBlood, isSelected && styles.selected]} >
      <Text
        weight={isSelected ? 'bold' : 'regular'}
        color={isSelected ? WHITE : BLACK}>
        {value}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: BASE_COLOR
  },
  itemBlood: {
    height: 8 * 5,
    borderWidth: 0.5,
    borderColor: BASE_COLOR,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: WHITE
  }
})
