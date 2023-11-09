import AsyncStorage from '@react-native-community/async-storage';
import { find } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl, Dimensions, ActivityIndicator } from 'react-native';
import ImageView from "react-native-image-viewing";
import { useDispatch, useSelector } from "react-redux";
import { navigation } from '../../../rootNavigation';
import SocketInstance from '../../../SocketInstance';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BLACK_OPACITY_8, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_7, BG_GREY_OPACITY_3, PRICE_ORANGE, GREEN_2, BG_GREY_OPACITY_9, RED } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { partnerLevel } from '../../Constant/PartnerLevel';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { getMedicalPrescription, getTreatmentDetail } from '../../Redux/Action/InfoAction';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";
import ItemHistory from './component/ItemHistory';
import ItemMedical from './component/ItemMedical';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { partnerAccountLogout } from '../../Redux/Action/AuthAction';

const DetailTreatment = memo((props) => {
    return (
        <View style={{flex:1, backgroundColor:WHITE}}>
            
        </View>
    );
});



export default DetailTreatment;