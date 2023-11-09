import React, { memo, useEffect } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import * as Color from '../../Constant/Color';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
import { getNotificationForPartner } from '../../Redux/Action/NotificationAction';
import * as ActionType from '../../Redux/Constants/ActionType';
import store from "../../Redux/store";

const colors = [
    {
        type: 'error',
        color: '#E0455E'
    },
    {
        type: 'success',
        color: '#1DB231'
    },{
        type: 'warning',
        color: '#FF7200'
    },{
        type: 'tutorial',
        color: '#51BCF7'
    }
] 

const TabRightNotifi = (props) => {
    const dispatch = useDispatch()
    const notificationRedux = useSelector(state => state.notificationReducer?.notification)
    const infoUserRedux = useSelector(state => state.infoUserReducer.infoUser)


    // useEffect(() => {
    //     dispatch(getNotificationForPartner({
    //         limit: 20
    //     }))
    // }, [])

    const _handlehideAllNoti = () => {
        store.dispatch({
            type: ActionType.SHOW_MODAL_NOTI,
            payload: {
                data: false, 
                noti: {}
            }
        })
    }

    const _getColor = (type) =>{
        var color = colors.filter(item=>item.type === type)
        if(color.length>0)
        {
            return color[0].color
        }
        return Color.BASE_COLOR
    }

    const _handleRenderImg = (type) => {
        switch (type) {
            case 'success':
                return <Image
                    style={[sizeIcon.xxxlllg, { marginBottom: _moderateScale(12) }]}
                    source={require('../../Icon/success.png')} />
            case 'warning':
                return <Image
                    style={[sizeIcon.xxxlllg, { marginBottom: _moderateScale(12) }]}
                    source={require('../../Icon/warning.png')} />
            case 'error':
                return <Image
                    style={[sizeIcon.xxxlllg, { marginBottom: _moderateScale(12) }]}
                    source={require('../../Icon/danger.png')} />
            case 'tutorial':
                return <Image
                    style={[sizeIcon.xxxlllg, { marginBottom: _moderateScale(12) }]}
                    source={require('../../Icon/tutorial.png')} />
            default:
                break;
        }
    }


    return (
        <Modal style={{
            margin: 0,
            alignItems: 'center',
        }}
            animationIn='fadeInLeft'
            animationOut='fadeOutRight'
            animationInTiming={800}
            animationOutTiming={800}
            isVisible={props.showModalNoti}
            backdropTransitionOutTiming={0}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            hideModalContentWhileAnimating={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            // onModalHide={_handleSetReadNotifi}
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
            }} style={styles.modalContent}>

                <View>
                    <View style={[styles.header]}>
                        {_handleRenderImg(notificationRedux?.type)}
                        <Text style={[styles.tabRight__title,{color: _getColor(notificationRedux?.type)}]}>
                            {notificationRedux?.title}
                        </Text>
                    </View>
                    <View style={[styles.description]}>
                        <Text style={{
                            fontSize: _moderateScale(14),
                            color: Color.GREY_FOR_TITLE,
                            textAlign: 'center'
                        }}>
                            {notificationRedux?.content}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: _getColor(notificationRedux?.type), }]}
                        onPress={() => {
                            _handlehideAllNoti()
                        }}>
                        <Text style={{ color: Color.WHITE, fontSize: _moderateScale(16) }}>Đóng</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
}



const styles = StyleSheet.create({
    header:
    {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: _moderateScale(16),
        borderTopRightRadius: _moderateScale(16),
        paddingTop: _moderateScale(16),

    },
    tabRight__title: {
        fontSize: _moderateScale(24),
        fontWeight: '500'
    },
    btn: {
        alignItems: 'center',
        borderRadius: _moderateScale(20),
        paddingHorizontal: _moderateScale(16),
        paddingVertical: _moderateScale(10),
        minWidth: _moderateScale(140)

    },
    modalContent: {
        width: _moderateScale(320),
        backgroundColor: Color.WHITE,
        justifyContent: 'space-between',
        borderRadius: _moderateScale(16),
        minHeight: _moderateScale(Dimensions.get('window').height / 3.2),
        paddingBottom: _moderateScale(16),
        // paddingTop: Platform.OS == "ios" ? getStatusBarHeight() : 0,
    },
    description: {
        padding: _moderateScale(24)
    }
})


export default memo(TabRightNotifi);
