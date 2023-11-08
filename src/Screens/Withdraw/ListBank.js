import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, processColor } from 'react-native';


import { _moderateScale, _heightScale, _width, _widthScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREEN_SUCCESS, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import LinearGradient from 'react-native-linear-gradient';
import { getListBank } from '../../Redux/Action/Affiilate';
import { escapeRegExp, isEmpty, remove } from 'lodash';
import slugify from 'slugify';
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const index = memo((props) => {

    const [listBank, setListBank] = useState([])
    const [listBankAfterFilter, setListBankAfterFilter] = useState([])

    useEffect(() => {
        _getListBank()
    }, [])

    const _getListBank = async () => {
        let resultGetListBank = await getListBank();
        setListBank(resultGetListBank?.data)
    }

    const filterByNames = (data, inputValue) => {

        const re = new RegExp(escapeRegExp(inputValue), "i");
        const results = data.filter((item) => {
            if (item?.short_name) {
                if (re.test(slugify(item?.short_name, ' '))) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
        if (!isEmpty(results)) {
            setListBankAfterFilter(results)
        }
    };

    const _handleChoiceBank = (bank) => {
        if (props?.route?.params?.flag == 'confirm') {
            props?.route?.params?.setBankName(bank?.short_name)
            navigation.goBack()
            return
        }

        navigation.navigate(ScreenKey.WITH_DRAW, { data: bank })

    }

    return (
        <View style={styles.container}>
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{ height: _moderateScale(8) }} />
            <Header title={"Chuyển tiền đến ngân hàng"} />
            <View style={styles.inputHeader}>
                <TextInput
                    onChangeText={(c) => {
                        filterByNames(listBank, c)
                    }}
                    placeholderTextColor={GREY}
                    style={[stylesFont.fontNolan, { flex: 1, paddingVertical: 0 }]}
                    placeholder={'Tìm kiếm ngân hàng'} />
                <Image
                    style={[sizeIcon.sm]}
                    source={require('../../Icon/search_grey.png')} />
            </View>
            <ScrollView>

                {
                    !isEmpty(listBankAfterFilter) ?
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: _moderateScale(8 * 3) }}>
                            {
                                listBankAfterFilter?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                _handleChoiceBank(item)
                                            }}
                                            key={item?.id}
                                            style={{
                                                marginHorizontal: _moderateScale(8),
                                                width: _widthScale(100),
                                                alignItems: 'center',
                                                marginBottom: _moderateScale(8 * 4),
                                            }}>
                                            <View style={styles.btnBank}>
                                                <Image style={styles.logoBank} source={{ uri: `${item?.logo}` }} />
                                            </View>
                                            <Text
                                                style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), alignSelf: 'center' }]}
                                                numberOfLines={1}>{item?.short_name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: _moderateScale(8 * 3) }}>
                            {
                                listBank?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                _handleChoiceBank(item)
                                            }}
                                            key={item?.id}
                                            style={{
                                                marginHorizontal: _moderateScale(8),
                                                width: _widthScale(100),
                                                alignItems: 'center',
                                                marginBottom: _moderateScale(8 * 4),
                                            }}>
                                            <View style={styles.btnBank}>
                                                <Image style={styles.logoBank} source={{ uri: `${item?.logo}` }} />
                                            </View>
                                            <Text
                                                style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), alignSelf: 'center' }]}
                                                numberOfLines={1}>{item?.short_name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                }

                <View style={{ height: getBottomSpace() }} />
            </ScrollView>
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


export default index;