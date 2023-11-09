import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useCallback, useState, memo } from 'react';
import {
    Animated, Image, StyleSheet, Text, TextInput,
    RefreshControl, ActivityIndicator,
    TouchableOpacity, View, FlatList, ImageBackground, ScrollView, Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, BLACK_OPACITY_7 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { getAllPost, getMoreAllPost, deletePost } from '../../Redux/Action/PostAction';
import isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import { getMinePartnerPost } from '../../Redux/Action/PostAction'
import ItemPost from './Components/ItemPost';
import ItemDiary from './Components/ItemDiary';
import { getPartnerDiaryv2 } from '../../Redux/Action/Diary';
import ActionSheet from 'react-native-actionsheet';


const ListPosts = memo((props) => {

    const [listPartnerPost, setListPartnerPost] = useState([])

    const ActionSheetRef = useRef()

    const [currIdPostAction, setCurrIdPostAction] = useState(null)

    useEffect(() => {
        _getListPosts()
    }, [])

    const _getListPosts = async () => {
        let result = await getMinePartnerPost();
        if (result?.isAxiosError) return
        setListPartnerPost(result?.data?.data)
    }

    const _openActionSheet = (idPost) => {
        setCurrIdPostAction(idPost)
        setTimeout(() => {
            ActionSheetRef.current.show()
        }, 0);
    }

    return (
        <View style={{ flex: 1 }}>

            <ActionSheet
                ref={ActionSheetRef}
                // title={'Which one do you like ?'}
                options={["Xem bài biết", "Sửa bài viết", "Xoá", "Đóng"]}
                cancelButtonIndex={3}
                destructiveButtonIndex={2}
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            navigation.navigate(ScreenKey.DETAIL_NEW_FEED, { idPost: currIdPostAction })
                            break;
                        case 1:
                            // pickVideo()
                            navigation.navigate(ScreenKey.EDIT_NEW_FEED, { idPost: currIdPostAction })
                            break;
                        case 2:
                            // pickMultiple()
                            Alert.alert(
                                "Xác nhận",
                                "Bạn có chắc muốn xoá bài viết này?",
                                [
                                    {
                                        text: "Huỷ",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    {
                                        text: "Đồng ý", onPress: async () => {
                                            let result = await deletePost(
                                                currIdPostAction
                                            )
                                            if (result?.isAxiosError) return;

                                            let tempListPosts = [...listPartnerPost];
                                            tempListPosts = tempListPosts?.filter(item => item?._id !== currIdPostAction)
                                            setListPartnerPost(tempListPosts)
                                        }
                                    }
                                ],
                                { cancelable: false }
                            );

                            break;

                        default:
                            break;
                    }
                }}
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {
                    listPartnerPost?.length > 0 ?
                        <>
                            {
                                listPartnerPost?.map((item, index) => {
                                    return (
                                        <ItemPost onPress={_openActionSheet} key={item?._id} data={item} />
                                    )
                                })
                            }
                        </>
                        :
                        <View style={[{ flex: 1 }, styleElement.centerChild]}>
                            <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>Chưa có dữ liệu</Text>
                        </View>
                }
            </ScrollView>
        </View>
    );
});



export default ListPosts;