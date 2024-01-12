import Button from '@Components/Button/Button'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import { IconEmptyData } from '@Components/Icon/Icon'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import { getTreatmentDetailForPartner } from '@Redux/Action/TreatmentAction'
import ItemTreatmentDetail from '@Screens/InfoRoomChat/Components/ItemTreatmentDetail'
import _isEmpty from "lodash/isEmpty"
import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useFocused, useNavigate } from 'src/Hooks/useNavigation'

const PartnerReviewService = () => {
  const { navigate } = useNavigate()
  const [listTreamentDetail, setListTreatmentDetail] = useState([]);
  useFocused(() => {
    _getListTreatmentDetail();
  });

  const _getListTreatmentDetail = async () => {
    let resultGetTreatmentDetailForPartner = await getTreatmentDetailForPartner(
      {
        condition: {
          status: {
            in: ["PENDING", "COMPLETE"],
          },
        },
        limit: 1000,
      }
    );
    if (resultGetTreatmentDetailForPartner?.isAxiosError) return;
    setListTreatmentDetail(resultGetTreatmentDetailForPartner?.data?.data);
  };

  const _handleCreateBooking = useCallback(() => {
    navigate(ScreenKey.CREATE_BOOKING)()
  }, [])

  return (
    <Screen style={styleElement.flex}>
      <FocusAwareStatusBar barStyle='light-content' />
      <LiAHeader safeTop title='Đánh giá dịch vụ' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, marginTop: 8 * 2 }}
        style={{ paddingHorizontal: 8 * 2 }}>
        {!_isEmpty(listTreamentDetail) ? (
          <Column gap={8 * 2}>
            {listTreamentDetail?.map((item, index) => {
              return <ItemTreatmentDetail key={index} data={item} />;
            })}
          </Column>
        ) : (
          <Column flex={1}>
            <EmptyResultData>
              <Column gap={8} alignItems='center'>
                <IconEmptyData width={8 * 8} height={8 * 8} />
                <Text>
                  Làm đẹp cùng LiA
                </Text>
                <Button.Gradient
                  onPress={_handleCreateBooking}
                  height={8 * 4}
                  borderRadius={8 * 4}
                  width={8 * 20}
                  horizontal
                  colors={['#2A78BD', '#21587E']}
                  title='Đặt hẹn ngay' />
              </Column>
            </EmptyResultData>
          </Column>
        )}

        <Spacer top={100} />
      </ScrollView>
    </Screen>
  )
}

export default PartnerReviewService

const styles = StyleSheet.create({})
