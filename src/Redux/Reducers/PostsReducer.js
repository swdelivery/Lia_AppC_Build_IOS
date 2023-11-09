import * as ActionType from "../Constants/ActionType";
import _findIndex from 'lodash/findIndex'
import _map from 'lodash/map'
import findIndex from "lodash/findIndex";


let initialState = {
    listPost: [],
    listPostSearch: [],
    countNewPost:0,
    currentPost: {},
    listCurrentCommentPost: [],
    listCurrentCommentChildPost: [],
    currentCommentPost: {},
    isFocusComment: false,
    isComment: false,
    scrollToComment: 0,
    isLastComment: false,
};

const PostsReducer = (state = initialState, action) => {
    switch (action.type) {

        //postSearch
        case ActionType.SET_LIST_POST_SEARCH:
            return {
                ...state,
                listPostSearch: action.payload
            }
        
        //list post search
        case ActionType.CREATE_LIST_POST_SEARCH:
            var tmp = [...state.listPostSearch]
            return {
                ...state,
                listPostSearch: [...tmp, ...action.payload]
            }

        //post
        case ActionType.SET_LIST_POST:
            return {
                ...state,
                listPost: action.payload
            }
       
        //count - post
        case ActionType.SET_NEW_POST:
            return {
                ...state,
                countNewPost: action.payload
            }
            
        //list post
        case ActionType.CREATE_LIST_POST:
            var tmp = [...state.listPost]
            return {
                ...state,
                listPost: [...tmp, ...action.payload]
            }
        
        case ActionType.UPDATE_LIST_POST:
            var tmp = [...state.listPost]
            var indexPost = findIndex(tmp,{_id: action.payload._id})
            if(indexPost>-1)
            {
                tmp[indexPost] = action.payload
                return {
                    ...state,
                    listPost: [...tmp]
                }
            }
            return {
                ...state
            }
    
        case ActionType.DELETE_LIST_POST:
                var tmp = [...state.listPost]
                
                console.log('indexPost', action.payload);
                return {
                    ...state,
                    listPost: [...tmp.filter(item=> item._id !== action.payload)]
                }
               
        
        //currentpost        
        case ActionType.SET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.payload
            }
        
        case ActionType.UPDATE_CURRENT_POST:
            if(action.payload._id === {...state.currentPost}?._id)
            {
                return {
                    ...state,
                    currentPost: {...action.payload}
                }
            }
            return {
                ...state
            }
    
        case ActionType.DELETE_CURRENT_POST:
            return {
                ...state,
                currentPost: {}
            }

        //current list comment
        case ActionType.SET_CURRENT_LIST_COMMENT:
            var tmp = [...action.payload]
            tmp = tmp.map(obj => {
                obj.listChild = []
                return obj
            })
            return {
                ...state,
                listCurrentCommentPost: tmp,
                isLastComment: false
            }

        case ActionType.CREATE_CURRENT_LIST_COMMENT:
            var listComment = [...state.listCurrentCommentPost]
            var tmp = [...action.payload]
            tmp.map(obj => ({ ...obj, listChild: [] }))
            return {
                ...state,
                listCurrentCommentPost: [...action.payload, ...listComment]
            }

        //    case ActionType.SET_CURRENT_LIST_COMMENT_CHILD: 
        //         return {
        //             ...state,
        //             listCurrentCommentChildPost:  action.payload
        //         }


        // case ActionType.CREATE_CURRENT_LIST_COMMENT_CHILD: 
        //     var listCommentChild = [...state.listCurrentCommentChildPost]
        //     if(action.payload.length>0)
        //     {
        //         var newData = _map(action.payload,'id')
        //         listCommentChild = listCommentChild.filter(item=>newData.indexOf(item.id)<0)
        //     } 
        //    return {
        //        ...state,
        //        listCurrentCommentChildPost: [...listCommentChild, ...action.payload]
        //    }

        case ActionType.UPDATE_REACTION_CURRENT_POST:
            console.log('UPDATE_REACTION_CURRENT_POST')
            var currentPost = { ...state.currentPost }
            if (currentPost?._id && currentPost?._id === action?.payload?.reaction?.postId) {
                currentPost.reactionCount = action.payload.countReaction
                if (currentPost.reaction === null) {
                    var reactStatic = [...currentPost?.reactionStatistics]
                    var indexStatic = _findIndex(reactStatic, { _id: action.payload?.reaction?.type })
                    if (indexStatic > -1) {
                        reactStatic[indexStatic].count = reactStatic[indexStatic].count + 1
                    }
                    else {
                        reactStatic.push({
                            _id: action.payload.reaction._id,
                            type: action.payload.reaction.type
                        })
                    }

                }
                else {
                    var reactStatic = [...currentPost?.reactionStatistics]
                    var indexStaticOld = _findIndex(reactStatic, { _id: currentPost?.reaction?.type })
                    var indexStatic = _findIndex(reactStatic, { _id: action.payload?.reaction?.type })

                    if (indexStaticOld > -1 && reactStatic.length >0) {
                        if (reactStatic[indexStaticOld]?.count === 1) {
                            reactStatic = reactStatic.filter((dt, index) => index !== indexStaticOld)
                        }
                        else {
                            reactStatic[indexStaticOld].count = reactStatic[indexStaticOld].count - 1
                        }
                    }

                    if (indexStatic > -1  && reactStatic.length >0) {
                        reactStatic[indexStatic].count = reactStatic[indexStatic].count + 1
                    }
                    else {
                        reactStatic.push({
                            _id: action.payload.reaction.type,
                            count: 1
                        })
                    }
                }
                currentPost.reaction = {
                    _id: action.payload.reaction._id,
                    type: action.payload.reaction.type
                }
                currentPost.reactionStatistics = reactStatic
                console.log({ currentPost });
                return {
                    ...state,
                    currentPost: currentPost
                }
            }
            return {
                ...state
            }

        case ActionType.UPDATE_REACTION_POST:
            var listPost = [...state.listPost]
            var indexExist = _findIndex(listPost, { _id: action.payload?.postId })

            if (indexExist > -1) {
                listPost[indexExist].reactionCount = action.payload.reactionCount
                listPost[indexExist].reaction = action.payload.reaction

                // if (listPost[indexExist]?.reaction === null) {
                //     var reactStatic = [...listPost[indexExist]?.reactionStatistics]
                //     var indexStatic = _findIndex(reactStatic, { _id: action.payload?.reaction?.type })
                //     if (indexStatic > -1) {
                //         reactStatic[indexStatic].count = reactStatic[indexStatic]?.count + 1
                //     }
                //     else {
                //         reactStatic.push({
                //             _id: action.payload.reaction._id,
                //             type: action.payload.reaction.type
                //         })
                //     }

                // }
                // else {
                //     var reactStatic = [...listPost[indexExist]?.reactionStatistics]
                //     var indexStaticOld = _findIndex(reactStatic, { _id: listPost[indexExist]?.reaction?.type })
                //     var indexStatic = _findIndex(reactStatic, { _id: action.payload?.reaction?.type })
                
                //     if (indexStaticOld > -1 && reactStatic?.length>0) {
                //         if (reactStatic[indexStaticOld]?.count === 1) {
                //             reactStatic = reactStatic.filter((dt, index) => index !== indexStaticOld)
                //         }
                //         else {
                //             reactStatic[indexStaticOld].count = reactStatic[indexStaticOld]?.count - 1
                //         }
                //     }

                //     if (indexStatic > -1 && reactStatic?.length>0) {
                //         reactStatic[indexStatic].count = reactStatic[indexStatic]?.count + 1
                //     }
                //     else {
                //         if(action.payload.reaction){
                //             reactStatic.push({
                //                 _id: action.payload.reaction.type,
                //                 count: 1
                //             })
                //         }
                //     }
                // }
                // if(action.payload.reaction){
                //     listPost[indexExist].reaction = {
                //         _id: action.payload.reaction._id,
                //         type: action.payload.reaction.type
                //     }
                // } else {
                //     listPost[indexExist].reaction = null
                // }

                listPost[indexExist].reactionStatistics = action.payload.reactionStatistics
                return {
                    ...state,
                    listPost: listPost
                }
            }
            return {
                ...state
            }
    
        case ActionType.UPDATE_REACTION_POST_SEARCH:
            var listPost = [...state.listPostSearch]
            var indexExist = _findIndex(listPost, { _id: action.payload?.postId })

            if (indexExist > -1) {
                listPost[indexExist].reactionCount = action.payload.reactionCount
                listPost[indexExist].reaction = action.payload.reaction
                listPost[indexExist].reactionStatistics = action.payload.reactionStatistics
                return {
                    ...state,
                    listPostSearch: listPost
                }
            }
            return {
                ...state
            }

        case ActionType.UPDATE_CURRENT_LIST_COMMENT:
            var listComment = [...state.listCurrentCommentPost]
            var indexExist = _findIndex(listComment, { id: action.payload.id })
            if (indexExist > -1) {
                listComment[indexExist] = action.payload
                return {
                    ...state,
                    listCurrentCommentPost: listComment
                }
            }
            return {
                ...state
            }

        case ActionType.DELETE_CURRENT_LIST_COMMENT:
            var listComment = [...state.listCurrentCommentPost]
            var indexExist = _findIndex(listComment, { id: action.payload })
            if (indexExist > -1) {
                return {
                    ...state,
                    listCurrentCommentPost: listComment.filter(item => item.id !== action.payload)
                }
            }

            return {
                ...state
            }

        //comment child

        case ActionType.SET_CURRENT_LIST_COMMENT_CHILD:
            var listComment = [...state.listCurrentCommentPost]
            if (action.payload.length > 0) {
                var tmpInd = listComment.findIndex(item => item.id === action.payload[0]?.parentId)
                if (tmpInd > -1) {
                    listComment[tmpInd].listChild = action.payload
                }
            }
            return {
                ...state,
                listCurrentCommentPost: [...listComment]
            }

        case ActionType.CREATE_CURRENT_LIST_COMMENT_CHILD:
            var listComment = [...state.listCurrentCommentPost]


            if (action.payload.length > 0) {
                var tmpInd = listComment.findIndex(item => item.id === action.payload[0]?.parentId)
                if (tmpInd > -1) {
                    listComment[tmpInd].commentCounts = listComment[tmpInd].commentCounts + action.payload.length
                    if (listComment[tmpInd]?.listChild?.length > 0) {
                        listComment[tmpInd].listChild = [...action.payload, ...listComment[tmpInd]?.listChild]
                    }
                    else {
                        listComment[tmpInd].listChild = action.payload;
                    }

                }
            }

            return {
                ...state,
                listCurrentCommentPost: listComment,
            }

        case ActionType.UPDATE_CURRENT_LIST_COMMENT_CHILD:
            var listComment = [...state.listCurrentCommentPost]
            var tmpInd = listComment.findIndex(item => item.id === action.payload?.parentId)

            if (tmpInd > -1) {
                var listChild = [...listComment[tmpInd]?.listChild]
                var indexExist = _findIndex(listChild, { id: action.payload.id })
                if (indexExist > -1) {
                    listChild[indexExist] = action.payload
                    listComment[tmpInd].listChild = listChild
                    return {
                        ...state,
                        listCurrentCommentPost: listComment
                    }
                }
            }

            return {
                ...state
            }

        case ActionType.DELETE_CURRENT_LIST_COMMENT_CHILD:
            var listComment = [...state.listCurrentCommentPost]
            var tmpInd = listComment.findIndex(item => item.id === action.payload?.parentId)
            if (tmpInd > -1) {
                var listChild = [...listComment[tmpInd]?.listChild]
                if (listChild.length > 0) {
                    listComment[tmpInd].listChild = listChild.filter(item => item.id !== action.payload?.id)
                    return {
                        ...state,
                        listCurrentCommentPost: listComment
                    }
                }
            }

            return {
                ...state
            }

        //currentComment

        case ActionType.SET_CURRENT_POST_COMMENT:
            return {
                ...state,
                currentCommentPost: action.payload
            }

        case ActionType.SET_IS_FOCUS_COMMENT:
            return {
                ...state,
                isFocusComment: action.payload
            }

        case ActionType.SET_SCROLLTO_COMMENT:
            return {
                ...state,
                scrollToComment: action.payload
            }

        case ActionType.SET_IS_COMMENT:
            return {
                ...state,
                isComment: action.payload
            }

        case ActionType.SET_IS_LAST_COMMENT:
            return {
                ...state,
                isLastComment: action.payload
            }

        default:
            return state;
    }
};

export default PostsReducer;
