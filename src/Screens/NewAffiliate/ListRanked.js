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
import { getListRankedAffiliate } from '../../Redux/Action/Affiilate'
import { URL_ORIGINAL } from '../../Constant/Url'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const HEIGHT_RANKED_1 = _moderateScale(8 * 16)
const HEIGHT_RANKED_2 = _moderateScale(8 * 10)
const HEIGHT_RANKED_3 = _moderateScale(8 * 7)

const ListRanked = () => {

    const heightRanked1 = useSharedValue(0);
    const heightRanked2 = useSharedValue(0);
    const heightRanked3 = useSharedValue(0);

    const { top } = useSafeAreaInsets()

    const [listRankedAffiliate, setListRankedAffiliate] = useState([])

    useEffect(() => {
        _getListRanked()
    }, [])

    useEffect(() => {
        if (listRankedAffiliate?.length > 0) {
            startAnimHeight()
        }
    }, [listRankedAffiliate])

    const _getListRanked = async () => {
        let result = await getListRankedAffiliate({
            "page": 1,
            "limit": 10
        })
        console.log({ result });
        setListRankedAffiliate(result?.data?.data)
    }

    const startAnimHeight = () => {

        heightRanked1.value = withTiming(HEIGHT_RANKED_1, { duration: 700 })
        heightRanked2.value = withTiming(HEIGHT_RANKED_2, { duration: 700 })
        heightRanked3.value = withTiming(HEIGHT_RANKED_3, { duration: 700 })
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


        if (index < 3) {
            return (
                <></>
            )
        } else {
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
                            {index + 1}
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
                            source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }} />
                        <View style={{ marginLeft: _moderateScale(8) }}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: GREY_FOR_TITLE }}>
                                {item?.name}
                            </Text>
                            <View style={{ height: 8 }} />
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: PRICE_ORANGE }}>
                                {item?.liaPoint}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }


    }


    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: top
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

            <FlatList
                data={listRankedAffiliate}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => {
                    return (
                        <View style={{ height: 200 }} />
                    )
                }}
                ListHeaderComponent={() => {
                    return (
                        <View style={[{ height: 400, backgroundColor: WHITE, flexDirection: 'row' }]}>
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
                                            uri: `${URL_ORIGINAL}${listRankedAffiliate[1]?.fileAvatar?.link}`
                                        }} />
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                                        {
                                            listRankedAffiliate[1]?.name
                                        }
                                    </Text>
                                    <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                                        {
                                            listRankedAffiliate[1]?.liaPoint
                                        }
                                    </Text>
                                    <Animated.View style={[styles.box, {
                                        backgroundColor: "#3081B4",
                                    }, animHeightRanked2]}>
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
                                                uri: `${URL_ORIGINAL}${listRankedAffiliate[0]?.fileAvatar?.link}`
                                            }} />
                                    </View>
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                                        {
                                            listRankedAffiliate[0]?.name
                                        }
                                    </Text>
                                    <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                                        {
                                            listRankedAffiliate[0]?.liaPoint
                                        }
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
                                            uri: `${URL_ORIGINAL}${listRankedAffiliate[2]?.fileAvatar?.link}`
                                        }} />
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: WHITE, marginTop: _moderateScale(4) }}>
                                        {
                                            listRankedAffiliate[2]?.name
                                        }
                                    </Text>
                                    <Text style={{ ...stylesFont.fontDinTextProBold, fontSize: _moderateScale(16), color: "#FB4800" }}>
                                        {
                                            listRankedAffiliate[2]?.liaPoint
                                        }
                                    </Text>
                                    <Animated.View style={[styles.box, {
                                        backgroundColor: "#137111",
                                        // height: 
                                    }, animHeightRanked3]}>
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
