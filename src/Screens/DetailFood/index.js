import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, processColor } from 'react-native';


import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREEN_SUCCESS, BASE_COLOR, BG_GREY_OPACITY_7 } from '../../Constant/Color';
import { randomStringFixLengthCode, parseFloatNumber } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import LinearGradient from 'react-native-linear-gradient';

import ChartPie from './ChartPie';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import _isEmpty from 'lodash/isEmpty'
import { addPartnerFoodToMenu } from '../../Redux/Action/LoseWeightAction';
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
        setSize(props?.route?.params?.data?.size)
    }, [])


    const _handleChangeSize = (e) => {
        console.log({
            sizeInput: e,
            calo: data?.calo,
            size: Number(data?.size)
        });
        if (isNaN(Number(e))) {
            return
        }
        setSize(Number(e));
        setCalo(Number(e) * Number(data?.calo) / Number(data?.size))
    }

    const _calPercent = (amout, totalAmount) => {
        // return `${Number.parseFloat(Number(amout) / Number(totalAmount) * 100).toFixed(2)}%`
        return `${parseFloat((Number(amout) / Number(totalAmount) * 100).toFixed(2))}%`
    }

    const _handleConfirm = async () => {
        let result = await addPartnerFoodToMenu({
            "foodCode": data?.code,
            "session": props?.route?.params?.session,
            "size": size
        })
        if (result?.isAxiosError) return

        store.dispatch({
            type: ActionType.ADD_MORE_DATA_MENU_FOOD,
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
            <Header title={"Thực phẩm"} />
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
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                {/* (100g - 134 kcal) */}
                                {`(${parseFloatNumber(data?.size,2)} ${data?.unit} - ${parseFloatNumber(data?.calo,2)} kcal)`}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

                {/* <ChartPie /> */}
                <View style={{ height: _moderateScale(8 * 3) }} />
                {/* {
                    _calPercent()
                } */}
                {
                    (data?.main?.carbohyrate) || (data?.main?.fat) || (data?.main?.protein) ?
                        <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 3) }]}>
                            <View style={{
                                width: _calPercent(data?.main?.carbohyrate, (Number(data?.main?.carbohyrate) + Number(data?.main?.fat) + Number(data?.main?.protein))),
                                height: _moderateScale(4), backgroundColor: "#52B505"
                            }} />
                            <View style={{
                                width: _calPercent(data?.main?.fat, (Number(data?.main?.carbohyrate) + Number(data?.main?.fat) + Number(data?.main?.protein))),
                                height: _moderateScale(4), backgroundColor: '#830AE2'
                            }} />
                            <View style={{
                                width: _calPercent(data?.main?.protein, (Number(data?.main?.carbohyrate) + Number(data?.main?.fat) + Number(data?.main?.protein))),
                                height: _moderateScale(4), backgroundColor: "#EC3A79"
                            }} />
                        </View>
                        : <></>
                }

                <View style={{ height: _moderateScale(8) }} />

                {console.log(data?.main)}


                {
                    ((data?.main?.carbohyrate) || (data?.main?.fat) || (data?.main?.protein)) ?
                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-evenly', marginTop: _moderateScale(8) }]}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: "#52B505" }]}>
                                    {_calPercent(data?.main?.carbohyrate, (Number(data?.main?.carbohyrate) + Number(data?.main?.fat) + Number(data?.main?.protein)))}
                                </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>
                                    {parseFloatNumber(data?.main?.carbohyrate)}g
                        </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLACK_OPACITY_8 }]}>Carbs</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: '#830AE2' }]}>
                                    {_calPercent(data?.main?.fat, (Number(data?.main?.carbohyrate) + Number(data?.main?.fat) + Number(data?.main?.protein)))}
                                </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>
                                    {parseFloatNumber(data?.main?.fat)}g
                        </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLACK_OPACITY_8 }]}>Fat</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: "#EC3A79" }]}>
                                    {_calPercent(data?.main?.protein, (Number(data?.main?.carbohyrate) + Number(data?.main?.fat) + Number(data?.main?.protein)))}
                                </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>
                                    {parseFloatNumber(data?.main?.protein)}g
                        </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLACK_OPACITY_8 }]}>Protein</Text>
                            </View>
                        </View>
                        : <></>
                }



                <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                    <View style={[styleElement.rowAliCenter]}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), flex: 1 }]}>
                            Đơn vị tính
                    </Text>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLUE_FB }]}>
                            {data?.unit}
                        </Text>
                    </View>
                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8) }]}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), flex: 1 }]}>
                            Khối lượng
                    </Text>
                        {/* <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLUE_FB }]}>
                            {size}
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
                            Carlo tương ứng
                    </Text>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLUE_FB }]}>
                            {parseFloat(Number(calo).toFixed(2))}
                        </Text>
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
        textAlign: 'right',
        paddingRight: _moderateScale(8)
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