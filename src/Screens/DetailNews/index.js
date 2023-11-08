import _isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, Linking, ActivityIndicator } from 'react-native';
// import RenderHTMLView from 'react-native-htmlview';
import ImageView from "react-native-image-viewing";
import { WebView } from 'react-native-webview';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_5, BLACK, BLUE_FB, BTN_PRICE, GREY, SECOND_COLOR, WHITE, BG_GREY_OPACITY_3, RED } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale, _width, _widthScale, _height } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../Constant/Url';
import { isEmpty } from '../../Constant/Utils';
import { getNewsById } from '../../Redux/Action/News';
import HTMLView from 'react-native-htmlview';
import { styleTo, styleToComponent } from '../../Constant/styleTo';
import moment from 'moment';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import HeaderLeft from '../../Components/HeaderLeft';
import RenderHtml from 'react-native-render-html';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import { getBranchById } from '../../Redux/Action/BranchAction';
import ScreenKey from '../../Navigation/ScreenKey'
import { getDoctorById } from '../../Redux/Action/DoctorAction';
import ModalPickLocationToCreateBooking from '../../Components/ModalPickLocationToCreateBooking/ModalPickLocationToCreateBooking';
import { getServiceById } from '../../Redux/Action/Service';

import {
    SkypeIndicator,
} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';


let arrParent = []
let styleIdex = []

const DetailServiceScreen = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;

    const opacityAnimated = new Animated.Value(1)

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

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [showModalPickLocationToCreateBooking, setShowModalPickLocationToCreateBooking] = useState(false)

    const [currServiceToCreateBooking, setCurrServiceToCreateBooking] = useState({})

    const [isFirstLoaded, setIsFirstLoaded] = useState(false)

    const [showOverLay, setShowOverLay] = useState(false)

    useEffect(() => {
        if (!_isEmpty(props?.route?.params?.idNews)) {
            setShowOverLay(true)
            _getService()
        }
    }, [])

    useEffect(() => {

        if (isFirstLoaded) {
            Animated.timing(opacityAnimated, {
                toValue: 0,
                duration: 1000
            }).start(() => {
                setShowOverLay(false)
            });
        }

    }, [isFirstLoaded])

    const _getService = async () => {
        var currentService = await getNewsById(props?.route?.params?.idNews)
        if (currentService?.isAxiosError) return
        setCurrService(currentService)
        setListImage(currentService?.representationFileArr)
        setListImagesSeeCurr(currentService?.representationFileArr)

        setTimeout(() => {
            setIsFirstLoaded(true)
        }, 800);
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
        // return (
        //     !isEmpty(htmlContent) ? <HTMLView
        //         value={htmlContent}
        //         renderNode={_customRender}
        //     /> : <></>
        // );
        return (
            <RenderHtml
                contentWidth={_width - _widthScale(8 * 4)}
                source={{ html: `${htmlContent}` }}
                enableExperimentalBRCollapsing={true}
                enableExperimentalMarginCollapsing={true}
            />
        )

    }

    const _handleBookingBranch = async (idBranch) => {
        // return alert(idBranch)

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

        let result = await getBranchById(idBranch);
        if (result?.isAxiosError) return

        // navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, { infoBranch: result, branchCode: result?.code, refCode: "" })
        navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceBranch: result })
    }

    const _handleBookingDoctor = async (idDoctor) => {

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

        let result = await getDoctorById(idDoctor);
        if (result?.isAxiosError) return
        navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceDoctor: result })
        // navigation.navigate(ScreenKey.BOOKING_FOR_DOCTOR, { infoBranch: result?.branch, infoDoctor: result, doctorCode: result?.code, branchCode: result?.branch?.code, refCode: "" })
    }

    const _handleBookingService = async (idService) => {

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

        let result = await getServiceById(idService);
        if (result?.isAxiosError) return

        setCurrServiceToCreateBooking(result)

        setShowModalPickLocationToCreateBooking(true)
    }
    const _handleConfirmPickBranch = (item) => {
        // console.log({item,setCurrServiceToCreateBooking});
        setShowModalPickLocationToCreateBooking(false)

        navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, {
            infoService: currServiceToCreateBooking,
            infoBranch: item
        })
    }

    const _handleBookingVideoCall = () => {
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
        navigation.navigate(ScreenKey.VIDEO_REQUEST)
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom gradient/>
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

            {
                currentService?.actions?.find(item => item?.type == 'create_booking_service') ?
                    <ModalPickLocationToCreateBooking
                        onConfirm={_handleConfirmPickBranch}
                        hide={() => {
                            setShowModalPickLocationToCreateBooking(false)
                        }}
                        show={showModalPickLocationToCreateBooking} />
                    : <></>
            }


            {/* <HeaderLeft title={currentService?.title} /> */}

            <View style={{
                flexDirection: 'row',
                // paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                // paddingVertical: _moderateScale(8),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: BASE_COLOR,
                // height: _moderateScale(8 * 6)
            }}>
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
                        }} />
                
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start',marginLeft:_moderateScale(8*2) }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/back_left_white.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 ,paddingVertical:_moderateScale(8)}}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: WHITE }]} numberOfLines={2}>
                        {currentService?.title?.trim()}
                    </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={showOverLay ? false : true} contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8), flexGrow: 1 }}>

                {
                    showOverLay ?
                        <Animated.View style={{ opacity: opacityAnimated, width: _width, height: _height, backgroundColor: WHITE, position: 'absolute', zIndex: 10, justifyContent: 'center', alignItems: 'center', paddingBottom: _moderateScale(8 * 10) }}>
                            <SkypeIndicator color={BASE_COLOR} />
                        </Animated.View>
                        : <></>
                }

                {_renderParameterDescription(currentService?.content)}




                <View style={{ height: 50 }} />

            </ScrollView>



            {/* {
                currentService?.onClickAction?.type == 'redirect' ?
                    <TouchableOpacity
                        onPress={() => {
                            // _handleBookingBranch(currentService?.actions?.find(item => item?.type == 'create_booking_branch')?.data)
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
                            navigation.navigate(currentService?.onClickAction?.data)
                        }}
                        style={[styleElement.centerChild, {
                            position: 'absolute',
                            bottom: _moderateScale(8 * 2) + getBottomSpace(),
                            right: _moderateScale(8 * 0),
                        }, shadow]}>
                        <Image style={[{
                            width: _moderateScale(8 * 12),
                            height: _moderateScale(8 * 12),
                        }]} source={require('../../NewIcon/btnNavigate.png')} />
                    </TouchableOpacity>
                    : <></>
            } */}

            {
                currentService?.actions?.find(item => item?.type == 'create_booking_branch') ?
                    <TouchableOpacity
                        onPress={() => {
                            _handleBookingBranch(currentService?.actions?.find(item => item?.type == 'create_booking_branch')?.data)
                        }}
                        style={[styleElement.centerChild, {
                            position: 'absolute',
                            bottom: _moderateScale(8 * 2) + getBottomSpace(),
                            right: _moderateScale(8 * 0),
                        }, shadow]}>
                        <Image style={[{
                            width: _moderateScale(8 * 12),
                            height: _moderateScale(8 * 12),
                        }]} source={require('../../NewIcon/btnBookingNews.png')} />
                    </TouchableOpacity>
                    : <></>
            }
            {
                currentService?.actions?.find(item => item?.type == 'create_booking_doctor') ?
                    <TouchableOpacity
                        onPress={() => {
                            _handleBookingDoctor(currentService?.actions?.find(item => item?.type == 'create_booking_doctor')?.data)
                        }}
                        style={[styleElement.centerChild, {
                            position: 'absolute',
                            bottom: _moderateScale(8 * 2) + getBottomSpace(),
                            right: _moderateScale(8 * 0),
                        }, shadow]}>
                        <Image style={[{
                            width: _moderateScale(8 * 12),
                            height: _moderateScale(8 * 12),
                        }]} source={require('../../NewIcon/btnBookingNews.png')} />
                    </TouchableOpacity>
                    : <></>
            }
            {/* {
                currentService?.actions?.find(item => item?.type == 'create_booking_service') ?
                    <TouchableOpacity
                        onPress={() => {
                            _handleBookingService(currentService?.actions?.find(item => item?.type == 'create_booking_service')?.data)
                        }}
                        style={[styleElement.centerChild, {
                            position: 'absolute',
                            bottom: _moderateScale(8 * 2) + getBottomSpace(),
                            right: _moderateScale(8 * 0),
                        }, shadow]}>
                        <Image style={[{
                            width: _moderateScale(8 * 12),
                            height: _moderateScale(8 * 12),
                        }]} source={require('../../NewIcon/btnBookingNews.png')} />
                    </TouchableOpacity>
                    : <></>
            } */}
            {
                currentService?.actions?.find(item => item?.type == 'video_call_request') ?
                    <TouchableOpacity
                        onPress={() => {
                            _handleBookingVideoCall()
                        }}
                        style={[styleElement.centerChild, {
                            position: 'absolute',
                            bottom: _moderateScale(8 * 2) + getBottomSpace(),
                            right: _moderateScale(8 * 0),
                        }, shadow]}>
                        <Image style={[{
                            width: _moderateScale(8 * 12),
                            height: _moderateScale(8 * 12),
                        }]} source={require('../../NewIcon/btnVideoCallNews.png')} />
                    </TouchableOpacity>
                    : <></>
            }
            {
                currentService?.actions?.find(item => item?.type == 'call_phone') ?
                    <TouchableOpacity
                        onPress={() => {
                            if (Platform.OS !== 'android') {
                                Linking.openURL(`telprompt:${currentService?.actions?.find(item => item?.type == 'call_phone')?.data}`)
                            }
                            else {
                                Linking.openURL(`tel:${currentService?.actions?.find(item => item?.type == 'call_phone')?.data}`)
                            }
                        }}
                        style={[styleElement.centerChild, {
                            position: 'absolute',
                            bottom: _moderateScale(8 * 2) + getBottomSpace() + _moderateScale(8 * 10),
                            right: _moderateScale(8 * 0),
                        }, shadow]}>
                        <Image style={[{
                            width: _moderateScale(8 * 12),
                            height: _moderateScale(8 * 12),
                        }]} source={require('../../NewIcon/btnHotlineNews.png')} />
                    </TouchableOpacity>
                    : <></>
            }



        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
}
)


const shadow = {
    shadowColor: BASE_COLOR,
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}



export default DetailServiceScreen;