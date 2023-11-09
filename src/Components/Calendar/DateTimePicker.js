import React from 'react';
import { _heightScale, _widthScale, _moderateScale } from '../../Constant/Scale';


import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePicker = props => {
    return (
        <DateTimePickerModal
            datePickerModeAndroid="calendar"
            isVisible={props.openDateTimePicker}
            locale="vi_VN"
            mode="datetime"
            onConfirm={(e) => { props.handleConfirm(e) }}
            onCancel={(e) => { props.hideDatePicker(e) }}
            cancelTextIOS={'Huỷ bỏ'}
            confirmTextIOS={"Xác nhận"}
            headerTextIOS={"Chọn ngày bắt đầu"}
            date={props.dateDefault}
        />
    );
};



export default DateTimePicker;