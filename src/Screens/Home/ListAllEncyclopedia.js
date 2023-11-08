import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, ScrollView } from 'react-native';
import * as Color from '../../Constant/Color';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE } from '../../Constant/Color';
import { FONT_DINTEXT_PRO, stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _heightScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { ImageBackground, Image, Dimensions } from 'react-native';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import _ from 'lodash';
import { navigate, navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey';
import { setShowModalAllNotifi } from '../../Redux/Action/NotificationAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranch } from '../../Redux/Action/BranchAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../Constant/Url';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import Header from '../../Components/HeaderLoseWeight/index';
import HeaderLeft from '../../Components/HeaderLeft';
import CountStar from '../../Components/CountStar/index';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import FastImage from '../../Components/Image/FastImage';
import { getAllNewsv2,getEncyclopedia } from '../../Redux/Action/News';
import ItemNews from './Components/ItemNews';
import ItemEncyclopedia from './Components/ItemEncyclopedia';

const ListAllEncyclopedia = props => {
   
    const [listAllNews, setListAllNews] = useState([])

    useEffect(() => {
        _getAllNews()
    }, [])

    const _getAllNews = async() => {
        let result = await getEncyclopedia({
            "limit": 1000,
            "page": 1
        })
        if(result?.isAxiosError)return
        setListAllNews(result?.data?.data)
    }

    return (

        <View style={[styles.container]}>
            <StatusBarCustom />
            <HeaderLeft hasSetting title={"Danh sách bách khoa"} />
            <ScrollView style={{paddingHorizontal:_moderateScale(8*2)}}>
                <View style={{height:_moderateScale(8*1)}}/>
                {
                    listAllNews?.length > 0 && listAllNews?.map((item, index) => {
                        return (
                            <ItemEncyclopedia key={index} data={item} />
                        )
                    })
                }
                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    );
};



const shadow = {
    shadowColor: Color.BASE_COLOR,
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,


    elevation: 2
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    title: {
        fontSize: _moderateScale(20),
        color: WHITE,
        marginLeft: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 3)
    },

    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(300),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
    main: {
        // position:'relative',
        flex: 1,
    },

    listBooking: {
        // paddingHorizontal: _moderateScale(16),
        // paddingTop: _moderateScale(32),
    },
    FaItemBooing: {
        backgroundColor: WHITE,
        marginVertical: _moderateScale(12),
        marginHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(12),
        // borderWidth: 0.5,
        // borderColor: '#000',
    },
    itemBooking: {
        flexDirection: 'row',

        paddingVertical: _moderateScale(12),
        paddingHorizontal: _moderateScale(8),
        backgroundColor: 'rgba(255, 255, 255,0.3)',
        // borderRadius: _moderateScale(12),


        // shadowColor: WHITE,
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 10,
    },
    leftItemBooking: {
        justifyContent: 'center',
        alignItems: 'center',

        flex: 0.3,
    },
    containAvatar: {
        backgroundColor: '#fff',
        width: _moderateScale(90),
        height: _moderateScale(90),
        borderRadius: _moderateScale(90 / 2),
        overflow: 'hidden',
        // shadowColor: Color.BASE_COLOR,
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: _moderateScale(90),
        height: _moderateScale(90),
    },
    rightItemBooking: {
        justifyContent: 'center',
        flex: 0.7,
        paddingHorizontal: _moderateScale(12)
    },
    titBooking: {
        fontSize: 18,
        ...stylesFont.fontNolanBold,
        color: Color.SECOND_COLOR
    },
    lineItem: {
        flexDirection: 'row',
        marginBottom: _moderateScale(4),
    },
    iCon: {
        marginRight: _moderateScale(6)
    },
    briefLine: {
        fontSize: _moderateScale(13),
        flexWrap: 'wrap',
        flex: 1,
        color: GREY_FOR_TITLE
    },
    btnBoooking: {
        backgroundColor: Color.BASE_COLOR,
        paddingHorizontal: _moderateScale(8 * 1.5),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(4)
    },
    headOfLine: {
        paddingBottom: _moderateScale(4),
        marginBottom: _moderateScale(4),
        // borderBottomWidth: _moderateScale(0.5),
        // borderColor: Color.BG_GREY_OPACITY_9
    }
})


export default ListAllEncyclopedia;