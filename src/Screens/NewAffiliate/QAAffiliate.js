import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IconBackWhite, IconRightArrow } from '../../Components/Icon/Icon'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { _moderateScale } from '../../Constant/Scale'


import Collapsible from 'react-native-collapsible'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { navigation } from '../../../rootNavigation'
import { sizeIcon } from '../../Constant/Icon'
import { getQuestionAnswer } from '../../Redux/Action/InfoAction'

import { isEmpty } from 'lodash-es'
import { Dimensions, Image } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { WebView } from 'react-native-webview'
import { styleTo, styleToComponent } from '../../Constant/styleTo'
import { useSafeAreaInsets } from 'react-native-safe-area-context'



let arrParent = []
let styleIdex = []

const ItemQA = (props) => {

    const [isExpaned, setIsExpaned] = useState(true)
    const rotateIcon = useSharedValue(0);

    useEffect(() => {
        if (isExpaned) {
            rotateIcon.value = withTiming(0, { duration: 500 })
        } else {
            rotateIcon.value = withTiming(90, { duration: 300 })
        }
    }, [isExpaned])

    const animIcon = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotateIcon.value}deg`
                }
            ]
        }
    })

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
        <TouchableOpacity
            onPress={() => {
                setIsExpaned(old => !old)
            }}
            style={{
                padding: _moderateScale(8 * 2),
                borderBottomWidth: .5,
                borderColor: 'rgba(0,0,0,.2)',
                // flexDirection: 'row',
                alignItems: 'center'
            }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={[stylesFont.fontNolanBold, { flex: 1, color: BASE_COLOR }]}>
                    {props?.indexX + 1}. Tôi muốn đăng kí CTV thì phải làm thế nào?
                </Text>

                <Animated.View style={animIcon}>
                    <IconRightArrow style={sizeIcon.sm} />
                </Animated.View>
            </View>

            <Collapsible collapsed={isExpaned}>
                <View style={{ flex: 1, marginTop: _moderateScale(8) }}>
                    {/* <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled g industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambledstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled g industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambledstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled g industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                    </Text> */}
                     {_renderParameterDescription(props?.data?.answer)}
                </View>
            </Collapsible>
        </TouchableOpacity>
    )
}

const QANewAffiliate = () => {

    const [listQA, setListQA] = useState([])

    useEffect(() => {
        _getQuestionAnswer()
    }, [])

    const { top } = useSafeAreaInsets();


    const _getQuestionAnswer = async () => {
        let result = await getQuestionAnswer({
            condition: {
                type: {
                    equal: 'collaborator'
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return
        setListQA(result?.data?.data)
    }

    const _renderItem = ({ item, index }) => {
        return (
            <ItemQA data={item} indexX={index} />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: top
                }} />
                <View style={styles.header__box}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                         onPress={()=>{
                            navigation.goBack()
                        }}
                        >
                            <IconBackWhite />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                            Giải đáp thắc mắc
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                    </View>
                </View>
            </View>

            <FlatList
                renderItem={_renderItem}
                data={listQA}
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => {
                    return (
                        <View style={{ height: 200 }} />
                    )
                }}
            />


        </View>
    )
}

export default QANewAffiliate

const styles = StyleSheet.create({
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
    }
})