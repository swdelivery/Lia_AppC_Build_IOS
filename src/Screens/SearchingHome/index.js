import React, { useRef, useEffect, useState, memo } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { _height, _moderateScale, _widthScale, _heightScale, _width } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_5, BASE_COLOR, BLACK_OPACITY_8, BG_GREY_OPACITY_9 } from '../../Constant/Color';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import ScreenKey from '../../Navigation/ScreenKey';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { navigation } from '../../../rootNavigation';
import { URL_ORIGINAL } from '../../Constant/Url';
import { getServiceGroupv2 } from '../../Redux/Action/ServiceGroup';
import { getEncyclopedia } from '../../Redux/Action/News';
import { getServicev2 } from '../../Redux/Action/Service';
import { getListBranchV2 } from '../../Redux/Action/BranchAction';
import { getAllDoctorv2 } from '../../Redux/Action/DoctorAction';
import { getAllProductv2 } from '../../Redux/Action/Product';
import HeaderSearch from './Components/HeaderSearch';
import ListService from './Components/ListService';
import ListBranch from './Components/ListBranch';
import ListProduct from './Components/ListProduct';
import ListDoctor from './Components/ListDoctor';
import ItemEncyclopedia from '../Home/Components/ItemEncyclopedia';


const index = memo((props) => {

    const RefScrollView = useRef(null)

    const [currOption, setCurrOption] = useState('DV')
    const [list5Service, setList5Service] = useState([])
    const [list5Branch, setList5Branch] = useState([])
    const [list5Doctor, setList5Doctor] = useState([])
    const [list5Product, setList5Product] = useState([])
    const [list5Bachkhoa, setList5Bachkhoa] = useState([])

    const [listServiceGrFinded, setListServiceGrFinded] = useState([])

    const [keySearch, setKeySearch] = useState('')


    const [onlayoutHeightHeaderMain, setOnlayoutHeightHeaderMain] = useState(0)

    const [isFirstLoad, setIsFirstLoad] = useState(false)

    useEffect(() => {
        setIsFirstLoad(true)

        if (props?.route?.params?.keySearch) {
            setKeySearch(props?.route?.params?.keySearch)
            _pressSearch(props?.route?.params?.keySearch)
        }

    }, [])

    // const _pressSearch = async (key) => {
    //     if (key?.length == 0) return
    //     let result = await getServiceGroupv2({
    //         "search": key
    //     })
    //     if(result?.isAxiosError)return
    //     setListServiceGrFinded(result?.data?.data)

    //     if (currOption == "DV") {
    //         let result = await getServicev2({
    //             "sort": {
    //                 orderNumber: -1
    //             },
    //             "page": 1,
    //             "search": key
    //         })
    //         if (result?.isAxiosError) return
    //         setList5Service(result?.data)
    //         setTimeout(() => {
    //             RefScrollView.current?.scrollTo({
    //                 y: onlayoutHeightHeaderMain,
    //                 animated: true,
    //             });
    //         }, 100);
    //         return
    //     }
    //     if (currOption == "PK") {
    //         let result = await getListBranchV2({
    //             sort: {
    //                 orderNumber: -1
    //             },
    //             "page": 1,
    //             "search": key
    //         })
    //         if (result?.isAxiosError) return
    //         setList5Branch(result?.data)
    //         setTimeout(() => {
    //             RefScrollView.current?.scrollTo({
    //                 y: onlayoutHeightHeaderMain,
    //                 animated: true,
    //             });
    //         }, 100);
    //         return
    //     }
    //     if (currOption == "BS") {
    //         let result = await getAllDoctorv2({
    //             sort: {
    //                 orderNumber: -1
    //             },
    //             "page": 1,
    //             "search": key
    //         })
    //         if (result?.isAxiosError) return
    //         setList5Doctor(result?.data)
    //         setTimeout(() => {
    //             RefScrollView.current?.scrollTo({
    //                 y: onlayoutHeightHeaderMain,
    //                 animated: true,
    //             });
    //         }, 100);
    //         return
    //     }
    //     if (currOption == "SP") {
    //         let result = await getAllProductv2({
    //             "page": 1,
    //             "search": key
    //         })
    //         if (result?.isAxiosError) return
    //         setList5Product(result?.data)
    //         setTimeout(() => {
    //             RefScrollView.current?.scrollTo({
    //                 y: onlayoutHeightHeaderMain,
    //                 animated: true,
    //             });
    //         }, 100);
    //         return
    //     }
    // }

    const _pressSearch = async (key) => {
        if (key?.length == 0) return
        let result = await getServiceGroupv2({
            "search": key
        })
        if (result?.isAxiosError) return
        setListServiceGrFinded(result?.data?.data)

        if (true) {
            let result = await getServicev2({
                "sort": {
                    orderNumber: -1
                },
                "page": 1,
                "search": key
            })
            if (result?.isAxiosError) return
            setList5Service(result?.data)
        }
        if (true) {
            let result = await getListBranchV2({
                sort: {
                    orderNumber: -1
                },
                "page": 1,
                "search": key
            })
            if (result?.isAxiosError) return
            setList5Branch(result?.data)
        }
        if (true) {
            let result = await getAllDoctorv2({
                sort: {
                    orderNumber: -1
                },
                "page": 1,
                "search": key
            })
            if (result?.isAxiosError) return
            setList5Doctor(result?.data)
        }
        if (true) {
            let result = await getAllProductv2({
                "page": 1,
                "search": key
            })
            if (result?.isAxiosError) return
            setList5Product(result?.data)
        }
        if (true) {
            let result = await getEncyclopedia({
                "page": 1,
                "search": key
            })
            if (result?.isAxiosError) return
            setList5Bachkhoa(result?.data)
        }
        setTimeout(() => {
            RefScrollView.current?.scrollTo({
                y: onlayoutHeightHeaderMain,
                animated: true,
            });
        }, 100);
    }


    useEffect(() => {
        if (currOption && isFirstLoad && keySearch?.length > 0) {
            _getDataByOption(currOption)
        }
    }, [currOption])

    const _getDataByOption = async (currOption) => {
        if (currOption == "DV") {
            let result = await getServicev2({
                sort: {
                    orderNumber: -1
                },
                "page": 1,
                "search": keySearch
            })
            if (result?.isAxiosError) return
            setList5Service(result?.data)
            setTimeout(() => {
                RefScrollView.current?.scrollTo({
                    y: onlayoutHeightHeaderMain,
                    animated: true,
                });
            }, 100);
            return
        }
        if (currOption == "PK") {
            let result = await getListBranchV2({
                sort: {
                    orderNumber: -1
                },
                "page": 1,
                "search": keySearch
            })
            if (result?.isAxiosError) return
            setList5Branch(result?.data)
            setTimeout(() => {
                RefScrollView.current?.scrollTo({
                    y: onlayoutHeightHeaderMain,
                    animated: true,
                });
            }, 100);
            return
        }
        if (currOption == "BS") {
            let result = await getAllDoctorv2({
                sort: {
                    orderNumber: -1
                },
                "page": 1,
                "search": keySearch
            })
            if (result?.isAxiosError) return
            setList5Doctor(result?.data)
            setTimeout(() => {
                RefScrollView.current?.scrollTo({
                    y: onlayoutHeightHeaderMain,
                    animated: true,
                });
            }, 100);
            return
        }
        if (currOption == "SP") {
            let result = await getAllProductv2({
                "page": 1,
                "search": keySearch
            })
            if (result?.isAxiosError) return
            setList5Product(result?.data)
            setTimeout(() => {
                RefScrollView.current?.scrollTo({
                    y: onlayoutHeightHeaderMain,
                    animated: true,
                });
            }, 100);
            return
        }
    }

    const _saveKeySearch = (key) => {
        setKeySearch(key)
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={'white'} />
            <HeaderSearch keySearch={keySearch} saveKeySearch={_saveKeySearch} pressSearch={_pressSearch} />
            <ScrollView ref={RefScrollView} stickyHeaderIndices={[1]}>
                <View onLayout={(e) => {
                    setOnlayoutHeightHeaderMain(e?.nativeEvent?.layout?.height)
                }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: _moderateScale(8) }}>
                        {
                            listServiceGrFinded?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(ScreenKey.LIST_SERVICE, { currServiceGr: item })
                                        }}
                                        style={styles.categoryFinded}>
                                        <View style={[styles.categoryFinded__image, { overflow: 'hidden' }]}>
                                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }} />
                                        </View>
                                        <Text style={styles.categoryFinded__text} numberOfLines={1}>
                                            {item?.name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View >
                    <View>
                        <View style={[styleElement.rowAliCenter, {
                            width: '100%',
                            height: 50,
                            borderBottomWidth: 1,
                            borderColor: BG_GREY_OPACITY_5,
                            justifyContent: 'space-evenly',
                            backgroundColor: WHITE,
                            zIndex: 1
                        }]}>
                            <TouchableOpacity onPress={() => {
                                setCurrOption("DV")
                            }}>
                                <Text style={[styles.titleTab, currOption == "DV" && styles.titleTabActive]}>Dịch vụ</Text>
                                {
                                    currOption == "DV" ?
                                        <View style={styles.lineActive} />
                                        : <></>
                                }
                                {
                                    list5Service?.data?.length > 0 ?
                                        <View style={styles.dotCount}>
                                            <Text style={{ color: WHITE, ...stylesFont.fontNolanBold, fontSize: _moderateScale(12) }}>
                                                {list5Service?.data?.length}
                                            </Text>
                                        </View>
                                        : <></>
                                }

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setCurrOption("PK")
                            }}>
                                <Text style={[styles.titleTab, currOption == "PK" && styles.titleTabActive]}>Phòng khám</Text>
                                {
                                    currOption == "PK" ?
                                        <View style={styles.lineActive} />
                                        : <></>
                                }
                                {
                                    list5Branch?.data?.length > 0 ?
                                        <View style={styles.dotCount}>
                                            <Text style={{ color: WHITE, ...stylesFont.fontNolanBold, fontSize: _moderateScale(12) }}>
                                                {list5Branch?.data?.length}
                                            </Text>
                                        </View>
                                        : <></>
                                }

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setCurrOption("BS")
                            }}>
                                <Text style={[styles.titleTab, currOption == "BS" && styles.titleTabActive]}>Bác sĩ</Text>
                                {
                                    currOption == "BS" ?
                                        <View style={styles.lineActive} />
                                        : <></>
                                }
                                {
                                    list5Doctor?.data?.length > 0 ?
                                        <View style={styles.dotCount}>
                                            <Text style={{ color: WHITE, ...stylesFont.fontNolanBold, fontSize: _moderateScale(12) }}>
                                                {list5Doctor?.data?.length}
                                            </Text>
                                        </View>
                                        : <></>
                                }

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setCurrOption("SP")
                            }}>
                                <Text style={[styles.titleTab, currOption == "SP" && styles.titleTabActive]}>Sản phẩm</Text>
                                {
                                    currOption == "SP" ?
                                        <View style={styles.lineActive} />
                                        : <></>
                                }
                                {
                                    list5Product?.data?.length > 0 ?
                                        <View style={styles.dotCount}>
                                            <Text style={{ color: WHITE, ...stylesFont.fontNolanBold, fontSize: _moderateScale(12) }}>
                                                {list5Product?.data?.length}
                                            </Text>
                                        </View>
                                        : <></>
                                }

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setCurrOption("BK")
                            }}>
                                <Text style={[styles.titleTab, currOption == "BK" && styles.titleTabActive]}>Bách khoa</Text>
                                {
                                    currOption == "BK" ?
                                        <View style={styles.lineActive} />
                                        : <></>
                                }
                                {
                                    list5Bachkhoa?.data?.length > 0 ?
                                        <View style={styles.dotCount}>
                                            <Text style={{ color: WHITE, ...stylesFont.fontNolanBold, fontSize: _moderateScale(12) }}>
                                                {list5Bachkhoa?.data?.length}
                                            </Text>
                                        </View>
                                        : <></>
                                }

                            </TouchableOpacity>
                            {/* <TouchableOpacity>
                                <Text style={styles.titleTab}>Bách khoa</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>

                </View>

                {
                    currOption == "DV" ?
                        <>
                            <View style={{ height: _moderateScale(8) }} />
                            {
                                list5Service?.data?.length > 0 ?
                                    <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2) }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(ScreenKey.LIST_SERVICE)
                                            }}
                                            style={[styleElement.rowAliCenter]}>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                                Xem tất cả dịch vụ
                                                </Text>

                                            <Image style={sizeIcon.md} source={require('../../Icon/arrowRight_grey.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: _heightScale(100) }}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>Chưa có dữ liệu</Text>
                                    </View>
                            }
                            <ListService data={list5Service} />
                        </>
                        : <></>
                }
                {
                    currOption == "PK" ?
                        <>
                            <View style={{ height: _moderateScale(8) }} />
                            {
                                list5Branch?.data?.length > 0 ?
                                    <>
                                        <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2) }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate(ScreenKey.LIST_BRANCH)
                                                }}
                                                style={[styleElement.rowAliCenter]}>
                                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                                    Xem tất cả phòng khám
                                                </Text>

                                                <Image style={sizeIcon.md} source={require('../../Icon/arrowRight_grey.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: _heightScale(100) }}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>Chưa có dữ liệu</Text>
                                    </View>
                            }
                            <View style={{ height: _moderateScale(8) }} />
                            <ListBranch data={list5Branch} />
                        </>
                        : <></>
                }
                {
                    currOption == "BS" ?
                        <>
                            <View style={{ height: _moderateScale(8) }} />
                            {
                                list5Doctor?.data?.length > 0 ?
                                    <>
                                        <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2) }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Platform.OS == 'ios' ?
                                                    navigation.navigate(ScreenKey.LIST_DOCTOR_IOS)
                                                    :
                                                    navigation.navigate(ScreenKey.LIST_DOCTOR)
                                                }}
                                                style={[styleElement.rowAliCenter]}>
                                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                                    Xem tất cả bác sĩ
                                                </Text>

                                                <Image style={sizeIcon.md} source={require('../../Icon/arrowRight_grey.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: _heightScale(100) }}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>Chưa có dữ liệu</Text>
                                    </View>
                            }
                            <View style={{ height: _moderateScale(8) }} />
                            <ListDoctor data={list5Doctor} />
                        </>
                        : <></>
                }
                {
                    currOption == "SP" ?
                        <>
                            <View style={{ height: _moderateScale(8) }} />
                            {
                                list5Product?.data?.length > 0 ?
                                    <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2) }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(ScreenKey.LIST_PRODUCT)
                                            }}
                                            style={[styleElement.rowAliCenter]}>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                                Xem tất cả sản phẩm
                                                </Text>

                                            <Image style={sizeIcon.md} source={require('../../Icon/arrowRight_grey.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: _heightScale(100) }}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>Chưa có dữ liệu</Text>
                                    </View>
                            }
                            <ListProduct data={list5Product} />
                        </>
                        : <></>
                }
                {
                    currOption == "BK" ?
                        <>
                            <View style={{ height: _moderateScale(8) }} />
                            {
                                list5Bachkhoa?.data?.length > 0 ?
                                    <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2) }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(ScreenKey.LIST_ALL_ENCYCLOPEDIA)
                                            }}
                                            style={[styleElement.rowAliCenter]}>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                                Xem tất cả bách khoa
                                                </Text>

                                            <Image style={sizeIcon.md} source={require('../../Icon/arrowRight_grey.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: _heightScale(100) }}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>Chưa có dữ liệu</Text>
                                    </View>
                            }
                            <View style={{paddingHorizontal:_moderateScale(8*2)}}>
                                {
                                    list5Bachkhoa?.data?.map((item, index) => {
                                        return (
                                            <ItemEncyclopedia key={index} data={item} />
                                        )
                                    })
                                }
                            </View>
                        </>
                        : <></>
                }

            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    dotCount: {
        position: 'absolute',
        width: _moderateScale(8 * 2),
        height: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        backgroundColor: RED,
        top: -_moderateScale(8 * 1.2),
        right: -_moderateScale(8),
        ...styleElement.centerChild
    },
    categoryFinded__text: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14)
    },
    categoryFinded__image: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5 / 2),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5
    },
    categoryFinded: {
        width: (_width - _moderateScale(8 * 2)) / 5,
        height: (_width - _moderateScale(8 * 2)) / 5,
        ...styleElement.centerChild,
        paddingHorizontal: _moderateScale(4)
    },
    input: {
        borderWidth: 1,
        flex: 1,
        marginHorizontal: _moderateScale(8 * 2),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(4),
        borderColor: BG_GREY_OPACITY_9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8)
    },
    header: {
        height: _moderateScale(8 * 7),
        borderBottomWidth: 2,
        borderColor: BG_GREY_OPACITY_5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8)
    },
    lineActive: {
        height: _moderateScale(2),
        width: '100%',
        backgroundColor: BASE_COLOR,
        position: 'absolute',
        bottom: -_moderateScale(6),
        zIndex: 1
    },
    titleTab: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        letterSpacing: -1,
        opacity: 0.5
    },
    titleTabActive: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        letterSpacing: -1,
        color: "black",
        opacity: 1
    },
    inputHeader: {
        width: _moderateScale(8 * 25),
        backgroundColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 1.5),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarLia: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        bottom: -_moderateScale(8 * 2)
    },
})


export default index;
