import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _widthScale, _moderateScale } from '../../Constant/Scale';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from '../../Redux/Store';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import ScreenKey from '../../Navigation/ScreenKey'
import { navigation } from '../../../rootNavigation';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadModule } from '../../Redux/Action/BookingAction'
import { updateProfilePartner } from '../../Redux/Action/ProfileAction';
import isEmpty from 'lodash/isEmpty';

const ModalRequireAvatar = props => {

    const dispatch = useDispatch()


    const isShowRequireAvatarRedux = useSelector(state => state.notificationReducer?.isShowRequireAvatar)



    const closeModal = () => {
        Store.dispatch({
            type: ActionType.SHOW_MODAL_REQUIRE_AVATAR,
            payload: {
                flag: false
            }
        })
    }



    const pickCamera = () => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            width: _moderateScale(130 * 5),
            height: _moderateScale(160 * 5),
            cropping: true,
            multiple: false,
        }).then(async (image) => {

            console.log({image});
            let newImage = {
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
                type: image.mime,
                name: `${image.modificationDate}_${0}`,
                isLocal: true
            }

            if (!isEmpty(newImage)) {
                let listImages = [newImage]
                let resultUploadImage = await uploadModule({
                    moduleName: 'partner',
                    files: listImages
                })
                if (resultUploadImage.isAxiosError) return

                let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);

                dispatch(updateProfilePartner({ fileAvatar: listIdImageHasUpload[0] }))
                setTimeout(() => {
                    closeModal()
                }, 500);
            }

        }).catch(e => { });
    }



    const _handlePickImageAvatar = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            width: _moderateScale(130 * 5),
            height: _moderateScale(160 * 5),
            cropping: true,
            multiple: false,
            mediaType: 'photo',
            // compressImageQuality: 0.5
        }).then(async (image) => {
            console.log({image});
            let newImage = {
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
                type: image.mime,
                name: `${image.modificationDate}_${0}`,
                isLocal: true
            }

            if (!isEmpty(newImage)) {
                let listImages = [newImage]
                let resultUploadImage = await uploadModule({
                    moduleName: 'partner',
                    files: listImages
                })
                if (resultUploadImage.isAxiosError) return

                let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);

                dispatch(updateProfilePartner({ fileAvatar: listIdImageHasUpload[0] }))
                setTimeout(() => {
                    closeModal()
                }, 500);
            }

            // dispatch(employeeUpdateAvatar(newImage))
        });
    }


    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center'
        }}
            animationIn='zoomIn'
            animationOut='zoomOut'
            // animationInTiming={500}
            // animationOutTiming={500}
            isVisible={isShowRequireAvatarRedux}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? true : true}
            onBackButtonPress={() => {
                closeModal()
            }}
            onBackdropPress={() => {
                // closeModal()
            }}>

            <View style={styles.modalFilter}>
                <View style={{ alignItems: 'flex-end', paddingRight: _moderateScale(8 * 2) }}>
                    <TouchableOpacity
                        onPress={() => {
                            closeModal()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity onPress={_handlePickImageAvatar}>
                    <Image style={{
                        width: _widthScale(120),
                        height: _widthScale(120),
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginVertical: _moderateScale(8 * 2)
                    }} source={require('../../NewIcon/btnAdd.png')} />
                </TouchableOpacity> */}
                <View style={styles.viewContent}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _widthScale(18), alignSelf: 'center', marginBottom: _heightScale(8), color: Color.BLACK_OPACITY_8 }]}>
                        Cập nhật Avatar
                    </Text>
                    <Text style={[stylesFont.fontNolan500, styles.content]}>
                        Cập nhật Avatar ngay để nhận được 2 Xu
                    </Text>
                </View>
                <View style={{height:_moderateScale(8*2)}}/>

                <TouchableOpacity
                onPress={()=>{
                    pickCamera()
                }}
                style={[styleElement.centerChild,{
                    borderWidth:1.5,
                    borderStyle:'dashed',
                    borderColor:Color.BASE_COLOR,
                    width:_moderateScale(8*20),
                    height:_moderateScale(8*5),
                    alignSelf:'center',
                    marginTop:_moderateScale(8*2),
                    borderRadius:_moderateScale(8)
                }]}>
                    <Text style={{
                        color:Color.BASE_COLOR,
                        ...stylesFont.fontNolanBold,
                        fontSize:_moderateScale(15)
                    }}>
                        Chụp ảnh
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>{
                    _handlePickImageAvatar()
                }}
                style={[styleElement.centerChild,{
                    borderWidth:1.5,
                    borderStyle:'dashed',
                    borderColor:Color.BASE_COLOR,
                    width:_moderateScale(8*20),
                    height:_moderateScale(8*5),
                    alignSelf:'center',
                    marginTop:_moderateScale(8*2),
                    borderRadius:_moderateScale(8)
                }]}>
                    <Text style={{
                        color:Color.BASE_COLOR,
                        ...stylesFont.fontNolanBold,
                        fontSize:_moderateScale(15)
                    }}>
                        Chọn từ thư viện
                    </Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalFilter: {
        width: "85%",
        backgroundColor: Color.WHITE,
        borderRadius: _widthScale(8 * 2),
        backgroundColor: Color.WHITE,
        paddingVertical: _heightScale(8 * 2)
    },
    viewContent: {
        paddingHorizontal: _widthScale(8 * 3),
    },
    content: {
        fontSize: _widthScale(14),
        // lineHeight: _heightScale(16),
        color: Color.GREY
    },
    cancelBtn: {
        alignSelf: 'flex-end',
        padding: _widthScale(8),
        marginTop: _heightScale(8),
    },
    cancelBtn__text: {
        fontSize: _widthScale(16),
        color: Color.BASE_COLOR
    }
})



export default ModalRequireAvatar;