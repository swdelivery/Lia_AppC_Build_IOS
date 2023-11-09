import moment from 'moment';
import React, { memo, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, RED, BG_GREY_OPACITY_2, BASE_COLOR, THIRD_COLOR } from '../../../Constant/Color';
import { _moderateScale, _width } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector } from 'react-redux';
import ModalInfoBooking from '../../Conversation/ListNoti/Components/ModalInfoBooking'
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { sizeIcon } from '../../../Constant/Icon';
import ActionSheet from 'react-native-actionsheet';
import { cancelBooking } from '../../../Redux/Action/BookingAction';



const ItemBookingV2 = memo((props) => {

    const ActionSheetRef = useRef()


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

    const _handleCancelBooking = async () => {

        Alert.alert(
            "Xác nhận",
            `Xác nhận huỷ Booking?`,
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: async () => {
                        let result = await cancelBooking(props?.data?._id);
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <TouchableOpacity
            onPress={_handleNavigateToInfoBooking}
            style={styles.card}>

            <ActionSheet
                ref={ActionSheetRef}
                options={["Chỉnh sửa Booking", "Huỷ Booking", "Đóng"]}
                destructiveButtonIndex={1}
                cancelButtonIndex={2}
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            // pickCamera()
                            // navigation.navigate(ScreenKey.EDIT_BOOKING, { idBooking: props?.data?._id })
                            if (props?.data?.type == 'FLASH_SALE') {
                                navigation.navigate(ScreenKey.CREATE_BOOKING_FLASH_SALE, { idBooking: props?.data?._id })
                            } else {
                                navigation.navigate(ScreenKey.CREATE_BOOKING, { idBooking: props?.data?._id })
                            }
                            break;
                        case 1:
                            // pickVideo()
                            _handleCancelBooking()
                            break;
                        case 2:
                            // pickMultiple()
                            break;

                        default:
                            break;
                    }
                }}
            />

            {
                props?.data?.status == 'WAIT' ?
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            ActionSheetRef.current.show()
                        }}
                        style={{
                            position: 'absolute',
                            top: _moderateScale(0),
                            right: _moderateScale(8 * 2),
                            // backgroundColor: 'red',
                            zIndex: 100
                        }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(24) }}>...</Text>
                    </TouchableOpacity>
                    : <></>
            }


            <View style={[{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row' }]}>

                {
                    props?.data?.type == 'FLASH_SALE' ?
                        <>
                            {
                                props?.data?.services?.length > 0 && props?.data?.services[0]?.service?.representationFileArr?.length > 0 ?
                                    <Image style={styles.avatarService} source={{ uri: `${URL_ORIGINAL}${props?.data?.services[0]?.service?.representationFileArr[0]?.link}` }} />
                                    :
                                    <View style={styles.avatarService} />
                            }
                        </>
                        :
                        <>
                            {
                                props?.data?.servicesNeedCare?.length > 0 && props?.data?.servicesNeedCare[0]?.representationFileArr?.length > 0 ?
                                    <Image style={styles.avatarService} source={{ uri: `${URL_ORIGINAL}${props?.data?.servicesNeedCare[0]?.representationFileArr[0]?.link}` }} />
                                    :
                                    <View style={styles.avatarService} />
                            }
                        </>
                }

                {/* {
                    props?.data?.servicesNeedCare?.length > 0 && props?.data?.servicesNeedCare[0]?.representationFileArr?.length > 0 ?
                        <>
                            {
                                props?.data?.type == 'FLASH_SALE' ?
                                    <Image style={styles.avatarService} source={{ uri: `${URL_ORIGINAL}${props?.data?.services[0]?.service?.representationFileArr[0]?.link}` }} />
                                    :
                                    <Image style={styles.avatarService} source={{ uri: `${URL_ORIGINAL}${props?.data?.servicesNeedCare[0]?.representationFileArr[0]?.link}` }} />
                            }
                        </>
                        :
                        <View style={styles.avatarService} />
                } */}
                <View style={{ marginLeft: _moderateScale(8 * 2), flex: 1 }}>
                    {
                        props?.data?.type == 'FLASH_SALE' ?
                            <Text style={[styles.title, { color: BASE_COLOR, fontWeight: 'bold', width: "90%" }]}>{props?.data?.services[0]?.service?.name}</Text>
                            :
                            <>
                                {
                                    props?.data?.servicesNeedCare[0]?.name?.length > 0 ?
                                        <Text style={[styles.title, { color: BASE_COLOR, fontWeight: 'bold', width: "90%" }]}>{props?.data?.servicesNeedCare[0]?.name}</Text>
                                        :
                                        <Text style={[styles.title, { color: BASE_COLOR, fontWeight: 'bold', width: "90%" }]}>{`[Booking nhanh]`}</Text>
                                }
                            </>
                    }
                    <Text style={[styles.title, { color: THIRD_COLOR }]}>{props?.data?.branch?.name}</Text>
                    {
                        _renderStatusBooking()
                    }
                </View>
            </View>
            <View style={styles.line} />

            {
                props?.data?.assignedDoctorArr?.length > 0 ?
                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginBottom: _moderateScale(8 * 1) }}>
                        {
                            props?.data?.assignedDoctorArr[0]?.avatar?.link ?
                                <View style={[styleElement.rowAliCenter]}>
                                    <Image
                                        style={{ width: _moderateScale(8 * 4), height: _moderateScale(8 * 4), borderRadius: _moderateScale(8 * 2) }}
                                        source={{ uri: `${URL_ORIGINAL}${props?.data?.assignedDoctorArr[0]?.avatar?.link}` }} />
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK, marginLeft: _moderateScale(8) }}>
                                        {props?.data?.assignedDoctorArr[0]?.name}
                                    </Text>
                                </View>
                                :
                                <View style={[styleElement.rowAliCenter]}>
                                    <View style={{ width: _moderateScale(8 * 4), height: _moderateScale(8 * 4), borderRadius: _moderateScale(8 * 2), backgroundColor: BG_GREY_OPACITY_2 }}>
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK, marginLeft: _moderateScale(8) }}>
                                        {props?.data?.assignedDoctorArr[0]?.name}
                                    </Text>
                                </View>
                        }

                    </View>
                    :
                    <>
                    </>
            }
            {
                props?.data?.type == 'FLASH_SALE' ?
                    <Image style={[sizeIcon.xxlllg, { position: 'absolute', left: _moderateScale(4) }]} source={require('../../../Image/flashsale/iconFlashSale.png')} />
                    : <></>
            }

            <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }]}>



                <View style={[styleElement.rowAliCenter]}>
                    <Image style={[sizeIcon.md]} source={require('../../../Icon/clock.png')} />
                    <Text style={[stylesFont.fontNolan, { marginLeft: _moderateScale(4), flex: 1, fontSize: _moderateScale(13), color: BLACK }]}>
                        {
                            `${moment(props?.data?.appointmentDateFinal?.from?.dateTime).format('LT')}-${moment(props?.data?.appointmentDateFinal?.to?.dateTime).format('LT')} | ${moment(props?.data?.appointmentDateFinal?.date).format('DD/MM')}`
                        }
                    </Text>
                </View>
                <View style={{ height: _moderateScale(4) }} />
                <View style={[styleElement.rowAliCenter]}>
                    <Image style={[sizeIcon.md]} source={require('../../../Icon/address.png')} />
                    <Text numberOfLines={2} style={[stylesFont.fontNolan, { marginLeft: _moderateScale(4), flex: 1, fontSize: _moderateScale(13), color: BLACK }]}>
                        {
                            props?.data?.branch?.address
                        }
                    </Text>
                </View>
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
        marginBottom: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2)
    }
})

export default ItemBookingV2;