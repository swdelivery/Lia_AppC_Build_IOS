import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { BORDER_COLOR, WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import { IconArrowDown, IconCheckList, IconRightArrowBase } from '@Components/Icon/Icon'
import { getHealthRecord } from '@Redux/Action/ProfileAction'
import { healthRecord } from '@Constant/healthRecord';
import Checkbox from '@Components/Checkbox'
import SquareTick from '@Components/SquareTick/SquareTick'
import { getConfigData } from '@Redux/Action/OrtherAction'

const CheckList = ({ anamnesis, setAnamnesis }) => {

  const [data, setData] = useState([])

  useEffect(() => {
    _getDataConfig()
  }, [])
  const _getDataConfig = async () => {
    var result = await getConfigData("TSBSK");
    if (result?.isAxiosError) return
    setData(result?.value)
  }

  const _handleChoice = (item) => {
    let arrayTemp = [...anamnesis]
    const index = arrayTemp.indexOf(item);
    if (index !== -1) {
      arrayTemp.splice(index, 1);
    } else {
      arrayTemp.push(item);
    }
    setAnamnesis(arrayTemp)
  }

  const EachItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => _handleChoice(item)}>
        <Row
          gap={8 * 2}
          borderTopWidth={0.5}
          borderTopColor={BORDER_COLOR}
          marginHorizontal={8 * 2}
          paddingVertical={8 * 2}>
          <SquareTick isTicked={anamnesis.find(itemFind => itemFind == item)} />
          <Text>
            {item}
          </Text>
        </Row>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Column
        padding={8 * 2}
        backgroundColor={WHITE}
        borderRadius={4}
        marginHorizontal={8 * 2}>
        <Row gap={8 * 2}>
          <IconCheckList />
          <Text flex={1} weight='bold'>
            Tiền sử bệnh
          </Text>
          <View style={{ transform: [{ rotate: '90deg' }] }}>
            <IconRightArrowBase />
          </View>
        </Row>
      </Column >
      <Column
        backgroundColor={WHITE}
        borderRadius={4}
        marginHorizontal={8 * 2}>
        {
          data?.map((item, index) => {
            return (
              <EachItem item={item} index={index} />
            )
          })
        }
      </Column>
    </View>
  )
}

export default CheckList

const styles = StyleSheet.create({})
