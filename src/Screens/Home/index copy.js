import React, { memo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Animated,
    Dimensions,
    SafeAreaView,
    Linking,
    Platform,
} from "react-native";
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
const deviceWidth = Dimensions.get("window").width;


import { _height, _moderateScale, _widthScale, _heightScale, _width } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BASE_COLOR, SECOND_COLOR, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, BG_GREY_OPACITY_7, BG_GREY_OPACITY_3, BLACK, THIRD_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ListOptions from './ListOptions'
import ListServices from './ListServices'

import ItemNews from './Components/ItemNews'
import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import ListNews from './ListNews';
import { navigation } from '../../../rootNavigation';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import ListHighlightNews from './ListHighlightNews';
import AboutOurDoctor from './AboutOurDoctor';
import NewListService from './NewListService';
import NewListProduct from './NewListProduct';
import * as DeviceInfo from 'react-native-device-info';
import { getWallet } from '../../Redux/Action/InfoAction';
import AsyncStorage from '@react-native-community/async-storage';
import BubbleDiaryNotUpdate from '../../Screens/BubbleDiaryNotUpdate/BubbleDiaryNotUpdate'
import LinearGradient from 'react-native-linear-gradient';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { getAllServiceGroup } from '../../Redux/Action/ServiceGroup';
import HorizonListServiceGr from './Components/HorizonListServiceGr';
import NewListOptions from './Components/NewListOptions';
import BannerHorizon from './Components/BannerHorizon';
import { getAllNewsv2, getEncyclopedia } from '../../Redux/Action/News';
import TabviewBody from './Components/TabviewBody';
import ListService from './Components/ListService';
import { getServicev2 } from '../../Redux/Action/Service';
import { getListBranchV2 } from '../../Redux/Action/BranchAction';
import ListBranch from './Components/ListBranch';
import { getAllDoctorv2 } from '../../Redux/Action/DoctorAction';
import ListDoctor from './Components/ListDoctor';
import { getAllProductv2 } from '../../Redux/Action/Product';
import ListProduct from './Components/ListProduct';
import AdsFlashSale from './Components/AdsFlashSale';
import { checkFlashSale } from '../../Redux/Action/FlashSaleAction'
import ItemNew from '../../Screens/Home/Components/ItemNews'
import ItemEncyclopedia from './Components/ItemEncyclopedia';
import { getConfigFileByCode } from '../../Redux/Action/SpinWheelAction';
import ListEncyclopedia from './Components/ListEncyclopedia'
import { RefreshControl } from 'react-native';
import { StatusBar } from 'react-native';


const index = memo((props) => {
    const scrollableTabViewRef = useRef()
    const scrollY = useRef(new Animated.Value(0)).current;
    const [rootTime, setRootTime] = useState(Date.now())
    const [stacks, setStacks] = useState([
        {
            screen: ListService,
            tabLabel: "Dịch vụ",
        },
        {
            screen: ListBranch,
            tabLabel: "Phòng khám",
        },
        {
            screen: ListDoctor,
            tabLabel: "Bác sĩ",
        },
        {
            screen: ListProduct,
            tabLabel: "Sản phẩm",
        },
        {
            screen: ListEncyclopedia,
            tabLabel: "Bách khoa",
        },
    ])
    const infoUserRedux = useSelector(state => state?.infoUserReducer)
    const listServiceGroupRedux = useSelector(state => state.serviceGroupReducer?.listServiceGroup)

    const RefScrollView = useRef(null)
    const dispatch = useDispatch()

    const scrollA = useRef(new Animated.Value(0)).current;
    const walletReducer = useSelector(state => state?.walletReducer?.infoWallet)

    const isShowBagedDiaryRedux = useSelector(state => state.notificationReducer.isShowBagedDiary)


    const [listAllNews, setListAllNews] = useState([])

    const [currOption, setCurrOption] = useState('DV')
    const [isFlashSaleReady, setIsFlashSaleReady] = useState(false)
    const [isAdsFlashSaleReady, setIsAdsFlashSaleReady] = useState(false)

    const [btnFlashSale, setbtnFlashSale] = useState({})


    const [list5Service, setList5Service] = useState([])
    const [list5Branch, setList5Branch] = useState([])
    const [list5Doctor, setList5Doctor] = useState([])
    const [list5Product, setList5Product] = useState([])
    const [list5Encyclopedia, setList5Encyclopedia] = useState([])
    const [onlayoutHeightHeaderMain, setOnlayoutHeightHeaderMain] = useState(0)


    useEffect(() => {

        _checkFlashSale()

        var condition = {
            condition: {
                parentCode: {
                    equal: null
                }
            },
            "sort": {
                "orderNumber": -1
            },
            "limit": 100,
            "page": 1
        }

        dispatch(getAllServiceGroup(condition))
        _getAllNews()
        _getLogoFlashSale()
    }, [])

    const _checkFlashSale = async () => {
        let result = await checkFlashSale()
        if (result?.isAxiosError) return

        if (result?.data?.data?.availableFlashSale > 0) {
            setIsAdsFlashSaleReady(true)
            setIsFlashSaleReady(true)
        }

    }

    const _getLogoFlashSale = async () => {
        let result = await getConfigFileByCode("BUTTON_FLS");
        if (result?.isAxiosError) return
        setbtnFlashSale(result?.data?.data)
    }

    const _getAllNews = async () => {
        let result = await getAllNewsv2({
            condition: {
                isPin: { equal: true }
            },
            "sort": {
                "orderNumber": -1
            },
            limit: 5
        })
        if (result?.isAxiosError) return
        setListAllNews(result?.data?.data)
    }

    useEffect(() => {
        if (infoUserRedux?.infoUser?._id) {
            _getWallet()
        }
    }, [infoUserRedux])

    const _getWallet = async () => {

        let tokenSTR = await AsyncStorage.getItem("token");

        if (tokenSTR) {
            var data = await getWallet()
            if (data?.isAxiosError) return

            store.dispatch({
                type: ActionType.SET_DATA_WALLET,
                payload: {
                    data: data
                }
            })
        }
    }




    const refreshCurrentTab = () => {


        if (scrollableTabViewRef?.current) {
            const currentTabScreen = scrollableTabViewRef?.current;
            console.log({ currentTabScreen, scrollableTabViewRef });

            // scrollableTabViewRef?.current?._scrollTo(0)

            if (currentTabScreen && currentTabScreen._onRefresh) {
                currentTabScreen._onRefresh();
            }
        }
    };


    const _renderHeader = () => {
        return (
            <>

                <Animated.View style={[{ height: Platform.OS == 'ios' ? _moderateScale(8 * 18 + getStatusBarHeight()) : _moderateScale(8 * 18) }]}>
                    {/* <LinearGradient
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={gradient.color}
                        style={gradient.container}> */}

                    <Animated.View style={[{
                        width: _width,
                        height: Platform.OS == 'ios' ? _moderateScale(8 * 18 + getStatusBarHeight()) : _moderateScale(8 * 18),
                        backgroundColor: BASE_COLOR,
                        position: 'absolute'
                    }, styles.banner(scrollY)]} />

                    <Animated.Image
                        style={[{
                            width: _width,
                            height: Platform.OS == 'ios' ? _moderateScale(8 * 18 + getStatusBarHeight()) : _moderateScale(8 * 18),
                            // backgroundColor: BASE_COLOR,
                            position: 'absolute'
                        }, styles.banner(scrollY)]}
                        blurRadius={1}
                        source={{
                            uri: `https://media.istockphoto.com/photos/beauty-treatment-items-for-spa-procedures-on-white-wooden-table-picture-id1286682876?b=1&k=20&m=1286682876&s=170667a&w=0&h=I_b9K2r8CVmVN87aaSSkIjwRDmSF02MhcMP2bJRTz-I=`
                        }} />
                    <Animated.View style={[StyleSheet.absoluteFillObject,
                    // { backgroundColor: 'rgba(100, 26, 150,0.5)' },
                    styles.banner(scrollY)]} >
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            locations={[0, 0.6, 1]}
                            colors={gradient.color}
                            style={gradient.container} />
                    </Animated.View>

                    <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: Platform.OS == 'ios' ? _moderateScale(8 + getStatusBarHeight()) : _moderateScale(8) }]}>
                        <View style={styles.avatarLia}>
                            <Image
                                style={[{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'contain'
                                }]} source={require('../../NewImage/logoCenter2.png')} />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.SEARCHING_HOME)
                            }}
                            style={{ marginTop: _moderateScale(0), marginLeft: _moderateScale(8 * 2) }}>
                            <View style={styles.inputHeader}>
                                <Image
                                    style={[sizeIcon.xs, { marginRight: _moderateScale(8), top: 1, opacity: 0.9 }]}
                                    source={require('../../NewIcon/searchWhite.png')} />
                                <View>
                                    <Text style={[stylesFont.fontNolan500, { paddingVertical: 0, fontSize: _moderateScale(14), color: WHITE }]}>
                                        Bạn cần tìm ?
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginLeft: _moderateScale(8) }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!infoUserRedux?.infoUser?._id) {
                                        store.dispatch({
                                            type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                            payload: {
                                                flag: true,
                                                currRouteName: props?.route?.name
                                            }
                                        })
                                        return
                                    }
                                    navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                                }}
                            >
                                <Image
                                    style={{
                                        width: _moderateScale(8 * 4),
                                        height: _moderateScale(8 * 4),
                                        borderRadius: _moderateScale(8 * 2),
                                        borderWidth: 1,
                                        borderColor: WHITE
                                    }}
                                    source={{ uri: `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <AlarmNotifi />
                        </View>
                    </View>
                    <NewListOptions />
                    {/* </LinearGradient> */}
                    <View style={styles.wave} />
                </Animated.View>

                <View style={{ backgroundColor: WHITE }}>
                    <View onLayout={(e) => {
                    }}>
                        <HorizonListServiceGr data={[...listServiceGroupRedux]} />
                        <View style={{ height: _moderateScale(8 * 0) }} />
                        <View>
                            <BannerHorizon listAllNews={listAllNews} />
                        </View>
                        <View style={{ height: _moderateScale(8 * 3) }} />
                    </View>
                </View>
            </>
        )
    }

    const _renderListOptionTitle = () => {
        return (
            <View style={{ height: '100%' }}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 0.6, 1]}
                    colors={gradient.color}
                    style={gradient.container}>
                    <View style={{
                        height: '100%', justifyContent: 'flex-end', paddingBottom: _moderateScale(4), paddingHorizontal: _moderateScale(8 * 2)
                    }}>

                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.SEARCHING_HOME)
                                }}
                                style={{}}>
                                <View style={[]}>
                                    <Image
                                        style={[sizeIcon.xs, { opacity: 0.9 }]}
                                        source={require('../../NewIcon/searchWhite.png')} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    if (!infoUserRedux?.infoUser?._id) {
                                        store.dispatch({
                                            type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                            payload: {
                                                flag: true,
                                                currRouteName: props?.route?.name
                                            }
                                        })
                                        return
                                    }
                                    navigation.navigate(ScreenKey.QR_CODE)
                                }}
                                style={styles.btnOption}>
                                <Image style={[sizeIcon.lg, { opacity: 0.9 }]} source={require('../../NewIcon/qrWhite.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!infoUserRedux?.infoUser?._id) {
                                        store.dispatch({
                                            type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                            payload: {
                                                flag: true,
                                                currRouteName: props?.route?.name
                                            }
                                        })
                                        return
                                    }
                                    navigation.navigate(ScreenKey.CREATE_BOOKING)
                                }}
                                style={styles.btnOption}>
                                <Image style={[sizeIcon.lg, { opacity: 0.9 }]} source={require('../../NewIcon/calendarWhite.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!infoUserRedux?.infoUser?._id) {
                                        store.dispatch({
                                            type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                            payload: {
                                                flag: true,
                                                currRouteName: props?.route?.name
                                            }
                                        })
                                        return
                                    }
                                    navigation.navigate(ScreenKey.VIDEO_REQUEST)
                                }}
                                style={styles.btnOption}>
                                <Image style={[sizeIcon.lg]} source={require('../../NewIcon/videoCallWhite.png')} />
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (infoUserRedux?.infoUser?._id) {
                                            if (infoUserRedux?.infoUser?.isCollaborator) {
                                                navigation.navigate(ScreenKey.AFFILIATE)
                                            } else {
                                                navigation.navigate(ScreenKey.VERIFICATION_CTV)
                                            }
                                        } else {
                                            store.dispatch({
                                                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                                payload: {
                                                    flag: true,
                                                    currRouteName: props?.route?.name
                                                }
                                            })
                                            return
                                        }
                                    }}
                                    style={styles.btnOption}>
                                    <Image style={[sizeIcon.lg]} source={require('../../NewIcon/ctvWhite.png')} />
                                </TouchableOpacity>
                                {
                                    infoUserRedux?.infoUser?._id ?
                                        <>
                                            {
                                                !infoUserRedux?.infoUser?.isCollaborator ?
                                                    <Image style={[sizeIcon.xs, { position: 'absolute', zIndex: 100, top: -_moderateScale(10), right: -_moderateScale(10) }]} source={require('../../NewIcon/lock.png')} />
                                                    :
                                                    <></>
                                            }
                                        </>
                                        :
                                        <></>
                                }
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.LIST_ALL_NEWS)
                                }}
                                style={styles.btnOption}>
                                <Image style={[sizeIcon.lg]} source={require('../../NewIcon/newsWhite.png')} />
                            </TouchableOpacity>

                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!infoUserRedux?.infoUser?._id) {
                                            store.dispatch({
                                                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                                payload: {
                                                    flag: true,
                                                    currRouteName: props?.route?.name
                                                }
                                            })
                                            return
                                        }
                                        navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: _moderateScale(8 * 4),
                                            height: _moderateScale(8 * 4),
                                            borderRadius: _moderateScale(8 * 2),
                                            borderWidth: 1,
                                            borderColor: WHITE
                                        }}
                                        source={{ uri: `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </LinearGradient>
            </View>
        )
    }

    const _hanleClickSale = () => {
        // alert('Flash sale')
        setIsAdsFlashSaleReady(false)
        navigation.navigate(ScreenKey.FLASHSALE_SCREEN)
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={Platform.OS == 'ios' ? true : false} barStyle={'light-content'} backgroundColor={props?.bgColor || BASE_COLOR} />

            {
                isAdsFlashSaleReady == true ?
                    <TouchableOpacity
                        onPress={() => {
                            setIsAdsFlashSaleReady(false)
                        }}
                        activeOpacity={1}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: 1000,
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}>
                        <AdsFlashSale _hanleClickSale={_hanleClickSale}></AdsFlashSale>
                    </TouchableOpacity>
                    : <></>
            }

            <ScrollableTabView
                titleArgs={{
                    // style: {
                    //     backgroundColor: BASE_COLOR,
                    // },
                }}
                title={
                    <View>
                        {_renderListOptionTitle()}
                    </View>
                }
                onTabviewChanged={(index, tabLabel) => {
                    console.log(`${index},${tabLabel}`);
                    refreshCurrentTab()
                }}
                mappingProps={{
                    rootTime: rootTime,
                }}
                stacks={stacks}
                tabWrapStyle={{ flex: 1 }}
                tabInnerStyle={{ width: "100%", }}
                tabActiveOpacity={1}
                tabsStyle={{
                    height: _moderateScale(8 * 5),
                    backgroundColor: "white",
                    borderBottomColor: BG_GREY_OPACITY_3,
                    borderBottomWidth: 1,
                }}
                tabStyle={{
                    backgroundColor: "white",
                    // borderBottomColor: "#22242f",
                    // borderBottomWidth: 0.5,
                    width: deviceWidth / 4.25,
                }}
                tabUnderlineStyle={{
                    backgroundColor: BASE_COLOR,
                    top: 8 * 4,
                    height: 3,
                }}
                textStyle={{
                    color: BG_GREY_OPACITY_7,
                    ...stylesFont.fontNolanBold,
                    fontSize: _moderateScale(14)
                }}
                // ref={scrollableTabViewRef}
                ref={(it) => (scrollableTabViewRef.current = it)}
                textActiveStyle={{
                    color: BASE_COLOR,
                    ...stylesFont.fontNolanBold,
                    fontSize: _moderateScale(14),
                    // backgroundColor:SECOND_COLOR,
                }}
                header={
                    _renderHeader
                }
                firstIndex={0}
                useScroll={true}
                toTabsOnTab={true}
                oneTabHidden={true}
                enableCachePage={true}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: { contentOffset: { y: scrollY } },
                        },
                    ]
                )}
                onScroll2Horizontal={({ nativeEvent }) => {
                    console.log(nativeEvent.contentOffset.x);
                }}


                tabsEnableAnimatedUnderlineWidth={40}
                tabsEnableAnimated={true}
            >

            </ScrollableTabView>
            {
                isFlashSaleReady ?
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenKey.FLASHSALE_SCREEN)}
                        style={{
                            position: 'absolute',
                            right: _moderateScale(8 * 2), bottom: _heightScale(8 * 2)
                        }}>
                        {
                            btnFlashSale?.fileArr?.length > 0 ?
                                <ImageBackground style={[styleElement.centerChild, {
                                    width: _moderateScale(76),
                                    height: _moderateScale(76),
                                    paddingBottom: _moderateScale(4)
                                }]}
                                    resizeMode="contain"
                                    source={{ uri: `${URL_ORIGINAL}${btnFlashSale?.fileArr[0]?.link}` }}
                                >
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: WHITE }}>

                                    </Text>
                                </ImageBackground>
                                : <></>
                        }
                    </TouchableOpacity>
                    :
                    <></>
            }
        </View>
    );
});


const styles = StyleSheet.create({
    lineActive: {
        height: _moderateScale(2),
        width: '100%',
        backgroundColor: BASE_COLOR,
        position: 'absolute',
        bottom: -_moderateScale(6),
        zIndex: 1
    },
    titleTab: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        letterSpacing: -1,
        opacity: 0.5
    },
    titleTabActive: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        letterSpacing: -1,
        color: "black",
        opacity: 1
    },
    inputHeader: {
        width: _moderateScale(8 * 25),
        backgroundColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 1.5),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarLia: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        bottom: -_moderateScale(8 * 2)
    },
    banner: scrollA => ({
        // height: _moderateScale(300),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(8 * 18), 0, _moderateScale(8 * 18), _moderateScale(8 * 18) + 1],
                    outputRange: [-_moderateScale(8 * 18) / 2, 0, _moderateScale(8 * 18) * 0.75, _moderateScale(8 * 18) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(8 * 18), 0, _moderateScale(8 * 18), _moderateScale(8 * 18) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [3, 2, 1, 1],
                }),
            },
        ],
    }),
});



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}

const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,

        position: 'absolute',
        top: 0,
        left: 0,
        // borderBottomEndRadius: 24,
        // borderBottomStartRadius: 24
    },
    color: [
        BASE_COLOR,
        '#8c104e',
        '#db0505',
    ]
}




export default index;