import { isEmpty } from 'lodash';
import React, { memo } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// REDUX
import { useSelector } from "react-redux";
import FastImage from '../../../Components/Image/FastImage';
import * as Color from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import * as ActionType from "../../../Redux/Constants/ActionType";
import Store from "../../../Redux/store";
// CALL API
import { _removeMemberInGroupChat } from '../../../Services/api';
import { handleApi } from '../../../Services/utils';












const MemberManagement = memo((props) => {

    const currChattingRedux = useSelector(state => state?.messageReducer?.currChatting)
    const infoUserRedux = useSelector(state => state.infoUserReducer.infoUser)
    const listUserOnlineRedux = useSelector(state => state.membersReducer?.listUserOnline)


    const _handleRemoveMemberInGroupChat = (item) => {
        console.log({ itemForRemove: item });
        Alert.alert(
            "Xác nhận",
            `Xác nhận xoá ${item.employeeId.lastName} khỏi nhóm ${currChattingRedux?.name}`,
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: async () => {
                        let resultRemoveMemberInGroupChat = await handleApi(_removeMemberInGroupChat({
                            groupCode: currChattingRedux?.code,
                            userIds: [
                                item.userId._id
                            ]
                        }))
                        // console.log({ resultRemoveMemberInGroupChat });
                        if (resultRemoveMemberInGroupChat.error) return alert(resultRemoveMemberInGroupChat.message)

                        Store.dispatch({
                            type: ActionType.REMOVE_MEMBERS_CURR_CHATTING,
                            payload: {
                                data: item.userId._id
                            }
                        })

                        // console.log({ memConver: infoChattingRoom.membersInConversation });

                        // let tempMembersInConversation = [...infoChattingRoom.membersInConversation].filter(itemFilter => {
                        //     return itemFilter.userId._id !== item.userId._id
                        // });
                        // console.log({ tempMembersInConversation });

                        // setInfoChattingRoom((pre) => ({
                        //     ...pre,
                        //     membersInConversation: tempMembersInConversation
                        // }))
                        // props.route.params.setStateListMember(tempMembersInConversation)
                    }
                }
            ],
            { cancelable: false }
        );
    }


    return (
        <View style={{ flex: 1, marginTop: _moderateScale(8 * 2) }}>
            <Text style={[stylesFont.fontNolan, { textTransform: 'uppercase', fontSize: _moderateScale(14), color: Color.BG_GREY_OPACITY_7, marginLeft: _moderateScale(16), marginBottom: _heightScale(8) }]}>
                THÔNG TIN VỀ NHÓM
                    </Text>

            <View style={[styleElement.rowAliCenter]}>
                <View style={[{
                    height: _moderateScale(40),
                    marginHorizontal: _moderateScale(16),
                    justifyContent: 'center',
                }]}>
                    <Image
                        style={sizeIcon.llg}
                        source={require('../../../Icon/members.png')} />
                </View>
                <Text style={[stylesFont.fontNolan, styles.options__title]}>
                    Danh sách thành viên
                        </Text>
            </View>

            <View style={{ flex: 1 }}>
                {
                    !isEmpty(currChattingRedux?.memberArr) ?
                        <>
                            {
                                currChattingRedux?.memberArr?.map((item, index) => {
                                    return (
                                        <View key={`${item?.userId?._id}`} style={[styleElement.rowAliCenter, {marginBottom: _moderateScale(8) }]}>
                                            <View style={{
                                                width: _moderateScale(8 * 5),
                                                height: _moderateScale(8 * 5),
                                                marginHorizontal: _moderateScale(12),
                                            }}>
                                                <FastImage
                                                    style={[styles.avatarMemberList]}
                                                    uri={
                                                        item?.employeeId?.fileAvatar?.link ?
                                                            `${URL_ORIGINAL}${item?.employeeId?.fileAvatar?.link}`
                                                            :
                                                            URL_AVATAR_DEFAULT
                                                    } />
                                                {
                                                    !isEmpty(listUserOnlineRedux) && listUserOnlineRedux.find(itemFind => itemFind == item?.userId?._id) ?
                                                        <View style={{ position: 'absolute', zIndex: 1, bottom: _moderateScale(-2), right: _moderateScale(-2), width: _moderateScale(8 * 1.75), height: _moderateScale(8 * 1.75), borderWidth: _moderateScale(2), borderColor: Color.WHITE, borderRadius: _moderateScale(9), backgroundColor: Color.ONLINE }} />
                                                        :
                                                        <>
                                                        </>
                                                }
                                            </View>
                                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), flex: 1 }]}>
                                                {
                                                    `${item.employeeId.firstName} ${item.employeeId.lastName}`
                                                }
                                            </Text>
                                            {
                                                currChattingRedux?.type == 'multiple' && currChattingRedux?.memberArr?.find(itemFind => itemFind.userId._id == infoUserRedux._id)?.isMain == true ?
                                                    <>
                                                        {
                                                            item.userId._id == infoUserRedux._id ?
                                                                <>
                                                                </>
                                                                :
                                                                <TouchableOpacity
                                                                    onPress={() => _handleRemoveMemberInGroupChat(item)}
                                                                    style={styles.btnRemoveMember}>
                                                                    <Text style={[stylesFont.fontNolan, styles.btnRemoveMember__text]}>
                                                                        Xoá
                                                                    </Text>
                                                                </TouchableOpacity>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                            }

                                        </View>
                                    )
                                })
                            }
                        </>
                        :
                        <>
                        </>
                }
                <View style={{ height: _moderateScale(8 * 5) }} />
            </View>
        </View>
    );
});



const styles = StyleSheet.create({
    btnRemoveMember__text: {
        fontSize: _moderateScale(12)
    },
    btnRemoveMember: {
        marginHorizontal: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 1.5),
        backgroundColor: Color.BG_GREY_OPACITY_5,
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8)
    },
    avatarMemberList: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5 / 2),
    },
    options__title: {
        color: Color.GREY_FOR_TITLE,
        fontSize: _moderateScale(14),
        flex: 1
    },
})

export default MemberManagement;