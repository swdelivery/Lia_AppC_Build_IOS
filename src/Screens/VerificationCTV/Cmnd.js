import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, SENDER_BG } from '../../Constant/Color';
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
import SocketInstance from "../../../SocketInstance";
import { CSS_PARTNER_POST_JOIN_ROOM, CSS_PARTNER_POST_LEFT_ROOM } from '../../Sockets/type'
import isEmpty from 'lodash/isEmpty';
import ListImage from '../NewFeed/Component/ListImage';
import { getPartnerDiaryDailyByIdv2 } from '../../Redux/Action/PartnerDiary';
import ScreenKey from '../../Navigation/ScreenKey'
import * as ActionType from '../../Redux/Constants/ActionType'
import ImageView from "react-native-image-viewing";
import store from "../../Redux/store";
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';


const Cmnd = memo((props) => {

    const ActionSheetRef = useRef()
    const ActionSheetRef2 = useRef()

    const [frontCmnd, setFrontCmnd] = useState({})
    const [backCmnd, setBackCmnd] = useState({})


    const pickCamera = (key) => {
        ImagePicker.openCamera({
            // width: _moderateScale(160 * 10),
            // height: _moderateScale(160 * 10),
            cropping: true,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            width: 425,
            height: 260,
            multiple: false
        }).then(async (image) => {
            if (key == 'front') {
                setFrontCmnd(image)
            }
            if (key == 'back') {
                setBackCmnd(image)
            }
        }).catch(e => {
            console.log({ Loi: e });
        });
    }
    const pickMultiple = async (key) => {
        ImagePicker.openPicker({
            multiple: false,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            mediaType: 'photo',
            cropping: true,
            compressImageQuality: 0.5,
            width: 425,
            height: 260
            // compressVideoPreset:'LowQuality' 
        }).then(async (image) => {
            console.log({ image });
            if (key == 'front') {
                setFrontCmnd(image)
            }
            if (key == 'back') {
                setBackCmnd(image)
            }
        }).catch(e => {
            console.log({ e });
        });
    }

    const _handleNext = () => {
        props?.next({
            frontCmnd,
            backCmnd
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>

            <ActionSheet
                ref={ActionSheetRef}
                // title={'Which one do you like ?'}
                options={["Mở Camera", "Chọn ảnh từ thư viện", "Huỷ"]}
                cancelButtonIndex={2}
                // destructiveButtonIndex={0} 
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            pickCamera('front')
                            break;
                        case 1:
                            pickMultiple('front')
                            break;
                        default:
                            break;
                    }
                }}
            />
            <ActionSheet
                ref={ActionSheetRef2}
                // title={'Which one do you like ?'}
                options={["Mở Camera", "Chọn ảnh từ thư viện", "Huỷ"]}
                cancelButtonIndex={2}
                // destructiveButtonIndex={0} 
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            pickCamera('back')
                            break;
                        case 1:
                            pickMultiple('back')
                            break;
                        default:
                            break;
                    }
                }}
            />
            <ScrollView>
                <View style={{ height: _moderateScale(8 * 3) }} />
                <Text style={{ alignSelf: 'center', ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                    Chụp chứng minh nhân dân của bạn
                </Text>
                <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                    <Text style={{ textAlign: 'center', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                        Để bảo đảm sự an toàn của bạn và các thành viên khác trong cộng đồng, việc xác thực danh tính sẽ giúp bạn trở nên tin cậy hơn.
                    </Text>
                    <Text style={{ textAlign: 'center', ...stylesFont.fontNolan500, fontSize: _moderateScale(14), marginTop: _moderateScale(8) }}>
                        Đừng lo lắng, chúng tôi không tiết lộ thông tin của bạn với bất kì ai
                    </Text>
                </View>

                <View style={{ height: _moderateScale(8 * 2) }} />

                <TouchableOpacity
                    disabled={(props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT")}
                    onPress={() => {
                        ActionSheetRef.current.show()
                    }}
                    style={{ alignSelf: 'center' }}>
                    {
                        props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT" ?
                            <>
                                <Image style={{
                                    width: _moderateScale(8 * 25),
                                    height: _moderateScale(8 * 17),
                                    borderRadius: _moderateScale(8 * 2),
                                    resizeMode: 'contain'
                                }} source={{ uri: `${URL_ORIGINAL}${props?.infoCurrentCollab?.idImages[0].link}` }} />
                            </>
                            :
                            <>
                                {
                                    frontCmnd?.path ?
                                        <Image style={{
                                            width: _moderateScale(8 * 25),
                                            height: _moderateScale(8 * 17),
                                            borderRadius: _moderateScale(8 * 2),
                                            resizeMode: 'contain'
                                        }} source={{ uri: `${frontCmnd?.path}` }} />
                                        :
                                        <Image style={{
                                            width: _moderateScale(8 * 25),
                                            height: _moderateScale(8 * 17),
                                            resizeMode: 'contain'
                                        }} source={require('../../NewIcon/frontCmnd.png')} />
                                }
                            </>

                    }

                    <Image style={{
                        width: _moderateScale(8 * 5),
                        height: _moderateScale(8 * 5),
                        resizeMode: 'contain',
                        position: 'absolute',
                        bottom: -_moderateScale(8 * 2),
                        right: -_moderateScale(8 * 2)
                    }} source={require('../../NewIcon/cam.png')} />
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', ...stylesFont.fontNolan500, fontSize: _moderateScale(13), marginTop: _moderateScale(8) }}>
                    Mặt trước
                </Text>
                <View style={{ height: _moderateScale(8 * 3) }} />

                <TouchableOpacity
                    disabled={(props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT")}
                    onPress={() => {
                        ActionSheetRef2.current.show()
                    }}
                    style={{ alignSelf: 'center' }}>
                    {
                        props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT" ?
                            <>
                                <Image style={{
                                    width: _moderateScale(8 * 25),
                                    height: _moderateScale(8 * 17),
                                    borderRadius: _moderateScale(8 * 2),
                                    resizeMode: 'contain'
                                }} source={{ uri: `${URL_ORIGINAL}${props?.infoCurrentCollab?.idImages[1].link}` }} />
                            </>
                            :
                            <>
                                {
                                    backCmnd?.path ?
                                        <Image style={{
                                            width: _moderateScale(8 * 25),
                                            height: _moderateScale(8 * 17),
                                            borderRadius: _moderateScale(8 * 2),
                                            resizeMode: 'contain'
                                        }} source={{ uri: `${backCmnd?.path}` }} />
                                        :
                                        <Image style={{
                                            width: _moderateScale(8 * 25),
                                            height: _moderateScale(8 * 17),
                                            resizeMode: 'contain'
                                        }} source={require('../../NewIcon/backCmnd.png')} />
                                }
                            </>

                    }
                    <Image style={{
                        width: _moderateScale(8 * 5),
                        height: _moderateScale(8 * 5),
                        resizeMode: 'contain',
                        position: 'absolute',
                        bottom: -_moderateScale(8 * 2),
                        right: -_moderateScale(8 * 2)
                    }} source={require('../../NewIcon/cam.png')} />
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', ...stylesFont.fontNolan500, fontSize: _moderateScale(13), marginTop: _moderateScale(8) }}>
                    Mặt sau
                </Text>

                <Text style={{ marginHorizontal: _moderateScale(8 * 4), textAlign: 'center', alignSelf: 'center', ...stylesFont.fontNolan500, fontSize: _moderateScale(13), marginTop: _moderateScale(8 * 3), color: RED }}>
                    *Bạn cần hình ảnh chứng thực của cả
                    mặt trước và sau của chứng minh nhân dân
                </Text>

                <View style={{ marginTop: _moderateScale(8 * 3), flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: _moderateScale(8 * 5) + getBottomSpace(), paddingRight: _moderateScale(8 * 3) }}>
                    <View style={
                        (frontCmnd?.path && backCmnd?.path) ? { opacity: 1 } : { opacity: 0.5 }
                    }>
                        {
                            props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT" ?
                                <>
                                </>
                                :
                                <TouchableOpacity
                                    disabled={(frontCmnd?.path && backCmnd?.path) ? false : true}
                                    onPress={_handleNext}
                                    style={[{
                                        width: _moderateScale(8 * 15),
                                        height: _moderateScale(8 * 4),
                                        borderRadius: _moderateScale(8 * 1),
                                        backgroundColor: SECOND_COLOR,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    },
                                    ]}>
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: WHITE }}>
                                        Tiếp tục
                                    </Text>
                                    <Image style={[sizeIcon.xs, { marginLeft: _moderateScale(8 * 1) }]} source={require('../../NewIcon/doubleArrow.png')} />
                                </TouchableOpacity>
                        }

                    </View>
                </View>
            </ScrollView>

        </View>
    );
});



export default Cmnd;
