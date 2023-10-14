import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BTN_PRICE, GREY, WHITE, BLACK_OPACITY_8, ORANGE, BG_GREY_OPACITY_5, PRICE_ORANGE, BLUE_FB, RED, BLACK, BG_GREY_OPACITY_3, BG_GREY_OPACITY_2, THIRD_COLOR, BASE_COLOR, BLACK_OPACITY_7, SECOND_COLOR, BG_GREY_OPACITY_7 } from '../../../Constant/Color';
import { getServiceByGroup } from '../../../Redux/Action/ServiceGroup';
import { useDispatch, useSelector } from 'react-redux';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { formatMonney } from '../../../Constant/Utils';
import { getListServiceForBooking } from '../../../Redux/Action/BookingAction';
import { sizeIcon } from '../../../Constant/Icon';
import ModalPickSingleNotSearch from '../../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import _isEmpty from 'lodash/isEmpty'
import store from '../../../Redux/Store';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { TabBar, TabView } from 'react-native-tab-view';
import { getDirectCommission, getInDirectCommission, getOverviewCommission } from '../../../Redux/Action/InfoAction';


const Indirect = memo((props) => {

    const [listChild, setListChild] = useState([])

    useEffect(() => {
        _getInDirectCommission()
    }, [])

    const _getInDirectCommission = async () => {
        let result = await getInDirectCommission();
        setListChild(result?.data?.data)
    }


    return (
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
            <View style={{
                margin: _moderateScale(8 * 2)
            }}>
                <Text style={{
                    ...stylesFont.fontNolan500,
                    fontSize: _moderateScale(14),
                    color: BLACK_OPACITY_7,
                    fontStyle: 'italic'
                }}>* Tiền hoa hồng từ hệ thống CTV cấp dưới</Text>
            </View>

            <View style={styles.totalPrice}>
                <Text style={styles.totalPrice__text}>Tổng cộng</Text>
                <Text style={styles.totalPrice__text2}>
                {formatMonney(props?.mineCommission?.indirect)}đ
                </Text>
            </View>

            <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                {
                    listChild?.map((item, index) => {
                        return (
                            <View style={{
                                borderBottomWidth: 0.5,
                                borderBottomColor: BG_GREY_OPACITY_2,
                                paddingVertical: _moderateScale(8 * 1.5)
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{ flex: 4 }}>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                ...stylesFont.fontNolanBold,
                                                fontSize: _moderateScale(14)
                                            }}>
                                            {index + 1}. {item?.partner?.name}
                                        </Text>
                                        <Text style={{
                                            marginLeft: _moderateScale(8 * 2),
                                            ...stylesFont.fontNolan500,
                                            fontSize: _moderateScale(14),
                                            marginTop: _moderateScale(4)
                                        }}>
                                            Doanh thu: {formatMonney(item?.revenueAmount)}
                                        </Text>
                                    </View>

                                    <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            fontSize: _moderateScale(16),
                                            color: BASE_COLOR
                                        }}>
                                            + {formatMonney(item?.commissionAmount)}
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        )
                    })
                }
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    boxChild: {
        width: _width - _moderateScale(8 * 2),
        alignSelf: 'center',
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(8),
        flexWrap: 'wrap',
        flexDirection: 'row',
        // justifyContent: ',
        paddingVertical: _moderateScale(8),
        paddingBottom: _moderateScale(8 * 2)
    },
    verticalLine: {
        height: _moderateScale(8 * 3),
        width: _moderateScale(2),
        backgroundColor: BASE_COLOR,
        alignSelf: 'center'
    },
    mine: {
        width: _moderateScale(8 * 24),
        height: _moderateScale(8 * 6),
        borderWidth: 2,
        borderRadius: _moderateScale(8),
        borderColor: SECOND_COLOR,
        alignSelf: 'center'
    },
    dot: {
        width: _moderateScale(8 * 2),
        height: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8 * 1.5),
        marginRight: _moderateScale(8)
    },
    box__text3: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(18),
        color: '#EF9000',
    },
    box__text2: {
        ...stylesFont.fontNolan,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    box__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    box: {
        width: '48%',
        height: _moderateScale(8 * 12),
        borderRadius: _moderateScale(8 * 1),
        backgroundColor: WHITE,
    },
    totalPrice__text2: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(24),
        color: '#FA4664',
    },
    totalPrice__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    totalPrice: {
        marginTop: _moderateScale(8 * 0.5),
        alignItems: 'center'
    },
})



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
}


export default Indirect;