import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale'
import LinearGradient from 'react-native-linear-gradient'
import Banner from './Components/Banner'
import OverViewBranch from './Components/OverViewBranch'
import MainInfoDoctor from './Components/MainInfoDoctor'
import Feedback from './Components/Feedback'
import QuestionVideo from './Components/QuestionVideo'
import ListBottonService from './Components/ListBottonService'
import IconBackBlack from '../../SGV/backArrBlack.svg'
import { navigation } from '../../../rootNavigation'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import BottomAction from './Components/BottomAction'
import Screen from '@Components/Screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getDoctorById, getDoctorReviewByCode } from '@Redux/Action/DoctorAction'
import { URL_ORIGINAL } from '@Constant/Url'

const DetailDoctor = memo((props) => {
    const scrollY = useSharedValue(0)
    const scaleHeaderWhite = useSharedValue(0);
    const opacityHeaderWhite = useSharedValue(0);
    const [heightBanner, setHeightBanner] = useState(null)
    const { top } = useSafeAreaInsets();


    const [infoDoctor, setInfoDoctor] = useState(null)
    const [listReview, setListReview] = useState([])

    useEffect(() => {
      if (props?.route?.params?.idDoctor) {
        _getDetailDoctor(props?.route?.params?.idDoctor);
      }
    }, [props?.route?.params?.idDoctor]);

    useEffect(() => {
        if (infoDoctor?.code) {
            _getReview(infoDoctor?.code)
        }
    }, [infoDoctor])

    const _getDetailDoctor = async (_id) => {
        let result = await getDoctorById(_id)
        if (result?.isAxiosError) return;
        setInfoDoctor(result)
    }

    const _getReview = async (code) => {
        var review = await getDoctorReviewByCode(code)
        if (review?.isAxiosError) return
        setListReview(review?.data?.data)
        // if (review?.data?.meta?.totalPage == 0) {
        //     setTotalPage(0)
        //     setCurrPage(0)
        // } else {
        //     setTotalPage(review?.data?.meta?.totalPage)
        //     setCurrPage(review?.data?.meta?.page)
        //     setTotalDocument(review?.data?.meta?.totalDocuments)
        // }
    }


    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            scrollY.value = event.contentOffset.y;
        },
        onBeginDrag: (e) => {
        },
        // onEndDrag: (e) => {
        //     isScrolling.value = false;
        // },
    });


    const animSizeImg = useAnimatedStyle(() => {

        const interpolateWidth = interpolate(scrollY.value, [0, 1], [0, 1], { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP });
        const interpolateOpacity = interpolate(scrollY.value, [0, 100], [0, 1], { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP });

        return {
            opacity: interpolateOpacity,
            transform: [
                {
                    scale: interpolateWidth
                }
            ],
        };
    })



    return (
        <Screen>
            <View style={styles.container}>
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../../Image/bgGreen.png')}
                >

                    <Animated.View
                        style={[{
                            width: _width,
                            height: _moderateScale(top + 8 * 5),
                            backgroundColor: 'white',
                            position: 'absolute',
                            zIndex: 1,
                            justifyContent: 'flex-end',
                            paddingHorizontal: _moderateScale(8 * 7),
                            borderBottomWidth: .5,
                            borderBottomColor: 'rgba(0,0,0,.2)',
                            paddingBottom: _moderateScale(8)
                        }, animSizeImg]}
                    >
                        <View style={{
                            width: _widthScale(8 * 30),
                            height: _moderateScale(8 * 4),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: `${URL_ORIGINAL}${infoDoctor?.avatar?.link}`
                                }} />
                            <View style={{ marginLeft: _moderateScale(8) }}>
                                <Text style={{ fontSize: _moderateScale(12), fontWeight: 'bold' }}>
                                    {
                                        infoDoctor?.name
                                    }
                                </Text>
                                <Text style={{ fontSize: _moderateScale(12) }}>
                                    {infoDoctor?.position} <Text style={{ color: 'grey' }}>|</Text> {infoDoctor?.experience}
                                </Text>
                            </View>
                        </View>
                    </Animated.View>

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: _moderateScale(top + 0),
                            zIndex: 2,
                            backgroundColor: 'white',
                            borderRadius: 50,
                            padding: _moderateScale(4),
                            left: _moderateScale(8 * 2)
                        }}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
                    >
                        <IconBackBlack
                            width={_moderateScale(8 * 3)}
                            height={_moderateScale(8 * 3)}
                        />
                    </TouchableOpacity>

                    <Animated.ScrollView
                        scrollEventThrottle={16}
                        onScroll={scrollHandler}
                    >
                        <View style={{
                            height: _heightScale(8 * 30),
                            width: _width,
                            justifyContent: 'flex-end'
                        }}>

                            <LinearGradient
                                style={[{ width: _width, height: _heightScale(105) }, { zIndex: -1, borderTopLeftRadius: 30, borderTopRightRadius: 30 }]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                colors={['rgba(255,255,255,0.1)', 'white']}
                            />
                        </View>
                        <View style={[{ width: _width, alignItems: 'center' }]}>
                            <View style={{
                                width: _width,
                                backgroundColor: '#F6F8F8',
                            }}>
                                <Banner infoDoctor={infoDoctor} setHeightBanner={setHeightBanner} />

                                <View style={{ height: heightBanner - _moderateScale(_moderateScale(8 * 20) / 1.5) }} />
                                <OverViewBranch infoDoctor={infoDoctor} />
                                <MainInfoDoctor infoDoctor={infoDoctor} />
                                <Feedback listReview={listReview} />
                                <QuestionVideo infoDoctor={infoDoctor}/>
                                {/* <ListBottonService/> */}
                            </View>
                        </View>

                    </Animated.ScrollView>

                    <BottomAction infoDoctor={infoDoctor}/>

                </ImageBackground>
            </View>
        </Screen>
    )
})

export default DetailDoctor


const styles = StyleSheet.create({
    avatar: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})