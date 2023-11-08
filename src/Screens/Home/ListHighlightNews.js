import React, { useRef, memo, useEffect, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';


import { _moderateScale, _width } from '../../Constant/Scale';
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
import store from "../../Redux/store";
import { getHightlightNews } from '../../Redux/Action/News';
import { URL_ORIGINAL } from '../../Constant/Url';
import { navigation } from '../../../rootNavigation';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';


const ListHighlightNews = memo((props) => {

    const [listHightLightNews, setListHightLightNews] = useState([])

    const [indexSlider, setIndexSlider] = useState(0)

    useEffect(() => {
        _getHightLightNews()
    }, [])

    const _getHightLightNews = async () => {
        let result = await getHightlightNews({
            "condition": {
                isPin: {
                    equal: true
                },
            },
            "sort": {
                "orderNumber": -1
            },
            "limit": 5,
            "page": 1
        });
        if (result?.isAxiosError) return
        setListHightLightNews(result?.data?.data)

    }


    return (
        <View style={{
            height: _moderateScale(8 * 24),
            // backgroundColor: 'red'
        }}>
            <Carousel
                layout={Platform.OS =='ios' ? 'stack' : 'default'}
                data={listHightLightNews}
                renderItem={({ item, index }) => {
                    return (
                        <View
                        //  onMoveShouldSetResponderCapture={() => true}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: item?._id })
                                }}
                                activeOpacity={1}
                                style={{
                                    paddingHorizontal: _moderateScale(8 * 3)
                                }}
                            >
                                <View style={{
                                    width: "100%",
                                    height: '94%',
                                    backgroundColor: BASE_COLOR,
                                    borderRadius: _moderateScale(8 * 2),
                                    overflow: 'hidden',
                                    flexDirection: 'row',
                                }}>
                                    <View style={{
                                        position: 'absolute',
                                        left: 0, right: 0, bottom: 0, top: 0,
                                        backgroundColor: "rgba(255,255,255,0.2)"
                                    }} />

                                    <View style={{ flex: 3.5 }}>
                                        <View style={{ paddingHorizontal: _moderateScale(8 * 2), paddingRight: _moderateScale(8 * 5), marginTop: _moderateScale(8 * 2) }}>

                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }} numberOfLines={2}>
                                                {item?.title}
                                            </Text>
                                            <View style={{ height: _moderateScale(4) }} />
                                            <Text numberOfLines={3} style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(12), color: WHITE }}>
                                                {`${item?.description}`}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: item?._id })
                                                }}
                                                style={[shadow, {
                                                    width: _moderateScale(8 * 11),
                                                    height: _moderateScale(8 * 3),
                                                    backgroundColor: WHITE,
                                                    marginTop: _moderateScale(8 * 1.25),
                                                    borderRadius: _moderateScale(8),
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }]}>
                                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                                    Xem thêm
                                                    </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{
                                            width: _moderateScale(8 * 24),
                                            height: _moderateScale(8 * 24),
                                            borderRadius: _moderateScale(8 * 12),
                                            // borderTopLeftRadius:_moderateScale(8 * 12),
                                            // borderBottomLeftRadius:_moderateScale(8 * 12),
                                            position: 'absolute',
                                            zIndex: 10,
                                            // left: _moderateScale(0),
                                            // right: -_moderateScale(16),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: SECOND_COLOR
                                        }}>
                                            {
                                                item?.representationFileArr?.length > 0 ?
                                                    <Image style={{
                                                        width: _moderateScale(8 * 20),
                                                        height: _moderateScale(8 * 20),
                                                        // borderRadius: _moderateScale(8 * 20 / 2),
                                                        borderTopLeftRadius: _moderateScale(8 * 20 / 2),
                                                        borderBottomLeftRadius: _moderateScale(8 * 20 / 2),
                                                    }} source={{ uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` }} />
                                                    : <View style={{
                                                        width: _moderateScale(8 * 20),
                                                        height: _moderateScale(8 * 20),
                                                        borderRadius: _moderateScale(8 * 20 / 2),
                                                    }} />
                                            }


                                        </View>
                                    </View>


                                </View>


                            </TouchableOpacity>
                        </View>
                    )
                }}
                sliderWidth={_width}
                itemWidth={_width}
                onSnapToItem={(index) => setIndexSlider(index)}
                // inactiveSlideOpacity={0}
                // autoplay={true}
                // startAutoplay={true}

            />

            <View style={[styleElement.rowAliCenter,{alignSelf:'center', bottom:_moderateScale(8*2)}]}>
                {
                    listHightLightNews?.map((item, index) => {

                        if(index == indexSlider){
                            return(
                                <View
                                key={index}
                                style={{
                                    width:_moderateScale(8),
                                    height:_moderateScale(8),
                                    borderRadius:_moderateScale(4),
                                    backgroundColor:SECOND_COLOR,
                                    marginHorizontal:_moderateScale(4)
                                }}/>
                            )
                        }

                        return(
                            <View 
                            key={index}
                            style={{
                                width:_moderateScale(8),
                                height:_moderateScale(8),
                                borderRadius:_moderateScale(4),
                                backgroundColor:BASE_COLOR,
                                marginHorizontal:_moderateScale(4),
                                opacity:0.2
                            }}/>
                        )
                    })
                }
            </View>

            {/* <Swiper
                showsPagination={true}
                paginationStyle={{ bottom: _moderateScale(4) }}
                bounces={true}
                showsButtons={false}
                horizontal={true}
                loop={false}
                autoplay={false}
                activeDotColor={BASE_COLOR}
                dotColor={'rgba(7,140,127,0.2)'} >
                {
                    listHightLightNews?.map((item, index) => {
                        return (
                            <View
                            //  onMoveShouldSetResponderCapture={() => true}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: item?._id })
                                    }}
                                    activeOpacity={0.8}
                                    style={{ paddingHorizontal: _moderateScale(8 * 3) }}
                                >

                                    <View style={{
                                        width: "100%",
                                        height: '94%',
                                        backgroundColor: BASE_COLOR,
                                        borderRadius: _moderateScale(8 * 2),
                                        overflow: 'hidden',
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{
                                            position: 'absolute',
                                            left: 0, right: 0, bottom: 0, top: 0,
                                            backgroundColor: "rgba(255,255,255,0.2)"
                                        }} />

                                        <View style={{ flex: 3.5 }}>
                                            <View style={{ paddingHorizontal: _moderateScale(8 * 2), paddingRight: _moderateScale(8 * 5), marginTop: _moderateScale(8 * 2) }}>

                                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }} numberOfLines={2}>
                                                    {item?.title}
                                                </Text>
                                                <View style={{ height: _moderateScale(4) }} />
                                                <Text numberOfLines={3} style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(12), color: WHITE }}>
                                                    {item?.description}
                                                </Text>

                                                <TouchableOpacity 
                                                 onPress={() => {
                                                    navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: item?._id })
                                                }}
                                                style={[shadow, {
                                                    width: _moderateScale(8 * 11),
                                                    height: _moderateScale(8 * 3),
                                                    backgroundColor: WHITE,
                                                    marginTop: _moderateScale(8 * 1.25),
                                                    borderRadius: _moderateScale(8),
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }]}>
                                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                                        Xem thêm
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{
                                                width: _moderateScale(8 * 24),
                                                height: _moderateScale(8 * 24),
                                                borderRadius: _moderateScale(8 * 12),
                                                // borderTopLeftRadius:_moderateScale(8 * 12),
                                                // borderBottomLeftRadius:_moderateScale(8 * 12),
                                                position: 'absolute',
                                                zIndex: 10,
                                                // left: _moderateScale(0),
                                                // right: -_moderateScale(16),
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: SECOND_COLOR
                                            }}>
                                                {
                                                    item?.representationFileArr?.length > 0 ?
                                                        <Image style={{
                                                            width: _moderateScale(8 * 20),
                                                            height: _moderateScale(8 * 20),
                                                            // borderRadius: _moderateScale(8 * 20 / 2),
                                                            borderTopLeftRadius: _moderateScale(8 * 20 / 2),
                                                            borderBottomLeftRadius: _moderateScale(8 * 20 / 2),
                                                        }} source={{ uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` }} />
                                                        : <View style={{
                                                            width: _moderateScale(8 * 20),
                                                            height: _moderateScale(8 * 20),
                                                            borderRadius: _moderateScale(8 * 20 / 2),
                                                        }} />
                                                }


                                            </View>
                                        </View>


                                    </View>


                                </TouchableOpacity>
                            </View>
                        )
                    })
                }

            </Swiper> */}
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


export default ListHighlightNews;