import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BTN_PRICE, GREY, WHITE, BLACK_OPACITY_8, ORANGE, BG_GREY_OPACITY_5, PRICE_ORANGE, BLUE_FB, RED, BLACK, BG_GREY_OPACITY_3, BG_GREY_OPACITY_2, THIRD_COLOR, BASE_COLOR, BLACK_OPACITY_7, SECOND_COLOR } from '../../../Constant/Color';
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
import { getOverviewCommission } from '../../../Redux/Action/InfoAction';


const Overview = memo((props) => {

    const [listChild, setListChild] = useState([])
    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    useEffect(() => {
        _getOverviewCommission()
    }, [])

    const _getOverviewCommission = async () => {
        let result = await getOverviewCommission();
        setListChild(result?.data?.data)
    }

    return (
        <ScrollView scrollIndicatorInsets={{right:1}}>
            <View style={{
                margin: _moderateScale(8 * 2)
            }}>
                <Text style={{
                    ...stylesFont.fontNolan500,
                    fontSize: _moderateScale(14),
                    color: BLACK_OPACITY_7,
                    fontStyle: 'italic'
                }}>* Tổng tiền hoa hồng tạm tính trong tháng của bạn</Text>
            </View>

            <View style={styles.totalPrice}>
                <Text style={styles.totalPrice__text}>Tổng cộng</Text>
                <Text style={styles.totalPrice__text2}>
                    {formatMonney(props?.mineCommission?.total)}đ
                </Text>
            </View>

            <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 2) }}>
                    <TouchableOpacity
                        onPress={() => {
                            props?.setIndex(1)
                        }}
                        style={[styles.box, shadow]}>
                        <View style={[{ flex: 1, justifyContent: 'center' }]}>
                            <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                                Hoa hồng trực tiếp
                            </Text>
                            <Text style={[styles.box__text2, { alignSelf: 'center' }]}>
                                (Bán lẻ)
                            </Text>
                            <Text style={[styles.box__text3, { alignSelf: 'center' }]}>
                                {formatMonney(props?.mineCommission?.direct)}đ
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '4%' }} />
                    <TouchableOpacity
                        onPress={() => {
                            props?.setIndex(2)
                        }}
                        style={[styles.box, shadow]}>
                        <View style={[{ flex: 1, justifyContent: 'center' }]}>
                            <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                                Hoa hồng gián tiếp
                            </Text>
                            <Text style={[styles.box__text2, { alignSelf: 'center' }]}>
                                (Đội nhóm)
                            </Text>
                            <Text style={[styles.box__text3, { alignSelf: 'center' }]}>
                                {formatMonney(props?.mineCommission?.indirect)}đ
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: _moderateScale(8 * 2) }} />

            <View style={{
                margin: _moderateScale(8 * 2),
                flexDirection: 'row'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.dot, { backgroundColor: '#ff5f97' }]} />
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), color: '#ff5f97' }}>
                        Bán lẻ
                    </Text>
                </View>
                <View style={{ width: _moderateScale(8 * 3) }} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.dot, { backgroundColor: BLUE_FB }]} />
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), color: BLUE_FB }}>
                        Đội nhóm
                    </Text>
                </View>
            </View>
            <View style={{ height: _moderateScale(8 * 1) }} />

            <View style={[styleElement.centerChild, styles.mine]}>
                <Text numberOfLines={1} style={{
                    ...stylesFont.fontNolanBold,
                    fontSize: _moderateScale(16),
                    color: BASE_COLOR,
                    paddingHorizontal:_moderateScale(8)
                }}>
                    {infoUserRedux?.name}
                </Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.boxChild}>
                {
                    listChild?.map((item, index) => {
                        return (
                            <View style={[styleElement.centerChild, {
                                width: (_width - _moderateScale(8 * 2)) / 3,
                                // borderWidth:1,
                                paddingVertical: _moderateScale(4)
                            }]}>
                                <View style={[{
                                    width: (_width - _moderateScale(8 * 2) - _moderateScale(8 * 4)) / 3,
                                    height: _moderateScale(8 * 9),
                                    borderRadius: _moderateScale(8),
                                    backgroundColor: WHITE,
                                }, shadow]}>
                                    <View style={{ alignItems: 'center', marginTop: _moderateScale(4) }}>
                                        <Text style={{
                                            ...stylesFont.fontNolan500,
                                            fontSize: _moderateScale(14),
                                            color: BLACK
                                        }}>
                                            {index + 1}. {item?.partner?.name}
                                        </Text>
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            fontSize: _moderateScale(14),
                                            color: '#ff5f97'
                                        }}>
                                            {formatMonney(item?.directCommision)}
                                        </Text>

                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            fontSize: _moderateScale(14),
                                            color: BLUE_FB
                                        }}>
                                             {formatMonney(item?.indirectCommision)}
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


export default Overview;