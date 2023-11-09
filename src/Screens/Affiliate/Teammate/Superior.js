import React, { useRef, useEffect, useState, memo } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ScrollView, Clipboard } from 'react-native';
import { GREY, WHITE, BASE_COLOR, SECOND_COLOR, BTN_PRICE, RED, BLUE_FB, THIRD_COLOR, BLACK, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2, BLACK_OPACITY_7, GREY_FOR_TITLE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../../Constant/Icon';
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { navigation } from '../../../../rootNavigation';
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux';
import { getWallet, getCurrentCommission, getCollabStatistic, getTeammateParent, getTeammateSuperior } from '../../../Redux/Action/InfoAction'
import { formatMonney } from '../../../Constant/Utils';
import ModalCashInWallet from '../Components/ModalCashInWallet';
import ModalInfoWallet from '../Components/ModalInfoWallet';
import ScreenKey from '../../../Navigation/ScreenKey'
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { TabBar, TabView } from 'react-native-tab-view';
import ModalFlashMsg from '../../../Components/ModalFlashMsg/ModalFlashMsg';
import LinearGradient from 'react-native-linear-gradient';
import ModalInfo from './Components/ModalInfo';


const Superior = memo((props) => {

    const [listSuperior, setListSuperior] = useState([1, 2, 3, 4, 5, 5, 6, 7, 7, 5, 4, 4, 4])

    const [teammateSuperior, setTeammateSuperior] = useState([])
    const [teammateParent, setTeammateParent] = useState({})

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)
    const [isFirstLoaded, setIsFirstLoaded] = useState(false)

    const [dataShowModal, setDataShowModal] = useState({
        show: false,
        data: {}
    })

    useEffect(() => {
        _getTeammateParent()
        _getTeammateSuperior()
    }, [])

    const _getTeammateParent = async () => {
        let result = await getTeammateParent();
        if (result?.isAxiosError) return setIsFirstLoaded(true)
        setTeammateParent(result?.data?.data);
        setIsFirstLoaded(true)
    }

    const _getTeammateSuperior = async () => {
        let result = await getTeammateSuperior();
        if (result?.isAxiosError) return setIsFirstLoaded(true)
        setTeammateSuperior(result?.data?.data);
        setIsFirstLoaded(true)
    }

    return (
        <View style={{ flex: 1 }}>

            <ModalInfo
                hide={() => {
                    setDataShowModal({
                        show: false,
                        data: {}
                    })
                }}
                show={dataShowModal?.show}
                data={dataShowModal?.data} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollIndicatorInsets={{ right: 1 }}>
                <View style={{
                    margin: _moderateScale(8 * 2)
                }}>
                    <Text style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: BLACK,
                        fontStyle: 'italic'
                    }}>* Đây là đội nhóm trung gian giữa lãnh đạo và người hướng dẫn trực tiếp.</Text>
                </View>

                {
                    isFirstLoaded ?
                        <View style={{ flex: 1 }}>
                            {
                                teammateSuperior?.length > 0 ?
                                    <>
                                        <View style={{
                                            width: _width - _widthScale(8 * 4),
                                            borderWidth: 2,
                                            alignSelf: 'center',
                                            borderRadius: _moderateScale(8),
                                            borderColor: THIRD_COLOR,
                                            flexWrap: 'wrap',
                                            flexDirection: 'row'
                                        }}>
                                            {
                                                teammateSuperior?.map((item, index) => {
                                                    return (
                                                        <View style={{
                                                            width: (_width - _widthScale(8 * 4)) / 2 - 2,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: _moderateScale(8 * 1)
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setDataShowModal({
                                                                        show: true,
                                                                        data: item
                                                                    })
                                                                }}
                                                                style={[styleElement.centerChild, {
                                                                    height: _moderateScale(8 * 7),
                                                                    width: '100%',
                                                                    backgroundColor: THIRD_COLOR,
                                                                    borderRadius: _moderateScale(8),
                                                                    paddingHorizontal: _moderateScale(8)
                                                                }]}>
                                                                <Text
                                                                    numberOfLines={1}
                                                                    style={{
                                                                        ...stylesFont.fontNolanBold,
                                                                        fontSize: _moderateScale(15),
                                                                        color: GREY_FOR_TITLE
                                                                    }}>
                                                                    {index + 1}. {item?.partner?.name}
                                                                </Text>
                                                                <Text style={{
                                                                    ...stylesFont.fontNolan500,
                                                                    fontSize: _moderateScale(15),
                                                                    color: GREY_FOR_TITLE
                                                                }}>
                                                                    {item?.partner?.phone[0].fullPhoneNumber?.slice(0, 3)}xxxxx{item?.partner?.phone[0].fullPhoneNumber?.slice(item?.partner?.phone[0].fullPhoneNumber?.length - 4, item?.partner?.phone[0].fullPhoneNumber?.length)}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                        <Image
                                            style={styles.arrowLongDown}
                                            source={require('../../../NewIcon/arrowLongDown.png')} />
                                        <TouchableOpacity
                                            onPress={() => {
                                                setDataShowModal({
                                                    show: true,
                                                    data: teammateParent
                                                })
                                            }}
                                            style={[styleElement.centerChild, styles.mine, {
                                                backgroundColor: BASE_COLOR,
                                                borderWidth: 0,
                                                height: _moderateScale(8 * 7),
                                            }]}>
                                            <Text style={{
                                                ...stylesFont.fontNolanBold,
                                                fontSize: _moderateScale(16),
                                                color: WHITE
                                            }}>
                                                {teammateParent?.partner?.name}
                                            </Text>
                                            <Text style={{
                                                ...stylesFont.fontNolan500,
                                                fontSize: _moderateScale(16),
                                                color: WHITE
                                            }}>
                                                {teammateParent?.partner?.phone[0].fullPhoneNumber?.slice(0, 3)}xxxxx{teammateParent?.partner?.phone[0].fullPhoneNumber?.slice(teammateParent?.partner?.phone[0].fullPhoneNumber?.length - 4, teammateParent?.partner?.phone[0].fullPhoneNumber?.length)}
                                            </Text>
                                        </TouchableOpacity>
                                        <Image
                                            style={styles.arrowLongDown}
                                            source={require('../../../NewIcon/arrowLongDown.png')} />

                                        <View style={[styleElement.centerChild, styles.mine]}>
                                            <Text style={{
                                                ...stylesFont.fontNolanBold,
                                                fontSize: _moderateScale(16),
                                                color: BASE_COLOR
                                            }}>
                                                {infoUserRedux?.name}
                                            </Text>
                                        </View>
                                    </>
                                    :
                                    <View style={[{ flex: 1 }, styleElement.centerChild]}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                                            Dữ liệu trống
                                        </Text>
                                    </View>
                            }
                        </View>
                        :
                        <View>
                            <Text>

                            </Text>
                        </View>

                }

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
});


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
    arrowLongDown: {
        width: _moderateScale(8 * 2),
        height: _moderateScale(8 * 10),
        resizeMode: 'stretch',
        alignSelf: 'center',
        opacity: 0.7
    },
    verticalLine: {
        height: _moderateScale(8 * 3),
        width: _moderateScale(2),
        backgroundColor: BASE_COLOR,
        alignSelf: 'center'
    },
    mine: {
        width: _moderateScale(8 * 24),
        height: _moderateScale(8 * 6),
        borderWidth: 2,
        borderRadius: _moderateScale(8),
        borderColor: SECOND_COLOR,
        alignSelf: 'center'
    },
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





}
)

export default Superior;