import * as ActionType from '../Constants/ActionType'
import Axios from 'axios'
import {  URL_ORIGINAL, URL_FOR_PARTNER } from '../../Constant/Url';
import { Alert } from 'react-native';
import isArray from 'lodash/isArray'
import { useLogStyle, setLogStyle } from './LogConfig';


export const getMoreLastedMessage = (props, setLoadingMoreMessage) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/chat-message/get-latest-messages`, {
            params: {
                lastMessageId: props
            }
        })
            .then(res => {
                console.log({ ...res });

                dispatch({
                    type: ActionType.UPDATE_LIST_LASTED_MESSAGES,
                    payload: {
                        data: res.data.data
                    }
                })
                if (setLoadingMoreMessage) {
                    setLoadingMoreMessage(false)
                }
                // if (props) {
                //     props(false)
                // }
            })
            .catch(err => {
                console.log({ ...err });
                // if (props) {
                //     props(false)
                // }
                if (setLoadingMoreMessage) {
                    setLoadingMoreMessage(false)
                }
                if (err.response) {
                    setTimeout(() => {

                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const removeMessage = (_idMessageForRemove) => {

    return async dispatch => {
        Axios.post(`${URL_ORIGINAL}/api/chat-message/withdraw-message`, { messageId: _idMessageForRemove })
            .then(res => {
                console.log({ ...res });

                // dispatch({
                //     type: ActionType.UPDATE_LIST_LASTED_MESSAGES,
                //     payload: {
                //         data: res.data.data
                //     }
                // })
            })
            .catch(err => {
                console.log({ ...err });

                if (err.response) {
                    setTimeout(() => {

                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}


export const getLastedMessage = (query) => {

    return async dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/partner-conversation`, {
            params: query
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getLastedMessage: res });
                dispatch({
                    type: ActionType.SET_LIST_LASTED_MESSAGES,
                    payload: {
                        data: res.data.data
                    }
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getLastedMessage: err });
                _checkError(err)
            })
    }
}

export const getNewMessage = (props) => {
    console.log('getnew-----');

    return {
        type: ActionType.GET_NEW_MESSAGE,
        payload: {
            data: props
        }
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
    // console.log(succ);


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