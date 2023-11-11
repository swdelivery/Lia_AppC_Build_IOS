import React, { memo, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { BtnMission, IconCancelGrey, IconCancelWhite } from '../../../Components/Icon/Icon'
import ModalFlashMsg from '../../../Components/ModalFlashMsg/ModalFlashMsg'
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color'
import { stylesFont } from '../../../Constant/Font'
import { sizeIcon } from '../../../Constant/Icon'
import { _height, _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { getConfigData } from '../../../Redux/Action/OrtherAction'
import { styleElement } from '../../../Constant/StyleElement'
import { sizeText } from '../../../Constant/Text'
import { getListMissions, takeAward } from '../../../Redux/Action/SpinWheelAction'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const ModalListMissions = memo((props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const opacityBackDrop = useSharedValue(0);
    const tranYModal = useSharedValue(0);

    const [showModalFlashMsg, setShowModalFlashMsg] = useState(false)

    const [listMissions, setListMissions] = useState([])

    useEffect(() => {
        _getListMissions()
    }, [])


    useEffect(() => {
        if (props?.isShow) {
            tranYModal.value = withTiming(-650, { duration: 200 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {
        }

    }, [props?.isShow])

    const _getListMissions = async () => {
        let result = await getListMissions();
        if (result?.isAxiosError) return;


        let resultTemp = result?.data?.map((item, index) => {
            return {
                ...item,
                bonusEvent: {
                    ...item?.bonusEvent,
                    awards: item?.bonusEvent?.awards?.filter(item => item?.code == "WHEEL_TURN")
                }
            }
            // item?.bonusEvent?.awards?.filter(item => item?.code == "WHEEL_TURN")
            // if (item?.bonusEvent?.awards?.find(item => item?.code == "WHEEL_TURN")) {
            //     resultTemp?.push(item)
            // }
        })
        // console.log({ resultTemp });

        setListMissions(resultTemp)
    }

    const _handleTakeAward = async (item) => {

        console.log({ item, infoWheel: props?.currActiveWheel });

        let data = {
            "bonusEventCode": item?.bonusEventCode,
            "wheelCode": props?.currActiveWheel?.code
        }
        let result = await takeAward(data)
        if(result?.isAxiosError)return;
        Alert.alert('Nhận thưởng thành công!')
        _getListMissions()
        props?.getPartnerWheelTurn()
    }

    const _handleActionMission = (data) => {
        console.log({ data });
        switch (data?.bonusEventCode) {
            case "REGISTER":
                return
            case "COMPLETE_VIDEO_CALL":
                return
            case "COMPLETE_DAILY_DIARY":
                return navigation.navigate(ScreenKey.LIST_PARTNER_DIARY)
            case "TREATMENT":
                return Alert.alert(
                    "Thông báo",
                    `Phần thưởng sẽ được nhận khi bạn đến thăm khám và điều trị, bạn có muốn đặt hẹn ngay?`,
                    [
                        {
                            text: "Huỷ",
                            onPress: () => console.log("Cancel Pressed"),
                        },
                        {
                            text: "Đồng ý",
                            onPress: async () => {
                                navigation.navigate(ScreenKey.CREATE_BOOKING)
                            },
                        }
                    ])
            case "LOGIN_EVERY_DAY":
                return Alert.alert("Nhận phần thưởng khi bạn đăng nhập vào App mỗi ngày")
            case "COMPLETE_HEALTH_RECORD":
                return navigation.navigate(ScreenKey.HEALTH_RECORD)
            case "BOOKING_CONSULTATION":
                return Alert.alert(
                    "Thông báo",
                    `Phần thưởng sẽ được nhận khi bạn đến thăm khám và tư vấn thành công, bạn có muốn đặt hẹn ngay?`,
                    [
                        {
                            text: "Huỷ",
                            onPress: () => console.log("Cancel Pressed"),
                        },
                        {
                            text: "Đồng ý",
                            onPress: async () => {
                                navigation.navigate(ScreenKey.CREATE_BOOKING)
                            },
                        }
                    ])

            case "COMPLETE_ORDER":
                return Alert.alert(
                    "Thông báo",
                    `Phần thưởng sẽ được nhận khi bạn thanh toán đơn hàng thành công, bạn có muốn đặt hẹn ngay?`,
                    [
                        {
                            text: "Huỷ",
                            onPress: () => console.log("Cancel Pressed"),
                        },
                        {
                            text: "Đồng ý",
                            onPress: async () => {
                                navigation.navigate(ScreenKey.CREATE_BOOKING)
                            },
                        }
                    ])

            case "COMPLETE_TREATMENT_DIARY":
                return navigation.navigate(ScreenKey.LIST_PARTNER_DIARY)
            case "CREATE_DEPOSIT":
                return Alert.alert(
                    "Thông báo",
                    `Phần thưởng sẽ được nhận khi bạn đặt cọc booking thành công, bạn có muốn đặt hẹn ngay?`,
                    [
                        {
                            text: "Huỷ",
                            onPress: () => console.log("Cancel Pressed"),
                        },
                        {
                            text: "Đồng ý",
                            onPress: async () => {
                                navigation.navigate(ScreenKey.CREATE_BOOKING)
                            },
                        }
                    ])

            case "REGISTER":
                return Alert.alert("Nhận phần thưởng khi bạn đăng kí thành công")


            default:
                return
                break;
        }
    }

    const animTranY = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYModal.value
                }
            ]
        }
    })

    const animOpacityBackDrop = useAnimatedStyle(() => {
        return {
            opacity: opacityBackDrop.value
        }
    })

    const _handleHideModal = () => {
        tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
            if (fnd) {
                runOnJS(_hideModal)()
            }
        })
        opacityBackDrop.value = withTiming(0, { duration: 200 })
    }
    const _hideModal = () => {
        props?.onHideModal()
    }

    return (

        <>
            {
                props?.isShow ?
                    <View style={{
                        width: _width,
                        height: _height,
                        position: 'absolute',
                        zIndex: 100
                    }}>

                        <ModalFlashMsg
                            bottom
                            show={showModalFlashMsg}
                            hide={() => {
                                setShowModalFlashMsg(false)
                            }}
                            data={'Đã copy.'} />

                        <Animated.View style={[{
                            width: _width,
                            height: _height,
                        }, {
                            backgroundColor: 'rgba(0,0,0,.7)'
                        }, animOpacityBackDrop]}>
                            <TouchableOpacity onPress={() => _handleHideModal()} style={[StyleSheet.absoluteFillObject]} />
                        </Animated.View>

                        <Animated.View style={[{
                            width: _width,
                            backgroundColor: WHITE,
                            borderRadius: _moderateScale(8 * 2),
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingBottom: _moderateScale(8 * 2),
                            position: 'absolute',
                            bottom: - _moderateScale(8*85),
                            height: 650,
                        }, animTranY]}>

                            <View style={styles.header}>

                                <View style={{ alignItems: 'center', width: _width }}>
                                    <View style={{ top: -_moderateScale(8 * 7 / 2) }}>
                                        <BtnMission style={{
                                            width: _moderateScale(8 * 25),
                                            height: _moderateScale(8 * 7)
                                        }} />
                                    </View>
                                    <TouchableOpacity
                                        onPress={_handleHideModal}
                                        style={{
                                            position: 'absolute',
                                            right: _moderateScale(8 * 3),
                                            zIndex: 100,
                                            top: _moderateScale(8 * 2)
                                        }}>
                                        <IconCancelGrey style={sizeIcon.md} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: _moderateScale(8 * 0) }} />

                            <ScrollView>
                                {
                                    listMissions?.map((item, index) => {
                                        return (
                                            <View key={index} style={styles.itemMission}>
                                                <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                                    <Text style={[sizeText.normal_500]}>
                                                        {
                                                            item?.bonusEvent?.name
                                                        }
                                                    </Text>
                                                    <Text style={[sizeText.normal_500, { marginTop: _moderateScale(8), color: BASE_COLOR, fontStyle: 'italic' }]}>
                                                        +{item?.bonusEvent?.awards[0]?.amount} Lượt quay
                                                    </Text>
                                                </View>
                                                <View style={styles.itemMission__rightBox}>

                                                    {
                                                        item?.recievedAmt > 0
                                                            ?
                                                            <TouchableOpacity
                                                                onPress={() => _handleTakeAward(item)}
                                                                style={[{
                                                                    width: _moderateScale(8 * 12),
                                                                    height: _moderateScale(8 * 3.5),
                                                                    borderRadius: _moderateScale(4),
                                                                    backgroundColor: BASE_COLOR
                                                                }, styleElement.centerChild]}>
                                                                <Text style={[sizeText.small_bold, { color: WHITE, fontStyle: 'italic' }]}>
                                                                    Nhận ngay
                                                                </Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <>
                                                                {
                                                                    item?.usage > 0 ?
                                                                        <TouchableOpacity
                                                                            onPress={() => _handleActionMission(item)}
                                                                            style={[{
                                                                                width: _moderateScale(8 * 12),
                                                                                height: _moderateScale(8 * 3.5),
                                                                                borderRadius: _moderateScale(4),
                                                                                backgroundColor: "#E2E2E0"
                                                                            }, styleElement.centerChild]}>
                                                                            <Text style={[sizeText.small_bold, { color: BASE_COLOR, fontStyle: 'italic' }]}>
                                                                                Làm ngay
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                        :
                                                                        <TouchableOpacity
                                                                        disabled
                                                                        style={[{
                                                                            width: _moderateScale(8 * 12),
                                                                            height: _moderateScale(8 * 3.5),
                                                                            borderRadius: _moderateScale(4),
                                                                            backgroundColor: "#E2E2E0"
                                                                        }, styleElement.centerChild]}>
                                                                            <Text style={[sizeText.small_bold, { color: WHITE, fontStyle: 'italic' }]}>
                                                                                Đã nhận
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                }
                                                            </>
                                                    }
                                                    {/* <TouchableOpacity
                                                        onPress={() => _handleActionMission(item)}
                                                        style={[{
                                                            width: _moderateScale(8 * 12),
                                                            height: _moderateScale(8 * 3.5),
                                                            borderRadius: _moderateScale(4),
                                                            backgroundColor: "#E2E2E0"
                                                        }, styleElement.centerChild]}>
                                                        <Text style={[sizeText.small_bold, { color: BASE_COLOR, fontStyle: 'italic' }]}>
                                                            Làm ngay
                                                        </Text>
                                                    </TouchableOpacity> */}
                                                    {/* <TouchableOpacity style={[{
                                                        width:_moderateScale(8*12),
                                                        height:_moderateScale(8*3.5),
                                                        borderRadius:_moderateScale(4),
                                                        backgroundColor:BASE_COLOR
                                                    },styleElement.centerChild]}>
                                                        <Text style={[sizeText.small_bold,{color:WHITE, fontStyle:'italic'}]}>
                                                            Nhận ngay
                                                        </Text>
                                                    </TouchableOpacity> */}
                                                    {/* <TouchableOpacity style={[{
                                                        width:_moderateScale(8*12),
                                                        height:_moderateScale(8*3.5),
                                                        borderRadius:_moderateScale(4),
                                                        backgroundColor:"#E2E2E0"
                                                    },styleElement.centerChild]}>
                                                        <Text style={[sizeText.small_bold,{color:WHITE, fontStyle:'italic'}]}>
                                                            Đã nhận
                                                        </Text>
                                                    </TouchableOpacity> */}
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                                <View style={{ height: 100 }} />
                            </ScrollView>


                        </Animated.View>

                    </View>
                    :
                    <></>
            }
        </>


    )
})


export default ModalListMissions

const styles = StyleSheet.create({
    itemMission__rightBox: {
        width: _moderateScale(8 * 12),
        alignItems: 'flex-end'
    },
    itemMission: {
        padding: _moderateScale(8 * 2),
        borderBottomWidth: .5,
        borderColor: 'rgba(0,0,0,.3)',
        flexDirection: 'row'
    },
    titleDetail: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(16),
        color: BASE_COLOR
    },
    boxDetail__text: {
        ...stylesFont.fontNolan500,
        color: WHITE,
        fontSize: _moderateScale(12),
        fontStyle: 'italic'
    },
    boxDetail__textPercent: {
        ...stylesFont.fontNolanBold,
        color: WHITE,
        fontSize: _moderateScale(16)
    },
    boxDetail: {
        flex: 1,
        alignItems: 'center',
        height: _moderateScale(8 * 6),
        justifyContent: 'center',
        borderRadius: _moderateScale(4)
    },
    lineText: {
        width: _moderateScale(340),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: _moderateScale(8),
        alignItems: 'flex-end'
    },
    line: {
        width: _moderateScale(340),
        height: _moderateScale(8),
        alignSelf: 'center',
        borderRadius: _moderateScale(8)
    },
    textRanked: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    iconSizeRanked: {
        width: _moderateScale(8 * 12),
        height: _moderateScale(8 * 12)
    },
    btnBack: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 4 / 2),
        backgroundColor: BASE_COLOR
    },
    header: {
        // marginTop: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        alignItems: 'center'
    }

})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,

    elevation: 5
}
