import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getListServiceForBooking, getAllServiceByGroupId } from '../../../Redux/Action/BookingAction'
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale } from '../../../Constant/Scale';
import _isEmpty from 'lodash/isEmpty'
import { BASE_COLOR, WHITE, SECOND_COLOR, GREEN, BG_GREY_OPACITY_5, BG_GREY_OPACITY_9, BG_GREY_OPACITY, BLUE_FB, BLACK_OPACITY_8, GREEN_SUCCESS } from '../../../Constant/Color';
import CountStar from '../../../Components/CountStar/index'
import { URL_ORIGINAL, URL_FOR_PARTNER,  URL_ORIGINAL } from '../../../Constant/Url';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { navigation } from '../../../../rootNavigation';
import { getBottomSpace } from 'react-native-iphone-x-helper';


const PickServiceToBooking = memo((props) => {

    const [listServiceForBooking, setListServiceForBooking] = useState([])
    const [listServiceAfterFilter, setListServiceAfterFilter] = useState([])
    const [listServiceHasChoice, setListServiceHasChoice] = useState([])

    const [currChoiceFolder, setCurrChoiceFolder] = useState(null)

    useEffect(() => {
        getListService()
        setListServiceHasChoice(props?.route?.params?.listServiceHasChoice)
    }, [])

    const getListService = async () => {
        let resultGetListServiceForBooking = await getListServiceForBooking();
        if (resultGetListServiceForBooking?.isAxiosError) return

        setListServiceForBooking(resultGetListServiceForBooking?.data?.data);

        let resultGetAllService = await getAllServiceByGroupId({
            limit: 1000,
            page: 1
        });
        if (resultGetAllService?.isAxiosError) return
        setListServiceAfterFilter(resultGetAllService?.data?.data)
        setCurrChoiceFolder('all')
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

    const _handleChoiceFileService = (itemProp) => {

        if (listServiceHasChoice?.find(item => item?._id == itemProp?._id)) {
            setListServiceHasChoice(olds => [...olds].filter(item => item?._id !== itemProp?._id))
        } else {
            setListServiceHasChoice(olds => [...olds, itemProp])
        }

    }

    const _handleConfirm = () => {
        props?.route?.params?.setListServiceHasChoice(listServiceHasChoice)
        navigation.goBack()
        console.log({listServiceHasChoice});

    }

    return (
        <View style={{ flex: 1 }}>




            <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }]}>
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

                <Text style={[stylesFont.fontNolan500, { marginLeft: _moderateScale(8 * 2), fontSize: _moderateScale(14) }]}>
                    CHỌN DỊCH VỤ
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
                        <ScrollView contentContainerStyle={{ paddingLeft: _moderateScale(8 * 2) }} style={{ marginTop: 8 * 2 }} horizontal showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity
                                onPress={() => _handleChoiceFolder('all')}
                                style={[styles.btnNotActive, currChoiceFolder == 'all' && styles.btnActive]}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }, currChoiceFolder == "all" && ({ color: WHITE })]}>
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
                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }, currChoiceFolder?._id == item?._id && ({ color: WHITE })]}>
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
                    <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}
                        {
                            listServiceAfterFilter?.map((item, index) => {


                                return (

                                    <View style={[styles.itemService, index % 2 == 0 && { marginRight: _moderateScale(8) }]}>
                                        <Image
                                            style={[styles.imgService, { backgroundColor: BG_GREY_OPACITY_5 }]}
                                            resizeMode="cover"
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                            }} />
                                        <View style={[styles.bottomService]}>
                                            <View style={[styles.priceService]}>
                                                <Text style={[styles.txtPrice]}>
                                                    {item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                </Text>
                                            </View>
                                            <View style={[styles.nameService]}>
                                                <Text numberOfLines={1} style={[styles.txtName]}>{item?.name}</Text>
                                            </View>
                                            <View style={[styles.rateService]}>
                                                <CountStar small />
                                            </View>
                                            {
                                                listServiceHasChoice?.find(itemFind => itemFind?._id == item?._id) ?
                                                    <TouchableOpacity
                                                        onPress={() => _handleChoiceFileService(item)}>
                                                        <View style={[styles.chooseService, styles.chooseServiceActive]}>
                                                            <Text style={[styles.txtBtn, styles.txtActive]}>Đã chọn</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity
                                                        onPress={() => _handleChoiceFileService(item)}>
                                                        <View style={[styles.chooseService]}>
                                                            <Text style={[styles.txtBtn]}>Chọn</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                            }

                                        </View>
                                    </View>
                                    // <TouchableOpacity
                                    //     key={index}
                                    //     onPress={() => _handleChoiceFileService(item)}
                                    //     style={[
                                    //         styles.btnInterestedCodeNotActive,
                                    //         listServiceHasChoice?.find(itemFind => itemFind?._id == item?._id) && styles.btnInterestedCodeActive]}>
                                    //     <Text style={[stylesFont.fontNolan500, listServiceHasChoice?.find(itemFind => itemFind?._id == item?._id) ? styles.textActive : styles.textNotActive, { fontSize: _moderateScale(14) }]}>
                                    //         {
                                    //             item?.name
                                    //         }
                                    //     </Text>
                                    // </TouchableOpacity>
                                )
                            })
                        }
                        {
                            listServiceAfterFilter?.length % 2 !== 0 ?
                                <View style={[{
                                    width: _moderateScale(180),
                                    height: _moderateScale(200),
                                    // marginRight: _moderateScale(8),
                                }, { backgroundColor: 'transparent' }]} />
                                : <></>
                        }

                        {/* </View> */}
                    </ScrollView>
                    :
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={[stylesFont.fontNolan500,{color:BLACK_OPACITY_8, fontSize:_moderateScale(14)}]}>
                            Không tìm thấy dữ liệu
                            </Text>
                    </View>
            }

            <TouchableOpacity
                onPress={_handleConfirm}
                style={styles.btnConfirm}>
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
        height: _moderateScale(8 * 6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        backgroundColor: SECOND_COLOR,
        marginBottom: getBottomSpace()
    },
    btnActive: {
        backgroundColor: BLUE_FB,
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 3),
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(8)
    },
    btnNotActive: {
        backgroundColor: BG_GREY_OPACITY_5,
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 3),
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(8)
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
        width: _widthScale(170),
        paddingBottom:_moderateScale(8*2),
        // height: _moderateScale(200),
        // marginRight: _moderateScale(8),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
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
        width: _moderateScale(140),
        alignSelf: 'center',
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(16),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(20),
        justifyContent: 'center',
        borderColor: SECOND_COLOR,
        borderWidth: 1
    },
    chooseServiceActive: {
        backgroundColor: SECOND_COLOR,
        borderWidth: 0
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
        color: SECOND_COLOR
    },
    txtActive: {
        color: WHITE
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
})


export default PickServiceToBooking;