import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _widthScale, _moderateScale, _width, _height } from '../../Constant/Scale';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from '../../Redux/Store';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import ScreenKey from '../../Navigation/ScreenKey'
import { navigation } from '../../../rootNavigation';
import { URL_ORIGINAL } from '../../Constant/Url';
import RenderHtml from 'react-native-render-html';
import { formatMonney } from '../../Constant/Utils';
import { isEmpty } from 'lodash-es';
import { getConfigData } from '../../Redux/Action/OrtherAction';

const ModalFlashMsg = props => {

    
    return (
        <Modal style={[{
            margin: 0,
            alignItems: "center",
            // justifyContent: 'flex-end',
            paddingBottom:_heightScale(100)
        },props?.bottom && {justifyContent: 'flex-end'}]}
            animationIn='fadeIn'
            animationOut='fadeOut'
            // animationInTiming={500}
            // animationOutTiming={500}
            isVisible={props?.show}
            backdropColor={'transparent'}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                // props?.confirmfalse()
                props?.hide()
            }}>

            <View style={{
                paddingHorizontal:_moderateScale(8*2),
                paddingVertical:_moderateScale(8),
                borderRadius:_moderateScale(8),
                backgroundColor:Color.BLACK
            }}>
                <Text style={{...stylesFont.fontNolan500,fontSize:_moderateScale(14),color:Color.WHITE}}>
                    {props?.data}
                </Text>
            </View>
           

        </Modal>
    );
};

const styles = StyleSheet.create({
   
})



export default ModalFlashMsg;