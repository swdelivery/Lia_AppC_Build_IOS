import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BTN_PRICE, GREY, WHITE, BLACK_OPACITY_8, ORANGE, BG_GREY_OPACITY_5, PRICE_ORANGE, BLUE_FB, RED, BLACK } from '../../../Constant/Color';
import { getServiceByGroup } from '../../../Redux/Action/ServiceGroup';
import { useDispatch, useSelector } from 'react-redux';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { formatMonney } from '../../../Constant/Utils';
import { getListServiceForBooking } from '../../../Redux/Action/BookingAction';
import { sizeIcon } from '../../../Constant/Icon';
import ModalPickSingleNotSearch from '../../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import _isEmpty from 'lodash/isEmpty'
import store from '../../../Redux/Store';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'

const index = memo((props) => {
    const dispatch = useDispatch()
    const [listService, setListService] = useState([])

    const [listServiveGr, setListServiceGr] = useState([])

    const [showModalFilter, setShowModalFilter] = useState(false)
    const [itemServiceGrChoice, setItemServiceGrChoice] = useState({
        _id: '123123',
        name: 'Tất cả',
        code: 'all',
    })

    const listServiceRedux = useSelector(state => state.serviceReducer?.listService)
    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    useEffect(() => {
        dispatch(getServiceByGroup())

        _getListServiceGr()
    }, [])

    const _getListServiceGr = async () => {
        let result = await getListServiceForBooking();
        if (result?.isAxiosError) return
        setListServiceGr([
            {
                _id: '123123',
                name: 'Tất cả',
                code: 'all',
            }, ...result?.data?.data
        ])
    }

    const _handleChoiceItemFilter = (data) => {


        setItemServiceGrChoice(data)

        if (data?.code) {
            if (data?.code == "all") {
                dispatch(getServiceByGroup())
                return
            }

            dispatch(getServiceByGroup({
                condition: {
                    codeGroup: {
                        in: [data?.code]
                    }
                },
            }))
        }

        // dispatch(getServiceByGroup())
    }

    return (
        <>
            <ModalPickSingleNotSearch
                hide={() => {
                    setShowModalFilter(false)
                }}
                onSelect={(item) => {
                    _handleChoiceItemFilter(item)
                }}
                data={!_isEmpty(listServiveGr) ? listServiveGr : []} show={showModalFilter} />

            <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginVertical: _moderateScale(8) }}>
                <TouchableOpacity
                    onPress={() => {
                        setShowModalFilter(true)
                    }}
                    style={[styleElement.rowAliCenter]}>
                    <Image style={[sizeIcon.lg]} source={require('../../../Icon/filter_blue.png')} />
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), marginLeft: _moderateScale(8), color: '#3498DB' }]}>
                        {
                            itemServiceGrChoice?.name
                        }
                    </Text>
                </TouchableOpacity>

            </View>
            <ScrollView scrollIndicatorInsets={{ right: 1 }} style={{ flex: 1 }}>
                <View style={{ marginTop: _moderateScale(8 * 1) }}>

                    {
                        !_isEmpty(listServiceRedux) ?
                            <>
                                {
                                    listServiceRedux?.map((item, index) => {
                                        return (
                                            <View key={index}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: item?._id, flag: 'share' })
                                                    }}
                                                    style={[styleElement.rowAliCenter, { marginHorizontal: _moderateScale(8 * 2), marginBottom: _moderateScale(8 * 3) }]}>

                                                    {/* <View style={{ width: _moderateScale(8 * 4), 
                                        top:-_moderateScale(8),
                                        height: _moderateScale(8 * 4), position: 'absolute', zIndex: 1 , justifyContent:'center', alignItems:'center'}}>
                                        <View style={[{ width: _moderateScale(8 * 4), height: _moderateScale(8 * 4), backgroundColor: ORANGE, transform: [{ rotate: "45deg" }] }]}>

                                        </View>
                                        <Text style={[stylesFont.fontNolan500,{position:'absolute', color:WHITE, fontSize:_moderateScale(12)}]}>
                                            10%
                                        </Text>
                                    </View> */}
                                                    {/* {
                                                    infoUserRedux?.level?.promotion?.commissionRate ?
                                                        <View style={{
                                                            position: 'absolute',
                                                            zIndex: 1,
                                                            width: _moderateScale(8 * 5),
                                                            height: _moderateScale(8 * 2.5),
                                                            backgroundColor: ORANGE,
                                                            top: 0,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderRadius: _moderateScale(8)
                                                        }}>
                                                            <Text style={[stylesFont.fontNolanBold, { position: 'absolute', color: WHITE, fontSize: _moderateScale(12) }]}>
                                                                -{infoUserRedux?.level?.promotion?.commissionRate * 100}%
                                                        </Text>
                                                        </View>

                                                        : <></>
                                                } */}


                                                    {item?.representationFileIdArr.length > 0 ?
                                                        <Image
                                                            style={{ width: _moderateScale(8 * 7.5), height: _moderateScale(8 * 7.5), borderRadius: _moderateScale(8 * 4), borderWidth: _moderateScale(0.5), borderColor: BG_GREY_OPACITY_5 }}
                                                            resizeMode="cover"
                                                            source={{ uri: (`${URL_ORIGINAL}/${item?.representationFileArr[0]?.path}`) }} />
                                                        : <Image
                                                            style={{ width: _moderateScale(8 * 7.5), height: _moderateScale(8 * 7.5), borderRadius: _moderateScale(8 * 4), borderWidth: _moderateScale(0.5), borderColor: BG_GREY_OPACITY_5 }}
                                                            resizeMode="cover"
                                                            source={require('../../../Image/component/logoLinear.png')} />
                                                    }
                                                    <View style={{ flex: 1, marginHorizontal: _moderateScale(8) }}>
                                                        <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLACK }]}>
                                                            {item?.name}
                                                        </Text>
                                                        {/* {
                                                        infoUserRedux?.level?.promotion?.discountRetailService ?
                                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, textDecorationLine: 'line-through' }]}>
                                                                {formatMonney(item?.price)}
                                                            </Text>
                                                            :
                                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, textDecorationLine: 'line-through' }]}>

                                                            </Text>
                                                    } */}

                                                        <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                                                            {formatMonney(item?.price)}đ
                                                            {/* {formatMonney(item?.price * (1 - infoUserRedux?.level?.promotion?.discountRetailService))} */}
                                                        </Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                                            <Text>
                                                                Hoa hồng:
                                                            </Text>
                                                            <Text numberOfLines={1} style={[stylesFont.fontNolanBold, { marginLeft: _moderateScale(4), fontSize: _moderateScale(15), color: PRICE_ORANGE }]}>
                                                                + {formatMonney(item?.price * (infoUserRedux?.level?.promotion?.commissionRate))}đ
                                                            </Text>
                                                            {/* <Text numberOfLines={1} style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLUE_FB }]}>
                                                            +{infoUserRedux?.level?.promotion?.commissionRate * 100}% {
                                                                <Text style={{ color: PRICE_ORANGE }}>
                                                                    ~ {formatMonney(item?.price * (infoUserRedux?.level?.promotion?.commissionRate))} đ
                                                                </Text>
                                                            }
                                                        </Text> */}
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        navigation.navigate(ScreenKey.SHARE_TO_SOCIAL, { idService: item?._id })
                                                                    }}
                                                                    hitSlop={styleElement.hitslopSm}
                                                                    style={{
                                                                        backgroundColor: BLUE_FB,
                                                                        paddingHorizontal: _moderateScale(8 * 1.5),
                                                                        paddingVertical: _moderateScale(4),
                                                                        borderRadius: _moderateScale(6)
                                                                    }}>
                                                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: WHITE, bottom: 1 }}>
                                                                        Chia sẻ
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>

                                                <View style={{ height: 1, backgroundColor: BG_GREY_OPACITY_5, marginBottom: _moderateScale(8 * 3) }} />
                                            </View>
                                        )
                                    })
                                }
                            </>
                            :
                            <>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), alignSelf: 'center', color: GREY }]}>Chưa có dữ liệu</Text>
                            </>
                    }



                </View>

                <View style={{ height: 50 }} />

            </ScrollView>
        </>
    );
});

const styles = StyleSheet.create({
    btnConfirm__text: {
        fontSize: _moderateScale(14),
        color: BTN_PRICE,
        bottom: _moderateScale(1)
    },
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 2),
        borderWidth: _moderateScale(1),
        borderColor: BTN_PRICE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8 * 2),
    },
    price: {
        fontSize: _moderateScale(18),
        color: "#5D5FEF",
        alignSelf: 'center',
        marginVertical: _moderateScale(8 * 1)
    },
    bannerDiscount__text: {
        fontSize: _moderateScale(14),
        color: WHITE
    },
    bannerDiscount: {
        position: 'absolute',
        borderTopStartRadius: _moderateScale(8),
        backgroundColor: "#FF9F0F",
        alignSelf: 'flex-start',
        borderBottomEndRadius: _moderateScale(8),
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 2.75),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bannerNameAbsolute__text: {
        fontSize: _moderateScale(12),
        color: BTN_PRICE
    },
    bannerNameAbsolute: {
        backgroundColor: "rgba(255, 95, 151,0.6)",
        position: "absolute",
        height: _moderateScale(8 * 2.5),
        top: -_moderateScale(8 * 2.5),
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnService__image: {
        height: _moderateScale(8 * 10),
        borderTopStartRadius: _moderateScale(8),
        borderTopEndRadius: _moderateScale(8)
    },
    btnService: {
        width: _moderateScale(120),
        marginHorizontal: _moderateScale(8),
        marginTop: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        paddingBottom: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
    }

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



export default index;