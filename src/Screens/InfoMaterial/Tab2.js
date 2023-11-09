import React, { memo, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageView from "react-native-image-viewing";
import { BLACK_OPACITY_8, GREY } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import { URL_ORIGINAL } from '../../Constant/Url';





const Tab2 = memo((props) => {

    const [listTreatmentDetail, setListTreatmentDetail] = useState([])

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    useEffect(() => {
        console.log(props?.data);
    }, [props?.data])



    if (props?.isActiveTab) {
        return (
            <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>


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

                <View style={{ height: _moderateScale(8) }} />
              
             
                <View style={{ flexDirection: 'row', width: "100%", marginTop: _moderateScale(8 * 2),
                    paddingLeft: _moderateScale(8) }}>
                    <ScrollView vertical showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
                        {
                            props?.data?.representationFileArr?.map((itemImage, indexImage) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowImageViewing(true)
                                            setIndexCurrImageView(indexImage)
                                            setListImagesSeeCurr(props?.data?.representationFileArr)
                                        }}
                                        key={indexImage}>
                                        <Image
                                            style={[{
                                                width: _moderateScale(8 * 18),
                                                height: _moderateScale(8 * 24),
                                                borderRadius: _moderateScale(8),
                                                marginRight: _moderateScale(12),
                                                marginBottom: _moderateScale(12)
                                            }]}
                                            source={{ uri: `${URL_ORIGINAL}${itemImage?.link}` }}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    } else {
        return <></>
    }
});


const styles = StyleSheet.create({
    centerTitle: {
        ...stylesFont.fontNolan500,
        alignSelf: 'center',
        fontSize: _moderateScale(13),
        color: GREY,
        fontStyle: 'italic',
        marginTop: _moderateScale(8)
    },
    title: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(16),
        color: BLACK_OPACITY_8
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

    elevation: 3
}

export default Tab2;