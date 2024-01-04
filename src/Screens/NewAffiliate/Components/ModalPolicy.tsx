import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import { _heightScale } from '@Constant/Scale'
import Row from '@Components/Row'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Icon from '@Components/Icon'
import useConfigData from 'src/Hooks/useConfigData'
import { ConfigDataCode } from '@typings/configData'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import Spacer from '@Components/Spacer'


type Props = {
  visiblePolicy: any
}


const ModalPolicy = ({ visiblePolicy }: Props) => {
  const requestCloseModalRef = useRef<any>(null)

  const _handleCloseModal = useCallback(() => {
    if (requestCloseModalRef.current) {
      requestCloseModalRef.current.requestCloseModal()
    }
  }, [])

  const dataLevelPolicy = useConfigData(ConfigDataCode.LevelPolicy);

  return (
    <ModalBottom
      ref={requestCloseModalRef}
      borderBottomWidth={0}
      borderTopLeftRadius={8 * 2}
      borderTopRightRadius={8 * 2}
      onClose={visiblePolicy.hide}
      heightModal={_heightScale(700)}
      visible={visiblePolicy.visible} >

      <Column
        justifyContent='center'
        margin={8 * 2}
        alignItems='center'>
        <Text
          size={16}
          weight='bold'>
          Chính sách
        </Text>
        <Column
          right={8 * 2}
          position='absolute'>
          <TouchableOpacity
            onPress={_handleCloseModal}>
            <Icon name='close' />
          </TouchableOpacity>
        </Column>
      </Column>
      <Column
        marginHorizontal={8 * 2}>
        <ScrollView>
          {
            dataLevelPolicy?.value ?
              <RenderHTML data={dataLevelPolicy.value} />
              : <></>
          }
          <Spacer top={100} />
        </ScrollView>
      </Column>

    </ModalBottom>
  )
}

export default ModalPolicy

const styles = StyleSheet.create({})
