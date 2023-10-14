import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _width } from '../../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, GREY_FOR_TITLE } from '../../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import InputSearch from '../../LoseWeight/Components/InputSearch';
import _isEmpty from 'lodash/isEmpty'
import { navigation } from '../../../../rootNavigation';
import { getAssetGroup } from '../../../Redux/Action/LoseWeightAction'
import slugify from 'slugify';
import { getListBranchV2 } from '../../../Redux/Action/BranchAction';
import { getAllDoctorv2 } from '../../../Redux/Action/DoctorAction';
import ScreenKey from '../../../Navigation/ScreenKey';

const ModalPickDoctor = memo((props) => {

    const [listDoctor, setListDoctor] = useState([])

    useEffect(() => {
        _getListBranch()
    }, [])

    const _getListBranch = async () => {
        let result = await getAllDoctorv2({
            condition: {

            },
            sort: {
                orderNumber: -1
            },
        });
        if (result?.isAxiosError) return
        setListDoctor(result?.data?.data)
    }

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'flex-end',
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'position' : null}
                enabled
            >
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: _moderateScale(8 * 2), paddingTop: _moderateScale(8 * 2) }}>
                        <View style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100, opacity: 0 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                            Chọn Bác sĩ khám
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                            }}
                            style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                        <View style={{ height: _moderateScale(8 * 2) }} />
                        {
                            listDoctor?.filter(item => item?.branchCode == props?.currBranch?.code)?.length > 0 ?
                                <>
                                    {
                                        listDoctor?.filter(item => item?.branchCode == props?.currBranch?.code)?.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => props?.confirmChoice(item)}
                                                    style={styles.btnBranch}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ width: _moderateScale(8 * 3) }}>
                                                            <Image
                                                                style={[sizeIcon.xs]}
                                                                source={require('../../../NewIcon/doctorBlack.png')}
                                                            />
                                                        </View>
                                                        <Text style={[styles.btnBranch__nameBranch, { fontSize: _moderateScale(15) }]}>
                                                            {item?.name}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: _moderateScale(4) }}>
                                                        <View style={{ width: _moderateScale(8 * 3) }}>
                                                            <Image
                                                                style={[sizeIcon.xs]}
                                                                source={require('../../../Icon/a_address.png')}
                                                            />
                                                        </View>
                                                        <Text style={[styles.btnBranch__nameBranch, { color: BLACK_OPACITY_8 }]}>
                                                            {item?.branch?.name}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: _moderateScale(8) }}
                                                        onPress={() => {
                                                            props?.hide()
                                                            navigation.navigate(ScreenKey.DETAIL_DOCTOR, { idDoctor: item?._id })
                                                        }}>
                                                        <Text style={{ ...stylesFont.fontNolan500, color: BLUE_FB, fontSize: _moderateScale(13) }}>
                                                            Xem chi tiết
                                                        </Text>
                                                        <Image style={[sizeIcon.xxs, { marginLeft: _moderateScale(2) }]} source={require('../../../Icon/doubleRight_blue.png')} />
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </>
                                :
                                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:_moderateScale(8*10)}}>
                                    <Text style={{...stylesFont.fontNolan500,fontSize:_moderateScale(14),color:GREY}}>
                                        Hiện chưa có dữ liệu
                                    </Text>
                                </View>
                        }

                    </ScrollView>

                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
});


const styles = StyleSheet.create({
    btnBranch__nameBranch: {
        flex: 1,
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    btnBranch: {
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(8),
        marginBottom: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    backAndTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingTop: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: BLUE_FB,
        paddingVertical: _moderateScale(6),
        marginTop: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: _width,
        height: _moderateScale(8 * 80),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 3)
    }
})

export default ModalPickDoctor;