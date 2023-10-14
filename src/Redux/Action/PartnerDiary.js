import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Platform, Alert } from 'react-native';

export const getPartnerDiary = (condition) => {

    return async dispatch => {
       
         Axios.get(`${URL_FOR_PARTNER}/partner-diary/`, { params: condition })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerDiary: res.data.data });
                dispatch({
                    type: ActionType.SET_LIST_PARTNER_DIARY,
                    payload: res.data.data
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerDiary: res.response });
                _checkError(err)
            })
    }
}

export const createPartnerDiary = (data) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang cập nhật...'
            }
        })
        Axios.post(`${URL_FOR_PARTNER}/partner-diary/`, data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPartnerDiary: res.data.data });
                dispatch({
                    type: ActionType.CREATE_PARNERT_DIARY,
                    payload: [res.data.data]
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
                _checkSuccess(res)
            })
            .catch(error => {
                _checkError(error)
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPartnerDiary: error });
                return error
            })
    }
}


export const updatePartnerDailyDiaryv2 = (id, data) => {
       
    return Axios.put(`${URL_FOR_PARTNER}/partner-daily-diary/${id}`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updatePartnerDailyDiaryv2: res });
            // _checkSuccess(res)
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updatePartnerDailyDiaryv2: error.response });
            return error
        })
}

export const updatePartnerDiaryv2 = (id, data) => {
       
    return Axios.put(`${URL_FOR_PARTNER}/partner-diary/${id}`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updatePartnerDiaryv2: res });
            // _checkSuccess(res)
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updatePartnerDiaryv2: error.response });
            return error
        })
}

export const updatePartnerDiary = (id, data) => {
    console.log('updatePartnerDiary', id, data)
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang cập nhật...'
            }
        })
        Axios.put(`${URL_FOR_PARTNER}/partner-diary/${id}`, data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updatePartnerDiary: res });
                dispatch({
                    type: 'SET_CURRENT_PARTNER_DIARY', 
                    payload: res.data.data
                })
                dispatch({
                    type: 'UPDATE_LIST_PARTNER_DIARY', 
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
                _checkSuccess(res)
            })
            .catch(error => {
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
                _checkError(error)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updatePartnerDiary: error.response });
                return error
            })
    }
}


export const deletePartnerDiaryDailyv2 = (idDailyDiary) => {
    return Axios.delete(`${URL_FOR_PARTNER}/partner-daily-diary/${idDailyDiary}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { deletePartnerDiaryDailyv2: res.data.data });
            _checkSuccess(res)
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { deletePartnerDiaryDailyv2: error });
            return error
        })
}

export const createPartnerDiaryDailyv2 = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/partner-daily-diary/`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPartnerDiaryDailyv2: res });
            _checkSuccess(res)
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPartnerDiaryDailyv2: error });
            return error
        })
}


export const createPartnerDiaryDaily = (data) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang cập nhật...'
            }
        })
        Axios.post(`${URL_FOR_PARTNER}/partner-daily-diary/`, data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPartnerDiaryDaily: res.data.data });
                dispatch({
                    type: ActionType.CREATE_PARNERT_DIARY_DAILY,
                    payload: [res.data.data]
                })
                dispatch({
                    type:'UPDATE_PARNERT_DIARY_DAILY_IN_LIST',
                    payload: [res.data.data]
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
                _checkSuccess(res)
            })
            .catch(error => {
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
                _checkError(error)

                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPartnerDiaryDaily: error });
                return error
            })
    }
}

export const updatePartnerDiaryDaily = (id, data) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang cập nhật...'
            }
        })
        Axios.put(`${URL_FOR_PARTNER}/partner-daily-diary/${id}`, data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updatePartnerDiaryDaily: res.data.data });
                dispatch({
                    type: ActionType.UPDATE_PARNERT_DIARY_DAILY,
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
                _checkSuccess(res)
            })
            .catch(error => {
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
                _checkError(err)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updatePartnerDiaryDaily: error.response });
                // return error
            })
    }
}


export const getPartnerDiaryDailyByIdv2 = (id) => {
      
    return Axios.get(`${URL_FOR_PARTNER}/partner-diary/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerDiaryDailyByIdv2: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerDiaryDailyByIdv2: err });
            _checkError(err)
            return err
        })
}

export const getPartnerDiaryDailyById = (id) => {
    return async dispatch => {
        // dispatch({
        //     type: ActionType.LOADING_BEGIN,
        //     payload: {
        //         content: 'Đang tải...'
        //     }
        // })
        Axios.get(`${URL_FOR_PARTNER}/partner-diary/${id}`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerDiaryDailyById: res });
                dispatch({
                    type: ActionType.SET_CURRENT_PARTNER_DIARY_DAILY,
                    payload: res.data.data?.dailyDiaryArr
                })
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: {
                //         content: null
                //     }
                // })

            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerDiaryDailyById: err });
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: {
                //         content: null
                //     }
                // })
                _checkError(err)
            })
    }
}

export const getPartnerDiaryById = (id) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang tải...'
            }
        })
        Axios.get(`${URL_FOR_PARTNER}/partner-diary/${id}`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerDiaryDailyById: res });
                dispatch({
                    type: ActionType.SET_CURRENT_PARTNER_DIARY,
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })

            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerDiaryDailyById: err });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: {
                        content: null
                    }
                })
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