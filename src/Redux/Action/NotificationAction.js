import * as ActionType from '../Constants/ActionType'
import Axios from 'axios'
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../Constant/Url';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { Platform, Alert } from 'react-native';
import { navigation, dispatch } from '../../../rootNavigation';
import { isEmpty, isArray } from 'lodash'
import { useLogStyle, setLogStyle } from './LogConfig';


export const setShowModalAllNotifi = (props) => {
    return {
        type: ActionType.SHOW_LIST_ALL_NOTI,
        payload: {
            data: true
        }
    }
}

export const partnerReadNotification = (data) => {
    return dispatch => {
        Axios.post(`${URL_FOR_PARTNER}/partner-notification/view`, data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { partnerReadNotification: res });

                dispatch({
                    type: ActionType.UPDATE_SEEN_LIST_NOTI,
                    payload: {
                        data: res.data.data,
                    }
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { partnerReadNotification: err });
                _checkError(err)
                return err
            })
    }

}

export const getNotificationForPartner = (query) => {
    return dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/partner-notification`, {
            params: query
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getNotificationForPartner: res });
                // setTimeout(() => {
                //     _checkSuccess(res)
                // }, 500);
                // return res
                dispatch({
                    type: ActionType.SAVE_LIST_NOTI,
                    payload: {
                        data: res.data.data,
                    }
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getNotificationForPartner: err });
                _checkError(err)
                return err
            })
    }

}

export const getNotificationForPartnerV2 = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-notification`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getNotificationForPartnerV2: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getNotificationForPartnerV2: err });
            _checkError(err)
            return err
        })

}

export const readNotifiTask = (data) => {
    return async dispatch => {
        Axios.post(`${URL_ORIGINAL}/api/notification/view`, data)
            .then(res => {
                console.log({ notification: res });
                dispatch({
                    type: ActionType.UPDATE_VIEWER_NOTIFI_TASK,
                    payload: {
                        data: res.data.data[0],
                    }
                })
            })
            .catch(err => {
                console.log({ ...err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const readNotifiPost = (data) => {
    return async dispatch => {
        Axios.post(`${URL_ORIGINAL}/api/notification/view`, data)
            .then(res => {
                console.log({ notification: res });
                dispatch({
                    type: ActionType.UPDATE_VIEWER_NOTIFI_POST,
                    payload: {
                        data: res.data.data[0],
                    }
                })
            })
            .catch(err => {
                console.log({ ...err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const getAllMyNotifications = (lastNotificationId = null, moduleName) => {


    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/notification/mine`, {
            params: {
                lastNotificationId: lastNotificationId,
                moduleName: moduleName
            }
        })
            .then(res => {
                console.log({ notification: res });
                if (moduleName == 'TASK') {
                    dispatch({
                        type: ActionType.SET_NOTIFICATION_FOR_TASK,
                        payload: {
                            data: res.data.data,
                        }
                    })
                }
                if (moduleName == 'POST') {
                    dispatch({
                        type: ActionType.SET_NOTIFICATION_FOR_POST,
                        payload: {
                            data: res.data.data,
                        }
                    })
                }
            })
            .catch(err => {
                console.log({ ...err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
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