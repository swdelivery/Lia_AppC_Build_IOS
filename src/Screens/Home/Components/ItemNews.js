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
import { WHITE, BASE_COLOR, SECOND_COLOR, THIRD_COLOR, GREY, BTN_PRICE, TITLE_GREY, BLACK_OPACITY_8, BG_GREY_OPACITY_5 } from '../../../Constant/Color';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../../Constant/Url';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';
import moment from 'moment'
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';

const ItemNews = memo((props) => {
    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    return (<>
        <TouchableOpacity
            onPress={() => {
                if (props?.data?.onClickAction?.type == 'redirect') {
                    if (!infoUserRedux?._id) {
                        store.dispatch({
                            type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                            payload: {
                                flag: true,
                                currRouteName: props?.route?.name
                            }
                        })
                        return
                    }
                    if(props?.data?.onClickAction?.data?.length > 0){
                        navigation.navigate(props?.data?.onClickAction?.data)
                    }
                } else {
                    navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: props?.data?._id })
                }
            }}
            style={[styles.btnService]}>
            <View style={[styleElement.rowAliCenter]}>
                <View style={{borderWidth:2, borderColor:BG_GREY_OPACITY_5,borderRadius:_moderateScale(8)}}>
                    <Image
                        style={[styles.logo]}
                        source={{
                            uri: `${props?.data?.representationFileArr.length > 0 ?
                                URL_ORIGINAL + props?.data?.representationFileArr[0]?.link
                                : URL_AVATAR_DEFAULT}`
                        }} />
                </View>

                <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                    <Text
                        numberOfLines={2}
                        style={[stylesFont.fontNolanBold, {
                            fontSize: _moderateScale(13),
                            // flex: 1,
                            color: BLACK_OPACITY_8
                        }]}>
                        {props?.data?.title}
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={[stylesFont.fontNolan, {
                            fontSize: _moderateScale(12),
                            // flex: 1,
                            color: TITLE_GREY,
                            marginTop: _moderateScale(4)
                        }]}>
                        {props?.data?.description}
                    </Text>

                    <Text style={{ color: GREY, ...stylesFont.fontNolan500, fontSize: _moderateScale(12) }}>
                       Cập nhật: {moment(props?.data?.updated).format('DD/MM/YYYY')}
                    </Text>

                    {/* <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) }]}>
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
                    </View> */}

                </View>



            </View>
        </TouchableOpacity>

        {props?.isLast === true ? <View style={[styleElement.lineHorizontal]} /> : <></>}
    </>);
});

const styles = StyleSheet.create({
    logo: {
        width: _moderateScale(8 * 12),
        height: _moderateScale(8 * 12),
        resizeMode: 'cover',
        borderRadius: _moderateScale(8)
    },

    btnService: {
        width: "100%",
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(8 * 1)
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