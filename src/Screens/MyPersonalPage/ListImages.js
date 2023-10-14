import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useCallback, useState, memo } from 'react';
import {
    Animated, Image, StyleSheet, Text, TextInput,
    RefreshControl, ActivityIndicator,
    TouchableOpacity, View, FlatList, ImageBackground, ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, BLACK_OPACITY_7 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale, _width } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from 'react-native-fast-image'
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { getAllPost, getMoreAllPost } from '../../Redux/Action/PostAction';
import isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import { getMinePartnerPost, getPartnerPostFile } from '../../Redux/Action/PostAction'
import ItemPost from './Components/ItemPost';
import ItemDiary from './Components/ItemDiary';
import { getPartnerDiaryv2 } from '../../Redux/Action/Diary';
import ImageView from "react-native-image-viewing";


const ListImages = memo((props) => {

    const [listImages, setListImages] = useState([])

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    useEffect(() => {
        _getPartnerPostFile()
    }, [])

    const _getPartnerPostFile = async () => {
        let result = await getPartnerPostFile({
            "condition": {
                "type": {
                    "equal": "image",
                },
                "partnerId": {
                    "equal": props?.idUser
                }
            },
            "sort": {
                "created": -1
            },
        })
        if (result?.isAxiosError) return
        setListImages(result?.data?.data)
    }

    return (
        <View style={{ flex: 1 }}>

            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.file?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {
                    listImages?.length > 0 ?
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                listImages?.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setShowImageViewing(true)
                                            setIndexCurrImageView(index)
                                            setListImagesSeeCurr(listImages)
                                        }}>
                                            {/* <Image style={styles.image} source={{
                                        uri: `${URL_ORIGINAL}${item?.file?.link}`
                                    }} /> */}
                                            <FastImage
                                                style={styles.image}
                                                source={{
                                                    uri: `${URL_ORIGINAL}${item?.file?.link}`,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        <View style={[{ flex: 1 }, styleElement.centerChild]}>
                            <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>Chưa có dữ liệu</Text>
                        </View>
                }


            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    image: {
        width: _width / 3,
        height: _width / 3
    }
})

export default ListImages;