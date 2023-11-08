import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector, useDispatch } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import CalendarChartCard from './CalendarChartCard';
import ListMenu from './ListMenu';
import ListActivity from './ListActivity';
import { navigation } from '../../../rootNavigation';
import {
    getCurrentPartnerTrackingWeightNotDispatch,
    getRecentPartnerTrackingWeightNotDispatch,
    getOnePartnerTrackingWeightNotDispatch,
    updatePartnerTrackingWeight
} from '../../Redux/Action/LoseWeightAction';
import moment from 'moment'
import debounce from 'lodash/debounce';

const CalcuWeight = memo((props) => {

    const dateFilterTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.dateFilterTrackingWeight)
    const partnerTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.partnerTrackingWeight)
    const partnerWeightGoalRedux = useSelector(state => state.loseWeightReducer?.partnerWeightGoal)

    const [currWeight, setCurrWeight] = useState(0)
    const [preWeight, setPreWeight] = useState(0)

    useEffect(() => {
        if (moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day')) {
            _getCurrDayWeight()
            _getRecentDayWeight()
        } else {
            _getOneDayWeight()
        }

    }, [dateFilterTrackingWeightRedux])



    const _getCurrDayWeight = async () => {
        let result = await getCurrentPartnerTrackingWeightNotDispatch();
        console.log({ result });

        if (result?.data?.data?.weight) {
            setCurrWeight(result?.data?.data?.weight)
        } else {
            setCurrWeight(0)
        }
    }
    const _getRecentDayWeight = async () => {
        let result = await getRecentPartnerTrackingWeightNotDispatch({});
        if (result?.data?.data?.weight) {
            setPreWeight(result?.data?.data?.weight)
        } else {
            setPreWeight(0)
        }
    }
    const _getOneDayWeight = async () => {
        let result = await getOnePartnerTrackingWeightNotDispatch({
            condition: {
                dateCode: {
                    equal: moment(dateFilterTrackingWeightRedux).format('YYYY/MM/DD')
                }
            }
        });
        if (result?.data?.data?.weight) {
            setCurrWeight(result?.data?.data?.weight)
        } else {
            setCurrWeight(0)
        }
    }


    const _updatePartnerTrackingWeight = async (weight) => {
        let result = await updatePartnerTrackingWeight({
            weight: Number(weight)
        })
    }



    return (
        <>
            <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 4) }]}>
                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8, flex: 1 }]}>
                    Cân nặng
                    </Text>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.CHART_RP_WEIGHT)
                    }}
                    style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Image style={[sizeIcon.lg]} source={require('../../Icon/chart_black.png')} />
                </TouchableOpacity>
            </View>
            {
                partnerTrackingWeightRedux?._id ?
                    <ImageBackground
                        style={{ marginHorizontal: _moderateScale(8 * 2), borderRadius: _moderateScale(8 * 1.5), backgroundColor: BG_GREY_OPACITY_5, height: _moderateScale(125), marginTop: _moderateScale(8) }}
                        imageStyle={{ borderRadius: _moderateScale(8 * 1.5) }}
                        source={require('../../Icon/linearBG_blue.png')}
                    >
                        <View style={{ flex: 1, justifyContent: 'center' }}>

                            {
                                moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ?
                                    <View style={[styleElement.rowAliCenter]}>
                                        <View style={{ width: _moderateScale(8 * 16), bottom: _moderateScale(8) }}>
                                            {/* {
                                        preWeight ?
                                            <View style={{ alignItems: 'center', marginLeft: _moderateScale(8 * 2) }}>
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                                                    Gần đây
                                                </Text>
                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(22), color: WHITE, lineHeight: _moderateScale(26) }]}>
                                                    {parseFloat(Number(preWeight).toFixed(1))} kg
                                            </Text>
                                            </View>
                                            : <></>
                                    }
                                    <View style={{ height: _moderateScale(8) }} /> */}
                                            {
                                                partnerWeightGoalRedux?.date?.to ?
                                                    <View style={{ marginLeft: _moderateScale(8 * 2) }}>
                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                                                            Mục tiêu ({moment(partnerWeightGoalRedux?.date?.to).format("DD/MM")})
                                                        </Text>
                                                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(28), color: WHITE, lineHeight: _moderateScale(32) }]}>
                                                            {parseFloat(Number(partnerWeightGoalRedux?.weight?.to).toFixed(1))} kg
                                                        </Text>
                                                    </View>
                                                    :
                                                    <View style={{ marginLeft: _moderateScale(8 * 2) }}>
                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                                                            Mục tiêu
                                                        </Text>
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate(ScreenKey.MY_GOAL)}
                                                            style={[styleElement.rowAliCenter]}>
                                                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(22), color: WHITE, lineHeight: _moderateScale(32) }]}>
                                                                Tạo
                                                            </Text>
                                                            <Image style={[sizeIcon.md, { top: 2, transform: [{ rotate: "90deg" }] }]} source={require('../../Icon/up_arrow_white.png')} />
                                                        </TouchableOpacity>
                                                    </View>
                                            }
                                        </View>



                                        <View style={{ marginLeft: _moderateScale(8 * 2), flex: 1, alignItems: 'center', bottom: _moderateScale(8), marginRight: _moderateScale(8 * 2) }}>
                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: WHITE }]}>
                                                Hiện tại
                                    </Text>

                                            <View style={[styleElement.rowAliCenter]}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setCurrWeight(old => old -= 0.1)
                                                        _updatePartnerTrackingWeight(currWeight - 0.1)
                                                    }}
                                                    style={styles.btnWeight}>
                                                    <View style={{ width: _moderateScale(12), height: _moderateScale(2.5), backgroundColor: WHITE, borderRadius: _moderateScale(4) }} />
                                                </TouchableOpacity>

                                                <View style={{
                                                    width: _moderateScale(100),
                                                    height: _moderateScale(60),
                                                    borderRadius: _moderateScale(8),
                                                    backgroundColor: '#34B1DF',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: _moderateScale(4),
                                                    marginHorizontal: _moderateScale(4)
                                                }}>
                                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(30), color: WHITE }]}>
                                                        {currWeight.toFixed(1)}
                                                    </Text>
                                                </View>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setCurrWeight(old => old += 0.1)
                                                        _updatePartnerTrackingWeight(currWeight + 0.1)
                                                    }}
                                                    style={styles.btnWeight}>
                                                    <Image style={[sizeIcon.xxs]} source={require('../../Icon/plus_white.png')} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                    :
                                    <View style={[styleElement.rowAliCenter]}>
                                        <View style={{ width: _moderateScale(8 * 16), bottom: _moderateScale(8) }}>
                                            {
                                                partnerWeightGoalRedux?.date?.to ?
                                                    <View style={{ marginLeft: _moderateScale(8 * 2) }}>
                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                                                            Mục tiêu ({moment(partnerWeightGoalRedux?.date?.to).format("DD/MM")})
                                                </Text>
                                                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(28), color: WHITE, lineHeight: _moderateScale(32) }]}>
                                                            {parseFloat(Number(partnerWeightGoalRedux?.weight?.to).toFixed(1))} kg
                                                </Text>
                                                    </View>
                                                    :
                                                    <View style={{ marginLeft: _moderateScale(8 * 2) }}>
                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                                                            Mục tiêu
                                                </Text>
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate(ScreenKey.MY_GOAL)}
                                                            style={[styleElement.rowAliCenter]}>
                                                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(22), color: WHITE, lineHeight: _moderateScale(32) }]}>
                                                                Tạo
                                                    </Text>
                                                            <Image style={[sizeIcon.md, { top: 2, transform: [{ rotate: "90deg" }] }]} source={require('../../Icon/up_arrow_white.png')} />
                                                        </TouchableOpacity>
                                                    </View>
                                            }
                                        </View>

                                        <View style={{ marginLeft: _moderateScale(8 * 2), flex: 1, alignItems: 'center', bottom: _moderateScale(8), marginRight: _moderateScale(8 * 2) }}>
                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: WHITE }]}>
                                                {moment(dateFilterTrackingWeightRedux).format('L')}
                                            </Text>

                                            <View style={[styleElement.rowAliCenter]}>

                                                <View
                                                    style={[styles.btnWeight, { opacity: 0.2 }]}>
                                                    <View style={{ width: _moderateScale(12), height: _moderateScale(2.5), backgroundColor: WHITE, borderRadius: _moderateScale(4) }} />
                                                </View>

                                                <View style={{
                                                    width: _moderateScale(100),
                                                    height: _moderateScale(60),
                                                    borderRadius: _moderateScale(8),
                                                    backgroundColor: '#34B1DF',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: _moderateScale(4),
                                                    marginHorizontal: _moderateScale(4)
                                                }}>
                                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(30), color: WHITE }]}>
                                                        {currWeight.toFixed(1)}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={[styles.btnWeight, { opacity: 0.2 }]}>
                                                    <Image style={[sizeIcon.xxs]} source={require('../../Icon/plus_white.png')} />
                                                </View>
                                            </View>
                                        </View>

                                    </View>
                                // <View style={[styleElement.rowAliCenter, { justifyContent: 'space-evenly', bottom: _moderateScale(8) }]}>
                                //     <View style={{ alignItems: 'center' }}>
                                //         <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: WHITE }]}>
                                //             {moment(dateFilterTrackingWeightRedux).format('L')}
                                //         </Text>

                                //         <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(2) }]}>
                                //             <View style={{
                                //                 width: _moderateScale(100),
                                //                 height: _moderateScale(60),
                                //                 borderRadius: _moderateScale(8),
                                //                 backgroundColor: '#34B1DF',
                                //                 justifyContent: 'center',
                                //                 alignItems: 'center',
                                //                 marginTop: _moderateScale(4),
                                //                 marginHorizontal: _moderateScale(4)
                                //             }}>
                                //                 <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(30), color: WHITE }]}>
                                //                     {currWeight.toFixed(1)}
                                //                 </Text>
                                //             </View>
                                //         </View>
                                //     </View>
                                //     <View style={{ alignItems: 'center' }}>
                                //         <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: WHITE }]}>
                                //             Mục tiêu
                                //         </Text>

                                //         <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(2) }]}>
                                //             <View style={{
                                //                 width: _moderateScale(100),
                                //                 height: _moderateScale(60),
                                //                 borderRadius: _moderateScale(8),
                                //                 backgroundColor: '#34B1DF',
                                //                 justifyContent: 'center',
                                //                 alignItems: 'center',
                                //                 marginTop: _moderateScale(4),
                                //                 marginHorizontal: _moderateScale(4)
                                //             }}>
                                //                 <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(30), color: WHITE }]}>
                                //                     {parseFloat(Number(partnerWeightGoalRedux?.weight?.to).toFixed(1))} kg
                                //                 </Text>
                                //             </View>
                                //         </View>
                                //     </View>
                                // </View>

                            }


                        </View>
                    </ImageBackground>
                    :
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic', marginLeft: _moderateScale(8 * 2) }]}>Dữ liệu rỗng</Text>
            }

        </>
    );
});

const styles = StyleSheet.create({
    btnWeight: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 3 / 2),
        borderWidth: _moderateScale(1.75),
        borderColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: _moderateScale(8)
    }
})

export default CalcuWeight;