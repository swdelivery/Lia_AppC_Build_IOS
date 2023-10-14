import moment from 'moment';
import React, { memo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK, BLUE_FB, GREY, GREY_FOR_TITLE, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width } from "../../../Constant/Scale";
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';
import ImageView from "react-native-image-viewing";
import Carousel from 'react-native-snap-carousel';


const ItemDiary = (props) => {

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    const [indexSlider, setIndexSlider] = useState(0)
    

    return (
        <View
            // onPress={_handleNavigateToInfoBooking}
            style={styles.card}>

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

            <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ScreenKey.UPDATE_PARTNER_DIARY_DAILY, { partnerDaily: props?.data })}

                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                    <Text style={{
                        fontSize: _moderateScale(16),
                        fontWeight: '500',
                        color: SECOND_COLOR
                    }}>{moment(props?.data?.date).format('DD-MM-YYYY')}</Text>
                    <View

                    >
                        <Image source={require('../../../Icon/arrowRight_grey.png')}
                            style={[sizeIcon.xs]}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{ height: _moderateScale(8 * 2) }} />
             

                    <View style={[styleElement.rowAliCenter]}>
                            <Carousel
                            layout={Platform.OS =='ios' ? 'stack' : 'default'}
                            data={props?.data?.images}
                            renderItem={({ item, index }) => {
                            return (
                                <View
                                //  onMoveShouldSetResponderCapture={() => true}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowImageViewing(true)
                                            setIndexCurrImageView(index)
                                            setListImagesSeeCurr(props?.data?.images)
                                        }}
                                        activeOpacity={1}
                                        style={{
                                        
                                        }}>

                                        <Image style={{
                                            width: _moderateScale(_width),
                                            height: _moderateScale(_width/16*9),
                                        }} source={{ uri: `${URL_ORIGINAL}${item?.link}` }} />

                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        sliderWidth={_width}
                        itemWidth={_width}
                        onSnapToItem={(index) => setIndexSlider(index)}
                        />
                        {props?.data?.images.length>0&&<Text style={{position:'absolute',
                        zIndex: 999,
                        bottom: 0,
                        paddingHorizontal: 4,
                        backgroundColor: GREY, color: WHITE,
                        }}>{indexSlider+1}/{props?.data?.images.length}</Text>}
                    </View>
           

                <View style={{ marginTop: _moderateScale(8) }}>
                    <Text numberOfLines={2} style={{ fontSize: _moderateScale(14), color: GREY }}>
                        {props?.data?.description}
                    </Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
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
        paddingVertical: _moderateScale(8 * 2)
    },
    rowImage: {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    itemImage: {
        width: _moderateScale(72),
        height: _moderateScale(72),
        borderWidth: _moderateScale(0.5),
        borderColor: GREY,
        // margin: _moderateScale(4),
        borderStyle: 'dotted',
        borderRadius: _moderateScale(8),
        marginRight: _moderateScale(6),
        marginBottom: _moderateScale(6),
        overflow: 'hidden'
    }
})

export default ItemDiary;