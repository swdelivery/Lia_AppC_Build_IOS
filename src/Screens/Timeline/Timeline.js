import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, RefreshControl, StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native';
import Modal from 'react-native-modal';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import FastImage from '../../Components/Image/FastImage';
import ItemPost from '../../Components/Timeline/ItemPost';
import * as Color from '../../Constant/Color';
import { BASE_COLOR, BG_GREY_OPACITY_5, GREY_FOR_TITLE, RED, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { getAllMyNotifications } from '../../Redux/Action/NotificationAction';
import { getAllPosts, getMorePosts } from '../../Redux/Action/PostAction';







const Timeline = props => {

    const postsRedux = useSelector(state => state.postReducer) 
    const notificationRedux = useSelector(state => state.notificationReducer) 
    
    const dispatch = useDispatch()

    const [refreshing, setRefreshing] = useState(false)
    const [flagLoadmorePost, setFlagLoadMorePost] = useState(true)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)
    const [showTabRightNotifi, setShowTabRightNotifi] = useState(false)



    useEffect(() => {

        (async () => {
            await dispatch(getAllPosts())
        })()
    }, [])

    const _handleRefresh = async () => {
        setRefreshing(true)
        await dispatch(getAllPosts(setRefreshing, setFlagLoadMorePost))


        // setRefreshing(false)

    }

    const _handleEndReached = async () => {
        await dispatch(getMorePosts({
            lastPostId: postsRedux.listAllPosts[postsRedux.listAllPosts.length - 1]._id
        }, setFlagLoadMorePost))

    }


    const _renderTabRightNotifi = () => {

        useEffect(() => {
            (async () => {
                await dispatch(getAllMyNotifications(null, 'POST'))
            })()
        }, [])

        return (
            <Modal style={{
                margin: 0,
                alignItems: 'flex-end',
            }}
                animationIn='slideInRight'
                animationOut='slideOutRight'
                animationInTiming={500}
                animationOutTiming={500}
                isVisible={showTabRightNotifi}
                backdropTransitionOutTiming={0}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                coverScreen={Platform.OS == "ios" ? false : true}
                onBackButtonPress={() => {
                    setShowTabRightNotifi(false)
                }}
                onBackdropPress={() => {
                    setShowTabRightNotifi(false)
                }}>

                <View style={styles.tabRightNotifi}>
                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _widthScale(16), height: _moderateScale(45) }]}>
                        <View style={{ width: _moderateScale(30) }} />
                        <Text style={styles.tabRight__title}>
                            Thông báo
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: _moderateScale(30),
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: _moderateScale(30)
                            }}
                            onPress={() => {
                                setShowTabRightNotifi(false)
                            }}>
                            <Image
                                style={[sizeIcon.md]}
                                source={require('../../Icon/cancel.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'center', width: "85%", height: _heightScale(1), backgroundColor: Color.BG_GREY_OPACITY }} />
                    <FlatList
                        data={!isEmpty(notificationRedux?.listMyNotificationsForPost) ? notificationRedux?.listMyNotificationsForPost : []}
                        renderItem={({ item: itemNotifi, indexNotifi }) => {
                            console.log({itemNotifi});
                            
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowTabRightNotifi(false)
                                        navigation.navigate(ScreenKey.MODAL_COMMENT_POST_FROM_NOTIFI, { postId: itemNotifi.data.postId })
                                    }}
                                    style={[styleElement.rowAliTop, { flex: 1, marginTop: _moderateScale(16), marginRight: _widthScale(8) }]}>
                                    <FastImage
                                        style={[{
                                            width: _moderateScale(40),
                                            height: _moderateScale(40),
                                            borderRadius: _moderateScale(20),
                                            marginHorizontal: _widthScale(14)
                                        }]}
                                        // source={{ uri: `https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/104112421_1996173593847855_4902466515527279857_n.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=fxqQddaowIoAX_BqNbW&_nc_ht=scontent.fvca1-1.fna&oh=bc11d0e03982c99c7c7151432431ebb0&oe=6031F192` }}
                                        uri={itemNotifi?.userCreate?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${itemNotifi?.userCreate?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.GREY_FOR_TITLE }]}>
                                            {
                                                itemNotifi?.content ?
                                                    <Text style={stylesFont.fontNolan}>
                                                        {
                                                            `${itemNotifi?.content}`
                                                        }
                                                    </Text>
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </Text>
                                        <Text style={{ marginTop: _moderateScale(8), color: Color.GREY }}>
                                            {
                                                moment(itemNotifi?.updated).startOf('minute').fromNow()
                                            }
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index) => `${item._id}`}
                    />
                </View>
            </Modal>
        )
    }


    return (
        <View style={[styles.container]}>
            {
                _renderTabRightNotifi()
            }
            {/* <Text>
                timeline screen
            </Text> */}
            <View style={[styleElement.rowAliCenter, styles.header, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(16), zIndex: 1 }, shadow]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.MODAL_CREATE_NEW_FEED)
                    }}
                    style={[{
                        overflow: 'hidden', width: _moderateScale(8 * 3.25), height: _moderateScale(8 * 3.25), borderRadius: _moderateScale(8 * 3.25 / 2), alignItems: 'center', justifyContent: 'center', backgroundColor: WHITE
                    }, shadow]}>
                    {/* <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={gradient.color}
                        style={gradient.container}> */}
                    <Image
                        style={[sizeIcon.lg]}
                        source={require('../../Icon/iconPlus_base.png')} />
                    {/* </LinearGradient> */}
                </TouchableOpacity>
                <Text
                    numberOfLines={2}
                    style={[stylesFont.fontNolan500, styles.header__title]}>
                    Hoạt động
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setShowTabRightNotifi(true)
                        // Store.dispatch({ 
                        //     type: ActionType.TAB_RIGHT_NOTIFI_TASK,
                        //     payload: {
                        //         flag: true
                        //     }
                        // })
                    }}
                    style={{ padding: _moderateScale(4) }}>
                    <ImageBackground
                        style={[sizeIcon.lg]}
                        source={require('../../Icon/notifiGrey.png')} >
                        <View style={styles.dotNewNotifi} />
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            {/* <ScrollView showsVerticalScrollIndicator={false}>
                <ItemPost />
                <ItemPost />
                <ItemPost />
                <ItemPost />
            </ScrollView> */}
            {
                !isEmpty(postsRedux?.listAllPosts) ?
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
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            if (!onEndReachedCalledDuringMomentum) {
                                _handleEndReached()
                                setOnEndReachedCalledDuringMomentum(true)
                            }
                            // _handleEndReached()
                        }}
                        onMomentumScrollBegin={() => {
                            setOnEndReachedCalledDuringMomentum(false)
                        }}
                        ListFooterComponent={() => {
                            if (flagLoadmorePost) {
                                return (
                                    <ActivityIndicator
                                        style={{ color: '#000' }}
                                    />
                                )
                            } else {
                                return null
                            }
                        }}
                        ListFooterComponentStyle={{ marginBottom: _moderateScale(8 * 2) }}
                        data={!isEmpty(postsRedux?.listAllPosts) ? postsRedux?.listAllPosts : []}
                        renderItem={({ item: itemPost, index }) => {
                            return (
                                <ItemPost lasted={index == postsRedux?.listAllPosts?.length - 1} data={itemPost} />
                            )
                        }}
                        keyExtractor={(item, index) => `${item._id}${index}`}
                    // extraData={postsRedux?.listAllPosts}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>
                            Đang tải dữ liệu...
                        </Text>
                    </View>
            }



        </View>
    );
};

const styles = StyleSheet.create({
    tabRight__title: {
        fontSize: _moderateScale(16),
        color: Color.GREY_FOR_TITLE
    },
    tabRightNotifi: {
        width: "85%",
        backgroundColor: Color.WHITE,
        paddingBottom: _heightScale(8),
        height: "100%"
    },
    dotNewNotifi: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: RED,
        position: 'absolute',
        right: _moderateScale(2),
        top: _moderateScale(2)
    },
    header__title: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE,
        width: _moderateScale(250),
        textAlign: 'center',
        // backgroundColor:'red'
    },
    header: {
        justifyContent: 'center',
        // alignItems: 'flex-end',
        width: _width,
        // height: _moderateScale(45),
        backgroundColor: WHITE,
        height: _moderateScale(8 * 6),
        paddingVertical: _moderateScale(8)
    },
    headerPost__text: {
        fontSize: _moderateScale(14),
        color: '#000',
        opacity: 0.8
    },
    headerPost__avatar: {
        width: _moderateScale(8 * 5.5),
        height: _moderateScale(8 * 5.5),
        borderRadius: _moderateScale(8 * 5.5 / 2),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5,
        marginRight: _moderateScale(8 * 2)
    },
    headerPost: {
        paddingVertical: _moderateScale(8),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(8 * 2),
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        // backgroundColor: '#CBC9D2'
        backgroundColor: WHITE
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



export default Timeline;