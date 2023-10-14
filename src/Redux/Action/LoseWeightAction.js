import Axios from 'axios';
import isArray from 'lodash/isArray';
import { Alert } from 'react-native';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';


export const getAssetsLoseWeight = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/asset`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAssetsLoseWeight: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAssetsLoseWeight: err });
            _checkError(err)
            return err
        })
}

export const updatePartnerWaterGoal = (data) => {
    return Axios.put(`${URL_FOR_PARTNER}/partner-water-goal`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updatePartnerWaterGoal: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updatePartnerWaterGoal: err });
            _checkError(err)
            return err
        })
}

export const getCurrPartnerWeightGoal = (data) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-weight-goal/current`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCurrPartnerWeightGoal: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCurrPartnerWeightGoal: err });
            _checkError(err)
            return err
        })
}

export const createPartnerWeightGoal = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/partner-weight-goal`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPartnerWeightGoal: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPartnerWeightGoal: err });
            _checkError(err)
            return err
        })
}

export const removePartnerActivityMenu = (id) => {
    return Axios.delete(`${URL_FOR_PARTNER}/partner-activity/${id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { removePartnerActivityMenu: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { removePartnerActivityMenu: err });
            _checkError(err)
            return err
        })
}

export const getDataPartnerActivity = (query) => {
    return dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/partner-activity`, {
            params: query
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataPartnerActivity: res });
                dispatch({
                    type: ActionType.SET_DATA_MENU_ACTIVITY,
                    payload: {
                        data: res?.data?.data
                    }
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataPartnerActivity: err });
                _checkError(err)
            })
    }
}

export const addPartnerActivityToMenu = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/partner-activity`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { addPartnerActivityToMenu: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { addPartnerActivityToMenu: err });
            _checkError(err)
            return err
        })
}

export const getListAllDataRecentActivity = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/activity/recent`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListAllDataRecentActivity: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListAllDataRecentActivity: err });
            _checkError(err)
            return err
        })
}

export const getListAllDataActivity = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/activity`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListAllDataActivity: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListAllDataActivity: err });
            _checkError(err)
            return err
        })
}


export const createActivity = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/activity`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createActivity: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createActivity: err });
            _checkError(err)
            return err
        })
}

export const createFood = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/food`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createFood: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createFood: err });
            _checkError(err)
            return err
        })
}

export const getAssetGroup = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/asset-group`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAssetGroup: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAssetGroup: err });
            _checkError(err)
            return err
        })
}

export const removePartnerFoodMenu = (id) => {
    return Axios.delete(`${URL_FOR_PARTNER}/partner-food/${id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { removePartnerFoodMenu: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { removePartnerFoodMenu: err });
            _checkError(err)
            return err
        })
}

export const addPartnerFoodToMenu = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/partner-food`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { addPartnerFoodToMenu: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { addPartnerFoodToMenu: err });
            _checkError(err)
            return err
        })
}

export const getListAllDataRecentFood = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/food/recent`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListAllDataRecentFood: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListAllDataRecentFood: err });
            _checkError(err)
            return err
        })
}

export const getListAllDataFood = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/food`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListAllDataFood: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListAllDataFood: err });
            _checkError(err)
            return err
        })
}

export const getDataPartnerFood = (query) => {
    return dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/partner-food`, {
            params: query
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataPartnerFood: res });
                dispatch({
                    type: ActionType.SET_DATA_MENU_FOOD,
                    payload: {
                        data: res?.data?.data
                    }
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataPartnerFood: err });
                _checkError(err)
            })
    }
}

export const getRecentPartnerTrackingWeightNotDispatch = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-tracking-weight/recent`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getRecentPartnerTrackingWeightNotDispatch: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getRecentPartnerTrackingWeightNotDispatch: err });
            _checkError(err)
            return err
        })
}

export const getOnePartnerTrackingWeightNotDispatch = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-tracking-weight/find-one`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getOnePartnerTrackingWeightNotDispatch: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getOnePartnerTrackingWeightNotDispatch: err });
            _checkError(err)
            return err
        })
}
export const getOnePartnerTrackingWeight = (query) => {
    return dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/partner-tracking-weight/find-one`, {
            params: query
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getOnePartnerTrackingWeight: res });
                dispatch({
                    type: ActionType.SET_DATA_TRACKING_WEIGHT,
                    payload: {
                        data: res?.data?.data
                    }
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getOnePartnerTrackingWeight: err });
                _checkError(err)
            })
    }
}

export const getCurrentPartnerTrackingWeightNotDispatch = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-tracking-weight/current`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCurrentPartnerTrackingWeightNotDispatch: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCurrentPartnerTrackingWeightNotDispatch: err });
            _checkError(err)
            return err
        })
}
export const getCurrentPartnerTrackingWeight = (query) => {
    return dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/partner-tracking-weight/current`, {
            params: query
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCurrentPartnerTrackingWeight: res });
                dispatch({
                    type: ActionType.SET_DATA_TRACKING_WEIGHT,
                    payload: {
                        data: res?.data?.data
                    }
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCurrentPartnerTrackingWeight: err });
                _checkError(err)
            })
    }
}

export const getReportPartnerTrackingWeight = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-tracking-weight`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getReportPartnerTrackingWeight: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getReportPartnerTrackingWeight: err });
            _checkError(err)
            return err
        })
}

export const updatePartnerTrackingWeight = (data) => {
    return Axios.put(`${URL_FOR_PARTNER}/partner-tracking-weight`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updatePartnerTrackingWeight: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updatePartnerTrackingWeight: err });
            _checkError(err)
            return err
        })
}

export const checkCurrentPartnerTrackingWeight = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-tracking-weight/current`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { checkCurrentPartnerTrackingWeight: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { checkCurrentPartnerTrackingWeight: err });
            return err
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
        `Có lỗi xảy ra, vui lòng thử lại`,
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