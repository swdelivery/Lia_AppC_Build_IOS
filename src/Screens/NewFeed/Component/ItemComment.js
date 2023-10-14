import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View ,ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BG_GREY_OPACITY_9, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, TITLE_GREY, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import FastImage from '../../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';

const ItemFeed = memo(function ItemFeed(props) {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)


    return (
        <> 
                 {props?.type === 'child'?
                <View style={[styles.itemComment, styles.childComment]}>
                <View style={[styles.leftItemComment]}>
                    <FastImage
                        style={[styles.bannerProfile__avatar]}
                        uri={infoUserRedux?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                    />
                    <View style={[styles.descriptionOfComment]}>
                        <View style={[{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
                            <Text style={[styles.titComment]}>{infoUserRedux?.name}</Text>
                            <Text style={[styles.contentComment],{
                                fontSize: _moderateScale(10),
                                paddingRight: _moderateScale(8)}}>1 ngày trước </Text>
                        </View>
                        <Text style={[styles.contentComment]} 
                            numberOfLines={2}>
                                {props?.data?.content}
                        </Text>
                    </View>
                </View>
                {infoUserRedux?._id === props?.data?.partnerId?
                         <TouchableOpacity style={[styles.moreFeed]}>
                         <Image
                             source={require('../../../Image/component/more.png')} />
                        </TouchableOpacity>
                        :<></>
                        }
            </View>
                 :
                <View style={[styles.itemComment]}>
                            <View style={[styles.leftItemComment]}>
                                <FastImage
                                    style={[styles.bannerProfile__avatar]}
                                    uri={props?.data?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                />
                                <View style={[styles.descriptionOfComment]}>
                                    <View style={[{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
                                        <Text style={[styles.titComment]}>{props?.data?.partner?.name}</Text>
                                        <Text style={[styles.contentComment],{
                                            fontSize: _moderateScale(10),
                                            paddingRight: _moderateScale(8)}}>
                                               {moment(props?.data?.created).fromNow()} 
                                     </Text>
                                    </View>
                                    <Text style={[styles.contentComment]} 
                                        numberOfLines={2}>
                                      {props?.data?.content}
                                    </Text>
                                </View>
                            </View>
                            {/* {infoUserRedux?._id === props?.data?.partnerId?
                         <TouchableOpacity style={[styles.moreFeed]}>
                         <Image
                             source={require('../../../Image/component/more.png')} />
                        </TouchableOpacity>
                        :<></>
                        } */}
                        </View>
                }

                        
                        
        </>
    )
})


const styles = StyleSheet.create({

    bannerProfile__avatar: {
        width: _moderateScale(48),
        height: _moderateScale(48),
        borderRadius: _moderateScale(48),
        borderWidth: _moderateScale(2),
        backgroundColor:WHITE,
        borderColor: WHITE,
    },

    ///-----start comment -----//
    listComment:{
        flex:1,
        marginTop: _moderateScale(8*2)
    },
    itemComment:{
        flexDirection: 'row',
        marginBottom: _moderateScale(8*2),
    },
    childComment:{
        paddingLeft: _moderateScale(8*6)
    },
    leftItemComment:{
        flexDirection: 'row',
        flex:1
    },
    descriptionOfComment:{
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4),
        flex:1
    },
    titComment:{
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    contentComment:{
        color: BLACK_OPACITY_8,
        fontSize: _moderateScale(14),
    },
    ///-----end comment-----//
})


export default ItemFeed
