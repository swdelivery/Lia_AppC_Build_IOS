import Axios from 'axios';
import isArray from 'lodash/isArray';
import { Alert } from 'react-native';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import { setLogStyle, useLogStyle } from './LogConfig';


export const getTreatmentDetailForPartner = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/treatment-detail`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getTreatmentDetailForPartner: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getTreatmentDetailForPartner: err });
            _checkError(err)
            return err
        })
}

export const getTreatmentDetailById = (id) => {
    console.log({id})

    return Axios.get(`${URL_FOR_PARTNER}/treatment-detail/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getTreatmentDetailById: res.data.data });
            return res.data.data
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getTreatmentDetailById: err });
            _checkError(err)
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
        `${JSON.stringify(err?.response?.data?.error)}`,
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