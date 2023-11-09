import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREY, WHITE } from '../../../Constant/Color';

import ItemPriceWallet from './Components/ItemPriceWallet'
import { useDispatch, useSelector } from 'react-redux';
import { formatMonney } from '../../../Constant/Utils';
import { sizeIcon } from '../../../Constant/Icon';
import { getCollabStatistic } from '../../../Redux/Action/InfoAction'
import moment from 'moment'
import { TabBar, TabView } from 'react-native-tab-view';
import * as Color from '../../../Constant/Color';
import Tab1 from './Tab1';
import { getCommissionAmountByMonth } from '../../../Redux/Action/Affiilate';
import Tab2 from './Tab2';
import Tab3 from './Tab3';


const index = (props) => {
    const dispatch = useDispatch()
    const collabStatisticRedux = useSelector(state => state?.infoReducer?.collabStatistic)

    const [currTab, setCurrTab] = useState('1')

    const [currMonthFilter, setCurrMonthFilter] = useState(new Date())

    const [currLevelFilter, setCurrLevelFilter] = useState('all')

    const [routes] = useState([
        { key: 'first', title: 'Đơn hàng' },
        { key: 'second', title: 'Cọc' },
        { key: 'third', title: 'Booking' },
    ]);
    const [index, setIndex] = useState(0);

    const [commissionAmountByMonth, setCommissionAmountByMonth] = useState({})

    useEffect(() => {

    }, [])

    useEffect(() => {
        let startOfMonth = new Date(moment(currMonthFilter).startOf('month').format('YYYY-MM-DD'));
        let endOfMonth = new Date(moment(currMonthFilter).endOf('month').format('YYYY-MM-DD'));

        // console.log({
        //     startOfMonth,
        //     endOfMonth
        // });
        // dispatch(getCollabStatistic({
        //     "condition": {
        //         'updated': {
        //             'from': startOfMonth,
        //             'to': endOfMonth
        //         }
        //     }
        // }))
        _getCommissionAmountByMonth(startOfMonth, endOfMonth)


    }, [currMonthFilter])

    const _getCommissionAmountByMonth = async (startOfMonth, endOfMonth) => {
        let result = await getCommissionAmountByMonth({
            condition: {
                dateTime: {
                    from: startOfMonth,
                    to: endOfMonth
                }
            }
        })
        if (result?.isAxiosError) return
        setCommissionAmountByMonth(result?.data?.data)
    }

    const _handlePreMonth = () => {
        setCurrMonthFilter(moment(currMonthFilter).subtract(1, 'months').format('YYYY-MM-DD'))
    }

    const _handleNextMonth = () => {
        setCurrMonthFilter(moment(currMonthFilter).subtract(-1, 'months').format('YYYY-MM-DD'))
    }



    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center', marginTop: _moderateScale(8) }}
                {...props}
                indicatorStyle={{ backgroundColor: Color.BASE_COLOR }}
                style={{
                    backgroundColor: Color.WHITE,
                }}
                inactiveColor="grey"
                activeColor={Color.BASE_COLOR}
                labelStyle={[stylesFont.fontNolan500, {
                    fontSize: _moderateScale(15),
                }]}
                getLabelText={({ route }) => route.title}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Tab1 currLevelFilter={currLevelFilter} currMonthFilter={currMonthFilter} />;
            case 'second':
                return <Tab2 currLevelFilter={currLevelFilter} currMonthFilter={currMonthFilter} />;
            case 'third':
                return <Tab3 currLevelFilter={currLevelFilter} currMonthFilter={currMonthFilter} />;

            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 1) }}>
                <View style={{ flex: 1, }}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15) }}>
                        Hoa hồng
                    </Text>
                    <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(20), marginTop: _moderateScale(4), color: '#F285AE' }}>
                        {formatMonney(commissionAmountByMonth?.amountCommission)}
                    </Text>
                </View>
                <View style={{ flex: 1, }}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), marginLeft: _moderateScale(8 * 2) }}>
                        Thời gian
                    </Text>
                    <View style={[styleElement.rowAliCenter, { alignSelf: 'center', marginTop: _moderateScale(4) }]}>
                        <TouchableOpacity
                            hitslop={styleElement.hitslopSm}
                            style={{ backgroundColor: BTN_PRICE, padding: _moderateScale(4), borderRadius: _moderateScale(4) }} onPress={_handlePreMonth}>
                            <Image style={[sizeIcon.xxs]} source={require('../../../Icon/douPre.png')} />
                        </TouchableOpacity>
                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), width: _moderateScale(8 * 12), textAlign: 'center', color: BTN_PRICE }]}>
                            {
                                moment(currMonthFilter).format("MM/YYYY")
                            }
                        </Text>
                        <TouchableOpacity
                            hitslop={styleElement.hitslopSm}
                            style={{ backgroundColor: BTN_PRICE, padding: _moderateScale(4), borderRadius: _moderateScale(4) }} onPress={_handleNextMonth}>
                            <Image style={[sizeIcon.xxs]} source={require('../../../Icon/douNext.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 1.5) }}>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        setCurrLevelFilter('all')
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <View style={[styles.outlineCircle, currLevelFilter == 'all' && { borderColor: BLUE_FB }]}>
                        {
                            currLevelFilter == 'all' ?
                                <View style={styles.inlineCircle} />
                                : <></>
                        }
                    </View>
                    <Text style={[styles.text, , currLevelFilter == 'all' && { color: BLUE_FB, ...stylesFont.fontNolanBold }]}>
                        Tất cả
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        setCurrLevelFilter('1')
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <View style={[styles.outlineCircle, currLevelFilter == '1' && { borderColor: BLUE_FB }]}>
                        {
                            currLevelFilter == '1' ?
                                <View style={styles.inlineCircle} />
                                : <></>
                        }
                    </View>
                    <Text style={[styles.text, , currLevelFilter == '1' && { color: BLUE_FB, ...stylesFont.fontNolanBold }]}>
                        Cấp 1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        setCurrLevelFilter('2')
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <View style={[styles.outlineCircle, currLevelFilter == '2' && { borderColor: BLUE_FB }]}>
                        {
                            currLevelFilter == '2' ?
                                <View style={styles.inlineCircle} />
                                : <></>
                        }
                    </View>
                    <Text style={[styles.text, , currLevelFilter == '2' && { color: BLUE_FB, ...stylesFont.fontNolanBold }]}>
                        Cấp 2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        setCurrLevelFilter('3')
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <View style={[styles.outlineCircle, currLevelFilter == '3' && { borderColor: BLUE_FB }]}>
                        {
                            currLevelFilter == '3' ?
                                <View style={styles.inlineCircle} />
                                : <></>
                        }
                    </View>
                    <Text style={[styles.text, currLevelFilter == '3' && { color: BLUE_FB, ...stylesFont.fontNolanBold }]}>
                        {`> Cấp 3 `}
                    </Text>
                </TouchableOpacity>
            </View>

            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(15),
        marginLeft: _moderateScale(4),
        color: GREY
    },
    inlineCircle: {
        width: _moderateScale(8 * 1.6),
        height: _moderateScale(8 * 1.6),
        borderRadius: _moderateScale(8 * 1.6 / 2),
        backgroundColor: BLUE_FB,
        right: _moderateScale(0.05)
    },
    outlineCircle: {
        width: _moderateScale(8 * 2.5),
        height: _moderateScale(8 * 2.5),
        borderRadius: _moderateScale(8 * 2.5 / 2),
        borderWidth: 2,
        borderColor: Color.BG_GREY_OPACITY_7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTabActive: {
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: BTN_PRICE,
    },
    btnTab__text: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    btnTab: {
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: _moderateScale(4),
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: 'transparent'
    },
    bannerStatis: {
        backgroundColor: WHITE,
        height: _moderateScale(8 * 6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2),
        borderBottomWidth: _moderateScale(0.5),
        borderBottomColor: BG_GREY_OPACITY_5
    },
})

export default index;