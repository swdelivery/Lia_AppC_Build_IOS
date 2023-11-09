import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, GREY } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';



const CountLikeAndComment = (props) => {
    return (
        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginHorizontal: _moderateScale(8 * 1.5), marginVertical: _moderateScale(8) }]}>
            <TouchableOpacity style={[styleElement.rowAliCenter]}>

                <View style={[
                    {
                        width: _moderateScale(8 * 2.5),
                        height: _moderateScale(8 * 2.5),
                        borderRadius: _moderateScale(8 * 2.5 / 2),
                        // backgroundColor: BASE_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }
                ]}>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={gradient.color}
                        style={gradient.container}>
                        <Image style={sizeIcon.xxxs} source={require('../../../Icon/like_fill_white.png')} />
                    </LinearGradient>
                </View>
                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(8), color: GREY }]}>
                    {props?.countLike} lượt thích
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                disabled
                onPress={() => {
                    navigation.navigate(ScreenKey.MODAL_COMMENT_POST, { postId: props.data._id })
                }}>
                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                    {props?.countComment} bình luận
                        </Text>
            </TouchableOpacity>
        </View>
    );
}



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.68,

    elevation: 1.5
}



const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        BASE_COLOR,
        'rgba(104, 47, 144,.4)'
    ]
}





export default memo(CountLikeAndComment);