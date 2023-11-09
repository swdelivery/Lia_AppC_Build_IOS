import React, { useRef, useState, useEffect, memo } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';


import { _moderateScale, _width } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import { TabBar, TabView } from 'react-native-tab-view';
import ListLastedMessage from './ListMessage/index'
import ListNoti from './ListNoti/index'
import { setShowModalAllNotifi } from '../../Redux/Action/NotificationAction';
import { useDispatch } from 'react-redux';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'


const ConversationScreen = memo((props) => {
    const dispatch = useDispatch()
    const scrollA = useRef(new Animated.Value(0)).current;


   




    return (
        <View style={styles.container}>

            


            <StatusBarCustom />
            <Animated.ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../NewImage/bannerDoctor2.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 2) }]}>
                            <Image
                                style={[sizeLogo.xxl]}
                                source={require('../../NewImage/logoNgang.png')} />
                            <AlarmNotifi />
                        </View>

                        <Text style={[stylesFont.fontNolanBold, styles.title]}>
                            Tin nhắn
                        </Text>


                    </View>
                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                }}>
                    <View style={styles.wave} />

                    <ListLastedMessage />
                    <View style={{height:50}}/>
                </View>

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
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 11
}


export default ConversationScreen;