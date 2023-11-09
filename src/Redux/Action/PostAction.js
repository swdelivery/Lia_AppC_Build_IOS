import Axios from 'axios';
import { isArray, isEmpty } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Platform, Alert } from 'react-native';

export const getAllPost = (params, setRefreshing, setFlagLoadMorePost, _handlePage) => {
    return async dispatch => {
     
        Axios.get(`${URL_FOR_PARTNER}/partner-post/`,{params})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllPost: res });

                dispatch({
                    type: ActionType.SET_LIST_POST, 
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.SET_NEW_POST,
                    payload: 0,
                    })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadMorePost) {
                    setFlagLoadMorePost(false)
                }
                _handlePage(res?.data?.meta?.page, res?.data?.meta?.totalPage)

                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllPost: err });


                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadMorePost) {
                    setFlagLoadMorePost(true)
                }

                _checkError(err)
            })
    } 
}

export const getMoreAllPost = (params, setRefreshing, setFlagLoadMorePost, _handlePage) => {


    return async dispatch => {
     
        Axios.get(`${URL_FOR_PARTNER}/partner-post/`,{params})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getMoreAllPost: res });

                dispatch({
                    type: ActionType.CREATE_LIST_POST, 
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadMorePost) {
                    setFlagLoadMorePost(false)
                }
                _handlePage(res?.data?.meta?.page, res?.data?.meta?.totalPage)

                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getMoreAllPost: err });


                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadMorePost) {
                    setFlagLoadMorePost(true)
                }

                _checkError(err)
            })
    } 
}


export const getAllPostSearch = (params, setRefreshing, setFlagLoadMorePost, _handlePage) => {
    
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
        .join('&');

    return async dispatch => {
     
        Axios.get(`${URL_FOR_PARTNER}/partner-post?${query}`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllPostSearch: res });

                dispatch({
                    type: ActionType.SET_LIST_POST_SEARCH, 
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadMorePost) {
                    setFlagLoadMorePost(false)
                }
                _handlePage(res?.data?.meta?.page, res?.data?.meta?.totalPage)

                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllPostSearch: err });


                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadMorePost) {
                    setFlagLoadMorePost(true)
                }

                _checkError(err)
            })
    } 
}

export const getMoreAllPostSearch = (params, setRefreshing, setFlagLoadMorePost, _handlePage) => {


    return async dispatch => {
     
        Axios.get(`${URL_FOR_PARTNER}/partner-post/`,{params})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getMoreAllPostSearch: res });

                dispatch({
                    type: ActionType.CREATE_LIST_POST_SEARCH, 
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadMorePost) {
                    setFlagLoadMorePost(false)
                }
                _handlePage(res?.data?.meta?.page, res?.data?.meta?.totalPage)

                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getMoreAllPostSearch: err });


                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadMorePost) {
                    setFlagLoadMorePost(true)
                }

                _checkError(err)
            })
    } 
}

export const getPostSearchSuggestion  = (code) => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-post-suggestion-search?searchKey=${code}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPostSearchSuggestion: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPostSearchSuggestion: err });
            _checkError(err)
            return err
        })
}


export const getPartnerPostFile = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-post-file`,{
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerPostFile: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerPostFile: err });
            _checkError(err)
            return err
        })
}


export const getUserById = (userId) => {

    return Axios.get(`${URL_FOR_PARTNER}/partners/${userId}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getUserById: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getUserById: err });
            _checkError(err)
            return err
        })
}

export const getPartnerPostByIdUser = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-post`,{
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerPostByIdUser: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerPostByIdUser: err });
            _checkError(err)
            return err
        })
}

export const getMinePartnerPost = () => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-post/mine`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getMinePartnerPost: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getMinePartnerPost: err });
            _checkError(err)
            return err
        })
}


export const getPostByIdv2 = (id) => {
        

    return Axios.get(`${URL_FOR_PARTNER}/partner-post/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPostByIdv2: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPostByIdv2: err });
            _checkError(err)
            return err
        })
}

export const getPostById = (id) => {
    return async dispatch => {
        // dispatch({
        //     type: ActionType.LOADING_BEGIN,
        //     payload: {
        //         content: 'Đang tải...'
        //     }
        // })

        Axios.get(`${URL_FOR_PARTNER}/partner-post/${id}`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPostById: res.data.data });

                dispatch({
                    type: ActionType.SET_CURRENT_POST, 
                    payload: res.data.data
                })
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPostById: err });

                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                _checkError(err)
            })
    } 
}

export const getCommentsByPostId = (params, idPost) => {

        return  Axios.get(`${URL_FOR_PARTNER}/partner-post-comment/post/${idPost}`,{params})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCommentsByPostId: res });
                return res
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCommentsByPostId: err });

                _checkError(err)
                return err
            })
}

export const getCommentsChildById = (params, idPost) => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-post-comment/post/${idPost}`,{params})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCommentsChildById: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCommentsChildById: err });
            _checkError(err)
            return err
        })
}

export const getAllPostComment = (params, idPost) => {
    return async dispatch => {
        // dispatch({
        //     type: ActionType.LOADING_BEGIN,
        //     payload: {
        //         content: 'Đang tải...'
        //     }
        // })

        Axios.get(`${URL_FOR_PARTNER}/partner-post-comment/post/${idPost}`,{params})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllPostComment: res });

                dispatch({
                    type: ActionType.SET_CURRENT_LIST_COMMENT, 
                    payload: res.data.data
                })
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllPostComment: err });

                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                _checkError(err)
            })
    } 
}


export const getAllPostCommentMore = (params, idPost) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang tải...'
            }
        })

        Axios.get(`${URL_FOR_PARTNER}/partner-post-comment/post/${idPost}`,{params})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllPostCommentMore: res.data.data });

                dispatch({
                    type: ActionType.CREATE_CURRENT_LIST_COMMENT, 
                    payload: res.data.data
                })

                if(res?.data?.data?.length<10)
                {
                    dispatch({
                        type: ActionType.SET_IS_LAST_COMMENT,
                        payload: true
                    })
                }
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllPostCommentMore: err });

                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkError(err)
            })
    } 
}

export const getAllPostCommentChild = (params, idPost) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang tải...'
            }
        })

        Axios.get(`${URL_FOR_PARTNER}/partner-post-comment/post/${idPost}`,{params})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllPostCommentChild: res.data.data });

                dispatch({
                    type: ActionType.SET_CURRENT_LIST_COMMENT_CHILD, 
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllPostCommentChild: err });

                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkError(err)
            })
    } 
}

export const createPost = (data) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang tạo bài viết...'
            }
        })
        Axios.post(`${URL_FOR_PARTNER}/partner-post`,data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPost: res });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkSuccess(res)
                
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPost: err });

                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkError(err)
            })
        }
}


export const updatePostv2 = (id,data) => {
    // dispatch({
    //     type: ActionType.LOADING_BEGIN,
    //     payload: {
    //         content: 'Đang tạo bài viết...'
    //     }
    // })
    return  Axios.put(`${URL_FOR_PARTNER}/partner-post/${id}`,data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updatePostv2: res});
            // dispatch({
            //     type: ActionType.LOADING_DONE,
            //     payload: null
            // })
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updatePostv2: err });

            // dispatch({
            //     type: ActionType.LOADING_DONE,
            //     payload: null
            // })
            _checkError(err)
            return err
        })
}

export const updatePost = (id,data) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang tạo bài viết...'
            }
        })
        Axios.put(`${URL_FOR_PARTNER}/partner-post/${id}`,data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updatePost: res.data.data });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkSuccess(res)
                
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updatePost: err });

                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkError(err)
            })
        }
}

export const createPostCommentv2 = (data) => {

      return  Axios.post(`${URL_FOR_PARTNER}/partner-post-comment`,data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPostCommentv2: res });
                return res
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPostCommentv2: err });
                _checkError(err)
                return err
            })
}

export const createPostComment = (data) => {
    return async dispatch => {

        Axios.post(`${URL_FOR_PARTNER}/partner-post-comment`,data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPostComment: res.data.data });
               
               
                // if(!isEmpty(res.data.data?.parentId))
                // {
                //     dispatch({
                //         type: ActionType.CREATE_CURRENT_LIST_COMMENT_CHILD,
                //         payload: [res.data.data]
                //     })
                // }
                // else
                // {
                //     dispatch({
                //         type: ActionType.SET_IS_COMMENT,
                //         payload: true
                //     })
                //     dispatch({
                //         type: ActionType.CREATE_CURRENT_LIST_COMMENT,
                //         payload: [res.data.data]
                //     })
                // }
               
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPostComment: err });
               
                _checkError(err)
            })
        }
}

export const updateCommentPost = (data, idPost) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang cập nhật bình luận...'
            }
        })
        Axios.put(`${URL_FOR_PARTNER}/partner-post-comment/${idPost}`,data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updateCommentPost: res.data.data });
                // if(isEmpty(res?.data?.data?.parentId))
                // {
                //     dispatch({
                //         type: ActionType.UPDATE_CURRENT_LIST_COMMENT,
                //         payload: res?.data?.data
                //     })
                // }
                // else
                // {
                //     dispatch({
                //         type: ActionType.UPDATE_CURRENT_LIST_COMMENT_CHILD,
                //         payload: res?.data?.data
                //     })
                // }
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                // _checkSuccess(res) 
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updateCommentPost: err });

                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkError(err)
            })
        }
}

export const deleteCommentPost = (idPost, parentId) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang cập nhật bình luận...'
            }
        })
        Axios.delete(`${URL_FOR_PARTNER}/partner-post-comment/${idPost}`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { deleteCommentPost: res.data.data });
                // if(isEmpty(parentId))
                // {
                //     dispatch({
                //         type: ActionType.DELETE_CURRENT_LIST_COMMENT,
                //         payload: res?.data?.data.length>0?res?.data?.data[0]:''
                //     })
                // }
                // else
                // {
                //     dispatch({
                //         type: ActionType.DELETE_CURRENT_LIST_COMMENT_CHILD,
                //         payload: {parentId, id: res?.data?.data.length>0?res?.data?.data[0]:''}
                //     })
                // }
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                // _checkSuccess(res) 
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { deleteCommentPost: err });

                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkError(err)
            })
        }
}



export const deletePost = (idPost) => {
    return  Axios.delete(`${URL_FOR_PARTNER}/partner-post/${idPost}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { deletePost: res });
          
                _checkSuccess(res) 
                return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { deletePost: err });

            _checkError(err)
            return err
        })
}

export const addReactionPost = (data) => {
        
      return  Axios.post(`${URL_FOR_PARTNER}/partner-post-reaction`,data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { addReactionPost: res });
                return res
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { addReactionPost: err });
                _checkError(err)
                return err
            })
}

export const createPostReaction = (data, isSearch) => {
    return async dispatch => {
        
        Axios.post(`${URL_FOR_PARTNER}/partner-post-reaction`,data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPostReaction: res.data.data });
                    if(res?.data?.data){
                        dispatch({
                            type: ActionType.UPDATE_REACTION_POST,
                            payload: {
                                ...res.data.data,
                                postId:data?.postId
                            } ,
                        })
                        if(isSearch===true)
                        {
                            dispatch({
                                type: ActionType.UPDATE_REACTION_POST_SEARCH,
                                payload: {
                                    ...res.data.data,
                                    postId:data?.postId
                                } ,
                            })
                        }
                        // dispatch({
                        //     type: ActionType.UPDATE_REACTION_CURRENT_POST,
                        //     payload: {
                        //         ...res.data.data ,
                        //         postId:data?.postId
                        //     }
                        // })
                    }
              
                // _checkSuccess(res) 
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPostReaction: err });
                _checkError(err)
            })
        }
}



const _checkError = (err) => {


    if (err?.message == 'Network Error') {
        return Alert.alert(
            "Lỗi",
            "Không có kết nối mạng",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }
    if (err?.response?.data?.message) {
        if (err?.response?.data?.data?.modules) {
            if (isArray(err?.response?.data?.data?.actions)) {
                return Alert.alert(
                    "Lỗi",
                    `${err?.response?.data?.message} {${err?.response?.data?.data?.modules}- ${err?.response?.data?.data?.actions?.map(item => item)}}`,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }

            return Alert.alert(
                "Lỗi",
                `${err?.response?.data?.message} {${err?.response?.data?.data?.modules}- ${err?.response?.data?.data?.actions}}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }

        return Alert.alert(
            "Lỗi",
            `${err?.response?.data?.message}`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    return Alert.alert(
        "Lỗi", 
        `${JSON.stringify(err?.response?.data?.error)}`,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
}

const _checkSuccess = (succ) => {
    if (succ?.data?.message) {
        return Alert.alert(
            "Thông báo",
            `${succ?.data?.message}`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

}