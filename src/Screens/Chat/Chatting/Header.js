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
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';












const Header = memo((props) => {
    const currChattingRedux = useSelector(state => state?.messageReducer?.currChatting)
    const infoUserRedux = useSelector(state => state.infoUserReducer)
    const listUserOnlineRedux = useSelector(state => state.membersReducer.listUserOnline)

    const infoCurrRoomChattingRedux = useSelector(state => state?.messageReducer?.currRoomChatting?.infoCurrRoomChatting)

    const _renderStatusVideoCall = (status) => {


        switch (status) {
            case "WAIT":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dot, { backgroundColor: Color.BLUE_FB }]} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.BLUE_FB }}>Đang chờ duyệt</Text>
                    </View>
                )
            case "ACCEPT":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dot, { backgroundColor: Color.GREEN_SUCCESS }]} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREEN_SUCCESS }}>Duyệt thành công</Text>
                    </View>
                )
            case "COMPLETE":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dot, { backgroundColor: Color.BASE_COLOR }]} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.BASE_COLOR }}>Hoàn thành tư vấn</Text>
                    </View>
                )
            case "DENY":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dot, { backgroundColor: Color.GREY }]} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY }}>Tạm hoãn</Text>
                    </View>
                )
            case "CANCEL":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dot, { backgroundColor: Color.RED }]} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.RED }}>Huỷ tư vấn</Text>
                    </View>
                )

            default:
                break;
        }
    }

    const _renderAvatarDoctor = () => {

        let findMainDoctor = infoCurrRoomChattingRedux?.assignedUsers?.find(item => item?.isMain);
        if (findMainDoctor) {
            return (
                <Image
                    resizeMode="cover"
                    source={{ uri: `${URL_ORIGINAL}${findMainDoctor?.profile?.fileAvatar?.link}` }}
                    style={{
                        width: _moderateScale(8 * 5),
                        height: _moderateScale(8 * 5),
                        borderRadius: _moderateScale(8 * 5 / 2),
                        borderColor: Color.BG_GREY_OPACITY
                    }} />
            )
        } else {
            return (
                <Image
                    resizeMode="cover"
                    source={require('../../../NewIcon/bacsi.png')}
                    style={{
                        width: _moderateScale(8 * 5),
                        height: _moderateScale(8 * 5),
                        borderRadius: _moderateScale(8 * 5 / 2),
                        borderColor: Color.BG_GREY_OPACITY
                    }} />
            )
        }
    }

    const _renderNameDoctor = () => {

        let findMainDoctor = infoCurrRoomChattingRedux?.assignedUsers?.find(item => item?.isMain);
        if (findMainDoctor) {
            return (
                <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>
                    {findMainDoctor?.name}
                </Text>
            )
        } else {
            return (
                <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>
                    Hỗ trợ sau điều trị
                </Text>
            )
        }
    }

    return (
        <>
            <View
                style={[styles.header, styleElement.rowAliCenter]}>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{ marginHorizontal: _widthScale(8) }}>
                    <Image
                        style={[sizeIcon.lllg]}
                        source={require('../../../Icon/backGrey.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={infoCurrRoomChattingRedux?.type == "videoCallRequest"}
                    onPress={() => {
                        navigation.navigate(ScreenKey.INFO_ROOM_CHAT)
                    }}
                    activeOpacity={0.8}
                    style={[{ flex: 1 }, styleElement.rowAliCenter]}>

                    {
                        infoCurrRoomChattingRedux?.type == "treatment" ?
                            _renderAvatarDoctor()
                            :
                            <>
                            </>
                    }
                    {
                        infoCurrRoomChattingRedux?.type == "consultation" ?
                            <Image
                                resizeMode="cover"
                                source={require('../../../NewIcon/tuvan.png')}
                                style={{
                                    width: _moderateScale(8 * 5),
                                    height: _moderateScale(8 * 5),
                                    borderRadius: _moderateScale(8 * 5 / 2),
                                    borderColor: Color.BG_GREY_OPACITY
                                }} />
                            :
                            <>
                            </>
                    }
                    {
                        infoCurrRoomChattingRedux?.type == "videoCallRequest" ?
                            <Image
                                resizeMode="cover"
                                source={require('../../../NewIcon/noteCall.png')}
                                style={{
                                    width: _moderateScale(8 * 5),
                                    height: _moderateScale(8 * 5),
                                    borderRadius: _moderateScale(8 * 5 / 2),
                                    borderColor: Color.BG_GREY_OPACITY
                                }} />
                            :
                            <>
                            </>
                    }

                    <View style={{ marginLeft: _widthScale(16), flex: 1 }}>
                        {
                            infoCurrRoomChattingRedux?.type == "treatment" ?
                                _renderNameDoctor()
                                :
                                <>
                                </>
                        }
                        {
                            infoCurrRoomChattingRedux?.type == "consultation" ?
                                <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>
                                    {infoCurrRoomChattingRedux?.name}
                                </Text>
                                :
                                <>
                                </>
                        }
                        {
                            infoCurrRoomChattingRedux?.type == "videoCallRequest" ?
                                <>
                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>
                                        Yêu cầu Video Call
                                </Text>
                                    {
                                        _renderStatusVideoCall(infoCurrRoomChattingRedux?.data?.status)
                                    }
                                </>
                                :
                                <>
                                </>
                        }

                        {/* {
                        !isEmpty(currChattingRedux) &&
                            currChattingRedux.memberArr.length > 0 &&
                            currChattingRedux.type == "single" ?
                            <>
                                {
                                    listUserOnlineRedux?.find(item => item == currChattingRedux.memberArr.find(itemFind => itemFind.userId._id !== infoUserRedux.infoUser._id).userId._id) ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ marginRight: _moderateScale(6), width: _moderateScale(12), height: _moderateScale(12), borderRadius: _moderateScale(6), backgroundColor: Color.ONLINE }} />
                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), bottom: _moderateScale(1) }]}>
                                                Đang hoạt động
                                            </Text>
                                        </View>
                                        :
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ marginRight: _moderateScale(6), width: _moderateScale(12), height: _moderateScale(12), borderRadius: _moderateScale(6), backgroundColor: Color.BG_GREY_OPACITY_7 }} />
                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), bottom: _moderateScale(1) }]}>
                                                Không hoạt động...
                                            </Text>
                                        </View>
                                }
                            </>
                            :
                            <>
                            </>
                    } */}

                        <View style={{
                            position: 'absolute',
                            right:_moderateScale(8*2),
                            top:_moderateScale(4)
                        }}>
                            <View style={{width:_moderateScale(4),height:_moderateScale(4),borderRadius:_moderateScale(2), backgroundColor:Color.BG_GREY_OPACITY_7}}/>
                            <View style={{width:_moderateScale(4),height:_moderateScale(4),borderRadius:_moderateScale(2), backgroundColor:Color.BG_GREY_OPACITY_7, marginVertical:_moderateScale(2)}}/>
                            <View style={{width:_moderateScale(4),height:_moderateScale(4),borderRadius:_moderateScale(2), backgroundColor:Color.BG_GREY_OPACITY_7}}/>
                        </View>


                    </View>

                </TouchableOpacity>
            </View>

            {
                infoCurrRoomChattingRedux?.type == "videoCallRequest" ?
                    <>
                        {
                            isEmpty(infoCurrRoomChattingRedux?.assignedUsers) ?
                                <View style={{ backgroundColor: Color.WHITE, paddingVertical: _moderateScale(8), paddingHorizontal: _moderateScale(8 * 2) }}>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), fontStyle: 'italic', color: Color.GREY }}>
                                        Hiện chưa có bác sĩ đảm nhận cuộc hẹn này
                                </Text>
                                </View>
                                :
                                <></>
                        }
                    </>
                    :
                    <>
                    </>
            }

        </>
    );
});



const styles = StyleSheet.create({
    header: {
        width: _width,
        height: _moderateScale(50),
        backgroundColor: Color.WHITE,
        zIndex: 1,
        borderBottomWidth: _moderateScale(0.5),
        borderBottomColor: Color.BG_GREY_OPACITY_5
    },
    avatar: {
        width: _moderateScale(40),
        height: _moderateScale(40),
        borderRadius: _moderateScale(20),
        // borderColor: Color.BG_GREY_OPACITY
    },
    dot: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(4),
        top: _moderateScale(1)
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3
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
        Color.BASE_COLOR,
        'rgba(104, 47, 144,.4)'
    ]
}



export default Header;