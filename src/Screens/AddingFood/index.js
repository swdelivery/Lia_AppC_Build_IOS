import React, { useRef, memo, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import InputSearch from './Components/InputSearch';
import AddInfoFood from './AddInfoFood';
import TabViewAddMore from './TabViewAddMore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalPickCategoryFood from './Components/ModalPickCategoryFood';
import LinearGradient from 'react-native-linear-gradient';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { useFormik } from 'formik';
import * as yup from 'yup';
import TextErrorRed from '../../Components/TextError/TextErrorRed';
import { createFood } from '../../Redux/Action/LoseWeightAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';

const index = memo((props) => {

    const [showModalPickCategoryFood, setShowModalPickCategoryFood] = useState({
        show: false,
        data: []
    })

    const [dataCreateFood, setDataCreateFood] = useState({
        name: '',
        codeGroup: [],
        representationFileIdArr: [],
        size: '',
        unit: '',
        calo: '',
        main: {
            protein: '',
            carbohyrate: '',
            fat: ''
        },
        vitamin: {
            a: '',
            b1: '',
            b11: '',
            b12: '',
            b2: '',
            b23: '',
            b5: '',
            b6: ''
        },
        mineral: {
            canxi: '',
            copper: '',
            phospho: '',
            iron: '',
            natri: '',
            kali: '',
            zinc: '',
            magie: ''
        },
        other: {
            cholesterol: '',
            water: '',
            sodium: ''
        }
    })


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

    const removeEmptyKeys = (yourObject) => {
        Object.keys(yourObject).forEach(key => {
            if (
                Object.prototype.toString.call(yourObject[key]) === '[object Date]' &&
                (yourObject[key].toString().length === 0 ||
                    yourObject[key].toString() === 'Invalid Date')
            ) {
                delete yourObject[key];
            } else if (yourObject[key] && typeof yourObject[key] === 'object') {
                removeEmptyKeys(yourObject[key]);
            } else if (yourObject[key] == null || yourObject[key] === '') {
                delete yourObject[key];
            }

            if (
                yourObject[key] &&
                typeof yourObject[key] === 'object' &&
                Object.keys(yourObject[key]).length === 0 &&
                Object.prototype.toString.call(yourObject[key]) !== '[object Date]'
            ) {
                delete yourObject[key];
            }
        });
        return yourObject;
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

    const _handleConfirmCreateFood = async (dataCreateFood) => {

        console.log({ dataCreateFood });

        let dataCreateFoodAfter = removeEmptyKeys({ ...dataCreateFood })

        if (dataCreateFoodAfter?.representationFileIdArr?.length > 0) {
            dataCreateFoodAfter = {
                ...dataCreateFoodAfter,
                representationFileIdArr: dataCreateFoodAfter?.representationFileIdArr?.map(item => item?._id)
            }
        }
        if (dataCreateFoodAfter?.codeGroup?.length > 0) {
            dataCreateFoodAfter = {
                ...dataCreateFoodAfter,
                codeGroup: dataCreateFoodAfter?.codeGroup?.map(item => item?.code)
            }
        }


        console.log({ dataCreateFoodAfter });

        let resultAfterConvertNum = convertNumberInObject(
            dataCreateFoodAfter,
            [
                "size", "calo", "protein", "carbohyrate", "fat", "a", "b1", "b11", "b12", "b2", "b23", "b5", "b6", "canxi", "copper", "phospho", "iron", "natri", "kali", "zinc", "magie", "cholesterol", "water", "sodium"
            ]
        )

        console.log({ resultAfterConvertNum });

        let resultCreateFood = await createFood(resultAfterConvertNum);



    }

    const parseNumberSetFieldValue = (id, value) => {
        let parsed = value
        // if (value?.length > 0) {
        //     parsed = parseFloat(value)
        // } else {
        //     parsed = value
        // }
        setFieldValue(id, parsed)
    }
    const parseStringSetFieldValue = (id, value) => {
        let parsed = value.toString()
        setFieldValue(id, parsed)
    }


    const createFoodSchema = yup.object().shape({
        name: yup.string().required('Không đươc để trống'),
        representationFileIdArr: yup.array(),
        codeGroup: yup.array().min(1, "Hãy chọn danh mục cho sản phẩm"),
        size: yup.number().required('Không đươc để trống').typeError('Phải là số'),
        unit: yup.string().required('Không đươc để trống'),
        calo: yup.number().required('Không đươc để trống').typeError('Phải là số'),
        main: yup.object().shape({
            protein: yup.number().typeError('Phải là số'),
            carbohyrate: yup.number().typeError('Phải là số'),
            fat: yup.number().typeError('Phải là số')
        }),
        other: yup.object().shape({
            cholesterol: yup.number().typeError('Phải là số'),
            water: yup.number().typeError('Phải là số'),
            sodium: yup.number().typeError('Phải là số')
        }),
        vitamin: yup.object().shape({
            a: yup.number().typeError('Phải là số'),
            b1: yup.number().typeError('Phải là số'),
            b11: yup.number().typeError('Phải là số'),
            b12: yup.number().typeError('Phải là số'),
            b2: yup.number().typeError('Phải là số'),
            b23: yup.number().typeError('Phải là số'),
            b5: yup.number().typeError('Phải là số'),
            b6: yup.number().typeError('Phải là số')
        }),
        mineral: yup.object().shape({
            canxi: yup.number().typeError('Phải là số'),
            copper: yup.number().typeError('Phải là số'),
            phospho: yup.number().typeError('Phải là số'),
            iron: yup.number().typeError('Phải là số'),
            natri: yup.number().typeError('Phải là số'),
            kali: yup.number().typeError('Phải là số'),
            zinc: yup.number().typeError('Phải là số'),
            magie: yup.number().typeError('Phải là số')
        })

    });
    const { handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldTouched, isValid, setFieldValue } = useFormik({
        validationSchema: createFoodSchema,
        initialValues: {
            name: '',
            codeGroup: [],
            representationFileIdArr: [],
            size: '',
            unit: '',
            calo: '',
            main: {
                protein: '',
                carbohyrate: '',
                fat: ''
            },
            other: {
                cholesterol: '',
                water: '',
                sodium: ''
            },
            vitamin: {
                a: '',
                b1: '',
                b11: '',
                b12: '',
                b2: '',
                b23: '',
                b5: '',
                b6: ''
            },
            mineral: {
                canxi: '',
                copper: '',
                phospho: '',
                iron: '',
                natri: '',
                kali: '',
                zinc: '',
                magie: ''
            }
        },
        onSubmit: values => _handleConfirmCreateFood(values)
        // alert(`Email: ${values.email}, Password: ${values.password}`)
    });

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

            <Header title={"Thêm thực phẩm"} />
            <KeyboardAwareScrollView>

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



                <AddInfoFood
                    values={values}
                    parseStringSetFieldValue={parseStringSetFieldValue}
                    parseNumberSetFieldValue={parseNumberSetFieldValue}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    isSubmitting={isSubmitting}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    dataCreateFood={dataCreateFood}
                    setDataCreateFood={setDataCreateFood} />
                <View style={{ height: _moderateScale(8 * 2) }} />

                <TabViewAddMore
                    values={values}
                    parseStringSetFieldValue={parseStringSetFieldValue}
                    parseNumberSetFieldValue={parseNumberSetFieldValue}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    isSubmitting={isSubmitting}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    dataCreateFood={dataCreateFood}
                    setDataCreateFood={setDataCreateFood} />



                <View style={{ height: 50 }} />
            </KeyboardAwareScrollView>

            <TouchableOpacity
                onPress={handleSubmit}
                style={[{
                    height: _moderateScale(8 * 4),
                    backgroundColor: WHITE,
                    // width: _moderateScale(8 * 12),
                    marginHorizontal: _moderateScale(8 * 2),
                    borderRadius: _moderateScale(8),
                    overflow: 'hidden',
                    marginVertical: _moderateScale(8),
                    marginBottom: getBottomSpace() + _moderateScale(8)
                }]}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={gradient.color}
                    style={gradient.container}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: WHITE }]}>
                        Xác nhận
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
});


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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


export default index;