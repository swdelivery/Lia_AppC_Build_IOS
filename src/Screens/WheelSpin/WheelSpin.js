import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Animated, Easing, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import { sizeIcon } from '../../Constant/Icon';
import ModalSuccess from './ModalSuccess';
import LuckyCircle from './LuckyCircle';
import { BG_GREY_OPACITY_2, GREY, BG_GREY_OPACITY_5, BASE_COLOR, SECOND_COLOR, WHITE, THIRD_COLOR, BLACK } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _heightScale, _widthScale } from '../../Constant/Scale';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import LinearGradient from 'react-native-linear-gradient';
import { styleElement } from '../../Constant/StyleElement';
import { navigation } from '../../../rootNavigation';
import ModalHistory from './ModalHistory';
import { getConfigSpinWheel, getPartnerWheelTurn, getNumberParticipant } from '../../Redux/Action/SpinWheelAction';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { getWallet } from '../../Redux/Action/InfoAction';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { getConfigData } from '../../Redux/Action/OrtherAction';
import ModalThele from './ModalThele';
import ScreenKey from '../../Navigation/ScreenKey'
import { alertCustomNotAction } from '../../Constant/Utils';
import ModalGetWheelSpinReward from './ModalGetWheelSpinReward';

const WheelSpin = memo((props) => {

    const [showModalSuccess, setShowModalSuccess] = useState({
        show: false,
        data: {}
    })
    const [showModalGetWheelSpinReward, setShowModalGetWheelSpinReward] = useState({
        show: false,
        data: {}
    })



    const [showModalHistory, setShowModalHistory] = useState(false)
    const [showModalThele, setShowModalThele] = useState(false)

    const [showOverlay, setShowOverlay] = useState(false)

    const [wheelTurnCount, setWheelTurnCount] = useState(null)
    const [configSpinWheel, setConfigSpinWheel] = useState({})
    const [configThele, setConfigThele] = useState({})

    const [numberParticipant, setNumberParticipant] = useState(null)

    const childRef = useRef(null)

    useEffect(() => {
        _getConfigSpinWheel()
        _getConfigThele()
        _getPartnerWheelTurn()
        _getNumberParticipant()
    }, [])

    const _getConfigSpinWheel = async () => {
        let result = await getConfigSpinWheel()
        if (result?.isAxiosError) return
        setConfigSpinWheel(result?.data?.data)
    }
    const _getNumberParticipant = async () => {
        let result = await getNumberParticipant()
        if (result?.isAxiosError) return
        setNumberParticipant(result?.data?.data?.numberOfParticipant)
        // setConfigSpinWheel(result?.data?.data)
    }
    const _getPartnerWheelTurn = async () => {
        let result = await getPartnerWheelTurn()
        if (result?.isAxiosError) return
        if (result?.data?.data?.amount == 0) {
            Alert.alert(
                "Thông báo",
                `Bạn đã hết lượt quay, hãy làm nhiệm vụ để lấy thêm lượt nhé!`,
                [
                    {
                        text: "Để sau",
                        onPress: () => console.log("Cancel Pressed"),
                        // style: "cancel"
                        // style: 'cancel'
                    },
                    {
                        text: "Đồng ý",
                        onPress: () => {
                            navigation.goBack()
                            navigation.navigate(ScreenKey.MISSION_SCREEN)
                        },
                    }
                ])

        }
        setWheelTurnCount(result?.data?.data)
    }
    const _getConfigThele = async () => {
        let result = await getConfigData("WHEEL_RULE")
        if (result?.isAxiosError) return
        setConfigThele(result)
    }

    const _onSpinEnd = useCallback((data) => {
        console.log({ data });

        setTimeout(() => {
            setShowModalSuccess({
                show: true,
                data: data
            })
            // alert(number)
            setShowOverlay(false)
        }, 100);
        _getPartnerWheelTurn()


        _getWallet()

    }, [])

    const _getWallet = async () => {
        var data = await getWallet()
        if (data?.isAxiosError) return
        store.dispatch({
            type: ActionType.SET_DATA_WALLET,
            payload: {
                data: data
            }
        })
    }

    const _showOverLay = useCallback((boolean) => {

        setShowOverlay(boolean)
        // alert(number)
    }, [])

    const _start = () => {
        // setShowModalSuccess(true)
        if (childRef?.current?.getAlert) {
            childRef.current.getAlert()
        }
    }

    const _handleClickHistory = () => {
        setShowModalHistory(true)
    }

    const _handleShowThele = () => {
        setShowModalThele(true)
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBarCustom barStyle={'light-content'} bgColor={BASE_COLOR} />

            <ModalGetWheelSpinReward
                hide={()=>{
                    setShowModalGetWheelSpinReward({
                        show:false,
                        data:{}
                    })
                }}
                data={showModalGetWheelSpinReward?.data}
                show={showModalGetWheelSpinReward?.show} />

            <ImageBackground
                resizeMode={'cover'}
                source={require('../../Image/spin/bgWhellSpin.png')}
                style={{ flex: 1 }}>
                {
                    showOverlay ?
                        <View style={{ zIndex: 1, width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent' }} />
                        :
                        <></>
                }

                <ModalSuccess
                    confirmGetReward={() => {
                        console.log({ xa: showModalSuccess?.data });

                        if (showModalSuccess?.data?.data?.data?.awards[0]?.code == "LIA_BONUS") {
                            navigation.navigate(ScreenKey.AFFILIATE, { showModalInfoWallet: true })
                            alertCustomNotAction(`Thông báo`, `${showModalSuccess?.data?.data?.data?.awards[0]?.name} đã được cộng vào ví`)
                            setShowModalSuccess({
                                show: false,
                                data: {}
                            })
                        }
                        if (showModalSuccess?.data?.data?.data?.awards[0]?.code == "STRING") {
                            setShowModalGetWheelSpinReward({
                                show: true,
                                data: showModalSuccess?.data?.data
                            })
                            // setShowModalSuccess({
                            //     show: false,
                            //     data: {}
                            // })
                        }
                        if (showModalSuccess?.data?.data?.data?.awards[0]?.code == "COUPON") {
                            navigation.navigate(ScreenKey.LIST_VOUCHER)
                        }
                        if (showModalSuccess?.data?.data?.data?.awards[0]?.code == "LIA_TICKET") {
                            setShowModalGetWheelSpinReward({
                                show: true,
                                data: showModalSuccess?.data?.data
                            })
                            // setShowModalSuccess({
                            //     show: false,
                            //     data: {}
                            // })
                        }

                    }}
                    hide={() => {
                        setShowModalSuccess({
                            show: false,
                            data: {}
                        })
                    }}
                    data={showModalSuccess?.data}
                    show={showModalSuccess?.show} />

                <ModalHistory
                    hide={() => {
                        setShowModalHistory(false)
                    }}
                    show={showModalHistory}
                />
                <ModalThele
                    hide={() => {
                        setShowModalThele(false)
                    }}
                    data={configThele}
                    show={showModalThele}
                />

                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    style={{
                        position: 'absolute',
                        left: _moderateScale(8 * 1),
                        top: _moderateScale(8 * 2),
                        flexDirection: 'row',
                        alignItems: 'center',
                        zIndex: 100
                    }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        style={[sizeIcon.lg]}
                        source={require('../../Icon/back_left_white.png')} />
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE }}>
                        Quay lại
                    </Text>
                </TouchableOpacity>
                {
                    numberParticipant ?
                        <TouchableOpacity
                            hitSlop={styleElement.hitslopSm}
                            disabled
                            style={{
                                position: 'absolute',
                                left: _moderateScale(8 * 0),
                                bottom: _heightScale(8 * 18),
                                // zIndex: 100,
                                width: _moderateScale(8 * 17),
                                height: _moderateScale(8 * 4),
                                backgroundColor: WHITE,
                                borderTopRightRadius: _moderateScale(8 * 2),
                                borderBottomRightRadius: _moderateScale(8 * 2),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(13), color: BLACK }}>
                                {numberParticipant}  Người tham gia
                            </Text>
                        </TouchableOpacity>
                        :
                        <></>
                }



                <Image style={{
                    height: _heightScale(8 * 12),
                    width: '100%',
                    resizeMode: 'contain',
                    marginTop: _heightScale(8 * 4),
                }} source={require('../../Image/spin/textTop3.png')} />

                {/* <Image style={{
                    height: _heightScale(8 * 6),
                    width: '100%',
                    resizeMode: 'contain',
                    marginTop: _heightScale(8 * 1),
                }} source={require('../../Image/spin/tiger2022.png')} /> */}

                <View style={{}}>
                    <LuckyCircle
                        data={configSpinWheel}
                        showOverLay={_showOverLay}
                        number={3}
                        onSpinEnd={_onSpinEnd} />
                    <Text style={{ position: 'absolute', bottom: _heightScale(7), alignSelf: 'center', ...stylesFont.fontNolanBold, fontSize: _heightScale(12), color: WHITE }}>
                        {wheelTurnCount?.amount} lượt
                    </Text>
                </View>


                <View style={{ marginTop: _heightScale(8 * 6), width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: _widthScale(8 * 10) }}>
                        <TouchableOpacity onPress={_handleClickHistory}>
                            <Image style={styles.ls} source={require('../../Image/spin/ls.png')} />
                        </TouchableOpacity>
                        {/* <View style={{width:_moderateScale(8)}}/> */}
                        <TouchableOpacity onPress={_handleShowThele}>
                            <Image style={styles.tl} source={require('../../Image/spin/tl.png')} />
                        </TouchableOpacity>
                    </View>

                </View>


            </ImageBackground>
        </View>

    );
});


const styles = StyleSheet.create({
    ls: {
        width: _heightScale(8 * 13),
        height: _heightScale(8 * 13),
        resizeMode: 'contain'
    },
    tl: {
        width: _heightScale(8 * 13),
        height: _heightScale(8 * 13),
        resizeMode: 'contain',
        // bottom: _heightScale(2)
    }
})

const gradient = {
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        BASE_COLOR,
        SECOND_COLOR,
        WHITE
    ]
}

export default WheelSpin;