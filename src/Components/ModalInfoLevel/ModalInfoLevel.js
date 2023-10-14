import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _widthScale, _moderateScale, _width } from '../../Constant/Scale';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from '../../Redux/Store';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import ScreenKey from '../../Navigation/ScreenKey'
import { navigation } from '../../../rootNavigation';
import { URL_ORIGINAL } from '../../Constant/Url';
import RenderHtml from 'react-native-render-html';
import { formatMonney } from '../../Constant/Utils';
import TopInfo from './TopInfo'
import { isEmpty } from 'lodash-es';
import { getConfigData } from '../../Redux/Action/OrtherAction';

const ModalInfoLevel = props => {

    const [showDetail, setShowDetail] = useState('')
    const [detail, setDetail] = useState(true)

    const [configChinhSach, setConfigChinhSach] = useState({})


    const closeModal = () => {
        // Store.dispatch({
        //     type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
        //     payload: {
        //         flag: false
        //     }
        // })
        props?.hide()
    }

    useEffect(() => {
        _getConfigChinhSach()

        if (!props?.currCodePick) {
            setCurrCodePick('SILVER')
        }
    }, [])

    const _getConfigChinhSach = async () => {
        let result = await getConfigData("LEVEL_POLICY")
        if (result?.isAxiosError) return
        setConfigChinhSach(result)
    }

    const [currCodePick, setCurrCodePick] = useState(props?.currCodePick)

    const _renderLevelImage = (code) => {


        switch (code) {
            case 'SILVER':
                return <Image style={[sizeIcon.flagLevel]}
                    source={require('../../NewIcon/flagBac.png')} />
            case 'GOLD':
                return <Image style={[sizeIcon.flagLevel]}
                    source={require('../../NewIcon/flagVang.png')} />
            case 'PLATINUM':
                return <Image style={[sizeIcon.flagLevel]}
                    source={require('../../NewIcon/flagBK.png')} />
            case 'VIP':
                return <Image style={[sizeIcon.flagLevel]}
                    source={require('../../NewIcon/flagVIP.png')} />
            default:
                break;
        }
    }

    const _renderColor = (code) => {
        switch (code) {
            case 'SILVER':
                return '#809FAB'
            case 'GOLD':
                return '#E0B313'
            case 'PLATINUM':
                return '#31B5B9'
            case 'VIP':
                return '#FF9C8B'
            default:
                break;
        }
    }

    // const _renderRangePoint = () => {
    //     switch (code) {
    //         case 'SILVER':
    //             return (
    //                 <Text>

    //                 </Text>
    //             )
    //         case 'GOLD':
    //             return <Image style={[sizeIcon.flagLevel]}
    //                 source={require('../../NewIcon/flagVang.png')} />
    //         case 'PLATINUM':
    //             return <Image style={[sizeIcon.flagLevel]}
    //                 source={require('../../NewIcon/flagBK.png')} />
    //         case 'VIP':
    //             return <Image style={[sizeIcon.flagLevel]}
    //                 source={require('../../NewIcon/flagVIP.png')} />
    //         default:
    //             break;
    //     }
    // }


    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center'
        }}
            animationIn='slideInLeft'
            animationOut='slideOutLeft'
            // animationInTiming={500}
            // animationOutTiming={500}
            isVisible={props?.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? true : true}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                // props?.confirmfalse()
                props?.hide()
            }}
        // onModalHide={()=>alert('ssss')}
        >

            {!isEmpty(showDetail) ?
                <View style={styles.modalFilter}>

                    <View style={{
                        flexDirection: 'row',
                        paddingBottom: _moderateScale(6),
                        justifyContent: 'flex-start'
                    }}>
                        <View style={{
                            alignItems: 'flex-start',
                            paddingHorizontal: _moderateScale(8)
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowDetail('')
                                }}
                                style={{ padding: _moderateScale(8), backgroundColor: Color.WHITE, borderRadius: 100 }}>
                                <Image style={sizeIcon.md} source={require('../../Icon/backBlack.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            alignItems: 'flex-start',
                            paddingTop: _moderateScale(6),
                            paddingLeft: _moderateScale(2)
                        }}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16) }}>
                                {showDetail === 'policy' ? 'Chính sách' : 'Lịch sử'}
                            </Text>
                        </View>
                    </View>

                    <ScrollView 
                    scrollIndicatorInsets={{right:1}}
                    style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                        <RenderHtml
                            contentWidth={_width - _widthScale(8 * 4)}
                            source={{ html: `${configChinhSach?.value}` }}
                            enableExperimentalBRCollapsing={true}
                            enableExperimentalMarginCollapsing={true}
                        />
                    </ScrollView>
                </View>
                : <View style={styles.modalFilter}>
                    <View style={{
                        flexDirection: 'row',
                        paddingBottom: _moderateScale(6),
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            alignItems: 'flex-start',
                            paddingTop: _moderateScale(6),
                            paddingLeft: _moderateScale(8 * 2)
                        }}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16) }}>
                                Điểm tích lũy
                            </Text>
                        </View>

                        <View style={{
                            alignItems: 'flex-end',

                            paddingRight: _moderateScale(8 * 2),
                            marginTop:_moderateScale(8)
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    props?.hide()
                                }}
                                style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                                <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View>
                     <TopInfo />   
                </View> */}

                    <View>
                        <TouchableOpacity
                            onPress={() => setShowDetail('policy')}
                            style={{
                                paddingVertical: _moderateScale(8),
                                paddingHorizontal: _moderateScale(8 * 3),
                                paddingTop: _moderateScale(16),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <View style={[{
                                width: _moderateScale(8 * 3),
                                height: _moderateScale(8 * 3),
                                borderRadius: _moderateScale(8),
                                backgroundColor: 'rgba(79, 173, 164,0.2)',
                                marginRight: _moderateScale(8)
                            }, styleElement.centerChild]}>
                                <Image style={sizeIcon.xs} source={require('../../Icon/policy.png')} />
                            </View>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK_OPACITY_8, flex: 1 }}>
                                Chính sách
                            </Text>
                            <View style={[styleElement.rowAliCenter]}>
                                <Image style={[sizeIcon.xs, { opacity: 0.6 }]} source={require('../../Icon/arrowRight_grey.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                                navigation.navigate(ScreenKey.PURCHASE_DEPOSIT_REQUEST, { numIndex: 2 })
                            }}
                            style={{
                                paddingVertical: _moderateScale(8),
                                paddingHorizontal: _moderateScale(8 * 3),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <View style={[{
                                width: _moderateScale(8 * 3),
                                height: _moderateScale(8 * 3),
                                borderRadius: _moderateScale(8),
                                backgroundColor: 'rgba(79, 173, 164,0.2)',
                                marginRight: _moderateScale(8)
                            }, styleElement.centerChild]}>
                                <Image style={sizeIcon.xs} source={require('../../Icon/history.png')} />
                            </View>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK_OPACITY_8, flex: 1 }}>
                                Lịch sử
                            </Text>
                            <View style={[styleElement.rowAliCenter]}>
                                <Image style={[sizeIcon.xs, { opacity: 0.6 }]} source={require('../../Icon/arrowRight_grey.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 2) }}>
                        {
                            props?.data?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCurrCodePick(item?.code)
                                        }}
                                        style={[{
                                            paddingBottom: _moderateScale(8), width: '25%', alignItems: 'center',
                                            paddingTop: _moderateScale(6),
                                            backgroundColor: Color.BG_MAIN_OPACITY, borderTopWidth: 1, borderColor: Color.BG_GREY_OPACITY_5
                                        },
                                        currCodePick == item?.code &&
                                        { backgroundColor: Color.WHITE, borderColor: _renderColor(currCodePick), borderTopWidth: 2 }]}>
                                        {
                                            _renderLevelImage(item?.code)
                                        }
                                        <Text style={[{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY },
                                        currCodePick == item?.code && { color: _renderColor(currCodePick), ...stylesFont.fontNolanBold }]}>
                                            {item?.name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                    <View style={{ flex: 1 }}>
                        <ScrollView 
                        scrollIndicatorInsets={{right:1}}
                        contentContainerStyle={{ padding: _moderateScale(8 * 2) }}>

                            <View style={{
                                paddingVertical: _moderateScale(6),
                                borderRadius: _moderateScale(32),
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: _moderateScale(14), ...stylesFont.fontNolan500, color: Color.GREY_FOR_TITLE }}>
                                    {
                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            color: _renderColor(currCodePick),
                                            fontSize: _moderateScale(8 * 3)
                                        }}>
                                            {formatMonney(parseInt((props?.data?.find(item => item?.code == currCodePick)?.promotionCondition?.revenue) / 1000))}
                                        </Text>
                                    } điểm
                                </Text>
                            </View>
                            <View style={{
                                backgroundColor: _renderColor(currCodePick),
                                borderRadius: _moderateScale(4),
                                height: _moderateScale(4), marginBottom: _moderateScale(8 * 3)
                            }}>

                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity style={[styles.itemBlock,
                                { backgroundColor: _renderColor(currCodePick), borderColor: _renderColor(currCodePick) }]}>

                                    <Text style={[styles.value, { color: Color.WHITE }]}>
                                        {Number(props?.data?.find(item => item?.code == currCodePick)?.promotion?.commissionRate) * 100} %
                                    </Text>
                                    <Text style={[styles.key, , { color: Color.WHITE }]}>
                                        Hoa hồng trực tiếp
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.itemBlock,
                                { backgroundColor: _renderColor(currCodePick), borderColor: _renderColor(currCodePick) }]}>
                                    <Text style={[styles.value, { color: Color.WHITE }]}>
                                        {Number(props?.data?.find(item => item?.code == currCodePick)?.promotion?.indirectCommissionRate) * 100}%
                                    </Text>
                                    <Text style={[styles.key, { color: Color.WHITE }]}>
                                        Hoa hồng gián tiếp
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: _moderateScale(12) }}>
                                <TouchableOpacity style={[styles.itemBlock,
                                { backgroundColor: _renderColor(currCodePick), borderColor: _renderColor(currCodePick) }]}>
                                    <Text style={[styles.value, { color: Color.WHITE }]}>
                                        {Number(props?.data?.find(item => item?.code == currCodePick)?.promotion?.discountFriend) * 100} %
                                    </Text>
                                    <Text style={[styles.key, { color: Color.WHITE }]}>
                                        Mời bạn bè
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.itemBlock,
                                { backgroundColor: _renderColor(currCodePick), borderColor: _renderColor(currCodePick) }]}>
                                    <Text style={[styles.value, { color: Color.WHITE }]}>
                                        {Number(props?.data?.find(item => item?.code == currCodePick)?.promotion?.discountRetailService) * 100}%
                                    </Text>
                                    <Text style={[styles.key, { color: Color.WHITE }]}>
                                        Dịch vụ bán lẻ
                                    </Text>
                                </TouchableOpacity>
                            </View> */}


                            <RenderHtml
                                contentWidth={_width}
                                source={{ html: `${props?.data?.find(item => item?.code == currCodePick)?.promotion?.description}` }}
                                enableExperimentalBRCollapsing={true}
                                enableExperimentalMarginCollapsing={true}
                            />

                        </ScrollView>
                    </View>

                </View>}

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalFilter: {
        width: "90%",
        height: '85%',
        backgroundColor: Color.WHITE,
        borderRadius: _widthScale(8 * 2),
        backgroundColor: Color.WHITE,
        paddingVertical: _heightScale(8 * 2),
        paddingTop: _moderateScale(6)
    },
    viewContent: {
        paddingHorizontal: _widthScale(8 * 3),
    },
    content: {
        fontSize: _widthScale(14),
        // lineHeight: _heightScale(16),
        color: Color.GREY
    },
    cancelBtn: {
        alignSelf: 'flex-end',
        padding: _widthScale(8),
        marginTop: _heightScale(8),
    },
    cancelBtn__text: {
        fontSize: _widthScale(16),
        color: Color.BASE_COLOR
    },
    key: {
        ...stylesFont.fontNolan,
        color: Color.BLACK_OPACITY_7,
        fontSize: _moderateScale(12)
    },
    value: {
        ...stylesFont.fontNolanBold,
        color: Color.BASE_COLOR,
        fontSize: _moderateScale(16)
    },
    itemBlock: {
        width: '45%',
        alignItems: 'center',
        borderWidth: _moderateScale(1),
        borderRadius: _moderateScale(4),
        borderColor: Color.BASE_COLOR,
        paddingVertical: _moderateScale(4),
    }
})



export default ModalInfoLevel;
