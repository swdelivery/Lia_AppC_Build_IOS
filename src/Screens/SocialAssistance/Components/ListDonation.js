import React, { memo, useState } from 'react';
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
import { formatMonney } from '../../../Constant/Utils';
import { URL_ORIGINAL } from '../../../Constant/Url';


const ListDonation = memo((props) => {

    const [isGetMine, setIsGetMine] = useState(false)

    if (props?.isActiveTab) {
        return (
            <View>
                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>
                    Top 5:
                </Text>

                {
                    props?.listTopPaymentSocialAssistance?.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>{index + 1}.</Text>
                                <Image
                                    style={[styles.avatar, { resizeMode: 'cover' }]}
                                    source={{ uri: `${URL_ORIGINAL}${item?.partner?.fileAvatar?.link}` }} />
                                <View style={{ marginLeft: _moderateScale(8), flex: 1 }}>
                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                        {item?.partner?.name}
                                    </Text>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                        {item?.partner?.fullPhone[0]}
                                    </Text>
                                </View>
                                <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(16), color: '#004698', marginLeft: _moderateScale(8 * 2) }]}>
                                    {formatMonney(item?.totalAmount)}
                                </Text>
                            </View>
                        )
                    })
                }

                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 5), justifyContent: 'space-between' }]}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BTN_PRICE }]}>
                        Danh sách quyên góp:
                    </Text>
                    <TouchableOpacity style={[styleElement.rowAliCenter]}>

                        {
                            isGetMine ?
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsGetMine(old => !old)
                                        props?.seeAll()
                                    }}
                                    style={[styleElement.rowAliCenter]}>
                                    <Text style={[stylesFont.fontNolan500, { marginRight: _moderateScale(8), fontSize: _moderateScale(14) }]}>
                                        Của tôi
                                    </Text>
                                    <Image style={[sizeIcon.lg]} source={require('../../../Icon/a_check.png')} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsGetMine(old => !old) 
                                        props?.seeMine()
                                    }}
                                    style={[styleElement.rowAliCenter]}>
                                    <Text style={[stylesFont.fontNolan500, { marginRight: _moderateScale(8), fontSize: _moderateScale(14) }]}>
                                        Của tôi
                                    </Text>
                                    <Image style={[sizeIcon.lg]} source={require('../../../Icon/i_check.png')} />
                                </TouchableOpacity>
                        }
                    </TouchableOpacity>
                </View>

                {
                    props?.listPaymentSocialAssistance?.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>{index + 1}.</Text>
                                <Image
                                    style={[styles.avatar, { resizeMode: 'cover' }]}
                                    source={{ uri: `${URL_ORIGINAL}${item?.partner?.fileAvatar?.link}` }} />
                                <View style={{ marginLeft: _moderateScale(8), flex: 1 }}>
                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                        {item?.partner?.name}
                                    </Text>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                        {item?.partner?.fullPhone[0]}
                                    </Text>
                                </View>
                                <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(16), color: '#004698', marginLeft: _moderateScale(8 * 2) }]}>
                                    {formatMonney(item?.amount)}
                                </Text>
                            </View>
                        )
                    })
                }
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

export default ListDonation;