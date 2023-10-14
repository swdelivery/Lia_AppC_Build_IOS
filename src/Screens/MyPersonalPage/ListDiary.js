import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useCallback, useState, memo } from 'react';
import {
    Animated, Image, StyleSheet, Text, TextInput,
    RefreshControl, ActivityIndicator,
    TouchableOpacity, View, FlatList, ImageBackground, ScrollView
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
import { getAllPost, getMoreAllPost } from '../../Redux/Action/PostAction';
import isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import { getMinePartnerPost } from '../../Redux/Action/PostAction'
import ItemPost from './Components/ItemPost';
import ItemDiary from './Components/ItemDiary';
import { getPartnerDiaryv2 } from '../../Redux/Action/Diary';

const ListDiary = memo((props) => {

    const [listPartnerDiary, setListPartnerDiary] = useState([])

    useEffect(() => {
        _getListDiary()
    }, [])

    const _getListDiary = async () => {
        let result = await getPartnerDiaryv2();
        if (result?.isAxiosError) return
        setListPartnerDiary(result?.data?.data)
    }

    return (
        <View style={{ flex: 1 }}>
             <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {
                    listPartnerDiary?.length > 0 ?
                        <>
                            {
                                listPartnerDiary?.map((item, index) => {
                                    return (
                                        <ItemDiary key={item?._id} data={item} />
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



export default ListDiary;