import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import useConfigData from 'src/Hooks/useConfigData'
import { ConfigDataCode } from '@typings/configData'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import { _width } from '@Constant/Scale'
import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'
import Placeholder from '@Screens/NewDetailService/Components/Placeholder'

const Info = () => {
  const data = useConfigData(ConfigDataCode.PolicyMissionNewUser);

  return (
    <AfterTimeoutFragment placeholder={<Placeholder />}>
      <Column
        marginHorizontal={8 * 2}
        gap={8}>
        <RenderHTML contentWidth={_width - (8 * 4)} data={data?.value} />
      </Column>
    </AfterTimeoutFragment>
  )
}

export default Info

const styles = StyleSheet.create({})
