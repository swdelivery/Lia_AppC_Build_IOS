
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { Platform, Alert } from 'react-native';

// CALL API
import * as ActionType from '../Constants/ActionType';
import {  URL_FOR_PARTNER } from '../../Constant/Url';
import { isEmpty, isArray } from 'lodash'
import { useLogStyle, setLogStyle } from './LogConfig';



export const takeDataByCode = (code) => {
    return Axios.get(`${URL_FOR_PARTNER}/course/get-by-code?code=${code}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { takeDataByCode: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { takeDataByCode: err });
            return err
        })
}

export const getDataCourse = () => {
    return Axios.get(`${URL_FOR_PARTNER}/course`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataCourse: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataCourse: err });
            return err
        })
}

export const takeChapters = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/course/take/${id}/chapters`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { takeChapters: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { takeChapters: err });
            return err
        })
}

export const getCourseIdByChapter = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/course/${id}/chapters`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCourseIdByChapter: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCourseIdByChapter: err });
            return err
        })
}

export const getCourseChapterById = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/course-chapter/${id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCourseChapterById: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCourseChapterById: err });
            return err
        })
}

export const takeLessions = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/course-chapter/${id}/lessons`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { takeLessions: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { takeLessions: err });
            return err
        })
}

export const takeExams = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/course-chapter/${id}/exams`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { takeExams: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { takeExams: err });
            return err
        })
}

export const takeLessionById = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/course-lesson/${id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { takeLessionById: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { takeLessionById: err });
            return err
        })
}

export const completeLessionById = (id) => {
    return Axios.put(`${URL_FOR_PARTNER}/course-lesson/${id}/complete`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { completeLessionById: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { completeLessionById: err });
            return err
        })
}

export const takeDataExamById = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/exam/take/${id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { takeDataExamById: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { takeDataExamById: err });
            return err
        })
}

export const takeCourseChapterExams = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/course-chapter/take/${id}/exams`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { takeCourseChapterExams: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { takeCourseChapterExams: err });
            return err
        })
}

export const getQuestions = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/exam/${id}/questions`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getQuestions: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getQuestions: err });
            return err
        })
}


export const createTakeExam = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/take-exam`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createTakeExam: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createTakeExam: err });
            return err
        })
}

export const getTakeExamQuestions = (idTakeExam,params) => {
    return Axios.get(`${URL_FOR_PARTNER}/take-exam/${idTakeExam}/take-exam-questions`, {
        params: params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getTakeExamQuestions: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getTakeExamQuestions: err });
            return err
        })
}

export const createTakeExamQuestion = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/take-exam-question`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createTakeExamQuestion: res });
            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createTakeExamQuestion: err });
            return err
        })
}

export const submitTakeExam = (idTakeExam) => {
    return Axios.put(`${URL_FOR_PARTNER}/take-exam/${idTakeExam}/submit`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { submitTakeExam: res });

            return res
        })
        .catch(err => {
            _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { submitTakeExam: err });
            return err
        })
}



const _checkError = (err) => {
    console.log(err);


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