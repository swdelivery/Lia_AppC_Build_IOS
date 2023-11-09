import React, { memo, useRef } from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { BLACK_OPACITY_8, BG_GREY_OPACITY_5, GREY, BG_GREY_OPACITY_7, BASE_COLOR, SECOND_COLOR, BLACK_OPACITY_7 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { sizeIcon } from '../../../Constant/Icon';




const HorizonListServiceGr = memo((props) => {

    const scrollA = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ backgroundColor: '#f4f8fe', borderRadius: _moderateScale(16), marginHorizontal: _moderateScale(8), paddingVertical: _moderateScale(8), borderWidth: 0, top: -_moderateScale(8) }}>
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollA } } }],
                    { useNativeDriver: true },
                )}
                // onScroll={event => { 
                //     // console.log({ ...event });
                //     if (event?.nativeEvent?.layoutMeasurement.width + event?.nativeEvent?.contentOffset.x >= event?.nativeEvent?.contentSize.width) {
                //         console.log('OKDDDD');
                //     }
                // }}
                scrollEventThrottle={1}

                contentContainerStyle={{
                    justifyContent: 'center',
                    // paddingHorizontal: 20,
                    // paddingBottom: 70,
                }}>
                <View>
                    {/* {
                        [1, 2, 3, 4, 5, 6].map((item, index) => {
                            return (
                                <View style={{width:100}}>
                                    <Text>
                                        {item}
                                    </Text>
                                </View>
                            )
                        })
                    } */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {props?.data?.length
                            ? props?.data?.map((item, i) => {
                                if (i % 2 != 0) {
                                    return null;
                                }
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(ScreenKey.SEARCHING_HOME, { keySearch: item?.name, })
                                        }}
                                        style={{
                                            width: (_width - _moderateScale(16)) / 5,
                                            alignItems: 'center',
                                        }}>
                                        {
                                            item?.code == "MAT" || item?.code == "TIEM" ?
                                                <View style={
                                                    { position: 'absolute', zIndex: 100, width: _moderateScale(8 * 7), height: _moderateScale(8 * 5), overflow: 'hidden' }
                                                }>
                                                    <Image
                                                        style={[sizeIcon.xxxlllg, {}]}
                                                        source={{ uri: `https://i.gifer.com/origin/20/209a6bafa4fdc5285713a69a7c6f705b_w200.gif` }} />
                                                </View>
                                                :
                                                <></>
                                        }
                                        <Image style={{
                                            width: _moderateScale(8 * 5),
                                            height: _moderateScale(8 * 5)
                                        }} source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }} />

                                        <Text numberOfLines={1} style={[{ ...stylesFont.fontNolan500, color: BLACK_OPACITY_7, fontSize: _moderateScale(13), letterSpacing: -0.5 }, (item?.code == "MAT" || item?.code == "TIEM") && { ...stylesFont.fontNolanBold }]}>
                                            {item?.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })
                            : null}
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {props?.data?.length
                            ? props?.data?.map((item, i) => {
                                if (i % 2 == 0) {
                                    return null;
                                }
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(ScreenKey.SEARCHING_HOME, { keySearch: item?.name })
                                        }}
                                        style={{
                                            width: (_width - _moderateScale(16)) / 5,
                                            alignItems: 'center',
                                            marginTop: _moderateScale(8)
                                        }}>
                                        <Image style={{
                                            width: _moderateScale(8 * 5),
                                            height: _moderateScale(8 * 5)
                                        }} source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }} />

                                        <Text numberOfLines={1} style={{ ...stylesFont.fontNolan500, color: BLACK_OPACITY_7, fontSize: _moderateScale(13), letterSpacing: -0.5 }}>
                                            {item?.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })
                            : null}
                    </View>
                </View>
            </Animated.ScrollView>
            <View style={{ height: _moderateScale(8 * 2) }} />

            {
                console.log({ RE_RENDER: "RE_RENDER" })

            }

            <View style={{
                width: _moderateScale(8 * 2),
                height: _moderateScale(4),
                borderRadius: _moderateScale(4),
                backgroundColor: BG_GREY_OPACITY_5,
                // borderWidth:1,
                alignSelf: 'center'
            }}>
                <Animated.View style={[{
                    width: _moderateScale(8 * 2),
                    height: _moderateScale(4),
                    borderRadius: _moderateScale(4),
                    backgroundColor: BASE_COLOR,
                },
                {
                    transform: [
                        {
                            translateX: scrollA.interpolate({
                                inputRange: [0, 225],
                                outputRange: [0, _moderateScale(8 * 5) - _moderateScale(8 * 2)],
                            })
                        }
                    ]
                }
                ]} />
            </View>
        </View>
    );
});



export default HorizonListServiceGr;