import React, { memo, useState, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native';
import { BASE_COLOR, BG_GREY_OPACITY_3, BLACK_OPACITY_8, BLUE_TITLE, GREY, GREY_FOR_TITLE, RED, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch,useSelector } from 'react-redux';
import { createPostComment } from '../../../Redux/Action/PostAction';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { sizeIcon } from '../../../Constant/Icon';
import { SET_CURRENT_POST, SET_CURRENT_POST_COMMENT, SET_IS_COMMENT, SET_IS_FOCUS_COMMENT } from '../../../Redux/Constants/ActionType';

const ActionComment = memo((props) => {
     const dispatch = useDispatch()

    const currentPostRedux = useSelector(state => state.postReducer?.currentPost)
    const currentCommentPostRedux = useSelector(state => state.postReducer?.currentCommentPost)
    const inputRef = useRef(null);

    const createSchema = yup.object().shape({
        content: yup.string().required('Vui lòng nhập nội dung'),
    });
    
    const { handleSubmit, values, errors, touched, setFieldTouched, isValid, setFieldValue } = useFormik({
        validationSchema: createSchema,
        initialValues: {
            content: '',
        },
        onSubmit: values => _handleComment(values.content)
        // alert(`Email: ${values.email}, Password: ${values.password}`)
    });

    const _handleComment = (content) =>{
        var data = {
            "content": content,
            "postId": currentPostRedux?._id,
        }
        if(currentCommentPostRedux?.id)
        {
            data.parentId = currentCommentPostRedux?.id
        }
        dispatch(createPostComment(data))
        setFieldValue('content', '')
        inputRef.current.blur()
    }

    const _handleCancelReply = () =>{
        dispatch({
            type: SET_CURRENT_POST_COMMENT,
            payload: {}
        })
    }
    const _handleIsFocus = (val) =>{
        dispatch({
            type: SET_IS_FOCUS_COMMENT,
            payload: val
        })
        if(val === false)
        {
            dispatch({
                type: SET_IS_COMMENT,
                payload: false
            })
        }
       
    }

    return (
        <>
          {currentCommentPostRedux?.id?
            <View style={styles.replyFor}>
                <View style={styles.replyForTitle}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <Text style={{...stylesFont.fontNolan, color:GREY_FOR_TITLE,
                        fontSize: _moderateScale(12)}}>{`Đang trả lời cho`}</Text>
                        <Text style={{...stylesFont.fontNolanBold,
                        color: BLUE_TITLE,
                        marginLeft: _moderateScale(4),
                        fontSize: _moderateScale(12)}}>{currentCommentPostRedux?.partner?.name}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={_handleCancelReply}
                    >
                        <Image
                        style={sizeIcon.xxxs}
                        source={require('../../../Icon/cancel.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.replyForContent}>
                    <Text 
                    style={{...stylesFont.fontNolan,
                        fontSize: _moderateScale(10)}}
                    numberOfLines={1} ellipsizeMode="tail">
                        {currentCommentPostRedux?.content}
                    </Text>
                </View>
            </View>
            :<></>}

    <View style={styles.container}>
        <View style={[styles.input,(errors?.content&&touched?.content)&&styles.error]}>
            <TextInput style={[styles.textFeed]
            }
            ref={inputRef}
            value={values?.content}
            // multiline={true}
            placeholder={`Bình luận của bạn...`}
            onFocus={() => {
                _handleIsFocus(true)
                setFieldTouched('content')}
            }
            onBlur={() => {
                _handleIsFocus(false)
                setFieldTouched('content',false)
            }}
            onChangeText={value => setFieldValue('content', value)}
            />
        </View>
        <TouchableOpacity
        onPress={()=>{
            isValid?handleSubmit():console.log('error')
        }}
         style={[styles.sendBtn]}>
            {isValid?
            <Image
            style={[styles.iconSend]}
            source={require('../../../Icon/a_send.png')}
            /> :
            <Image
            style={[styles.iconSend]}
            source={require('../../../Icon/i_send.png')}
            /> 
            }
        </TouchableOpacity>
    </View>
  
    </>
    );
    })

const styles = StyleSheet.create({
    container:{
        backgroundColor: WHITE,
        paddingTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(8*2),
        // paddingBottom: _moderateScale(24),
        flexDirection:'row',
        paddingBottom: (getBottomSpace() + _heightScale(12)),
    },
    replyFor:{
        backgroundColor: WHITE,
        marginTop:_moderateScale(1),
        paddingTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(8*2),
    },
    replyForTitle:{
        flexDirection:'row',
    },
    replyForContent:{
        borderLeftWidth: _moderateScale(4),
        borderColor: BASE_COLOR,
        paddingLeft: _moderateScale(4),
        marginTop:_moderateScale(2)
    },
    sendBtn:{
        width: _moderateScale(32), 
        height: _moderateScale(32),
        justifyContent:'center',
        marginLeft: _moderateScale(4)
    },
    iconSend:{
        width: _moderateScale(24), 
        height: _moderateScale(24), 
        transform: [{ rotate: '45deg'}]
    },
    input: {
        flex: 1,
        fontSize: _widthScale(14),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_3,
        backgroundColor: BG_GREY_OPACITY_3,
        color: BLACK_OPACITY_8,
        borderRadius: _moderateScale(24),
        minHeight: _moderateScale(8*4),
        paddingHorizontal: _moderateScale(8*2),
        paddingVertical: _moderateScale(4)
    },
    error:{
        borderColor: BASE_COLOR
    },
    textFeed:{
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolan,
        flex:1,
        bottom:1
    }
    })

export default ActionComment;