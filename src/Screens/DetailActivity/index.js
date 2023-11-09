import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, processColor } from 'react-native';


import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREEN_SUCCESS, BASE_COLOR, BG_GREY_OPACITY_7 } from '../../Constant/Color';
import { randomStringFixLengthCode, alertCustomNotAction } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import LinearGradient from 'react-native-linear-gradient';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import _isEmpty from 'lodash/isEmpty'
import { addPartnerActivityToMenu } from '../../Redux/Action/LoseWeightAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';


const index = memo((props) => {

    const [data, setData] = useState({})

    const [calo, setCalo] = useState(0);
    const [size, setSize] = useState(0)

    const partnerTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.partnerTrackingWeight)

    useEffect(() => {
        console.log({ props });
        setData(props?.route?.params?.data)
        setCalo(props?.route?.params?.data?.calo)
        setSize(props?.route?.params?.data?.minutes)
    }, [])


    const _handleChangeSize = (e) => {
        if (isNaN(Number(e))) {
            return
        }
        setSize(Number(e));
        setCalo(Number(e) * Number(data?.calo) / Number(data?.minutes))
    }


    const _handleConfirm = async () => {

        if(!size)return alertCustomNotAction('Lỗi',"Thời giản phải lớn hơn 0")

        let result = await addPartnerActivityToMenu({
            "activityCode": data?.code,
            "minutes": size
        })
        if (result?.isAxiosError) return

        store.dispatch({
            type: ActionType.ADD_MORE_DATA_MENU_ACTIVITY,
            payload: {
                data: result?.data?.data?.data
            }
        })
        store.dispatch({
            type: ActionType.UPDATE_DATA_TRACKING_WEIGHT,
            payload: {
                data: result?.data?.data?.tracking
            }
        })

    }


    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <Header title={"Chi tiết hoạt động"} />
            <ScrollView>
                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                    <ImageBackground
                        style={styles.banner}
                        imageStyle={{ borderRadius: _moderateScale(8) }}
                        source={{ uri: `${URL_ORIGINAL}${!_isEmpty(data?.representationFileArr) ? data?.representationFileArr[0]?.link : ''}` }}>
                        <View style={{ width: "100%", height: '100%', backgroundColor: 'rgba(33, 33, 33,.5)', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(20), color: WHITE }]}>
                                {data?.name}
                            </Text>
                            {/* <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                (6kcal - 1 phút)
                            </Text> */}

                            <View style={[{
                                // width: _moderateScale(8 * 20),
                                backgroundColor: 'rgba(196, 196, 196,0.74)',
                                borderRadius: _moderateScale(8),
                                // padding:_moderateScale(4),
                                paddingHorizontal: _moderateScale(8),
                                marginTop: _moderateScale(8 * 2),
                                justifyContent: 'space-between'
                            }, styleElement.rowAliCenter]}>
                                <Image style={[sizeIcon.lg]} source={require('../../Icon/fire_calo.png')} />
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(24), color: '#E45403' }]}>
                                    {parseFloat(calo?.toFixed(2))}
                                </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: WHITE, marginLeft: _moderateScale(8) }]}>
                                    ({size} phút)
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>


                    {
                        props?.route?.params?.data?.description?.length > 0 ?
                            <View style={[{}]}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), flex: 1 }]}>
                                    Ghi chú
                                </Text>

                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), flex: 1, fontStyle: 'italic', color: GREY }]}>
                                    {props?.route?.params?.data?.description}
                                </Text>

                            </View>
                            : <></>
                    }

                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8) }]}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), flex: 1 }]}>
                            Thời gian (phút)
                        </Text>
                        {/* <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLUE_FB }]}>
                            6 phút
                        </Text> */}

                        <TextInput
                            selectTextOnFocus
                            onChangeText={(e) => _handleChangeSize(e)}
                            keyboardType={'number-pad'}
                            value={`${size}`}
                            style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }, styles.inputSize]} />
                    </View>

                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8) }]}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), flex: 1 }]}>
                            Carlo đốt
                        </Text>
                        <View style={[styles.inputSize, { alignItems: 'center', borderWidth: 0 }]}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: "#E45403" }]}>
                                {parseFloat(calo?.toFixed(2))}
                            </Text>
                        </View>

                    </View>


                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                    <ImageBackground resizeMode={'contain'} style={{
                        width: '100%',
                        height: _moderateScale(141)
                    }} source={require('../../Icon/bg_fruit.png')}>
                        <View style={{
                            width: _moderateScale(175),
                            height: '100%',
                        }}>
                            <Text style={[stylesFont.fontNolan500, { alignSelf: 'center', fontSize: _moderateScale(12), marginTop: _moderateScale(8 * 2) }]}>
                                Năng lượng trong ngày(kcal)
                        </Text>
                            <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8 * 2) }]}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(20), color: BTN_PRICE }]}>
                                        {parseFloat(partnerTrackingWeightRedux?.caloBurned?.toFixed(2))}
                                    </Text>
                                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(16), color: BTN_PRICE }]}>
                                        Đốt cháy
                                </Text>
                                </View>
                                <View style={{ alignItems: 'center', marginLeft: _moderateScale(8 * 2) }}>
                                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(20), color: BLUE_FB }]}>
                                        {parseFloat(partnerTrackingWeightRedux?.caloIntake?.toFixed(2))}
                                    </Text>
                                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(16), color: BLUE_FB }]}>
                                        Nạp vào
                                </Text>
                                </View>
                            </View>

                            <View style={{ alignItems: 'center', marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(20), color: WHITE }]}>
                                    {parseFloat(partnerTrackingWeightRedux?.medicalIndex?.tdee?.toFixed(2))}
                                </Text>
                                <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(16), color: WHITE }]}>
                                    Tổng
                                </Text>
                            </View>

                        </View>
                    </ImageBackground>
                </View>



                <View style={{ height: 50 }} />
            </ScrollView>
            <TouchableOpacity
                onPress={_handleConfirm}
                style={{
                    height: _moderateScale(8 * 4),
                    backgroundColor: WHITE,
                    // width: _moderateScale(8 * 12),
                    marginHorizontal: _moderateScale(8 * 2),
                    borderRadius: _moderateScale(8),
                    overflow: 'hidden',
                    marginVertical: _moderateScale(8),
                    marginBottom: getBottomSpace() + _moderateScale(8)
                }}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={gradient.color}
                    style={gradient.container}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: WHITE }]}>
                        Chọn
                            </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,

    elevation: 5
}



const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        'rgba(104, 47, 144,.7)',
        BASE_COLOR,
    ]
}

const styles = StyleSheet.create({
    inputSize: {
        alignSelf: 'flex-end',
        borderWidth: _moderateScale(0.5),
        width: _moderateScale(8 * 10),
        borderColor: BG_GREY_OPACITY_7,
        borderRadius: _moderateScale(4),
        textAlign: 'center',
        // paddingRight: _moderateScale(8)
    },
    banner: {
        width: "100%",
        height: _moderateScale(8 * 20),
        borderRadius: _moderateScale(8),
        overflow: 'hidden',
        backgroundColor: BG_GREY_OPACITY_2
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


export default index;