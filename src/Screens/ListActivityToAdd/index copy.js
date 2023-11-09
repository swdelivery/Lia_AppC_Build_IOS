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
import InputSearch from './Components/InputSearch';
import { navigation } from '../../../rootNavigation';

const index = memo((props) => {
    return (
        <View style={styles.container}>
            <Header title={"Hoạt động"} />
            <ScrollView>
                <View style={{ marginTop: _moderateScale(8), paddingHorizontal: _moderateScale(8 * 2) }}>
                    <InputSearch />
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginBottom: _moderateScale(8 * 2), color: BLACK_OPACITY_8 }]}>
                        Gần đây
                    </Text>

                    {
                        [1, 2, 3, 4]?.map((item, index) => {
                            return (
                                <TouchableOpacity 
                                onPress={()=>{
                                    navigation.navigate(ScreenKey.DETAIL_ACTIVITY)
                                }}
                                style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                                    <Image
                                        style={{
                                            width: _moderateScale(40),
                                            height: _moderateScale(40),
                                            borderRadius: _moderateScale(8)
                                        }}
                                        source={{ uri: 'https://images.unsplash.com/photo-1603455778956-d71832eafa4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHJ1bm5pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} />
                                    <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                            Chạy bộ
                                        </Text>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                            4 kcal / phút
                                        </Text>
                                        <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                                    </View>
                                    <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginBottom: _moderateScale(8 * 2), color: BLACK_OPACITY_8 }]}>
                        Thêm hoạt động của bạn
                    </Text>

                    <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate(ScreenKey.ADDING_ACTIVITY)
                    }}
                    style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                        <Image
                            style={{
                                width: _moderateScale(40),
                                height: _moderateScale(40),
                                borderRadius: _moderateScale(8),
                                resizeMode: 'contain'
                            }}
                            source={require('../../Icon/dashAdd.png')} />
                        <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Tên hoạt động
                             </Text>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                Lượng carlo đốt cháy / phút
                                        </Text>
                            <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                        </View>
                        <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginBottom: _moderateScale(8 * 2), color: BLACK_OPACITY_8 }]}>
                        Danh sách hoạt động
                    </Text>

                    {
                        [1, 2, 3, 4]?.map((item, index) => {
                            return (
                                <TouchableOpacity style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8 * 1.5) }]}>
                                    <Image
                                        style={{
                                            width: _moderateScale(40),
                                            height: _moderateScale(40),
                                            borderRadius: _moderateScale(8)
                                        }}
                                        source={{ uri: 'https://images.unsplash.com/photo-1603455778956-d71832eafa4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHJ1bm5pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} />
                                    <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                            Chạy bộ
                                        </Text>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                            4 kcal / phút
                                        </Text>
                                        <View style={{ width: "100%", marginTop: _moderateScale(4), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
                                    </View>
                                    <Image style={[sizeIcon.lg, { transform: [{ rotate: "180deg" }], opacity: 0.5 }]} source={require('../../Icon/backBlack.png')} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})

export default index;