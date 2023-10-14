import { isEmpty } from 'lodash-es';
import _get from 'lodash/get';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { BASE_COLOR, GREY, GREY_FOR_TITLE, RED, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { uploadModule } from '../../../Redux/Action/BookingAction';
import { getTreatmentDiaryByTreatmentDetail } from '../../../Redux/Action/Diary';
import { createPartnerDiaryDaily } from '../../../Redux/Action/PartnerDiary';
import ItemInput from './ItemInput';

const CreatedDiaryForm = props => {
    const dispatch = useDispatch()

    const currentPartnerDiaryRedux = useSelector(state => state?.partnerDiaryReducer?.currentPartnerDiary)
    const currentTreatmentDiaryRedux = useSelector(state => state?.diaryReducer?.currentTreatmentDiary)

    const [treatmentDiary, setTreatmentDiary] = useState([])
    const [content, setContent] = useState('')
    const [listImage, setListImage] = useState([])
    const ActionSheetRef = useRef()

    useEffect(() => {
        dispatch(getTreatmentDiaryByTreatmentDetail(currentPartnerDiaryRedux?.entityId))
    }, [])


    useEffect(() => {
        if (!isEmpty(currentTreatmentDiaryRedux?.dailyDiaryArr)) {
            var tmp = currentTreatmentDiaryRedux?.dailyDiaryArr.filter(item =>
                moment(item?.date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY'))
            if (tmp.length > 0) {
                setListImage(tmp[0]?.images)
            }
        }
    }, [currentTreatmentDiaryRedux])


    const _createPartnerDiaryDaily = async () => {

        let imageTemp = []
        let imageExist = []
        listImage.map((i, index) => {
            //ảnh local up lên
            if (i.type === 'local') {
                imageTemp.push({
                    uri: i.image.path,
                    width: i.image.width,
                    height: i.image.height,
                    mime: i.image.mime,
                    type: i.image.mime,
                    name: `${i.image.name}_${index}`
                })
            }
            else {
                imageExist.push(i.image._id)
            }
        })
        let listIdImageHasUpload = []

        if (imageTemp.length > 0) {
            let resultUploadImage = await uploadModule({
                moduleName: 'partnerDailyDiary',
                files: imageTemp
            })
            if (resultUploadImage.error) {
                return
            }

            resultUploadImage?.data?.data?.map((item) => {
                listIdImageHasUpload.push(item.id)
            })

        }
        var data = {
            "partnerDiaryId": currentPartnerDiaryRedux?._id,
            "date": new Date(),
            "images": [...imageExist, ...listIdImageHasUpload],
            "description": content
        }

        dispatch(createPartnerDiaryDaily(data))
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
            let listImages = images.map((i, index) => {
                return {
                    type: 'local',
                    image: {
                        path: i.path,
                        width: i.width,
                        height: i.height,
                        mime: i.mime,
                        type: i.mime,
                        name: `${i.modificationDate}_${index}`
                    }
                };
            })
            setListImage(old => [...old, ...listImages])

        }).catch(e => { });
    }


    const pickCamera = () => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            compressImageQuality: 0.5
        }).then(async (images) => {

            let listImages = [images].map((i, index) => {
                return {
                    type: 'local',
                    image: {
                        path: i.path,
                        width: i.width,
                        height: i.height,
                        mime: i.mime,
                        type: i.mime,
                        name: `${i.modificationDate}_${index}`
                    }
                };
            })

            setListImage(old => [...old, ...listImages])

        }).catch(e => { });
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <ActionSheet
                    ref={ActionSheetRef}
                    // title={'Which one do you like ?'}
                    options={["Mở Camera", "Chọn ảnh từ thư viện", "Huỷ"]}
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

                <StatusBarCustom barStyle={'dark-content'} bgColor={BASE_COLOR} />
                {/* <Header title={`Tạo nhật ký`} keyGoBack={props?.route?.params?.keyGoBack}
                    styleTit={{ color: WHITE }}
                    backStyle={`white`}
                    styleCus={{ backgroundColor: SECOND_COLOR }} /> */}


                <View style={{
                    width: "100%",
                    height: _heightScale(48),
                    backgroundColor: BASE_COLOR,
                    alignItems: "center",
                    zIndex: 1,
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    paddingHorizontal: _moderateScale(8 * 2)
                }}>
                    <View style={{ width: '10%' }}>
                        <TouchableOpacity
                            hitSlop={styleElement.hitslopSm}
                            style={{}}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <Image
                                style={[sizeIcon.lg]}
                                source={require('../../../Icon/back_left_white.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, }}>
                        <Text numberOfLines={1} style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: WHITE }}>
                        Tạo nhật ký
                        </Text>
                    </View>

                    <View style={{ width: '10%', alignItems: 'flex-end' }}>

                    </View>
                </View>

                <View style={[styles.main]}>
                    {/* <Text style={{marginVertical: _moderateScale(4),
                color: GREY,
                fontStyle: 'italic'
                }}>
                    Cập nhật cảm nghĩ ngày hôm nay của bạn nhé.</Text> */}

                    <ItemInput setContent={setContent} data={content} />

                    <Text style={{
                        fontSize: _moderateScale(14),
                        marginBottom: _moderateScale(12),
                        color: GREY_FOR_TITLE
                    }}>Hình ảnh</Text>

                    <View style={[styles.listImage]}>
                        {
                            listImage?.map((res, ind) => {
                                return <View style={[styles.itemImage]} key={ind}>
                                    <TouchableOpacity>
                                        <Image
                                            style={{
                                                width: _moderateScale(72),
                                                borderRadius: _moderateScale(4),
                                                height: _moderateScale(72)
                                            }}
                                            source={{ uri: `${_get(res, 'type', '') !== 'local' ? `${URL_ORIGINAL}/` : ''}${res?.image?.path}` }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        hitSlop={styleElement.hitslopSm}
                                        onPress={() => setListImage(listImage.filter((dt, i) => i !== ind))}
                                        style={{
                                            position: 'absolute',
                                            right: _moderateScale(-4),
                                            top: _moderateScale(-4),
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
                            })
                        }

                        <TouchableOpacity
                            onPress={() => {
                                ActionSheetRef.current.show()
                            }}
                            style={[styles.itemImagePlus]}>
                            <Image source={require('../../../Icon/plusGrey.png')}
                                style={{ width: _moderateScale(36), height: _moderateScale(36) }} />
                        </TouchableOpacity>


                    </View>
                    <TouchableOpacity
                        onPress={_createPartnerDiaryDaily}
                        style={{
                            marginTop: _moderateScale(24),
                            backgroundColor: SECOND_COLOR,
                            alignItems: 'center',
                            padding: _moderateScale(8),
                            borderRadius: _moderateScale(16),
                            minWidth: _moderateScale(240), alignSelf: 'center'
                        }}>
                        <Text style={{ color: WHITE }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    btnAdd: {
        position: 'absolute',
        right: _moderateScale(12),
        top: _moderateScale(12),
        backgroundColor: SECOND_COLOR,
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(16),
        borderRadius: _moderateScale(4),
        alignSelf: 'flex-end'
    },
    main: {
        flexDirection: 'column',
        padding: _moderateScale(16)
    },
    listImage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemImage: {
        marginRight: _moderateScale(8 * 1.5),
        marginBottom: _moderateScale(6),
        position: 'relative'
    },
    itemImagePlus: {
        borderWidth: _moderateScale(1),
        width: _moderateScale(72),
        height: _moderateScale(72),
        borderRadius: _moderateScale(4),
        borderColor: GREY,
        borderStyle: 'dotted',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CreatedDiaryForm;