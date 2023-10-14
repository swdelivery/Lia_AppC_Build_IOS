import React, { memo, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BG_GREY_OPACITY_5, MAIN_OPACITY_8, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { URL_ORIGINAL } from '../../../Constant/Url';
import ImageView from "react-native-image-viewing";

const ListImage = memo((props) => {

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    console.log('currentTreatmentDiaryRedux', props?.data)

    return (
        <>
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
         <View style={[styles.listImgFeed]}>
             {
                props?.data?.map((item, index)=>{
                return index<4?
                    <TouchableOpacity
                    key={index}
                    onPress={() => {
                        setShowImageViewing(true)
                        setIndexCurrImageView(index)
                        setListImagesSeeCurr(props?.data)
                    }}
                    style={[styles.itemImgFeed]}>
                        <Image 
                        style={[styles.imgFeed]}
                        source={{uri: `${URL_ORIGINAL}${item?.link}`}} />
                        {
                           index===3 && props?.data.length - 4 > 1?
                            <TouchableOpacity
                            onPress={() => {
                                setShowImageViewing(true)
                                setIndexCurrImageView(3)
                                setListImagesSeeCurr(props?.data)
                            }}
                            style={[styles.itemImgMore]}>
                                <Text style={[styles.textMoreImg]}>+{props?.data.length - 4}</Text>
                            </TouchableOpacity>
                            :<></>
                        }  
                    </TouchableOpacity>
                :<></>
             })
             }
            
        </View>
        </>
    );
});

const styles = StyleSheet.create({
    listImgFeed:{
        flexDirection: 'row',
        marginTop: _moderateScale(8*2),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    itemImgFeed:{
        marginRight: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        position:'relative',
        borderRadius: _moderateScale(4)
    },
    imgFeed:{
        width: _widthScale(8*9),
        height: _heightScale(8*9),
        borderRadius: _moderateScale(4)
    },
    itemImgMore:{
        backgroundColor: MAIN_OPACITY_8,
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        borderRadius: _moderateScale(8),
        justifyContent:'center',
        alignItems:'center'
    },
    textMoreImg:{
        fontSize: _moderateScale(28),
        color: WHITE,
        ...stylesFont.fontNolan500
    },
})


export default ListImage;