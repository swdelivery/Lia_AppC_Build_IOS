import React, { memo, useRef, useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    View
} from 'react-native';

import { _moderateScale } from '../../Constant/Scale';
import { BLUE, BLUE_FB, RED, WHITE } from '../../Constant/Color';
import { styleElement } from '../../Constant/StyleElement';
import { stylesFont } from '../../Constant/Font';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { alertCustomNotAction } from '../../Constant/Utils';
import _isEmpty from 'lodash/isEmpty'

const OpenCamera = memo((props) => {

    let scanRef = useRef(null);


    const parseMyJson = (data) => {
        try {
            return JSON.parse(data)
        } catch (error) {
            return null
        }
    }


    const onSuccess = e => {
        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
        console.log({e});
        

        let objParsed = parseMyJson(e.data)

        if (_isEmpty(objParsed)) {
            return alertCustomNotAction(`Lỗi`, `Mã QR không hợp lệ`)
        }

        if (objParsed?.action == "create_booking") {
            navigation.goBack()
            props?.route?.params?._handleOpenModalPickBranch(objParsed)
           
            // return navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, { refCode: objParsed?.collaboratorCode })
        }

        if (objParsed?.action == 'checkin') {
            navigation.goBack()
            props?.route?.params?._handleOpenModalListBooking(objParsed)
        }


    };


    return (
        <>

           

            {/* <QRCodeScanner
                ref={ref => scanRef = ref}
                onRead={onSuccess}
                topContent={
                    <Text style={styles.centerText}>
                        Đưa camera vào sát mã để bắt đầu quét
                </Text>
                }
                bottomContent={
                    <View style={[styleElement.rowAliCenter]}>
                        <TouchableOpacity
                            hitSlop={styleElement.hitslopSm}
                            onPress={() => navigation.goBack()}
                            style={{
                                width: _moderateScale(8 * 10),
                                height: _moderateScale(8 * 4),
                                borderWidth: _moderateScale(1),
                                borderColor: RED,
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: RED }]}>
                                Thoát
                        </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                scanRef.reactivate()

                            }}
                            style={{
                                marginLeft: _moderateScale(8 * 2),
                                width: _moderateScale(8 * 30),
                                height: _moderateScale(8 * 4),
                                backgroundColor: BLUE_FB,
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                                Thử lại
                        </Text>
                        </TouchableOpacity>
                    </View>
                }
            /> */}
        </>
    );
});


const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        paddingHorizontal: _moderateScale(8),
        color: '#777',
        alignSelf: 'center'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});


export default OpenCamera;