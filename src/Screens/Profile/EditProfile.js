import moment from 'moment';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from "react-redux";
import { navigation } from '../../../rootNavigation';
import FastImage from '../../Components/Image/FastImage';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { employeeUpdateAvatar } from '../../Redux/Action/MembersAction';


const ItemEdit = props => {
    return (
        <View style={styles.item}>
            <Text style={[stylesFont.fontNolan500, styles.item__title]}>
                {
                    props.title
                }
            </Text>
            <View style={styles.item__input}>
                <Text style={[stylesFont.fontNolan500, styles.item__input__text]}>
                    {
                        props.description
                    }
                </Text>
            </View>
        </View>
    )
}


const EditProfile = props => {
    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)



    const _handlePickImageAvatar = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            width: 500,
            height: 500,
            cropping: true,
            multiple: false,
            mediaType: 'photo',
            compressImageQuality: 0.5
        }).then(image => {
            console.log(image);
            let newImage = {
                uri: image.path, 
                width: image.width,
                height: image.height,
                mime: image.mime,
                type: image.mime,
                name: `${image.modificationDate}_${0}`
            }
            dispatch(employeeUpdateAvatar(newImage))
        });
    }

    

    return (
        <View style={styles.container}>
            <View style={[styles.header, shadow, styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _widthScale(8) }]}>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => navigation.goBack()}
                    style={styles.btnGoBack}>
                    <Image style={sizeIcon.llllg} source={require('../../Icon/goBackGrey.png')} />
                </TouchableOpacity>
                <Text style={[stylesFont.fontNolan500, styles.header__title]}>
                    Cá nhân
                </Text>
                <View style={[styles.btnGoBack, { opacity: 0 }]}>
                    <Image style={sizeIcon.llllg} source={require('../../Icon/goBackGrey.png')} />
                </View>
            </View>
            <View style={{ height: _moderateScale(8 * 2) }} />

            <View style={[{ alignSelf: 'center' }, styles.avatar]}>
                <TouchableOpacity onPress={_handlePickImageAvatar}>
                    <FastImage
                        style={[styles.avatar]}
                        uri={infoUserRedux?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT} />
                </TouchableOpacity>
                <View style={styles.btnUploadAvatar}>
                    <TouchableOpacity>
                        <Image style={sizeIcon.lg} source={require('../../Icon/camera_blue.png')} />
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.body}>
                <ItemEdit title={'Họ tên'} description={`${infoUserRedux?.profile?.firstName} ${infoUserRedux?.profile?.lastName}`} />
                <ItemEdit title={'Ngày sinh'} description={moment(new Date(infoUserRedux?.profile?.birthday)).format('LL')} />
                <ItemEdit title={'Công việc'} description={`${infoUserRedux?.profile?.departmentCode}`} />
                {/* <ItemEdit/>
                <ItemEdit/>
                <ItemEdit/>
                <ItemEdit/> */} 
            </View>

                
        </View>
    );
};

const styles = StyleSheet.create({
    item__input__text: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE
    },
    item__input: {
        width: '100%',
        backgroundColor: BLUE_2,
        paddingVertical: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(0.75),
        borderColor: BG_GREY_OPACITY_3
    },
    item__title: {
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE,
        opacity: .8,
        marginBottom: _moderateScale(8)
    },
    item: {
        marginTop: _moderateScale(8 * 2)
    },
    body: {
        paddingHorizontal: _widthScale(8 * 3)
    },
    btnUploadAvatar: {
        width: 50,
        height: 50,
        backgroundColor: BLUE,
        position: 'absolute',
        bottom: -_moderateScale(8 * 2),
        right: -_moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8 * 1.5),
        borderWidth: _moderateScale(4),
        borderColor: WHITE
    },
    avatar: {
        width: _moderateScale(130 * 1),
        height: _moderateScale(160 * 1),
        borderRadius: _moderateScale(10), borderRadius: _moderateScale(8),
        // borderWidth: _moderateScale(4),
        // borderColor: WHITE
    },
    header__title: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE
    },
    btnGoBack: {
    },
    header: {
        width: '100%',
        height: _moderateScale(52),
        backgroundColor: WHITE
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.68,

    elevation: 3
}


export default memo(EditProfile);