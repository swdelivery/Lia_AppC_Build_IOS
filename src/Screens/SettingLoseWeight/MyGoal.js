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
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import { navigation } from '../../../rootNavigation';
import ModalPickSingleNotSearch from '../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import DialogConfirmInput from '../../Components/Dialog/ConfirmTextInput';
import { getHealthRecord } from '../../Redux/Action/ProfileAction';
import CalendarPickSingle from '../../Components/CalendarPickSingle/CalendarPickSingle'
import moment from 'moment'
import BottomBtn from '../../Components/BottomBtn/BottomBtn';
import { createPartnerWeightGoal, getCurrPartnerWeightGoal } from '../../Redux/Action/LoseWeightAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
const listType = [
    {
        type: 'WEIGHT_LOSS',
        name: 'Giảm cân',
        _id: '1'
    },
    {
        type: 'WEIGHT_GAIN',
        name: 'Tăng cân',
        _id: '2'
    },
    {
        type: 'WEIGHT_MAINTAIN',
        name: 'Giữ cân',
        _id: '3'
    }
]

const MyGoal = memo((props) => {
    const dateFilterTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.dateFilterTrackingWeight)

    const [showModalPickType, setShowModalPickType] = useState(false)
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [showModalCalendar, setShowModalCalendar] = useState(false)


    const [typeGoal, setTypeGoal] = useState({})


    const [dataForFetch, setDataForFetch] = useState({
        "type": null,
        "date": {
            "from": new Date(),
            "to": null
        },
        "weight": {
            "from": 45,
            "to": null
        }
    })


    useEffect(() => {

        _getCurrPartnerWeightGoal()
    }, [])

    const _getCurrPartnerWeightGoal = async () => {
        let result = await getCurrPartnerWeightGoal();
        if (result?.isAxiosError) return
        if (result?.data?.data?._id) {
            setDataForFetch(old => {
                return {
                    ...old,
                    type: listType?.find(item => item?.type == result?.data?.data?.type),
                    date: {
                        from: new Date(),
                        to: result?.data?.data?.date?.to
                    },
                    weight: {
                        from: result?.data?.data?.weight?.from,
                        to: result?.data?.data?.weight?.to
                    }
                }
            })
        }else{
            _getHealRecord()
        }


    }

    const _getHealRecord = async () => {
        let result = await getHealthRecord()
        if (result?.isAxiosError) return
        setDataForFetch(old => {
            return {
                ...old,
                weight: {
                    ...old.weight,
                    from: result?.basicInfo?.weight
                }
            }
        })

    }

    const _handleConfirmPickDate = (date) => {
        setDataForFetch(old => {
            return {
                ...old,
                date: {
                    ...old.date,
                    to: date
                }
            }
        })
        setShowModalCalendar(false)
    }
    console.log({ dataForFetch });

    const _handleCreatePartnerWeightGoal = async () => {

        if (!dataForFetch?.date?.to || !dataForFetch?.weight?.to) {
            return alertCustomNotAction('Lỗi', 'Nhập đầy đủ các trường cần thiết')
        }
        let result = await createPartnerWeightGoal(dataForFetch);
        if (moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day')) {
            console.log('trung');
            store.dispatch({
                type: ActionType.UPDATE_DATA_TRACKING_WEIGHT_GOAL,
                payload: {
                    data: result?.data?.data?.weightGoal
                }
            })
            store.dispatch({
                type: ActionType.SAVE_DATA_TRACKING_WEIGHT_GOAL,
                payload: {
                    data: result?.data?.data?.weightGoal
                }
            })
        }else{
            console.log('not trung');
        } 

    }


    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <CalendarPickSingle
                minDate={new Date()}
                confirm={_handleConfirmPickDate}
                setShowModalCalendar={(flag) => {
                    setShowModalCalendar(flag)
                }} show={showModalCalendar} />

            <DialogConfirmInput
                typeNumber
                title={"Thay đổi"}
                message={"Nhập số cân \n vào bên dưới"}
                value={``}
                handleCancel={() => {
                    setDialogVisible(false)
                }}
                handleConfirm={(textInput) => {
                    // _confirmAddAction(textInput)
                    textInput = textInput?.split(',').join('.')
                    if (isNaN(Number(textInput))) {
                        return alertCustomNotAction(`Lỗi`, `Sai định dạng`)
                    }
                    setDataForFetch(old => {
                        return {
                            ...old,
                            weight: {
                                ...old.weight,
                                to: Number(textInput)
                            }
                        }
                    })
                    setDialogVisible(false)
                }}
                visible={isDialogVisible} />

            <ModalPickSingleNotSearch
                hide={() => {
                    setShowModalPickType(false)
                }}
                onSelect={(item) => {
                    setDataForFetch(old => {
                        return {
                            ...old,
                            type: item
                        }
                    })
                }}
                data={listType} show={showModalPickType} />

            <Header title={"Mục tiêu của tôi"} />
            <ScrollView>
                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => setShowModalPickType(true)}
                            style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                            <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    Mục tiêu
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
                    </View>

                    <View>
                        <TouchableOpacity
                            activeOpacity={0}
                            disabled
                            style={[styleElement.rowAliCenter, { marginVertical: _moderateScale(8 * 1.5) }]}>
                            <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    Cân bắt đầu
                            </Text>
                            </View>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                {parseFloatNumber(dataForFetch?.weight?.from, 2)} kg
                        </Text>
                            <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                        </TouchableOpacity>
                        <View style={{ width: "100%", marginTop: _moderateScale(0), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setDialogVisible(true)
                            }}
                            style={[styleElement.rowAliCenter, { marginVertical: _moderateScale(8 * 1.5) }]}>
                            <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    Cân mục tiêu
                            </Text>
                            </View>
                            {
                                dataForFetch?.weight?.to ?
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                        {parseFloatNumber(dataForFetch?.weight?.to, 2)} kg
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

                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalCalendar(true)
                            }}
                            style={[styleElement.rowAliCenter, { marginVertical: _moderateScale(8 * 1.5) }]}>
                            <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    Thời gian dự kiến
                            </Text>
                            </View>
                            {
                                dataForFetch?.date?.to ?
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                        đến {moment(dataForFetch?.date?.to).format('DD/MM/YYYY')}
                                    </Text>
                                    :
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginRight: _moderateScale(8) }]}>
                                        Chọn
                                </Text>
                            }

                            <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                        </TouchableOpacity>
                        <View style={{ width: "100%", marginTop: _moderateScale(0), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                    </View>

                </View>
            </ScrollView>
            <BottomBtn submit={_handleCreatePartnerWeightGoal} title={"Xác nhận"} />

        </View>
    );
});

MyGoal.propTypes = {

};

export default MyGoal;