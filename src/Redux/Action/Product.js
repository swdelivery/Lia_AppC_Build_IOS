import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Platform, Alert } from 'react-native';

export const getAllProductv2 = (params) => {

    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
        .join('&');

    return Axios.get(`${URL_FOR_PARTNER}/product?${query}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllProductv2: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllProductv2: err });
            _checkError(err)
            return err
        })
}

export const getAllProduct = () => {
    return async dispatch => {
        // dispatch({
        //     type: ActionType.LOADING_BEGIN,
        //     payload: {
        //         content: 'Đang tải...'
        //     }
        // })

        Axios.get(`${URL_FOR_PARTNER}/product/`,{
            params:{
                limit:5
            }
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllProduct: res.data.data });

                dispatch({
                    type: ActionType.SET_PRODUCT_HOME, 
                    payload: res.data.data
                })
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllProduct: err });

                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                _checkError(err)
            })
    } 
}


export const getDataProductFiles = (id, query) => {

    return Axios.get(`${URL_FOR_PARTNER}/product/${id}/files`, { 
        params: query 
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataProductFiles: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataProductFiles: error });
            return error
        })
}

export const getProductById = (id) => {
        
        return Axios.get(`${URL_FOR_PARTNER}/product/${id}`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getProductById: res });
                return res.data.data
            })
            .catch(error => {
                // _checkError(err)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getProductById: error.response });
                return error
            })
}

export const getServiceReviewByCode = (id, more = null) => {
    var params = {
        "condition": {
            "serviceCode":{
                "equal": id
            }
        },
        "sort": {
            "created": -1
        },
        "limit": 10,
        "page": 1
    };
    if(more !==null)
    {
        params.condition.after = more
    }

    return Axios.get(`${URL_FOR_PARTNER}/review/`,{params})
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