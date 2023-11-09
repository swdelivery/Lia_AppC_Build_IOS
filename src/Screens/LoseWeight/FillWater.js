import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BLUE } from '../../Constant/Color';
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

const FillWater = memo((props) => {

    const partnerTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.partnerTrackingWeight)
    const dateFilterTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.dateFilterTrackingWeight)

    const [totalCup, setTotalCup] = useState([])
    const [mlOnCup, setMlOnCup] = useState(250)

    useEffect(() => {
        let totalCupTemp = 0

        if (partnerTrackingWeightRedux?.waterGoal?.volumePerTimes) {
            totalCupTemp = parseInt(Number(partnerTrackingWeightRedux?.water) / Number(partnerTrackingWeightRedux?.waterGoal?.volumePerTimes));
        }

        setTotalCup(Array.from(new Array(totalCupTemp)))
        console.log({ totalCupTemp });


    }, [partnerTrackingWeightRedux?.water])

    const _renderEmptyCupFill = () => {
        if ((totalCup?.length + 1) % 5 == 0) return <></>

        let xFind = 5 - (totalCup?.length + 1) % 5;
        console.log({ xFind });

        return (
            <>
                {
                    Array.from(new Array(xFind))?.map((item, index) => {
                        return (
                            <View
                                key={index}
                                onPress={() => {
                                    setTotalCup(old => {
                                        return [...old, 1]
                                    })
                                }}
                                style={{
                                    marginHorizontal: _moderateScale(8),
                                    marginBottom: _moderateScale(8),
                                    alignSelf: 'flex-start',
                                    opacity: 0
                                }}>
                                <Image style={[sizeIcon.xxlllg]} source={require('../../Icon/cup_water_empty.png')} />
                            </View>
                        )
                    })
                }

            </>
        )
    }

    const _handleAddWater = async () => {
        let result = await updatePartnerTrackingWeight({
            water: Number(partnerTrackingWeightRedux?.water + partnerTrackingWeightRedux?.waterGoal?.volumePerTimes)
        })
        if (result?.isAxiosError) return
        setTotalCup(old => {
            return [...old, 1]
        })
        store.dispatch({
            type: ActionType.UPDATE_DATA_TRACKING_WEIGHT,
            payload: {
                data: result?.data?.data
            }
        })
    }

    const _handleRemoveWater = async (index) => {

        console.log({ reduxWater: partnerTrackingWeightRedux?.water, perTime: partnerTrackingWeightRedux?.waterGoal?.volumePerTimes, totalCup: totalCup, index });


        let result = await updatePartnerTrackingWeight({
            water: Number(partnerTrackingWeightRedux?.water - (partnerTrackingWeightRedux?.waterGoal?.volumePerTimes * (totalCup?.length - index)))
        })
        if (result?.isAxiosError) return
        setTotalCup(old => {
            return [...old]?.slice(0, index)
        })
        store.dispatch({
            type: ActionType.UPDATE_DATA_TRACKING_WEIGHT,
            payload: {
                data: result?.data?.data
            }
        })
    }


    return (
        <View style={[shadow, { paddingVertical: _moderateScale(8 * 2), marginTop: _moderateScale(8), backgroundColor: WHITE, marginHorizontal: _moderateScale(8 * 2), borderRadius: _moderateScale(8) }]}>
            <View style={{ alignItems: 'center' }}>
                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                    Mục tiêu: {partnerTrackingWeightRedux?.waterGoal?.volumeWaterGoal} ml
                </Text>

                <Text style={[stylesFont.fontNolan500, { marginVertical: _moderateScale(8), fontSize: _moderateScale(20), color: BLUE_FB }]}>
                    {/* {totalCup?.length * mlOnCup} ml */}
                    {partnerTrackingWeightRedux?.water} ml
                </Text>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: _moderateScale(16), justifyContent: 'center', marginTop: _moderateScale(8) }}>
                {
                    totalCup?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                disabled={moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ? false : true}
                                key={index}
                                onPress={() => {
                                    // setTotalCup(old => {
                                    //     return [...old]?.slice(0, index + 1)
                                    // })
                                    _handleRemoveWater(index + 1)
                                }}
                                style={{
                                    marginHorizontal: _moderateScale(8),
                                    marginBottom: _moderateScale(8),
                                    alignSelf: 'flex-start'
                                }}>
                                <Image style={[sizeIcon.xxlllg]} source={require('../../Icon/cup_water_full.png')} />
                            </TouchableOpacity>
                        )
                    })
                }
                <TouchableOpacity
                    disabled={moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ? false : true}
                    onPress={() => {
                        // setTotalCup(old => {
                        //     return [...old, 1]
                        // })
                        _handleAddWater()
                    }}
                    style={{
                        marginHorizontal: _moderateScale(8),
                        marginBottom: _moderateScale(8),
                        alignSelf: 'flex-start'
                    }}>
                    <Image style={[sizeIcon.xxlllg]} source={require('../../Icon/cup_water_empty.png')} />
                </TouchableOpacity>
                {
                    _renderEmptyCupFill()
                }


                {/* <View style={{flex:1}}></View> */}
                {/* {
                    totalCup?.length % 4 !== 0 ? 
                    <TouchableOpacity
                    onPress={() => {
                        setTotalCup(old => {
                            return [...old]?.slice(0, index + 1)
                        })
                    }}
                    style={{
                        marginHorizontal:_moderateScale(8),
                        marginBottom:_moderateScale(8),
                    }}>
                    <Image style={[sizeIcon.xxlllg]} source={require('../../Icon/cup_water_full.png')}/>
                </TouchableOpacity>
                :<></>
                } */}
            </View>


            {/* {
                partnerTrackingWeightRedux?.water ?
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(20), color: "#03BCE4" }]}>
                        {partnerTrackingWeightRedux?.water} ml
                            </Text>
                    :
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(20), color: "#03BCE4" }]}>
                        0
                    </Text>
            }

            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>Đề xuất:
                <Text style={{ color: "#EC3A79" }}>
                    2.500 ml
                </Text>
            </Text> */}


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

export default FillWater;