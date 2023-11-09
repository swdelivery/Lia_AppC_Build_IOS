import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions, Dimensions } from 'react-native';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BTN_PRICE, GREY, BLACK, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BG_BEAUTY } from '../../../Constant/Color';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import RenderHTML from 'react-native-render-html';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import {
    useSharedProps,
    defaultHTMLElementModels
} from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import { styleTo, styleToComponent } from '../../../Constant/styleTo';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';


let arrParent = []
let styleIdex = []

const source = {
    html: `<p><span style="color:hsl(0,75%,60%);"><strong>1. Contrary to popular belief,&nbsp;</strong></span></p><p><span style="color:hsl(210,75%,60%);">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </span><span style="color:hsl(0,0%,0%);">a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</span></p><figure class="image"><img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"></figure><p><span style="color:hsl(270,75%,60%);"><strong>2. &nbsp;Lorem Ipsum comes from sections 1.10.32 and 1.10.33</strong>&nbsp;</span></p><p>of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. <span style="color:hsl(0,0%,0%);">The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.&nbsp;</span></p><p><span style="color:hsl(240,75%,60%);"><i><strong>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</strong></i></span><i> <u>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.&nbsp;</u></i></p><figure class="media"><oembed url="https://www.youtube.com/watch?v=fB4Ca1iTii8"></oembed></figure><p>&nbsp;</p><p><span style="color:hsl(270,75%,60%);font-size:10px;">If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, </span><span style="color:hsl(0,75%,60%);font-size:10px;">combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</span></p>
    `
};


// const renderersProps = {
//     img: {
//         enableExperimentalPercentWidth: true
//     }
// };

// const renderers = {
//     iframe
// }

const renderers = {
    iframe: IframeRenderer
}

const customHTMLElementModels = {
    iframe: iframeModel
}


// const tagsStyles = {
//     iframe: {
//         opacity: 0.99
//     },
//     // If you are using @native-html/table-plugin
//     table: {
//         opacity: 0.99
//     }
// }

const classesStyles = {
    'author': {
        color: '#CA43AC',
    },
}

const tagsStyles = {
    h1: {
        color: '#6728C7',
        textAlign: 'center',
        marginBottom: 10
    },
    img: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    }
}

const ItemQA = memo((props) => {

    const { width } = useWindowDimensions();
    const [isExpand, setIsExpand] = useState(false)

    const domVisitors = {
        onElement: _customRender
    };


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
             console.log('node-data', node);
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
                var tmpCss = arr[styleIdex[0]]?.attr?.style?.split(';')
                if(isArray(tmpCss)){
                    tmpCss.map(css=>{
                        cssTmp = {...cssTmp, ...styleTo(css)}
                    })
                }
                
            }

            return <Text style={{...cssTmp,...sty,textAlign:'justify'}}>
                {node?.data.replace('&nbsp;','')} 
            </Text>

         }  
    } 




    return (
        <View>
            <View
                
                style={{
                    paddingVertical: _moderateScale(8 * 2)
                }}>
                <TouchableOpacity
                onPress={() => {
                    setIsExpand(!isExpand)
                }}
                style={[styleElement.rowAliTop, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), flex: 1 }]}>
                       {props?.index}. {props?.data?.question}    
                    </Text>
                    {
                        isExpand ?
                            <View>
                                <Image style={[sizeIcon.lg]} source={require('../../../Icon/expandUp_grey.png')} />
                            </View>
                            :
                            <View>
                                <Image style={[sizeIcon.lg]} source={require('../../../Icon/expandDown_grey.png')} />
                            </View>
                    }
                </TouchableOpacity>

                {
                    isExpand ?
                        <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                            <View style={{ height: _moderateScale(8) }} />
                            <HTMLView
                                value={props?.data?.answer}    
                                renderNode={_customRender}
                            />

                        </View>
                        : <></>
                }
            </View>
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