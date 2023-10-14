import React, { memo, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Header from '../../Components/Header/Header';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { BG_BEAUTY, SECOND_COLOR, WHITE, BASE_COLOR } from '../../Constant/Color';
import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { getBookingDataForPartner } from '../../Redux/Action/BookingAction';
import { useSelector, useDispatch } from 'react-redux';
import ItemDiary from './Components/ItemDiary';
import ItemCreate from './Components/ItemCreate';
import { getPartnerDiaryDailyById } from '../../Redux/Action/PartnerDiary';
import { getTreatmentDetailById } from '../../Redux/Action/TreatmentAction';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import ItemMain from './Components/ItemMain';

const index = memo((props) => {
    const dispatch = useDispatch()

    const currentPartnerDiaryRedux = useSelector(state => state?.partnerDiaryReducer?.currentPartnerDiary)
    const listDailyDiary = useSelector(state => state?.partnerDiaryReducer?.listPartnerDiaryDaily)

    const [listBooking, setListBooking] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState(false)


    useEffect(() => {
        _getTreatmentDetail()
    }, [])

    const _getTreatmentDetail = async () => {
        const result = await getTreatmentDetailById(currentPartnerDiaryRedux?.entityId)
        if (result?.isAxiosError) return
        setData(result)

    }

    const _onRefresh = () => {
        setRefresh(true)
        dispatch(getPartnerDiaryDailyById(currentPartnerDiaryRedux?._id))
        setTimeout(() => {
            setRefresh(false)
        }, 500);
    }

    console.log({currentPartnerDiaryRedux})

    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={BASE_COLOR} />
            {/* <Header title={`Nhật ký  ${currentPartnerDiaryRedux?.serviceName}`} 
            keyGoBack={props?.route?.params?.keyGoBack}
             styleTit={{color: WHITE}}
             backStyle={`white`}
             hasAdd={`add`}
             handleAdd={()=>{
                navigation.navigate(ScreenKey.CREATE_PARTNER_DIARY_DAILY)
            }}
             styleCus={{backgroundColor: SECOND_COLOR}} 
            /> */}

            <View style={{
                width: "100%",
                height: _heightScale(48),
                backgroundColor: BASE_COLOR,
                alignItems: "center",
                zIndex: 1,
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: _moderateScale(8 * 2)
            }}>
                <View style={{ width: '10%' }}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        style={{}}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/back_left_white.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, }}>
                    <Text numberOfLines={1} style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: WHITE }}>
                        {`Nhật ký ${currentPartnerDiaryRedux?.serviceName}`}
                    </Text>
                </View>

                <View style={{ width: '10%', alignItems: 'flex-end' }}>

                </View>
            </View>

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
                <ItemMain data={currentPartnerDiaryRedux}></ItemMain>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.CREATE_PARTNER_DIARY_DAILY)
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: '#ffffffcc',
                        minHeight: _moderateScale(72),
                        marginBottom: _moderateScale(12),
                        borderRadius: _moderateScale(12),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Image source={require('../../Icon/plusGrey.png')}
                        style={{ width: _moderateScale(36), height: _moderateScale(36) }} />
                </TouchableOpacity>

                {
                    listDailyDiary?.map((item) => {
                        return (
                            <ItemDiary data={item} key={item?._id} />
                        )
                    })
                }

               

                <View style={{ height: 50 }} />
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