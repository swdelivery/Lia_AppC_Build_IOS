import AsyncStorage from '@react-native-community/async-storage';
import { isEmpty } from 'lodash-es';
import io from 'socket.io-client/dist/socket.io';
import { navigation } from './rootNavigation';
import { URL_ORIGINAL } from './src/Constant/Url';
import * as ActionType from './src/Redux/Constants/ActionType';
import Store from './src/Redux/Store';
import {
    SSC_NOTIFICATION,
    SSC_ONLINE_USERS, SSC_PARTNER_MESSAGE_UPDATE, SSC_PARTNER_NOTIFICATION_CREATE, SSC_PARTNER_SEEN_MESSAGE, SSC_SEND_NEW_MESSAGE, SSC_USER_CONNECT,
    SSC_USER_DISCONNECT,
    SSC_USER_SEEN_MESSAGE,
    SSC_USER_WITHDRAW_MESSAGE,
    SSC_PARTNER_POST_COMMENT_CREATE,
    SSC_PARTNER_POST_COMMENT_UPDATE,
    SSC_PARTNER_POST_COMMENT_DELETE,
    SSC_PARTNER_POST_CREATE,
    SSC_PARTNER_POST_UPDATE,
    SSC_PARTNER_POST_DELETE
} from './src/Sockets/type';

export default class SocketInstance {
    static instance = null;
    static socketConn = null;
    static online = false;

    static getInstance() {
        if (SocketInstance.instance === null) {
            SocketInstance.instance = new SocketInstance();
            SocketInstance.getSocket();
        }
        return this.instance;
    }

    static async getSocket() {
        if (SocketInstance.socketConn === null) {
            let tokenSTR = await AsyncStorage.getItem('token')
            // SocketInstance.socketConn = io.connect(URL_ORIGINAL, { forceNew: true });

            SocketInstance.socketConn = io(`${URL_ORIGINAL}/cs-app`,
                {
                    query: {
                        accessToken: tokenSTR
                    },
                    transports: ['websocket'],
                })

            // const handshake = {
            //     username: results.username,
            //     client: results.client,
            //     database: [{ last_updated_time: new Date(), table_name: 'TODO-later' }]
            // };
            SocketInstance.socketConn.on('connect', () => {
                console.log({ SOCKET: `----SOCKET CONNECT SUCCESS---`, navigation: navigation })
                // if (navigation.checkRoute().name == ScreenKey.CHATTING) {
                //     navigation.reset()
                // } 
                // alert('new connect')
                // SocketInstance.socketConn.emit('*', handshake);
                SocketInstance.online = true;
            });


            SocketInstance.socketConn.on(SSC_ONLINE_USERS, (data) => {
                // console.log({
                //     SOCKET: `----LIST_USER_ONLINE---`,
                //     data
                // })
                Store.dispatch({
                    type: ActionType.SAVE_LIST_USERS_ONLINE,
                    payload: {
                        data: data
                    }
                })
            });
            SocketInstance.socketConn.on(SSC_USER_CONNECT, (data) => {
                console.log({
                    SOCKET: `----NEW_USER_CONNECT---`,
                    data
                })
                Store.dispatch({
                    type: ActionType.NEW_USER_ONLINE,
                    payload: {
                        data: data
                    }
                })
            });
            SocketInstance.socketConn.on(SSC_USER_DISCONNECT, (data) => {
                console.log({
                    SOCKET: `----NEW_USER_DIS_CONNECT---`,
                    data
                })
                Store.dispatch({
                    type: ActionType.NEW_USER_OFFLINE,
                    payload: {
                        data: data.userId
                    }
                })
            });

            // NEW


            SocketInstance.socketConn.on(SSC_PARTNER_MESSAGE_UPDATE, (data) => {
                console.log({
                    SOCKET: `----SSC_PARTNER_MESSAGE_UPDATE---`,
                    data
                })

                Store.dispatch({
                    type: ActionType.UPDATE_SPECIFIC_MESSAGE,
                    payload: {
                        data: data
                    }
                })
            })

            SocketInstance.socketConn.on(SSC_SEND_NEW_MESSAGE, (data) => {
                console.log({
                    SOCKET: `----SOCKET_NEW_MESSAGE---`,
                    data
                })

                Store.dispatch({
                    type: ActionType.GET_NEW_MESSAGE,
                    payload: {
                        data: data
                    }
                })
            })

            // ON SEEN MEESSAGE 
            SocketInstance.socketConn.on(SSC_USER_SEEN_MESSAGE, (data) => {
                console.log({
                    SOCKET: `----NEW_USER_SEEN_MESSAGE---`,
                    data
                })
                Store.dispatch({
                    type: ActionType.UPDATE_VIEWER_MESSAGE,
                    payload: {
                        data: data
                    }
                })
            })
            SocketInstance.socketConn.on(SSC_PARTNER_SEEN_MESSAGE, (data) => {
                console.log({
                    SOCKET: `----SSC_PARTNER_SEEN_MESSAGE---`,
                    data
                })
                Store.dispatch({
                    type: ActionType.UPDATE_VIEWER_MESSAGE,
                    payload: {
                        data: data
                    }
                })
            })
            SocketInstance.socketConn.on(SSC_PARTNER_NOTIFICATION_CREATE, (data) => {
                console.log({
                    SOCKET: `----SSC_PARTNER_NOTIFICATION_CREATE---`,
                    data
                })
                Store.dispatch({
                    type: ActionType.ADD_NEW_PARTNER_NOTI,
                    payload: {
                        data: data
                    }
                })
            })

            SocketInstance.socketConn.on(SSC_USER_WITHDRAW_MESSAGE, (data) => {
                console.log({
                    SOCKET: `----NEW_MESSAGE_HAS_REMOVE_MESSAGE---`,
                    data
                })
                // if (data.data.user.userId == GlobalStore.infoUserId) return
                // alert(data.data.user.userId)
                Store.dispatch({
                    type: ActionType.UPDATE_STATUS_ACTIVE_MESSAGE,
                    payload: {
                        data: data
                    }
                })
                // Store.dispatch({
                //     type: ActionType.NEW_USER_SEEN_MESSAGE,
                //     payload: {
                //         data: data
                //     }
                // })
            })



         

            SocketInstance.socketConn.on(SSC_NOTIFICATION, (data) => {
                console.log({
                    SOCKET: `----NEW_NOTIFICATION---`,
                    data
                })
                if (data.notification.moduleName == "TASK") {
                    Store.dispatch({
                        type: ActionType.NEW_NOTIFICATION_HAS_COME_FOR_TASK,
                        payload: {
                            data: data.notification
                        }
                    })
                }
                if (data.notification.moduleName == "POST") {
                    Store.dispatch({
                        type: ActionType.NEW_NOTIFICATION_HAS_COME_FOR_POST,
                        payload: {
                            data: data.notification
                        }
                    })
                }

            })
          

            SocketInstance.socketConn.on(SSC_PARTNER_POST_COMMENT_CREATE, (data) => {
                console.log({SOCKET: `----SSC_PARTNER_POST_COMMENT_CREATE---`})
                
                const stateRedux = Store.getState()
                let currentPost = stateRedux?.postReducer?.currentPost

                if(currentPost?._id === data?.comment?.postId)
                {

                    if(!isEmpty(data.comment?.parentId))
                    {
                        Store.dispatch({
                            type: ActionType.CREATE_CURRENT_LIST_COMMENT_CHILD,
                            payload: [data.comment]
                        })
                    }
                    else
                    {
                        Store.dispatch({
                            type: ActionType.SET_IS_COMMENT,
                            payload: true
                        })
                        Store.dispatch({
                            type: ActionType.CREATE_CURRENT_LIST_COMMENT,
                            payload: [data.comment]
                        })
                    }

                }
            })

            SocketInstance.socketConn.on(SSC_PARTNER_POST_COMMENT_UPDATE, (data) => {
                console.log({SOCKET: `----SSC_PARTNER_POST_COMMENT_UPDATE---`})

                const stateRedux = Store.getState()
                let currentPost = stateRedux?.postReducer?.currentPost

                if(currentPost?._id === data?.comment?.postId)
                {
                    if(isEmpty(data?.comment?.parentId))
                    {
                        Store.dispatch({
                            type: ActionType.UPDATE_CURRENT_LIST_COMMENT,
                            payload: data?.comment
                        })
                    }
                    else
                    {
                        Store.dispatch({
                            type: ActionType.UPDATE_CURRENT_LIST_COMMENT_CHILD,
                            payload: data?.comment
                        })
                    }
                }

            })

            SocketInstance.socketConn.on(SSC_PARTNER_POST_COMMENT_DELETE, (data) => {
                console.log({SOCKET: `----SSC_PARTNER_POST_COMMENT_DELETE---`,data})

                const stateRedux = Store.getState()
                let currentPost = stateRedux?.postReducer?.currentPost

                if(currentPost?._id === data?.comment?.postId)
                {
                    if(isEmpty(data?.comment?.parentId))
                    {
                        Store.dispatch({
                            type: ActionType.DELETE_CURRENT_LIST_COMMENT,
                            payload: data?.comment?.id
                        })
                    }
                    else
                    {
                        Store.dispatch({
                            type: ActionType.DELETE_CURRENT_LIST_COMMENT_CHILD,
                            payload: {parentId: data?.comment?.parentId, id: data?.comment?.id}
                        })
                    }
                }

            })

            SocketInstance.socketConn.on(SSC_PARTNER_POST_CREATE, (data) => {
                console.log({SOCKET: `----SSC_PARTNER_POST_CREATE---`,data})
                
                const stateRedux = Store.getState()
                const countNew = stateRedux.postReducer?.countNewPost

                Store.dispatch({
                                type: ActionType.SET_NEW_POST,
                                payload: countNew + 1,
                                })

            })

            SocketInstance.socketConn.on(SSC_PARTNER_POST_UPDATE, (data) => {
                console.log({SOCKET: `----SSC_PARTNER_POST_UPDATE---`,data})
                const stateRedux = Store.getState()
                const currentPost = stateRedux?.postReducer?.currentPost

                if(currentPost?._id === data?.post?._id)
                {
                    Store.dispatch({
                        type: ActionType.UPDATE_CURRENT_POST,
                        payload: data.post,
                        })
                }

                Store.dispatch({
                    type: ActionType.UPDATE_LIST_POST,
                    payload: data.post,
                    })
            })

            SocketInstance.socketConn.on(SSC_PARTNER_POST_DELETE, (data) => {
                console.log({SOCKET: `----SSC_PARTNER_POST_DELETE---`,data})

                const stateRedux = Store.getState()
                const currentPost = stateRedux?.postReducer?.currentPost

                if(currentPost?._id === data?.post?._id)
                {
                    Store.dispatch({
                        type: ActionType.DELETE_CURRENT_POST,
                        payload: {},
                        })
                }

                Store.dispatch({
                    type: ActionType.DELETE_LIST_POST,
                    payload: data.post?._id,
                    })
            })


            SocketInstance.socketConn.on('disconnect', () => {
                console.warn('--socket disconnected in shared instance--');
                // alert('dosconenenen')
                // SocketInstance.instance = null;
                // SocketInstance.socketConn.disconnect();
                // SocketInstance.socketConn = null
                SocketInstance.online = false;
            });
        }
        return this.socketConn;
    }

    // listen(message, func) {
    //     if (SocketInstance.socketConn !== null) {
    //         SocketInstance.socketConn.on(message, (data) => {
    //             func(data);
    //         });
    //     } else {
    //         SocketInstance.getSocket();
    //     }
    // }


    send(message, data) {
        if (SocketInstance.socketConn !== null) {
            SocketInstance.socketConn.emit(message, data);
        } else {
            SocketInstance.getSocket();
        }
    }


    // isOnline() {
    //     if (SocketInstance.socketConn !== null) {
    //         if (SocketInstance.socketConn.connected === false) {
    //             SocketInstance.getSocket();
    //         }
    //         return SocketInstance.socketConn.connected;
    //     } else {
    //         SocketInstance.getSocket();
    //         return false;
    //     }
    // }
}