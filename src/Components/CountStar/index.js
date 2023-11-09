import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { styleElement } from '../../Constant/StyleElement';
import { Image, View, Text } from 'react-native';
import { sizeIcon } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import { GREY, WHITE } from '../../Constant/Color';

const index = memo((props) => {
    return (
        <View style={[styleElement.rowAliCenter]}>
            {
                props?.small ?
                    <>
                        {
                            [1, 2, 3, 4, 5].map((item, index) => {
                                if (index > props?.averageRating) {
                                    return (
                                        <Image
                                            key={index}
                                            style={[sizeIcon.xxxs]}
                                            source={require('../../Icon/i_star.png')} />
                                    )
                                }
                                return (
                                    <Image
                                        key={index}
                                        style={[sizeIcon.xxxs]}
                                        source={require('../../Icon/a_star.png')} />
                                )
                            })
                        }
                    </>
                    :
                    <></>
            }
            {
                props?.medium ?
                    <>
                        {
                            [1, 2, 3, 4, 5].map((item, index) => {
                                if (index > props?.averageRating) {
                                    return (
                                        <Image
                                            key={index}
                                            style={[sizeIcon.xs]}
                                            source={require('../../Icon/i_star.png')} />
                                    )
                                }
                                return (
                                    <Image
                                        key={index}
                                        style={[sizeIcon.xs]}
                                        source={require('../../Icon/a_star.png')} />
                                )
                            })
                        }
                    </>
                    :
                    <></>
            }
            {
                props?.large ?
                    <>
                        {
                            [1, 2, 3, 4, 5].map((item, index) => {
                                if (index > props?.averageRating) {
                                    return (
                                        <Image
                                            key={index}
                                            style={[sizeIcon.sm]}
                                            source={require('../../Icon/i_star.png')} />
                                    )
                                }
                                return (
                                    <Image
                                        key={index}
                                        style={[sizeIcon.sm]}
                                        source={require('../../Icon/a_star.png')} />
                                )
                            })
                        }
                    </>
                    :
                    <></>
            }
            {
                props?.forReview ?
                    <>
                        {
                            [1, 2, 3, 4, 5].map((item, index) => {
                                if (index > props?.averageRating) {
                                    return (
                                        <Image
                                            key={index}
                                            style={[sizeIcon.xlllg]}
                                            source={require('../../Icon/i_star.png')} />
                                    )
                                }
                                return (
                                    <Image
                                        key={index}
                                        style={[sizeIcon.xlllg]}
                                        source={require('../../Icon/a_star.png')} />
                                )
                            })
                        }
                    </>
                    :
                    <></>
            }
            {/* {
                [1, 2, 3, 4, 5].map((item, index) => {
                    if (index > 3) {
                        return (
                            <Image
                                style={[sizeIcon.xs]}
                                source={require('../../Icon/i_star.png')} />
                        )
                    }
                    return (
                        <Image
                            style={[sizeIcon.xs]}
                            source={require('../../Icon/a_star.png')} />
                    )
                })
            } */}

            {
                props?.onlyStar ?
                    <></>
                    :
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }, props?.light && { color: WHITE }, props?.large && {fontSize:_moderateScale(14)}]}>
                        ({props?.reviewCount})
                    </Text>
            }

        </View>
    );
});



export default index;