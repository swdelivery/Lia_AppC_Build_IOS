import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import DialogConfirmInput from '../../Components/Dialog/ConfirmTextInput';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_5, GREY, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { deleteComment, editComment } from '../../Redux/Action/PostAction';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";
import { _getMoreReplyCommentAPI } from '../../Services/api';
import { handleApi } from '../../Services/utils';







const EachCommentPost = props => {
    const infoUserRedux = useSelector(state => state.infoUserReducer)  
    const postsRedux = useSelector(state => state.postReducer)  
    const dispatch = useDispatch()

    const [listMoreReplyComments, setListMoreReplyComments] = useState([])
    const [flagEndReached, setFlagEndReached] = useState(false)
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [currIdCmt, setCurrIdCmt] = useState(null)

    useEffect(() => {

        setListMoreReplyComments([...props?.item?.comments])
    }, [postsRedux?.currSeeCommentPost])

    // useEffect(() => {
    //     if (isEmpty(postsRedux?.newReplyCommentHasCome)) return

    //     if (postsRedux?.newReplyCommentHasCome?.parentId == props?.item?._id) {
    //         setListMoreReplyComments(olds => [postsRedux?.newReplyCommentHasCome, ...olds])
    //     }

    // }, [postsRedux?.newReplyCommentHasCome])

    const _getMoreReplyComment = async (lastPostCommentId = null) => {
        let objForGetMoreReplyComment = {
            parentId: props.item._id,
            lastPostCommentId: lastPostCommentId
        }

        let resultGetMoreReplyComment = await handleApi(_getMoreReplyCommentAPI(objForGetMoreReplyComment))
        if (resultGetMoreReplyComment.error) return

        if (resultGetMoreReplyComment.data.length == 0) {
            return setFlagEndReached(true)
        }
        console.log({ resultGetMoreReplyComment });

        Store.dispatch({
            type: ActionType.GET_MORE_REPLY_COMMENT,
            payload: {
                data: resultGetMoreReplyComment.data,
                parentId: props.item._id
            }
        })

        // setListMoreReplyComments(olds => [...olds, ...resultGetMoreReplyComment.data])
    }

    const _handleChoiceOptions = (key, data) => {
        switch (key) {
            case "Chỉnh sửa":
                setTimeout(() => {
                    console.log({ data });

                    setDialogVisible(data.content)
                    setCurrIdCmt(data)

                }, 200);
                return

            // return props.navigation.navigate(ScreenKey.INFOTASK) 
            case "Xoá":
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
                            { text: "Đồng ý", onPress: () => (_confirmDeleteComment(data)) }
                        ],
                        { cancelable: false }
                    );
                }, 500);
                return


            default:
                break;
        }
    }

    const _confirmDeleteComment = (param) => {
        dispatch(deleteComment(param))
    }

    const _confirmEditComment = (textNew) => {
        if (isEmpty(textNew.trim())) return alert("Không được để trống")
        setDialogVisible("")

        console.log({ currIdCmt });

        dispatch(editComment({
            content: textNew
        }, currIdCmt._id))
    }

    return (
        <View style={[styles.comment]}>

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

            {/* <Image
                style={[styles.comment__avatar]}
                source={ {uri: props?.item?.userCreate?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.item?.userCreate?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}}
            /> */}
            <FastImage
                style={[styles.comment__avatar]}
                uri={props?.item?.userCreate?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.item?.userCreate?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
            />
            <View style={[{ flex: 1, marginLeft: _moderateScale(8 * 0.5) }, props.lasted && { marginBottom: _moderateScale(8 * 5) }]}>
                <View style={styles.comment__nameAndContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[stylesFont.fontNolan500, styles.comment__nameAndContent__name, { flex: 1 }]}>
                            {`${props?.item?.userCreate?.profile?.firstName} ${props?.item?.userCreate?.profile?.lastName}`}
                        </Text>
                        {
                            props?.item?.userCreate?._id == infoUserRedux.infoUser._id ?
                                <Dropdown
                                    data={[{
                                        value: 'Chỉnh sửa',
                                    }, {
                                        value: 'Xoá',
                                    }
                                    ]}
                                    onChangeText={(itemOption) => {
                                        // setDialogVisible(true)
                                        _handleChoiceOptions(itemOption, props?.item)
                                        // alert('a;pp')

                                    }}
                                    itemColor={'#000'}
                                    selectedItemColor={"#000"}
                                    renderBase={() => (<Image
                                        style={[sizeIcon.lg]}
                                        source={require('../../Icon/more.png')} />)}
                                    rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                    dropdownPosition={1}
                                    pickerStyle={{
                                        width: _moderateScale(8 * 17),
                                        left: null,
                                        right: 40,
                                        marginRight: 8,
                                        marginTop: 24
                                    }}
                                />
                                :
                                <>
                                </>
                        }
                    </View>
                    <Text style={[stylesFont.fontNolan, styles.comment__nameAndContent__content]}>
                        {props?.item?.content.trim()}
                    </Text>
                </View>

                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) }]}>
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(12), color: GREY }]}>
                        {moment(props?.item?.created).startOf('minute').fromNow()}
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            props.setCurrReplyComment(props?.item)
                            props.refTextInput()
                        }}
                        style={{ paddingHorizontal: _moderateScale(8 * 2), alignSelf: 'flex-start' }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                            {`Trả lời`}
                        </Text>
                    </TouchableOpacity>

                    {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => {
                                // props.setCurrReplyComment(props?.item)
                                Alert.alert(
                                    "Xác nhận",
                                    "Bạn có chắc muốn xoá bình luận này?",
                                    [
                                        {
                                            text: "Huỷ",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "Đồng ý", onPress: () => _confirmDeleteComment(props?.item) }
                                    ],
                                    { cancelable: false }
                                );
                            }}
                            style={{ paddingHorizontal: _moderateScale(8 * 2), alignSelf: 'flex-end' }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                                Xoá
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

                {
                    !isEmpty(listMoreReplyComments) && listMoreReplyComments?.map((itemReply, indexReply) => {
                        return (
                            <View key={itemReply._id} style={[styles.commentReply]}>
                                <FastImage
                                    style={[styles.commentReply__avatar]}
                                    uri={itemReply?.userCreate?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${itemReply?.userCreate?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                />
                                <View style={{ flex: 1, marginLeft: _moderateScale(8 * 0.5) }}>
                                    <View style={styles.comment__nameAndContent}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[stylesFont.fontNolan500, styles.comment__nameAndContent__name, { flex: 1 }]}>
                                                {`${itemReply?.userCreate?.profile?.firstName} ${itemReply?.userCreate?.profile?.lastName}`}
                                            </Text>
                                            {
                                                itemReply?.userCreate?._id == infoUserRedux.infoUser._id ?
                                                    <Dropdown
                                                        data={[{
                                                            value: 'Chỉnh sửa',
                                                        }, {
                                                            value: 'Xoá',
                                                        }
                                                        ]}
                                                        onChangeText={(itemOption) => {
                                                            // setDialogVisible(true)
                                                            _handleChoiceOptions(itemOption, itemReply)
                                                            // alert('a;pp')

                                                        }}
                                                        itemColor={'#000'}
                                                        selectedItemColor={"#000"}
                                                        renderBase={() => (<Image
                                                            style={[sizeIcon.lg]}
                                                            source={require('../../Icon/more.png')} />)}
                                                        rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                                        dropdownPosition={1}
                                                        pickerStyle={{
                                                            width: _moderateScale(8 * 17),
                                                            left: null,
                                                            right: 40,
                                                            marginRight: 8,
                                                            marginTop: 24
                                                        }}
                                                    />
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </View>
                                        <Text style={[stylesFont.fontNolan, styles.comment__nameAndContent__content]}>
                                            {itemReply.content.trim()}
                                        </Text>
                                    </View>
                                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) }]}>
                                        <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(12), color: GREY }]}>
                                            {moment(itemReply?.created).startOf('minute').fromNow()}
                                        </Text>
                                        {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // props.setCurrReplyComment(props?.item)
                                                    Alert.alert(
                                                        "Xác nhận",
                                                        "Bạn có chắc muốn xoá bình luận này?",
                                                        [
                                                            {
                                                                text: "Huỷ",
                                                                onPress: () => console.log("Cancel Pressed"),
                                                                style: "cancel"
                                                            },
                                                            { text: "Đồng ý", onPress: () => _confirmDeleteComment(itemReply) }
                                                        ],
                                                        { cancelable: false }
                                                    );
                                                }}
                                                style={{ paddingHorizontal: _moderateScale(8 * 2), alignSelf: 'flex-end' }}>
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                                                    Xoá
                                            </Text>
                                            </TouchableOpacity>
                                        </View> */}
                                    </View>

                                </View>
                            </View>
                        )
                    })
                }
                {/* {
                    !isEmpty(listMoreReplyComments) && props?.item?.commentsCount > 1 && props?.item?.commentsCount !== listMoreReplyComments.length ?
                        <TouchableOpacity
                            onPress={() => {
                                _getMoreReplyComment(listMoreReplyComments[listMoreReplyComments.length - 1]?._id)
                            }}
                        >
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                Xem thêm {`${props?.item?.commentsCount - listMoreReplyComments.length}`} bình luận khác
                                </Text>
                        </TouchableOpacity>
                        :
                        <>
                        </>
                } */}
                {/* <TouchableOpacity
                    onPress={() => {
                        _getMoreReplyComment(listMoreReplyComments[listMoreReplyComments.length - 1]?._id)
                    }}
                >
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                        Xem thêm {`${props?.item?.commentsCount - listMoreReplyComments.length}`} bình luận khác
                                </Text>
                </TouchableOpacity> */}

                {
                    props?.item?.commentsCount - listMoreReplyComments.length !== 0 ?
                        <TouchableOpacity
                            onPress={() => {
                                _getMoreReplyComment(listMoreReplyComments[listMoreReplyComments.length - 1]?._id)
                            }}
                        >
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                Xem thêm {`${props?.item?.commentsCount - listMoreReplyComments.length}`} bình luận khác
                                </Text>
                        </TouchableOpacity>
                        :
                        <>
                        </>
                }

                {/* {
                    !isEmpty(listMoreReplyComments) && listMoreReplyComments?.map((item, index) => {
                        return (
                            <Text>
                                {`item`}
                            </Text>
                        )
                    })
                } */}
                <View>

                </View>
            </View>

        </View>
    );
};



const styles = StyleSheet.create({
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
        // height: _moderateScale(45),
        backgroundColor: WHITE,
        paddingVertical: _moderateScale(8),
        borderTopStartRadius: _moderateScale(8),
        borderTopEndRadius: _moderateScale(8),
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8),
        borderTopEndRadius: _moderateScale(8),
        marginTop: _moderateScale(8 * 2),
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
 

export default memo(EachCommentPost);