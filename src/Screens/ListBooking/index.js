import React, { useRef, memo, useEffect, useState } from 'react';
import { View, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, RefreshControl } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BG_BEAUTY, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import Header from '../../Components/Header/Header'
import { getBookingDataForPartner } from '../../Redux/Action/BookingAction';
import ItemBooking from './Components/ItemBooking'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import ItemBookingV2 from './Components/ItemBookingV2';
import { ScrollView } from 'react-native-gesture-handler';

const index = memo((props) => {

    const [listBooking, setListBooking] = useState([])
    const [refresh, setRefresh] = useState(false)

    const [isFirstLoaded, setIsFirstLoaded] = useState(false)

    useEffect(() => {

        _getListBookingForPartner()
    }, [])

    const _getListBookingForPartner = async () => {
        let resultGetBookingDataForPartner = await getBookingDataForPartner({
            limit: 25,
            page: 1
        })
        setIsFirstLoaded(true)
        if (resultGetBookingDataForPartner?.isAxiosError) return
        setListBooking(resultGetBookingDataForPartner?.data?.data)
    }

    const _onRefresh = () => {
        setRefresh(true)
        _getListBookingForPartner()
        setTimeout(() => {
            setRefresh(false)
        }, 500);
    }


    return (
        <View style={styles.container}>
            <StatusBarCustom bgColor={BASE_COLOR} />
            <Header title={`Danh sách đặt hẹn`} keyGoBack={props?.route?.params?.keyGoBack}
                styleTit={{ color: WHITE }}
                backStyle={`white`}
                styleCus={{ backgroundColor: BASE_COLOR }} />

            {
                isFirstLoaded ?
                    <>
                        {
                            listBooking?.length > 0 ?
                                <ScrollView
                                    scrollIndicatorInsets={{right:1}}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refresh}
                                            onRefresh={() => {
                                                _onRefresh()
                                            }}
                                        />
                                    }
                                    contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8) }}>
                                    {
                                        listBooking?.map((item, index) => {
                                            return (
                                                <ItemBookingV2 data={item} key={item?._id} />
                                                // <ItemBooking data={item} key={item?._id} />
                                            )
                                        })
                                    }
                                    <View style={{ height: 50 }} />
                                </ScrollView>
                                :
                                <View style={[{ flex: 1 }, styleElement.centerChild]}>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                                        Dữ liệu trống
                                    </Text>
                                </View>
                        }
                    </>
                    :
                    <>
                    </>
            }



        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    }
})


export default index;