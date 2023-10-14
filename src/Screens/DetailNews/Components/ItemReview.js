import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { _moderateScale } from '../../../Constant/Scale';
import { WHITE, GREY, BG_GREY_OPACITY_9, BLUE_FB } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import CountStar from '../../../Components/CountStar/index'
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import { sizeIcon } from '../../../Constant/Icon';


const ItemReview = memo((props) => {

    const renderStatus = (type) =>{
        switch (type) {
            case 'GOOD':
                return <View style={[styles.statusOfPartner]}>
                    <Text style={{color: BG_GREY_OPACITY_9  }}>| </Text>
                            <Image
                                resizeMode={'stretch'}
                                style={[sizeIcon.xs]}
                                source={require('../../../Icon/a_fb_1.png')}
                            />
                            <Text style={[stylesFont.fontNolan, 
                                {marginLeft: _moderateScale(4), color: BLUE_FB,fontSize: _moderateScale(12)}]}>Hài lòng</Text>
                        </View>
                break;

            case 'NOT_GOOD':
                return <View style={[styles.statusOfPartner]}>

                            <Text style={{color: BG_GREY_OPACITY_9  }}>| </Text>
                            <Image
                                resizeMode={'stretch'}
                                style={[sizeIcon.xs]}
                                source={require('../../../Icon/a_fb_2.png')}
                            />
                            <Text style={[stylesFont.fontNolan, 
                                {marginLeft: _moderateScale(4), color: BLUE_FB,fontSize: _moderateScale(12)}]}>Chưa hài lòng</Text>
                        </View>
                break;

            case 'BAD':
                return <View style={[styles.statusOfPartner]}>
                    <Text style={{color: BG_GREY_OPACITY_9  }}>| </Text>
                            <Image
                                resizeMode={'stretch'}
                                style={[sizeIcon.xs]}
                                source={require('../../../Icon/a_fb_3.png')}
                            />
                            <Text style={[stylesFont.fontNolan, 
                                {marginLeft: _moderateScale(4), color: GREY,fontSize: _moderateScale(12)}]}>Không hài lòng</Text>
                        </View>
                break;
        
            default:
                break;
        }
    }

    return (
        <TouchableOpacity style={[styles.btnReview]}>
            <Image
                style={[styles.avatar]}
                source={{
                    uri: `${props?.data?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}`
                }} />
            <View style={{ flex: 1, marginLeft: _moderateScale(8 * 2) }}>
                <View styles={{backgroundColor:'red'}}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                        {props?.data?.partner?.name}
                    </Text>
                    {renderStatus(props?.data?.reaction)}
                </View>
                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY }]}>
                    {props?.data?.serviceReview?.comment}
                </Text>
                <View style={{alignItems:'flex-end'}}>
                    <View style={[styles.lineStar]}> 
                    {
                        [1, 2, 3, 4, 5]?.map((star, index) => {
                            if(star <= props?.data?.serviceReview?.rating )
                            {
                                return <Image
                                        resizeMode={'stretch'}
                                        style={[sizeIcon.xxxxs]}
                                        source={require('../../../Icon/a_star.png')}
                                    />
                            }
                            else
                            {
                                    return <Image
                                        resizeMode={'stretch'}
                                        style={[sizeIcon.xxxxs]}
                                        source={require('../../../Icon/i_star.png')}
                                    />
                            }
                        })
                    } 
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    btnReview: {
        marginBottom: _moderateScale(8),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        padding: _moderateScale(8 * 2),
        flexDirection: 'row'
    },
    avatar: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8)
    },
    statusOfPartner:{
        flexDirection:'row',
    },
    lineStar:{
        flexDirection:'row',
        marginRight: _moderateScale(6)
    },
    contentBrief:{
        marginVertical: _moderateScale(4)
    }
})

export default ItemReview;