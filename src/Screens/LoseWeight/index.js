import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BLACK } from '../../Constant/Color';
import { randomStringFixLengthCode, alertCustomNotAction } from '../../Constant/Utils';
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
import { getCurrentPartnerTrackingWeight, getOnePartnerTrackingWeight, getDataPartnerFood, getDataPartnerActivity, updatePartnerTrackingWeight, getCurrPartnerWeightGoal, getAssetsLoseWeight } from '../../Redux/Action/LoseWeightAction';
import moment from 'moment'
import CalcuWeight from './CalcuWeight';
import ModalBottomAddWaterToMenu from './Components/ModalBottomAddWaterToMenu';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import FillWater from './FillWater';
import AnimatedBtnPlus from './Components/AnimatedBtnPlus';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ItemMenu from './ItemMenu';

const index = memo((props) => {
    const dispatch = useDispatch()


    const dateFilterTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.dateFilterTrackingWeight)
    const foodPartnerMenuRedux = useSelector(state => state.loseWeightReducer?.foodPartnerMenu)
    const activityPartnerMenuRedux = useSelector(state => state.loseWeightReducer?.activityPartnerMenu)
    const partnerTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.partnerTrackingWeight)

    const [showModalAddWaterToMenu, setShowModalAddWaterToMenu] = useState(false)

    const [isShowExpandPlus, setShowExpandPlus] = useState(false)

    const [listAssetLoseWeight, setListAssetLoseWeight] = useState([])

    const [noteWeightLose, setNoteWeightLose] = useState('')

    useEffect(() => {
        _getCurrPartnerWeightGoal()
        _getAssetsLoseWeight()

        if (moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day')) {
            dispatch(getCurrentPartnerTrackingWeight({
            }))
        } else {
            dispatch(getOnePartnerTrackingWeight({
                condition: {
                    dateCode: {
                        equal: moment(dateFilterTrackingWeightRedux).format('YYYY/MM/DD')
                    }
                }
            }))
        }

        dispatch(getDataPartnerFood({
            condition: {
                dateCode: {
                    equal: moment(dateFilterTrackingWeightRedux).format('YYYY/MM/DD')
                }
            }
        }))
        dispatch(getDataPartnerActivity({
            condition: {
                dateCode: {
                    equal: moment(dateFilterTrackingWeightRedux).format('YYYY/MM/DD')
                }
            }
        }))


    }, [dateFilterTrackingWeightRedux])

    useEffect(() => {
        setNoteWeightLose(partnerTrackingWeightRedux?.note)
    }, [partnerTrackingWeightRedux?.note])

    const _handleAddFoodMorning = () => {
        navigation.navigate(ScreenKey.ADD_FOOD, { session: 'morning' })
    }
    const _handleAddFoodMidday = () => {
        navigation.navigate(ScreenKey.ADD_FOOD, { session: 'noon' })
    }
    const _handleAddFoodNight = () => {
        navigation.navigate(ScreenKey.ADD_FOOD, { session: 'evening' })
    }
    const _handleAddFoodSnack = () => {
        navigation.navigate(ScreenKey.ADD_FOOD, { session: 'snack' })
    }

    const _confirmAddWater = async (data) => {
        let result = await updatePartnerTrackingWeight({
            water: Number(partnerTrackingWeightRedux?.water + data?.size)
        })
        store.dispatch({
            type: ActionType.UPDATE_DATA_TRACKING_WEIGHT,
            payload: {
                data: result?.data?.data
            }
        })
        setShowModalAddWaterToMenu(false)

    }

    const _getCurrPartnerWeightGoal = async () => {
        let result = await getCurrPartnerWeightGoal();
        if (result?.isAxiosError) return
        store.dispatch({
            type: ActionType.SAVE_DATA_TRACKING_WEIGHT_GOAL,
            payload: {
                data: result?.data?.data
            }
        })
    }

    const _getAssetsLoseWeight = async () => {
        let result = await getAssetsLoseWeight({
            "condition": {
                'type': {
                    'equal': 'emotion'
                }
            },
            "sort": {
                "created": 1
            },
            "limit": 100,
            "page": 1
        });
        if (result?.isAxiosError) return
        setListAssetLoseWeight(result?.data?.data)
    }

    const _handleUpdateEmotion = async (item) => {

        let listEmotionTemp = [...partnerTrackingWeightRedux?.emotionCodeArr];

        if (!listEmotionTemp.includes(item?.code)) {          //checking weather array contain the id
            listEmotionTemp.push(item?.code);               //adding to array because value doesnt exists
        } else {
            listEmotionTemp.splice(listEmotionTemp.indexOf(item?.code), 1);  //deleting
        }

        let result = await updatePartnerTrackingWeight({
            emotionCodeArr: listEmotionTemp
        })
        if (result?.isAxiosError) return
        store.dispatch({
            type: ActionType.UPDATE_DATA_TRACKING_WEIGHT,
            payload: {
                data: result?.data?.data
            }
        })
    }
    const _handleUpdateNote = async () => {
        let result = await updatePartnerTrackingWeight({
            note: noteWeightLose
        })
        if (result?.isAxiosError) return
        store.dispatch({
            type: ActionType.UPDATE_DATA_TRACKING_WEIGHT,
            payload: {
                data: result?.data?.data
            }
        })
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />

            <ModalBottomAddWaterToMenu
                confirmAdd={_confirmAddWater}
                hide={() => {
                    setShowModalAddWaterToMenu(false)
                }}
                show={showModalAddWaterToMenu} />

            <Header hasSetting title={"Nhật ký hằng ngày"} />

            <KeyboardAwareScrollView>
                <CalendarChartCard style={{ marginTop: _moderateScale(8 * 2) }} />

                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 4) }]}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8, flex: 1 }]}>
                        Thực đơn hằng ngày
                    </Text>
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(12), color: BLACK_OPACITY_8 }]}>
                        (Đơn vị tính: Carlory)
                    </Text>
                </View>

                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 3), justifyContent: 'space-between', marginTop: _moderateScale(8 * 2) }]}>
                    <ItemMenu data={foodPartnerMenuRedux} clickAdd={_handleAddFoodMorning} flag={'morning'} title={'Buổi sáng'} />
                    <View style={{ width: _moderateScale(8 * 3) }} />
                    <ItemMenu data={foodPartnerMenuRedux} clickAdd={_handleAddFoodMidday} flag={'noon'} title={'Buổi trưa'} />
                </View>
                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 3), justifyContent: 'space-between', marginTop: _moderateScale(8 * 3) }]}>
                    <ItemMenu data={foodPartnerMenuRedux} clickAdd={_handleAddFoodNight} flag={'evening'} title={'Buổi tối'} />
                    <View style={{ width: _moderateScale(8 * 3) }} />
                    <ItemMenu data={foodPartnerMenuRedux} clickAdd={_handleAddFoodSnack} flag={'snack'} title={'Ăn vặt'} />
                </View>

                {/* ?.filter(item => item?.session == 'morning')
?.filter(item => item?.session == 'noon')
?.filter(item => item?.session == 'evening')
?.filter(item => item?.session == 'snack') */}

                {/*                     
                <ListMenu data={foodPartnerMenuRedux?.filter(item => item?.session == 'morning')} clickAdd={_handleAddFoodMorning} flag={'morning'} title={'Buổi sáng'} style={{ marginTop: _moderateScale(8 * 1) }} />

                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    <View style={[styleElement.lineHorizontal, { marginVertical: _moderateScale(8 * 2) }]} />
                </View>

                <ListMenu data={foodPartnerMenuRedux?.filter(item => item?.session == 'noon')} clickAdd={_handleAddFoodMidday} flag={'midday'} title={'Buổi trưa'} style={{ marginTop: _moderateScale(0) }} />

                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    <View style={[styleElement.lineHorizontal, { marginVertical: _moderateScale(8 * 2) }]} />
                </View>

                <ListMenu data={foodPartnerMenuRedux?.filter(item => item?.session == 'evening')} clickAdd={_handleAddFoodNight} flag={'night'} title={'Buổi tối'} style={{ marginTop: _moderateScale(0) }} />

                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    <View style={[styleElement.lineHorizontal, { marginVertical: _moderateScale(8 * 2) }]} />
                </View>

                <ListMenu data={foodPartnerMenuRedux?.filter(item => item?.session == 'snack')} clickAdd={_handleAddFoodSnack} flag={'snack'} title={'Ăn vặt'} style={{ marginTop: _moderateScale(0) }} /> */}

                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 4) }]}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8, flex: 1 }]}>
                        Hoạt động hôm nay
                    </Text>

                    {
                        moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ?
                            <TouchableOpacity onPress={() => {
                                navigation.navigate(ScreenKey.LIST_ACTIVITY_TO_ADD)
                            }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLUE_FB }]}>Thêm</Text>
                            </TouchableOpacity>
                            : <></>
                    }


                </View>

                {
                    partnerTrackingWeightRedux?._id ?
                        <>
                            <View style={{ height: _moderateScale(8) }} />
                            <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                                <ListActivity data={activityPartnerMenuRedux} />
                            </View>
                        </>
                        :
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic', marginLeft: _moderateScale(8 * 2) }]}>Dữ liệu rỗng</Text>


                }


                <CalcuWeight />

                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 4) }]}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8, flex: 1 }]}>
                        Uống nước
                    </Text>

                    {/* {
                        moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ?
                            <TouchableOpacity onPress={() => {
                                setShowModalAddWaterToMenu(true)
                            }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLUE_FB }]}>Thêm</Text>
                            </TouchableOpacity>
                            : <></>
                    } */}

                </View>
                {
                    partnerTrackingWeightRedux?._id ?
                        <FillWater />
                        :
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic', marginLeft: _moderateScale(8 * 2) }]}>Dữ liệu rỗng</Text>
                }

                <View style={[{ marginTop: _moderateScale(8 * 4), marginHorizontal: _moderateScale(8 * 2) }]}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8, flex: 1 }]}>
                        Tâm trạng
                    </Text>

                    <View style={{
                        minHeight: _moderateScale(8 * 10),
                        backgroundColor: BG_GREY_OPACITY_2,
                        marginTop: _moderateScale(8),
                        borderRadius: _moderateScale(8),
                        padding: _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 1.5),
                    }}>
                        <TextInput
                            editable={moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ? true : false}
                            // defaultValue={noteWeightLose}
                            onBlur={_handleUpdateNote}
                            onChangeText={value => {
                                setNoteWeightLose(value)
                            }}
                            value={noteWeightLose}
                            placeholder={'vd: Chạy vòng quanh công viên'}
                            multiline
                            style={{
                                flex: 1,
                                fontSize: _moderateScale(14)
                            }} />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: _moderateScale(8 * 2) }}>
                        {
                            listAssetLoseWeight?.map((item, index) => {
                                if (partnerTrackingWeightRedux?.emotionCodeArr?.find(itemFind => itemFind == item?.code)) {
                                    return (
                                        <TouchableOpacity
                                            disabled={moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ? false : true}
                                            onPress={() => _handleUpdateEmotion(item)}
                                            style={[styles.btnAssetNotActive, { backgroundColor: BLUE_FB }]}>
                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>{item?.name}</Text>
                                        </TouchableOpacity>
                                    )
                                } else {
                                    return (
                                        <TouchableOpacity
                                            disabled={moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ? false : true}
                                            onPress={() => _handleUpdateEmotion(item)}
                                            style={styles.btnAssetNotActive}>
                                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: BLACK }]}>{item?.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </KeyboardAwareScrollView>
            {/* {
                isShowExpandPlus ?
                    <View style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(33, 33, 33,.5)', position: 'absolute', zIndex: 0 }}>
                        <TouchableOpacity onPress={() => setShowExpandPlus(old => {
                            return !old
                        })} style={{ flex: 1 }}>

                        </TouchableOpacity>
                    </View>
                    : <></>
            }

            <View style={{ alignItems: 'center', bottom: getBottomSpace() > 0 ? getBottomSpace() : _moderateScale(8 * 2) }}>
                <AnimatedBtnPlus show={isShowExpandPlus} onPress={() => {
                    setShowExpandPlus(old => {
                        return !old
                    })
                }} />
            </View> */}


        </View>
    );
});



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,

    elevation: 5
}


const styles = StyleSheet.create({
    btnAssetNotActive: {
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8),
        backgroundColor: BG_GREY_OPACITY_5,
        marginRight: _moderateScale(8),
        marginBottom: _moderateScale(8)
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})

export default index;