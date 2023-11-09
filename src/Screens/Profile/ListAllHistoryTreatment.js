import AsyncStorage from '@react-native-community/async-storage';
import { find } from 'lodash';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl, Dimensions, ActivityIndicator } from 'react-native';
import ImageView from "react-native-image-viewing";
import { useDispatch, useSelector } from "react-redux";
import { navigation } from '../../../rootNavigation';
import SocketInstance from '../../../SocketInstance';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BLACK_OPACITY_8, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_7, BG_GREY_OPACITY_3, PRICE_ORANGE, GREEN_2, BG_GREY_OPACITY_9, RED, BLACK } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { partnerLevel } from '../../Constant/PartnerLevel';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ScreenKey from '../../Navigation/ScreenKey';
import { getMedicalPrescription, getTreatmentDetail, getPartnerLevel, getMedicalPrescriptionCurrent } from '../../Redux/Action/InfoAction';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";
import ItemHistory from './component/ItemHistory';
import ItemMedical from './component/ItemMedical';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { partnerAccountLogout } from '../../Redux/Action/AuthAction';
import { formatMonney } from '../../Constant/Utils';
import ModalInfoLevel from '../../Components/ModalInfoLevel/ModalInfoLevel';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadModule } from '../../Redux/Action/BookingAction'
import { updateProfilePartner } from '../../Redux/Action/ProfileAction';
import isEmpty from 'lodash/isEmpty';

const ListAllHistoryTreatment = memo((props) => {
    const dispatch = useDispatch()

    const treatmentDetailRedux = useSelector(state => state?.infoReducer?.treatmentDetail)

    useEffect(() => {
        dispatch(getTreatmentDetail())
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingVertical: _moderateScale(8 * 1.5),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
                // height: _moderateScale(8 * 6)
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
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                        Lịch sử điều trị
                    </Text>
                </View>
            </View>
            {
                treatmentDetailRedux?.length > 0 ?
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                        <View style={{ height: _moderateScale(8 * 2) }} />
                        {
                            treatmentDetailRedux?.map((item, index) => {
                                return (
                                    <ItemHistory fullwidth key={index} data={item} />
                                )
                            })
                        }
                        <View style={{ height: _moderateScale(8 * 5) }} />
                    </ScrollView>
                    :
                    <View style={[{flex:1},styleElement.centerChild]}>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize:_moderateScale(14),
                            color:GREY,
                            fontStyle:'italic'
                        }}>
                            Lịch sử điều trị trống
                        </Text>
                    </View>
            }

        </View>
    );
});



export default ListAllHistoryTreatment;