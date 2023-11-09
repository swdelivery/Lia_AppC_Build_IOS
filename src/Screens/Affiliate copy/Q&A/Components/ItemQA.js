import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { _moderateScale } from '../../../../Constant/Scale';
import { stylesFont } from '../../../../Constant/Font';
import { BTN_PRICE, GREY, BLACK, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BLACK_OPACITY_7, BASE_COLOR, SECOND_COLOR } from '../../../../Constant/Color';
import { styleElement } from '../../../../Constant/StyleElement';
import { sizeIcon } from '../../../../Constant/Icon';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import { isEmpty } from 'lodash-es';
import { styleTo, styleToComponent } from '../../../../Constant/styleTo';


let arrParent = []
let styleIdex = []

const ItemQA = memo((props) => {

    const [isExpand, setIsExpand] = useState(false)

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
                            source={{uri: iframeMarkup}}
                    />
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
  

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    setIsExpand(!isExpand)
                }}
                style={{
                    paddingVertical: _moderateScale(8 * 2)
                }}>
                <View style={[styleElement.rowAliTop, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), flex: 1,color:BASE_COLOR }]}>{props?.data?.question}</Text>
                    {
                        isExpand ?
                            <View>
                                <Image style={[sizeIcon.lg]} source={require('../../../../Icon/expandUp_grey.png')} />
                            </View>
                            :
                            <View>
                                <Image style={[sizeIcon.lg]} source={require('../../../../Icon/expandDown_grey.png')} />
                            </View>
                    }

                </View>

                {
                    isExpand ?
                        // <Text style={[stylesFont.fontNolan, {color:BLACK_OPACITY_8,marginTop:_moderateScale(8),lineHeight:_moderateScale(24), marginLeft: _moderateScale(8 * 2), flex: 1, marginRight: _moderateScale(8), fontSize: _moderateScale(13) }]}>
                        <View style={{padding:_moderateScale(12),paddingHorizontal:_moderateScale(8*2)}}>
                        {_renderParameterDescription(props?.data?.answer)}
                        </View>   
                        // </Text>
                        : <></>
                }
            </TouchableOpacity>
            <View style={{ width: "100%", height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />
        </View>
    );
});


const styles = StyleSheet.create({
    btnPrice: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2),
        borderBottomWidth: _moderateScale(0.5),
        borderBottomColor: BG_GREY_OPACITY_3
    },
    title: {
        color: BLACK_OPACITY_8,
        fontSize: _moderateScale(14)
    },
    price: {
        alignSelf: 'flex-end',
        fontSize: _moderateScale(20),
        color: BTN_PRICE
    }
})

export default ItemQA;