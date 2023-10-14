import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Alert } from 'react-native';


export const getConfigFileByCode = (code) => {

    return Axios.get(`${URL_FOR_PARTNER}/config-file/get-by-code?code=${code}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getConfigFile: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getConfigFile: error });
            _checkError(error)
            return error
        })
}

export const getLuckyCircle = () => {

    return Axios.get(`${URL_FOR_PARTNER}/config-file/get-by-code?code=IMAGE_SPIN_WHEEL`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getLuckyCircle: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getLuckyCircle: error });
            _checkError(error)
            return error
        })
}

export const getDataLiaBonusEvent = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/lia-bonus-event`,{params})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataLiaBonusEvent: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataLiaBonusEvent: error });
            _checkError(error)
            return error
        })
}

export const getConfigSpinWheel = () => {

    return Axios.get(`${URL_FOR_PARTNER}/config-spin-wheel`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getConfigSpinWheel: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getConfigSpinWheel: error });
            _checkError(error)
            return error
        })
}

export const getNumberParticipant = () => {

    return Axios.get(`${URL_FOR_PARTNER}/config-spin-wheel/number-of-participant`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getNumberParticipant: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getNumberParticipant: error });
            _checkError(error)
            return error
        })
}

export const getPartnerWheelTurn = () => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-wheel-turn/mine`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerWheelTurn: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerWheelTurn: error });
            _checkError(error)
            return error
        })
}

export const getSpinWheel = () => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-wheel-turn/spin-wheel`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getSpinWheel: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getSpinWheel: error });
            _checkError(error)
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