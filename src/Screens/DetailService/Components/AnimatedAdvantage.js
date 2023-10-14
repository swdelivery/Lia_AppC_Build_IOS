import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { _heightScale, _moderateScale, _width } from '../../../Constant/Scale';
import { BASE_COLOR, BG_GREY_OPACITY_5, BLACK_OPACITY_8, GREY, WHITE } from '../../../Constant/Color';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { styleElement } from '../../../Constant/StyleElement';
import { navigation } from '../../../../rootNavigation';
import { sizeIcon } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';
import Collapsible from 'react-native-collapsible';
import LinearGradient from 'react-native-linear-gradient';



const AnimatedAdvantage = memo((props) => {

    const [collapsedTab1, setCollapsedTab1] = useState(true)


    return (
        <>
            <View
                onLayout={(e) => {
                    console.log("onlayout");
                    props.tabs[1] = {
                        data: {
                            name: 'Ưu điểm'
                        },
                        offset: e.nativeEvent
                    };
                    props?.setTabs([...props?.tabs]);
                }}
                style={[styleElement.rowAliBottom, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                <View style={{
                    width: _moderateScale(4),
                    height: _moderateScale(8 * 2.5),
                    backgroundColor: '#FA4664',
                    marginRight: _moderateScale(8)
                }} />
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: '#FA4664' }}>
                    Ưu điểm
                </Text>
            </View>
            <View style={{ paddingHorizontal: _moderateScale(8 * 1) }}>
                <Collapsible  duration={0} collapsedHeight={_heightScale(170)} collapsed={collapsedTab1}>
                    <View style={{ paddingHorizontal: _moderateScale(8) }}>
                        {
                            props?._renderParameterDescription(props?.currentService?.advantageDescription)
                        }
                    </View>
                </Collapsible>
                <View style={{ height: _moderateScale(16) }} />
                {
                    collapsedTab1 && <LinearGradient
                        colors={[
                            'rgba(256, 256, 256,0.0)',
                            'rgba(256, 256, 256,0.5)',
                            // 'rgba(256, 256, 256,0.9)',
                            'rgba(256, 256, 256,1)',
                        ]}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }} />
                }
                {
                    collapsedTab1 ?
                        <TouchableOpacity
                            onPress={() => {
                                setCollapsedTab1(!collapsedTab1)
                            }}
                            style={{
                                zIndex: 10,
                                bottom: _heightScale(0),
                                position: 'absolute',
                                alignSelf: 'center',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: "#FA4664", marginRight: _moderateScale(4) }}>Xem thêm</Text>
                            <Image style={sizeIcon.xxxs} source={require('../../../NewIcon/doubleDownPink.png')} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                setCollapsedTab1(!collapsedTab1)
                            }}
                            style={{
                                zIndex: 10,
                                bottom: _heightScale(0),
                                position: 'absolute',
                                alignSelf: 'center',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: GREY, marginRight: _moderateScale(4) }}>Thu gọn</Text>
                            <Image style={sizeIcon.xxxs} source={require('../../../NewIcon/doubleUpGrey.png')} />
                        </TouchableOpacity>
                }


            </View>
        </>
    );
});


export default AnimatedAdvantage;