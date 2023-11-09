import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View ,TouchableOpacity} from 'react-native';
import ImageView from "react-native-image-viewing";
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
// COMPONENT
import EachCommentPost from '../../Components/Timeline/EachCommentPost';
import { BASE_COLOR, BG_GREY_OPACITY, BG_GREY_OPACITY_5, GREY, GREY_FOR_TITLE, WHITE } from '../../Constant/Color';
import { FROM_RECEIVER_ID } from '../../Constant/Flag';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { clearCurrSeePost, confirmCommentPost, getAllCommentsByPost, getPostById, likePost } from '../../Redux/Action/PostAction';
import BtnComtLike from './CommentPost/BtnComtLike';
import ContentPost from './CommentPost/ContentPost';
import CountLikeAndComment from './CommentPost/CountLikeAndComment';
import ImagesPost from './CommentPost/ImagesPost';









const CommentPostFromNotifi = props => {
    let flatListRef = useRef(null);
    let refTextInput = useRef(null)

    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const postsRedux = useSelector(state => state.postReducer)


    const [currTextComment, setCurrTextComment] = useState('')
    const [currReplyComment, setCurrReplyComment] = useState({})

    const [isShowGallery, setShowGallery] = useState(false)
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [loadingLikeCmt, setLoadingLikeCmt] = useState(false)
    const [loadingSendCmt, setLoadingSendCmt] = useState(false)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)

    useEffect(() => {
        console.log({ alooo: props.route.params });

        dispatch(getAllCommentsByPost(props?.route?.params?.postId))
        dispatch(getPostById(props?.route?.params?.postId))

        return () => {
            dispatch(clearCurrSeePost())
        }
    }, [props?.route?.params?.postId])


    // useEffect(() => {
    //     console.log({ abcxyz:  });

    // }, [])


    const _comfirmSendComment = () => {
        if (isEmpty(currTextComment.trim())) {
            return alert("Vui lòng nhập bình luận")
        }

        setLoadingSendCmt(true)

        if (!isEmpty(currReplyComment)) {
            dispatch(confirmCommentPost({
                postId: currReplyComment?.postId,
                parentId: currReplyComment?._id,
                content: currTextComment.trim()
            }, setLoadingSendCmt))
            setCurrTextComment('')
            return
        }


        dispatch(confirmCommentPost({
            postId: props?.route?.params?.postId,
            content: currTextComment.trim()
        }, setLoadingSendCmt))
        setCurrTextComment('')

    }

    const _confirmLikePost = () => {
        setLoadingLikeCmt(true)
        dispatch(likePost({
            postId: postsRedux.currSeeInfoPost._id,
            isLike: postsRedux?.currSeeInfoPost?.likerIdArr?.find(itemFind => itemFind == infoUserRedux._id) ? false : true
        }, setLoadingLikeCmt))
    }


    const _getMoreComment = () => {
        dispatch(getAllCommentsByPost(props?.route?.params?.postId, postsRedux.currSeeCommentPost.data[postsRedux.currSeeCommentPost.data.length - 1]._id))
    }

    const bodyContentAndImages = (() => {
        return (
            <>
                <ContentPost
                    data={postsRedux?.currSeeInfoPost} />

                <ImagesPost data={postsRedux?.currSeeInfoPost} />

                <CountLikeAndComment
                    countLike={postsRedux?.currSeeInfoPost?.likersCount}
                    countComment={postsRedux?.currSeeInfoPost?.commentsCount} />

                <BtnComtLike
                    refTextInput={() => {
                        refTextInput.focus()
                    }}
                    likerIdArr={postsRedux?.currSeeInfoPost?.likerIdArr}
                    // isLike={props?.route?.params?.data?.likerIdArr?.find(itemFind => itemFind == infoUserRedux.infoUser._id) ? false : true}
                    postId={postsRedux?.currSeeInfoPost?._id} />
            </>
        )
    })

    const xyz = useCallback((itemCommemtForRep) => {
        setCurrReplyComment(itemCommemtForRep)
        // if (refTextInput.isFocused() == false) {
        //     refTextInput.focus()
        // }   
    }, [])

    const refTextInputFunction = () => {
        refTextInput.focus()
    }


    const _renderItemComment = ({ item, index }) => {
        return (
            <EachCommentPost
                refTextInput={refTextInputFunction}

                setCurrReplyComment={xyz}
                item={item}
                lasted={index == postsRedux?.currSeeCommentPost?.data?.length - 1}
            />
        )
    }

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);


    return (

        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS == 'ios' && getBottomSpace() == 0 ? _heightScale(16) : 0} behavior={Platform.OS == 'ios' ? 'padding' : null} style={{
            flexGrow: 1
        }}>
            <View style={[styles.container]}>

                <ImageView
                    images={postsRedux?.currSeeInfoPost?.images?.map(item => {
                        return {
                            uri: `${URL_ORIGINAL}${item.link}`,
                        }
                    })}
                    // isSwipeCloseEnabled={false}
                    // isPinchZoomEnabled={true}
                    // isTapZoomEnabled={false}
                    onRequestClose={() => {
                        setShowGallery(false)
                    }}
                    imageIndex={indexCurrImageView}
                    visible={isShowGallery}
                // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                />

                <View style={[styles.header, shadow]}>
                    <View style={[styles.avatarAndTitle]}>
                        <TouchableOpacity
                            hitSlop={styleElement.hitslopSm}
                            style={{
                                paddingHorizontal: _moderateScale(8)
                            }}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <Image
                                style={sizeIcon.lg}
                                source={require('../../Icon/backBlack.png')} />
                        </TouchableOpacity>
                        <Image
                            style={[styles.avatarAndTitle__avatar]}
                            source={{ uri: postsRedux?.currSeeInfoPost?.userCreate?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${postsRedux?.currSeeInfoPost?.userCreate?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                        />
                        <View style={[styles.avatarAndTitle__titleAndTime, { flex: 1 }]}>
                            {
                                !isEmpty(postsRedux?.currSeeInfoPost) ?
                                    <>
                                        <Text style={[stylesFont.fontNolan500, styles.avatarAndTitle__titleAndTime__title]}>
                                            {
                                                `${postsRedux?.currSeeInfoPost?.userCreate?.profile?.firstName} ${postsRedux?.currSeeInfoPost?.userCreate?.profile?.lastName}`
                                            }
                                        </Text>
                                        <Text style={[stylesFont.fontNolan, styles.avatarAndTitle__titleAndTime__time]}>
                                            {moment(postsRedux?.currSeeInfoPost?.created).startOf('minute').fromNow()}
                                        </Text>
                                    </>
                                    :
                                    <>
                                    </>
                            }

                        </View>
                        {
                            !isEmpty(postsRedux?.currSeeInfoPost?.userCreate?._id) && !isEmpty(infoUserRedux._id) && postsRedux?.currSeeInfoPost?.userCreate?._id !== infoUserRedux._id ?
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.CHATTING, { propsData: postsRedux?.currSeeInfoPost?.userCreate?._id, flag: FROM_RECEIVER_ID })
                                    }}
                                    style={{
                                        paddingHorizontal: _moderateScale(16),
                                        paddingVertical: _moderateScale(8),
                                        // backgroundColor:BG_GREY_OPACITY_3,
                                        borderRadius: _moderateScale(8)
                                    }}>
                                    <Image
                                        style={sizeIcon.lg}
                                        source={require('../../Icon/i_chatt.png')} />
                                </TouchableOpacity>
                                :
                                <>
                                </>
                        }


                    </View>
                </View>



                {/* <View style={{ height: _moderateScale(0.75), width: "100%", backgroundColor: BG_GREY_OPACITY_5 }} /> */}

                <View style={{ flex: 1 }}>
                    <FlatList
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[stylesFont.fontNolan500, { color: GREY }]}>
                                        Chưa có bình luận về bài viết này
                                    </Text>
                                </View>
                            )
                        }}
                        ListHeaderComponent={bodyContentAndImages()}

                        ref={ref => flatListRef = ref}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {

                            if (!onEndReachedCalledDuringMomentum) {
                                _getMoreComment()
                                setOnEndReachedCalledDuringMomentum(true)
                            }
                            // _handleEndReached()
                        }}
                        onMomentumScrollBegin={() => {
                            setOnEndReachedCalledDuringMomentum(false)
                        }}

                        // keyboardShouldPersistTaps={'handled'}
                        // onEndReachedThreshold={0.1}
                        // onLayout={() => flatListRef.scrollToEnd()}
                        contentContainerStyle={{ flexGrow: 1 }}
                        // data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                        data={!isEmpty(postsRedux?.currSeeCommentPost?.data) ? postsRedux?.currSeeCommentPost?.data : []}
                        renderItem={_renderItemComment}
                        keyExtractor={_awesomeChildListKeyExtractor}
                    />
                </View>

                <View style={{ borderTopWidth: _moderateScale(0.5), borderColor: BG_GREY_OPACITY_5 }}>
                    {
                        !isEmpty(currReplyComment) ?
                            <>
                                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8), marginLeft: _moderateScale(8 * 2.5) }]}>
                                    <Text style={[stylesFont.fontNolan]}>
                                        {`Đang trả lời `}
                                    </Text>
                                    <Text style={[stylesFont.fontNolan500]}>
                                        {`${currReplyComment?.userCreate?.profile?.firstName} ${currReplyComment?.userCreate?.profile?.lastName}`}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            // console.log({aloo: refTextInput});
                                            refTextInput.blur()
                                            setCurrReplyComment({})
                                        }}
                                        style={[{ marginLeft: _moderateScale(8), padding: _moderateScale(4), borderRadius: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_5 }]}>
                                        <Image style={sizeIcon.xxxs} source={require('../../Icon/cancel.png')} />
                                    </TouchableOpacity>
                                </View>

                            </>
                            :
                            <>
                            </>
                    }
                    <View style={{
                        width: _width, paddingVertical: _heightScale(12),
                        paddingBottom: (getBottomSpace() + _heightScale(12)),
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: WHITE
                    }}>
                        <TouchableOpacity onPress={() => {
                            alert('Chức năng đang hoàn thiện...')
                        }}>
                            <Image
                                style={[sizeIcon.lllg]}
                                source={require('../../Icon/image.png')}
                            />
                        </TouchableOpacity>
                        <View style={{
                            backgroundColor: BG_GREY_OPACITY,
                            borderRadius: _moderateScale(10),
                            paddingVertical: _heightScale(5)
                        }}>
                            <TextInput
                                // onFocus={_onFocusTextInput}
                                // onBlur={_outFocusTextInput}
                                ref={ref => refTextInput = ref}
                                multiline
                                value={currTextComment}
                                onChangeText={(content) => {
                                    setCurrTextComment(content)
                                }}
                                style={styles.input}
                                placeholder={'Aa'} />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{
                                }}
                                onPress={() => {
                                    _comfirmSendComment()
                                }}>
                                {
                                    loadingSendCmt ?
                                        <ActivityIndicator size={'small'} />
                                        :
                                        <Image
                                            style={[sizeIcon.llg]}
                                            source={require('../../Icon/send.png')} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    contentView__text: {
        fontSize: _moderateScale(14),
        lineHeight: _moderateScale(8 * 2.5),
        textAlign: 'justify'
    },
    contentView: {
        marginVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    avatarAndTitle__titleAndTime__time: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    avatarAndTitle__titleAndTime__title: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE
    },
    avatarAndTitle__titleAndTime: {
        marginLeft: _moderateScale(8)
    },
    avatarAndTitle__avatar: {
        width: _moderateScale(8 * 4.5),
        height: _moderateScale(8 * 4.5),
        borderRadius: _moderateScale(8 * 4.5 / 2),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5
    },
    avatarAndTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    comment__nameAndContent__content: {
        fontSize: _moderateScale(14)

    },
    comment__nameAndContent__name: {
        fontSize: _moderateScale(15)
    },
    comment__nameAndContent: {
        backgroundColor: '#F1F2F6',
        // backgroundColor:'grey',
        borderRadius: _moderateScale(8),
        paddingTop: _moderateScale(4),
        paddingBottom: _moderateScale(8),
        paddingHorizontal: _moderateScale(8)
    },
    comment__avatar: {
        width: _moderateScale(8 * 5.5),
        height: _moderateScale(8 * 5.5),
        borderRadius: _moderateScale(8 * 5.5 / 2),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5
    },
    commentReply__avatar: {
        width: _moderateScale(8 * 3.5),
        height: _moderateScale(8 * 3.5),
        borderRadius: _moderateScale(8 * 3.5 / 2),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5
    },
    commentReply: {
        flexDirection: 'row',
        marginRight: _moderateScale(8 * 2),
        marginBottom: _moderateScale(8),
        marginTop: _moderateScale(8)
    },
    comment: {
        flexDirection: 'row',
        marginHorizontal: _moderateScale(8 * 2),
        marginTop: _moderateScale(8 * 2)
    },
    input: {
        width: _widthScale(250),
        // height: _moderateScale(50),
        padding: 0,
        fontSize: _widthScale(16),
        paddingHorizontal: _widthScale(16),
        margin: 0
    },
    header: {
        justifyContent: 'center',
        // alignItems: 'flex-end',
        width: _width,
        height: _moderateScale(8 * 6),
        backgroundColor: WHITE,
        paddingVertical: _moderateScale(8),
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8),
        borderTopEndRadius: _moderateScale(8),
        // marginTop: _moderateScale(8 * 2),
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.68,

    elevation: 1.5
}



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
        'rgba(104, 47, 144,.4)'
    ]
}



export default CommentPostFromNotifi;