import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'
import Column from '@Components/Column'
import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY_FOR_TITLE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { getDetailExaminationResultState } from '@Redux/examinationResults/selectors'
import { Placeholder } from '@Screens/SoYoungService/components/ServiceItem'
import { ConfigDataCode } from '@typings/configData'
import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useConfigData from 'src/Hooks/useConfigData'

const WIDTH_ITEM = _width / 2

interface ListDataState {
  name: string;
  code: string;
}

const PatientInfo = () => {
  const { data } = useSelector(getDetailExaminationResultState)
  const [listData, setListData] = useState<ListDataState[]>([])
  const listConfigMedicalHistory = useConfigData(ConfigDataCode.MedicalHistory);
  const { medicalHistory } = data;

  useEffect(() => {
    if (!isEmpty(listConfigMedicalHistory?.value)) {
      let listTemp = listConfigMedicalHistory?.value?.map((item, index) => {
        return {
          ...item,
          isChoiced: medicalHistory?.find(code => code == item?.code)
        }
      })
      setListData(listTemp)
    }
  }, [listConfigMedicalHistory])

  const Patient = useCallback(({ isTicked, data }) => {
    return (
      <Column
        padding={8 * 2}
        paddingVertical={4}
        width={WIDTH_ITEM}>
        <Row alignItems='flex-start' gap={8}>
          {
            data?.isChoiced ?
              <Icon size={8 * 2} color={"#383838"} name='circle-slice-8' />
              :
              <Icon size={8 * 2} color={"#383838"} name='circle-outline' />
          }
          <Text style={[styleElement.flex, { top: -4 }]}>
            {data?.name}
          </Text>
        </Row>
      </Column>
    )
  }, [])

  return (
    <AfterTimeoutFragment placeholder={<Placeholder />}>
      <Column gap={8}>
        <Column marginHorizontal={8 * 2}>
          <Text
            size={16}
            color={GREY_FOR_TITLE}
            weight='bold'>
            Tiền sử bệnh án
          </Text>
        </Column>
        <Row alignItems='flex-start' flexWrap='wrap'>
          {
            listData?.map((item, index) => {
              return (
                <Patient data={item} isTicked={index > 3} key={index} />
              )
            })
          }
          <Column>
          </Column>
        </Row>
      </Column>
    </AfterTimeoutFragment>
  )
}
export default PatientInfo
