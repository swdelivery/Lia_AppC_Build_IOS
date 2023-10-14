import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
    Animated, Image, StyleSheet, Text, TextInput,
    RefreshControl, ActivityIndicator,
    TouchableOpacity, View, FlatList, ImageBackground, Touchable, TouchableWithoutFeedback
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _height, _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
// import ItemFeed from './Component/ItemFeed';
import ScreenKey from '../../Navigation/ScreenKey';
import { getAllPost, getAllPostSearch, getMoreAllPost, getMoreAllPostSearch, getPostSearchSuggestion } from '../../Redux/Action/PostAction';
import isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import * as Color from '../../Constant/Color';
import * as ActionType from "../../Redux/Constants/ActionType";
import { randomStringFixLengthCode } from '../../Constant/Utils'
import slugify from 'slugify';
import { debounce } from 'underscore';
import HeaderSearch from './HeaderSearch';
import ItemFeed from '../NewFeed/Component/ItemFeed';

const NewsFeed = (props) => {
    const dispatch = useDispatch()

    const scrollA = useRef(new Animated.Value(0)).current;
    const inputRef = useRef(null)
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const listPostRedux = useSelector(state => state.postReducer?.listPostSearch)
    // const countPostRedux = useSelector(state => state.postReducer?.countNewPost)
    const [refreshing, setRefreshing] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [currPage, setCurrPage] = useState(0)

    const [flagLoadmorePost, setFlagLoadMorePost] = useState(false)
    const [isLasted, setIsLasted] = useState(true)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)
    const [searchKey, setSearchKey] = useState('')
    const [opacityAnimate, setOpacityAnimate] = useState(new Animated.Value(0))
    const [suggestion, setSuggestion] = useState([])

    useEffect(() => {
        _getPostSearchSuggestion('')
    }, [])

    useEffect(()=>{
        if(props?.route?.params?.keySearch){
            setSearchKey(props?.route?.params?.keySearch)
            _handleSearch(props?.route?.params?.keySearch)
        }
    },[props?.route?.params?.keySearch])

    const _getPostSearchSuggestion = async (code) => {
        const result = await getPostSearchSuggestion(code)
        if (result?.isAxiosError) return
        setSuggestion(result?.data?.data)
    }

    const _showHide = (value) => {
        if (value === 'hide') {
            Animated.timing(opacityAnimate, {
                toValue: 0,
                duration: 200
            }).start();
            // inputRef.current.blur()
        }

        if (value === 'show') {
            Animated.timing(opacityAnimate, {
                toValue: _height - _moderateScale(8 * 6),
                duration: 200
            }).start();
        }
    }

    const _handleSearch = (code) => {
        console.log('_handleSearch')
        if (!isEmpty(searchKey) || !isEmpty(code)) {
            var data = {
                "sort": {
                    "created": -1
                },
                "search": searchKey,
                "limit": 100,
                "page": 1
            };
            if (!isEmpty(code)) {
                data.search = code
            }
            dispatch(getAllPostSearch(data, null, null, _handlePage))
            // inputRef.current.blur()
            _showHide('hide')
        }
    }
    // const _handleSearch = (code) => {
    //     console.log('_handleSearch')
    //     if (!isEmpty(searchKey) || !isEmpty(code)) {
    //         var data = {
    //             "sort": {
    //                 "created": -1
    //             },
    //             "search": searchKey,
    //             "limit": 5,
    //             "page": 1
    //         };
    //         if (!isEmpty(code)) {
    //             data.search = code
    //         }
    //         dispatch(getAllPostSearch(data, null, null, _handlePage))
    //         // inputRef.current.blur()
    //         _showHide('hide')
    //     }
    // }

    const _handleChangeText = (e) => {
        _handleDebounce(e)
    }

    const _handleDebounce = (debounce((e) => {
        setSearchKey(e)
        _getPostSearchSuggestion(e)
    }, 500))

    // const _reload = () => {
    //     var data = {
    //         "condition": {
    //         },
    //         "sort": {
    //             "created": -1
    //         },
    //         "limit": 5,
    //         "page": 1
    //     };
    //     dispatch(getAllPost(data, null, null, _handlePage))
    // }

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

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item.id}-${randomStringFixLengthCode(4)}`, []);

    const _handleRefresh = () => {
        if (!isEmpty(searchKey)) {
            var data = {
                "condition": {
                },
                "sort": {
                    "created": -1
                },
                "search": 'cat-mi',
                "limit": 5,
                "page": 1
            };
            setRefreshing(true)
            dispatch(getAllPostSearch(data, setRefreshing, null, _handlePage))
        }
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
            "search": searchKey,
            "limit": 5,
            "page": currPage + 1
        };
        dispatch(getMoreAllPostSearch(data, null, setFlagLoadMorePost, _handlePage))
    }

    const _handleGoBack = () => {
        navigation.goBack()
        dispatch({
            type: ActionType.SET_LIST_POST_SEARCH,
            payload: []
        })
    }
    console.log({ listPostRedux })
    console.log({ searchKey })


    return (
        <View style={styles.container}>
            <StatusBarCustom />
            <HeaderSearch
                keySearch={searchKey}
                // saveKeySearch={_saveKeySearch}
                // pressSearch={_handleSearch}
                // onChangeText={_handleChangeText}
                pressSearch={(keySearch)=>{
                    _handleSearch(keySearch)
                }}
                pressSg={(item) => {
                    console.log({ item });
                    _handleSearch(`#${item?.content}`)
                }}
            />

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
                                    // <View
                                    //     style={[{ width: "100%", paddingVertical: _moderateScale(8), backgroundColor: BG_BEAUTY }]}>
                                    //     <Text style={[stylesFont.fontNolan500, { color: GREY_FOR_TITLE, fontSize: _moderateScale(13), alignSelf: 'center' }]}>
                                    //         ...
                                    //     </Text>
                                    // </View>
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
                            // return (
                            //     <View style={[{width:"100%", paddingVertical:_moderateScale(8), backgroundColor:BG_BEAUTY}]}>
                            //         <Text style={[stylesFont.fontNolan500, {color:GREY_FOR_TITLE, fontSize:_moderateScale(13), alignSelf:'center'}]}>
                            //             Không còn bài viết
                            //         </Text>
                            //     </View>
                            // )
                        }
                    }}
                    ListFooterComponentStyle={{ marginVertical: _moderateScale(8 * 1.5) }}
                    data={listPostRedux}
                    renderItem={_renderItemPost}
                    keyExtractor={_awesomeChildListKeyExtractor}
                /> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                        Không tìm thấy dữ liệu.
                    </Text>
                </View>}

        </View>
    );
};

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
    banner: scrollA => ({
        height: _moderateScale(60),
        width: "100%",
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(130), 0, _moderateScale(130), _moderateScale(130) + 1],
                    outputRange: [-_moderateScale(130) / 2, 0, _moderateScale(130) * 0.75, _moderateScale(130) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(130), 0, _moderateScale(130), _moderateScale(130) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
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

    inputCodeRef: {
        // marginRight: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8 * 4),
        // borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        color: Color.GREY_FOR_TITLE,
        backgroundColor: Color.BG_CLEAR
    },
    ///-----end comment-----//
    listMontion: {
        backgroundColor: WHITE,
        paddingVertical: _moderateScale(8 * 1.5),
        paddingHorizontal: _moderateScale(8 * 2),
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemMontion: {
        marginRight: _moderateScale(8),
        marginBottom: _moderateScale(12),
        backgroundColor: THIRD_COLOR,
        paddingHorizontal: _moderateScale(12),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(16)
    }
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