import _isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import ImageView from "react-native-image-viewing";
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BG_GREY_OPACITY_9, BLACK, BLACK_OPACITY_8, BLUE_FB, BTN_PRICE, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_7, RED } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale, _width } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import { getDoctorById, getDoctorReviewByCode, partnerConversationStartChat } from '../../Redux/Action/DoctorAction';
import { formatMonney } from '../../Constant/Utils';
import { BOOKING_FOR_BRANCH, BOOKING_MAIN } from '../../Navigation/ScreenKey';
import ScreenKey from '../../Navigation/ScreenKey'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import HeaderLeft from '../../Components/HeaderLeft';
import CountStar from '../../Components/CountStar/index';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import ItemNews from '../../Screens/Home/Components/ItemNews';
import moment from 'moment'
import { FROM_GROUP_CHAT_ID } from '../../Constant/Flag';


const DetailDoctorScreen = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;

    const [listImage, setListImage] = useState([])
    const [currIndexImage, setCurrIndexImage] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [currTab, setCurrTab] = useState('1')
    const [currentDoctor, setCurrDoctor] = useState(null)
    const [listReview, setListReview] = useState([])


    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)


    const [currPage, setCurrPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [totalDocument, setTotalDocument] = useState(0)

    useEffect(() => {
        if (!_isEmpty(props?.route?.params?.idDoctor)) {
            _getDoctor()
        }
    }, [props?.route?.params?.idDoctor])

    const _getDoctor = async () => {
        var currentDoctor = await getDoctorById(props?.route?.params?.idDoctor)
        if (currentDoctor?.isAxiosError) return
        setCurrDoctor(currentDoctor)
        setListImage(currentDoctor?.representationFileArr)
        setListImagesSeeCurr(currentDoctor?.representationFileArr)
    }
    useEffect(() => {
        if (currentDoctor) {
            _getReview()
        }
    }, [currentDoctor])

    const _getReview = async () => {
        var review = await getDoctorReviewByCode(currentDoctor?.code)
        if (review?.isAxiosError) return
        setListReview(review?.data?.data)
        if (review?.data?.meta?.totalPage == 0) {
            setTotalPage(0)
            setCurrPage(0)
        } else {
            setTotalPage(review?.data?.meta?.totalPage)
            setCurrPage(review?.data?.meta?.page)
            setTotalDocument(review?.data?.meta?.totalDocuments)
        }
    }

    const _getReviewMore = async (_idMore) => {
        var review = await getDoctorReviewByCode(currentDoctor?.code, _idMore)
        if (review?.isAxiosError) return
        setListReview(old => {
            return [
                ...old,
                ...review?.data?.data
            ]
        })
        setCurrPage(currPage + 1)
    }

    // const _getReviewMore = async (_idMore) => {
    //     var review = await getDoctorReviewByCode(currentDoctor?.code, _idMore)
    //     if (review?.isAxiosError) return
    //     setListReview(old => {
    //         return [
    //             ...old,
    //             ...review
    //         ]
    //     })
    // }


    const _handleOnpressBooking = () => {

        navigation.navigate(BOOKING_FOR_BRANCH, { branchCode: currentDoctor?.code, refCode: "" })
    }

    const _handlePartnerConversationStartChat = async() => {
        let result = await partnerConversationStartChat({
            "type": "treatment",
            "doctorId": currentDoctor?.userId
        })
        if(result?.isAxiosError)return
        navigation.navigate(ScreenKey.CHATTING, { propsData: {_id:result?.data?.data?._id }, flag: FROM_GROUP_CHAT_ID })
    }   
    
    
    const _renderReactionIcon = (type) => {
        switch (type) {
            case 'VERY_GOOD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_11.png')}
                    />
                )
            case 'GOOD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_1.png')}
                    />
                )
            case 'NOT_GOOD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_2.png')}
                    />
                )
            case 'BAD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_3.png')}
                    />
                )
            case 'VERY_BAD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_33.png')}
                    />
                )
            default:
                break;
        }
    }


    const renderStatus = (type) => {
        switch (type) {
            case 'GOOD':
                return (
                    <Text style={[stylesFont.fontNolan, { color: '#007516', fontSize: _moderateScale(12) }]}>Tuyệt vời</Text>
                )

            case 'NOT_GOOD':
                return (
                    <Text style={[stylesFont.fontNolan, { color: BLUE_FB, fontSize: _moderateScale(12) }]}>Tạm ổn</Text>
                )

            case 'BAD':
                return (
                    <Text style={[stylesFont.fontNolan, { color: GREY, fontSize: _moderateScale(12) }]}>Chưa hài lòng</Text>
                )

            default:
                break;
        }
    }

    console.log({ currentDoctor });

    // const renderViewMore = (onPress) => {
    //     return (
    //         <Text onPress={onPress}>View more</Text>
    //     )
    // },

    // const renderViewLess = (onPress) => {
    //     return (
    //         <Text onPress={onPress}>View less</Text>
    //     )
    // },


    const renderViewMore = (onPress) => {
        return (
            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLUE_FB }} onPress={onPress}>Xem thêm</Text>
        )
    }

    const renderViewLess = (onPress) => {
        return (
            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLUE_FB }} onPress={onPress}>Thu gọn</Text>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom gradient/>
            <HeaderLeft hasSetting title={"Thông tin chi tiết"} />

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

            <ScrollView>



                {/* <View style={{
                    // margin: _moderateScale(8 * 2),
                    width: _width - (_widthScale(8 * 4)),
                    height: (_width - (_widthScale(8 * 4))) * 9 / 16,
                    overflow: 'hidden',
                    borderRadius: _moderateScale(8 * 2),
                    alignSelf: 'center',
                    marginTop: _heightScale(8 * 2),
                    marginBottom: _heightScale(8 * 2),
                }}>
                    {
                        currentDoctor?.representationFileArr?.length > 0 ?
                            <TouchableOpacity
                                onPress={() => {
                                    setShowImageViewing(true)
                                    setIndexCurrImageView(0)
                                    setListImagesSeeCurr(currentDoctor?.representationFileArr)
                                }}>
                               
                                <FastImage
                                    style={[{ width: '100%', height: '100%', backgroundColor: BG_GREY_OPACITY_2 }]}
                                    uri={
                                        currentDoctor?.representationFileArr?.length > 0 ?
                                            `${URL_ORIGINAL}${currentDoctor?.representationFileArr[0]?.link}`
                                            :
                                            ""
                                    } />
                            </TouchableOpacity>
                            :
                            <View style={{ width: '100%', height: '100%', backgroundColor: BG_GREY_OPACITY_2 }} />
                    }

                    {
                        currentDoctor?.representationFileArr?.length > 0 ?
                            <View style={[{ position: 'absolute', bottom: _moderateScale(8 * 2), right: _moderateScale(8 * 2), backgroundColor: 'rgba(130,130,130,0.7)', width: _moderateScale(8 * 5), height: _moderateScale(8 * 3), borderRadius: _moderateScale(4) }, styleElement.centerChild]}>
                                <Text style={{ ...stylesFont.fontNolanBold, color: WHITE }}>1/{currentDoctor?.representationFileArr?.length}</Text>
                            </View>
                            : <></>
                    }

                </View> */}

                <View style={{ marginTop: _moderateScale(8 * 3), paddingHorizontal: _moderateScale(8 * 3) }}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Image style={{ width: _moderateScale(8 * 8), height: _moderateScale(8 * 8), borderRadius: _moderateScale(8 * 4) }} source={
                            currentDoctor?.avatar?.link ?
                                {
                                    uri: `${URL_ORIGINAL}${currentDoctor?.avatar?.link}`
                                }
                                :
                                {
                                    uri: ``
                                }
                        } /> */}
                        <FastImage
                            style={[{ width: _moderateScale(8 * 8), height: _moderateScale(8 * 8), borderRadius: _moderateScale(8 * 4) }]}
                            uri={
                                currentDoctor?.avatar?.link ?
                                    `${URL_ORIGINAL}${currentDoctor?.avatar?.link}`
                                    :
                                    ""
                            } />
                        <View style={{ marginLeft: _moderateScale(8 * 2) }}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: BLACK_OPACITY_8 }}>
                                {
                                    currentDoctor?.name
                                }
                            </Text>

                            <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) }]}>
                                <CountStar reviewCount={currentDoctor?.reviewCount} averageRating={parseInt(currentDoctor?.averageRating)} medium />

                                <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8) }]}>
                                    <Image style={sizeIcon.xxs} source={require('../../NewIcon/people.png')} />
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                        {currentDoctor?.countPartner}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styleElement.rowAliTop, { marginVertical: _moderateScale(8) }]}>
                        <Image style={[sizeIcon.xxs, { top: 2 }]} source={require('../../NewIcon/location.png')} />
                        <Text style={{ marginLeft: _moderateScale(8), flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY }}>
                            {currentDoctor?.branch?.name?.trim()}
                        </Text>
                    </View>

                    <View style={[styleElement.rowAliCenter, {}]}>
                        <Image style={sizeIcon.xs} source={require('../../NewIcon/clock.png')} />
                        <Text style={{ marginLeft: _moderateScale(8), flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY }}>
                            {currentDoctor?.branch?.openTime}
                        </Text>
                    </View>

                </View>



                <View style={{ height: _moderateScale(8 * 2) }} />
                {/* <View style={[styleElement.rowAliCenter,{justifyContent:'space-evenly'}]}>
                    <View style={{ width: "30%", borderWidth: 2, borderRadius: _moderateScale(8), padding:_moderateScale(8), borderColor:BG_GREY_OPACITY_5 }}>
                        <Text style={{ ...stylesFont.fontNolanBold, color: GREY }}>
                            Kinh nghiệm
                        </Text>
                        <View style={[styleElement.rowAliTop,{marginTop:_moderateScale(8)}]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/bagYellow.png')} />
                            <Text style={{...stylesFont.fontNolanBold, marginLeft:_moderateScale(0),color:BLACK_OPACITY_8,fontSize:_moderateScale(14)}}>
                                7 năm
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "30%", borderWidth:2, borderRadius: _moderateScale(8), padding:_moderateScale(8), borderColor:BG_GREY_OPACITY_5 }}>
                        <Text style={{ ...stylesFont.fontNolanBold, color: GREY }}>
                            Chuyên khoa
                        </Text>
                        <View style={[styleElement.rowAliTop,{marginTop:_moderateScale(8)}]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/bagYellow.png')} />
                            <Text style={{...stylesFont.fontNolanBold, marginLeft:_moderateScale(0),color:BLACK_OPACITY_8,fontSize:_moderateScale(14)}}>
                                Phẫu thuật mắt
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "30%", borderWidth: 2, borderRadius: _moderateScale(8), padding:_moderateScale(8), borderColor:BG_GREY_OPACITY_5 }}>
                        <Text style={{ ...stylesFont.fontNolanBold, color: GREY }}>
                            Kinh nghiệm
                        </Text>
                        <View style={[styleElement.rowAliTop,{marginTop:_moderateScale(8)}]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/bagYellow.png')} />
                            <Text style={{...stylesFont.fontNolanBold, marginLeft:_moderateScale(0),color:BLACK_OPACITY_8,fontSize:_moderateScale(14)}}>
                                7 năm
                            </Text>
                        </View>
                    </View>
                </View> */}

                <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                    <Text style={{ ...stylesFont.fontNolan, color: GREY, fontSize: _moderateScale(14), marginVertical: _moderateScale(4) }}>
                        Chức vụ: {
                            <Text style={{ ...stylesFont.fontNolanBold, color: BLACK_OPACITY_8 }}>
                                {currentDoctor?.position}
                            </Text>
                        }
                    </Text>
                    <Text style={{ ...stylesFont.fontNolan, color: GREY, fontSize: _moderateScale(14), marginVertical: _moderateScale(4) }}>
                        Kinh nghiệm: {
                            <Text style={{ ...stylesFont.fontNolanBold, color: BLACK_OPACITY_8 }}>
                                {currentDoctor?.experience}
                            </Text>
                        }
                    </Text>
                    <Text style={{ ...stylesFont.fontNolan, color: GREY, fontSize: _moderateScale(14), marginVertical: _moderateScale(4) }}>
                        Chuyên khoa: {
                            <Text style={{ ...stylesFont.fontNolanBold, color: BLACK_OPACITY_8 }}>
                                {currentDoctor?.specialization}
                            </Text>
                        }
                    </Text>
                    <Text style={{ ...stylesFont.fontNolan, color: GREY, fontSize: _moderateScale(14), marginVertical: _moderateScale(4) }}>
                        Dịch vụ: {
                            <Text style={{ ...stylesFont.fontNolanBold, color: BLACK_OPACITY_8 }}>
                                {currentDoctor?.service}
                            </Text>
                        }
                    </Text>
                    <Text style={{ ...stylesFont.fontNolan, color: GREY, fontSize: _moderateScale(14), marginVertical: _moderateScale(4) }}>
                        Nơi công tác: {
                            <Text style={{ ...stylesFont.fontNolanBold, color: BLACK_OPACITY_8 }}>
                                {currentDoctor?.workPlace}
                            </Text>
                        }
                    </Text>
                    {/* <Text style={{ ...stylesFont.fontNolan, color: GREY, fontSize: _moderateScale(14), marginVertical: _moderateScale(4) }}>
                        Quá trình đào tạo: {
                            // <Text style={{...stylesFont.fontNolanBold,color:BLACK_OPACITY_8}}>
                            //     {currentDoctor?.trainingProcess}
                            // </Text>

                        }
                    </Text>
                    <ViewMoreText
                        numberOfLines={4}
                        renderViewMore={renderViewMore}
                        renderViewLess={renderViewLess}
                        textStyle={{}}
                    >
                        <Text style={{ ...stylesFont.fontNolanBold, color: BLACK_OPACITY_8 }}>
                            {currentDoctor?.trainingProcess}
                        </Text>
                    </ViewMoreText> */}
                </View>

                <View style={{ marginTop: _moderateScale(8 * 2), marginBottom: _moderateScale(8), height: _moderateScale(8 * 9), }}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                        <View style={{ width: _moderateScale(8 * 3) }} />
                        {
                            currentDoctor?.representationFileArr?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowImageViewing(true)
                                            setIndexCurrImageView(index)
                                            setListImagesSeeCurr(currentDoctor?.representationFileArr)
                                        }}
                                    >
                                        <FastImage
                                            style={[{
                                                width: _moderateScale(8 * 9), height: _moderateScale(8 * 9), borderRadius: _moderateScale(4.5),
                                                marginRight: _moderateScale(8)
                                            }]}
                                            // source={{
                                            //     uri:`${URL_ORIGINAL}${item?.link}`
                                            // }}
                                            uri={
                                                `${URL_ORIGINAL}${item?.link}`
                                            }
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <View style={{ width: _moderateScale(8 * 2) }} />
                    </ScrollView>
                </View>

                <View style={{ width: '100%', height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_2, marginVertical: _moderateScale(8 * 2) }} />

                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>

                    <View style={[styleElement.rowAliCenter, {}]}>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: BASE_COLOR, paddingBottom: _moderateScale(4) }}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }}>
                                Thông tin
                            </Text>
                        </View>

                        <View style={{ borderBottomWidth: 2, borderBottomColor: 'transparent', paddingBottom: _moderateScale(0) }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate(ScreenKey.LIST_SERVICE_BY_KEY, { keySearch: currentDoctor?.name })
                            }}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, opacity: 0.6, marginLeft: _moderateScale(8 * 3) }}>
                                    Dịch vụ
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ borderBottomWidth: 2, borderBottomColor: 'transparent', paddingBottom: _moderateScale(0) }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate(ScreenKey.LIST_DIARY_BY_TYPE, { type: "DOCTOR", value: currentDoctor?.userId })
                            }}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, opacity: 0.6, marginLeft: _moderateScale(8 * 3) }}>
                                    Nhật ký
                                </Text>
                            </TouchableOpacity>
                        </View>

                        

                        <View style={{ borderBottomWidth: 2, borderBottomColor: 'transparent', paddingBottom: _moderateScale(0) }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate(ScreenKey.FEED_BACK_DOCTOR, { currentDoctor })
                            }}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, opacity: 0.6, marginLeft: _moderateScale(8 * 3) }}>
                                    Đánh giá
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* <View style={{ borderBottomWidth: 2, borderBottomColor: 'transparent', paddingBottom: _moderateScale(4) }}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, opacity: 0.6, marginLeft: _moderateScale(8 * 3) }}>
                                Hỏi đáp
                            </Text>
                        </View> */}

                    </View>

                    <View style={{ paddingHorizontal: _moderateScale(8) }}>
                        {
                            currentDoctor?.description?.length > 0 ?
                                <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), color: BLACK_OPACITY_7, marginTop: _moderateScale(8 * 2) }}>
                                    {currentDoctor?.description}
                                </Text>
                                : <></>
                        }
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: BLACK_OPACITY_7, marginTop: _moderateScale(8 * 2) }}>
                            Chỉ đường
                        </Text>

                        <TouchableOpacity activeOpacity={0.8} style={{ marginTop: _moderateScale(8) }} onPress={() => {
                            Linking.openURL(`${currentDoctor?.branch?.linkMap}`)
                        }}>
                            <Image style={{ width: '100%', height: _moderateScale(8 * 20), borderRadius: _moderateScale(8) }}
                                source={{ uri: `${URL_ORIGINAL}${currentDoctor?.branch?.imageMap?.link}` }} />
                        </TouchableOpacity>


                    </View>


                </View>

                {
                    currentDoctor?.newsArr?.length > 0 &&
                    <>
                        <View style={{ width: '100%', height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginVertical: _moderateScale(8 * 2) }} />
                        <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>

                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }}>
                                Bài viết
                            </Text>
                            {
                                currentDoctor?.newsArr?.length > 0 ?
                                    <View style={{ paddingHorizontal: _moderateScale(4) }}>
                                        {
                                            currentDoctor?.newsArr?.map((item, index) => {
                                                return (
                                                    <ItemNews data={item} />
                                                )
                                            })
                                        }
                                    </View>
                                    :
                                    <>
                                    </>
                            }
                        </View>
                    </>
                }


                <View style={{ width: '100%', height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginVertical: _moderateScale(8 * 2) }} />


                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }}>
                        Đánh giá
                        </Text>

                    <View style={[styles.listRow, { paddingHorizontal: _moderateScale(8 * 1) }]}>

                        {
                            listReview?.length > 0 ?
                                <>
                                    <View style={{ height: _moderateScale(8 * 2) }} />

                                    {listReview?.slice(0, 5)?.map((item, index) => {
                                        let i = 0
                                        return <View style={[styles.itemReview]}>
                                            <View style={{
                                                width: _moderateScale(60),
                                                height: _moderateScale(60),
                                                borderRadius: _moderateScale(30),
                                                borderWidth: _moderateScale(1),
                                                // backgroundColor: THIRD_COLOR,
                                                borderColor: WHITE,
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (item?.partner?._id == infoUserRedux?._id) {
                                                            navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                                                        } else {
                                                            navigation.navigate(ScreenKey.OTHER_PERSONAL_PAGE, { userId: item?.partner?._id })
                                                        }
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: _moderateScale(60),
                                                            height: _moderateScale(60),
                                                            borderRadius: _moderateScale(30),
                                                        }}
                                                        source={{ uri: `${URL_ORIGINAL}${item?.partner?.fileAvatar?.link}` }}
                                                    />
                                                </TouchableOpacity>
                                                {
                                                    _renderReactionIcon(item?.reaction)
                                                }
                                            </View>
                                            <View style={[styles.rightReview, { paddingLeft: _moderateScale(8 * 1.5) }]}>
                                                <View style={[styleElement.rowAliTop]}>
                                                    <View style={{ flex: 1, marginBottom: _moderateScale(4), }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                if (item?.partner?._id == infoUserRedux?._id) {
                                                                    navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                                                                } else {
                                                                    navigation.navigate(ScreenKey.OTHER_PERSONAL_PAGE, { userId: item?.partner?._id })
                                                                }
                                                            }}
                                                        >
                                                            <Text style={[stylesFont.fontNolan500, { textTransform: 'capitalize', flex: 1, color: BLACK_OPACITY_8, fontSize: _moderateScale(14) }]}>
                                                                {item?.partner?.name}
                                                            </Text>
                                                        </TouchableOpacity>

                                                        <View style={[styleElement.rowAliCenter]}>
                                                            <Text style={[stylesFont.fontNolan, { color: GREY, fontSize: _moderateScale(12) }]}>
                                                                {moment(item?.created).format('DD/MM/YYYY')} - {moment(item?.created).format('LT')}
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <View style={[styles.lineStar]}>
                                                        {
                                                            [1, 2, 3, 4, 5]?.map((star, index) => {
                                                                if (star <= item?.branchReview?.rating) {
                                                                    return <Image
                                                                        resizeMode={'stretch'}
                                                                        style={[sizeIcon.xxxxs]}
                                                                        source={require('../../Icon/a_star.png')}
                                                                    />
                                                                }
                                                                else {
                                                                    return <Image
                                                                        resizeMode={'stretch'}
                                                                        style={[sizeIcon.xxxxs]}
                                                                        source={require('../../Icon/i_star.png')}
                                                                    />
                                                                }
                                                            })
                                                        }
                                                    </View>
                                                </View>

                                                {/* <View style={[styles.briefName]}>

                                                    {renderStatus(item.reaction)}
                                                </View> */}

                                                {
                                                    item?.staffReview?.comment?.length > 0 ?
                                                        <View style={[{ marginTop: _moderateScale(8) }]}>
                                                            <Text style={{ color: BLACK, flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }} >
                                                                {item?.staffReview?.comment !== '' ? item?.staffReview?.comment.trim() : ''}
                                                                {/* {item?.branchReview?.comment !== '' ? item?.branchReview?.comment : '...'} */}
                                                            </Text>
                                                        </View>
                                                        :
                                                        <></>
                                                }

                                                <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                                    <View style={{ width: _moderateScale(2), height: _moderateScale(8 * 5), backgroundColor: RED, opacity: 0.3 }} />
                                                    <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                navigation.navigate(ScreenKey.DETAIL_BRAND, { idBranch: item?.branch?._id })
                                                            }}
                                                            style={[styleElement.rowAliCenter]}>
                                                            <Image style={[sizeIcon.xs, { marginRight: _moderateScale(8) }]} source={require('../../NewIcon/branchBase.png')} />
                                                            <Text style={{ color: SECOND_COLOR, ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                                {item?.branch?.name}
                                                            </Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: item?.service?._id })
                                                            }}
                                                            style={[styleElement.rowAliCenter]}>
                                                            <Image style={[sizeIcon.xs, { marginRight: _moderateScale(8) }]} source={require('../../NewIcon/serviceThird.png')} />
                                                            <Text style={{ color: "#F18D37", ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                                {item?.service?.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        {/* <Text style={{ color: BLACK_OPACITY_7, ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                                {item?.service?.name}
                                                            </Text> */}
                                                    </View>
                                                </View>

                                                {/* <View style={[styles.contentBrief]}>
                                                    <Text style={{ color: BLACK_OPACITY_7, flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }} numberOfLines={2}>
                                                        {item?.branchReview?.comment !== '' ? item?.branchReview?.comment : '...'}
                                                    </Text>
                                                </View> */}
                                            </View>
                                        </View>
                                    })}
                                </>
                                :
                                <>
                                    <View style={{ height: _moderateScale(8 * 1) }} />
                                    <Text style={{ ...stylesFont.fontNolan500, color: GREY, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                        Hiện chưa có đánh giá về bác sĩ này
                                    </Text>
                                </>
                        }


                    </View>
                    {
                        console.log({ currPage, totalPage })
                    }
                    {
                        currPage !== totalPage ?
                            <TouchableOpacity
                                onPress={() => {
                                    // _getReviewMore(listReview[listReview?.length - 1])
                                    navigation.navigate(ScreenKey.FEED_BACK_DOCTOR, { currentDoctor })
                                }}
                                style={{ alignSelf: 'center', marginTop: _moderateScale(8) }}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                                    Xem tất cả ({totalDocument})
                                    </Text>
                            </TouchableOpacity>
                            :
                            <></>
                    }

                </View>

                {/* <View style={{ marginTop: _moderateScale(8 * 1), paddingHorizontal: _moderateScale(8 * 2) , justifyContent:'space-between', flexDirection:'row'}}>
                    <View style={{
                        width: "48%",
                        height: _moderateScale(8 * 15),
                        borderWidth: _moderateScale(1),
                        borderColor: BG_GREY_OPACITY_5,
                        borderRadius: _moderateScale(8),
                        padding: _moderateScale(8)
                    }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: GREY }}>
                            Chi nhánh
                        </Text>
                        <View style={[styleElement.rowAliTop]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/buildingSecondColor.png')} />
                            <Text style={{ flex: 1 , ...stylesFont.fontNolan500, fontSize:_moderateScale(14)}}>
                                {currentDoctor?.branch?.name}
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        width: "48%",
                        height: _moderateScale(8 * 15),
                        borderWidth: _moderateScale(1),
                        borderColor: BG_GREY_OPACITY_5,
                        borderRadius: _moderateScale(8),
                        padding: _moderateScale(8)
                    }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: GREY }}>
                            Chi nhánh
                        </Text>
                        <View style={[styleElement.rowAliTop]}>
                            <Image style={sizeIcon.lg} source={require('../../NewIcon/buildingSecondColor.png')} />
                            <Text style={{ flex: 1 }}>
                                {currentDoctor?.branch?.name}
                            </Text>
                        </View>
                    </View>
                </View> */}




                <View style={{ height: 50 }} />
            </ScrollView>

            {/* <TouchableOpacity
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
                    // navigation.navigate(ScreenKey.BOOKING_FOR_DOCTOR, { infoBranch: currentDoctor?.branch, infoDoctor: currentDoctor, doctorCode: currentDoctor?.code, branchCode: currentDoctor?.branch?.code, refCode: "" })
                    navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceDoctor: currentDoctor })
                }}
                style={[{
                    height: _moderateScale(8 * 5),
                    backgroundColor: WHITE,
                    marginHorizontal: _moderateScale(8 * 2),
                    borderRadius: _moderateScale(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: BASE_COLOR,
                    marginVertical: _moderateScale(8),
                    marginBottom: getBottomSpace() + _moderateScale(8)
                }]}>

                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                    Đặt hẹn ngay
                </Text>
            </TouchableOpacity> */}


            <View style={{
                flexDirection: 'row', marginVertical: _moderateScale(8),
                marginBottom: getBottomSpace() + _moderateScale(8),
                paddingHorizontal: _moderateScale(8 * 2)
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
                        navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceDoctor: currentDoctor })
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: BASE_COLOR,
                        flex: 5
                    }]}>
                        <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 0.6, 1]}
                        colors={[
                            BASE_COLOR,
                            '#8c104e',
                            '#db0505',
                        ]}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderRadius: _moderateScale(8),
                        }} />

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                        Đặt hẹn ngay
                </Text>
                </TouchableOpacity>

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
                        _handlePartnerConversationStartChat()
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: _moderateScale(1),
                        borderColor: BASE_COLOR,
                        flex: 1,
                        marginLeft: _moderateScale(8 * 2)
                    }]}>

                    <Image style={[sizeIcon.lg, { top: 1 }]} source={require('../../NewIcon/chatBase.png')} />
                </TouchableOpacity>

            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    btnTab__text: {
        fontSize: _moderateScale(16),
        color: GREY
    },
    btnTab: {
        width: "40%",
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
        color: BLUE_FB,
    },
    title: {
        fontSize: _moderateScale(18),
        alignSelf: 'center',
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
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
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
        height: _moderateScale(260),
        // width: '100%', 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(260), 0, _moderateScale(260), _moderateScale(260) + 1],
                    outputRange: [-_moderateScale(260) / 2, 0, _moderateScale(260) * 0.75, _moderateScale(260) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(260), 0, _moderateScale(260), _moderateScale(260) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
    bannerProfile__avatar: {
        width: _moderateScale(90),
        height: _moderateScale(90),
        borderRadius: _moderateScale(120),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    },
    bannerProfile: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: _moderateScale(336),
        alignSelf: 'center',
        height: _moderateScale(8 * 12 + 24),
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(16),
        padding: _moderateScale(16)
    },
    bannerProfile__nameAndJob__job: {
        fontSize: _moderateScale(14),
        color: WHITE,
        flexWrap: 'wrap'
    },
    bannerProfile__nameAndJob__name: {
        fontSize: _moderateScale(20),
        color: WHITE
    },
    bannerProfile__nameAndJob: {
        marginLeft: _widthScale(8 * 2),
        marginBottom: _heightScale(8 * 6),
        flex: 1,
    },
    avatar: {
        width: _moderateScale(60),
        height: _moderateScale(60),
        borderRadius: _moderateScale(60),
        borderWidth: _moderateScale(1),
        backgroundColor: THIRD_COLOR,
        borderColor: WHITE,
    },
    itemReview: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: _moderateScale(6),
        marginBottom: _moderateScale(6)
    },
    rightReview: {
        flex: 1,
        paddingLeft: _moderateScale(6),
        borderBottomWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_3,
        paddingBottom: _moderateScale(6)
    },
    briefName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusOfPartner: {
        flexDirection: 'row',
    },
    lineStar: {
        flexDirection: 'row',
        marginRight: _moderateScale(6)
    },
    contentBrief: {
        marginVertical: _moderateScale(4)
    }
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
        `rgba(255, 168, 198,1)`,
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


export default DetailDoctorScreen;