import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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
import { styleElement } from '@Constant/StyleElement'
import { RED, WHITE } from '@Constant/Color'


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
      borderTopLeftRadius={8 * 3}
      borderTopRightRadius={8 * 3}
      overflow='hidden'
      onClose={visiblePromotionPolicy.hide}
      heightModal={_heightScale(500)}
      visible={visiblePromotionPolicy.visible} >
      <ImageBackground
        imageStyle={{ resizeMode: 'stretch' }}
        style={{
          width: '100%',
          height: _heightScale(500)
        }}
        source={require('../../../NewImage/Affiliate/bgPolicy.png')}>
        <Column
          justifyContent='center'
          margin={8 * 2}
          alignItems='center'>
          <Text
            size={14}
            color={WHITE}
            weight='bold'>
            {visiblePromotionPolicy?.selectedItem?.current?.title?.toUpperCase()}
          </Text>
          <Column
            right={8 * 2}
            position='absolute'>
            <TouchableOpacity
              onPress={_handleCloseModal}>
              <Icon color={WHITE} name='close' />
            </TouchableOpacity>
          </Column>
        </Column>
        <Column
          flex={1}
          marginHorizontal={8 * 2}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {
              visiblePromotionPolicy?.selectedItem?.current?.data ?
                <RenderHTML data={visiblePromotionPolicy?.selectedItem?.current?.data} />
                : <></>
            }
            <Spacer top={100} />
          </ScrollView>
        </Column>
      </ImageBackground>
    </ModalBottom>
  )
}

export default ModalPromotionPolicy

const styles = StyleSheet.create({})
