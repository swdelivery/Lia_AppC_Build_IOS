import * as ActionType from '../Constants/ActionType'
import Axios from 'axios'
import {  URL_ORIGINAL, URL_FOR_PARTNER } from '../../Constant/Url';
import { Alert } from 'react-native';
import isArray from 'lodash/isArray'
import { useLogStyle, setLogStyle } from './LogConfig';


export const getAfterDataPartnerMessage = (query) => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-message`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAfterDataPartnerMessage: res });
            // dispatch({
            //     type: ActionType.SET_LIST_LASTED_MESSAGES,
            //     payload: {
            //         data: res.data.data
            //     } 
            // })
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAfterDataPartnerMessage: err });
            return err
        })
}


export const getConversationByIdForPartner = (idConver) => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-conversation/${idConver}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getConversationByIdForPartner: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getConversationByIdForPartner: err });
            return err
        })
}

export const getDataPartnerMessage = (query) => {

    return Axios.get(`${URL_FOR_PARTNER}/partner-message`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataPartnerMessage: res });
            // dispatch({
            //     type: ActionType.SET_LIST_LASTED_MESSAGES,
            //     payload: {
            //         data: res.data.data
            //     } 
            // })
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataPartnerMessage: err });
            return err
        })
}
