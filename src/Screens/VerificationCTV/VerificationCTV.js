import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK } from '../../Constant/Color';
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
import SocketInstance from '../../../SocketInstance'
import BackgroundTimer from "react-native-background-timer";
import { CSS_PARTNER_POST_JOIN_ROOM, CSS_PARTNER_POST_LEFT_ROOM } from '../../Sockets/type'
import isEmpty from 'lodash/isEmpty';
import ListImage from '../NewFeed/Component/ListImage';
import { getPartnerDiaryDailyByIdv2 } from '../../Redux/Action/PartnerDiary';
import ScreenKey from '../../Navigation/ScreenKey'
import * as ActionType from '../../Redux/Constants/ActionType'
import ImageView from "react-native-image-viewing";
import store from '../../Redux/Store';
import Cmnd from './Cmnd';
import { TabBar, TabView } from 'react-native-tab-view';
import Bank from './Bank';
import { getCurrentCollaborator } from '../../Redux/Action/Affiilate'


const VerificationCTV = memo((props) => {

    const [routes] = useState([
        { key: 'first', title: 'Thông tin' },
        { key: 'second', title: 'Hình ảnh' },
    ]);
    const [index, setIndex] = useState(0);

    const [frontCmnd, setFrontCmnd] = useState({})
    const [backCmnd, setBackCmnd] = useState({})

    const [infoCurrentCollab, setInfoCurrentCollab] = useState({})

    useEffect(() => {
        _getCurrentCollaborator()
    }, [])

    const _getCurrentCollaborator = async () => {
        let result = await getCurrentCollaborator()
        setInfoCurrentCollab(result?.data?.data)
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <Cmnd
                        infoCurrentCollab={infoCurrentCollab}
                        next={(data) => {
                            setFrontCmnd(data?.frontCmnd)
                            setBackCmnd(data?.backCmnd)
                            setIndex(1)
                        }} />
                );
            case 'second':
                return (
                    <Bank
                        infoCurrentCollab={infoCurrentCollab}
                        frontCmnd={frontCmnd}
                        backCmnd={backCmnd}
                    />
                );

            default:
                break;
        }

    }

    return (
        <View style={styles.container}>

            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingVertical: _moderateScale(8 * 1.5),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
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
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                            Xác thực danh tính
                            </Text>
                    }
                </View>
            </View>

            <TabView
                renderTabBar={() => { }}
                swipeEnabled={(infoCurrentCollab?._id && infoCurrentCollab?.status == 'WAIT') ? true : false}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />

            <View>
                {
                    (infoCurrentCollab?._id && infoCurrentCollab?.status == 'WAIT') ?
                        <View style={{
                            flexDirection: 'row', paddingVertical: _moderateScale(8),
                            paddingBottom: getBottomSpace() + _moderateScale(8 * 0),
                            paddingHorizontal: _moderateScale(8 * 3),
                            backgroundColor: WHITE,
                            borderTopWidth: 0.5,
                            borderColor: BG_GREY_OPACITY_5,
                            opacity: 0.5
                        }}>
                            <View
                                onPress={() => {
                                    _handleConfirm()
                                }}
                                style={[{
                                    height: _moderateScale(8 * 5),
                                    backgroundColor: WHITE,
                                    borderRadius: _moderateScale(8),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: BASE_COLOR,
                                    flex: 5
                                }]}>

                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                    Yêu cầu của bạn đang được xử lý
                        </Text>
                            </View>
                        </View>
                        :
                        <></>
                }

            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})

export default VerificationCTV;