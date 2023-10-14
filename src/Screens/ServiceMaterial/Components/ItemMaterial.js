import { isEmpty } from 'lodash-es';
import moment from 'moment';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK, GREEN_SUCCESS, GREY, RED, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from "../../../Constant/Scale";
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';


const ItemMaterial = memo((props) => {


    const _handleNavigateToInfoMaterial = () => {
        // setShowModalInfoBooking(true)
        navigation.navigate(ScreenKey.INFO_MATERIAL, { data: props?.data })
        // navigation.navigate('Modal', { screen: 'INFO_BOOKING', params: { user: 'jane' }, })
    }

    console.log({data: props?.data});
    return (
        <TouchableOpacity
            onPress={_handleNavigateToInfoMaterial}
            style={styles.card}>
            <View style={[{ paddingHorizontal: _moderateScale(8 * 2),
                flexDirection: 'row' }]}>
                {
                    !isEmpty(props?.data)&& props?.data?.representationFileArr?.length > 0 ?
                        // true ?
                        <Image style={styles.avatarService} source={{ uri: `${URL_ORIGINAL}${props?.data?.representationFileArr[0]?.link}` }} />
                        :
                        <View style={styles.avatarService}/>
                }
                <View style={{ marginLeft: _moderateScale(8 * 2), flex: 1 }}>
                    <Text style={styles.title}>{props?.data?.name}</Text>
                    <Text style={[styles.title, { 
                        marginTop: _moderateScale(4),
                        color: GREY, fontSize: _moderateScale(14) }]}>{props?.serviceName}</Text>
                </View>

            </View>
            <View style={styles.line} />

            {/* <View style={[{ paddingHorizontal: _moderateScale(8 * 2)}]}>
                <View style={[styleElement.rowAliCenter]}>
                    <Text 
                    numberOfLines={2}
                    style={[stylesFont.fontNolan, { marginLeft: _moderateScale(4), flex: 1, fontSize: _moderateScale(13), color: BLACK }]}>
                        {props?.data?.description}
                    </Text>
                </View>
            </View> */}

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    dotStatus: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(4),
        top: _moderateScale(1)
    },
    line: {
        height: _moderateScale(0.5),
        backgroundColor: BG_GREY_OPACITY_5,
        width: "90%",
        alignSelf: 'center',
        marginVertical: _moderateScale(8)
    },
    title: {
        ...stylesFont.fontNolan500,
        color: BASE_COLOR,
        fontSize: _moderateScale(16),
    },
    avatarService: {
        backgroundColor: BG_GREY_OPACITY_2,
        width: _moderateScale(8 * 7),
        height: _moderateScale(8 * 7),
        borderRadius: _moderateScale(8)
    },
    card: {
        width: '100%',
        // height: _moderateScale(8 * 20),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        marginBottom: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2)
    }
})

export default ItemMaterial;