import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale } from '../../../Constant/Scale';
import { BASE_COLOR, BG_CLEAR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BLACK_OPACITY, BLACK_OPACITY_4, BLACK_OPACITY_7, GREY, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../../Constant/Color';
import { getDataBonusEvent, getDataBonusStatus } from '../../../Redux/Action/BonusEvent';
import { styleElement } from '../../../Constant/StyleElement';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { alertCustomNotAction } from '../../../Constant/Utils';
import { sizeIcon } from '../../../Constant/Icon';

const ListMission = (props) => {

    const [listMission, setListMission] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        _getDataBonusStatus()
    }, [])

    const _getDataBonusStatus = async () => {
        let result = await getDataBonusStatus()
        if (result?.isAxiosError) return setRefreshing(false)
        setListMission(result?.data?.data)
        setRefreshing(false)
    }


    const _handleNavigate = (data) => {
        console.log({ data });
        switch (data?.code) {
            case "CREATE_DEPOSIT":
                navigation.navigate(ScreenKey.LIST_BOOKING)
                break;
            case "COMPLETE_HEALTH_RECORD":
                navigation.navigate(ScreenKey.HEALTH_RECORD)
                break;
            case "COMPLETE_TREATMENT_DIARY":
                navigation.navigate(ScreenKey.LIST_ALL_HISTORY_TREATMENT)
                break;
            case "COMPLETE_DAILY_DIARY":
                navigation.navigate(ScreenKey.LIST_ALL_HISTORY_TREATMENT)
                break;
            case "REGISTER":
                // navigation.navigate(ScreenKey.HEALTH_RECORD)
                break;
            case "COMPLETE_ORDER":
                // navigation.navigate(ScreenKey.HEALTH_RECORD)
                alertCustomNotAction(`Thông báo`, `Bạn sẽ được thưởng vé sau khi thanh toán thành công đơn hàng`)
                break;
            case "BOOKING_CONSULTATION":
                // navigation.navigate(ScreenKey.HEALTH_RECORD)
                alertCustomNotAction(`Thông báo`, `Hãy đến thăm khám và tư vấn để được nhận thưởng nhé`)
                break;
            case "COMPLETE_VIDEO_CALL":
                navigation.navigate(ScreenKey.VIDEO_REQUEST)
                break;
            case "TREATMENT":
                // navigation.navigate(ScreenKey.HEALTH_RECORD)
                alertCustomNotAction(`Thông báo`, `Bạn sẽ được thưởng xu sau khi điều trị thành công`)
                break;

            default:
                break;
        }
    }

    const _handleRefresh = () => {
        setRefreshing(true)
        props?.getWallet()
        _getDataBonusStatus()
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_handleRefresh}
                />
            }
            showsVerticalScrollIndicator={false}>
            <View style={styles.tabContent}>
                <View style={{ height: _moderateScale(8) }} />

                {listMission?.map((item, index) => {

                    return item?.status?.status !== 'COMPLETE' ?
                        <TouchableOpacity
                            onPress={() => {
                                _handleNavigate(item)
                            }}
                            key={index}>
                            <View style={[styles.itemLineContent, { marginVertical: _moderateScale(8 * 1), alignItems: 'center' }]}>
                                <View style={styles.leftItemLine}>
                                    <Text style={[styles.titleMission]}>{index + 1}. {item?.name}</Text>
                                    <View style={{ ...styleElement.rowAliTop }}>
                                        {item?.awards.map((bounus, ind) => {
                                            return <Text key={ind} style={styles.briefMission}>+{bounus?.amount} {bounus?.name}</Text>
                                        })}
                                    </View>
                                </View>
                                <View>
                                    <Image style={sizeIcon.sm} source={require('../../../Icon/arrowRight_grey.png')}/>
                                </View>
                                {/* <Text style={[styles.valueMission]}>0/1</Text> */}
                            </View>
                            <View style={{ height: 0.5, backgroundColor: BG_GREY_OPACITY_3 }} />
                        </TouchableOpacity>
                        :
                        <View key={index}>
                            <View style={[styles.itemLineContent, { marginVertical: _moderateScale(8 * 1), alignItems: 'center' }]}>
                                <View style={styles.leftItemLine}>
                                    <Text style={[styles.titleMission, styles.completeMission]}>{index + 1}. {item?.name}</Text>
                                    <View style={{ ...styleElement.rowAliTop }}>
                                        {item?.awards.map((bounus, ind) => {
                                            return <Text key={ind} style={styles.briefMission}>+{bounus?.amount} {bounus?.name}</Text>
                                        })}
                                    </View>
                                </View>
                                <View>
                                    {/* <Text style={[styles.valueMission, styles.completeMission]}>1/1</Text> */}
                                    {/* <Text>awd</Text> */}
                                </View>
                            </View>
                            <View style={{ height: 0.5, backgroundColor: BG_GREY_OPACITY_3 }} />
                        </View>

                })}


            </View>
            <View style={{ height: 250, width: '100%' }} />
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    tabContent: {
        // paddingVertical: _moderateScale(16),
        paddingHorizontal: _moderateScale(16),
    },
    itemLineContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: _moderateScale(6),
        // paddingVertical: _moderateScale(4)
    },
    titleMission: {
        ...stylesFont.fontNolan500,
        color: BASE_COLOR,
        fontSize: _moderateScale(14)
    },
    completeMission: {
        textDecorationLine: 'line-through',
        color: GREY
    },
    briefMission: {
        color: THIRD_COLOR,
        fontSize: _moderateScale(14),
        marginRight: _moderateScale(6),
        marginTop: _moderateScale(8),
        ...stylesFont.fontNolanBold
    },
})


export default ListMission;