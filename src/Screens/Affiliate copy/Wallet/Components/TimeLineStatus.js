import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { styleElement } from '../../../../Constant/StyleElement';
import { _moderateScale } from '../../../../Constant/Scale';
import { stylesFont } from '../../../../Constant/Font';
import { BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREY, WHITE } from '../../../../Constant/Color';

import ItemPriceWallet from '../Components/ItemPriceWallet'
import { useDispatch, useSelector } from 'react-redux';
import { formatMonney } from '../../../../Constant/Utils';
import { sizeIcon } from '../../../../Constant/Icon';
import { getCollabStatistic } from '../../../../Redux/Action/InfoAction'
import moment from 'moment'
import { TabBar, TabView } from 'react-native-tab-view';
import * as Color from '../../../../Constant/Color';
import { getBookingReferral } from '../../../../Redux/Action/Affiilate';

const TimeLineStatus = memo((props) => {

    const [listStatus, setListStatus] = useState([
        // {
        //     _id: '1',
        //     name: 'Đang chờ',
        //     status: 'WAIT'
        // },
        {
            _id: '2',
            name: 'CheckIn',
            status: 'WAIT_CONSULTATION'
        },
        // {
        //     _id: '3',
        //     name: 'Bắt đầu tư vấn',
        //     status: 'IS_CONSULTING'
        // },
        {
            _id: '4',
            name: 'Hoàn thành tư vấn',
            status: 'WAS_CONSULTED'
        },
        // {
        //     _id: '5',
        //     name: 'Bắt đầu điều trị',
        //     status: 'IN_PROGRESS'
        // },
        {
            _id: '6',
            name: 'Hoàn thành điều trị',
            status: 'COMPLETE_PROGRESS'
        },
        // {
        //     _id: '5',
        //     name: 'CheckOut',
        //     status: 'WAS_CHECK_OUT'
        // },
        {
            _id: '6',
            name: 'Huỷ',
            status: 'CANCEL'
        }
    ])

    useEffect(() => {
        let listStatusTemp = [...listStatus]
        let indexFinded = listStatusTemp?.findIndex(item => item?.status == props?.data?.status);

        listStatusTemp.forEach((item, index) => {
            if (item?.status == 'WAIT_CONSULTATION' && props?.data?.checkInAt) {
                item['time'] = props?.data?.checkInAt
            }
            if (item?.status == 'IS_CONSULTING' && props?.data?.startConsultationAt) {
                item['time'] = props?.data?.startConsultationAt
            }
            if (item?.status == 'WAS_CONSULTED' && props?.data?.completeConsultationAt) {
                item['time'] = props?.data?.completeConsultationAt
            }
            if (item?.status == 'IN_PROGRESS' && props?.data?.startProgressAt) {
                item['time'] = props?.data?.startProgressAt
            }
            if (item?.status == 'COMPLETE_PROGRESS' && props?.data?.completeProgressAt) {
                item['time'] = props?.data?.completeProgressAt
            }
            if (item?.status == 'WAS_CHECK_OUT' && props?.data?.checkOutAt) {
                item['time'] = props?.data?.checkOutAt
            }
            if (item?.status == 'CANCEL' && props?.data?.cancelAt) {
                item['time'] = props?.data?.cancelAt
            }

            // if (index <= indexFinded) {
            //     item['active'] = true
            //     if (item?.status == 'WAIT_CONSULTATION') {
            //         if (item?.checkInAt) {
            //             item['timeDone'] = props?.data?.checkInAt
            //         }
            //     }
            //     if (item?.status == 'IS_CONSULTING') {
            //         item['timeDone'] = props?.data?.checkInAt
            //     }
            // } else {
            //     item['active'] = false
            // }
        });
        setListStatus(listStatusTemp)
    }, [props?.data?.status])

    return (
        <View>
            <View style={{ paddingLeft: _moderateScale(8) }}>
                {
                    listStatus?.map((item, index) => {
                        if (item?.time) {
                            if (item?.status == 'CANCEL') {
                                return (
                                    <View key={index} style={[{ marginTop: _moderateScale(8) }, styleElement.rowAliCenter]}>
                                        <View style={[styles.dotActive,{backgroundColor:Color.RED}]}>
                                            <Text style={styles.dotActive__number}>
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <Text style={[styles.dotActive__text,{color:Color.RED}]}>
                                            {item?.name}
                                        </Text>
                                        <Text style={styles.dotActive__time}>
                                            {moment(item?.time).format('LT')}-{moment(item?.time).format('DD/MM')}
                                        </Text>
                                    </View>
                                )
                            }else{
                                return (
                                    <View key={index} style={[{ marginTop: _moderateScale(8) }, styleElement.rowAliCenter]}>
                                        <View style={styles.dotActive}>
                                            <Text style={styles.dotActive__number}>
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <Text style={styles.dotActive__text}>
                                            {item?.name}
                                        </Text>
                                        <Text style={styles.dotActive__time}>
                                            {moment(item?.time).format('LT')}-{moment(item?.time).format('DD/MM')}
                                        </Text>
                                    </View>
                                )
                            }
                           
                        } else {
                            return (
                                <View key={index} style={[{ marginTop: _moderateScale(8) }, styleElement.rowAliCenter]}>
                                    <View style={styles.dotInActive}>
                                        <Text style={styles.dotInActive__number}>
                                            {index + 1}
                                        </Text>
                                    </View>
                                    <Text style={styles.dotInActive__text}>
                                        {item?.name}
                                    </Text>
                                </View>
                            )
                        }
                    })
                }
            </View>
        </View>
    );
});


const styles = StyleSheet.create({
    dotActive__time: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(13),
        color: GREY,
        fontStyle: 'italic'
    },
    codeRef: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: Color.BASE_COLOR
    },
    dotActive__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: Color.BLUE_FB,
        flex: 1
    },
    dotActive__number: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: WHITE
    },
    dotActive: {
        width: _moderateScale(8 * 2.75),
        height: _moderateScale(8 * 2.75),
        borderRadius: _moderateScale(8 * 3),
        backgroundColor: Color.BLUE_FB,
        ...styleElement.centerChild,
        marginRight: _moderateScale(8)
    },
    dotInActive__text: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY
    },
    dotInActive__number: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY
    },
    dotInActive: {
        width: _moderateScale(8 * 2.75),
        height: _moderateScale(8 * 2.75),
        borderRadius: _moderateScale(8 * 3),
        backgroundColor: Color.BG_GREY_OPACITY_3,
        ...styleElement.centerChild,
        marginRight: _moderateScale(8)
    },
    title: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(16),
        color: Color.BLACK_OPACITY_8
    }
})

export default TimeLineStatus;