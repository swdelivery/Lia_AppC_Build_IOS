import React, { useRef, useEffect, memo } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import * as Color from '../../../Constant/Color';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color';
import { FONT_DINTEXT_PRO, stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _heightScale, _width, _height } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { ImageBackground, Image, Dimensions } from 'react-native';
import { sizeIcon, sizeLogo } from '../../../Constant/Icon';
import _ from 'lodash';
import { navigate, navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';
import { setShowModalAllNotifi } from '../../../Redux/Action/NotificationAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranch } from '../../../Redux/Action/BranchAction';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../../Constant/Url';
import AlarmNotifi from '../../../Components/AlarmNotifi/AlarmNotifi';
import Header from '../../../Components/HeaderLoseWeight/index';
import HeaderLeft from '../../../Components/HeaderLeft';
import CountStar from '../../../Components/CountStar/index';
import store from "../../../Redux/store";
import * as ActionType from '../../../Redux/Constants/ActionType'
import FastImage from '../../../Components/Image/FastImage';
import { RenderItemProps } from '@typings/common';
import BranchItem from '@Screens/SoYoungBranch/components/BranchItem';
import { Branch } from '@typings/branch';
import useItemExtractor from 'src/Hooks/useItemExtractor';

const ListBranch = memo((props) => {


    function renderItem({ item }: RenderItemProps<any>) {
        return <BranchItem item={item} />;
    }

    const { keyExtractor } = useItemExtractor<Branch>((item) => item._id);

    return (
        <FlatList
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            data={props?.data?.data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            removeClippedSubviews
        />
    );
});


const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 30,
        minHeight: _height,
    },
    viewAll: {
        alignItems: "flex-end",
        borderRadius: 8,
        paddingVertical: 4,
    },
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 1
}

export default ListBranch;
