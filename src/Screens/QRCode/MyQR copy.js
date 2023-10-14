import React, { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { GREY, WHITE, BASE_COLOR, RED, SECOND_COLOR, THIRD_COLOR, BTN_PRICE, BLACK_OPACITY_8, BLACK_OPACITY_7 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';


import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'

import ModalMyListBookingToday from './Components/ModalMyListBookingToday'
// import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getBookingDataForPartner, checkinBookingForPartner, createCheckinBookingForPartner } from '../../Redux/Action/BookingAction';
import _isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import ModalPickLocationToCreateBooking from '../../Components/ModalPickLocationToCreateBooking/ModalPickLocationToCreateBooking';


const MyQR = () => {
    const scrollA = useRef(new Animated.Value(0)).current;

    const [currDataBooking, setCurrDataBooking] = useState({
        show: false,
        data: []
    })

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const [showModalPickLocationToCreateBooking, setShowModalPickLocationToCreateBooking] = useState(false)

    const [currRefCode, setCurrRefCode] = useState(null)

    const onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            // console.error('An error occured', err)
            console.log(err)

        );
        scanRef.reactivate()
    };

    const _handleOpenModalListBooking = async (obj) => {
        // alert('_handleOpenModalListBooking')
        console.log({ obj });
        let resultGetBookingDataForPartner = await getBookingDataForPartner(
            {
                condition: {
                    branchCode: {
                        in: [obj?.branchCode]
                    },
                    status: {
                        in: ['WAIT']
                    }
                },
                limit: 100,
                sort: {
                    "appointmentDateFinal.from.dateTime": 1
                }
            },
        )
        if (resultGetBookingDataForPartner?.isAxiosError) return

        if(resultGetBookingDataForPartner?.data?.data?.length > 0){
            setCurrDataBooking(old => {
                return {
                    ...old,
                    show: true,
                    data: resultGetBookingDataForPartner?.data?.data
                }
            })
        }
        

        if (_isEmpty(resultGetBookingDataForPartner?.data?.data)) {
            return Alert.alert(
                "Danh sách booking trống",
                "Xác nhận tạo Booking tự động và checkin?",
                [
                    {
                        text: "Huỷ",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Đồng ý", onPress: async () => {
                            let resultCreateCheckinBookingForPartner = await createCheckinBookingForPartner({
                                branchCode: obj?.branchCode
                            })
                            if (resultCreateCheckinBookingForPartner?.isAxiosError) return

                            navigation.navigate(ScreenKey.TAB_CHAT)
                        }
                    }
                ],
                { cancelable: false }
            );
        }



        // if (obj?.action == 'checkin') {
        //     return Alert.alert(
        //         "Không tìm thấy booking nào trong hôm nay",
        //         "Xác nhận tạo Booking tự động và checkin?",
        //         [
        //             {
        //                 text: "Huỷ",
        //                 onPress: () => console.log("Cancel Pressed"),
        //                 style: "cancel"
        //             },
        //             {
        //                 text: "Đồng ý", onPress: async () => {

        //                 }
        //             }
        //         ],
        //         { cancelable: false }
        //     );
        // }


    }

    const _handleOpenModalPickBranch = (refCode) => {
        setCurrRefCode(refCode)
        setShowModalPickLocationToCreateBooking(true)
    }

    const _handleConfirmPickBranch = (item) => {

        console.log({ item, currRefCode });


         navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, {
            infoBranch: item,
            refCode: currRefCode?.collaboratorCode
        })
        // return navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, { refCode: objParsed?.collaboratorCode })
    }

    const _confirmCheckin = async (idBooking) => {
        let resultCheckinBookingForPartner = await checkinBookingForPartner(idBooking)
        if (resultCheckinBookingForPartner?.isAxiosError) return

        setCurrDataBooking(old => {
            return {
                ...old,
                show: false,
            }
        })
        navigation.navigate(ScreenKey.LIST_BOOKING)
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom />

            <ModalPickLocationToCreateBooking
                onConfirm={_handleConfirmPickBranch}
                hide={() => {
                    setShowModalPickLocationToCreateBooking(false)
                }}
                show={showModalPickLocationToCreateBooking} />

            <ModalMyListBookingToday
                data={currDataBooking?.data}
                // number={currDataBooking}
                hide={() => setCurrDataBooking(old => {
                    return {
                        ...old,
                        show: false
                    }
                })}
                confirmCheckin={_confirmCheckin}
                show={currDataBooking?.show} />

            <Animated.View
                style={{ flexGrow: 1 }}
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                //     { useNativeDriver: true },
                // )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'cover'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../NewImage/banner2Color.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 2) }]}>
                            <Image
                                style={[sizeLogo.xl]}
                                source={require('../../NewImage/logoNgang.png')} />

                        </View>

                        <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 2) }]}>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: infoUserRedux?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` : URL_AVATAR_DEFAULT
                                }} />

                            {/* <FastImage
                                style={[styles.bannerProfile__avatar]}
                                uri={infoUserRedux?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                            /> */}
                            <View style={{ marginLeft: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolanBold, styles.title]}>
                                    {
                                        `${infoUserRedux?.name}`
                                    }
                                </Text>
                                {
                                    infoUserRedux?.fullPhone?.length > 0 ?
                                        <Text style={[stylesFont.fontNolan, styles.title, { fontSize: _moderateScale(16) }]}>
                                            {infoUserRedux?.fullPhone[0]}
                                        </Text>
                                        : <></>
                                }

                            </View>
                        </View>
                    </View>

                    <View style={{
                        position: 'absolute',
                        bottom: _moderateScale(8 * 5),
                        width: "100%",
                        alignItems: 'center'
                    }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                            Mã QR của bạn là
                        </Text>
                    </View>

                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    // paddingBottom: _moderateScale(8 * 8),
                }}>
                    <View style={styles.wave} />

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: _moderateScale(8 * 3) }}>
                        {/* <QRCode
                            enableLinearGradient={true}
                            linearGradient={[BLACK_OPACITY_7, BLACK_OPACITY_7]}
                            logo={{  uri: infoUserRedux?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                            logoSize={60}
                            logoBorderRadius={30}
                            logoBackgroundColor={'white'}
                            value={JSON.stringify({ collaboratorCode: infoUserRedux?.collaboratorCode, action: "create_booking" })}
                            size={_heightScale(240)}
                        /> */}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: _moderateScale(8 * 2) }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.SCAN_QR_CODE, { _handleOpenModalListBooking, _handleOpenModalPickBranch })
                                // setShowModal(true)
                            }}
                            style={{
                                marginHorizontal: _moderateScale(8 * 3),
                                backgroundColor: BASE_COLOR,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: _moderateScale(8 * 5),
                                borderRadius: _moderateScale(8)
                            }}>
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                Quét mã QR
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate(ScreenKey.SCAN_QR_CODE)
                            setCurrDataBooking(2)
                            setShowModal(true)
                        }}
                        style={{
                            marginHorizontal: _moderateScale(8 * 3),
                            backgroundColor: BASE_COLOR,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: _moderateScale(8 * 5),
                            borderRadius: _moderateScale(8)
                        }}>
                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                            Quét mã QR 2
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate(ScreenKey.SCAN_QR_CODE)
                            setCurrDataBooking(3)
                            setShowModal(true)
                        }}
                        style={{
                            marginHorizontal: _moderateScale(8 * 3),
                            backgroundColor: BASE_COLOR,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: _moderateScale(8 * 5),
                            borderRadius: _moderateScale(8)
                        }}>
                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                            Quét mã QR 3
                        </Text>
                    </TouchableOpacity> */}
                </View>

            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: _moderateScale(8 * 7),
        height: _moderateScale(8 * 7),
        borderRadius: _moderateScale(8 * 7 / 2)
    },
    btnOptions__icon: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain'
    },
    btnOptions: {
        width: _moderateScale(100),
        height: _moderateScale(100),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: _moderateScale(20),
        color: WHITE,
    },

    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(300),
        width: "100%",
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
}
)


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 11
}


export default MyQR;