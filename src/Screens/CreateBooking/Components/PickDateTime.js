import React, { memo, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput, ImageBackground, Alert } from 'react-native';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_5, BG_GREY_OPACITY_9, BLUE, GREY, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import * as Color from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale } from '../../../Constant/Scale';
import ScreenKey from '../../../Navigation/ScreenKey';
import { sizeIcon, sizeLogo } from '../../../Constant/Icon';
import Button from '../../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import _isEmpty from 'lodash/isEmpty'
import { getListBranchLocation, createNewBooking } from '../../../Redux/Action/BookingAction'
import CountStar from '../../../Components/CountStar/index'
import { URL_ORIGINAL } from '../../../Constant/Url';
import { styleElement } from '../../../Constant/StyleElement';
import CalendarPickSingle from '../../../Components/CalendarPickSingle/CalendarPickSingle'
import moment from 'moment'
import { alertCustomNotAction, formatMonney } from '../../../Constant/Utils';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Collapsible from 'react-native-collapsible';

const PickDateTime = memo((props) => {
    return (
        <>

            <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Thời gian hẹn {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>

                <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 2) }]}>

                    {
                        moment(new Date()).isSame(props?.currPickDate, 'day') ?
                            <TouchableOpacity
                                onPress={() => {
                                    props?.setCurrPickDate(moment()._d)
                                }}
                                style={[styles.overBtnCalendar]}>
                                <View style={[styles.overBtnCalendar__month, { backgroundColor: SECOND_COLOR }]}>
                                    <Text style={[styles.overBtnCalendar__month__text1, { color: WHITE, fontSize: _moderateScale(14) }]}>Thg {
                                        moment(new Date()).format('MM')
                                    }
                                    </Text>
                                    <Text style={[styles.overBtnCalendar__month__text2, { color: WHITE, fontSize: _moderateScale(16) }]}>
                                        {
                                            moment(new Date()).format('DD')
                                        }
                                    </Text>
                                </View>
                                <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4), color: SECOND_COLOR, ...stylesFont.fontNolanBold }]}>
                                    Hôm nay
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    props?.setCurrPickDate(moment()._d)
                                }}
                                style={[styles.overBtnCalendar]}>
                                <View style={styles.overBtnCalendar__month}>
                                    <Text style={styles.overBtnCalendar__month__text1}>Thg {
                                        moment(new Date()).format('MM')
                                    }
                                    </Text>
                                    <Text style={styles.overBtnCalendar__month__text2}>
                                        {
                                            moment(new Date()).format('DD')
                                        }
                                    </Text>
                                </View>
                                <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4) }]}>
                                    Hôm nay
                                </Text>
                            </TouchableOpacity>
                    }


                    {
                        moment().add(1, 'days').isSame(props?.currPickDate, 'day') ?
                            <TouchableOpacity
                                onPress={() => {
                                    props?.setCurrPickDate(moment().add(1, 'days')._d)
                                }}
                                style={[styles.overBtnCalendar]}>
                                <View style={[styles.overBtnCalendar__month, { backgroundColor: SECOND_COLOR }]}>
                                    <Text style={[styles.overBtnCalendar__month__text1, { color: WHITE, fontSize: _moderateScale(14) }]}>Thg {
                                        moment().add(1, 'days').format('MM')
                                    }
                                    </Text>
                                    <Text style={[styles.overBtnCalendar__month__text2, { color: WHITE, fontSize: _moderateScale(16) }]}>
                                        {
                                            moment().add(1, 'days').format('DD')
                                        }
                                    </Text>
                                </View>
                                <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4), color: SECOND_COLOR, ...stylesFont.fontNolanBold }]}>
                                    Ngày mai
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    props?.setCurrPickDate(moment().add(1, 'days')._d)
                                }}
                                style={[styles.overBtnCalendar]}>
                                <View style={styles.overBtnCalendar__month}>
                                    <Text style={styles.overBtnCalendar__month__text1}>Thg {
                                        moment().add(1, 'days').format('MM')
                                    }
                                    </Text>
                                    <Text style={styles.overBtnCalendar__month__text2}>
                                        {
                                            moment().add(1, 'days').format('DD')
                                        }
                                    </Text>
                                </View>
                                <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4) }]}>
                                    Ngày mai
                                </Text>
                            </TouchableOpacity>
                    }

                    {
                        moment().add(2, 'days').isSame(props?.currPickDate, 'day') ?
                            <TouchableOpacity
                                onPress={() => {
                                    props?.setCurrPickDate(moment().add(2, 'days')._d)
                                }}
                                style={[styles.overBtnCalendar]}>
                                <View style={[styles.overBtnCalendar__month, { backgroundColor: SECOND_COLOR }]}>
                                    <Text style={[styles.overBtnCalendar__month__text1, { color: WHITE, fontSize: _moderateScale(14) }]}>Thg {
                                        moment().add(2, 'days').format('MM')
                                    }
                                    </Text>
                                    <Text style={[styles.overBtnCalendar__month__text2, { color: WHITE, fontSize: _moderateScale(16) }]}>
                                        {
                                            moment().add(2, 'days').format('DD')
                                        }
                                    </Text>
                                </View>
                                <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4), color: SECOND_COLOR, ...stylesFont.fontNolanBold }]}>
                                    Ngày kia
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    props?.setCurrPickDate(moment().add(2, 'days')._d)
                                }}
                                style={[styles.overBtnCalendar]}>
                                <View style={styles.overBtnCalendar__month}>
                                    <Text style={styles.overBtnCalendar__month__text1}>Thg {
                                        moment().add(2, 'days').format('MM')
                                    }
                                    </Text>
                                    <Text style={styles.overBtnCalendar__month__text2}>
                                        {
                                            moment().add(2, 'days').format('DD')
                                        }
                                    </Text>
                                </View>
                                <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4) }]}>
                                    Ngày kia
                                </Text>
                            </TouchableOpacity>
                    }

                    {
                        props?.currPickDate &&
                            !moment(new Date()).isSame(props?.currPickDate, 'day') &&
                            !moment().add(1, 'days').isSame(props?.currPickDate, 'day') &&
                            !moment().add(2, 'days').isSame(props?.currPickDate, 'day') ?

                            //         <TouchableOpacity
                            //             onPress={() => {
                            //                 setCurrPickDate(moment().add(2, 'days')._d)
                            //             }}
                            //             style={[styles.overBtnCalendar]}>
                            //             <View style={[styles.overBtnCalendar__month, { backgroundColor: SECOND_COLOR }]}>
                            //                 <Text style={[styles.overBtnCalendar__month__text1, { color: WHITE, fontSize: _moderateScale(14) }]}>Thg {
                            //                     moment().add(2, 'days').format('MM')
                            //                 }
                            //                 </Text>
                            //                 <Text style={[styles.overBtnCalendar__month__text2, { color: WHITE, fontSize: _moderateScale(16) }]}>
                            //                     {
                            //                         moment().add(2, 'days').format('DD')
                            //                     }
                            //                 </Text>
                            //             </View>
                            //             <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4), color: SECOND_COLOR, ...stylesFont.fontNolanBold }]}>
                            //                 Ngày kia
                            //    </Text>
                            //         </TouchableOpacity>

                            <TouchableOpacity style={styles.overBtnCalendar}>
                                <View style={[styles.overBtnCalendar__month, { backgroundColor: SECOND_COLOR }]}>
                                    <Text style={[styles.overBtnCalendar__month__text1, { color: WHITE, fontSize: _moderateScale(14) }]}>Thg {
                                        moment(props?.currPickDate).format('MM')
                                    }
                                    </Text>
                                    <Text style={styles.overBtnCalendar__month__text2, { color: WHITE, fontSize: _moderateScale(16), ...stylesFont.fontNolanBold }}>
                                        {
                                            moment(props?.currPickDate).format('DD')
                                        }
                                    </Text>
                                </View>
                                <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4), color: SECOND_COLOR, ...stylesFont.fontNolanBold }]}>
                                    Ngày khác
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    props?.setShowModalCalendar(true)
                                }}
                                style={styles.overBtnCalendar}>
                                <View style={styles.overBtnCalendar__month}>
                                    <Image style={sizeIcon.md} source={require('../../../NewIcon/plusGrey.png')} />
                                </View>
                                <Text style={[styles.overBtnCalendar__month__text1, { marginTop: _moderateScale(4) }]}>
                                    Ngày khác
                                </Text>
                            </TouchableOpacity>
                    }
                </View>

            </View>
                    
            <Collapsible collapsed={props?.currPickDate ? false : true}>
                <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 3) }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK }}>
                                Khung giờ 1
                        </Text>
                        </View>
                        <View style={[styles.listTime]}>
                            {
                                props?.listTimeForBooking?.slice(0, 5)?.map((item, index) => {
                                    if (item?._id == props?.currTimeChoice?._id) {
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
                                            onPress={() => props?.setCurrTimeChoice(item)}
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
                                props?.listTimeForBooking?.slice(5, 10)?.map((item, index) => {
                                    if (item?._id == props?.currTimeChoice?._id) {
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
                                            onPress={() => props?.setCurrTimeChoice(item)}
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
            </Collapsible>


            {/* <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                <View style={[styles.listTime]}>
                    {
                        props?.listTimeForBooking?.map((item, index) => {
                            if (item?._id == props?.currTimeChoice?._id) {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.itemTime, styles.itemTimeActive]}>
                                        <Text style={[styles.titTime, styles.titTimeActive]}>
                                            {item?.from}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                            return (
                                <TouchableOpacity
                                    onPress={() => props?.setCurrTimeChoice(item)}
                                    key={index}
                                    style={[styles.itemTime]}>
                                    <Text style={[styles.titTime]}>
                                        {item?.from}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
            </View> */}
        </>
    );
});


const styles = StyleSheet.create({
    overBtnCalendar__month__text2: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: GREY
    },
    overBtnCalendar__month__text1: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(12),
        color: GREY
    },
    overBtnCalendar__month: {
        height: _moderateScale(8 * 8),
        width: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8),
        backgroundColor: Color.BG_GREY_OPACITY_2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overBtnCalendar: {
        // borderWidth: 1,
        width: _moderateScale(8 * 8),
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
        backgroundColor: SECOND_COLOR
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

export default PickDateTime;