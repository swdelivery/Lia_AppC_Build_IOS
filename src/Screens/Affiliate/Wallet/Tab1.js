import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREY, WHITE } from '../../../Constant/Color';

import ItemPriceWallet from './Components/ItemPriceWallet'
import { useDispatch, useSelector } from 'react-redux';
import { formatMonney } from '../../../Constant/Utils';
import { sizeIcon } from '../../../Constant/Icon';
import { getCollabStatistic } from '../../../Redux/Action/InfoAction'
import moment from 'moment'
import { TabBar, TabView } from 'react-native-tab-view';
import * as Color from '../../../Constant/Color';
import { getListOrderCommission, getListOrderReferral } from '../../../Redux/Action/Affiilate';

const Tab1 = memo((props) => {

    const [listOrderCommission, setListOrderCommission] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log({ currMonthFilter: props?.currMonthFilter, currLevelFilter: props?.currLevelFilter });
        _getListOrderReferral(props?.currMonthFilter, props?.currLevelFilter)
    }, [props?.currMonthFilter, props?.currLevelFilter])

    const _getListOrderReferral = async (currMonthFilter, currLevelFilter) => {
        setIsLoading(true)

        let startOfMonth = new Date(moment(currMonthFilter).startOf('month').format('YYYY-MM-DD'));
        let endOfMonth = new Date(moment(currMonthFilter).endOf('month').format('YYYY-MM-DD'));

        let tempCondition = {}

        // if (startOfMonth && endOfMonth) {
        //     tempCondition['dateTime'] = {
        //         from: startOfMonth,
        //         to: endOfMonth
        //     }
        // }
        // if (currLevelFilter) {
        //     if (currLevelFilter == 'all') {

        //     } else {
        //         tempCondition['referral'] = {
        //             object: {
        //                 level: {
        //                     equal: Number(currLevelFilter)
        //                 }
        //             }
        //         }
        //     }
        // }
        let result = await getListOrderReferral({
            condition: tempCondition
        })
        if (result?.isAxiosError) return setIsLoading(false)
        console.log({ result });
        setListOrderCommission(result?.data?.data)
        return setIsLoading(false)
    }

    return (
        <ScrollView style={{}} scrollIndicatorInsets={{ right: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            {/* <View style={{ height: _moderateScale(8 * 1) }} /> */}
            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',paddingBottom:_moderateScale(8*5) }}>
                <Text>Dữ liệu trống</Text>
            </View> */}
            {
                isLoading ?
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: _moderateScale(8 * 5) }}>
                            <View style={{}}>
                                <ActivityIndicator />
                                <Text style={{ marginLeft: _moderateScale(8) }}>Đang tải</Text>
                            </View>
                        </View>
                    </>
                    :
                    <>
                        {
                            listOrderCommission?.length > 0 ?
                                <>
                                    {
                                        listOrderCommission?.map((item, index) => {
                                            return (
                                                <View style={{ paddingLeft: _moderateScale(8 * 2), paddingRight: _moderateScale(4) }} key={item?._id}>
                                                    <View style={{ flexDirection: 'row', paddingVertical: _moderateScale(8 * 1.5) }} >
                                                        <View style={{ flex: 4 }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: _moderateScale(8 * 2) }}>
                                                                <Text
                                                                    numberOfLines={1}
                                                                    style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), flex: 1 }}>
                                                                    {index + 1}. {item?.partner?.name}
                                                                </Text>
                                                                {/* <View style={styles.tagLevel}>
                                                                    <Text style={styles.tagLevel__text}>
                                                                        Level {item?.referral?.level}
                                                                    </Text>
                                                                </View> */}
                                                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, marginLeft: _moderateScale(8 * 1) }}>
                                                                    {moment(item?.created).format('DD/MM/YYYY || LT')}
                                                                </Text>
                                                            </View>



                                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK_OPACITY_7, marginLeft: _moderateScale(8 * 1), marginTop: _moderateScale(4) }}>
                                                                {item?.services?.map((itemMap, indexMap) => {
                                                                    if (indexMap == item?.services?.length - 1) {
                                                                        return `${itemMap?.serviceName}`
                                                                    }
                                                                    return `${itemMap?.serviceName}, `
                                                                })} tại {item?.branch?.name}
                                                            </Text>
                                                        </View>

                                                        {/* <View style={{borderWidth:1, flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text>
                                                                {
                                                                    formatMonney(item?.totalAmount)
                                                                }
                                                            </Text>
                                                            <Text>
                                                                {
                                                                    formatMonney(item?.paidAmount)
                                                                }
                                                            </Text>
                                                            <Text>
                                                                {
                                                                    formatMonney(item?.remainingAmount)
                                                                }
                                                            </Text>
                                                        </View> */}

                                                    </View>

                                                    <View style={{ flexDirection: 'row',paddingHorizontal:_moderateScale(8) }}>
                                                        <View style={{ flex: 1, }}>
                                                            <Text>Tổng đơn</Text>
                                                            <Text style={{...stylesFont.fontNolan500,fontSize:_moderateScale(14),color:BLUE_FB}}>{formatMonney(item?.totalAmount)}</Text>
                                                        </View>

                                                        {/* <View style={{ width: 1, height: '100%', backgroundColor: BG_GREY_OPACITY_5 }} /> */}

                                                        <View style={{ flex: 1, }}>
                                                            <Text>Đã thanh toán</Text>
                                                            <Text style={{...stylesFont.fontNolan500,fontSize:_moderateScale(14),color:Color.GREEN_SUCCESS}}>{formatMonney(item?.paidAmount)}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, }}>
                                                            <Text>Còn lại</Text>
                                                            <Text style={{...stylesFont.fontNolan500,fontSize:_moderateScale(14),color:Color.RED}}>{formatMonney(item?.remainingAmount)}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ marginTop: _moderateScale(8 * 2), height: 1.5, backgroundColor: Color.BG_GREY_OPACITY_5 }} />
                                                </View>
                                            )
                                        })
                                    }
                                </>
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: _moderateScale(8 * 5) }}>
                                    <Text>Dữ liệu trống</Text>
                                </View>
                        }
                    </>
            }

            <View style={{ height: 50 }} />
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    tagLevel__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(13),
        color: Color.BASE_COLOR,
        bottom: 1
    },
    tagLevel: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 2.5),
        borderRadius: _moderateScale(4),
        marginVertical: _moderateScale(4),
        marginLeft: _moderateScale(8 * 1.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(7, 140, 127,0.15)'
    }
})

export default Tab1;