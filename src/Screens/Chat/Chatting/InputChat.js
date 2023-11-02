import { isEmpty, remove as _remove } from 'lodash';
import React, { memo, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Animated, Text, TextInput, TouchableOpacity, View, Linking, ScrollView, FlatList, LayoutAnimation } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { DotIndicator } from 'react-native-indicators';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useSelector } from 'react-redux';
import SocketInstance from '../../../../SocketInstance';
import DialogConfirmInput from '../../../Components/Dialog/ConfirmTextInput';
import * as Color from '../../../Constant/Color';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import * as ActionType from '../../../Redux/Constants/ActionType';
import store from '../../../Redux/Store';
import { useMentions } from 'react-native-controlled-mentions/dist';
// CALL API
import { _uploadModule, _uploadModuleDocument } from '../../../Services/api';
import { handleApi } from '../../../Services/utils';
import { CSS_SEND_MESSAGE, CSS_USER_TYPING, SSC_USER_TYPING, CSS_PARTNER_TYPING } from '../../../Sockets/type';
import { uploadModule, uploadModuleDocument } from '../../../Redux/Action/BookingAction';
import { stylesFont } from '../../../Constant/Font';
import { getConfigData } from '../../../Redux/Action/OrtherAction';
import moment from 'moment';





const InputChat = memo((props) => {

    const animatedArrow = useRef(new Animated.Value(0)).current;

    const currChattingRedux = useSelector(state => state?.messageReducer?.currChatting)
    const infoUserRedux = useSelector(state => state.infoUserReducer.infoUser)

    const infoCurrRoomChattingRedux = useSelector(state => state?.messageReducer?.currRoomChatting?.infoCurrRoomChatting)




    const [currTextMessage, setCurrTextMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [listUserIsTyping, setListUserIsTyping] = useState([])
    const [loadingSendMessage, setLoadingSendMessage] = useState(false)
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [listVideoForUpload, setListVideoForUpload] = useState([])

    const [listSgMsg, setListSgMsg] = useState([])

    const [isShowlistSgMsg, setIsShowListSgMsg] = useState(false)


    const ActionSheetRef = useRef()

    console.log({ infoCurrRoomChattingRedux });

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (isShowlistSgMsg) {
            Animated.timing(animatedArrow, {
                toValue: 1,
                duration: 500,
            }).start()
        } else {
            Animated.timing(animatedArrow, {
                toValue: 0,
                duration: 500,
            }).start()
        }
    }, [isShowlistSgMsg])

    useEffect(() => {
        if (isTyping == true) {
            let data = {
                conversationId: infoCurrRoomChattingRedux?._id,
                data: {
                    isTyping: true
                }
            }
            SocketInstance.socketConn?.emit(CSS_PARTNER_TYPING, data)
            console.log('Start Typing');


        } else {
            let data = {
                conversationId: infoCurrRoomChattingRedux?._id,
                data: {
                    isTyping: false
                }
            }
            SocketInstance.socketConn?.emit(CSS_PARTNER_TYPING, data)
            console.log('Stop Typing');
        }
    }, [isTyping])


    useEffect(() => {

        SocketInstance.socketConn?.on(SSC_USER_TYPING, data => {
            console.log({
                SOCKET: `----SSC_USER_TYPING---`,
                data
            })

            if (data?.conversationId == infoCurrRoomChattingRedux?._id) {
                if (data.data.isTyping == false) {
                    let tempListUserIsTyping = [...listUserIsTyping];
                    _remove(tempListUserIsTyping, item => item.userId === data.data.userId)
                    setListUserIsTyping(tempListUserIsTyping)
                } else {
                    if (data.data.userId == infoUserRedux?._id) return
                    let tempListUserIsTyping = [...listUserIsTyping]?.filter(item => item?.userId !== data?.data?.userId);
                    setListUserIsTyping([data.data, ...tempListUserIsTyping])
                }
            }
        })

        return () => {
            SocketInstance.socketConn?.off(SSC_USER_TYPING)
        }
    }, [infoCurrRoomChattingRedux, listUserIsTyping])

    useEffect(() => {
        if (infoCurrRoomChattingRedux?._id) {
            _getConfigData(infoCurrRoomChattingRedux?.type)
        }
    }, [infoCurrRoomChattingRedux])

    const _getConfigData = async (type) => {
        if (type == "consultation") {
            if (
                !infoCurrRoomChattingRedux?.latestMessage?._id ||
                moment.duration(moment(new Date()).diff(moment(infoCurrRoomChattingRedux?.latestMessage?.created))).asMinutes() > 60
            ) {
                setTimeout(() => {
                    setIsShowListSgMsg(true)
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }, 500);
            }
            let result = await getConfigData("CONSMSGBOX")
            if (result?.isAxiosError) return
            setListSgMsg(result?.value)
        }
        if (type == "treatment") {
            if (!infoCurrRoomChattingRedux?.latestMessage?._id ||
                moment.duration(moment(new Date()).diff(moment(infoCurrRoomChattingRedux?.latestMessage?.created))).asMinutes() > 60
            ) {
                setTimeout(() => {
                    setIsShowListSgMsg(true)
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }, 500);
            }
            let result = await getConfigData("TREATMSGBOX")
            if (result?.isAxiosError) return
            setListSgMsg(result?.value)
        }
    }

    const _changeCurrTextMessage = (e) => {
        if (e.length > 0) {
            setIsTyping(true)
        } else {
            setIsTyping(false)
        }
        setCurrTextMessage(e)
    }

    const _sendMessage = () => {
        // ====== NEW =======
        if (isEmpty(currTextMessage.trim())) {
            return
        }

        setLoadingSendMessage(true)

        let flagChatGPT = currTextMessage.includes("{@}[ChatGPT](1)");
        let customText = currTextMessage.replaceAll("{@}[ChatGPT](1)", "");
        let customType = flagChatGPT ? "chatgpt" : "text";

        let data = {
            conversationId: infoCurrRoomChattingRedux?._id,
            message: {
                type: customType,
                content: flagChatGPT ? customText.trim() : currTextMessage,
            }
        };

        console.log("tuccccccccccccccccccccccccccccccccccccccccccccccc", data);

        setIsTyping(false)
        setCurrTextMessage('')
        SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data)
        setTimeout(() => {
            setLoadingSendMessage(false)

        }, 300);
    }
    const _onFocusTextInput = () => {
        // setIsTyping(true)
    }
    const _outFocusTextInput = () => {
        setIsTyping(false)
    }

    const pickMultiple = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 6,
            mediaType: 'photo',
            // cropping:true,
            compressImageQuality: 0.5,
            compressImageMaxWidth: 700,
            // compressVideoPreset:'LowQuality' 
        }).then(async (images) => {
            let listImages = images.map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })
            let resultUploadImageMessage = await uploadModule({
                moduleName: 'chatMessage',
                files: listImages
            })

            if (resultUploadImageMessage.isAxiosError) return
            let listIdImageHasUpload = resultUploadImageMessage?.data?.data.map(item => item._id);

            let data = {
                conversationId: infoCurrRoomChattingRedux?._id,
                message: {
                    type: "image",
                    images: listIdImageHasUpload
                }
            };

            SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data)

            // GlobalStore.socket.emit(CSS_SEND_MESSAGE, data)
        }).catch(e => { });
    }

    const pickVideo = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 1,
            mediaType: 'video',
            // cropping:true,
            compressImageQuality: 0.5,
            compressVideoPreset: 'MediumQuality'
        }).then(async (images) => {
            setDialogVisible(' ')

            setListVideoForUpload(images)


            // let listImages = images.map((i, index) => {
            //     if (index > 0) return
            //     console.log({ iiiiii: i });
            //     return {
            //         uri: i.path,
            //         width: i.width,
            //         height: i.height,
            //         mime: i.mime,
            //         type: i.mime,
            //         name: `aloooo_${index}`
            //     };
            // })
            // let resultUploadImageMessage = await handleApi(_uploadModule({
            //     moduleName: 'chatMessage',
            //     files: listImages
            // }))
            // if (resultUploadImageMessage.error) return

            // let listIdImageHasUpload = resultUploadImageMessage.data.map(item => item._id);

            // let data = {
            //     room: currChattingRedux?.code,
            //     message: {
            //         type: "document",
            //         documents: listIdImageHasUpload
            //     }
            // };

            // SocketInstance.socketConn.emit(CSS_SEND_MESSAGE, data)

        }).catch(e => { });
    }

    const pickCamera = () => {
        ImagePicker.openCamera({
            // width: _moderateScale(160 * 10),
            // height: _moderateScale(160 * 10),
            // cropping: true,
            mediaType: 'photo',
            compressImageQuality: 0.5
        }).then(async (images) => {

            let listImages = [images].map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })
            let resultUploadImageMessage = await uploadModule({
                moduleName: 'chatMessage',
                files: listImages
            })
            if (resultUploadImageMessage.isAxiosError) return

            let listIdImageHasUpload = resultUploadImageMessage?.data?.data?.map(item => item._id);

            let data = {
                conversationId: infoCurrRoomChattingRedux?._id,
                message: {
                    type: "image",
                    images: listIdImageHasUpload
                }
            };
            SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data)

            // GlobalStore.socket.emit(CSS_SEND_MESSAGE, data)
        }).catch(e => { });
    }

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );

            let listDocuments = {
                uri: res.uri,
                type: res.type,
                name: res.name,
            };

            let resultUploadDocumentMessage = await uploadModuleDocument({
                moduleName: 'chatMessage',
                files: [listDocuments]
            })
            if (resultUploadDocumentMessage.isAxiosError) return

            let listIdDocumentHasUpload = resultUploadDocumentMessage?.data?.data?.map(item => item._id);
            let data = {
                conversationId: infoCurrRoomChattingRedux?._id,
                message: {
                    type: "document",
                    documents: listIdDocumentHasUpload
                }
            };
            SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const users = [
        {
            id: '1',
            name: 'ChatGPT',
        },
    ];

    const usersInfo = [
        {
            id: '1',
            avatar: '../../Icon/upload2.png',
            description: 'Trò chuyện với AI',
            syntax: '@ChatGPT',
            userId: '1'
        },
    ]

    const Suggestions = {} = ({
        keyword,
        onSelect,
    }) => {
        if (keyword == null) {
            return null;
        }

        return (
            <ScrollView style={styles.suggestionsContainer}>
                {users
                    .filter((one) => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
                    .map((one) => {
                        let fnInfo = usersInfo.find(f => f.userId == one.id)
                        return (
                            <TouchableOpacity key={one.id} onPress={() => onSelect(one)} style={{ padding: 12 }}>
                                <View style={styles.suggestion}><Text>{fnInfo.description}</Text><Text style={styles.syntax}>{fnInfo.syntax}</Text></View>
                            </TouchableOpacity>
                        );
                    })}
            </ScrollView>
        );
    };

    // Config of suggestible triggers
    const triggersConfig = {
        mention: {
            trigger: '@',
        },
    };

    const patternsConfig = {
        url: {
            pattern: /a/gi,
            textStyle: { color: 'blue' },
        },
    };

    const { textInputProps, triggers } = useMentions({
        value: currTextMessage || '',
        onChange: (content) => {
            _changeCurrTextMessage(content)
        },
        triggersConfig,
        // patternsConfig,
    });

    // const pickVideoDocument = async () => {
    //     try {
    //         const res = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.images],
    //         });
    //         console.log(
    //             res.uri,
    //             res.type, // mime type
    //             res.name,
    //             res.size
    //         );

    //         let listDocuments = {
    //             uri: res.uri,
    //             type: res.type,
    //             name: res.name,
    //         };

    //         let resultUploadDocumentMessage = await handleApi(_uploadModuleDocument({
    //             moduleName: 'chatMessage',
    //             files: [listDocuments]
    //         }))
    //         if (resultUploadDocumentMessage.error) return

    //         let listIdDocumentHasUpload = resultUploadDocumentMessage.data.map(item => item._id);
    //         let data = {
    //             room: currChattingRedux?.code,
    //             message: {
    //                 type: "document",
    //                 documents: listIdDocumentHasUpload
    //             }
    //         };
    //         SocketInstance.socketConn.emit(CSS_SEND_MESSAGE, data)

    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //             // User cancelled the picker, exit any dialogs or menus and move on
    //         } else {
    //             throw err;
    //         }
    //     }
    // }

    // const _showActionSheet = () => {
    //     ActionSheetIOS.showActionSheetWithOptions(
    //         {
    //             options: ["Huỷ", "Chụp ảnh", 'Video', "Chọn từ thư viện"],
    //             // destructiveButtonIndex: 2,
    //             cancelButtonIndex: 0,
    //             userInterfaceStyle: 'dark'
    //         },
    //         buttonIndex => {
    //             if (buttonIndex === 0) {
    //                 // cancel action
    //             } else if (buttonIndex === 1) {
    //                 pickCamera()
    //             } else if (buttonIndex === 2) {
    //                 pickMultiple()
    //             }
    //         })
    // }


    return (
        <View>
            <ActionSheet
                ref={ActionSheetRef}
                // title={'Which one do you like ?'}
                options={["Mở Camera", "Chọn video từ thư viện", "Chọn ảnh từ thư viện", "Huỷ"]}
                cancelButtonIndex={3}
                // destructiveButtonIndex={0} 
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            pickCamera()
                            break;
                        case 1:
                            pickVideo()
                            break;
                        case 2:
                            pickMultiple()
                            break;

                        default:
                            break;
                    }
                }}
            />

            <DialogConfirmInput
                title={"Tải Video"}
                message={"Nhập tên hiển thị Video \n vào bên dưới"}
                // value={`${isDialogVisible}`}
                handleCancel={() => {
                    setDialogVisible(null)
                }}
                handleConfirm={async (textInput) => {
                    store.dispatch({
                        type: ActionType.LOADING_BEGIN,
                        payload: {
                            content: 'Đang gửi Video...'
                        }
                    })

                    let listImages = listVideoForUpload?.map((i, index) => {
                        if (index > 0) return
                        return {
                            uri: i.path,
                            width: i.width,
                            height: i.height,
                            mime: i.mime,
                            type: i.mime,
                            name: textInput
                        };
                    })
                    let resultUploadImageMessage = await uploadModule({
                        moduleName: 'chatMessage',
                        files: listImages
                    })
                    if (resultUploadImageMessage.isAxiosError) return

                    let listIdImageHasUpload = resultUploadImageMessage?.data?.data?.map(item => item._id);

                    let data = {
                        conversationId: infoCurrRoomChattingRedux?._id,
                        message: {
                            type: "video",
                            videos: listIdImageHasUpload
                        }
                    };

                    SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data)
                    store.dispatch({
                        type: ActionType.LOADING_DONE,
                        payload: null
                    })
                    setDialogVisible(false)
                }}
                visible={Boolean(isDialogVisible)} />

            {
                !isEmpty(listUserIsTyping) ?

                    <View style={{ position: 'absolute', top: -_moderateScale(8 * 4), zIndex: 10, left: 0 }}>
                        {
                            <View style={{
                                height: _moderateScale(8 * 4),
                                backgroundColor: 'rgba(255, 255, 255,0.9)',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: _moderateScale(8)
                            }}>
                                <View>
                                    <DotIndicator size={_moderateScale(4)} color='grey' />
                                </View>
                                <Text style={{ marginLeft: _moderateScale(8) }}>
                                    {/* {
                                        !isEmpty(listUserIsTyping) && listUserIsTyping.map((itemUserTyping, indexUserTyping) => {
                                            if (indexUserTyping == listUserIsTyping.length - 1) {
                                                return `${infoCurrRoomChattingRedux?.assignedUsers?.find(itemFind => itemFind?.userId == itemUserTyping?.userId)?.name} đang nhập `
                                            }

                                            if (infoCurrRoomChattingRedux?.assignedUsers?.find(itemFind => itemFind.userId == itemUserTyping.userId)) {
                                                return `${infoCurrRoomChattingRedux?.assignedUsers?.find(itemFind => itemFind.userId == itemUserTyping.userId)?.name}, `
                                            } else {
                                                return ``
                                            }
                                        })
                                    } */}
                                    Đang nhập
                                </Text>
                            </View>
                        }

                    </View>
                    :
                    <>
                    </>
            }

            {triggers ? (
                <>
                    <Suggestions {...triggers.mention} />
                </>
            ) : null}

            <View style={{}} >
                <View style={{
                    height: _moderateScale(8 * 3.5),
                }}>
                    <View style={{
                        position: 'absolute',
                        right: _moderateScale(8 * 2),
                        top: -_moderateScale(0),
                        zIndex: 100,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsShowListSgMsg(old => !old)
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            }}
                            style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 5),
                                height: _moderateScale(8 * 3.5),
                                backgroundColor: Color.WHITE,
                                borderTopStartRadius: 8,
                                borderTopEndRadius: 8,

                            }]}>
                            {/* <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.GREY_FOR_TITLE }}>
                                Gợi ý tin nhắn
                            </Text> */}
                            <Animated.Image style={[
                                sizeIcon.xs,
                                // { position: 'absolute', right: _moderateScale(12) },
                                {
                                    transform: [{
                                        rotate: animatedArrow.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '-180deg']
                                        })
                                    }]
                                }
                            ]} source={require('../../../NewIcon/doubleUpGrey.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    isShowlistSgMsg ?
                        <View style={{ height: _heightScale(250), paddingTop: 8, backgroundColor: Color.WHITE, borderTopStartRadius: 8 * 2, borderTopEndRadius: 8 * 2 }}>
                            <FlatList
                                ListHeaderComponent={
                                    <View style={{ height: 8 * 2 }} />
                                }
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCurrTextMessage(item?.item)
                                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                            }}
                                            style={[{ padding: 8 * 1.5, borderRadius: 8, marginHorizontal: 8 * 2, marginVertical: 8, backgroundColor: Color.WHITE }, shadow]}>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.GREY_FOR_TITLE }}>
                                                {item?.item}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }}
                                ListFooterComponent={
                                    <View style={{ height: 8 * 2 }} />
                                }
                                keyExtractor={(item, index) => item + index}
                                data={listSgMsg}
                            />
                        </View>
                        :
                        <></>
                }

            </View>



            <View style={{
                width: _width, paddingVertical: _heightScale(12),
                paddingBottom: (getBottomSpace() + _heightScale(12)),
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: Color.WHITE
            }}>
                <View style={[styleElement.rowAliCenter]}>
                    <TouchableOpacity
                        onPress={() => {
                            pickDocument()
                        }}
                        style={{ justifyContent: 'center', alignItems: 'center', padding: _moderateScale(2) }} >
                        <Image
                            style={[sizeIcon.llg]}
                            source={require('../../../Icon/upload2.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let data = {
                                conversationId: infoCurrRoomChattingRedux?._id,
                                message: {
                                    type: 'chatgpt',
                                    content: 'Tóm tắt lại cuộc trò chuyện',
                                }
                            };

                            console.log("tuccccccccccccccccccccccccccccccccccccccccccccccc", data);

                            SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data)
                        }}
                        style={{ justifyContent: 'center', alignItems: 'center', padding: _moderateScale(2), marginLeft: _moderateScale(8) }} >
                        <Image
                            style={[sizeIcon.lllg]}
                            source={require('../../../../src/Icon/chat_gpt.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        marginLeft: _moderateScale(8), justifyContent: 'center', alignItems: 'center',
                        padding: _moderateScale(4)
                    }} onPress={() => {
                        // Linking.openURL('app-settings:')
                        // Linking.openSettings()
                        ActionSheetRef.current.show()
                    }}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../../Icon/gallery_blue.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    backgroundColor: Color.BG_GREY_OPACITY,
                    borderRadius: _moderateScale(10),
                    paddingVertical: _heightScale(5)
                }}>
                    {/* <TextInput
                        onFocus={_onFocusTextInput}
                        onBlur={_outFocusTextInput}
                        multiline
                        value={currTextMessage}
                        onChangeText={(content) => {
                            _changeCurrTextMessage(content)
                        }}
                        style={styles.input}
                        placeholder={'Aa'} /> */}
                    <TextInput
                        onFocus={_onFocusTextInput}
                        onBlur={_outFocusTextInput}
                        multiline
                        {...textInputProps}
                        style={styles.input}
                        placeholder={'Aa'}
                    />
                </View>
                <View>

                    <TouchableOpacity
                        style={{
                        }}
                        onPress={() => {
                            _sendMessage()
                        }}>

                        {
                            loadingSendMessage ?
                                <ActivityIndicator color={Platform.OS !== 'ios' && Color.GREY} size={'small'} />
                                :
                                <Image
                                    style={[sizeIcon.llg]}
                                    source={require('../../../Icon/send.png')} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
});

const styles = StyleSheet.create({
    input: {
        width: _widthScale(240),
        // height: _moderateScale(50),
        padding: 0,
        fontSize: _widthScale(16),
        paddingHorizontal: _widthScale(16),
        margin: 0
    },
    content: {
        minHeight: 1000,
    },
    suggestionsContainer: {
        position: 'absolute',
        // top: -100,
        bottom: 56,
        maxHeight: 200,
        width: '100%',
        backgroundColor: 'white',
        zIndex: 1000,
        opacity: 0.95
    },
    suggestion: {
        paddingHorizontal: 4,
        paddingVertical: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    syntax: {
        color: 'blue',
        paddingLeft: 6,
    },
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


export default InputChat;