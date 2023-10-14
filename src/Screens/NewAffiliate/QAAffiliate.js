import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IconBackWhite, IconRightArrow } from '../../Components/Icon/Icon'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { _moderateScale } from '../../Constant/Scale'


import { TabBar, TabView } from 'react-native-tab-view'
import * as Color from '../../Constant/Color'
import { sizeIcon } from '../../Constant/Icon'
import Collapsible from 'react-native-collapsible'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { navigation } from '../../../rootNavigation'



const ItemQA = (data) => {

    const [isExpaned, setIsExpaned] = useState(true)
    const rotateIcon = useSharedValue(0);

    useEffect(() => {
        if (isExpaned) {
            rotateIcon.value = withTiming(0, { duration: 500 })
        } else {
            rotateIcon.value = withTiming(90, { duration: 300 })
        }
    }, [isExpaned])

    const animIcon = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotateIcon.value}deg`
                }
            ]
        }
    })

    return (
        <TouchableOpacity
            onPress={() => {
                setIsExpaned(old => !old)
            }}
            style={{
                padding: _moderateScale(8 * 2),
                borderBottomWidth: .5,
                borderColor: 'rgba(0,0,0,.2)',
                // flexDirection: 'row',
                alignItems: 'center'
            }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={[stylesFont.fontNolanBold, { flex: 1, color: BASE_COLOR }]}>
                    {data?.indexX + 1}. Tôi muốn đăng kí CTV thì phải làm thế nào?
                </Text>

                <Animated.View style={animIcon}>
                    <IconRightArrow style={sizeIcon.sm} />
                </Animated.View>
            </View>

            <Collapsible collapsed={isExpaned}>
                <View style={{ flex: 1, marginTop: _moderateScale(8) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled g industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambledstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled g industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambledstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled g industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                    </Text>
                </View>
            </Collapsible>
        </TouchableOpacity>
    )
}

const QANewAffiliate = () => {

    const _renderItem = ({ item, index }) => {
        return (
            <ItemQA indexX={index} />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: getStatusBarHeight()
                }} />
                <View style={styles.header__box}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                         onPress={()=>{
                            navigation.goBack()
                        }}
                        >
                            <IconBackWhite />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                            Giải đáp thắc mắc
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                    </View>
                </View>
            </View>

            <FlatList
                renderItem={_renderItem}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => {
                    return (
                        <View style={{ height: 200 }} />
                    )
                }}
            />


        </View>
    )
}

export default QANewAffiliate

const styles = StyleSheet.create({
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