import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, GREY_FOR_TITLE, PRICE_ORANGE, RED } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { IconPlusGrey } from '@Components/Icon/Icon'
import { styleElement } from '@Constant/StyleElement'
import CountStar2 from '@Components/NewCountStar/CountStar'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Icon from '@Components/Icon'
import { navigation } from 'rootNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import { useSelector } from 'react-redux'
import { getDataCreateBookingState } from '@Redux/booking/selectors'
import Image from '@Components/Image'
import { formatMonney } from '@Constant/Utils'
import { Alert } from 'react-native'

const PickService = () => {

    const { dataServices, dataBranch } = useSelector(getDataCreateBookingState)

    const _handleGoPickerService = useCallback(() => {
        if (!dataBranch?.code) return Alert.alert('Bạn cần chọn phòng khám trước tiên')
        navigation.navigate(ScreenKey.PICK_SERVICE_TO_BOOKING)
    }, [dataBranch?.code])

    return (
        <View style={styles.container}>
            <Text size={14} weight='bold'>Dịch vụ <Text color={RED}>*</Text></Text>
            <View style={{ height: _moderateScale(8 * 2) }} />

            <ScrollView contentContainerStyle={{ gap: 8 * 2 }} horizontal showsHorizontalScrollIndicator={false}>
                {
                    dataServices?.map((item, index) => {
                        return (
                            <ItemService data={item} />
                        )
                    })
                }
                <TouchableOpacity
                    onPress={_handleGoPickerService}
                    activeOpacity={.8} style={[styles.btnAddService, styleElement.centerChild]}>
                    <IconPlusGrey />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default PickService

const ItemService = ({ data }) => {
    return (
        <View style={{
            width: _moderateScale(8 * 22),
            borderRadius: 8,
        }}>
            <Image
                style={{
                    width: _moderateScale(8 * 22),
                    height: _moderateScale(8 * 22) * 9 / 16,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}
                avatar={data?.representationFileArr[0]} />
            <View style={{
                borderWidth: 1,
                borderTopWidth: 0,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderColor: BORDER_COLOR
            }}>
                <View style={{ padding: 8 }}>
                    <Column gap={4}>
                        <Text weight='bold' color={GREY_FOR_TITLE}>
                            {data?.name}
                        </Text>
                        <CountStar2 size={12} count={data?.reviewCount} rating={5} />
                        {/* <Column>
                            <Text size={12}>
                                - Gói bảo hành 1 năm
                            </Text>
                            <Text size={12}>
                                - Gói chăm sóc tại nhà
                            </Text>
                            <Text size={12}>
                                - Công nghệ Plasma lạnh
                            </Text>
                        </Column> */}
                    </Column>

                    <Row style={{ marginTop: 8 * 2 }}>
                        <Text style={{ flex: 1 }} color={PRICE_ORANGE} weight='bold' size={14} >
                            {formatMonney(data?.price)} VND
                        </Text>

                        <Row>
                            <Icon name="account-multiple" size={14} color="grey" />
                            <Text size={10} left={4}>
                                ({data?.countPartner})
                            </Text>
                        </Row>
                    </Row>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    btnAddService: {
        width: _moderateScale(8 * 10),
        height: _moderateScale(8 * 13),
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 8
    },
    container: {
        paddingHorizontal: _moderateScale(8 * 2)
    }
})
