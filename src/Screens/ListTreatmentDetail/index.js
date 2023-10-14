import React, { useRef, memo, useEffect, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, RefreshControl } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BG_BEAUTY } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import Header from '../../Components/Header/Header'
import { getTreatmentDetail } from '../../Redux/Action/InfoAction';
import ItemBooking from './Components/ItemBooking'
import { useDispatch, useSelector } from 'react-redux';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import ItemBookingV2 from './Components/ItemBookingV2';

const index = memo((props) => {
    const dispatch = useDispatch()
    const treatmentDetailRedux = useSelector(state => state?.infoReducer?.treatmentDetail)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        dispatch(getTreatmentDetail())
    }, [])

   
    const _onRefresh = () => {
        setRefresh(true)
        dispatch(getTreatmentDetail())
        setTimeout(() => {
            setRefresh(false) 
        }, 500);
    }


    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <Header title={"Lịch sử điều trị"} />
            <ScrollView
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
                    treatmentDetailRedux?.map((item, index) => {
                        return (
                            <>
                            <ItemBookingV2 data={item} key={item?._id} />
                            </>
                        )
                    })
                }
                <View style={{height:50}}/>
            </ScrollView>
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