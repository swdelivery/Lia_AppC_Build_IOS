import React, { memo, useRef, useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    View,
    Dimensions,
    Alert
} from 'react-native';

import { _moderateScale } from '../../Constant/Scale';
import { BLUE, BLUE_FB, RED, WHITE } from '../../Constant/Color';
import { styleElement } from '../../Constant/StyleElement';
import { stylesFont } from '../../Constant/Font';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { alertCustomNotAction } from '../../Constant/Utils';
import _isEmpty from 'lodash/isEmpty'
import ModalPickLocationToCreateBooking from '../../Components/ModalPickLocationToCreateBooking/ModalPickLocationToCreateBooking';
import ModalMyListBookingToday from './Components/ModalMyListBookingToday'
import { useSelector } from 'react-redux';
import { getBookingDataForPartner, createCheckinBookingForPartner, checkinBookingForPartner } from '../../Redux/Action/BookingAction';



const OpenCamera = memo((props) => {


    const [currDataBooking, setCurrDataBooking] = useState({
        show: false,
        data: []
    })

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const [showModalPickLocationToCreateBooking, setShowModalPickLocationToCreateBooking] = useState(false)

    const [currRefCode, setCurrRefCode] = useState(null)

    const [isBarcodeRead, setIsBarcodeRead] = useState(false)

    const parseMyJson = (data) => {
        try {
            return JSON.parse(data)
        } catch (error) {
            return null
        }
    }


    const _handleOpenModalPickBranch = (refCode) => {
        setCurrRefCode(refCode)
        setShowModalPickLocationToCreateBooking(true)
    }


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

        if (resultGetBookingDataForPartner?.data?.data?.length > 0) {
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
                            navigation.goBack()
                            navigation.navigate(ScreenKey.LIST_BOOKING)
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    }

    const _handleConfirmPickBranch = (item) => {
        navigation.goBack()
        navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, {
            infoBranch: item,
            refCode: currRefCode?.collaboratorCode
        })
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
        navigation.goBack()
        navigation.navigate(ScreenKey.LIST_BOOKING)
    }


    const onSuccess = e => {
        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
        setIsBarcodeRead(true)
        console.log({ e });


        let objParsed = parseMyJson(e.data)
        console.log({ objParsed });


        if (_isEmpty(objParsed)) {
            return alertCustomNotAction(`Lỗi`, `Mã QR không hợp lệ`)
        }

        if (objParsed?.action == "create_booking") {
            // _handleOpenModalPickBranch(objParsed)
            // navigation.goBack()
            setTimeout(() => {
                navigation.replace(ScreenKey.CREATE_BOOKING, { refCode: objParsed })
            }, 500);
        }

        if (objParsed?.action == 'checkin') {
            _handleOpenModalListBooking(objParsed)
        }


    };

    const { height, width } = Dimensions.get('window');
    const maskRowHeight = 100
    const maskColWidth = 500;

    return (
        <>
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
            {/* <RNCamera
                // ref={cam => {
                //     this.camera = cam;
                // }}
                onBarCodeRead={onSuccess}
                barCodeTypes={isBarcodeRead ? [] : [RNCamera.Constants.BarCodeType.qr]}
                style={styles.cameraView}
                // aspect={Camera.constants.Aspect.fill}
                playSoundOnCapture
            >
                <View style={styles.maskOutter}>
                    <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                    <View style={[{ flex: 400 }, styles.maskCenter]}>
                        <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                        <View style={styles.maskInner} />
                        <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                    </View>
                    <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                </View>
            </RNCamera> */}


        </>
    );
});


const styles = StyleSheet.create({

    cameraView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)',
    },
    maskRow: {
        width: '100%',
    },
    maskCenter: { flexDirection: 'row' },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        paddingHorizontal: _moderateScale(8),
        color: '#777',
        alignSelf: 'center'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});


export default OpenCamera;