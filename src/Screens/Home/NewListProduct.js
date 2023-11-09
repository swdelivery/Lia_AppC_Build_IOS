import React, { memo, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { navigation } from '../../../rootNavigation';
import { GREY, WHITE, BLACK_OPACITY_8 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import ScreenKey from '../../Navigation/ScreenKey';
import ItemService from './Components/ItemService'
import { sizeIcon } from '../../Constant/Icon';
import { useDispatch } from 'react-redux';
import { getAllService } from '../../Redux/Action/Service'
import { getAllProduct } from '../../Redux/Action/Product'

import { useSelector } from 'react-redux';
import NewItemService from './Components/NewItemService';
import { styleElement } from '../../Constant/StyleElement';
import NewItemProduct from './Components/NewItemProduct';

const NewListProduct = memo((props) => {

    const dispatch = useDispatch();

    const listProductRedux = useSelector(state => state.productReducer?.listProductHome)

    useEffect(() => {
        dispatch(getAllProduct())
    }, [])

    return (
        <View>
            <View style={{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[stylesFont.fontNolanBold, {
                    fontSize: _moderateScale(16),
                    color: BLACK_OPACITY_8, marginLeft: _moderateScale(8 * 1)
                }]}>
                    Sản phẩm
                </Text>

                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        navigation.navigate(ScreenKey.LIST_PRODUCT)
                    }}
                    style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    <Image
                        style={[sizeIcon.xs]}
                        source={require('../../Icon/rightArrow.png')} />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: _moderateScale(8 * 1) }}>
                <ScrollView
                    contentContainerStyle={{ paddingVertical: _moderateScale(8), paddingHorizontal: _moderateScale(8 * 3), alignItems: 'center' }}
                    showsHorizontalScrollIndicator={false}
                    horizontal>

                    {
                        listProductRedux?.map((item, index) => {
                            return (
                                <NewItemProduct key={index} data={item} flag={props?.flag} />
                            )
                        })
                    }
                    <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.LIST_PRODUCT)
                    }}
                    style={[{
                        width: _moderateScale(8 * 10),
                        height: _moderateScale(8 * 10),
                        borderRadius: _moderateScale(8 * 5),
                        backgroundColor: WHITE,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }, shadow]}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY }}>
                            Xem thêm
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
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
    shadowRadius: 4,

    elevation: 3
}

export default NewListProduct;