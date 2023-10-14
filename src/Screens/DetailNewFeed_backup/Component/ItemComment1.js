import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BG_GREY_OPACITY_9, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, TITLE_GREY, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import FastImage from '../../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ActionComment from './ActionComment';
import { SET_CURRENT_POST_COMMENT, SET_SCROLLTO_COMMENT } from '../../../Redux/Constants/ActionType';
import { deleteCommentPost, getAllPostCommentChild, getAllPostCommentMore, updateCommentPost } from '../../../Redux/Action/PostAction';
import { get, isEmpty } from 'lodash-es';
import ActionSheet from 'react-native-actionsheet';
import {randomStringFixLengthCode} from '../../../Constant/Utils'
import DialogConfirmInput from '../../../Components/Dialog/ConfirmTextInput';

// const ItemComment = memo(function ItemComment(props) {
const ItemComment = memo(function ItemComment(props) {
    const dispatch = useDispatch()

    const ActionSheetRef = useRef()
    const currentPostRedux = useSelector(state => state.postReducer?.currentPost)
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [currIdCmt, setCurrIdCmt] = useState(null)

    const _handleComment = () => {
        dispatch({
            type: SET_CURRENT_POST_COMMENT,
            payload: props?.data
        })
        // dispatch({
        //     type: SET_SCROLLTO_COMMENT,
        //     payload: e.nativeEvent.pageY
        // })
    }

    const _handleLoadCommentChild = () => {
        if (props?.data?.id) {
            let condition = {
                "condition": {
                    "parentId": {
                        "equal": props?.data?.id
                    }
                },
                "sort": {
                    "created": 1
                },
                "limit": 10,
                "page": 1
            } 
            dispatch(getAllPostCommentChild(
                condition, currentPostRedux?._id
            ))
        }
    }

    const _handleEditComment = () =>{
        console.log("_handleEditComment")
        setTimeout(() => {
            setDialogVisible(props?.data?.content)
        }, 200);
    }

    const _handdleDelComment = () =>{
        console.log("_handdleDelComment")
        setTimeout(() => {
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc muốn xoá bình luận này?",
                [
                    {
                        text: "Huỷ",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Đồng ý", onPress: () => (_confirmDeleteComment()) }
                ],
                { cancelable: false }
            );
        }, 500);
    }

    const _confirmDeleteComment = () => {
        dispatch(deleteCommentPost(props?.data?.id, props?.data?.parentId))
    }

    const _confirmEditComment = (textNew) => {
        if (isEmpty(textNew.trim())) return alert("Không được để trống")
        setDialogVisible("")

        dispatch(updateCommentPost({
            content: textNew
        }, props?.data?.id))
    }

    useEffect(() => {
        console.log('comment1',);
    }, [props?.data])
   
    return (
        <>
         <DialogConfirmInput
                title={"Chỉnh sửa bình luận"}
                message={"Nhập bình luận muốn thay thế \n vào bên dưới"}
                value={`${isDialogVisible}`}
                handleCancel={() => {
                    setDialogVisible(null)
                }}
                handleConfirm={(textInput) => {
                    _confirmEditComment(textInput)
                }}
                visible={Boolean(isDialogVisible)} />
         <ActionSheet
                ref={ActionSheetRef}
                title={'Bình luận của bạn'}
                options={["Sửa", "Xóa","Huỷ"]}
                cancelButtonIndex={2}
                // destructiveButtonIndex={0} 
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            _handleEditComment()
                            break;
                        case 1:
                            _handdleDelComment()
                            break;

                        default:
                            break;
                    }
                }}
            />
            {/* <Text>
                {randomStringFixLengthCode(4)}
            </Text> */}

            {props?.type === 'child' ?
                <View style={[styles.itemComment, styles.childComment]}>
                    <View style={[styles.leftItemComment]}>
                        <FastImage
                            style={[styles.bannerProfile__avatar]}
                            uri={props?.data?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                        />
                        <View style={[styles.descriptionOfComment]}>
                            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={[styles.titComment]}>{props?.data?.partner?.name}</Text>
                                <Text style={[styles.contentComment], {
                                    fontSize: _moderateScale(10),
                                    paddingRight: _moderateScale(8)
                                }}>  {moment(props?.data?.created).fromNow()}  </Text>
                            </View>
                            <Text style={[styles.contentComment]}
                                numberOfLines={2}>
                                {props?.data?.content}
                            </Text>
                        </View>
                    </View>
                    {infoUserRedux?._id === props?.data?.partnerId?
                         <TouchableOpacity 
                         hitSlop={styleElement.hitslopSm}
                         onPress={()=>{
                            ActionSheetRef.current.show()
                         }}
                         style={[styles.moreFeed]}>
                         <Image
                             source={require('../../../Image/component/more.png')} />
                        </TouchableOpacity>
                        :<></>
                        }
                </View>
                :
                <>
                    <View style={[styles.itemComment]}>
                        <View style={[styles.leftItemComment]}>
                            <FastImage
                                style={[styles.bannerProfile__avatar]}
                                uri={props?.data?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                            />
                            <View style={[styles.descriptionOfComment]}>
                                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <Text style={[styles.titComment]}>{props?.data?.partner?.name}</Text>
                                    <Text style={[styles.contentComment], {
                                        fontSize: _moderateScale(10),
                                        paddingRight: _moderateScale(8)
                                    }}>
                                        {moment(props?.data?.created).fromNow()}
                                    </Text>
                                </View>
                                <Text style={[styles.contentComment]}
                                    numberOfLines={2}>
                                    {props?.data?.content}
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity
                                        style={{flexDirection:'row', marginRight:_moderateScale(12), alignItems: 'center'}}
                                        onPress={_handleLoadCommentChild}>
                                        <Image
                                            style={[sizeIcon.xxxs, {marginRight:_moderateScale(4)}]}
                                            source={require('../../../Image/component/comment.png')} />
                                        <Text style={{
                                            fontSize: _moderateScale(12),
                                            fontWeight: '500',
                                            color: BLUE_TITLE, marginTop: _moderateScale(4)
                                        }}>{props?.data?.commentsCount}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={{flexDirection:'row'}}
                                        onPress={()=>{
                                            _handleComment()
                                            _handleLoadCommentChild()
                                         }
                                        }>
                                        <Text style={{
                                            fontSize: _moderateScale(12),
                                            fontWeight: '500',
                                            color: BLUE_TITLE, marginTop: _moderateScale(4)
                                        }}>Trả lời</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        {infoUserRedux?._id === props?.data?.partnerId?
                         <TouchableOpacity
                         hitSlop={styleElement.hitslopSm}
                         onPress={()=>{
                             
                            ActionSheetRef.current.show()
                         }}
                         style={[styles.moreFeed]}>
                         <Image
                             source={require('../../../Image/component/more.png')} />
                        </TouchableOpacity>
                        :<></>
                        }
                       
                    </View>
             
                      {props?.data?.commentsCount > 0 && isEmpty(props?.listChild) ?
                        props?.listChild?.map((itm, index) => {
                            return <View style={[styles.itemComment, styles.childComment]}>
                                <View style={[styles.leftItemComment]}>
                                    <FastImage
                                        style={[styles.bannerProfile__avatar]}
                                        uri={itm?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${itm?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                    />
                                    <View style={[styles.descriptionOfComment]}>
                                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                            <Text style={[styles.titComment]}>{itm?.partner?.name}</Text>
                                            <Text style={[styles.contentComment], {
                                                fontSize: _moderateScale(10),
                                                paddingRight: _moderateScale(8)
                                            }}>  {moment(itm?.created).fromNow()}  </Text>
                                        </View>
                                        <Text style={[styles.contentComment]}
                                            numberOfLines={2}>
                                            {itm?.content}
                                        </Text>
                                    </View>
                                </View>
                                {infoUserRedux?._id === itm?.partnerId?
                                    <TouchableOpacity 
                                    hitSlop={styleElement.hitslopSm}
                                    onPress={()=>{
                                        ActionSheetRef.current.show()
                                    }}
                                    style={[styles.moreFeed]}>
                                    <Image
                                        source={require('../../../Image/component/more.png')} />
                                    </TouchableOpacity>
                                    :<></>
                                    }
                            </View>
                        })
                        : <></>}
                </>
           } 



        </>
    )
})


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
        fontSize: _moderateScale(12),
    },
    ///-----end comment-----//
})


export default ItemComment
