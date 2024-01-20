import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'
import Button from '@Components/Button/Button'
import CalendarPickRange from '@Components/CalendarPickRange/CalendarPickRange'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import Icon from '@Components/Icon'
import { IconEmptyData } from '@Components/Icon/Icon'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'
import LoadingIndicator from '@Components/LoadingIndicator/LoadingIndicator'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import { StatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { GREY_FOR_TITLE, WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import { ConfigDataCode } from '@typings/configData'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet } from 'react-native'
import useApi from 'src/Hooks/services/useApi'
import useConfigData from 'src/Hooks/useConfigData'
import useItemExtractor from 'src/Hooks/useItemExtractor'
import { useNavigate } from 'src/Hooks/useNavigation'
import useVisible from 'src/Hooks/useVisible'
import PartnerService from 'src/Services/PartnerService'
import CardRefund from './Components/CardRefund'

const Refund = () => {
  const { navigate } = useNavigate()
  const policyPicker = useVisible()
  const [listData, setListData] = useState([])
  const calendarRangePicker = useVisible()
  const { data, performRequest, isLoading } = useApi(
    PartnerService.getPayment,
    {}
  );
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })
  const dataPolicyRefund = useConfigData(ConfigDataCode.PolicyRefund);

  useEffect(() => {
    performRequest({
      condition: {
        isRefund: {
          equal: true
        }
      }
    })
  }, [])

  useEffect(() => {
    if (isLoading) {
      setListData([])
    }
  }, [isLoading])

  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      performRequest({
        condition: {
          isRefund: {
            equal: true
          },
          created: {
            from: dateRange?.startDate,
            to: dateRange?.endDate
          }
        }
      })
    }
  }, [dateRange])

  useEffect(() => {
    setListData(data?.data)
  }, [data])

  const _handleOnConfirm = useCallback((dataDate) => {
    setDateRange(dataDate)
  }, [])

  const _renderRight = useMemo(() => {
    return (
      <Row
        onPress={calendarRangePicker.show}
        gap={8}
        top={-12}
        right={8 * 0}
        width={8 * 30}
        justifyContent='flex-end'
        position='absolute'>
        {
          dateRange?.startDate && dateRange.endDate ?
            <Text>
              {moment(dateRange.startDate).format("DD/MM")} {`->`} {moment(dateRange.endDate).format("DD/MM")}
            </Text>
            :
            <Text>
              Lọc theo ngày
            </Text>
        }
        <Icon name='calendar' />
      </Row>
    )
  }, [dateRange])

  const _handleReview = useCallback(() => {
    navigate(ScreenKey.PARTNER_REVIEW_SERVICE)()
  }, [])

  const _renderItem = useCallback(({ item }) => {
    return (
      <CardRefund data={item} />
    )
  }, [])
  const { keyExtractor } = useItemExtractor<any>((item) => item._id);

  return (
    <Screen style={styleElement.flex}>
      <StatusBar barStyle='dark-content' />
      <LiAHeader
        bg={WHITE}
        titleColor={GREY_FOR_TITLE}
        right={_renderRight}
        safeTop title='Hoàn tiền' />
      <Spacer top={8} />
      <Column onPress={policyPicker.show}>
        <Image
          resizeMode='contain'
          style={styles.bgRefund}
          source={require('../../NewImage/Refund/bgRefund.png')} />
      </Column>

      <Column margin={8 * 2}>
        <Text
          size={16}
          weight='bold'
          color={GREY_FOR_TITLE}>
          Lịch sử hoàn tiền
        </Text>
      </Column>
      <AfterTimeoutFragment>
        <FlatList
          ListEmptyComponent={
            isLoading ? (
              <LoadingIndicator />
            ) : (
              <Column flex={1}>
                {
                  dateRange?.startDate && dateRange?.endDate ?
                    <EmptyResultData title='Không tìm thấy dữ liệu' />
                    :
                    <EmptyResultData>
                      <Column gap={8} alignItems="center">
                        <IconEmptyData width={8 * 8} height={8 * 8} />
                        <Text style={{ textAlign: 'center' }}>Đánh giá sau khi sử dụng dịch vụ {'\n'} để được hoàn tiền!</Text>
                        <Button.Gradient
                          onPress={_handleReview}
                          height={8 * 4}
                          borderRadius={8 * 4}
                          width={8 * 20}
                          horizontal
                          colors={["#2A78BD", "#21587E"]}
                          title="Đánh giá"
                        />
                      </Column>
                    </EmptyResultData>
                }
              </Column>
            )
          }
          contentContainerStyle={styles.flatListStyle}
          keyExtractor={keyExtractor}
          renderItem={_renderItem}
          data={listData} />
      </AfterTimeoutFragment>

      <CalendarPickRange
        onConfirm={_handleOnConfirm}
        visible={calendarRangePicker} />

      <ModalBottom
        onClose={policyPicker.hide}
        heightModal={600}
        borderTopLeftRadius={8 * 2}
        borderTopRightRadius={8 * 2}
        visible={policyPicker.visible}>
        <Row
          margin={8 * 2}
          justifyContent='center'>
          <Text weight='bold'>
            Chính sách hoàn tiền
          </Text>
        </Row>
        <ScrollView contentContainerStyle={{ marginHorizontal: 8 * 2 }}>
          <RenderHTML data={dataPolicyRefund?.value} />
        </ScrollView>
      </ModalBottom>
    </Screen>
  )
}

export default Refund

const styles = StyleSheet.create({
  flatListStyle: {
    paddingHorizontal: 8 * 2,
    gap: 8 * 2,
    paddingBottom: 8 * 10,
    flexGrow: 1
  },
  bgRefund: {
    width: _width - 8 * 4,
    height: (_width - 8 * 4) * 9 / 19,
    alignSelf: 'center',
  }
})
