import { isEmpty } from 'lodash';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import React, { memo, useCallback, useEffect } from 'react';
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import * as Color from '../../Constant/Color';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import ScreenKey from '../../Navigation/ScreenKey';
import { getNotificationForPartner, partnerReadNotification } from '../../Redux/Action/NotificationAction';
import * as ActionType from '../../Redux/Constants/ActionType';
import store from '../../Redux/Store';
import ItemNoti from './ItemNoti';
import { stylesFont } from '../../Constant/Font';
const TabRightNotifi = (props) => {
    const dispatch = useDispatch()
    const notificationRedux = useSelector(state => state.notificationReducer)
    const infoUserRedux = useSelector(state => state.infoUserReducer.infoUser)

    const listAllNotiRedux = useSelector(state => state.notificationReducer.listAllNoti)


    useEffect(() => {
        dispatch(getNotificationForPartner({
            limit: 20
        }))
    }, [])

    const _handlehideAllNoti = () => {
        store.dispatch({
            type: ActionType.SHOW_LIST_ALL_NOTI,
            payload: {
                data: false
            }
        })
    }


    const _handleReadNotifi = (notifiId) => {
        // dispatch(readNotifiPost({
        //     notificationIds: [notifiId]
        // }))
    }

    const _handleClickNoti = (itemNoti) => {
        console.log({ itemNoti });
        if (itemNoti?.moduleName == "LIA_BONUS_EVENT") {
            if (itemNoti?.event == "LIA_BONUS") {
                _handlehideAllNoti()

                if (itemNoti?.liaBonusEvent?.length > 0) {
                    if(itemNoti?.liaBonusEvent[0]?.awards[0]?.code == "WHEEL_TURN"){
                       return navigation.navigate(ScreenKey.WHEEL_SPIN)
                    }
                }

                navigation.navigate(ScreenKey.AFFILIATE, { showModalInfoWallet: true })
            }
        }
        if (itemNoti?.moduleName == "PARTNER_REVIEW") {
            if (itemNoti?.event == "CREATE_PARTNER_NOTIFICATION_REVIEW") {
                _handlehideAllNoti()
                navigation.navigate(ScreenKey.AFFILIATE, { showModalInfoWallet: true })
            }
        }
        if (itemNoti?.moduleName == "MEDICAL_PRESCRIPTION") {
            if (itemNoti?.event == "REMIND_MEDICAL") {
                _handlehideAllNoti()
                navigation.navigate(ScreenKey.TAB_PROFILE)
            }
        }
        if (itemNoti?.moduleName == "BOOKING") {
            if (itemNoti?.event == "ADD_BOOKING") {
                _handlehideAllNoti()
                navigation.navigate(ScreenKey.LIST_BOOKING)
            }
            if (itemNoti?.event == "CHECK_IN_BOOKING" ||
                itemNoti?.event == "CHECK_OUT_BOOKING") {
                _handlehideAllNoti()
                navigation.navigate(ScreenKey.INFO_BOOKING, { data: { _id: itemNoti?.data?.bookingId } })
            }
        }
        if (itemNoti?.moduleName == "TREATMENT_QUEUE") {
            if (itemNoti?.event == "CALL_TREATMENT_QUEUE") {
                _handlehideAllNoti()
                navigation.navigate(ScreenKey.INFO_BOOKING, { data: { _id: itemNoti?.data?.bookingId } })
            }
        }
        if (itemNoti?.moduleName == "QUEUE_CONSULTATION") {
            if (itemNoti?.event == "CALL_QUEUE_CONSULTATION") {
                _handlehideAllNoti()
                navigation.navigate(ScreenKey.INFO_BOOKING, { data: { _id: itemNoti?.data?.bookingId } })
            }
        }
        if (itemNoti?.moduleName == "PARTNER_POST") {
            if (itemNoti?.event == "ADD_PARTNER_POST_COMMENT") {
                _handlehideAllNoti()
                navigation.navigate(ScreenKey.DETAIL_NEW_FEED, { idCommentHighlight: itemNoti?.data?.commentIdArr[0], idPost: itemNoti?.entityId, isShowComment: true })
            }
        }
    }

    const _handleSetReadNotifi = () => {

        let listNotifiNotRead = listAllNotiRedux?.filter(item => {
            if (!_includes(item?.viewerIdArr, infoUserRedux?._id)) {
                return true
            }
        })
        console.log({ listAllNotiRedux });
        console.log({ listNotifiNotRead });

        if (!_isEmpty(listNotifiNotRead)) {
            dispatch(partnerReadNotification({
                arrayId: listNotifiNotRead?.map(item => item?._id)
            }))
        }


    }

    const _renderItemComment = useCallback(({ item: itemNotifi, index }) => {

        return (

            <ItemNoti
                data={itemNotifi}
                pressed={() => _handleClickNoti(itemNotifi)}
                // active={itemNotifi.viewerIdArr.find(itemFind => itemFind == infoUserRedux?._id) ? false : true}
                active={itemNotifi?.seenAt ? false : true}
                key={index} />

            // <TouchableOpacity

            //     onPress={() => {
            //         _handleClickNoti(itemNotifi)
            //         // props.setShowTabRightNotifi(false)
            //         // _handleReadNotifi(itemNotifi._id)
            //         // navigation.navigate(ScreenKey.MODAL_COMMENT_POST_FROM_NOTIFI, { postId: itemNotifi.data.postId })
            //     }}
            //     style={[styleElement.rowAliTop, { flex: 1, paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(8) },
            //     itemNotifi.viewerIdArr.find(itemFind => itemFind == infoUserRedux.infoUser._id) ?
            //         {}
            //         :
            //         { backgroundColor: '#E9F1FE' }
            //         ,
            //     index == listAllNotiRedux.length - 1 && { marginBottom: _moderateScale(8 * 3) }
            //     ]}>

            //     <View style={{ flex: 1 }}>
            //         <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.GREY_FOR_TITLE },
            //         itemNotifi.viewerIdArr.find(itemFind => itemFind == infoUserRedux.infoUser._id) ?
            //             [stylesFont.fontNolan, {
            //                 color: GREY
            //             }]
            //             :
            //             [stylesFont.fontNolan500, {
            //                 color: GREY_FOR_TITLE
            //             }]
            //         ]}>
            //             {
            //                 itemNotifi?.content ?
            //                     <Text style={stylesFont.fontNolan}>
            //                         {
            //                             `${itemNotifi?.content}`
            //                         }
            //                     </Text>
            //                     :
            //                     <>
            //                     </>
            //             }
            //         </Text>
            //         <Text style={{ marginTop: _moderateScale(8), color: Color.GREY, alignSelf: 'flex-end' }}>
            //             {
            //                 moment(itemNotifi?.updated).startOf('minute').fromNow()
            //             }
            //         </Text>
            //     </View>
            // </TouchableOpacity>
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
            onModalHide={_handleSetReadNotifi}
            onBackButtonPress={() => {
                // setShowTabRightNotifi(false)
                // props.setShowTabRightNotifi(false)
                _handlehideAllNoti()
            }}
            onBackdropPress={() => {
                // setShowTabRightNotifi(false)
                // props.setShowTabRightNotifi(false)
                _handlehideAllNoti()
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
                            _handlehideAllNoti()
                        }}>
                        <Image
                            style={[sizeIcon.md]}
                            source={require('../../Icon/cancel.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'center', width: "85%", height: _heightScale(1), backgroundColor: Color.BG_GREY_OPACITY }} />
                {
                    listAllNotiRedux?.length > 0 ?
                        <FlatList
                            data={!isEmpty(listAllNotiRedux) ? listAllNotiRedux : []}
                            renderItem={_renderItemComment}
                            keyExtractor={_awesomeChildListKeyExtractor}
                        />
                        :
                        <View style={[styleElement.centerChild, { height: '80%' }]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.GREY, fontStyle: 'italic' }}>
                                Hiện chưa có thông báo mới
                            </Text>
                        </View>
                }

                <View style={{ height: getBottomSpace() + _moderateScale(8 * 2) }} />
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
        height: "100%",
        paddingTop: Platform.OS == "ios" ? getStatusBarHeight() : 0
    },
})


export default memo(TabRightNotifi);
