import React, { useRef, memo, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BASE_COLOR, GREY_FOR_TITLE, BTN_PRICE, GREEN_SUCCESS, BLUE_FB, BLUE } from '../../Constant/Color';
import { randomStringFixLengthCode, parseFloatNumber } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'

// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CalendarPickSingle from '../../Components/CalendarPickSingle/CalendarPickSingle'
import moment from 'moment'
import { navigation } from '../../../rootNavigation';

const CalendarChartCard = memo((props) => {

    const dateFilterTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.dateFilterTrackingWeight)
    const partnerTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.partnerTrackingWeight)

    const [showModalCalendar, setShowModalCalendar] = useState(false)



    const _handleConfirmPickDate = (date) => {
        store.dispatch({
            type: ActionType.SET_DATE_FILTER_TRACKING_WEIGHT,
            payload: {
                data: date
            }
        })
        setShowModalCalendar(false)
    }

    const _renderColor = (number) => {

        let percent = (Number(partnerTrackingWeightRedux?.caloIntake) - Number(partnerTrackingWeightRedux?.caloBurned)) / parseInt(Number(partnerTrackingWeightRedux?.weightGoal?.tdeeGoal ? partnerTrackingWeightRedux?.weightGoal?.tdeeGoal : partnerTrackingWeightRedux?.medicalIndex?.tdee)) * 100

        // if (percent > 100) return RED
        // if (percent > 90 && percent <= 95) return 'rgba(221, 0, 63,0.7)'
        if (percent > 70 ) return GREEN_SUCCESS
        if (percent > 50 && percent <= 70) return 'rgba(98, 189, 80,0.9)'
        if (percent > 30 && percent <= 50) return 'rgba(98, 189, 80,0.8)'
        if (percent > 0 && percent <= 30) return 'rgba(98, 189, 80,0.7)'
    }

    return (
        <>
            <CalendarPickSingle
                // minDate
                maxDate={new Date()}
                confirm={_handleConfirmPickDate}
                setShowModalCalendar={(flag) => {
                    setShowModalCalendar(flag)
                }} show={showModalCalendar} />

            <View style={[styles.container, props.style]}>
                <TouchableOpacity
                    onPress={() => {
                        setShowModalCalendar(true)
                    }}
                    style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Image style={[sizeIcon.llg]} source={require('../../Icon/calendar_black.png')} />
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }]}>
                        {
                            moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ?
                                `Hôm nay`
                                :
                                moment(dateFilterTrackingWeightRedux).format('DD-MM-YYYY')
                        }
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.CHART_RP_CARLO)
                    }}
                    style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Image style={[sizeIcon.lg]} source={require('../../Icon/chart_black.png')} />
                </TouchableOpacity>
            </View>

            <ImageBackground
                style={{ marginHorizontal: _moderateScale(8 * 2), borderRadius: _moderateScale(8 * 1.5), backgroundColor: BG_GREY_OPACITY_5, height: _moderateScale(180), marginTop: _moderateScale(8), justifyContent: 'flex-end' }}
                imageStyle={{ borderRadius: _moderateScale(8 * 1.5) }}
                source={require('../../Icon/linearBG.png')}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: _moderateScale(0) }}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={[stylesFont.fontNolan500, styles.textLarge]}>{
                            partnerTrackingWeightRedux?.caloIntake ?
                                parseFloat(Number(partnerTrackingWeightRedux?.caloIntake).toFixed(1))
                                : 0
                        }</Text>
                        <Text style={[stylesFont.fontNolan500, styles.textMedium]}>Nạp vào</Text>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <View style={{}}>
                            {/* <AnimatedCircularProgress
                                size={_moderateScale(115)}
                                width={_moderateScale(5)}
                                backgroundWidth={_moderateScale(3)}
                                fill={
                                    partnerTrackingWeightRedux?.caloIntake ?
                                        (Number(partnerTrackingWeightRedux?.caloIntake) - Number(partnerTrackingWeightRedux?.caloBurned)) / parseInt(Number(partnerTrackingWeightRedux?.weightGoal?.tdeeGoal ? partnerTrackingWeightRedux?.weightGoal?.tdeeGoal : partnerTrackingWeightRedux?.medicalIndex?.tdee)) * 100
                                        : 0
                                }
                                tintColor={_renderColor()}
                                // tintColor={GREEN_SUCCESS}
                                // tintColorSecondary={RED}
                                backgroundColor={BG_GREY_OPACITY_5}
                                arcSweepAngle={240}
                                rotation={240}
                                lineCap="round"
                            >
                                {
                                    (fill) => (
                                        <View style={{ alignItems: 'center' }}>
                                            {
                                                partnerTrackingWeightRedux?.caloIntake || partnerTrackingWeightRedux?.caloBurned ?
                                                    <Text style={[stylesFont.fontNolan500, styles.textLarge]}>
                                                        {
                                                            parseFloat(Number(partnerTrackingWeightRedux?.caloIntake) - Number(partnerTrackingWeightRedux?.caloBurned).toFixed(1))
                                                        }
                                                    </Text>
                                                    :
                                                    <Text style={[stylesFont.fontNolan500, styles.textLarge]}>
                                                        {
                                                            0
                                                        }
                                                    </Text>
                                            }

                                            <Text style={[stylesFont.fontNolan500, styles.textMedium]}>
                                                {
                                                    partnerTrackingWeightRedux?.weightGoal?._id ?
                                                        parseFloatNumber(partnerTrackingWeightRedux?.weightGoal?.tdeeGoal)
                                                        :
                                                        <>
                                                            {
                                                                partnerTrackingWeightRedux?.medicalIndex?.tdee ?
                                                                    parseFloatNumber(partnerTrackingWeightRedux?.medicalIndex?.tdee)
                                                                    : 0
                                                            }
                                                        </>
                                                }
                                            </Text>
                                        </View>
                                    )
                                }
                            </AnimatedCircularProgress> */}
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={[stylesFont.fontNolan500, styles.textLarge]}>{
                            partnerTrackingWeightRedux?.caloBurned ?
                                parseFloat(Number(partnerTrackingWeightRedux?.caloBurned).toFixed(1))
                                : 0
                        }</Text>
                        <Text style={[stylesFont.fontNolan500, styles.textMedium]}>Đốt cháy</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: _moderateScale(8 * 2) }}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={[stylesFont.fontNolan500, styles.textLarge, { fontSize: _moderateScale(14) }]}>Carbs</Text>
                        {
                            partnerTrackingWeightRedux?.carbohyrate ?
                                <Text style={[stylesFont.fontNolan500, styles.textMedium]}>
                                    {
                                        parseFloat(Number(partnerTrackingWeightRedux?.carbohyrate).toFixed(0))
                                    }
                                     {/* \ {
                                        parseFloat(Number(Number(partnerTrackingWeightRedux?.carbohyrate) + Number(partnerTrackingWeightRedux?.protein) + Number(partnerTrackingWeightRedux?.fat)).toFixed(0))
                                    }g */}
                                    </Text>
                                :
                                <Text style={[stylesFont.fontNolan500, styles.textMedium]}>
                                    0
                                </Text>
                        }

                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={[stylesFont.fontNolan500, styles.textLarge, { fontSize: _moderateScale(14) }]}>Protein</Text>
                        {
                            partnerTrackingWeightRedux?.protein ?
                                <Text style={[stylesFont.fontNolan500, styles.textMedium]}>
                                    {
                                        parseFloat(Number(partnerTrackingWeightRedux?.protein).toFixed(0))
                                    }
                                     {/* \ {
                                        parseFloat(Number(Number(partnerTrackingWeightRedux?.carbohyrate) + Number(partnerTrackingWeightRedux?.protein) + Number(partnerTrackingWeightRedux?.fat)).toFixed(0))
                                    }g */}
                                </Text>
                                :
                                <Text style={[stylesFont.fontNolan500, styles.textMedium]}>
                                    0
                            </Text>
                        }

                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={[stylesFont.fontNolan500, styles.textLarge, { fontSize: _moderateScale(14) }]}>Fat</Text>
                        {
                            partnerTrackingWeightRedux?.fat ?
                                <Text style={[stylesFont.fontNolan500, styles.textMedium]}>
                                    {
                                        parseFloat(Number(partnerTrackingWeightRedux?.fat).toFixed(0))
                                    } 
                                     {/* \ {
                                        parseFloat(Number(Number(partnerTrackingWeightRedux?.carbohyrate) + Number(partnerTrackingWeightRedux?.protein) + Number(partnerTrackingWeightRedux?.fat)).toFixed(0))
                                    }g */}
                                </Text>
                                :
                                <Text style={[stylesFont.fontNolan500, styles.textMedium]}>
                                    0
                                </Text>
                        }

                    </View>
                </View>

            </ImageBackground>
        </>
    );
});


const styles = StyleSheet.create({
    textMedium: {
        fontSize: _moderateScale(14), color: WHITE
    },
    textLarge: {
        fontSize: _moderateScale(26), color: WHITE
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: _moderateScale(8 * 2)
    }
})

export default CalendarChartCard;