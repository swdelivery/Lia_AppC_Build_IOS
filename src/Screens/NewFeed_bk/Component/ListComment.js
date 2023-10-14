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
import ItemComment from './ItemComment'

const ItemFeed = memo(function ItemFeed(props) {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    return (
        <> 
                    <View style={[styles.listComment]}>
                        
                       {props?.data?.length>0?
                        <ItemComment data={props?.data[0]}/>
                        :<></>}
                        {/* <ItemComment type='child'/>
                        <ItemComment type='child'/> */}

                            
                        {/* <TouchableOpacity>
                            <Text style={{alignSelf:'center',fontSize: _moderateScale(13), color: BLUE_FB}}>Tải thêm</Text>
                        </TouchableOpacity> */}
                    </View>

        </>
    )
})


const styles = StyleSheet.create({

    ///-----start comment -----//
    listComment:{
        flex:1,
        marginTop: _moderateScale(8*2)
    }
    ///-----end comment-----//
})


export default ItemFeed
