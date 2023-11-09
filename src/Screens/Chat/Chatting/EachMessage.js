import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import FileViewer from "react-native-file-viewer";
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';
import FastImage from '../../../Components/Image/FastImage';
import * as Color from '../../../Constant/Color';
import { BG_GREY_OPACITY_5, GREY_FOR_TITLE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../../Constant/Url';



const EachMessage = memo((props) => {



    // console.log({ itemMesasge: props });
    const infoUserRedux = useSelector(state => state.infoUserReducer.infoUser)
    const currChattingRedux = useSelector(state => state?.messageReducer?.currChatting)
    const currRoomChattingRedux = useSelector(state => state?.messageReducer?.currRoomChatting)


    const [isDownloading, setIsDownloading] = useState(false)





    let { item: infoMessage } = props;

    useEffect(() => {
    }, [])

    const _renderTypeMessage = (content) => {

        var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        var regex = new RegExp(expression);
        var url = content;
        url.match(regex) ? true : false

        if (url.match(regex)) {
            return (
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        Linking.openURL(infoMessage?.content)
                    }}>
                    <Text selectable={true} style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.SENDER_COLOR_TEXT, textDecorationLine: 'underline' }]}>
                        {
                            infoMessage?.content
                        }
                    </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <Text selectable={true} style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.SENDER_COLOR_TEXT }]}>
                    {
                        infoMessage?.content
                    }
                </Text>
            )
        }

        // return url.match(regex) ? true : false;


    }

    return (
        <View>

            {
                infoMessage?.isSystemNotification ?
                    <>
                        <View style={styles.systemMessage}>
                            <Text style={[stylesFont.fontNolan500, styles.systemMessage__content]}>
                                {
                                    infoMessage?.content
                                }
                            </Text>
                        </View>
                    </>
                    :
                    <>
                    </>
            }


            {
                !moment(currRoomChattingRedux?.messages[props?.index]?.created).isSame(currRoomChattingRedux?.messages[props?.index + 1]?.created, 'day') ?
                    <Text style={[stylesFont.fontNolan500, { color: Color.GREY_FOR_TITLE, fontSize: _moderateScale(14), alignSelf: 'center', marginVertical: _moderateScale(8 * 3) }]}>
                        {moment(currRoomChattingRedux?.messages[props?.index]?.created).format("LL")}
                    </Text>
                    :
                    <>
                    </>
            }

            {/* SENDER */}
            {
                !infoMessage?.isSystemNotification && infoMessage?.senderId == infoUserRedux._id && infoMessage?.type != 'chatgpt' ?
                    <>
                        <View style={[
                            { justifyContent: 'flex-end', paddingRight: _widthScale(16), width: _width, marginBottom: _heightScale(4) },
                            // messages[index + 1]?.id && item.id !== messages[index + 1].id && { marginTop: _heightScale(8 * 5) },

                            currRoomChattingRedux?.messages[props?.index + 1]?.senderId && infoMessage?.senderId !== currRoomChattingRedux?.messages[props?.index + 1].senderId && { marginTop: _heightScale(8 * 2) }
                            // index == 0 && { marginBottom: 40 }
                        ]
                        }>
                            <View style={[{ alignSelf: 'flex-end' }]}>
                                {/* {
                                    infoMessage?.type == 'video' ?

                                        // <Video
                                        //     resizeMode={'cover'}
                                        //     source={{ uri: `${URL_ORIGINAL}${infoMessage?.videos[0]?.link}` }}
                                        //     style={{ width: _widthScale(250), height: _heightScale(8 * 50) ,borderRadius: _moderateScale(10),}}
                                        //     controls={false}
                                        // />
                                        <>
                                            <TouchableOpacity onPress={() => {
                                                VideoRef.current.presentFullscreenPlayer()
                                            }}>
                                                <Text>full</Text>
                                            </TouchableOpacity>
                                            <Video
                                                ref={VideoRef}
                                                source={{ uri: `${URL_ORIGINAL}${infoMessage?.videos[0]?.link}` }}
                                                style={{
                                                    width: _widthScale(250),
                                                    height: _heightScale(8 * 50),
                                                    borderRadius: _moderateScale(10),
                                                    backgroundColor: BG_GREY_OPACITY_5
                                                }}
                                                posterResizeMode={'cover'}
                                                resizeMode={'cover'} 
                                                repeat={false}
                                                controls={Platform.OS == 'ios' ? true : true}
                                                paused={false}
                                                onLoadStart={() => setLoading(true)}
                                                onPlaybackResume={() => setLoading(false)}
                                                onPlaybackStalled={() => setLoading(true)}
                                            />
                                        </>
                                        :
                                        <>
                                        </>
                                } */}
                                {
                                    infoMessage?.type == 'image' ?
                                        <>
                                            {
                                                infoMessage?.isActive ?

                                                    <View style={styles.imagesWrap}>
                                                        {
                                                            infoMessage?.images?.length == 1 ?
                                                                <>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            props.setListImagesSeeCurr(infoMessage?.images, 0)
                                                                            // setShowListImagesSee(true)
                                                                        }}
                                                                        // onLongPress={() => {
                                                                        //     props?.setCurrMessageForRemove(infoMessage)
                                                                        //     props?.setIsShowModalRemoveMessage(true)
                                                                        // }}
                                                                        activeOpacity={.8}
                                                                        style={{
                                                                            width: _widthScale(250),
                                                                        }}>
                                                                        <FastImage
                                                                            style={[{ width: '100%', height: _heightScale(8 * 50) }]}
                                                                            uri={`${URL_ORIGINAL}${infoMessage.images[0].link}`}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                        {
                                                            infoMessage?.images?.length > 1 ?
                                                                <>
                                                                    {
                                                                        infoMessage?.images?.map((itemChild, index) => {
                                                                            return (
                                                                                <>
                                                                                    <TouchableOpacity
                                                                                        // onLongPress={() => {
                                                                                        //     props?.setCurrMessageForRemove(infoMessage)
                                                                                        //     props?.setIsShowModalRemoveMessage(true)
                                                                                        // }}
                                                                                        onPress={() => {
                                                                                            props.setListImagesSeeCurr(infoMessage?.images, index)
                                                                                            // setShowListImagesSee(true)
                                                                                        }}
                                                                                        key={index}
                                                                                        // onPress={() => {
                                                                                        //     _clickImage(item)
                                                                                        // }}
                                                                                        activeOpacity={.8}
                                                                                        style={{
                                                                                            width: infoMessage?.images?.length > 3 ? _widthScale(250) / 3 : _widthScale(250) / infoMessage.images.length,
                                                                                            height: infoMessage?.images?.length > 3 ? _widthScale(230) / 3 : _widthScale(230) / infoMessage.images.length,
                                                                                            // marginLeft:_moderateScale(4),
                                                                                            // marginLeft:_moderateScale(2)
                                                                                            borderWidth: _moderateScale(1),
                                                                                            borderColor: '#fff'
                                                                                        }}>
                                                                                        <FastImage
                                                                                            // style={{ width: 30, height:undefined }}
                                                                                            // resizeMode="contain"
                                                                                            style={[{ width: '100%', height: '100%' }]}
                                                                                            // source={{ uri: `${itemChild.uri}` }}
                                                                                            uri={`${URL_ORIGINAL}${itemChild.link}`}
                                                                                        />

                                                                                    </TouchableOpacity>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </View>

                                                    :

                                                    <TouchableOpacity
                                                        disabled={infoMessage?.isActive == true ? false : true}
                                                        style={[styles.message__content, { backgroundColor: Color.SENDER_BG, borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5 }
                                                        ]}>

                                                        <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                            {
                                                                "Tin nhắn đã thu hồi"
                                                            }
                                                        </Text>


                                                        <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                            {
                                                                moment(infoMessage.created).format('LT')
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                            }

                                        </>
                                        :
                                        <>
                                        </>
                                }

                                {
                                    infoMessage?.type == 'text' ?
                                        <>
                                            <View
                                                disabled={infoMessage?.isActive == true ? false : true}
                                                style={[styles.message__content, { backgroundColor: Color.SENDER_BG, borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5 }
                                                    // , infoMessage?.isActive == false && { backgroundColor: 'transparent' }
                                                ]}>

                                                {
                                                    infoMessage?.isActive ?

                                                        _renderTypeMessage(infoMessage?.content)

                                                        // <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.SENDER_COLOR_TEXT }]}>
                                                        //     {
                                                        //         infoMessage?.content
                                                        //     }
                                                        // </Text>
                                                        :
                                                        <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                            {
                                                                "Tin nhắn đã thu hồi"
                                                            }
                                                        </Text>
                                                }


                                                <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                    {
                                                        moment(infoMessage.created).format('LT')
                                                    }
                                                </Text>
                                            </View>
                                        </>
                                        :
                                        <>
                                        </>
                                }

                                {
                                    infoMessage?.type == 'chatgpt' ?
                                        <>
                                            <View
                                                disabled={infoMessage?.isActive == true ? false : true}
                                                style={[styles.message__content, { backgroundColor: Color.SENDER_BG, borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5 }
                                                    // , infoMessage?.isActive == false && { backgroundColor: 'transparent' }
                                                ]}>

                                                {
                                                    infoMessage?.isActive ?

                                                        _renderTypeMessage(infoMessage?.content)

                                                        // <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.SENDER_COLOR_TEXT }]}>
                                                        //     {
                                                        //         infoMessage?.content
                                                        //     }
                                                        // </Text>
                                                        :
                                                        <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                            {
                                                                "Tin nhắn đã thu hồi"
                                                            }
                                                        </Text>
                                                }


                                                <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                    {
                                                        moment(infoMessage.created).format('LT')
                                                    }
                                                </Text>
                                            </View>
                                        </>
                                        :
                                        <>
                                        </>
                                }

                                {
                                    infoMessage?.type == 'video' ?
                                        <>
                                            {
                                                infoMessage?.isActive ?
                                                    <TouchableOpacity
                                                        // onLongPress={() => {
                                                        //     props?.setCurrMessageForRemove(infoMessage)
                                                        //     props?.setIsShowModalRemoveMessage(true)
                                                        // }}
                                                        style={[styleElement.rowAliCenter]} onPress={async () => {
                                                            // await FileViewer.open(`${URL_ORIGINAL}${infoMessage?.documents[0]?.link}`);
                                                            setIsDownloading(true)
                                                            RNFS.downloadFile({
                                                                fromUrl: `${URL_ORIGINAL}${infoMessage?.videos[0]?.link}`,
                                                                toFile: `${RNFS.DocumentDirectoryPath}/${infoMessage?.videos[0]?.originalName}`
                                                            }).promise
                                                                .then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/${infoMessage?.videos[0]?.originalName}`))
                                                                .then(() => {
                                                                    // success 
                                                                    setIsDownloading(false)
                                                                })
                                                                .catch(error => {
                                                                    setIsDownloading(false)
                                                                    // error
                                                                });
                                                        }}>

                                                        <View style={{
                                                            width: _moderateScale(8 * 4),
                                                            height: _moderateScale(8 * 4),
                                                            borderRadius: _moderateScale(8 * 2),
                                                            backgroundColor: Color.SENDER_BG,
                                                            borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}>
                                                            {
                                                                isDownloading ?
                                                                    <ActivityIndicator color={Color.GREY} />
                                                                    :
                                                                    <Image
                                                                        style={sizeIcon.xxs}
                                                                        source={require('../../../Icon/download_black.png')} />
                                                            }
                                                            {/* <Image
                                                       style={sizeIcon.xxs}
                                                       source={require('../../../Icon/download_black.png')} /> */}
                                                        </View>

                                                        <View style={[styles.message__content, { backgroundColor: Color.SENDER_BG, borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5 }]}>
                                                            <View>
                                                                <Text style={[stylesFont.fontNolan500, styles.message__content__text, { textDecorationLine: 'underline', color: Color.SENDER_COLOR_TEXT }]}>
                                                                    {
                                                                        infoMessage?.videos[0]?.originalName
                                                                    }
                                                                </Text>
                                                                <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                                    {
                                                                        moment(infoMessage.created).format('LT')
                                                                    }
                                                                </Text>

                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity
                                                        disabled={infoMessage?.isActive == true ? false : true}
                                                        style={[styles.message__content, { backgroundColor: Color.SENDER_BG, borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5 }
                                                        ]}>

                                                        <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                            {
                                                                "Tin nhắn đã thu hồi"
                                                            }
                                                        </Text>


                                                        <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                            {
                                                                moment(infoMessage.created).format('LT')
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                            }

                                        </>
                                        :
                                        <>
                                        </>
                                }
                                {
                                    infoMessage?.type == 'document' ?
                                        <>
                                            {
                                                infoMessage?.isActive ?
                                                    <TouchableOpacity
                                                        // onLongPress={() => {
                                                        //     props?.setCurrMessageForRemove(infoMessage)
                                                        //     props?.setIsShowModalRemoveMessage(true)
                                                        // }}
                                                        style={[styleElement.rowAliCenter]} onPress={async () => {
                                                            // await FileViewer.open(`${URL_ORIGINAL}${infoMessage?.documents[0]?.link}`);
                                                            setIsDownloading(true)
                                                            RNFS.downloadFile({
                                                                fromUrl: `${URL_ORIGINAL}${infoMessage?.documents[0]?.link}`,
                                                                toFile: `${RNFS.DocumentDirectoryPath}/${infoMessage?.documents[0]?.originalName}`
                                                            }).promise
                                                                .then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/${infoMessage?.documents[0]?.originalName}`))
                                                                .then(() => {
                                                                    // success 
                                                                    setIsDownloading(false)
                                                                })
                                                                .catch(error => {
                                                                    setIsDownloading(false)
                                                                    // error
                                                                });
                                                        }}>

                                                        <View style={{
                                                            width: _moderateScale(8 * 4),
                                                            height: _moderateScale(8 * 4),
                                                            borderRadius: _moderateScale(8 * 2),
                                                            backgroundColor: Color.SENDER_BG,
                                                            borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}>
                                                            {
                                                                isDownloading ?
                                                                    <ActivityIndicator color={Color.GREY} />
                                                                    :
                                                                    <Image
                                                                        style={sizeIcon.xxs}
                                                                        source={require('../../../Icon/download_black.png')} />
                                                            }
                                                            {/* <Image
                                                            style={sizeIcon.xxs}
                                                            source={require('../../../Icon/download_black.png')} /> */}
                                                        </View>

                                                        <View style={[styles.message__content, { backgroundColor: Color.SENDER_BG, borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5 }]}>
                                                            <View>
                                                                <Text style={[stylesFont.fontNolan500, styles.message__content__text, { textDecorationLine: 'underline', color: Color.SENDER_COLOR_TEXT }]}>
                                                                    {
                                                                        infoMessage?.documents[0]?.originalName
                                                                    }
                                                                </Text>
                                                                <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                                    {
                                                                        moment(infoMessage.created).format('LT')
                                                                    }
                                                                </Text>

                                                            </View>

                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity
                                                        disabled={infoMessage?.isActive == true ? false : true}
                                                        style={[styles.message__content, { backgroundColor: Color.SENDER_BG, borderWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5 }
                                                        ]}>

                                                        <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                            {
                                                                "Tin nhắn đã thu hồi"
                                                            }
                                                        </Text>


                                                        <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                            {
                                                                moment(infoMessage.created).format('LT')
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                            }

                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </View>
                            <View style={{ alignItems: 'flex-end', flexDirection: 'row', alignSelf: 'flex-end' }}>
                                {
                                    props.index == 0 &&
                                    <>
                                        {
                                            !isEmpty(props?.item?.viewerUserIdArr.filter(itemFilter => itemFilter !== infoUserRedux._id)) ?
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        // props.setCurrFocusMessage(infoMessage.viewerChatArr.filter(itemFilter => itemFilter._id !== infoUserRedux._id))
                                                        // props.setIsModalListUserHasSeenMessage(true)
                                                    }}
                                                    style={styles.btnSeen}>
                                                    <Image style={sizeIcon.xxs} source={require('../../../Icon/doubleTick_white.png')} />
                                                    <Text style={[stylesFont.fontNolan500, { marginLeft: _moderateScale(4), fontSize: _moderateScale(12), color: Color.WHITE }]}>
                                                        Đã xem
                                                    </Text>

                                                </TouchableOpacity>
                                                :
                                                <View style={styles.btnSendDone}>
                                                    <Image style={sizeIcon.xxs} source={require('../../../Icon/doubleTick_white.png')} />
                                                    <Text style={[stylesFont.fontNolan500, { marginLeft: _moderateScale(4), fontSize: _moderateScale(12), color: Color.WHITE }]}>
                                                        Đã gửi
                                                    </Text>
                                                </View>
                                        }
                                    </>
                                }

                            </View>
                        </View >
                    </>
                    :
                    <>
                    </>
            }



            {/* RECEIVER */}
            {
                (!infoMessage?.isSystemNotification && infoMessage?.senderId !== infoUserRedux._id) || (infoMessage?.senderId == infoUserRedux._id && infoMessage?.type == "chatgpt") ?
                    <>
                        <View style={[styles.message, { marginLeft: _widthScale(8) }, currRoomChattingRedux?.messages[props?.index + 1]?.senderId && infoMessage?.senderId !== currRoomChattingRedux?.messages[props?.index + 1]?.senderId && { marginTop: _heightScale(8 * 2) }, props?.index == 0 && { marginBottom: _heightScale(40) }]}>

                            {
                                (currRoomChattingRedux?.messages[props?.index + 1]?.senderId && infoMessage?.senderId !== currRoomChattingRedux?.messages[props?.index + 1]?.senderId) 
                                || (infoMessage?.type !== "chatgpt" && currRoomChattingRedux?.messages[props?.index + 1]?.type === "chatgpt") 
                                || (infoMessage?.type === "chatgpt" && currRoomChattingRedux?.messages[props?.index + 1]?.type !== "chatgpt") ?
                                    <>
                                        {
                                            currRoomChattingRedux?.infoCurrRoomChatting?.assignedUsers?.find(itemFind => itemFind?.userId == infoMessage?.senderId)?.name ?
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: Color.BLACK_OPACITY_8, marginBottom: _moderateScale(4) }]}>
                                                    {currRoomChattingRedux?.infoCurrRoomChatting?.assignedUsers?.find(itemFind => itemFind?.userId == infoMessage?.senderId)?.name}
                                                </Text>
                                                :
                                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: Color.BLACK_OPACITY_8, marginBottom: _moderateScale(4) }]}>
                                                    
                                                </Text>
                                        }

                                    </>
                                    : <></>
                            }
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    (currRoomChattingRedux?.messages[props?.index + 1]?.senderId && infoMessage?.senderId !== currRoomChattingRedux?.messages[props?.index + 1]?.senderId) 
                                    || (infoMessage?.type !== "chatgpt" && currRoomChattingRedux?.messages[props?.index + 1]?.type === "chatgpt") 
                                    || (infoMessage?.type === "chatgpt" && currRoomChattingRedux?.messages[props?.index + 1]?.type !== "chatgpt") ?
                                        <View style={{
                                            width: _moderateScale(30),
                                            height: _moderateScale(30),
                                        }}>
                                            {
                                                currRoomChattingRedux?.infoCurrRoomChatting?.assignedUsers?.find(itemFind => itemFind?.userId == infoMessage?.senderId) ?
                                                    infoMessage.type == "chatgpt" ?
                                                        <Image 
                                                            style={[styles.avatarSm]}
                                                            source={require('../../../../src/Icon/a_timeline.png')}
                                                        /> 
                                                        :
                                                        <Image
                                                            style={styles.avatarSm}
                                                            source={{ uri: `${URL_ORIGINAL}${currRoomChattingRedux?.infoCurrRoomChatting?.assignedUsers?.find(itemFind => itemFind?.userId == infoMessage?.senderId)?.profile?.fileAvatar?.link}` }}
                                                        />
                                                    :
                                                    infoMessage.type == "chatgpt" ?
                                                        <Image 
                                                            style={[styles.avatarSm]}
                                                            source={require('../../../../src/Icon/a_timeline.png')}
                                                        /> 
                                                        :
                                                        <Image
                                                            style={[styles.avatarSm]}
                                                            source={{ uri: infoMessage?.senderChat?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${infoMessage?.senderChat?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                                                        />
                                            }
                                            {/* <Image
                                            style={styles.avatarSm}
                                            source={{ uri: infoMessage?.senderChat?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${infoMessage?.senderChat?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                                        /> */}
                                            {
                                                props.isOnline ?
                                                    <View style={{ position: 'absolute', zIndex: 1, bottom: _moderateScale(-2), right: _moderateScale(-2), width: _moderateScale(8 * 1.75), height: _moderateScale(8 * 1.75), borderWidth: _moderateScale(2), borderColor: Color.WHITE, borderRadius: _moderateScale(9), backgroundColor: Color.ONLINE }} />
                                                    :
                                                    <>
                                                    </>
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
                                                        {
                                                            infoMessage.type == "chatgpt" ?
                                                            <Image 
                                                                style={[styles.avatarSm]}
                                                                source={require('../../../../src/Icon/a_timeline.png')}
                                                            /> 
                                                            :
                                                            <Image
                                                                style={styles.avatarSm}
                                                                source={{ uri: infoMessage?.senderChat?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${infoMessage?.senderChat?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT }}
                                                            />
                                                        }
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
                                    infoMessage?.type == 'image' ?
                                        <>
                                            {
                                                infoMessage?.isActive ?

                                                    <View style={[styles.imagesWrap, { marginLeft: _widthScale(8), justifyContent: 'flex-start' }]}>
                                                        {
                                                            infoMessage?.images?.length == 1 ?
                                                                <>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            props.setListImagesSeeCurr(infoMessage?.images, 0)
                                                                            // setShowListImagesSee(true)
                                                                        }}
                                                                        activeOpacity={.8}
                                                                        style={{
                                                                            width: _widthScale(250),
                                                                        }}>
                                                                        <FastImage
                                                                            style={[{ width: '100%', height: _heightScale(8 * 50) }]}
                                                                            uri={`${URL_ORIGINAL}${infoMessage.images[0].link}`}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                        {
                                                            infoMessage?.images?.length > 1 ?
                                                                <>
                                                                    {
                                                                        infoMessage?.images?.map((itemChild, index) => {
                                                                            return (
                                                                                <>
                                                                                    <TouchableOpacity
                                                                                        onPress={() => {
                                                                                            props.setListImagesSeeCurr(infoMessage?.images, index)
                                                                                            // setShowListImagesSee(true)
                                                                                        }}
                                                                                        key={index}
                                                                                        // onPress={() => {
                                                                                        //     _clickImage(item)
                                                                                        // }}
                                                                                        activeOpacity={.8}
                                                                                        style={{
                                                                                            width: infoMessage?.images?.length > 3 ? _widthScale(250) / 3 : _widthScale(250) / infoMessage.images.length,
                                                                                            height: infoMessage?.images?.length > 3 ? _widthScale(230) / 3 : _widthScale(230) / infoMessage.images.length,
                                                                                            // marginLeft:_moderateScale(4),
                                                                                            // marginLeft:_moderateScale(2)
                                                                                            borderWidth: _moderateScale(1),
                                                                                            borderColor: '#fff'
                                                                                        }}>
                                                                                        <FastImage
                                                                                            // style={{ width: 30, height:undefined }}
                                                                                            // resizeMode="contain"
                                                                                            style={[{ width: '100%', height: '100%' }]}
                                                                                            // source={{ uri: `${itemChild.uri}` }}
                                                                                            uri={`${URL_ORIGINAL}${itemChild.link}`}
                                                                                        />

                                                                                    </TouchableOpacity>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </View>

                                                    :

                                                    <View style={[styles.message__content, { backgroundColor: Color.RECEIVER_BG },]}>
                                                        {
                                                            infoMessage?.isActive ?
                                                                <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.SENDER_COLOR_TEXT }]}>
                                                                    {
                                                                        infoMessage?.content
                                                                    }
                                                                </Text>
                                                                :
                                                                <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                                    {
                                                                        "Tin nhắn đã thu hồi"
                                                                    }
                                                                </Text>
                                                        }
                                                        <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                            {
                                                                moment(infoMessage.created).format('LT')
                                                            }
                                                        </Text>
                                                    </View>
                                            }



                                        </>
                                        :
                                        <>
                                        </>
                                }

                                {
                                    infoMessage?.type == 'text' ?
                                        <>
                                            <View
                                                // onPress={() => {
                                                //     var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                                                //     var regex = new RegExp(expression);
                                                //     var url = infoMessage?.content;
                                                //     alert(url.match(regex) ? `true` : `false`)
                                                //     // return url.match(regex) ? true : false;
                                                // }}
                                                style={[styles.message__content, { backgroundColor: Color.RECEIVER_BG },]}>
                                                {/* <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.RECEIVER_COLOR_TEXT }]}>
                                                {
                                                    infoMessage?.content
                                                }

                                            </Text> */}
                                                {
                                                    infoMessage?.isActive ?
                                                        _renderTypeMessage(infoMessage?.content)
                                                        :
                                                        <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                            {
                                                                "Tin nhắn đã thu hồi"
                                                            }
                                                        </Text>
                                                }
                                                <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                    {
                                                        moment(infoMessage.created).format('LT')
                                                    }
                                                </Text>
                                            </View>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                                {
                                    infoMessage?.type == 'chatgpt' ?
                                        <>
                                            <View
                                                // onPress={() => {
                                                //     var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                                                //     var regex = new RegExp(expression);
                                                //     var url = infoMessage?.content;
                                                //     alert(url.match(regex) ? `true` : `false`)
                                                //     // return url.match(regex) ? true : false;
                                                // }}
                                                style={[styles.message__content, { backgroundColor: Color.RECEIVER_BG },]}>
                                                {/* <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.RECEIVER_COLOR_TEXT }]}>
                                                {
                                                    infoMessage?.content
                                                }

                                            </Text> */}
                                                {
                                                    infoMessage?.isActive ?
                                                        _renderTypeMessage(infoMessage?.content)
                                                        :
                                                        <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                            {
                                                                "Tin nhắn đã thu hồi"
                                                            }
                                                        </Text>
                                                }
                                                <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                    {
                                                        moment(infoMessage.created).format('LT')
                                                    }
                                                </Text>
                                            </View>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                                {
                                    infoMessage?.type == 'video' ?
                                        <>
                                            {
                                                infoMessage?.isActive ?
                                                    <TouchableOpacity
                                                        style={[styleElement.rowAliCenter]}
                                                        onPress={() => {
                                                            // await FileViewer.open(`${URL_ORIGINAL}${infoMessage?.documents[0]?.link}`);
                                                            setIsDownloading(true)
                                                            RNFS.downloadFile({
                                                                fromUrl: `${URL_ORIGINAL}${infoMessage?.videos[0]?.link}`,
                                                                toFile: `${RNFS.DocumentDirectoryPath}/${infoMessage?.videos[0]?.originalName}`
                                                            }).promise
                                                                .then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/${infoMessage?.videos[0]?.originalName}`))
                                                                .then(() => {
                                                                    // success 
                                                                    setIsDownloading(false)
                                                                })
                                                                .catch(error => {
                                                                    setIsDownloading(false)
                                                                    // error
                                                                });
                                                        }}>
                                                        <View style={[styles.message__content, { backgroundColor: Color.RECEIVER_BG }]}>
                                                            <Text style={[stylesFont.fontNolan500, styles.message__content__text, { textDecorationLine: 'underline', color: Color.RECEIVER_COLOR_TEXT }]}>
                                                                {
                                                                    infoMessage?.videos[0]?.originalName
                                                                }

                                                                {/* {`----${randomStringFixLengthCode(5)}`} */}

                                                            </Text>
                                                            {/* <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                   {
                                                       moment(infoMessage.created).format('LT')
                                                   }
                                               </Text> */}

                                                            <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(4) }]}>
                                                                <View style={{
                                                                    width: _moderateScale(8 * 4),
                                                                    height: _moderateScale(8 * 4),
                                                                    borderRadius: _moderateScale(8 * 2),
                                                                    backgroundColor: Color.BG_GREY_OPACITY_2,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    // marginRight: _moderateScale(8)
                                                                }}>
                                                                    <Image
                                                                        style={[sizeIcon.md]}
                                                                        source={require('../../../Icon/file_black.png')} />
                                                                </View>

                                                                <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                                    {
                                                                        moment(infoMessage.created).format('LT')
                                                                    }
                                                                </Text>
                                                            </View>

                                                        </View>

                                                        <View style={{
                                                            width: _moderateScale(8 * 4),
                                                            height: _moderateScale(8 * 4),
                                                            borderRadius: _moderateScale(8 * 2),
                                                            backgroundColor: Color.WHITE,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginLeft: _moderateScale(8)
                                                        }}>

                                                            {
                                                                isDownloading ?
                                                                    <ActivityIndicator />
                                                                    :
                                                                    <Image
                                                                        style={sizeIcon.xxs}
                                                                        source={require('../../../Icon/download_black.png')} />
                                                            }
                                                        </View>

                                                    </TouchableOpacity>
                                                    :
                                                    <View style={[styles.message__content, { backgroundColor: Color.RECEIVER_BG },]}>
                                                        {
                                                            infoMessage?.isActive ?
                                                                <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.SENDER_COLOR_TEXT }]}>
                                                                    {
                                                                        infoMessage?.content
                                                                    }
                                                                </Text>
                                                                :
                                                                <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                                    {
                                                                        "Tin nhắn đã thu hồi"
                                                                    }
                                                                </Text>
                                                        }
                                                        <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                            {
                                                                moment(infoMessage.created).format('LT')
                                                            }
                                                        </Text>
                                                    </View>
                                            }
                                        </>
                                        :
                                        <>
                                        </>
                                }
                                {
                                    infoMessage?.type == 'document' ?
                                        <>
                                            {
                                                infoMessage?.isActive ?
                                                    <TouchableOpacity
                                                        style={[styleElement.rowAliCenter]}
                                                        onPress={() => {
                                                            // await FileViewer.open(`${URL_ORIGINAL}${infoMessage?.documents[0]?.link}`);
                                                            setIsDownloading(true)
                                                            RNFS.downloadFile({
                                                                fromUrl: `${URL_ORIGINAL}${infoMessage?.documents[0]?.link}`,
                                                                toFile: `${RNFS.DocumentDirectoryPath}/${infoMessage?.documents[0]?.originalName}`
                                                            }).promise
                                                                .then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/${infoMessage?.documents[0]?.originalName}`))
                                                                .then(() => {
                                                                    // success 
                                                                    setIsDownloading(false)
                                                                })
                                                                .catch(error => {
                                                                    setIsDownloading(false)
                                                                    // error
                                                                });
                                                        }}>
                                                        <View style={[styles.message__content, { backgroundColor: Color.RECEIVER_BG }]}>
                                                            <Text style={[stylesFont.fontNolan500, styles.message__content__text, { textDecorationLine: 'underline', color: Color.RECEIVER_COLOR_TEXT }]}>
                                                                {
                                                                    infoMessage?.documents[0]?.originalName
                                                                }

                                                                {/* {`----${randomStringFixLengthCode(5)}`} */}

                                                            </Text>
                                                            {/* <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                    {
                                                        moment(infoMessage.created).format('LT')
                                                    }
                                                </Text> */}

                                                            <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(4) }]}>
                                                                <View style={{
                                                                    width: _moderateScale(8 * 4),
                                                                    height: _moderateScale(8 * 4),
                                                                    borderRadius: _moderateScale(8 * 2),
                                                                    backgroundColor: Color.BG_GREY_OPACITY_2,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    // marginRight: _moderateScale(8)
                                                                }}>
                                                                    <Image
                                                                        style={[sizeIcon.md]}
                                                                        source={require('../../../Icon/file_black.png')} />
                                                                </View>

                                                                <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                                    {
                                                                        moment(infoMessage.created).format('LT')
                                                                    }
                                                                </Text>
                                                            </View>

                                                        </View>

                                                        <View style={{
                                                            width: _moderateScale(8 * 4),
                                                            height: _moderateScale(8 * 4),
                                                            borderRadius: _moderateScale(8 * 2),
                                                            backgroundColor: Color.WHITE,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginLeft: _moderateScale(8)
                                                        }}>

                                                            {
                                                                isDownloading ?
                                                                    <ActivityIndicator />
                                                                    :
                                                                    <Image
                                                                        style={sizeIcon.xxs}
                                                                        source={require('../../../Icon/download_black.png')} />
                                                            }
                                                        </View>

                                                    </TouchableOpacity>
                                                    :
                                                    <View style={[styles.message__content, { backgroundColor: Color.RECEIVER_BG },]}>
                                                        {
                                                            infoMessage?.isActive ?
                                                                <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.SENDER_COLOR_TEXT }]}>
                                                                    {
                                                                        infoMessage?.content
                                                                    }
                                                                </Text>
                                                                :
                                                                <Text style={[stylesFont.fontNolan500, styles.message__content__text, { color: Color.GREY, fontStyle: 'italic' }]}>
                                                                    {
                                                                        "Tin nhắn đã thu hồi"
                                                                    }
                                                                </Text>
                                                        }
                                                        <Text style={[stylesFont.fontDinTextPro, { alignSelf: 'flex-end', color: Color.BG_GREY_OPACITY_7, fontSize: _moderateScale(12), marginTop: _heightScale(4) }]}>
                                                            {
                                                                moment(infoMessage.created).format('LT')
                                                            }
                                                        </Text>
                                                    </View>
                                            }

                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </View>
                        </View>
                    </>
                    :
                    <>
                    </>
            }
        </View>
    );
});

const styles = StyleSheet.create({


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
        backgroundColor: Color.BG_GREY_OPACITY_9,
        borderRadius: _moderateScale(8),
        marginTop: _moderateScale(8),
        marginBottom: _moderateScale(8 * 5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnSendDone: {
        paddingHorizontal: _moderateScale(8 * 1.2),
        paddingVertical: _moderateScale(2),
        backgroundColor: Color.BG_GREY_OPACITY_9,
        borderRadius: _moderateScale(8),
        marginTop: _moderateScale(8),
        marginBottom: _moderateScale(8 * 5),
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
        padding: _moderateScale(12),
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


export default EachMessage;