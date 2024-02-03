import Column from '@Components/Column'
import { IconTick } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import ScreenKey from '@Navigation/ScreenKey'
import { getMemberFirstMissionState } from '@Redux/memberFirstMission/selectors'
import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

const ListMission = () => {
  const { navigate } = useNavigate()
  const { data: memberFirstMission } = useSelector(getMemberFirstMissionState)

  const generateButton = useCallback((data, action) => {
    const _handleGoToMission = useCallback(() => {
      switch (action) {
        case "collaborators":
          return navigate(ScreenKey.NEW_VERIFICATION_CTV)()
        case "firstWalletCharge":
          return navigate(ScreenKey.RECHARGE_TO_WALLET)()
        default:
          break;
      }
    }, [])
    const _handleCheckMission = useCallback(() => {
      switch (action) {
        case "collaborators":
          return navigate(ScreenKey.CURR_COLLAB_REQUEST)()
        case "firstWalletCharge":
          return navigate(ScreenKey.PURCHASE_DEPOSIT_REQUEST, { numIndex: 1 })()
        default:
          break;
      }
    }, [])

    const _handleDoneMission = useCallback(() => {
      switch (action) {
        case "collaborators":
          return navigate(ScreenKey.CURR_COLLAB_REQUEST)()
        default:
          break;
      }
    }, [])

    switch (data) {
      case "UNFINISHED":
        return (
          <TouchableOpacity
            onPress={_handleGoToMission}
            activeOpacity={.7}>
            <Column
              borderRadius={8 * 2}
              backgroundColor={NEW_BASE_COLOR}
              paddingVertical={4}
              paddingHorizontal={8 * 2}>
              <Text
                weight='bold'
                color={WHITE}>
                Làm ngay
              </Text>
            </Column>
          </TouchableOpacity>
        )
      case "WAIT":
        return (
          <TouchableOpacity
            onPress={_handleCheckMission}
            activeOpacity={.7}>
            <Column
              borderRadius={8 * 2}
              backgroundColor={GREY}
              paddingVertical={4}
              paddingHorizontal={8 * 2}>
              <Text
                weight='bold'
                color={WHITE}>
                Chờ duyệt
              </Text>
            </Column>
          </TouchableOpacity>
        )
      case "FINISHED":
        return (
          <Row
            onPress={_handleDoneMission}
            gap={4}>
            <Text weight='bold'>
              Đã duyệt
            </Text>
            <IconTick style={sizeIcon.md} />
          </Row>
        )

      default:
        break;
    }
  }, [])

  return (
    <Column
      gap={8 * 2}
      marginHorizontal={8 * 2}>
      <Row justifyContent='space-between'>
        <Text weight='bold'>
          1. Đăng ký tài khoản thành công
        </Text>
        {
          generateButton(memberFirstMission?.register, 'register')
        }
      </Row>
      <Row justifyContent='space-between'>
        <Column>
          <Text weight='bold'>
            2. Trở thành cộng tác viên của LiA
          </Text>
          <TouchableOpacity onPress={navigate(ScreenKey.NEW_AFFILIATE)}>
            <Text left={8 * 2} color={NEW_BASE_COLOR}>
              ( Nhấn để tìm hiểu thêm )
            </Text>
          </TouchableOpacity>
        </Column>
        {
          generateButton(memberFirstMission?.collaborators, 'collaborators')
        }
      </Row>
      <Row justifyContent='space-between'>
        <Text weight='bold'>
          3. Nạp 10 nghìn đồng vào ví LiA
        </Text>
        {
          generateButton(memberFirstMission?.firstWalletCharge, 'firstWalletCharge')
        }
      </Row>
    </Column>
  )
}

export default ListMission

const styles = StyleSheet.create({})
