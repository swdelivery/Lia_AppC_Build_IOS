import moment from 'moment';
import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TimePicker } from "react-native-wheel-picker-android";
import { Picker } from '@react-native-picker/picker';

import { stylesFont } from '@Constant/Font';
import { _widthScale, _heightScale, _moderateScale } from '@Constant/Scale';
import { BASE_COLOR, BORDER_COLOR, GREY_FOR_TITLE, WHITE } from '@Constant/Color';
import Row from '@Components/Row';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Text from '@Components/Text';



class TimePickerCustom extends Component {


    constructor() {
        super();
        this.state = {
            isShowCalendar: true,
            dataCalendars: [],
            dayOfWeeks: [],
            currIndexToSetMonthYear: 0,
            selectedItem: 9,
            selectedItemMinutes: 0,
            // itemList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            isTickPM: false,
            timePickerAndroid: null
        }
    }

    setSelectedValue = (item, index) => {
        console.log({ item, index });
        this.setState({
            selectedItem: item
        })

    }
    setSelectedValueMinutes = (item, index) => {
        console.log({ item, index });
        this.setState({
            selectedItemMinutes: item
        })
    }
    onTimeSelected = selectedItem => {

        this.setState({
            timePickerAndroid: selectedItem
        })
    };

    // onPress = () => {
    //     this.setState({ selectedItem: 3 });
    // };
    _handleSubmit = () => {
        console.log(moment(this.state.timePickerAndroid).format('HH:mm'))
        // console.log(this.state.timePickerAndroid);
    }

    _handleAcceptTime = () => {
        if (Platform.OS == 'ios') {
            let { selectedItem, selectedItemMinutes } = this.state
            console.log({ selectedItem, selectedItemMinutes });
            let hours = wheelPickerHours.find(item => item.value == selectedItem)
            let minutes = wheelPickerMinutes.find(item => item.value == selectedItemMinutes)

            console.log({ hours, minutes });
            // this.props._sendTimeToParent(`${hours.label}:${minutes.label}`)

        } else {
            let { timePickerAndroid } = this.state
            if (!timePickerAndroid) {
                this.props._sendTimeToParent(moment().format('HH:mm'))
            } else {
                this.props._sendTimeToParent(moment(this.state.timePickerAndroid).format('HH:mm'))
            }
        }
    }

    render() {
        return (
          <>
            {Platform.OS == "ios" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  paddingHorizontal: _widthScale(30),
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Picker
                    itemStyle={[
                      stylesFont.fontDinTextProBold,
                      { color: BASE_COLOR, fontSize: _moderateScale(24) },
                    ]}
                    selectedValue={this.state.selectedItem}
                    style={{ width: _widthScale(100) }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setSelectedValue(itemValue, itemIndex)
                    }
                  >
                    {wheelPickerHours &&
                      wheelPickerHours.length > 0 &&
                      wheelPickerHours.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={item.label}
                            value={item.value}
                          />
                        );
                      })}
                  </Picker>

                  <Text
                    style={{
                      fontSize: _moderateScale(16),
                      color: BASE_COLOR,
                      fontWeight: "bold",
                      marginHorizontal: _widthScale(20),
                    }}
                  >
                    :
                  </Text>

                  <Picker
                    itemStyle={[
                      stylesFont.fontDinTextProBold,
                      { color: BASE_COLOR, fontSize: _moderateScale(24) },
                    ]}
                    selectedValue={this.state.selectedItemMinutes}
                    style={{ width: _widthScale(100) }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setSelectedValueMinutes(itemValue, itemIndex)
                    }
                  >
                    {wheelPickerMinutes &&
                      wheelPickerMinutes.length > 0 &&
                      wheelPickerMinutes.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={item.label}
                            value={item.value}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: _widthScale(100),
                }}
              >
                <TimePicker
                  // itemTextColor={'rgba(78, 55, 211, 0.35)'}
                  itemTextColor={"#E5E5E5"}
                  itemTextSize={_widthScale(24)}
                  selectedItemTextSize={_widthScale(24)}
                  selectedItemTextColor={BASE_COLOR}
                  // hideIndicator={true}
                  indicatorColor={BORDER_COLOR}
                  onTimeSelected={(time) => this.onTimeSelected(time)}
                  itemStyle={{ color: "red" }}
                  format24={true}
                  minutes={["00", "15", "30", "45"]}
                />
              </View>
            )}

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: this.props.bottom,
              }}
            >
              <Row
                gap={16}
                style={{
                  paddingHorizontal: _moderateScale(8 * 2),
                  bottom: _moderateScale(0),
                }}
              >
                <TouchableOpacity
                  onPress={this._handleAcceptTime}
                  style={styles.leftBtn}
                >
                  <LinearGradient
                    style={[StyleSheet.absoluteFillObject, { borderRadius: 8 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={["#1C5579", "#186A57"]}
                  />

                  <Text weight="bold" size={14} color={WHITE}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rightBtn}>
                  <Text weight="bold" size={14} color={GREY_FOR_TITLE}>
                    Huỷ
                  </Text>
                </TouchableOpacity>
              </Row>
            </View>

            {/* <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: _widthScale(30), marginBottom: _heightScale(5), marginTop: _heightScale(15) }}>
                    <TouchableOpacity
                        onPress={this.props._handleExit}
                        style={{ padding: _widthScale(10) }}
                    >
                        <Text style={[stylesFont.fontDinTextProBold, {
                            fontSize: _widthScale(18),
                            color: BASE_COLOR,
                        }]}>
                            Thoát
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ padding: _widthScale(10) }}
                        onPress={this._handleAcceptTime}
                    >
                        <Text style={[stylesFont.fontDinTextProBold, {
                            fontSize: _widthScale(18),
                            color: BASE_COLOR,
                        }]}>
                            Xong
                        </Text>
                    </TouchableOpacity>
                </View> */}
          </>
        );
    }
}

export default TimePickerCustom;

const styles = StyleSheet.create({
    leftBtn: {
        flex: 1,
        height: _moderateScale(8 * 5),
        backgroundColor: "#F2F2F5",
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightBtn: {
        width: _moderateScale(8 * 13),
        height: _moderateScale(8 * 5),
        borderRadius: 8,
        backgroundColor: "#F2F2F5",
        justifyContent: 'center',
        alignItems: 'center'
    },
})

const wheelPickerHours = [
    {
        value: 0,
        label: '00'
    },
    {
        value: 1,
        label: '01'
    },
    {
        value: 2,
        label: '02'
    },
    {
        value: 3,
        label: '03'
    },
    {
        value: 4,
        label: '04'
    },
    {
        value: 5,
        label: '05'
    },
    {
        value: 6,
        label: '06'
    },
    {
        value: 7,
        label: '07'
    },
    {
        value: 8,
        label: '08'
    },
    {
        value: 9,
        label: '09'
    },
    {
        value: 10,
        label: '10'
    },
    {
        value: 11,
        label: '11'
    },
    {
        value: 12,
        label: '12'
    },
    {
        value: 13,
        label: '13'
    },
    {
        value: 14,
        label: '14'
    },
    {
        value: 15,
        label: '15'
    },
    {
        value: 16,
        label: '16'
    },
    {
        value: 17,
        label: '17'
    },
    {
        value: 18,
        label: '18'
    },
    {
        value: 19,
        label: '19'
    },
    {
        value: 20,
        label: '20'
    },
    {
        value: 21,
        label: '21'
    },
    {
        value: 22,
        label: '22'
    },
    {
        value: 23,
        label: '23'
    },
]

const wheelPickerMinutes = [
    {
        value: 0,
        label: '00'
    },
    {
        value: 1,
        label: '15'
    },
    {
        value: 2,
        label: '30'
    },
    {
        value: 3,
        label: '45'
    },
]

// const wheelPickerMinutes = [
//     {
//         value: 0,
//         label: '00'
//     },
//     {
//         value: 1,
//         label: '05'
//     },
//     {
//         value: 2,
//         label: '10'
//     },
//     {
//         value: 3,
//         label: '15'
//     },
//     {
//         value: 4,
//         label: '20'
//     },
//     {
//         value: 5,
//         label: '25'
//     },
//     {
//         value: 6,
//         label: '30'
//     },
//     {
//         value: 7,
//         label: '35'
//     },
//     {
//         value: 8,
//         label: '40'
//     },
//     {
//         value: 9,
//         label: '45'
//     },
//     {
//         value: 10,
//         label: '50'
//     },
//     {
//         value: 11,
//         label: '55'
//     },
// ]
