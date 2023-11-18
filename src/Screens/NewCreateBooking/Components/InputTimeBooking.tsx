import { IconCalendarBase } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR, BLACK, BORDER_COLOR, GREY, RED, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _moderateScale, _width, _widthScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { selectDate, selectTime } from '@Redux/booking/actions'
import { getDataCreateBookingState } from '@Redux/booking/selectors'
import { TimeForBooking } from '@typings/booking'
import moment from 'moment'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'


type Props = {
    setShowModalDatePicker: any
    setShowModalTimePicker: any
    listTimeForBooking: TimeForBooking[]
};


const InputTimeBooking = memo((
    {
        setShowModalDatePicker,
        setShowModalTimePicker,
        listTimeForBooking,
    }
        : Props) => {

    const dispatch = useDispatch()

    const { dataDate, dataTime } = useSelector(getDataCreateBookingState)

    // DEFINE STATE
    const [list7Days, setList7Days] = useState(Array.from(new Array(7), (x, i) => moment().add(i, 'days')))


    useEffect(() => {

        let find = list7Days.find(item => {
            return _isSameDate(item, dataDate)
        })
        if (!find) {
            setList7Days(Array.from(new Array(7), (x, i) => moment(dataDate).add(i, 'days')))
        }
    }, [dataDate])

    const _handlePickDate = useCallback((date) => () => {
        dispatch(selectDate(date))
    }, [])

    const _handlePickTime = useCallback((data) => () => {
        dispatch(selectTime({
            hour: data?.time?.hour,
            minute: data?.time?.minute
        }))
    }, [])

    const _handleShowModalDatePicker = useCallback(() => {
        setShowModalDatePicker(true)
    }, [])
    const _handleShowModalTimePicker = useCallback(() => {
        return Alert.alert('Pending...')
        setShowModalTimePicker(true)
    }, [])


    const _renderVietnameseDays = (date) => {
        let numberDate = moment(date).format('d');
        if (Number(numberDate) === 0) {
            return `CN`
        } else {
            return `Thứ ${Number(numberDate) + 1}`
        }
    }

    const _isSameDate = (date1, date2) => {
        return moment(date1).isSame(date2, 'day')
    }

    return (
        <View style={styles.container}>
            <Text size={14} weight='bold'>Thời gian đặt hẹn <Text color={RED}>*</Text></Text>
            <Text color={GREY} style={{ marginTop: 8 * 2 }}>
                Chọn ngày đặt hẹn
            </Text>

            <Row style={{ justifyContent: 'space-between', paddingRight: 8 * 1 }}>
                <Text weight='bold' style={styles.textUperCase}>
                    {moment(dataDate).format(`LL`)}
                </Text>

                <TouchableOpacity onPress={_handleShowModalDatePicker}>
                    <IconCalendarBase style={sizeIcon.llg} />
                </TouchableOpacity>
            </Row>

            <Row style={{ marginTop: 8 * 2 }}>
                {
                    list7Days?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={_handlePickDate(item)}
                                style={[{
                                    width: (_width - _widthScale(8 * 4)) / 7,
                                    alignItems: 'center',
                                }]}>
                                <Text size={12}>
                                    {
                                        _renderVietnameseDays(item)
                                    }
                                </Text>

                                <View style={[
                                    styles.boxDate, styleElement.centerChild,
                                    _isSameDate(dataDate, item) && { borderWidth: 0 }
                                ]}>
                                    {
                                        _isSameDate(dataDate, item) ?
                                            <LinearGradient
                                                style={[StyleSheet.absoluteFillObject, { borderRadius: 8, }]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                colors={["#01AB84", "#186A57"]}
                                            />
                                            : <></>
                                    }
                                    <Text weight={_isSameDate(dataDate, item) ? 'bold' : 'regular'} color={_isSameDate(dataDate, item) ? WHITE : BLACK}>
                                        {
                                            moment(item).format('DD')
                                        }
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        )
                    })
                }
            </Row>

            <Row style={[{ marginTop: 8 * 2 }, { justifyContent: 'space-between' }]}>
                <Text color={GREY}>
                    Chọn khung giờ
                </Text>
                <TouchableOpacity
                    onPress={_handleShowModalTimePicker}>
                    <Text color={BASE_COLOR}>
                        + Chọn giờ khác
                    </Text>
                </TouchableOpacity>
            </Row>

            <Text weight='bold' style={{ marginTop: 8 * 2 }}>
                Buổi sáng
            </Text>

            <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }} contentContainerStyle={{ gap: 8 }} horizontal>
                {
                    listTimeForBooking?.slice(0, 5)?.map((item, index) => {

                        if (item?.time?.hour == dataTime?.hour && item?.time?.minute == dataTime?.minute) {
                            return (
                                <TouchableOpacity
                                    onPress={_handlePickTime(item)}
                                    style={[styles.btnTime, { borderWidth: 0 }]}>
                                    <LinearGradient
                                        style={[StyleSheet.absoluteFillObject, { borderRadius: 4, }]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        colors={["#01AB84", "#186A57"]}
                                    />
                                    <Text color={WHITE} weight='bold'>
                                        {item?.time?.hour}:{item?.time?.minute}
                                    </Text>
                                </TouchableOpacity>
                            )
                        } else {
                            return (
                                <TouchableOpacity
                                    onPress={_handlePickTime(item)}
                                    style={styles.btnTime}>
                                    <Text color={GREY} weight='bold'>
                                        {item?.time?.hour}:{item?.time?.minute}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    })
                }
            </ScrollView>

            <Text weight='bold' style={{ marginTop: 8 * 2 }}>
                Buổi chiều
            </Text>

            <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }} contentContainerStyle={{ gap: 8 }} horizontal>
                {
                    listTimeForBooking?.slice(5, 10)?.map((item, index) => {
                        if (item?.time?.hour == dataTime?.hour && item?.time?.minute == dataTime?.minute) {
                            return (
                                <TouchableOpacity
                                    onPress={_handlePickTime(item)}
                                    style={[styles.btnTime, { borderWidth: 0 }]}>
                                    <LinearGradient
                                        style={[StyleSheet.absoluteFillObject, { borderRadius: 4, }]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        colors={["#01AB84", "#186A57"]}
                                    />
                                    <Text color={WHITE} weight='bold'>
                                        {item?.from}
                                    </Text>
                                </TouchableOpacity>
                            )
                        } else {
                            return (
                                <TouchableOpacity
                                    onPress={_handlePickTime(item)}
                                    style={styles.btnTime}>
                                    <Text color={GREY} weight='bold'>
                                        {item?.from}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    })
                }
            </ScrollView>

        </View>
    )
})

export default InputTimeBooking

const styles = StyleSheet.create({
    textUperCase: { marginTop: 8 * 2, textTransform: 'uppercase' },
    btnTime: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 3.5),
        borderWidth: 1,
        ...styleElement.centerChild,
        borderRadius: 4,
        borderColor: BORDER_COLOR
    },
    boxDate: {
        width: _widthScale(8 * 5),
        height: _widthScale(8 * 5),
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 8 * 1,
        borderColor: BORDER_COLOR
    },
    container: {
        marginHorizontal: _widthScale(8 * 2)
    }
})
