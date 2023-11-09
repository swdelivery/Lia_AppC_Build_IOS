import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { _moderateScale } from '../../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, GREY_FOR_TITLE, SECOND_COLOR, BG_GREY_OPACITY_9 } from '../../../../Constant/Color';
import { stylesFont } from '../../../../Constant/Font';
import { styleElement } from '../../../../Constant/StyleElement';
import { sizeIcon } from '../../../../Constant/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ModalAddDeposit from './ModalAddDeposit'
import { alertCustomNotAction } from '../../../../Constant/Utils';
import moment from 'moment'
import _ from 'lodash';

const ModalInfoMedicine = memo((props) => {


    useEffect(() => {
    }, [props?.data])

    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center',
            marginHorizontal: _moderateScale(8 * 4)
        }}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={150}
            animationOutTiming={500}
            isVisible={props.show}
            backdropTransitionOutTiming={0}
            useNativeDriverForBackdrop={true}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? true : true}
            onBackButtonPress={() => {
                props.hide()
            }}
            onBackdropPress={() => {
                props.hide()
            }}>
            <View style={[styles.container]}>

                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: "#EC3A79", alignSelf: 'center' }]}>
                    CHI TIẾT 
                </Text>

                <View style={{flexDirection:'row', 
                        justifyContent:'space-between'}}>
                    <Text style={[styles.titTle]}>{props?.data?.name}</Text>
                    <Text style={[stylesFont.fontNolanBold,{fontSize:_moderateScale(14), color: SECOND_COLOR }]}>
                    {`${props?.data?.timeInDay/60<10?`0${Math.floor(props?.data?.timeInDay/60)}`:Math.floor(props?.data?.timeInDay/60)}`}:
                    {`${props?.data?.timeInDay%60<10?`0${props?.data?.timeInDay%60}`:props?.data?.timeInDay%60}`}</Text>
                </View>
                <View style={[styles.description]}><Text>{props?.data?.description}</Text></View>
                <Text style={[styles.titTle]}>Thuốc</Text>
                 <View style={[styles.listMedicine]}>
                 {props?.data?.listMedicine.map((item, index)=>{
                     return <>
                        <View style={[styles.lineMedical]}>
                            <Text>{item?.medicine?.name}</Text>
                            <Text>{item?.amountInDose}</Text>
                            <Text>{item?.unit}</Text>
                        </View>
                     </>
                 })}
                </View>
            </View>
        </Modal>
    );
});


const styles = StyleSheet.create({
    btnService: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_SERVICE,
        marginRight: _moderateScale(8),
        marginTop: _moderateScale(8)
    },
    btnConfirm__text: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    btnConfirm: {
        width: "45%",
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        height: _moderateScale(8 * 4)
    },
    container: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingTop: _moderateScale(20),
        // paddingBottom: _moderateScale(50),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(23),
        borderRadius: _moderateScale(8)
    },
    titTle:{
        ...stylesFont.fontNolanBold
    },
    description:{
        padding: _moderateScale(4),
        marginLeft: _moderateScale(8),
        paddingLeft: _moderateScale(8),
        marginVertical: _moderateScale(8),
        borderColor: WHITE,
        borderLeftColor: SECOND_COLOR,
        borderWidth: _moderateScale(2)
    },
    quote:{
        height:_moderateScale(16),
        width:_moderateScale(2),
        backgroundColor: SECOND_COLOR,
        
    },
    listMedicine:
    {
        marginVertical: _moderateScale(12)
    },
    lineMedical:{
        flexDirection:'row',
        justifyContent: 'space-between',
        borderBottomWidth: _moderateScale(0.5),
        paddingBottom: _moderateScale(8),
        marginTop: _moderateScale(8),
        borderBottomColor: BG_GREY_OPACITY_9
    }
})

export default ModalInfoMedicine;