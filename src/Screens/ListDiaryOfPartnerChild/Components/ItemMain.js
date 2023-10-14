import React,{useEffect,useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import ImageView from "react-native-image-viewing";
import { GREY, RED, WHITE } from '../../../Constant/Color';
import { _moderateScale } from '../../../Constant/Scale';
import { URL_ORIGINAL } from '../../../Constant/Url';
import ActionSheet from 'react-native-actionsheet';
import { tesst, updatePartnerDiary } from '../../../Redux/Action/PartnerDiary';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { uploadModule } from '../../../Redux/Action/BookingAction';
import _ from 'lodash'
import { styleElement } from '../../../Constant/StyleElement';
import { randomStringFixLengthCode } from '../../../Constant/Utils';

function ItemMain(props) {
    const dispatch = useDispatch()

    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [imageBefore, setImageBefore] = useState([])
    const [imageAfter, setImageAfter] = useState([])

    const [type, setType] = useState({
        type:'',
        randomStr: randomStringFixLengthCode(5)
    })
    const ActionSheetRef = useRef()

    // const [isShowActionSheet, setIsShowActionSht] = useState(false)


    useEffect(() => {
        console.log('didmount', props?.data)
       setImageBefore(props?.data?.imageBeforeTreatment)
       setImageAfter(props?.data?.imageAfterTreatment)


    }, [props?.data])

    useEffect(()=>{
        if(type?.type?.length > 0){
            ActionSheetRef.current.show()
        }
    },[type])

   const handleUpdatePartnerDiary = (listIdImageHasUpload) =>{
      
        var data = {}
        if(type?.type === 'before')
        {
             data = {
                "imageBeforeTreatment": [..._.map(imageBefore,'_id'), ...listIdImageHasUpload]
            }
        }
        else
        {
            data = {
                "imageAfterTreatment": [..._.map(imageAfter,'_id'), ...listIdImageHasUpload]
            }
        }
       
         dispatch(updatePartnerDiary(props?.data?._id, data))
    }

    const pickCamera = () => {

        ImagePicker.openCamera({
            // width: _moderateScale(160 * 10),
            // height: _moderateScale(160 * 10),
            // cropping: true,
            mediaType: 'photo',
            compressImageQuality: 0.5
        }).then(async (images) => {
            var listImages = [images].map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })

            let listIdImageHasUpload = []
           
            if (listImages.length > 0) {
                let resultUploadImage = await uploadModule({
                    moduleName: 'partnerDiary',
                    files: listImages
                })
                if (resultUploadImage.error) {
                    return
                }
    
                resultUploadImage?.data?.data?.map((item) => {
                    listIdImageHasUpload.push(item.id)
                })
    
            }
            if(listIdImageHasUpload.length>0)
            {
                handleUpdatePartnerDiary(listIdImageHasUpload)
            }
        }).catch(e => { });
    }

    const pickMultiple = async () => {
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
            console.log('images', images)
            let listImages = images.map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })

            let listIdImageHasUpload = []
            if (listImages.length > 0) {
                let resultUploadImage = await uploadModule({
                    moduleName: 'partnerDiary',
                    files: listImages
                })
                if (resultUploadImage.error) {
                    return
                }
    
                resultUploadImage?.data?.data?.map((item) => {
                    listIdImageHasUpload.push(item.id)
                })
            }
            
            if(listIdImageHasUpload.length>0)
            {
                handleUpdatePartnerDiary(listIdImageHasUpload)
            }

        }).catch(e => { });
    }

    const handleDelete = (_id, type) =>{
        
        Alert.alert(
            "Thông báo",
            "Bạn thực sự muốn xóa ảnh?",
            [
              {
                text: "Không",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Có", onPress: () =>{

                if(type==='before')
                {
                    dispatch(updatePartnerDiary(props?.data?._id, {imageBeforeTreatment: _.map(imageBefore.filter(itt=>itt._id !== _id),'_id')}))
                }
                if(type==='after')
                {
                    dispatch(updatePartnerDiary(props?.data?._id, {imageAfterTreatment:  _.map(imageAfter.filter(itt=>itt._id !== _id),'_id')}))
                }
              } }
            ])

       
    }

    return (
        <>
            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            <ActionSheet
                ref={ActionSheetRef}
                // title={'Which one do you like ?'}
                options={["Mở Camera",  "Chọn ảnh từ thư viện", "Huỷ"]}
                cancelButtonIndex={2}
                // destructiveButtonIndex={0} 
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            pickCamera()
                            break;
                        case 1:
                            pickMultiple()
                            break;

                        default:
                            break;
                    }
                }}
            />

            <View style={{flexDirection:'column', backgroundColor:WHITE, 
            paddingVertical: _moderateScale(8),
            borderRadius: _moderateScale(8),
            marginBottom: _moderateScale(16),
            paddingHorizontal:_moderateScale(16)}}>
                <View style={[styles.rowItem]}>
                    <Text style={{fontStyle:'italic', fontSize: _moderateScale(14)}}>Trước điều trị</Text>
                    <ScrollView 
                    horizontal>
                        {
                            imageBefore.map((item, index) => {
                                return (
                                    <View style={{paddingTop: 6}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowImageViewing(true)
                                            setIndexCurrImageView(index)
                                            setListImagesSeeCurr(imageBefore)
                                        }}
                                        style={[styles.itemImage]} key={index}>
                                          <Image source={{
                                            uri: `${URL_ORIGINAL}${item?.link}`
                                        }}
                                            style={{ width: _moderateScale(90), height: _moderateScale(120) }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        hitSlop={styleElement.hitslopSm}
                                        onPress={()=>handleDelete(item._id, 'before')}
                                        style={{
                                            position: 'absolute',
                                            right: _moderateScale(3),
                                            top: _moderateScale(0),
                                            width: _moderateScale(15),
                                            height: _moderateScale(15),
                                            backgroundColor: RED,
                                            borderRadius: _moderateScale(8),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignContent: 'center'
                                        }}>
                                       <View style={{ width: _moderateScale(8), height: _moderateScale(2), backgroundColor: WHITE }} />
                                    </TouchableOpacity>
                                    </View>
                                )
                            })
                        }

                         <TouchableOpacity
                             onPress={() => {
                                setType({
                                    type:'before',
                                    randomStr:randomStringFixLengthCode(5)
                                })
                                // ActionSheet.current
                            }}
                            style={{
                                backgroundColor: '#ffffffcc',
                                width: _moderateScale(90),
                                height: _moderateScale(120),
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image source={require('../../../Icon/plusGrey.png')}
                                style={{ width: _moderateScale(36), height: _moderateScale(36) }} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={[styles.rowItem]}>
                <Text style={{fontStyle:'italic', fontSize: _moderateScale(14)}}>Sau điều trị</Text>
                    <ScrollView  
                    horizontal
                    >
                        {
                            imageAfter.map((item, index) => {
                                return (
                                    <View style={{paddingTop: 6}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowImageViewing(true)
                                            setIndexCurrImageView(index)
                                            setListImagesSeeCurr(imageAfter)
                                        }}
                                        style={[styles.itemImage]} key={index}>
                                          
                                        <Image source={{
                                            uri: `${URL_ORIGINAL}${item?.link}`
                                        }}
                                            style={{ width: _moderateScale(90), height: _moderateScale(120) }}
                                        />

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        hitSlop={styleElement.hitslopSm}
                                        onPress={()=>handleDelete(item._id, 'after')}
                                        style={{
                                            position: 'absolute',
                                            right: _moderateScale(3),
                                            top: _moderateScale(0),
                                            width: _moderateScale(15),
                                            height: _moderateScale(15),
                                            backgroundColor: RED,
                                            borderRadius: _moderateScale(8),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignContent: 'center'
                                        }}>
                                       <View style={{ width: _moderateScale(8), height: _moderateScale(2), backgroundColor: WHITE }} />
                                    </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                        <TouchableOpacity
                            onPress={() => {
                                
                                setType({
                                    type:'after',
                                    randomStr:randomStringFixLengthCode(5)
                                })
                            }}
                            style={{
                                backgroundColor: '#ffffffcc',
                                width: _moderateScale(90),
                                height: _moderateScale(120),
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image source={require('../../../Icon/plusGrey.png')}
                                style={{ width: _moderateScale(36), height: _moderateScale(36) }} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    
    itemImage: {
        width: _moderateScale(90),
        height: _moderateScale(120),
        // borderWidth: _moderateScale(0.5),
        // borderColor: GREY,
        // borderStyle: 'dotted',
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(6),
        marginBottom: _moderateScale(6),
        position:'relative'
    },
    rowItem:{
        marginBottom: _moderateScale(8) 
    }
})

export default ItemMain;