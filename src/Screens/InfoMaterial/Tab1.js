import React, { useRef, useEffect, useState, memo } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Button, Linking, Dimensions } from 'react-native';


import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BASE_COLOR, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BG_GREY_OPACITY_3, GREEN_SUCCESS, BLUE_FB, BG_BEAUTY } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { URL_ORIGINAL } from '../../Constant/Url';
import { TabBar, TabView } from 'react-native-tab-view';
import { navigation } from '../../../rootNavigation';
import moment from 'moment'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { getBookingByIdForPartner } from '../../Redux/Action/BookingAction';

import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import { styleTo, styleToComponent } from '../../Constant/styleTo';
import { isEmpty } from 'lodash-es';


let arrParent = []
let styleIdex = []

const Tab1 = (props) => {

    const _customRender = (node, index, siblings, parent, defaultRenderer) =>
    {
        if (!isEmpty(node.name) && node.data !== '&nbsp;') {

            const w = Dimensions.get('window').width - 32
            const h = Math.floor(Dimensions.get('window').width/16*9)

            if (node.name == 'img') {
                const a = node.attribs;
                return ( <Image style={{width: w, height: h}} source={{uri: a.src}} resizeMode="contain"/> );
            }
            if (node.name == 'iframe' || node.name == "oembed") {
                const a = node.attribs;
                
                const videoId = getVideoId(a.url);
                const iframeMarkup = 'https://www.youtube.com/embed/'+videoId+'?rel=0&autoplay=0&showinfo=0&controls=0';

                return (
                  <View key={index} style={{width:w, height: h, backgroundColor: BG_BEAUTY}}>
                    <WebView
                            style={{width:'100%'}}
                            javaScriptEnabled={true}
                            source={{uri: iframeMarkup}}/>
                  </View>
                ); 
              } 
        }

        if(node?.data && node?.data !== '&nbsp;') 
         {
            arrParent = []
            styleIdex = []
            var arr = getParentName(node)

            var tmpStyleCom = arr.filter(item=> item.name !== 'span' && item.name !== 'p')
            var sty = {}
            var cssTmp = {}
            tmpStyleCom.map(css=>{
                sty = styleToComponent(css.name, sty)
            })

            if(styleIdex.length>0)
            {
                var tmpCss = arr[styleIdex[0]]?.attr?.style.split(';')
                tmpCss.map(css=>{
                    cssTmp = {...cssTmp, ...styleTo(css)}
                })
            }

            return <Text style={{...cssTmp,...sty}}>
                {node?.data.replace('&nbsp;','')}
            </Text>

         }  
    } 

    const getVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }

    const getParentName = (node) => {
        if (node.parent) {
            arrParent.push({
                name: node?.parent?.name,
                attr: node?.parent?.attribs
            })
            if(!isEmpty(node?.parent?.attribs))
            {
                styleIdex.push(arrParent.length-1)
            }
            return getParentName(node.parent); // <- recursive call
        }
        else { // node must be a leaf node
            arrParent.push({
                name: node?.name,
                attr: node?.attribs
            })
            if(!isEmpty(node?.parent?.attribs))
            {
                styleIdex.push(arrParent.length-1)
            }
            // return node.name;
        }
        return arrParent;

    }

    const _renderParameterDescription = (htmlContent) =>{
        console.log({htmlContent})
        return (
            !isEmpty(htmlContent)?<HTMLView
              value={htmlContent}
              renderNode={_customRender} 
            />:<></>
          );
    }
    console.log(props?.isActiveTab)
    if (props?.isActiveTab) {
        return (
            <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
              
                <View style={{ height: _moderateScale(8 * 2) }} />
              
                <View style={[styleElement.rowAliCenter, { 
                    paddingLeft: _moderateScale(8), marginTop: _moderateScale(4) }]}>
                    {/* <Text style={[styles.codeRef]}>
                    {props?.data?.description}
                    </Text> */}
                    {_renderParameterDescription(props?.data?.description)}
                </View>

            </View>
        );
    } else {
        return <></>
    }
};

const styles = StyleSheet.create({
    dotActive__time: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(13),
        color: GREY,
        fontStyle: 'italic'
    },
    codeRef: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: BLACK_OPACITY_8
    },
    dotActive__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLUE_FB,
        flex: 1
    },
    dotActive__number: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: WHITE
    },
    dotActive: {
        width: _moderateScale(8 * 2.75),
        height: _moderateScale(8 * 2.75),
        borderRadius: _moderateScale(8 * 3),
        backgroundColor: BLUE_FB,
        ...styleElement.centerChild,
        marginRight: _moderateScale(8)
    },
    dotInActive__text: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY
    },
    dotInActive__number: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY
    },
    dotInActive: {
        width: _moderateScale(8 * 2.75),
        height: _moderateScale(8 * 2.75),
        borderRadius: _moderateScale(8 * 3),
        backgroundColor: BG_GREY_OPACITY_3,
        ...styleElement.centerChild,
        marginRight: _moderateScale(8)
    },
    title: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(16),
        color: BLACK_OPACITY_8
    }
})

export default Tab1;