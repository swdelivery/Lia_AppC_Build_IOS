import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import CountStar2 from '@Components/NewCountStar/CountStar'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY, GREY_FOR_TITLE } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { getDetailExaminationResultState } from '@Redux/examinationResults/selectors'
import { isEmpty } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'
import { LocationIcon } from 'src/SGV'

const DoctorInfo = () => {
  const { navigate } = useNavigate()
  const { data: {
    consultationJoinDoctor,
    consultationJoinPractitioner,
    consultationJoinDoctorCode
  } } = useSelector(getDetailExaminationResultState)

  const consultationInfo = useMemo(() => {
    return !isEmpty(consultationJoinDoctorCode) ? consultationJoinDoctor : consultationJoinPractitioner
  }, [
    consultationJoinDoctor,
    consultationJoinPractitioner,
    consultationJoinDoctorCode
  ])

  const _handleGoToDetail = useCallback(() => {
    if (!isEmpty(consultationJoinDoctorCode)) {
      navigate(ScreenKey.DETAIL_DOCTOR, { doctor: consultationInfo })()
    } else {
      navigate(ScreenKey.DETAIL_PRACTITIONER, { practitioner: consultationInfo })()
    }
  }, [
    consultationJoinDoctorCode,
    consultationInfo
  ])

  return (
    <Column gap={8 * 2}>
      <Column marginHorizontal={8 * 2}>
        <Text
          size={16}
          color={GREY_FOR_TITLE}
          weight='bold'>
          Bác sĩ/ chuyên gia thăm khám
        </Text>
      </Column>
      <Row
        onPress={_handleGoToDetail}
        gap={8}
        marginHorizontal={8 * 2}>
        <Avatar
          circle
          size={8 * 6}
          avatar={consultationInfo?.avatar} />
        <Column>
          <Text weight='bold'>
            {consultationInfo?.name}
          </Text>
          <CountStar2
            rating={consultationInfo?.averageRating}
            count={consultationInfo?.reviewCount}
            size={12}
            countPartner={consultationInfo?.countPartner}
          />
          <Row gap={4}>
            <LocationIcon />
            <Text size={12} color={GREY}>
              {consultationInfo?.workPlace}
            </Text>
          </Row>
        </Column>
      </Row>
    </Column>

  )
}
export default DoctorInfo
