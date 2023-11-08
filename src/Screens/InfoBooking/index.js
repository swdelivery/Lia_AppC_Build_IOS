import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Button, RefreshControl, Linking } from 'react-native';


import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { URL_ORIGINAL } from '../../Constant/Url';
import { TabBar, TabView } from 'react-native-tab-view';
import { navigation } from '../../../rootNavigation';
import moment from 'moment'
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Tab1 from './Tab1';
import { getBookingByIdForPartner, createPaymentRequest, getBookingReviews } from '../../Redux/Action/BookingAction';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import ModalAddDeposit from './Components/ModalAddDeposit'
import _isEmpty from 'lodash/isEmpty'
import ModalPickSingleNotSearch from '../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch';

const InfoBooking = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    const childRef = useRef()
    const infoUserRedux = useSelector(state => state?.infoUserReducer)

    const [data, setData] = useState({})
    const [refresh, setRefresh] = useState(false)

    const [reviewBooking, setReviewBooking] = useState([])


    const [routes] = useState([
        { key: 'first', title: 'Thông tin' },
        { key: 'second', title: 'Hình ảnh' },
        { key: 'third', title: 'Thanh toán' },

    ]);
    const [index, setIndex] = useState(0);

    const [showModalAddDeposit, setShowModalAddDeposit] = useState(false)

    const [showModalListTreatment, setshowModalListTreatment] = useState(false)

    useEffect(() => {
        console.log({ props });
        _getBookingDataById()
        _getBookingReviews()
    }, [])

    const _getBookingDataById = async () => {
        let resultGetBookingByIdForPartner = await getBookingByIdForPartner(props?.route?.params?.data?._id)
        if (resultGetBookingByIdForPartner?.isAxiosError) return
        setData(resultGetBookingByIdForPartner?.data?.data)
    }

    const _getBookingReviews = async () => {
        let result = await getBookingReviews(props?.route?.params?.data?._id);
        if (result?.isAxiosError) return
        setReviewBooking(result?.data?.data)
    }


    const renderTabBar = (props) => {
        return (
            <View style={{ marginHorizontal: _moderateScale(8 * 2) }}>


                <TabBar
                    tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
                    {...props}
                    indicatorStyle={{ backgroundColor: 'transparent' }}
                    style={[{
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(8 * 4),
                        paddingLeft: _widthScale(3),
                    }, shadow]}
                    inactiveColor="grey"
                    activeColor={BASE_COLOR}
                    labelStyle={[stylesFont.fontNolanBold, {
                        fontSize: _moderateScale(14),
                    }]}
                    getLabelText={({ route }) => route.title}
                // renderLabel={({ route, focused, color }) => {
                //     return (
                //         <View
                //             style={[stylesFont.fontDinTextPro, focused ? styles.tabItemActive : styles.tabItemNotActive]}
                //         >
                //             <Text style={[
                //                 focused ? stylesFont.fontNolanBold : stylesFont.fontNolan,
                //                 focused ? styles.tabItem__textActive : styles.tabItem__textNoteActive
                //             ]}>
                //                 {route.title}
                //             </Text>
                //         </View>
                //     )
                // }}
                />
            </View>
        )
    }


    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <View style={{ marginTop: _moderateScale(8 * 2) }}>
                        <Tab1 data={data} isActiveTab={index == 0} />
                    </View>
                );
            case 'second':
                return (
                    <View style={{ marginTop: _moderateScale(8 * 2) }}>
                        <Tab2 data={data} isActiveTab={index == 1} />
                    </View>
                );
            case 'third':
                return (
                    <View style={{ marginTop: _moderateScale(8 * 2) }}>
                        <Tab3 ref={childRef} data={data} isActiveTab={index == 2} />
                    </View>
                );


            default:
                return null;
        }
    };

    const _confirmCreate = async (data) => {
        console.log({ data });


        let resultCreatePaymentRequest = await createPaymentRequest(data);
        if (resultCreatePaymentRequest?.isAxiosError) return;
        if (childRef?.current?.getAlert) {
            childRef.current.getAlert()
        }

        // setListImageBanking([])
        // setNoteDeposit('')
        // setMoneyDepositTab1('')
        // props?.hideAll()
        // navigation.navigate(ScreenKey.LIST_DEPOSIT_REQUEST)
        setShowModalAddDeposit(false)
        setIndex(2)
    }


    const _onRefresh = () => {
        setRefresh(true)
        if (childRef?.current?.getAlert) {
            childRef.current.getAlert()
        }
        _getBookingDataById()
        _getBookingReviews()

        setTimeout(() => {
            setRefresh(false)
        }, 500);
    }

    return (
        <View style={styles.container}>

            <ModalPickSingleNotSearch
                hide={() => {
                    setshowModalListTreatment(false)
                }}
                onSelect={(item) => {
                    // _handleChoiceItemFilter(item)
                    // console.log({item});
                    navigation.navigate(ScreenKey.MODAL_SERVICE_REVIEW, {
                        flag: 'fromTreatmentDetail',
                        data: {
                            treatmentDetailId: item?.treatmentDetailId,
                            doctorCode: item?.doctorCode,
                            serviceCode: item?.serviceCode,
                            branchCode: item?.branchCode,
                            hasReview: true
                        }
                    })

                }}
                data={!_isEmpty(reviewBooking) ? reviewBooking?.map(item => {
                    return {
                        name: item?.service?.name,
                        _id: item?._id,
                        treatmentDetailId: item?.treatmentDetailId,
                        doctorCode: item?.doctorCode,
                        serviceCode: item?.serviceCode,
                        branchCode: item?.branchCode,
                        hasReview: true
                    }
                }) : []} show={showModalListTreatment} />

            <ModalAddDeposit
                confirmCreate={_confirmCreate}
                data={data}
                hide={() => setShowModalAddDeposit(false)}
                hideAll={() => {
                    setShowModalAddDeposit(false)
                }}
                show={showModalAddDeposit} />


            <StatusBarCustom rmStatusBarHeight />

            <View style={[{ alignItems: 'flex-end', marginTop: _moderateScale(8 * 2), paddingRight: _moderateScale(8 * 2), position: 'absolute', top: _moderateScale(8 * 2) + getStatusBarHeight(), right: _moderateScale(8 * 2), zIndex: 1 }, shadow]}>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => navigation.goBack()}
                    style={[{
                        width: _moderateScale(8 * 3),
                        height: _moderateScale(8 * 3),
                        borderRadius: _moderateScale(8 * 3 / 2),
                        backgroundColor: WHITE
                    }, styleElement.centerChild]}>
                    <Image style={[sizeIcon.md, { transform: [{ rotate: '45deg' }] }]} source={require('../../Icon/plus_black.png')} />
                </TouchableOpacity>
            </View>

            <Animated.ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={_onRefresh}
                    />
                }
                contentContainerStyle={{ flexGrow: 1 }}
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'cover'}
                        style={[styles.banner(scrollA),]}
                        // source={{
                        //     uri:`${URL_ORIGINAL}${data?.servicesNeedCare[0]?.representationFileArr[0]?.link}`
                        // }}
                        source={
                            data?.type == 'FLASH_SALE' ?

                                data?.services?.length > 0 && data?.services[0]?.service?.representationFileArr?.length > 0 ?
                                    {
                                        uri: `${URL_ORIGINAL}${data?.services[0]?.service?.representationFileArr[0]?.link}`
                                    }
                                    :
                                    {
                                        uri: ''
                                    }
                                :
                                data?.servicesNeedCare?.length > 0 && data?.servicesNeedCare[0]?.representationFileArr?.length > 0 ?
                                    {
                                        uri: `${URL_ORIGINAL}${data?.servicesNeedCare[0]?.representationFileArr[0]?.link}`
                                    }
                                    :
                                    {
                                        uri: ''
                                    }
                        }
                    />
                    <View style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(33, 33, 33,.7)',
                        position: 'absolute',
                        zIndex: 0
                    }} />

                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500) + getStatusBarHeight(),
                        width: "100%"
                    }}>
                        {/* <View style={{ alignItems: 'flex-end', marginTop: _moderateScale(8 * 2), paddingRight: _moderateScale(8 * 2) }}>
                            <TouchableOpacity
                            onPress={()=>navigation.goBack()}
                            style={[{
                                width: _moderateScale(8 * 3),
                                height: _moderateScale(8 * 3),
                                borderRadius: _moderateScale(8 * 3 / 2),
                                backgroundColor: WHITE
                            }, styleElement.centerChild]}>
                                <Image style={[sizeIcon.md, { transform: [{ rotate: '45deg' }] }]} source={require('../../Icon/plus_black.png')} />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    <View style={{ position: 'absolute', bottom: _moderateScale(8 * 8), width: "100%" }}>
                        <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                            <View style={[sizeIcon.lllg, styleElement.centerChild]}>
                                <Image style={[sizeIcon.lg]} source={require('../../Icon/service_white.png')} />
                            </View>
                            <Text style={styles.banner_nameService}>
                                {
                                    data?.type == 'FLASH_SALE' ?
                                        <>
                                            {
                                                data?.services ?
                                                    <>
                                                        {
                                                            data?.services?.map((item, index) => {
                                                                if (index == data?.services?.length - 1) {
                                                                    return `${item?.service?.name}`
                                                                }
                                                                return `${item?.service?.name}, `
                                                            })
                                                        }
                                                    </>
                                                    :
                                                    ""
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                data?.servicesNeedCare?.length > 0 ?
                                                    <>
                                                        {
                                                            data?.servicesNeedCare?.map((item, index) => {
                                                                if (index == data?.servicesNeedCare?.length - 1) {
                                                                    return `${item?.name}`
                                                                }
                                                                return `${item?.name}, `
                                                            })
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                    {
                                                         data?.refTreatmentDetailId ? 
                                                         `Tái khám`
                                                         :``
                                                    }
                                                    </>
                                            }
                                        </>
                                }
                                {/* {
                                    data?.servicesNeedCare ?
                                        <>
                                            {
                                                data?.servicesNeedCare?.map((item, index) => {
                                                    if (index == data?.servicesNeedCare?.length - 1) {
                                                        return `${item?.name}`
                                                    }
                                                    return `${item?.name}, `
                                                })
                                            }
                                        </>
                                        :
                                        ""
                                } */}
                            </Text>
                        </View>
                        <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                            <View style={[sizeIcon.lllg, styleElement.centerChild]}>
                                <Image style={[sizeIcon.md]} source={require('../../Icon/calendar_white.png')} />
                            </View>
                            <Text style={styles.banner_nameService}>
                                {moment(data?.appointmentDateFinal?.from?.dateTime).format('LT')} -> {moment(data?.appointmentDateFinal?.to?.dateTime).format('LT')} | {moment(data?.appointmentDateFinal?.date).format('DD/MM')}
                            </Text>
                        </View>
                        <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                            <View style={[sizeIcon.lllg, styleElement.centerChild]}>
                                <Image style={[sizeIcon.lg]} source={require('../../Icon/location_white.png')} />
                            </View>
                            <Text style={styles.banner_nameService}>
                                {data?.branch?.name}
                            </Text>
                        </View>
                    </View>


                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    // paddingBottom: _moderateScale(8 * 20)
                }}>
                    <View style={styles.wave} />
                    {/* <View style={[styles.tabView, shadow]}>
                        <Text style={[stylesFont.fontNolanBold,
                        { color: BASE_COLOR }]}>THÔNG TIN TÀI KHOẢN</Text>
                    </View> */}
                    {/* <View style={{ height: _moderateScale(8 * 3) }} /> */}
                    <View style={{
                        flex: 1,
                        top: Platform.OS == 'ios' ? -_moderateScale(8 * 4) - _moderateScale(8 * 6 / 2) : -_moderateScale(8 * 2)
                        // top:-30,
                        // zIndex:1000
                        // width:"100%",
                        // height:'100%',
                        // position:'absolute',
                        // top:-40,
                        // zIndex:1000
                    }}>
                        <TabView
                            renderTabBar={renderTabBar}
                            swipeEnabled={true}
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            lazy
                        />
                    </View>

                </View>

            </Animated.ScrollView>

            {
                data?.status == 'WAIT' ?
                    <View style={{
                        paddingBottom: getBottomSpace() + _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 2),
                        paddingTop: _moderateScale(8)
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                setShowModalAddDeposit(true)

                            }}
                            style={{
                                backgroundColor: BASE_COLOR,
                                paddingVertical: _moderateScale(8),
                                alignItems: 'center',
                                borderRadius: _moderateScale(8)
                            }}>
                            <Text style={[stylesFont.fontNolan500, { color: WHITE, fontSize: _moderateScale(14) }]}>
                                Thêm cọc
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <></>
            }

            {
                data?.treatmentDoctorIdArr?.length > 0 && reviewBooking?.length > 0 ?
                    <View style={{
                        paddingBottom: getBottomSpace() + _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 2),
                        paddingTop: _moderateScale(8)
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setshowModalListTreatment(true)
                            }}
                            style={{
                                backgroundColor: BASE_COLOR,
                                paddingVertical: _moderateScale(8),
                                alignItems: 'center',
                                borderRadius: _moderateScale(8)
                            }}>
                            <Text style={[stylesFont.fontNolan500, { color: WHITE, fontSize: _moderateScale(14) }]}>
                                Xem đánh giá điều trị
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <></>
            }

            {
                _isEmpty(data?.treatmentDoctorIdArr) && reviewBooking?.length > 0 ?
                    <View style={{
                        paddingBottom: getBottomSpace() + _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 2),
                        paddingTop: _moderateScale(8)
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.MODAL_BOOKING_REVIEW, {
                                    // flag: 'fromTreatmentDetail',
                                    data: {
                                        ...reviewBooking[0],
                                        // treatmentDetailId: props?.data?._id,
                                        // doctorCode: props?.data?.treatmentDoctorCode,
                                        // serviceCode: props?.data?.serviceCode,
                                        // branchCode: props?.data?.branchCode,
                                        hasReview: true
                                    }
                                })
                            }}
                            style={{
                                backgroundColor: BASE_COLOR,
                                paddingVertical: _moderateScale(8),
                                alignItems: 'center',
                                borderRadius: _moderateScale(8)
                            }}>
                            <Text style={[stylesFont.fontNolan500, { color: WHITE, fontSize: _moderateScale(14) }]}>
                                Xem đánh giá Booking
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <></>
            }

            {
                data?.status == "WAS_CHECK_OUT" &&
                    _isEmpty(data?.treatmentDoctorIdArr) &&
                    _isEmpty(reviewBooking)  ?
                    <View style={{
                        paddingBottom: getBottomSpace() + _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 2),
                        paddingTop: _moderateScale(8)
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.MODAL_BOOKING_REVIEW, {
                                    // flag: 'fromTreatmentDetail',
                                    data: {
                                        bookingId: data?._id
                                        // treatmentDetailId: props?.data?._id,
                                        // doctorCode: props?.data?.treatmentDoctorCode,
                                        // serviceCode: props?.data?.serviceCode,
                                        // branchCode: props?.data?.branchCode,
                                        // hasReview: false
                                    },
                                    _getBookingDataById,
                                    _getBookingReviews
                                })

                                // navigation.navigate(ScreenKey.MODAL_SERVICE_REVIEW, {
                                //     // flag: 'fromTreatmentDetail',
                                //     data: {
                                //         // treatmentDetailId: props?.data?._id,
                                //         // doctorCode: props?.data?.treatmentDoctorCode,
                                //         serviceCode: props?.data?.serviceCode,
                                //         branchCode: props?.data?.branchCode,
                                //         hasReview: false
                                //     }
                                // })

                                //=======

                                // navigation.navigate(ScreenKey.MODAL_SERVICE_REVIEW, {
                                //     flag: 'fromMessage',
                                //     data: infoMessage
                                // })

                            }}
                            style={{
                                backgroundColor: BASE_COLOR,
                                paddingVertical: _moderateScale(8),
                                alignItems: 'center',
                                borderRadius: _moderateScale(8)
                            }}>
                            <Text style={[stylesFont.fontNolan500, { color: WHITE, fontSize: _moderateScale(14) }]}>
                                Đánh giá Booking
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <></>
            }

        </View>
    );
};


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}

const styles = StyleSheet.create({
    banner_nameService: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(18),
        color: WHITE,
        marginLeft: _moderateScale(8)
    },
    tabItem__textActive: {
        fontSize: _moderateScale(14),
        color: WHITE,
        textAlign: 'center'
    },
    tabItem__textNoteActive: {
        fontSize: _moderateScale(14),
        color: GREY,
    },


    tabItemActive: {
        backgroundColor: BASE_COLOR,
        borderRadius: _moderateScale(8),
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: _moderateScale(0),
    },
    tabItemNotActive: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(0),
        borderRadius: _moderateScale(8),
        backgroundColor: BG_GREY_OPACITY_2,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },


    tabBar: {
        flexDirection: 'row',
        paddingTop: _moderateScale(8 * 2),
        backgroundColor: 'white',
        alignItems: 'center',
    },

    tabView: {
        // position:'absolute',
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 4),
        top: -_moderateScale(8 * 4) - _moderateScale(8 * 6 / 2),
        // marginHorizontal: _moderateScale(8 * 4),
        height: _moderateScale(8 * 6)
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,
        // marginTop:getStatusBarHeight()
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
        // alignItems: 'flex-end',
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


export default InfoBooking;