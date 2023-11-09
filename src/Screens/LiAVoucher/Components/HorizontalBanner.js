import {  Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { BASE_COLOR } from '../../../Constant/Color'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { styleElement } from '../../../Constant/StyleElement'
import ImageColors from 'react-native-image-colors'
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import EachImage from './EachImage'
import ScreenKey from '../../../Navigation/ScreenKey'
import { navigation } from '../../../../rootNavigation'
import { FlatList } from 'react-native-gesture-handler'

const HorizontalBanner = memo((props) => {

    const FlatListRef = useRef(null)
    const [listImage, setListImage] = useState([])
    const [currIndexBanner, setCurrIndexBanner] = useState(0)

    const [primaryColor, setPrimaryColor] = useState(null)

    const flagIndexHasChanged = useSharedValue(0)
    const [preColor, setPreColor] = useState('#000')
    const [time, setTime] = useState(0);
    const [isDragingBanner, setIsDragingBanner] = useState(false)
    const [interval, setInterval] = useState(null)

    useEffect(() => {
        setListImage([
            {
                _id: '4',
                url: `https://img2.soyoung.com/upload/20210924/9/e4b63471060c8d9cfd934752fb3dafe8.jpg`
            },
            {
                _id: '1',
                url: `https://img2.soyoung.com/upload/20210924/2/9a0441f5159d66125f5252bd886c3946.jpg`
            },
            {
                _id: '2',
                url: `https://img2.soyoung.com/upload/20210924/6/642739b17effba4d31b163757e4d0114.jpg`
            },
            {
                _id: '3',
                url: `https://img2.soyoung.com/upload/20210924/4/b61733f1b5fafde858db04c7bcb04869.jpg`
            },

        ])

        // startInterval()

    }, [])

    useEffect(() => {
        props.flagIndexHasChanged.value = 0;
        props.flagSecondIndexHasChanged.value = 0;
        if (listImage?.length > 0) {
            _getPrimaryColor(listImage[currIndexBanner]?.url)
        }
    }, [currIndexBanner, listImage])

    const startInterval = () => {
        const timer = window.setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 5000);
        setInterval(timer)
        return () => {
            window.clearInterval(timer);
        };
    }

    useEffect(() => {
        if (time) {
            if (isDragingBanner) return window.clearInterval(interval)
            if (currIndexBanner == listImage?.length - 1) {
                FlatListRef?.current?.scrollToIndex({
                    index: 0,
                    animated: true
                })
            } else {
                FlatListRef?.current?.scrollToIndex({
                    index: currIndexBanner + 1,
                    animated: true
                })
            }

        }

    }, [time])


    const _getPrimaryColor = async (url) => {
        const result = await ImageColors.getColors(url, {
            fallback: '#228B22',
            cache: false,
            key: '',
        })
        console.log({ result });
        if (Platform.OS == 'ios') {
            props?.setPrimaryColor(result?.background)
            props?.setSecondColor(result?.secondary)

        } else {
            props?.setPrimaryColor(result?.dominant)
            props?.setSecondColor(result?.average)
        }
    }

    useEffect(() => {
        if (props?.primaryColor) {
            props.flagIndexHasChanged.value = withTiming(1, {
                duration: 700
            }, (isFinished) => {
                if (isFinished) {
                    runOnJS(_changePreColor)(props?.primaryColor)
                }
            })
        }

    }, [props?.primaryColor])

    useEffect(() => {
        if (props?.secondColor) {
            props.flagSecondIndexHasChanged.value = withTiming(1, {
                duration: 700
            }, (isFinished) => {
                if (isFinished) {
                    runOnJS(_changeSecondColor)(props?.secondColor)
                }
            })
        }

    }, [props?.secondColor])

    const _changePreColor = (color) => {
        props?.setPreColor(color)
    }
    const _changeSecondColor = (color) => {
        props?.setPreSecondColor(color)
    }





    const animBG = useAnimatedStyle(() => {
        if (props?.primaryColor) {
            const animtedColor = interpolateColor(
                props.flagIndexHasChanged.value,
                [0, 1],
                [props?.preColor, props?.primaryColor],
            );
            return {
                backgroundColor: animtedColor
            }
        } else {
            return {

            }
        }

    })


    const _renderImage = ({ item, index }) => {
        return (
            // <View style={styles.box}>
            //     <Image
            //         style={styles.box__image}
            //         source={{
            //             uri: `${item?.url}`
            //         }} />
            // </View>
            <EachImage
                handlePress={() => {
                    navigation.navigate(ScreenKey.DETAIL_NEWS_VOUCHER, {})
                }}
                currIndexBanner={currIndexBanner} data={item} indexItem={index} />
        )
    }

    return (
        <Animated.View style={[styles.banner, animBG]}>
            <View style={{
                // height: _widthScale(130)
            }}>

                

                <FlatList
                    ref={FlatListRef}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    scrollEventThrottle={16}
                    onScrollBeginDrag={() => {
                        // setIsDragingBanner(true)
                    }}
                    onScrollEndDrag={() => {
                        // setIsDragingBanner(false)
                    }}
                    onMomentumScrollEnd={(event) => {
                        console.log({ contentOffsetX: event.nativeEvent.contentOffset.x, layoutMeasurementWidth: event.nativeEvent.layoutMeasurement.width });
                        const index = (
                            event.nativeEvent.contentOffset.x /
                            event.nativeEvent.layoutMeasurement.width
                        );
                        console.log({ index });
                        setCurrIndexBanner(index.toFixed())
                    }}
                    pagingEnabled
                    renderItem={_renderImage}
                    data={listImage}
                    keyExtractor={item => item._id}
                />

                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 8 * 1,
                    alignSelf: 'center'
                }}>
                    {
                        listImage?.map((item, index) => {
                            return (
                                <View style={[{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 8 * 2,
                                    backgroundColor: '#a6a2a2',
                                    marginHorizontal: 2
                                }, index == currIndexBanner && { width: 6 * 2, backgroundColor: 'white' }]} />
                            )
                        })
                    }
                </View>

            </View>
        </Animated.View>
    )
})

export default HorizontalBanner

const styles = StyleSheet.create({
    box__image: {
        width: _widthScale(350),
        height: _widthScale(130),
        borderRadius: _moderateScale(8)
    },
    box: {
        // width: _widthScale(350),
        width: _width,
        height: _widthScale(130),
        ...styleElement.centerChild
    },
    banner: {
        height: _widthScale(8 * 20),
        width: _width,
        backgroundColor: BASE_COLOR,
        justifyContent: 'flex-end',
        paddingBottom: _moderateScale(8 * 2)
    }
})