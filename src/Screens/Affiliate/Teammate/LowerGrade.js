import React, { useRef, useEffect, useState, memo } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ScrollView, Clipboard, RefreshControl } from 'react-native';
import { GREY, WHITE, BASE_COLOR, SECOND_COLOR, BTN_PRICE, RED, BLUE_FB, THIRD_COLOR, BLACK, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2, BLACK_OPACITY_7, GREY_FOR_TITLE, BG_GREY_OPACITY_7 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../../Constant/Icon';
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { navigation } from '../../../../rootNavigation';
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux';
import { getWallet, getCurrentCommission, getCollabStatistic, getTeammateLeader, getTeammateDescendant } from '../../../Redux/Action/InfoAction'
import { formatMonney, randomStringFixLengthCode } from '../../../Constant/Utils';
import ModalCashInWallet from '../Components/ModalCashInWallet';
import ModalInfoWallet from '../Components/ModalInfoWallet';
import ScreenKey from '../../../Navigation/ScreenKey'
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { TabBar, TabView } from 'react-native-tab-view';
import ModalFlashMsg from '../../../Components/ModalFlashMsg/ModalFlashMsg';
import LinearGradient from 'react-native-linear-gradient';
import { cloneDeep, includes, isEmpty } from 'lodash';
import Collapsible from 'react-native-collapsible';
import AmtdArrow from './Components/AmtdArrow';


const listColor = ["A7CEE3",'#1977F2', "#FA87D2", "#5CFA48", "#FAB83C", "#0CF2E7", "#FA5A5A", "#FA752F", "#A407F2", "#6BFA9B", "#8B75D7", "#A7CEE3", "#B2DF8A", "#FB9A99", "#FDBF6F", "#CAB2D6", "#FFFF99", "#A7CEE3"]

const LowGrade = memo((props) => {

    const [list, setList] = useState([])
    const [refresh, setRefresh] = useState(false)

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)
    const [isFirstLoaded, setIsFirstLoaded] = useState(false)

    useEffect(() => {
        _getList()
    }, [])

    const _getList = async () => {
        // ...

        let result = [
            {
                name: '1',
                childs: [
                    {
                        name: '1.1',
                        childs: [
                            {
                                name: '1.1.1',
                                childs: [
                                ]
                            },
                            {
                                name: '1.1.2',
                                childs: [
                                ]
                            }
                        ]
                    },
                    {
                        name: '1.2',
                        childs: [
                            {
                                name: '1.2.1',
                                childs: [
                                ]
                            },
                            {
                                name: '1.2.2',
                                childs: [
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '2',
                childs: [
                    {
                        name: '2.1',
                        childs: [
                            {
                                name: '2.1.1',
                                childs: [
                                ]
                            },
                            {
                                name: '2.1.2',
                                childs: [
                                ]
                            }
                        ]
                    },
                    {
                        name: '2.2',
                        childs: [
                            {
                                name: '2.2.1',
                                childs: [
                                ]
                            },
                            {
                                name: '2.2.2',
                                childs: [
                                ]
                            }
                        ]
                    }
                ]
            }
        ]

        let resultx = await getTeammateDescendant()
        if (resultx?.isAxiosError) return setIsFirstLoaded(true)
        resultx = resultx?.data?.data

        resultx?.forEach(key => {
            if (true) {
                // đệ quy tìm đến cấp con cuối cùng sau đó check nếu là thuộc keyConvertMustNumber thì ép sang number
                checkChildKey(resultx)
            }
            // if (key?.children?.length > 0) {
            //     // đệ quy tìm đến cấp con cuối cùng sau đó check nếu là thuộc keyConvertMustNumber thì ép sang number
            //     checkChildKey(resultx)
            // }
        })
        setList(resultx)
        setIsFirstLoaded(true)
    }

    const checkChildKey = (data, depth = 1) => {

        console.log({ data });

        data.forEach(otherKey => {
            if (typeof otherKey == 'object') {
                console.log({ otherKey });
                otherKey['isOpen'] = false;
                otherKey.depth = depth
            }
            if (otherKey?.children?.length > 0) {
                checkChildKey(otherKey?.children, depth + 1)
            }
        });
    }

    const _handleExpandMenu = (data) => {


        let tempList = cloneDeep(list)

        tempList.forEach(key => {
            if (key?.children?.length > 0) {
                // đệ quy tìm đến cấp con cuối cùng sau đó check nếu là thuộc keyConvertMustNumber thì ép sang number
                checkChildKeyUpdateValue(tempList, data?._id, !data?.isOpen)
            }
        })
        setList(tempList)
    }

    const checkChildKeyUpdateValue = (data, id, flag) => {
        data.forEach(otherKey => {
            if (typeof otherKey == 'object' && otherKey?._id == id) {
                otherKey['isOpen'] = flag;
            }
            if (otherKey?.children?.length > 0) {
                checkChildKeyUpdateValue(otherKey?.children, id, flag)
            }
        });
    }


    const renderMenu = (items) => {


        console.log({ itemsssss: items });

        return items?.map((item, index) => {

            if (!item?._id) return

            return (
                <View key={index} style={{ marginLeft: _moderateScale(8 * 2), marginTop: _moderateScale(0) }}>
                    {
                        item?.children?.length > 0 && item?.isOpen ?
                            <View style={{
                                width: _moderateScale(1),
                                height: '100%',
                                backgroundColor: BG_GREY_OPACITY_7,
                                position: 'absolute',
                                bottom: -_moderateScale(4),
                                left: _moderateScale(11)
                            }} />
                            :
                            <></>
                    }

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    _handleExpandMenu(item)
                                }}
                                style={{ flexDirection: 'row', alignItems: 'center', marginTop: _moderateScale(8), flex: 1 }}>
                                {/* {
                                    !isEmpty(item?.children) ?
                                        <>
                                            {
                                                includes(list_idExpand, item?._id) ?
                                                    <Image style={[sizeIcon.xs, { transform: [{ rotate: "90deg" }] }, { marginRight: 2 }]} source={require('../../Icon/arrowRight_grey.png')} />
                                                    :
                                                    <Image style={sizeIcon.xs} source={require('../../Icon/arrowRight_grey.png')} />
                                            }
                                        </>
                                        : <View style={sizeIcon.xs} />
                                } */}
                                {/* {
                                    item?.childs?.length > 0 ?
                                        <View style={[styleElement.centerChild, {
                                            width: _moderateScale(24),
                                            height: _moderateScale(24),
                                            backgroundColor: WHITE
                                        }]}>
                                            {
                                                item?.isOpen ?
                                                    <Image style={sizeIcon.md} source={require('../../../NewIcon/downBlack.png')} />
                                                    :
                                                    <Image style={sizeIcon.md} source={require('../../../NewIcon/rightBlack.png')} />

                                            }
                                        </View>
                                        :
                                        <View style={[styleElement.centerChild, {
                                            width: _moderateScale(24),
                                            height: _moderateScale(24),
                                        }]} />
                                } */}
                                {
                                    item?.children?.length > 0 ?
                                        <AmtdArrow isOpen={item?.isOpen} />
                                        :
                                        <View style={[styleElement.centerChild, {
                                            width: _moderateScale(24),
                                            height: _moderateScale(24),
                                        }]} />
                                }

                                {/* <View style={[styles.avatar, { marginHorizontal: _moderateScale(8) }]} /> */}
                                <Text numberOfLines={1} style={[stylesFont.fontNolan500, { flex: 1, marginLeft: _moderateScale(8), fontSize: _moderateScale(16) }]}>
                                    <Text style={[stylesFont.fontNolan500, { color: listColor[item?.depth], fontSize: _moderateScale(16) }]}>
                                        {`( Cấp ${item?.depth} )`}
                                    </Text>  {item?.partner?.name}
                                </Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* {includes(list_idExpand, item?._id) ? renderMenu(item?.children) : null} */}
                    <Collapsible collapsed={item?.isOpen ? false : true}>
                        {!isEmpty(item?.children) && item?.isOpen ? renderMenu(item?.children) : null}
                    </Collapsible>
                </View>

            );
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => {
                            _getList()
                            setRefresh(true)
                            setTimeout(() => {
                                setRefresh(false)

                            }, 500);
                        }}
                    />
                }
                contentContainerStyle={{ flexGrow: 1 }}
                scrollIndicatorInsets={{ right: 1 }}>
                <View style={{
                    margin: _moderateScale(8 * 2)
                }}>
                    <Text style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: BLACK,
                        fontStyle: 'italic'
                    }}>* Đây là đội nhóm CTV bên dưới được quản lý trực tiếp bởi bạn.</Text>
                </View>

                {
                    isFirstLoaded ?
                        <View style={{ flex: 1 }}>
                            {
                                list?.length > 0 ?
                                    <>
                                        {
                                            renderMenu(list)
                                        }
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

                {/* {
                    listColor?.map((item, index)=>{
                        return<View style={{
                            backgroundColor : listColor[index],
                            padding:20
                        }}>
                            <Text>{index} awd</Text>
                        </View>
                    })
                } */}

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
    avatar: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 2),
        borderWidth: 1
    },
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

export default LowGrade;