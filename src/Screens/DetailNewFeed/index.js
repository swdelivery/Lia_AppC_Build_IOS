import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ItemFeed from './Component/ItemFeed';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import ActionComment from './Component/ActionComment';
import { SET_CURRENT_LIST_COMMENT_CHILD } from '../../Redux/Constants/ActionType';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getAllPostComment, getPostById, getPostByIdv2, createPostReaction, addReactionPost } from '../../Redux/Action/PostAction';
import { AppState } from 'react-native'
import SocketInstance from '../../../SocketInstance'
import BackgroundTimer from "react-native-background-timer";
import { CSS_PARTNER_POST_JOIN_ROOM, CSS_PARTNER_POST_LEFT_ROOM } from '../../Sockets/type'
import isEmpty from 'lodash/isEmpty';
import ListImage from '../NewFeed/Component/ListImage';
import { getPartnerDiaryDailyByIdv2 } from '../../Redux/Action/PartnerDiary';
import ScreenKey from '../../Navigation/ScreenKey'
import * as ActionType from '../../Redux/Constants/ActionType'
import ImageView from "react-native-image-viewing";
import store from "../../Redux/store";


const DiaryOfNewsFeed = (props) => {
    const dispatch = useDispatch()
    const scrollA = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef();
    const isComment = useSelector(state => state.postReducer?.isComment)
    const scrollToComment = useSelector(state => state.postReducer?.scrollToComment)
    const currentPostRedux = useSelector(state => state.postReducer?.currentPost)
    const [appState, setAppState] = useState(AppState.currentState);
    var interval

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [infoPost, setInfoPost] = useState({})
    const [dailyDiary, setDailyDiary] = useState([])

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    useEffect(() => {
        _getPostByIdVer2()

        if (props?.route?.params?.isShowComment) {
            navigation.navigate(ScreenKey.MODAL_COMMENT_POST, {
                idPost: props?.route?.params?.idPost,
                setInfoPost,
                idCommentHighlight:props?.route?.params?.idCommentHighlight
             })
        }
    }, []);


    const _getPostByIdVer2 = async () => {
        console.log({ props });

        let result = await getPostByIdv2(props?.route?.params?.idPost)
        if (result?.isAxiosError) return

        setInfoPost(result?.data?.data)
    }

    const _getPartnerDiaryDailyByIdv2 = async () => {
        let result = await getPartnerDiaryDailyByIdv2(infoPost?.template?.data?.partnerDiaryId)
        if (result?.isAxiosError) return
        setDailyDiary(result?.data?.data)
    }

    useEffect(() => {
        if (infoPost?.template?.type == 'PartnerDiary_TreatmentDetail') {
            _getPartnerDiaryDailyByIdv2()
        }
    }, [infoPost?.template])

    console.log({ dailyDiary });

    const actionLike = async (action) => {
        const payload = {
            postId: infoPost?._id,
        }
        if (!action) {
            payload.type = "LIKE"
        }
        // dispatch(createPostReaction(payload))

        let result = await addReactionPost(payload);
        if (result?.isAxiosError) return
        console.log({ result });
        setInfoPost(old => {
            return {
                ...old,
                reaction: result?.data?.data?.reaction,
                reactionCount: result?.data?.data?.reactionCount,
                reactionStatistics: result?.data?.data?.reactionStatistics,
            }
        })
        await dispatch({
            type: ActionType.UPDATE_REACTION_POST,
            payload: {
                ...result?.data?.data,
                postId: infoPost?._id
            },
        })
        if(props?.route?.params?.isSearch===true)
        {
            await dispatch({
                type: ActionType.UPDATE_REACTION_POST_SEARCH,
                payload: {
                    ...result?.data?.data,
                    postId: infoPost?._id
                },
            })
        }
        // dispatch({
        //     type: ActionType.UPDATE_REACTION_CURRENT_POST,
        //     payload: {
        //         ...result?.data?.data ,
        //         postId:infoPost?._id
        //     }
        // })

    }


    return (
        <View style={styles.container}>

            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingVertical: _moderateScale(8 * 1.5),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
                // height: _moderateScale(8 * 6)
            }}>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/back_bold.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {
                        infoPost?.partner?.name ?
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                                Bài viết của {infoPost?.partner?.name}
                            </Text>
                            : <></>
                    }
                </View>
            </View>


            <ScrollView>
                <View style={{ height: _moderateScale(8) }} />
                <View style={[styles.headOfFeed, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                    <TouchableOpacity
                    onPress={() => {
                        if (infoPost?.partner?._id == infoUserRedux?._id) {
                            navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                        } else {
                            navigation.navigate(ScreenKey.OTHER_PERSONAL_PAGE, { userId:infoPost?.partner?._id })
                        }
                    }}
                    style={[styles.leftOfHead]}>
                        <FastImage
                            style={[styles.bannerProfile__avatar]}
                            uri={infoPost?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${infoPost?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                        />
                        {/* <View style={[styles.titOfFeed]}>
                            <Text style={[styles.titFeed]}>{infoPost?.partner?.name}</Text>
                            <Text style={[styles.timeFeed]}>{moment(infoPost?.created).fromNow()}</Text>
                        </View> */}
                        <View style={[styles.titOfFeed]}>
                            <Text style={[styles.titFeed]}>{infoPost?.partner?.name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(4) }}>
                                {
                                    infoPost?.scope == 'PUBLIC' ?
                                        <Image style={sizeIcon.xxs} source={require('../../NewIcon/earthGrey.png')} />
                                        : <></>
                                }
                                {
                                    infoPost?.scope == 'PRIVATE' ?
                                        <Image style={sizeIcon.xxs} source={require('../../NewIcon/lockGrey.png')} />
                                        : <></>
                                }
                                <Text style={[styles.timeFeed, { marginLeft: _moderateScale(4) }]}>{moment(infoPost?.created).fromNow()}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* {infoUserRedux?._id === infoPost?.partnerId ?
                        <TouchableOpacity
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                            onPress={() => ActionSheetRef.current.show()}
                            style={[styles.moreFeed]}>
                            <Image
                                source={require('../../Image/component/more.png')} />
                        </TouchableOpacity>
                        : <></>
                    } */}
                </View>

                <View style={[styles.contentFeed]}>
                    <View style={{}}>
                        {
                            infoPost?.content?.length > 0 ?
                                <>
                                    <Text
                                        style={[styles.textFeed]}>
                                        {`${infoPost?.content}`}
                                    </Text>
                                </>
                                : <></>
                        }
                    </View>

                    {
                        infoPost?.hashTagCodeArr?.length > 0 ?
                            <View style={{flexDirection:'row', flexWrap:'wrap',paddingLeft:_moderateScale(8*2)}}>
                                {
                                    infoPost?.hashTagCodeArr?.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(ScreenKey.SEARCH_NEW_FEED, { keySearch: item })
                                            }}
                                            style={{
                                                paddingHorizontal:_moderateScale(8),
                                                paddingVertical:_moderateScale(4),
                                                borderRadius:_moderateScale(4),
                                                backgroundColor:BLUE,
                                                marginRight:_moderateScale(8),
                                                marginBottom:_moderateScale(8)
                                            }}>
                                                <Text style={{...stylesFont.fontNolan500,color:BLACK_OPACITY_8,fontStyle:'italic'}}>
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            :
                            <>
                            </>
                    }



                    <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), justifyContent: 'space-between' }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowImageViewing(true)
                                setIndexCurrImageView(0)
                                setListImagesSeeCurr([...infoPost?.template?.data?.imageBeforeTreatment,...infoPost?.template?.data?.imageAfterTreatment])
                            }}
                            style={{ height: _moderateScale(8 * 20), flex: 1 }}>
                            <View style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 8),
                                height: _moderateScale(8 * 3),
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                position: 'absolute',
                                zIndex: 1,
                                bottom: 0,
                                borderTopRightRadius: _moderateScale(8),
                                borderBottomLeftRadius: _moderateScale(4),
                            }]}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                    Trước
                                </Text>
                            </View>
                            {
                                infoPost?.template?.data?.imageBeforeTreatment?.length > 0 ?
                                    <FastImage
                                        style={[{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: _moderateScale(4 * 1)
                                        }]}
                                        uri={`${URL_ORIGINAL}${infoPost?.template?.data?.imageBeforeTreatment[0]?.link}`}
                                    />
                                    : <></>
                            }
                        </TouchableOpacity>
                        <View style={{ width: _moderateScale(8 * 1.5) }} />
                        <TouchableOpacity
                            onPress={() => {
                                setShowImageViewing(true)
                                setIndexCurrImageView(infoPost?.template?.data?.imageBeforeTreatment?.length)
                                setListImagesSeeCurr([...infoPost?.template?.data?.imageBeforeTreatment,...infoPost?.template?.data?.imageAfterTreatment])
                            }}
                            style={{ height: _moderateScale(8 * 20), flex: 1 }}>
                            <View style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 8),
                                height: _moderateScale(8 * 3),
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                position: 'absolute',
                                zIndex: 1,
                                bottom: 0,
                                borderTopRightRadius: _moderateScale(8 * 1),
                                borderBottomLeftRadius: _moderateScale(4),
                            }]}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                    Sau
                                </Text>
                            </View>
                            {
                                infoPost?.template?.data?.imageAfterTreatment?.length > 0 ?
                                    <FastImage
                                        style={[{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: _moderateScale(4 * 1)
                                        }]}
                                        uri={`${URL_ORIGINAL}${infoPost?.template?.data?.imageAfterTreatment[0]?.link}`}
                                    />
                                    : <></>
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        infoPost?.images?.length > 0 ?
                            <ListImage data={infoPost?.images ? infoPost?.images : []} />
                            : <></>
                    }
                </View>

                <View style={{ height: _moderateScale(8 * 1), backgroundColor: 'rgba(196, 196, 196,.6)', marginTop: _moderateScale(8 * 3) }} />

                <View style={{ paddingHorizontal: _moderateScale(8 * 1), marginTop: _moderateScale(8 * 2) }}>

                    <View style={{ paddingLeft: _moderateScale(8), marginBottom: _moderateScale(8 * 2) }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BASE_COLOR }}>
                            Nhật kí {infoPost?.template?.data?.serviceName}
                        </Text>
                    </View>

                    {
                        dailyDiary?.dailyDiaryArr?.length > 0 && dailyDiary?.dailyDiaryArr?.map((item, index) => {
                            return (
                                <View key={item?._id} style={{ flexDirection: 'row' }}>

                                    <View style={{ width: _moderateScale(2), backgroundColor: BG_GREY_OPACITY_5, alignItems: 'center', marginLeft: _moderateScale(8 * 2) }} >
                                        <View style={{ width: _moderateScale(8), height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_7, borderRadius: _moderateScale(4), position: 'absolute', top: _moderateScale(6) }} />
                                    </View>

                                    <View style={{ flex: 1, marginLeft: 10, paddingHorizontal: _moderateScale(8 * 1) }}>
                                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                                            {moment(item?.date).format('DD/MM/YYYY')}
                                        </Text>
                                        {
                                            item?.description?.length > 0 ?
                                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), marginTop: _moderateScale(4), fontStyle: 'italic', color: BLACK_OPACITY_8 }}>
                                                    {item?.description}
                                                </Text>
                                                : <></>
                                        }
                                        {
                                            item?.images?.length > 0 ?
                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: _moderateScale(8) }}>
                                                    {
                                                        item?.images?.map((itemMap, index) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    onPress={() => {

                                                                        setShowImageViewing(true)
                                                                        setIndexCurrImageView(index)
                                                                        setListImagesSeeCurr(item?.images)
                                                                    }}
                                                                    key={itemMap?._id} style={{ marginTop: _moderateScale(8), marginRight: _moderateScale(8) }}>
                                                                    <FastImage
                                                                        style={[{
                                                                            width: _moderateScale(8 * 11),
                                                                            height: _moderateScale(8 * 11),
                                                                            borderRadius: _moderateScale(8)
                                                                        }]}
                                                                        uri={`${URL_ORIGINAL}${itemMap?.link}`}
                                                                    />
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    }
                                                </View>
                                                : <></>
                                        }
                                        <View style={{ height: _moderateScale(8 * 4) }} />

                                    </View>
                                </View>
                            )
                        })
                    }


                </View>
                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={{
                borderTopWidth: 0.5, borderTopColor: BG_GREY_OPACITY_5,
                flexDirection: "row",
                paddingVertical: _moderateScale(8),
                paddingHorizontal: _moderateScale(8 * 2),
                justifyContent: 'space-between',
                marginBottom: getBottomSpace() + _moderateScale(8)
            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.MODAL_COMMENT_POST, { idPost: infoPost?._id, showKeyboard: true })
                    }}
                    style={{
                        width: _moderateScale(8 * 27),
                        height: _moderateScale(8 * 4),
                        backgroundColor: BG_GREY_OPACITY_5,
                        borderRadius: _moderateScale(8 * 2),
                        justifyContent: 'center',
                        paddingLeft: _moderateScale(8 * 1.5),

                    }}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY }}>
                        Thêm bình luận
                    </Text>
                </TouchableOpacity>

                <View style={[styleElement.rowAliCenter, { paddingRight: _moderateScale(8 * 1) }]}>

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
                            actionLike(infoPost?.reaction)
                        }}
                        style={{ alignItems: 'center' }}>
                        {
                            infoPost?.reaction ?
                                <Image style={[sizeIcon.md]} source={require('../../NewIcon/heartRed.png')} />
                                :
                                <Image style={[sizeIcon.md]} source={require('../../NewIcon/heartBlack.png')} />

                        }
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }}>
                            {infoPost?.reactionCount}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ width: _moderateScale(8 * 3) }} />

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.MODAL_COMMENT_POST, { idPost: infoPost?._id, setInfoPost })
                        }}
                        style={{ alignItems: 'center' }}>
                        <Image style={[sizeIcon.md]} source={require('../../NewIcon/commentBlack.png')} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }}>
                            {infoPost?.commentsCount}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

            {/* <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenKey.MODAL_COMMENT_POST,{idPost: infoPost?._id})
                }}
                style={[styleElement.centerChild, {
                    position: 'absolute',
                    bottom: _moderateScale(8 * 2),
                    right: _moderateScale(8 * 0),
                }]}>
                <Image style={{
                    width: _moderateScale(8 * 12),
                    height: _moderateScale(8 * 12),
                }} source={require('../../NewIcon/btnComment.png')} />
            </TouchableOpacity> */}

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },

    inputHeader: {
        width: "100%",
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerProfile__avatar: {
        width: _moderateScale(48),
        height: _moderateScale(48),
        borderRadius: _moderateScale(48),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    },
    ///------start feed-----///
    itemFeed: {
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8)
    },
    headOfFeed: {
        flexDirection: 'row',
        marginBottom: _moderateScale(8 * 2)
    },
    leftOfHead: {
        flex: 1,
        flexDirection: 'row',
    },
    titOfFeed: {
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4)
    },
    titFeed: {
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    timeFeed: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(11)
    },
    moreFeed: {
        marginTop: _moderateScale(8)
    },
    contentFeed: {
        flex: 1
    },
    textFeed: {
        fontSize: _moderateScale(15),
        color: BLACK_OPACITY_8,
        paddingHorizontal: _moderateScale(8 * 2),
        marginBottom: _moderateScale(12)
    },
    listImgFeed: {
        flexDirection: 'row'
    },
    itemImgFeed: {
        marginRight: _moderateScale(8),
        padding: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        position: 'relative'
    },
    imgFeed: {
        width: _widthScale(8 * 8),
        height: _heightScale(8 * 8)
    },
    itemImgMore: {
        backgroundColor: MAIN_OPACITY_8,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMoreImg: {
        fontSize: _moderateScale(28),
        color: WHITE,
        ...stylesFont.fontNolan500
    },
    shareFeed: {
        flex: 1,
        marginTop: _moderateScale(8 * 3)
    },
    headShare: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titShare: {
        marginLeft: _moderateScale(4),
        color: BLUE_TITLE,
        ...stylesFont.fontNolan500
    },
    contentShare: {
        flexDirection: 'row',
        marginTop: _moderateScale(8)
    },
    imgShare: {
        width: _widthScale(8 * 6),
        height: _heightScale(8 * 6),
        marginRight: _moderateScale(8)
    },
    briefContentShare: {
        flex: 1,
    },
    titContentShare: {
        fontSize: _moderateScale(16),
        color: SECOND_COLOR,
        marginBottom: _moderateScale(4)
    },
    descriptionShare: {
        fontSize: _moderateScale(11),
        color: GREY_FOR_TITLE,
        fontStyle: 'italic'
    },
    actionFeed: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        marginTop: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 1.5),
        borderColor: GREY
    },
    itemActionFeed: {
        flexDirection: 'row',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titAction: {
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(4)
    },
    ///-----end feed-----///
    ///-----start comment -----//
    listComment: {
        flex: 1,
        marginTop: _moderateScale(8 * 2)
    },
    itemComment: {
        flexDirection: 'row',
        marginBottom: _moderateScale(8 * 2),
    },
    childComment: {
        paddingLeft: _moderateScale(8 * 6)
    },
    leftItemComment: {
        flexDirection: 'row',
        flex: 1
    },
    descriptionOfComment: {
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4),
        flex: 1
    },
    titComment: {
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    contentComment: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(12),
    },
    ///-----end comment-----//
})
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
export default DiaryOfNewsFeed;