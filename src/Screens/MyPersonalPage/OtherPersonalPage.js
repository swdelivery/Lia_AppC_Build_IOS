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
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { getAllPost, getMoreAllPost, getPartnerPostByIdUser, getUserById } from '../../Redux/Action/PostAction';
import isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import { getMinePartnerPost } from '../../Redux/Action/PostAction'
import ItemPost from './Components/ItemPost';
import ItemDiary from './Components/ItemDiary';
import { getPartnerDiaryv2 } from '../../Redux/Action/Diary';
import ListImages from './ListImages';
import ListPosts from './ListPosts';
import ListDiary from './ListDiary';
import { TabView, TabBar } from 'react-native-tab-view';
import OtherListPosts from './OtherListPosts';
import ImageView from "react-native-image-viewing";


const OtherPersonalPage = memo((props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [listPartnerPost, setListPartnerPost] = useState([])
    const [listPartnerDiary, setListPartnerDiary] = useState([])

    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])

    const [infoUserById, setInfoUserById] = useState({})

    const [routes] = useState([
        { key: 'first', title: 'Hình ảnh' },
        { key: 'second', title: 'Bài viết' },
        // { key: 'third', title: 'Nhật ký' },
    ]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        _getUserById()
        _getListPost()
        _getListDiary()

    }, [])

    const _getUserById = async () => {
        let result = await getUserById(props?.route?.params?.userId);
        if (result?.isAxiosError) return
        setInfoUserById(result?.data?.data)
    }

    const _getListPost = async () => {
        let result = await getPartnerPostByIdUser({
            condition: {
                partnerId: {
                    equal: props?.route?.params?.userId
                }
            }
        });
        if (result?.isAxiosError) return
        setListPartnerPost(result?.data?.data)
    }

    const _getListDiary = async () => {
        let result = await getPartnerDiaryv2({
            condition: {
                partnerId: {
                    equal: props?.route?.params?.userId
                }
            }
        });
        if (result?.isAxiosError) return
        setListPartnerDiary(result?.data?.data)
    }

    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
                {...props}
                indicatorStyle={{ backgroundColor: BASE_COLOR }}
                style={{
                    backgroundColor: WHITE,
                }}
                inactiveColor="grey"
                activeColor={BASE_COLOR}
                labelStyle={[stylesFont.fontDinTextPro, {
                    fontSize: _moderateScale(16),
                }]}
                getLabelText={({ route }) => route.title}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <ListImages idUser={props?.route?.params?.userId} />
                );
            case 'second':
                return (
                    <OtherListPosts idUser={props?.route?.params?.userId} />
                );
            case 'third':
                return (
                    <ListDiary />
                );

            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>

            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

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
                        infoUserById?.name ?
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                                Trang cá nhân
                            </Text>
                            : <></>
                    }
                </View>
            </View>

            <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }]}>

                <View style={[styleElement.rowAliCenter, { flex: 4 }]}>
                    <TouchableOpacity onPress={() => {
                        setShowImageViewing(true)
                        setIndexCurrImageView(index)
                        setListImagesSeeCurr([infoUserById?.fileAvatar])
                    }}>
                        <FastImage style={[{
                            width: _moderateScale(8 * 8),
                            height: _moderateScale(8 * 8),
                            borderRadius: _moderateScale(8 * 4)
                        }]} uri={`${URL_ORIGINAL}${infoUserById?.fileAvatar?.link}`} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: _moderateScale(8), flex: 1 }}>
                        <Text numberOfLines={1} style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: GREY_FOR_TITLE }}>
                            {infoUserById?.name}
                        </Text>
                        <View style={{ height: _moderateScale(2) }} />
                        {
                            infoUserById?._id && infoUserById?.fullPhone?.length > 0 ?
                                <Text numberOfLines={1} style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: GREY }}>
                                    {infoUserById?.fullPhone[0]?.slice(0, 3)}xxxxx{infoUserById?.fullPhone[0]?.slice(infoUserById?.fullPhone[0]?.length - 4, infoUserById?.fullPhone[0]?.length)}
                                </Text> : <></>
                        }

                    </View>
                </View>

                <View style={[styleElement.rowAliCenter, { flex: 2, marginLeft: _moderateScale(8), justifyContent: 'space-between' }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: BASE_COLOR }}>
                            {listPartnerPost?.length}
                        </Text>
                        <Text style={{ marginTop: _moderateScale(4), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), textAlign: 'center', color: BLACK_OPACITY_8 }}>
                            Bài viết
                            </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: BASE_COLOR }}>
                            {listPartnerDiary?.length}
                        </Text>
                        <Text style={{ marginTop: _moderateScale(4), ...stylesFont.fontNolan500, fontSize: _moderateScale(14), textAlign: 'center', color: BLACK_OPACITY_8 }}>
                            Nhật ký
                            </Text>
                    </View>
                </View>
            </View>

            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />

            {/* <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }}>
                    <Text style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(16)
                    }}>
                        Bài viết
                    </Text>

                    {
                        listPartnerPost?.map((item, index) => {
                            return (
                                <ItemPost key={item?._id} data={item}/>
                            )
                        })
                    }
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }}>
                    <Text style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(16)
                    }}>
                        Nhật ký
                    </Text>

                    {
                        listPartnerDiary?.map((item, index) => {
                            return (
                                <ItemDiary key={item?._id} data={item}/>
                            )
                        })
                    }
                </View>
                <View style={{height:_moderateScale(50)}}/> */}
        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,

    elevation: 3
}

export default OtherPersonalPage;