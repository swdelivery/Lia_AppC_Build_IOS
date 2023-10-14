import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput, ScrollView, Clipboard } from 'react-native';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, BLACK_OPACITY_8, BLUE_FB, BG_GREY_OPACITY_5, RED, BG_BEAUTY, SECOND_COLOR, GREY_FOR_TITLE, BLUE, BLACK_OPACITY_7, GREEN_2, BG_GREY_OPACITY_9, BG_GREY_OPACITY_2, BLACK } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import _isEmpty from 'lodash/isEmpty'
import { alertCustomNotAction, formatMonney } from '../../../Constant/Utils';
import { uploadModule, createPaymentRequest } from '../../../Redux/Action/BookingAction';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import FastImage from '../../../Components/Image/FastImage';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../../Constant/Url';
import { getPartnerLevel } from '../../../Redux/Action/InfoAction';
import ModalFlashMsg from '../../../Components/ModalFlashMsg/ModalFlashMsg';
import ModalInfoLevel from '../../../Components/ModalInfoLevel/ModalInfoLevel';
import { getConfigData } from '../../../Redux/Action/OrtherAction';
import Share from 'react-native-share';


const ModalInfoUserAffiliate = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer)

    const [partnerSilver, setPartnerSilver] = useState({})
    const [partnerGold, setPartnerGold] = useState({})
    const [partnerPlatium, setPartnerPlatium] = useState({})
    const [partnerVip, setPartnerVip] = useState({})
    const [listPartnerLevel, setListPartnerLevel] = useState([])

    const [showModalFlashMsg, setShowModalFlashMsg] = useState(false)
    const [showModalFlashMsg2, setShowModalFlashMsg2] = useState(false)

    const [showModalInfoLevel, setShowModalInfoLevel] = useState(false)

    const [linkCollab, setLinkCollab] = useState('')

    useEffect(() => {
        _getPartnerLevel()
        _getconfigData()
    }, [])

    const _getconfigData = async () => {
        let result = await getConfigData("LINKCOLLAB")
        if (result?.isAxiosError) return

        let value = result?.value

        let index = value?.trim()?.indexOf('=');
        let linkSlice = value.slice(0, index + 1)
        let newLink = `${linkSlice}${infoUserRedux?.infoUser?.collaboratorCode}`
        console.log({ newLink });
        setLinkCollab(newLink)
    }

    const _getPartnerLevel = async () => {
        let result = await getPartnerLevel();
        if (result?.isAxiosError) return
        setListPartnerLevel(result?.data?.data)

        let partnerSilver = result?.data?.data?.find(item => item?.code == 'SILVER');
        if (partnerSilver) {
            setPartnerSilver(partnerSilver)
        }
        let partnerGold = result?.data?.data?.find(item => item?.code == 'GOLD');
        if (partnerGold) {
            setPartnerGold(partnerGold)
        }
        let partnerPlatium = result?.data?.data?.find(item => item?.code == 'PLATINUM');
        if (partnerPlatium) {
            setPartnerPlatium(partnerPlatium)
        }
        let partnerVIP = result?.data?.data?.find(item => item?.code == 'VIP');
        if (partnerVIP) {
            setPartnerVip(partnerVIP)
        }
    }

    const _renderLevelImage = (code) => {


        switch (code) {
            case 'SILVER':
                return <Image style={[sizeIcon.flagLevel]}
                    source={require('../../../NewIcon/flagBac.png')} />
            case 'GOLD':
                return <Image style={[sizeIcon.flagLevel]}
                    source={require('../../../NewIcon/flagVang.png')} />
            case 'PLATINUM':
                return <Image style={[sizeIcon.flagLevel]}
                    source={require('../../../NewIcon/flagBK.png')} />
            case 'VIP':
                return <Image style={[sizeIcon.flagLevel]}
                    source={require('../../../NewIcon/flagVIP.png')} />
            default:
                break;
        }
    }

    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center',
            marginHorizontal: _moderateScale(8 * 2)
        }}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={150}
            animationOutTiming={500}
            isVisible={props.show}
            backdropTransitionOutTiming={0}
            useNativeDriverForBackdrop={true}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props.hide()
            }}
            onBackdropPress={() => {
                props.hide()
            }}>
            <View style={[styles.container]}>

                <ModalInfoLevel
                    data={listPartnerLevel}
                    currCodePick={infoUserRedux?.infoUser?.levelCode}
                    hide={() => {
                        setShowModalInfoLevel(false)
                    }}
                    show={showModalInfoLevel} />

                <ModalFlashMsg
                    bottom
                    show={showModalFlashMsg}
                    hide={() => {
                        setShowModalFlashMsg(false)
                    }}
                    data={'Đã copy mã giới thiệu.'} />
                <ModalFlashMsg
                    bottom
                    show={showModalFlashMsg2}
                    hide={() => {
                        setShowModalFlashMsg2(false)
                    }}
                    data={'Đã copy link giới thiệu.'} />

                <View style={{ alignItems: 'flex-end', marginBottom: _moderateScale(8 * 2) }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.hide()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8) }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setShowModalInfoLevel(true)
                        }}
                        style={{
                            width: '100%',
                            height: _moderateScale(8 * 18),
                            borderRadius: _moderateScale(8 * 2),
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            backgroundColor: 'rgba(79, 173, 164,0.5)'
                        }}>

                        <View style={{ position: 'absolute', right: _moderateScale(8 * 2), top: 0 }}>
                            {_renderLevelImage(infoUserRedux?.infoUser?.levelCode)}
                        </View>

                        <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8 * 2) }]}>

                            <View>
                                <TouchableOpacity onPress={() => {
                                }}>
                                    <FastImage
                                        style={[styles.bannerProfile__avatar]}
                                        uri={infoUserRedux?.infoUser?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                    />
                                </TouchableOpacity>

                            </View>
                            <View style={{ marginLeft: _moderateScale(8), flex: 1 }}>
                                <Text numberOfLines={1} style={[stylesFont.fontNolanBold, styles.bannerProfile__nameAndJob__name, { color: BLACK_OPACITY_8 }]}>
                                    {
                                        `${infoUserRedux?.infoUser?.name}`
                                    }
                                </Text>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    {
                                        formatMonney(parseInt((infoUserRedux?.infoUser?.liaPoint) / 1000))
                                    } điểm
                                </Text>
                            </View>
                        </View>
                        <View style={{ height: _moderateScale(8) }} />

                        {
                            infoUserRedux?.infoUser &&
                                infoUserRedux?.infoUser?.liaPoint &&
                                partnerGold?.promotionCondition?.revenue &&
                                infoUserRedux?.infoUser?.levelCode == "SILVER" ?
                                <>
                                    <View style={[styleElement.rowAliCenter, { alignSelf: 'center' }]}>
                                        <Image style={[sizeIcon.lxlg]} source={require('../../../Image/component/rank_bac.png')} />
                                        <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                            <View style={{
                                                width: _moderateScale(230 * (infoUserRedux?.infoUser?.liaPoint) / partnerGold?.promotionCondition?.revenue),
                                                height: _moderateScale(4),
                                                backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                            }} />
                                        </View>
                                        <Image style={[sizeIcon.lxlg]} source={require('../../../Image/component/rank_vang.png')} />
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                        Còn {
                                            formatMonney(parseInt((partnerGold?.promotionCondition?.revenue - (infoUserRedux?.infoUser?.liaPoint)) / 1000))
                                        } điểm nữa để lên hạng {partnerGold?.name}
                                    </Text>
                                </>
                                : <></>

                        }
                        {
                            infoUserRedux?.infoUser &&
                                infoUserRedux?.infoUser?.liaPoint &&
                                partnerPlatium?.promotionCondition?.revenue &&
                                infoUserRedux?.infoUser?.levelCode == "GOLD" ?
                                <>
                                    <View style={[styleElement.rowAliCenter, { alignSelf: 'center' }]}>
                                        <Image style={[sizeIcon.lxlg]} source={require('../../../Image/component/rank_vang.png')} />
                                        <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                            <View style={{
                                                width: _moderateScale(230 * (infoUserRedux?.infoUser?.liaPoint) / partnerPlatium?.promotionCondition?.revenue),
                                                height: _moderateScale(4),
                                                backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                            }} />
                                        </View>
                                        <Image style={[sizeIcon.lxlg]} source={require('../../../Image/component/rank_bk.png')} />
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                        Còn {
                                            formatMonney(parseInt((partnerPlatium?.promotionCondition?.revenue - (infoUserRedux?.infoUser?.liaPoint)) / 1000))
                                        } điểm nữa để lên hạng {partnerSilver?.name}
                                    </Text>
                                </>
                                : <></>
                        }
                        {
                            infoUserRedux?.infoUser &&
                                infoUserRedux?.infoUser?.liaPoint &&
                                partnerVip?.promotionCondition?.revenue &&
                                infoUserRedux?.infoUser?.levelCode == "PLATINUM" ?
                                <>
                                    <View style={[styleElement.rowAliCenter, { alignSelf: 'center' }]}>
                                        <Image style={[sizeIcon.lxlg]} source={require('../../../Image/component/rank_bk.png')} />
                                        <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                            <View style={{
                                                width: _moderateScale(230 * (infoUserRedux?.infoUser?.liaPoint) / partnerVip?.promotionCondition?.revenue),
                                                height: _moderateScale(4),
                                                backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                            }} />
                                        </View>
                                        <Image style={[sizeIcon.lxlg]} source={require('../../../Image/component/rank_vip.png')} />
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                        Còn {
                                            formatMonney(parseInt((partnerVip?.promotionCondition?.revenue - (infoUserRedux?.infoUser?.liaPoint)) / 1000))
                                        } điểm nữa để lên hạng {partnerVip?.name}
                                    </Text>
                                </>
                                : <></>
                        }
                        {
                            infoUserRedux?.infoUser?.levelCode == "VIP" ?
                                <>
                                    <View style={[styleElement.rowAliCenter, { alignSelf: 'center' }]}>
                                        <Image style={[sizeIcon.lxlg]} source={require('../../../Image/component/rank_bk.png')} />
                                        <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                            <View style={{
                                                width: _moderateScale(230),
                                                height: _moderateScale(4),
                                                backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                            }} />
                                        </View>
                                        <Image style={[sizeIcon.lxlg]} source={require('../../../Image/component/rank_vip.png')} />
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                        Bạn đã đạt hạng {partnerVip?.name}
                                    </Text>
                                </>
                                : <></>
                        }


                    </TouchableOpacity>
                </View>


                <View style={{
                    marginTop: _moderateScale(8 * 4),
                    marginHorizontal: _moderateScale(8)
                }}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }]}>
                        Mã giới thiệu của bạn:
                    </Text>
                    <Text style={{ fontStyle: 'italic', ...stylesFont.fontNolan500, color: BLACK_OPACITY_7, marginVertical: _moderateScale(4) }}>
                        (*) Gửi mã giới thiệu này cho những người khác khi họ đặt hẹn lần đầu.
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Clipboard.setString(infoUserRedux?.infoUser?.collaboratorCode)
                        setShowModalFlashMsg(true)
                        setTimeout(() => {
                            setShowModalFlashMsg(false)
                        }, 1500);
                    }}
                    style={[{
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(4),
                        paddingVertical: _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 3),
                        marginHorizontal: _moderateScale(8 * 1),
                        justifyContent: 'center',
                        backgroundColor: BG_GREY_OPACITY_5
                    }, shadow]}>
                    <View style={[{ alignItems: 'center' }]}>

                        {
                            <Text selectable={true} style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(20), color: BLUE_FB }]}>
                                {`${infoUserRedux?.infoUser?.collaboratorCode}`}
                                {/* CL6963OZ0 */}
                            </Text>
                        }
                    </View>

                    <View style={[{
                        position: 'absolute',
                        right: _moderateScale(8),
                        width: _moderateScale(8 * 4),
                        height: _moderateScale(8 * 4),
                        borderRadius: _moderateScale(4),
                        backgroundColor: BASE_COLOR,
                    }, shadow, styleElement.centerChild]}>
                        <Image style={sizeIcon.xxs} source={require('../../../NewIcon/copyWhite.png')} />
                        <Text style={{ fontSize: _moderateScale(10), color: WHITE }}>
                            Copy
                        </Text>
                    </View>

                </TouchableOpacity>


                <View style={{
                    marginTop: _moderateScale(8 * 4),
                    marginHorizontal: _moderateScale(8)
                }}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }]}>
                        Link giới thiệu bạn bè:
                    </Text>
                    <Text style={{ fontStyle: 'italic', ...stylesFont.fontNolan500, color: BLACK_OPACITY_7, marginVertical: _moderateScale(4) }}>
                        (*) Gửi link giới thiệu này cho những người khác để họ trở thành cộng tác viên của bạn.
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Clipboard.setString(linkCollab)
                        setShowModalFlashMsg2(true)
                        setTimeout(() => {
                            setShowModalFlashMsg2(false)
                        }, 1500);
                    }}
                    style={[{
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(4),
                        paddingVertical: _moderateScale(8),
                        paddingLeft: _moderateScale(8 * 1),
                        marginHorizontal: _moderateScale(8 * 1),
                        justifyContent: 'center',
                        backgroundColor: BG_GREY_OPACITY_5,
                        // height:_moderateScale(8*6)
                    }, shadow]}>
                    <View style={[{ alignItems: 'center', marginRight: _moderateScale(8 * 6.5) }]}>
                        <Text numberOfLines={2} selectable={true} style={[stylesFont.fontNolanBold, { textAlign: 'left', fontSize: _moderateScale(13), color: BLUE_FB }]}>
                            {linkCollab}
                        </Text>

                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            Share.open({
                                message: linkCollab
                            })
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => {
                                    err && console.log(err);
                                });
                        }}
                        style={[{
                            position: 'absolute',
                            right: _moderateScale(8),
                            width: _moderateScale(8 * 4),
                            height: _moderateScale(8 * 4),
                            borderRadius: _moderateScale(4),
                            backgroundColor: BLUE_FB,
                        }, shadow, styleElement.centerChild]}>
                        <Image style={sizeIcon.xxs} source={require('../../../NewIcon/shareWhite.png')} />
                        <Text style={{ fontSize: _moderateScale(10), color: WHITE }}>
                            Share
                        </Text>
                    </TouchableOpacity>

                </TouchableOpacity>


                {/* 
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Clipboard.setString(infoUserRedux?.infoUser?.collaboratorCode)
                        setShowModalFlashMsg(true)
                        setTimeout(() => {
                            setShowModalFlashMsg(false)
                        }, 1500);
                    }}
                    style={[{
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(4),
                        paddingVertical: _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 3),
                        marginHorizontal: _moderateScale(8 * 1),
                        justifyContent: 'center',
                        marginTop: _moderateScale(8 * 2),
                        backgroundColor: BG_GREY_OPACITY_5
                    }, shadow]}>
                    <View style={[{ alignItems: 'center' }]}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                            Link giới thiệu bạn bè
                        </Text>
                        {
                            <Text selectable={true} style={[stylesFont.fontNolanBold, { marginTop: _moderateScale(8), fontSize: _moderateScale(14), color: BLUE_FB }]}>
                                {linkCollab}
                            </Text>
                        }
                    </View>
                </TouchableOpacity> */}
                {/* 
                <>
                    <View style={{
                        marginTop: _moderateScale(8 * 2),
                        width: "100%",
                        alignItems: 'center',
                        marginBottom: _moderateScale(8)
                    }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                            Mã QR của bạn:
                        </Text>
                    </View>

                    <View style={[styles.qr, shadow]}>
                        <QRCode
                            enableLinearGradient={true}
                            linearGradient={[BLACK_OPACITY_7, BLACK_OPACITY_7]}
                            // logo={{ uri: infoUserRedux?.infoUser?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                            logoSize={60}
                            logoBorderRadius={30}
                            logoBackgroundColor={'white'}
                            value={JSON.stringify({ collaboratorCode: infoUserRedux?.infoUser?.collaboratorCode, action: "create_booking" })}
                            size={_heightScale(240)}
                        />
                    </View>
                </> */}

            </View>
        </Modal>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,

    elevation: 1
}

const styles = StyleSheet.create({
    qr: {
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        backgroundColor: WHITE,
        padding: _moderateScale(8 * 3),
        alignSelf: 'center',
        borderRadius: _moderateScale(8 * 2),
        marginTop: _moderateScale(8 * 0),
    },
    inputDeposit: {
        fontSize: _moderateScale(14),
        color: BLACK_OPACITY_8,
        borderColor: BASE_COLOR,
        borderRadius: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    btnAddImage: {
        marginHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: _moderateScale(8),
        width: _moderateScale(8 * 10),
        // height:_moderateScale(8*25)
    },
    btnCopy__text: {
        fontSize: _moderateScale(12),
        color: BLUE_FB,
        bottom: 1
    },
    btnCopy: {
        paddingVertical: _moderateScale(2),
        paddingHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(4),
        borderWidth: _moderateScale(1),
        borderColor: BLUE_FB
    },
    btnTabActive: {
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: BTN_PRICE,
    },
    btnTab__text: {
        fontSize: _moderateScale(16),
        color: GREY
    },
    btnTab: {
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: _moderateScale(4),
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: 'transparent'
    },
    btnService: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_SERVICE,
        marginRight: _moderateScale(8),
        marginTop: _moderateScale(8)
    },
    btnConfirm__text: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    btnConfirm: {
        width: "100%",
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        height: _moderateScale(8 * 4)
    },
    textInput: {
        height: _moderateScale(8 * 4),
        fontSize: _moderateScale(14),
        textAlignVertical: 'top'
    },
    btnStar: {
        padding: _moderateScale(8),

    },
    container: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingVertical: _moderateScale(8),
        // paddingBottom: _moderateScale(50),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8),
        // height: '80%',
        backgroundColor: WHITE,
        paddingBottom:_moderateScale(8*3)
    },
    itemCol: {
        backgroundColor: BG_BEAUTY,
        flex: 0.5,
        margin: _moderateScale(4),
        padding: _moderateScale(8),
        borderRadius: _moderateScale(4),
        alignItems: 'center'
    },
    brief: {
        color: GREY
    },
    number: {
        fontSize: _moderateScale(18)
    },
    bannerPatient: {
        marginHorizontal: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2),
        borderRadius: _moderateScale(4),
        marginTop: _moderateScale(24)
    },

    btnLogOut: {
        marginRight: _widthScale(8 * 4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    bannerProfile__nameAndJob__job: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    bannerProfile__nameAndJob__name: {
        fontSize: _moderateScale(18),
        color: WHITE,
        width: '80%'
    },
    bannerProfile__nameAndJob: {
        marginLeft: _widthScale(8 * 2),
        marginBottom: _heightScale(8 * 6),
        flex: 1,
    },
    bannerProfile__avatar: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8 * 8 / 2),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    },
    bannerProfile: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        maxWidth: _moderateScale(336),
        alignSelf: 'center',
        height: _moderateScale(8 * 12 + 24),
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(16),
        padding: _moderateScale(16)
    },
    coverTop: {
        height: '100%',
        // justifyContent: 'center',
        // backgroundColor:'red'
    },
    ranking: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: _moderateScale(10)
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
    containTitle: {
        paddingHorizontal: _moderateScale(8 * 1),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: _moderateScale(8 * 3)
    },
    titleMain: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(8 * 2)
    },
    absoluteTitle: {
        position: 'absolute',
        top: _moderateScale(-8 * 6),
        backgroundColor: WHITE,
        alignSelf: 'center',
        minWidth: _moderateScale(320),
        height: _moderateScale(8 * 4.5),
        borderWidth: 1,
        borderColor: WHITE,
        borderRadius: _moderateScale(32),
        shadowColor: GREY,
        alignItems: 'center',
        paddingHorizontal: _moderateScale(16),
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    rowContent: {
        // paddingHorizontal: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 1),
        paddingLeft: _moderateScale(8 * 3)
    },
    rowActionProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemActionProfile: {
        backgroundColor: SECOND_COLOR,
        width: _moderateScale(90),
        height: _moderateScale(90),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: _moderateScale(8)
    },
    nameActionProfile: {
        color: WHITE,
        ...stylesFont.fontNolanBold,
        marginTop: _moderateScale(8)
    },
    listHistory: {
        flexDirection: 'row',
    },
    rightCalendar: {
        paddingHorizontal: _moderateScale(16)
    },
    itemCalendar: {
        paddingBottom: _moderateScale(8),
        marginBottom: _moderateScale(8)
    }
})

export default ModalInfoUserAffiliate;