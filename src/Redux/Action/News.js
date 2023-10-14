import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Platform, Alert } from 'react-native';



export const getHightlightNews = (params, type) => {

    return Axios.get(`${URL_FOR_PARTNER}/news/`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getHightlightNews: res });

            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getHightlightNews: res.response });
            _checkError(err)
            return err
        })
}

export const getEncyclopediaByID = (id) => {

    return Axios.get(`${URL_FOR_PARTNER}/encyclopedia/${id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getEncyclopediaByID: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getEncyclopediaByID: err });
            _checkError(err)
            return err
        })
}

export const getEncyclopedia = (params, type) => {

    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
        .join('&');

    return Axios.get(`${URL_FOR_PARTNER}/encyclopedia?${query}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getEncyclopedia: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getEncyclopedia: err });
            _checkError(err)
            return err
        })
}

export const getAllNewsv2 = (params, type) => {


    return Axios.get(`${URL_FOR_PARTNER}/news/`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllNewsv2: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllNewsv2: err });
            _checkError(err)
            return err
        })
}

export const getAllNews = (params, type) => {
    return async dispatch => {
        // dispatch({
        //     type: ActionType.LOADING_BEGIN,
        //     payload: {
        //         content: 'Đang tải...'
        //     }
        // })

        Axios.get(`${URL_FOR_PARTNER}/news/`, { params })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllNews: res });

                if (type === 'home') {
                    dispatch({
                        type: ActionType.SET_NEWS_HOME,
                        payload: res.data.data
                    })
                }
                else {
                    dispatch({
                        type: ActionType.SET_LIST_NEWS,
                        payload: res.data.data
                    })
                }
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllNews: res.response });

                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                _checkError(err)
            })
    }
}


export const getDataNewsFiles = (id, query) => {

    return Axios.get(`${URL_FOR_PARTNER}/news/${id}/files`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataNewsFiles: res });
            return res
        })
        .catch(error => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataNewsFiles: error });
            return error
        })
}

export const getNewsById = (id) => {

    return Axios.get(`${URL_FOR_PARTNER}/news/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getNewsById: res });
            return res.data.data
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getNewsById: error.response });
            return error
        })
}

export const getNewsReviewByCode = (id, more = null) => {
    var params = {
        "condition": {
            "newsCode": {
                "equal": id
            }
        },
        "sort": {
            "created": -1
        },
        "limit": 10,
        "page": 1
    };
    if (more !== null) {
        params.condition.after = more
    }

    console.log(params)
    return Axios.get(`${URL_FOR_PARTNER}/review/`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getNewsReviewByCode: res });
            return res.data.data
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getNewsReviewByCode: error.response });
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