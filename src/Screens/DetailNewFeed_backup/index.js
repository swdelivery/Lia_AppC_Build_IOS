import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ItemFeed from './Component/ItemFeed';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import ActionComment from './Component/ActionComment';
import { SET_CURRENT_LIST_COMMENT_CHILD } from '../../Redux/Constants/ActionType';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getAllPostComment, getPostById } from '../../Redux/Action/PostAction';
import { AppState } from 'react-native'
import SocketInstance from '../../../SocketInstance'
import BackgroundTimer from "react-native-background-timer";
import { CSS_PARTNER_POST_JOIN_ROOM, CSS_PARTNER_POST_LEFT_ROOM } from '../../Sockets/type'
import isEmpty from 'lodash/isEmpty';

const DiaryOfNewsFeed = (props) => {
    const dispatch = useDispatch()
    const scrollA = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef();
    const isComment = useSelector(state => state.postReducer?.isComment)
    const scrollToComment = useSelector(state => state.postReducer?.scrollToComment)
    const currentPostRedux = useSelector(state => state.postReducer?.currentPost)
    const [appState, setAppState] = useState(AppState.currentState);
    var interval


    useEffect(() => {
        console.log('did-mount socket.id', SocketInstance.socketConn.id)
        if (!isEmpty(currentPostRedux?._id))
            SocketInstance.socketConn.emit(CSS_PARTNER_POST_JOIN_ROOM, { room: currentPostRedux?._id });

        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    const handleAppStateChange = (nextAppState) => {
        console.log(appState, '--nextAppState--' + nextAppState);
        console.log('---------------')
        if (appState != nextAppState) {
            if ((appState === 'inactive' || appState === 'background')
                && nextAppState === 'active') {
                // console.log(
                //     'App has come to the foreground!'
                //     + '---------------'
                // );
                // console.log('connection status:', SocketInstance.socketConn.connected)
                if (SocketInstance.socketConn.connected !== true) {
                    if (!isEmpty(currentPostRedux?._id)) {
                        SocketInstance.socketConn.emit(CSS_PARTNER_POST_JOIN_ROOM, { room: currentPostRedux?._id });
                        SocketInstance.socketConn.on()
                        let condition = {
                            "condition": {
                                "parentId": {
                                    "equal": null
                                }
                            },
                            "sort": {
                                "created": -1
                            },
                            "limit": 10,
                            "page": 1
                        }
                        dispatch(getAllPostComment(
                            condition, currentPostRedux?._id
                        ))
                    }
                }
                //clearInterval when your app has come back to the foreground
                BackgroundTimer.clearInterval(interval)
            }
            else {
                //app goes to background
                console.log('App goes to background')
                // tell the server that your app is still online when your app detect that it goes to background
                interval = BackgroundTimer.setInterval(() => {
                    // console.log('connection status ', SocketInstance.socketConn.connected)
                    //if(!isEmpty(currentPostRedux?._id))
                    //SocketInstance.socketConn.emit(CSS_PARTNER_POST_JOIN_ROOM, {room: currentPostRedux?._id});
                }, 5000)
            }
            setAppState(nextAppState);
        }
    };



    useEffect(() => {
        dispatch({
            type: SET_CURRENT_LIST_COMMENT_CHILD,
            payload: []
        })
        if (currentPostRedux?._id) {
            dispatch(getPostById(currentPostRedux?._id))
        }
    }, [])
    
    useEffect(() => {
        if (isComment === true) {
            console.log('to', scrollToComment - Dimensions.get('window').height)
            scrollViewRef.current.scrollTo({ y: scrollToComment - Dimensions.get('window').height + _moderateScale(200), animated: true, duration: 500 })
        }
    }, [isComment])

    //  console.log('currentRoom', SocketInstance.socketConn)

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS == 'ios' &&
            getBottomSpace() == 0 ? _heightScale(0) : 0}
            behavior={Platform.OS == 'ios' ? 'padding' : null} style={{
                flexGrow: 1
            }}>

            <View style={styles.container}>
                <StatusBarCustom />
                <ScrollView
                    ref={scrollViewRef}
                    style={{ flexGrow: 1 }}
                    scrollEventThrottle={16}>
                    <View style={[styles.bannerContainer]}>
                        <Animated.Image
                            resizeMode={'cover'}
                            style={[styles.banner(scrollA),]}
                            source={require('../../Image/header/header1.png')}
                        />
                        <View style={{
                            position: 'absolute',
                            top: _moderateScale(500),
                            width: "100%"
                        }}>
                            <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }]}>
                                <TouchableOpacity
                                    hitSlop={styleElement.hitslopSm}
                                    onPress={() => {
                                        SocketInstance.socketConn.emit(CSS_PARTNER_POST_LEFT_ROOM, { room: currentPostRedux?._id });
                                        navigation.goBack()
                                    }}
                                >
                                    <Image
                                        style={[sizeIcon.llg]}
                                        source={require('../../Icon/back_left_white.png')} />
                                </TouchableOpacity>
                                <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(24) }]}>
                                    News Feed</Text>
                                <TouchableOpacity>
                                    <Image
                                        style={[sizeIcon.lllg]}
                                        source={require('../../Image/header/alarm.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <ItemFeed />
                </ScrollView>
                <ActionComment />
            </View>
        </KeyboardAvoidingView>
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
    banner: scrollA => ({
        height: _moderateScale(60),
        width: "100%",
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(60), 0, _moderateScale(60), _moderateScale(60) + 1],
                    outputRange: [-_moderateScale(60) / 2, 0, _moderateScale(60) * 0.75, _moderateScale(60) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(130), 0, _moderateScale(60), _moderateScale(60) + 1],
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
export default DiaryOfNewsFeed;