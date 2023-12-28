import Column from '@Components/Column'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, WHITE } from '@Constant/Color'
import { _heightScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import { getHistorySpin, getListMissions, takeAward } from '@Redux/Action/SpinWheelAction'
import { getPartnerWheelTurn } from '@Redux/wheelSpin/actions'
import { getCurrActiveWheelSpinState } from '@Redux/wheelSpin/selectors'
import { first } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { navigation } from 'rootNavigation'

type Props = {
  visibleListMission: any
}

const ModalMissions = ({ visibleListMission }: Props) => {
  const dispatch = useDispatch()
  const { data: currActiveWheel } = useSelector(getCurrActiveWheelSpinState)
  const [listMissions, setListMissions] = useState([]);

  useEffect(() => {
    _getListMissions()
  }, [visibleListMission])

  const _getListMissions = async () => {
    let result = await getListMissions();
    if (result?.isAxiosError) return;

    let resultTemp = result?.data?.map((item, index) => {
      return {
        ...item,
        bonusEvent: {
          ...item?.bonusEvent,
          awards: item?.bonusEvent?.awards?.filter(
            (item) => item?.code == "WHEEL_TURN"
          ),
        },
      };
    });
    setListMissions(resultTemp);
  };

  const ItemMission = useCallback(({ data }) => {
    const { name } = data?.bonusEvent
    const { recievedAmt, usage } = data

    const _handleTakeAward = useCallback(async () => {
      let dataFetch = {
        bonusEventCode: data?.bonusEventCode,
        wheelCode: currActiveWheel?.code,
      };
      let result = await takeAward(dataFetch);
      if (result?.isAxiosError) return;
      Alert.alert("Nhận thưởng thành công!");
      _getListMissions();
      dispatch(getPartnerWheelTurn.request())

    }, [data])

    const _handleActionMission = useCallback(() => {
      console.log({ data });
      switch (data?.bonusEventCode) {
        case "REGISTER":
          return;
        case "COMPLETE_VIDEO_CALL":
          return;
        case "COMPLETE_DAILY_DIARY":
          return navigation.navigate(ScreenKey.LIST_PARTNER_DIARY);
        case "TREATMENT":
          return Alert.alert(
            "Thông báo",
            `Phần thưởng sẽ được nhận khi bạn đến thăm khám và điều trị, bạn có muốn đặt hẹn ngay?`,
            [
              {
                text: "Huỷ",
                onPress: () => console.log("Cancel Pressed"),
              },
              {
                text: "Đồng ý",
                onPress: async () => {
                  navigation.navigate(ScreenKey.CREATE_BOOKING);
                },
              },
            ]
          );
        case "LOGIN_EVERY_DAY":
          return Alert.alert(
            "Nhận phần thưởng khi bạn đăng nhập vào App mỗi ngày"
          );
        case "COMPLETE_HEALTH_RECORD":
          return navigation.navigate(ScreenKey.HEALTH_RECORD);
        case "BOOKING_CONSULTATION":
          return Alert.alert(
            "Thông báo",
            `Phần thưởng sẽ được nhận khi bạn đến thăm khám và tư vấn thành công, bạn có muốn đặt hẹn ngay?`,
            [
              {
                text: "Huỷ",
                onPress: () => console.log("Cancel Pressed"),
              },
              {
                text: "Đồng ý",
                onPress: async () => {
                  navigation.navigate(ScreenKey.CREATE_BOOKING);
                },
              },
            ]
          );
        case "COMPLETE_ORDER":
          return Alert.alert(
            "Thông báo",
            `Phần thưởng sẽ được nhận khi bạn thanh toán đơn hàng thành công, bạn có muốn đặt hẹn ngay?`,
            [
              {
                text: "Huỷ",
                onPress: () => console.log("Cancel Pressed"),
              },
              {
                text: "Đồng ý",
                onPress: async () => {
                  navigation.navigate(ScreenKey.CREATE_BOOKING);
                },
              },
            ]
          );
        case "COMPLETE_TREATMENT_DIARY":
          return navigation.navigate(ScreenKey.LIST_PARTNER_DIARY);
        case "CREATE_DEPOSIT":
          return Alert.alert(
            "Thông báo",
            `Phần thưởng sẽ được nhận khi bạn đặt cọc booking thành công, bạn có muốn đặt hẹn ngay?`,
            [
              {
                text: "Huỷ",
                onPress: () => console.log("Cancel Pressed"),
              },
              {
                text: "Đồng ý",
                onPress: async () => {
                  navigation.navigate(ScreenKey.CREATE_BOOKING);
                },
              },
            ]
          );
        case "REGISTER":
          return Alert.alert("Nhận phần thưởng khi bạn đăng kí thành công");
        default:
          return;
      }
    }, [])

    return (
      <Column
        paddingVertical={8 * 2}
        borderBottomWidth={1}
        borderBottomColor={BORDER_COLOR}
        marginHorizontal={8 * 2}>
        <Row gap={8 * 2}>
          <Column
            gap={4}
            flex={1}>
            <Text
              numberOfLines={2}
              weight='bold'>
              {name}
            </Text>
            <Row
              gap={8}
              borderRadius={8}
              style={styleElement.centerChild}
              height={8 * 3}
              backgroundColor={"#F1F1F1"}
              width={8 * 20}>
              <Text
                fontStyle='italic'
                size={12}
                numberOfLines={1}>
                Thưởng:
              </Text>
              <Text
                fontStyle='italic'
                color={"#D20002"}
                size={12}
                numberOfLines={1}
                weight='bold'>
                +1 Lượt quay
              </Text>
            </Row>
          </Column>

          {
            recievedAmt > 0 ?
              <TouchableOpacity onPress={_handleTakeAward}>
                <Column
                  style={styleElement.centerChild}
                  backgroundColor={'#D20002'}
                  borderRadius={8 * 1.5}
                  height={8 * 4}
                  width={8 * 13}>
                  <Text
                    color={WHITE}
                    size={12} weight='bold'>
                    Nhận thưởng
                  </Text>
                </Column>
              </TouchableOpacity>
              :
              <>
                {
                  usage > 0 ?
                    <TouchableOpacity onPress={_handleActionMission}>
                      <Column
                        style={styleElement.centerChild}
                        backgroundColor={'#DBDBDB'}
                        borderRadius={8 * 1.5}
                        height={8 * 4}
                        width={8 * 13}>
                        <Text size={12} weight='bold'>
                          Thực hiện
                        </Text>
                      </Column>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity disabled>
                      <Column
                        opacity={.3}
                        style={styleElement.centerChild}
                        backgroundColor={'#DBDBDB'}
                        borderRadius={8 * 1.5}
                        height={8 * 4}
                        width={8 * 13}>
                        <Text size={12} weight='bold'>
                          Đã nhận
                        </Text>
                      </Column>
                    </TouchableOpacity>
                }
              </>
          }
        </Row>
      </Column>
    )
  }, [listMissions])

  return (
    <ModalBottom
      borderWidth={2}
      borderBottomWidth={0}
      borderColor={"#D20002"}
      borderTopLeftRadius={8 * 2}
      borderTopRightRadius={8 * 2}
      onClose={visibleListMission.hide}
      heightModal={_heightScale(500)}
      visible={visibleListMission.visible} >
      <Column
        backgroundColor={'#D20002'}
        width={8 * 20}
        height={8 * 4}
        borderRadius={8 * 2}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        style={styleElement.centerChild}
        position='absolute'
        alignSelf='center'
        top={-8 * 4}>
        <Text
          color={WHITE}
          weight='bold'>
          NHIỆM VỤ
        </Text>
      </Column>

      <ScrollView contentContainerStyle={{ paddingVertical: 8 * 2 }}>
        {
          listMissions?.map((item, index) => {
            return (
              <ItemMission data={item} key={item?._id} />
            )
          })
        }
      </ScrollView>

    </ModalBottom>
  )
}

export default ModalMissions

const styles = StyleSheet.create({
  avatarReward: {
    width: 8 * 8,
    height: 8 * 8
  }
})
