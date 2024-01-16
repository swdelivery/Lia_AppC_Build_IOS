import Axios from 'axios';
import isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import { Alert, Platform } from 'react-native';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';


export const getwardsByD = (codeDistrict) => {
    return Axios.get(`https://provinces.open-api.vn/api/d/${codeDistrict}?depth=2`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getwardsByD: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getwardsByD: err });
            _checkError(err)
            return err
        })
}

export const getDistrictsByP = (codeProvince) => {
    return Axios.get(`https://provinces.open-api.vn/api/p/${codeProvince}?depth=2`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDistrictsByP: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDistrictsByP: err });
            _checkError(err)
            return err
        })
}

export const getAllAddressVietNam = (params) => {
    return Axios.get(`https://provinces.open-api.vn/api/?depth=1`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllAddressVietNam: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllAddressVietNam: err });
            _checkError(err)
            return err
        })
}

export const removePartnerPickUpAddress = (_id) => {
    return Axios.delete(`${URL_FOR_PARTNER}/partner-pick-up-address/${_id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { removePartnerPickUpAddress: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { removePartnerPickUpAddress: err });
            _checkError(err)
            return err
        })
}

export const createPartnerPickUpAddress = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/partner-pick-up-address`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPartnerPickUpAddress: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPartnerPickUpAddress: err });
            _checkError(err)
            return err
        })
}

export const getDataPartnerPickUpAddress = (params) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-pick-up-address`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDataPartnerPickUpAddress: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDataPartnerPickUpAddress: err });
            _checkError(err)
            return err
        })
}

export const getPartnerCoupon = (params) => {
    return Axios.get(`${URL_FOR_PARTNER}/partner-coupon`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPartnerCoupon: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPartnerCoupon: err });
            _checkError(err)
            return err
        })
}

export const getListFoodDrinkAsset = (params) => {
    return Axios.get(`${URL_FOR_PARTNER}/asset`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListFoodDrinkAsset: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListFoodDrinkAsset: err });
            _checkError(err)
            return err
        })
}

export const getBookingReviews = (bookingId) => {
    return Axios.get(`${URL_FOR_PARTNER}/booking/${bookingId}/reviews`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getBookingReviews: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getBookingReviews: err });
            _checkError(err)
            return err
        })
}

export const getPrepareReviewForBooking = (bookingId) => {
    return Axios.get(`${URL_FOR_PARTNER}/review/prepare/booking/${bookingId}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPrepareReviewForBooking: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPrepareReviewForBooking: err });
            _checkError(err)
            return err
        })
}

export const getPrepareReviewForTreatmentDetail = (treatmentId) => {
    return Axios.get(`${URL_FOR_PARTNER}/review/prepare/treatment-detail/${treatmentId}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPrepareReviewForTreatmentDetail: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPrepareReviewForTreatmentDetail: err });
            _checkError(err)
            return err
        })
}

export const getReviewByTreatmentDetailForPartner = (treatmentId) => {
    return Axios.get(`${URL_FOR_PARTNER}/review/treatment-detail/${treatmentId}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getReviewByTreatmentDetailForPartner: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getReviewByTreatmentDetailForPartner: err });
            _checkError(err)
            return err
        })
}

export const createReviewBooking = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/review/booking`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createReviewBooking: res });
            setTimeout(() => {
                _checkSuccess(res)
            }, 700);
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createRcreateReviewBookingeviewTreatment: err });
            _checkError(err)
            return err
        })
}

export const createReviewTreatment = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/review`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createReviewTreatment: res });
            setTimeout(() => {
                _checkSuccess(res)
            }, 700);
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createReviewTreatment: err });
            _checkError(err)
            return err
        })
}

export const createCheckinBookingForPartner = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/booking/create-check-in`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createCheckinBookingForPartner: res });
            setTimeout(() => {
                _checkSuccess(res)
            }, 700);
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createCheckinBookingForPartner: err });
            _checkError(err)
            return err
        })
}

export const checkinBookingForPartner = (bookingId) => {
    return Axios.put(`${URL_FOR_PARTNER}/booking/${bookingId}/check-in`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { checkinBookingForPartner: res });
            setTimeout(() => {
                _checkSuccess(res)
            }, 700);
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { checkinBookingForPartner: err });
            _checkError(err)
            return err
        })
}

export const getBookingByIdForPartner = (bookingId) => {
    return Axios.get(`${URL_FOR_PARTNER}/booking/${bookingId}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getBookingByIdForPartner: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getBookingByIdForPartner: err });
            _checkError(err)
            return err
        })
}

export const createPaymentRequest = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/payment-request`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPaymentRequest: res });
            setTimeout(() => {
                _checkSuccess(res)
            }, 1000);
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPaymentRequest: err });
            _checkError(err)
            return err
        })
}

export const uploadModuleDocument = (data) => {


    let formData = new FormData();

    data.files.forEach((item, index) => {
        formData.append(`files`, {
            name: `${item.name}`,
            type: item.type,
            uri: Platform.OS === "android" ? item.uri : item.uri.replace("file://", "")
        });
    })

    return Axios.post(`${URL_FOR_PARTNER}/file/upload`, formData, {
        params: {
            moduleName: data?.moduleName
        }
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { uploadModule: res });
            return res
            // dispatch({ type: ActionType.SAVE_INFO_PROGRESS_TREATMENT, payload: { data: res.data.data } })
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { uploadModule: err });
            _checkError(err)
            return err
        })
}

export const uploadModule = (data) => {

    let formData = new FormData();

    data.files.forEach((item, index) => {
        if (!item.mime)
            return;
        let typeOfImageSplit = item.mime.split('/');
        if (typeOfImageSplit.length < 1)
            return;

        let typeOfImage = typeOfImageSplit[1];
        formData.append(`files`, {
            name: `${item.name}.${typeOfImage}`,
            type: item.mime,
            uri: Platform.OS === "android" ? item.uri : item.uri.replace("file://", "")
        });
    })
    return Axios.post(`${URL_FOR_PARTNER}/file/upload`, formData, {
        params: {
            moduleName: data?.moduleName
        }
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { uploadModule: res });
            return res
            // dispatch({ type: ActionType.SAVE_INFO_PROGRESS_TREATMENT, payload: { data: res.data.data } })
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { uploadModule: err });
            _checkError(err)
            return err
        })
}

export const getBookingDataForPartner = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/booking`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getBookingDataForPartner: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getBookingDataForPartner: err });
            _checkError(err)
            return err
        })
}

export const cancelBooking = (idBooking) => {
    return Axios.put(`${URL_FOR_PARTNER}/booking/${idBooking}/cancel`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { cancelBooking: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { cancelBooking: err });
            _checkError(err)
            return err
        })
}

export const updateBooking = (data, idBooking) => {
    return Axios.put(`${URL_FOR_PARTNER}/booking/${idBooking}`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { updateBooking: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { updateBooking: err });
            _checkError(err)
            return err
        })
}

export const createNewBooking = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/booking`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createNewBooking: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createNewBooking: err });
            if (err?.response?.data?.message == 'Khách hàng đã có lịch đặt hẹn') {
                return err
            }
            _checkError(err)
            return err
        })
}

export const getAllServiceByGroupId = (params) => {
    return Axios.get(`${URL_FOR_PARTNER}/service`, {
        params: params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllServiceByGroupId: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllServiceByGroupId: err });
            _checkError(err)
            return err
        })
}

export const getListServiceForBooking = (params) => {
    return Axios.get(`${URL_FOR_PARTNER}/service-group`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListServiceForBooking: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListServiceForBooking: err });
            _checkError(err)
            return err
        })

}

export const getListProductForBooking = () => {
    return Axios.get(`${URL_FOR_PARTNER}/product-group`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListProductForBooking: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListProductForBooking: err });
            _checkError(err)
            return err
        })

}

export const getListBranchLocation = () => {
    return dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/branch`, {})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListBranchLocation: res });

                if (!_isEmpty(res?.data?.data)) {
                    dispatch({
                        type: ActionType.SAVE_LIST_BRANCH,
                        payload: {
                            data: res?.data?.data
                        }
                    })
                }
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListBranchLocation: err });
                _checkError(err)
            })
    }

}


export const getListDoctorLocation = () => {
    return dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/treatment-doctor`, {})
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListDoctorLocation: res });

                if (!_isEmpty(res?.data?.data)) {
                    dispatch({
                        type: ActionType.SAVE_LIST_DOCTOR,
                        payload: {
                            data: res?.data?.data
                        }
                    })
                }
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListDoctorLocation: err });
                _checkError(err)
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
