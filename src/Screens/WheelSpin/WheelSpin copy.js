import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Animated, Easing, TouchableOpacity, ImageBackground } from 'react-native';
import { sizeIcon } from '../../Constant/Icon';
import ModalSuccess from './ModalSuccess';
import LuckyCircle from './LuckyCircle';
import { BG_GREY_OPACITY_2, GREY, BG_GREY_OPACITY_5, BASE_COLOR, SECOND_COLOR, WHITE, THIRD_COLOR } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _heightScale } from '../../Constant/Scale';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import LinearGradient from 'react-native-linear-gradient';
import { styleElement } from '../../Constant/StyleElement';
import { navigation } from '../../../rootNavigation';
import ModalHistory from './ModalHistory';
import { getConfigSpinWheel, getPartnerWheelTurn } from '../../Redux/Action/SpinWheelAction';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { getWallet } from '../../Redux/Action/InfoAction';
import { getBottomSpace } from 'react-native-iphone-x-helper';


const WheelSpin = memo((props) => {

    const [showModalSuccess, setShowModalSuccess] = useState({
        show: false,
        data: {}
    })

    const [showModalHistory, setShowModalHistory] = useState(false)

    const [showOverlay, setShowOverlay] = useState(false)

    const [wheelTurnCount, setWheelTurnCount] = useState(null)
    const [configSpinWheel, setConfigSpinWheel] = useState({})

    const childRef = useRef(null)

    useEffect(() => {
        _getConfigSpinWheel()
        _getPartnerWheelTurn()
    }, [])

    const _getConfigSpinWheel = async () => {
        let result = await getConfigSpinWheel()
        if (result?.isAxiosError) return
        setConfigSpinWheel(result?.data?.data)
    }
    const _getPartnerWheelTurn = async () => {
        let result = await getPartnerWheelTurn()
        if (result?.isAxiosError) return
        setWheelTurnCount(result?.data?.data)
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

    return (
        <View style={{ flex: 1 }}>
            <StatusBarCustom barStyle={'light-content'} bgColor={BASE_COLOR} />
            {
                showOverlay ?
                    <View style={{ zIndex: 1, width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent' }} />
                    :
                    <></>
            }

            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={gradient.color}
                style={gradient.container}>

                <View style={{
                    height: _heightScale(8 * 45) + getBottomSpace(),
                    width: '100%',
                    backgroundColor: WHITE,
                    position: 'absolute',
                    bottom: 0,
                    borderTopEndRadius: _moderateScale(8 * 3),
                    borderTopStartRadius: _moderateScale(8 * 3),
                }}>

                    <LuckyCircle
                        data={configSpinWheel}
                        showOverLay={_showOverLay}
                        number={3}
                        // data={[
                        //     { name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' },
                        //     { name: '7' }, { name: '8' }, { name: '9' }, { name: '10' }
                        // ]}
                        onSpinEnd={_onSpinEnd} />
                </View>
            </LinearGradient>

            <ModalSuccess
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

            <View style={{ marginTop: _moderateScale(8 * 3), marginHorizontal: _moderateScale(8 * 2), ...styleElement.rowAliCenter, justifyContent: 'space-between' }}>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => navigation.goBack()}>
                    <Image
                        style={[sizeIcon.lg]}
                        source={require('../../Icon/back_left_white.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setShowModalHistory(true)
                }}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: WHITE }}>
                        Lịch sử
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginTop: _moderateScale(8 * 2) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(24), color: WHITE, letterSpacing: 2 }}>
                    Quay Vui{`\n`}
                    Vui Quay
                </Text>

                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 3) }]}>
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, letterSpacing: 1 }}>
                        Luợt quay còn trong ngày
                    </Text>
                    <View style={[styleElement.centerChild, {
                        width: _moderateScale(8 * 5),
                        height: _moderateScale(8 * 3),
                        backgroundColor: THIRD_COLOR,
                        marginLeft: _moderateScale(4),
                        borderRadius: _moderateScale(8),
                    }]}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), bottom: 1, color: WHITE }}>
                            {wheelTurnCount?.amount}
                        </Text>
                    </View>
                </View>

            </View>

            <View style={{ height: _moderateScale(100) }} />



            {/* <TouchableOpacity onPress={_start}>
                <Text>
                    Show!
                </Text>
            </TouchableOpacity> */}

        </View>
    );
});



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