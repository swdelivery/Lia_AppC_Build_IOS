import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import ServiceItem from '@Screens/SoYoungService/components/ServiceItem'
import { useSelector } from 'react-redux'
import { getServiceListState } from '@Redux/service/selectors'
import useItemExtractor from 'src/Hooks/useItemExtractor'
import HorizontalServices from "@Components/HorizontalServices";
import HorizontalServicesV2 from '@Components/HorizontalServicesV2'
import { WHITE } from '@Constant/Color'

const RecomendServices = () => {
  const { data } = useSelector(getServiceListState)



  return (
    <Column >
      <Column
        margin={8 * 2}>
        <Text
          color={WHITE}
          size={16}
          weight='bold'>Dịch vụ chỉ định</Text>
      </Column>

      <HorizontalServicesV2
        dynamicWidth={150}
        containerStyle={{ backgroundColor: 'transparent' }}
        items={data} />

    </Column>
  )
}

export default RecomendServices

const styles = StyleSheet.create({})
