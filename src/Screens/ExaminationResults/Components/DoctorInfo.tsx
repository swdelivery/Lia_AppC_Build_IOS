import { StyleSheet, View } from 'react-native'
import React from 'react'
import Row from '@Components/Row'
import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Text from '@Components/Text'
import CountStar2 from '@Components/NewCountStar/CountStar'
import { LocationIcon } from 'src/SGV'
import { GREY, GREY_FOR_TITLE } from '@Constant/Color'

const DoctorInfo = () => {
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
        gap={8}
        marginHorizontal={8 * 2}>
        <Avatar
          circle
          size={8 * 6}
          avatar={null} />
        <Column>
          <Text weight='bold'>
            Trần Thị Hồng Diệu
          </Text>
          <CountStar2
            rating={4}
            count={29}
            size={12}
            countPartner={24}
          />
          <Row gap={4}>
            <LocationIcon />
            <Text size={12} color={GREY}>
              Trang Beauty Center
            </Text>
          </Row>
        </Column>
      </Row>
    </Column>

  )
}

export default DoctorInfo

const styles = StyleSheet.create({})
