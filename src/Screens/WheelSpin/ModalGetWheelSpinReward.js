import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width, _heightScale } from '../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, SECOND_COLOR, THIRD_COLOR, BLACK, RED, GREEN_SUCCESS, GREY_FOR_TITLE, BASE_COLOR } from '../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import moment from 'moment'
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { getDataLiaBonusEvent } from '../../Redux/Action/SpinWheelAction'
import { getConfigData } from '../../Redux/Action/OrtherAction';
import RenderHtml from 'react-native-render-html';
import PickDateTime from '../CreateBooking/Components/PickDateTime';
import CalendarPickSingle from '../../Components/CalendarPickSingle/CalendarPickSingle'
import { createNewBooking, getAllServiceByGroupId, getListServiceForBooking } from '../../Redux/Action/BookingAction';
import ModalListServiceNotPrice from './ModalListServiceNotPrice';
import { getListBranchV2 } from '../../Redux/Action/BranchAction';
import { useSelector } from 'react-redux';

const ModalGetWheelSpinReward = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [listData, setListData] = useState([])
    const [isFirstLoad, setIsFirstLoad] = useState(false)

    const [configDataRewardWheelSpinRule, setConfigDataRewardWheelSpinRule] = useState(false)

    const [showModalCalendar, setShowModalCalendar] = useState(false)
    const [currTimeChoice, setCurrTimeChoice] = useState({
        _id: '11',
        from: '18:00',
        to: '19:00'
    })
    const [currPickDate, setCurrPickDate] = useState(moment().add(1,'days')._d)
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

    const [showModalListServiceNotPrice, setShowModalListServiceNotPrice] = useState(false)
    const [listServiceChoice, setListServiceChoice] = useState([])

    const [listBranch, setListBranch] = useState([])


    useEffect(() => {
        _getConfigData()
        _getListBranch()
    }, [])

    const _getListBranch = async () => {
        let result = await getListBranchV2({})
        if (result?.isAxiosError) return;
        setListBranch(result?.data?.data)
    }

    const _getConfigData = async () => {
        let result = await getConfigData("REWARD_WHEEL_SPIN_RULES");
        if (result?.isAxiosError) return;
        setConfigDataRewardWheelSpinRule(result)
    }

    const _handleConfirmPickDate = (date) => {
        setCurrPickDate(moment(date).format())
        setShowModalCalendar(false)
    }

    const _handleConfirmBooking = async () => {
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
            branchCode: listBranch?.length ? listBranch[0]?.code : null,
            serviceNeedCareCodeArr: listServiceChoice?.map(item => item?.code),
            partnerPhone: {
                nationCode: infoUserRedux?.phone[0]?.nationCode,
                phoneNumber: infoUserRedux?.phone[0]?.phoneNumber
            },
            description: "Từ vòng quay may mắn"
        }

        console.log({dataFetchCreateBooking});

        let resultCreateNewBooking = await createNewBooking(dataFetchCreateBooking);

        if (resultCreateNewBooking?.response?.data?.message == 'Khách hàng đã có lịch đặt hẹn') {
            Alert.alert(
                "Trùng lịch hẹn",
                `Đã có lịch hẹn vào ngày này, bạn có muốn xem lại lịch hẹn đó không?`,
                [
                    {
                        text: "Huỷ",
                        onPress: () => { },
                        style: "cancel"
                    },
                    {
                        text: "Đồng ý", onPress: async () => {
                            navigation.goBack()
                            navigation.navigate(ScreenKey.CREATE_BOOKING, { idBooking: resultCreateNewBooking?.response?.data?.data?._id })
                        }
                    }
                ],
                { cancelable: false }
            );
            return
        }
        if (resultCreateNewBooking?.isAxiosError) return
        // navigation.navigate(ScreenKey.HOME)
        navigation.navigate(ScreenKey.LIST_BOOKING, {  })
    }


    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: "center",
                // paddingBottom: getBottomSpace() + _moderateScale(8 * 2)
            }}
            isVisible={props.show}
            useNativeDriver={true}
            // onModalShow={_getData}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                // props?.hide()
            }}
            onBackdropPress={() => {
                // props?.hide()
            }}>

            <ModalListServiceNotPrice
                setListServiceChoice={setListServiceChoice}
                listServiceChoice={listServiceChoice}
                hide={() => {
                    setShowModalListServiceNotPrice(false)
                }}
                confirm={(data) => {
                    setListServiceChoice(data)
                    setShowModalListServiceNotPrice(false)
                }}
                show={showModalListServiceNotPrice} />

            <CalendarPickSingle
                minDate={new Date()}
                confirm={_handleConfirmPickDate}
                setShowModalCalendar={(flag) => {
                    setShowModalCalendar(flag)
                }} show={showModalCalendar} />

            <View style={styles.container}>
                <View style={[styleElement.rowAliCenter, { padding: _moderateScale(8 * 2), paddingBottom: 0 }]}>
                    <Text style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>

                    </Text>
                    <View style={{ alignItems: 'flex-end', }}>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                            }}
                            style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{
                    ...stylesFont.fontNolanBold,
                    color: GREEN_SUCCESS,
                    width: _moderateScale(8 * 30),
                    textAlign: 'center',
                    fontSize: _moderateScale(18),
                    alignSelf: 'center'
                }}>
                    {props?.data?.message}
                </Text>

                <ScrollView>

                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                width: _moderateScale(4),
                                height: _moderateScale(8 * 2.5),
                                backgroundColor: '#FA4664',
                                marginRight: _moderateScale(8)
                            }} />
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: '#FA4664' }}>
                                Thông tin nhận giải
                            </Text>
                        </View>

                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(14),
                            marginTop: _moderateScale(8)
                        }}>
                            Địa chỉ nhận giải: Trang Beauty Center 294 Đ. 3/2, Phường 12, Quận 10, Thành phố Hồ Chí Minh.
                        </Text>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL('https://goo.gl/maps/mfGBVQroTdv4vRq98')
                        }}>
                            <Image style={{
                                width: _moderateScale(8 * 38),
                                height: _moderateScale(8 * 15),
                                resizeMode: 'cover',
                                alignSelf: 'center',
                                borderRadius: _moderateScale(8),
                                marginTop: _moderateScale(8)
                            }} source={require('../../Image/map294.png')} />
                        </TouchableOpacity>
                    </View>

                    <PickDateTime
                        setShowModalCalendar={setShowModalCalendar}
                        setCurrTimeChoice={setCurrTimeChoice}
                        setCurrPickDate={setCurrPickDate}
                        listTimeForBooking={listTimeForBooking}
                        currTimeChoice={currTimeChoice}
                        currPickDate={currPickDate} />

                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }}>
                            Tư vấn thêm
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalListServiceNotPrice(true)
                            }}>
                            <Text
                                style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLUE_FB, textDecorationLine: 'underline' }}>
                                Nhấn để thêm dịch vụ tư vấn
                            </Text>
                        </TouchableOpacity>
                        {
                            listServiceChoice?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        disabled
                                        onPress={() => {
                                            navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: item?._id })
                                        }}
                                        style={{
                                            paddingVertical: _moderateScale(8 * 2),
                                            borderBottomWidth: _moderateScale(0.5),
                                            borderColor: BG_GREY_OPACITY_5,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            style={[{ width: _moderateScale(8 * 6), height: _moderateScale(8 * 6), backgroundColor: BG_GREY_OPACITY_2, borderRadius: _moderateScale(8) }]}
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                            }} />
                                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8 * 2) }}>
                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: GREY_FOR_TITLE }}>
                                                {index + 1}. {item?.name}
                                            </Text>
                                            <Text numberOfLines={2} style={{ ...stylesFont.fontNolan, color: GREY, fontSize: _moderateScale(14) }}>
                                                {item?.description}
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                            hitSlop={styleElement.hitslopSm}
                                            onPress={() => {
                                                let listTemp = listServiceChoice?.filter(itemFilter => itemFilter?._id !== item?._id)
                                                setListServiceChoice(listTemp)
                                            }}
                                            style={{
                                                width: _moderateScale(8 * 2.5),
                                                height: _moderateScale(8 * 2.5),
                                                backgroundColor: RED,
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

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 4) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                width: _moderateScale(4),
                                height: _moderateScale(8 * 2.5),
                                backgroundColor: '#FA4664',
                                marginRight: _moderateScale(8)
                            }} />
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: '#FA4664' }}>
                                Thể lệ nhận thưởng
                            </Text>
                        </View>

                        <RenderHtml
                            contentWidth={_width - _widthScale(0)}
                            source={{
                                html: configDataRewardWheelSpinRule?.value
                            }}
                            enableExperimentalBRCollapsing={true}
                            enableExperimentalMarginCollapsing={true}
                        />

                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>

                <TouchableOpacity
                    onPress={() => {
                        _handleConfirmBooking()
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: GREEN_SUCCESS,
                        marginBottom: _moderateScale(8),
                        marginTop: _moderateScale(8),
                        marginHorizontal: _moderateScale(8 * 2)
                    }]}>

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>


            </View>

        </Modal>
    );
});


const styles = StyleSheet.create({
    container: {
        width: _width - _widthScale(8 * 4),
        height: _heightScale(8 * 90),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
    }
})

export default ModalGetWheelSpinReward;