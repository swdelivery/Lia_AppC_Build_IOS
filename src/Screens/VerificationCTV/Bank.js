import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, BG_GREY_OPACITY_2, BG_GREY_OPACITY_9 } from '../../Constant/Color';
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
import { uploadModule } from '../../Redux/Action/BookingAction';
import { createCollaboratorRequest } from '../../Redux/Action/Affiilate';

const Bank = memo((props) => {

    const [bankName, setBankName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [bankBranch, setBankBranch] = useState('')

    console.log({ bankName });


    const _handleConfirm = async () => {
        console.log({
            bankName,
            accountNumber,
            ownerName,
            bankBranch,
            frontCmnd: props?.frontCmnd,
            backCmnd: props?.backCmnd
        });
        if (!bankName || !accountNumber || !ownerName) {
            Alert.alert(
                "Thông báo",
                "Bạn chưa điền đầy đủ thông tin, xác nhận bỏ qua?",
                [
                    {
                        text: "Huỷ",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Đồng ý", onPress: async () => {

                            let listImages = [props?.frontCmnd, props?.backCmnd].map((i, index) => {
                                return {
                                    uri: i.path,
                                    width: i.width,
                                    height: i.height,
                                    mime: i.mime,
                                    type: i.mime,
                                    name: `${i.modificationDate}_${index}`
                                };
                            })
                            console.log({ listImages });

                            let resultUploadImageMessage = await uploadModule({
                                moduleName: 'collaboratorRequest',
                                files: listImages
                            })
                            if (resultUploadImageMessage?.isAxiosError) return
                            let listIdImageHasUpload = resultUploadImageMessage?.data?.data?.map(item => item._id);

                            let body = {
                                idImages: listIdImageHasUpload,
                                bankAccount: {
                                    "bankName": bankName,
                                    "bankBranch": bankBranch,
                                    "ownerName": ownerName,
                                    "accountNumber": accountNumber
                                }
                            }

                            let result = await createCollaboratorRequest(body)
                            if (result?.isAxiosError) return
                            navigation.goBack()
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            let listImages = [props?.frontCmnd, props?.backCmnd].map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })
            console.log({ listImages });

            let resultUploadImageMessage = await uploadModule({
                moduleName: 'collaboratorRequest',
                files: listImages
            })
            if (resultUploadImageMessage?.isAxiosError) return
            let listIdImageHasUpload = resultUploadImageMessage?.data?.data?.map(item => item._id);

            let body = {
                idImages: listIdImageHasUpload,
                bankAccount: {
                    "bankName": bankName,
                    "bankBranch": bankBranch,
                    "ownerName": ownerName,
                    "accountNumber": accountNumber
                }
            }

            let result = await createCollaboratorRequest(body)
            if (result?.isAxiosError) return
            navigation.goBack()
        }


    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={false} style={{ flex: 1, backgroundColor: WHITE }}>

            <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop:_moderateScale(8) }}>
                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(16), marginTop: _moderateScale(8 * 2), color: BLACK_OPACITY_8 }]}>
                    Tên ngân hàng {
                        // <Text style={{ color: GREY, fontSize: _moderateScale(14) }}>( Bắt buộc )</Text>
                    }
                </Text>
                {
                    props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT" ?
                        <View
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_BANK_FOR_WITHDRAW, { flag: "confirm", setBankName })
                            }}
                            style={styles.textInputCode}>
                            <Text style={[{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), letterSpacing: 2, color: BG_GREY_OPACITY_9 }, props?.infoCurrentCollab?.bankAccount?.bankName && { color: BLUE_FB }]}>
                                {
                                    props?.infoCurrentCollab?.bankAccount?.bankName ?
                                        props?.infoCurrentCollab?.bankAccount?.bankName
                                        :
                                        `Chưa có`
                                }
                            </Text>
                        </View>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_BANK_FOR_WITHDRAW, { flag: "confirm", setBankName })
                            }}
                            style={styles.textInputCode}>
                            <Text style={[{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), letterSpacing: 2, color: BG_GREY_OPACITY_9 }, bankName && { color: BLUE_FB }]}>
                                {
                                    bankName ?
                                        bankName
                                        :
                                        `Nhấp để chọn ngân hàng`
                                }
                            </Text>
                        </TouchableOpacity>
                }

                {/* <TextInput
                    onChangeText={(e) => {
                    }}
                    // value={stk}
                    keyboardType={'number-pad'}
                    style={[stylesFont.fontNolan500, styles.textInputCode]}
                    placeholder={"Nhấp để chọn ngân hàng"} /> */}
            </View>

            <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(16), marginTop: _moderateScale(8 * 2), color: BLACK_OPACITY_8 }]}>
                    Số tài khoản {
                        // <Text style={{ color: GREY, fontSize: _moderateScale(14) }}>( Không bắt buộc )</Text>
                    }
                </Text>
                {
                    props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT" ?
                        <TextInput
                            onChangeText={(e) => {
                                setAccountNumber(e)
                            }}
                            editable={false}
                            value={props?.infoCurrentCollab?.bankAccount?.accountNumber}
                            keyboardType={'number-pad'}
                            placeholderTextColor={BG_GREY_OPACITY_9}
                            style={[stylesFont.fontNolan500, styles.textInputCode]}
                            placeholder={"Nhập số tài khoản"} />
                        :
                        <TextInput
                            onChangeText={(e) => {
                                setAccountNumber(e)
                            }}
                            value={accountNumber}
                            keyboardType={'number-pad'}
                            placeholderTextColor={BG_GREY_OPACITY_9}
                            style={[stylesFont.fontNolan500, styles.textInputCode]}
                            placeholder={"Nhập số tài khoản"} />
                }

            </View>

            <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(16), marginTop: _moderateScale(8 * 2), color: BLACK_OPACITY_8 }]}>
                    Tên chủ thẻ {
                        // <Text style={{ color: GREY, fontSize: _moderateScale(14) }}>( Không bắt buộc )</Text>
                    }
                </Text>
                {
                    props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT" ?
                        <TextInput
                            onChangeText={(e) => {
                                setOwnerName(e)
                            }}
                            editable={false}
                            value={props?.infoCurrentCollab?.bankAccount?.ownerName}
                            autoCapitalize={'characters'}
                            // keyboardType={''}
                            placeholderTextColor={BG_GREY_OPACITY_9}
                            style={[stylesFont.fontNolan500, styles.textInputCode]}
                            placeholder={"Nhập tên chủ thẻ"} />
                        :
                        <TextInput
                            onChangeText={(e) => {
                                setOwnerName(e)
                            }}
                            value={ownerName}
                            autoCapitalize={'characters'}
                            // keyboardType={''}
                            placeholderTextColor={BG_GREY_OPACITY_9}
                            style={[stylesFont.fontNolan500, styles.textInputCode]}
                            placeholder={"Nhập tên chủ thẻ"} />
                }

            </View>

            <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(16), marginTop: _moderateScale(8 * 2), color: BLACK_OPACITY_8 }]}>
                    Tên chi nhánh {
                        <Text style={{ color: GREY, fontSize: _moderateScale(14) }}>( Không bắt buộc )</Text>
                    }
                </Text>
                {
                    props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT" ?
                        <TextInput
                            onChangeText={(e) => {
                                setBankBranch(e)
                            }}
                            value={props?.infoCurrentCollab?.bankAccount?.bankBranch}
                            autoCapitalize={'characters'}
                            editable={false}
                            // keyboardType={''}
                            placeholderTextColor={BG_GREY_OPACITY_9}
                            style={[stylesFont.fontNolan500, styles.textInputCode]}
                            placeholder={"Nhập tên chi nhánh"} />
                        :
                        <TextInput
                            onChangeText={(e) => {
                                setBankBranch(e)
                            }}
                            value={bankBranch}
                            autoCapitalize={'characters'}
                            // keyboardType={''}
                            placeholderTextColor={BG_GREY_OPACITY_9}
                            style={[stylesFont.fontNolan500, styles.textInputCode]}
                            placeholder={"Nhập tên chi nhánh"} />
                }

            </View>
            <View style={{ flex: 1 }}>

            </View>

            {
                props?.infoCurrentCollab?._id && props?.infoCurrentCollab?.status == "WAIT" ?
                    <>
                    </>
                    :
                    <View style={{
                        flexDirection: 'row', paddingVertical: _moderateScale(8),
                        paddingBottom: getBottomSpace() + _moderateScale(8 * 4),
                        paddingHorizontal: _moderateScale(8 * 3),
                        backgroundColor: WHITE,
                        borderTopWidth: 0.5,
                        borderColor: BG_GREY_OPACITY_5
                    }}>
                        <TouchableOpacity
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
                                Xác nhận
                    </Text>
                        </TouchableOpacity>
                    </View>
            }


        </ScrollView>
    );
});

const styles = StyleSheet.create({
    textInputCode: {
        letterSpacing: 2,
        fontSize: _moderateScale(16),
        padding: _moderateScale(8),
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        marginTop: _moderateScale(8),
        color: BLUE_FB,
    },
})

export default Bank;