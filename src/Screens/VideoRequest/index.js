import React, { useRef } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import BookingView from './BookingView'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import moment from 'moment'

const BookingForBranch = () => {
    const scrollA = useRef(new Animated.Value(0)).current;
    const infoUserRedux = useSelector(state => state?.infoUserReducer)

    return (
        <View style={styles.container}>
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
                                style={[sizeLogo.xl]}
                                source={require('../../NewImage/logoCenter2.png')} />
                            <View style={{opacity:0}}>
                                <AlarmNotifi />
                            </View>
                        </View>

                        {/* {
                           alert(moment().isoWeekday()) 
                        } */}

                        <Text style={[stylesFont.fontNolanBold, styles.title]}>
                            Hi, {
                                `${infoUserRedux?.infoUser?.name}`
                            }
                        </Text>
                        <Text style={[stylesFont.fontNolan, styles.title,
                        { width: "40%", fontSize: _moderateScale(14), marginTop: _moderateScale(4) }]}>
                            Mời bạn đăng kí tư vấn qua Video Call với bác sĩ nhé!
                            {'\n'}
                            {'\n'}
                            {/* <Text style={{ fontSize: _moderateScale(12) }}>
                                Vui lòng nhập đầy đủ thông tin bên dưới.
                            </Text> */}
                        </Text>

                        {/* <View style={{ paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 7) }}>
                            <View style={styles.inputHeader}>
                                <TextInput
                                    placeholderTextColor={GREY}
                                    style={[stylesFont.fontNolan, { flex: 1 }]}
                                    placeholder={'Mã giới thiệu '} />
                                <Image
                                    style={[sizeIcon.sm]}
                                    source={require('../../Image/header/search.png')} />
                            </View>
                        </View> */}
                    </View>
                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    marginTop: _moderateScale(12)
                }}>
                    <View style={styles.wave} />
                    <KeyboardAwareScrollView>
                        <BookingView />
                    </KeyboardAwareScrollView>

                </View>
            </Animated.ScrollView>
        </View>
    );
};

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


export default BookingForBranch;