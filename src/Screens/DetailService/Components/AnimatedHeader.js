import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, Platform, StyleSheet, TouchableOpacity, View,Text } from 'react-native';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { BASE_COLOR, BG_GREY_OPACITY_5, BLACK_OPACITY_8, GREY, WHITE } from '../../../Constant/Color';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { styleElement } from '../../../Constant/StyleElement';
import { navigation } from '../../../../rootNavigation';
import { sizeIcon } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';

const AnimatedHeader = memo((props) => {
    

    const RefScrollTabView = useRef(null);

    useEffect(() => {
        if (!props?.tabs?.length) return

        RefScrollTabView?.current.scrollToIndex({ animated: true, index: props?.activeTabIndex, viewPosition: 0.5 })
    }, [props?.activeTabIndex])

    console.log({x:'AAAAA'});

    return (
        <Animated.View
            style={[
                { width: _width, position: 'absolute', top: 0, zIndex: 100, backgroundColor: WHITE },
                {
                    opacity: props?.scrollA.interpolate({
                        inputRange: [0, 300],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                    }),
                },
                {
                    transform: [
                        {
                            scale: props?.scrollA.interpolate({
                                inputRange: [0, 1, 300],
                                outputRange: [0, 1, 1],
                                extrapolate: 'clamp',
                            })
                        },
                    ],
                }
            ]}>
            <View style={{ height: (Platform.OS == 'ios' ? getStatusBarHeight() : 0) + _moderateScale(8 * 1), backgroundColor: WHITE, width: _width }} />
            <View style={{
                flexDirection: 'row',
                backgroundColor: WHITE,
                paddingVertical: _moderateScale(8),
                paddingBottom: _moderateScale(8 * 0),
                paddingHorizontal: _moderateScale(8 * 1),
                justifyContent: 'center'
            }}>
                <View style={[styleElement.centerChild, {
                    width: _moderateScale(8 * 3.5),
                    height: _moderateScale(8 * 3.5),
                    borderRadius: _moderateScale(8 * 3.5 / 2),
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255,0.8)'
                }]}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <Image style={sizeIcon.md} source={require('../../../NewIcon/backBold.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text numberOfLines={1} style={[stylesFont.fontNolanBold, styles.title, { flex: 1, marginHorizontal: _moderateScale(8 * 1) }]}>
                        {props?.currentService?.name}
                    </Text>
                </View>

                <View style={[styleElement.centerChild, {
                    width: _moderateScale(8 * 3.5),
                    height: _moderateScale(8 * 3.5),
                    borderRadius: _moderateScale(8 * 3.5 / 2),
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255,0.8)'
                }]}>
                    {/* <TouchableOpacity>
                    <Image style={sizeIcon.md} source={require('../../NewIcon/backBold.png')} />
                </TouchableOpacity> */}
                </View>

            </View>
            <View style={{ height: _moderateScale(8 * 5), backgroundColor: WHITE, borderBottomWidth: 0.5, borderBottomColor: BG_GREY_OPACITY_5, borderBottomColor: GREY }}>

                <Animated.FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ref={RefScrollTabView}
                    data={props?.tabs?.length > 0 ? props?.tabs : []}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={[
                                    styleElement.centerChild, { paddingHorizontal: _moderateScale(8 * 2) },
                                    props?.activeTabIndex == index && { borderBottomWidth: 2, borderColor: BASE_COLOR }
                                ]}
                                onPress={() => {
                                    props?.RefScrollView?.current?.getNode()?.scrollTo({
                                        y: item?.offset?.layout?.y - 100,
                                        animated: true,
                                    });
                                }}>
                                <Text style={[{
                                    ...stylesFont.fontNolan500,
                                    color: GREY
                                },
                                props?.activeTabIndex == index && { ...stylesFont.fontNolanBold, color: BASE_COLOR }
                                ]}>
                                    {item?.data?.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>

        </Animated.View>
    );
});



const styles = StyleSheet.create({
    
    title: {
        fontSize: _moderateScale(18),
        color: BLACK_OPACITY_8,
    },
   
}
)



export default AnimatedHeader;