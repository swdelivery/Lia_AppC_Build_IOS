import _isEmpty from 'lodash/isEmpty';
import React, { memo, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { navigation } from '../../../../rootNavigation';
import CountStar from '../../../Components/CountStar/index';
import { BASE_COLOR, BG_GREY_OPACITY, BG_GREY_OPACITY_5, BG_GREY_OPACITY_9, BLACK_OPACITY_8, BLUE_FB, SECOND_COLOR, WHITE, GREY, PRICE_ORANGE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { getAllServiceByGroupId, getListServiceForBooking } from '../../../Redux/Action/BookingAction';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { formatMonney } from '../../../Constant/Utils';
import * as Color from '../../../Constant/Color';
import ScreenKey from '../../../Navigation/ScreenKey';
import ModalPickTopping from './ModalPickTopping';
import LinearGradient from 'react-native-linear-gradient';


const PickServiceToBooking = memo((props) => {

    const [listServiceForBooking, setListServiceForBooking] = useState([])
    const [listServiceAfterFilter, setListServiceAfterFilter] = useState([])
    const [listServiceHasChoice, setListServiceHasChoice] = useState([])

    const [currChoiceFolder, setCurrChoiceFolder] = useState(null)

    const [firstLoad, setFirstLoad] = useState(false)

    const [showModalPickTopping, setShowModalPickTopping] = useState({
        data: {},
        isShow: false
    })

    useEffect(() => {
        getListService()
        setListServiceHasChoice(props?.route?.params?.listServiceHasChoice)
    }, [])

    const getListService = async () => {
        let resultGetListServiceForBooking = await getListServiceForBooking({
            sort: {
                orderNumber: -1
            }
        });
        if (resultGetListServiceForBooking?.isAxiosError) return

        setListServiceForBooking(resultGetListServiceForBooking?.data?.data);

        let resultGetAllService = await getAllServiceByGroupId({
            limit: 1000,
            page: 1
        });
        if (resultGetAllService?.isAxiosError) return
        setListServiceAfterFilter(resultGetAllService?.data?.data)
        setCurrChoiceFolder('all')
        setFirstLoad(true)
    }


    const _handleChoiceFolder = async (item) => {

        if (item == 'all') {
            let resultGetAllService = await getAllServiceByGroupId({
                limit: 1000,
                page: 1
            });

            console.log({ resultGetAllService });

            if (resultGetAllService?.isAxiosError) return

            setListServiceAfterFilter(resultGetAllService?.data?.data)
        } else {
            let resultGetAllServiceFilter = await getAllServiceByGroupId({
                condition: {
                    codeGroup: {
                        in: [item?.code]
                    }
                },
                limit: 1000,
                page: 1
            });
            console.log({ resultGetAllServiceFilter });
            if (resultGetAllServiceFilter?.isAxiosError) return
            setListServiceAfterFilter(resultGetAllServiceFilter?.data?.data)
        }

        setCurrChoiceFolder(item)
    }

    const _handleChoiceFileService = (itemProp, listTopping) => {

        if (listServiceHasChoice?.find(item => item?._id == itemProp?._id)) {
            setListServiceHasChoice(olds => [...olds].filter(item => item?._id !== itemProp?._id))
        } else {
            setListServiceHasChoice(olds => [...olds, { ...itemProp, listTopping }])
        }

    }

    const _handleConfirm = () => {
        props?.route?.params?.setListServiceHasChoice(listServiceHasChoice)
        navigation.goBack()
        console.log({ listServiceHasChoice });
    }

    const _handleConfirmPickTopping = (currChoice, listTopping) => {
        console.log({ currChoice, listTopping });

        _handleChoiceFileService(currChoice, listTopping)
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <ModalPickTopping
                confirm={_handleConfirmPickTopping}
                data={showModalPickTopping?.data}
                show={showModalPickTopping?.isShow}
                hide={() => {
                    setShowModalPickTopping({
                        ...showModalPickTopping,
                        isShow: false
                    })
                }}
            />

            <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 1), paddingHorizontal: _moderateScale(8 * 2) }]}>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => navigation.goBack()}
                    style={{
                        padding: _moderateScale(6),
                        backgroundColor: BG_GREY_OPACITY,
                        borderRadius: _moderateScale(8 * 3),
                        marginTop: _moderateScale(8)
                    }}>
                    <Image
                        style={[sizeIcon.md]}
                        source={require('../../../Icon/cancel.png')} />
                </TouchableOpacity>

                <Text style={[stylesFont.fontNolanBold, { marginLeft: _moderateScale(8 * 2), fontSize: _moderateScale(18), color: BLACK_OPACITY_8 }]}>
                    Chọn dịch vụ
                </Text>

                <TouchableOpacity
                    disabled
                    style={{
                        padding: _moderateScale(6),
                        backgroundColor: BG_GREY_OPACITY,
                        borderRadius: _moderateScale(8 * 3),
                        marginTop: _moderateScale(8),
                        opacity: 0
                    }}>
                    <Image
                        style={[sizeIcon.md]}
                        source={require('../../../Icon/cancel.png')} />
                </TouchableOpacity>
            </View>

            {/* {
                !_isEmpty(listServiceHasChoice) ?
                    <View style={{ marginVertical: _moderateScale(8), flexDirection: 'row', flexWrap: 'wrap', paddingLeft: _moderateScale(8 * 2) }}>
                        {
                            listServiceHasChoice?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.btnInterestedCodeActive}
                                        onPress={() => _handleChoiceFileService(item)}>
                                        <Text style={[stylesFont.fontNolan500, styles.textActive, { fontSize: _moderateScale(14) }]}>
                                            {
                                                item?.name
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    :
                    <></>
            } */}

            {
                !_isEmpty(listServiceForBooking) ?
                    <View style={{ paddingBottom: _moderateScale(8) }}>
                        <ScrollView contentContainerStyle={{ paddingLeft: _moderateScale(8 * 3) }} style={{ marginTop: 8 * 2 }} horizontal showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity
                                onPress={() => _handleChoiceFolder('all')}
                                style={[styles.btnNotActive, currChoiceFolder == 'all' && styles.btnActive]}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BASE_COLOR }, currChoiceFolder == "all" && ({ ...stylesFont.fontNolanBold, color: WHITE })]}>
                                    Tất cả
                                </Text>
                            </TouchableOpacity>
                            {
                                !_isEmpty(listServiceForBooking) && listServiceForBooking?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => _handleChoiceFolder(item)}
                                            style={[styles.btnNotActive, currChoiceFolder?._id == item?._id && styles.btnActive]}>
                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BASE_COLOR }, currChoiceFolder?._id == item?._id && ({ ...stylesFont.fontNolanBold, color: WHITE })]}>
                                                {item?.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    : <></>
            }

            {
                !_isEmpty(listServiceAfterFilter) ?
                    <ScrollView contentContainerStyle={{ paddingTop: _moderateScale(8 * 2), flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: _moderateScale(8), justifyContent: 'space-evenly', paddingBottom: _moderateScale(8 * 5) }}>

                        {
                            listServiceAfterFilter?.map((item, index) => {
                                return (


                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: item?._id })
                                        }}
                                        // onPress={() => _handlePressDetail(item?._id)}
                                        style={[styles.btnService, shadow]}>
                                        <Image
                                            resizeMode={'cover'}
                                            style={[{ backgroundColor: BG_GREY_OPACITY_5, width: "100%", height: _moderateScale(8 * 20), borderRadius: _moderateScale(8 * 1) }]}
                                            imageStyle={{ borderWidth: 1 }}
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.representationFileArr.length > 0 ? item?.representationFileArr[0]?.link : ''}`,
                                            }} />

                                        <View style={{ flex: 1, paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 1) }}>
                                            {
                                                item?.price ?
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: PRICE_ORANGE }]}>
                                                            {formatMonney(item?.price)}
                                                        </Text>
                                                        <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                                    </View>
                                                    : <></>}

                                            <Text style={[stylesFont.fontNolan500, {
                                                fontSize: _moderateScale(14),
                                                color: BLACK_OPACITY_8,
                                                marginTop: _moderateScale(0)
                                            }]}>
                                                {item?.name}
                                            </Text>


                                            <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8), justifyContent: 'space-between' }]}>

                                                <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} small />

                                                <View style={[styleElement.rowAliCenter]}>
                                                    <Image style={sizeIcon.xxs} source={require('../../../NewIcon/people.png')} />
                                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                                        {item?.countPartner}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
                                                {
                                                    listServiceHasChoice?.find(itemFind => itemFind?._id == item?._id) ?
                                                        <TouchableOpacity
                                                            onPress={() => _handleChoiceFileService(item)}>
                                                            <View style={[styles.chooseService, styles.chooseServiceActive]}>
                                                                <Text style={[styles.txtBtn, styles.txtActive]}>+1</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setShowModalPickTopping({
                                                                    data: item,
                                                                    isShow: true
                                                                })
                                                                // _handleChoiceFileService(item)
                                                            }}>
                                                            <View style={[styles.chooseService]}>
                                                                <Text style={[styles.txtBtn]}>Thêm</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                }
                                            </View>

                                        </View>



                                    </TouchableOpacity>


                                )
                            })
                        }

                        {
                            listServiceAfterFilter?.length % 2 !== 0 ?
                                <View style={[styles.btnService, { backgroundColor: 'transparent' }]} />
                                : <></>
                        }

                    </ScrollView>
                    :
                    <>
                        {
                            firstLoad ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[stylesFont.fontNolan500, { color: BLACK_OPACITY_8, fontSize: _moderateScale(14) }]}>
                                        Không tìm thấy dữ liệu
                                    </Text>
                                </View>
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[stylesFont.fontNolan500, { color: BLACK_OPACITY_8, fontSize: _moderateScale(14) }]}>
                                        Đang tải dữ liệu...
                                    </Text>
                                </View>
                        }
                    </>

            }


            <TouchableOpacity
                onPress={_handleConfirm}
                style={styles.btnConfirm}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 0.6, 1]}
                    colors={[
                        BASE_COLOR,
                        '#8c104e',
                        '#db0505',
                    ]}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: _moderateScale(8),
                    }} />
                <Text style={[stylesFont.fontNolan500, { color: WHITE, fontSize: _moderateScale(16) }]}>
                    Xác nhận ({listServiceHasChoice?.length})
                </Text>

            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 2),
        height: _moderateScale(8 * 5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        backgroundColor: SECOND_COLOR,
        marginBottom: getBottomSpace() + _moderateScale(8),
        marginTop: _moderateScale(8)
    },
    btnActive: {
        backgroundColor: BASE_COLOR,
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 1),
        marginRight: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BASE_COLOR
    },
    btnNotActive: {
        // backgroundColor: BG_GREY_OPACITY_5,
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 1),
        marginRight: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BASE_COLOR
    },
    listService: {
        flexDirection: 'row',
        paddingBottom: _moderateScale(24),
        paddingHorizontal: _moderateScale(12),
    },
    imgService: {
        width: '100%',
        height: _moderateScale(100),
        borderTopLeftRadius: _moderateScale(8),
        borderTopRightRadius: _moderateScale(8)
    },
    itemService: {
        width: "100%",
        paddingBottom: _moderateScale(8 * 2),
        // height: _moderateScale(200),
        // marginRight: _moderateScale(8),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        // borderWidth: 0.5,
        // borderColor: BG_GREY_OPACITY_5,
        shadowColor: BG_GREY_OPACITY_9,
        backgroundColor: WHITE,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 3,
        marginBottom: _moderateScale(8 * 2)
    },
    chooseService: {
        flexDirection: 'row',
        width: _moderateScale(8 * 12),
        alignSelf: 'center',
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(16),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(20),
        justifyContent: 'center',
        borderColor: '#587CFC',
        borderWidth: _moderateScale(1)
    },
    chooseServiceActive: {

        borderColor: '#587CFC',
        borderWidth: _moderateScale(1),
        backgroundColor: '#587CFC',
    },
    rateService: {
        flexDirection: 'row',
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(16),

    },
    bottomService: {
        position: 'relative',
        width: '100%',
        flex: 1
    },
    priceService: {
        backgroundColor: SECOND_COLOR,
        alignItems: 'center',
        paddingVertical: _moderateScale(2),
        borderRadius: _moderateScale(4),
        position: 'absolute',
        top: _moderateScale(-8),
        right: _moderateScale(0),
        paddingHorizontal: _moderateScale(8 * 1.5)
    },
    nameService: {
        flexDirection: 'row',
        marginTop: _moderateScale(16),
        paddingHorizontal: _moderateScale(16),

    },
    textNotActive: {
        color: BASE_COLOR
    },

    textActive: {
        color: WHITE
    },
    txtPrice: {
        color: WHITE,
        fontSize: _moderateScale(14)
    },
    txtBtn: {
        color: '#587CFC'
    },
    txtActive: {
        color: WHITE,
    },
    btnInterestedCodeActive: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8),
        marginTop: _moderateScale(8),
        marginRight: _moderateScale(8),
        backgroundColor: SECOND_COLOR
    },
    btnInterestedCodeNotActive: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8),
        marginTop: _moderateScale(8),
        marginRight: _moderateScale(8),
        borderWidth: _moderateScale(0.5),
        borderColor: BASE_COLOR
    },
    txtName: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: BLACK_OPACITY_8
    },
    price: {
        paddingHorizontal: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(4),
        backgroundColor: Color.SECOND_COLOR,
        position: 'absolute',
        left: _moderateScale(8 * 2),
        height: _moderateScale(8 * 3.5),
        justifyContent: 'center',
        alignItems: 'center',
        top: -_moderateScale(8 * 3.5 / 2)
    },
    btnService: {
        width: _widthScale(8 * 20),
        // height:_heightScale(8*),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 1),
        marginTop: _moderateScale(8 * 2),
        // marginRight: _moderateScale(8 * 2),
        // borderWidth: 1,
        // borderColor: BG_GREY_OPACITY_5,
        backgroundColor: 'rgba(7,140,127,0.8)',
        backgroundColor: '#158C80',
        backgroundColor: 'white'
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}

export default PickServiceToBooking;