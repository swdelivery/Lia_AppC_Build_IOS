import React, { useRef, memo } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREEN_SUCCESS, BASE_COLOR, SECOND_COLOR, BLACK_OPACITY_8 } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ListOptions from './ListOptions'
import ListServices from './ListServices'

import ItemNews from './Components/ItemNews'
import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';

const AboutOurDoctor = memo((props) => {
    return (
        <View>
            <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                <View style={[styleElement.rowAliCenter]}>
                    <Image style={sizeIcon.llg} source={require('../../NewIcon/infoOutline.png')} />

                    <Text style={[stylesFont.fontNolanBold, {
                        fontSize: _moderateScale(16),
                        color: BLACK_OPACITY_8, marginLeft: _moderateScale(8 * 1)
                    }]}>
                        About Our Doctor
                    </Text>
                </View>

                <View style={{ width: '100%', borderRadius: _moderateScale(8 * 2), overflow: 'hidden', height: _moderateScale(136), marginTop: _moderateScale(8 * 2) }}>
                    <ImageBackground
                        resizeMode={'cover'}
                        style={{
                            width: '100%',
                            height: '100%',
                            flexDirection:'row'
                        }} source={require('../../NewImage/bannerAboutDoctor.png')}>
                        <View style={{ flex: 2.5 }}>

                        </View>
                        <View style={{ flex: 3.5 , paddingHorizontal:_moderateScale(8*2), marginTop:_moderateScale(8*2)}}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: WHITE }} numberOfLines={1}>
                                Lorem ipsum dolor
                            </Text>
                            <View style={{ height: _moderateScale(4) }} />
                            <Text numberOfLines={2} style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(12), color: WHITE }}>
                                consectetur adipiscing elit. Mauris ultrices interdum nisl, quis consequat turpis tincidunt vel. Mauris nec erat finibus, varius sem in, blandit enim. Suspendisse sagittis odio consectetur est faucibus malesuada. Donec consequat neque eget iaculis molestie. Maecenas quis libero eleifend,
                            </Text>

                            <TouchableOpacity style={[shadow,{
                                width:_moderateScale(8*11),
                                height:_moderateScale(8*3),
                                backgroundColor:WHITE,
                                marginTop:_moderateScale(8*2),
                                borderRadius:_moderateScale(8),
                                justifyContent:'center',
                                alignItems:'center'
                            }]}>
                                <Text style={{...stylesFont.fontNolan500,fontSize:_moderateScale(14), color:BLACK_OPACITY_8}}>
                                    Let's Go!
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </ImageBackground>
                </View>

            </View>
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
    shadowRadius: 4,

    elevation: 3
}



export default AboutOurDoctor;