import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
    Animated, Image, StyleSheet, Text, TextInput,
    RefreshControl, ActivityIndicator,
    TouchableOpacity, View, FlatList, ImageBackground
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_CLEAR, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BG_MAIN_OPACITY, BLACK_OPACITY, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ItemFeed from './Component/ItemFeed';
import ScreenKey from '../../Navigation/ScreenKey';
import { getAllPost, getMoreAllPost } from '../../Redux/Action/PostAction';
import isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';


const NewsFeed = (props) => {
    const dispatch = useDispatch()

    const scrollA = useRef(new Animated.Value(0)).current;
    const scaleBtnCreatePost = useRef(new Animated.Value(0)).current;

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const listPostRedux = useSelector(state => state.postReducer?.listPost)
    const countPostRedux = useSelector(state => state.postReducer?.countNewPost)
    const [refreshing, setRefreshing] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [currPage, setCurrPage] = useState(0)

    const [flagLoadmorePost, setFlagLoadMorePost] = useState(false)
    const [isLasted, setIsLasted] = useState(true)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)

    const [isShowBtnCreatePost, setIsShowBtnCreatePost] = useState(false)

    useEffect(() => {
        var data = {
            "condition": {
            },
            "sort": {
                "created": -1
            },
            "limit": 5,
            "page": 1
        };
        dispatch(getAllPost(data, null, null, _handlePage))
    }, [])

    useEffect(()=>{
        console.log({xxxxxx:'aaaaa'});
        if(isShowBtnCreatePost){
            Animated.timing(scaleBtnCreatePost, {
                toValue: 1,
                duration: 200
            }).start(()=>{
            })
        }else{
            Animated.timing(scaleBtnCreatePost, {
                toValue: 0,
                duration: 200
            }).start(()=>{
            })
        }
    },[isShowBtnCreatePost])

    const _reload = () => {
        var data = {
            "condition": {
            },
            "sort": {
                "created": -1
            },
            "limit": 5,
            "page": 1
        };
        dispatch(getAllPost(data, null, null, _handlePage))
    }

    const _handlePage = (currPage, totalPage) => {
        setCurrPage(currPage)
        setTotalPage(totalPage)
    }

    const _renderItemPost = useCallback(({ item, index }) => {
        return (
            <>
                <ItemFeed lasted={index == listPostRedux?.length - 1} data={item} key={index} />
                {
                    index !== listPostRedux?.length - 1 ?
                        <View style={{ height: _moderateScale(8 * 1), backgroundColor: 'rgba(196, 196, 196,.6)' }} />
                        : <></>
                }
            </>
        )
    }, [listPostRedux])

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);

    const _handleRefresh = () => {
        var data = {
            "condition": {
            },
            "sort": {
                "created": -1
            },
            "limit": 5,
            "page": 1
        };
        setRefreshing(true)
        dispatch(getAllPost(data, setRefreshing, null, _handlePage))
    }

    const _handleEndReached = () => {
        setFlagLoadMorePost(true)
        var data = {
            condition: {
                // "after": listPostRedux[listPostRedux.length - 1]._id,
            },
            "sort": {
                "created": -1
            },
            "limit": 5,
            "page": currPage + 1
        };
        dispatch(getMoreAllPost(data, null, setFlagLoadMorePost, _handlePage))
    }


    const _onScrollFlatlist = (event) => {
        // if (listLastedMessagesTrangRedux.length < 10) return
        // if (refreshing) return
        // if (offsetYLasted && offsetYLasted > 0) {
        //     if (event.nativeEvent.contentOffset.y > offsetYLasted) return
        // }
        // console.log(scrollA._value);

        const currentOffset = event.nativeEvent.contentOffset.y;
        const dif = currentOffset - (scrollA._value || 0);
        console.log(dif);
        if (currentOffset < 0) return setIsShowBtnCreatePost(true)
        if (Math.abs(dif) < 3) {
            console.log('unclear');
            // setIsShowBtnCreatePost(true)
        } else if (dif < 0) {
            console.log('up');
            setIsShowBtnCreatePost(true)
        } else {
            console.log('down');
            setIsShowBtnCreatePost(false)
        }
        // if(dif < 0){
        //     setIsShowBtnCreatePost(true)
        // }else{
        //     setIsShowBtnCreatePost(false)
        // }
        scrollA.setValue(currentOffset)
    }

    // console.log({ listPostRedux })
    return (
        <View style={styles.container}>
            <StatusBarCustom gradient />

            {/* <Animated.View style={[
                {
                    width: 50,
                    height: 50,
                    backgroundColor: GREY,
                    position: 'absolute',
                    right: 16,
                    bottom: getBottomSpace() + 16,
                    zIndex: 100
                },
                {
                    transform: [
                        {
                            scale: scaleBtnCreatePost
                        }
                    ],
                }
            ]}>

            </Animated.View> */}

            <View style={{
                height: _moderateScale(8 * 6),
                justifyContent: 'center',
                backgroundColor: BASE_COLOR
            }} >
                <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 0.6, 1]}
                        colors={[
                            BASE_COLOR,
                            '#8c104e',
                            '#db0505',
                        ]}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }} />

                <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 2) }]}>
                    <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (!infoUserRedux?._id) {
                                    store.dispatch({
                                        type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                        payload: {
                                            flag: true,
                                            currRouteName: props?.route?.name
                                        }
                                    })
                                    return
                                }
                                navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                            }}
                            style={{ marginLeft: _moderateScale(4) }}
                        >
                            <Image
                                style={{
                                    width: _moderateScale(8 * 4),
                                    height: _moderateScale(8 * 4),
                                    borderRadius: _moderateScale(8 * 2),
                                    borderWidth: 1,
                                    borderColor: WHITE
                                }}
                                source={{ uri: `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` }} />
                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={() => {
                                if (!infoUserRedux?._id) {
                                    store.dispatch({
                                        type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                        payload: {
                                            flag: true,
                                            currRouteName: props?.route?.name
                                        }
                                    })
                                    return
                                }
                                navigation.navigate(ScreenKey.CREATE_NEW_FEED)
                            }}
                            style={[styleElement.rowAliCenter, {
                                flex: 1,
                                height: _moderateScale(8 * 4),
                                backgroundColor: SECOND_COLOR,
                                paddingHorizontal: _moderateScale(8 * 2),
                                borderRadius: _moderateScale(16),
                                marginLeft: _moderateScale(8),
                                marginRight: _moderateScale(8)
                            }]}>
                            <Text style={[stylesFont.fontNolan500, { color: WHITE, fontSize: _moderateScale(12) }]}>
                                Chạm để chia sẻ nhật ký của bạn
                            </Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(ScreenKey.SEARCH_NEW_FEED)}
                            style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 4),
                                height: _moderateScale(8 * 4),
                                borderRadius: _moderateScale(4),
                                marginRight: _moderateScale(4)
                            }]}>
                            <Image style={sizeIcon.lg} source={require('../../NewIcon/searchLinear.png')} />
                        </TouchableOpacity>
                        <AlarmNotifi />
                    </View>
                </View>

            </View>

            {
                countPostRedux > 0 ?
                    <TouchableOpacity
                        onPress={_reload}
                        style={{
                            padding: 8,
                            backgroundColor: WHITE,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{ ...stylesFont.fontNolan500, color: BLUE_FB }}>
                            Hiện có {countPostRedux} bài viết mới
                        </Text>
                    </TouchableOpacity>
                    : <></>
            }

            <View style={{
                backgroundColor: WHITE,
                flex: 1,
            }}>
                {!isEmpty(listPostRedux) ?
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                titleColor={GREY_FOR_TITLE}
                                progressViewStyle={'bar'}
                                title={'Đang tải..'}
                                refreshing={refreshing}
                                onRefresh={_handleRefresh}
                            />
                        }
                        ListFooterComponent={() => {

                            if (flagLoadmorePost) {
                                return (
                                    <ActivityIndicator
                                        style={{ color: '#000' }}
                                    />
                                )
                            } else {
                                if (currPage === totalPage) {
                                    return (

                                        <></>
                                    )
                                }
                                else {
                                    return (<TouchableOpacity
                                        onPress={_handleEndReached}
                                        style={[{ width: "100%", paddingVertical: _moderateScale(8), backgroundColor: BG_BEAUTY }]}>
                                        <Text style={[stylesFont.fontNolan500, { color: GREY_FOR_TITLE, fontSize: _moderateScale(13), alignSelf: 'center' }]}>
                                            Tải thêm
                                        </Text>
                                    </TouchableOpacity>)
                                }
                            }
                        }}
                        ListFooterComponentStyle={{ marginVertical: _moderateScale(8 * 1.5) }}
                        data={listPostRedux?.length > 0 ? listPostRedux : []}
                        renderItem={_renderItemPost}
                        keyExtractor={_awesomeChildListKeyExtractor}
                        // onScroll={_onScrollFlatlist}
                    /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                            Hiện chưa có bài viết mới
                        </Text>
                    </View>}

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },

    inputHeader: {
        width: "100%",
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerProfile__avatar: {
        width: _moderateScale(48),
        height: _moderateScale(48),
        borderRadius: _moderateScale(48),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    },

    ///------start feed-----///
    itemFeed: {
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8)

    },
    headOfFeed: {
        flexDirection: 'row',
        marginBottom: _moderateScale(8 * 2)
    },
    leftOfHead: {
        flex: 1,
        flexDirection: 'row',
    },
    titOfFeed: {
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4)
    },
    titFeed: {
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    timeFeed: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(10)
    },
    moreFeed: {
        marginTop: _moderateScale(8)
    },
    contentFeed: {
        flex: 1
    },
    textFeed: {
        fontSize: _moderateScale(13),
        marginBottom: _moderateScale(8 * 2)
    },
    listImgFeed: {
        flexDirection: 'row'
    },
    itemImgFeed: {
        marginRight: _moderateScale(8),
        padding: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        position: 'relative'
    },
    imgFeed: {
        width: _widthScale(8 * 8),
        height: _heightScale(8 * 8)
    },
    itemImgMore: {
        backgroundColor: MAIN_OPACITY_8,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMoreImg: {
        fontSize: _moderateScale(28),
        color: WHITE,
        ...stylesFont.fontNolan500
    },
    shareFeed: {
        flex: 1,
        marginTop: _moderateScale(8 * 3)
    },
    headShare: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titShare: {
        marginLeft: _moderateScale(4),
        color: BLUE_TITLE,
        ...stylesFont.fontNolan500
    },
    contentShare: {
        flexDirection: 'row',
        marginTop: _moderateScale(8)
    },
    imgShare: {
        width: _widthScale(8 * 6),
        height: _heightScale(8 * 6),
        marginRight: _moderateScale(8)
    },
    briefContentShare: {
        flex: 1,
    },
    titContentShare: {
        fontSize: _moderateScale(16),
        color: SECOND_COLOR,
        marginBottom: _moderateScale(4)
    },
    descriptionShare: {
        fontSize: _moderateScale(11),
        color: GREY_FOR_TITLE,
        fontStyle: 'italic'
    },
    actionFeed: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        marginTop: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 1.5),
        borderColor: GREY
    },
    itemActionFeed: {
        flexDirection: 'row',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titAction: {
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(4)
    },

    ///-----end feed-----///

    ///-----start comment -----//
    listComment: {
        flex: 1,
        marginTop: _moderateScale(8 * 2)
    },
    itemComment: {
        flexDirection: 'row',
        marginBottom: _moderateScale(8 * 2),
    },
    childComment: {
        paddingLeft: _moderateScale(8 * 6)
    },
    leftItemComment: {
        flexDirection: 'row',
        flex: 1
    },
    descriptionOfComment: {
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4),
        flex: 1
    },
    titComment: {
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    contentComment: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(12),
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


export default NewsFeed;