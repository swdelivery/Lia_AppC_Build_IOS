import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, processColor } from 'react-native';


import { _moderateScale, _heightScale, _width, _widthScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREEN_SUCCESS, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey, { CREATE_BOOKING } from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import LinearGradient from 'react-native-linear-gradient';
import { getListBank } from '../../Redux/Action/Affiilate';
import { escapeRegExp, isEmpty, remove } from 'lodash';
import slugify from 'slugify';
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { getDataPartnerPickUpAddress, removePartnerPickUpAddress } from '../../Redux/Action/BookingAction';
import ActionSheet from 'react-native-actionsheet';

const ListMyAddress = memo((props) => {

    const ActionSheetRef = useRef()

    const [listMyAddress, setListMyAddress] = useState([])

    const [currIdRemove, setCurrIdRemove] = useState('')

    useEffect(() => {
        _getListMyAddress()
    }, [])

    const _getListMyAddress = async () => {
        let result = await getDataPartnerPickUpAddress()
        if (result?.isAxiosError) return
        if (result?.data?.data?.length == 0) {
            return navigation.navigate(ScreenKey.CREATE_NEW_ADDRESS)
        }
        setListMyAddress(result?.data?.data)
    }

    return (
        <View style={styles.container}>


            <ActionSheet
                ref={ActionSheetRef}
                options={["Xoá địa điểm", "Đóng"]}
                destructiveButtonIndex={0}
                cancelButtonIndex={1}
                onPress={async (index) => {
                    switch (index) {
                        case 0:
                            let result = await removePartnerPickUpAddress(currIdRemove)
                            if(result?.isAxiosError)return
                            _getListMyAddress()
                            break;
                        case 1:

                            break;
                        default:
                            break;
                    }
                }}
            />

            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{ height: _moderateScale(8) }} />
            <Header title={"Địa điểm đưa đón"} />

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenKey.CREATE_NEW_ADDRESS)
                }}
                style={styles.btnAddMore}>
                <Image style={[sizeIcon.xxs, { marginRight: _moderateScale(8) }]} source={require('../../NewIcon/plusGrey.png')} />
                <Text style={styles.btnAddMore__text}>
                    Thêm địa chỉ mới
                </Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{}}>


                <View style={{ marginVertical: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }}>
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15) }}>
                        Địa điểm đã lưu
                    </Text>
                </View>
                {
                    listMyAddress?.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', marginVertical: _moderateScale(8 * 1) }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(CREATE_BOOKING, { currPickUpAddress: item })
                                    }}
                                    style={{ marginHorizontal: _moderateScale(8 * 2), borderBottomWidth: _moderateScale(0.5), borderColor: BG_GREY_OPACITY_5, paddingBottom: _moderateScale(8), flex: 1 }}>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), color: BLACK_OPACITY_8 }}>
                                        {index + 1}. {item?.fullAddress?.trim()}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setCurrIdRemove(item?._id)
                                        setTimeout(() => {
                                            ActionSheetRef.current.show()
                                        }, 200);
                                    }}
                                    hitSlop={styleElement.hitslopSm}
                                    style={{ marginRight: _moderateScale(8 * 2) }}>
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16) }}>...</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
});


const styles = StyleSheet.create({
    btnAddMore__text: {
        ...stylesFont.fontNolanBold,
        color: GREY
    },
    btnAddMore: {
        marginTop: _moderateScale(8 * 2),
        marginBottom: _moderateScale(8),
        width: "80%",
        height: _moderateScale(8 * 4),
        borderWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: _moderateScale(8),
        borderColor: GREY,
        alignSelf: 'center'
    },
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


export default ListMyAddress;