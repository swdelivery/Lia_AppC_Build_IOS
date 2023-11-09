import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View ,TouchableOpacity} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_COLOR, BG_GREY_OPACITY, BG_GREY_OPACITY_5, GREY, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { confirmCommentPost } from '../../Redux/Action/PostAction';



const ReplyCommentPost = props => {
    let flatListRef = useRef(null);

    const dispatch = useDispatch()
    const postsRedux = useSelector(state => state.postReducer) 


    const [currTextComment, setCurrTextComment] = useState('')

    useEffect(() => {


    }, [])

    const _renderComment = ({ item, index }) => {
        return (
            <View style={[styles.comment]}>
                <Image
                    style={[styles.comment__avatar]}
                    source={{ uri: item?.userCreate?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${item?.userCreate?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                />
                <View style={{ flex: 1, marginLeft: _moderateScale(8 * 0.5) }}>
                    <View style={styles.comment__nameAndContent}>
                        <Text style={[stylesFont.fontNolan500, styles.comment__nameAndContent__name]}>
                            {`${item?.userCreate?.profile?.firstName} ${item?.userCreate?.profile?.lastName}`}
                        </Text>
                        <Text style={[stylesFont.fontNolan, styles.comment__nameAndContent__content]}>
                            {item.content}
                        </Text>
                    </View>

                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) }]}>
                        <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(12), color: GREY }]}>
                            {moment(item?.created).startOf('minute').fromNow()}
                        </Text>
                        <TouchableOpacity
                        style={{paddingHorizontal:_moderateScale(8*2)}}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                                Trả lời
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
    const _comfirmSendComment = () => {
        if (isEmpty(currTextComment.trim())) {
            return alert("Vui lòng nhập bình luận")
        }
        dispatch(confirmCommentPost({
            postId: props?.route?.params?.postId,
            content: currTextComment
        }))

    }




    return (

        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS == 'ios' && getBottomSpace() == 0 ? _heightScale(16) : 0} behavior={Platform.OS == 'ios' ? 'padding' : null} style={{
            flexGrow: 1
        }}>
            <View style={[styles.container]}>
                <View style={[styles.header, shadow]}>
                    <Text>
                        Bình luận
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={ref => flatListRef = ref}
                        // onEndReachedThreshold={0.1}
                        // onLayout={() => flatListRef.scrollToEnd()}
                        contentContainerStyle={{ flexGrow: 1 }}
                        // data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                        data={!isEmpty(postsRedux?.currSeeCommentPost?.data) ? postsRedux?.currSeeCommentPost?.data : []}
                        renderItem={_renderComment}
                        keyExtractor={(item, index) => `${index}`}
                    // onEndReached={() => {
                    //     setIsLoadingMessage(true)
                    //     let x = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
                    //     setMessages([...messages, ...x])
                    //     setIsLoadingMessage(false)
                    // }}
                    // onEndReached={() => {
                    //     _onLoadMoreMessages()
                    // }}
                    // ListFooterComponent={() => {

                    //     if (flagLoadmoreMessage) {
                    //         return (
                    //             <ActivityIndicator
                    //                 style={{ color: '#000' }}
                    //             />
                    //         )
                    //     } else {
                    //         return null
                    //     }
                    // }}
                    />
                </View>


                <View style={{
                    width: _width, paddingVertical: _heightScale(12),
                    paddingBottom: (getBottomSpace() + _heightScale(12)),
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: WHITE
                }}>
                    <TouchableOpacity onPress={() => {
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
                            <Image
                                style={[sizeIcon.llg]}
                                source={require('../../Icon/send.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
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



export default ReplyCommentPost;