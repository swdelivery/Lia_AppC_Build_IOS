import { get, identity, pickBy, trim } from "lodash";
import React from "react";
import { handleError } from '../Services/utils';
import moment from 'moment'
import { Alert, Text } from "react-native";
import { stylesFont } from "./Font";
import { GREEN_SUCCESS, RED } from "./Color";


// export const _generateLink = async (param, value, param2, value2, param3, value3, param4, value4) => {
//     console.log(param, value, param2, value2);
//     const link = await dynamicLinks().buildShortLink({
//         link: `https://preview.liavietnam.com?${param}=${value}&${param2}=${value2}&${param3}=${value3}&${param4}=${value4}`,
//         ios: {
//             bundleId: "com.trangbeauty.customer",
//             appStoreId: "1578677866",
//         },
//         android: {
//             packageName: "com.customertrang",
//         },
//         domainUriPrefix: 'https://liavietnam.page.link',
//     });
//     return link
// }

// substring an array to shortly...
export const _substring = (stringInput, value, index) => {
    if (stringInput?.length > 100) {
        let indexOfValue = stringInput.indexOf(value, index)
        let res = `${stringInput.substring(0, indexOfValue)}...`
        return res
    }
    return stringInput
}

export const _getMonthDateRange = (year, month) => {
    var startDate = moment([year, month - 1]);
    var endDate = moment(startDate).endOf('month');
    // console.log(startDate.toDate());
    // console.log(endDate.toDate());
    return { start: startDate, end: endDate };
}

export const _subtractMonth = (date = new Date(), index) => {

    let month = moment(date).subtract(index, 'months').format('MM')
    let year = moment(date).subtract(index, 'months').format('YYYY')

    return {
        month, year
    }
}

export const _findIndexLongestArray = (array) => {
    var indexOfLongestArray = array.reduce((acc, arr, idx) => {
        // console.log(acc, idx, JSON.stringify([arr, array[acc]]))
        return arr.length > array[acc].length ? idx : acc
    }, 0)
    return indexOfLongestArray
}

export const _convertPriceToShortly = (price) => {
    if (price == 0) {
        return price = 0
    }
    price = price.toString().split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    price = price.trim().split('')

    let countDots = 0
    price.map(item => {
        if (item == ".") {
            countDots = countDots + 1
        }
    })

    price = price.join('')

    if (countDots == 1) {
        price = price.split('.')
        price = `${price[0]}K`
        return price
    }

    if (countDots == 2) {
        price = price.split('.')
        if (price[1].slice(0, 1) == 0) {
            price = `${price[0]}M`
        } else {
            price = `${price[0]},${price[1].slice(0, 1)}M`
        }
        return price
    }
    if (countDots > 2) {
        price = price.split('.')
        price = `${price[0]}B`
        return price
    }
}

export const _substringMaxValue = (stringInput, value, index, flag = "") => {
    if (stringInput?.length > index) {
        let indexOfValue = stringInput.indexOf(value, index)
        let res = `${stringInput.substring(0, indexOfValue)}${flag}`
        return res
    }
    return stringInput
}

export const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// make setState as promise, await setState(this)(stateObject)
export const setState = instance => newState => new Promise(resolve => instance.setState(newState, resolve));

// get value from object
export const getValue = (path, defaultValue = undefined) => (object) => {
    return get(object, path, defaultValue);
};

// get number from object
export const getNumber = (path, defaultValue = 0) => (object) => {
    try {
        return parseInt(get(object, path, defaultValue));
    } catch (e) {
        console.warn(`Can't get number from ${path}`);
        return defaultValue;
    }
};

// get value from object, use reselect to memory value
// export const selectValue = (path, defaultValue) => createSelector(
//     getValue(path, defaultValue),
//     data => data,
// );


export const trimValue = (value) => trim(value);


//fetch api return promise => {success, error, ...payload}
/**
 * convert thành 
 * PROMISE RETURN 
 * {
 *      error: true || false,
 *      message: '',
 *      data: {}
 * }
 */
export const handleApi = async (func) => {
    if (!func) return { error: true };
    return func()
        .then(data => {
            return ({ error: false, ...data });
        })
        .catch(error => {
            handleError(error)
        });
};

//remove
export const removeFalsey = (obj) => {
    return pickBy(obj, identity);
};


export const buildQuery = (params) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
}).join('&');

export const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

function removeUTF8(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // str = str.replace(/\W+/g, ' ');
    str = str.replace(/\s/g, ' ');
    str = str.replace(/[^a-zA-Z0-9]/g, ' ');

    let max = 10;
    for (let index = max; index >= 0; index--) {
        let inc_ = "";
        for (let index2 = 0; index2 <= index; index2++) {
            inc_ += " ";
        }
        str = str.replace(inc_, ' ');
    }
    return str.toLowerCase();
};
/**
 * 
 * @param {*} data array || list
 * @param {*} field fullname => arr[0].fullname
 * @param {*} key for search
 * => return: data arr||list
 */
export const filterStringLocal = (data, field, key) => {
    if (!Array.isArray(data)) return;

    return data.filter(item => {
        let txtForFind = removeUTF8(`${item[field]}`);

        key = removeUTF8(`${key}`)
        return txtForFind.includes(key.toLowerCase())
    })
}

export const filterStringLocalNestedObj = (data, key) => {
    if (!Array.isArray(data)) return;

    return data.filter(item => {
        let txtForFind = item.infoOfGuest.fullname;
        txtForFind = removeUTF8(txtForFind);

        key = removeUTF8(`${key}`)
        return txtForFind.includes(key.toLowerCase())
    })
}

export const randomFixedInteger = length => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}

export const subMinuteToDate = (subAdded, minute) => {
    return new Date((new Date(subAdded)).getTime() - minute * 60000);
};

const addMinuteToDate = function (dateAdded, minute) {
    return new Date((new Date(dateAdded)).getTime() + minute * 60000);
};

export const compareTimeGetDecisionTimeAlive = (clickTime, timeAlive) => {
    /*
     * clickTime: là thời gian VD: gửi OTP
     * timeAlive: VD: sau khi gửi -> resend trong 1p 
     */

    // timeTotalOfClickTimeAndTimveAlive: tổng khoảng thời gian(timeAlive) với Mốc thời gian (clickTime)
    let timeTotalOfClickTimeAndTimveAlive = addMinuteToDate(clickTime, timeAlive);

    // chuyển sang getTime để so sánh với createAt
    let timeTotalOfClickTimeAndTimveAlivePrepare = (new Date(timeTotalOfClickTimeAndTimveAlive)).getTime();

    let currentTimePrepare = new Date(Date.now()).getTime();

    // clickTime + timeAlive <= currentTime => đúng

    // console.log({ timeTotalOfClickTimeAndTimveAlivePrepare, currentTimePrepare, __: currentTimePrepare - timeTotalOfClickTimeAndTimveAlivePrepare })

    if (timeTotalOfClickTimeAndTimveAlivePrepare >= currentTimePrepare)
        return 1;
    else if (timeTotalOfClickTimeAndTimveAlivePrepare < currentTimePrepare)
        return 0;
    else
        return -1;
}

export const randomStringFixLengthCode = function (count) {

    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

/*
 * nếu 964209752 -> 0964209752
 */
export const getPhoneValid = phone => {
    if (phone.indexOf(0) == 0)
        return phone;
    return `0${phone}`
}

export const formatMonney = (data, withUnit = false) => {
  const value = data
    ? data
        .toString()
        .split(".")
        .join("")
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : 0;
  return withUnit ? `${value} VNĐ` : value;
};

export const parseFloatNumber = (number, fixed = 0) => {
    return parseFloat(Number(number).toFixed(fixed))
}


export const alertCustomNotAction = (title, body) => {
    return Alert.alert(
        title,
        body,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    )
}


export const renderStatusBookingByCode = (code) => {
    switch (code) {
        case "WAIT":
            return (
                <Text style={[stylesFont.fontNolan500, { color: "#969696" }]}>
                    Chưa CheckIn
                </Text>
            )
        case "WAS_CHECK_IN":
            return (
                <Text style={[stylesFont.fontNolan500, { color: "#ff7c22" }]}>
                    Đã CheckIn
                </Text>
            )
        case "WAIT_CONSULTATION":
            return (
                <Text style={[stylesFont.fontNolan500, { color: "#5d02ec" }]}>
                    Chờ tư vấn
                </Text>
            )
        case "IS_CONSULTING":
            return (
                <Text style={[stylesFont.fontNolan500, { color: "#0b7ad2" }]}>
                    Đang tư vấn
                </Text>
            )
        case "WAS_CONSULTED":
            return (
                <Text style={[stylesFont.fontNolan500, { color: "#30CCFF" }]}>
                    Đã tư vấn
                </Text>
            )
        case "WAIT_PROGRESS":
            return (
                <Text style={[stylesFont.fontNolan500, { color: "#5d02ec" }]}>
                    Chờ điều trị
                </Text>
            )
        case "IN_PROGRESS":
            return (
                <Text style={[stylesFont.fontNolan500, { color: "#0b7ad2" }]}>
                    Đang điều trị
                </Text>
            )
        case "COMPLETE_PROGRESS":
            return (
                <Text style={[stylesFont.fontNolan500, { color: "#019801" }]}>
                    Đã điều trị
                </Text>
            )
        case "WAS_CHECK_OUT":
            return (
                <Text style={[stylesFont.fontNolan500, { color: GREEN_SUCCESS }]}>
                    Đã CheckOut
                </Text>
            )
        case "CANCEL":
            return (
                <Text style={[stylesFont.fontNolan500, { color: RED }]}>
                    Đã Huỷ
                </Text>
            )

        default:
            break;
    }
}
