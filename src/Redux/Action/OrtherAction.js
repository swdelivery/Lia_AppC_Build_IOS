import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Platform, Alert } from 'react-native';
import {isEmpty as _isEmpty} from 'lodash'


export const getAssetsGroup = (condition=null) => {
    if(condition===null)
    {
    //   type: "value",
    //   code: "value",
    //   name: "value",
    //   codeGroup: "array"
        condition={
            "condition": {
                'type':{
                    'equal':'desire'
                },
                'isActive':{
                    'equal':'true'
                }
            },
            "sort": {
                "created": 1
            },
            "limit": 100,
            "page": 1
        }
    }
    return async dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/asset-group/`,{params:condition})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAssetsGroup: res });

                dispatch({
                    type: ActionType.SET_ASSET_GROUP, 
                    payload: res.data.data
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAssetsGroup: res.response });

                _checkError(err)
            })
    }
}


export const createVideoRequest = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/video-call-request`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createVideoRequest: res });
            setTimeout(() => {
                _checkSuccess(res)
            }, 500);
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createVideoRequest: err });
            _checkError(err)
            return err
        })
}

export const getServiceMaterials = (_id) => {
    return Axios.get(`${URL_FOR_PARTNER}/service/${_id}/materials`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServiceMaterials: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServiceMaterials: err });
            _checkError(err)
            return err
        })
}


export const getAssets = (condition = null) => {
        if(condition===null)
        {
        //   type: "value",
        //   code: "value",
        //   name: "value",
        //   codeGroup: "array"
            condition={
                "condition": {
                    // 'type':{
                    //     'equal':'desire'
                    // }
                },
                "sort": {
                    "created": 1
                },
                "limit": 100,
                "page": 1
            }
        }
        return async dispatch => {
             Axios.get(`${URL_FOR_PARTNER}/asset`,{params:condition})
                .then(res => {
                    console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAssets: res });
                    if (!_isEmpty(res?.data?.data)) {
                        dispatch({
                            type: ActionType.SET_ASSET, 
                            payload: res.data.data
                        })
                    }
                })
                .catch(error => {
                     _checkError(error)
                    console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAssets: error });
                })
        }
}


export const getConfigData = (code) => {

    return Axios.get(`${URL_FOR_PARTNER}/configuration-data/get-by-code?code=${code}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getConfigData: res});
            return res.data.data
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getConfigData: error});
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