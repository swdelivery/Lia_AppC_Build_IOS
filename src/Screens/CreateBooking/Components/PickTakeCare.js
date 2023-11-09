import React, { memo } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import { navigation } from '../../../../rootNavigation';
import CountStar from '../../../Components/CountStar/index';
import * as Color from '../../../Constant/Color';
import { BG_GREY_OPACITY_5, BG_GREY_OPACITY_9, GREY, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { formatMonney, alertCustomNotAction } from '../../../Constant/Utils';
import ScreenKey from '../../../Navigation/ScreenKey';
import Collapsible from 'react-native-collapsible';
import moment from 'moment'
import FastImage from 'react-native-fast-image'

const PickTakeCare = memo((props) => {
    return (
        <View>
            <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Đưa đón & Chăm sóc
                </Text>
            </View>

            <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.LIST_MY_ADDRESS)
                    }}
                    style={styles.btnPickBranch}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={[sizeIcon.md]} source={require('../../../NewIcon/car.png')} />

                    </View>
                    {
                        props?.currPickUpAddress?._id ?
                            <Text style={[styles.btnPickBranch__text, { color: Color.BLACK }]}>
                                {props?.currPickUpAddress?.fullAddress}
                            </Text>
                            :
                            <Text style={styles.btnPickBranch__text}>
                                Chọn nơi đưa đón
                            </Text>
                    }

                    <Image style={[sizeIcon.xxxs, { marginLeft: _moderateScale(4) }]} source={require('../../../NewIcon/downGrey.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: _moderateScale(8 * 2) }} />
            <View style={{flexDirection:'row', flexWrap:'wrap',paddingLeft:_moderateScale(8*2)}}>
                {
                    props?.listFoodDrinkAsset?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    props?.confirmPickFood(item?.code)
                                }}
                                style={{ marginHorizontal: _moderateScale(8 * 1), flexDirection: 'row', paddingVertical: _moderateScale(8) }}>
                                {
                                    props?.listFoodDrinkHasChoice.indexOf(item.code) > -1 ?
                                        <Image style={[sizeIcon.md, styles.checkIco]} source={require('../../../NewIcon/acheck.png')} />
                                        :
                                        <Image style={[sizeIcon.md, styles.checkIco]} source={require('../../../NewIcon/icheck.png')} />
                                }
                                <Text style={[styles.itemAssetText, props?.listFoodDrinkHasChoice.indexOf(item._id) > -1 && styles.itemAssetTextActive]}>
                                    {item?.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        </View>
    );
});


const styles = StyleSheet.create({
    itemAssetTextActive: {
        color: Color.BASE_COLOR,
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14)
    },
    itemAssetText: {
        color: Color.GREY,
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14)
    },
    checkIco: {
        marginRight: _moderateScale(4)
    },
    btnPickBranch__text: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: Color.GREY,
        marginLeft: _moderateScale(8 * 1),
        flex: 1
    },
    btnPickBranch: {
        // height: _moderateScale(8 * 5),
        marginTop: _moderateScale(8),
        backgroundColor: Color.BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(8),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8)
    }


})

export default PickTakeCare;