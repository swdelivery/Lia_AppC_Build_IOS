import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { IconTall, IconWeight } from '@Components/Icon/Icon'
import { WHITE } from '@Constant/Color'
import HorizontalLine from '@Components/Line/HorizontalLine'

const TallWeight = ({ height, weight, heightPicker, weightPicker }) => {
  return (
    <Column
      marginHorizontal={8 * 2}>
      <TouchableOpacity
        onPress={heightPicker.show}>
        <Row
          backgroundColor={WHITE}
          borderRadius={4}
          padding={8 * 2}
          gap={8 * 2}>
          <IconTall width={8 * 3} height={8 * 3} />
          {
            height ?
              <Text>
                {height} cm
              </Text>
              :
              <Text>
                Chiều cao
              </Text>
          }

        </Row>
      </TouchableOpacity>
      <HorizontalLine style={{ height: .5 }} />
      <TouchableOpacity
        onPress={weightPicker.show}>
        <Row
          backgroundColor={WHITE}
          borderRadius={4}
          padding={8 * 2}
          gap={8 * 2}>
          <IconWeight />
          {
            weight ?
              <Text>
                {weight} kg
              </Text>
              :
              <Text>
                Cân nặng
              </Text>
          }
        </Row>
      </TouchableOpacity>
    </Column>
  )
}

export default TallWeight

const styles = StyleSheet.create({})
