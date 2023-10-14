import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BTN_PRICE, GREY, WHITE, BLACK_OPACITY_8, ORANGE, BG_GREY_OPACITY_5, PRICE_ORANGE } from '../../../Constant/Color';
import { getServiceByGroup } from '../../../Redux/Action/ServiceGroup';
import { useDispatch, useSelector } from 'react-redux';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { formatMonney } from '../../../Constant/Utils';
import { getListServiceForBooking, getListProductForBooking } from '../../../Redux/Action/BookingAction';
import { sizeIcon } from '../../../Constant/Icon';
import ModalPickSingleNotSearch from '../../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import _isEmpty from 'lodash/isEmpty'
import store from '../../../Redux/Store';
import { getProductByGroup } from '../../../Redux/Action/ProductGroup';

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

    const listProductRedux = useSelector(state => state.productReducer?.listProduct)
    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    useEffect(() => {
        dispatch(getProductByGroup())

        _getListProductGr()
    }, [])

    const _getListProductGr = async () => {
        let result = await getListProductForBooking();
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
                dispatch(getProductByGroup())
                return
            }

            dispatch(getProductByGroup({
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
            <ScrollView style={{ flex: 1 }}>
                <View style={{ marginTop: _moderateScale(8 * 1) }}>

                    {
                        !_isEmpty(listProductRedux) ?
                            <>
                                {
                                    listProductRedux?.map((item, index) => {
                                        return (

                                            <TouchableOpacity style={[styleElement.rowAliCenter, { marginHorizontal: _moderateScale(8 * 2), marginBottom: _moderateScale(8 * 2) }]}>

                                                {/* <View style={{ width: _moderateScale(8 * 4), 
                                        top:-_moderateScale(8),
                                        height: _moderateScale(8 * 4), position: 'absolute', zIndex: 1 , justifyContent:'center', alignItems:'center'}}>
                                        <View style={[{ width: _moderateScale(8 * 4), height: _moderateScale(8 * 4), backgroundColor: ORANGE, transform: [{ rotate: "45deg" }] }]}>

                                        </View>
                                        <Text style={[stylesFont.fontNolan500,{position:'absolute', color:WHITE, fontSize:_moderateScale(12)}]}>
                                            10%
                                        </Text>
                                    </View> */}
                                                {
                                                    infoUserRedux?.level?.promotion?.discountRetailService ?
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
                                                                -{infoUserRedux?.level?.promotion?.discountRetailService * 100}%
                                                        </Text>
                                                        </View>

                                                        : <></>
                                                }


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
                                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                                        {item?.name}
                                                    </Text>
                                                    {/* <Text numberOfLines={1} style={[stylesFont.fontNolan, { fontSize: _moderateScale(12), color: GREY }]}>
                                                        {item?.description}
                                                    </Text> */}
                                                    {
                                                        infoUserRedux?.level?.promotion?.discountRetailService ?
                                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, textDecorationLine: 'line-through' }]}>
                                                                {formatMonney(item?.price)}
                                                            </Text>
                                                            :
                                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, textDecorationLine: 'line-through' }]}>

                                                            </Text>
                                                    }

                                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: PRICE_ORANGE }]}>
                                                        {formatMonney(item?.price * (1 - infoUserRedux?.level?.promotion?.discountRetailService))}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
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