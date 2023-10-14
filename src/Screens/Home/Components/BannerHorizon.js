import React, { memo, useRef, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, FlatList, Platform, ImageBackground, Animated, Easing } from 'react-native';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { BLACK_OPACITY_8, BG_GREY_OPACITY_5, GREY, BG_GREY_OPACITY_7, BASE_COLOR, GREEN_SUCCESS, WHITE, THIRD_COLOR, SECOND_COLOR, RED, BLUE_FB } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { sizeIcon } from '../../../Constant/Icon';
import { useSelector } from 'react-redux';
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { getConfigFileByCode } from '../../../Redux/Action/SpinWheelAction';

const BannerHorizon = memo((props) => {

    const animatedImage = useRef(new Animated.Value(0)).current;
    const rotateCircle = useRef(new Animated.Value(0)).current;
    const scaleBtn = useRef(new Animated.Value(0)).current;

    const countAnimatedImageLoop = useRef(0)

    const [bannerSpinWheel, setBannerSpinWheel] = useState({})
    const [bannerLiaTicket, setBannerLiaTicket] = useState({})

    const RefFlatList = useRef()

    const [totalIndexSwiper, setTotalIndexSwiper] = useState(0)

    const [indexSlider, setIndexSlider] = useState(0)

    const walletReducer = useSelector(state => state?.walletReducer?.infoWallet)

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [imageWhellSpin, setImageWhellSpin] = useState({})


    // console.log({ X: props?.listAllNews });

    useEffect(() => {

        // setTotalIndexSwiper(props?.listAllNews?.length)

        // setInterval(() => {
        //     if(totalIndexSwiper == props?.listAllNews?.length - 1){
        //        return setTotalIndexSwiper(0)
        //     }

        //     setTotalIndexSwiper(old => {
        //         return old += 1
        //     })
        // }, 3000);
    }, [props?.listAllNews])

    useEffect(() => {
        console.log({ totalIndexSwiper });

        // if (totalIndexSwiper > 0) {
        //     RefFlatList?.current?.scrollToIndex({ animated: true, index: totalIndexSwiper - 1 });
        // }
    }, [totalIndexSwiper])

    useEffect(() => {
        _getbannerSpinWheel()
        _getbannerLiaTicket()

        // _startAnimted()
        _getImageWhellSpin()
        _startRotateCircle()
        _startScaleBtn()
    }, [])

    const _getImageWhellSpin = async () => {
        let result = await getConfigFileByCode('IMAGE_SPIN_WHEEL');
        if (result?.isAxiosError) return;
        setImageWhellSpin(result?.data?.data)
    }

    const _startAnimted = () => {

        Animated.loop(
            // Animation consists of a sequence of steps
            Animated.sequence([
                // start rotation in one direction (only half the time is needed)
                Animated.timing(animatedImage, { toValue: 1.0, duration: 35 / 1, easing: Easing.linear, useNativeDriver: true }),
                // rotate in other direction, to minimum value (= twice the duration of above)
                Animated.timing(animatedImage, { toValue: -1.0, duration: 150 / 2, easing: Easing.linear, useNativeDriver: true }),
                // return to begin position
                Animated.timing(animatedImage, { toValue: 0.0, duration: 35 / 1, easing: Easing.linear, useNativeDriver: true })
            ])
            , { iterations: 3 }).start(() => {
                console.log({ nm: countAnimatedImageLoop.current });
                countAnimatedImageLoop.current = countAnimatedImageLoop.current += 1;

                if (countAnimatedImageLoop.current > 20) return
                setTimeout(() => {
                    _startAnimted()
                }, 1000);
            });
    }

    const _startRotateCircle = () => {
        rotateCircle.setValue(0);
        Animated.sequence([
            Animated.timing(rotateCircle, { toValue: -0.5, duration: 500, easing: Easing.out(Easing.quad), useNativeDriver: true }),
            Animated.timing(rotateCircle, { toValue: 2, duration: 4500, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        ]).start(() => {

            countAnimatedImageLoop.current = countAnimatedImageLoop.current += 1;
            if (countAnimatedImageLoop.current > 20) return
            _startRotateCircle()
        })
    }
    const _startScaleBtn = () => {
        // scaleBtn.setValue(0);

        Animated.sequence([
            Animated.timing(scaleBtn, { toValue: 1, duration: 300, easing: Easing.out(Easing.quad), useNativeDriver: true }),
            Animated.timing(scaleBtn, { toValue: 0, duration: 800, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        ]).start(() => {
            if (countAnimatedImageLoop.current > 20) return
            _startScaleBtn()
        })

        // Animated.timing(scaleBtn,
        //     { toValue: 1, duration: 1000, easing: Easing.out(Easing.quad), useNativeDriver: true }
        // ).start(() => {
        //     _startScaleBtn()
        // })

    }

    const _getbannerSpinWheel = async () => {
        let result = await getConfigFileByCode("BANNER_SPIN_WHEEL");
        if (result?.isAxiosError) return
        setBannerSpinWheel(result?.data?.data)
    }

    const _getbannerLiaTicket = async () => {
        let result = await getConfigFileByCode("BANNER_LIA_TICKET");
        if (result?.isAxiosError) return
        setBannerLiaTicket(result?.data?.data)
    }

    return (
        <View style={[{ marginHorizontal: _widthScale(8 * 1) }, styleElement.rowAliCenter, { justifyContent: 'space-between' }]}>
            <View style={{ width: ((_width - _widthScale(8 * 2) - _widthScale(8)) / 2), height: ((_width - _widthScale(8 * 2) - _widthScale(8)) / 2) }}>

                <Carousel
                    layout={Platform.OS == 'ios' ? 'default' : 'default'}
                    data={props?.listAllNews}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    // 
                                    if (item?.onClickAction?.type == 'redirect') {
                                        if (!infoUserRedux?._id) {
                                            store.dispatch({
                                                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                                payload: {
                                                    flag: true,
                                                    currRouteName: props?.route?.name
                                                }
                                            })
                                            return
                                        }
                                        navigation.navigate(item?.onClickAction?.data)
                                    } else {
                                        navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: item?._id })
                                    }
                                }}
                            >
                                <Image
                                    style={{ width: '100%', height: '100%', borderRadius: _widthScale(8) }}
                                    source={{
                                        uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                    }} />
                            </TouchableOpacity>
                        )
                    }}
                    sliderWidth={((_width - _widthScale(8 * 2) - _widthScale(8)) / 2)}
                    itemWidth={(_width - _widthScale(8 * 2) - _widthScale(8)) / 2}
                    onSnapToItem={(index) => setIndexSlider(index)}
                    // autoplay={true}
                    // loop={true}
                />

                <View style={[styleElement.rowAliCenter, { alignSelf: 'center', bottom: _widthScale(8 * 2), position: 'absolute' }]}>
                    {
                        props?.listAllNews?.map((item, index) => {

                            if (index == indexSlider) {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            width: _moderateScale(8),
                                            height: _moderateScale(8),
                                            borderRadius: _moderateScale(4),
                                            backgroundColor: BLUE_FB,
                                            marginHorizontal: _moderateScale(4),
                                            opacity: 1
                                        }} />
                                )
                            }

                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: _moderateScale(8),
                                        height: _moderateScale(8),
                                        borderRadius: _moderateScale(4),
                                        backgroundColor: GREY,
                                        marginHorizontal: _moderateScale(4),
                                        opacity: 0.5
                                    }} />
                            )
                        })
                    }
                </View>

            </View>
            {/* <View style={{ width: _widthScale(8) }} /> */}

            <View style={{
                width: ((_width - _widthScale(8 * 2) - _widthScale(8)) / 2),
                height: ((_width - _widthScale(8 * 2) - _widthScale(8)) / 2),
                // borderWidth: 0.5,
                borderRadius: _widthScale(8),
                borderColor: BG_GREY_OPACITY_7
            }}>

                <TouchableOpacity
                    onPress={() => {
                        if (!infoUserRedux?._id) {
                            store.dispatch({
                                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                payload: {
                                    flag: true,
                                    currRouteName: props?.route?.name
                                }
                            })
                            return
                        }
                        navigation.navigate(ScreenKey.MISSION_SCREEN)
                    }}
                    style={{ flex: 1, borderWidth: 0.5, ...styleElement.centerChild, borderRadius: 8, margin: _widthScale(0), borderColor: BG_GREY_OPACITY_7, backgroundColor: SECOND_COLOR, overflow: 'hidden' }}>
                    {
                        bannerLiaTicket?.fileArr?.length > 0 ?
                            <Image
                                style={[
                                    {
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover'
                                    }]}
                                source={{ uri: `${URL_ORIGINAL}${bannerLiaTicket?.fileArr[0]?.link}` }}
                            />
                            : <></>
                    }

                </TouchableOpacity>

                <View style={{ height: _widthScale(8) }} />

                <Animated.View style={[{ flex: 1 },
                {
                    transform: [{
                        rotate: animatedImage.interpolate({
                            inputRange: [-1, 1],
                            outputRange: ['-0.05rad', '0.05rad']
                        })
                    }]
                }
                ]}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            if (!infoUserRedux?._id) {
                                store.dispatch({
                                    type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                    payload: {
                                        flag: true,
                                        currRouteName: props?.route?.name
                                    }
                                })
                                return
                            }
                            navigation.navigate(ScreenKey.WHEEL_SPIN)
                        }}
                        style={{ flex: 1, borderWidth: 0.5, borderRadius: 8, borderColor: BG_GREY_OPACITY_7, backgroundColor: SECOND_COLOR, overflow: 'hidden' }}>
                        {
                            bannerSpinWheel?.fileArr?.length > 0 ?
                                <ImageBackground
                                    style={[
                                        {
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'cover'
                                        },
 
                                    ]}
                                    source={{ uri: `${URL_ORIGINAL}${bannerSpinWheel?.fileArr[0]?.link}` }}
                                >

                                    <Animated.Image
                                        source={require('../../../Image/spin/btnSpinWhell.png')}
                                        style={[styleElement.centerChild, {
                                            width: _moderateScale(8 * 9),
                                            height: _moderateScale(8 * 2.5),
                                            position: 'absolute',
                                            zIndex:10,
                                            left: _moderateScale(8 * 1),
                                            bottom: _moderateScale(8 * 1.5),
                                            borderRadius: _moderateScale(4)
                                        },
                                        {
                                            transform: [
                                                {
                                                    scale: scaleBtn.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [1, 1.15]
                                                    })
                                                },
                                            ]
                                        }
                                        ]}/>

                                        <Image style={[{
                                            position:'absolute',
                                            right:_moderateScale(8*9),
                                            bottom:_moderateScale(6)
                                        },sizeIcon.lxlg]} source={require('../../../Image/spin/gift.png')}/>
                                        <Image style={[{
                                            position:'absolute',
                                            right:_moderateScale(8*1.5),
                                            bottom:_moderateScale(6),
                                            zIndex:10
                                        },sizeIcon.lxlg]} source={require('../../../Image/spin/gift.png')}/>

                                    {
                                        imageWhellSpin?.fileArr?.length > 0 ?
                                            <Animated.Image
                                                style={[{
                                                    width: _moderateScale(8 * 8),
                                                    height: _moderateScale(8 * 8),
                                                    position: 'absolute',
                                                    zIndex: 1,
                                                    right: _moderateScale(8 * 2.8),
                                                    top: _moderateScale(8 * 1.5)
                                                },
                                                {
                                                    transform: [{
                                                        rotate: rotateCircle.interpolate({
                                                            inputRange: [-0.5, 0, 1],
                                                            outputRange: ['-50deg', '0deg', '360deg']
                                                            // outputRange: ['360deg', '0deg']
                                                        })
                                                    }]
                                                },
                                                ]}
                                                source={{
                                                    uri: `${URL_ORIGINAL}${imageWhellSpin?.fileArr[0]?.link}`
                                                }} />
                                            :
                                            <></>
                                    }

                                </ImageBackground>
                                : <></>
                        }


                    </TouchableOpacity>
                </Animated.View>
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


export default BannerHorizon;