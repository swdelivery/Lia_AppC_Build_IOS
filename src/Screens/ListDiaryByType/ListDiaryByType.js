import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, BLACK_OPACITY_7, MAIN_BG } from '../../Constant/Color';
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
import { getListDiaryByType } from '../../Redux/Action/Diary'
import ItemDiary from './Components/ItemDiary';

const ListDiaryByType = memo((props) => {

    const [listDiary, setListDiary] = useState([])


    const [currPage, setCurrPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        _getData()

    }, [])

    const _getData = async () => {

        if (props?.route?.params?.type == 'BRANCH') {
            let result = await getListDiaryByType({
                condition: {
                    branchCode: {
                        equal: props?.route?.params?.value
                    }
                },
                limit: 5,
                page: 1,
                sort:{
                    updated:-1
                }
            })
            if (result?.isAxiosError) return
            setListDiary(result?.data?.data)
            if (result?.data?.meta?.totalPage == 0) {
                setTotalPage(0)
                setCurrPage(0)
            } else {
                setTotalPage(result?.data?.meta?.totalPage)
                setCurrPage(result?.data?.meta?.page)
            }
        }

        if (props?.route?.params?.type == 'DOCTOR') {
            let result = await getListDiaryByType({
                condition: {
                    doctorId: {
                        equal: props?.route?.params?.value
                    }
                },
                limit: 5,
                page: 1,
                sort:{
                    updated:-1
                }
            })
            if (result?.isAxiosError) return
            setListDiary(result?.data?.data)
            if (result?.data?.meta?.totalPage == 0) {
                setTotalPage(0)
                setCurrPage(0)
            } else {
                setTotalPage(result?.data?.meta?.totalPage)
                setCurrPage(result?.data?.meta?.page)
            }
        }

        if (props?.route?.params?.type == 'SERVICE') {
            let result = await getListDiaryByType({
                condition: {
                    serviceCode: {
                        equal: props?.route?.params?.value
                    }
                },
                limit: 5,
                page: 1,
                sort:{
                    updated:-1
                }
            })
            if (result?.isAxiosError) return
            setListDiary(result?.data?.data)
            if (result?.data?.meta?.totalPage == 0) {
                setTotalPage(0)
                setCurrPage(0)
            } else {
                setTotalPage(result?.data?.meta?.totalPage)
                setCurrPage(result?.data?.meta?.page)
            }
        }
    }

    const _getMore = async() => {
        if (props?.route?.params?.type == 'BRANCH') {
            let result = await getListDiaryByType({
                condition: {
                    branchCode: {
                        equal: props?.route?.params?.value
                    }
                },
                limit: 5,
                page: currPage + 1,
                sort:{
                    updated:-1
                }
            })
            if (result?.isAxiosError) return
            setListDiary(old=> {
                return[
                    ...old,
                    ...result?.data?.data
                ]
            })
            if (result?.data?.meta?.totalPage == 0) {
                setTotalPage(0)
                setCurrPage(0)
            } else {
                setTotalPage(result?.data?.meta?.totalPage)
                setCurrPage(result?.data?.meta?.page)
            }
        }

        if (props?.route?.params?.type == 'DOCTOR') {
            let result = await getListDiaryByType({
                condition: {
                    doctorId: {
                        equal: props?.route?.params?.value
                    }
                },
                limit: 5,
                page: currPage + 1,
                sort:{
                    updated:-1
                }
            })
            if (result?.isAxiosError) return
            setListDiary(old=> {
                return[
                    ...old,
                    ...result?.data?.data
                ]
            })
            if (result?.data?.meta?.totalPage == 0) {
                setTotalPage(0)
                setCurrPage(0)
            } else {
                setTotalPage(result?.data?.meta?.totalPage)
                setCurrPage(result?.data?.meta?.page)
            }
        }

        if (props?.route?.params?.type == 'SERVICE') {
            let result = await getListDiaryByType({
                condition: {
                    serviceCode: {
                        equal: props?.route?.params?.value
                    }
                },
                limit: 5,
                page: currPage + 1,
                sort:{
                    updated:-1
                }
            })
            if (result?.isAxiosError) return
            setListDiary(old=> {
                return[
                    ...old,
                    ...result?.data?.data
                ]
            })
            if (result?.data?.meta?.totalPage == 0) {
                setTotalPage(0)
                setCurrPage(0)
            } else {
                setTotalPage(result?.data?.meta?.totalPage)
                setCurrPage(result?.data?.meta?.page)
            }
        }
    }

    const _renderItemComment = (({ item, index }) => {
        return (
            <ItemDiary data={item} />
        )
    })

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);

    return (
        <View style={styles.container}>
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
                                Nhật ký
                            </Text>
                            : <></>
                    }
                </View>
            </View>


            {
                listDiary?.length > 0 ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={() => {
                            return (
                                // <View style={{ height: 50 }} />
                                <>
                                    {
                                        currPage !== totalPage ?
                                            <>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        _getMore()
                                                    }}
                                                    style={{ alignSelf: 'center', marginTop: _moderateScale(8) }}>
                                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLUE_FB }}>
                                                        Xem thêm
                                                </Text>
                                                </TouchableOpacity>
                                                <View style={{ height: 100 }} />
                                            </>
                                            :
                                            <View style={{ height: 100 }} />
                                    }

                                </>
                            )
                        }}
                        data={!isEmpty(listDiary) ? listDiary : []}
                        renderItem={_renderItemComment}
                        keyExtractor={_awesomeChildListKeyExtractor}
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


export default ListDiaryByType;