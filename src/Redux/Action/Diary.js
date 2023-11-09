import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Platform, Alert } from 'react-native';

export const getServiceDiaryGuide = (_id) => {
           
    return Axios.get(`${URL_FOR_PARTNER}/service/${_id}/diary-guide`,{})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServiceDiaryGuide: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServiceDiaryGuide: err });
            _checkError(err)
            return err
        })
}

export const getListDiaryByType = (params) => {
           
    return Axios.get(`${URL_FOR_PARTNER}/partner-diary/shared`,{
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListDiaryByType: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListDiaryByType: err });
            _checkError(err)
            return err
        })
}

export const getPartnerDiaryByIdv2 = (id) => {
           
    return Axios.get(`${URL_FOR_PARTNER}/partner-diary/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerDiaryByIdv2: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerDiaryByIdv2: err });
            _checkError(err)
            return err
        })
}

export const getPartnerDiaryv2 = (params) => {
           
    return Axios.get(`${URL_FOR_PARTNER}/partner-diary/`,{params: params})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerDiaryv2: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerDiaryv2: err });
            _checkError(err)
            return err
        })
}

export const getListTreatmentDiary = (condition) => {
    // const condition = {
            // "limit": 10,
            // "page": 1
        
    //   }
    return async dispatch => {
            dispatch({
                type: ActionType.LOADING_BEGIN,
                payload: {
                    content: 'Đang tải...'
                }
            })
        Axios.get(`${URL_FOR_PARTNER}/treatment-diary/`,{params: condition})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListTreatmentDiary: res.data.data });

                dispatch({
                    type: ActionType.SET_LIST_TREATMENT_DIARY, 
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListTreatmentDiary: res.response });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkError(err)
            })
    }
}

export const getListTreatmentDiaryByService = (idService) => {
    // const condition = {
    //     partnerId: "value",
    //     treatmentDetailId: "value",
    //     serviceCode: "value",
    //     serviceName: "value",
    //     serviceCodeGroup: "value",
    //     isActive: "value",
    //     startDate: "date",
    //     created: "date",
    //   }
    return async dispatch => {
            dispatch({
                type: ActionType.LOADING_BEGIN,
                payload: {
                    content: 'Đang tải...'
                }
            })
        Axios.get(`${URL_FOR_PARTNER}/service/${idService}/treatment-diary/`,{params: condition})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListTreatmentDiary: res.data.data });

                dispatch({
                    type: ActionType.SET_LIST_TREATMENT_DIARY_SERVICE, 
                    payload: res.data.data
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListTreatmentDiary: res.response });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                _checkError(err)
            })
    }
}


export const getTreatmentDiaryIncompleteDaily = () => {
    return Axios.get(`${URL_FOR_PARTNER}/treatment-diary/incomplete-daily`) 
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getTreatmentDiaryIncompleteDaily: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getTreatmentDiaryIncompleteDaily: error });
            return error
        })
}

export const getTreatmentDiaryByTreatmentDetail = (id) => {
    return async dispatch => {  
        Axios.get(`${URL_FOR_PARTNER}/treatment-diary/treatment-detail/${id}`) 
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getTreatmentDiaryByTreatmentDetail: res });
                dispatch({
                    type: ActionType.SET_CURRENT_TREATMENT_DIARY,  
                    payload: res.data.data
                })
            })
            .catch(error => {
                _checkError(error)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getTreatmentDiaryByTreatmentDetail: error.response });
            })
        }
}

export const getTreatmentDiaryById = (id) => {
    return async dispatch => {  
        Axios.get(`${URL_FOR_PARTNER}/treatment-diary/${id}`) 
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getTreatmentDiaryById: res.data.data });
                dispatch({
                    type: ActionType.SET_CURRENT_TREATMENT_DIARY,  
                    payload: res.data.data
                })
            })
            .catch(error => {
                _checkError(error)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getTreatmentDiaryById: error.response });
            })
        }
}


export const updateDailyDiaryv2 = (id, data) => {
    return Axios.put(`${URL_FOR_PARTNER}/daily-diary/${id}`,data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updateDailyDiaryv2: res });
            // dispatch({
            //     type: ActionType.UPDATE_CURRENT_TREATMENT_DIARY, 
            //     payload: res.data.data
            // })
            _checkSuccess(res)
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updateDailyDiaryv2: error.response });
            return error
        })
}

export const getPartnerDiaryByEntityId = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/treatment-diary/entity/${id}`,{})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerDiaryByEntityId: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerDiaryByEntityId: error.response });
            return error
        })
}

export const updateDailyDiary = (id, data) => {
    return async dispatch => {
        Axios.put(`${URL_FOR_PARTNER}/daily-diary/${id}`,data)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updateDailyDiary: res});
                dispatch({
                    type: ActionType.UPDATE_CURRENT_TREATMENT_DIARY, 
                    payload: res.data.data
                })
                // _checkSuccess(res)
            })
            .catch(error => {
                _checkError(error)
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updateDailyDiary: error.response });
                return error
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