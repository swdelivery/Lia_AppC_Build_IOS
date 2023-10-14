import React, { useRef, useEffect, useState, memo } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView, TouchableOpacity } from 'react-native';
import * as Color from '../../Constant/Color';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE, GREY } from '../../Constant/Color';
import { FONT_DINTEXT_PRO, stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { ImageBackground, Image, Dimensions } from 'react-native';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';

import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey';
import ItemService from './Component/ItemService'
import { getAllServiceGroup, getServiceByGroup, newGetServiceByGroup } from '../../Redux/Action/ServiceGroup';
import { filter, find } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { getDataServiceFiles } from '../../Redux/Action/Service';
import ImageView from "react-native-image-viewing";
import { alertCustomNotAction, formatMonney } from '../../Constant/Utils';
import ModalIframeYoutube from '../../Components/ModalIframeYoutube/ModalIframeYoutube';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import LinearGradient from 'react-native-linear-gradient';
import CountStar from '../../Components/CountStar/index';

const ListService = memo((props) => {

    const [listService, setListService] = useState([])

    useEffect(() => {
        console.log({ props });


        if (props?.route?.codeGR) {
            _getServiceByGRCode(props?.route?.codeGR)
        }
    }, [props?.route])

    const _getServiceByGRCode = async (codeGR) => {
        let condition = {
            "condition": {
                "codeGroup": {
                    "in": [codeGR]
                }
            },
            "limit": 100,
            "page": 1
        }
        let result = await newGetServiceByGroup(condition)
        setListService(result?.data?.data)
    }


    const _handlePressImage = (_id) => {
        props?.pressImage(_id)
    }


    const _handlePressVideo = (_id) => {
        props?.pressVideo(_id)
    }


    const _handlePressDetail = (_id) => {
        navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: _id })
    }

    return (
        <View style={{ flex: 1, backgroundColor: Color.BG_BEAUTY_OPACITY_2, marginTop: _moderateScale(8 * 5) }}>
            <View style={[styles.wave, { justifyContent: 'center', alignItems: 'center' }]} >
                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: Color.GREY }}>{props?.route?.title}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexDirection:'row', flexWrap:'wrap', paddingHorizontal:_moderateScale(8),justifyContent:'space-evenly', paddingBottom:_moderateScale(8*5)}}>
                {/* <View style={{ height: _moderateScale(8 * 3) }} /> */}
                {
                    listService?.length > 0 && listService?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => _handlePressDetail(item?._id)}
                                style={[styles.btnService, shadow]}>
                                <Image
                                    resizeMode={'cover'}
                                    style={[{ backgroundColor: Color.BG_GREY_OPACITY_5, width: "100%", height: _moderateScale(8 * 19), borderRadius: _moderateScale(8 * 1) }]}
                                    imageStyle={{ borderWidth: 1 }}
                                    source={{
                                        uri: `${URL_ORIGINAL}${item?.representationFileArr.length > 0 ? item?.representationFileArr[0]?.link : ''}`,
                                    }} />

                                <View style={{ paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 1) }}>
                                    {
                                        item?.price ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                                    {formatMonney(item?.price)}
                                                </Text>
                                                <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: Color.PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                            </View>
                                            : <></>}

                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, {
                                        fontSize: _moderateScale(14),
                                        color: Color.BLACK_OPACITY_8,
                                        marginTop: _moderateScale(0)
                                    }]}>
                                        {item?.name}
                                    </Text>


                                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8), justifyContent: 'space-between' }]}>

                                        <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} small />

                                        <View style={[styleElement.rowAliCenter]}>
                                            <Image style={sizeIcon.xxs} source={require('../../NewIcon/people.png')} />
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                                {item?.countPartner}
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>

                            // <TouchableOpacity
                            //     key={item?._id}
                            //     activeOpacity={0.8}
                            //     onPress={() => _handlePressDetail(item?._id)}
                            //     style={[styles.itemService]}>
                            //     <View style={[styles.leftService]}>
                            //         {item?.representationFileIdArr.length > 0 ?
                            //             <Image
                            //                 style={{ width: _moderateScale(80), height: _moderateScale(80) }}
                            //                 resizeMode="cover"
                            //                 source={{ uri: (`${URL_ORIGINAL}/${item?.representationFileArr[0]?.path}`) }} />
                            //             : <Image
                            //                 style={{ width: _moderateScale(80), height: _moderateScale(80) }}
                            //                 resizeMode="cover"
                            //                 source={{ uri: `${URL_AVATAR_DEFAULT}` }} />
                            //         }
                            //     </View>
                            //     <View style={[styles.rightService]}>
                            //         <Text style={[styles.nameService]}>
                            //             {item?.name}
                            //         </Text>
                            //         <Text style={[styles.briefService]} numberOfLines={2}>
                            //             {item?.description}
                            //         </Text>
                            //         <View style={[styles.bottomService]}>
                            //             <View style={{ flexDirection: 'row' }}>
                            //                 <Text style={[styles.priceService]}>
                            //                     {formatMonney(item?.price)}
                            //                 </Text>
                            //                 <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: Color.PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                            //             </View>
                            //         </View>
                            //     </View>
                            // </TouchableOpacity>
                        )
                    })
                }
                {/* <View style={{ height: 50 }} /> */}
                {
                    listService?.length % 2 !== 0 ? 
                    <View style={[styles.btnService,{backgroundColor:'transparent'}]}/>
                    :<></>
                }
            </ScrollView>

            <View style={{ width: '100%', height: 10, position: 'absolute', bottom: -5, backgroundColor: WHITE }} />
        </View>
    );
});

const styles = StyleSheet.create({

    itemService: {
        marginBottom: _moderateScale(12),
        marginHorizontal: _moderateScale(16),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: BG_GREY_OPACITY_3
    },
    leftService: {
        width: _moderateScale(80),
        height: _moderateScale(80),
        // backgroundColor: BASE_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        overflow: 'hidden'
    },
    rightService: {
        paddingBottom: _moderateScale(12),
        paddingHorizontal: _moderateScale(12),
        flex: 1
    },
    nameService: {
        fontSize: _moderateScale(16),
        color: Color.BASE_COLOR,
        ...stylesFont.fontNolanBold,
        marginBottom: _moderateScale(4)
    },
    briefService: {
        color: GREY,
        fontSize: _moderateScale(12),
        marginBottom: _moderateScale(4)
    },
    priceService: {
        fontSize: _moderateScale(16),
        ...stylesFont.fontDinTextProBold,
        color: Color.PRICE_ORANGE,
        opacity: 0.8
    },
    bottomService: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionService: {
        flexDirection: 'row',
        paddingTop: _moderateScale(4)
    },
    wave: {
        width: "100%",
        height: _moderateScale(8 * 4.5),
        backgroundColor: Color.BG_BEAUTY_OPACITY_2,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4.5 - 1)
    },
    btnChoice__text: {
        fontSize: _moderateScale(12),
        color: WHITE,
        bottom: _moderateScale(1)
    },
    btnChoice: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: Color.SECOND_COLOR,
        marginRight: _moderateScale(8 * 2)
    },
    price: {
        paddingHorizontal: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(4),
        backgroundColor: Color.SECOND_COLOR,
        position: 'absolute',
        left: _moderateScale(8 * 2),
        height: _moderateScale(8 * 3.5),
        justifyContent: 'center',
        alignItems: 'center',
        top: -_moderateScale(8 * 3.5 / 2)
    },
    btnService: {
        width: _widthScale(8 * 19),
        // height:_heightScale(8*),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 1),
        marginTop:_moderateScale(8*2),
        // marginRight: _moderateScale(8 * 2),
        // borderWidth: 1,
        // borderColor: BG_GREY_OPACITY_5,
        backgroundColor: 'rgba(7,140,127,0.8)',
        backgroundColor: '#158C80',
        backgroundColor: 'white'
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 1
}



export default ListService;