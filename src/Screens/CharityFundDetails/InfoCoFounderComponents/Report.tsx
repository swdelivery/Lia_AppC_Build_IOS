import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import { getListPartnerDonateToVolunteerCompanionState } from '@Redux/charity/selectors'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const Report = ({ data }) => {

  const {
    data: listPartnerDonateToVolunteerCompanion,
    meta
  } = useSelector(getListPartnerDonateToVolunteerCompanionState)

  return (
    <Column gap={8 * 2}>
      <Row
        gap={8 * 2}
        paddingHorizontal={8 * 2}>
        <Column
          gap={8}
          paddingVertical={8 * 2}
          borderRadius={8 * 2}
          backgroundColor={NEW_BASE_COLOR}
          style={styleElement.centerChild}
          flex={1}>
          <Text weight='bold' color={WHITE}>
            Mục tiêu đồng hành
          </Text>
          <Text weight='bold' color={WHITE}>
            {formatMonney(data?.targetDeposit, true)}
          </Text>
        </Column>

        <Column
          gap={8}
          paddingVertical={8 * 2}
          borderRadius={8 * 2}
          borderWidth={1}
          borderColor={NEW_BASE_COLOR}
          style={styleElement.centerChild}
          flex={1}>
          <Text weight='bold' color={NEW_BASE_COLOR}>
            Số tiền đã đạt
          </Text>
          <Text weight='bold' color={NEW_BASE_COLOR}>
            {formatMonney(data?.currentDeposit, true)}
          </Text>
        </Column>
      </Row>

      <Column
        gap={8}
        margin={8 * 2}>
        <Row gap={8}>
          {
            listPartnerDonateToVolunteerCompanion?.map((item, index) => {
              return (
                <Avatar
                  key={item?._id}
                  circle
                  size={8 * 5}
                  avatar={item?.partnerInfo?.fileAvatar} />
              )
            })
          }
        </Row>
        <Text size={12}>
          {meta?.totalDocuments} Người đã ủng hộ
        </Text>
      </Column>

    </Column>
  )
}

export default Report

const styles = StyleSheet.create({})
