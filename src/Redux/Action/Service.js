import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Platform, Alert } from 'react-native';


export const getAllService = () => {
    return async dispatch => {
        // dispatch({
        //     type: ActionType.LOADING_BEGIN,
        //     payload: {
        //         content: 'Đang tải...'
        //     }
        // })

        Axios.get(`${URL_FOR_PARTNER}/service/`, {
            params: {
                sort: {
                    orderNumber: -1
                },
                limit: 5
            }
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllService: res });

                dispatch({
                    type: ActionType.SET_SERVICE_HOME,
                    payload: res.data.data
                })
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllService: res.response });

                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                _checkError(err)
            })
    }
}



export const _getServiceShareTemplate = (_id) => {

    // var esc = encodeURIComponent;
    // var query = Object.keys(params)
    //     .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
    //     .join('&');

    return Axios.get(`${URL_FOR_PARTNER}/service/${_id}/share-template`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServiceShareTemplate: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServiceShareTemplate: error });
            return error
        })
}

export const getDataSuggestionSearch = (key) => {

    // var esc = encodeURIComponent;
    // var query = Object.keys(params)
    //     .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
    //     .join('&');

    return Axios.get(`${URL_FOR_PARTNER}/suggestion-search?searchKey=${key}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataSuggestionSearch: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataSuggestionSearch: error });
            return error
        })
}

export const getServicev2 = (params) => {

    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
        .join('&');

    return Axios.get(`${URL_FOR_PARTNER}/service?${query}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServicev2: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServicev2: error });
            return error
        })
}


export const getServiceProperties = (id, query) => {

    return Axios.get(`${URL_FOR_PARTNER}/service/${id}/properties`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServiceProperties: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServiceProperties: error });
            return error
        })
}


export const getDataServiceFiles = (id, query) => {

    return Axios.get(`${URL_FOR_PARTNER}/service/${id}/files`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataServiceFiles: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataServiceFiles: error });
            return error
        })
}

export const getServiceById = (id) => {

    return Axios.get(`${URL_FOR_PARTNER}/service/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServiceById: res });
            return res.data.data
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServiceById: error.response });
            return error
        })
}

export const getQuestion = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/question-answer/`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getQA: res });
            return res.data.data
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getQA: error.response });
            return error
        })
}

export const getServiceReviewByCodev2 = (id, more = null) => {
    var params = {
        "condition": {
            "serviceCode": {
                "equal": id
            }
        },
        "sort": {
            "created": -1
        },
        "limit": 20,
        "page": 1
    };
    if (more !== null) {
        params.condition.after = more
    }

    console.log(params)
    return Axios.get(`${URL_FOR_PARTNER}/review/`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServiceReviewByCode: res });
            return res
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServiceReviewByCode: error.response });
            return error
        })
}

export const getServiceReviewByCode = (id, more = null) => {
    var params = {
        "condition": {
            "serviceCode": {
                "equal": id
            }
        },
        "sort": {
            "created": -1
        },
        "limit": 100,
        "page": 1
    };
    if (more !== null) {
        params.condition.after = more
    }

    console.log(params)
    return Axios.get(`${URL_FOR_PARTNER}/review/`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServiceReviewByCode: res });
            return res.data.data
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServiceReviewByCode: error.response });
            return error
        })
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