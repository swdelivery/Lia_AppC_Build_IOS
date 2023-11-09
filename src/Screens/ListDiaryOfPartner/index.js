import React, { memo, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Header from '../../Components/Header/Header';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { BG_BEAUTY, SECOND_COLOR, WHITE, BASE_COLOR, GREY, BG_GREY_OPACITY_2 } from '../../Constant/Color';
import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { getBookingDataForPartner } from '../../Redux/Action/BookingAction';
// import ItemDiary from './Components/ItemDiary';
import ItemCreate from './Components/ItemCreate';
import { getTreatmentDetail, getTreatmentDetailNotDispatch } from '../../Redux/Action/InfoAction';
import { useSelector, useDispatch } from 'react-redux';
import { getPartnerDiary } from '../../Redux/Action/PartnerDiary';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { getPartnerDiaryv2 } from '../../Redux/Action/Diary';
import ItemDiary from '../MyPersonalPage/Components/ItemDiary';

const index = memo((props) => {


    // const partnerDiaryRedux = useSelector(state => state?.partnerDiaryReducer?.listPartnerDiary)
    const [refresh, setRefresh] = useState(false)

    const [listPartnerDiary, setListPartnerDiary] = useState([])

    useEffect(() => {
        // dispatch(getPartnerDiary())
        // alert('alo')
        _getPartnerDiary()
    }, [])

    const _getPartnerDiary = async () => {
        let result = await getPartnerDiaryv2({})
        if (result?.isAxiosError) return
        setListPartnerDiary(result?.data?.data)
    }

    const _onRefresh = () => {
        setRefresh(true)
        _getPartnerDiary()
        // dispatch(getPartnerDiary())
        setTimeout(() => {
            setRefresh(false)
        }, 500);
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={BASE_COLOR} />
            {/* <Header title={`Nhật ký của bạn`} keyGoBack={props?.route?.params?.keyGoBack} 
            styleTit={{color: WHITE}}
            backStyle={`white`}
            ha
            styleCus={{backgroundColor: BASE_COLOR}}/> */}
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

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: WHITE }}>
                        Nhật ký của bạn
                    </Text> 
                </View>

                <View style={{ width: '10%', alignItems: 'flex-end' }}>
                    {/* <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        style={{}}
                        onPress={() => {
                            navigation.navigate(ScreenKey.PICK_TREATMENT_TO_BOOKING)
                        }}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/plus_white.png')} />
                    </TouchableOpacity> */}
                </View>
            </View>
            {
                listPartnerDiary?.length > 0 ?
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={() => {
                                    _onRefresh()
                                }}
                            />
                        }
                        contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 0), paddingTop: _moderateScale(8) }}>
                        {/* <ItemCreate /> */}
                        {

                            listPartnerDiary?.map((item, index) => {
                                return (
                                    // <ItemDiary data={item} key={item?._id} index={index} />
                                    // <View style={{height:200}}>
                                    //     <Text>awd</Text>
                                    // </View>
                                    <ItemDiary data={item}/>
                                )
                            })
                        }
                        <View style={{ height: 50 }} />
                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                            Chưa có dữ liệu
                </Text>
                    </View>
            }

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


export default index;