import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Clipboard } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SET_CURRENT_LIST_COMMENT_CHILD } from '../../Redux/Constants/ActionType';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getAllPostComment, getPostById, getPostByIdv2, createPostReaction, addReactionPost } from '../../Redux/Action/PostAction';
import { AppState } from 'react-native'
import SocketInstance from '../../../SocketInstance'
import BackgroundTimer from "react-native-background-timer";
import { CSS_PARTNER_POST_JOIN_ROOM, CSS_PARTNER_POST_LEFT_ROOM } from '../../Sockets/type'
import isEmpty from 'lodash/isEmpty';
import ListImage from '../NewFeed/Component/ListImage';
import { getPartnerDiaryDailyByIdv2 } from '../../Redux/Action/PartnerDiary';
import ScreenKey from '../../Navigation/ScreenKey'
import * as ActionType from '../../Redux/Constants/ActionType'
import ImageView from "react-native-image-viewing";
import store from "../../Redux/store";
import { TabBar, TabView } from 'react-native-tab-view';
import { getCurrentCollaborator } from '../../Redux/Action/Affiilate'
import Header from '../../Components/HeaderLoseWeight';
import { _getServiceShareTemplate } from '../../Redux/Action/Service'
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { alertCustomNotAction } from '../../Constant/Utils';
import ModalFlashMsg from '../../Components/ModalFlashMsg/ModalFlashMsg';
import ModalTutorialShare from './Components/ModalTutorialShare';
import { getConfigData } from '../../Redux/Action/OrtherAction';


const fs = RNFetchBlob.fs;

const ShareToSocial = memo((props) => {

    const noticeNotAutoShowTutRedux = useSelector(state => state?.authReducer?.noticeNotAutoShowTut)

    const [listTemplate, setListTemplate] = useState([])
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [currTemplate, setCurrTemplate] = useState()

    const [currData, setCurrData] = useState({
        text: '',
        image: []
    })

    const [listIdImageHide, setListIdImageHide] = useState([])

    const [showModalFlashMsg, setShowModalFlashMsg] = useState(false)
    const [showModalTutorialShare, setShowModalTutorialShare] = useState(false)

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    const [codeYoutube, setCodeYoutube] = useState('')



    useEffect(() => {
        if (listTemplate?.length > 0) {
            setCurrTemplate(listTemplate[0])
        }

    }, [listTemplate])

    useEffect(() => {
        if (currTemplate?.images?.length > 0) {
            setListIdImageHide([currTemplate?.images[0]])
        }
    }, [currTemplate])

    useEffect(() => {
        getServiceShareTemplate()
        console.log({ infoUserRedux });

        if (noticeNotAutoShowTutRedux) {
            setTimeout(() => {
                setShowModalTutorialShare(true)

            }, 700);
        }
        _getconfigData()

    }, [])
    const _getconfigData=async()=>{
        let result = await getConfigData("SHARECTV")
        if (result?.isAxiosError) return
        setCodeYoutube(result?.value)
    }

    const getServiceShareTemplate = async () => {
        if (props?.route?.params?.idService) {
            let result = await _getServiceShareTemplate(props?.route?.params?.idService)
            if (result?.isAxiosError) return
            setListTemplate(result?.data?.data)
        }
    }

    const handleShowHideImg = (data) => {
        console.log({ data });
        if (listIdImageHide?.find(item => item?._id == data?._id)) {
            setListIdImageHide([...listIdImageHide]?.filter(item => item?._id !== data?._id))
        } else {
            setListIdImageHide([...listIdImageHide, data])
        }
    }

    // const _handleShare = async () => {
    //     console.log({ currTemplate, listIdImageHide });
    //     // let content = `${currTemplate?.content} \n ${linkShare}`
    //     let idTemplate = currTemplate?._id
    //     let imagesPath = []
    //     currTemplate?.images?.map(item => {
    //         if (listIdImageHide?.find(itemFind => itemFind == item?._id)) {
    //         } else {
    //             return imagesPath?.push(`${URL_ORIGINAL}${item?.link}`)
    //         }
    //     })

    //     console.log({ imagesPath, content, idTemplate });

    //     // Clipboard.setString(content)
    //     setShowModalFlashMsg(true)
    //     setTimeout(() => {
    //         setShowModalFlashMsg(false)
    //     }, 1500);

    //     let linkShare = await _generateLink(`pid`, idTemplate, `codeAffiliate`, infoUserRedux?.collaboratorCode, `idService`, currTemplate?.service?._id, `idImage`, listIdImageHide[0])
    //     let content = `${currTemplate?.content}`
    //     Clipboard.setString(content)

    //     console.log({ linkShare });
    //     // here's base64 encoded image
    //     let shareImage = {
    //         title: ` `, //string
    //         urls: [`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`,
    //             `data:image/png;base64,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`
    //         ]
    //     };
    //     Share.open(shareImage)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             err && console.log(err);
    //         });

    //     // let imagePath = null;
    //     // RNFetchBlob.config({
    //     //     fileCache: true,
    //     // })
    //     //     .fetch('GET', imagesPath[0])
    //     //     // the image is now dowloaded to device's storage
    //     //     .then((resp) => {
    //     //         // the image path you can use it directly with Image component
    //     //         imagePath = resp.path();
    //     //         return resp.readFile('base64');
    //     //     })
    //     //     .then(async (base64Data) => {
    //     //         let linkShare = await _generateLink(`pid`, idTemplate, `codeAffiliate`, infoUserRedux?.collaboratorCode, `idService`, currTemplate?.service?._id)
    //     //         console.log({ linkShare });
    //     //         // here's base64 encoded image
    //     //         var imageUrl = 'data:image/png;base64,' + base64Data;
    //     //         let shareImage = {
    //     //             title: `productDetails.product_name`, //string
    //     //             message: `${content} \n ${linkShare}`,

    //     //             // url: imageUrl,
    //     //             // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
    //     //         };
    //     //         Share.open(shareImage)
    //     //             .then((res) => {
    //     //                 console.log(res);
    //     //             })
    //     //             .catch((err) => {
    //     //                 err && console.log(err);
    //     //             });
    //     //         // remove the file from storage
    //     //         return fs.unlink(imagePath);
    //     //     });

    // }

    const _handleShare = async () => {

        let listBase64 = []
        let imagePath = null;

        for (const item of listIdImageHide) {

            let result = await RNFetchBlob.config({
                fileCache: true,
            }).fetch('GET', `${URL_ORIGINAL}${item?.link}`)

            imagePath = result.path();
            let base64Data = await result.readFile('base64');

            console.log({ base64Data });

            let imageBase64 = 'data:image/png;base64,' + base64Data;
            listBase64?.push(imageBase64)
            fs.unlink(imagePath);
        }
        console.log({ listBase64 });
        if (listBase64?.length == 0) return alertCustomNotAction(`Lỗi`,`Vui lòng chọn ít nhất 1 hình ảnh để chia sẻ`)

        let content = `${currTemplate?.content}`
        Clipboard.setString(content)

        let shareImage = {
            title: ` `, //string
            urls: listBase64
        };
        Share.open(shareImage)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    return (
        <View style={styles.container}>

            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}/${item?.path}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            <ModalFlashMsg
                show={showModalFlashMsg}
                hide={() => {
                    setShowModalFlashMsg(false)
                }}
                data={'Đã copy nội dung bài viết.'} />

            <ModalTutorialShare
                codeYoutube={codeYoutube}
                show={showModalTutorialShare}
                hide={() => {
                    setShowModalTutorialShare(false)
                }} />

            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingVertical: _moderateScale(8 * 1.5),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
                justifyContent: 'space-between'
            }}>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/back_bold.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                            Nội dung chia sẻ
                        </Text>
                    }
                </View>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                </View>
            </View>

            <View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{
                        flexDirection: 'row',
                        height: _moderateScale(8 * 5),
                    }}>
                        {
                            listTemplate?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', marginHorizontal: _moderateScale(8) }}
                                        onPress={() => {
                                            setCurrTemplate(item)
                                        }}>
                                        <View
                                            style={styles.btnTemplate}
                                            key={item?._id}>
                                            <Text>
                                                Mẫu số {index + 1}
                                            </Text>
                                        </View>
                                        {
                                            currTemplate?._id == item?._id ?
                                                <View style={{
                                                    height: _moderateScale(2),
                                                    backgroundColor: RED,
                                                    position: 'absolute',
                                                    width: '100%',
                                                    bottom: 0
                                                }} />
                                                :
                                                <></>
                                        }
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>

            {
                currTemplate?.content ?
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1, paddingVertical: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                {
                                    currTemplate?.content
                                }
                            </Text>
                            <View style={{ height: 100 }} />
                        </ScrollView>
                    </View>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                            Chưa có dữ liệu
                        </Text>
                    </View>
            }
            <View style={{ paddingTop: _moderateScale(8), borderTopWidth: 1, borderColor: BG_GREY_OPACITY_5 }}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2) }} showsHorizontalScrollIndicator={false} horizontal>
                    {
                        currTemplate?.images?.map((item, index) => {
                            return (
                                <View style={[
                                    { borderRadius: _moderateScale(8), width: _moderateScale(8 * 13), height: _moderateScale(8 * 13), marginRight: _moderateScale(8 * 2), borderWidth: 2, borderColor: 'transparent' },
                                    listIdImageHide?.find(itemFind => itemFind?._id == item?._id) && { borderWidth: 2, borderColor: BLUE_FB }
                                ]}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        // onPress={() => handleShowHideImg(item)}
                                        onPress={() => {
                                            setShowImageViewing(true)
                                            setIndexCurrImageView(index)
                                            setListImagesSeeCurr(currTemplate?.images)
                                        }}
                                        style={{}}>
                                        {
                                            listIdImageHide?.find(itemFind => itemFind?._id == item?._id) ?
                                                <></>
                                                :
                                                <View style={[StyleSheet.absoluteFillObject, {
                                                    // width: _moderateScale(8 * 13), height: _moderateScale(8 * 13),
                                                    backgroundColor: BG_GREY_OPACITY_5,
                                                    position: 'absolute',
                                                    zIndex: 100,
                                                    borderRadius: _moderateScale(8)
                                                }]} />
                                        }

                                        <Image
                                            style={{
                                                // width: _moderateScale(8 * 13),
                                                // height: _moderateScale(8 * 13),
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: _moderateScale(8)
                                            }}
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.link}`
                                            }} />
                                    </TouchableOpacity>

                                    {
                                        listIdImageHide?.find(itemFind => itemFind?._id == item?._id) ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleShowHideImg(item)
                                                }}
                                                style={{
                                                    width: _moderateScale(8 * 3),
                                                    height: _moderateScale(8 * 3),
                                                    borderRadius: _moderateScale(8 * 1.5),
                                                    position: 'absolute',
                                                    top: _moderateScale(4),
                                                    right: _moderateScale(4),
                                                    backgroundColor: BLUE_FB,
                                                    borderWidth: _moderateScale(4),
                                                    borderColor: WHITE
                                                }} />
                                            :
                                            <TouchableOpacity
                                                hitSlop={styleElement.hitslopSm}
                                                onPress={() => {
                                                    handleShowHideImg(item)
                                                }}
                                                style={{
                                                    width: _moderateScale(8 * 3),
                                                    height: _moderateScale(8 * 3),
                                                    borderRadius: _moderateScale(8 * 1.5),
                                                    position: 'absolute',
                                                    top: _moderateScale(4),
                                                    right: _moderateScale(4),
                                                    backgroundColor: WHITE,
                                                    borderWidth: _moderateScale(4),
                                                    borderColor: WHITE
                                                }} />
                                    }




                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{
                flexDirection: 'row', paddingVertical: _moderateScale(8),
                paddingBottom: getBottomSpace() + _moderateScale(8),
                paddingHorizontal: _moderateScale(8 * 2),
                backgroundColor: WHITE,
                borderTopWidth: 0.5,
                borderColor: BG_GREY_OPACITY_5
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setShowModalTutorialShare(true)
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: BASE_COLOR,
                        flex: 2,
                    }]}>

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BASE_COLOR }]}>
                        Hướng dẫn
                    </Text>
                </TouchableOpacity>
                <View style={{ width: _moderateScale(8 * 1.5) }} />

                <TouchableOpacity
                    onPress={() => {
                        _handleShare()
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: BASE_COLOR,
                        flex: 4
                    }]}>

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                        Chia sẻ
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    btnTemplate: {
        paddingHorizontal: _moderateScale(8 * 1),
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})

export default ShareToSocial;