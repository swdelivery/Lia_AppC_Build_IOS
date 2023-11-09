import _isEmpty from 'lodash/isEmpty';
import React, { memo } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Color from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';


const InputDoctor = memo((props) => {
    return (
        <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 0) }}>


            {/* <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                Bác sĩ 
                {
                    <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                }
            </Text> */}

            {
                props?.currDoctor?._id ?
                    <TouchableOpacity
                        onPress={props?.handleOpenListDoctor}
                        style={styles.btnPickBranch}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={[sizeIcon.sm]} source={require('../../../NewIcon/doctorBlack.png')} />
                            {
                                <Text style={{ color: 'transparent', fontSize: _moderateScale(16), marginLeft: _moderateScale(4) }}>*</Text>
                            }
                        </View>
                        <Text style={[styles.btnPickBranch__text, { color: Color.BLACK }]}>
                            {
                                props?.currDoctor?.name
                            }
                        </Text>
                        <Image style={sizeIcon.xxxs} source={require('../../../NewIcon/downGrey.png')} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={props?.handleOpenListDoctor}
                        style={styles.btnPickBranch}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={[sizeIcon.sm]} source={require('../../../NewIcon/doctorBlack.png')} />
                            {
                                <Text style={{ color: 'transparent', fontSize: _moderateScale(16), marginLeft: _moderateScale(4) }}>*</Text>
                            }
                        </View>
                        <Text style={styles.btnPickBranch__text}>
                            Chọn Bác sĩ
                        </Text>
                        <Image style={sizeIcon.xxxs} source={require('../../../NewIcon/downGrey.png')} />
                    </TouchableOpacity>
            }



            {/* {
                true ?
                    <>
                        <View style={{ height: _moderateScale(8 * 2) }} />
                        <View style={[styleElement.rowAliCenter, {
                            marginHorizontal: _moderateScale(8 * 1),
                            marginBottom: _moderateScale(4),
                            flexDirection: 'row', flex: 1
                        }]}>
                            <View style={{ width: _moderateScale(8 * 3) }}>
                                <Image
                                    style={[sizeIcon.sm, styles.iCon]}
                                    source={require('../../../NewIcon/building.png')}
                                />
                            </View>
                            <Text style={[stylesFont.fontNolan500,
                            { opacity: 1, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8, paddingLeft: _moderateScale(4) }]}>
                                {
                                    `${branchMain?.name} `
                                }
                            </Text>
                        </View>
                        <View style={[styleElement.rowAliCenter, {
                            marginHorizontal: _moderateScale(8 * 1),
                            marginBottom: _moderateScale(4),
                            flexDirection: 'row', flex: 1
                        }]}>
                            <View style={{ width: _moderateScale(8 * 3) }}>
                                <Image
                                    style={[sizeIcon.xxs, styles.iCon]}
                                    source={require('../../../Icon/a_call.png')}
                                />
                            </View>
                            <Text style={[stylesFont.fontNolan500,
                            { opacity: 1, fontSize: _moderateScale(14), fontStyle: 'italic', color: Color.BLACK_OPACITY_8, paddingLeft: _moderateScale(4) }]}>
                                {
                                    `${branchMain?.phone} `
                                }
                            </Text>
                        </View>
                        <View style={[styleElement.rowAliCenter, {
                            marginHorizontal: _moderateScale(8 * 1),
                            flexDirection: 'row', flex: 1
                        }]}>
                            <View style={{ width: _moderateScale(8 * 3) }}>
                                <Image
                                    style={[sizeIcon.xs, styles.iCon]}
                                    source={require('../../../Icon/a_address.png')}
                                />
                            </View>
                            <Text style={[stylesFont.fontNolan500,
                            { opacity: 1, flex: 1, fontSize: _moderateScale(14), fontStyle: 'italic', color: Color.GREY_FOR_TITLE, paddingLeft: _moderateScale(4) }]}>
                                {
                                    `${branchMain?.address}`
                                }
                            </Text>
                        </View>
                    </> : <></>
            } */}

        </View>
    );
});


const styles = StyleSheet.create({
    btnPickBranch__text: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: Color.GREY,
        marginLeft: _moderateScale(8 * 1),
        flex: 1
    },
    btnPickBranch: {
        height: _moderateScale(8 * 5),
        marginTop: _moderateScale(8),
        backgroundColor: Color.BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(8),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    }


})

export default InputDoctor;