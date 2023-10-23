import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { _height, _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color'
import Animated, { FadeInRight, FadeOut, SlideInRight, runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { IconBackBase, IconBackWhite, IconBook, IconBrone, IconDiamond, IconGold, IconSilver } from '../../../Components/Icon/Icon'
import { sizeIcon } from '../../../Constant/Icon'
import { stylesFont } from '../../../Constant/Font'
import { TabBar, TabView } from 'react-native-tab-view'
import * as Color from '../../../Constant/Color'
import LinearGradient from 'react-native-linear-gradient'

const TabDiamond = memo((props) => {
    return (
        <View style={{}}>
            <View style={{ alignItems: 'center', marginTop: _moderateScale(8 * 2) }}>
                <IconDiamond style={styles.iconSizeRanked} />
                <Text style={styles.textRanked}>
                    {
                        props?.data?.name
                    }
                </Text>
            </View>
            <View style={{ height: _moderateScale(8 * 3) }} />

            <View style={styles.lineText}>
                <View style={{ flex: 1 }}>
                    <Text>{props?.data?.startPoint}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16) }}>{props?.data?.startPoint} Điểm</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    {/* <Text>30.000</Text> */}
                </View>
            </View>
            <View style={styles.line}>
                <LinearGradient
                    style={[StyleSheet.absoluteFill, { borderRadius: _moderateScale(8) }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#9EC0F7", "#B6F9D3"]}
                />
            </View>
            <View style={{ height: _moderateScale(8 * 3) }} />


            <View style={{
                flexDirection: 'row',
                width: _widthScale(330),
                alignSelf: 'center'
            }}>
                <View style={[styles.boxDetail, { backgroundColor: '#B0D8DF' }]}>
                    <Text style={styles.boxDetail__textPercent}>
                        {props?.data?.promotion?.discountRetailService}%
                    </Text>
                    <Text style={styles.boxDetail__text}>
                        Sử dụng dịch vụ
                    </Text>
                </View>
                <View style={{ width: _moderateScale(4) }} />
                <View style={[styles.boxDetail, { backgroundColor: '#9EB6E9' }]}>
                    <Text style={styles.boxDetail__textPercent}>
                        {props?.data?.promotion?.discountFriend}%
                    </Text>
                    <Text style={styles.boxDetail__text}>
                        Giảm cho bạn bè
                    </Text>
                </View>
                <View style={{ width: _moderateScale(4) }} />
                <View style={[styles.boxDetail, { backgroundColor: '#658ACB' }]}>
                    <Text style={styles.boxDetail__textPercent}>
                        {props?.data?.promotion?.commissionRate}%
                    </Text>
                    <Text style={styles.boxDetail__text}>
                        Hoa hồng trực tiếp
                    </Text>
                </View>

            </View>

            <View style={{
                paddingLeft: _moderateScale(8 * 2),
                marginTop: _moderateScale(8 * 2)
            }}>
                <Text style={styles.titleDetail}>
                    Hạng điểm từ {props?.data?.startPoint} điểm trở lên
                </Text>
                <View style={{ height: _moderateScale(8) }} />
                <Text style={{ fontSize: _moderateScale(14) }}>
                    1. Giảm thêm {props?.data?.promotion?.discountRetailService}% tổng đơn khi sử dụng dịch vụ.
                </Text>
                <Text style={{ fontSize: _moderateScale(14) }}>
                    2. Giảm {props?.data?.promotion?.discountFriend}% cho bạn bè
                </Text>
                <Text style={{ fontSize: _moderateScale(14) }}>
                    3. Nhận được {props?.data?.promotion?.commissionRate}% hoa hồng khi giới thiệu bạn bè
                </Text>
            </View>

        </View>
    )
})

export default TabDiamond

const styles = StyleSheet.create({
    titleDetail: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(16),
        color: BASE_COLOR
    },
    boxDetail__text: {
        ...stylesFont.fontNolan500,
        color: WHITE,
        fontSize: _moderateScale(12),
        fontStyle: 'italic'
    },
    boxDetail__textPercent: {
        ...stylesFont.fontNolanBold,
        color: WHITE,
        fontSize: _moderateScale(16)
    },
    boxDetail: {
        flex: 1,
        alignItems: 'center',
        height: _moderateScale(8 * 6),
        justifyContent: 'center',
        borderRadius: _moderateScale(4)
    },
    lineText: {
        width: _moderateScale(340),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: _moderateScale(8),
        alignItems: 'flex-end'
    },
    line: {
        width: _moderateScale(340),
        height: _moderateScale(8),
        alignSelf: 'center',
        borderRadius: _moderateScale(8)
    },
    textRanked: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    iconSizeRanked: {
        width: _moderateScale(8 * 12),
        height: _moderateScale(8 * 12)
    },
    btnBack: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 4 / 2),
        backgroundColor: BASE_COLOR
    },
    header: {
        flexDirection: 'row',
        marginTop: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        alignItems: 'center'

    }
})