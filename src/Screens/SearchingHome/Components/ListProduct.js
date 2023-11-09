import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _heightScale, _width } from '../../../Constant/Scale';
import { WHITE, BASE_COLOR, SECOND_COLOR, THIRD_COLOR, GREY, BTN_PRICE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK_OPACITY_8, PRICE_ORANGE } from '../../../Constant/Color';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { formatMonney } from '../../../Constant/Utils';
import { URL_ORIGINAL } from '../../../Constant/Url';
import CountStar from '../../../Components/CountStar/index';
import FastImage from '../../../Components/Image/FastImage';

const ListProduct = memo((props) => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {
                props?.data?.data?.map((item, index) => {

                    return (
                        <View style={{ backgroundColor: WHITE }}>
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate(ScreenKey.DETAIL_PRODUCT,{idProduct: item?._id})
                                }}
                                activeOpacity={0.8}
                                style={[styles.btnService, shadow]}>
                                {/* <Image
                                    resizeMode={'cover'}
                                    style={[{ backgroundColor: BG_GREY_OPACITY_5, width: "100%", height: _widthScale(8 * 21), borderRadius: _moderateScale(8 * 1) }]}
                                    imageStyle={{ borderWidth: 1 }}
                                    source={{
                                        uri: `${URL_ORIGINAL}${item?.representationFileArr.length > 0 ? item?.representationFileArr[0]?.link : ''}`,
                                    }} /> */}

                                <FastImage
                                    style={[{ backgroundColor: BG_GREY_OPACITY_5, width: "100%", height: _widthScale(8 * 21), borderRadius: _moderateScale(8 * 1) }]}
                                    uri={
                                        `${URL_ORIGINAL}${item?.representationFileArr.length > 0 ? item?.representationFileArr[0]?.link : ''}`
                                    } />

                                <View style={{ paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 1) }}>
                                    {
                                        item?.price ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: PRICE_ORANGE }]}>
                                                    {formatMonney(item?.price)}
                                                </Text>
                                                <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                            </View>
                                            : <></>}
                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, {
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
                                    <View style={[styleElement.rowAliBottom, { justifyContent: 'space-between', marginTop: _moderateScale(4) }]}>
                                    </View>
                                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(0), justifyContent: 'space-between' }]}>
                                        <View />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
            {
                props?.data?.length % 2 !== 0 ?
                    <View style={[{ width: _widthScale(8 * 21) }, { borderWidth: 0, margin: _moderateScale(8), }]} />
                    : <></>
            }
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        width: _width / 2 - _widthScale(8 * 2.5),
        height: _width / 2 - _widthScale(8 * 2.5),
        borderWidth: 1,
        margin: _moderateScale(4)
    },
    btnChoice__text: {
        fontSize: _moderateScale(12),
        color: WHITE,
        bottom: _moderateScale(1)
    },
    btnChoice: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: SECOND_COLOR,
        marginRight: _moderateScale(8 * 2)
    },
    price: {
        paddingHorizontal: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(4),
        backgroundColor: SECOND_COLOR,
        position: 'absolute',
        left: _moderateScale(8 * 2),
        height: _moderateScale(8 * 3.5),
        justifyContent: 'center',
        alignItems: 'center',
        top: -_moderateScale(8 * 3.5 / 2)
    },
    btnService: {
        width: _widthScale(8 * 21),
        // height:_heightScale(8*),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 1),
        margin: _moderateScale(8),
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

    elevation: 1
}

export default ListProduct;