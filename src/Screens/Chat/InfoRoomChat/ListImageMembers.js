import { isEmpty } from 'lodash';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// REDUX
import { useSelector } from "react-redux";
import { navigation } from '../../../../rootNavigation';
import FastImage from '../../../Components/Image/FastImage';
import * as Color from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';











const ListImageMembers = memo((props) => {

    const currChattingRedux = useSelector(state => state?.messageReducer?.currChatting)
    const infoUserRedux = useSelector(state => state.infoUserReducer.infoUser)




    return (
        <View style={[styles.bannerAvatar, { marginTop: _moderateScale(16) }]}>
            {
                !isEmpty(currChattingRedux?.memberArr) && currChattingRedux?.type == 'multiple' ?
                    <View style={{ justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', width: _moderateScale(60 * 2) }}>
                        {
                            currChattingRedux?.memberArr?.map((item, index) => {
                                if (index > 3) return
                                if (index > 2) {
                                    return (
                                        <View key={index} style={{
                                            width: _moderateScale(26 * 2),
                                            height: _moderateScale(26 * 2),
                                            borderRadius: _moderateScale(13 * 2),
                                            overflow: 'hidden',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <LinearGradient
                                                start={{ x: 0, y: 1 }}
                                                end={{ x: 1, y: 1 }}
                                                colors={gradient.color}
                                                style={gradient.container}>
                                                <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(12 * 2), color: Color.WHITE }]}>
                                                    {`+${currChattingRedux?.memberArr?.length - 3}`}
                                                </Text>
                                            </LinearGradient>
                                        </View>
                                    )
                                }
                                return (
                                    <FastImage key={index} style={[{
                                        width: _moderateScale(26 * 2),
                                        height: _moderateScale(26 * 2),
                                        borderRadius: _moderateScale(26 * 2)
                                    }]} uri={item?.employeeId?.fileAvatar?.link ? `${URL_ORIGINAL}${item?.employeeId?.fileAvatar?.link}` : URL_AVATAR_DEFAULT} />
                                )
                            })
                        }
                    </View>
                    :
                    <>
                    </>
            }
            {
                !isEmpty(currChattingRedux?.memberArr) && currChattingRedux?.type == 'single' ?

                    <FastImage
                        style={[styles.avatar]}
                        uri={
                            currChattingRedux?.memberArr?.find(itemFind => itemFind.userId._id !== infoUserRedux._id)?.employeeId?.fileAvatar?.link ?
                                `${URL_ORIGINAL}${currChattingRedux?.memberArr?.find(itemFind => itemFind.userId._id !== infoUserRedux._id)?.employeeId?.fileAvatar?.link}`
                                :
                                URL_AVATAR_DEFAULT
                        }
                    />
                    :
                    <>
                    </>
            }
            {
                !isEmpty(currChattingRedux?.memberArr) && currChattingRedux?.type == 'single' ?
                    <Text style={[stylesFont.fontNolan500, styles.bannerAvatar__name]}>
                        {
                            currChattingRedux?.memberArr?.find(itemFind => itemFind.userId._id !== infoUserRedux._id).name
                        }
                    </Text>
                    :
                    <Text style={[stylesFont.fontNolan500, styles.bannerAvatar__name]}>
                        {currChattingRedux?.name}
                    </Text>
            }

            {
                currChattingRedux?.type == 'multiple' && currChattingRedux?.memberArr?.find(itemFind => itemFind.userId._id == infoUserRedux._id)?.isMain == true ?
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.ADD_MEMBERS_TO_GROUP_CHAT)
                        }}
                        style={[styleElement.centerChild, styles.bannerAvatar__btnAddMembers]}>
                        <Image
                            style={[sizeIcon.llg]}
                            source={require('../../../Icon/addUser_black.png')} />
                    </TouchableOpacity>
                    :
                    <>
                    </>
            }

        </View>
    );
});


const styles = StyleSheet.create({
    bannerAvatar__btnAddMembers: {
        backgroundColor: Color.BG_GREY_OPACITY_3,
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(8 * 6 / 2),
        marginTop: _moderateScale(8)
    },
    bannerAvatar__name: {
        fontSize: _moderateScale(18),
        marginTop: _moderateScale(8),
        color: Color.GREY_FOR_TITLE
    },
    bannerAvatar: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: _moderateScale(40 * 2.5),
        height: _moderateScale(40 * 2.5),
        borderRadius: _moderateScale(20 * 2.5),
        borderWidth: _moderateScale(1),
        borderColor: Color.BG_GREY_OPACITY
    },

})



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
        Color.BASE_COLOR,
        'rgba(104, 47, 144,.4)'
    ]
}


export default ListImageMembers;