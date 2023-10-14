import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BASE_COLOR, BG_GREY_OPACITY_5, GREY, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { stylesFont } from '../../../Constant/Font'
import { IconGold, IconHelp } from '../../../Components/Icon/Icon'
import Animated, { FadeInRight } from 'react-native-reanimated'

const WIDTH_PROCESS_BAR = _width - _widthScale(8 * 8)

const Banner = memo((props) => {
    return (
        <View style={{ height: 320, justifyContent: 'flex-end', paddingBottom: _moderateScale(8 * 2) }}>
            <LinearGradient
                style={[StyleSheet.absoluteFill]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.8]}
                colors={[BASE_COLOR, 'white',]}
            />
            {/* <Animated.View entering={FadeInRight.delay(200)}> */}

            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {
                    props?.setShowModalInfoRanked(old => !old)
                }}
                style={[styles.banner__box, shadow]}>
                <View style={styles.banner__box__text}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14) }]}>
                        Hạng hiện tại
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            props?.setShowModalInfoRanked(old => !old)
                        }}
                        style={{ position: 'absolute', right: _moderateScale(8 * 2), top: -_moderateScale(8), zIndex: 10 }}>
                        <IconHelp style={{ width: _moderateScale(8 * 4), height: _moderateScale(8 * 4) }} />
                    </TouchableOpacity> 
                </View>

                <View style={{ alignItems: 'center', marginTop: _moderateScale(0) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={[styles.avatarBG__image, { position: 'absolute', top: _moderateScale(8 * 3), zIndex: -1 }]}
                            source={{
                                uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/372761206_3003041226494415_947301934724816680_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=dLzwvbyV4OkAX_RK3oT&_nc_ht=scontent.fhan3-4.fna&oh=00_AfB84FrIGzLQEzKaSS4Shm_uaMgKmp4qPoRQsX1TiNrHug&oe=652AC6D2`
                            }} />
                        <IconGold style={{
                            width: _moderateScale(8 * 13),
                            height: _moderateScale(8 * 13),
                        }} />
                    </View>
                    {/* <ImageBackground
                        style={styles.avatarBG}
                        source={require('../../../Image/affiliate/dong.png')}>
                        <Image
                            style={styles.avatarBG__image}
                            source={{
                                uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/372761206_3003041226494415_947301934724816680_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=dLzwvbyV4OkAX_RK3oT&_nc_ht=scontent.fhan3-4.fna&oh=00_AfB84FrIGzLQEzKaSS4Shm_uaMgKmp4qPoRQsX1TiNrHug&oe=652AC6D2`
                            }} />
                    </ImageBackground> */}

                    <Text style={{ color: GREY_FOR_TITLE, ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), top: -_moderateScale(8) }}>
                        Hạng Vàng
                    </Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: _moderateScale(8 * 3) }}>

                    <View style={styles.processbar}>
                        <View style={{ width: _moderateScale(8 * 7), alignItems: 'flex-start' }}>
                            <View style={{
                                position: 'absolute',
                                top: -_moderateScale(8 * 3.5),
                                zIndex: 10
                            }}>
                                <Text style={{
                                    ...stylesFont.fontNolanBold,
                                    fontSize: _moderateScale(12)
                                }}>
                                    15.000
                                </Text>
                            </View>
                        </View>

                        <View style={styles.processbar__fill}>
                            <View style={styles.processbar__fill__dot}>
                                <View style={{ width: _moderateScale(8 * 7), alignItems: 'center' }}>
                                    <View style={{
                                        position: 'absolute',
                                        top: -_moderateScale(8 * 3),
                                        zIndex:10
                                    }}>
                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            fontSize: _moderateScale(14)
                                            // color: ''
                                        }}>
                                            28.000
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: _moderateScale(8 * 7), right: 0, position: 'absolute', alignItems: 'flex-end', zIndex:10 }}>
                            <Text style={{
                                position: 'absolute',
                                top: -_moderateScale(8 * 3.5),
                                ...stylesFont.fontNolanBold,
                                fontSize: _moderateScale(12)
                                // color: '#831700',
                            }}>
                                30.000
                            </Text>
                        </View>
                    </View>

                    <View style={styles.processbarBottom}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                            Vàng
                        </Text>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                            Kim Cương
                        </Text>
                    </View>
                    <View style={styles.processbarBottom}>

                    </View>

                    <View>
                        <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14) }}>
                            Bạn còn <Text style={stylesFont.fontNolanBold}>2.000</Text> điểm nữa để thăng hạng Kim Cương
                        </Text>
                    </View>

                </View>
            </TouchableOpacity>
            {/* </Animated.View> */}
        </View>
    )
})

export default Banner

const styles = StyleSheet.create({
    processbarBottom: {
        width: WIDTH_PROCESS_BAR,
        marginTop: _moderateScale(8 * 1),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    processbar__fill__dot: {
        width: _moderateScale(8 * 1.5),
        height: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(8 * 1.5 / 2),
        backgroundColor: '#F8C904',
        alignItems: 'center'
    },
    processbar__fill: {
        width: _widthScale(8 * 26),
        height: _moderateScale(8 * .5),
        backgroundColor: '#F8C904',
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    processbar: {
        width: WIDTH_PROCESS_BAR,
        height: _moderateScale(8 * .5),
        backgroundColor: '#C0C0C0',
        borderRadius: _moderateScale(8)
    },
    avatarBG__image: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8 * 8 / 2),
        zIndex: -1
    },
    avatarBG: {
        width: _moderateScale(8 * 13),
        height: _moderateScale(8 * 13),
        alignItems: 'center',
        justifyContent: 'center'
    },
    banner__box__text: {
        alignItems: 'center',
        marginTop: _moderateScale(8 * 2)
    },
    banner__box: {
        width: _width - _widthScale(8 * 4),
        height: _moderateScale(8 * 33),
        marginHorizontal: 30,
        alignSelf: 'center',
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2)
    }
})

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,

    elevation: 5
}
