import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BASE_COLOR, BLACK_OPACITY_8 } from '../../Constant/Color';
import { randomStringFixLengthCode, alertCustomNotAction } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModalAllNotifi } from '../../Redux/Action/NotificationAction';
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import InputRefCode from './Components/InputRefCode';
import InputBranch from './Components/InputBranch';
import ModalPickBranch from './Components/ModalPickBranch';
import InputDoctor from './Components/InputDoctor';
import ModalPickDoctor from './Components/ModalPickDoctor';
import Collapsible from 'react-native-collapsible';
import PickDateTime from './Components/PickDateTime';
import moment from 'moment'
import CalendarPickSingle from '../../Components/CalendarPickSingle/CalendarPickSingle'
import PickService from './Components/PickService';
import _isEmpty from 'lodash/isEmpty'
import { createNewBooking, getPartnerCoupon, getBookingByIdForPartner, updateBooking } from '../../Redux/Action/BookingAction';
import ScreenKey from '../../Navigation/ScreenKey'
import ModalInfoCoupon from './Components/ModalInfoCoupon';
import { createFlashSaleBooking } from '../../Redux/Action/FlashSaleAction';
import ModalTheLeFlashSale from './Components/ModalTheLeFlashSale';

const CreateBookingFlashSale = memo((props) => {
    const dispatch = useDispatch()



    const scrollA = useRef(new Animated.Value(0)).current;
    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)


    const [listTimeForBooking, setListTimeForBooking] = useState([
        // {
        //     _id: '1',
        //     from: '08:00',
        //     to: '09:00'
        // },
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

    const [openListBranch, setOpenListBranch] = useState({
        data: {},
        show: false
    })
    const [openListDoctor, setOpenListDoctor] = useState({
        data: {},
        show: false
    })
    const [openInfoCoupon, setOpenInfoCoupon] = useState({
        data: {},
        show: false
    })

    const [currBranch, setCurrBranch] = useState({})
    const [currDoctor, setCurrDoctor] = useState({})
    const [currPickDate, setCurrPickDate] = useState(moment()._d)
    const [currTimeChoice, setCurrTimeChoice] = useState({
        _id: '2',
        from: '09:00',
        to: '10:00'
    })
    const [showModalCalendar, setShowModalCalendar] = useState(false)
    const [listServiceHasChoice, setListServiceHasChoice] = useState([])
    const [codeRef, setCodeRef] = useState('')
    const [description, setDescription] = useState('')

    const [listCoupon, setListCoupon] = useState([])
    const [listCouponActive, setListCouponActive] = useState([])

    const [isShowTheLe, setIsShowTheLe] = useState(false)

    useEffect(() => {
        _getListCoupon()
    }, [])

    useEffect(() => {
        if (props?.route?.params?.idBooking) {
            _getDataBookingById(props?.route?.params?.idBooking)
        }
    }, [props?.route?.params?.idBooking])

    const _getDataBookingById = async (id) => {
        let resultGetBookingByIdForPartner = await getBookingByIdForPartner(id)
        if (resultGetBookingByIdForPartner?.isAxiosError) return
        setCurrBranch(resultGetBookingByIdForPartner?.data?.data?.branch)
        if (resultGetBookingByIdForPartner?.data?.data?.assignedDoctorArr?.length > 0) {
            setCurrDoctor(resultGetBookingByIdForPartner?.data?.data?.assignedDoctorArr[0])
        }
        setCurrPickDate(resultGetBookingByIdForPartner?.data?.data?.appointmentDateFinal?.date)
        let timeFind = listTimeForBooking?.find(item => {
            return Number(item?.from?.split(':')[0]) == resultGetBookingByIdForPartner?.data?.data?.appointmentDateFinal?.from?.hour
        })
        if (timeFind) {
            setCurrTimeChoice(timeFind)
        }

        console.log({ axaxax: resultGetBookingByIdForPartner?.data?.data?.services });

        let x = resultGetBookingByIdForPartner?.data?.data?.services?.map(item => {
            return {
                ...item?.service,
                finalPrice: item?.finalPrice,
                servicePromotionId: item?._id
            }
        })

        setListServiceHasChoice(x)
        setListCouponActive(resultGetBookingByIdForPartner?.data?.data?.partnerCoupons)
        setDescription(resultGetBookingByIdForPartner?.data?.data?.description)

        if (resultGetBookingByIdForPartner?.data?.data?.referralCode) {
            setCodeRef(resultGetBookingByIdForPartner?.data?.data?.referralCode)
        }
    }

    const _getListCoupon = async () => {
        let result = await getPartnerCoupon({
            "condition": {
                "usedAt": {
                    "equal": null
                }
            },
        })
        if (result?.isAxiosError) return
        setListCoupon(result?.data?.data)
    }

    useEffect(() => {
        console.log({ props });
        if (props?.route?.params?.choiceService) {
            setListServiceHasChoice([props?.route?.params?.choiceService])
        }
        if (props?.route?.params?.choiceBranch) {
            setCurrBranch(props?.route?.params?.choiceBranch)
        }
        if (props?.route?.params?.choiceDoctor) {
            setCurrDoctor(props?.route?.params?.choiceDoctor)
            setCurrBranch(props?.route?.params?.choiceDoctor?.branch)
        }
        if (props?.route?.params?.refCode) {
            setCodeRef(props?.route?.params?.refCode?.collaboratorCode)
        }

    }, [props?.route?.params])

    const _handleOpenListBranch = () => {
        setOpenListBranch({
            data: {},
            show: true
        })
    }
    const _handleOpenListDoctor = () => {
        setOpenListDoctor({
            data: {},
            show: true
        })
    }

    const _handleConfirmPickBranch = (data) => {
        console.log({ data });
        setOpenListBranch({
            data: {},
            show: false
        })
        setTimeout(() => {
            setCurrBranch(data)

        }, 300);
    }
    const _handleConfirmPickDoctor = (data) => {
        console.log({ data });
        setCurrDoctor(data)
        setOpenListDoctor({
            data: {},
            show: false
        })
    }

    const _handleConfirmPickDate = (date) => {
        setCurrPickDate(moment(date).format())
        setShowModalCalendar(false)
    }


    const _handleConfirmCreateBooking = async () => {


        console.log({ codeRef, currBranch, currDoctor, currTimeChoice, listServiceHasChoice, description, currPickDate })

        // if (_isEmpty(currBranch) || !currPickDate || _isEmpty(currTimeChoice) || _isEmpty(listServiceHasChoice)) {
        //     return alertCustomNotAction(
        //         `Lỗi`,
        //         `Điền đầy đủ các trường cần thiết`
        //     )
        // }

        let dataFetchCreateBooking = {
            appointmentDate: {
                date: currPickDate,
                from: {
                    hour: Number(currTimeChoice?.from?.split(':')[0]),
                    minute: Number(currTimeChoice?.from?.split(':')[1])
                },
                to: {
                    hour: Number(currTimeChoice?.to?.split(':')[0]),
                    minute: Number(currTimeChoice?.to?.split(':')[1])
                }
            },
            branchCode: currBranch?.code,
            servicePromotionId: listServiceHasChoice[0]?.servicePromotionId,
            partnerPhone: {
                nationCode: infoUserRedux?.phone[0]?.nationCode,
                phoneNumber: infoUserRedux?.phone[0]?.phoneNumber
            },
            description: description
        }

        if (currDoctor?.code) {
            dataFetchCreateBooking['assignedDoctorCodeArr'] = [currDoctor?.code]
        }

        // if (codeRef?.length > 0) {
        //     dataFetchCreateBooking['referralCode'] = codeRef
        // }

        if (listCouponActive?.length > 0) {
            dataFetchCreateBooking['partnerCouponIdArr'] = listCouponActive?.map(item => item?._id)
        }

        // setIsShowTheLe(true)

        if (props?.route?.params?.idBooking) {
            Alert.alert(
                "Xác nhận",
                `Xác nhận cập nhật lịch hẹn?`,
                [
                    {
                        text: "Huỷ",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Đồng ý", onPress: async () => {
                            // console.log({dataFetchCreateBooking});
                            let resultCreateNewBooking = await updateBooking(dataFetchCreateBooking, props?.route?.params?.idBooking);
                            if (resultCreateNewBooking?.isAxiosError) return
                            navigation.goBack()
                            _clearAllState()
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Xác nhận",
                `Xác nhận tạo lịch hẹn?`,
                [
                    {
                        text: "Huỷ",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Đồng ý", onPress: async () => {
                            // console.log({dataFetchCreateBooking});
                            let resultCreateNewBooking = await createFlashSaleBooking(dataFetchCreateBooking);
                            if (resultCreateNewBooking?.isAxiosError) return setIsShowTheLe(false)
                            navigation.navigate(ScreenKey.LIST_BOOKING, { keyGoBack: 'MainTab' })
                            setIsShowTheLe(false)
                            _clearAllState()
                        }
                    }
                ],
                { cancelable: false }
            );
        }


    }
    const _clearAllState = () => {
        setCodeRef('')
        // setBranchForBooking('')
        setCurrTimeChoice({})
        setListServiceHasChoice([])
        setDescription('')
        setCurrPickDate(null)
    }

    const _onClickInfoCoupon = (data) => {
        console.log({ data });

        setOpenInfoCoupon({
            data: data,
            show: true
        })
    }

    const _handleConfirmCoupon = (data) => {
        console.log({ data, listCouponActive });
        if (listCouponActive?.find(item => item?._id == data?._id)) return
        setListCouponActive(old => [...old, data])
    }

    const _handleRemoveCoupon = (data) => {
        console.log({ data });
        setListCouponActive(old => old?.filter(item => item?._id !== data?._id))
    }
    console.log({ listServiceHasChoice });

    return (
        <View style={styles.container}>

            <ModalTheLeFlashSale
                hide={() => {
                    setIsShowTheLe(false)
                }}
                confirm={() => {
                    _handleConfirmCreateBooking()
                }}
                show={isShowTheLe} />

            <ModalPickBranch
                confirmChoice={_handleConfirmPickBranch}
                hide={() => {
                    setOpenListBranch({
                        data: {},
                        show: false
                    })
                }}
                show={openListBranch?.show} />

            <ModalInfoCoupon
                hide={() => {
                    setOpenInfoCoupon({
                        data: {},
                        show: false
                    })
                }}
                // confirmCoupon={_handleConfirmCoupon}
                confirmCoupon={(item) => {
                    if (item?.coupon?.minRequiredOrderAmount && listServiceHasChoice?.reduce((sum, { price }) => sum + price, 0) < item?.coupon?.minRequiredOrderAmount) {
                        return alertCustomNotAction(`Thông báo`, `Đơn hàng chưa đạt đủ ${item?.coupon?.minRequiredOrderAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} để áp dụng voucher này.`)
                    }
                    _handleConfirmCoupon(item)
                    setOpenInfoCoupon({
                        data: {},
                        show: false
                    })
                }}
                data={openInfoCoupon?.data}
                show={openInfoCoupon?.show} />

            <ModalPickDoctor
                confirmChoice={_handleConfirmPickDoctor}
                hide={() => {
                    setOpenListDoctor({
                        data: {},
                        show: false
                    })
                }}
                show={openListDoctor?.show} />

            <CalendarPickSingle
                minDate={new Date()}
                confirm={_handleConfirmPickDate}
                setShowModalCalendar={(flag) => {
                    setShowModalCalendar(flag)
                }} show={showModalCalendar} />

            <StatusBarCustom />
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer, { backgroundColor: BASE_COLOR }]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../NewImage/bannerDoctorBooking.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                            <TouchableOpacity
                                hitSlop={styleElement.hitslopSm}
                                onPress={() => navigation.goBack()}>
                                <Image style={[sizeIcon.llg]} source={require('../../Icon/back_left_white.png')} />
                            </TouchableOpacity>
                            <Image
                                style={[sizeLogo.xl, { marginLeft: _moderateScale(4) }]}
                                source={require('../../NewImage/logoCenter2.png')}
                            />
                            <View style={{ opacity: 0 }}>
                                <AlarmNotifi />
                            </View>
                        </View>

                        <Text style={[stylesFont.fontNolanBold, styles.title]}>
                            Hi, {
                                `${infoUserRedux?.name}`
                            }
                        </Text>
                        <Text style={[stylesFont.fontNolan, styles.title,
                        { width: "45%", fontSize: _moderateScale(14), marginTop: _moderateScale(4) }]}>
                            Vui lòng nhập đầy đủ thông tin bên dưới
                        </Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    marginTop: _moderateScale(12)
                }}>
                    <View style={[styles.wave]} />
                    <KeyboardAwareScrollView>
                        {/* {
                            _isEmpty(infoUserRedux?.referralCode)?
                                <>
                                    <InputRefCode
                                        codeRef={codeRef}
                                        setCodeRef={setCodeRef} />
                                    <View style={{ height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginVertical: _moderateScale(8 * 2) }} />
                                </>
                                : <></>
                        } */}


                        <InputBranch currBranch={currBranch} handleOpenListBranch={_handleOpenListBranch} />

                        {/* <Collapsible collapsed={currBranch?._id ? false : true}>
                            <InputDoctor currDoctor={currDoctor} handleOpenListDoctor={_handleOpenListDoctor} />
                        </Collapsible> */}

                        <View style={{ height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginTop: _moderateScale(8 * 2) }} />
                        <PickDateTime
                            setShowModalCalendar={setShowModalCalendar}
                            setCurrTimeChoice={setCurrTimeChoice}
                            setCurrPickDate={setCurrPickDate}
                            listTimeForBooking={listTimeForBooking}
                            currTimeChoice={currTimeChoice}
                            currPickDate={currPickDate} />

                        <View style={{ height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginTop: _moderateScale(8 * 2) }} />
                        <PickService
                            flashSale={true}
                            removeCoupon={_handleRemoveCoupon}
                            setListCouponActive={setListCouponActive}
                            confirmCoupon={_handleConfirmCoupon}
                            onClickInfoCoupon={_onClickInfoCoupon}
                            listCoupon={listCoupon}
                            listCouponActive={listCouponActive}
                            setDescription={setDescription}
                            description={description}
                            setListServiceHasChoice={setListServiceHasChoice}
                            listServiceHasChoice={listServiceHasChoice} />

                        <View style={{ height: _moderateScale(8 * 5) }} />

                        <TouchableOpacity
                            onPress={() => {
                                // _handleConfirmCreateBooking()
                                if (_isEmpty(currBranch) || !currPickDate || _isEmpty(currTimeChoice) || _isEmpty(listServiceHasChoice)) {
                                    return alertCustomNotAction(
                                        `Lỗi`,
                                        `Điền đầy đủ các trường cần thiết`
                                    )
                                }
                                setIsShowTheLe(true)
                            }}
                            style={[{
                                height: _moderateScale(8 * 5),
                                backgroundColor: WHITE,
                                marginHorizontal: _moderateScale(8 * 2),
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: BASE_COLOR,
                                marginVertical: _moderateScale(8),
                            }]}>

                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                {
                                    props?.route?.params?.idBooking ?
                                        `Cập nhật lịch hẹn`
                                        :
                                        `Xác nhận lịch hẹn`
                                }
                            </Text>
                        </TouchableOpacity>


                    </KeyboardAwareScrollView>

                </View>

                <View style={{ height: _moderateScale(50) }} />
            </Animated.ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(244, 244, 244,0.8)',
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
        marginLeft: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 3)
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
        // width: 100%, 
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


export default CreateBookingFlashSale;