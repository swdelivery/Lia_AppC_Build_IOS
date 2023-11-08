import React, { useRef, memo, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, processColor } from 'react-native';


import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREEN_SUCCESS, BASE_COLOR, GREY_FOR_TITLE } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import LinearGradient from 'react-native-linear-gradient';

import { getBottomSpace } from 'react-native-iphone-x-helper';

import { useFormik } from 'formik';
import * as yup from 'yup';
import TextErrorRed from '../../Components/TextError/TextErrorRed';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadModule } from '../../Redux/Action/BookingAction';
import ModalPickCategoryFood from './Components/ModalPickCategoryActivity';
import { URL_ORIGINAL } from '../../Constant/Url';
import {createActivity} from '../../Redux/Action/LoseWeightAction'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';


const index = memo((props) => {

    const [showModalPickCategoryFood, setShowModalPickCategoryFood] = useState({
        show: false,
        data: []
    })

    const _handlePickImage = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            mediaType: 'photo',
            maxFiles: 5,
            compressImageQuality: 0.5,
        }).then(async (images) => {

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
            let resultUploadImageMessage = await uploadModule({
                moduleName: 'activity',
                files: listImages
            })
            if (resultUploadImageMessage?.isAxiosError) return

            setFieldValue('representationFileIdArr', resultUploadImageMessage?.data?.data)
        }).catch(e => { });
    }


    const convertNumberInObject = (dataOrigin, keyConvertMustNumber) => {
       
        let keysDataOrigin = Object.keys(dataOrigin);
        function checkChildKey(data, key) {
            if (typeof data[key] === 'object') {
                let otherKeys = Object.keys(data[key]);
                otherKeys.forEach(otherKey => {
                    if (data[key]) {
                        checkChildKey(data[key], otherKey)
                    }
                });
            }
            if (typeof data[key] != 'object' && keyConvertMustNumber.includes(key)) {
                data[key] = Number(data[key] || 0);
            }
        }
        keysDataOrigin.forEach(key => {
            if (dataOrigin[key]) {
                // đệ quy tìm đến cấp con cuối cùng sau đó check nếu là thuộc keyConvertMustNumber thì ép sang number
                checkChildKey(dataOrigin, key)
            }
        })
        console.log({ dataOrigin })
        return dataOrigin
    }

    const _handleConfirmCreateActivity = async (dataForCreate) => {
        console.log({ dataForCreate });

        if (dataForCreate?.representationFileIdArr?.length > 0) {
            dataForCreate = {
                ...dataForCreate,
                representationFileIdArr: dataForCreate?.representationFileIdArr?.map(item => item?._id)
            }
        }
        if (dataForCreate?.codeGroup?.length > 0) {
            dataForCreate = {
                ...dataForCreate,
                codeGroup: dataForCreate?.codeGroup?.map(item => item?.code)
            }
        }

        let resultAfterConvertNum = convertNumberInObject(
            dataForCreate,
            [
                "calo","minutes"
            ]
        )

        console.log({resultAfterConvertNum});

        let result = await createActivity(resultAfterConvertNum)
        

    }
    const parseNumberSetFieldValue = (id, value) => {
        let parsed = value
        setFieldValue(id, parsed)
    }
    const parseStringSetFieldValue = (id, value) => {
        let parsed = value.toString()
        setFieldValue(id, parsed)
    }
    const createFoodSchema = yup.object().shape({
        name: yup.string().required('Không được để trống'),
        codeGroup: yup.array().min(1, "Hãy chọn danh mục cho sản phẩm"),
        representationFileIdArr: yup.array(),
        minutes: yup.number().required('Không được để trống').typeError('Phải là số'),
        calo: yup.number().required('Không được để trống').typeError('Phải là số'),
        description: yup.string(),
    });
    const { handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldTouched, isValid, setFieldValue } = useFormik({
        validationSchema: createFoodSchema,
        initialValues: {
            name: '',
            codeGroup: [],
            representationFileIdArr: [],
            minutes: '',
            calo: '',
            description: ''
        },
        onSubmit: values => _handleConfirmCreateActivity(values)
    });


    const _confirmPickCategory = async (data) => {
        console.log({ data });
        setShowModalPickCategoryFood(old => {
            return {
                show: false,
                data: data
            }
        })

        setFieldValue('codeGroup', data)

    }

    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <ModalPickCategoryFood
                hide={() => {
                    setShowModalPickCategoryFood(old => {
                        return {
                            ...old, 
                            show: false,
                        }
                    })
                }}
                dataActive={showModalPickCategoryFood?.data}
                confirm={_confirmPickCategory}
                show={showModalPickCategoryFood?.show} />

            <Header title={"Thêm hoạt động"} />
            <ScrollView scrollIndicatorInsets={{right:1}}>



                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8 }]}>
                        Danh mục
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModalPickCategoryFood(old => {
                                return {
                                    ...old,
                                    show: true,
                                }
                            })
                        }}
                        hitSlop={styleElement.hitslopSm}
                        style={{
                            marginLeft: _moderateScale(8),
                            top: _moderateScale(2)
                        }}>
                        <Image style={[sizeIcon.sm]} source={require('../../Icon/whitePlus2.png')} />
                    </TouchableOpacity>
                </View>

                {
                    errors?.codeGroup ?
                        <View style={{ paddingLeft: _moderateScale(8 * 2) }}>
                            <TextErrorRed
                                isShowError={(errors?.codeGroup) && (touched?.codeGroup)}
                                dataError={errors?.codeGroup}
                            />
                        </View>
                        : <></>
                }

                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: 'row', paddingLeft: 16, marginTop: _moderateScale(8) }}>
                        {
                            showModalPickCategoryFood?.data?.map((item, index) => {
                                return (
                                    <View key={index} style={{
                                        paddingHorizontal: _moderateScale(8 * 2),
                                        marginRight: _moderateScale(8),
                                        paddingVertical: _moderateScale(4),
                                        backgroundColor: BLUE_FB,
                                        // marginBottom: _moderateScale(8),
                                        borderRadius: _moderateScale(8),
                                        // marginVertical:_moderateScale(8)
                                    }}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: 12, color: "white", bottom: _moderateScale(1) }]}>
                                            {item?.name}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>

                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8, flex: 1 }]}>
                            Thông tin hoạt động
                        </Text>
                        <View style={{ marginTop: _moderateScale(8 * 2), marginRight: _moderateScale(8) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                Tên {
                                    <Text style={{ color: RED }}>*</Text>
                                }
                            </Text>
                            <TextInput
                                onFocus={() => setFieldTouched('name')}
                                onChangeText={value => parseNumberSetFieldValue('name', value)}
                                style={[stylesFont.fontNolan, styles.input]}
                                placeholder={"vd: Chạy bộ"} />
                            <TextErrorRed
                                isShowError={(errors?.name) && (touched?.name)}
                                dataError={errors?.name}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        {
                            // props?.dataCreateFood?.representationFileIdArr?.length > 0 ?
                            values?.representationFileIdArr?.length > 0 ?
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={{
                                        width: _moderateScale(8 * 11),
                                        flex: 1,
                                        borderColor: GREY,
                                        borderRadius: _moderateScale(8),
                                    }}>
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: '100%',
                                            borderRadius: _moderateScale(8),
                                        }}
                                        source={{ uri: `${URL_ORIGINAL}${values?.representationFileIdArr[0]?.link}` }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={_handlePickImage}
                                    style={styles.btnAddImage}>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY }]}>
                                        Thêm ảnh {
                                            <Text style={{ color: RED }}>*</Text>
                                        }
                                    </Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>

                <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                    <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                            Thời gian (phút) {
                                <Text style={{ color: RED }}>*</Text>
                            }
                        </Text>
                        <TextInput
                            keyboardType={'numbers-and-punctuation'}
                            onFocus={() => setFieldTouched('minutes')}
                            onChangeText={value => parseNumberSetFieldValue('minutes', value)}
                            style={[stylesFont.fontNolan, styles.input]}
                            placeholder={"vd: 30"} />
                        <TextErrorRed
                            isShowError={(errors?.minutes) && (touched?.minutes)}
                            dataError={errors?.minutes}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                            Năng lượng đốt (kcal) {
                                <Text style={{ color: RED }}>*</Text>
                            }
                        </Text>
                        <TextInput
                            keyboardType={'numbers-and-punctuation'}
                            onFocus={() => setFieldTouched('calo')}
                            onChangeText={value => parseNumberSetFieldValue('calo', value)}
                            style={[stylesFont.fontNolan, styles.input]}
                            placeholder={"vd: 100"} />
                        <TextErrorRed
                            isShowError={(errors?.calo) && (touched?.calo)}
                            dataError={errors?.calo}
                        />
                    </View>
                </View>

                <View style={[{ marginTop: _moderateScale(8 * 2), marginHorizontal: _moderateScale(8 * 2) }]}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), flex: 1, color: GREY_FOR_TITLE }]}>
                        Ghi chú
                        </Text>

                    <View style={{
                        minHeight: _moderateScale(8 * 10),
                        backgroundColor: BG_GREY_OPACITY_2,
                        marginTop: _moderateScale(4),
                        borderRadius: _moderateScale(8),
                        padding: _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 1.5),
                    }}>
                        <TextInput
                            onChangeText={value => parseNumberSetFieldValue('description', value)}
                            placeholder={'vd: Chạy vòng quanh công viên'}
                            multiline
                            style={{
                                flex: 1,
                                fontSize: _moderateScale(14)
                            }} />
                    </View>

                </View>


                <View style={{ height: 50 }} />
            </ScrollView>
            <TouchableOpacity
                onPress={handleSubmit}
                style={{
                    height: _moderateScale(8 * 4),
                    backgroundColor: WHITE,
                    // width: _moderateScale(8 * 12),
                    marginHorizontal: _moderateScale(8 * 2),
                    borderRadius: _moderateScale(8),
                    overflow: 'hidden',
                    marginVertical: _moderateScale(8),
                    marginBottom: getBottomSpace() + _moderateScale(8)
                }}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={gradient.color}
                    style={gradient.container}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: WHITE }]}>
                        Thêm
                            </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,

    elevation: 5
}



const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        'rgba(104, 47, 144,.7)',
        BASE_COLOR,
    ]
}

const styles = StyleSheet.create({
    btnAddImage: {
        width: _moderateScale(8 * 11),
        flex: 1,
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: GREY,
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_2,
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        fontSize: _moderateScale(14)
    },
    banner: {
        width: "100%",
        height: _moderateScale(8 * 20),
        borderRadius: _moderateScale(8),
        overflow: 'hidden',
        backgroundColor: BG_GREY_OPACITY_2
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


export default index;