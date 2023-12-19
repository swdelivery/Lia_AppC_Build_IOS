import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import CircleTick from '@Components/CircleTick/CircleTick'
import { NEW_BASE_COLOR } from '@Constant/Color'

const TypeDonate = () => {
  const [type, setType] = useState(null)

  const _handleSetType = useCallback((data) => () => {
    setType(data)
  }, [type])

  return (
    <Column
      gap={8 * 2}
      marginTop={8 * 4}
      margin={8 * 2}>
      <Text>Hình thức ủng hộ</Text>

      <TouchableOpacity onPress={_handleSetType('transfer')}>
        <Row gap={8}>
          <CircleTick isTicked={type == "transfer"} color={NEW_BASE_COLOR} />
          <Text>
            Chuyển khoản
          </Text>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={_handleSetType('wallet')}>
        <Row gap={8}>
          <CircleTick isTicked={type == "wallet"} color={NEW_BASE_COLOR} />
          <Text>
            Ví LiA
          </Text>
        </Row>
      </TouchableOpacity>
    </Column>
  )
}

export default TypeDonate

const styles = StyleSheet.create({})
