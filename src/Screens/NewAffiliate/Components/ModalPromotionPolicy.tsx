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
  visiblePromotionPolicy: any
}


const ModalPromotionPolicy = ({ visiblePromotionPolicy }: Props) => {
  const requestCloseModalRef = useRef<any>(null)

  const _handleCloseModal = useCallback(() => {
    if (requestCloseModalRef.current) {
      requestCloseModalRef.current.requestCloseModal()
    }
  }, [])

  return (
    <ModalBottom
      ref={requestCloseModalRef}
      borderBottomWidth={0}
      borderTopLeftRadius={8 * 2}
      borderTopRightRadius={8 * 2}
      onClose={visiblePromotionPolicy.hide}
      heightModal={_heightScale(500)}
      visible={visiblePromotionPolicy.visible} >

      <Column
        justifyContent='center'
        margin={8 * 2}
        alignItems='center'>
        <Text
          size={14}
          weight='bold'>
          {visiblePromotionPolicy?.selectedItem?.current?.title}
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
            visiblePromotionPolicy?.selectedItem?.current?.data ?
              <RenderHTML data={visiblePromotionPolicy?.selectedItem?.current?.data} />
              : <></>
          }
          <Spacer top={100} />
        </ScrollView>
      </Column>

    </ModalBottom>
  )
}

export default ModalPromotionPolicy

const styles = StyleSheet.create({})
