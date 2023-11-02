import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Alert, Platform } from 'react-native';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import RNFS from 'react-native-fs';

export const getFilename = url => {
    return url.substr(url.lastIndexOf('/') + 1);
};

export const scanningEyes = async (photo) => {
    console.log({ photo });
    let localPath = photo.path;

    let formData = new FormData();

    if (Platform.OS == 'ios') {
        if (!localPath.includes('private')) {
            localPath = localPath.replace('/var', '/private/var');
        }
        formData.append('image', {
            name: getFilename(localPath),
            uri: localPath.replace('file://', ''),
        });
    } else {
        formData.append("image", {
          name: getFilename(localPath),
          type: "image/jpeg",
          uri: `file://${localPath.replace("file://", "")}`,
        });

        // const imageRes = await fetch(`file://${localPath}`);
        // const imageBlob = await imageRes.blob();

        // // const blob = await getBlob(imageUri)

        // formData.append('image', imageBlob);
        // formData.append('image', {
        //     name: getFilename(localPath),
        //     uri: localPath.replace('file://', ''),
        // });
    }

    formData.append(`key`, 'liadigitech@2023');
    console.log({ formData });

    return Axios.post(`https://liabeautyai-api.vndigitech.com/v2/eye/predict`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(res => { 
            // Alert.alert(res?.data?.message)
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { scanningEyes: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { scanningEyes: error });
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