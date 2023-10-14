import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import FastImage from '../../Components/Image/FastImage';
import { BG_GREY_OPACITY_9, BLACK_OPACITY_7, 
    BG_GREY_OPACITY_2, GREY_FOR_TITLE, GREY, SECOND_COLOR,
    BLACK_OPACITY_8, GREEN_2, WHITE, BG_MAIN_OPACITY } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale, _widthScale, _heightScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import { formatMonney } from '../../Constant/Utils';
import { getPartnerLevel } from '../../Redux/Action/InfoAction';


const TopInfo = (props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer)
    const [partnerSilver, setPartnerSilver] = useState({})
    const [partnerGold, setPartnerGold] = useState({})
    const [partnerPlatium, setPartnerPlatium] = useState({})
    const [partnerVip, setPartnerVip] = useState({})
    const [listPartnerLevel, setListPartnerLevel] = useState([])


    useEffect(() => {
        _getPartnerLevel()
    }, [])

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


    return <>
            <View
                style={{
                    backgroundColor: BG_MAIN_OPACITY,
                    alignItems: 'center',
                    paddingVertical: _moderateScale(8),
                    paddingHorizontal: _moderateScale(8)
                }}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        width: '100%',
                        height: _moderateScale(8 * 17),
                        paddingVertical: _moderateScale(8),
                        borderRadius: _moderateScale(8 * 2),
                        backgroundColor: 'rgba(255,255,255,0.7)',
                    }}>

                    <View style={{ position: 'absolute', right: _moderateScale(8 * 2), top: 0 }}>
                        {_renderLevelImage(infoUserRedux?.infoUser?.levelCode)}
                    </View>

                    <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), 
                        paddingTop: _moderateScale(8) }]}>
                        <FastImage
                            style={[styles.bannerProfile__avatar]}
                            uri={infoUserRedux?.infoUser?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                        />
                        <View style={{ marginLeft: _moderateScale(8), flex: 1 }}>
                            <Text style={[stylesFont.fontNolanBold, styles.bannerProfile__nameAndJob__name, { color: BLACK_OPACITY_8 }]}>
                                {
                                    `${infoUserRedux?.infoUser?.name}`
                                }
                            </Text>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                {
                                    formatMonney(parseInt((infoUserRedux?.infoUser?.totalAmountBill) / 1000))
                                } điểm
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: _moderateScale(8) }} />

                    {
                        infoUserRedux?.infoUser &&
                            partnerGold?.promotionCondition?.revenue &&
                            infoUserRedux?.infoUser?.levelCode == "SILVER" ?
                            <>
                                <View style={[styleElement.rowAliCenter, { alignSelf: 'center' }]}>
                                    <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_bac.png')} />
                                    <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                        <View style={{
                                            width: _moderateScale(230 * infoUserRedux?.infoUser?.totalAmountBill / partnerGold?.promotionCondition?.revenue),
                                            height: _moderateScale(4),
                                            backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                        }} />
                                    </View>
                                    <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_vang.png')} />
                                </View>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                    Còn {
                                        <Text style={{...stylesFont.fontNolanBold}}>
                                            {formatMonney(parseInt((partnerGold?.promotionCondition?.revenue - infoUserRedux?.infoUser?.totalAmountBill) / 1000))}
                                            </Text>
                                    } điểm nữa để lên hạng GOLD
                                </Text>
                            </>
                            : <></>

                    }
                    {
                        infoUserRedux?.infoUser &&
                            partnerPlatium?.promotionCondition?.revenue &&
                            infoUserRedux?.infoUser?.levelCode == "GOLD" ?
                            <>
                                <View style={[styleElement.rowAliCenter, { alignSelf: 'center' }]}>
                                    <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_vang.png')} />
                                    <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                        <View style={{
                                            width: _moderateScale(230 * infoUserRedux?.infoUser?.totalAmountBill / partnerPlatium?.promotionCondition?.revenue),
                                            height: _moderateScale(4),
                                            backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                        }} />
                                    </View>
                                    <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_bk.png')} />
                                </View>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                    Còn {
                                         <Text style={{...stylesFont.fontNolanBold}}>
                                         {formatMonney(parseInt((partnerPlatium?.promotionCondition?.revenue - infoUserRedux?.infoUser?.totalAmountBill) / 1000)) }
                                           
                                        </Text>
                                    } điểm nữa để lên hạng PLATIUM
                                </Text>
                            </>
                            : <></>
                    }
                    {
                        infoUserRedux?.infoUser &&
                            partnerVip?.promotionCondition?.revenue &&
                            infoUserRedux?.infoUser?.levelCode == "PLATINUM" ?
                            <>
                                <View style={[styleElement.rowAliCenter, { alignSelf: 'center' }]}>
                                    <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_bk.png')} />
                                    <View style={{ width: _moderateScale(230), height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_9 }}>
                                        <View style={{
                                            width: _moderateScale(230 * infoUserRedux?.infoUser?.totalAmountBill / partnerVip?.promotionCondition?.revenue),
                                            height: _moderateScale(4),
                                            backgroundColor: GREEN_2, borderTopRightRadius: _moderateScale(4), borderBottomRightRadius: _moderateScale(4)
                                        }} />
                                    </View>
                                    <Image style={[sizeIcon.lxlg]} source={require('../../Image/component/rank_vip.png')} />
                                </View>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', color: BLACK_OPACITY_7 }}>
                                    Còn {
                                        formatMonney(parseInt((partnerVip?.promotionCondition?.revenue - infoUserRedux?.infoUser?.totalAmountBill) / 1000))
                                    } điểm nữa để lên hạng VIP
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
                                    Bạn đã đạt hạng VIP
                                </Text>
                            </>
                            : <></>
                    }

                </TouchableOpacity>

            </View>
        </>
};



const styles = StyleSheet.create({
    bannerProfile__nameAndJob__name: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    bannerProfile__avatar: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(8 * 6 / 2),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    }
})
export default TopInfo;