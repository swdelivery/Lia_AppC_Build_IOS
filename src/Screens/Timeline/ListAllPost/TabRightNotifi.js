import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { memo, useCallback, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import FastImage from '../../../Components/Image/FastImage';
import * as Color from '../../../Constant/Color';
import { GREY, GREY_FOR_TITLE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';
import { getAllMyNotifications, readNotifiPost } from '../../../Redux/Action/NotificationAction';



const TabRightNotifi = (props) => {
    const dispatch = useDispatch()
    const notificationRedux = useSelector(state => state.notificationReducer)
    const infoUserRedux = useSelector(state => state.infoUserReducer)




    useEffect(() => {
        dispatch(getAllMyNotifications(null, 'POST'))
    }, [])

    console.log({ abc: notificationRedux.listMyNotificationsForPost });

    const _handleReadNotifi = (notifiId) => {
        dispatch(readNotifiPost({
            notificationIds: [notifiId]
        }))
    }

    const _renderItemComment = useCallback(({ item: itemNotifi, index }) => {

        return (
            <TouchableOpacity

                onPress={() => {
                    props.setShowTabRightNotifi(false)
                    _handleReadNotifi(itemNotifi._id)
                    navigation.navigate(ScreenKey.MODAL_COMMENT_POST_FROM_NOTIFI, { postId: itemNotifi.data.postId })
                }}
                style={[styleElement.rowAliTop, {flex: 1, paddingRight: _widthScale(8) , paddingVertical:_moderateScale(8)},
                itemNotifi.viewerIdArr.find(itemFind => itemFind == infoUserRedux.infoUser._id) ?
                    {}
                    :
                    { backgroundColor: '#E9F1FE' }
                ,
                index == notificationRedux?.listMyNotificationsForPost.length -1 && {marginBottom:_moderateScale(8*3)}
                ]}>
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
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.GREY_FOR_TITLE },
                    itemNotifi.viewerIdArr.find(itemFind => itemFind == infoUserRedux.infoUser._id) ?
                        [stylesFont.fontNolan, {
                            color: GREY
                        }]
                        :
                        [stylesFont.fontNolan500, {
                            color: GREY_FOR_TITLE
                        }]
                    ]}>
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
    }, [])

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);

    return (
        <Modal style={{
            margin: 0,
            alignItems: 'flex-end',
        }}
            animationIn='slideInRight'
            animationOut='slideOutRight'
            animationInTiming={500}
            animationOutTiming={500}
            isVisible={props.showTabRightNotifi}
            backdropTransitionOutTiming={0}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            hideModalContentWhileAnimating={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                // setShowTabRightNotifi(false)
                props.setShowTabRightNotifi(false)
            }}
            onBackdropPress={() => {
                // setShowTabRightNotifi(false)
                props.setShowTabRightNotifi(false)
            }}>

            <View onLayout={() => {
                // alert('on')
            }} style={styles.tabRightNotifi}>
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
                            props.setShowTabRightNotifi(false)
                        }}>
                        <Image
                            style={[sizeIcon.md]}
                            source={require('../../../Icon/cancel.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'center', width: "85%", height: _heightScale(1), backgroundColor: Color.BG_GREY_OPACITY }} />
                <FlatList
                    data={!isEmpty(notificationRedux?.listMyNotificationsForPost) ? notificationRedux?.listMyNotificationsForPost : []}
                    renderItem={_renderItemComment}
                    keyExtractor={_awesomeChildListKeyExtractor}
                />
            </View>
        </Modal>
    );
}



const styles = StyleSheet.create({
    tabRight__title: {
        fontSize: _moderateScale(16),
        color: Color.GREY_FOR_TITLE
    },
    tabRightNotifi: {
        width: "85%",
        backgroundColor: Color.WHITE,
        height: "100%"
    },
})


export default memo(TabRightNotifi);