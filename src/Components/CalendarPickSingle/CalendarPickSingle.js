import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CalendarPicker from 'react-native-calendar-picker';
import { BG_GREY_OPACITY_5, WHITE, BASE_COLOR_OPACITY_2, BASE_COLOR, GREY, RED, BG_GREY_OPACITY_7, SECOND_COLOR } from '../../Constant/Color';
import { _moderateScale, _height, _width } from '../../Constant/Scale';
import { stylesFont } from '../../Constant/Font';

import Modal from 'react-native-modal'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { styleElement } from '../../Constant/StyleElement';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';



const index = memo((props) => {

    const [datePick, setDatePick] = useState(null)

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
                        minDate={props?.minDate ? props?.minDate : null}
                        previousTitle={"Trước"}
                        nextTitle={"Sau"}
                        weekdays={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
                        months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
                        selectedDayColor={BASE_COLOR}
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

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', width: "100%", paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 1) }]}>

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
                            {/* <TouchableOpacity
                            
                            onPress={props?.defaultDate}
                            style={[styles.btnCancel, { marginLeft: _moderateScale(8), borderColor: BASE_COLOR }]}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BASE_COLOR }]}>
                                    Mặc định
                            </Text>
                            </TouchableOpacity> */}
                        </View>

                        <TouchableOpacity
                            onPress={() => props?.confirm(datePick)}
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
})

export default index;