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
import ModalInfoTreatmentDetail from '../../Conversation/ListNoti/Components/ModalInfoTreatmentDetail'

const ItemBookingV2 = memo((props) => {

    const [showModalInfoBooking,setShowModalInfoBooking] = useState(false)


    const _renderStatus = (key) => {
        switch (key) {
            case "WAIT":
                return (
                    <Text style={[styles.title, { color: "#969696", fontSize: _moderateScale(13) }]}>
                        Chờ điều trị
                    </Text>
                )
            case "IN_PROGRESS":
                return (
                    <Text style={[styles.title, { color: BLUE_FB, fontSize: _moderateScale(13) }]}>
                        Đang điều trị
                    </Text>
                )
            case "COMPLETE":
                return (
                    <Text style={[styles.title, { color: GREEN_SUCCESS, fontSize: _moderateScale(13) }]}>
                        Hoàn thành
                    </Text>
                )
            case "CANCEL":
                return (
                    <Text style={[styles.title, { color: RED, fontSize: _moderateScale(13) }]}>
                        Đã huỷ
                    </Text>
                )


            default:
                break;
        }
    }


    const _handleNavigateToInfoBooking = () => {
        // setShowModalInfoBooking(true)
        setShowModalInfoBooking(true)
        // navigation.navigate(ScreenKey.INFO_BOOKING, { data: props?.data })
        // navigation.navigate('Modal', { screen: 'INFO_BOOKING', params: { user: 'jane' }, })
    }


    return (
        <TouchableOpacity
            onPress={_handleNavigateToInfoBooking}
            style={styles.card}>

            <ModalInfoTreatmentDetail
                confirm={() => {
                }}
                data={props?.data}
                hide={() => setShowModalInfoBooking(false)}
                show={showModalInfoBooking} />

            <View style={[{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row' }]}>
                <View style={{ marginRight: _moderateScale(8 * 2), flex: 1 }}>
                    <Text style={styles.title}>{props?.data?.serviceName}</Text>
                </View>
                {/* <Text style={[styles.title, { fontSize: _moderateScale(16) }]}>
                    {formatMonney(props?.data?.finalPrice)}
                </Text> */}
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
                    _renderStatus(props?.data?.status)
                }
                {/* {
                    !isEmpty(props?.data?.linkedOrderId) ?
                        <Text style={[styles.title, { color: BASE_COLOR, fontSize: _moderateScale(13) }]}>
                            Đã sử dụng
                        </Text>
                        :
                        <Text style={[styles.title, { color: BLUE_FB, fontSize: _moderateScale(13) }]}>
                            Chưa sử dụng
                        </Text>
                } */}

            </View>

        </TouchableOpacity>
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