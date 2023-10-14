import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BTN_PRICE, GREY, WHITE, BLACK_OPACITY_8, ORANGE, BG_GREY_OPACITY_5, PRICE_ORANGE, BLUE_FB, RED, BLACK, BG_GREY_OPACITY_3, BG_GREY_OPACITY_2, THIRD_COLOR, BASE_COLOR } from '../../../Constant/Color';
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
import Overview from './Overview';
import Direct from './Direct';
import Indirect from './Indirect';
import { getMineCommission } from '../../../Redux/Action/InfoAction';


const Commission = memo((props) => {


    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Tổng quan' },
        { key: 'second', title: 'Trực tiếp' },
        { key: 'third', title: 'Gián tiếp' },
    ]);
    const [index, setIndex] = useState(0);

    const [mineCommission,setMineCommission] = useState({})

    useEffect(()=>{
        if (props?.route?.params?.currIndex) {
            setTimeout(() => {
            setIndex(props?.route?.params?.currIndex)
            }, 100);
        }
    },[props?.route?.params?.currIndex])

    useEffect(()=>{
        _getMineCommission()
    },[])

    const _getMineCommission = async() => {
        var data = await getMineCommission()
        if (data?.isAxiosError) return
        setMineCommission(data?.data?.data)
    }

    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
                {...props}
                indicatorStyle={{ backgroundColor: BASE_COLOR }}
                style={{
                    backgroundColor: WHITE,
                }}
                inactiveColor="grey"
                activeColor={BASE_COLOR}
                // labelStyle={[stylesFont.fontNolanBold, {
                //     fontSize: _moderateScale(14),
                // }]}
                getLabelText={({ route }) => route.title}
                renderLabel={({ route, focused, color }) => (
                    <View style={{ width: _width / 3, alignItems: 'center' }}>
                        <Text style={[{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), marginTop: _moderateScale(0), color: GREY, opacity: 0.8 },
                        focused && { ...stylesFont.fontNolanBold, opacity: 1, color: BASE_COLOR, fontSize: _moderateScale(15) }]}>
                            {route?.title}
                        </Text>
                    </View>
                )}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Overview setIndex={setIndex} mineCommission={mineCommission}/>;
            case 'second':
                return <Direct setIndex={setIndex} mineCommission={mineCommission}/>;
            case 'third':
                return <Indirect setIndex={setIndex} mineCommission={mineCommission}/>;


            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />

            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingTop: _moderateScale(8 * 1.5),
                paddingBottom: _moderateScale(4),
                // borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
            }}>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../../Icon/back_bold.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                        Hoa hồng
                    </Text>
                </View>
            </View>

            {
                routes?.length > 0 ?
                    <TabView
                        renderTabBar={renderTabBar}
                        swipeEnabled={true}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        lazy
                    />
                    : <></>
            }

        </View>
    );
});


export default Commission;