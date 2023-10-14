import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Platform, StyleSheet, View } from 'react-native'
import ImageColors from 'react-native-image-colors'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import EachImage from './EachImage'
import FlashSale from './FlashSale'
import ListDoctor from './ListDoctor'
import OptionService from './OptionService'
import Voucher from './Voucher'
import { _moderateScale } from '../../../Constant/Scale'

const Banner = () => {
    const FlatListRef = useRef(null)
    const [listImage, setListImage] = useState([])
    const widthImg = useSharedValue(380)
    const heightImg = useSharedValue(140)
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
            {
                _id: '4',
                url: `https://img2.soyoung.com/upload/20210924/9/e4b63471060c8d9cfd934752fb3dafe8.jpg`
            }
        ])
        // startInterval()

    }, [])

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
            setPrimaryColor(result?.background)

        } else {
            setPrimaryColor(result?.dominant)
        }
    }

    const _changePreColor = (color) => {
        setPreColor(color)
    }

    useEffect(() => {
        if (primaryColor) {
            flagIndexHasChanged.value = withTiming(1, {
                duration: 700
            }, (isFinished) => {
                if (isFinished) {
                    runOnJS(_changePreColor)(primaryColor)
                }
            })
        }

    }, [primaryColor])

    useEffect(() => {
        flagIndexHasChanged.value = 0;
        if (listImage?.length > 0) {
            _getPrimaryColor(listImage[currIndexBanner]?.url)
        }
    }, [currIndexBanner, listImage])

    const animBG = useAnimatedStyle(() => {
        if (primaryColor) {
            const animtedColor = interpolateColor(
                flagIndexHasChanged.value,
                [0, 1],
                [preColor, primaryColor],
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
            <EachImage currIndexBanner={currIndexBanner} data={item} indexItem={index} />
        )
    }

    return (
        <Animated.View style={[styles.container, animBG]}>

            <LinearGradient
                style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['transparent', '#EE79B8']}
            />

            <View style={{ height: _moderateScale(8 * 12) }} />
            <View style={{}}>
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
            <View style={{ height: 8 * 1 }} />

            <OptionService />
            <View style={{ height: 8 }} />
            <Voucher />
            <View style={{ height: 8 }} />
            <FlashSale />
            <View style={{ height: 8 }} />
            <ListDoctor />


        </Animated.View>
    )
}

const styles = StyleSheet.create({

    image: {
        width: 350,
        height: 200
    },
    container: {
        // height: 780,,
        paddingBottom: _moderateScale(8 * 1),
    }
})

export default Banner