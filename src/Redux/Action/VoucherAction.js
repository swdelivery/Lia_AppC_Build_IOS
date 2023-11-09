import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Alert } from 'react-native';


export const getDetailVoucher = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/coupon/${id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDetailVoucher: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDetailVoucher: error });
            _checkError(error)
            return error
        })
}

export const takeVoucher = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/partner-coupon`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { takeVoucher: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { takeVoucher: error });
            _checkError(error)
            return error
        })
}

export const getListPublicVoucher = () => {
    return Axios.get(`${URL_FOR_PARTNER}/coupon`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListPublicVoucher: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListPublicVoucher: error });
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