import React, { memo, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { BtnHistory, IconCancelGrey } from '../../Components/Icon/Icon'
import { BASE_COLOR, BORDER_COLOR, GREY_FOR_TITLE, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { sizeIcon } from '../../Constant/Icon'
import { _height, _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import Column from '@Components/Column'
import { BG_GREY_OPACITY_5, GREY, RED, BG_GREY_OPACITY_7, SECOND_COLOR } from '../../Constant/Color';

import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient';
import Row from '@Components/Row'
import Text from '@Components/Text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TimePickerCustom from './TimePickerCustom'

const HEIGHT_MODAL = _heightScale(380)

const TimePicker = memo((props) => {

    const [datePick, setDatePick] = useState(null)
    const opacityBackDrop = useSharedValue(0);
    const tranYModal = useSharedValue(0);
    const [listBranch, setListBranch] = useState([1, 2, 3, 4, 5])

    const {bottom} = useSafeAreaInsets()


    useEffect(() => {
        if (props?.isShow) {
            tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 200 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {
        }
    }, [props?.isShow])


    const _handleOnDateChange = (date, type) => {
        setDatePick(date?._d)
    }

    const animTranY = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYModal.value
                }
            ]
        }
    })

    const animOpacityBackDrop = useAnimatedStyle(() => {
        return {
            opacity: opacityBackDrop.value
        }
    })

    const _handleHideModal = () => {
        tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
            if (fnd) {
                runOnJS(_hideModal)()
            }
        })
        opacityBackDrop.value = withTiming(0, { duration: 200 })
    }
    const _hideModal = () => {
        props?.onHideModal()
    }

    return (

        <>
            {
                props?.isShow ?
                    <View style={{
                        width: _width,
                        height: _height,
                        position: 'absolute',
                        zIndex: 100,
                        bottom: 0
                    }}>
                        <Animated.View style={[{
                            width: _width,
                            height: _height,
                        }, {
                            backgroundColor: 'rgba(0,0,0,.7)'
                        }, animOpacityBackDrop]}>
                            <TouchableOpacity onPress={() => _handleHideModal()} style={[StyleSheet.absoluteFillObject]} />
                        </Animated.View>

                        <Animated.View style={[{
                            width: _width,
                            backgroundColor: WHITE,
                            borderRadius: _moderateScale(8 * 2),
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingBottom: _moderateScale(8 * 2),
                            position: 'absolute',
                            bottom: -HEIGHT_MODAL,
                            height: HEIGHT_MODAL,
                        }, animTranY]}>
                            <View style={{ marginTop: _moderateScale(8 * 2) }} />

                            <Text color={BASE_COLOR} style={{margin:_moderateScale(8*2)}} weight='bold' size={16}>
                            Chọn giờ đặt hẹn
                            </Text>
                            <View style={{ marginTop: _moderateScale(8 * 2) }} />


                            <TimePickerCustom bottom={bottom}/>

                            {/* <View style={{flex:1,justifyContent:'flex-end', paddingBottom:bottom}}>
                                <Row gap={16} style={{
                                    paddingHorizontal: _moderateScale(8 * 2),
                                    bottom: _moderateScale(0)
                                }}>
                                    <TouchableOpacity style={styles.leftBtn}>

                                        <LinearGradient
                                            style={[StyleSheet.absoluteFillObject, { borderRadius: 8 }]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            colors={["#01AB84", "#186A57"]}
                                        />

                                        <Text weight='bold' size={14} color={WHITE}>
                                            Xác nhận
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.rightBtn}>
                                        <Text weight='bold' size={14} color={GREY_FOR_TITLE}>
                                            Làm mới
                                        </Text>
                                    </TouchableOpacity>

                                </Row>
                            </View> */}

                        </Animated.View>

                    </View>
                    :
                    <></>
            }
        </>


    )
})


export default TimePicker

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
    modalFilter: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingTop: _moderateScale(8 * 1),
        paddingBottom: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        // paddingHorizontal: _moderateScale(23),
        borderBottomStartRadius: _moderateScale(8 * 2),
        borderBottomEndRadius: _moderateScale(8 * 2),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    itemMission: {
        padding: _moderateScale(8 * 2),
        borderBottomWidth: .5,
        borderColor: 'rgba(0,0,0,.3)',
        flexDirection: 'row'
    },
    titleDetail: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(16),
        color: BASE_COLOR
    },
    boxDetail__text: {
        ...stylesFont.fontNolan500,
        color: WHITE,
        fontSize: _moderateScale(12),
        fontStyle: 'italic'
    },
    boxDetail__textPercent: {
        ...stylesFont.fontNolanBold,
        color: WHITE,
        fontSize: _moderateScale(16)
    },
    boxDetail: {
        flex: 1,
        alignItems: 'center',
        height: _moderateScale(8 * 6),
        justifyContent: 'center',
        borderRadius: _moderateScale(4)
    },
    lineText: {
        width: _moderateScale(340),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: _moderateScale(8),
        alignItems: 'flex-end'
    },
    line: {
        width: _moderateScale(340),
        height: _moderateScale(8),
        alignSelf: 'center',
        borderRadius: _moderateScale(8)
    },
    textRanked: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    iconSizeRanked: {
        width: _moderateScale(8 * 12),
        height: _moderateScale(8 * 12)
    },
    btnBack: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 4 / 2),
        backgroundColor: BASE_COLOR
    },
    header: {
        // marginTop: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        alignItems: 'center'
    }

})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,

    elevation: 5
}
