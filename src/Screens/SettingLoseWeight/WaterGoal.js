import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE } from '../../Constant/Color';
import { randomStringFixLengthCode, alertCustomNotAction, parseFloatNumber } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import { navigation } from '../../../rootNavigation';
import ModalPickSingleNotSearch from '../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import DialogConfirmInput from '../../Components/Dialog/ConfirmTextInput';
import { getHealthRecord } from '../../Redux/Action/ProfileAction';
import CalendarPickSingle from '../../Components/CalendarPickSingle/CalendarPickSingle'
import moment from 'moment'
import BottomBtn from '../../Components/BottomBtn/BottomBtn';
import { createPartnerWeightGoal, getCurrPartnerWeightGoal, updatePartnerWaterGoal } from '../../Redux/Action/LoseWeightAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';


const WaterGoal = memo((props) => {
    const dateFilterTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.dateFilterTrackingWeight)
    const partnerTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.partnerTrackingWeight)

    const [showModalPickType, setShowModalPickType] = useState(false)
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [isDialogVisible2, setDialogVisible2] = useState(false)
    const [showModalCalendar, setShowModalCalendar] = useState(false)



    const [dataForFetch, setDataForFetch] = useState({
        "times": 10,
        "volumePerTimes": 250
    })

    useEffect(() => {
        if (partnerTrackingWeightRedux?.waterGoal?._id) {
            setDataForFetch(old => {
                return {
                    ...old,
                    times: partnerTrackingWeightRedux?.waterGoal?.times,
                    volumePerTimes: partnerTrackingWeightRedux?.waterGoal?.volumePerTimes,
                }
            })
        }
    }, [partnerTrackingWeightRedux?.waterGoal])



    const _handleUpdatePartnerWaterGoal = async () => {

        if (!dataForFetch?.times || !dataForFetch?.volumePerTimes) {
            return alertCustomNotAction('Lỗi', 'Nhập đầy đủ các trường cần thiết')
        }
        let result = await updatePartnerWaterGoal(dataForFetch);
        if (moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day')) {
            console.log('trung');
            store.dispatch({
                type: ActionType.UPDATE_DATA_TRACKING_WATER_GOAL,
                payload: {
                    data: result?.data?.data?.waterGoal
                }
            })
            // store.dispatch({
            //     type: ActionType.SAVE_DATA_TRACKING_WEIGHT_GOAL,
            //     payload: {
            //         data: result?.data?.data
            //     }
            // })
        } else {
            console.log('not trung');
        }

    }


    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <DialogConfirmInput
                typeNumber
                title={"Thay đổi"}
                message={"Nhập số lần uống \n vào bên dưới"}
                value={``}
                handleCancel={() => {
                    setDialogVisible(false)
                }}
                handleConfirm={(textInput) => {
                    textInput = textInput?.split(',').join('.')
                    if (isNaN(Number(parseInt(textInput)))) {
                        return alertCustomNotAction(`Lỗi`, `Sai định dạng`)
                    }
                    setDataForFetch(old => {
                        return {
                            ...old,
                            times: Number(parseInt(textInput))
                        }
                    })
                    setDialogVisible(false)
                }}
                visible={isDialogVisible} />
            <DialogConfirmInput
                typeNumber
                title={"Thay đổi"}
                message={"Nhập dung tích \n vào bên dưới"}
                value={``}
                handleCancel={() => {
                    setDialogVisible2(false)
                }}
                handleConfirm={(textInput) => {
                    textInput = textInput?.split(',').join('.')
                    if (isNaN(Number(parseInt(textInput)))) {
                        return alertCustomNotAction(`Lỗi`, `Sai định dạng`)
                    }
                    setDataForFetch(old => {
                        return {
                            ...old,
                            volumePerTimes: Number(parseInt(textInput))
                        }
                    })
                    setDialogVisible2(false)
                }}
                visible={isDialogVisible2} />

            <Header title={"Mục tiêu uống nước"} />
            <ScrollView>
                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                    {/* <View>
                        <TouchableOpacity
                            onPress={() => setShowModalPickType(true)}
                            style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                            <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    Tổng dung tích (ml)
                                </Text>
                            </View>
                            {
                                dataForFetch?.type?.name ?
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                        {dataForFetch?.type?.name}
                                    </Text>
                                    :
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                        Chọn
                                </Text>
                            }
                            <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                        </TouchableOpacity>
                        <View style={{ width: "100%", marginTop: _moderateScale(0), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                    </View> */}

                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setDialogVisible(true)
                            }}
                            style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                            <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    Số lần uống (lượt)
                                </Text>
                            </View>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                {parseFloatNumber(dataForFetch?.times)}
                            </Text>
                            <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                        </TouchableOpacity>
                        <View style={{ width: "100%", marginTop: _moderateScale(0), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setDialogVisible2(true)
                            }}
                            style={[styleElement.rowAliCenter, { marginVertical: _moderateScale(8 * 1.5) }]}>
                            <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    Dung tích / lần uống (ml)
                            </Text>
                            </View>
                            {
                                dataForFetch?.volumePerTimes ?
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                        {parseFloatNumber(dataForFetch?.volumePerTimes)}
                                    </Text>
                                    :
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                        Nhập
                                </Text>
                            }

                            <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                        </TouchableOpacity>
                        <View style={{ width: "100%", marginTop: _moderateScale(0), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                    </View>

                </View>
            </ScrollView>
            <BottomBtn submit={_handleUpdatePartnerWaterGoal} title={"Xác nhận"} />

        </View>
    );
});


export default WaterGoal;