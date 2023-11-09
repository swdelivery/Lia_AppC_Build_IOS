import React, { memo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { useSelector } from 'react-redux';
import store from "../../../Redux/store";
import * as ActionType from '../../../Redux/Constants/ActionType'
import { alertCustomNotAction } from '../../../Constant/Utils';



const NewListOptions = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal>
            <View style={[styles.container]}>
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
                        navigation.navigate(ScreenKey.QR_CODE)
                    }}
                    style={styles.btnOption}>
                    <Image style={[sizeIcon.xlllg, { opacity: 0.9 }]} source={require('../../../NewIcon/qrBG.png')} />
                    <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(14), letterSpacing: -1 }}>
                        Quét QR
                    </Text>
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
                        navigation.navigate(ScreenKey.CREATE_BOOKING)
                    }}
                    style={styles.btnOption}>
                    <Image style={[sizeIcon.xlllg, { opacity: 0.9 }]} source={require('../../../NewIcon/bookingBG.png')} />
                    {/* <Image style={[sizeIcon.lg, { opacity: 0.9 }]} source={require('../../../NewIcon/calendarWhite.png')} /> */}
                    <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(14), letterSpacing: -1 }}>
                        Đặt hẹn
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        return alertCustomNotAction(`Thông báo`,`Tính năng VideoCall sẽ sớm được ra mắt.`)
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
                        navigation.navigate(ScreenKey.VIDEO_REQUEST)
                    }}
                    style={styles.btnOption}>
                    <Image style={[sizeIcon.xlllg, { opacity: 0.9 }]} source={require('../../../NewIcon/vCallBG.png')} />
                    <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(14), letterSpacing: -1 }}>
                        Video Call
                    </Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity
                        onPress={() => {
                            // if (!infoUserRedux?._id) {
                            //     store.dispatch({
                            //         type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                            //         payload: {
                            //             flag: true,
                            //             currRouteName: props?.route?.name
                            //         }
                            //     })
                            //     return
                            // }
                            // navigation.navigate(ScreenKey.AFFILIATE)
                            if (infoUserRedux?._id) {
                                if (infoUserRedux?.isCollaborator) {
                                    navigation.navigate(ScreenKey.AFFILIATE)
                                } else {
                                    navigation.navigate(ScreenKey.AFFILIATE)
                                }
                                // if (infoUserRedux?.isCollaborator) {
                                //     navigation.navigate(ScreenKey.AFFILIATE)
                                // } else {
                                //     navigation.navigate(ScreenKey.VERIFICATION_CTV)
                                // }
                            } else {
                                store.dispatch({
                                    type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                    payload: {
                                        flag: true,
                                        currRouteName: props?.route?.name
                                    }
                                })
                                return
                            }
                        }}
                        style={styles.btnOption}>
                        {/* {
                            infoUserRedux?._id ?
                                <>
                                    {
                                        !infoUserRedux?.isCollaborator ?
                                            <Image style={[sizeIcon.xs, { position: 'absolute', zIndex: 100, top: -_moderateScale(10), right: -_moderateScale(10) }]} source={require('../../../NewIcon/lock.png')} />
                                            :
                                            <></>
                                    }
                                </>
                                :
                                <></>
                        } */}


                        <Image style={[sizeIcon.xlllg, { opacity: 0.9 }]} source={require('../../../NewIcon/ctvBG.png')} />
                        {/* <Image style={[sizeIcon.lg]} source={require('../../../NewIcon/ctvWhite.png')} /> */}
                        <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(14), letterSpacing: -1 }}>
                            Tri ân
                        </Text>
                    </TouchableOpacity>
                    {
                        infoUserRedux?._id ?
                            <>
                                {
                                    !infoUserRedux?.isCollaborator ?
                                        <Image style={[sizeIcon.xs, { position: 'absolute', zIndex: 100, top: -_moderateScale(10), right: -_moderateScale(10) }]} source={require('../../../NewIcon/lock.png')} />
                                        :
                                        <></>
                                }
                            </>
                            :
                            <></>
                    }
                </View>

                <TouchableOpacity
                    onPress={() => {
                        // if (!infoUserRedux?._id) {
                        //     store.dispatch({
                        //         type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                        //         payload: {
                        //             flag: true,
                        //             currRouteName: props?.route?.name
                        //         }
                        //     })
                        //     return
                        // }
                        navigation.navigate(ScreenKey.LIST_ALL_NEWS)
                    }}
                    style={styles.btnOption}>
                        <Image style={[sizeIcon.xlllg, { opacity: 0.9 }]} source={require('../../../NewIcon/newsBG.png')} />
                    {/* <Image style={[sizeIcon.lg]} source={require('../../../NewIcon/newsWhite.png')} /> */}
                    <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(14), letterSpacing: -1 }}>
                        Tin tức
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: _moderateScale(8 * 2),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: _moderateScale(8 * 2.5)
    },
    btnOption: {
        // width: _moderateScale(8 * 10),
        // width:"20%",
        alignItems: 'center',
        //  borderWidth:1
    }
})


export default NewListOptions;