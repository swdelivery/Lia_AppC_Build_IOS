import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView } from 'react-native';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_CLEAR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BLACK_OPACITY, BLACK_OPACITY_4, BLACK_OPACITY_7, GREY, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _moderateScale } from '../../Constant/Scale';
import ScreenKey from '../../Navigation/ScreenKey';
import ListHistory from './Component/ListHistory';
import ListMission from './Component/ListMission';
import { TabBar, TabView } from 'react-native-tab-view';
import { getWallet } from '../../Redux/Action/InfoAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import { sizeIcon } from '../../Constant/Icon';
import ModalThele from '../WheelSpin/ModalThele';
import { getConfigData } from '../../Redux/Action/OrtherAction';
import LinearGradient from 'react-native-linear-gradient';

const Mision = (props) => {

    const walletReducer = useSelector(state => state?.walletReducer?.infoWallet)

    const [showModalThele, setShowModalThele] = useState(false)
    const [configThele, setConfigThele] = useState({})

    const [routes] = useState([
        { key: 'first', title: 'Nhiệm vụ' },
        { key: 'second', title: 'Lịch sử' }
    ]);
    const [index, setIndex] = useState(0);
    const [wallet, setWallet] = useState(null)

    useEffect(() => {
        _getWallet()
        _getConfigData()
    }, [])

    const _getConfigData = async() => {
        let result = await getConfigData("CONFIG_TUT_LIAXU")
        if(result?.isAxiosError)return;
        setConfigThele(result)
    }

    const _getWallet = async () => {
        var data = await getWallet()
        if (data?.isAxiosError) return
        setWallet(data)

        store.dispatch({
            type: ActionType.SET_DATA_WALLET,
            payload: {
                data: data
            }
        })
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
                return <ListMission getWallet={_getWallet} />;
            case 'second':
                return <ListHistory />;

            default:
                return null;
        }
    };


    console.log({ walletReducer })

    return (
        <>
            <View style={styles.container}>

                <ModalThele
                    hide={() => {
                        setShowModalThele(false)
                    }}
                    data={configThele}
                    show={showModalThele}
                />

                <StatusBarCustom gradient/>
                <View style={styles.topWallet}>

                <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 0.6, 1]}
                        colors={[
                            BASE_COLOR,
                            '#8c104e',
                            '#db0505',
                        ]}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }} />

                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{
                            position: 'absolute',
                            left: _moderateScale(8 * 2),
                            top: _moderateScale(8 * 2)
                        }}>
                        <Image style={sizeIcon.llg} source={require('../../Icon/back_left_white.png')} />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: _moderateScale(48), color: WHITE, ...stylesFont.fontDinTextPro }}>
                            {walletReducer?.liaTicketAmount}
                        </Text>
                        <Text style={{ alignSelf: 'center', fontSize: _moderateScale(16), color: WHITE }}> Xu</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: _heightScale(8 * 1.5)
                        }}
                        onPress={() => {
                            setShowModalThele(true)
                        }}>
                        <Image style={{
                            width: _heightScale(8 * 10),
                            height: _heightScale(8 * 10.5),
                            resizeMode: 'contain',
                        }} source={require('../../Image/spin/tl.png')} />
                    </TouchableOpacity>

                </View>
                <View style={[styles.description, { height: '100%' }]}>

                    <TabView
                        renderTabBar={renderTabBar}
                        swipeEnabled={true}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        lazy
                    />
                </View>
                {/* <TouchableOpacity 
                onPress={()=>navigation.navigate(ScreenKey.WHEEL_SPIN)}
                style={{position:'absolute', 
                    right: _moderateScale(0), bottom: _moderateScale(8*2)}}>
                            <Image style={{ width: _moderateScale(96), 
                                height: _moderateScale(96)}}
                                resizeMode="contain"
                                source={require('../../NewIcon/wheel.png')}>
                                </Image>
                    </TouchableOpacity> */}
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: WHITE

    },
    topWallet: {
        height: _moderateScale(110),
        backgroundColor: BASE_COLOR,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabTitle: {
        flexDirection: 'row',
        backgroundColor: SECOND_COLOR,
        paddingVertical: _moderateScale(12)
    },
    itemTab: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },
    tabContent: {
        paddingVertical: _moderateScale(16),
        paddingHorizontal: _moderateScale(16)
    },
    itemLineContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: _moderateScale(6),
        paddingVertical: _moderateScale(4)
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
        fontSize: _moderateScale(12)
    },
    titleTab: {
        fontSize: _moderateScale(14),
        color: BG_CLEAR
    },
    titleTabActive: {
        fontSize: _moderateScale(14),
        color: WHITE,
        ...stylesFont.fontNolanBold
    }
})


export default Mision;