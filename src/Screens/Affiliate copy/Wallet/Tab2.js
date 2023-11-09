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
import { depositCommissionForPartner } from '../../../Redux/Action/Affiilate';

const Tab2 = memo((props) => {

    const [listDepositCommission, setListDepositCommission] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log({ currMonthFilter: props?.currMonthFilter, currLevelFilter: props?.currLevelFilter });
        _getDepositCommissionForPartner(props?.currMonthFilter, props?.currLevelFilter)
    }, [props?.currMonthFilter, props?.currLevelFilter])

    const _getDepositCommissionForPartner = async (currMonthFilter, currLevelFilter) => {
        setIsLoading(true)

        let startOfMonth = new Date(moment(currMonthFilter).startOf('month').format('YYYY-MM-DD'));
        let endOfMonth = new Date(moment(currMonthFilter).endOf('month').format('YYYY-MM-DD'));

        let tempCondition = {}

        if (startOfMonth && endOfMonth) {
            tempCondition['dateTime'] = {
                from: startOfMonth,
                to: endOfMonth
            }
        }
        if (currLevelFilter) {
            if (currLevelFilter == 'all') {
            } else {
                tempCondition['referral'] = {
                    object: {
                        level: {
                            equal: Number(currLevelFilter)
                        }
                    }
                }
            }
        }
        let result = await depositCommissionForPartner({
            condition: tempCondition
        })
        if (result?.isAxiosError) return setIsLoading(false)
        console.log({ result });
        setListDepositCommission(result?.data?.data)
        return setIsLoading(false)
    }

    return (
        <ScrollView style={{}} contentContainerStyle={{ flexGrow: 1 }}>
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
                            listDepositCommission?.length > 0 ?
                                <>
                                    {
                                        listDepositCommission?.map((item, index) => {
                                            return (
                                                <View style={{ paddingLeft: _moderateScale(8 * 2), paddingRight: _moderateScale(4) }} key={item?._id}>
                                                    <View style={{ flexDirection: 'row', paddingVertical: _moderateScale(8 * 1.5) }} >
                                                        <View style={{ flex: 4 }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text
                                                                    numberOfLines={1}
                                                                    style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), flex: 1 }}>
                                                                    {index + 1}. {item?.deposit?.partner?.name}
                                                                </Text>
                                                                <View style={styles.tagLevel}>
                                                                    <Text style={styles.tagLevel__text}>
                                                                        Level {item?.referral?.level}
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, marginLeft: _moderateScale(8 * 1) }}>
                                                                {moment(item?.created).format('DD/MM/YYYY || LT')}
                                                            </Text>

                                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK, marginLeft: _moderateScale(8 * 1), marginTop: _moderateScale(4) }}>
                                                                {/* {item?.order?.services?.map((itemMap, indexMap) => {
                                                                    if (indexMap == item?.order?.services?.length - 1) {
                                                                        return `${itemMap?.serviceName}`
                                                                    }
                                                                    return `${itemMap?.serviceName}, `
                                                                })}  */}
                                                                Tại {item.deposit.branch?.name}
                                                            </Text>
                                                        </View>

                                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ ...stylesFont.fontDinTextPro, fontSize: _moderateScale(14), color: Color.BLACK }}>
                                                                {formatMonney(item?.totalAmountInMonth)}
                                                            </Text>
                                                            <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: '#F285AE' }}>
                                                                +{formatMonney(item?.commissionAmountInMonth)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ height: 1.5, backgroundColor: Color.BG_GREY_OPACITY_5 }} />
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

export default Tab2;