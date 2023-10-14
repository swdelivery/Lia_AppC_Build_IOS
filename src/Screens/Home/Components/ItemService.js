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
import { _moderateScale, _widthScale } from '../../../Constant/Scale';
import { WHITE, BASE_COLOR, SECOND_COLOR, THIRD_COLOR, GREY, BTN_PRICE } from '../../../Constant/Color';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { formatMonney } from '../../../Constant/Utils';
import { URL_ORIGINAL } from '../../../Constant/Url';

const ItemService = memo((props) => {

    const _handleOnpress = () => {
        if (props?.flag == "service") {
            navigation.navigate(ScreenKey.DETAIL_SERVICE,{idService: props?.data?._id})
        }
        if (props?.flag == "product") {
            navigation.navigate(ScreenKey.DETAIL_PRODUCT,{idProduct: props?.data?._id})
        }
    }


    return (
        <TouchableOpacity
            onPress={_handleOnpress}
            style={[shadow, styles.btnService]}>
            <Image
                resizeMode={'cover'}
                style={{ width: "100%", height: _moderateScale(100), borderTopLeftRadius: _moderateScale(8), borderTopRightRadius: _moderateScale(8) }}
                source={{
                    uri: `${URL_ORIGINAL}${props?.data?.representationFileArr.length>0? props?.data?.representationFileArr[0]?.link:''}`,
                }} />

            <View style={{ paddingLeft: _moderateScale(8 * 2), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 2) }}>
                <View style={[styles.price]}>
                {props?.data?.price?
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: WHITE }]}>
                        {formatMonney(props?.data?.price)}
                    </Text>
                :<></>}
                </View>

                <Text style={[stylesFont.fontNolanBold, {
                    fontSize: _moderateScale(14),
                    color: BASE_COLOR,
                    marginTop: _moderateScale(8)
                }]}>
                    {props?.data?.name}
                </Text>

                <View style={[styleElement.rowAliBottom, { justifyContent: 'space-between', marginTop: _moderateScale(8) }]}>
                    <Text
                        numberOfLines={2}
                        style={[stylesFont.fontNolan, {
                            fontSize: _moderateScale(10),
                            color: GREY,
                            width: "65%",
                        }]}>
                        {props?.data?.description}
                    </Text>

                    <TouchableOpacity style={styles.btnChoice} onPress={()=>_handleOnpress()}>
                        <Text style={[stylesFont.fontNolanBold, styles.btnChoice__text]}>
                            Chi tiết 
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8) }]}>
                    {
                        [1, 2, 3, 4, 5].map((item, index) => {
                            if (index > 3) {
                                return (
                                    <Image key={index}
                                        style={[sizeIcon.xs]}
                                        source={require('../../../Icon/i_star.png')} />
                                )
                            }
                            return (
                                <Image key={index}
                                    style={[sizeIcon.xs]}
                                    source={require('../../../Icon/a_star.png')} />
                            )
                        })
                    }
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(8) }]}>
                        ({Math.floor(Math.random() * (500 - 50 + 1) + 50)})
                    </Text>
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
        backgroundColor: BTN_PRICE,
        marginRight: _moderateScale(8 * 2)
    },
    price: {
        paddingHorizontal: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(4),
        backgroundColor: BTN_PRICE,
        position: 'absolute',
        right: _moderateScale(8 * 2),
        height: _moderateScale(8 * 3.5),
        justifyContent: 'center',
        alignItems: 'center',
        top: -_moderateScale(8 * 3.5 / 2)
    },
    btnService: {
        width: _widthScale(8 * 35),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        marginRight: _moderateScale(8 * 2)
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

    elevation: 4
}


export default ItemService;