import moment from 'moment';
import React, { memo, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import * as Color from '../../../Constant/Color';
import { BG_GREY_OPACITY_5, GREY_FOR_TITLE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../../Constant/Url';
import { formatMonney } from '../../../Constant/Utils';
import ScreenKey from '../../../Navigation/ScreenKey';
import { getServiceById, getServicev2 } from '../../../Redux/Action/Service';
import { getTreatmentDetailById } from '../../../Redux/Action/TreatmentAction'

const ItemTemplateService = memo((props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer.infoUser)
    const currRoomChattingRedux = useSelector(state => state?.messageReducer?.currRoomChatting)


    useEffect(() => {
        // alert('new')
    }, [])

    let { item: infoMessage } = props;

    return (
        <>

            <View style={[styles.message, { marginLeft: _widthScale(8) }, currRoomChattingRedux?.messages[props?.index + 1]?.senderId && infoMessage?.senderId !== currRoomChattingRedux?.messages[props?.index + 1]?.senderId && { marginTop: _heightScale(8 * 2) }, props?.index == 0 && { marginBottom: _heightScale(40) }
            ]}>

                {
                    currRoomChattingRedux?.messages[props?.index + 1]?.senderId && infoMessage?.senderId !== currRoomChattingRedux?.messages[props?.index + 1]?.senderId ?
                        <>
                            {
                                currRoomChattingRedux?.infoCurrRoomChatting?.assignedUsers?.find(itemFind => itemFind?.userId == infoMessage?.senderId)?.name ?
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: Color.BLACK_OPACITY_8, marginBottom: _moderateScale(4) }]}>
                                        {currRoomChattingRedux?.infoCurrRoomChatting?.assignedUsers?.find(itemFind => itemFind?.userId == infoMessage?.senderId)?.name}
                                    </Text>
                                    :
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: Color.BLACK_OPACITY_8, marginBottom: _moderateScale(4) }]}>
                                        Trang Beauty
                                    </Text>
                            }

                        </>
                        : <></>
                }
                <View style={{ flexDirection: 'row' }}>
                    {
                        currRoomChattingRedux?.messages[props?.index + 1]?.senderId && infoMessage?.senderId !== currRoomChattingRedux?.messages[props?.index + 1]?.senderId ?
                            <View style={{
                                width: _moderateScale(30),
                                height: _moderateScale(30),
                            }}>
                                {
                                    currRoomChattingRedux?.infoCurrRoomChatting?.assignedUsers?.find(itemFind => itemFind?.userId == infoMessage?.senderId) ?
                                        <Image
                                            style={styles.avatarSm}
                                            source={{ uri: `${URL_ORIGINAL}${currRoomChattingRedux?.infoCurrRoomChatting?.assignedUsers?.find(itemFind => itemFind?.userId == infoMessage?.senderId)?.profile?.fileAvatar?.link}` }}
                                        />
                                        :
                                        <Image
                                            style={[styles.avatarSm]}
                                            source={{ uri: infoMessage?.senderChat?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${infoMessage?.senderChat?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                                        />
                                }
                            </View>
                            :
                            <>
                                {
                                    ((props?.index + 1) == currRoomChattingRedux?.messages.length) || (!moment(currRoomChattingRedux?.messages[props?.index]?.created).isSame(currRoomChattingRedux?.messages[props?.index + 1]?.created, 'day')) ?
                                        <View style={{
                                            width: _moderateScale(30),
                                            height: _moderateScale(30),
                                        }}>
                                            <Image
                                                style={styles.avatarSm}
                                                source={{ uri: infoMessage?.senderChat?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${infoMessage?.senderChat?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                                            />
                                            {
                                                props.isOnline ?
                                                    <View style={{ position: 'absolute', zIndex: 1, bottom: _moderateScale(-2), right: _moderateScale(-2), width: _moderateScale(8 * 1.75), height: _moderateScale(8 * 1.75), borderWidth: _moderateScale(2), borderColor: Color.WHITE, borderRadius: _moderateScale(9), backgroundColor: Color.ONLINE }} />
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </View>
                                        :
                                        <View style={{
                                            width: _moderateScale(30),
                                            height: _moderateScale(30),
                                        }} />
                                }
                            </>
                    }

                    {
                        <>
                            <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={()=>{
                                navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService:  infoMessage?.template?.data?._id})
                            }}
                            style={{
                                width: _moderateScale(8 * 24),
                                borderRadius: _moderateScale(8),
                                overflow: 'hidden',
                                backgroundColor: Color.WHITE,
                                marginLeft: _widthScale(8),
                            }}>

                                {
                                    infoMessage?.content ?
                                        <View style={{ padding: _moderateScale(8) }}>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY_FOR_TITLE }} >
                                                {infoMessage?.content}
                                            </Text>
                                        </View>
                                        :
                                        <></>
                                }

                                <View style={{}}>
                                    <Image
                                        style={{ width: '100%', height: _moderateScale(8 * 24), borderRadius: _moderateScale(8), borderRadius: _moderateScale(8) }}
                                        source={{
                                            uri: `${URL_ORIGINAL}${infoMessage?.template?.data?.fileAvatar?.link}`
                                        }} />

                                    <View style={{}}>
                                        <View style={{ padding: _moderateScale(8) }}>

                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                                                {
                                                    infoMessage?.template?.data?.name
                                                }
                                            </Text>
                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), color: Color.PRICE_ORANGE }}>
                                                {
                                                    formatMonney(infoMessage?.template?.data?.price)
                                                }
                                            </Text>
                                            <Text numberOfLines={5} style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.GREY }}>
                                                {
                                                    infoMessage?.template?.data?.description
                                                }
                                            </Text>

                                            <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12) }]}>
                                                {
                                                    moment(infoMessage.created).format('LT')
                                                }
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                        onPress={()=>{
                                            navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService:  infoMessage?.template?.data?._id})
                                        }}
                                        style={[styleElement.centerChild, {
                                            borderTopWidth: _moderateScale(0.5),
                                            borderColor: Color.BG_GREY_OPACITY_5,
                                            paddingVertical: _moderateScale(8)
                                        }]}>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK_OPACITY_8 }}>
                                                Chi tiết
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                var currentService = await getServiceById(infoMessage?.template?.data?._id)
                                                if (currentService?.isAxiosError) return
                                                navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceService: { ...currentService, listTopping: [] } })
                                            }}
                                            style={[styleElement.centerChild, {
                                                borderTopWidth: _moderateScale(0.5),
                                                borderColor: Color.BG_GREY_OPACITY_5,
                                                paddingVertical: _moderateScale(8)
                                            }]}>
                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: Color.BLUE_FB }}>
                                                Đặt lịch
                                            </Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </TouchableOpacity>
                        </>
                    }

                </View>
            </View>
        </>
    );
});



const shadow = {
    shadowColor: Color.RED,
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.36,
    shadowRadius: 1.68,

    elevation: 11
}

const styles = StyleSheet.create({
    btnSeeInfo__text: {
        fontSize: _moderateScale(12),
        color: Color.WHITE
    },
    btnSeeInfo: {
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        backgroundColor: Color.BLUE_FB,
        alignSelf: 'flex-start'
    },

    avatar: {
        width: _moderateScale(40),
        height: _moderateScale(40),
        borderRadius: _moderateScale(20),
        borderWidth: _moderateScale(1),
        borderColor: Color.BG_GREY_OPACITY
    },
    avatarSm: {
        width: _moderateScale(30),
        height: _moderateScale(30),
        borderRadius: _moderateScale(15),
        borderWidth: _moderateScale(1),
        borderColor: Color.BG_GREY_OPACITY
    },
    btnSeen: {
        paddingHorizontal: _moderateScale(8 * 1.2),
        paddingVertical: _moderateScale(2),
        backgroundColor: Color.BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        marginTop: _moderateScale(8),
        marginBottom: _moderateScale(8 * 2),
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnSendDone: {
        paddingHorizontal: _moderateScale(8 * 1.2),
        paddingVertical: _moderateScale(2),
        backgroundColor: Color.BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        marginTop: _moderateScale(8),
        marginBottom: _moderateScale(8 * 2),
        flexDirection: 'row',
        alignItems: 'center'
    },
    message: {
        width: _width,
        marginBottom: _heightScale(4),
        // flexDirection: 'row',
    },
    message__content: {
        minWidth: _widthScale(100),
        maxWidth: _widthScale(230),
        backgroundColor: Color.WHITE,
        // padding: _moderateScale(12),
        paddingBottom: _moderateScale(8),
        marginLeft: _widthScale(8),
        borderRadius: _moderateScale(8)
    },
    imagesWrap: {
        width: _widthScale(250),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        borderRadius: _moderateScale(10),
        overflow: 'hidden',
    },
    systemMessage__content: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        textAlign: 'center',
        fontSize: _moderateScale(12),
        color: GREY_FOR_TITLE
    },
    systemMessage: {
        borderRadius: _moderateScale(8),
        overflow: 'hidden',
        backgroundColor: BG_GREY_OPACITY_5,
        maxWidth: _width - _widthScale(8 * 4),
        alignSelf: 'center',
        marginVertical: _moderateScale(8),
        opacity: 0.8
    }
})


export default ItemTemplateService;