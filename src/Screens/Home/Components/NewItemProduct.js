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
import { _moderateScale, _widthScale, _heightScale } from '../../../Constant/Scale';
import { WHITE, BASE_COLOR, SECOND_COLOR, THIRD_COLOR, GREY, BTN_PRICE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK_OPACITY_8, PRICE_ORANGE } from '../../../Constant/Color';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { formatMonney } from '../../../Constant/Utils';
import { URL_ORIGINAL } from '../../../Constant/Url';
import CountStar from '../../../Components/CountStar/index';

const NewItemProduct = memo((props) => {

    const _handleOnpress = () => {
        // navigation.navigate(ScreenKey.DETAIL_PRODUCT, { idProduct: props?.data?._id })
        navigation.navigate(ScreenKey.DETAIL_PRODUCT, { idProduct: props?.data?._id })
    }


    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={_handleOnpress}
            style={[styles.btnService, shadow]}>
            <Image
                resizeMode={'cover'}
                style={[{ backgroundColor: BG_GREY_OPACITY_5, width: "100%", height: _moderateScale(8 * 19), borderRadius: _moderateScale(8 * 1) }]}
                imageStyle={{ borderWidth: 1 }}
                source={{
                    uri: `${URL_ORIGINAL}${props?.data?.representationFileArr.length > 0 ? props?.data?.representationFileArr[0]?.link : ''}`,
                }} />

            <View style={{ paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 1) }}>
                {/* <View style={[styles.price]}>
                    {props?.data?.price ?
                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: WHITE }]}>
                            {formatMonney(props?.data?.price)}
                        </Text>
                        : <></>}
                </View> */}
                {
                    props?.data?.price ?
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: PRICE_ORANGE }]}>
                                {formatMonney(props?.data?.price)}
                            </Text>
                            <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                        </View>
                        : <></>}

                <Text numberOfLines={1} style={[stylesFont.fontNolan500, {
                    fontSize: _moderateScale(14),
                    color: BLACK_OPACITY_8,
                    marginTop: _moderateScale(0)
                }]}>
                    {props?.data?.name}
                </Text>

                {/* */}

                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8), justifyContent: 'space-between' }]}>

                    <CountStar reviewCount={props?.data?.reviewCount} averageRating={parseInt(props?.data?.averageRating)} small />

                    <View style={[styleElement.rowAliCenter]}>
                        <Image style={sizeIcon.xxs} source={require('../../../NewIcon/people.png')} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                            {props?.data?.countPartner}
                            </Text>
                    </View>
                </View>


                <View style={[styleElement.rowAliBottom, { justifyContent: 'space-between', marginTop: _moderateScale(4) }]}>
                    {/* <Text
                        numberOfLines={2}
                        style={[stylesFont.fontNolan, {
                            fontSize: _moderateScale(10),
                            color: WHITE,
                            width: "65%",
                        }]}>
                        {props?.data?.description}
                    </Text> */}
                    {/* <CountStar light reviewCount={props?.data?.reviewCount} averageRating={parseInt(props?.data?.averageRating)} medium /> */}




                </View>

                {/* <View style={{ backgroundColor: 'rgba(255,254,253,0.4)' }}>
                    {props?.data?.price ?
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: THIRD_COLOR }]}>
                                {formatMonney(props?.data?.price)}
                            </Text>
                            <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: THIRD_COLOR, fontSize: _moderateScale(14), }}>đ</Text>
                        </View>
                        : <></>}
                </View> */}

                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(0), justifyContent: 'space-between' }]}>

                    {/* <View style={[{
                        paddingHorizontal: _moderateScale(8 * 1.5),
                        borderRadius: _moderateScale(4),
                        backgroundColor: SECOND_COLOR,
                        height: _moderateScale(8 * 3.5),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }]}>
                        {props?.data?.price ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(12), color: THIRD_COLOR }]}>
                                    {formatMonney(props?.data?.price)}
                                </Text>
                                <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: WHITE }}>đ</Text>
                            </View>
                            : <></>}
                    </View> */}



                    {/* <TouchableOpacity style={[styles.btnChoice, { backgroundColor: 'white', marginRight:0 }]} onPress={() => _handleOnpress()}>
                        <Text style={[stylesFont.fontNolanBold, styles.btnChoice__text, { color: THIRD_COLOR }]}>
                            Chi tiết
                        </Text>
                    </TouchableOpacity> */}

                    {/* <CountStar light reviewCount={props?.data?.reviewCount} averageRating={parseInt(props?.data?.averageRating)} medium /> */}
                    <View />



                </View>

            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
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
        width: _widthScale(8 * 19),
        // height:_heightScale(8*),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 1),
        marginRight: _moderateScale(8 * 2),
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


export default NewItemProduct;