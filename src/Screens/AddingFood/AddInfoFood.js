import React, { useRef, memo, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, TITLE_GREY, GREY_FOR_TITLE } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import ImagePicker from 'react-native-image-crop-picker';
import { uploadModule } from '../../Redux/Action/BookingAction';
import { URL_ORIGINAL } from '../../Constant/Url';
import TextErrorRed from '../../Components/TextError/TextErrorRed';

const AddInfoFood = memo((props) => {

    const [currImageFood, setCurrImageFood] = useState({})

    const _handlePickImage = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            mediaType: 'photo',
            maxFiles: 5,
            // cropping:true,
            compressImageQuality: 0.5,
            // compressVideoPreset:'LowQuality' 
        }).then(async (images) => {

            // setListImageBanking(old => [...old, ...images])


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
                moduleName: 'food',
                files: listImages
            })

            if (resultUploadImageMessage?.isAxiosError) return
            console.log({ resultUploadImageMessage });
            // props?.setDataCreateFood(old => {
            //     return {
            //         ...old,
            //         representationFileIdArr: resultUploadImageMessage?.data?.data
            //     }
            // })
            props?.setFieldValue('representationFileIdArr', resultUploadImageMessage?.data?.data)



            // let listIdImageHasUpload = resultUploadImageMessage.data.map(item => item._id);
        }).catch(e => { });
    }

    return (
        <>
            <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }]}>
                <View style={{ flex: 1 }}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8, flex: 1 }]}>
                        Thông tin thưc phẩm
                    </Text>
                    <View style={{ marginTop: _moderateScale(8 * 2), marginRight: _moderateScale(8) }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                            Tên {
                                <Text style={{ color: RED }}>*</Text>
                            }
                        </Text>
                        <TextInput
                            onFocus={() => props?.setFieldTouched('name')}
                            onChangeText={value => props?.parseStringSetFieldValue('name', value)}
                            style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: Sữa đậu nành"} />
                        <TextErrorRed
                            isShowError={(props?.errors?.name) && (props?.touched?.name)}
                            dataError={props?.errors?.name}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>

                    {
                        // props?.dataCreateFood?.representationFileIdArr?.length > 0 ?
                        props?.values?.representationFileIdArr?.length > 0 ?
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
                                    source={{ uri: `${URL_ORIGINAL}${props?.values?.representationFileIdArr[0]?.link}` }} />
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
                        Size {
                            <Text style={{ color: RED }}>*</Text>
                        }
                    </Text>
                    <TextInput
                        keyboardType={'numbers-and-punctuation'}
                        onFocus={() => props?.setFieldTouched('size')}
                        onChangeText={value => props?.parseNumberSetFieldValue('size', value)}
                        style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                    <TextErrorRed
                        isShowError={(props?.errors?.size) && (props?.touched?.size)}
                        dataError={props?.errors?.size}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                        Unit {
                            <Text style={{ color: RED }}>*</Text>
                        }
                    </Text>
                    <TextInput
                        keyboardType={'name-phone-pad'}
                        onFocus={() => props?.setFieldTouched('unit')}
                        onChangeText={value => props?.parseStringSetFieldValue('unit', value)}
                        style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: gr, ml"} />
                    <TextErrorRed
                        isShowError={(props?.errors?.unit) && (props?.touched?.unit)}
                        dataError={props?.errors?.unit}
                    />
                </View>
            </View>

            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2), marginHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                    Năng lượng (kcal) {
                        <Text style={{ color: RED }}>*</Text>
                    }
                </Text>
                <TextInput
                    keyboardType={'numbers-and-punctuation'}
                    onFocus={() => props?.setFieldTouched('calo')}
                    onChangeText={value => props?.parseNumberSetFieldValue('calo', value)}
                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 1200"} />
                <TextErrorRed
                    isShowError={(props?.errors?.calo) && (props?.touched?.calo)}
                    dataError={props?.errors?.calo}
                />
            </View>


            <View style={[{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }]}>
                <View style={{ flex: 1 }}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_8, flex: 1 }]}>
                        Thành phần chính
                    </Text>

                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                        <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                Chất đạm (Protein - g) {
                                    <Text style={{ color: RED }}>*</Text>
                                }
                            </Text>
                            <TextInput
                                keyboardType={'numbers-and-punctuation'}
                                onFocus={() => props?.setFieldTouched('main.protein')}
                                onChangeText={value => props?.parseNumberSetFieldValue('main.protein', value)}
                                style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                            <TextErrorRed
                                isShowError={(props?.errors?.main?.protein) && (props?.touched?.main?.protein)}
                                dataError={props?.errors?.main?.protein}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                Carbohyrate (g) {
                                    <Text style={{ color: RED }}>*</Text>
                                }
                            </Text>
                            <TextInput
                                keyboardType={'numbers-and-punctuation'}
                                onFocus={() => props?.setFieldTouched('main.carbohyrate')}
                                onChangeText={value => props?.parseNumberSetFieldValue('main.carbohyrate', value)}
                                style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                            <TextErrorRed
                                isShowError={(props?.errors?.main?.carbohyrate) && (props?.touched?.main?.carbohyrate)}
                                dataError={props?.errors?.main?.carbohyrate}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, marginTop: _moderateScale(8 * 2) }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                            Chất béo (Fat - g) {
                                <Text style={{ color: RED }}>*</Text>
                            }
                        </Text>
                        <TextInput
                            keyboardType={'numbers-and-punctuation'}
                            onFocus={() => props?.setFieldTouched('main.fat')}
                            onChangeText={value => props?.parseNumberSetFieldValue('main.fat', value)}
                            style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                        <TextErrorRed
                            isShowError={(props?.errors?.main?.fat) && (props?.touched?.main?.fat)}
                            dataError={props?.errors?.main?.fat}
                        />
                    </View>
                </View>
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    textError: {
        ...stylesFont.fontNolan500,
        color: RED,
        fontStyle: 'italic',
        fontSize: _moderateScale(12),
        marginTop: _moderateScale(4)
    },
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
    }
})

export default AddInfoFood;