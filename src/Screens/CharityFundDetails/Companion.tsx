import ActionButton from "@Components/ActionButton/ActionButton"
import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BACKGROUND_COLOR, BORDER_COLOR, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { stylesFont } from '@Constant/Font'
import { formatMonney } from '@Constant/Utils'
import { getInfoUserReducer } from "@Redux/Selectors"
import { createVolunteerCompanion } from "@Redux/charity/actions"
import { getDetailCampainState, getListCompanionRequestState } from "@Redux/charity/selectors"
import { openModalThanks } from "@Redux/modal/actions"
import React, { useCallback, useMemo, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import useConfirmation from "src/Hooks/useConfirmation"

const Companion = () => {
  const dispatch = useDispatch()
  const [valueMoney, setValueMoney] = useState('')
  const { showConfirmation } = useConfirmation();
  const { data: {
    createBy,
    name,
    fundTarget,
    _id,
    avatar
  } } = useSelector(getDetailCampainState)
  const { data: listCompanionRequest } = useSelector(getListCompanionRequestState)
  const { infoUser } = useSelector(getInfoUserReducer);

  const _handleOnchangeText = (value) => {
    setValueMoney(value.split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }

  const _handleSetMoneyByPercent = useCallback((percent) => () => {
    let money = fundTarget * percent / 100;
    setValueMoney(money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }, [fundTarget])

  const _handleConfirm = useCallback(() => {
    const numberRegex = /^[1-9]\d*$/;
    let checkIsMoney = numberRegex.test(valueMoney?.split('.')?.join(''));
    if (!checkIsMoney) {
      return Alert.alert('Vui lòng nhập đúng định dạng tiền')
    } else {
      showConfirmation(
        "Xác nhận",
        `Xác nhận đồng hành cùng dự án?`,
        async () => {
          dispatch(createVolunteerCompanion.request({
            "volunteerId": _id,
            "targetDeposit": Number(valueMoney?.split('.')?.join(''))
          }))
          dispatch(openModalThanks({
            visible: true,
            data: {
              type: 'companion',
              name: infoUser?.name,
              campainName: name,
              ownerName: createBy
            }
          }))
        }
      );
    }
  }, [valueMoney, _id])

  const hasRequested = useMemo(() => {
    return listCompanionRequest?.find(item => item?.volunteerId == _id)
  }, [_id, listCompanionRequest])

  return (
    <Screen
      safeBottom
      backgroundColor={BACKGROUND_COLOR}>
      <FocusAwareStatusBar barStyle='light-content' />
      <LiAHeader
        safeTop
        bg={NEW_BASE_COLOR}
        title='Đăng kí đồng hành gây quỹ' />
      <ScrollView>
        <Column
          gap={8 * 2}
          alignItems='center'>
          <Column
            marginTop={8 * 2}
            alignSelf='center'>
            <Text
              weight='bold'>
              Đồng hành cùng
            </Text>
          </Column>

          <Avatar
            circle
            size={8 * 8}
            avatar={avatar} />

          <Text
            color={NEW_BASE_COLOR}
            weight='bold'>
            {createBy.toUpperCase()}
          </Text>

          <Column
            gap={4}
            marginHorizontal={8 * 2}
            alignItems='center'>
            <Text fontStyle='italic'>
              Trong chiến dịch
            </Text>

            <Text
              weight='bold'
              style={{ textAlign: 'center' }}>
              "{name}"
            </Text>

            <Row gap={4}>
              <Text>
                Với mục tiêu
              </Text>
              <Text weight='bold' color={NEW_BASE_COLOR}>
                {formatMonney(fundTarget)} VND
              </Text>
            </Row>
          </Column>
        </Column>

        {
          hasRequested ?
            <Column
              gap={8}
              margin={8 * 4}>
              <Text fontStyle="italic" style={{ textAlign: 'center' }}>
                Chân thành cảm ơn sự đồng hành của bạn cho chiến dịch gây quỹ. Đơn đăng ký của bạn đã được nhận và
                <Text weight="bold">
                  {` đang được chúng tôi tiến hành xử lý.`}
                </Text>
              </Text>
              <Text fontStyle="italic" style={{ textAlign: 'center' }}>
                Xin vui lòng kiên nhẫn chờ đợi, chúng tôi sẽ nhanh chóng xem xét và thông báo kết quả đến bạn!
              </Text>
              <Text fontStyle="italic" style={{ textAlign: 'center' }}>
                Cảm ơn bạn rất nhiều vì sự ủng hộ.
              </Text>
            </Column>
            :
            <Column
              gap={8}
              marginTop={8 * 2}
              paddingHorizontal={8 * 2}>
              <Text weight='bold'>
                Mục tiêu kêu gọi đồng hành
              </Text>
              <Text color={GREY}>
                Nhập số tiền kêu gọi đồng hành
              </Text>

              <Column
                justifyContent='center'>
                <TextInput
                  value={valueMoney}
                  onChangeText={_handleOnchangeText}
                  keyboardType='number-pad'
                  style={[styles.textInput, stylesFont.fontNolanBold]}
                  placeholder='0' />
                <Text
                  color={GREY}
                  weight='bold'
                  style={styles.absoluteText}>
                  VND
                </Text>
              </Column>

              <Row gap={8}>
                <TouchableOpacity
                  onPress={_handleSetMoneyByPercent(5)}
                  style={styles.btnPercent}>
                  <Text weight='bold'>
                    5%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={_handleSetMoneyByPercent(10)}
                  style={styles.btnPercent}>
                  <Text weight='bold'>
                    10%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={_handleSetMoneyByPercent(15)}
                  style={styles.btnPercent}>
                  <Text weight='bold'>
                    15%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={_handleSetMoneyByPercent(20)}
                  style={styles.btnPercent}>
                  <Text weight='bold'>
                    20%
                  </Text>
                </TouchableOpacity>
              </Row>
            </Column>


        }


      </ScrollView>
      {
        hasRequested ?
          <></>
          :
          <ActionButton
            colors={["#34759b", "#1a3e67"]}
            onPress={_handleConfirm}
            title="Đăng ký"
          />
      }

    </Screen>
  )
}

export default Companion

const styles = StyleSheet.create({
  btnPercent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: WHITE
  },
  absoluteText: {
    position: 'absolute',
    right: 8 * 2
  },
  textInput: {
    padding: 0,
    paddingHorizontal: 8 * 2,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    color: NEW_BASE_COLOR,
    fontSize: 16,
    paddingRight: 8 * 3,
    backgroundColor: WHITE
  }
})
