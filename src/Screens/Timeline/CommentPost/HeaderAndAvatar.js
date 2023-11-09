import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import FastImage from '../../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_5, GREY, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color';
import { FROM_RECEIVER_ID } from '../../../Constant/Flag';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';
import { styleElement } from '../../../Constant/StyleElement';


const HeaderAndAvatar = ((props) => {

    console.log({ axaxax: props });
    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)


    return (
        <View style={[styles.header, shadow]}>
            <View style={[styles.avatarAndTitle]}>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: _moderateScale(8)
                    }}
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Image
                        style={sizeIcon.lg}
                        source={require('../../../Icon/backBlack.png')} />
                </TouchableOpacity>
                <FastImage
                    style={[styles.avatarAndTitle__avatar]}
                    uri={props?.avatar ? `${URL_ORIGINAL}${props?.avatar}` : URL_AVATAR_DEFAULT}
                />
                <View style={[styles.avatarAndTitle__titleAndTime, { flex: 1 }]}>
                    {
                        !isEmpty(props?.data) ?
                            <>
                                <Text style={[stylesFont.fontNolan500, styles.avatarAndTitle__titleAndTime__title]}>
                                    {
                                        `${props?.data?.userCreate?.profile?.firstName} ${props?.data?.userCreate?.profile?.lastName}`
                                    }
                                </Text>
                                <Text style={[stylesFont.fontNolan, styles.avatarAndTitle__titleAndTime__time]}>
                                    {moment(props?.data?.created).startOf('minute').fromNow()}
                                </Text>
                            </>
                            :
                            <>
                            </>
                    }

                </View>

                {
                    props?.data?.userCreate?._id !== infoUserRedux._id ?
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.CHATTING, { propsData: props?.data?.userCreate?._id, flag: FROM_RECEIVER_ID })
                            }}
                            style={{
                                paddingHorizontal: _moderateScale(16),
                                paddingVertical: _moderateScale(8),
                                // backgroundColor:BG_GREY_OPACITY_3,
                                borderRadius: _moderateScale(8)
                            }}>
                            <Image
                                style={sizeIcon.lg}
                                source={require('../../../Icon/i_chatt.png')} />
                        </TouchableOpacity>
                        :
                        <>
                        </>
                }

            </View>
        </View>
    );
});


const styles = StyleSheet.create({

    avatarAndTitle__titleAndTime__time: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    avatarAndTitle__titleAndTime__title: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE
    },
    avatarAndTitle__titleAndTime: {
        marginLeft: _moderateScale(8)
    },
    avatarAndTitle__avatar: {
        width: _moderateScale(8 * 4.5),
        height: _moderateScale(8 * 4.5),
        borderRadius: _moderateScale(8 * 4.5 / 2),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5
    },
    avatarAndTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        justifyContent: 'center',
        // alignItems: 'flex-end',
        width: _width,
        height: _moderateScale(8 * 6),
        backgroundColor: WHITE,
        paddingVertical: _moderateScale(8),
    },
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.68,

    elevation: 1.5
}



const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        BASE_COLOR,
        'rgba(104, 47, 144,.4)'
    ]
}



export default memo(HeaderAndAvatar);