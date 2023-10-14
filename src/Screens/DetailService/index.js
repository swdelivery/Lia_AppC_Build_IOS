import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions, ImageBackground, Platform, Linking, LayoutAnimation } from 'react-native';
import { GREY, WHITE, GREEN_SUCCESS, BLUE, BLUE_FB, BLACK, THIRD_COLOR, SECOND_COLOR, FOURTH_COLOR, BASE_COLOR, BG_GREY_OPACITY_5, TITLE_GREY, BTN_PRICE, RED, BG_BEAUTY, BLACK_OPACITY_8, PRICE_ORANGE, BG_GREY_OPACITY_3, BLACK_OPACITY_7, BG_GREY_OPACITY_2 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _height, _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { navigation } from '../../../rootNavigation';
import _isEmpty from 'lodash/isEmpty'
import ImageView from "react-native-image-viewing";
import LinearGradient from 'react-native-linear-gradient';

import CountStar from '../../Components/CountStar/index'
import ItemReview from './Components/ItemReview'

import ModalFeedBack from './Components/ModalFeedBack'
import { getDataServiceFiles, getServiceById, getServiceReviewByCodev2 } from '../../Redux/Action/Service';
import { URL_ORIGINAL } from '../../Constant/Url';
import { formatMonney, isEmpty, alertCustomNotAction } from '../../Constant/Utils';
import ScreenKey, { BOOKING_FOR_BRANCH, BOOKING_MAIN } from '../../Navigation/ScreenKey';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import { styleTo, styleToComponent } from '../../Constant/styleTo';
import { useSelector } from 'react-redux';
import ModalPickLocationToCreateBooking from '../../Components/ModalPickLocationToCreateBooking/ModalPickLocationToCreateBooking';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import RenderHtml from 'react-native-render-html';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import moment from 'moment'
import { FROM_GROUP_CHAT_ID } from '../../Constant/Flag';
import { getDataProductFiles } from '../../Redux/Action/Product';
import ModalIframeYoutube from '../../Components/ModalIframeYoutube/ModalIframeYoutube';
import Collapsible from 'react-native-collapsible';
import { getListDiaryByType } from '../../Redux/Action/Diary';
import ItemDiary from '../ListDiaryByType/Components/ItemDiary';
import AnimatedHeader from './Components/AnimatedHeader';
import AnimatedParameter from './Components/AnimatedParameter';
import AnimatedAdvantage from './Components/AnimatedAdvantage';
import AnimatedProcedure from './Components/AnimatedProcedure';
import { transform } from 'lodash';
import ModalPickTopping from '../Booking/bookingForBranch/ModalPickTopping';


let arrParent = []
let styleIdex = []

const DetailServiceScreen = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    const RefScrollView = useRef(null);

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const listLastedMessageRedux = useSelector(state => state.messageReducer?.listLastedMessages)

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

    const [showModalPickLocationToCreateBooking, setShowModalPickLocationToCreateBooking] = useState(false)


    const [currPage, setCurrPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [totalDocument, setTotalDocument] = useState(0)

    const [playingYoutube, setPlayingYoutube] = useState({
        show: false,
        playList: []
    })

    const [collapsedTab2, setCollapsedTab2] = useState(true)
    const [collapsedTab3, setCollapsedTab3] = useState(true)
    const [listDiary, setListDiary] = useState([])

    const [tabs, setTabs] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [currIndexImageTab, setCurrIndexImageTab] = useState(0)

    const [barStyle, setBarStyle] = useState('light-content')

    const [showModalPickTopping, setShowModalPickTopping] = useState({
        data: {},
        isShow: false
    })

    const [isCollapDescription, setIsCollapDescription] = useState(false)


    useEffect(() => {
        if (!_isEmpty(props?.route?.params?.idService)) {
            _getService()
            _getVideo()
        }
    }, [props?.route?.params?.idService])

    const _getService = async () => {
        var currentService = await getServiceById(props?.route?.params?.idService)
        if (currentService?.isAxiosError) return
        setCurrService(currentService)
        setListImage(currentService?.representationFileArr)
        setListImagesSeeCurr(currentService?.representationFileArr)
    }
    const _getListDiary = async () => {
        let result = await getListDiaryByType({
            condition: {
                serviceCode: {
                    equal: currentService?.code
                }
            },
            // limit: 5,
            page: 1,
            sort: {
                updated: 1
            }
        })
        if (result?.isAxiosError) return
        setListDiary(result?.data?.data)
    }

    useEffect(() => {
        if (currentService) {
            _getReview()
            _getListDiary()
        }
    }, [currentService])

    useEffect(() => {
        if (currentService?.description?.length > 190) {
            setIsCollapDescription(true)
        } else {
            setIsCollapDescription(false)
        }
    }, [currentService?.description])



    const _getVideo = async () => {
        let result = await getDataServiceFiles(props?.route?.params?.idService, {
            condition: {
                type: {
                    equal: 'video'
                }
            },
            limit: 1000
        })

        if (result?.isAxiosError) return

        if (result?.data?.data?.length == 0) {
            return
        }

        setPlayingYoutube(old => {
            return {
                ...old,
                show: false,
                playList: result?.data?.data?.map(item => item?.file?.link)
            }
        })
    }

    const _getReview = async () => {
        var review = await getServiceReviewByCodev2(currentService?.code)
        if (review?.isAxiosError) return
        setListReview(review?.data?.data)
        if (review?.data?.meta?.totalPage == 0) {
            setTotalPage(0)
            setCurrPage(0)
        } else {
            setTotalPage(review?.data?.meta?.totalPage)
            setCurrPage(review?.data?.meta?.page)
            setTotalDocument(review?.data?.meta?.totalDocuments)
        }
    }

    const _getReviewMore = async (_idMore) => {
        var review = await getServiceReviewByCodev2(currentService?.code, _idMore)
        if (review?.isAxiosError) return

        // if (review.length === 10) {
        //     setIsMore(true)
        // }
        // else {
        //     setIsMore(false)
        // }
        setListReview(old => {
            return [
                ...old,
                ...review?.data?.data
            ]
        })
        setCurrPage(currPage + 1)
    }


    const _handlePressFeedback = () => {
        setShowModalFeedBack(true)
    }

    const _handleOnpressBooking = () => {

        if (!infoUserRedux?._id) {
            store.dispatch({
                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                payload: {
                    flag: true,
                    currRouteName: props?.route?.name
                }
            })
            return
        }
        // navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceService: currentService })
        setShowModalPickTopping({
            data: currentService,
            isShow: true
        })
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

            console.log({ ...cssTmp, ...sty }, node?.data);


            return <Text style={{ ...cssTmp, ...sty, backgroundColor: 'red', padding: 0, margin: 0 }}>
                {node?.data.replace('&nbsp;', '')}
            </Text>

        }
    }

    const _renderParameterDescription = (htmlContent) => {

        // return (
        //     !isEmpty(htmlContent) ? <HTMLView
        //     enableExperimentalBRCollapsing={true}
        //                 enableExperimentalMarginCollapsing={true}
        //         value={htmlContent}
        //         renderNode={_customRender}
        //     /> : <></>
        // );
        if (htmlContent?.length > 0) {
            // let htmlTemp = htmlContent.replaceAll('\n','')
            return (
                <RenderHtml
                    contentWidth={_width - _widthScale(8 * 6)}
                    source={{ html: htmlContent }}
                    enableExperimentalBRCollapsing={true}
                    enableExperimentalMarginCollapsing={true}
                />
            )
        } else {
            return (<></>)
        }


    }


    const _handleConfirmPickBranch = (item) => {
        setShowModalPickLocationToCreateBooking(false)
        navigation.navigate(BOOKING_FOR_BRANCH, {
            infoService: currentService,
            infoBranch: item
        })
    }


    const _renderReactionIcon = (type) => {
        switch (type) {
            case 'VERY_GOOD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_11.png')}
                    />
                )
            case 'GOOD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_1.png')}
                    />
                )
            case 'NOT_GOOD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_2.png')}
                    />
                )
            case 'BAD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_3.png')}
                    />
                )
            case 'VERY_BAD':
                return (
                    <Image
                        resizeMode={'stretch'}
                        style={[sizeIcon.lxlg, { position: 'absolute', right: -_moderateScale(4), bottom: -_moderateScale(4) }]}
                        source={require('../../Icon/a_fb_33.png')}
                    />
                )
            default:
                break;
        }
    }

    const renderStatus = (type) => {
        switch (type) {
            case 'GOOD':
                return (
                    <Text style={[stylesFont.fontNolan, { color: '#007516', fontSize: _moderateScale(12) }]}>Tuyệt vời</Text>
                )

            case 'NOT_GOOD':
                return (
                    <Text style={[stylesFont.fontNolan, { color: BLUE_FB, fontSize: _moderateScale(12) }]}>Tạm ổn</Text>
                )

            case 'BAD':
                return (
                    <Text style={[stylesFont.fontNolan, { color: GREY, fontSize: _moderateScale(12) }]}>Chưa hài lòng</Text>
                )

            default:
                break;
        }
    }

    const _handleNavigateConsulChat = () => {
        let find = listLastedMessageRedux?.find(item => item?.type == "consultation");
        if (find) {
            navigation.navigate(ScreenKey.CHATTING, { propsData: find, flag: FROM_GROUP_CHAT_ID })
        }
    }

    console.log('Re-render');


    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={barStyle} />

            <ModalPickTopping
                confirm={(currChoice, listTopping) => {
                    // console.log({ currChoice, listTopping });
                    // let indexCurrChoiceInArray = props?.listServiceHasChoice?.findIndex(item => item?._id == currChoice?._id);
                    // if (indexCurrChoiceInArray !== -1) {
                    //     let tempArray = props?.listServiceHasChoice;
                    //     tempArray[indexCurrChoiceInArray].listTopping = listTopping
                    //     props?.setListServiceHasChoice(tempArray)
                    // }
                    navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceService: { ...currentService, listTopping } })
                }}
                data={showModalPickTopping?.data}
                show={showModalPickTopping?.isShow}
                hide={() => {
                    setShowModalPickTopping({
                        data: {},
                        isShow: false
                    })
                }}
            />

            <ModalIframeYoutube
                playList={playingYoutube?.playList}
                hide={() => {
                    setPlayingYoutube(old => {
                        return {
                            ...old,
                            show: false,
                            // playList: []
                        }
                    })
                }}
                show={playingYoutube?.show} />

            <ModalPickLocationToCreateBooking
                onConfirm={_handleConfirmPickBranch}
                hide={() => {
                    setShowModalPickLocationToCreateBooking(false)
                }}
                show={showModalPickLocationToCreateBooking} />

            <ModalFeedBack
                hide={() => {
                    setShowModalFeedBack(false)
                }}
                show={showModalFeedBack} />
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

            <View style={{
                width: _width, position: 'absolute', top: 0, zIndex: 10
            }}>
                <View style={{ height: (Platform.OS == 'ios' ? getStatusBarHeight() : 0) + _moderateScale(8 * 1), width: _width }} />
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: _moderateScale(8),
                    paddingBottom: _moderateScale(8 * 1),
                    paddingHorizontal: _moderateScale(8 * 1)
                }}>
                    <View style={[styleElement.centerChild, {
                        width: _moderateScale(8 * 3.5),
                        height: _moderateScale(8 * 3.5),
                        borderRadius: _moderateScale(8 * 3.5 / 2),
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255,0.8)'
                    }]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <Image style={sizeIcon.md} source={require('../../NewIcon/backBold.png')} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <AnimatedHeader currentService={currentService} scrollA={scrollA} RefScrollView={RefScrollView} tabs={tabs} activeTabIndex={activeTabIndex} />

            <Animated.ScrollView
                ref={RefScrollView}
                // onScroll={(event) => {
                //     const offsetY = event.nativeEvent.contentOffset.y
                //     const dif = offsetY - (scrollA._value || 0);
                //     // if (offsetY < 0) return 
                //     if (Math.abs(dif) < 3) {
                //         console.log('unclear');
                //     } else if (dif < 0) {
                //         console.log('up');
                //         setIsShowBottomBtnBooking(true)
                //     } else {
                //         console.log('down');
                //         setIsShowBottomBtnBooking(false)
                //     }
                //     if (offsetY >= 300) {
                //         setBarStyle('dark-content')
                //     } else {
                //         setBarStyle('light-content')
                //     }
                //     if (offsetY >= tabs[0].offset?.layout?.y - 200 && offsetY <= tabs[0].offset?.layout?.y) {
                //         setActiveTabIndex(0)
                //     }
                //     if (offsetY >= tabs[1].offset?.layout?.y - 200 && offsetY <= tabs[1].offset?.layout?.y) {
                //         setActiveTabIndex(1)
                //     }
                //     if (offsetY >= tabs[2].offset?.layout?.y - 200 && offsetY <= tabs[2].offset?.layout?.y) {
                //         setActiveTabIndex(2)
                //     }
                //     if (offsetY >= tabs[3].offset?.layout?.y - 200 && offsetY <= tabs[3].offset?.layout?.y) {
                //         setActiveTabIndex(3)
                //     }
                //     if (offsetY >= tabs[4].offset?.layout?.y - 200 && offsetY <= tabs[4].offset?.layout?.y) {
                //         setActiveTabIndex(4)
                //     }

                //     scrollA.setValue(event.nativeEvent.contentOffset.y);
                // }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    {
                        useNativeDriver: true,
                        listener: event => {
                            const offsetY = event.nativeEvent.contentOffset.y
                            // const dif = offsetY - (scrollA || 0);
                            // if (Math.abs(dif) < 3) {
                            //     console.log('unclear');
                            // } else if (dif < 0) {
                            //     console.log('up');
                            // } else {
                            //     console.log('down');
                            // }
                            if (offsetY >= 300) {
                                setBarStyle('dark-content')
                            } else {
                                setBarStyle('light-content')
                            }
                            if (offsetY >= tabs[0].offset?.layout?.y - 200 && offsetY <= tabs[0].offset?.layout?.y) {
                                setActiveTabIndex(0)
                            }
                            if (offsetY >= tabs[1].offset?.layout?.y - 200 && offsetY <= tabs[1].offset?.layout?.y) {
                                setActiveTabIndex(1)
                            }
                            if (offsetY >= tabs[2].offset?.layout?.y - 200 && offsetY <= tabs[2].offset?.layout?.y) {
                                setActiveTabIndex(2)
                            }
                            if (offsetY >= tabs[3].offset?.layout?.y - 200 && offsetY <= tabs[3].offset?.layout?.y) {
                                setActiveTabIndex(3)
                            }
                            if (offsetY >= tabs[4].offset?.layout?.y - 200 && offsetY <= tabs[4].offset?.layout?.y) {
                                setActiveTabIndex(4)
                            }
                        },
                    },
                )}
                scrollEventThrottle={16}>
                <View>
                    <Animated.View style={[{
                        width: _width,
                        height: _width
                    },
                    {
                        transform: [
                            {
                                scale: scrollA.interpolate({
                                    inputRange: [-_moderateScale(200), -_moderateScale(100), 0],
                                    // outputRange: [2, 1, 0.5, 0.5],
                                    outputRange: [2, 1.5, 1],
                                    extrapolate: 'clamp',
                                })
                            },
                            {
                                translateY: scrollA.interpolate({
                                    inputRange: [-_moderateScale(200), -_moderateScale(100), 0],
                                    outputRange: [-_moderateScale(100), -_moderateScale(50), 0],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    }
                    ]}>
                        <ScrollView
                            onMomentumScrollEnd={(e) => {
                                let index = e?.nativeEvent?.contentOffset?.x / _width
                                setCurrIndexImageTab(index)
                            }}
                            horizontal
                            pagingEnabled
                            style={{
                                width: _width,
                                height: _width
                            }}>
                            {
                                listImage?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowImageViewing(true)
                                                setIndexCurrImageView(index)
                                                setListImagesSeeCurr(listImage)
                                            }}
                                            activeOpacity={0.8}
                                            style={[styleElement.centerChild, {
                                                width: _width,
                                                height: _width,
                                                // backgroundColor: 
                                            }]}>
                                            <Image
                                                key={index}
                                                style={[{
                                                    width: _width,
                                                    height: _width
                                                }]}
                                                source={{
                                                    uri: `${URL_ORIGINAL}/${item?.path}`
                                                }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </ScrollView>

                    </Animated.View>
                    <TouchableOpacity style={{
                        position: 'absolute', bottom: _moderateScale(8), zIndex: 10, right: _moderateScale(8 * 2), width: _moderateScale(8 * 6), height: _moderateScale(8 * 3), alignItems: 'center', backgroundColor: 'rgba(255, 255, 255,0.8)', justifyContent: 'center', borderRadius: _moderateScale(4)
                    }}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>{currIndexImageTab + 1}/{listImage?.length}</Text>
                    </TouchableOpacity>
                </View>
                {/* <View  style={{ backgroundColor: WHITE }}> */}

                <View style={{
                    padding: _moderateScale(8 * 2)
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={[stylesFont.fontNolanBold, styles.title, { flex: 1, marginRight: _moderateScale(8 * 1) }]}>
                            {currentService?.name}
                        </Text>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_SERVICE_COMPARE, { propsListService: [currentService] })
                            }}
                            style={[styleElement.rowAliCenter, { top: _moderateScale(2) }]}>
                            <Image style={sizeIcon.sm} source={require('../../NewIcon/plusCircleBlue.png')} />
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLUE_FB, marginLeft: _moderateScale(4) }}>
                                So sánh
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[stylesFont.fontDinTextProBold, styles.price]}>
                            {formatMonney(currentService?.price)}
                        </Text>
                        <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: PRICE_ORANGE, fontSize: _moderateScale(20), }}>đ</Text>
                    </View>
                    <View style={{ height: _moderateScale(4) }} />
                    <CountStar reviewCount={currentService?.reviewCount} averageRating={parseInt(currentService?.averageRating)} large />

                    {/* <Text style={{
                        ...stylesFont.fontNolan500,
                        color:BLACK_OPACITY_8,
                        fontSize:_moderateScale(15),
                        marginTop:_moderateScale(4)
                    }}>
                        {currentService?.description}
                    </Text> */}
                    {
                        isCollapDescription ?
                            <Text
                                onLayout={(e) => {
                                    console.log({ ...e });
                                }}
                                style={{
                                    ...stylesFont.fontNolan500,
                                    fontSize: _moderateScale(14),
                                    color: GREY,
                                    marginRight: 4
                                }}>
                                {
                                    currentService?.description?.slice(0, 190)
                                }... {` `}
                                <Text
                                    style={{
                                        color: BLUE_FB,
                                        marginLeft: _moderateScale(8 * 2)
                                    }}
                                    onPress={() => {
                                        setIsCollapDescription(false)
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                    }}>
                                    Xem thêm
                                </Text>
                            </Text>
                            :
                            <Text style={{
                                ...stylesFont.fontNolan500,
                                fontSize: _moderateScale(14),
                                color: GREY,
                                marginRight: 4
                            }}>
                                {
                                    currentService?.description
                                } {` `}
                                <Text
                                    style={{
                                        color: BLACK_OPACITY_7,
                                        marginLeft: _moderateScale(8 * 2)
                                    }}
                                    onPress={() => {
                                        setIsCollapDescription(true)
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                    }}>
                                    Thu gọn
                                </Text>
                            </Text>
                    }
                </View>


                <View style={[styleElement.rowAliCenter, { justifyContent: 'center' }]}>
                    <TouchableOpacity onPress={() => {

                        navigation.navigate(ScreenKey.STORAGE_VIDEO, { idService: currentService?._id })

                        return
                        if (playingYoutube?.playList?.length == 0) {
                            return alertCustomNotAction(`Thông báo`, `Hiện chưa có Video khả dụng về dịch vụ này`)
                        }
                        return setPlayingYoutube(old => {
                            return {
                                ...old,
                                show: true,
                            }
                        })
                        // return alertCustomNotAction(`Thông báo`, `Tính năng sẽ sớm được ra mắt`)
                        if (Platform.OS !== 'android') {
                            Linking.openURL(`telprompt:0374466666`)
                        }
                        else {
                            Linking.openURL(`tel:0374466666`)
                        }
                    }} style={{ marginHorizontal: _moderateScale(8 * 2) }}>
                        <Image
                            style={styles.imageChoice}
                            source={require('../../NewIcon/khoVideo.png')} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, alignSelf: 'center', marginTop: _moderateScale(8) }]}>Kho Video</Text>
                    </TouchableOpacity>

                    <View style={{ opacity: 1 }}>
                        <TouchableOpacity
                            onPress={() => {
                                // return alertCustomNotAction(`Thông báo`, `Tính năng sẽ sớm được ra mắt`)
                                navigation.navigate(ScreenKey.LIST_DIARY_BY_TYPE, { type: "SERVICE", value: currentService?.code })
                            }}
                            style={{ marginHorizontal: _moderateScale(8 * 2) }}>
                            <Image
                                style={styles.imageChoice}
                                source={require('../../NewIcon/diaryWhite.png')} />
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, alignSelf: 'center', marginTop: _moderateScale(8) }]}>Nhật ký</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenKey.MATERIAL_SERVICE, { idService: currentService?._id, serviceName: currentService?.name })}
                        style={{ marginHorizontal: _moderateScale(8 * 2) }}>
                        <Image
                            style={styles.imageChoice}
                            source={require('../../NewIcon/vatlieuWhite.png')} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, alignSelf: 'center', marginTop: _moderateScale(8) }]}>Vật liệu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenKey.QA_SERVICE, { codeService: currentService?.code })}
                        style={{ marginHorizontal: _moderateScale(8 * 2) }}>
                        <Image
                            style={styles.imageChoice}
                            source={require('../../NewIcon/questionWhite.png')} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, alignSelf: 'center', marginTop: _moderateScale(8) }]}>Hỏi đáp</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginVertical: _moderateScale(8 * 2) }} />

                <AnimatedParameter tabs={tabs} setTabs={setTabs} currentService={currentService} _renderParameterDescription={_renderParameterDescription} />


                <View style={{ height: _moderateScale(8 * 1) }} />

                <AnimatedAdvantage tabs={tabs} setTabs={setTabs} currentService={currentService} _renderParameterDescription={_renderParameterDescription} />


                <View style={{ height: _moderateScale(8 * 1) }} />
                <AnimatedProcedure tabs={tabs} setTabs={setTabs} currentService={currentService} _renderParameterDescription={_renderParameterDescription} />


                <View style={{ height: _moderateScale(8 * 1) }} />
                <View style={{ width: '100%', height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginVertical: _moderateScale(8 * 2) }} />

                <View
                    onLayout={(e) => {
                        tabs[3] = {
                            data: {
                                name: 'Nhật ký khách hàng'
                            },
                            offset: e.nativeEvent
                        };
                        setTabs([...tabs]);
                    }}
                    style={[styleElement.rowAliBottom, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                    <View style={{
                        width: _moderateScale(4),
                        height: _moderateScale(8 * 2.5),
                        backgroundColor: '#FA4664',
                        marginRight: _moderateScale(8)
                    }} />
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: '#FA4664' }}>
                        Nhật ký khách hàng
                    </Text>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, marginLeft: _moderateScale(8) }}>
                        ({listDiary?.length})
                    </Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.LIST_DIARY_BY_TYPE, { type: "SERVICE", value: currentService?.code })
                        }}
                        style={styleElement.rowAliCenter}>
                        <Text style={{ ...stylesFont.fontNolan500, color: BLUE_FB, marginRight: _moderateScale(4) }}>
                            Xem tất cả
                        </Text>
                        <Image style={sizeIcon.xxs} source={require('../../Icon/doubleRight_blue.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }}>
                        {
                            listDiary?.slice(listDiary?.length - 5, listDiary?.length)?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(ScreenKey.DETAIL_NEW_FEED, { idPost: item?.postId })
                                        }}
                                        style={[styleElement.rowAliCenter, { marginRight: _moderateScale(8), marginBottom: _moderateScale(8) }]}>
                                        <Image
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.partner?.fileAvatar?.link}`
                                            }}
                                            style={{
                                                width: _moderateScale(8 * 4),
                                                height: _moderateScale(8 * 4),
                                                borderRadius: _moderateScale(8 * 2),
                                                borderWidth: 0.5,
                                                borderColor: BG_GREY_OPACITY_5
                                            }} />
                                        <Text style={{ textTransform: 'capitalize', marginLeft: _moderateScale(4), ...stylesFont.fontNolan500, color: BLACK }}>
                                            {item?.partner?.name}
                                        </Text>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <ScrollView decelerationRate={0} snapToInterval={_width / 1.5} showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
                        {
                            listDiary?.slice(0, 3)?.map((item, index) => {
                                return (
                                    <View style={{ width: _width / 1.5 }}>
                                        <ItemDiary marginRight={_moderateScale(0)} data={item} />
                                    </View>
                                )
                            })
                        }
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_DIARY_BY_TYPE, { type: "SERVICE", value: currentService?.code })
                            }}
                            style={[styleElement.rowAliCenter, { marginHorizontal: _moderateScale(8) }]}>
                            <View style={{ width: _moderateScale(8 * 10), alignItems: 'flex-end' }}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                    Xem tất cả nhật ký
                                </Text>
                            </View>

                            <Image style={[
                                sizeIcon.md,
                            ]} source={require('../../Icon/arrowRight_grey.png')} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={{ height: _moderateScale(8 * 0) }} />
                <View style={{ width: '100%', height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, marginVertical: _moderateScale(8 * 2) }} />


                <View
                    onLayout={(e) => {
                        tabs[4] = {
                            data: {
                                name: 'Đánh giá dịch vụ'
                            },
                            offset: e.nativeEvent
                        };
                        setTabs([...tabs]);
                    }}
                    style={[styleElement.rowAliBottom, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                    <View style={{
                        width: _moderateScale(4),
                        height: _moderateScale(8 * 2.5),
                        backgroundColor: '#FA4664',
                        marginRight: _moderateScale(8)
                    }} />
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: '#FA4664' }}>
                        Đánh giá dịch vụ
                    </Text>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: BLACK_OPACITY_8, marginLeft: _moderateScale(8) }}>
                        ({totalDocument})
                    </Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.FEED_BACK_SERVICE, { currentService })
                        }}
                        style={styleElement.rowAliCenter}>
                        <Text style={{ ...stylesFont.fontNolan500, color: BLUE_FB, marginRight: _moderateScale(4) }}>
                            Xem tất cả
                        </Text>
                        <Image style={sizeIcon.xxs} source={require('../../Icon/doubleRight_blue.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: _moderateScale(8 * 2) }} />
                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    {
                        listReview?.length > 0 ?
                            <>
                                {/* <View style={{ height: _moderateScale(8 * 2) }} /> */}

                                {listReview?.slice(0, 5)?.map((item, index) => {
                                    return <View style={[styles.itemReview, { backgroundColor: WHITE, padding: _moderateScale(8 * 1.5), borderRadius: _moderateScale(8) }]}>
                                        <View style={{
                                            width: _moderateScale(60),
                                            height: _moderateScale(60),
                                            borderRadius: _moderateScale(30),
                                            borderWidth: _moderateScale(1),
                                            // backgroundColor: THIRD_COLOR,
                                            borderColor: WHITE,
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (item?.partner?._id == infoUserRedux?._id) {
                                                        navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                                                    } else {
                                                        navigation.navigate(ScreenKey.OTHER_PERSONAL_PAGE, { userId: item?.partner?._id })
                                                    }
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: _moderateScale(60),
                                                        height: _moderateScale(60),
                                                        borderRadius: _moderateScale(30),
                                                    }}
                                                    source={{ uri: `${URL_ORIGINAL}${item?.partner?.fileAvatar?.link}` }}
                                                />
                                            </TouchableOpacity>
                                            {
                                                _renderReactionIcon(item?.reaction)
                                            }
                                        </View>
                                        <View style={[styles.rightReview, { paddingLeft: _moderateScale(8 * 1.5) }]}>
                                            <View style={[styleElement.rowAliTop]}>
                                                <View style={{ flex: 1, marginBottom: _moderateScale(4), }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (item?.partner?._id == infoUserRedux?._id) {
                                                                navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                                                            } else {
                                                                navigation.navigate(ScreenKey.OTHER_PERSONAL_PAGE, { userId: item?.partner?._id })
                                                            }
                                                        }}
                                                    >
                                                        <Text style={[stylesFont.fontNolan500, { textTransform: 'capitalize', flex: 1, color: BLACK_OPACITY_8, fontSize: _moderateScale(14) }]}>
                                                            {item?.partner?.name}
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <View style={[styleElement.rowAliCenter]}>
                                                        <Text style={[stylesFont.fontNolan, { color: GREY, fontSize: _moderateScale(12) }]}>
                                                            {moment(item?.created).format('DD/MM/YYYY')} - {moment(item?.created).format('LT')}
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={[styles.lineStar]}>
                                                    {
                                                        [1, 2, 3, 4, 5]?.map((star, index) => {
                                                            if (star <= item?.branchReview?.rating) {
                                                                return <Image
                                                                    resizeMode={'stretch'}
                                                                    style={[sizeIcon.xxxxs]}
                                                                    source={require('../../Icon/a_star.png')}
                                                                />
                                                            }
                                                            else {
                                                                return <Image
                                                                    resizeMode={'stretch'}
                                                                    style={[sizeIcon.xxxxs]}
                                                                    source={require('../../Icon/i_star.png')}
                                                                />
                                                            }
                                                        })
                                                    }
                                                </View>
                                            </View>

                                            {/* <View style={[styles.briefName]}>

                                                {renderStatus(item.reaction)}
                                            </View> */}
                                            {
                                                item?.branchReview?.comment?.length > 0 ?
                                                    <View style={[{ marginTop: _moderateScale(8) }]}>
                                                        <Text style={{ color: BLACK, flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }} >
                                                            {item?.branchReview?.comment !== '' ? item?.branchReview?.comment.trim() : ''}
                                                            {/* {item?.branchReview?.comment !== '' ? item?.branchReview?.comment : '...'} */}
                                                        </Text>
                                                    </View>
                                                    :
                                                    <></>
                                            }

                                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                                <View style={{ width: _moderateScale(2), height: _moderateScale(8 * 5), backgroundColor: RED, opacity: 0.3 }} />
                                                <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            navigation.navigate(ScreenKey.DETAIL_DOCTOR, { idDoctor: item?.doctor?._id })
                                                        }}
                                                        style={[styleElement.rowAliCenter]}>
                                                        <Image style={[sizeIcon.xs, { marginRight: _moderateScale(8) }]} source={require('../../NewIcon/doctorBase.png')} />
                                                        <Text style={{ color: SECOND_COLOR, ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                            {item?.doctor?.name}
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            navigation.navigate(ScreenKey.DETAIL_BRAND, { idBranch: item?.branch?._id })
                                                        }}
                                                        style={[styleElement.rowAliCenter]}>
                                                        <Image style={[sizeIcon.xs, { marginRight: _moderateScale(8) }]} source={require('../../NewIcon/branchThird.png')} />
                                                        <Text style={{ color: '#F8B175', ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                            {item?.branch?.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {/* <Text style={{ color: BLACK_OPACITY_7, ...stylesFont.fontNolan500, fontSize: _moderateScale(13) }} >
                                                                {item?.service?.name}
                                                            </Text> */}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                })}
                            </>
                            :
                            <>
                                <View style={{ height: _moderateScale(8 * 1) }} />
                                <Text style={{ ...stylesFont.fontNolan500, color: GREY, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                    Hiện chưa có đánh giá về dịch vụ này
                                </Text>
                            </>
                    }
                </View>

                {
                    currPage !== totalPage ?
                        <TouchableOpacity
                            onPress={() => {
                                // _getReviewMore(listReview[listReview?.length - 1])
                                navigation.navigate(ScreenKey.FEED_BACK_SERVICE, { currentService })
                            }}
                            style={[styleElement.centerChild, { height: _moderateScale(8 * 4.5), marginHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8), backgroundColor: WHITE, borderRadius: _moderateScale(4) }]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                                Xem tất cả ({totalDocument})
                            </Text>
                        </TouchableOpacity>
                        :
                        <></>
                }

                {/* </View> */}

                <View style={{ height: 100, borderWidth: 0 }} />
            </Animated.ScrollView>

            <Animated.View style={[{
                flexDirection: 'row', paddingVertical: _moderateScale(8),
                paddingBottom: getBottomSpace() + _moderateScale(8),
                paddingHorizontal: _moderateScale(8 * 2),
                backgroundColor: WHITE,
                borderTopWidth: 0.5,
                borderColor: BG_GREY_OPACITY_5,
                // borderWidth: 2,
                position: 'absolute',
                bottom: 0
            },
            {
                transform: [
                    {
                        translateY: scrollA.interpolate({
                            inputRange: [0, 600],
                            outputRange: [0, 100],
                            extrapolate: 'clamp',
                        }),
                    }
                ],
            },
            ]}>
                <TouchableOpacity
                    onPress={() => {
                        _handleOnpressBooking()
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: BASE_COLOR,
                        flex: 5
                    }]}>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 0.6, 1]}
                        colors={[
                            BASE_COLOR,
                            '#8c104e',
                            '#db0505',
                        ]}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderRadius: _moderateScale(8),
                        }} />

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                        Đặt hẹn ngay
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (!infoUserRedux?._id) {
                            store.dispatch({
                                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                payload: {
                                    flag: true,
                                    currRouteName: props?.route?.name
                                }
                            })
                            return
                        }
                        _handleNavigateConsulChat()
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: _moderateScale(1),
                        borderColor: BASE_COLOR,
                        flex: 1,
                        marginLeft: _moderateScale(8 * 2)
                    }]}>

                    <Image style={[sizeIcon.lg, { top: 1 }]} source={require('../../NewIcon/chatBase.png')} />
                </TouchableOpacity>
                {
                    props?.route?.params?.flag == 'share' ?
                        <TouchableOpacity
                            onPress={() => {
                                if (!infoUserRedux?._id) {
                                    store.dispatch({
                                        type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                        payload: {
                                            flag: true,
                                            currRouteName: props?.route?.name
                                        }
                                    })
                                    return
                                }
                                navigation.navigate(ScreenKey.SHARE_TO_SOCIAL, { idService: currentService?._id })
                            }}
                            style={[{
                                height: _moderateScale(8 * 5),
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: _moderateScale(1),
                                borderColor: BLUE_FB,
                                flex: 1,
                                marginLeft: _moderateScale(8 * 2)
                            }]}>
                            <Image style={[sizeIcon.lg, { top: 1 }]} source={require('../../NewIcon/shareBlue.png')} />

                        </TouchableOpacity>
                        :
                        <></>
                }


            </Animated.View>

            <Animated.View
                style={[
                    {
                        backgroundColor: SECOND_COLOR,
                        width: _moderateScale(8 * 5),
                        height: _moderateScale(8 * 5),
                        borderRadius: _moderateScale(8 * 2.5),
                        borderWidth: 1,
                        position: 'absolute',
                        right: 16,
                        bottom: getBottomSpace() + _moderateScale(8 * 5),
                        borderColor: WHITE
                    },
                    {
                        transform: [
                            {
                                scale: scrollA.interpolate({
                                    inputRange: [300, 600],
                                    outputRange: [0, 1],
                                    extrapolate: 'clamp',
                                })
                            },
                        ],
                    },
                    shadow
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        RefScrollView?.current?.getNode()?.scrollTo({
                            y: 0,
                            animated: true,
                        });
                    }}
                    style={[styleElement.centerChild, {
                        flex: 1
                        // backgroundColor: GREY
                    }]}>
                    <Image style={sizeIcon.lg} source={require('../../Icon/up_arrow_white.png')} />
                </TouchableOpacity>
            </Animated.View>

        </View >
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
        height: _moderateScale(8 * 5),
        overflow: 'hidden'
    },
    price: {
        fontSize: _moderateScale(22),
        alignSelf: 'center',
        color: PRICE_ORANGE,
    },
    title: {
        fontSize: _moderateScale(18),
        color: BLACK_OPACITY_8,
    },
    imageLarge: {
        // width: "85%",
        // height: _moderateScale(8 * 18),
        width: _moderateScale(8 * 35),
        height: _moderateScale(8 * 35),
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
        backgroundColor: WHITE
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
        height: _moderateScale(390),
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
    itemReview: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: _moderateScale(6),
        marginBottom: _moderateScale(6)
    },
    rightReview: {
        flex: 1,
        paddingLeft: _moderateScale(6),
        borderBottomWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_3,
        paddingBottom: _moderateScale(6)
    },
    briefName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusOfPartner: {
        flexDirection: 'row',
    },
    lineStar: {
        flexDirection: 'row',
    },
    contentBrief: {
        marginVertical: _moderateScale(4)
    }
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
    ]
}


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}



export default DetailServiceScreen;