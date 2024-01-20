import Column from '@Components/Column'
import HorizontalServicesV2 from '@Components/HorizontalServicesV2'
import Text from '@Components/Text'
import { WHITE } from '@Constant/Color'
import { getDetailExaminationResultState } from '@Redux/examinationResults/selectors'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const RecomendServices = () => {
  const { data: {
    order
  } } = useSelector(getDetailExaminationResultState)

  const listServices = useMemo(() => {
    return order?.services?.map(item => item?.service)
  }, [order])

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
        items={listServices} />
    </Column>
  )
}
export default RecomendServices
