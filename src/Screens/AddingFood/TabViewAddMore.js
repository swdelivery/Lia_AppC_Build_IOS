import React, { useRef, memo, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREY_FOR_TITLE } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import TextErrorRed from '../../Components/TextError/TextErrorRed';

const TabViewAddMore = memo((props) => {

    const [currTabView, setCurrTabView] = useState('1')

    return (
        <View>
            <View style={[styleElement.rowAliCenter, styles.tabview]}>
                <TouchableOpacity
                    onPress={() => setCurrTabView('1')}
                    style={[styles.tabview__btn, currTabView == '1' && { backgroundColor: WHITE }]}>
                    <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '1' && [{ color: GREY_FOR_TITLE }, stylesFont.fontNolanBold]]}>Khác</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setCurrTabView('2')}
                    style={[styles.tabview__btn, currTabView == '2' && { backgroundColor: WHITE }]}>
                    <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '2' && [{ color: GREY_FOR_TITLE }, stylesFont.fontNolanBold]]}>Vitamin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setCurrTabView('3')}
                    style={[styles.tabview__btn, currTabView == '3' && { backgroundColor: WHITE }]}>
                    <Text style={[stylesFont.fontNolan, styles.tabview__text, currTabView == '3' && [{ color: GREY_FOR_TITLE }, stylesFont.fontNolanBold]]}>Khoáng chất</Text>
                </TouchableOpacity>
            </View>

            {
                currTabView == '1' ?
                    <>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Cholesterol (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('other.cholesterol')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('other.cholesterol', value)}
                                    value={props?.values?.other?.cholesterol ? `${props?.values?.other?.cholesterol}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.other?.cholesterol) && (props?.touched?.other?.cholesterol)}
                                    dataError={props?.errors?.other?.cholesterol}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Nước (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('other.water')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('other.water', value)}
                                    value={props?.values?.other?.water ? `${props?.values?.other?.water}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.other?.water) && (props?.touched?.other?.water)}
                                    dataError={props?.errors?.other?.water}
                                />
                            </View>
                        </View>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Sodium (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('other.sodium')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('other.sodium', value)}
                                    value={props?.values?.other?.sodium ? `${props?.values?.other?.sodium}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.other?.sodium) && (props?.touched?.other?.sodium)}
                                    dataError={props?.errors?.other?.sodium}
                                />
                            </View>
                            <View style={{ flex: 1 }}>

                            </View>
                        </View>
                    </>
                    : <></>
            }
            {
                currTabView == '2' ?
                    <>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Vitamin A (mcg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('vitamin.a')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('vitamin.a', value)}
                                    value={props?.values?.vitamin?.a ? `${props?.values?.vitamin?.a}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.vitamin?.a) && (props?.touched?.vitamin?.a)}
                                    dataError={props?.errors?.vitamin?.a}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Vitamin B1 (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('vitamin.b1')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('vitamin.b1', value)}
                                    value={props?.values?.vitamin?.b1 ? `${props?.values?.vitamin?.b1}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.vitamin?.b1) && (props?.touched?.vitamin?.b1)}
                                    dataError={props?.errors?.vitamin?.b1}
                                />
                            </View>
                        </View>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Vitamin B11 (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('vitamin.b11')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('vitamin.b11', value)}
                                    value={props?.values?.vitamin?.b11 ? `${props?.values?.vitamin?.b11}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.vitamin?.b11) && (props?.touched?.vitamin?.b11)}
                                    dataError={props?.errors?.vitamin?.b11}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Vitamin B12 (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('vitamin.b12')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('vitamin.b12', value)}
                                    value={props?.values?.vitamin?.b12 ? `${props?.values?.vitamin?.b12}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.vitamin?.b12) && (props?.touched?.vitamin?.b12)}
                                    dataError={props?.errors?.vitamin?.b12}
                                />
                            </View>
                        </View>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Vitamin B2 (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('vitamin.b2')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('vitamin.b2', value)}
                                    value={props?.values?.vitamin?.b2 ? `${props?.values?.vitamin?.b2}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.vitamin?.b2) && (props?.touched?.vitamin?.b2)}
                                    dataError={props?.errors?.vitamin?.b2}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Vitamin B23 (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('vitamin.b23')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('vitamin.b23', value)}
                                    value={props?.values?.vitamin?.b23 ? `${props?.values?.vitamin?.b23}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.vitamin?.b23) && (props?.touched?.vitamin?.b23)}
                                    dataError={props?.errors?.vitamin?.b23}
                                />
                            </View>
                        </View>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Vitamin B5 (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('vitamin.b5')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('vitamin.b5', value)}
                                    value={props?.values?.vitamin?.b5 ? `${props?.values?.vitamin?.b5}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.vitamin?.b5) && (props?.touched?.vitamin?.b5)}
                                    dataError={props?.errors?.vitamin?.b5}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Vitamin B6 (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('vitamin.b6')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('vitamin.b6', value)}
                                    value={props?.values?.vitamin?.b6 ? `${props?.values?.vitamin?.b6}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.vitamin?.b6) && (props?.touched?.vitamin?.b6)}
                                    dataError={props?.errors?.vitamin?.b6}
                                />
                            </View>
                        </View>

                    </>
                    : <></>
            }
            {
                currTabView == '3' ?
                    <>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Canxi (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('mineral.canxi')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('mineral.canxi', value)}
                                    value={props?.values?.mineral?.canxi ? `${props?.values?.mineral?.canxi}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.mineral?.canxi) && (props?.touched?.mineral?.canxi)}
                                    dataError={props?.errors?.mineral?.canxi}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Đồng (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('mineral.copper')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('mineral.copper', value)}
                                    value={props?.values?.mineral?.copper ? `${props?.values?.mineral?.copper}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.mineral?.copper) && (props?.touched?.mineral?.copper)}
                                    dataError={props?.errors?.mineral?.copper}
                                />
                            </View>
                        </View>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Phospho (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('mineral.phospho')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('mineral.phospho', value)}
                                    value={props?.values?.mineral?.phospho ? `${props?.values?.mineral?.phospho}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.mineral?.phospho) && (props?.touched?.mineral?.phospho)}
                                    dataError={props?.errors?.mineral?.phospho}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Sắt (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('mineral.iron')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('mineral.iron', value)}
                                    value={props?.values?.mineral?.iron ? `${props?.values?.mineral?.iron}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.mineral?.iron) && (props?.touched?.mineral?.iron)}
                                    dataError={props?.errors?.mineral?.iron}
                                />
                            </View>
                        </View>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Natri (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('mineral.natri')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('mineral.natri', value)}
                                    value={props?.values?.mineral?.natri ? `${props?.values?.mineral?.natri}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.mineral?.natri) && (props?.touched?.mineral?.natri)}
                                    dataError={props?.errors?.mineral?.natri}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Kali (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('mineral.kali')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('mineral.kali', value)}
                                    value={props?.values?.mineral?.kali ? `${props?.values?.mineral?.kali}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.mineral?.kali) && (props?.touched?.mineral?.kali)}
                                    dataError={props?.errors?.mineral?.kali}
                                />
                            </View>
                        </View>
                        <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ flex: 1, marginRight: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Kẽm (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('mineral.zinc')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('mineral.zinc', value)}
                                    value={props?.values?.mineral?.zinc ? `${props?.values?.mineral?.zinc}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.mineral?.zinc) && (props?.touched?.mineral?.zinc)}
                                    dataError={props?.errors?.mineral?.zinc}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE, marginBottom: _moderateScale(4) }]}>
                                    Magie (mg)
                                </Text>
                                <TextInput
                                    keyboardType={'numbers-and-punctuation'}
                                    onFocus={() => props?.setFieldTouched('mineral.magie')}
                                    onChangeText={value => props?.parseNumberSetFieldValue('mineral.magie', value)}
                                    value={props?.values?.mineral?.magie ? `${props?.values?.mineral?.magie}` : ''}
                                    style={[stylesFont.fontNolan, styles.input]} placeholder={"vd: 100"} />
                                <TextErrorRed
                                    isShowError={(props?.errors?.mineral?.magie) && (props?.touched?.mineral?.magie)}
                                    dataError={props?.errors?.mineral?.magie}
                                />
                            </View>
                        </View>

                    </>
                    : <></>
            }

        </View>
    );
});


const styles = StyleSheet.create({
    input: {
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_2,
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        fontSize: _moderateScale(14)
    },
    tabview__text: {
        fontSize: _moderateScale(13),
        color: GREY
    },
    tabview__btn: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(4)
    },
    tabview: {
        backgroundColor: BG_GREY_OPACITY_2,
        marginHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(4),
        padding: _moderateScale(8),
        justifyContent: 'space-between',
        marginTop: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


export default TabViewAddMore;