import React, { useRef, useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GREY, WHITE, BASE_COLOR, SECOND_COLOR, BTN_PRICE, RED, BLUE_FB } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { navigation } from '../../../rootNavigation';
import moment from 'moment'

import Menu from './Menu'
import { useSelector, useDispatch } from 'react-redux';
import {getWallet, getCurrentCommission, getCollabStatistic} from '../../Redux/Action/InfoAction'
import { formatMonney } from '../../Constant/Utils';


const Affiliate = () => {
    const  dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)
    const [wallet, setWallet] =  useState(null)
    const [commission, setCommission] =  useState(null)
    const [collabStatistic, setCollabStatistic] =  useState(null)


    const scrollA = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        _getWallet() 
        _getCurrentCommission()
        dispatch(getCollabStatistic())
    }, [])

    const _getWallet = async () => {
        var data = await getWallet()
        if (data?.isAxiosError) return
            setWallet(data)
    }

    const _getCurrentCommission = async () => {
        var data = await getCurrentCommission()
        if (data?.isAxiosError) return
        setCommission(data)
    }
    

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../Image/header/header1.png')}
                    />

                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }]}>
                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <Image
                                    style={[sizeIcon.llg]}
                                    source={require('../../Icon/back_left_white.png')} />
                            </TouchableOpacity>

                            <View style={{ marginLeft: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(18), color: WHITE }]}>
                                    {
                                        `${infoUserRedux?.name} `
                                    }
                                </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: WHITE }]}>
                                {
                                        `${infoUserRedux?.fullPhone[0]} `
                                    }
                                </Text>
                            </View>
                        </View>

                        <View style={styles.bannerPrice}>
                            <Text style={[stylesFont.fontNolanBold, { color: '#9F9F9F', fontSize: _moderateScale(14) }]}>Số dư hiện tại</Text>
                            <Text style={[stylesFont.fontDinTextProBold, styles.bannerPrice__textPrice]}>
                               {wallet?.commissionAmount + 
                                wallet?.bonusAmount + 
                                wallet?.depositAmount }
                            </Text>
                            <TouchableOpacity style={{
                                position:'absolute',
                                bottom:8,
                                right:8,
                            }}>
                                <Text style={[stylesFont.fontNolan500,{color: GREY,
                                    fontSize: _moderateScale(13)}]}>Hoa hồng dự kiến</Text>
                                    <Text style={[stylesFont.fontDinTextPro,{
                                    textAlign:'right',
                                    color: SECOND_COLOR,
                                    fontSize: _moderateScale(16)}]}>{formatMonney(commission?.orderCommission?.commissionAmountInMonth +
                                        commission?.depositCommission?.commissionAmountInMonth)}</Text>
                          
                            </TouchableOpacity>
                           
                        </View>
                        
                        <View style={[styleElement.rowAliCenter, { marginHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(4),
                                paddingVertical: _moderateScale(4),
                                paddingHorizontal: _moderateScale(8 * 3)
                            }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                    Mã:  {
                                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: '#EF9000' }]}>
                                            {`${infoUserRedux?.collaboratorCode}`}
                                        </Text>
                                    }
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.btnCopy}>
                                <Text style={[stylesFont.fontNolanBold, { bottom: _moderateScale(2), fontSize: _moderateScale(16), color: WHITE }]}>Copy</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    paddingBottom: _moderateScale(8)
                }}>
                    <View style={styles.wave}>
                        <View style={{
                            position: 'absolute',
                            top: -_moderateScale(8 * 3),
                            alignSelf: 'center',
                            flexDirection: 'row',
                            zIndex: 1
                        }}>
                            <TouchableOpacity style={[styles.btnOptionCash]}>
                                <View style={{ height: _moderateScale(8 * 4), alignSelf: 'center', justifyContent: 'flex-end' }}>
                                    <Image style={sizeIcon.lg} source={require('../../Icon/cashIn.png')} />
                                </View>
                                <Text style={[stylesFont.fontNolanBold, styles.btnOptionCash__text]}>Nạp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnOptionCash]}>
                                <View style={{ height: _moderateScale(8 * 4), alignSelf: 'center', justifyContent: 'flex-end' }}>
                                    <Image style={sizeIcon.lg} source={require('../../Icon/cashOut.png')} />
                                </View>
                                <Text style={[stylesFont.fontNolanBold, styles.btnOptionCash__text]}>Rút</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnOptionCash]}>
                                <View style={{ height: _moderateScale(8 * 4), alignSelf: 'center', justifyContent: 'flex-end' }}>
                                    <Image style={sizeIcon.llg} source={require('../../Icon/medal.png')} />
                                </View>
                                <Text style={[stylesFont.fontNolanBold, styles.btnOptionCash__text]}>BXH</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ height: _moderateScale(8 * 4) }} />

                    <TouchableOpacity style={[styleElement.rowAliBottom, { alignSelf: 'center' }]}>
                        <Image style={[sizeIcon.lg, {}]} source={require('../../Icon/giftLinear.png')} />
                        <Text style={[stylesFont.fontNolan500, { marginLeft: _moderateScale(8), color: GREY }]}>
                            Hướng dẫn nhận thưởng
                        </Text>
                    </TouchableOpacity>

                    <Menu />




                </View>

            </Animated.ScrollView>
        </View>
    );
};



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 11
}


const styles = StyleSheet.create({
  
    btnMenu: {
        height: _moderateScale(100),
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bannerStatis: {
        backgroundColor: BTN_PRICE,
        height: _moderateScale(8 * 6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    btnOptionCash__text: {
        fontSize: _moderateScale(14),
        color: WHITE,
        alignSelf: 'center',
        marginTop: _moderateScale(4)
    },
    btnOptionCash: {
        width: _moderateScale(8 * 9),
        height: _moderateScale(8 * 9),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(2),
        borderColor: WHITE,
        backgroundColor: BTN_PRICE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: _moderateScale(8 * 2)
    },
    btnCopy: {
        // width:"100%",
        flex: 1,
        marginLeft: _moderateScale(8 * 1),
        borderRadius: _moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: _moderateScale(2),
        borderWidth: _moderateScale(1),
        borderColor: WHITE
    },
    bannerPrice__textPrice: {
        color: '#5D5FEF',
        fontSize: _moderateScale(28),
        alignSelf: 'center',
        marginBottom: _moderateScale(8 * 1),
        marginTop: _moderateScale(8),
    },
    bannerPrice: {
        marginHorizontal: _moderateScale(8 * 4),
        backgroundColor: 'rgba(255, 255, 255,0.8)',
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 1),
        borderRadius: _moderateScale(8),
        marginTop: _moderateScale(8 * 2),
        position:'relative'
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


export default Affiliate;