import moment from 'moment';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, BLUE_FB, SECOND_COLOR } from '../../../Constant/Color';
import { _moderateScale } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import {  URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector } from 'react-redux';
import ModalInfoTreatmentDetail from '../../Conversation/ListNoti/Components/ModalInfoTreatmentDetail'

const ItemBooking = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [showModalInfoBooking,setShowModalInfoBooking] = useState(false)


    const _handleNavigateToInfoBooking = () => {
        setShowModalInfoBooking(true)
        // navigation.navigate(INFO_BOOKING, { data: props?.data })
    }

   

    const _renderStatusBooking = () => {
        switch (props?.data?.status) {
            case "WAIT":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#969696' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#969696" }]}>
                            Chờ điều trị
                        </Text>
                    </View>
                )
            case "IN_PROGRESS":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: BLUE_FB }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color:BLUE_FB}]}>
                            Đang điều trị
                        </Text>
                    </View>
                )
            
            case "COMPLETE":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: GREEN_SUCCESS}]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREEN_SUCCESS}]}>
                            Hoàn thành
                        </Text>
                    </View>
                )
            
            case "CANCEL":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: SECOND_COLOR }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: SECOND_COLOR}]}>
                            Đã huỷ
                        </Text>
                    </View>
                )

            default:
                return <View style={[styleElement.rowAliCenter]}>
                <View style={[styles.dotStatus, { backgroundColor: SECOND_COLOR }]} />
                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: SECOND_COLOR}]}>
                    {props?.data?.status}
                </Text>
            </View>
                break;
        }
    }

    return (

        <TouchableOpacity
            onPress={_handleNavigateToInfoBooking}
            style={styles.container}>

            <ModalInfoTreatmentDetail
                confirm={() => {
                }}
                data={props?.data}
                hide={() => setShowModalInfoBooking(false)}
                show={showModalInfoBooking} /> 

            <View style={[styleElement.rowAliCenter]}>
            <Image
                    source={{ uri: infoUserRedux?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` : infoUserRedux?.avatarTemp }}
                    style={[{
                        width: _moderateScale(8 * 6),
                        height: _moderateScale(8 * 6),
                        borderRadius: _moderateScale(8 * 6 / 2),
                        backgroundColor: BG_GREY_OPACITY_5
                    }]} />
                <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                    <View style={{ marginLeft: _moderateScale(8) }}>
                        <Text numberOfLines={1} style={[stylesFont.namePartnerNolan500]}>
                            {infoUserRedux?.name}
                        </Text>
                        <Text style={[stylesFont.phonePartnerNolan_14, { color: GREY }]}>
                            {`${infoUserRedux?.fullPhone[0]}`}
                        </Text>
                    </View>

                </View>

                <View style={[{ alignItems: 'flex-end' }]}>
                    <View style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8) }]}>
                        {/* <Image
                            style={[sizeIcon.sm, { marginRight: _moderateScale(8) }]}
                            source={
                                require('../../../Icon/clockGrey.png')
                            } /> */}
                        <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: BLACK }]}>
                            {
                                `${moment(props?.data?.created).format('LT')}-${moment(props?.data?.completeAt).format('LT')} | ${moment(props?.data?.completeAt).format('DD/MM')}`
                            }
                        </Text>
                    </View>
                    {
                        _renderStatusBooking()
                    }
                </View>

            </View>
            <View style={[styleElement.lineHorizontal, { marginTop: _moderateScale(8) }]} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View  style={[styles.activeService, { marginRight: _moderateScale(4), marginTop: _moderateScale(8) }]}>
                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13) }]}>
                                {props?.data?.service?.name}
                            </Text>
                        </View>
                </View>

                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8, fontStyle: 'italic' }]}>
                    {props?.data?.branch?.name}
                </Text>
            </View>

        </TouchableOpacity>


    );
});

const styles = StyleSheet.create({
    partnerName: {
        fontSize: _moderateScale(16),
        // marginBottom: _moderateScale(4)
    },
    phoneNumber: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    dotStatus: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(4),
        top: _moderateScale(1)
    },
    activeService__text: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(12)
    },
    activeService: {
        backgroundColor: BLUE,
        paddingHorizontal: _moderateScale(8 * 1.5),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8),
        alignSelf: 'flex-start',

        // marginLeft: _moderateScale(8),
        // marginTop:_moderateScale(4)
    },
    card: {
        flexDirection: 'row'
    },
    container: {
        width: '100%',
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8)
    }
})

export default ItemBooking;