import React, { useRef, memo, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';

const index = memo((props) => {


    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'}  bgColor={WHITE}/>
            <Header title={"Cấu hình"} />

            <ScrollView>
                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), marginBottom: _moderateScale(8 * 2) }]}>
                        Mục tiêu
                    </Text>

                    {/* <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.CHART_RP_CARLO)
                        }}
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <Image
                            style={[sizeIcon.lllg]}
                            source={require('../../Icon/calo_lw.png')} />
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Carlo
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.MY_GOAL)
                        }}
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <View style={[sizeIcon.lllg, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                style={[sizeIcon.lg]}
                                source={require('../../Icon/weight_lw.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Mục tiêu tăng cân / giảm cân
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.WATER_GOAL) 
                        }}
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <View style={[sizeIcon.lllg, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                style={[sizeIcon.lg]}
                                source={require('../../Icon/cup_water_full.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Mục tiêu uống nước
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), marginBottom: _moderateScale(8 * 2) }]}>
                        Danh mục
                    </Text>

                    <TouchableOpacity
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <View style={[sizeIcon.lllg, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                style={[sizeIcon.llllg]}
                                source={require('../../Icon/bike_lw.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Hoạt động
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <View style={[sizeIcon.lllg, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                style={[sizeIcon.lllg]}
                                source={require('../../Icon/food_lw.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Thức ăn
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <View style={[sizeIcon.lllg, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                style={[sizeIcon.llg]}
                                source={require('../../Icon/light_lw.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Hướng dẫn tập luyện
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), marginBottom: _moderateScale(8 * 2) }]}>
                        Hệ thống
                    </Text>

                    <TouchableOpacity
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <View style={[sizeIcon.lllg, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                style={[sizeIcon.llg]}
                                source={require('../../Icon/heart_lw.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Thông số sức khoẻ
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>navigation.navigate(ScreenKey.QA_LOSE_WEIGHT)}
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <View style={[sizeIcon.lllg, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                style={[sizeIcon.lllg]}
                                source={require('../../Icon/chat_lw.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Hỏi đáp
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <View style={[sizeIcon.lllg, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                style={[sizeIcon.lllg]}
                                source={require('../../Icon/phone_lw.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Hướng dẫn
                            </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), marginBottom: _moderateScale(8 * 2) }]}>
                        Chỉ số
                    </Text>

                    <View style={[styleElement.rowAliTop]}>
                        <View style={{ flex: 1 }}>
                            <View style={{ backgroundColor: BG_GREY_OPACITY_2, borderRadius: _moderateScale(8), padding: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: '#03BCE4' }]}>BMI:</Text>
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(22), alignSelf: 'center', color: BTN_PRICE }]}>22</Text>
                                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), alignSelf: 'center' }]}>Bình thường</Text>
                            </View>
                            <Text numberOfLines={3} style={[stylesFont.fontNolan, { marginVertical: _moderateScale(8), fontSize: _moderateScale(11), color: BLACK_OPACITY_8, fontStyle: 'italic' }]}>
                                Chỉ số cơ thể thể hiện trạng thái bình thường béo phì, suy dinh dưỡng.
                            </Text>
                            <TouchableOpacity style={{
                                paddingHorizontal: _moderateScale(8 * 2),
                                paddingVertical: _moderateScale(4),
                                borderRadius: _moderateScale(8 * 2),
                                backgroundColor: '#29A9C5',
                                alignSelf: 'flex-start'
                            }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: WHITE }]}>Chi tiết</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8 * 2) }}>
                            <View style={{ backgroundColor: BG_GREY_OPACITY_2, borderRadius: _moderateScale(8), padding: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: '#03BCE4' }]}>BMR:</Text>
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(22), alignSelf: 'center', color: BTN_PRICE }]}>1300</Text>
                                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), alignSelf: 'center' }]}>Kcal</Text>
                            </View>
                            <Text numberOfLines={3} style={[stylesFont.fontNolan, { marginVertical: _moderateScale(8), fontSize: _moderateScale(11), color: BLACK_OPACITY_8, fontStyle: 'italic' }]}>
                                Lượng calo cần thiết tối thiểu cho cơ thể mỗi ngày, là lượng calo nền.
                            </Text>
                            <TouchableOpacity style={{
                                paddingHorizontal: _moderateScale(8 * 2),
                                paddingVertical: _moderateScale(4),
                                borderRadius: _moderateScale(8 * 2),
                                backgroundColor: '#29A9C5',
                                alignSelf: 'flex-start'
                            }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: WHITE }]}>Chi tiết</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={{ backgroundColor: BG_GREY_OPACITY_2, borderRadius: _moderateScale(8), padding: _moderateScale(8) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: '#03BCE4' }]}>TDEE:</Text>
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(22), alignSelf: 'center', color: BTN_PRICE }]}>1560</Text>
                                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), alignSelf: 'center' }]}>Kcal</Text>
                            </View>
                            <Text numberOfLines={3} style={[stylesFont.fontNolan, { marginVertical: _moderateScale(8), fontSize: _moderateScale(11), color: BLACK_OPACITY_8, fontStyle: 'italic' }]}>
                                Là tổng lượng calo cần thiết cho cơ thể mỗi ngày, phản ảnh cụ thể quá trình ăn uống kết hợp tập luyện của cơ thể hàng ngày.
                            </Text>
                            <TouchableOpacity style={{
                                paddingHorizontal: _moderateScale(8 * 2),
                                paddingVertical: _moderateScale(4),
                                borderRadius: _moderateScale(8 * 2),
                                backgroundColor: '#29A9C5',
                                alignSelf: 'flex-start'
                            }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: WHITE }]}>Chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>



                <View style={{ height: 100 }} />
            </ScrollView>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})

export default index;