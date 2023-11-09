import _get from 'lodash/get';
import React, { memo, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { BG_GREY_OPACITY_5, BLUE_TITLE, MAIN_OPACITY_8, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { URL_ORIGINAL } from '../../../Constant/Url';
import ActionSheet from 'react-native-actionsheet';

const ListImage = memo(function ListImage(props) {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const ActionSheetRef = useRef()

    const _handlePickImage = async (type) => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 6,
            mediaType: 'photo',
            // cropping:true,
            compressImageQuality: 0.5,
            compressImageMaxWidth: 700,
            // compressVideoPreset:'LowQuality' 
        }).then(async (images) => {
            props?.setImage(images)
        }).catch(e => { });
    }

    const pickCamera = () => {
        ImagePicker.openCamera({
            // width: _moderateScale(160 * 10),
            // height: _moderateScale(160 * 10),
            // cropping: true,
            mediaType: 'photo',
            compressImageQuality: 0.5
        }).then(async (images) => {
            props?.setImage([images])
        }).catch(e => { });
    }


    const _handleDelImage = ( path)=>{
            props?.delImage(path)
    }

    return (
        <> 
            <ActionSheet
                ref={ActionSheetRef}
                // title={'Which one do you like ?'}
                options={["Mở Camera", "Chọn ảnh từ thư viện", "Huỷ"]}
                cancelButtonIndex={3}
                // destructiveButtonIndex={0} 
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            pickCamera()
                            break;
                        case 1:
                            _handlePickImage()
                            break;

                        default:
                            break;
                    }
                }}
            />
                 <View style={[styles.listImgFeed]}>
                    {
                            props?.data?.map((item,index)=>{
                                return  <TouchableOpacity 
                                onPress={()=>_handleDelImage(item?.path)}
                                style={[styles.itemImgFeed]} key={index}>
                                    <Image 
                                    style={[styles.imgFeed]}
                                    source={{ uri: `${_get(item,'id','')!==''?`${URL_ORIGINAL}/`:''}${item?.path}` }}  
                                    />
                                </TouchableOpacity>
                            }) 
                        }

                            <TouchableOpacity 
                            onPress={()=>  ActionSheetRef.current.show()}
                            style={[styles.itemImgFeed, styles.itemImgFeedAdd, {marginBottom: 0}]}>
                                <Image 
                                style={[sizeIcon.xs]}
                                source={require('../../../Image/component/plus.png')} />
                            </TouchableOpacity>

                        </View>
      
                            
        </>
    )
})


const styles = StyleSheet.create({


    ///-----start comment -----//
   
    listImgFeed:{
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    itemImgFeedAdd:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius: _moderateScale(60),
        width: _widthScale(8*6),
        height: _heightScale(8*6),
        borderStyle:'dashed',
        borderColor: BLUE_TITLE,
        alignSelf: 'center'
    },
    itemImgFeed:{
        marginRight: _moderateScale(8),
        // padding: _moderateScale(2),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(4),
        position:'relative',
        marginBottom: _moderateScale(8)
    },
    imgFeed:{
        width: _widthScale(8*8),
        borderRadius: _moderateScale(4),
        height: _heightScale(8*8)
    },

    itemImgMore:{
        backgroundColor: MAIN_OPACITY_8,
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        borderRadius: _moderateScale(8),
        justifyContent:'center',
        alignItems:'center'
    },
    textMoreImg:{
        fontSize: _moderateScale(28),
        color: WHITE,
        ...stylesFont.fontNolan500
    },
    headShare:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    titShare:{
        marginLeft: _moderateScale(4),
        color: BLUE_TITLE,
        ...stylesFont.fontNolan500
    },
    ///-----end comment-----//
})


export default ListImage
