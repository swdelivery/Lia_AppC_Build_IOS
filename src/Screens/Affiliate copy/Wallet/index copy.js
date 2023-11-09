import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BG_GREY_OPACITY_5, BTN_PRICE, GREY, WHITE } from '../../../Constant/Color';

import ItemPriceWallet from './Components/ItemPriceWallet'
import { useDispatch, useSelector } from 'react-redux';
import { formatMonney } from '../../../Constant/Utils';
import { sizeIcon } from '../../../Constant/Icon';
import { getCollabStatistic } from '../../../Redux/Action/InfoAction'
import moment from 'moment'

const index = (props) => {
    const dispatch = useDispatch()
    const collabStatisticRedux = useSelector(state => state?.infoReducer?.collabStatistic)

    const [currTab, setCurrTab] = useState('1')

    const [currMonthFilter, setCurrMonthFilter] = useState(new Date())

    useEffect(() => {

    }, [])

    useEffect(() => {
        let startOfMonth = new Date(moment(currMonthFilter).startOf('month').format('YYYY-MM-DD'));
        let endOfMonth = new Date(moment(currMonthFilter).endOf('month').format('YYYY-MM-DD'));

        console.log({
            startOfMonth,
            endOfMonth
        });
        dispatch(getCollabStatistic({
            "condition": {
                'updated': {
                    'from': startOfMonth,
                    'to': endOfMonth
                }
            }
        }))
    }, [currMonthFilter])

    const _handlePreMonth = () => {
        setCurrMonthFilter(moment(currMonthFilter).subtract(1, 'months').format('YYYY-MM-DD'))
    }

    const _handleNextMonth = () => {
        setCurrMonthFilter(moment(currMonthFilter).subtract(-1, 'months').format('YYYY-MM-DD'))
    }

    return (
        <ScrollView style={{ flex: 1 }}>

            <View style={[styles.bannerStatis, {
                width: "100%",
                justifyContent: 'space-between',
                //  position: 'absolute', width: "100%", zIndex: 1 
            }]}>
                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BTN_PRICE }]}>
                    Thống kê
                </Text>

                <View style={[styleElement.rowAliCenter]}>
                    <TouchableOpacity style={{ backgroundColor: BTN_PRICE, padding: _moderateScale(4), borderRadius: _moderateScale(4) }} onPress={_handlePreMonth}>
                        <Image style={[sizeIcon.xxs]} source={require('../../../Icon/douPre.png')} />
                    </TouchableOpacity>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), width: _moderateScale(8 * 12), textAlign: 'center', color: BTN_PRICE }]}>
                        {
                            moment(currMonthFilter).format("MM/YYYY")
                        }
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: BTN_PRICE, padding: _moderateScale(4), borderRadius: _moderateScale(4) }} onPress={_handleNextMonth}>
                        <Image style={[sizeIcon.xxs]} source={require('../../../Icon/douNext.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                <TouchableOpacity
                    onPress={() => setCurrTab('1')}
                    style={[styles.btnTab, currTab == '1' && styles.btnTabActive]}>
                    <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '1' && ({ color: BTN_PRICE })]}>
                        Cá nhân
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setCurrTab('2')}
                    style={[styles.btnTab, currTab == '2' && styles.btnTabActive]}>
                    <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '2' && ({ color: BTN_PRICE })]}>
                        Cộng tác viên
                    </Text>
                </TouchableOpacity>
            </View>

            {
                currTab == '1' ?
                    <View>
                        <Text style={[stylesFont.fontNolan, {
                            margin: _moderateScale(6),
                            fontSize: _moderateScale(11), fontStyle: 'italic'
                        }]}>Hoa hồng dự tính trong tháng của cá nhân</Text>
                        {/* <ItemPriceWallet title={"1. "} price={"4.500.000"}/>
                        <ItemPriceWallet title={"2. Đơn hàng sản phẩm"} price={"4.500.000"}/> */}
                        <ItemPriceWallet title={"1. Doanh số"}
                            price={formatMonney(collabStatisticRedux?.sales?.level1?.totalAmount)} />
                        <ItemPriceWallet end title={"2. Doanh thu "}
                            price={formatMonney(collabStatisticRedux?.revenues?.level1?.totalAmount)} />
                    </View>
                    : <></>
            }
            {
                currTab == '2' ?
                    <View><Text style={[stylesFont.fontNolan, {
                        margin: _moderateScale(6),
                        fontSize: _moderateScale(11), fontStyle: 'italic'
                    }]}>
                        Hoa hồng dự tính trong tháng của cộng tác viên level2, level 3</Text>

                        <ItemPriceWallet title={"1. Doanh số"}
                            price2={formatMonney(collabStatisticRedux?.sales?.level2?.totalAmount)}
                            type={'referal'}
                            price3={formatMonney(collabStatisticRedux?.sales?.level3?.totalAmount)}
                        />
                        <ItemPriceWallet end title={"2. Doanh thu"}
                            color={'#5D5FEF'}
                            price2={formatMonney(collabStatisticRedux?.revenues?.level2?.totalAmount)}
                            type={'referal'}
                            price3={formatMonney(collabStatisticRedux?.revenues?.level3?.totalAmount)}
                        />
                        {/* <ItemPriceWallet title={"2. Đơn hàng sản phẩm"} price={"3.500.000"}/>
                        <ItemPriceWallet title={"1. Doanh số"} price={"4.300.000"}/>
                        <ItemPriceWallet end title={"1. Doanh thu"} price={"7.500.000"}/> */}
                    </View>
                    : <></>
            }



        </ScrollView>
    );
};

const styles = StyleSheet.create({
    btnTabActive: {
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: BTN_PRICE,
    },
    btnTab__text: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    btnTab: {
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: _moderateScale(4),
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: 'transparent'
    },
    bannerStatis: {
        backgroundColor: WHITE,
        height: _moderateScale(8 * 6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2),
        borderBottomWidth: _moderateScale(0.5),
        borderBottomColor: BG_GREY_OPACITY_5
    },
})

export default index;