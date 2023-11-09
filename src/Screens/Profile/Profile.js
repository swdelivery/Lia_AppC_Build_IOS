import AsyncStorage from '@react-native-community/async-storage';
import { find } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl, Dimensions, ActivityIndicator } from 'react-native';
import ImageView from "react-native-image-viewing";
import { useDispatch, useSelector } from "react-redux";
import { navigation } from '../../../rootNavigation';
import SocketInstance from '../../../SocketInstance';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BLACK_OPACITY_8, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_7, BG_GREY_OPACITY_3, PRICE_ORANGE, GREEN_2, BG_GREY_OPACITY_9, RED, BLACK } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { partnerLevel } from '../../Constant/PartnerLevel';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { getMedicalPrescription, getTreatmentDetail, getPartnerLevel, getMedicalPrescriptionCurrent } from '../../Redux/Action/InfoAction';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";
import ItemHistory from './component/ItemHistory';
import ItemMedical from './component/ItemMedical';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { partnerAccountLogout } from '../../Redux/Action/AuthAction';
import { formatMonney } from '../../Constant/Utils';
import ModalInfoLevel from '../../Components/ModalInfoLevel/ModalInfoLevel';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadModule, getPartnerCoupon } from '../../Redux/Action/BookingAction'
import { updateProfilePartner } from '../../Redux/Action/ProfileAction';
import isEmpty from 'lodash/isEmpty';
import ModalRequireAvatar from '../../Components/Notification/ModalRequireAvatar';
import { getDataCourse } from '../../Redux/Action/LiaUniAction';
import ModalPickSingleNotSearch from '../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch';


const _handleLogOut = async () => {


    Store.dispatch({
        type: ActionType.LOG_OUT
    })
    let fcmTokenSTR = await AsyncStorage.getItem('fcmToken');
    // return alert(fcmTokenSTR)

    // let resultLogout = await handleApi(_logout(fcmTokenSTR))
    // console.log({ resultLogout });
    // if (resultLogout.error) {
    //     return alert(resultLogout.message)
    // }

    let result = await partnerAccountLogout({
        fcmToken: fcmTokenSTR
    })
    if (result?.isAxiosError) return

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("password");

    setTimeout(() => {
        Store.dispatch({
            type: ActionType.CLEAR_STORE_REDUX
        })
    }, 0);
    SocketInstance.instance = null;
    SocketInstance.socketConn.disconnect();
    SocketInstance.socketConn = null

    navigation.replace("MainTab")

}

const Profile = props => {
    const dispatch = useDispatch()
    const infoUserRedux = useSelector(state => state?.infoUserReducer)
    const medicalPrescriptionRedux = useSelector(state => state?.infoReducer?.medicalPrescription)
    const treatmentDetailRedux = useSelector(state => state?.infoReducer?.treatmentDetail)
    const walletReducer = useSelector(state => state?.walletReducer?.infoWallet)

    const scrollA = useRef(new Animated.Value(0)).current;
    const [refresh, setRefresh] = useState(false)

    const [isShowGallery, setShowGallery] = useState(false)

    const [listPartnerLevel, setListPartnerLevel] = useState([])

    const [partnerSilver, setPartnerSilver] = useState({})
    const [partnerGold, setPartnerGold] = useState({})
    const [partnerPlatium, setPartnerPlatium] = useState({})
    const [partnerVip, setPartnerVip] = useState({})
    const [currentMedical, setCurrentMedical] = useState([])


    const [showModalInfoLevel, setShowModalInfoLevel] = useState(false)

    const [listCoupon, setListCoupon] = useState([])

    const [showModalListCourse, setShowModalListCourse] = useState({
        show: false,
        data: []
    })

    useEffect(() => {
        _getPartnerCoupon()
        dispatch(getTreatmentDetail({
            "sort": {
                "created": -1
            },
            "limit": 5,
            "page": 1
        }))
        dispatch(getMedicalPrescription())
        _getMedicalPrescriptionCurrent()
        _getPartnerLevel()
    }, [])

    const _getPartnerCoupon = async () => {
        let result = await getPartnerCoupon({
            "condition": {
                "usedAt": {
                    "equal": null
                }
            },
        })
        if (result?.isAxiosError) return
        setListCoupon(result?.data?.data)
    }

    const _getMedicalPrescriptionCurrent = async () => {
        let result = await getMedicalPrescriptionCurrent();
        if (result?.isAxiosError) return
        setCurrentMedical(result.data.data)
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

    const _onRefresh = () => {
        setRefresh(true)
        dispatch(getMedicalPrescription())
        _getMedicalPrescriptionCurrent()
        dispatch(getTreatmentDetail({
            "sort": {
                "created": -1
            },
            "limit": 5,
            "page": 1
        }))
        setTimeout(() => {
            setRefresh(false)
        }, 1000);
    }


    const _handlePickImageAvatar = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            width: 500,
            height: 500,
            cropping: true,
            multiple: false,
            mediaType: 'photo',
            compressImageQuality: 1,
        }).then(async (image) => {
            console.log({ image });
            let newImage = {
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
                type: image.mime,
                name: `${image.modificationDate}_${0}`,
                isLocal: true
            }

            if (!isEmpty(newImage)) {
                let listImages = [newImage]
                let resultUploadImage = await uploadModule({
                    moduleName: 'partner',
                    files: listImages
                })
                if (resultUploadImage.isAxiosError) return

                let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);

                dispatch(updateProfilePartner({ fileAvatar: listIdImageHasUpload[0] }))
            }

            // dispatch(employeeUpdateAvatar(newImage))
        });
    }



    const _getDataCourse = async () => {
        let result = await getDataCourse();
        if (result?.isAxiosError) return;
        setShowModalListCourse({
            show: true,
            data: result?.data?.data
        })
    }




    return (
        <View style={styles.container}>
            {/* <StatusBarCustom /> */}

            <ModalRequireAvatar />

            <ModalPickSingleNotSearch
                hide={() => {
                    setShowModalListCourse({
                        show: false,
                        data: []
                    })
                }}
                onSelect={(item) => {
                    console.log({ item });
                    navigation.navigate(ScreenKey.LIA_UNI, { item: item })
                }}
                data={showModalListCourse?.data} show={showModalListCourse?.show} />

            <ModalInfoLevel
                data={listPartnerLevel}
                currCodePick={infoUserRedux?.infoUser?.levelCode}
                hide={() => {
                    setShowModalInfoLevel(false)
                }}
                show={showModalInfoLevel} />

            <ImageView
                images={[`${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}`].map(item => {
                    return {
                        uri: item,
                    }
                })}
                onRequestClose={() => {
                    setShowGallery(false)
                }}
                imageIndex={0}
                visible={isShowGallery} />


            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => {
                            _onRefresh()
                        }}
                    />
                }
                contentContainerStyle={{ flexGrow: 1 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../NewImage/bannerLinear.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(520),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter,
                        {
                            justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 4),
                            marginTop: _moderateScale(8 * 2)
                        }]}>
                            <Image
                                style={[{
                                    // borderWidth: 1,
                                    width: _moderateScale(8 * 20),
                                    height: _moderateScale(8 * 6),
                                    resizeMode: 'contain'
                                }]}
                                source={require('../../NewImage/logoNgang.png')} />
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.SETTING_APP)
                                }}
                            >
                                <Image style={[sizeIcon.llg]} source={require('../../NewIcon/settingWhite.png')} />
                            </TouchableOpacity>

                        </View>
                        <View

                            style={{
                                height: "180%",
                                // justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: _moderateScale(8 * 3),
                                marginTop: _moderateScale(8 * 2)
                            }}>

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
                                }}>

                                <View style={{ position: 'absolute', right: _moderateScale(8 * 2), top: 0 }}>
                                    {_renderLevelImage(infoUserRedux?.infoUser?.levelCode)}
                                </View>

                                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8 * 2) }]}>

                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            setShowGallery(true)
                                        }}>
                                            <FastImage
                                                style={[styles.bannerProfile__avatar]}
                                                uri={infoUserRedux?.infoUser?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                            />
                                        </TouchableOpacity>
                                        <View style={{
                                            position: 'absolute',
                                            top: -_moderateScale(4),
                                            left: -_moderateScale(4),
                                            backgroundColor: WHITE,
                                            borderWidth: 1,
                                            borderColor: SECOND_COLOR,
                                            width: _moderateScale(24),
                                            height: _moderateScale(24),
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            zIndex: 100
                                        }}>
                                            <TouchableOpacity
                                                hitSlop={styleElement.hitslopSm}
                                                onPress={() => _handlePickImageAvatar()}>
                                                <Image style={sizeIcon.xxs} source={require('../../Icon/camera_blue.png')} />

                                            </TouchableOpacity>
                                        </View>
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
                                                <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_bac.png')} />
                                                <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                                    <View style={{
                                                        width: _moderateScale(230 * (infoUserRedux?.infoUser?.liaPoint) / partnerGold?.promotionCondition?.revenue),
                                                        height: _moderateScale(4),
                                                        backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                                    }} />
                                                </View>
                                                <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_vang.png')} />
                                            </View>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                                Còn {
                                                    formatMonney(parseInt((partnerGold?.promotionCondition?.revenue - infoUserRedux?.infoUser?.liaPoint) / 1000))
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
                                                <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_vang.png')} />
                                                <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                                    <View style={{
                                                        width: _moderateScale(230 * (infoUserRedux?.infoUser?.liaPoint) / partnerPlatium?.promotionCondition?.revenue),
                                                        height: _moderateScale(4),
                                                        backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                                    }} />
                                                </View>
                                                <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_bk.png')} />
                                            </View>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                                Còn {
                                                    formatMonney(parseInt((partnerPlatium?.promotionCondition?.revenue - (infoUserRedux?.infoUser?.liaPoint)) / 1000))
                                                } điểm nữa để lên hạng {partnerPlatium?.name}
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
                                                <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_bk.png')} />
                                                <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                                    <View style={{
                                                        width: _moderateScale(230 * (infoUserRedux?.infoUser?.liaPoint) / partnerVip?.promotionCondition?.revenue),
                                                        height: _moderateScale(4),
                                                        backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                                    }} />
                                                </View>
                                                <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_vip.png')} />
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
                                                <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_bk.png')} />
                                                <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                                    <View style={{
                                                        width: _moderateScale(230),
                                                        height: _moderateScale(4),
                                                        backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                                    }} />
                                                </View>
                                                <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_vip.png')} />
                                            </View>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                                Bạn đã đạt hạng {partnerVip?.name}
                                            </Text>
                                        </>
                                        : <></>
                                }

                                {
                                    !infoUserRedux?.infoUser?.levelCode ?
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(ScreenKey.VERIFICATION_CTV)
                                            }}
                                            style={{
                                                width: _moderateScale(8 * 32),
                                                height: _moderateScale(8 * 5),
                                                borderWidth: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                marginTop: _moderateScale(8 * 0.5),
                                                flexDirection: 'row',
                                                borderColor: WHITE,
                                                backgroundColor: WHITE,
                                                borderColor: BASE_COLOR,
                                                borderRadius: _moderateScale(8)
                                            }}>
                                            <Text style={{ ...stylesFont.fontNolan500, color: BLACK, fontSize: _moderateScale(15) }}>
                                                Cập nhật hồ sơ Cộng tác viên
                                            </Text>
                                            <Image style={[sizeIcon.xs, { top: _moderateScale(1), marginLeft: _moderateScale(4) }]} source={require('../../Icon/arrowRight_grey.png')} />
                                            {/* <View style={{ marginLeft: _moderateScale(8), padding: _moderateScale(4), backgroundColor: BASE_COLOR, borderRadius: _moderateScale(8 * 2) }}>
                                                <Image style={[sizeIcon.xxs, {}]} source={require('../../NewIcon/arrowRightWhite.png')} />
                                            </View> */}
                                        </TouchableOpacity>
                                        :
                                        <></>
                                }



                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    top: _moderateScale(260),
                    alignSelf: 'center',
                    borderRadius: _moderateScale(32),
                    alignItems: 'center',
                    paddingHorizontal: _moderateScale(8 * 4),
                    flexDirection: 'row',
                    zIndex: 1
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.MISSION_SCREEN)
                        }}
                        style={{
                            flex: 1,
                            height: _moderateScale(8 * 6.5),
                            backgroundColor: WHITE,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 2,
                            borderRadius: _moderateScale(8)
                        }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, paddingLeft: _moderateScale(8) }}>
                            <View style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 4.5),
                                height: _moderateScale(8 * 4.5),
                                borderRadius: _moderateScale(8),
                                backgroundColor: 'rgba(247,227,190,0.6)'
                            }]}>
                                <Image style={sizeIcon.xlllg} source={require('../../NewIcon/coinBags.png')} />
                            </View>
                            <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                     Xu
                                </Text>
                                <Text style={{ ...stylesFont.fontDinTextPro, marginLeft: _moderateScale(2), fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                    {walletReducer?.liaTicketAmount}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: _moderateScale(8) }} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.LIST_VOUCHER)
                        }}
                        style={{
                            flex: 1,
                            height: _moderateScale(8 * 6.5),
                            backgroundColor: WHITE,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 2,
                            borderRadius: _moderateScale(8),
                        }}>

                        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, paddingLeft: _moderateScale(8) }}>
                            <View style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 4.5),
                                height: _moderateScale(8 * 4.5),
                                borderRadius: _moderateScale(8),
                                backgroundColor: 'rgba(118,172,229,0.3)'
                            }]}>
                                <Image style={sizeIcon.lg} source={require('../../NewIcon/voucherBlue.png')} />
                            </View>
                            <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                    Mã giảm giá
                                </Text>
                                <Text style={{ ...stylesFont.fontDinTextPro, marginLeft: _moderateScale(2), fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                    {listCoupon?.length}
                                </Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    marginTop: _moderateScale(32)
                }}>
                    <View style={styles.wave} />






                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 5), marginVertical: _moderateScale(8 * 2) }]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.EDIT_PROFILE)
                            }}
                            style={{
                                width: _moderateScale(8 * 10),
                                height: _moderateScale(8 * 10),
                                borderRadius: _moderateScale(8),
                                backgroundColor: 'rgba(79, 173, 164,0.2)',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image style={sizeIcon.lxlg} source={require('../../NewIcon/peopleBlue.png')} />
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8, marginTop: _moderateScale(4) }}>
                                Cá nhân
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate(ScreenKey.HEALTH_RECORD)}
                            style={{
                                width: _moderateScale(8 * 10),
                                height: _moderateScale(8 * 10),
                                borderRadius: _moderateScale(8),
                                backgroundColor: 'rgba(79, 173, 164,0.2)',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image style={sizeIcon.lxlg} source={require('../../NewIcon/heart.png')} />
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8, marginTop: _moderateScale(4) }}>
                                Sức khoẻ
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate(ScreenKey.LIST_PARTNER_DIARY)}
                            style={{
                                width: _moderateScale(8 * 10),
                                height: _moderateScale(8 * 10),
                                borderRadius: _moderateScale(8),
                                backgroundColor: 'rgba(79, 173, 164,0.2)',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image style={sizeIcon.lxlg} source={require('../../NewIcon/diary.png')} />
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8, marginTop: _moderateScale(4) }}>
                                Nhật ký
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenKey.LIST_BOOKING)}
                        style={{
                            paddingVertical: _moderateScale(8 * 2),
                            paddingHorizontal: _moderateScale(8 * 3),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <View style={[{
                            width: _moderateScale(8 * 4),
                            height: _moderateScale(8 * 4),
                            borderRadius: _moderateScale(8),
                            backgroundColor: 'rgba(79, 173, 164,0.2)',
                            marginRight: _moderateScale(8)
                        }, styleElement.centerChild]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/calendarBase.png')} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8, flex: 1 }}>
                            Quản lí Booking
                        </Text>
                        <View style={[styleElement.rowAliCenter]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY }}>
                            </Text>
                            <Image style={[sizeIcon.md, { opacity: 0.6 }]} source={require('../../Icon/arrowRight_grey.png')} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: '100%', height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5, }} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenKey.PURCHASE_DEPOSIT_REQUEST)}
                        style={{
                            paddingVertical: _moderateScale(8 * 2),
                            paddingHorizontal: _moderateScale(8 * 3),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <View style={[{
                            width: _moderateScale(8 * 4),
                            height: _moderateScale(8 * 4),
                            borderRadius: _moderateScale(8),
                            backgroundColor: 'rgba(79, 173, 164,0.2)',
                            marginRight: _moderateScale(8)
                        }, styleElement.centerChild]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/dollarBase.png')} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8, flex: 1 }}>
                            Thanh toán / Cọc
                        </Text>
                        <View style={[styleElement.rowAliCenter]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY }}>
                            </Text>
                            <Image style={[sizeIcon.md, { opacity: 0.6 }]} source={require('../../Icon/arrowRight_grey.png')} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: '100%', height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5, }} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenKey.LIST_ORDER_SERVICE)}
                        style={{
                            paddingVertical: _moderateScale(8 * 2),
                            paddingHorizontal: _moderateScale(8 * 3),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <View style={[{
                            width: _moderateScale(8 * 4),
                            height: _moderateScale(8 * 4),
                            borderRadius: _moderateScale(8),
                            backgroundColor: 'rgba(79, 173, 164,0.2)',
                            marginRight: _moderateScale(8)
                        }, styleElement.centerChild]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/serviceBase.png')} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8, flex: 1 }}>
                            Kho dịch vụ
                        </Text>
                        <View style={[styleElement.rowAliCenter]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY }}>
                            </Text>
                            <Image style={[sizeIcon.md, { opacity: 0.6 }]} source={require('../../Icon/arrowRight_grey.png')} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: '100%', height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5, }} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenKey.LIST_MEDICINE)}
                        style={{
                            paddingVertical: _moderateScale(8 * 2),
                            paddingHorizontal: _moderateScale(8 * 3),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <View style={[{
                            width: _moderateScale(8 * 4),
                            height: _moderateScale(8 * 4),
                            borderRadius: _moderateScale(8),
                            backgroundColor: 'rgba(79, 173, 164,0.2)',
                            marginRight: _moderateScale(8)
                        }, styleElement.centerChild]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/medicine.png')} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8, flex: 1 }}>
                            Đơn thuốc
                        </Text>
                        <View style={[styleElement.rowAliCenter]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY }}>
                            </Text>
                            <Image style={[sizeIcon.md, { opacity: 0.6 }]} source={require('../../Icon/arrowRight_grey.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={_getDataCourse}
                        style={{
                            paddingVertical: _moderateScale(8 * 2),
                            paddingHorizontal: _moderateScale(8 * 3),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <View style={[{
                            width: _moderateScale(8 * 4),
                            height: _moderateScale(8 * 4),
                            borderRadius: _moderateScale(8),
                            backgroundColor: 'rgba(79, 173, 164,0.2)',
                            marginRight: _moderateScale(8)
                        }, styleElement.centerChild]}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/medicine.png')} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8, flex: 1 }}>
                            Đào tạo
                        </Text>
                        {/* <View style={[styleElement.rowAliCenter]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY }}>
                            </Text>
                            <Image style={[sizeIcon.md, { opacity: 0.6 }]} source={require('../../Icon/arrowRight_grey.png')} />
                        </View> */}
                    </TouchableOpacity>


                    <View style={[styles.containTitle, { paddingRight: _moderateScale(8 * 3) }]}>
                        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                            Lịch sử điều trị
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_ALL_HISTORY_TREATMENT)
                            }}
                        >
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                Xem tất cả
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.rowContent]}>
                        <ScrollView horizontal
                            contentContainerStyle={{
                                paddingVertical: _moderateScale(8),
                                paddingHorizontal: _moderateScale(6)
                            }}
                            showsHorizontalScrollIndicator={false}>
                            <View style={[styles.listHistory]}>
                                {treatmentDetailRedux?.map((item, index) => {
                                    return <ItemHistory key={index} data={item} />
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    {currentMedical.map((item, index) => {
                        return <ItemMedical data={item} key={index} />
                    })}

                </View>
                <View style={{ height: 50 }} />
            </Animated.ScrollView>
        </View>

    );
};


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    elevation: 3
}




const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    ranking: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: _moderateScale(10)
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
    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)- _moderateScale(20)
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


const gradient = {
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        'rgba(104, 47, 144,1)',
        'rgba(104, 47, 144,.9)',
        'rgba(104, 47, 144,.7)',
        'rgba(104, 47, 144,.4)'
    ]
}


export default Profile;