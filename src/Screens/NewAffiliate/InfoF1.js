import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IconBackWhite } from '../../Components/Icon/Icon'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { _moderateScale } from '../../Constant/Scale'


import { TabBar, TabView } from 'react-native-tab-view'
import * as Color from '../../Constant/Color'
import { navigation } from '../../../rootNavigation'
import { getListBookingInvitee, getListOrderServiceInvitee } from '../../Redux/Action/Affiilate'
import { formatMonney, renderStatusBookingByCode } from '../../Constant/Utils'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getListPartnerLevelState } from '@Redux/affiliate/selectors'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'



const Tab1 = (props) => {


    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const { data: listPartnerLevel } = useSelector(getListPartnerLevelState)

    const [currPartnerLevel, setCurrPartnerLevel] = useState({})

    useEffect(() => {
        let findCurrPartnerLevel = listPartnerLevel?.find(item => item?.code == infoUserRedux?.levelCode);
        console.log({ findCurrPartnerLevel });
        if (findCurrPartnerLevel?._id) {
            setCurrPartnerLevel(findCurrPartnerLevel)
        }
    }, [])

    return (
        <>
            {
                props?.data?.length > 0 ?
                    <ScrollView>
                        {
                            props?.data?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                        }}
                                        style={{
                                            padding: _moderateScale(8 * 2),
                                            borderBottomWidth: .5,
                                            borderColor: 'rgba(0,0,0,.2)',
                                            alignItems: 'center'
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 4 }}>
                                                <Text style={[stylesFont.fontNolanBold, , { fontSize: _moderateScale(14) }]}>
                                                    {index + 1}. {item?.serviceName}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                                    {formatMonney(item?.finalPrice)} vnđ
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                            <View style={{ flex: 4 }}>
                                                <Text style={[stylesFont.fontNolan, , { fontSize: _moderateScale(14) }]}>
                                                    Phát sinh thưởng
                                                </Text>
                                            </View>
                                            <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                                    + {
                                                        formatMonney(item?.finalPrice * (currPartnerLevel?.promotion?.commissionRate / 100))
                                                    } vnđ
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    :
                    <>
                        <EmptyResultData title='Chưa có đơn hàng' />
                        <View style={{ height: 100 }} />
                    </>
            }
        </>

    )
}

const Tab2 = (props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const { data: listPartnerLevel } = useSelector(getListPartnerLevelState)

    const [currPartnerLevel, setCurrPartnerLevel] = useState({})

    useEffect(() => {

        let findCurrPartnerLevel = listPartnerLevel?.find(item => item?.code == infoUserRedux?.levelCode);
        console.log({ findCurrPartnerLevel });
        if (findCurrPartnerLevel?._id) {
            setCurrPartnerLevel(findCurrPartnerLevel)
        }
    }, [])

    return (
        <>
            {
                props?.data?.length > 0 ?
                    <ScrollView>
                        {
                            props?.data?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                        }}
                                        style={{
                                            padding: _moderateScale(8 * 2),
                                            borderBottomWidth: .5,
                                            borderColor: 'rgba(0,0,0,.2)',
                                            alignItems: 'center'
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 4 }}>
                                                <Text style={[stylesFont.fontNolanBold, , { fontSize: _moderateScale(14) }]}>
                                                    {index + 1}. {item?.services?.map(item => item?.service?.name)}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                                    {
                                                        formatMonney(item?.services?.reduce((total, item) => {
                                                            return total += item?.finalPrice
                                                        }, 0))
                                                    } vnđ
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                            <View style={{ flex: 4 }}>
                                                <Text style={[stylesFont.fontNolan, , { fontSize: _moderateScale(14) }]}>
                                                    Hoa hồng dự kiến
                                                </Text>
                                            </View>
                                            <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                                    + {
                                                        formatMonney((item?.services?.reduce((total, item) => {
                                                            return total += item?.finalPrice
                                                        }, 0)) * (currPartnerLevel?.promotion?.commissionRate / 100))
                                                    } vnđ
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%' }}>
                                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                                <View style={{}}>
                                                    <Text style={[stylesFont.fontNolan, , { fontSize: _moderateScale(14) }]}>
                                                        Thời gian hẹn:
                                                    </Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-start' }}>
                                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.GREY }]}>
                                                        {moment(item?.appointmentDateFinal?.date).format("DD/MM/YYYY")}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                                <View style={{}}>
                                                    <Text style={[stylesFont.fontNolan, , { fontSize: _moderateScale(14) }]}>
                                                        Chi nhánh:
                                                    </Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-start' }}>
                                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.GREY }]}>
                                                        {item?.branch?.name}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8), alignItems: 'center' }}>
                                                <Text style={{ ...stylesFont.fontNolan500 }}>
                                                    {`Trạng thái: `}
                                                </Text>
                                                {
                                                    renderStatusBookingByCode(item?.status)
                                                }
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                        }
                        <View style={{ height: 100 }} />
                    </ScrollView>
                    :
                    <>
                        <EmptyResultData title='Chưa có booking' />
                        <View style={{ height: 100 }} />
                    </>
            }
        </>

    )
}

const InfoF1 = (props) => {

    const [listOrderServiceInvitee, setListOrderServiceInvitee] = useState([])
    const [listBookingInvitee, setListBookingInvitee] = useState([])

    const { top } = useSafeAreaInsets()

    const [routes] = useState([
        { key: 'first', title: 'Đơn hàng' },
        { key: 'third', title: 'Booking' },
    ]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        console.log({ props });

        _getListServiceInvitee(props?.route?.params?.infoF1?._id)
        _getListBookingInvitee(props?.route?.params?.infoF1?._id)

    }, [props?.route?.params?.infoF1?._id])

    const _getListServiceInvitee = async (inviteeId) => {
        let result = await getListOrderServiceInvitee({
            "inviteeId": inviteeId
        })
        if (result?.isAxiosError) return;
        setListOrderServiceInvitee(result?.data?.data)
    }
    const _getListBookingInvitee = async (inviteeId) => {
        let result = await getListBookingInvitee({
            "inviteeId": inviteeId
        })
        if (result?.isAxiosError) return;
        setListBookingInvitee(result?.data?.data)
    }

    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center', marginTop: _moderateScale(0) }}
                {...props}
                indicatorStyle={{ backgroundColor: Color.BASE_COLOR }}
                style={{
                    backgroundColor: Color.WHITE,
                }}
                inactiveColor="grey"
                activeColor={Color.BASE_COLOR}
                labelStyle={[stylesFont.fontNolan500, {
                    fontSize: _moderateScale(14),
                }]}
                getLabelText={({ route }) => route.title}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Tab1 data={listOrderServiceInvitee} />
            case 'third':
                return <Tab2 data={listBookingInvitee} />

            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: top
                }} />
                <View style={styles.header__box}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}
                        >
                            <IconBackWhite />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                            {
                                props?.route?.params?.infoF1?.name
                            }
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                    </View>
                </View>
            </View>
            {/* <View style={{
                padding: _moderateScale(8 * 2)
            }}>
                <Text style={{ fontStyle: 'italic' }}>
                    Đã được giới thiệu vào ngày 31/09/2023
                </Text>
            </View> */}

            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />

        </View>
    )
}

export default InfoF1

const styles = StyleSheet.create({
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
    }
})
