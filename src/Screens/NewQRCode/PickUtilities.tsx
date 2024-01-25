import Button from '@Components/Button/Button'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { partnerCheckInBooking } from '@Redux/qrCheckin/actions'
import { getCurrBookingForCheckinState } from '@Redux/qrCheckin/selectors'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Header from './PickUtilitiesComponents/Header'
import SinglePicker from './PickUtilitiesComponents/SinglePicker'

const PickUtilities = () => {
  const dispatch = useDispatch()
  const { data: dataCurrBooking } = useSelector(getCurrBookingForCheckinState)
  const [configurationData, setConfigurationData] = useState([])

  useEffect(() => {
    if (dataCurrBooking?._id) {
      const { configurationData = [] } = dataCurrBooking?.branch || {};
      setConfigurationData(
        configurationData.filter((item: any) => {
          if (Array.isArray(item)) {
            return false;
          }
          return true;
        })
      );
    }
  }, [dataCurrBooking])

  const _handleConfirm = useCallback(() => {
    let utilities = [];
    utilities = configurationData?.map((item, index) => {
      return {
        code: item?.code,
        value: item?.value
          ?.filter((item) => item?.isChoice)
          ?.map((iMap) => iMap?.code),
      };
    });
    dispatch(
      partnerCheckInBooking.request({
        _id: dataCurrBooking?._id,
        data: { utilities },
      })
    );
    console.log({ utilities, dataCurrBooking });
  }, [configurationData]);  

  const _handleChoice = useCallback(
    (data) => {
      let tempConfigurationData = [...configurationData];
      let findIdx = tempConfigurationData?.findIndex(
        (item) => item?.code == data?.code
      );
      if (findIdx !== -1) {
        console.log("in");
        tempConfigurationData[findIdx].value = tempConfigurationData[
          findIdx
        ].value.map((item, index) => {
          return {
            ...item,
            isChoice: item?.isChoice ? false : item?.code == data?.data?.code,
          };
        });
      }
      setConfigurationData(tempConfigurationData);
    },
    [configurationData]
  );

  return (
    <Screen safeBottom>
      <FocusAwareStatusBar barStyle='light-content' />
      <Header />
      <ScrollView>
        <Column
          gap={8 * 2}
          padding={8 * 4}>
          {
            configurationData?.map((_i, idx) => {
              return (
                <SinglePicker
                  idx={idx + 1}
                  onChoice={_handleChoice}
                  key={idx}
                  data={_i} />
              )
            })
          }
        </Column>
      </ScrollView>
      <Row paddingHorizontal={16} paddingVertical={8} gap={8}>
        <Button.Outline
          onPress={_handleConfirm}
          flex={2}
          title="Bỏ qua"
          borderColor={NEW_BASE_COLOR}
          titleColor={NEW_BASE_COLOR}
          titleSize={16}
          height={40}
          borderRadius={12}
        />
        <Button.Gradient
          onPress={_handleConfirm}
          title="Xác nhận"
          titleSize={16}
          height={40}
          flex={4}
          borderRadius={12}
          horizontal
          colors={["#1a3e67", "#34759b"]}
        />
      </Row>
    </Screen>
  )
}

export default PickUtilities

const styles = StyleSheet.create({})
