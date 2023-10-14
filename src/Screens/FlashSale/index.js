import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { BASE_COLOR, THIRD_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale, _height, _heightScale } from '../../Constant/Scale';
import ListSale from './Component/ListSale';
import Timer from './Component/Timer';

const FlashSale = (props) => {

    const walletReducer = useSelector(state => state?.walletReducer?.infoWallet)

    const [routes, setRoute] = useState([
        { key: 'first', title: 'Fash Sale 1', start: '29-12-2021 9:00', end: '29-12-2021 11:00' },
        { key: 'second', title: 'Fash Sale 2', start: '29-12-2021 12:00', end: '29-12-2021 13:00' },
        // { key: 'third', title: 'Fash Sale 3', start: '29-12-2021 15:00', end: '29-12-2021 16:00' },
        // { key: 'four', title: 'Fash Sale 4', start: '29-12-2021 18:00', end: '29-12-2021 19:00' },
    ]);
    const [index, setIndex] = useState(0);
    const [wallet, setWallet] = useState(null)

    useEffect(() => {
        // _getWallet()
        routes?.map((route, index) => {
            const start = moment(route.start, 'DD-MM-YYYY HH:ss').toDate()
            const end = moment(route.end, 'DD-MM-YYYY HH:ss').toDate()
            const diffStart = moment(start).diff(moment(), 'seconds')
            const diffEnd = moment(end).diff(moment(), 'seconds')

            var type = ''

            if (moment(start).unix() <= moment().unix() &&
                moment().unix() <= moment(end).unix()) {
                type = 'current'
            }
            else if (moment().unix() <= moment(start).unix()) {
                type = 'notStart'
            }
            else if (moment(end).unix() <= moment().unix()) {
                type = 'hasEnd'
            }
            route.type = type
            route.diffStart = diffStart
            route.diffEnd = diffEnd

            if (index === routes.length - 1) {
                setRoute(routes)
            }
        })
    }, [])

    // const _getWallet = async () => {
    //     var data = await getWallet()
    //     if (data?.isAxiosError) return
    //     setWallet(data)

    //     store.dispatch({
    //         type: ActionType.SET_DATA_WALLET,
    //         payload: {
    //             data: data
    //         }
    //     })
    // }

    const refTimer = useRef();

    const timerCallbackFunc = timerFlag => {
        // Setting timer flag to finished
        console.warn(
            'You can alert the user by letting him know that Timer is out.',
        );
    };


    const renderTabBar = (props) => {
        return (
            <>
                <TabBar
                    tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
                    {...props}
                    indicatorStyle={{ backgroundColor: BASE_COLOR }}
                    style={{
                        backgroundColor: WHITE,
                    }}
                    inactiveColor="grey"
                    activeColor={BASE_COLOR}
                    labelStyle={[stylesFont.fontDinTextPro, {
                        fontSize: _moderateScale(16),
                    }]}
                    getLabelText={({ route }) => route.title}
                    renderLabel={({ route, focused, color }) => (
                       
                        <Text>
                            {route?.title}
                        </Text>
                    )}
                />
            </>
        )
    }

    const renderScene = ({ route }) => {
        return <ListSale data={route} />
    };



    return (
        <>
            <View
                style={styles.container}>
                <StatusBarCustom />
                <ImageBackground
                    source={require('../../Image/flashsale/backGround.png')}
                    style={{
                        height: _heightScale(8 * 9.5),
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

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

                    {/* <Image style={{
                        width: _moderateScale(8 * 15),
                        height: _moderateScale(8 * 10),
                        resizeMode: 'contain'
                    }} source={require('../../Image/flashsale/sale.png')} /> */}

                </ImageBackground>

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

                {/* <ScrollView style={{}}>

                    <View style={{ backgroundColor: WHITE }}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, index) => {
                                return (
                                    <Text style={{ height: 100 }}>
                                        {item}
                                    </Text>
                                )
                            })
                        }
                    </View>
                </ScrollView> */}

            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    topWallet: {
        height: _moderateScale(56),
        backgroundColor: BASE_COLOR,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: BASE_COLOR,
    },
    tabItem: {
        width: _moderateScale((Dimensions.get('window').width / 3)),
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: _moderateScale(12)
    },
    titleTab: {
        color: WHITE,
        fontWeight: 'bold',
        fontSize: _moderateScale(16)
    }
})


export default FlashSale;