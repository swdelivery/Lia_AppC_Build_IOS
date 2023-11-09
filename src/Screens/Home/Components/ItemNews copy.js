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
import { WHITE, BASE_COLOR, SECOND_COLOR, THIRD_COLOR, GREY, BTN_PRICE, TITLE_GREY } from '../../../Constant/Color';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../../Constant/Url';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';

const ItemNews = memo((props) => {
    return (<>
        <TouchableOpacity
            onPress={()=>{
                navigation.navigate(ScreenKey.DETAIL_NEWS,{idNews: props?.data?._id})
            }}
            style={[styles.btnService]}>
            <View style={[styleElement.rowAliCenter]}>
                <Image
                    style={styles.logo}
                    source={{
                        uri:`${props?.data?.representationFileArr.length>0?
                            URL_ORIGINAL+props?.data?.representationFileArr[0]?.link
                            :URL_AVATAR_DEFAULT}`
                    }} />

                <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                    <Text
                        numberOfLines={2}
                        style={[stylesFont.fontNolanBold, {
                            fontSize: _moderateScale(13),
                            // flex: 1,
                            color: TITLE_GREY
                        }]}>
                        {props?.data?.title}
                    </Text>

                    <Text
                        numberOfLines={1}
                        style={[stylesFont.fontNolan, {
                            fontSize: _moderateScale(12),
                            // flex: 1,
                            color: TITLE_GREY,
                            marginTop:_moderateScale(4)
                        }]}>
                       {props?.data?.description}
                    </Text>

                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) }]}>
                        {
                            [1, 2, 3, 4, 5].map((item, index) => {
                                if (index > Math.floor(Math.random() * (5 - 3) + 3)) {
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
                           {Math.floor(Math.random() * (500 - 100) + 100)}
                    </Text>
                    </View>

                </View>



            </View>
        </TouchableOpacity>

        {props?.isLast === true ?<View style={[styleElement.lineHorizontal]} />:<></>}
        </> );
});

const styles = StyleSheet.create({
    logo: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        resizeMode: 'contain',
        borderRadius: _moderateScale(4)
    },

    btnService: {
        width: "100%",
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 1),
        paddingVertical:_moderateScale(8*2)
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

    elevation: 11
}


export default ItemNews;