import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { GREY, WHITE, GREEN_SUCCESS, BLUE, BLUE_FB, BLACK, THIRD_COLOR, SECOND_COLOR, FOURTH_COLOR, BASE_COLOR, BG_GREY_OPACITY_5, TITLE_GREY, BTN_PRICE, RED, BLACK_OPACITY_8, PRICE_ORANGE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
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
                imageIndex={0}
                visible={showImageViewing}
            />

            <Animated.ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../NewImage/banner2Color.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }]}>
                            <TouchableOpacity
                            hitSlop={styleElement.hitslopSm}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                                <Image
                                    style={[sizeIcon.llg]}
                                    source={require('../../Icon/back_left_white.png')} />
                            </TouchableOpacity>
                            <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(18) }]}>Chi tiết sản phẩm</Text>
                            <TouchableOpacity>

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        position: 'absolute',
                        bottom: _moderateScale(8 * 4),
                        width: "100%"
                    }}>
                        {
                            !_isEmpty(listImage) ?
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowImageViewing(true)
                                        setIndexCurrImageView(currIndexImage)
                                        setListImagesSeeCurr(listImage)
                                    }}
                                    style={{
                                        marginBottom: _moderateScale(8 * 2)
                                    }}>
                                    <Image
                                        style={styles.imageLarge}
                                        source={{
                                            uri: `${URL_ORIGINAL}/${listImage[currIndexImage]?.path}`
                                        }} />
                                </TouchableOpacity>
                                : <></>
                        }

                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            style={{ alignSelf: 'center', maxWidth: "80%", marginBottom: _moderateScale(8) }} horizontal>
                            {
                                listImage?.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index}
                                            onPress={() => {
                                                setCurrIndexImage(index)
                                            }}
                                            style={{
                                                marginHorizontal: _moderateScale(8),
                                            }}>
                                            <Image
                                                style={[styles.imageSmall, index == currIndexImage && { borderWidth: _moderateScale(2), borderColor: BLUE_FB }]}
                                                source={{
                                                    uri: `${URL_ORIGINAL}/${item?.path}`
                                                }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    paddingBottom: _moderateScale(8 * 6)
                }}>
                    <View style={styles.wave} />
                    <View style={{paddingHorizontal:_moderateScale(8*3)}}>
                        <Text style={[stylesFont.fontNolan500, styles.title]}>
                            {currentService?.name}
                        </Text>
                    </View>
                    <Text style={[stylesFont.fontDinTextProBold, styles.price]}>
                        {formatMonney(currentService?.price)}
                    </Text>

                    <TouchableOpacity style={styles.btnBooking}
                    // onPress={()=>_handleOnpressBooking()}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={gradient.color}
                            style={gradient.container}>
                            <Text style={[stylesFont.fontNolanBold, styles.btnBooking__text]}>
                                MUA HÀNG
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text
                        style={[stylesFont.fontNolan, {
                            marginHorizontal: _moderateScale(8 * 4),
                            fontSize: _moderateScale(14),
                            marginTop: _moderateScale(8 * 2)
                        }]}>
                        {currentService?.description}
                    </Text>


                    <View style={[{ marginTop: _moderateScale(8), alignItems: 'center' }]}>
                        <CountStar medium />
                    </View>

                    <View style={{
                        height: _moderateScale(0.5),
                        backgroundColor: BG_GREY_OPACITY_5,
                        marginHorizontal: _moderateScale(8 * 4),
                        marginVertical: _moderateScale(8 * 2)
                    }} />

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'center' }]}>
                        <TouchableOpacity style={{ marginHorizontal: _moderateScale(8 * 2) }}>
                            <Image
                                style={styles.imageChoice}
                                source={require('../../Image/detailservice/call.png')} />
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, alignSelf: 'center', marginTop: _moderateScale(8) }]}>Tư vấn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: _moderateScale(8 * 2) }}>
                            <Image
                                style={styles.imageChoice}
                                source={require('../../Image/detailservice/chat.png')} />
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, alignSelf: 'center', marginTop: _moderateScale(8) }]}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => _handlePressImage(currentService?.id)}
                            style={{ marginHorizontal: _moderateScale(8 * 2) }}>
                            <Image
                                style={styles.imageChoice}
                                source={require('../../Image/detailservice/feedback.png')} />
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, alignSelf: 'center', marginTop: _moderateScale(8) }]}>Hình ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => _handlePressVideo(currentService?.id)}
                            style={{ marginHorizontal: _moderateScale(8 * 2) }}>

                            <Image
                                style={styles.imageChoice}
                                source={require('../../Image/detailservice/video.png')} />
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, alignSelf: 'center', marginTop: _moderateScale(8) }]}>Video</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'center', marginTop: _moderateScale(8 * 4), paddingHorizontal: _moderateScale(8 * 2) }]}>
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

                    <View style={{ marginTop: _moderateScale(8 * 2) }}>
                        <Text style={[stylesFont.fontNolan, {
                            marginHorizontal: _moderateScale(8 * 4),
                            fontSize: _moderateScale(14),
                        }]}>
                            {
                                currTab === '2' ?
                                    currentService?.advantageDescription
                                    : currTab === '3' ?
                                        currentService?.procedureDescription
                                        : currentService?.parameterDescription
                            }
                        </Text>
                    </View>

                    {/* <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 4) }]}>
                        <Text style={[stylesFont.fontNolanBold, { flex: 1, fontSize: _moderateScale(18), color: TITLE_GREY }]}>
                            Review
                        </Text>
                    
                    </View> */}



                </View>

                <View style={{
                    paddingBottom: _moderateScale(8 * 20),
                    backgroundColor: BTN_PRICE
                }}>
                    <View style={[styles.wave, { backgroundColor: BTN_PRICE, alignItems: 'center', justifyContent: 'center' }]} >
                        <View style={{ width: _moderateScale(8 * 15), height: _moderateScale(8), backgroundColor: WHITE, borderRadius: _moderateScale(4) }} />
                    </View>

                    <Text style={[stylesFont.fontNolanBold, { flex: 1, fontSize: _moderateScale(18), color: WHITE, marginLeft: _moderateScale(8 * 3), marginBottom: _moderateScale(8 * 2) }]}>
                        Đánh giá
                    </Text>
                    <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                        {
                            listReview?.map((item, index) => {
                                return <ItemReview data={item} key={index} />
                            })
                        }
                    </View>

                </View>

            </Animated.ScrollView>
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
        fontSize: _moderateScale(22),
        alignSelf: 'center',
        color: PRICE_ORANGE,
    },
    title: {
        fontSize: _moderateScale(18),
        alignSelf: 'center',
        color: BLACK_OPACITY_8,
        textAlign: 'center'
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
        backgroundColor: BTN_PRICE
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