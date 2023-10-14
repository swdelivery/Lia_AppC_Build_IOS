import { isEmpty } from 'lodash';
import React, { memo, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FileViewer from "react-native-file-viewer";
import RNFS from 'react-native-fs';
import ImageView from "react-native-image-viewing";
import FastImage from '../../../Components/Image/FastImage';
import * as Color from '../../../Constant/Color';
import { GREY, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';



const ImagesPost = memo((props) => {
    const [isShowGallery, setShowGallery] = useState(false)
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [itemIsDownload, setItemIsDownload] = useState(null)



    return (
        <>
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
                                            source={require('../../../Icon/video_grey.png')} />
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
                                            source={require('../../../Icon/file_grey.png')} />
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
                    <View style={[styles.galleryView, { alignItems: 'center', marginBottom: _moderateScale(8 * 2) }]}>
                        {
                            props?.data?.images?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowGallery(true)
                                            setIndexCurrImageView(index)
                                        }}
                                        style={{}} key={index} activeOpacity={0.8}>
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
                    <View style={[{ flexDirection: 'row', justifyContent: 'center', marginBottom: _moderateScale(8 * 2) }]}>
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
                                        <Image
                                            style={{
                                                width: (_width - _moderateScale(8 * 3) - _moderateScale(2)) / 2,
                                                height: _width,
                                                borderRadius: _moderateScale(8)
                                            }}
                                            source={{
                                                uri: `${URL_ORIGINAL}${item.link}`
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
                !isEmpty(props?.data?.images) && props?.data?.images?.length == 3 ?
                    <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: _moderateScale(8 * 2) }]}>
                        {
                            props?.data?.images.map((item, index) => {
                                return (
                                    <TouchableOpacity
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
                                                uri: `${URL_ORIGINAL}${item.link}`
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
                !isEmpty(props?.data?.images) && props?.data?.images?.length == 4 ?
                    <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: _moderateScale(8 * 2) }]}>
                        {
                            props?.data?.images.map((item, index) => {
                                return (
                                    <TouchableOpacity
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
                                                uri: `${URL_ORIGINAL}${item.link}`
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
                !isEmpty(props?.data?.images) && props?.data?.images?.length > 4 ?
                    <View style={[{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: _moderateScale(8 * 2) }]}>
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
        </>
    );
});


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
})



export default ImagesPost;