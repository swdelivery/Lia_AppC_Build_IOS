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


const BookingView = memo((props) => {
    const dispatch = useDispatch()
    const listBranchRedux = useSelector(state => state.bookingReducer.listBranch)
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [height, setHeight] = useState(0)

    const [showModalCalendar, setShowModalCalendar] = useState(false)


    const [branchForBooking, setBranchForBooking] = useState(props?.branchCode)
    const [branchMain, setBranchMain] = useState(props?.infoBranch)

    const [listTimeForBooking, setListTimeForBooking] = useState([
        {
            _id: '1',
            from: '09:00',
            to: '11:00'
        },
        {
            _id: '2',
            from: '11:00',
            to: '13:00'
        },
        {
            _id: '3',
            from: '13:00',
            to: '15:00'
        },
        {
            _id: '4',
            from: '15:00',
            to: '17:00'
        },
        {
            _id: '5',
            from: '17:00',
            to: '19:00'
        },
        {
            _id: '6',
            from: '19:00',
            to: '21:00'
        },
    ])

    const [currPickDate, setCurrPickDate] = useState(moment()._d)

    const [currTimeChoice, setCurrTimeChoice] = useState({})

    const [listServiceHasChoice, setListServiceHasChoice] = useState([])

    const [codeRef, setCodeRef] = useState(props?.refCode)

    const [description, setDescription] = useState('')



    useEffect(() => {
        if (_isEmpty(listBranchRedux)) {
            dispatch(getListBranchLocation())
        }
    }, [listBranchRedux])

    // useEffect(() => {
    //     const tmp = listBranchRedux.find((item) => item.code === branchForBooking)
    //     if (!_isEmpty(tmp))
    //         setBranchMain(tmp)
    // }, [branchForBooking])


    const _handleConfirmPickDate = (date) => {
        console.log({ date });


        setCurrPickDate(moment(date).format())
        setShowModalCalendar(false)
    }

    const _handleConfirmCreateBooking = async () => {


        console.log({ codeRef, branchForBooking, currTimeChoice, listServiceHasChoice, description, currPickDate })

        if (_isEmpty(branchForBooking) || !currPickDate || _isEmpty(currTimeChoice) || _isEmpty(listServiceHasChoice)) {
            return alertCustomNotAction(
                `Lỗi`,
                `Điền đầy đủ các trường cần thiết`
            )
        }

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
            branchCode: branchForBooking,
            serviceNeedCareCodeArr: listServiceHasChoice?.map(item => item?.code),
            partnerPhone: {
                nationCode: infoUserRedux?.phone[0]?.nationCode,
                phoneNumber: infoUserRedux?.phone[0]?.phoneNumber
            },
            assignedDoctorCodeArr: [props?.infoDoctor?.code],
            description: description
        }
        if (codeRef?.length > 0) {
            dataFetchCreateBooking['referralCode'] = codeRef
        }


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
                        let resultCreateNewBooking = await createNewBooking(dataFetchCreateBooking);
                        if (resultCreateNewBooking?.isAxiosError) return
                        navigation.navigate(ScreenKey.LIST_BOOKING, { keyGoBack: 'MainTab' })
                        _clearAllState()
                    }
                }
            ],
            { cancelable: false }
        );

    }

    const _clearAllState = () => {
        setCodeRef('')
        setBranchForBooking('')
        setCurrTimeChoice({})
        setListServiceHasChoice([])
        setDescription('')
        setCurrPickDate(null)
    }

    console.log('branchMain', branchMain)

    return (
        <>
            <CalendarPickSingle
                minDate={new Date()}
                confirm={_handleConfirmPickDate}
                setShowModalCalendar={(flag) => {
                    setShowModalCalendar(flag)
                }} show={showModalCalendar} />

            <View style={{ paddingLeft: _moderateScale(8 * 3) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Mã giới thiệu
                </Text>
            </View>
            <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), flex: 1, marginTop: _moderateScale(8 * 2) }]}>
                <TextInput
                    onChangeText={(e) => setCodeRef(e)}
                    value={codeRef}
                    style={[styles.inputCodeRef, { flex: 1, marginHorizontal: _moderateScale(8 * 2) }]} placeholder={"vd: AF209BHN"} />
            </View>

            <View style={{ paddingLeft: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 3) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Bác sĩ {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>


                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2), marginLeft: _moderateScale(4) }]}>
                    {
                        props?.infoDoctor?.avatar?.link ?
                            <Image style={{ width: _moderateScale(8 * 5), height: _moderateScale(8 * 5), borderRadius: _moderateScale(8 * 5 / 2), borderWidth: _moderateScale(1), borderColor: BG_GREY_OPACITY_5 }}
                                source={{ uri: `${URL_ORIGINAL}${props?.infoDoctor?.avatar?.link}` }} />
                            :
                            <View style={{ width: _moderateScale(8 * 5), height: _moderateScale(8 * 5), borderRadius: _moderateScale(8 * 5 / 2), borderWidth: _moderateScale(1), borderColor: BG_GREY_OPACITY_5 }} />
                    }
                    <View style={{ marginLeft: _moderateScale(8) }}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                            {
                                props?.infoDoctor?.name
                            }
                        </Text>
                        <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(0) }]}>
                            <CountStar reviewCount={props?.infoDoctor?.reviewCount} averageRating={parseInt(props?.infoDoctor?.averageRating)} small />

                            <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8) }]}>
                                <Image style={sizeIcon.xxs} source={require('../../../NewIcon/people.png')} />
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                    {props?.infoDoctor?.countPartner}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>


            <View style={{ paddingLeft: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 3) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Chi nhánh {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>

                {!_isEmpty(branchMain) ?
                    <>
                        <View style={{ height: _moderateScale(8 * 2) }} />
                        <View style={[styleElement.rowAliCenter, {
                            marginHorizontal: _moderateScale(8 * 1),
                            marginBottom: _moderateScale(4),
                            flexDirection: 'row', flex: 1
                        }]}>
                            <View style={{ width: _moderateScale(8 * 3) }}>
                                <Image
                                    style={[sizeIcon.sm, styles.iCon]}
                                    source={require('../../../NewIcon/building.png')}
                                />
                            </View>
                            <Text style={[stylesFont.fontNolan500,
                            { opacity: 1, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8, paddingLeft: _moderateScale(4) }]}>
                                {
                                    `${branchMain?.name} `
                                }
                            </Text>
                        </View>
                        <View style={[styleElement.rowAliCenter, {
                            marginHorizontal: _moderateScale(8 * 1),
                            marginBottom: _moderateScale(4),
                            flexDirection: 'row', flex: 1
                        }]}>
                            <View style={{ width: _moderateScale(8 * 3) }}>
                                <Image
                                    style={[sizeIcon.xxs, styles.iCon]}
                                    source={require('../../../Icon/a_call.png')}
                                />
                            </View>
                            <Text style={[stylesFont.fontNolan500,
                            { opacity: 1, fontSize: _moderateScale(14), fontStyle: 'italic', color: Color.BLACK_OPACITY_8, paddingLeft: _moderateScale(4) }]}>
                                {
                                    `${branchMain?.phone} `
                                }
                            </Text>
                        </View>
                        <View style={[styleElement.rowAliCenter, {
                            marginHorizontal: _moderateScale(8 * 1),
                            // marginBottom: _moderateScale(8 * 2),
                            flexDirection: 'row', flex: 1
                        }]}>
                            <View style={{ width: _moderateScale(8 * 3) }}>
                                <Image
                                    style={[sizeIcon.xs, styles.iCon]}
                                    source={require('../../../Icon/a_address.png')}
                                />
                            </View>
                            <Text style={[stylesFont.fontNolan500,
                            { opacity: 1, flex: 1, fontSize: _moderateScale(14), fontStyle: 'italic', color: Color.GREY_FOR_TITLE, paddingLeft: _moderateScale(4) }]}>
                                {
                                    `${branchMain?.address}`
                                }
                            </Text>
                        </View>
                    </> : <></>}

            </View>

            <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 3) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Thời gian hẹn {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>

                <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 2) }]}>

                    {
                        moment(new Date()).isSame(currPickDate, 'day') ?
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrPickDate(moment()._d)
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
                                    setCurrPickDate(moment()._d)
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
                        moment().add(1, 'days').isSame(currPickDate, 'day') ?
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrPickDate(moment().add(1, 'days')._d)
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
                                    setCurrPickDate(moment().add(1, 'days')._d)
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
                        moment().add(2, 'days').isSame(currPickDate, 'day') ?
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrPickDate(moment().add(2, 'days')._d)
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
                                    setCurrPickDate(moment().add(2, 'days')._d)
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
                        currPickDate &&
                            !moment(new Date()).isSame(currPickDate, 'day') &&
                            !moment().add(1, 'days').isSame(currPickDate, 'day') &&
                            !moment().add(2, 'days').isSame(currPickDate, 'day') ?

                            <TouchableOpacity style={styles.overBtnCalendar}>
                                <View style={[styles.overBtnCalendar__month, { backgroundColor: SECOND_COLOR }]}>
                                    <Text style={[styles.overBtnCalendar__month__text1, { color: WHITE, fontSize: _moderateScale(14) }]}>Thg {
                                        moment(currPickDate).format('MM')
                                    }
                                    </Text>
                                    <Text style={styles.overBtnCalendar__month__text2, { color: WHITE, fontSize: _moderateScale(16), ...stylesFont.fontNolanBold }}>
                                        {
                                            moment(currPickDate).format('DD')
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
                                    setShowModalCalendar(true)
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


            <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                <View style={[styles.listTime]}>
                    {
                        listTimeForBooking?.map((item, index) => {
                            if (item?._id == currTimeChoice?._id) {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.itemTime, styles.itemTimeActive]}>
                                        <Text style={[styles.titTime, styles.titTimeActive]}>
                                            {item?.from} - {item?.to}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                            return (
                                <TouchableOpacity
                                    onPress={() => setCurrTimeChoice(item)}
                                    key={index}
                                    style={[styles.itemTime]}>
                                    <Text style={[styles.titTime]}>
                                        {item?.from} - {item?.to}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
            </View>


            <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 3) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Dịch vụ {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>
            </View>

            <View style={[{ marginTop: _moderateScale(0), marginBottom: _moderateScale(8 * 1) }]}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    <View style={[styles.listService]}>

                        {
                            listServiceHasChoice?.map((item, index) => {
                                return (

                                    <View style={[{
                                        marginRight: _moderateScale(8 * 2),
                                        marginBottom: _moderateScale(6),
                                        position: 'relative',
                                    }]} key={index}>
                                        <ImageBackground
                                            style={{
                                                width: _moderateScale(8 * 19),
                                                height: _moderateScale(8 * 19),
                                            }}
                                            imageStyle={{ borderWidth: 1, borderRadius: _moderateScale(8), backgroundColor: Color.BG_GREY_OPACITY_2, }}
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                            }}
                                        />
                                        <TouchableOpacity
                                            hitSlop={styleElement.hitslopSm}
                                            onPress={() => {
                                                setListServiceHasChoice(olds => olds?.filter(itemFilter => itemFilter?._id !== item?._id))
                                            }}
                                            style={{
                                                position: 'absolute',
                                                right: _moderateScale(-8),
                                                top: _moderateScale(-8),
                                                width: _moderateScale(8 * 2.5),
                                                height: _moderateScale(8 * 2.5),
                                                backgroundColor: Color.RED,
                                                borderRadius: _moderateScale(8 * 2.5 / 2),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center'
                                            }}>
                                            <View style={{
                                                width: _moderateScale(8 * 1.25),
                                                height: _moderateScale(2.5),
                                                backgroundColor: WHITE
                                            }} />
                                        </TouchableOpacity>


                                        <View style={{ paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 1), borderBottomWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, borderColor: BG_GREY_OPACITY_5, borderRadius: _moderateScale(8), borderTopEndRadius: 0, borderTopStartRadius: 0, width: _moderateScale(8 * 19), }}>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                                    {formatMonney(item?.price)}
                                                </Text>
                                                <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: Color.PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                            </View>

                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, {
                                                fontSize: _moderateScale(14),
                                                color: Color.BLACK_OPACITY_8,
                                                marginTop: _moderateScale(0)
                                            }]}>
                                                {item?.name}
                                            </Text>

                                            <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8), justifyContent: 'space-between' }]}>

                                                <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} small />

                                                <View style={[styleElement.rowAliCenter]}>
                                                    <Image style={sizeIcon.xxs} source={require('../../../NewIcon/people.png')} />
                                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                                        {item?.countPartner}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    // <View key={item?._id} style={[, {
                                    //     width: _moderateScale(180),
                                    //     paddingBottom: _moderateScale(4),
                                    //     marginRight: _moderateScale(8 * 2),
                                    //     borderRadius: _moderateScale(8),
                                    //     backgroundColor: WHITE,
                                    // }, shadow]}>

                                    //     <View style={{ position: 'absolute', zIndex: 1, right: -_moderateScale(8), top: -_moderateScale(8) }}>
                                    //         <TouchableOpacity
                                    //             onPress={() => {
                                    //                 setListServiceHasChoice(olds => olds?.filter(itemFilter => itemFilter?._id !== item?._id))
                                    //             }}
                                    //             style={{
                                    //                 backgroundColor: Color.RED,
                                    //                 width: _moderateScale(8 * 2),
                                    //                 height: _moderateScale(8 * 2),
                                    //                 borderRadius: _moderateScale(8 * 2 / 2),
                                    //                 justifyContent: 'center',
                                    //                 alignItems: 'center'
                                    //             }}>
                                    //             <View style={{
                                    //                 width: _moderateScale(8),
                                    //                 height: _moderateScale(3),
                                    //                 backgroundColor: WHITE
                                    //             }} />
                                    //         </TouchableOpacity>
                                    //     </View>

                                    //     <Image
                                    //         style={[styles.imgService, { backgroundColor: BG_GREY_OPACITY_5, borderRadius: _moderateScale(8 * 1) }]}
                                    //         resizeMode="cover"
                                    //         source={{
                                    //             uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                    //         }} />

                                    //     <View style={{ paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 1) }}>

                                    //         <View style={{ flexDirection: 'row' }}>
                                    //             <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                    //                 {formatMonney(item?.price)}
                                    //             </Text>
                                    //             <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: Color.PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                    //         </View>

                                    //         <Text numberOfLines={1} style={[stylesFont.fontNolan500, {
                                    //             fontSize: _moderateScale(14),
                                    //             color: Color.BLACK_OPACITY_8,
                                    //             marginTop: _moderateScale(0)
                                    //         }]}>
                                    //             {item?.name}
                                    //         </Text>

                                    //         <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8), justifyContent: 'space-between' }]}>

                                    //             <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} small />

                                    //             <View style={[styleElement.rowAliCenter]}>
                                    //                 <Image style={sizeIcon.xxs} source={require('../../../NewIcon/people.png')} />
                                    //                 <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                    //                     `$84`
                                    //                 </Text>
                                    //             </View>
                                    //         </View>
                                    //     </View>
                                    // </View>
                                )
                            })
                        }
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.PICK_SERVICE_TO_BOOKING, { setListServiceHasChoice, listServiceHasChoice })
                            }}
                            style={[styles.itemService, {
                                justifyContent: 'center', alignItems: 'center',
                            }]}>
                            <Image style={sizeIcon.md} source={require('../../../NewIcon/plusGrey.png')} />
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>

            <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 0) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Ghi chú
                </Text>

                <View style={{
                    minHeight: _moderateScale(8 * 10),
                    backgroundColor: Color.BG_GREY_OPACITY_2,
                    marginTop: _moderateScale(8 * 2),
                    borderRadius: _moderateScale(8),
                    padding: _moderateScale(8),
                    paddingHorizontal: _moderateScale(8 * 1.5),
                }}>
                    <TextInput
                        onChangeText={(content) => {
                            setDescription(content)
                        }}
                        value={description}
                        placeholder={'vd: Tôi muốn xử lý da dư'}
                        multiline
                        style={{
                            flex: 1,
                            fontSize: _moderateScale(14)
                        }} />
                </View>
            </View>

            <View style={{ height: _moderateScale(8 * 5) }} />


            <TouchableOpacity
                onPress={() => {
                    _handleConfirmCreateBooking()
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
                    Xác nhận lịch hẹn
                </Text>
            </TouchableOpacity>

            <View style={{ height: 50 }} />


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
    btnCheckCode__text: {
        fontSize: _moderateScale(14),
        color: WHITE
    },
    btnCheckCode: {
        backgroundColor: Color.BLUE_FB, height: '100%',
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'center'
    },
    inputCodeRef: {
        // marginRight: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        color: Color.BLACK_OPACITY_8,
        color: Color.BLUE_FB
    },
    containTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleMain: {
        fontSize: _moderateScale(16),
        color: GREY, marginLeft: _moderateScale(8 * 2)
    },
    rowContent: {
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2),
        marginTop: _moderateScale(8 * 3),
        marginBottom: _moderateScale(8 * 5)
    },
    listBranch: {
        flexDirection: "row"
    },
    itemBranch: {
        width: _moderateScale(150),
        height: _moderateScale(80),
        marginRight: _moderateScale(12),
        backgroundColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        padding: _moderateScale(12),
        paddingHorizontal: _moderateScale(20),
    },
    itemBranchActive: {
        backgroundColor: SECOND_COLOR
    },
    titItemBranch: {
        color: WHITE,
        fontSize: _moderateScale(18),
        ...stylesFont.fontNolan500
    },
    listTime: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: _moderateScale(4),
        justifyContent: 'space-between',
        paddingHorizontal: _moderateScale(8),
        // paddingBottom: _moderateScale(16),

    },
    itemTime: {
        width: _moderateScale(105),
        marginTop: _moderateScale(8),
        borderColor: BG_GREY_OPACITY_9,
        alignItems: 'center',
        padding: _moderateScale(4),
        borderRadius: 4,
        borderWidth: 0.5,
    },
    itemTimeActive: {
        borderWidth: 0,
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
    listService: {
        flexDirection: 'row',
        paddingVertical: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 3),
        alignItems: 'center'

    },
    imgService: {
        width: '100%',
        height: _moderateScale(100),
        borderTopLeftRadius: _moderateScale(8),
        borderTopRightRadius: _moderateScale(8)
    },
    itemService: {
        width: _moderateScale(90),
        height: _moderateScale(100),
        marginRight: _moderateScale(8 * 2),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        shadowColor: BG_GREY_OPACITY_9,
        backgroundColor: WHITE,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    },
    bottomService: {
        position: 'relative',
        width: '100%',
        flex: 1
    },
    priceService: {
        backgroundColor: SECOND_COLOR,
        alignItems: 'center',
        paddingVertical: _moderateScale(2),
        borderRadius: _moderateScale(4),
        position: 'absolute',
        top: _moderateScale(-8),
        right: 0,
        paddingHorizontal: _moderateScale(8 * 1.5)
    },
    nameService: {
        flexDirection: 'row',
        marginTop: _moderateScale(16),
        paddingHorizontal: _moderateScale(16),

    },
    rateService: {
        flexDirection: 'row',
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(16),

    },
    chooseService: {
        flexDirection: 'row',
        width: 160,
        alignSelf: 'center',
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(16),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(20),
        justifyContent: 'center',
        borderColor: SECOND_COLOR,
        borderWidth: 1
    },
    chooseServiceActive: {
        backgroundColor: Color.THIRD_COLOR,
        borderWidth: 0
    },
    txtName: {
        color: SECOND_COLOR,
        fontSize: _moderateScale(14)
    },
    txtPrice: {
        color: WHITE,
        fontSize: _moderateScale(14)
    },
    txtBtn: {
        color: SECOND_COLOR
    },
    txtActive: {
        color: WHITE
    },
    input: {
        width: _widthScale(300),
        color: Color.GREY,
        fontSize: _widthScale(14),
        marginHorizontal: _moderateScale(16),
        // maxHeight: _moderateScale(40),
        // backgroundColor:'red',
        padding: _moderateScale(8),
        // borderWidth:1,
        borderBottomWidth: 1,
        borderColor: SECOND_COLOR
    },


})

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


export default BookingView;