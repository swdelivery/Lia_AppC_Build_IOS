import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, RefreshControl } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode, parseFloatNumber } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import InputSearch from './Components/InputSearch';
import { navigation } from '../../../rootNavigation';
import { getListAllDataFood, addPartnerFoodToMenu, getListAllDataRecentFood } from '../../Redux/Action/LoseWeightAction'
import ModalBottomAddFoodToMenu from './Components/ModalBottomAddFoodToMenu';
import ModalPickCategoryFood from './Components/ModalPickCategoryFood';
import isEmpty from 'lodash/isEmpty';
import Collapsible from 'react-native-collapsible';
import { URL_ORIGINAL } from '../../Constant/Url';
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'
import slugify from 'slugify';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';


const AddFood = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [currTabView, setCurrTabView] = useState('1')


    const [listAllDataFood, setListAllDataFood] = useState([])
    const [listAllDataRecentFood, setListAllDataRecentFood] = useState([])
    const [listAllDataMyFood, setListAllDataMyFood] = useState([])


    const [showModalAddFoodToMenu, setShowModalAddFoodToMenu] = useState({
        show: false,
        data: {}
    })

    const [showModalPickCategoryFood, setShowModalPickCategoryFood] = useState({
        show: false,
        data: []
    })

    const [currPageForGetAllFood, setCurrPageForGetAllFood] = useState(1)
    const [currPageForGetAllRecentFood, setCurrPageForGetAllRecentFood] = useState(1)
    const [currPageForGetAllMyFood, setCurrPageForGetAllMyFood] = useState(1)

    const [totalPageForGetAllFood, setTotalPageForGetAllFood] = useState(1)
    const [totalPageForGetAllRecentFood, setTotalPageForGetAllRecentFood] = useState(1)
    const [totalPageForGetAllMyFood, setTotalPageForGetAllMyFood] = useState(1)

    const [headerCollapsed, setHeaderCollapsed] = useState(false)

    const [regrexSearchName, setRegrexSearchName] = useState('')
    const [listFoodSearched, setListFoodSearched] = useState([])
    const [currPageForGetListFoodSearched, setCurrPageForGetListFoodSearched] = useState(1)
    const [totalPageForGetListFoodSearched, setTotalPageForGetListFoodSearched] = useState(1)

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        _getAllDataFood()
        _getAllDataRecentFood()
        _getAllDataMyFood()
    }, [])

    const _getAllDataFood = async () => {
        let result = await getListAllDataFood({
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListAllDataFood(result?.data?.data)
        setCurrPageForGetAllFood(result?.data?.meta?.page)
        setTotalPageForGetAllFood(result?.data?.meta?.totalPage)
    }

    const _getAllDataRecentFood = async () => {
        let result = await getListAllDataRecentFood({
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListAllDataRecentFood(result?.data?.data)
        setCurrPageForGetAllRecentFood(result?.data?.meta?.page)
        setTotalPageForGetAllRecentFood(result?.data?.meta?.totalPage)
    }

    const _getAllDataMyFood = async () => {
        let result = await getListAllDataFood({
            condition: {
                partnerId: {
                    equal: infoUserRedux?._id
                }
            },
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListAllDataMyFood(result?.data?.data)
        setCurrPageForGetAllMyFood(result?.data?.meta?.page)
        setTotalPageForGetAllMyFood(result?.data?.meta?.totalPage)
    }

    const _handleGetMoreAllFood = async () => {
        let tempCodition = {};
        if (!isEmpty(showModalPickCategoryFood?.data)) {
            tempCodition['codeGroup'] = {
                in: showModalPickCategoryFood?.data?.map(item => item?.code)
            }
        }
        let result = await getListAllDataFood({
            condition: tempCodition,
            limit: 20,
            page: currPageForGetAllFood + 1
        });
        if (result?.isAxiosError) return
        setListAllDataFood([...listAllDataFood, ...result?.data?.data])
        setCurrPageForGetAllFood(result?.data?.meta?.page)
        setTotalPageForGetAllFood(result?.data?.meta?.totalPage)
    }
    const _handleGetMoreAllRecentFood = async () => {
        let tempCodition = {};
        if (!isEmpty(showModalPickCategoryFood?.data)) {
            tempCodition['codeGroup'] = {
                in: showModalPickCategoryFood?.data?.map(item => item?.code)
            }
        }
        let result = await getListAllDataRecentFood({
            condition: tempCodition,
            limit: 20,
            page: currPageForGetAllRecentFood + 1
        });
        if (result?.isAxiosError) return
        setListAllDataRecentFood([...listAllDataRecentFood, ...result?.data?.data])
        setCurrPageForGetAllRecentFood(result?.data?.meta?.page)
        setTotalPageForGetAllRecentFood(result?.data?.meta?.totalPage)
    }
    const _handleGetMoreAllMyFood = async () => {
        let tempCodition = {};
        if (!isEmpty(showModalPickCategoryFood?.data)) {
            tempCodition['codeGroup'] = {
                in: showModalPickCategoryFood?.data?.map(item => item?.code)
            }
        }
        tempCodition['partnerId'] = {
            equal: infoUserRedux?._id
        }
        let result = await getListAllDataFood({
            condition: tempCodition,
            limit: 20,
            page: currPageForGetAllRecentFood + 1
        });
        if (result?.isAxiosError) return
        setListAllDataMyFood([...listAllDataMyFood, ...result?.data?.data])
        setCurrPageForGetAllMyFood(result?.data?.meta?.page)
        setTotalPageForGetAllMyFood(result?.data?.meta?.totalPage)
    }
    const _handleGetMoreLisFoodSearched = async () => {
        let tempCodition = {};
        tempCodition['name'] = {
            regex: regrexSearchName,
            options: 'i'
        }
        let result = await getListAllDataFood({
            condition: tempCodition,
            limit: 20,
            page: currPageForGetListFoodSearched + 1
        });
        if (result?.isAxiosError) return
        setListFoodSearched([...listFoodSearched, ...result?.data?.data])
        setCurrPageForGetListFoodSearched(result?.data?.meta?.page)
        setTotalPageForGetListFoodSearched(result?.data?.meta?.totalPage)
    }

    const _confirmAdd = async (data) => {

        let result = await addPartnerFoodToMenu({
            "foodCode": data?.foodCode,
            "session": props?.route?.params?.session,
            "size": data?.size
        })
        if (result?.isAxiosError) return

        store.dispatch({
            type: ActionType.ADD_MORE_DATA_MENU_FOOD,
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
        setShowModalAddFoodToMenu({
            show: false,
            data: {}
        })

    }

    const _confirmPickCategory = async (data) => {
        console.log({ data });
        setShowModalPickCategoryFood(old => {
            return {
                show: false,
                data: data
            }
        })

        if (isEmpty(data)) {
            return _getAllDataFood()
        }

        let result = await getListAllDataFood({
            condition: {
                codeGroup: {
                    in: data?.map(item => item?.code)
                }
            },
            limit: 20,
            page: 1
        });
        if (result?.isAxiosError) return
        setListAllDataFood(result?.data?.data)
        setCurrPageForGetAllFood(result?.data?.meta?.page)
        setTotalPageForGetAllFood(result?.data?.meta?.totalPage)

        let result2 = await getListAllDataRecentFood({
            condition: {
                codeGroup: {
                    in: data?.map(item => item?.code)
                }
            },
            limit: 20,
            page: 1
        });
        if (result2?.isAxiosError) return
        setListAllDataRecentFood(result2?.data?.data)
        setCurrPageForGetAllRecentFood(result2?.data?.meta?.page)
        setTotalPageForGetAllRecentFood(result2?.data?.meta?.totalPage)

        let result3 = await getListAllDataFood({
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
        setListAllDataMyFood(result3?.data?.data)
        setCurrPageForGetAllMyFood(result3?.data?.meta?.page)
        setTotalPageForGetAllMyFood(result3?.data?.meta?.totalPage)
    }

    // const _handleSearching = (text) => {
    //     console.log({text});

    // }
    const _handleSearching = async (text) => {
        setRegrexSearchName(text)

        let result = await getListAllDataFood({
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
        setListFoodSearched(result?.data?.data)
        setCurrPageForGetListFoodSearched(result?.data?.meta?.page)
        setTotalPageForGetListFoodSearched(result?.data?.meta?.totalPage)
    }
    const _handleClearSearch = async () => {
        setRegrexSearchName("")
    }

    const _onRefresh = () => {
        setRefresh(true)

        setShowModalPickCategoryFood(old => {
            return {
                ...old,
                data: []
            }
        })
        _getAllDataFood()
        _getAllDataRecentFood()
        _getAllDataMyFood()

        setTimeout(() => {
            setRefresh(false)
        }, 500);
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'}  bgColor={WHITE}/>

            <Header addFood title={"Thực phẩm"} />

            <ModalPickCategoryFood
                hide={() => {
                    setShowModalPickCategoryFood(old => {
                        return {
                            ...old,
                            show: false,
                        }
                    })
                }}
                dataActive={showModalPickCategoryFood?.data}
                confirm={_confirmPickCategory}
                show={showModalPickCategoryFood?.show} />

            <ModalBottomAddFoodToMenu
                confirmAdd={_confirmAdd}
                data={showModalAddFoodToMenu?.data}
                hide={() => {
                    setShowModalAddFoodToMenu({
                        show: false,
                        data: {}
                    })
                }}
                show={showModalAddFoodToMenu?.show} />
            {/* <Collapsible collapsed={headerCollapsed}> */}
            <View style={{ marginTop: _moderateScale(8), paddingHorizontal: _moderateScale(8 * 2) }}>
                <InputSearch
                    clearSearch={_handleClearSearch}
                    value={regrexSearchName}
                    onChangeText={_handleSearching} />
            </View>
            {/* </Collapsible> */}

            {
                !_isEmpty(regrexSearchName) ?
                    <>
                        <ScrollView
                        >
                            {
                                _isEmpty(listFoodSearched) ?
                                    <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>
                                            Không tìm thấy dữ liệu
                                        </Text>
                                    </View>
                                    :
                                    <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                                        {
                                            listFoodSearched?.map((item, index) => {
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
                                                                    {item?.size} {item?.unit}
                                                                </Text>
                                                            </View>
                                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                                                {parseFloatNumber(item?.calo, 2)} kcal
                                                            </Text>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setShowModalAddFoodToMenu(old => {
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
                                            currPageForGetListFoodSearched !== totalPageForGetListFoodSearched ?
                                                <TouchableOpacity
                                                    style={{ marginTop: _moderateScale(8) }}
                                                    onPress={_handleGetMoreLisFoodSearched}
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
                                    setShowModalPickCategoryFood(old => {
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
                                !isEmpty(showModalPickCategoryFood?.data) ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowModalPickCategoryFood(old => {
                                                return {
                                                    ...old,
                                                    data: []
                                                }
                                            })
                                            _getAllDataFood()
                                            _getAllDataRecentFood()
                                            _getAllDataMyFood()
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
                                showModalPickCategoryFood?.data?.map((item, index) => {
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
                                            isEmpty(listAllDataFood) ?
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>Dữ liệu rỗng</Text>
                                                :
                                                <>
                                                    {
                                                        listAllDataFood?.map((item, index) => {
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
                                                                                {item?.size} {item?.unit}
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                                                            {parseFloatNumber(item?.calo, 2)} kcal
                                                            </Text>
                                                                        <TouchableOpacity
                                                                            onPress={() => {
                                                                                setShowModalAddFoodToMenu(old => {
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
                                                        currPageForGetAllFood !== totalPageForGetAllFood ?
                                                            <TouchableOpacity
                                                                hitSlop={styleElement.hitslopSm}
                                                                style={{ marginTop: _moderateScale(8) }}
                                                                onPress={_handleGetMoreAllFood}>
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
                                            isEmpty(listAllDataRecentFood) ?
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>Dữ liệu rỗng</Text>
                                                :
                                                <>
                                                    {
                                                        listAllDataRecentFood?.map((item, index) => {
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
                                                                                {item?.size} {item?.unit}
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                                                            {parseFloatNumber(item?.calo, 2)} kcal
                                                            </Text>
                                                                        <TouchableOpacity
                                                                            onPress={() => {
                                                                                setShowModalAddFoodToMenu(old => {
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
                                                        currPageForGetAllRecentFood !== totalPageForGetAllRecentFood ?
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
                                            isEmpty(listAllDataMyFood) ?
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>Dữ liệu rỗng</Text>
                                                :
                                                <>
                                                    {
                                                        listAllDataMyFood?.map((item, index) => {
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
                                                                                {item?.size} {item?.unit}
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13) }]}>
                                                                            {parseFloatNumber(item?.calo, 2)} kcal
                                                            </Text>
                                                                        <TouchableOpacity
                                                                            onPress={() => {
                                                                                setShowModalAddFoodToMenu(old => {
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
                                                        currPageForGetAllMyFood !== totalPageForGetAllMyFood ?
                                                            <TouchableOpacity
                                                                hitSlop={styleElement.hitslopSm}
                                                                style={{ marginTop: _moderateScale(8) }}
                                                                onPress={_handleGetMoreAllMyFood}>
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

export default AddFood;