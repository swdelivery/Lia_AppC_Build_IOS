import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, RefreshControl } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE } from '../../Constant/Color';
import { randomStringFixLengthCode, parseFloatNumber } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import InputSearch from '../LoseWeight/Components/InputSearch';
import { navigation } from '../../../rootNavigation';
import { getListAllDataActivity, addPartnerActivityToMenu, getListAllDataRecentActivity } from '../../Redux/Action/LoseWeightAction'
import ModalBottomAddActivityToMenu from './Components/ModalBottomAddActivityToMenu';
import ModalPickCategoryActivity from '../AddingActivity/Components/ModalPickCategoryActivity';
import isEmpty from 'lodash/isEmpty';
import Collapsible from 'react-native-collapsible';
import { URL_ORIGINAL } from '../../Constant/Url';
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'
import slugify from 'slugify';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';

const index = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [currTabView, setCurrTabView] = useState('1')


    const [listAllDataActivity, setListAllDataActivity] = useState([])
    const [listAllDataRecentActivity, setListAllDataRecentActivity] = useState([])
    const [listAllDataMyActivity, setListAllDataMyActivity] = useState([])


    const [showModalAddActivityToMenu, setShowModalAddActivityToMenu] = useState({
        show: false,
        data: {}
    })

    const [showModalPickCategoryActivity, setShowModalPickCategoryActivity] = useState({
        show: false,
        data: []
    })

    const [currPageForGetAllActivity, setCurrPageForGetAllActivity] = useState(1)
    const [currPageForGetAllRecentActivity, setCurrPageForGetAllRecentActivity] = useState(1)
    const [currPageForGetAllMyActivity, setCurrPageForGetAllMyActivity] = useState(1)

    const [totalPageForGetAllActivity, setTotalPageForGetAllActivity] = useState(1)
    const [totalPageForGetAllRecentActivity, setTotalPageForGetAllRecentActivity] = useState(1)
    const [totalPageForGetAllMyActivity, setTotalPageForGetAllMyActivity] = useState(1)

    const [headerCollapsed, setHeaderCollapsed] = useState(false)

    const [regrexSearchName, setRegrexSearchName] = useState('')
    const [listActivitySearched, setListActivitySearched] = useState([])
    const [currPageForGetListActivitySearched, setCurrPageForGetListActivitySearched] = useState(1)
    const [totalPageForGetListActivitySearched, setTotalPageForGetListActivitySearched] = useState(1)

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        _getAllDataActivity()
        _getAllDataRecentActivity()
        _getAllDataMyActivity()
    }, [])

    const _getAllDataActivity = async () => {
        let result = await getListAllDataActivity({
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListAllDataActivity(result?.data?.data)
        setCurrPageForGetAllActivity(result?.data?.meta?.page)
        setTotalPageForGetAllActivity(result?.data?.meta?.totalPage)
    }

    const _getAllDataRecentActivity = async () => {
        let result = await getListAllDataRecentActivity({
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListAllDataRecentActivity(result?.data?.data)
        setCurrPageForGetAllRecentActivity(result?.data?.meta?.page)
        setTotalPageForGetAllRecentActivity(result?.data?.meta?.totalPage)
    }

    const _getAllDataMyActivity = async () => {
        let result = await getListAllDataActivity({
            condition: {
                partnerId: {
                    equal: infoUserRedux?._id
                }
            },
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListAllDataMyActivity(result?.data?.data)
        setCurrPageForGetAllMyActivity(result?.data?.meta?.page)
        setTotalPageForGetAllMyActivity(result?.data?.meta?.totalPage)
    }

    const _handleGetMoreAllActivity = async () => {
        let tempCodition = {};
        if (!isEmpty(showModalPickCategoryActivity?.data)) {
            tempCodition['codeGroup'] = {
                in: showModalPickCategoryActivity?.data?.map(item => item?.code)
            }
        }
        let result = await getListAllDataActivity({
            condition: tempCodition,
            limit: 20,
            page: currPageForGetAllActivity + 1
        });
        if (result?.isAxiosError) return
        setListAllDataActivity([...listAllDataActivity, ...result?.data?.data])
        setCurrPageForGetAllActivity(result?.data?.meta?.page)
        setTotalPageForGetAllActivity(result?.data?.meta?.totalPage)
    }
    const _handleGetMoreAllRecentFood = async () => {
        let tempCodition = {};
        if (!isEmpty(showModalPickCategoryActivity?.data)) {
            tempCodition['codeGroup'] = {
                in: showModalPickCategoryActivity?.data?.map(item => item?.code)
            }
        }
        let result = await getListAllDataRecentActivity({
            condition: tempCodition,
            limit: 20,
            page: currPageForGetAllRecentActivity + 1
        });
        if (result?.isAxiosError) return
        setListAllDataRecentActivity([...listAllDataRecentActivity, ...result?.data?.data])
        setCurrPageForGetAllRecentActivity(result?.data?.meta?.page)
        setTotalPageForGetAllRecentActivity(result?.data?.meta?.totalPage)
    }
    const _handleGetMoreAllMyActivity = async () => {
        let tempCodition = {};
        if (!isEmpty(showModalPickCategoryActivity?.data)) {
            tempCodition['codeGroup'] = {
                in: showModalPickCategoryActivity?.data?.map(item => item?.code)
            }
        }
        tempCodition['partnerId'] = {
            equal: infoUserRedux?._id
        }
        let result = await getListAllDataActivity({
            condition: tempCodition,
            limit: 20,
            page: currPageForGetAllRecentActivity + 1
        });
        if (result?.isAxiosError) return
        setListAllDataMyActivity([...listAllDataMyActivity, ...result?.data?.data])
        setCurrPageForGetAllMyActivity(result?.data?.meta?.page)
        setTotalPageForGetAllMyActivity(result?.data?.meta?.totalPage)
    }
    const _handleGetMoreListActivitySearched = async () => {
        let tempCodition = {};
        tempCodition['name'] = {
            regex: regrexSearchName,
            options: 'i'
        }
        let result = await getListAllDataActivity({
            condition: tempCodition,
            limit: 20,
            page: currPageForGetListActivitySearched + 1
        });
        if (result?.isAxiosError) return
        setListActivitySearched([...listActivitySearched, ...result?.data?.data])
        setCurrPageForGetListActivitySearched(result?.data?.meta?.page)
        setTotalPageForGetListActivitySearched(result?.data?.meta?.totalPage)
    }

    const _confirmAdd = async (data) => {
        console.log({ data });


        let result = await addPartnerActivityToMenu({
            "activityCode": data?.activityCode,
            "minutes": data?.minutes
        })
        if (result?.isAxiosError) return

        store.dispatch({
            type: ActionType.ADD_MORE_DATA_MENU_ACTIVITY,
            payload: {
                data: result?.data?.data?.data
            }
        })
        store.dispatch({
            type: ActionType.UPDATE_DATA_TRACKING_WEIGHT,
            payload: {
                data: result?.data?.data?.tracking
            }
        })
        setShowModalAddActivityToMenu({
            show: false,
            data: {}
        })

    }

    const _confirmPickCategory = async (data) => {
        console.log({ data });
        setShowModalPickCategoryActivity(old => {
            return {
                show: false,
                data: data
            }
        })

        if (isEmpty(data)) {
            return _getAllDataActivity()
        }

        let result = await getListAllDataActivity({
            condition: {
                codeGroup: {
                    in: data?.map(item => item?.code)
                }
            },
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListAllDataActivity(result?.data?.data)
        setCurrPageForGetAllActivity(result?.data?.meta?.page)
        setTotalPageForGetAllActivity(result?.data?.meta?.totalPage)

        let result2 = await getListAllDataRecentActivity({
            condition: {
                codeGroup: {
                    in: data?.map(item => item?.code)
                }
            },
            limit: 20,
            page: 1
        });
        if (result2?.isAxiosError) return
        setListAllDataRecentActivity(result2?.data?.data)
        setCurrPageForGetAllRecentActivity(result2?.data?.meta?.page)
        setTotalPageForGetAllRecentActivity(result2?.data?.meta?.totalPage)

        let result3 = await getListAllDataActivity({
            condition: {
                codeGroup: {
                    in: data?.map(item => item?.code)
                },
                partnerId: {
                    equal: infoUserRedux?._id
                }
            },
            limit: 20,
            page: 1
        });
        if (result3?.isAxiosError) return
        setListAllDataMyActivity(result3?.data?.data)
        setCurrPageForGetAllMyActivity(result3?.data?.meta?.page)
        setTotalPageForGetAllMyActivity(result3?.data?.meta?.totalPage)
    }

    // const _handleSearching = (text) => {
    //     console.log({text});

    // }
    const _handleSearching = async (text) => {
        console.log({ text });
        setRegrexSearchName(text)

        let result = await getListAllDataActivity({
            condition: {
                slug: {
                    regex: slugify(text, {
                        locale: 'vi',
                        replacement: '-',
                        lower: true,
                        trim: true
                    }),
                    options: 'i'
                }
            },
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListActivitySearched(result?.data?.data)
        setCurrPageForGetListActivitySearched(result?.data?.meta?.page)
        setTotalPageForGetListActivitySearched(result?.data?.meta?.totalPage)
    }
    const _handleClearSearch = async () => {
        setRegrexSearchName("")
    }

    const _onRefresh = () => {
        setRefresh(true)

        setShowModalPickCategoryActivity(old => {
            return {
                ...old,
                data: []
            }
        })
        _getAllDataActivity()
        _getAllDataRecentActivity()
        _getAllDataMyActivity()

        setTimeout(() => {
            setRefresh(false)
        }, 500);
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <Header addActivity title={"Hoạt động"} />

            <ModalPickCategoryActivity
                hide={() => {
                    setShowModalPickCategoryActivity(old => {
                        return {
                            ...old,
                            show: false,
                        }
                    })
                }}
                dataActive={showModalPickCategoryActivity?.data}
                confirm={_confirmPickCategory}
                show={showModalPickCategoryActivity?.show} />

            <ModalBottomAddActivityToMenu
                confirmAdd={_confirmAdd}
                data={showModalAddActivityToMenu?.data}
                hide={() => {
                    setShowModalAddActivityToMenu({
                        show: false,
                        data: {}
                    })
                }}
                show={showModalAddActivityToMenu?.show} />
            <View style={{ marginTop: _moderateScale(8), paddingHorizontal: _moderateScale(8 * 2) }}>
                <InputSearch
                    clearSearch={_handleClearSearch}
                    value={regrexSearchName}
                    onChangeText={_handleSearching} />
            </View>

            {
                !_isEmpty(regrexSearchName) ?
                    <>
                        <ScrollView
                        >
                            {
                                _isEmpty(listActivitySearched) ?
                                    <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>
                                            Không tìm thấy dữ liệu
                                        </Text>
                                    </View>
                                    :
                                    <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                                        {
                                            listActivitySearched?.map((item, index) => {
                                                return (
                                                    <View key={item?._id} style={{ marginTop: _moderateScale(8) }}>
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate(ScreenKey.DETAIL_FOOD, { data: item, session: props?.route?.params?.session })}
                                                            style={[styleElement.rowAliCenter]}>
                                                            <Image
                                                                style={styles.avatarFood}
                                                                source={{ uri: item?.representationFileArr?.length > 0 ? `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` : '' }} />
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                                                    {item?.name}
                                                                </Text>
                                                                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: BLACK_OPACITY_8 }]}>
                                                                    {item?.minutes} phút
                                                                </Text>
                                                            </View>
                                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                                                {parseFloatNumber(item?.calo, 2)} kcal
                                                            </Text>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setShowModalAddActivityToMenu(old => {
                                                                        return {
                                                                            ...old,
                                                                            show: true,
                                                                            data: item
                                                                        }
                                                                    })
                                                                }}
                                                                hitSlop={styleElement.hitslopSm} style={{ marginLeft: _moderateScale(8 * 2) }}>
                                                                <Image style={[sizeIcon.sm]} source={require('../../Icon/plus_blue.png')} />
                                                            </TouchableOpacity>
                                                        </TouchableOpacity>
                                                        <View style={{ width: "100%", marginTop: _moderateScale(8), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_2 }} />
                                                    </View>
                                                )
                                            })
                                        }
                                        {
                                            currPageForGetListActivitySearched !== totalPageForGetListActivitySearched ?
                                                <TouchableOpacity
                                                    style={{ marginTop: _moderateScale(8) }}
                                                    onPress={_handleGetMoreListActivitySearched}
                                                >
                                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>Xem thêm</Text>
                                                </TouchableOpacity>
                                                :
                                                <></>
                                        }
                                    </View>
                            }
                            <View style={{ height: 100 }} />
                        </ScrollView>
                    </>
                    :
                    <>
                        <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }]}>
                                Danh mục
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModalPickCategoryActivity(old => {
                                        return {
                                            ...old,
                                            show: true,
                                        }
                                    })
                                }}
                                hitSlop={styleElement.hitslopSm}
                                style={{
                                    marginLeft: _moderateScale(8),
                                    top: _moderateScale(2)
                                }}>
                                <Image style={[sizeIcon.sm]} source={require('../../Icon/whitePlus2.png')} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 16, marginTop: 8 }}>
                            {
                                !isEmpty(showModalPickCategoryActivity?.data) ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowModalPickCategoryActivity(old => {
                                                return {
                                                    ...old,
                                                    data: []
                                                }
                                            })
                                            _getAllDataActivity()
                                            _getAllDataRecentActivity()
                                            _getAllDataMyActivity()
                                        }}
                                        style={[{
                                            paddingHorizontal: _moderateScale(8 * 2),
                                            marginRight: _moderateScale(8),
                                            paddingVertical: _moderateScale(4),
                                            backgroundColor: BG_GREY_OPACITY_5,
                                            marginBottom: _moderateScale(8),
                                            borderRadius: _moderateScale(8)
                                        }]}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: 12, color: BLACK_OPACITY_8, bottom: _moderateScale(1) }]}>Tất cả</Text>
                                    </TouchableOpacity>
                                    :
                                    <View style={[{
                                        paddingHorizontal: _moderateScale(8 * 2),
                                        marginRight: _moderateScale(8),
                                        paddingVertical: _moderateScale(4),
                                        backgroundColor: BLUE_FB,
                                        marginBottom: _moderateScale(8),
                                        borderRadius: _moderateScale(8)
                                    }]}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: 12, color: "white", bottom: _moderateScale(1) }]}>Tất cả</Text>
                                    </View>
                            }

                            {
                                showModalPickCategoryActivity?.data?.map((item, index) => {
                                    return (
                                        <View key={index} style={{
                                            paddingHorizontal: _moderateScale(8 * 2),
                                            marginRight: _moderateScale(8),
                                            paddingVertical: _moderateScale(4),
                                            backgroundColor: BLUE_FB,
                                            marginBottom: _moderateScale(8),
                                            borderRadius: _moderateScale(8)
                                        }}>
                                            <Text style={[stylesFont.fontNolan500, { fontSize: 12, color: "white", bottom: _moderateScale(1) }]}>
                                                {item?.name}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={[styleElement.rowAliCenter, styles.tabview]}>
                            <TouchableOpacity
                                onPress={() => setCurrTabView('1')}
                                style={[styles.tabview__btn, currTabView == '1' && { backgroundColor: WHITE }]}>
                                <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '1' && [{ color: BTN_PRICE }, stylesFont.fontNolanBold]]}>Danh sách</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setCurrTabView('2')}
                                style={[styles.tabview__btn, currTabView == '2' && { backgroundColor: WHITE }]}>
                                <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '2' && [{ color: BTN_PRICE }, stylesFont.fontNolanBold]]}>Gần đây</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setCurrTabView('3')}
                                style={[styles.tabview__btn, currTabView == '3' && { backgroundColor: WHITE }]}>
                                <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '3' && [{ color: BTN_PRICE }, stylesFont.fontNolanBold]]}>Của tôi</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refresh}
                                    onRefresh={_onRefresh}
                                />
                            }
                            onMomentumScrollBegin={() => {
                                setHeaderCollapsed(true)
                            }}
                            onMomentumScrollEnd={() => {
                                setHeaderCollapsed(false)
                            }}
                        >

                            {
                                currTabView == '1' ?
                                    <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>

                                        {
                                            isEmpty(listAllDataActivity) ?
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>Dữ liệu rỗng</Text>
                                                :
                                                <>
                                                    {
                                                        listAllDataActivity?.map((item, index) => {
                                                            return (
                                                                <View key={item?._id} style={{ marginTop: _moderateScale(8) }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => navigation.navigate(ScreenKey.DETAIL_ACTIVITY, { data: item })}
                                                                        style={[styleElement.rowAliCenter]}>
                                                                        <Image
                                                                            style={styles.avatarFood}
                                                                            source={{ uri: item?.representationFileArr?.length > 0 ? `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` : '' }} />
                                                                        <View style={{ flex: 1 }}>
                                                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                                                                {item?.name}
                                                                            </Text>
                                                                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: BLACK_OPACITY_8 }]}>
                                                                                {item?.minutes} phút
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                                                            {parseFloatNumber(item?.calo, 2)} kcal
                                                                        </Text>
                                                                        <TouchableOpacity
                                                                            onPress={() => {
                                                                                setShowModalAddActivityToMenu(old => {
                                                                                    return {
                                                                                        ...old,
                                                                                        show: true,
                                                                                        data: item
                                                                                    }
                                                                                })
                                                                            }}
                                                                            hitSlop={styleElement.hitslopSm} style={{ marginLeft: _moderateScale(8 * 2) }}>
                                                                            <Image style={[sizeIcon.sm]} source={require('../../Icon/plus_blue.png')} />
                                                                        </TouchableOpacity>
                                                                    </TouchableOpacity>
                                                                    <View style={{ width: "100%", marginTop: _moderateScale(8), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_2 }} />
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        currPageForGetAllActivity !== totalPageForGetAllActivity ?
                                                            <TouchableOpacity
                                                                hitSlop={styleElement.hitslopSm}
                                                                style={{ marginTop: _moderateScale(8) }}
                                                                onPress={_handleGetMoreAllActivity}>
                                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>Xem thêm</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <></>
                                                    }
                                                </>

                                        }

                                    </View>
                                    : <></>
                            }

                            {
                                currTabView == '2' ?
                                    <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>

                                        {
                                            isEmpty(listAllDataRecentActivity) ?
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>Dữ liệu rỗng</Text>
                                                :
                                                <>
                                                    {
                                                        listAllDataRecentActivity?.map((item, index) => {
                                                            return (
                                                                <View key={item?._id} style={{ marginTop: _moderateScale(8) }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => navigation.navigate(ScreenKey.DETAIL_ACTIVITY, { data: item })}
                                                                        style={[styleElement.rowAliCenter]}>
                                                                        <Image
                                                                            style={styles.avatarFood}
                                                                            source={{ uri: item?.representationFileArr?.length > 0 ? `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` : '' }} />
                                                                        <View style={{ flex: 1 }}>
                                                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                                                                {item?.name}
                                                                            </Text>
                                                                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: BLACK_OPACITY_8 }]}>
                                                                                {item?.minutes} phút
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                                                            {parseFloatNumber(item?.calo, 2)} kcal
                                                            </Text>
                                                                        <TouchableOpacity
                                                                            onPress={() => {
                                                                                setShowModalAddActivityToMenu(old => {
                                                                                    return {
                                                                                        ...old,
                                                                                        show: true,
                                                                                        data: item
                                                                                    }
                                                                                })
                                                                            }}
                                                                            hitSlop={styleElement.hitslopSm} style={{ marginLeft: _moderateScale(8 * 2) }}>
                                                                            <Image style={[sizeIcon.sm]} source={require('../../Icon/plus_blue.png')} />
                                                                        </TouchableOpacity>
                                                                    </TouchableOpacity>
                                                                    <View style={{ width: "100%", marginTop: _moderateScale(8), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_2 }} />
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        currPageForGetAllRecentActivity !== totalPageForGetAllRecentActivity ?
                                                            <TouchableOpacity
                                                                hitSlop={styleElement.hitslopSm}
                                                                style={{ marginTop: _moderateScale(8) }}
                                                                onPress={_handleGetMoreAllRecentFood}>
                                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>Xem thêm</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <></>
                                                    }
                                                </>

                                        }

                                    </View>
                                    : <></>
                            }

                            {
                                currTabView == '3' ?
                                    <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>

                                        {
                                            isEmpty(listAllDataMyActivity) ?
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>Dữ liệu rỗng</Text>
                                                :
                                                <>
                                                    {
                                                        listAllDataMyActivity?.map((item, index) => {
                                                            return (
                                                                <View key={item?._id} style={{ marginTop: _moderateScale(8) }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => navigation.navigate(ScreenKey.DETAIL_ACTIVITY, { data: item })}
                                                                        style={[styleElement.rowAliCenter]}>
                                                                        <Image
                                                                            style={styles.avatarFood}
                                                                            source={{ uri: item?.representationFileArr?.length > 0 ? `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` : '' }} />
                                                                        <View style={{ flex: 1 }}>
                                                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                                                                {item?.name}
                                                                            </Text>
                                                                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: BLACK_OPACITY_8 }]}>
                                                                                {item?.minutes} phút
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                                                            {parseFloatNumber(item?.calo, 2)} kcal
                                                            </Text>
                                                                        <TouchableOpacity
                                                                            onPress={() => {
                                                                                setShowModalAddActivityToMenu(old => {
                                                                                    return {
                                                                                        ...old,
                                                                                        show: true,
                                                                                        data: item
                                                                                    }
                                                                                })
                                                                            }}
                                                                            hitSlop={styleElement.hitslopSm} style={{ marginLeft: _moderateScale(8 * 2) }}>
                                                                            <Image style={[sizeIcon.sm]} source={require('../../Icon/plus_blue.png')} />
                                                                        </TouchableOpacity>
                                                                    </TouchableOpacity>
                                                                    <View style={{ width: "100%", marginTop: _moderateScale(8), height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_2 }} />
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        currPageForGetAllMyActivity !== totalPageForGetAllMyActivity ?
                                                            <TouchableOpacity
                                                                hitSlop={styleElement.hitslopSm}
                                                                style={{ marginTop: _moderateScale(8) }}
                                                                onPress={_handleGetMoreAllMyActivity}>
                                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>Xem thêm</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <></>
                                                    }
                                                </>

                                        }

                                    </View>
                                    : <></>
                            }

                            <View style={{ height: 100 }} />
                        </ScrollView>
                    </>
            }


        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,

    elevation: 5
}


const styles = StyleSheet.create({
    avatarFood: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(4),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5,
        marginRight: _moderateScale(8)
    },
    tabview__text: {
        fontSize: _moderateScale(13),
        color: GREY
    },
    tabview__btn: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(4)
    },
    tabview: {
        backgroundColor: BG_GREY_OPACITY_2,
        marginHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(4),
        padding: _moderateScale(8),
        justifyContent: 'space-between',
        marginTop: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})

export default index;