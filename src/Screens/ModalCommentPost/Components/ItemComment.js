import moment from 'moment';
import React, { memo, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import FastImage from '../../../Components/Image/FastImage';
import { BLUE_TITLE, GREY_FOR_TITLE, WHITE, BG_BEAUTY, GREY, BLACK, SECOND_COLOR, THIRD_COLOR, BLUE_FB, BLUE, BLUE_2, BLUE_OCEAN } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';
import { deleteCommentPost, getAllPostCommentChild, getCommentsChildById, getAllPostCommentMore, updateCommentPost } from '../../../Redux/Action/PostAction';


const ItemComment = memo((props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [listCommentsChild, setListCommentsChild] = useState([])
    const [isShowReplyCmt, setIsShowReplyCmt] = useState(false)

    const [animation, setAnimation] = useState(new Animated.Value(0))

    const [isAnimated, setIsAnimated] = useState(false)

    useEffect(() => {
        console.log({ axax: props?.data?.commentsCount });
        if (props?.data?.commentsCount > 0) {
            _handleLoadCommentChild()
        }
    }, [props?.data?.commentsCount])

    useEffect(() => {
        if (props?.isHightLight) {
            handleAnimation()
        }
    }, [])

    const _handleLoadCommentChild = async () => {
        // return console.log({props});


        let condition = {
            "condition": {
                "parentId": {
                    "equal": props?.data?.id
                }
            },
            "sort": {
                "created": 1
            },
            "limit": 100,
            "page": 1
        }
        let result = await getCommentsChildById(condition, props?.data?.postId)
        if (result?.isAxiosError) return
        setListCommentsChild(result?.data?.data)

        if (!isAnimated) {
            let find = result?.data?.data?.find(item => item?._id == props?.idCommentHighlight);

            if (find) {
                setIsShowReplyCmt(true)
                handleAnimation()
            }
            setIsAnimated(true)
        }



        // dispatch(getAllPostCommentChild(
        //     condition, currentPostRedux?._id
        // ))
    }

    const handleAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 5000
        }).start(() => {
            Animated.timing(animation, {
                toValue: 0,
                duration: 1000
            }).start()
        })
    }

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["#F1F2F6", 'rgba(7, 140, 127,0.5)']
    })

    return (
        <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
            <View style={[styles.itemComment]}>

                <View style={[styles.leftItemComment]}>
                    <TouchableOpacity
                        onPress={() => {
                            if (props?.data?.partner?._id == infoUserRedux?._id) {
                                navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                            } else {
                                navigation.navigate(ScreenKey.OTHER_PERSONAL_PAGE, { userId: props?.data?.partner?._id })
                            }
                        }}
                    >
                        <FastImage
                            style={[styles.bannerProfile__avatar]}
                            uri={props?.data?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Animated.View

                            style={[{
                                // backgroundColor: boxInterpolation,
                                backgroundColor: "#F1F2F6",
                                flex: 1,
                                marginHorizontal: _moderateScale(8),
                                borderRadius: _moderateScale(8 * 2),
                                padding: _moderateScale(8),
                                paddingHorizontal: _moderateScale(8 * 1.5)
                            },
                            props?.isHightLight && { backgroundColor: boxInterpolation }
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (props?.data?.partner?._id == infoUserRedux?._id) {
                                        navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                                    } else {
                                        navigation.navigate(ScreenKey.OTHER_PERSONAL_PAGE, { userId: props?.data?.partner?._id })
                                    }
                                }}
                            >
                                <Text style={[styles.titComment]}>{props?.data?.partner?.name}</Text>
                            </TouchableOpacity>
                            <Text style={[styles.contentComment]}>
                                {props?.data?.content}
                            </Text>
                        </Animated.View>
                        <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8 * 2), marginTop: _moderateScale(4) }]}>
                            <Text style={{ ...stylesFont.fontNolan.fontNolan500, fontSize: _moderateScale(13), color: GREY, width: _moderateScale(8 * 8) }}>
                                {moment(props?.data?.created).startOf('minute').fromNow().split(' ').slice(0, 2).join(' ')}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setCurrReplyComment(props?.data)
                                    props?.refTextInput()
                                    setIsShowReplyCmt(true)
                                }}
                                style={{ marginHorizontal: _moderateScale(8), }}>
                                <Text style={{ ...stylesFont.fontNolan.fontNolan500, fontSize: _moderateScale(14), color: BLACK }}>
                                    Trả lời
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            !isShowReplyCmt && Number(props?.data?.commentsCount) > 0 ?
                                <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8 * 2), marginTop: _moderateScale(8) }]}>
                                    <TouchableOpacity onPress={() => {
                                        _handleLoadCommentChild()
                                        setIsShowReplyCmt(true)
                                    }}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                            Xem thêm {props?.data?.commentsCount} câu trả lời
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                : <></>
                        }


                    </View>

                </View>


            </View>

            {
                isShowReplyCmt && listCommentsChild?.length > 0 ?
                    <>
                        {
                            listCommentsChild?.map((item, index) => {
                                return (
                                    <View style={{ paddingLeft: _moderateScale(8 * 7), marginBottom: _moderateScale(8 * 1.5) }}>
                                        <View style={[styles.leftItemComment]}>
                                            <FastImage
                                                style={[styles.bannerProfile__avatar]}
                                                uri={item?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${item?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                            />
                                            <View style={{ flex: 1 }}>
                                                <Animated.View
                                                    onLayout={(e) => {
                                                        if (props?.idCommentHighlight == item?._id) {
                                                            console.log({ ...e });
                                                        }
                                                    }}
                                                    style={[{
                                                        backgroundColor: "#F1F2F6",
                                                        flex: 1,
                                                        marginHorizontal: _moderateScale(8),
                                                        borderRadius: _moderateScale(8 * 2),
                                                        padding: _moderateScale(8),
                                                        paddingHorizontal: _moderateScale(8 * 1.5)
                                                    },
                                                    props?.idCommentHighlight == item?._id && { backgroundColor: boxInterpolation }
                                                    ]}>
                                                    <Text style={[styles.titComment]}>{item?.partner?.name}</Text>
                                                    <Text style={[styles.contentComment]}>
                                                        {item?.content}
                                                    </Text>
                                                </Animated.View>
                                                <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8 * 2), marginTop: _moderateScale(4) }]}>
                                                    <Text style={{ ...stylesFont.fontNolan.fontNolan500, fontSize: _moderateScale(13), color: GREY, width: _moderateScale(8 * 10) }}>
                                                        {moment(item?.created).startOf('minute').fromNow().split(' ').slice(0, 2).join(' ')}
                                                    </Text>
                                                </View>



                                            </View>


                                        </View>
                                    </View>
                                )
                            })
                        }
                    </>
                    :
                    <></>
            }

        </View>
    );
});


const styles = StyleSheet.create({

    bannerProfile__avatar: {
        width: _moderateScale(48),
        height: _moderateScale(48),
        borderRadius: _moderateScale(48),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    },

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
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolan500
    },
    ///-----end comment-----//
})


export default ItemComment;