import axios from "axios";
import * as ActionType from '../Redux/Constants/ActionType';
import Store from "../Redux/store";




export default async (endPoint, data = null, method = "get", headers = {}, params = {}, timeout = 20000) => {

    // const networkInfo = GlobalStore.networkInfo;
    // if (!networkInfo) {
    //     Store.dispatch({
    //         type: ActionType.NETWORK_ERROR,
    //         payload: {
    //             flag: true
    //         }
    //     })
    //     return { error: true, message:'Network Error' } 
    // }
    

    
    let objForSubmitAxios = {
        url: 'http://rp.trangbeautycenter.com/trangbeauty' + endPoint,
        method,
        headers,
        params
    };
    if (data && method.toLocaleLowerCase() != 'get') {
        objForSubmitAxios = {
            ...objForSubmitAxios, data
        }
    }

    axios.defaults.timeout = timeout;

    return axios(objForSubmitAxios)
        .then((response) => {
            if (response) {
                console.log(response);
                if (!response.data.error) {
                    return response.data
                }
                // const { status, data: d } = response;
                // const { error, message, ...data } = d;
                // console.log({ error, message, data }) 
                // if (!error) {
                //     console.log('----FETCHING SUCCESS: ', response);
                //     console.log({ data })
                //     return data;
                // }
                // return { err: true, error: true, message: message };
            }
        })
        .catch((error) => {
            console.log({ a: error }); 

            if (error.message == 'Network Error')
                Store.dispatch({
                    type: ActionType.NETWORK_ERROR,
                    payload: {
                        flag: true
                    }
                })
            throw error
        });
};
