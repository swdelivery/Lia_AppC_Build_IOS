import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { navigation } from '../../../rootNavigation';
import { GREY, WHITE, BLACK_OPACITY_8, GREY_FOR_TITLE, BASE_COLOR } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import ScreenKey from '../../Navigation/ScreenKey';
import { checkCurrentPartnerTrackingWeight } from '../../Redux/Action/LoseWeightAction';
import { useSelector } from 'react-redux';
import { alertCustomNotAction } from '../../Constant/Utils';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'


const ListOptions = memo((props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const _handleCheckLoseWeight = async () => {

        let result = await checkCurrentPartnerTrackingWeight({});

        console.log({ result });
        if (result?.isAxiosError) {
            Alert.alert(
                `Thông báo`,
                `${result?.response?.data?.message}\n Hoàn thiện hồ sơ?`,
                [
                    {
                        text: "Huỷ",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Đồng ý", onPress: () => {
                            navigation.navigate(ScreenKey.HEALTH_RECORD)
                        }
                    }
                ],
                { cancelable: false }
            );
            return
        }

        navigation.navigate(ScreenKey.LOSE_WEIGHT)
    }

    return (
        <>
            {/* <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop:_moderateScale(8*2) }}>
                <Text style={[stylesFont.fontNolanBold, {
                    fontSize: _moderateScale(16),
                    color: BLACK_OPACITY_8, marginLeft: _moderateScale(8 * 2)
                }]}>
                    Hãy để Trang hỗ trợ bạn
                </Text>
            </View> */}

            <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 1) }]}>
                <TouchableOpacity style={[]} onPress={() => navigation.navigate(ScreenKey.LIST_BRANCH)}>
                    <Image style={styles.btnOptionNew} source={require('../../NewIcon/btnBookingBranch.png')} />
                    <Text style={{ position: 'absolute', alignSelf: 'center', bottom: _moderateScale(8 * 2), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BASE_COLOR }}>
                        P. Khám
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[]} onPress={() => navigation.navigate(ScreenKey.LIST_DOCTOR)}>
                    <Image style={styles.btnOptionNew} source={require('../../NewIcon/btnBookingDoctor.png')} />
                    <Text style={{ position: 'absolute', alignSelf: 'center', bottom: _moderateScale(8 * 2), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BASE_COLOR }}>
                        Bác sĩ
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[]} onPress={() => {
                    if (!infoUserRedux?._id) {
                        store.dispatch({
                            type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                            payload: {
                                flag: true,
                                currRouteName: props?.route?.name
                            }
                        })
                        return
                    }
                    navigation.navigate(ScreenKey.VIDEO_REQUEST)
                }}>
                    <Image style={styles.btnOptionNew} source={require('../../NewIcon/btnBookingVideoCall.png')} />
                    <Text style={{ position: 'absolute', alignSelf: 'center', bottom: _moderateScale(8 * 2), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BASE_COLOR }}>
                        Video Call
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={[]} onPress={() => {
                    if (!infoUserRedux?._id) {
                        return navigation.navigate(ScreenKey?.LOGIN_IN_APP, { routeName: props?.route?.name })
                    }
                    navigation.navigate(ScreenKey.QR_CODE)
                }}>
                    <Image style={styles.btnOptionNew} source={require('../../NewIcon/btnQR.png')} />
                    <Text style={{ position: 'absolute', alignSelf: 'center', bottom: _moderateScale(8 * 2), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BASE_COLOR }}>
                        Quét QR
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[]}
                    onPress={() => {
                        if (!infoUserRedux?._id) {
                            return navigation.navigate(ScreenKey?.LOGIN_IN_APP, { routeName: props?.route?.name })
                        }
                        navigation.navigate(ScreenKey.TREATMENT_RECORD)
                    }}
                >
                    <Image style={styles.btnOptionNew} source={require('../../NewIcon/btnProfile.png')} />
                    <Text style={{ position: 'absolute', alignSelf: 'center', bottom: _moderateScale(8 * 2), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BASE_COLOR }}>
                        Hồ sơ
                    </Text>
                </TouchableOpacity> */}
            </View>

            <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 1) }]}>
                <View style={{ opacity: 1 }}>
                    <TouchableOpacity style={[]} onPress={() => {

                        // return AlertIOS

                        if (!infoUserRedux?._id) {
                            store.dispatch({
                                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                payload: {
                                    flag: true,
                                    currRouteName: props?.route?.name
                                }
                            }) 
                            return
                        }
                        navigation.navigate(ScreenKey.AFFILIATE)
                        // navigation.navigate(ScreenKey.WHEEL_SPIN)
                    }}>
                        <Image style={styles.btnOptionNew} source={require('../../NewIcon/btnBookingCTV.png')} />
                        <Text style={{ position: 'absolute', alignSelf: 'center', bottom: _moderateScale(8 * 2), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BASE_COLOR }}>
                            Cộng tác
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ opacity: 0.5 }}>
                    <TouchableOpacity style={[]} onPress={() => {
                        return alertCustomNotAction(`Thông báo`, `Tính năng sẽ sớm được ra mắt`)
                        // _handleCheckLoseWeight()
                    }}>
                        <Image style={styles.btnOptionNew} source={require('../../NewIcon/btnBookingHeal.png')} />
                        <Text style={{ position: 'absolute', alignSelf: 'center', bottom: _moderateScale(8 * 2), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BASE_COLOR }}>
                            Sức khoẻ
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ opacity: 0.5 }}>
                    <TouchableOpacity style={[]} onPress={() => {
                        // return alertCustomNotAction(`Thông báo`, `Tính năng sẽ sớm được ra mắt`)
                        navigation.navigate(ScreenKey.LIST_SP_SOCIAL)
                    }}>
                        <Image style={styles.btnOptionNew} source={require('../../NewIcon/btnBookingHelp.png')} />
                        <Text style={{ position: 'absolute', alignSelf: 'center', bottom: _moderateScale(8 * 2), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BASE_COLOR }}>
                            Dự án XH
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* <TouchableOpacity
                    onPress={() => navigation.navigate(ScreenKey.QR_CODE)}
                    style={[shadow, styles.btnOptions]}>
                    <View style={{ height: _moderateScale(8 * 7), alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={[styles.btnOptions__icon, { height: _moderateScale(8 * 4) }]}
                            source={require('../../Icon/QR.png')} />
                    </View>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: BLACK_OPACITY_8 }]}>
                        Quét mã QR
                            </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate(ScreenKey.TREATMENT_RECORD) }}
                    style={[shadow, styles.btnOptions]}>
                    <View style={{ height: _moderateScale(8 * 7), alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={[styles.btnOptions__icon, { height: _moderateScale(8 * 4) }]}
                            source={require('../../Icon/profile_pink.png')} />
                    </View>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: BLACK_OPACITY_8 }]}>
                        Hồ sơ
                            </Text>
                </TouchableOpacity> */}

            {/* <View style={{ flexDirection: 'row', paddingHorizontal: _moderateScale(8 * 3), justifyContent: 'space-between', marginTop: _moderateScale(8 * 2) }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate(ScreenKey.AFFILIATE) }}
                    style={[shadow, styles.btnOptions]}>
                    <View style={{ height: _moderateScale(8 * 7), alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={[styles.btnOptions__icon, { height: _moderateScale(8 * 4.5) }]}
                            source={require('../../Icon/partner_pink.png')} />
                    </View>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: BLACK_OPACITY_8 }]}>
                        Cộng tác viên
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={_handleCheckLoseWeight}
                    style={[shadow, styles.btnOptions]}>
                    <View style={{ height: _moderateScale(8 * 7), alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={[styles.btnOptions__icon, { height: _moderateScale(8 * 4) }]}
                            source={require('../../Icon/health_pink.png')} />
                    </View>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: BLACK_OPACITY_8 }]}>
                        Giảm béo
                            </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate(ScreenKey.LIST_SP_SOCIAL) }}
                    style={[shadow, styles.btnOptions]}>
                    <View style={{ height: _moderateScale(8 * 7), alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={[styles.btnOptions__icon, { height: _moderateScale(8 * 4) }]}
                            source={require('../../Icon/helpingHand.png')} />
                    </View>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: BLACK_OPACITY_8 }]}>
                        Dự án XH
                            </Text>
                </TouchableOpacity>
            </View> */}
        </>
    );
});


const styles = StyleSheet.create({
    btnOptionNew: {
        width: _moderateScale(95),
        height: _moderateScale(95)
    },
    btnOptions__icon: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain'
    },
    btnOptions: {
        width: _moderateScale(100),
        height: _moderateScale(100),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8)
    },
    container: {
        flex: 1
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


export default ListOptions;