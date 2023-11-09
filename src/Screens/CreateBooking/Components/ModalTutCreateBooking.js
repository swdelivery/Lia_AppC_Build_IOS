import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import * as Color from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _heightScale, _widthScale, _moderateScale, _width, _height } from '../../../Constant/Scale';
import * as ActionType from '../../../Redux/Constants/ActionType';
import Store from "../../../Redux/store";
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import ScreenKey from '../../../Navigation/ScreenKey'
import { navigation } from '../../../../rootNavigation';
import { URL_ORIGINAL } from '../../../Constant/Url';
import RenderHtml from 'react-native-render-html';
import { formatMonney } from '../../../Constant/Utils';
import { isEmpty } from 'lodash-es';
import { getConfigData } from '../../../Redux/Action/OrtherAction';
import FastImage from 'react-native-fast-image';
import { getConfigFileByCode } from '../../../Redux/Action/SpinWheelAction';
import YoutubePlayer from "react-native-youtube-iframe";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { getBottomSpace } from 'react-native-iphone-x-helper';

const ModalTutCreateBooking = props => {

    const [noticeAutoShowTut, setNoticeAutoShowTut] = useState(false)

    const noticeNotAutoShowTutCreateBookingRedux = useSelector(state => state?.authReducer?.noticeNotAutoShowTutCreateBooking)
    const [linkGif, setLinkGif] = useState({})
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        _getGif()
    }, [])

    const _getGif = async () => {
        // let result = await getConfigFileByCode("SHARE_FACEBOOK");
        // if (result?.isAxiosError) return
        // setLinkGif(result?.data?.data)
    }

    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'flex-end'
            // paddingBottom:_heightScale(200)
        }}
            animationIn='slideInUp'
            animationOut='fadeOut'
            // animationInTiming={500}
            // animationOutTiming={500}
            isVisible={props?.show}
            onModalHide={() => {
                setIsReady(false)
            }}
            // backdropColor={'transparent'}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                // props?.confirmfalse()
                props?.hide()
            }}>

            <View style={{
                paddingHorizontal: _moderateScale(8 * 2),
                paddingVertical: _moderateScale(8),
                borderRadius: _moderateScale(8),
                backgroundColor: Color.WHITE,
                width: "100%",
                height: '90%'
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: _moderateScale(8) }}>
                    <View
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100, opacity: 0 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                    </View>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                        Hướng dẫn đặt lịch hẹn
                    </Text>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            props?.hide()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: _moderateScale(8 * 2) }} />

                <View>

                    {
                        !isReady &&
                        <View style={{ width: '100%', height: _heightScale(200), position: 'absolute' }}>
                            <SkeletonPlaceholder>
                                {/* <View style={{ width: '100%', height: _heightScale(200), position: 'absolute' }}> */}
                                <SkeletonPlaceholder.Item width={"100%"} height={_heightScale(200)}>
                                </SkeletonPlaceholder.Item>
                                {/* </View> */}
                            </SkeletonPlaceholder>
                        </View>
                    }

                    <YoutubePlayer
                        height={_heightScale(220)}
                        videoId={props?.codeYoutube}
                        play={true}
                        onReady={() => {
                            setTimeout(() => {
                                setIsReady(true)
                            }, 300);
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <RenderHtml
                            contentWidth={_width - _widthScale(8 * 4)}
                            source={{ html: `${props?.dataHtml}` }}
                            enableExperimentalBRCollapsing={true}
                            enableExperimentalMarginCollapsing={true}
                        />
                    </ScrollView>
                </View>

                {
                    noticeNotAutoShowTutCreateBookingRedux == true ?
                        <TouchableOpacity
                            onPress={() => {
                                Store.dispatch({
                                    type: ActionType.SET_NOTICE_NOT_AUTO_SHOW_TUT_CREATE_BK,
                                    payload: {
                                        flag: false
                                    }
                                })
                            }}
                            style={{ marginTop: _moderateScale(8 * 2), flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={[sizeIcon.md, { marginRight: _moderateScale(8) }]} source={require('../../../NewIcon/icheck.png')} />
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), color: Color.GREY }}>
                                Không hiển thị vào lần sau
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                Store.dispatch({
                                    type: ActionType.SET_NOTICE_NOT_AUTO_SHOW_TUT_CREATE_BK,
                                    payload: {
                                        flag: true
                                    }
                                })
                            }}
                            style={{ marginTop: _moderateScale(8 * 2), flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={[sizeIcon.md, { marginRight: _moderateScale(8) }]} source={require('../../../NewIcon/acheck.png')} />
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), color: Color.BASE_COLOR }}>
                                Không hiển thị vào lần sau
                            </Text>
                        </TouchableOpacity>
                }

                <TouchableOpacity
                    onPress={() => {
                        props?.hide()
                    }}
                    style={{
                        paddingHorizontal: _moderateScale(8 * 3),
                        paddingVertical: _moderateScale(6),
                        backgroundColor: Color.BLUE_FB,
                        borderRadius: _moderateScale(8),
                        alignSelf: 'flex-end',
                        marginTop: _moderateScale(8 * 2),
                        marginBottom: getBottomSpace()
                    }}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), color: Color.WHITE }}>
                        Đã hiểu
                    </Text>
                </TouchableOpacity>


            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({

})



export default ModalTutCreateBooking;