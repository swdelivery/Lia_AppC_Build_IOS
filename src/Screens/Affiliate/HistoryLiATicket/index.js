import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, processColor } from 'react-native';


import { _moderateScale, _heightScale, _width, _widthScale } from '../../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREEN_SUCCESS, BASE_COLOR, BLACK_OPACITY_7 } from '../../../Constant/Color';
import { randomStringFixLengthCode } from '../../../Constant/Utils';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';

import ScreenKey from '../../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import Header from '../../../Components/HeaderLoseWeight/index';
import LinearGradient from 'react-native-linear-gradient';
import { getListBank, getPaymentForPartner } from '../../../Redux/Action/Affiilate';
import { escapeRegExp, isEmpty, remove } from 'lodash';
import slugify from 'slugify';
import { navigation } from '../../../../rootNavigation';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import moment from 'moment'

const HistoryLiaTicket = memo((props) => {

    const [currHistory, setCurrHistory] = useState([])
    const [isFirstLoaded, setIsFirstLoaded] = useState(false)

    useEffect(() => {
        _getHistoryTicketLiA()
    }, [])

    const _getHistoryTicketLiA = async () => {
        let result = await getPaymentForPartner({
            condition: {
                paymentFor: {
                    equal: "WALLET_LIA_TICKET"
                }
            }
        })
        setIsFirstLoaded(true)
        if (result?.isAxiosError) return
        setCurrHistory(result?.data?.data)
    }

    const _renderAmout = (item) => {
        if (item?.isRefund == true) {
            return (
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18),color:RED }}>
                   - {item?.amount}
                </Text>
            )
        }
        if (item?.isRefund == false) {
            return (
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18),color:GREEN_SUCCESS }}>
                   + {item?.amount}
                </Text>
            )
        }

    }

    return (
        <View style={styles.container}>
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{ height: _moderateScale(8) }} />
            <Header title={"Lịch sử xu"} />

            {
                isFirstLoaded ?
                    <>
                        {
                            currHistory?.length > 0 ?
                                <ScrollView>
                                    <View style={{ height: _moderateScale(8 * 3) }} />
                                    {
                                        currHistory?.map((item, index) => {
                                            return (
                                                <>
                                                    <View style={{
                                                        paddingHorizontal: _moderateScale(8 * 3)
                                                    }} key={item?._id}>
                                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                                            {item?.description}
                                                        </Text>
                                                        <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) , paddingRight:_moderateScale(8)}]}>
                                                            <Text style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(13), color: BLACK_OPACITY_7 }}>
                                                                {moment(item?.created).format("DD/MM/YYYY")}
                                                            </Text>

                                                            {
                                                                _renderAmout(item)
                                                            }

                                                        </View>
                                                    </View>
                                                    <View style={{ marginVertical: _moderateScale(8 * 2), alignSelf: 'center', width: "90%", height: _moderateScale(1), backgroundColor: BG_GREY_OPACITY_5 }} />
                                                </>
                                            )
                                        })
                                    }

                                    <View style={{ height: getBottomSpace() }} />
                                </ScrollView>
                                :
                                <View style={[{ flex: 1 }, styleElement.centerChild]}>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                                        Lịch sử xu trống
                                    </Text>
                                </View>
                        }
                    </>
                    :
                    <>
                    </>
            }

        </View>
    );
});


const styles = StyleSheet.create({
    btnBank: {
        backgroundColor: BG_GREY_OPACITY_2,
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8 * 8 / 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoBank: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        resizeMode: 'contain',
    },
    inputHeader: {
        marginHorizontal: _moderateScale(8 * 3),
        marginTop: _moderateScale(8),
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_2
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


export default HistoryLiaTicket;