import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, BLACK_OPACITY_7, MAIN_BG, BG_GREY_OPACITY_2 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
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
import { getListDiaryByType } from '../../Redux/Action/Diary'
import { getDataServiceFiles } from '../../Redux/Action/Service';
import ModalIframeYoutube from '../../Components/ModalIframeYoutube/ModalIframeYoutube';

const StorageVideo = memo((props) => {

    const [listVideo, setListVideo] = useState([])
    const [playingYoutube, setPlayingYoutube] = useState({
        show: false,
        playList: [],
        playListStartIndex: 0
    })

    useEffect(() => {
        _getData()

    }, [])

    const _getData = async () => {
        let result = await getDataServiceFiles(props?.route?.params?.idService, {
            condition: {
                type: {
                    equal: 'video'
                },
            },
            limit: 1000,
            sort:{
                created:1
            }
        })

        if (result?.isAxiosError) return

        if (result?.data?.data?.length == 0) {
            return
        }
        setListVideo(result?.data?.data)
        setPlayingYoutube(old => {
            return {
                ...old,
                show: false,
                playList: result?.data?.data?.map(item => item?.file?.link),
                playListStartIndex: 0
            }
        })

    }



    const _renderItemVideo = (({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setPlayingYoutube(old => {
                        return {
                            ...old,
                            show: true,
                            playListStartIndex: index
                        }
                    })
                }}
                style={[{
                    width:_widthScale(335),
                    backgroundColor: WHITE,
                    borderBottomStartRadius: _moderateScale(8),
                    borderBottomEndRadius: _moderateScale(8),
                    marginTop:_moderateScale(8*2),
                }, shadow]}>
                <View style={{
                    width:_widthScale(335),
                    height:_widthScale(189),
                    // height: _widthScale(8 * 17),
                    borderTopStartRadius: _moderateScale(8),
                    borderTopEndRadius: _moderateScale(8),
                    backgroundColor: BG_GREY_OPACITY_2,
                    overflow: 'hidden'
                }}>
                    <ImageBackground
                        style={[{
                            width: '100%',
                            height: '100%'
                        }, styleElement.centerChild]}
                        source={{
                            uri: `https://img.youtube.com/vi/${item?.file?.link}/0.jpg`
                        }}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />

                        <Image style={sizeIcon.xxlllg} source={require('../../NewIcon/circlePlay.png')} />
                    </ImageBackground>
                </View>
                <View style={{
                    width: '100%', borderWidth: _moderateScale(1), borderColor: BG_GREY_OPACITY_5, paddingHorizontal: _moderateScale(8), paddingTop: _moderateScale(4),
                    borderBottomStartRadius: _moderateScale(8),
                    borderBottomEndRadius: _moderateScale(8),
                    paddingVertical:8
                }}>
                    <Text style={{
                        ...stylesFont.fontNolan500,
                        fontSize:_moderateScale(15),
                        color:GREY_FOR_TITLE
                    }}>
                        {index + 1}. {item?.file?.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    })

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);

    return (
        <View style={styles.container}>
             <ModalIframeYoutube
                playList={playingYoutube?.playList}
                playListStartIndex={playingYoutube?.playListStartIndex}
                hide={() => {
                    setPlayingYoutube(old => {
                        return {
                            ...old,
                            show: false,
                            // playList: [],
                            playListStartIndex: 0
                        }
                    })
                }}
                show={playingYoutube?.show} />
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingVertical: _moderateScale(8 * 1.5),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
                // height: _moderateScale(8 * 6)
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
                <View style={{ flex: 1 }}>
                    {
                        true ?
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                                Kho Video
                            </Text>
                            : <></>
                    }
                </View>
            </View>


            {
                listVideo?.length > 0 ?
                    <FlatList
                        contentContainerStyle={{alignItems:'center'}}
                        showsVerticalScrollIndicator={false}
                        data={!isEmpty(listVideo) ? listVideo : []}
                        renderItem={_renderItemVideo}
                        keyExtractor={_awesomeChildListKeyExtractor}
                        ListFooterComponent={
                            <View style={{height:100}}/>
                        }
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolan500, color: GREY, fontStyle: 'italic' }}>
                            Chưa có dữ liệu
                        </Text>
                    </View>
            }


        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },


    ///-----end comment-----//
})
const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 11
}


export default StorageVideo;