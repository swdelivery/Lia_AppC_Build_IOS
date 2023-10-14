import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BLACK, BLACK_OPACITY_7, BLUE_FB, BTN_PRICE, GREY, THIRD_COLOR, WHITE } from '../../../Constant/Color';

import { getPartnerLevel, getQuestionAnswer } from '../../../Redux/Action/InfoAction';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { sizeIcon } from '../../../Constant/Icon';
import { navigation } from '../../../../rootNavigation';
import { getTopCollaboratorRevenueInMonth } from '../../../Redux/Action/Affiilate';
import { formatMonney } from '../../../Constant/Utils';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector } from 'react-redux';
import ModalThele from './ModalThele';
import { getConfigData } from '../../../Redux/Action/OrtherAction';

const Ranked = (props) => {
    const [list, setList] = useState([])
    const [listSeeding, setListSeeding] = useState([])

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)
    const [showModalThele, setShowModalThele] = useState(false)
    const [configThele, setConfigThele] = useState({})
    const [listPartnerLevel, setListPartnerLevel] = useState([])

    useEffect(() => {
        _getTopCollaboratorRevenueInMonth()
        _getConfigThele()
        _getPartnerLevel()
    }, [])

    const _getTopCollaboratorRevenueInMonth = async () => {
        let result = await getTopCollaboratorRevenueInMonth({
        })
        if (result?.isAxiosError) return

        if (result?.data?.data?.length == 0) {
            let resultSeeding = await getConfigData("SEED_RANKING_COLLAB");
            setListSeeding(resultSeeding)
        }

        // setList(result?.data?.data)
    }
    const _getConfigThele = async () => {
        let result = await getConfigData("RANKING_POLICY")
        if (result?.isAxiosError) return
        setConfigThele(result)
    }
    const _getPartnerLevel = async () => {
        let result = await getPartnerLevel();
        if (result?.isAxiosError) return
        setListPartnerLevel(result?.data?.data)
    }



    const _renderLevel = (code) => {
        switch (code) {
            case 'SILVER':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={[sizeIcon.lg]}
                            source={require('../../../NewIcon/flagBac.png')} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                            {listPartnerLevel?.find(item => item?.code == code)?.name}
                        </Text>
                    </View>
                )

            case 'GOLD':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={[sizeIcon.lg]}
                            source={require('../../../NewIcon/flagVang.png')} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_7, marginLeft: _moderateScale(4), bottom: 2 }}>
                            {listPartnerLevel?.find(item => item?.code == code)?.name}
                        </Text>
                    </View>
                )
            case 'PLATINUM':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={[sizeIcon.lg]}
                            source={require('../../../NewIcon/flagBK.png')} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_7, marginLeft: _moderateScale(4), bottom: 2 }}>
                            {listPartnerLevel?.find(item => item?.code == code)?.name}
                        </Text>
                    </View>

                )
            case 'VIP':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={[sizeIcon.lg]}
                            source={require('../../../NewIcon/flagVIP.png')} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_7, marginLeft: _moderateScale(4), bottom: 2 }}>
                            {listPartnerLevel?.find(item => item?.code == code)?.name}
                        </Text>
                    </View>

                )
            default:
                break;
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />

            <ModalThele
                hide={() => {
                    setShowModalThele(false)
                }}
                data={configThele}
                show={showModalThele}
            />

            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingTop: _moderateScale(8 * 1.5),
                paddingBottom: _moderateScale(8 * 2),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
            }}>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../../Icon/back_bold.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                        Bảng xếp hạng
                    </Text>

                    <TouchableOpacity onPress={() => {
                        setShowModalThele(true)
                    }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLUE_FB, top: _moderateScale(2) }]} numberOfLines={2}>
                            Chính sách
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView scrollIndicatorInsets={{ right: 1 }} style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    {
                        list?.length > 0 ?
                            <>
                                {
                                    list?.map((item, index) => {
                                        return (
                                            <View style={{
                                                borderBottomWidth: 0.5,
                                                borderBottomColor: BG_GREY_OPACITY_2,
                                                paddingVertical: _moderateScale(8 * 1.5)
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    // alignItems:'center'
                                                }}>
                                                    <View style={{ flex: 5.5, flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: _moderateScale(8 * 8),
                                                                height: _moderateScale(8 * 8),
                                                                borderRadius: _moderateScale(8 * 4),
                                                                backgroundColor: BG_GREY_OPACITY_5,
                                                                marginRight: _moderateScale(8 * 2),
                                                                borderWidth: 1,
                                                                borderColor: THIRD_COLOR
                                                            }}
                                                            source={{
                                                                uri: `${URL_ORIGINAL}${item?.partner?.fileAvatar?.link}`
                                                            }} />
                                                        <View>
                                                            <Text
                                                                numberOfLines={1}
                                                                style={{
                                                                    ...stylesFont.fontNolanBold,
                                                                    fontSize: _moderateScale(15),
                                                                    color: BLACK_OPACITY_7
                                                                }}>
                                                                {item?.partner?.name}
                                                            </Text>
                                                            <View style={{ height: _moderateScale(4) }} />
                                                            {
                                                                _renderLevel(item?.partner?.levelCode)
                                                            }
                                                            <Text style={{
                                                                ...stylesFont.fontNolanBold,
                                                                fontSize: _moderateScale(17),
                                                                marginTop: _moderateScale(4),
                                                                color: '#FA4664'
                                                            }}>
                                                                {formatMonney(item?.totalRevenue)} đ
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                                        {
                                                            index == 0 &&
                                                            <Image style={{
                                                                width: _moderateScale(46),
                                                                height: _moderateScale(46),
                                                                resizeMode: 'contain'
                                                            }} source={require('../../../NewIcon/giai1.png')} />
                                                        }
                                                        {
                                                            index == 1 &&
                                                            <Image style={sizeIcon.llllg} source={require('../../../NewIcon/giai2.png')} />
                                                        }
                                                        {
                                                            index == 2 &&
                                                            <Image style={sizeIcon.llllg} source={require('../../../NewIcon/giai3.png')} />
                                                        }

                                                        {
                                                            index !== 0 && index !== 1 && index !== 2 &&
                                                            <Text style={{ color: GREY }}>
                                                                {index + 1}
                                                            </Text>
                                                        }

                                                        {/* <Image style={sizeIcon.llllg} source={require('../../../NewIcon/giai3.png')} /> */}
                                                        {/* <Text>
                                                {index + 1}
                                            </Text> */}
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </>
                            :
                            <>
                               {
                                    listSeeding?.value?.map((item, index) => {
                                        return (
                                            <View style={{
                                                borderBottomWidth: 0.5,
                                                borderBottomColor: BG_GREY_OPACITY_2,
                                                paddingVertical: _moderateScale(8 * 1.5)
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                }}>
                                                    <View style={{ flex: 5.5, flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: _moderateScale(8 * 8),
                                                                height: _moderateScale(8 * 8),
                                                                borderRadius: _moderateScale(8 * 4),
                                                                backgroundColor: BG_GREY_OPACITY_5,
                                                                marginRight: _moderateScale(8 * 2),
                                                                borderWidth: 1,
                                                                borderColor: THIRD_COLOR
                                                            }}
                                                            source={{
                                                                uri: item?.image
                                                            }} />
                                                        <View>
                                                            <Text
                                                                numberOfLines={1}
                                                                style={{
                                                                    ...stylesFont.fontNolanBold,
                                                                    fontSize: _moderateScale(15),
                                                                    color: BLACK_OPACITY_7
                                                                }}>
                                                                {item?.name}
                                                            </Text>
                                                            <View style={{ height: _moderateScale(4) }} />
                                                            {
                                                                _renderLevel(item?.levelCode)
                                                            }
                                                            <Text style={{
                                                                ...stylesFont.fontNolanBold,
                                                                fontSize: _moderateScale(17),
                                                                marginTop: _moderateScale(4),
                                                                color: '#FA4664'
                                                            }}>
                                                                {formatMonney(item?.total)} đ
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                                        {
                                                            index == 0 &&
                                                            <Image style={{
                                                                width: _moderateScale(46),
                                                                height: _moderateScale(46),
                                                                resizeMode: 'contain'
                                                            }} source={require('../../../NewIcon/giai1.png')} />
                                                        }
                                                        {
                                                            index == 1 &&
                                                            <Image style={sizeIcon.llllg} source={require('../../../NewIcon/giai2.png')} />
                                                        }
                                                        {
                                                            index == 2 &&
                                                            <Image style={sizeIcon.llllg} source={require('../../../NewIcon/giai3.png')} />
                                                        }

                                                        {
                                                            index !== 0 && index !== 1 && index !== 2 &&
                                                            <Text style={{ color: GREY }}>
                                                                {index + 1}
                                                            </Text>
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </>
                    }
                </View>
                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({


})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 11
}



export default Ranked;