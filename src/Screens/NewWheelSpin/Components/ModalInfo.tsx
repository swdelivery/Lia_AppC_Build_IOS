import Column from '@Components/Column'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, WHITE } from '@Constant/Color'
import { _heightScale, _widthScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { getHistorySpin } from '@Redux/Action/SpinWheelAction'
import { getCurrActiveWheelSpinState } from '@Redux/wheelSpin/selectors'
import { ConfigDataCode } from '@typings/configData'
import { first } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import useConfigData from 'src/Hooks/useConfigData'

type Props = {
  visibleModalInfo: any
}

const ModalInfo = ({ visibleModalInfo }: Props) => {
  const { data: currActiveWheel } = useSelector(getCurrActiveWheelSpinState)
  const wheelRule = useConfigData(ConfigDataCode.WheelRule);

  return (
    <ModalBottom
      borderWidth={2}
      borderBottomWidth={0}
      borderColor={"#D20002"}
      borderTopLeftRadius={8 * 2}
      borderTopRightRadius={8 * 2}
      onClose={visibleModalInfo.hide}
      heightModal={_heightScale(600)}
      visible={visibleModalInfo.visible} >
      <Column
        backgroundColor={'#D20002'}
        width={8 * 20}
        height={8 * 4}
        borderRadius={8 * 2}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        style={styleElement.centerChild}
        position='absolute'
        alignSelf='center'
        top={-8 * 4}>
        <Text
          color={WHITE}
          weight='bold'>
          GIỚI THIỆU
        </Text>
      </Column>
      <Column
        marginTop={8}
        flex={1}
        alignSelf='center'
        width={_widthScale(340)}>
        <ScrollView>
          {
            currActiveWheel?.description && <RenderHTML data={currActiveWheel?.description} />
          }
        </ScrollView>
      </Column>


    </ModalBottom>
  )
}

export default ModalInfo

const styles = StyleSheet.create({
  avatarReward: {
    width: 8 * 8,
    height: 8 * 8
  }
})
