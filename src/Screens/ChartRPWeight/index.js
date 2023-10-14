import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, processColor, Platform } from 'react-native';


import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREEN_SUCCESS, BASE_COLOR, GREY_FOR_TITLE } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import LinearGradient from 'react-native-linear-gradient';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import ChartSingle from '../../Components/Chart/ChartSingleColumn';
import moment from 'moment'
import { getReportPartnerTrackingWeight } from '../../Redux/Action/LoseWeightAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import CalendarFilterRange from '../../Components/CalendarPickMulti/CalendarPickMulti'
import _isEmpty from 'lodash/isEmpty'


const index = memo((props) => {
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const partnerWeightGoalRedux = useSelector(state => state.loseWeightReducer?.partnerWeightGoal)

    const [animationChart, setAnimationChart] = useState({
        durationY: 1000,
        easingY: "EaseInBack",
        random: Math.random()
    })

    const [currTabView, setCurrTabView] = useState('1')

    const [dataRP, setDataRP] = useState([])


    const [data, setData] = useState([
        { _id: '1', data: new Date('2021-08-01'), value: 100 },
        { _id: '2', data: new Date('2021-08-02'), value: 110 },
        { _id: '3', data: new Date('2021-08-03'), value: 120 },
        { _id: '4', data: new Date('2021-08-04'), value: 130 },
        { _id: '5', data: new Date('2021-08-05'), value: 140 },
        { _id: '6', data: new Date('2021-08-05'), value: 150 },
        { _id: '7', data: new Date('2021-08-05'), value: 160 },
        { _id: '8', data: new Date('2021-08-05'), value: 170 },
    ])

    const [showModalCalendar, setShowModalCalendar] = useState(false)
    const [selectedStartDate, setSelectedStartDate] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState('')

    const [rangeFilterDate, setRangeFilterDate] = useState({})

    useEffect(() => {
        _getRpTrackingWeight()
    }, [currTabView, rangeFilterDate])

    const getMonday = (d) => {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    const _getRpTrackingWeight = async () => {

        if (currTabView == '1') {
            let result = await getReportPartnerTrackingWeight({
                condition: {
                    partnerId: {
                        equal: infoUserRedux?._id
                    },
                    created: {
                        from: new Date(),
                        to: new Date()
                    }
                },
                sort: {
                    created: 1
                }
            })
            if (result?.isAxiosError) return
            setDataRP(result?.data?.data)
        }
        if (currTabView == '2') {
            let result = await getReportPartnerTrackingWeight({
                condition: {
                    partnerId: {
                        equal: infoUserRedux?._id
                    },
                    created: {
                        from: getMonday(new Date()),
                        to: new Date()
                    }
                },
                sort: {
                    created: 1
                }
            })
            if (result?.isAxiosError) return
            setDataRP(result?.data?.data)
        }
        if (currTabView == '3') {
            let result = await getReportPartnerTrackingWeight({
                condition: {
                    partnerId: {
                        equal: infoUserRedux?._id
                    },
                    created: {
                        from: new Date(moment().startOf('month').format('YYYY-MM-DD')),
                        to: new Date()
                    }
                },
                sort: {
                    created: 1
                }
            })
            if (result?.isAxiosError) return
            setDataRP(result?.data?.data)
        }
        if (currTabView == '4') {
            let result = await getReportPartnerTrackingWeight({
                condition: {
                    partnerId: {
                        equal: infoUserRedux?._id
                    },
                    created: {
                        from: rangeFilterDate?.selectedStartDate,
                        to: rangeFilterDate?.selectedEndDate
                    }
                },
                sort: {
                    created: 1
                }
            })
            if (result?.isAxiosError) return
            setDataRP(result?.data?.data)
        }

    }


    const _renderTimeFilter = () => {
        switch (currTabView) {
            case '1':
                return (
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14) }]}>
                        {moment(new Date()).format('DD/MM')}
                    </Text>
                )
            case '2':
                return (
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14) }]}>
                        {moment(getMonday(new Date())).format('DD/MM')} -> {moment((new Date())).format('DD/MM')}
                    </Text>
                )
            case '3':
                return (
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14) }]}>
                        {moment().startOf('month').format('DD/MM')} -> {moment((new Date())).format('DD/MM')}
                    </Text>
                )
            case '4':
                return (
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14) }]}>
                        {moment(rangeFilterDate?.selectedStartDate).format('DD/MM')} -> {moment(rangeFilterDate?.selectedEndDate).format('DD/MM')}
                    </Text>
                )


            default:
                break;
        }
    }


    const _handleComfirmFilterDate = () => {

        if (_isEmpty(selectedStartDate?.toString()) || _isEmpty(selectedEndDate?.toString())) {
            return alert('Chọn đầy đủ')
        }

        console.log({ selectedStartDate, selectedEndDate });
        setRangeFilterDate({
            selectedStartDate,
            selectedEndDate
        })
        setCurrTabView('4')

        setShowModalCalendar(false)
    }


    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <CalendarFilterRange
                maxDate={new Date()}
                onDateChange={(date, type) => {
                    console.log({ date, type });
                    if (type === 'END_DATE') {
                        setSelectedEndDate(date?._d);
                    } else {
                        setSelectedStartDate(date?._d);
                        setSelectedEndDate(null)
                    }
                }}
                // defaultDate={_setDefaultDateFilter}
                // selectedStartDate={dataFilterTrangRedux?.timeUpdate?.start}
                // selectedEndDate={dataFilterTrangRedux?.timeUpdate?.end}
                setShowModalCalendar={(flag) => {
                    setShowModalCalendar(flag)
                }}
                confirm={_handleComfirmFilterDate}

                show={showModalCalendar} />

            <Header title={"Báo cáo cân nặng"} />

            <View style={[styleElement.rowAliCenter, styles.tabview]}>
                <TouchableOpacity
                    onPress={() => setCurrTabView('1')}
                    style={[styles.tabview__btn, currTabView == '1' && { backgroundColor: WHITE }]}>
                    <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '1' && [{ color: GREY_FOR_TITLE }, stylesFont.fontNolanBold]]}>Hôm nay</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setCurrTabView('2')}
                    style={[styles.tabview__btn, currTabView == '2' && { backgroundColor: WHITE }]}>
                    <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '2' && [{ color: GREY_FOR_TITLE }, stylesFont.fontNolanBold]]}>Tuần này</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setCurrTabView('3')}
                    style={[styles.tabview__btn, currTabView == '3' && { backgroundColor: WHITE }]}>
                    <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '3' && [{ color: GREY_FOR_TITLE }, stylesFont.fontNolanBold]]}>Tháng này</Text>
                </TouchableOpacity>
            </View>


            <ScrollView>
                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }]}>
                    {/* <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginBottom: _moderateScale(8) }]}>
                        Tổng hợp
                    </Text> */}
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13) }]}>
                        Thời gian: {_renderTimeFilter()}
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowModalCalendar(true)}
                        style={{ marginLeft: _moderateScale(8 * 2), paddingVertical: _moderateScale(2), paddingHorizontal: _moderateScale(8 * 1.25), backgroundColor: BLUE_FB, borderRadius: _moderateScale(8) }}>
                        <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: WHITE, bottom: 1 }]}>
                            Thay đổi
                        </Text>
                    </TouchableOpacity>

                    {/* <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13) }]}>
                        Bắt đầu:  {
                            true ?
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>
                                    {parseFloat(dataRP[0]?.weight?.toFixed(2))} kg
                                </Text>
                                : <></>
                        }
                    </Text>
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13) }]}>
                        Hiện tại:  {
                            true ?
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: GREEN_SUCCESS }]}>
                                    {parseFloat(dataRP[dataRP?.length - 1]?.weight?.toFixed(2))} kg
                            </Text>
                                : <></>
                        }
                    </Text> */}
                </View>

                {
                    partnerWeightGoalRedux?.date?.to ?
                        <View style={{ marginLeft: _moderateScale(8 * 2), marginTop:_moderateScale(8*2) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                Mục tiêu ({moment(partnerWeightGoalRedux?.date?.to).format("DD/MM")})
                                                        </Text>
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(20),  lineHeight: _moderateScale(24) }]}>
                                {parseFloat(Number(partnerWeightGoalRedux?.weight?.to).toFixed(1))} kg
                                                        </Text>
                        </View>
                        :
                        <></>
                }

                <View style={{ height: _heightScale(300), paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }}>
                    {
                        dataRP?.length > 0 ?
                            <ChartSingle
                                animationChart={animationChart}
                                data={{
                                    dataSets: [{
                                        values: dataRP?.map((item, index) => {
                                            return {
                                                y: Number(item.weight)
                                            }
                                        }),
                                        label: 'Bar dataSet',
                                        config: {
                                            color: processColor('rgba(236, 58, 120,.8)'),
                                            // barShadowColor: processColor('lightgrey'),
                                            highlightAlpha: Platform.OS == "ios" ? 1 : 255,
                                            valueFormatter: 'largeValue',
                                            fontFamily: Platform.OS == "ios" ? 'SVN-PF Din Text Pro' : 'SVN-PF Din Text Pro Regular',
                                        }
                                    }],
                                    config: {
                                        barWidth: 0.2,
                                    }
                                }}
                                xAxis={{
                                    valueFormatter: dataRP.map((item, index) => {
                                        return moment(item.created).format('DD/MM')
                                        // return (moment(new Date('2020-12-02')).format('DD/MM/YYYY'))
                                        // return item.date
                                    }),
                                    textColor: processColor('#000'),
                                    gridColor: processColor('rgba(181, 180, 177,.7)'),
                                    position: 'BOTTOM',
                                    granularityEnabled: true,
                                    granularity: 1,
                                    textSize: _moderateScale(12),
                                    fontFamily: Platform.OS == "ios" ? 'SVN-PF Din Text Pro' : 'SVN-PF Din Text Pro Regular',
                                }}
                            />
                            : <></>
                    }


                </View>

                <View style={{ marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginBottom: _moderateScale(8) }]}>
                        Lịch sử
                    </Text>

                    {
                        dataRP?.map((item, index) => {
                            return (
                                <View key={item?._id} style={{ marginTop: _moderateScale(8) }}>
                                    <View style={[styleElement.rowAliCenter, { marginHorizontal: _moderateScale(4) }]}>
                                        <Text style={[stylesFont.fontNolan, { color: BLACK_OPACITY_8, flex: 1 }]}>
                                            {moment(item?.created).format("DD/MM/YYYY")}
                                        </Text>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>
                                            {parseFloat(item?.weight?.toFixed(2))} kg
                                        </Text>
                                    </View>
                                    <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                                </View>
                            )
                        })
                    }

                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

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



const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        'rgba(104, 47, 144,.7)',
        BASE_COLOR,
    ]
}

const styles = StyleSheet.create({
    tabview__text: {
        fontSize: _moderateScale(13),
        color: GREY
    },
    tabview__btn: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(4)
    },
    tabview: {
        backgroundColor: BG_GREY_OPACITY_2,
        marginHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(4),
        padding: _moderateScale(8),
        justifyContent: 'space-between',
        marginTop: _moderateScale(8 * 2)
    },
    banner: {
        width: "100%",
        height: _moderateScale(8 * 20),
        borderRadius: _moderateScale(8),
        overflow: 'hidden',
        backgroundColor: BG_GREY_OPACITY_2
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


export default index;