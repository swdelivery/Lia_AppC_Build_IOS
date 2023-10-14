import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IconBackWhite, IconCrown } from '../../Components/Icon/Icon'
import { BASE_COLOR, GREY, GREY_FOR_TITLE, PRICE_ORANGE, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { _moderateScale } from '../../Constant/Scale'
import { navigation } from '../../../rootNavigation'
import { styleElement } from '../../Constant/StyleElement'
import LinearGradient from 'react-native-linear-gradient'
import { sizeIcon } from '../../Constant/Icon'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'


const HEIGHT_RANKED_1 = _moderateScale(8 * 16)
const HEIGHT_RANKED_2 = _moderateScale(8 * 10)
const HEIGHT_RANKED_3 = _moderateScale(8 * 7)

const ListRanked = () => {

    const heightRanked1 = useSharedValue(0);
    const heightRanked2 = useSharedValue(0);
    const heightRanked3 = useSharedValue(0);

    useEffect(() => {
        startAnimHeight()
    }, [])

    const startAnimHeight = () => {

        heightRanked1.value = withTiming(HEIGHT_RANKED_1,{duration:700})
        heightRanked2.value = withTiming(HEIGHT_RANKED_2,{duration:700})
        heightRanked3.value = withTiming(HEIGHT_RANKED_3,{duration:700})

        // heightRanked3.value = withTiming(HEIGHT_RANKED_3, { duration: 500 }, (fnd) => {
        //     if(fnd){
        //         heightRanked2.value = withTiming(HEIGHT_RANKED_2, { duration: 500 }, (fnd) => {
        //             if(fnd){
        //                 heightRanked1.value = withTiming(HEIGHT_RANKED_1, { duration: 500 }, (fnd) => {
        //                     if(fnd){
                                
        //                     }
        //                 })
        //             }
        //         })
        //     }
            
        // })
    }


    const animHeightRanked1 = useAnimatedStyle(() => {
        return {
            height: heightRanked1.value
        }
    })
    const animHeightRanked2 = useAnimatedStyle(() => {
        return {
            height: heightRanked2.value
        }
    })
    const animHeightRanked3 = useAnimatedStyle(() => {
        return {
            height: heightRanked3.value
        }
    })

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{
                padding: _moderateScale(8 * 2),
                borderBottomWidth: .5,
                borderColor: 'rgba(0,0,0,.5)'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                        ...stylesFont.fontNolanBold,
                        fontSize: _moderateScale(14)
                    }}>
                        {index + 4}
                    </Text>
                    <Image
                        style={{
                            width: _moderateScale(8 * 7),
                            height: _moderateScale(8 * 7),
                            borderRadius: _moderateScale(8 * 3.5),
                            marginLeft: _moderateScale(8),
                            borderWidth: 3,
                            borderColor: "#FFD9AA"
                        }}
                        source={{ uri: `https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/358053585_829960878488948_9206605280518271114_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=tqLSysHlxQgAX-hBgcc&_nc_ht=scontent.fhan3-3.fna&oh=00_AfDHrWNLQ_XIFJP8RJAjZyyCrF9S7xojO6RKXjHPsZm0Ww&oe=652D2013` }} />
                    <View style={{ marginLeft: _moderateScale(8) }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: GREY_FOR_TITLE }}>
                            Nguyễn Phương Trang
                        </Text>
                        <View style={{ height: 8 }} />
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: PRICE_ORANGE }}>
                            4.900.000 vnd
                        </Text>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: Platform.OS == 'ios' ?  getStatusBarHeight() : 0
                }} />
                <View style={styles.header__box}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconBackWhite />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                            Bảng xếp hạng
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                    </View>
                </View>
            </View>
            {/* <View style={[{ height: 300, backgroundColor: WHITE, flexDirection: 'row' }]}>
                <LinearGradient
                    style={[StyleSheet.absoluteFill]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0, 0.8]}
                    colors={[BASE_COLOR, 'rgba(74, 159, 128,.5)',]}
                />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={[styles.avatar, { borderColor: '#3081B4' }]}
                            source={{
                                uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/372761206_3003041226494415_947301934724816680_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=dLzwvbyV4OkAX_RK3oT&_nc_ht=scontent.fhan3-4.fna&oh=00_AfB84FrIGzLQEzKaSS4Shm_uaMgKmp4qPoRQsX1TiNrHug&oe=652AC6D2`
                            }} />
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                            Lê Thành An
                        </Text>
                        <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                            17.000.000 vnd
                        </Text>
                        <View style={[styles.box, {
                            backgroundColor: "#3081B4",
                        }]}>
                            <View style={[styles.box__text]}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: '#3081B4' }}>
                                    2
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                style={{
                                    width: _moderateScale(8 * 22),
                                    height: _moderateScale(8 * 22),
                                    position: 'absolute',
                                    resizeMode: 'contain',
                                }}
                                source={require('../../Image/multiLine.png')} />
                            <View style={{
                                position: 'absolute',
                                zIndex: 10,
                                top: -_moderateScale(8 * 3)
                            }}>
                                <IconCrown />
                            </View>
                            <Image
                                style={[styles.avatar, { borderColor: '#F1B003' }]}
                                source={{
                                    uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/372761206_3003041226494415_947301934724816680_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=dLzwvbyV4OkAX_RK3oT&_nc_ht=scontent.fhan3-4.fna&oh=00_AfB84FrIGzLQEzKaSS4Shm_uaMgKmp4qPoRQsX1TiNrHug&oe=652AC6D2`
                                }} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                            Lê Thành An
                        </Text>
                        <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                            300.000.000 vnd
                        </Text>
                        <View style={[styles.box, {
                            backgroundColor: "#F1B003",
                            height: _moderateScale(8 * 16),
                        }]}>
                            <View style={[styles.box__text]}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: '#F1B003' }}>
                                    1
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={[styles.avatar, { borderColor: '#137111' }]}
                            source={{
                                uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/372761206_3003041226494415_947301934724816680_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=dLzwvbyV4OkAX_RK3oT&_nc_ht=scontent.fhan3-4.fna&oh=00_AfB84FrIGzLQEzKaSS4Shm_uaMgKmp4qPoRQsX1TiNrHug&oe=652AC6D2`
                            }} />
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                            Lê Thành An
                        </Text>
                        <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                            5.000.000 vnd
                        </Text>
                        <View style={[styles.box, {
                            backgroundColor: "#137111",
                            height: _moderateScale(8 * 7),
                        }]}>
                            <View style={[styles.box__text]}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: '#137111' }}>
                                    3
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View> */}

            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7,8,9,10]}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => {
                    return (
                        <View style={{ height: 200 }} />
                    )
                }}
                ListHeaderComponent={() => {
                    return (
                        <View style={[{ height: 300, backgroundColor: WHITE, flexDirection: 'row' }]}>
                            <LinearGradient
                                style={[StyleSheet.absoluteFill]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                locations={[0, 0.8]}
                                colors={[BASE_COLOR, 'rgba(74, 159, 128,.5)',]}
                            />

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        style={[styles.avatar, { borderColor: '#3081B4' }]}
                                        source={{
                                            uri: `https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/391744604_7475357189148016_5874145266851697024_n.jpg?stp=dst-jpg_p843x403&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=s2yiiIgIfwEAX9wmteh&_nc_ht=scontent.fhan3-2.fna&oh=00_AfD0koeHc0GYkyZ-dqHZIsniJIqVNbgzf9gZRGnmJ8pFJA&oe=652DB4C1`
                                        }} />
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                                        Thuỷ Nguyễn
                                    </Text>
                                    <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                                        17.000.000 vnd
                                    </Text>
                                    <Animated.View style={[styles.box, {
                                        backgroundColor: "#3081B4",
                                    },animHeightRanked2]}>
                                        <View style={[styles.box__text]}>
                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: '#3081B4' }}>
                                                2
                                            </Text>
                                        </View>
                                    </Animated.View>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Image
                                            style={{
                                                width: _moderateScale(8 * 22),
                                                height: _moderateScale(8 * 22),
                                                position: 'absolute',
                                                resizeMode: 'contain',
                                            }}
                                            source={require('../../Image/multiLine.png')} />
                                        <View style={{
                                            position: 'absolute',
                                            zIndex: 10,
                                            top: -_moderateScale(8 * 3)
                                        }}>
                                            <IconCrown />
                                        </View>
                                        <Image
                                            style={[styles.avatar, { borderColor: '#F1B003' }]}
                                            source={{
                                                uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/372761206_3003041226494415_947301934724816680_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=dLzwvbyV4OkAX_RK3oT&_nc_ht=scontent.fhan3-4.fna&oh=00_AfB84FrIGzLQEzKaSS4Shm_uaMgKmp4qPoRQsX1TiNrHug&oe=652AC6D2`
                                            }} />
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                                        Lê Thành An
                                    </Text>
                                    <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                                        300.000.000 vnd
                                    </Text>
                                    <Animated.View style={[styles.box, {
                                        backgroundColor: "#F1B003",
                                        // height: HEIGHT_RANKED_1,
                                    }, animHeightRanked1]}>
                                        <View style={[styles.box__text]}>
                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: '#F1B003' }}>
                                                1
                                            </Text>
                                        </View>
                                    </Animated.View>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        style={[styles.avatar, { borderColor: '#137111' }]}
                                        source={{
                                            uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/387793551_1363889327830195_7992949775810372964_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Qeq-40-CbBYAX9dzCF1&_nc_ht=scontent.fhan3-4.fna&oh=00_AfDuihKm_ROVPuF1H2XqksDSelMedEM8eCSBvkGM5Nidew&oe=652E56DC`
                                        }} />
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                                        Phương Thảo
                                    </Text>
                                    <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                                        5.000.000 vnd
                                    </Text>
                                    <Animated.View style={[styles.box, {
                                        backgroundColor: "#137111",
                                        // height: 
                                    },animHeightRanked3]}>
                                        <View style={[styles.box__text]}>
                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18), color: '#137111' }}>
                                                3
                                            </Text>
                                        </View>
                                    </Animated.View>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />


        </View>
    )
}

export default ListRanked

const styles = StyleSheet.create({
    box__text: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        ...styleElement.centerChild
    },
    box: {
        width: _moderateScale(8 * 12),
        // height: 
        borderTopLeftRadius: _moderateScale(8),
        borderTopRightRadius: _moderateScale(8),
        marginTop: _moderateScale(8),
        ...styleElement.centerChild,
    },
    avatar: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8 * 8) / 2,
        borderWidth: 2,
    },
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
    }
})