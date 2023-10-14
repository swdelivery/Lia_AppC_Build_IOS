import _isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Platform, Linking, ActivityIndicator } from 'react-native';
import ImageView from "react-native-image-viewing";
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BG_GREY_OPACITY_9, BLACK, BLACK_OPACITY_8, BLUE_FB, BTN_PRICE, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE, BG_MAIN_OPACITY, MAIN_BG, BG_GREY_OPACITY_7, BLACK_OPACITY_7, GREEN_SUCCESS, RED, BLUE, BG_GREY_OPACITY_5 } from '../../Constant/Color';
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
import ScreenKey from '../../Navigation/ScreenKey'
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import moment from 'moment'
import { FROM_GROUP_CHAT_ID } from '../../Constant/Flag';
import { getDoctorReviewByCode } from '../../Redux/Action/DoctorAction';
import { getServiceReviewByCodev2 } from '../../Redux/Action/Service';

const FeedBackService = memo((props) => {

    const [listReview, setListReview] = useState([])


    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [currPage, setCurrPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [totalDocument, setTotalDocument] = useState(0)

    const [isLoadMore, setIsLoadMore] = useState(false)

    useEffect(() => {
        if (props?.route?.params?.currentService?._id) {
            _getReview()
        }
    }, [props?.route?.params?.currentService])

    const _getReview = async () => {
        var review = await getServiceReviewByCodev2(props?.route?.params?.currentService?.code)
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
        setIsLoadMore(true)
        var review = await getServiceReviewByCodev2(props?.route?.params?.currentService?.code, _idMore)
        if (review?.isAxiosError) return setIsLoadMore(false)

        // if (review.length === 10) {
        //     setIsMore(true)
        // }
        // else {
        //     setIsMore(false)
        // }
        setListReview(old => {
            return [
                ...old,
                ...review?.data?.data
            ]
        })
        setCurrPage(currPage + 1)
        setIsLoadMore(false)
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


    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <View style={{ margin: _moderateScale(8 * 1.5), flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: _moderateScale(8 * 3.5), }} />

                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                    Đánh giá
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[styleElement.centerChild, {
                        width: _moderateScale(8 * 3.5),
                        height: _moderateScale(8 * 3.5),
                        borderRadius: _moderateScale(8 * 3.5 / 2),
                        backgroundColor: BG_GREY_OPACITY_5
                    }]}>
                    <Image style={[sizeIcon.md]} source={require('../../Icon/cancel.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    <View style={[styles.listRow, { paddingHorizontal: _moderateScale(8 * 0) }]}>

                        {
                            listReview?.length > 0 ?
                                <>
                                    <View style={{ height: _moderateScale(8 * 2) }} />

                                    {listReview?.map((item, index) => {
                                        return <View style={[styles.itemReview, { backgroundColor: WHITE, padding: _moderateScale(8 * 1.5), borderRadius: _moderateScale(8) }]}>
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
                                                                navigation.navigate(ScreenKey.DETAIL_BRAND, { idBranch: item?.branch?._id })
                                                            }}
                                                            style={[styleElement.rowAliCenter]}>
                                                            <Image style={[sizeIcon.xs, { marginRight: _moderateScale(8) }]} source={require('../../NewIcon/branchThird.png')} />
                                                            <Text style={{ color: '#F8B175', ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                                {item?.branch?.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        {/* <Text style={{ color: BLACK_OPACITY_7, ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                                {item?.service?.name}
                                                            </Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    })}
                                </>
                                :
                                <>
                                    {/* <View style={{ height: _moderateScale(8 * 1) }} />
                                    <Text style={{ ...stylesFont.fontNolan500, color: GREY, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                        Hiện chưa có đánh giá về chi nhánh này
                                    </Text> */}
                                </>
                        }


                    </View>
                    {
                        currPage !== totalPage ?
                            <View style={{ marginBottom: _moderateScale(8 * 4) }}>
                                {
                                    isLoadMore ?
                                        <View style={{ alignSelf: 'center', marginTop: _moderateScale(8), flexDirection: 'row' }}>
                                            <ActivityIndicator color={GREY} />
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_7, marginLeft: _moderateScale(4), color: BLACK_OPACITY_8 }}>
                                                Đang tải
                                            </Text>
                                        </View>
                                        :
                                        <TouchableOpacity
                                            onPress={() => {
                                                _getReviewMore(listReview[listReview?.length - 1])
                                            }}
                                            style={{ alignSelf: 'center', marginTop: _moderateScale(8) }}>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                                                Xem thêm
                                            </Text>
                                        </TouchableOpacity>
                                }

                            </View>
                            :
                            <></>
                    }


                </View>

                <View style={{ height: _moderateScale(8 * 2) + getBottomSpace() }} />
            </ScrollView>

        </View>
    );
});


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


export default FeedBackService;