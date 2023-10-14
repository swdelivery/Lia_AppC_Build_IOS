import moment from 'moment';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, RED, BG_GREY_OPACITY_2, BLUE_FB, BASE_COLOR } from '../../../Constant/Color';
import { _moderateScale, _width } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector } from 'react-redux';
import ModalInfoBooking from '../../Conversation/ListNoti/Components/ModalInfoBooking'
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { sizeIcon } from '../../../Constant/Icon';
import { formatMonney } from '../../../Constant/Utils';
import isEmpty from 'lodash/isEmpty';

const ItemBookingV2 = memo((props) => {


    const _renderStatusBooking = () => {
        switch (props?.data?.status) {
            case "WAIT":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#969696' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#969696" }]}>
                            Chưa CheckIn
                        </Text>
                    </View>
                )
            case "WAS_CHECK_IN":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: "#ff7c22" }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#ff7c22" }]}>
                            Đã CheckIn
                        </Text>
                    </View>
                )
            case "WAIT_CONSULTATION":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#5d02ec' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#5d02ec" }]}>
                            Chờ tư vấn
                        </Text>
                    </View>
                )
            case "IS_CONSULTING":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#0b7ad2' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#0b7ad2" }]}>
                            Đang tư vấn
                        </Text>
                    </View>
                )
            case "WAS_CONSULTED":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#30CCFF' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#30CCFF" }]}>
                            Đã tư vấn
                        </Text>
                    </View>
                )
            case "WAIT_PROGRESS":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#5d02ec' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#5d02ec" }]}>
                            Chờ điều trị
                        </Text>
                    </View>
                )
            case "IN_PROGRESS":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#0b7ad2' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#0b7ad2" }]}>
                            Đang điều trị
                        </Text>
                    </View>
                )
            case "COMPLETE_PROGRESS":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#019801' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#019801" }]}>
                            Đã điều trị
                        </Text>
                    </View>
                )
            case "WAS_CHECK_OUT":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: GREEN_SUCCESS }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREEN_SUCCESS }]}>
                            Đã CheckOut
                        </Text>
                    </View>
                )
            case "CANCEL":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: RED }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: RED }]}>
                            Đã Huỷ
                        </Text>
                    </View>
                )

            default:
                break;
        }
    }

    const _handleNavigateToInfoBooking = () => {
        // setShowModalInfoBooking(true)
        navigation.navigate(ScreenKey.INFO_BOOKING, { data: props?.data })
        // navigation.navigate('Modal', { screen: 'INFO_BOOKING', params: { user: 'jane' }, })
    }


    return (
        <View
            onPress={_handleNavigateToInfoBooking}
            style={styles.card}>
            <View style={[{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row' }]}>
                <View style={{ marginRight: _moderateScale(8 * 2), flex: 1 }}>
                    <Text style={styles.title}>{props?.data?.code}</Text>
                </View>
                <Text style={[styles.title, { fontSize: _moderateScale(16) }]}>
                    {formatMonney(props?.data?.finalAmount)}
                </Text>
            </View>
            <View style={[{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row', marginTop: _moderateScale(4) }]}>
                <View style={{ marginRight: _moderateScale(8 * 2), flex: 1 }}>
                    <Text style={[styles.title, { color: GREY }]}>
                        {
                            moment(props?.data?.created).format('LT')
                        } - {
                            moment(props?.data?.created).format('DD/MM')
                        }
                    </Text>
                </View>
                {
                    !isEmpty(props?.data?.linkedOrderId) ?
                        <Text style={[styles.title, { color: BASE_COLOR, fontSize:_moderateScale(13) }]}>
                            Đã sử dụng
                        </Text>
                        :
                        <Text style={[styles.title, { color: BLUE_FB, fontSize:_moderateScale(13) }]}>
                            Chưa sử dụng
                        </Text>
                }

            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    dotStatus: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(4),
        top: _moderateScale(1)
    },
    line: {
        height: _moderateScale(0.5),
        backgroundColor: BG_GREY_OPACITY_5,
        width: "90%",
        alignSelf: 'center',
        marginVertical: _moderateScale(8 * 2)
    },
    title: {
        ...stylesFont.fontNolan500,
        color: BLACK,
        fontSize: _moderateScale(14),
    },
    avatarService: {
        backgroundColor: BG_GREY_OPACITY_2,
        width: _moderateScale(8 * 7),
        height: _moderateScale(8 * 7),
        borderRadius: _moderateScale(8)
    },
    card: {
        width: '100%',
        // height: _moderateScale(8 * 20),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        marginBottom: _moderateScale(8),
        paddingVertical: _moderateScale(8 * 2)
    }
})

export default ItemBookingV2;