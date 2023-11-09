import { difference, flatten, isEqual } from 'lodash-es';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BLUE_FB, WHITE } from '../../../Constant/Color';
import { _moderateScale } from '../../../Constant/Scale';
import { isEmpty, randomStringFixLengthCode } from '../../../Constant/Utils';
import { getAllPostComment, getAllPostCommentChild, getAllPostCommentMore } from '../../../Redux/Action/PostAction';
import ActionComment from './ActionComment';
import ItemComment from './ItemComment';
import ItemCommen1 from './ItemComment1'
import * as ActionType from "../../../Redux/Constants/ActionType";

const ListComment = memo(function ListComment(props) {
    const dispatch = useDispatch()
    const currentPostRedux = useSelector(state => state.postReducer?.currentPost)
    const isLastCommentRedux = useSelector(state => state.postReducer?.isLastComment)

    const currentListCommentRedux = useSelector(state => state.postReducer?.listCurrentCommentPost)
    const listCurrentCommentPostChildRedux = useSelector(state => state.postReducer?.listCurrentCommentChildPost)
    const [listChild, setListChild] = useState(false)
 
    useEffect(() => {
        if (currentPostRedux?._id) {
            let condition = {
                "condition": {
                    "parentId": {
                        "equal": null
                    }
                },
                "sort": {
                    "created": -1
                },
                "limit": 10,
                "page": 1
            }
            dispatch(getAllPostComment(
                condition, currentPostRedux?._id
            ))
        }
    }, [])

    const _handleLoadCommentMore = () =>{
        let condition = {
            "condition": {
                "parentId": {
                    "equal": null
                },
                "after": currentListCommentRedux[currentListCommentRedux.length-1]?._id
            },
            "sort": {
                "created": -1
            },
            "limit": 10,
            "page": 1
        }
        dispatch(getAllPostCommentMore(
            condition, currentPostRedux?._id
        ))
    }

    return (
        <>
            <View 
             onLayout={event => {
                const layout = event.nativeEvent.layout;
                
                dispatch({
                    type: ActionType.SET_SCROLLTO_COMMENT,
                    payload: layout.y
                })
              }}
            style={[styles.listComment]}>
                {
                    currentListCommentRedux?.map((res, index) => {
                        return res.parentId === null &&
                            <>
                                <ItemComment data={res} postId={currentPostRedux?._id}
                                key={res.id} />
                                {res.commentsCount > 0 && res?.listChild?.length > 0 ?
                                    res?.listChild?.map((itm, index) => {
                                        return <ItemComment data={itm}
                                            isMore={res?.listChild.length < currentPostRedux.commentsCount ? true : false}
                                            postId={currentPostRedux?._id} key={itm.id} type='child' />
                                    })
                                    : <></>}
                            </>
                    })
                }
                {currentListCommentRedux.length>0&&isLastCommentRedux===false?<TouchableOpacity
                onPress={()=>_handleLoadCommentMore()}
                >
                    <Text style={{ alignSelf: 'center', fontSize: _moderateScale(13), color: BLUE_FB }}>Tải thêm</Text>
                </TouchableOpacity>:<></>}
            </View>
          
        </>
    )
})
const styles = StyleSheet.create({
    ///-----start comment -----//
    listComment: {
        flex: 1,
        paddingVertical: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(8 * 2)
    }
    ///-----end comment-----//
})
export default ListComment
