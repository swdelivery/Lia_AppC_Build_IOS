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
import { WHITE, BLACK_OPACITY_8, BTN_PRICE } from '../../../Constant/Color';
import { navigation } from '../../../../rootNavigation';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { sizeIcon } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';
import ScreenKey from '../../../Navigation/ScreenKey'
import { URL_ORIGINAL } from '../../../Constant/Url';
import { formatMonney } from '../../../Constant/Utils';

const Card = memo((props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(ScreenKey.DETAIL_SP_SOCIAL,{id:props?.data?._id})
            }}
            activeOpacity={.8} style={[styles.btn, shadow]}>
            <Image
                style={{
                    width: "100%",
                    height: _moderateScale(200),
                    borderTopLeftRadius: _moderateScale(8 * 2),
                    borderTopRightRadius: _moderateScale(8 * 2)
                }}
                source={{ uri: `${URL_ORIGINAL}${props?.data?.representationFileArr[0]?.link}` }} />
            <View style={{ paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(8 * 2) }}>
                <Text style={[stylesFont.fontNolanBold, styles.title]}>
                    {props?.data?.name}
                </Text>

                <View style={{ flex: 1, flexDirection: 'row', marginTop: _moderateScale(8 * 2) }}>
                    <View style={{ flex: 2.25 }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                Lượt quyên góp
                            </Text>
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8, alignSelf: 'center' }]}>
                                {props?.data?.countDonation}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 2.05, alignItems: 'center' }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                            Đạt được
                            </Text>
                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                            {formatMonney(props?.data?.amountDonation)}
                        </Text>
                    </View>
                    <View style={{ flex: 1.7, justifyContent: 'center' }}>
                        <View style={styles.btnDetail}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>Chi tiết</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    btnDetail: {
        backgroundColor: BTN_PRICE,
        // marginHorizontal: _moderateScale(4),
        marginLeft: _moderateScale(8 * 2),
        height: _moderateScale(8 * 3.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    title: {
        fontSize: _moderateScale(16),
        color: BLACK_OPACITY_8
    },
    btn: {
        backgroundColor: WHITE,
        // borderTopLeftRadius: _moderateScale(8 * 2),
        // borderTopRightRadius: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8 * 2),
        marginBottom: _moderateScale(8 * 2)
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


export default Card;