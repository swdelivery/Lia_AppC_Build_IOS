import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { BASE_COLOR, THIRD_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
import ListSale from './Component/ListSale';
import Timer from './Component/Timer';
import { getFlashSale } from '../../Redux/Action/FlashSaleAction';
import { getConfigFileByCode } from '../../Redux/Action/SpinWheelAction';
import { URL_ORIGINAL } from '../../Constant/Url';
import ModalThele from '../WheelSpin/ModalThele';
import { getConfigData } from '../../Redux/Action/OrtherAction';

const FlashSale = (props) => {

    const walletReducer = useSelector(state => state?.walletReducer?.infoWallet)

    const [routes, setRoute] = useState([
        // { key: 'first', title: 'Fash Sale 1', start: '31-12-2021 9:00', end: '31-12-2021 10:30' },
        // { key: 'second', title: 'Fash Sale 2', start: '31-12-2021 12:00', end: '31-12-2021 13:00' },
        // { key: 'third', title: 'Fash Sale 3', start: '31-12-2021 15:00', end: '31-12-2021 16:00' },
        // { key: 'four', title: 'Fash Sale 4', start: '31-12-2021 18:00', end: '31-12-2021 19:00' },
    ]);
    const [index, setIndex] = useState(0);
    const [wallet, setWallet] = useState(null)

    const [logoFlashSale, setLogoFlashSale] = useState({})

    const [showModalThele, setShowModalThele] = useState(false)
    const [configThele, setConfigThele] = useState({})

    useEffect(() => {
        _getLogoFlashSale()
        _getFlashSale()
        _getConfigThele()

        // _getWallet()
        // routes?.map((route, index) => {
        //     const start = moment(route.start, 'DD-MM-YYYY HH:ss').toDate()
        //     const end = moment(route.end, 'DD-MM-YYYY HH:ss').toDate()
        //     const diffStart = moment(start).diff(moment(), 'seconds')
        //     const diffEnd = moment(end).diff(moment(), 'seconds')

        //     var type = ''

        //     if (moment(start).unix() <= moment().unix() &&
        //         moment().unix() <= moment(end).unix()) {
        //         type = 'current'
        //     }
        //     else if (moment().unix() <= moment(start).unix()) {
        //         type = 'notStart'
        //     }
        //     else if (moment(end).unix() <= moment().unix()) {
        //         type = 'hasEnd'
        //     }
        //     route.type = type
        //     route.diffStart = diffStart
        //     route.diffEnd = diffEnd

        //     if (index === routes.length - 1) {
        //         setRoute(routes)
        //     }
        // })
    }, [])


    const _getLogoFlashSale = async () => {
        let result = await getConfigFileByCode("LOGO_FLS");
        if (result?.isAxiosError) return
        setLogoFlashSale(result?.data?.data)
    }

    const _getConfigThele = async () => {
        let result = await getConfigData("FLASH_SALE_RULE")
        if (result?.isAxiosError) return
        setConfigThele(result)
    }

    const _getFlashSale = async () => {
        let result = await getFlashSale()
        if (result?.isAxiosError) return

        // return alert(moment.utc(moment.duration(64799, "seconds").asMilliseconds()).format("HH:mm"))
        let list = []
        result?.data?.data?.map((route, index) => {

            const start = moment(`${moment().format('DD-MM-YYYY')} ${moment.utc(moment.duration(route?.timeRange?.from, "seconds").asMilliseconds()).format("HH:mm")}`, 'DD-MM-YYYY HH:mm').toDate()
            const end = moment(`${moment().format('DD-MM-YYYY')} ${moment.utc(moment.duration(route?.timeRange?.to, "seconds").asMilliseconds()).format("HH:mm")}`, 'DD-MM-YYYY HH:mm').toDate()
            const diffStart = moment(start).diff(moment(), 'seconds')
            const diffEnd = moment(end).diff(moment(), 'seconds')

            console.log({ start, end });

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

            let x = {
                diffEnd: diffEnd,
                diffStart: diffStart,
                end: end,
                key: route?._id,
                start: start,
                title: route?.name,
                type: type,
            }
            list?.push(x)
        })

        setRoute(list)
    }

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
    console.log({ routes });


    const refTimer = useRef();

    const timerCallbackFunc = timerFlag => {
        // Setting timer flag to finished
        console.warn(
            'You can alert the user by letting him know that Timer is out.',
        );
    };

    const renderTabBar = (props) => {

        const inputRange = props.navigationState.routes.map((x, i) => x);
        return (
            <View style={styles.tabBar}>

                <ScrollView
                    contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
                    horizontal showsHorizontalScrollIndicator={false}>
                    {props.navigationState.routes.map((route, i) => {
                        const opacity = inputRange[props?.navigationState?.index]?.key === route.key ? 1 : 0.5
                        const active = inputRange[props?.navigationState?.index]?.key === route.key ? true : false

                        var type = route.type
                        var diffEnd = route.diffEnd
                        var diffStart = route.diffStart
                        var start = moment(route.start, 'DD-MM-YYYY HH:ss').toDate()
                        var end = moment(route.end, 'DD-MM-YYYY HH:ss').toDate()

                        // console.log('time', start, moment(start).unix(), end, moment(end).unix())
                        // console.log('type', type)
                        // console.log('--------',i)



                        return (
                            <TouchableOpacity
                                style={styles.tabItem}
                                onPress={() => setIndex(i)}>
                                {/* <Animated.Text style={[styles.titleTab,{ opacity: opacity }]}>{route.title}</Animated.Text> */}
                                <Animated.Text style={[styles.titleTab, { opacity: opacity }]}>
                                    {moment(start).format('HH:ss')}
                                </Animated.Text>
                                {type == 'notStart' &&
                                    <>
                                        <Animated.Text style={[{
                                            ...stylesFont.fontNolanBold,
                                            fontSize: _moderateScale(12),
                                            color: WHITE,
                                            marginVertical: _moderateScale(4),
                                            opacity: opacity
                                        }]}>
                                            Sắp bắt đầu
                                        </Animated.Text>
                                        <Timer
                                            ref={refTimer}
                                            timestamp={diffStart}
                                            timerCallback={timerCallbackFunc}
                                            opacity={true}
                                        />
                                    </>
                                }
                                {
                                    type === 'hasEnd' &&
                                    <Animated.Text style={[{
                                        ...stylesFont.fontNolanBold,
                                        fontSize: _moderateScale(12),
                                        color: THIRD_COLOR,
                                        marginVertical: _moderateScale(4),
                                        opacity: opacity
                                    }]}>
                                        Đã kết thúc
                                    </Animated.Text>
                                }
                                {
                                    type === 'current' && <>
                                        <Animated.Text style={[{
                                            ...stylesFont.fontNolanBold,
                                            fontSize: _moderateScale(12),
                                            color: THIRD_COLOR,
                                            marginVertical: _moderateScale(4),
                                            opacity: opacity
                                        }]}>
                                            Kết thúc trong
                                        </Animated.Text>
                                        <Timer
                                            ref={refTimer}
                                            timestamp={diffEnd}
                                            timerCallback={timerCallbackFunc}
                                            textStyle={styles.timerTextAHL}
                                        />
                                    </>
                                }

                                {/* <Animated.Text style={[styles.titleTab,{ opacity: opacity }]}>Sắp diễn ra</Animated.Text> */}
                                {active ? <Animated.View style={[{
                                    marginTop: _moderateScale(4),
                                    backgroundColor: WHITE,
                                    height: _moderateScale(2),
                                    width: _moderateScale(24),
                                    opacity: opacity
                                }]}>
                                </Animated.View>
                                    : <></>}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

            </View>
        )
    }
    const renderScene = ({ route }) => {
        return <ListSale data={route} />
    };



    return (
        <>
            <ModalThele
                hide={() => {
                    setShowModalThele(false)
                }}
                data={configThele}
                show={showModalThele}
            />

            <ImageBackground
                source={require('../../Image/flashsale/bg.png')}
                style={styles.container}>
                <StatusBarCustom />
                <View style={styles.topWallet}>

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

                    <View style={{}}>

                        {
                            logoFlashSale?.fileArr?.length > 0 ?
                                <Image style={{
                                    width: _moderateScale(8 * 12),
                                    height: _moderateScale(8 * 12),
                                    marginTop: _moderateScale(8 * 2),
                                    resizeMode: 'contain',
                                }}
                                    source={{ uri: `${URL_ORIGINAL}${logoFlashSale?.fileArr[0]?.link}` }}
                                />
                                : <></>
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModalThele(true)
                        }}
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: _moderateScale(8)
                        }}>
                        <Image style={{
                            width: _moderateScale(8 * 9),
                            height: _moderateScale(8 * 9),
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


            </ImageBackground>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'flex-start',
        // backgroundColor:WHITE

    },
    topWallet: {
        height: _moderateScale(56),
        // backgroundColor: BASE_COLOR,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        // backgroundColor: BASE_COLOR,
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
