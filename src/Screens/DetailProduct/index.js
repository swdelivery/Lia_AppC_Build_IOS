import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { GREY, WHITE, GREEN_SUCCESS, BLUE, BLUE_FB, BLACK, THIRD_COLOR, SECOND_COLOR, FOURTH_COLOR, BASE_COLOR, BG_GREY_OPACITY_5, TITLE_GREY, BTN_PRICE, RED, BLACK_OPACITY_8, PRICE_ORANGE, BG_GREY_OPACITY_3 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { navigation } from '../../../rootNavigation';
import _isEmpty from 'lodash/isEmpty'
import ImageView from "react-native-image-viewing";
import LinearGradient from 'react-native-linear-gradient';

import CountStar from '../../Components/CountStar/index'
import ItemReview from './Components/ItemReview'

import ModalFeedBack from './Components/ModalFeedBack'
import { getServiceById, getServiceReviewByCode } from '../../Redux/Action/Service';
import { URL_ORIGINAL } from '../../Constant/Url';
import { formatMonney } from '../../Constant/Utils';
import { BOOKING_FOR_BRANCH, BOOKING_MAIN } from '../../Navigation/ScreenKey';
import { getDataProductFiles, getProductById } from '../../Redux/Action/Product';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import ModalIframeYoutube from '../../Components/ModalIframeYoutube/ModalIframeYoutube';
import { useDispatch } from 'react-redux';
import RenderHtml from 'react-native-render-html';


const DetailServiceScreen = (props) => {
    const dispatch = useDispatch()
    const scrollA = useRef(new Animated.Value(0)).current;

    const [listImage, setListImage] = useState([
        {
            uri: `https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
        {
            uri: `https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
        {
            uri: `https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
        {
            uri: `https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
        {
            uri: `https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
    ])
    const [currIndexImage, setCurrIndexImage] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [currTab, setCurrTab] = useState('1')
    const [showModalFeedBack, setShowModalFeedBack] = useState(false)
    const [currentService, setCurrService] = useState(null)
    const [listReview, setListReview] = useState([])
    const [isMore, setIsMore] = useState(true)

    const [playingYoutube, setPlayingYoutube] = useState({
        show: false,
        playList: []
    })


    useEffect(() => {
        if (!_isEmpty(props?.route?.params?.idProduct)) {
            _getService()
        }
    }, [])

    const _getService = async () => {
        var currentService = await getProductById(props?.route?.params?.idProduct)
        if (currentService?.isAxiosError) return
        setCurrService(currentService)
        setListImage(currentService?.representationFileArr)
        setListImagesSeeCurr(currentService?.representationFileArr)
    }

    useEffect(() => {
        // _getReview()
    }, [currentService])

    const _getReview = async () => {
        var review = await getServiceReviewByCode(currentService?.code)
        if (review?.isAxiosError) return
        setListReview(review)
    }

    const _getReviewMore = async (_idMore) => {
        var review = await getServiceReviewByCode(currentService?.code, _idMore)
        if (review?.isAxiosError) return

        if (review.length === 10) {
            setIsMore(true)
        }
        else {
            setIsMore(false)
        }
        setListReview(old => {
            return [
                ...old,
                ...review
            ]
        })
    }


    const _handlePressFeedback = () => {
        setShowModalFeedBack(true)
    }

    const _handleOnpressBooking = () => {
        navigation.navigate(BOOKING_FOR_BRANCH, { idProduct: props?.route?.params?.idProduct })
    }


    const _handlePressImage = async (id) => {
        let result = await getDataProductFiles(id, {
            condition: {
                type: {
                    equal: 'image'
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return
        if (result?.data?.data?.length == 0) {
            return alertCustomNotAction(`Lỗi`, `Chưa có dữ liệu ảnh về dịch vụ này`)
        }

        var list = result?.data?.data.map(rrr => rrr.file)
        setShowImageViewing(true)
        setListImagesSeeCurr(list)
    }

    const _handlePressVideo = async (id) => {
        console.log({ id });
        let result = await getDataProductFiles(id, {
            condition: {
                type: {
                    equal: 'video'
                }
            },
            limit: 1000
        })

        if (result?.isAxiosError) return

        if (result?.data?.data?.length == 0) {
            return alertCustomNotAction(`Lỗi`, `Chưa có dữ liệu video về dịch vụ này`)
        }

        setPlayingYoutube(old => {
            return {
                ...old,
                show: true,
                playList: result?.data?.data?.map(item => item?.file?.link)
            }
        })

    }


    const _renderParameterDescription = (htmlContent) => {
            console.log({htmlContent});
            
        // return (
        //     !isEmpty(htmlContent) ? <HTMLView
        //     enableExperimentalBRCollapsing={true}
        //                 enableExperimentalMarginCollapsing={true}
        //         value={htmlContent}
        //         renderNode={_customRender}
        //     /> : <></>
        // );
        if (htmlContent?.length > 0) {
            // let htmlTemp = htmlContent.replaceAll('\n','')
            return (
                <RenderHtml
                    contentWidth={_width - _widthScale(8 * 6)}
                    source={{ html: htmlContent }}
                    enableExperimentalBRCollapsing={true}
                    enableExperimentalMarginCollapsing={true}
                />
            )
        } else {
            return (<></>)
        }


    }




    return (
        <View style={styles.container}>
            <StatusBarCustom />
            <ModalIframeYoutube
                playList={playingYoutube?.playList}
                hide={() => {
                    setPlayingYoutube(old => {
                        return {
                            ...old,
                            show: false,
                            playList: []
                        }
                    })
                }}
                show={playingYoutube?.show} />

            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}/${item?.path}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingVertical: _moderateScale(8),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: BASE_COLOR,
                // height: _moderateScale(8 * 6)
            }}>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/back_left_white.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: WHITE }}>
                        Chi tiết sản phẩm
                    </Text>
                </View>
            </View>

            <ScrollView>
                <ScrollView horizontal pagingEnabled>
                    {
                        listImage?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowImageViewing(true)
                                        setIndexCurrImageView(index)
                                        setListImagesSeeCurr(listImage)
                                    }}
                                    activeOpacity={0.8}
                                    style={{ width: _width, height: _width }}>
                                    <Image
                                        style={{ width: '100%', height: '100%' }}
                                        source={{
                                            uri: `${URL_ORIGINAL}/${item?.path}`
                                        }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                <View style={{ margin: _moderateScale(8 * 2) }}>
                    <Text style={[stylesFont.fontNolan500, styles.title]}>
                        {currentService?.name}
                    </Text>
                    {/* <Text style={[stylesFont.fontDinTextProBold, styles.price]}>
                        {formatMonney(currentService?.price)}
                    </Text> */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[stylesFont.fontDinTextProBold, styles.price]}>
                            {formatMonney(currentService?.price)}
                        </Text>
                        <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: PRICE_ORANGE, fontSize: _moderateScale(20), }}>đ</Text>
                    </View>

                    <Text
                        style={[stylesFont.fontNolan, {
                            marginHorizontal: _moderateScale(8 * 0),
                            fontSize: _moderateScale(14),
                            marginTop: _moderateScale(8 * 2)
                        }]}>
                        {currentService?.description}
                    </Text>
                </View>

                <View style={[styleElement.rowAliCenter, { justifyContent: 'center', marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }]}>
                    <TouchableOpacity
                        onPress={() => { setCurrTab('1') }}
                        style={[styles.btnTab, currTab == '1' && { borderBottomWidth: _moderateScale(2), borderBottomColor: BASE_COLOR }]}>
                        <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '1' && { color: BASE_COLOR }]}>
                            Thông số
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setCurrTab('2') }}
                        style={[styles.btnTab, currTab == '2' && { borderBottomWidth: _moderateScale(2), borderBottomColor: BASE_COLOR }]}>
                        <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '2' && { color: BASE_COLOR }]}>
                            Giới thiệu
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setCurrTab('3') }}
                        style={[styles.btnTab, currTab == '3' && { borderBottomWidth: _moderateScale(2), borderBottomColor: BASE_COLOR }]}>
                        <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '3' && { color: BASE_COLOR }]}>
                            Hướng dẫn
                            </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 3), minHeight: 300 }}>
                    {/* <Text style={[stylesFont.fontNolan, {
                        marginHorizontal: _moderateScale(8 * 2),
                        fontSize: _moderateScale(14),

                    }]}> */}
                        {
                            currTab === '2' ?
                                _renderParameterDescription(currentService?.advantageDescription)
                                : currTab === '3' ?
                                    _renderParameterDescription(currentService?.procedureDescription)
                                    : _renderParameterDescription(currentService?.parameterDescription)
                        }
                    {/* </Text> */}
                </View>

                <View style={{ height: _moderateScale(50) }} />
            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    btnTab__text: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    btnTab: {
        width: "30%",
        alignItems: 'center',
        paddingBottom: _moderateScale(4)
    },
    imageChoice: {
        width: _moderateScale(50),
        height: _moderateScale(50),
        resizeMode: 'contain'
    },
    btnBooking__text: {
        fontSize: _moderateScale(14),
        color: WHITE
    },
    btnBooking: {
        // paddingHorizontal: _moderateScale(8 * 2),
        // paddingVertical: _moderateScale(8),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: BASE_COLOR,
        marginHorizontal: _moderateScale(8 * 7),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: _moderateScale(8 * 2),
        height: _moderateScale(8 * 4.5),
        overflow: 'hidden'
    },
    price: {
        fontSize: _moderateScale(18),
        color: PRICE_ORANGE,
    },
    title: {
        fontSize: _moderateScale(18),
        color: BLACK,
    },
    imageLarge: {
        width: "85%",
        height: _moderateScale(8 * 18),
        resizeMode: 'cover',
        borderRadius: _moderateScale(8 * 2),
        alignSelf: 'center',
    },
    imageSmall: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        resizeMode: 'cover',
        borderRadius: _moderateScale(4)
    },
    btnOptions__icon: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain'
    },
    btnOptions: {
        width: _moderateScale(100),
        height: _moderateScale(100),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center'
    },

    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(300),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
}
)


const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        BASE_COLOR,
        SECOND_COLOR,
    ]
}

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 11
}


export default DetailServiceScreen;