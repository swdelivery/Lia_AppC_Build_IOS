import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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

const PickService = () => {

    const _handleGoPickerService = useCallback(() => {
        navigation.navigate(ScreenKey.PICK_SERVICE_TO_BOOKING)
    }, [])

    return (
        <View style={styles.container}>
            <Text size={14} weight='bold'>Dịch vụ <Text color={RED}>*</Text></Text>
            <View style={{ height: _moderateScale(8 * 2) }} />

            <ScrollView contentContainerStyle={{ gap: 8 * 2 }} horizontal showsHorizontalScrollIndicator={false}>
                <View style={{
                    width: _moderateScale(8 * 22),
                    borderRadius: 8,
                }}>
                    <Image
                        style={{
                            width: _moderateScale(8 * 22),
                            height: _moderateScale(8 * 14),
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8
                        }}
                        source={{ uri: `https://image.tienphong.vn/w1000/Uploaded/2023/pcgycivo/2023_03_16/image001-7669.jpg` }} />
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
                                    Nhấn Mí
                                </Text>

                                <CountStar2 size={12} count={340} rating={5} />

                                <Column>
                                    <Text size={12}>
                                        - Gói bảo hành 1 năm
                                    </Text>
                                    <Text size={12}>
                                        - Gói chăm sóc tại nhà
                                    </Text>
                                    <Text size={12}>
                                        - Công nghệ Plasma lạnh
                                    </Text>
                                </Column>
                            </Column>

                            <Row style={{ marginTop: 8 * 2 }}>
                                <Text style={{ flex: 1 }} color={PRICE_ORANGE} weight='bold' size={14} >
                                    10.000.000 VND
                                </Text>

                                <Row>
                                    <Icon name="account-multiple" size={14} color="grey" />
                                    <Text size={10} left={4}>
                                        (157)
                                    </Text>
                                </Row>
                            </Row>

                        </View>
                    </View>

                </View>

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