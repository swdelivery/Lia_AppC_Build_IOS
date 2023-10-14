import Axios from 'axios';
import { Platform, Alert } from 'react-native';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../Constant/Url';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import * as ActionType from '../Constants/ActionType';
import { useLogStyle, setLogStyle } from './LogConfig';
import isArray from 'lodash/isArray'


export const employeeUpdateAvatar = props => {

    let formData = new FormData();
    if (!props.mime) return
    let typeOfImageSplit = props.mime.split('/');
    if (typeOfImageSplit.length < 1) return;
    let typeOfImage = typeOfImageSplit[1];
    formData.append(`file`, {
        name: `${randomStringFixLengthCode(15)}.${typeOfImage}`,
        type: props.mime,
        uri: Platform.OS === "android" ? props.uri : props.uri.replace("file://", "")
    });


    return async dispatch => {
        Axios.put(`${URL_ORIGINAL}/api/employees/update-avatar`, formData)
            .then(res => {
                console.log({ ...res });

                dispatch({
                    type: ActionType.EMPLOYEE_UPDATE_AVATAR,
                    payload: {
                        data: res.data.data
                    }
                })
            })
            .catch(err => {
                console.log({ loi: err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const setListMembersOfSystem = props => {
    return {
        type: ActionType.SET_LIST_MEMBERS_OF_SYSTEM,
        payload: {
            data: props
        }
    }
}


export const getListDoctorForPartner = (query) => {

    return async dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/treatment-doctor`, {
            params: query
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListDoctorForPartner: res });
                dispatch({ type: ActionType.SAVE_LIST_DOCTOR, payload: { data: res.data.data } })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListDoctorForPartner: err });
                _checkError(err)
            })
    }

}

export const getAllUsersInApp = (props) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/users`, {})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllUsersInApp: res });
                dispatch({
                    type: ActionType.SAVE_LIST_USERS_IN_APP,
                    payload: {
                        data: res.data.data
                    }
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllUsersInApp: err });

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