import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CalendarPicker from 'react-native-calendar-picker';
import { BG_GREY_OPACITY_5, WHITE, BASE_COLOR_OPACITY_2, BASE_COLOR, GREY, RED, BG_GREY_OPACITY_7, BLUE_FB, SECOND_COLOR, BLACK, BG_GREY_OPACITY_9 } from '../../Constant/Color';
import * as Color from '../../Constant/Color'
import { _moderateScale, _height, _width } from '../../Constant/Scale';
import { stylesFont } from '../../Constant/Font';

import Modal from 'react-native-modal'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { styleElement } from '../../Constant/StyleElement';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import moment from 'moment';



const CalendarPickSingleTime = memo((props) => {

    const [datePick, setDatePick] = useState(null)

    const [listTimeForBooking, setListTimeForBooking] = useState([
        {
            _id: '2',
            from: '09:00',
            to: '10:00'
        },
        {
            _id: '3',
            from: '10:00',
            to: '11:00'
        },
        {
            _id: '4',
            from: '11:00',
            to: '12:00'
        },
        {
            _id: '5',
            from: '12:00',
            to: '13:00'
        },
        {
            _id: '6',
            from: '13:00',
            to: '14:00'
        },
        {
            _id: '7',
            from: '14:00',
            to: '15:00'
        },
        {
            _id: '8',
            from: '15:00',
            to: '16:00'
        },
        {
            _id: '9',
            from: '16:00',
            to: '17:00'
        },
        {
            _id: '10',
            from: '17:00',
            to: '18:00'
        },
        {
            _id: '11',
            from: '18:00',
            to: '19:00'
        },

    ])

    const [currTimeChoice, setCurrTimeChoice] = useState({
        _id: '2',
        from: '09:00',
        to: '10:00'
    })

    useEffect(() => {
        let timeFind = listTimeForBooking?.find(item => {
            return Number(item?.from?.split(':')[0]) == moment().format('HH')
        })
        console.log({timeFind ,x:moment().format('hh')}); 
        if (timeFind) {
            setCurrTimeChoice(timeFind)
        }
    },[])

    const _handleOnDateChange = (date, type) => {
        setDatePick(date?._d)
    }

    return (
        <>
            <Modal
                supportedOrientations={['portrait', 'landscape']}
                style={{
                    margin: 0,
                    alignItems: "center",
                    justifyContent: 'flex-start'
                }}
                animationIn='slideInDown'
                animationOut='slideOutUp'
                animationInTiming={150}
                animationOutTiming={500}
                isVisible={props?.show}
                useNativeDriver={true}
                coverScreen={Platform.OS == "ios" ? true : true}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating
                // backdropOpacity={1}
                // customBackdrop={
                //      (
                //       <BlurView
                //         // viewRef={contentRef}
                //         style={{flex:1}}
                //         blurAmount={10}
                //         blurRadius={9}
                //         blurType='extraDark'
                //       />
                //     )
                //   }
                onBackButtonPress={() => {
                    props.setShowModalCalendar(false)
                }}
                onBackdropPress={() => {
                    props.setShowModalCalendar(false)
                }}>

                <View style={styles.modalFilter}>
                    <CalendarPicker
                        onDateChange={_handleOnDateChange}
                        // selectedStartDate={props?.selectedStartDate}
                        // selectedEndDate={props?.selectedEndDate}
                        // allowRangeSelection={true}
                        // allowBackwardRangeSelect={true}
                        // minDate={props?.isMin === true ? new Date('1970-01-01') : new Date()}
                        minDate={props?.minDate ? props?.minDate : null}
                        maxDate={props?.maxDate ? props?.maxDate : null}
                        previousTitle={"Trước"}
                        nextTitle={"Sau"}
                        weekdays={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
                        months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
                        selectedDayColor={BLUE_FB}
                        selectedRangeStyle={{ backgroundColor: BASE_COLOR_OPACITY_2 }}
                        selectedRangeStartStyle={{ backgroundColor: BASE_COLOR }}
                        selectedRangeEndStyle={{ backgroundColor: BASE_COLOR }}
                        selectedDayTextColor={WHITE}
                        selectedDayTextStyle={[stylesFont.fontDinTextProBold]}
                        textStyle={[stylesFont.fontDinTextPro]}
                        todayBackgroundColor={'#ccc'}
                        todayTextStyle={[stylesFont.fontDinTextPro, { color: WHITE }]}
                        // scrollable
                        enableSwipe
                        selectMonthTitle={"Chọn tháng trong năm "}
                        selectYearTitle={"Chọn năm"}
                        dayLabelsWrapper={{
                            borderTopWidth: 0,
                            borderBottomWidth: _moderateScale(0.5),
                            borderBottomColor: BG_GREY_OPACITY_5
                        }}
                        // customDayHeaderStyles={{
                        //     backgroundColor: 'red'
                        // }}
                        height={_height - 8 * 3}
                        width={_width - 8 * 3}

                    />

                    <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 3) }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK }}>
                                    Khung giờ 1
                                </Text>
                            </View>
                            <View style={[styles.listTime]}>
                                {
                                    listTimeForBooking?.slice(0, 5)?.map((item, index) => {
                                        if (item?._id == currTimeChoice?._id) {
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[styles.itemTime, styles.itemTimeActive, index == 0 && { width: _moderateScale(105 / 1.5 * 2 + 8) }]}>
                                                    <Text style={[styles.titTime, styles.titTimeActive]}>
                                                        {item?.from}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                        return (
                                            <TouchableOpacity
                                                onPress={() => setCurrTimeChoice(item)}
                                                key={index}
                                                style={[styles.itemTime, index == 0 && { width: _moderateScale(105 / 1.5 * 2 + 8) }]}>
                                                <Text style={[styles.titTime]}>
                                                    {item?.from}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={{ width: 1, backgroundColor: Color.BG_GREY_OPACITY_2 }} />
                        <View style={{ flex: 1 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK }}>
                                    Khung giờ 2
                                </Text>
                            </View>
                            <View style={[styles.listTime]}>
                                {
                                    listTimeForBooking?.slice(5, 10)?.map((item, index) => {
                                        if (item?._id == currTimeChoice?._id) {
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[styles.itemTime, styles.itemTimeActive, index == 0 && { width: _moderateScale(105 / 1.5 * 2 + 8) }]}>
                                                    <Text style={[styles.titTime, styles.titTimeActive]}>
                                                        {item?.from}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                        return (
                                            <TouchableOpacity
                                                onPress={() => setCurrTimeChoice(item)}
                                                key={index}
                                                style={[styles.itemTime, index == 0 && { width: _moderateScale(105 / 1.5 * 2 + 8) }]}>
                                                <Text style={[styles.titTime]}>
                                                    {item?.from}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', width: "100%", paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 5) }]}>

                        <View style={[styleElement.rowAliCenter]}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setShowModalCalendar(false)
                                }}
                                style={styles.btnCancel}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: GREY }]}>
                                    Huỷ
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => props?.confirm(datePick,currTimeChoice)}
                            style={{
                                height: _moderateScale(8 * 4),
                                backgroundColor: WHITE,
                                width: _moderateScale(8 * 12),
                                borderRadius: _moderateScale(8),
                                overflow: 'hidden'
                            }}>
                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                colors={gradient.color}
                                style={gradient.container}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: WHITE }]}>
                                    Xác nhận
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </>
    );
});


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
        SECOND_COLOR,
        BASE_COLOR,
    ]
}


const styles = StyleSheet.create({
    btnCancel: {
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_7,
        width: _moderateScale(8 * 12),
        borderRadius: _moderateScale(8),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalFilter: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingTop: _moderateScale(getStatusBarHeight() + 8 * 1),
        paddingBottom: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        // paddingHorizontal: _moderateScale(23),
        borderBottomStartRadius: _moderateScale(8 * 2),
        borderBottomEndRadius: _moderateScale(8 * 2),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    listTime: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: _moderateScale(4),
        justifyContent: 'center',
        // paddingHorizontal: _moderateScale(8),
        // paddingBottom: _moderateScale(16),

    },
    itemTime: {
        width: _moderateScale(105 / 1.5),
        marginTop: _moderateScale(8),
        borderColor: BG_GREY_OPACITY_9,
        alignItems: 'center',
        padding: _moderateScale(4),
        borderRadius: 4,
        borderWidth: 0.5,
        marginHorizontal: _moderateScale(4)
    },
    itemTimeActive: {
        borderWidth: 0.5,
        backgroundColor: Color.BLUE_FB
    },
    titTime: {
        color: BG_GREY_OPACITY_9,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    titTimeActive: {
        color: WHITE,
    },
})

export default CalendarPickSingleTime;
