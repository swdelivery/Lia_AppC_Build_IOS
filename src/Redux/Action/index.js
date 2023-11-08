import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { URL_ORIGINAL } from '../../Constant/Url';
import { } from '../../Services/api';
import * as ActionType from "../Constants/ActionType";
import Store from "../store";



// tăng lên 1 vé
export const _setNotiTicketIncr = () => {
  return Store.dispatch({ 
    type: ActionType.SET_BADGE_TICKET_INC,
    payload: null
  })
}

export const _login = (input) => {
  let { phoneNumber, password, setShowModal } = input
  console.log(`Login....`);

  return dispatch => {
    Axios.post(`${URL_ORIGINAL}/customers/login`, {
      phoneNumber, password
    })
      .then(res => {
        console.log({ ...res });
        console.log(`Login....`);
        if (res.data.error) {
          return alert('Sai thông tin đăng nhập')
        }
        const { infoUser, token, listProductOfOrderNotPay } = res.data.data
        AsyncStorage.setItem('token', token)
        Axios.defaults.headers.token = token;

        dispatch({
          type: ActionType.SAVE_INFO_USER,
          payload: { infoUser, listProductOfOrderNotPay }
        })
        setShowModal(true)
      })
      .catch(err => {
        console.log(err.message);
      })
  }
}

export const fetchAllData = () => {
  return dispatch => {
    const urls = [
      `${URL_ORIGINAL}/doanhthu/dichvu`,
      `${URL_ORIGINAL}/doanhthu/chinhanh`,
      `${URL_ORIGINAL}/chiphi/bophan`,
      `${URL_ORIGINAL}/chiphi/khoanmuc`,
    ];

    let promiseAxios = (url) => {
      return new Promise(async (resolve) => {
        await Axios.get(url, {})
          .then(res => {
            return resolve({
              error: false,
              data: res
            })
          })
          .catch(err => {
            return resolve({
              error: true,
              message: err.message
            })
          })
      })
    }

    Promise.all([
      promiseAxios(urls[0]),
      promiseAxios(urls[1]),
      promiseAxios(urls[2]),
      promiseAxios(urls[3]),
    ])
      .then(([a, b, c]) => {
        console.log('----');
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
      })
      .catch(err => {
        console.log(err.message);

      });

  }
}