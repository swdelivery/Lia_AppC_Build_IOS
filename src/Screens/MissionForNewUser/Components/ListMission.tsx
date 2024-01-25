import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { IconTick } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'
import { BG_GREY_OPACITY_5, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { TouchableOpacity } from 'react-native'
import { getCurrentCollaborator } from '@Redux/Action/Affiilate'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import { isEmpty } from 'lodash'

const ListMission = () => {
  const { navigate } = useNavigate()

  useEffect(() => {
    _getCurrCollaborator()
  }, [])

  const _handleGoToAffiliate = useCallback(async () => {
    let result = await getCurrentCollaborator();
    if (!isEmpty(result?.data?.data) && result?.data?.data?.status !== "DENY") {
      navigate(ScreenKey.CURR_COLLAB_REQUEST)();
    } else {
      navigate(ScreenKey.NEW_VERIFICATION_CTV)();
    }
  }, []);

  const _getCurrCollaborator = useCallback(async () => {
    let result = await getCurrentCollaborator();
    // if (!isEmpty(result?.data?.data) && result?.data?.data?.status !== "DENY") {
    //   navigate(ScreenKey.CURR_COLLAB_REQUEST)();
    // } else {
    //   navigate(ScreenKey.NEW_VERIFICATION_CTV)();
    // }
  }, [])

  return (
    <Column
      gap={8 * 2}
      marginHorizontal={8 * 2}>
      <Row justifyContent='space-between'>
        <Text weight='bold'>
          1. Đăng ký tài khoản thành công
        </Text>
        <Row gap={4}>
          <Text weight='bold'>
            Đã duyệt
          </Text>
          <IconTick style={sizeIcon.md} />
        </Row>
      </Row>
      <Row justifyContent='space-between'>
        <Text weight='bold'>
          2. Đăng ký trở thành cộng tác viên của LiA
        </Text>
        <TouchableOpacity
          onPress={_handleGoToAffiliate}
          activeOpacity={.7}>
          <Column
            borderRadius={8 * 2}
            backgroundColor={GREY}
            paddingVertical={4}
            paddingHorizontal={8 * 2}>
            <Text
              weight='bold'
              color={WHITE}>
              Đợi duyệt
            </Text>
          </Column>
        </TouchableOpacity>
      </Row>
      <Row justifyContent='space-between'>
        <Text weight='bold'>
          3. Nạp 10 nghìn đồng vào ví LiA
        </Text>
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
      </Row>
    </Column>
  )
}

export default ListMission

const styles = StyleSheet.create({})
