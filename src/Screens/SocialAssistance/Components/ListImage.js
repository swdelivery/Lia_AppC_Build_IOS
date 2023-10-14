import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import { WHITE, BLACK_OPACITY_8, BTN_PRICE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY } from '../../../Constant/Color';
import { navigation } from '../../../../rootNavigation';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { sizeIcon } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';
import ScreenKey from '../../../Navigation/ScreenKey'
import { formatMonney } from '../../../Constant/Utils';
import { URL_ORIGINAL } from '../../../Constant/Url';
import ImageView from "react-native-image-viewing";


const ListImage = memo((props) => {

    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [showListImagesSee, setShowListImagesSee] = useState(false)
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    if (props?.isActiveTab) {
        return (
            <View>

                <ImageView
                    images={listImagesSeeCurr?.map(item => {
                        return {
                            uri: `${URL_ORIGINAL}${item?.file?.link}`,
                        }
                    })}

                    onRequestClose={() => {
                        setShowListImagesSee(false)
                    }}
                    imageIndex={indexCurrImageView}
                    visible={showListImagesSee}
                />

                {props?.listImageSocialAssistance?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                console.log({abc:props?.listImageSocialAssistance});
                                
                                setListImagesSeeCurr(props?.listImageSocialAssistance)
                                setShowListImagesSee(true)
                                setIndexCurrImageView(index)
                            }}
                            activeOpacity={0.8}
                            style={{
                                width: "100%",
                                height: _moderateScale(8 * 30),
                                borderWidth: _moderateScale(0.5),
                                marginBottom: _moderateScale(8 * 2),
                                borderColor: BG_GREY_OPACITY_5,
                                borderRadius: _moderateScale(8),
                                overflow: 'hidden'
                            }}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: _moderateScale(8),
                                }}
                                source={{ uri: `${URL_ORIGINAL}${item?.file?.link}` }} />
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    } else {
        return <></>
    }
});



export default ListImage;