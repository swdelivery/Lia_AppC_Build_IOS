import { isEmpty } from 'lodash';
import React, { useRef, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from "react-native-file-viewer";
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from "react-native-image-viewing";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { navigation } from '../../../rootNavigation';
import DialogConfirmInput from '../../Components/Dialog/ConfirmTextInput';
import FastImage from '../../Components/Image/FastImage';
import EditGalleryCurr from '../../Components/Timeline/EditGalleryCurr';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _width } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { confirmEditPost } from '../../Redux/Action/PostAction';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from '../../Redux/Store';
import { _uploadModule, _uploadModuleDocument } from '../../Services/api';
// CALL API
import { handleApi } from '../../Services/utils';
















const UpdateNewFeed = props => {
    const dispatch = useDispatch()


    const postsRedux = useSelector(state => state.postReducer)


    const [error, setError] = useState({})
    const [galleryCurr, setGalleryCurr] = useState([])
    const [isShowEditGalleryCurr, setShowEditGalleryCurr] = useState(false)
    const [isShowGallery, setShowGallery] = useState(false)
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [contentNewFeedCreate, setContentNewFeedCreate] = useState('')
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [listVideoForUploadTemp, setListVideoForUploadTemp] = useState([])

    const ActionSheetRef = useRef()

    const pickMultiple = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 10,
            mediaType: 'photo',
            compressImageQuality: 0.5
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
            // setGalleryCurr(olds => [...olds, ...listImages])
            Store.dispatch({
                type: ActionType.UPDATE_IMAGES_CURR_EDIT_POST,
                payload: {
                    data: listImages
                }
            })

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
            Store.dispatch({
                type: ActionType.UPDATE_IMAGES_CURR_EDIT_POST,
                payload: {
                    data: listImages
                }
            })

            // GlobalStore.socket.emit(CSS_SEND_MESSAGE, data)
        }).catch(e => { });
    }

    const pickDocument = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            // console.log(
            //     res.uri,
            //     res.type, // mime type
            //     res.name,
            //     res.size
            // ); 
            let listDocuments = []
            for (const res of results) {
                listDocuments.push({
                    uri: res.uri,
                    type: res.type,
                    name: res.name,
                })
            }
            Store.dispatch({
                type: ActionType.UPDATE_FILES_CURR_EDIT_POST,
                payload: {
                    data: listDocuments
                }
            })
            // setListDocumentsForUpload(old  => [...old, ...listDocuments])

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
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
            setListVideoForUploadTemp(images)


        }).catch(e => { });
    }

    const _handleShowEditGalleryCurr = () => {
        setShowEditGalleryCurr(true)
    }

    const _handleConfirmRemoveImage = (name) => {
        // setGalleryCurr(olds => [...olds].filter(item => item.name !== name))

        Store.dispatch({
            type: ActionType.REMOVE_IMAGES_CURR_EDIT_POST,
            payload: {
                data: name
            }
        })
    }

    const _handleConfirmUpdateNewFeed = async () => {
        if ((postsRedux?.currEditPost?.content.trim().length == 0 && isEmpty(postsRedux?.currEditPost?.images))) {
            return alert('Điền đầy đủ các trường còn thiếu')
        }


        Store.dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xử lí...'
            }
        })
        let resultUploadImagePost = []
        if (!isEmpty(postsRedux?.currEditPost?.images)) {
            let newArrOnlyURI = postsRedux?.currEditPost?.images?.filter(itemFilter => itemFilter.uri);


            if (!isEmpty(newArrOnlyURI)) {
                let tempResultUploadImagePost = await handleApi(_uploadModule({
                    moduleName: 'post',
                    files: newArrOnlyURI
                }))

                if (tempResultUploadImagePost.error) {
                    Store.dispatch({
                        type: ActionType.LOADING_DONE,
                        payload: null
                    })
                    resultUploadImagePost = []
                    return alert('Có lỗi xảy ra, vui lòng thử lại')
                }
                resultUploadImagePost = [...postsRedux?.currEditPost?.images?.filter(item => item.link).map(itemMap => itemMap._id), ...tempResultUploadImagePost.data.map(item => item._id)]
            } else {
                resultUploadImagePost = [...postsRedux?.currEditPost?.images?.filter(item => item.link).map(itemMap => itemMap._id)]
            }
        }
        let resultUploadVideoPost = []
        if (!isEmpty(postsRedux?.currEditPost?.videos)) {
            let newArrOnlyURI = postsRedux?.currEditPost?.videos?.filter(itemFilter => itemFilter.uri);


            if (!isEmpty(newArrOnlyURI)) {
                let tempResultUploadVideoPost = await handleApi(_uploadModule({
                    moduleName: 'post',
                    files: newArrOnlyURI
                }))

                if (tempResultUploadVideoPost.error) {
                    Store.dispatch({
                        type: ActionType.LOADING_DONE,
                        payload: null
                    })
                    resultUploadVideoPost = []
                    return alert('Có lỗi xảy ra, vui lòng thử lại')
                }
                resultUploadVideoPost = [...postsRedux?.currEditPost?.videos?.filter(item => item.link).map(itemMap => itemMap._id), ...tempResultUploadVideoPost.data.map(item => item._id)]
            } else {
                resultUploadVideoPost = [...postsRedux?.currEditPost?.videos?.filter(item => item.link).map(itemMap => itemMap._id)]
            }
        }

        let resultUploadFilePost = []
        if (!isEmpty(postsRedux?.currEditPost?.documents)) {
            let newArrOnlyURI = postsRedux?.currEditPost?.documents?.filter(itemFilter => itemFilter.uri);
            console.log({ newArrOnlyURI });


            if (!isEmpty(newArrOnlyURI)) {
                let tempResultUploadFilePost = await handleApi(_uploadModuleDocument({
                    moduleName: 'post',
                    files: newArrOnlyURI
                }))

                if (tempResultUploadFilePost.error) {
                    Store.dispatch({
                        type: ActionType.LOADING_DONE,
                        payload: null
                    })
                    resultUploadFilePost = []
                    return alert('Có lỗi xảy ra, vui lòng thử lại')
                }
                resultUploadFilePost = [...postsRedux?.currEditPost?.documents?.filter(item => item.link).map(itemMap => itemMap._id), ...tempResultUploadFilePost.data.map(item => item._id)]
            } else {
                resultUploadFilePost = [...postsRedux?.currEditPost?.documents?.filter(item => item.link).map(itemMap => itemMap._id)]
            }
        }

        // console.log({
        //     a: postsRedux?.currEditPost?.content?.trim(),
        //     b: resultUploadImagePost,
        //     c: postsRedux?.currEditPost?._id
        // });


        dispatch(confirmEditPost({
            title: '.',
            content: postsRedux?.currEditPost?.content?.trim(),
            images: resultUploadImagePost ? resultUploadImagePost : [],
            videos: resultUploadVideoPost ? resultUploadVideoPost : [],
            documents: resultUploadFilePost ? resultUploadFilePost : []
        }, postsRedux?.currEditPost?._id))

    }

    return (
        <View style={[styles.container]}>

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

                    let listImages = listVideoForUploadTemp?.map((i, index) => {
                        if (index > 0) return
                        console.log({ iiiiii: i });
                        return {
                            uri: i.path,
                            width: i.width,
                            height: i.height,
                            mime: i.mime,
                            type: i.mime,
                            name: textInput
                        };
                    })
                    Store.dispatch({
                        type: ActionType.UPDATE_VIDEOS_CURR_EDIT_POST,
                        payload: {
                            data: listImages
                        }
                    })
                    setDialogVisible(false)
                }}
                visible={Boolean(isDialogVisible)} />

            <ImageView
                images={postsRedux?.currEditPost?.images?.map(item => {
                    return {
                        uri: item?.link ? `${URL_ORIGINAL}${item?.link}` : item?.uri
                    }
                })}
                // isSwipeCloseEnabled={false}
                // isPinchZoomEnabled={true}
                // isTapZoomEnabled={false}
                onRequestClose={() => {
                    setShowGallery(false)
                }}
                imageIndex={indexCurrImageView}
                visible={isShowGallery}
            // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
            />


            <EditGalleryCurr
                closeModalShowEditGalleryCurr={() => {
                    setShowEditGalleryCurr(false)
                }}
                confirmRemoveImage={(name) => {
                    _handleConfirmRemoveImage(name)
                }}
                isShowEditGalleryCurr={isShowEditGalleryCurr}
                galleryCurr={postsRedux?.currEditPost?.images} />

            <View style={[styles.content__header, styleElement.rowAliCenter, shadow, { zIndex: 1 }]} key="0">
                <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                style={{ padding: _moderateScale(8), width: _moderateScale(8 * 12) }} onPress={() => navigation.goBack()}>
                    <Image
                        style={sizeIcon.lg}
                        source={require('../../Icon/cancel.png')} />
                </TouchableOpacity>

                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: Color.GREY_FOR_TITLE }]}>Chỉnh sửa bài viết</Text>

                <TouchableOpacity
                    // disabled={(contentNewFeedCreate.trim().length && !isEmpty(galleryCurr)) ? false : true}
                    onPress={() => {
                        _handleConfirmUpdateNewFeed()
                    }}
                    style={{ padding: _moderateScale(8), width: _moderateScale(8 * 12), alignItems: 'flex-end' }}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _heightScale(16) },
                    { opacity: 1, color: Color.GREY_FOR_TITLE }
                    ]}>
                        Cập nhật
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView scrollIndicatorInsets={{right:1}} contentContainerStyle={{ flex: 1 }} style={styles.inputView}>
                <View style={{ height: _moderateScale(8 * 2) }} />

                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={[styleElement.rowAliCenter]}>
                            <FastImage
                                style={[styles.inputView__avatar]}
                                uri={postsRedux?.currEditPost?.userCreate?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${postsRedux?.currEditPost?.userCreate?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                            />
                            <View>
                                <Text style={[stylesFont.fontNolan500, {
                                    fontSize: _moderateScale(16),
                                    color: Color.GREY_FOR_TITLE
                                }]}>
                                    {
                                        `${postsRedux?.currEditPost?.userCreate?.profile?.firstName} ${postsRedux?.currEditPost?.userCreate?.profile?.lastName}`
                                    }
                                </Text>
                                <Text style={[stylesFont.fontNolan, {
                                    fontSize: _moderateScale(14),
                                    color: Color.GREY
                                }]}>
                                    `$Nhân viên IT`
                                    </Text>
                            </View>
                        </View>
                        <View style={[styleElement.rowAliCenter]}>
                            <TouchableOpacity
                                onPress={pickDocument}>
                                <Image style={{
                                    width: _moderateScale(55),
                                    height: _moderateScale(55),
                                    marginRight: _moderateScale(8),
                                    resizeMode: 'contain'
                                }} source={require('../../Icon/file_find.png')} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                onPress={pickCamera}>
                                <Image style={{
                                    width: _moderateScale(55),
                                    height: _moderateScale(55),
                                    resizeMode: 'contain'
                                }} source={require('../../Icon/camera_2.png')} />
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                style={{
                                    marginLeft: _moderateScale(8 * 2)
                                }}
                                // onPress={pickMultiple}
                                onPress={() => {
                                    ActionSheetRef.current.show()
                                }}
                            >
                                <Image style={sizeIcon.lllg} source={require('../../Icon/galleryPost.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ height: _moderateScale(8 * 2) }} />

                    <TextInput
                        multiline
                        value={postsRedux?.currEditPost?.content}
                        onChangeText={(content) => {
                            Store.dispatch({
                                type: ActionType.UPDATE_CONTENT_CURR_EDIT_POST,
                                payload: {
                                    data: content
                                }
                            })
                        }}
                        style={[stylesFont.fontNolan500, styles.textInput]}
                        placeholder={"Nhập nội dung bài đăng..."} />
                </View>
                <View style={{ height: _moderateScale(8 * 2) }} />

                <View style={{
                    marginBottom: _moderateScale(8),
                    flexWrap: 'wrap',
                    paddingLeft: _moderateScale(12),
                    flexDirection: 'row'
                }}>
                    {
                        !isEmpty(postsRedux?.currEditPost?.videos) && postsRedux?.currEditPost?.videos.map((itemMap, indexMap) => {
                            console.log();

                            return (
                                <TouchableOpacity
                                    key={indexMap}
                                    style={[styleElement.rowAliCenter, styles.btnVideoWatch]}
                                    onPress={() => {
                                        // FileViewer.open(`${itemMap.uri}`)
                                        itemMap?.uri ?
                                            FileViewer.open(`${itemMap.uri}`)
                                            :
                                            RNFS.downloadFile({
                                                fromUrl: `${URL_ORIGINAL}${itemMap?.link}`,
                                                toFile: `${RNFS.DocumentDirectoryPath}/${itemMap?.originalName}`
                                            }).promise
                                                .then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/${itemMap?.originalName}`))
                                                .then(() => {
                                                    // success 
                                                })
                                                .catch(error => {
                                                    // error
                                                });
                                    }}>
                                    <Image
                                        style={[sizeIcon.lg]}
                                        source={require('../../Icon/video_grey.png')} />
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(4) }]}>
                                        {
                                            itemMap?.uri ?
                                                `${itemMap.name}`
                                                :
                                                `${itemMap.originalName}`
                                        }
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            // console.log({ listVideoForUpload, itemMap });
                                            // setListVideoForUpload([...listVideoForUpload].filter(item => item.uri !== itemMap.uri))
                                            Store.dispatch({
                                                type: ActionType.REMOVE_VIDEO_CURR_EDIT_POST,
                                                payload: {
                                                    data: itemMap.name
                                                }
                                            })
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: -_moderateScale(8),
                                            right: -_moderateScale(4),
                                            width: _moderateScale(16),
                                            height: _moderateScale(16),
                                            borderRadius: _moderateScale(8),
                                            backgroundColor: Color.RED,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <View style={{
                                            width: _moderateScale(8),
                                            height: _moderateScale(4),
                                            backgroundColor: Color.WHITE
                                        }} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )


                        })
                    }
                    {
                        !isEmpty(postsRedux?.currEditPost?.documents) && postsRedux?.currEditPost?.documents.map((itemMap, indexMap) => {
                            return (
                                <TouchableOpacity
                                    key={indexMap}
                                    style={[styleElement.rowAliCenter, styles.btnVideoWatch]}
                                    onPress={() => {
                                        // FileViewer.open(`${itemMap.uri}`)
                                        itemMap?.uri ?
                                            FileViewer.open(`${itemMap.uri}`)
                                            :
                                            RNFS.downloadFile({
                                                fromUrl: `${URL_ORIGINAL}${itemMap?.link}`,
                                                toFile: `${RNFS.DocumentDirectoryPath}/${itemMap?.originalName}`
                                            }).promise
                                                .then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/${itemMap?.originalName}`))
                                                .then(() => {
                                                    // success 
                                                })
                                                .catch(error => {
                                                    // error
                                                });

                                    }}>
                                    <Image
                                        style={[sizeIcon.lg]}
                                        source={require('../../Icon/file_grey.png')} />
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(4) }]}>
                                        {
                                            itemMap?.uri ?
                                                `${itemMap.name}`
                                                :
                                                `${itemMap.originalName}`
                                        }
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            // console.log({ listVideoForUpload, itemMap });
                                            // setListDocumentsForUpload([...listDocumentsForUpload].filter(item => item.uri !== itemMap.uri))
                                            Store.dispatch({
                                                type: ActionType.REMOVE_FILE_CURR_EDIT_POST,
                                                payload: {
                                                    data: itemMap.name
                                                }
                                            })
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: -_moderateScale(8),
                                            right: -_moderateScale(4),
                                            width: _moderateScale(16),
                                            height: _moderateScale(16),
                                            borderRadius: _moderateScale(8),
                                            backgroundColor: Color.RED,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <View style={{
                                            width: _moderateScale(8),
                                            height: _moderateScale(4),
                                            backgroundColor: Color.WHITE
                                        }} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>


                {
                    !isEmpty(postsRedux?.currEditPost?.images) && postsRedux?.currEditPost?.images?.length == 1 ?
                        <View style={[styles.galleryView, { alignItems: 'center' }]}>
                            {
                                postsRedux?.currEditPost?.images?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onLongPress={() => {
                                                _handleShowEditGalleryCurr()
                                            }}
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            style={{}} key={index} activeOpacity={0.8}>
                                            <Image
                                                style={{
                                                    width: _width - _moderateScale(8 * 3),
                                                    height: _width,
                                                    borderRadius: _moderateScale(8)
                                                }}
                                                source={{
                                                    uri: item?.link ? `${URL_ORIGINAL}${item?.link}` : item?.uri
                                                }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        <>
                        </>
                }
                {
                    !isEmpty(postsRedux?.currEditPost?.images) && postsRedux?.currEditPost?.images?.length == 2 ?
                        <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
                            {
                                postsRedux?.currEditPost?.images.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onLongPress={() => {
                                                _handleShowEditGalleryCurr()
                                            }}
                                            style={index == 1 && { marginLeft: _moderateScale(4) }}
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            key={index} activeOpacity={0.8}>
                                            <Image
                                                style={{
                                                    width: (_width - _moderateScale(8 * 3) - _moderateScale(2)) / 2,
                                                    height: _width,
                                                    borderRadius: _moderateScale(8)
                                                }}
                                                source={{
                                                    uri: item?.link ? `${URL_ORIGINAL}${item?.link}` : item?.uri
                                                }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        <>
                        </>
                }
                {
                    !isEmpty(postsRedux?.currEditPost?.images) && postsRedux?.currEditPost?.images?.length == 3 ?
                        <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }]}>
                            {
                                postsRedux?.currEditPost?.images.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onLongPress={() => {
                                                _handleShowEditGalleryCurr()
                                            }}
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            style={[index == 0 && { marginBottom: _moderateScale(4) }, index == 2 && { marginLeft: _moderateScale(4) }]} key={index} activeOpacity={0.8}>
                                            <Image
                                                style={[{
                                                    width: (_width - _moderateScale(8 * 3)) / 2 - _moderateScale(2),
                                                    height: _width / 2,
                                                    borderRadius: _moderateScale(8)
                                                }, index == 0 && { width: _width - _moderateScale(8 * 3) }]}
                                                source={{
                                                    uri: item?.link ? `${URL_ORIGINAL}${item?.link}` : item?.uri
                                                }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        <>
                        </>
                }
                {
                    !isEmpty(postsRedux?.currEditPost?.images) && postsRedux?.currEditPost?.images?.length == 4 ?
                        <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }]}>
                            {
                                postsRedux?.currEditPost?.images.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onLongPress={() => {
                                                _handleShowEditGalleryCurr()
                                            }}
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            style={[index == 0 && { marginBottom: _moderateScale(4) }, index == 2 && { marginHorizontal: _moderateScale(4) }]} key={index} activeOpacity={0.8}>
                                            <Image
                                                style={[{
                                                    width: (_width - _moderateScale(8 * 3)) / 3 - _moderateScale(2),
                                                    height: _width / 3,
                                                    borderRadius: _moderateScale(8)
                                                },
                                                index == 0 && { width: _width - _moderateScale(8 * 3), height: _width / 1.5 }]}
                                                source={{
                                                    uri: item?.link ? `${URL_ORIGINAL}${item?.link}` : item?.uri
                                                }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        <>
                        </>
                }
                {
                    !isEmpty(postsRedux?.currEditPost?.images) && postsRedux?.currEditPost?.images?.length > 4 ?
                        <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }]}>
                            {
                                postsRedux?.currEditPost?.images.map((item, index) => {
                                    if (index > 3) return
                                    return (
                                        <TouchableOpacity
                                            onLongPress={() => {
                                                _handleShowEditGalleryCurr()
                                            }}
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            style={[index == 0 && { marginBottom: _moderateScale(4) }, index == 2 && { marginHorizontal: _moderateScale(4) }]} key={index} activeOpacity={0.8}>
                                            <ImageBackground
                                                style={[{
                                                    width: (_width - _moderateScale(8 * 3)) / 3 - _moderateScale(2),
                                                    height: _width / 3,
                                                    borderRadius: _moderateScale(8),
                                                    overflow: 'hidden'
                                                },
                                                index == 0 && { width: _width - _moderateScale(8 * 3), height: _width / 1.5 }]}
                                                source={{
                                                    uri: item?.link ? `${URL_ORIGINAL}${item?.link}` : item?.uri
                                                }} >
                                                {
                                                    index == 3 &&
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                                        <View style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundColor: 'rgba(0, 0, 0,0.4)',
                                                            // opacity: 0.3,
                                                            zIndex: 1,
                                                            position: 'absolute',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(8 * 3), color: Color.WHITE }]}>
                                                                {`+ ${postsRedux?.currEditPost?.images.length - 4}`}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                }
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        <>
                        </>
                }

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    btnVideoWatch: {
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8),
        paddingRight: _moderateScale(12),
        borderWidth: _moderateScale(1),
        borderColor: Color.BG_GREY_OPACITY_7,
        alignSelf: 'flex-start',
        borderRadius: _moderateScale(8),
        marginRight: _moderateScale(8),
        marginBottom: _moderateScale(8)
    },
    itemGall: {
        width: _moderateScale(8 * 22),
        height: _moderateScale(8 * 22),
        borderRadius: _moderateScale(8)
    },
    textInput: {
        fontSize: _moderateScale(16),
        maxHeight: _moderateScale(8 * 20)
    },
    inputView__avatar: {
        width: _moderateScale(8 * 5.5),
        height: _moderateScale(8 * 5.5),
        borderRadius: _moderateScale(8 * 5.5 / 2),
        borderWidth: _moderateScale(0.5),
        borderColor: Color.BG_GREY_OPACITY_5,
        marginRight: _moderateScale(8 * 2)
    },
    inputView: {
        // paddingHorizontal: _moderateScale(8 * 2)
    },
    content__header: {
        height: _moderateScale(50),
        width: _width,
        backgroundColor: Color.WHITE,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingRight: _widthScale(16),
        paddingHorizontal: _moderateScale(8)
    },
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    }
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
        Color.BASE_COLOR,
        'rgba(104, 47, 144,.4)'
    ]
}

export default UpdateNewFeed;