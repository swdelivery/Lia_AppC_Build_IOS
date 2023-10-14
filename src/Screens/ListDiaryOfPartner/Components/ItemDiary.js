import { isEmpty } from 'lodash-es';
import moment from 'moment';
import React, { memo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK, BLACK_OPACITY_7, BLACK_OPACITY_8, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width } from "../../../Constant/Scale";
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';
import Store from '../../../Redux/Store'
import Carousel from 'react-native-snap-carousel';
import ImageView from "react-native-image-viewing";

const ItemDiary = (props) => {

    const [indexSliderBefore, setIndexSliderBefore] = useState(0)
    const [indexSliderAfter, setIndexSliderAfter] = useState(0)

    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])

    const _handleDetail = () =>{
        // Store.dispatch({
        //     type: "SET_CURRENT_PARTNER_DIARY",
        //     payload: props?.data
        // })
        // Store.dispatch({
        //     type: "SET_CURRENT_PARTNER_DIARY_DAILY",
        //     payload: props?.data?.dailyDiaryArr
        // })
        navigation.navigate(ScreenKey.EDIT_DIARY,{diaryId: props?.data?._id})
        // navigation.navigate(ScreenKey.LIST_PARTNER_DIARY_CHILD)
    }

    return (<>
    <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

        <TouchableOpacity
        onPress={_handleDetail}
            style={styles.card}>
            <View style={[{ paddingHorizontal: _moderateScale(8 * 2),  flexDirection: 'row' }]}>
                <View style={{ marginLeft: _moderateScale(0), flex: 1 }}>
                   
                    <Text style={[styles.title, {fontSize: _moderateScale(16), 
                        fontWeight: '600',
                        color: BASE_COLOR, fontWeight: '500'}]}>
                        {props?.index + 1}. {props?.data?.serviceName}</Text>

                    <Text style={[stylesFont.fontNolan, 
                            { marginLeft: _moderateScale(0), flex: 1, 
                            fontSize: _moderateScale(13), color: GREY_FOR_TITLE }]}>
                            {
                                `${moment(props?.data?.created).format('DD/MM/YYYY')}`
                            }
                    </Text>
                </View>
                
            </View>
            

            {
                props?.data?.imageBeforeTreatment?.length > 0 && props?.data?.imageAfterTreatment?.length > 0 ? 

            <View style={{flexDirection:'row', justifyContent:'center', 
            marginTop:_moderateScale(4),
            overflow:'hidden', height: 150}}>
                    <View style={{flex:0.5,overflow:'hidden', paddingRight:_moderateScale(3)}}>
                    <Carousel
                    layout={Platform.OS =='ios' ? 'stack' : 'default'}
                    data={props?.data?.imageBeforeTreatment}
                    renderItem={({ item, index }) => {
                    return (
                        <View
                        //  onMoveShouldSetResponderCapture={() => true}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setShowImageViewing(true)
                                    setIndexCurrImageView(index)
                                    setListImagesSeeCurr(props?.data?.imageBeforeTreatment)
                                }}
                                activeOpacity={1}
                                style={{
                                   
                                }}>

                                <Image style={{
                                    width: _moderateScale(_width/2-4),
                                    height: '100%',
                                }} source={{ uri: `${URL_ORIGINAL}${item?.link}` }} />

                            </TouchableOpacity>
                        </View>
                    )
                }}
                sliderWidth={_width}
                itemWidth={_width}
                onSnapToItem={(index) => setIndexSliderBefore(index)}
                />

{props?.data?.imageBeforeTreatment.length>0&&<Text style={{position:'absolute',
                        zIndex: 999,
                        bottom: 0,
                        paddingHorizontal: 4,
                        backgroundColor: GREY, color: WHITE,
                        }}>{indexSliderBefore+1}/{props?.data?.imageBeforeTreatment.length}</Text>}
               </View>      
               <View style={{flex:0.5, paddingLeft:_moderateScale(3) }}>
                    <Carousel
                    layout={Platform.OS =='ios' ? 'stack' : 'default'}
                    data={props?.data?.imageAfterTreatment}
                    renderItem={({ item, index }) => {
                        console.log(item?.link)
                    return (
                        <View
                        //  onMoveShouldSetResponderCapture={() => true}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setShowImageViewing(true)
                                    setIndexCurrImageView(index)
                                    setListImagesSeeCurr(props?.data?.imageAfterTreatment)
                                }}
                                activeOpacity={1}
                                style={{
                                   
                                }}>

                                <Image style={{
                                    width:  _moderateScale(_width/2-4),
                                    height: '100%',
                                }} source={{ uri: `${URL_ORIGINAL}${item?.link}` }} />

                            </TouchableOpacity>
                        </View>
                    )
                }}
                sliderWidth={_width}
                itemWidth={_width}
                onSnapToItem={(index) => setIndexSliderAfter(index)}
                />

            {props?.data?.imageAfterTreatment.length>0&&<Text style={{position:'absolute',
                        zIndex: 999,
                        bottom: 0,
                        paddingHorizontal: 4,
                        backgroundColor: GREY, color: WHITE,
                        }}>{indexSliderAfter+1}/{props?.data?.imageAfterTreatment.length}</Text>}
               </View>      
            </View>

            :
            <></>
            }

           
            <View style={styles.line} />

            <View style={{paddingHorizontal: _moderateScale(12), 
                flexDirection: 'row', justifyContent: 'space-between',
                alignContent:'center'}}>
                <Text style={{marginLeft: _moderateScale(4),color: GREY, fontStyle:'italic'}}>
                {`Đã cập nhật ${props?.data?.dailyDiaryArr.length} ngày`}</Text>

                <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                    onPress={_handleDetail}
                    style={[styles.btnAction]}>
                    <Text style={{color: WHITE}}>
                            Cập nhật 
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    btnAction:{
        backgroundColor: SECOND_COLOR,
        marginLeft: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(12), 
        borderRadius: _moderateScale(4)
    },
    line: {
        height: _moderateScale(0.5),
        backgroundColor: BG_GREY_OPACITY_5,
        width: "90%",
        alignSelf: 'center',
        marginVertical: _moderateScale(8 * 2)
    },
    title: {
        ...stylesFont.fontNolan500,
        color: BLACK,
        fontSize: _moderateScale(14),
    },
    avatarService: {
        backgroundColor: BG_GREY_OPACITY_2,
        width: _moderateScale(8 * 7),
        height: _moderateScale(8 * 7),
        borderRadius: _moderateScale(8)
    },
    card: {
        width: '100%',
        // height: _moderateScale(8 * 20),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        marginBottom: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2),
        paddingTop: _moderateScale(8)
    },
    rowImage:{
        flexWrap:'wrap',
        justifyContent:'flex-start'
    },
    itemImage:{
        width: _moderateScale(72),
        height: _moderateScale(72),
        borderWidth: _moderateScale(0.5),
        borderColor: GREY,
         marginRight: _moderateScale(9),
        borderStyle:'dotted',
        borderRadius: _moderateScale(4)
    }
})

export default ItemDiary;