import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Platform, ImageBackground, Touchable, TouchableHighlight, Dimensions } from 'react-native';
import { BASE_COLOR, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../../Constant/Color';
import { _moderateScale } from '../../../Constant/Scale';
import { getConfigFileByCode } from '../../../Redux/Action/SpinWheelAction';
import { URL_ORIGINAL } from '../../../Constant/Url';
import FastImage from 'react-native-fast-image';


const AdsFlashSale = props => {

    const [poup, setPopup] = useState({})

    useEffect(() => {
        _getPopupFlashSale()
    }, [])

    const _getPopupFlashSale = async () => {
        let result = await getConfigFileByCode("POPUP_FLS");
        if (result?.isAxiosError) return
        setPopup(result?.data?.data)
    }

    return (
        <TouchableOpacity
            onPress={() => props?._hanleClickSale()}
            style={{
                // backgroundColor: SECOND_COLOR,
                width: _moderateScale(300),
                height: _moderateScale(300),
                position: 'absolute',
                zIndex: 100,
                // left: (Dimensions.get('window').width - 240) / 2,
                alignSelf:'center',
                top: (Dimensions.get('window').height - 240) / 2.5,
                justifyContent: 'center', alignItems: 'center',
                // borderWidth: 2,
                // borderColor: THIRD_COLOR,
                // borderRadius: 8,
                ...shadow
            }}>
            {
                poup?.fileArr?.length > 0 ?
                    <FastImage
                        style={[
                            {
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain'
                            }]}
                        // source={{ uri: `${URL_ORIGINAL}${poup?.fileArr[0]?.link}` }}
                        source={{
                            uri: `${URL_ORIGINAL}${poup?.fileArr[0]?.link}`,
                            // priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    : <></>
            }
            {/* <Image style={{
                width: _moderateScale(280),
                height: _moderateScale(280)
            }}
                source={require('../../../Image/flashsale1.png')}
            /> */}
        </TouchableOpacity>
    );
};

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,

    elevation: 3
}

export default AdsFlashSale;