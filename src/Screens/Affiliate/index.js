import React, { useRef, useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ScrollView, Clipboard, Alert } from 'react-native';
import { GREY, WHITE, BASE_COLOR, SECOND_COLOR, BTN_PRICE, RED, BLUE_FB, THIRD_COLOR, BLACK, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _moderateScale, _width } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { navigation } from '../../../rootNavigation';
import moment from 'moment'

import Menu from './Menu'
import { useSelector, useDispatch } from 'react-redux';
import { getWallet, getCurrentCommission, getCollabStatistic, getMineCommission } from '../../Redux/Action/InfoAction'
import { formatMonney } from '../../Constant/Utils';
import ModalCashInWallet from './Components/ModalCashInWallet';
import ModalInfoWallet from './Components/ModalInfoWallet';
import ScreenKey from '../../Navigation/ScreenKey'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { TabBar, TabView } from 'react-native-tab-view';
import Wallet from './Wallet/index'
import Service from './Service/index'
import QAndA from './Q&A/index'
import ModalFlashMsg from '../../Components/ModalFlashMsg/ModalFlashMsg';
import LinearGradient from 'react-native-linear-gradient';
import { URL_ORIGINAL } from '../../Constant/Url';
import ModalInfoUserAffiliate from './Components/ModalInfoUserAffiliate';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import YoutubePlayer from "react-native-youtube-iframe";
import ModalIframeYoutube from '../../Components/ModalIframeYoutube/ModalIframeYoutube';
import { getConfigData } from '../../Redux/Action/OrtherAction';


const Affiliate = (props) => {
    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)
    const [wallet, setWallet] = useState(null)
    const [mineCommission, setMineCommission] = useState(null)
    const [commission, setCommission] = useState(null)
    const [collabStatistic, setCollabStatistic] = useState(null)

    const [showModalCashIn, setShowModalCashIn] = useState(false)
    const [showModalInfoWallet, setShowModalInfoWallet] = useState(false)

    const [showModalFlashMsg, setShowModalFlashMsg] = useState(false)

    const [showModalInfoUserAffiliate, setShowModalInfoUserAffiliate] = useState(false)


    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Ví' },
        { key: 'second', title: `Dịch vụ` },
        { key: 'third', title: `Hỏi đáp` },
    ]);
    const [index, setIndex] = useState(0);

    const [playingYoutube, setPlayingYoutube] = useState({
        show: false,
        playList: [],
        playListStartIndex: 0
    })


    const scrollA = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (props?.route?.params?.showModalInfoWallet) {
            setShowModalInfoWallet(true)
        }
    }, [props?.route?.params?.showModalInfoWallet])

    useEffect(() => {
        _getWallet()
        _getCurrentCommission()
        // dispatch(getCollabStatistic({
        //     "condition": {
        //         'updated': {
        //             'from': moment().startOf('month').format('YYYY-MM-DD'),
        //             'to': moment().endOf('month').format('YYYY-MM-DD')
        //         }
        //     }
        //  }))
        _getMineCommission()
        _getConfigData()
        // _checkCollab()
    }, [])

    const _getConfigData = async () => {
        let result = await getConfigData("TUT_COLLAB")
        if (result?.isAxiosError) return;
        setPlayingYoutube(old => {
            return {
                ...old,
                playList: [result?.value]
            }
        })
    }

    const _checkCollab = () => {
        if (infoUserRedux?.isCollaborator) {

        } else {
            return Alert.alert(
                `Thông báo`,
                `Bạn cần phải trở thành cộng tác viên để sử dụng chức năng này`,
                [
                    {
                        text: "Để sau",
                        onPress: () => console.log("Cancel Pressed"),
                    },
                    {
                        text: 'Đăng ký ngay!',
                        onPress: () => {
                            navigation.navigate(ScreenKey.VERIFICATION_CTV)
                        },
                    }
                ],
                { cancelable: false }
            )
        }
    }

    const _getMineCommission = async () => {
        var data = await getMineCommission()
        if (data?.isAxiosError) return
        setMineCommission(data?.data?.data)
    }

    const _getWallet = async () => {
        var data = await getWallet()
        if (data?.isAxiosError) return
        setWallet(data)
    }

    const _getCurrentCommission = async () => {
        // var data = await getCurrentCommission()
        // if (data?.isAxiosError) return
        // setCommission(data)
    }

    const _handleOpenModalCashIn = () => {
        setShowModalCashIn(true)
    }

    const _handleWithDraw = () => {
        // navigation.navigate(ScreenKey.LIST_BANK_FOR_WITHDRAW)
        navigation.navigate(ScreenKey.WITH_DRAW, { _getWallet, _getCurrentCommission })
    }

    const _renderIcon = (route, focused) => {
        switch (route?.key) {
            case 'first':
                return (
                    <Image
                        style={[{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain'
                        }]} source={focused ? require('../../NewIcon/a_wallet.png') : require('../../NewIcon/i_wallet.png')} />
                )
            case 'second':
                return (
                    <Image
                        style={[{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain'
                        }]} source={focused ? require('../../NewIcon/a_lip.png') : require('../../NewIcon/i_lip.png')} />
                )
            case 'third':
                return (
                    <Image
                        style={[{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain'
                        }]} source={focused ? require('../../NewIcon/a_qa.png') : require('../../NewIcon/i_qa.png')} />
                )

            default:
                break;
        }
    }

    const renderTabBar = (props) => {
        return (
            <>
                <TabBar
                    tabStyle={{ flexDirection: 'row', alignItems: 'center', width: 'auto', height: 'auto' }}
                    {...props}
                    indicatorStyle={{ backgroundColor: 'transparent' }}
                    style={{
                        backgroundColor: BG_GREY_OPACITY_2,
                        shadowOffset: { height: 0, width: 0 },
                        shadowColor: 'transparent',
                        shadowOpacity: 0,
                        elevation: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: BG_GREY_OPACITY_5
                    }}
                    inactiveColor="grey"
                    activeColor={BASE_COLOR}
                    scrollEnabled
                    getLabelText={({ route }) => route.title}
                    renderLabel={({ route, focused, color }) => (
                        <View style={{ width: _width / 5, alignItems: 'center' }}>
                            <View style={[{
                                width: _moderateScale(8 * 2.5),
                                height: _moderateScale(8 * 2.5),
                                overflow: 'hidden'
                            }, focused ? { borderColor: THIRD_COLOR } : { borderColor: 'transparent' }]}>
                                {
                                    _renderIcon(route, focused)
                                }
                            </View>
                            <Text style={[{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), marginTop: _moderateScale(0), color: GREY, opacity: 0.8 },
                            focused && { ...stylesFont.fontNolanBold, opacity: 1, color: BASE_COLOR, fontSize: _moderateScale(14) }]} numberOfLines={1}>
                                {route?.title}
                            </Text>
                        </View>
                    )}
                />




            </>
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Wallet />;
            case 'second':
                return <Service />;
            case 'third':
                return <QAndA />;


            default:
                return null;
        }
    };

    const _renderLevel = (code) => {
        switch (code) {
            case 'SILVER':
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14) }}>
                            Thứ hạng:
                        </Text>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                            {` Bạc`}
                        </Text>
                    </View>
                )

            case 'GOLD':
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <Text>
                            Thứ hạng:
                        </Text>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                            {` Vàng`}
                        </Text>
                    </View>
                )
            case 'PLATINUM':
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <Text>
                            Thứ hạng:
                        </Text>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                            {` Bạch kim`}
                        </Text>
                    </View>
                )
            case 'VIP':
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14) }}>
                            Thứ hạng:
                        </Text>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                            {` VIP`}
                        </Text>
                    </View>
                )
            default:
                break;
        }
    }

    const _renderFlag = (code) => {
        switch (code) {
            case 'SILVER':
                return (
                    <Image style={[sizeIcon.xxlllg]}
                        source={require('../../NewIcon/flagBac.png')} />
                )

            case 'GOLD':
                return (
                    <Image style={[sizeIcon.xxlllg]}
                        source={require('../../NewIcon/flagVang.png')} />
                )
            case 'PLATINUM':
                return (
                    <Image style={[sizeIcon.xxlllg]}
                        source={require('../../NewIcon/flagBK.png')} />
                )
            case 'VIP':
                return (
                    <Image style={[sizeIcon.xxlllg]}
                        source={require('../../NewIcon/flagVIP.png')} />
                )
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom gradient/>

            <ModalIframeYoutube
                playList={playingYoutube?.playList}
                playListStartIndex={playingYoutube?.playListStartIndex}
                hide={() => {
                    setPlayingYoutube(old => {
                        return {
                            ...old,
                            show: false,
                            // playList: [],
                            playListStartIndex: 0
                        }
                    })
                }}
                show={playingYoutube?.show} />

            <ModalInfoUserAffiliate
                hide={() => {
                    setShowModalInfoUserAffiliate(false)
                }}
                show={showModalInfoUserAffiliate} />

            <ModalFlashMsg
                bottom
                show={showModalFlashMsg}
                hide={() => {
                    setShowModalFlashMsg(false)
                }}
                data={'Đã copy mã giới thiệu.'} />

            <ModalInfoWallet
                handleOpenModalCashIn={_handleOpenModalCashIn}
                handleWithDraw={_handleWithDraw}
                data={wallet}
                commission={commission}
                hide={() => {
                    setShowModalInfoWallet(false)
                }}
                show={showModalInfoWallet} />

            <ModalCashInWallet
                hide={() => {
                    setShowModalCashIn(false)
                }}
                show={showModalCashIn} />

            <View
                style={{ width: "100%", paddingBottom: _moderateScale(8 * 0), backgroundColor: BASE_COLOR }}>
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
                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 1), marginTop: _moderateScale(8 * 1) }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Image
                            style={[sizeIcon.llg]}
                            source={require('../../Icon/back_left_white.png')} />
                    </TouchableOpacity>

                    <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8), flex: 1, justifyContent: 'space-between' }]}>

                        {/* <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                Clipboard.setString(infoUserRedux?.collaboratorCode)
                                setShowModalFlashMsg(true)
                                setTimeout(() => {
                                    setShowModalFlashMsg(false)
                                }, 1500);
                            }}
                            style={{
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(4),
                                paddingVertical: _moderateScale(4),
                                paddingHorizontal: _moderateScale(8 * 3),
                                marginHorizontal: _moderateScale(8 * 2),
                                height: _moderateScale(8 * 5),
                                justifyContent: 'center'
                            }}>
                            <View style={[styleElement.rowAliCenter]}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                    Mã:
                                </Text>
                                {
                                    <Text selectable={true} style={[stylesFont.fontNolanBold, { marginLeft: _moderateScale(8 * 1), fontSize: _moderateScale(15), color: BLUE_FB }]}>
                                        {`${infoUserRedux?.collaboratorCode}`}
                                    </Text>
                                }
                            </View>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                Clipboard.setString(infoUserRedux?.collaboratorCode)
                                setShowModalFlashMsg(true)
                                setTimeout(() => {
                                    setShowModalFlashMsg(false)
                                }, 1500);
                            }}
                            style={{
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(4),
                                paddingVertical: _moderateScale(4),
                                paddingHorizontal: _moderateScale(8 * 1),
                                marginHorizontal: _moderateScale(8 * 2),
                                height: _moderateScale(8 * 7),
                                justifyContent: 'center',
                                flex: 4
                            }}>
                            <View style={[styleElement.rowAliCenter]}>
                                {
                                    _renderFlag(infoUserRedux?.levelCode)
                                }
                                <View style={{ marginLeft: _moderateScale(8), flex: 1 }}>
                                    <Text numberOfLines={1} style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                                        {infoUserRedux?.name}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {_renderLevel(infoUserRedux?.levelCode)}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity> */}
                        <View style={[styles.bannerPrice, { height: _moderateScale(8 * 5), backgroundColor: WHITE }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModalInfoWallet(true)
                                }}
                                style={{ padding: _moderateScale(8) }}>
                                {
                                    showModalInfoUserAffiliate ?
                                        <Text style={[stylesFont.fontDinTextProBold, styles.bannerPrice__textPrice, { bottom: 2 }]}>

                                        </Text>
                                        :
                                        <Text style={[stylesFont.fontDinTextProBold, styles.bannerPrice__textPrice, { bottom: 2 }]}>
                                            {formatMonney(wallet?.commissionAmount +
                                                wallet?.bonusAmount +
                                                wallet?.depositAmount)}
                                        </Text>
                                }

                            </TouchableOpacity>
                        </View>
                        <View style={{ width: _moderateScale(8) }} />

                        <View style={[{ flex: 1, borderRadius: _moderateScale(4) }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: _moderateScale(4) }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.QA_AFFILIATE)
                                    }}
                                    style={{ alignItems: 'center', flex: 1 }}>
                                    <View style={[styleElement.centerChild, {
                                        width: _moderateScale(8 * 4),
                                        height: _moderateScale(8 * 4),
                                    }]}>
                                        <Image
                                            style={{
                                                width: _moderateScale(8 * 3.85),
                                                height: _moderateScale(8 * 3.85),
                                                borderRadius: _moderateScale(8 * 2),
                                                borderColor: WHITE
                                            }}
                                            source={require('../../NewIcon/questionAffiliate.png')} />
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(14), letterSpacing: -1 }}>
                                        Hỏi đáp
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.RANKED)
                                    }}
                                    style={{ alignItems: 'center', flex: 1 }}>
                                    <View style={{
                                        width: _moderateScale(8 * 4),
                                        height: _moderateScale(8 * 4),
                                    }}>
                                        <Image
                                            style={{
                                                width: _moderateScale(8 * 4),
                                                height: _moderateScale(8 * 4),
                                                borderRadius: _moderateScale(8 * 2),
                                            }}
                                            source={require('../../NewIcon/ruybang1.png')} />
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(14), letterSpacing: -1 }}>
                                        BXH
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (infoUserRedux?.isCollaborator) {
                                            setShowModalInfoUserAffiliate(true)
                                        } else {
                                            return Alert.alert(
                                                `Thông báo`,
                                                `Bạn cần phải trở thành cộng tác viên để sử dụng chức năng này`,
                                                [
                                                    {
                                                        text: "Để sau",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                    },
                                                    {
                                                        text: 'Đăng ký ngay!',
                                                        onPress: () => {
                                                            navigation.navigate(ScreenKey.VERIFICATION_CTV)
                                                        },
                                                    }
                                                ],
                                                { cancelable: false }
                                            )
                                        }
                                    }}
                                    style={{ alignItems: 'center', flex: 1 }}>
                                    <Image
                                        style={{
                                            width: _moderateScale(8 * 4),
                                            height: _moderateScale(8 * 4),
                                            borderRadius: _moderateScale(8 * 2),
                                            borderWidth: 2,
                                            borderColor: WHITE
                                        }}
                                        source={{ uri: `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` }} />
                                    <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(14), letterSpacing: -1 }}>
                                        Hồ sơ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styleElement.rowAliTop, { paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 1) }]}>

                    <View style={{ width: _moderateScale(8 * 2) }} />

                </View>
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView scrollIndicatorInsets={{ right: 1 }}>
                    <View style={{
                        padding: _moderateScale(8 * 2)
                    }}>
                        <View style={styles.flagText}>
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
                                    paddingLeft: _moderateScale(8)
                                }} >
                                <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                                    <View style={styles.flagText__dot} />
                                    <Text style={styles.flagText__text}>
                                        Hoa hồng
                                    </Text>
                                </View>
                            </LinearGradient>
                        </View>
                        <View style={styles.totalPrice}>
                            <Text style={styles.totalPrice__text}>Tổng cộng</Text>
                            <Text style={styles.totalPrice__text2}>
                                {formatMonney(mineCommission?.total)}đ
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 2) }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.COMMISSION, { currIndex: 1 })
                                }}
                                style={[styles.box, shadow]}>
                                <View style={[{ flex: 1, justifyContent: 'center' }]}>
                                    <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                                        Hoa hồng trực tiếp
                                    </Text>
                                    <Text style={[styles.box__text2, { alignSelf: 'center' }]}>
                                        (Bán lẻ)
                                    </Text>
                                    <Text style={[styles.box__text3, { alignSelf: 'center' }]}>
                                        {formatMonney(mineCommission?.direct)}đ
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: '4%' }} />
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.COMMISSION, { currIndex: 2 })
                                }}
                                style={[styles.box, shadow]}>
                                <View style={[{ flex: 1, justifyContent: 'center' }]}>
                                    <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                                        Hoa hồng gián tiếp
                                    </Text>
                                    <Text style={[styles.box__text2, { alignSelf: 'center' }]}>
                                        (Đội nhóm)
                                    </Text>
                                    <Text style={[styles.box__text3, { alignSelf: 'center' }]}>
                                        {formatMonney(mineCommission?.indirect)}đ
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginTop: _moderateScale(8 * 2) }} />

                    <View style={{
                        padding: _moderateScale(8 * 2)
                    }}>
                        <View style={styles.flagText}>
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
                                    paddingLeft: _moderateScale(8)
                                }} >
                                <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                                    <View style={styles.flagText__dot} />
                                    <Text style={styles.flagText__text}>
                                        Đội ngũ
                                    </Text>
                                </View>
                            </LinearGradient>
                        </View>

                        <View style={{ marginTop: _moderateScale(8 * 2) }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.TEAMMATE, { currIndex: 1 })
                                }}
                                style={[styles.boxver2, shadow]}>
                                <View style={[{ flex: 1, justifyContent: 'center', paddingLeft: _moderateScale(8 * 2) }]}>
                                    <Text style={[styles.box__text]}>
                                        Người hướng dẫn
                                    </Text>
                                    <View style={{ paddingLeft: _moderateScale(0) }}>
                                        <Text style={[styles.box__text2]}>
                                            (Cấp quản lý trực tiếp)
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: _moderateScale(8) }} />

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.TEAMMATE, { currIndex: 2 })
                                }}
                                style={[styles.boxver2, shadow]}>
                                <View style={[{ flex: 1, justifyContent: 'center', paddingLeft: _moderateScale(8 * 2) }]}>
                                    <Text style={[styles.box__text]}>
                                        Cấp trên
                                    </Text>
                                    <View style={{ paddingLeft: _moderateScale(0) }}>
                                        <Text style={[styles.box__text2]}>
                                            (Trung gian giữa lãnh đạo và người hướng dẫn)
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: _moderateScale(8) }} />

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.TEAMMATE, { currIndex: 3 })
                                }}
                                style={[styles.boxver2, shadow]}>
                                <View style={[{ flex: 1, justifyContent: 'center', paddingLeft: _moderateScale(8 * 2) }]}>
                                    <Text style={[styles.box__text,]}>
                                        Lãnh đạo
                                    </Text>
                                    <View style={{ paddingLeft: _moderateScale(0) }}>
                                        <Text style={[styles.box__text2]}>
                                            (Cấp cao nhất trong hệ thống)
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: _moderateScale(8) }} />

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.TEAMMATE, { currIndex: 4 })
                                }}
                                style={[styles.boxver2, shadow]}>
                                <View style={[{ flex: 1, justifyContent: 'center', paddingLeft: _moderateScale(8 * 2) }]}>
                                    <Text style={[styles.box__text]}>
                                        Nhóm cấp dưới
                                    </Text>
                                    <View style={{ paddingLeft: _moderateScale(0) }}>
                                        <Text style={[styles.box__text2]}>
                                            (CTV bên dưới quản lý trực tiếp bởi bạn)
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                        {/* <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 2) }}>

                            <View style={{ width: '4%' }} />
                            
                        </View> */}
                    </View>

                    {
                        infoUserRedux?.isCollaborator ?
                            <>
                                <View style={{ width: '100%', height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginTop: _moderateScale(8 * 2) }} />

                                <View style={{
                                    padding: _moderateScale(8 * 2)
                                }}>
                                    <View style={styles.flagText}>
                                        <LinearGradient
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 1 }}
                                            colors={[
                                                BASE_COLOR,
                                                SECOND_COLOR,
                                            ]}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                paddingLeft: _moderateScale(8)
                                            }}>
                                            <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                                                <View style={styles.flagText__dot} />
                                                <Text style={styles.flagText__text}>
                                                    Bán hàng
                                                </Text>
                                            </View>
                                        </LinearGradient>
                                    </View>

                                    <View style={{ marginTop: _moderateScale(8 * 2) }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(ScreenKey.AFFILIATE_SERVICE)
                                            }}
                                            style={[styles.boxver2, shadow]}>
                                            <View style={[{ flex: 1, justifyContent: 'center', paddingLeft: _moderateScale(8 * 2) }]}>
                                                <Text style={[styles.box__text]}>
                                                    Dịch vụ
                                                </Text>
                                                <View style={{ paddingLeft: _moderateScale(0) }}>
                                                    <Text style={[styles.box__text2]}>
                                                        {/* ... */}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </>
                            : <></>
                    }
                    <View style={{ width: '100%', height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginTop: _moderateScale(8 * 2) }} />

                    <View style={{
                        padding: _moderateScale(8 * 2)
                    }}>
                        <View style={styles.flagText}>
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
                                    paddingLeft: _moderateScale(8)
                                }} >
                                <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                                    <View style={styles.flagText__dot} />
                                    <Text style={styles.flagText__text}>
                                        Theo dõi
                                    </Text>
                                </View>
                            </LinearGradient>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 2) }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.AFFILIATE_WALLET)
                                }}
                                style={[styles.boxver2, shadow]}>
                                <View style={[{ flex: 1, justifyContent: 'center', paddingLeft: _moderateScale(8 * 2) }]}>
                                    <Text style={[styles.box__text]}>
                                        Đơn hàng & Booking
                                    </Text>
                                    <View style={{ paddingLeft: _moderateScale(0) }}>
                                        <Text style={[styles.box__text2]}>
                                            {/* ... */}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.AFFILIATE_WALLET)
                                }}
                                style={[styles.box, shadow]}>
                                <View style={[{ flex: 1, justifyContent: 'center' }]}>
                                    <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                                        Theo dõi Booking
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
                            <View style={{ width: '4%' }} />

                        </View>
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>

                <TouchableOpacity
                    onPress={() => {
                        setPlayingYoutube(old => {
                            return {
                                ...old,
                                show: true,
                                playListStartIndex: 0
                            }
                        })
                    }}
                    style={{
                        position: 'absolute',
                        bottom: getBottomSpace() + _moderateScale(8 * 2),
                        right: _moderateScale(8 * 2)
                    }}>
                    <Image style={sizeIcon.xxxlllg} source={require('../../NewIcon/tutorialCTV.png')} />
                    <Text style={{
                        ...stylesFont.fontNolanBold,
                        fontSize: _moderateScale(14)
                    }}>
                        Hướng dẫn
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
}

const styles = StyleSheet.create({
    box__text3: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(18),
        color: '#EF9000',
    },
    box__text2: {
        ...stylesFont.fontNolan,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    box__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    box: {
        width: '48%',
        height: _moderateScale(8 * 12),
        borderRadius: _moderateScale(8 * 1),
        backgroundColor: WHITE,
    },
    boxver2: {
        width: '100%',
        height: _moderateScale(8 * 7),
        borderRadius: _moderateScale(8 * 1),
        backgroundColor: WHITE,
    },
    totalPrice__text2: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(24),
        color: '#FA4664',
    },
    totalPrice__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    totalPrice: {
        marginTop: _moderateScale(8 * 1),
        alignItems: 'center'
    },
    flagText__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: WHITE,
        marginLeft: _moderateScale(8)
    },
    flagText__dot: {
        width: _moderateScale(8 * 1.5),
        height: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(8 * 1.5 / 2),
        backgroundColor: WHITE
    },
    flagText: {
        width: _moderateScale(8 * 14),
        height: _moderateScale(8 * 3.5),
        // backgroundColor: BASE_COLOR,
        borderTopEndRadius: _moderateScale(8 * 2),
        borderBottomEndRadius: _moderateScale(8 * 2),
        overflow: 'hidden',
        borderTopStartRadius: _moderateScale(4),
        borderBottomStartRadius: _moderateScale(4),
    },
    btnMenu: {
        height: _moderateScale(100),
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bannerStatis: {
        backgroundColor: BTN_PRICE,
        height: _moderateScale(8 * 6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    btnOptionCash__text: {
        fontSize: _moderateScale(14),
        color: WHITE,
        alignSelf: 'center',
        marginTop: _moderateScale(4)
    },
    btnOptionCash: {
        width: _moderateScale(8 * 9),
        height: _moderateScale(8 * 9),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(2),
        borderColor: WHITE,
        backgroundColor: BTN_PRICE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: _moderateScale(8 * 2)
    },
    btnCopy: {
        // width:"100%",
        flex: 1,
        marginLeft: _moderateScale(8 * 1),
        borderRadius: _moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: _moderateScale(2),
        borderWidth: _moderateScale(1),
        borderColor: WHITE
    },
    bannerPrice__textPrice: {
        color: '#5D5FEF',
        fontSize: _moderateScale(20),
        alignSelf: 'center',
        // marginBottom: _moderateScale(8 * 1),
        // marginTop: _moderateScale(8),
    },
    bannerPrice: {
        // marginHorizontal: _moderateScale(8 * 4),
        backgroundColor: 'rgba(255, 255, 255,0.8)',
        // paddingHorizontal: _moderateScale(8 * 2),
        // paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(4),
        // marginTop: _moderateScale(8 * 2),
        // position: 'relative',
        flex: 1,
        // alignSelf:'flex-start'
        // width: _moderateScale(8 * 20)
    },
    btnOptions__icon: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain'
    },
    btnOptions: {
        width: _moderateScale(100),
        height: _moderateScale(100),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: _moderateScale(20),
        color: WHITE,
        marginLeft: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 3)
    },

    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(300),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
}
)


export default Affiliate;