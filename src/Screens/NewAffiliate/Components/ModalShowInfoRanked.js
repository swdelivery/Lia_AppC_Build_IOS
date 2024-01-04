import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { _height, _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color'
import Animated, { FadeInRight, FadeOut, SlideInRight, runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { IconBackBase, IconBackWhite, IconBook, IconBrone, IconDiamond, IconGold, IconSilver } from '../../../Components/Icon/Icon'
import { sizeIcon } from '../../../Constant/Icon'
import { stylesFont } from '../../../Constant/Font'
import { TabBar, TabView } from 'react-native-tab-view'
import * as Color from '../../../Constant/Color'
import LinearGradient from 'react-native-linear-gradient'
import TabBrone from './TabBrone'
import TabSilver from './TabSilver'
import TabGold from './TabGold'
import TabDiamond from './TabDiamond'
import { getPartnerLevel } from '../../../Redux/Action/InfoAction'
import { getConfigData } from '../../../Redux/Action/OrtherAction'

const ModalShowInfoRanked = memo((props) => {

    const [listPartnerLevel, setListPartnerLevel] = useState([])

    const opacityBackDrop = useSharedValue(0);
    const opacityContainer = useSharedValue(0);
    const scaleContainer = useSharedValue(0);

    const [showChinhsach, setShowChinhsach] = useState(false)
    const [configChinhSach, setConfigChinhSach] = useState({})

    const tranXModal = useSharedValue(0)



    const [routes] = useState([
        { key: 'first', title: 'Đồng' },
        { key: 'second', title: 'Bạc' },
        { key: 'third', title: 'Vàng' },
        { key: 'fouth', title: 'Kim Cương' },
    ]);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        _getPartnerLevel()
        _getConfigChinhSach()
    }, [])

    const _getPartnerLevel = async () => {

        let result = await getPartnerLevel();
        if (result?.isAxiosError) return
        setListPartnerLevel(result?.data?.data)

    }

    const _getConfigChinhSach = async () => {
        let result = await getConfigData("LEVEL_POLICY")
        if (result?.isAxiosError) return
        setConfigChinhSach(result)
    }

    useEffect(() => {

        if (props?.isShow) {
            tranXModal.value = withTiming(-_width, { duration: 300 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {

        }

    }, [props?.isShow])

    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center', marginTop: _moderateScale(0) }}
                {...props}
                indicatorStyle={{ backgroundColor: Color.BASE_COLOR }}
                style={{
                    backgroundColor: Color.WHITE,
                }}
                inactiveColor="grey"
                activeColor={Color.BASE_COLOR}
                labelStyle={[stylesFont.fontNolanBold, {
                    fontSize: _moderateScale(11),
                }]}
                getLabelText={({ route }) => route.title}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <TabBrone data={listPartnerLevel?.find(item => item?.code == "BRONZE")} />
            case 'second':
                return <TabSilver data={listPartnerLevel?.find(item => item?.code == "SILVER")} />
            case 'third':
                return <TabGold data={listPartnerLevel?.find(item => item?.code == "GOLD")} />
            case 'fouth':
                return <TabDiamond data={listPartnerLevel?.find(item => item?.code == "PLATINUM")} />

            default:
                return null;
        }
    };


    const _handleHideModal = () => {
        tranXModal.value = withTiming(0, { duration: 200 }, (fnd) => {
            if (fnd) {
                runOnJS(_hideModal)()
            }
        })
        opacityBackDrop.value = withTiming(0, { duration: 200 })
    }
    const _hideModal = () => {
        props?.onHideModal()
    }


    const animXModal = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: tranXModal.value
                }
            ]
        }
    })
    const animOpacityBackDrop = useAnimatedStyle(() => {
        return {
            opacity: opacityBackDrop.value
        }
    })

    return (
        <>
            {
                props?.isShow ?
                    <View style={{
                        width: _width,
                        height: _height,
                        position: 'absolute',
                        zIndex: 100,
                        // zIndex:10,
                        // backgroundColor:'blue',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>


                        <Animated.View style={[{
                            width: _width,
                            height: _height,
                        }, {
                            backgroundColor: 'rgba(0,0,0,.7)'
                        }, animOpacityBackDrop]}>
                            <TouchableOpacity onPress={() => _handleHideModal()} style={[StyleSheet.absoluteFillObject]} />
                        </Animated.View>


                        <Animated.View style={[{
                            width: _width,
                            position: 'absolute',
                            zIndex: 1,
                            alignItems: 'center',
                            right: -_width
                        }, animXModal]}>
                            <View
                                style={{
                                    width: _widthScale(350),
                                    height: _moderateScale(600),
                                    backgroundColor: WHITE,
                                    borderRadius: _moderateScale(8),
                                }}>

                                {
                                    showChinhsach ?
                                        <>
                                            <View style={styles.header}>
                                                <View style={{ flex: 1 }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowChinhsach(old => !old)
                                                        }}
                                                        style={{}}>
                                                        <IconBackBase style={sizeIcon.lg} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flex: 4, alignItems: 'center' }}>
                                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE }]}>
                                                        Chính sách
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <TouchableOpacity style={{ opacity: 0 }}>
                                                        <IconBook style={sizeIcon.lllg} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ height: _moderateScale(8 * 3) }} />

                                            <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                                                <Text>
                                                    {
                                                        configChinhSach?.value
                                                    }
                                                </Text>
                                            </View>
                                        </>
                                        :
                                        <>
                                            <View style={styles.header}>
                                                <View style={{ flex: 1 }}>
                                                    <TouchableOpacity
                                                        onPress={_handleHideModal}
                                                        style={{}}>
                                                        <IconBackBase style={sizeIcon.lg} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flex: 4, alignItems: 'center' }}>
                                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE }]}>
                                                        Danh sách hạng thành viên
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowChinhsach(old => !old)
                                                        }}
                                                        style={{}}>
                                                        <IconBook style={sizeIcon.lllg} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ height: _moderateScale(8 * 3) }} />


                                            <TabView
                                                renderTabBar={renderTabBar}
                                                swipeEnabled={true}
                                                navigationState={{ index, routes }}
                                                renderScene={renderScene}
                                                onIndexChange={setIndex}
                                                lazy
                                            />
                                        </>
                                }



                            </View>
                        </Animated.View>

                    </View>
                    :
                    <></>
            }
        </>
    )
})


export default ModalShowInfoRanked

const styles = StyleSheet.create({
    titleDetail: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(16),
        color: BASE_COLOR
    },
    boxDetail__text: {
        ...stylesFont.fontNolan500,
        color: WHITE,
        fontSize: _moderateScale(12),
        fontStyle: 'italic'
    },
    boxDetail__textPercent: {
        ...stylesFont.fontNolanBold,
        color: WHITE,
        fontSize: _moderateScale(16)
    },
    boxDetail: {
        flex: 1,
        alignItems: 'center',
        height: _moderateScale(8 * 6),
        justifyContent: 'center',
        borderRadius: _moderateScale(4)
    },
    lineText: {
        width: _moderateScale(340),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: _moderateScale(8),
        alignItems: 'flex-end'
    },
    line: {
        width: _moderateScale(340),
        height: _moderateScale(8),
        alignSelf: 'center',
        borderRadius: _moderateScale(8)
    },
    textRanked: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    iconSizeRanked: {
        width: _moderateScale(8 * 12),
        height: _moderateScale(8 * 12)
    },
    btnBack: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 4 / 2),
        backgroundColor: BASE_COLOR
    },
    header: {
        flexDirection: 'row',
        marginTop: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        alignItems: 'center'

    }

})
