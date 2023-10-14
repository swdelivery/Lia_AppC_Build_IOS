import React, { memo, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_COLOR, BG_GREY_OPACITY_5, GREY } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { likePost } from '../../../Redux/Action/PostAction';



const BtnComtLike = (props) => {
    const dispatch = useDispatch()

    const [loadingLikePost, setLoadingLikePost] = useState(false)

    const infoUserRedux = useSelector(state => state.infoUserReducer)  


    const _confirmLikePost = () => { 
        setLoadingLikePost(true)
        dispatch(likePost({
            postId: props?.postId,
            isLike: props?.likerIdArr?.find(itemFind => itemFind == infoUserRedux.infoUser._id) ? false : true
        }, setLoadingLikePost))
    }

    return (
        <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(8), borderTopWidth: _moderateScale(0.5), borderTopColor: BG_GREY_OPACITY_5, borderBottomWidth: _moderateScale(0.5), borderBottomColor: BG_GREY_OPACITY_5, flex: 1, justifyContent: 'space-between' }]}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    _confirmLikePost()
                }}
                style={[styleElement.rowAliCenter, { width: _widthScale(8 * 15), justifyContent: 'center' }]}>
                {
                    loadingLikePost ?
                        <>
                            <ActivityIndicator color={GREY} size={'small'} />
                        </>
                        :
                        <>
                            {
                                props?.likerIdArr?.find(itemFind => itemFind == infoUserRedux.infoUser._id) ?
                                    <Image
                                        style={[sizeIcon.lg, { opacity: 0.9 }]}
                                        source={require('../../../Icon/a_like.png')} />
                                    :
                                    <Image
                                        style={[sizeIcon.lg]}
                                        source={require('../../../Icon/i_like.png')} />
                            }
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(8), color: GREY },
                            props?.likerIdArr?.find(itemFind => itemFind == infoUserRedux.infoUser._id) ? [stylesFont.fontNolanBold, { color: BASE_COLOR }] : {}
                            ]}>
                                {`Thích`}
                            </Text>
                        </>
                }
            </TouchableOpacity>


            <TouchableOpacity

                onPress={() => {
                    props.refTextInput()
                }}
                style={[styleElement.rowAliCenter, { width: _widthScale(8 * 15), justifyContent: 'center' }]}>
                <Image
                    style={[sizeIcon.md]}
                    source={require('../../../Icon/i_comment.png')} />
                <Text style={[stylesFont.fontNolan500, { marginBottom: _moderateScale(4), fontSize: _moderateScale(14), marginLeft: _moderateScale(8), color: GREY }]}>
                    Bình luận
                </Text>
            </TouchableOpacity>
        </View>
    );
}



export default memo(BtnComtLike)