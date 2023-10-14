import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { Platform, Alert } from 'react-native';
import * as DeviceInfo from 'react-native-device-info';
import SocketInstance from '../../../SocketInstance';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../Constant/Url';
// CALL API
import { handleApi } from '../../Services/utils';
import * as ActionType from '../Constants/ActionType';
import Store from '../Store';
import { useLogStyle, setLogStyle } from './LogConfig';
import isArray from 'lodash/isArray'
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { alertCustomNotAction } from '../../Constant/Utils';



export const getStringeeToken = (data) => {
    return Axios.get(`${URL_FOR_PARTNER}/stringee/token`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getStringeeToken: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getStringeeToken: err });
            _checkError(err)
            return err
            // _checkError(err) 
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