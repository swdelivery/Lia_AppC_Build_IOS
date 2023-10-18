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

        Axios.get(`${URL_FOR_PARTNER}/service/`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllService: res });

                dispatch({
                    type: ActionType.SET_SERVICE,
                    payload: res.data.data
                })
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                //_checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllService: res });

                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                _checkError(err)
            })
    }
}


export const getPartnerByCollaboratorCode = (params) => {
 
        return Axios.get(`${URL_FOR_PARTNER}/partners/get-by-collaborator-code`,{
            params: params
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerByCollaboratorCode: res });
                return res
            })
            .catch(error => {
                // _checkError(err)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerByCollaboratorCode: error });
                return error
            })
}

export const removeAccount = (idPartner) => {
 
        return Axios.delete(`${URL_FOR_PARTNER}/partner-account/${idPartner}`,{})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { removeAccount: res });
                return res
            })
            .catch(error => {
                _checkError(error)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { removeAccount: error });
                return error
            })
}

export const checkCollaboratorRelationship = (params) => {
 
        return Axios.get(`${URL_FOR_PARTNER}/booking/check-before-create`,{
            params: params
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { checkCollaboratorRelationship: res });
                return res
            })
            .catch(error => {
                // _checkError(err)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { checkCollaboratorRelationship: error });
                return error
            })
}

export const getHealthRecord = () => {
 
        return Axios.get(`${URL_FOR_PARTNER}/partners/health-record`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getHealthRecord: res });
                return res.data.data
            })
            .catch(error => {
                // _checkError(err)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getHealthRecord: error.response });
                return error
            })
}

export const updateHealthRecord = (data) => {
 
    return Axios.put(`${URL_FOR_PARTNER}/partners/update-health-record`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updateHealthRecordsss: res });
            _checkSuccess(res)
            return res.data.data
        })
        .catch(error => {
             _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updateHealthRecord: error });
            return error
        })
}

export const updateProfilePartner = (data) => {
 
    return async dispatch => {

    return Axios.put(`${URL_FOR_PARTNER}/partners`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updateProfilePartner: res });
            _checkSuccess(res)
            dispatch({ type: ActionType.SAVE_INFO_USER, payload: { data: res.data.data } })
            // return res.data.data
        })
        .catch(error => {
             _checkError(error) 
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updateProfilePartner: error.response });
            // return error
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