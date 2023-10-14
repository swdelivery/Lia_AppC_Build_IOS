import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FileViewer from "react-native-file-viewer";
import RNFS from 'react-native-fs';
import ImageView from "react-native-image-viewing";
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, GREY, GREY_FOR_TITLE, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { likePost, removePost } from '../../Redux/Action/PostAction';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from '../../Redux/Store';






const ItemPost = props => {
    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state.infoUserReducer)

    const [isShowGallery, setShowGallery] = useState(false)
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [loadingLikeCmt, setLoadingLikeCmt] = useState(false)
    const [itemIsDownload, setItemIsDownload] = useState(null)

    useEffect(() => {

    }, [])

    const _handleChoiceOptions = (key, data) => {
        switch (key) {
            case "Chỉnh sửa":
                Store.dispatch({
                    type: ActionType.SET_CURR_EDIT_POST,
                    payload: {
                        data: props?.data
                    }
                })
                navigation.navigate(ScreenKey.MODAL_UPDATE_NEW_FEED)
                return

            // return props.navigation.navigate(ScreenKey.INFOTASK) 
            case "Xoá":
                setTimeout(() => {
                    Alert.alert(
                        "Xác nhận",
                        "Bạn có chắc muốn xoá bài viết này?",
                        [
                            {
                                text: "Huỷ",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "Đồng ý", onPress: () => dispatch(removePost(props?.data?._id)) }
                        ],
                        { cancelable: false }
                    );
                }, 500);
                return


            default:
                break;
        }
    }

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate(ScreenKey.MODAL_COMMENT_POST, { postId: props.data._id, data: props.data })
                }}
                style={[styles.container]}>

                <ImageView
                    images={props?.data?.images?.map(item => {
                        return {
                            uri: `${URL_ORIGINAL}${item.link}`,
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

                <View style={[styles.header]}>
                    <View style={[styles.avatarAndTitle]}>
                        <FastImage
                            style={[styles.avatarAndTitle__avatar]}
                            uri={props?.data?.userCreate?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.userCreate?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                        />
                        <View style={[styles.avatarAndTitle__titleAndTime]}>
                            <Text style={[stylesFont.fontNolan500, styles.avatarAndTitle__titleAndTime__title]}>
                                {
                                    `${props?.data?.userCreate?.profile.firstName} ${props?.data?.userCreate?.profile.lastName}`
                                }

                                {/* {
                                    randomStringFixLengthCode(10)
                                } */}
                            </Text>
                            <Text style={[stylesFont.fontNolan, styles.avatarAndTitle__titleAndTime__time]}>
                                {moment(props?.data?.created).startOf('minute').fromNow()}
                            </Text>
                        </View>
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => {

                            Store.dispatch({
                                type: ActionType.SET_CURR_EDIT_POST,
                                payload: {
                                    data: props?.data
                                }
                            })
                            navigation.navigate(ScreenKey.MODAL_UPDATE_NEW_FEED)
                        }}
                        style={{}}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/more.png')} />
                    </TouchableOpacity> */}
                    {
                        props?.data?.userCreate?._id == infoUserRedux.infoUser._id ?
                            <Dropdown
                                data={[{
                                    value: 'Chỉnh sửa',
                                }, {
                                    value: 'Xoá',
                                }
                                ]}
                                onChangeText={(itemOption) => {
                                    // setDialogVisible(true)
                                    _handleChoiceOptions(itemOption)
                                    // alert('a;pp')

                                }}
                                itemColor={'#000'}
                                selectedItemColor={"#000"}
                                renderBase={() => (<Image
                                    style={[sizeIcon.lg]}
                                    source={require('../../Icon/more.png')} />)}
                                rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                dropdownPosition={1}
                                pickerStyle={{
                                    width: _moderateScale(8 * 17),
                                    left: null,
                                    right: 40,
                                    marginRight: 8,
                                    marginTop: 24,
                                }}
                            />
                            :
                            <>
                            </>
                    }

                </View>
                <View

                    style={[styles.contentView]}>
                    <Text numberOfLines={4} style={[stylesFont.fontNolan, styles.contentView__text]}>
                        {props?.data?.content}
                    </Text>
                </View>

                <View style={{
                    marginBottom: _moderateScale(8),
                    flexWrap: 'wrap',
                    paddingLeft: _moderateScale(12),
                    flexDirection: 'row'
                }}>
                    {
                        !isEmpty(props?.data?.videos) && props?.data?.videos.map((itemMap, indexMap) => {
                            return (
                                <TouchableOpacity
                                    key={indexMap}
                                    style={[styleElement.rowAliCenter, styles.btnVideoWatch]}
                                    onPress={async () => {
                                        // await FileViewer.open(`${URL_ORIGINAL}${infoMessage?.documents[0]?.link}`);
                                        setItemIsDownload(itemMap._id)

                                        RNFS.downloadFile({
                                            fromUrl: `${URL_ORIGINAL}${itemMap?.link}`,
                                            toFile: `${RNFS.DocumentDirectoryPath}/${itemMap?.originalName}`
                                        }).promise
                                            .then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/${itemMap?.originalName}`))
                                            .then(() => {
                                                // success 
                                                setItemIsDownload(null)
                                            })
                                            .catch(error => {
                                                setItemIsDownload(null)

                                                // error
                                            });
                                    }}>
                                    {
                                        !isEmpty(itemIsDownload) && itemIsDownload == itemMap._id ?
                                            <ActivityIndicator size={_moderateScale(22)} color={GREY} />
                                            :
                                            <Image
                                                style={[sizeIcon.lg]}
                                                source={require('../../Icon/video_grey.png')} />
                                    }

                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(4) }]}>
                                        {itemMap.originalName}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    {
                        !isEmpty(props?.data?.documents) && props?.data?.documents.map((itemMap, indexMap) => {
                            return (
                                <TouchableOpacity
                                    key={indexMap}
                                    style={[styleElement.rowAliCenter, styles.btnVideoWatch]}
                                    onPress={async () => {
                                        // await FileViewer.open(`${URL_ORIGINAL}${infoMessage?.documents[0]?.link}`);
                                        setItemIsDownload(itemMap._id)
                                        RNFS.downloadFile({
                                            fromUrl: `${URL_ORIGINAL}${itemMap?.link}`,
                                            toFile: `${RNFS.DocumentDirectoryPath}/${itemMap?.originalName}`
                                        }).promise
                                            .then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/${itemMap?.originalName}`))
                                            .then(() => {
                                                // success 
                                                setItemIsDownload(null)

                                            })
                                            .catch(error => {
                                                setItemIsDownload(null)

                                                // error
                                            });
                                    }}>
                                    {
                                        !isEmpty(itemIsDownload) && itemIsDownload == itemMap._id ?
                                            <ActivityIndicator size={_moderateScale(22)} color={GREY} />
                                            :
                                            <Image
                                                style={[sizeIcon.lg]}
                                                source={require('../../Icon/file_grey.png')} />
                                    }
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(4) }]}>
                                        {itemMap.originalName}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                {
                    !isEmpty(props?.data?.images) && props?.data?.images?.length == 1 ?
                        <View style={[styles.galleryView, { alignItems: 'center' }]}>
                            {
                                props?.data?.images?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            style={[{}]} key={index} activeOpacity={0.8}>
                                            <FastImage
                                                style={[{
                                                    width: _width - _moderateScale(8 * 3),
                                                    height: _width,
                                                    borderRadius: _moderateScale(8)
                                                }]}
                                                uri={`${URL_ORIGINAL}${item.link}`}
                                            />
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
                    !isEmpty(props?.data?.images) && props?.data?.images?.length == 2 ?
                        <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
                            {
                                props?.data?.images.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={index == 1 && { marginLeft: _moderateScale(4) }}
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            key={index} activeOpacity={0.8}>
                                            <FastImage
                                                style={[{
                                                    width: (_width - _moderateScale(8 * 3) - _moderateScale(2)) / 2,
                                                    height: _width,
                                                    borderRadius: _moderateScale(8)
                                                }]}
                                                uri={`${URL_ORIGINAL}${item.link}`} />
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
                    !isEmpty(props?.data?.images) && props?.data?.images?.length == 3 ?
                        <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }]}>
                            {
                                props?.data?.images.map((item, index) => {
                                    // if (index == 0) {
                                    //     return (
                                    //         <TouchableOpacity
                                    //             onPress={() => {
                                    //                 setShowGallery(true)
                                    //                 setIndexCurrImageView(index)
                                    //             }}
                                    //             style={[index == 0 && { marginBottom: _moderateScale(4) }, index == 2 && { marginLeft: _moderateScale(4) }]} key={index} activeOpacity={0.8}>
                                    //             <Image
                                    //                 style={[{
                                    //                     width: (_width - _moderateScale(8 * 3)) / 2 - _moderateScale(2),
                                    //                     height: _width / 2,
                                    //                     borderRadius: _moderateScale(8)
                                    //                 }, index == 0 && { width: _width - _moderateScale(8 * 3) }]}
                                    //                 source={{ uri: `${URL_ORIGINAL}${item.link}` }} />
                                    //         </TouchableOpacity>
                                    //     )
                                    // } 
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            style={[index == 0 && { marginBottom: _moderateScale(4) }, index == 2 && { marginLeft: _moderateScale(4) }]} key={index} activeOpacity={0.8}>
                                            <FastImage
                                                width={index == 0 ? _width - _moderateScale(8 * 3) : (_width - _moderateScale(8 * 3)) / 2 - _moderateScale(2)}
                                                style={[{
                                                    width: (_width - _moderateScale(8 * 3)) / 2 - _moderateScale(2),
                                                    height: _width / 2,
                                                    borderRadius: _moderateScale(8)
                                                }, index == 0 && { width: _width - _moderateScale(8 * 3) }]}
                                                uri={`${URL_ORIGINAL}${item.link}`} />
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
                    !isEmpty(props?.data?.images) && props?.data?.images?.length == 4 ?
                        <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }]}>
                            {
                                props?.data?.images.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            style={[index == 0 && { marginBottom: _moderateScale(4) }, index == 2 && { marginHorizontal: _moderateScale(4) }]} key={index} activeOpacity={0.8}>
                                            <FastImage
                                                width={index == 0 ? _width - _moderateScale(8 * 3) : (_width - _moderateScale(8 * 3)) / 3 - _moderateScale(2)}
                                                style={[{
                                                    width: (_width - _moderateScale(8 * 3)) / 3 - _moderateScale(2),
                                                    height: _width / 3,
                                                    borderRadius: _moderateScale(8)
                                                },
                                                index == 0 && { width: _width - _moderateScale(8 * 3), height: _width / 1.5 }]}
                                                uri={`${URL_ORIGINAL}${item.link}`} />
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
                    !isEmpty(props?.data?.images) && props?.data?.images?.length > 4 ?
                        <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }]}>
                            {
                                props?.data?.images?.map((item, index) => {
                                    if (index > 3) return

                                    if (index < 3) return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowGallery(true)
                                                setIndexCurrImageView(index)
                                            }}
                                            style={[index == 0 && { marginBottom: _moderateScale(4) }, index == 2 && { marginHorizontal: _moderateScale(4) }]} key={index} activeOpacity={0.8}>
                                            <FastImage
                                                width={index == 0 ? _width - _moderateScale(8 * 3) : (_width - _moderateScale(8 * 3)) / 3 - _moderateScale(2)}
                                                style={[{
                                                    width: (_width - _moderateScale(8 * 3)) / 3 - _moderateScale(2),
                                                    height: _width / 3,
                                                    borderRadius: _moderateScale(8),
                                                    overflow: 'hidden'
                                                },
                                                index == 0 && { width: _width - _moderateScale(8 * 3), height: _width / 1.5 }]}
                                                uri={
                                                    `${URL_ORIGINAL}${item.link}`
                                                } />

                                        </TouchableOpacity>
                                    )

                                    return (
                                        <TouchableOpacity
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
                                                    uri: `${URL_ORIGINAL}${item.link}`
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
                                                            <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(8 * 3), color: WHITE }]}>
                                                                {`+ ${props?.data?.images.length - 4}`}
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

                <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginHorizontal: _moderateScale(8 * 1.5), marginVertical: _moderateScale(8) }]}>
                    <TouchableOpacity style={[styleElement.rowAliCenter]}>

                        <View style={[
                            {
                                width: _moderateScale(8 * 2.5),
                                height: _moderateScale(8 * 2.5),
                                borderRadius: _moderateScale(8 * 2.5 / 2),
                                // backgroundColor: BASE_COLOR,
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden'
                            }
                        ]}>
                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                colors={gradient.color}
                                style={gradient.container}>
                                <Image style={sizeIcon.xxxs} source={require('../../Icon/like_fill_white.png')} />
                            </LinearGradient>
                        </View>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(8), color: GREY }]}>
                            {props?.data?.likersCount} lượt thích
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate(ScreenKey.MODAL_COMMENT_POST, { postId: props.data._id, data: props.data })
                    }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                            {props?.data?.commentsCount} bình luận
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8), borderTopWidth: _moderateScale(0.5), borderTopColor: BG_GREY_OPACITY_5, flex: 1, justifyContent: 'space-between' }]}>
                    <TouchableOpacity
                        onPress={() => {
                            setLoadingLikeCmt(true)
                            dispatch(likePost({
                                postId: props.data._id,
                                isLike: props?.data?.likerIdArr.find(itemFind => itemFind == infoUserRedux.infoUser._id) ? false : true
                            }, setLoadingLikeCmt))
                        }}
                        style={[styleElement.rowAliCenter, { flex: 1, width: _widthScale(8 * 15), justifyContent: 'center' }]}>
                        {
                            loadingLikeCmt ?
                                <>
                                    <ActivityIndicator color={Platform.OS !== 'ios' && GREY} size={'small'} />
                                </>
                                :
                                <>
                                    {
                                        props?.data?.likerIdArr.find(itemFind => itemFind == infoUserRedux.infoUser._id) ?
                                            <Image
                                                style={[sizeIcon.lg, { opacity: 0.9 }]}
                                                source={require('../../Icon/a_like.png')} />
                                            :
                                            <Image
                                                style={[sizeIcon.lg]}
                                                source={require('../../Icon/i_like.png')} />
                                    }
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(8), color: GREY },
                                    props?.data?.likerIdArr.find(itemFind => itemFind == infoUserRedux.infoUser._id) ? [stylesFont.fontNolanBold, { color: BASE_COLOR }] : {}
                                    ]}>
                                        Thích
                                    </Text>
                                </>
                        }



                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.MODAL_COMMENT_POST, { postId: props.data._id, data: props.data })
                        }}
                        style={[styleElement.rowAliCenter, { flex: 1, width: _widthScale(8 * 15), justifyContent: 'center' }]}>
                        <Image
                            style={[sizeIcon.md]}
                            source={require('../../Icon/i_comment.png')} />
                        <Text style={[stylesFont.fontNolan500, { marginBottom: _moderateScale(4), fontSize: _moderateScale(14), marginLeft: _moderateScale(8), color: GREY }]}>
                            Bình luận
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            {
                props?.lasted ?
                    <>
                    </>
                    :
                    <View style={{ height: _moderateScale(8), backgroundColor: '#E3E9F1' }} />
            }
        </>
    );
};


const styles = StyleSheet.create({
    btnVideoWatch: {
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8),
        paddingRight: _moderateScale(12),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_7,
        alignSelf: 'flex-start',
        borderRadius: _moderateScale(8),
        marginRight: _moderateScale(8),
        marginBottom: _moderateScale(8)
    },
    contentView__text: {
        fontSize: _moderateScale(14),
        lineHeight: _moderateScale(8 * 2.5),
        textAlign: 'justify'
    },
    contentView: {
        marginVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    },
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
        width: _moderateScale(8 * 5.5),
        height: _moderateScale(8 * 5.5),
        borderRadius: _moderateScale(8 * 5.5 / 2),
        // borderWidth: _moderateScale(0.5),
        // borderColor: BG_GREY_OPACITY_5
    },
    avatarAndTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        paddingHorizontal: _moderateScale(8 * 2),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        backgroundColor: WHITE,
        paddingVertical: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(8),
        // marginTop: _moderateScale(8)
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
        BASE_COLOR,
        'rgba(104, 47, 144,.4)'
    ]
}


export default (ItemPost);