import Column from '@Components/Column'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { WHITE } from '@Constant/Color'
import { getDetailExaminationResultState } from '@Redux/examinationResults/selectors'
import { first } from 'lodash'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const BannerInfo = () => {
  const { data } = useSelector(getDetailExaminationResultState)

  const {
    partner,
    servicesNeedCare
  } = data

  const genderPartner = useMemo(() => {
    return partner?.gender == 'female' ? 'NỮ' : "NAM"
  }, [partner])

  const generateListServiceName = useMemo(() => {
    return servicesNeedCare?.map((item, index) => {
      if (index !== servicesNeedCare?.length - 1) {
        return `${item?.name}, `
      } else {
        return `${item?.name}.`
      }
    })
  }, [servicesNeedCare])

  return (
    <Column
      gap={8}
      borderRadius={8 * 3}
      padding={8 * 2}
      paddingHorizontal={8 * 3}
      margin={8 * 2}
      backgroundColor={WHITE}>
      <Row>
        <Column flex={3.5}>
          <Text numberOfLines={1} >
            HỌ VÀ TÊN: <Text weight='bold'>{partner?.name?.toUpperCase()}</Text>
          </Text>
        </Column>
        <Column flex={2.5}>
          <Text>
            GIỚI TÍNH: <Text weight='bold'>{genderPartner}</Text>
          </Text>
        </Column>
      </Row>
      <Row>
        <Column flex={3.5}>
          <Text>
            SĐT: <Text weight='bold'>{first(partner?.phone)?.fullPhoneNumber}</Text>
          </Text>
        </Column>
        <Column flex={2.5}>
          <Text>
            CCCD: <Text weight='bold'>{partner?.idCard?.idNumber ?? "Chưa có"}</Text>
          </Text>
        </Column>
      </Row>
      <Column>
        <Text>
          ĐỊA CHỈ: <Text weight='bold'>{first(partner?.address)?.fullAddress ?? "Chưa có thông tin địa chỉ"}</Text>
        </Text>
      </Column>
      <HorizontalLine />
      <Column>
        <Text>
          DỊCH VỤ MONG MUỐN: <Text weight='bold'>{generateListServiceName}</Text>
        </Text>
      </Column>
    </Column>
  )
}

export default BannerInfo
