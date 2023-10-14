import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// REDUX 
import { useDispatch, useSelector } from "react-redux";
import FastImage from '../../Components/Image/FastImage';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { _substringMaxValue } from '../../Constant/Utils';
import Avatar from '../User/Avatar';



const ItemMessage = (props => {

    const membersRedux = useSelector(state => state.membersReducer)
    const infoUserRedux = useSelector(state => state.infoUserReducer)
    const messageRedux = useSelector(state => state.messageReducer)

    const dispatch = useDispatch()
    const [infoUsersOther, setInfoUsersOther] = useState([])

    useEffect(() => {
        // console.log({ x: props.data }); 

        // let memberOther = props.data.receiverProfileArr.filter((itemFilter, index) => {
        //     return index !== (props.data.receiverIdArr.findIndex(item => item == infoUserRedux.infoUser.userId))
        // })

        let memberOthers = [];
        if (props?.data?.receiverChatArr.length == 2) {
            memberOthers = props?.data?.receiverChatArr?.filter((itemFilter, index) => {
                // return index !== (props.data.receiverIdArr.findIndex(item => item == infoUserRedux.infoUser._id))
                return itemFilter._id == infoUserRedux.infoUser._id
            })
        } else {
            memberOthers = props.data.receiverChatArr
        }
        // console.log({ memberOthers });
        // memberOthers = memberOthers.filter(itemMap => {
        //     let flag = props?.data?.groupChat?.memberArr.find(itemFind => itemFind.userId == itemMap._id)
        //     if (flag) {
        //         return true
        //     } else {
        //         return false
        //     }
        // })

        // console.log({ memberOthers });


        setInfoUsersOther(memberOthers)
    }, [])

    useEffect(() => {
        let memberOthers = [];
        if (props?.data?.receiverChatArr?.length == 2) {
            memberOthers = props?.data?.receiverChatArr?.filter((itemFilter, index) => {
                return index !== (props?.data?.receiverIdArr?.findIndex(item => item == infoUserRedux.infoUser._id))
            })
        } else {
            memberOthers = props?.data?.receiverChatArr
        }
        // memberOthers = memberOthers.filter(itemMap => {
        //     let flag = props?.data?.groupChat?.memberArr.find(itemFind => itemFind.userId == itemMap._id)
        //     if (flag) {
        //         return true
        //     } else {
        //         return false
        //     }
        // })
        setInfoUsersOther(memberOthers)
    }, [messageRedux.listNewMessages])


    return (
        <TouchableOpacity
            onPress={() => {
                props.navigateToChatting()
                // navigation.navigate(ScreenKey.CHATTING, props.data)
                // console.log({ dataItemChat: props.data });
            }}
            style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2.5) }]}>
            <View style={{ marginHorizontal: _moderateScale(24) }}>
                {
                    !isEmpty(props?.data) && props?.data?.groupChat?.type == 'single' ?
                        <Avatar
                            // url={infoUsersOther[0]?.profile?.fileAvatar?.link}
                            url={
                                props?.data?.receiverChatArr?.find(itemFind => !itemFind._id.includes(infoUserRedux.infoUser._id))?.profile?.fileAvatar?.link
                            }
                            isOnline={isArray(membersRedux?.listUserOnline) && !isEmpty(membersRedux.listUserOnline) && membersRedux.listUserOnline.find(item => item == props?.data?.receiverChatArr?.find(itemFind => !itemFind._id.includes(infoUserRedux.infoUser._id))?._id)}
                            name={props?.data?.receiverChatArr?.find(itemFind => !itemFind._id.includes(infoUserRedux.infoUser._id))?.profile?.lastName}
                            notName />
                        :
                        <>
                        </>
                }
                {
                    !isEmpty(props?.data) && props?.data?.groupChat?.type == 'multiple' ?
                        <View style={{ justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', width: _widthScale(60) }}>
                            {
                                props?.data?.receiverChatArr?.map((item, index) => {

                                    if (index > 3) return
                                    if (index > 2) {
                                        return (
                                            <View key={index} style={{
                                                width: _moderateScale(24),
                                                height: _moderateScale(24),
                                                borderRadius: _moderateScale(12),
                                                overflow: 'hidden',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <LinearGradient
                                                    start={{ x: 0, y: 1 }}
                                                    end={{ x: 1, y: 1 }}
                                                    colors={gradient.color}
                                                    style={gradient.container}>
                                                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(12), color: Color.WHITE }]}>
                                                        {`+${props?.data?.receiverChatArr.length - 3}`}
                                                    </Text>
                                                </LinearGradient>
                                            </View>
                                        )
                                    }
                                    return (
                                        <FastImage key={index} style={[{
                                            width: _moderateScale(24),
                                            height: _moderateScale(24),
                                            borderRadius: _moderateScale(12)
                                        }]}
                                            uri={item?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${item?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                        />
                                    )
                                })
                            }
                        </View>
                        :
                        <>
                        </>
                }
                {/* {
                    isArray(infoUsersOther) && infoUsersOther.length > 1 ?
                        <View style={{ justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', width: _widthScale(60) }}>
                            {
                                infoUsersOther.map((item, index) => {

                                    if (index > 3) return
                                    if (index > 2) {
                                        return (
                                            <View key={index} style={{
                                                width: _moderateScale(24),
                                                height: _moderateScale(24),
                                                borderRadius: _moderateScale(12),
                                                overflow: 'hidden',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <LinearGradient
                                                    start={{ x: 0, y: 1 }}
                                                    end={{ x: 1, y: 1 }}
                                                    colors={gradient.color}
                                                    style={gradient.container}>
                                                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(12), color: Color.WHITE }]}>
                                                        {`+${infoUsersOther.length - 3}`}
                                                    </Text>
                                                </LinearGradient>
                                            </View>
                                        )
                                    }
                                    return (
                                        <Image key={index} style={{
                                            width: _moderateScale(24),
                                            height: _moderateScale(24),
                                            borderRadius: _moderateScale(12)
                                        }}
                                            source={{ uri: item?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${item?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                                        />
                                    )
                                })
                            }
                        </View>
                        :
                        <Avatar url={infoUsersOther[0]?.profile?.fileAvatar?.link}
                            isOnline={isArray(membersRedux.listUserOnline) && !isEmpty(membersRedux.listUserOnline) && membersRedux.listUserOnline.find(item => item == infoUsersOther[0]?._id)}
                            name={infoUsersOther[0]?.lastName}
                            notName />
                } */}
            </View>
            <View style={{ flex: 1, paddingRight: _moderateScale(16) }}>
                <View style={[styleElement.rowAliCenter]}>
                    {
                        props?.data?.groupChat?.type == 'multiple' ?
                            <Text
                                style={[stylesFont.fontNolan500, { flex: 1, marginRight: _moderateScale(16), fontSize: _moderateScale(15), color: Color.GREY }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(15), color: Color.BLACK }]]}
                                numberOfLines={1}>
                                {
                                    props?.data?.groupChat?.name
                                }
                            </Text>
                            :
                            <Text
                                style={[stylesFont.fontNolan500, { flex: 1, marginRight: _moderateScale(16), fontSize: _moderateScale(15), color: Color.GREY }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(15), color: Color.BLACK }]]}
                                numberOfLines={1}>
                                {
                                    // infoUsersOther.map((item, index) => {
                                    //     if (index == infoUsersOther.length - 1) {
                                    //         return `${item.profile.firstName} ${item.profile.lastName}`
                                    //     }
                                    // })
                                    `${props?.data?.receiverChatArr?.find(itemFind => !itemFind._id.includes(infoUserRedux.infoUser._id))?.profile?.firstName} ${props?.data?.receiverChatArr?.find(itemFind => !itemFind._id.includes(infoUserRedux.infoUser._id))?.profile?.lastName}`
                                }
                            </Text>
                    }
                    <Text style={[stylesFont.fontNolan, { color: Color.GREY, fontSize: _moderateScale(11) }, !props.isSeen && [stylesFont.fontNolanBold, { color: Color.BLACK }]]}>
                        {
                            moment(props?.data?.created).startOf('minute').fromNow()
                            // moment(new Date('2021-02-25T09:27:45.278Z')).format('MMMM Do YYYY, h:mm:ss a')
                            // moment().format('MMMM Do YYYY, h:mm:ss a')
                        }
                    </Text>
                </View>
                <View style={{ height: _moderateScale(4) }} />
                <View style>
                    {
                        console.log({xx: props?.data})
                        
                    }
                    {
                        props?.data?.isActive ?
                            <>
                                {
                                    props.data.type === "text" ?
                                        <Text
                                            style={[stylesFont.fontNolan500, {
                                                fontSize: _moderateScale(12),
                                                color: Color.GREY
                                            }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(12), color: Color.BLACK }]]}
                                            numberOfLines={1}>
                                            {_substringMaxValue(props?.data?.content, '', 200, '')}
                                        </Text>
                                        :
                                        <>
                                        </>
                                }

                                {
                                    props.data.type === "image" ?
                                        <Text
                                            style={[stylesFont.fontNolan500, {
                                                fontSize: _moderateScale(12),
                                                color: Color.GREY
                                            }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(12), color: Color.BLACK }]]}
                                            numberOfLines={1}>
                                            [Hình ảnh]
                                        </Text>
                                        :
                                        <>
                                        </>
                                }

                                {
                                    props.data.type === "document" ?
                                        <Text
                                            style={[stylesFont.fontNolan500, {
                                                fontSize: _moderateScale(12),
                                                color: Color.GREY
                                            }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(12), color: Color.BLACK }]]}
                                            numberOfLines={1}>
                                            [Tệp tin]
                                        </Text>
                                        :
                                        <>
                                        </>
                                }
                            </>
                            :
                            <>
                                <Text
                                    style={[stylesFont.fontNolan500, {
                                        fontSize: _moderateScale(12),
                                        color: Color.GREY
                                    }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(12), color: Color.BLACK }]]}
                                    numberOfLines={1}>
                                    [Tin nhắn thu hồi]
                                    </Text>
                            </>
                    }


                    {/* <Text
                        style={[stylesFont.fontNolan500, {
                            fontSize: _moderateScale(12),
                            color: Color.GREY
                        }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(12), color: Color.BLACK }]]}
                        numberOfLines={1}>
                        {
                            props.data.type === "text" ?
                                _substringMaxValue(props?.data?.content, '', 200, '')
                                :
                                `[Hình ảnh]`
                        }
                    </Text> */}
                </View>
            </View>
        </TouchableOpacity>
    );
})

const styles = StyleSheet.create({

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


export default memo(ItemMessage);