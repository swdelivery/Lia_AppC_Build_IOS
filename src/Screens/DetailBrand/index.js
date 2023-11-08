import _isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Platform, Linking } from 'react-native';
import ImageView from "react-native-image-viewing";
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BG_GREY_OPACITY_9, BLACK, BLACK_OPACITY_8, BLUE_FB, BTN_PRICE, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE, BG_MAIN_OPACITY, MAIN_BG, BG_GREY_OPACITY_7, BLACK_OPACITY_7, GREEN_SUCCESS, RED, BLUE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import { getBranchById, getBranchReviewByCode } from '../../Redux/Action/BranchAction';
import { formatMonney } from '../../Constant/Utils';
import { BOOKING_FOR_BRANCH, BOOKING_MAIN } from '../../Navigation/ScreenKey';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import CountStar from '../../Components/CountStar/index';
import BottomBtn from '../../Components/BottomBtn/BottomBtn';
import SwipeButton from './Components/SwipeBtn';
import ScreenKey from '../../Navigation/ScreenKey'
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import moment from 'moment'
import { FROM_GROUP_CHAT_ID } from '../../Constant/Flag';


const DetailBranchScreen = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;

    const listLastedMessageRedux = useSelector(state => state.messageReducer?.listLastedMessages)

    const [listImage, setListImage] = useState([])
    const [currIndexImage, setCurrIndexImage] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [currTab, setCurrTab] = useState('1')
    const [currentBranch, setCurrBranch] = useState(null)
    const [listReview, setListReview] = useState([])


    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [currPage, setCurrPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [totalDocument, setTotalDocument] = useState(0)

    useEffect(() => {
        if (!_isEmpty(props?.route?.params?.idBranch)) {
            _getBranch()
        }
    }, [props?.route?.params?.idBranch])

    const _getBranch = async () => {
        var currentBranch = await getBranchById(props?.route?.params?.idBranch)
        if (currentBranch?.isAxiosError) return
        setCurrBranch(currentBranch)
        setListImage(currentBranch?.representationFileArr)
        setListImagesSeeCurr(currentBranch?.representationFileArr)
    }
    useEffect(() => {
        if (currentBranch?._id) {
            _getReview()
        }
    }, [currentBranch])

    const _getReview = async () => {
        var review = await getBranchReviewByCode(currentBranch?.code)
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
        var review = await getBranchReviewByCode(currentBranch?.code, _idMore)
        if (review?.isAxiosError) return
        setListReview(old => {
            return [
                ...old,
                ...review?.data?.data
            ]
        })
        setCurrPage(currPage + 1)
    }

    const _handleOnpressBooking = () => {

        navigation.navigate(BOOKING_FOR_BRANCH, { branchCode: currentBranch?.code, refCode: "" })
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

    const _handleNavigateConsulChat = () => {
        let find = listLastedMessageRedux?.find(item => item?.type == "consultation");
        if (find) {
            navigation.navigate(ScreenKey.CHATTING, { propsData: find, flag: FROM_GROUP_CHAT_ID })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom />
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


            <View style={[{ alignItems: 'flex-start', marginTop: _moderateScale(0), paddingRight: _moderateScale(8 * 2), position: 'absolute', left: _moderateScale(8 * 2), zIndex: 1 }, shadow, Platform.OS == 'ios' ? { top: _moderateScale(8 * 2) + getStatusBarHeight() } : { top: _moderateScale(8 * 2) }]}>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => navigation.goBack()}
                    style={[{
                        width: _moderateScale(8 * 3),
                        height: _moderateScale(8 * 3),
                        borderRadius: _moderateScale(8 * 3 / 2),
                        backgroundColor: WHITE
                    }, styleElement.centerChild, shadow]}>
                    <Image style={[sizeIcon.sm]} source={require('../../Icon/back_bold.png')} />
                </TouchableOpacity>
            </View>

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
                        resizeMode={'cover'}
                        style={[styles.banner(scrollA),]}
                        // source={{
                        //     uri:`${URL_ORIGINAL}${data?.servicesNeedCare[0]?.representationFileArr[0]?.link}`
                        // }}
                        source={
                            currentBranch?.representationFileArr?.length > 0 ?
                                {
                                    uri: `${URL_ORIGINAL}${currentBranch?.representationFileArr[0]?.link}`
                                    // uri: `https://i.ibb.co/725QKwN/banner-bong-mat-300x137.jpg`
                                }
                                :
                                {
                                    uri: ''
                                }
                        }
                    />
                    <View style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(33, 33, 33,.3)',
                        position: 'absolute',
                        zIndex: 0
                    }} />

                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500) + getStatusBarHeight(),
                        width: "100%"
                    }}>

                    </View>
                    <View style={{ position: 'absolute', bottom: _moderateScale(8 * 8), width: "100%" }}>

                    </View>


                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    // paddingBottom: _moderateScale(8 * 20)
                }}>
                    <View style={styles.wave}>
                        {
                            currentBranch?.representationFileArr?.length > 0 ?
                                <View style={[{
                                    width: _moderateScale(8 * 11),
                                    height: _moderateScale(8 * 11),
                                    borderRadius: _moderateScale(8 * 5.5),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: WHITE,
                                    position: 'absolute',
                                    top: -_moderateScale(8 * 7),
                                    left: _moderateScale(8 * 2)

                                }, shadow]}>
                                    <Image style={{
                                        width: _moderateScale(8 * 10),
                                        height: _moderateScale(8 * 10),
                                        borderRadius: _moderateScale(8 * 5)
                                    }} source={{ uri: `${URL_ORIGINAL}${currentBranch?.avatar?.link}` }} />
                                </View>
                                :
                                <View>
                                    <Image source={{ uri: `${URL_AVATAR_DEFAULT}` }} />
                                </View>
                        }
                    </View>

                    <View style={{ marginTop: _moderateScale(8 * 2) }}>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 3) }} horizontal showsHorizontalScrollIndicator={false}>
                            {
                                currentBranch?.representationFileArr?.length > 0 ?
                                    <>
                                        {currentBranch?.representationFileArr?.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowImageViewing(true)
                                                        setIndexCurrImageView(index)
                                                        setListImagesSeeCurr(currentBranch?.representationFileArr)
                                                    }}
                                                    style={{ marginRight: _moderateScale(8 * 1) }}>
                                                    <Image style={{ width: _moderateScale(8 * 9), height: _moderateScale(8 * 9), borderRadius: _moderateScale(4.5) }} source={{ uri: `${URL_ORIGINAL}${item?.link}` }} />
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </>
                                    : <></>
                            }
                        </ScrollView>
                    </View>



                    <View style={{ marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 3) }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: BLACK_OPACITY_8 }}>
                            {
                                currentBranch?.name
                            }
                        </Text>

                        <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) }]}>
                            <CountStar reviewCount={currentBranch?.reviewCount} averageRating={parseInt(currentBranch?.averageRating)} medium />

                            <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8) }]}>
                                <Image style={sizeIcon.xxs} source={require('../../NewIcon/people.png')} />
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                    {currentBranch?.countPartner}
                                </Text>
                            </View>
                        </View>

                        <View style={[styleElement.rowAliTop, { marginVertical: _moderateScale(8) }]}>
                            <Image style={[sizeIcon.xxs, { top: 2 }]} source={require('../../NewIcon/location.png')} />
                            <Text style={{ marginLeft: _moderateScale(8), flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY }}>
                                {currentBranch?.address?.trim()}
                            </Text>
                        </View>

                        <View style={[styleElement.rowAliCenter, {}]}>
                            <Image style={sizeIcon.xs} source={require('../../NewIcon/clock.png')} />
                            <Text style={{ marginLeft: _moderateScale(8), flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY }}>
                                {currentBranch?.openTime}
                            </Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_2, marginVertical: _moderateScale(8 * 2) }} />

                    <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>

                        <View style={[styleElement.rowAliCenter, {}]}>
                            <View style={{ borderBottomWidth: 2, borderBottomColor: BASE_COLOR, paddingBottom: _moderateScale(4) }}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }}>
                                    Thông tin
                                </Text>
                            </View>

                            <View style={{ borderBottomWidth: 2, borderBottomColor: 'transparent', paddingBottom: _moderateScale(4) }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate(ScreenKey.LIST_SERVICE_BY_KEY, { keySearch: currentBranch?.name })
                                }}>
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, opacity: 0.6, marginLeft: _moderateScale(8 * 3) }}>
                                        Dịch vụ
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderBottomWidth: 2, borderBottomColor: 'transparent', paddingBottom: _moderateScale(4) }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate(ScreenKey.LIST_DIARY_BY_TYPE, { type: "BRANCH", value: currentBranch?.code })
                                }}>
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, opacity: 0.6, marginLeft: _moderateScale(8 * 3) }}>
                                        Nhật ký
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderBottomWidth: 2, borderBottomColor: 'transparent', paddingBottom: _moderateScale(4) }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate(ScreenKey.FEED_BACK_BRANCH, { currentBranch })
                                }}>
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, opacity: 0.6, marginLeft: _moderateScale(8 * 3) }}>
                                        Đánh giá
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={{borderBottomWidth:2, borderBottomColor:'transparent', paddingBottom:_moderateScale(4)}}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, opacity: 0.6, marginLeft: _moderateScale(8 * 3) }}>
                                Hỏi đáp
                            </Text>
                            </View> */}

                        </View>

                        <View style={{ paddingHorizontal: _moderateScale(8) }}>
                            <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), color: BLACK_OPACITY_7, marginTop: _moderateScale(8 * 2) }}>
                                {currentBranch?.description}
                            </Text>


                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: BLACK_OPACITY_7, marginTop: _moderateScale(8 * 2) }}>
                                Chỉ đường
                            </Text>

                            <TouchableOpacity activeOpacity={0.8} style={{ marginTop: _moderateScale(8) }} onPress={() => {
                                Linking.openURL(`${currentBranch?.linkMap}`)
                            }}>
                                <Image style={{ width: '100%', height: _moderateScale(8 * 20), borderRadius: _moderateScale(8) }}
                                    source={{ uri: `${URL_ORIGINAL}${currentBranch?.imageMap?.link}` }} />
                            </TouchableOpacity>

                        </View>
                    </View>

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
                                                                }}>
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
                                                        item?.branchReview?.comment?.length > 0 ?
                                                            <View style={[{ marginTop: _moderateScale(8) }]}>
                                                                <Text style={{ color: BLACK, flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }} >
                                                                    {item?.branchReview?.comment !== '' ? item?.branchReview?.comment.trim() : ''}
                                                                    {/* {item?.branchReview?.comment !== '' ? item?.branchReview?.comment : '...'} */}
                                                                </Text>
                                                            </View>
                                                            :
                                                            <></>
                                                    }

                                                    <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                                        {
                                                            item?.doctor?.name ? 
                                                            <>
                                                            <View style={{ width: _moderateScale(2), height: _moderateScale(8 * 5), backgroundColor: RED, opacity: 0.3 }} />
                                                        <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigation.navigate(ScreenKey.DETAIL_DOCTOR, { idDoctor: item?.doctor?._id })
                                                                }}
                                                                style={[styleElement.rowAliCenter]}>
                                                                <Image style={[sizeIcon.xs, { marginRight: _moderateScale(8) }]} source={require('../../NewIcon/doctorBase.png')} />
                                                                <Text style={{ color: SECOND_COLOR, ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                                    {item?.doctor?.name}
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
                                                        </View>
                                                            </>
                                                            :
                                                            <>
                                                            </>
                                                        }
                                                        
                                                    </View>
                                                </View>
                                            </View>
                                        })}
                                    </>
                                    :
                                    <>
                                        <View style={{ height: _moderateScale(8 * 1) }} />
                                        <Text style={{ ...stylesFont.fontNolan500, color: GREY, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                            Hiện chưa có đánh giá về chi nhánh này
                                    </Text>
                                    </>
                            }


                        </View>
                        {
                            true ?
                                <TouchableOpacity
                                    hitSlop={styleElement.hitslopSm}
                                    onPress={() => {
                                        // _getReviewMore(listReview[listReview?.length - 1])
                                        navigation.navigate(ScreenKey.FEED_BACK_BRANCH, { currentBranch })
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

                </View>
                <View style={{ height: 50 }} />
            </Animated.ScrollView>

            <View style={{
                flexDirection: 'row', marginVertical: _moderateScale(8),
                marginBottom: getBottomSpace() + _moderateScale(8),
                paddingHorizontal: _moderateScale(8 * 2)
            }}>
                <TouchableOpacity
                    // onPress={() => {
                    //     navigation.navigate(BOOKING_FOR_BRANCH, { branchCode: currentBranch?.code, refCode: "" })
                    // }}
                    onPress={() => {
                        if (!infoUserRedux?._id) {
                            // return navigation.navigate(ScreenKey?.LOGIN_IN_APP, { routeName: props?.route?.name })
                            store.dispatch({
                                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                payload: {
                                    flag: true,
                                    currRouteName: props?.route?.name
                                }
                            })
                            return
                        }
                        // navigation.navigate(ScreenKey?.BOOKING_FOR_BRANCH, { idService: props?.route?.params?.idService })
                        // navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, { branchCode: currentBranch?.code, refCode: "" })
                        // navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, { infoBranch: currentBranch, branchCode: currentBranch?.code, refCode: "" })
                        navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceBranch: currentBranch })
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
                        _handleNavigateConsulChat()
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

            {/* <SwipeButton/> */}


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
        // alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(210),
        width: "100%",
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(200), 0, _moderateScale(200), _moderateScale(200) + 1],
                    outputRange: [-_moderateScale(200) / 2, 0, _moderateScale(200) * 0.75, _moderateScale(200) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(200), 0, _moderateScale(200), _moderateScale(200) + 1],
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
    shadowColor: BASE_COLOR,
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,


    elevation: 4
}

export default DetailBranchScreen;