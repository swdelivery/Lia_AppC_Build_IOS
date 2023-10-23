import React, { memo, useState } from 'react'
import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IconBackWhite, IconCashIn, IconCashOut, IconCommision, IconDollars } from '../../Components/Icon/Icon'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { _moderateScale, _width } from '../../Constant/Scale'


import { TabBar, TabView } from 'react-native-tab-view'
import * as Color from '../../Constant/Color'
import { navigation } from '../../../rootNavigation'
import { sizeIcon } from '../../Constant/Icon'
import { styleElement } from '../../Constant/StyleElement'

const InfoWalletNewAffiliate = memo(() => {


    const _renderItem = ({ item, index }) => {
        return (
            <View style={{
                padding: _moderateScale(8 * 2),
                width: _width,
                borderBottomWidth: .5,
                borderBottomColor: 'rgba(0,0,0,.4)',
                flexDirection: 'row'
            }}>
                <View style={{
                    width: _moderateScale(8 * 6),
                    height: _moderateScale(8 * 6),
                    borderRadius: _moderateScale(8 * 6) / 2,
                    borderWidth: .5,
                    borderColor: BASE_COLOR,
                    ...styleElement.centerChild
                }}>
                    <IconCommision style={sizeIcon.lxlg} />
                </View>
                <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                    <Text style={{
                        ...stylesFont.fontNolanBold,
                        fontSize: _moderateScale(14),
                        color: Color.BLUE_FB
                    }}>
                        Nhận hoa hồng từ đơn hàng Cắt Mí T-2022
                    </Text>
                    <Text style={{
                        ...stylesFont.fontNolan,
                        fontSize: _moderateScale(12)
                    }}>
                        17:30 - 12/10/2023
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(12),
                            flex: 1
                        }}>
                            Từ: <Text style={{ ...stylesFont.fontNolanBold }}>Nguyễn Văn Chung</Text>
                        </Text>

                        <Text style={{
                            ...stylesFont.fontDinTextProBold,
                            color: Color.PRICE_ORANGE
                        }}>
                            + 1.200.000 d
                        </Text>
                    </View>

                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: getStatusBarHeight()
                }} />
                <View style={styles.header__box}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconBackWhite />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                            Ví của tôi
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                    </View>
                </View>
            </View>
            <View style={styles.topBanner}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3.5 }}>
                        <Text style={styles.topBanner__textTotal}>
                            Tổng tiền
                        </Text>
                        <Text style={styles.topBanner__textMoney}>
                            7.900.000 vnd
                        </Text>
                    </View>
                    <View style={[{ flex: 2.5, flexDirection: 'row', justifyContent: 'flex-end' }]}>
                        <View style={{ alignItems: 'center' }}>

                            <View style={{
                                width: _moderateScale(8 * 6),
                                height: _moderateScale(8 * 6),
                                borderRadius: _moderateScale(8 * 6) / 2,
                                borderWidth: 2,
                                ...styleElement.centerChild,
                                borderColor: WHITE
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: WHITE,
                                    width: _moderateScale(8 * 5),
                                    height: _moderateScale(8 * 5),
                                    borderRadius: _moderateScale(8 * 5) / 2,
                                    ...styleElement.centerChild
                                }}>
                                    <View style={{
                                        transform: [
                                            {
                                                rotate: '90deg'
                                            }
                                        ]
                                    }}>
                                        <IconCashIn style={sizeIcon.lg} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: _moderateScale(14), color: WHITE, ...stylesFont.fontNolanBold }}>
                                Nạp tiền
                            </Text>
                        </View>
                        <View style={{ width: _moderateScale(8 * 3) }} />

                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                width: _moderateScale(8 * 6),
                                height: _moderateScale(8 * 6),
                                borderRadius: _moderateScale(8 * 6) / 2,
                                borderWidth: 2,
                                ...styleElement.centerChild,
                                borderColor: WHITE
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: WHITE,
                                    width: _moderateScale(8 * 5),
                                    height: _moderateScale(8 * 5),
                                    borderRadius: _moderateScale(8 * 5) / 2,
                                    ...styleElement.centerChild
                                }}>
                                    <View style={{

                                    }}>
                                        <IconDollars style={sizeIcon.llg} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: _moderateScale(14), color: WHITE, ...stylesFont.fontNolanBold }}>
                                Rút tiền
                            </Text>
                        </View>

                    </View>
                </View>

                <View style={{ marginTop: _moderateScale(8 * 2), flexDirection: 'row' }}>
                    <Text style={styles.topBanner__moneyIn}>
                        Tiền nạp: 900.000 vnd
                    </Text>
                    <View style={{ width: _moderateScale(8 * 2) }} />
                    <Text style={styles.topBanner__moneyHH}>
                        Hoa hồng: 7.000.000 vnd
                    </Text>

                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: WHITE }}>
                <View style={{
                    width: _width, height: _moderateScale(8 * 6), backgroundColor: WHITE,
                    borderTopLeftRadius: _moderateScale(8 * 2), borderTopRightRadius: _moderateScale(8 * 2),
                    top: -_moderateScale(8 * 2.5),
                    position: 'absolute',
                    zIndex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: _moderateScale(8 * 2)
                }} >
                    <Text style={{
                        ...stylesFont.fontNolanBold,
                        color: Color.GREY_FOR_TITLE,
                        fontSize: _moderateScale(14)
                    }}>
                        Thống kê nguồn tiền
                    </Text>

                    <TouchableOpacity>
                        <Text style={{
                            ...stylesFont.fontNolanBold,
                            color: Color.GREY_FOR_TITLE,
                            marginLeft: _moderateScale(8 * 2),
                            fontSize: _moderateScale(14)
                        }}>
                            Tháng 10/2023
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    height: _moderateScale(8 * 4)
                }} />



                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7]}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ height: 200 }} />
                        )
                    }}
                />
            </View>



        </View>
    )
})

export default InfoWalletNewAffiliate

const styles = StyleSheet.create({
    topBanner__moneyHH: {
        ...stylesFont.fontDinTextProBold,
        color: Color.RED,
        fontSize: _moderateScale(14)
    },
    topBanner__moneyIn: {
        ...stylesFont.fontDinTextProBold,
        color: Color.BLUE_FB,
        fontSize: _moderateScale(14)
    },
    topBanner__textMoney: {
        ...stylesFont.fontDinTextProBold,
        color: WHITE,
        fontSize: _moderateScale(24)
    },
    topBanner__textTotal: {
        ...stylesFont.fontNolan500,
        color: WHITE,
        fontSize: _moderateScale(16)
    },
    topBanner: {
        // height: _moderateScale(8 * 14),
        backgroundColor: BASE_COLOR,
        padding: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 5)
    },
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
    }
})