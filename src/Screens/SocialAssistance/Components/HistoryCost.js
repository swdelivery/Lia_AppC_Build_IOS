import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import { WHITE, BLACK_OPACITY_8, BTN_PRICE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY } from '../../../Constant/Color';
import { navigation } from '../../../../rootNavigation';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { sizeIcon } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';
import ScreenKey from '../../../Navigation/ScreenKey'
import moment from 'moment'
import { formatMonney } from '../../../Constant/Utils';

const HistoryCost = memo((props) => {



    if (props?.isActiveTab) {
        return (
            <View>
               

                {
                    props?.listExpenseSocialAssistance?.map((itemParent, indexParent) => {
                        return (
                            <View style={{marginBottom:_moderateScale(8*2)}}>
                                <View style={[styleElement.rowAliCenter]}>
                                    <View style={{ width: _moderateScale(8), height: _moderateScale(8), borderRadius: _moderateScale(4), backgroundColor: BTN_PRICE, marginRight: _moderateScale(8) }} />
                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>
                                        {moment(itemParent?.day).format('LL')}
                                    </Text>
                                </View>
                                <View style={{paddingLeft:_moderateScale(8*2)}}>
                                    {
                                        itemParent?.arrData?.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                onPress={()=>props?.pressed(item)}
                                                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: _moderateScale(8) }}>
                                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), width:_moderateScale(8*3.5) }]}>{index + 1}.</Text>

                                                    <View style={{  flex: 1 }}>
                                                        <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                                            {item?.title}
                                                        </Text>
                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                                            {item?.description}
                                                    </Text>
                                                    </View>
                                                    <View style={{ alignItems: 'flex-end' }}>
                                                        <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(16), color: '#004698', marginLeft: _moderateScale(8 * 2) }]}>
                                                            {formatMonney(item?.amount)}
                                                    </Text>
                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                                            Chi tiết
                                                    </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    })
                }

                {/* <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>
                    Top 5:
                </Text> */}

                {/* {
                    [1, 2, 3, 4, 5]?.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>{index + 1}.</Text>

                                <View style={{ marginLeft: _moderateScale(8), flex: 1 }}>
                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                        Mua hàng
                                    </Text>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                        Nhu yếu phẩm tại BHX
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(16), color: '#004698', marginLeft: _moderateScale(8 * 2) }]}>
                                        25.000.000
                                    </Text>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                        Chi tiết
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                } */}


            </View>
        );
    } else {
        return <></>
    }


});


const styles = StyleSheet.create({
    avatar: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderWidth: _moderateScale(0.5),
        borderRadius: _moderateScale(8 * 3),
        borderColor: BG_GREY_OPACITY_5,
        marginLeft: _moderateScale(8)
    }
})

export default HistoryCost;