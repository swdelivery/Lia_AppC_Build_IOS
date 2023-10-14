import _isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import RenderHTMLView from 'react-native-htmlview';
import ImageView from "react-native-image-viewing";
import { WebView } from 'react-native-webview';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_5, BLACK, BLUE_FB, BTN_PRICE, GREY, SECOND_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../Constant/Url';
import { isEmpty } from '../../Constant/Utils';
import { getNewsById } from '../../Redux/Action/News';
import HTMLView from 'react-native-htmlview';
import { styleTo, styleToComponent } from '../../Constant/styleTo';
import moment from 'moment';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import HeaderLeft from '../../Components/HeaderLeft';



let arrParent = []
let styleIdex = []

const DetailServiceScreen = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;

    const [listImage, setListImage] = useState([])
    const [currIndexImage, setCurrIndexImage] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [currTab, setCurrTab] = useState('1')
    const [showModalFeedBack, setShowModalFeedBack] = useState(false)
    const [currentService, setCurrService] = useState(null)
    const [listReview, setListReview] = useState([])
    const [isMore, setIsMore] = useState(true)



    useEffect(() => {
        if (!_isEmpty(props?.route?.params?.idNews)) {
            _getService()
        }
    }, [])

    const _getService = async () => {
        var currentService = await getNewsById(props?.route?.params?.idNews)
        if (currentService?.isAxiosError) return
        setCurrService(currentService)
        setListImage(currentService?.representationFileArr)
        setListImagesSeeCurr(currentService?.representationFileArr)
    }

    useEffect(() => {
    }, [currentService])


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
            if (!isEmpty(node?.parent?.attribs)) {
                styleIdex.push(arrParent.length - 1)
            }
            return getParentName(node.parent); // <- recursive call
        }
        else { // node must be a leaf node
            arrParent.push({
                name: node?.name,
                attr: node?.attribs
            })
            if (!isEmpty(node?.parent?.attribs)) {
                styleIdex.push(arrParent.length - 1)
            }
            // return node.name;
        }
        return arrParent;

    }

    const _customRender = (node, index, siblings, parent, defaultRenderer) => {
        if (!isEmpty(node.name) && node.data !== '&nbsp;') {

            const w = Dimensions.get('window').width - 32
            const h = Math.floor(Dimensions.get('window').width / 16 * 9)

            if (node.name == 'img') {
                const a = node.attribs;
                return (<Image style={{ width: w, height: h }} source={{ uri: a.src }} resizeMode="contain" />);
            }
            if (node.name == 'iframe' || node.name == "oembed") {
                const a = node.attribs;

                const videoId = getVideoId(a.url);
                const iframeMarkup = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=0&showinfo=0&controls=0';


                return (
                    <View key={index} style={{ width: w, height: h, backgroundColor: BG_BEAUTY }}>
                        <WebView
                            style={{ width: '100%' }}
                            javaScriptEnabled={true}
                            source={{ uri: iframeMarkup }}
                        />
                    </View>
                );
            }
        }

        if (node?.data && node?.data !== '&nbsp;') {
            console.log('node-data', node);
            arrParent = []
            styleIdex = []
            var arr = getParentName(node)

            var tmpStyleCom = arr.filter(item => item.name !== 'span' && item.name !== 'p')
            var sty = {}
            var cssTmp = {}
            tmpStyleCom.map(css => {
                sty = styleToComponent(css.name, sty)
            })

            if (styleIdex.length > 0) {
                var tmpCss = arr[styleIdex[0]]?.attr?.style.split(';')
                tmpCss.map(css => {
                    cssTmp = { ...cssTmp, ...styleTo(css) }
                })
            }

            return <Text style={{ ...cssTmp, ...sty }}>
                {node?.data.replace('&nbsp;', '')}
            </Text>

        }
    }

    const _renderParameterDescription = (htmlContent) => {
        return (
            !isEmpty(htmlContent) ? <HTMLView
                value={htmlContent}
                renderNode={_customRender}
            /> : <></>
        );
    }



    return (
        <View style={styles.container}>
            <StatusBarCustom/>
            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}/${item?.path}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            {/* <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }]}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image
                        style={[sizeIcon.llg]}
                        source={require('../../Icon/back_left_white.png')} />
                </TouchableOpacity>
                <Text
                    numberOfLines={1}
                    style={[stylesFont.fontNolan500, {
                        textTransform: 'uppercase',
                        color: WHITE, fontSize: _moderateScale(16)
                    }]}>
                    {currentService?.title}</Text>
                <TouchableOpacity>

                </TouchableOpacity>
            </View> */}

            <HeaderLeft title={currentService?.title}/>

            <Animated.ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../NewImage/banner2Color.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>

                    </View>

                    <View style={{
                        position: 'absolute',
                        bottom: _moderateScale(8 * 4),
                        width: "100%"
                    }}>
                        {
                            currentService?.representationFileIdArr?.length > 0 ?
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowImageViewing(true)
                                        setIndexCurrImageView(0)
                                        setListImagesSeeCurr(listImage)
                                    }}
                                    style={{
                                        marginBottom: _moderateScale(8 * 2)
                                    }}>
                                    <Image
                                        style={styles.imageLarge}
                                        source={{
                                            uri: `${URL_ORIGINAL}/${listImage[0]?.path}`
                                        }} />
                                </TouchableOpacity>
                                : <></>
                        }
                    </View>

                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    paddingBottom: _moderateScale(8 * 6)
                }}>
                    <View style={styles.wave} />
                    <View style={{ marginHorizontal: _moderateScale(8 * 1.5) }}>
                        <Text style={[stylesFont.fontNolanBold, styles.title,
                        { color: BASE_COLOR }]}>
                            {currentService?.title}
                        </Text>
                        <Text style={{ fontSize: _moderateScale(11), color: GREY }}>
                            {moment(currentService?.created).format('DD-MM-YYYY')}
                        </Text>
                    </View>


                    <Text
                        style={[stylesFont.fontNolan, {
                            marginHorizontal: _moderateScale(8 * 2),
                            fontSize: _moderateScale(14),
                            marginTop: _moderateScale(8 * 2)
                        }]}>
                        {currentService?.description}
                    </Text>

                    <View style={{
                        height: _moderateScale(0.5),
                        backgroundColor: BG_GREY_OPACITY_5,
                        marginHorizontal: _moderateScale(8 * 4),
                        marginVertical: _moderateScale(8 * 2)
                    }} />



                    <View style={{ marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(16) }}>
                        {_renderParameterDescription(currentService?.content)}
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    btnTab__text: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    btnTab: {
        width: "30%",
        alignItems: 'center',
        paddingBottom: _moderateScale(4)
    },
    imageChoice: {
        width: _moderateScale(50),
        height: _moderateScale(50),
        resizeMode: 'contain'
    },
    btnBooking__text: {
        fontSize: _moderateScale(14),
        color: WHITE
    },
    btnBooking: {
        // paddingHorizontal: _moderateScale(8 * 2),
        // paddingVertical: _moderateScale(8),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: BASE_COLOR,
        marginHorizontal: _moderateScale(8 * 7),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: _moderateScale(8 * 2),
        height: _moderateScale(8 * 4.5),
        overflow: 'hidden'
    },
    price: {
        fontSize: _moderateScale(22),
        alignSelf: 'center',
        color: BLUE_FB,
    },
    title: {
        fontSize: _moderateScale(18),
        alignSelf: 'flex-start',
        color: BLACK,
    },
    imageLarge: {
        width: "85%",
        height: _moderateScale(8 * 25),
        resizeMode: 'cover',
        borderRadius: _moderateScale(8 * 2),
        alignSelf: 'center',
    },
    imageSmall: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        resizeMode: 'cover',
        borderRadius: _moderateScale(4)
    },
    btnOptions__icon: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain'
    },
    btnOptions: {
        width: _moderateScale(100),
        height: _moderateScale(100),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: BTN_PRICE
    },
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center'
    },

    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(300),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
}
)


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
        BASE_COLOR,
        SECOND_COLOR,
        `rgba(255, 168, 198,1)`,
    ]
}

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 11
}


export default DetailServiceScreen;