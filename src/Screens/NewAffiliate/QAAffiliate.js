import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconBackWhite, IconRightArrow } from '../../Components/Icon/Icon'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { _moderateScale } from '../../Constant/Scale'


import Collapsible from 'react-native-collapsible'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { navigation } from '../../../rootNavigation'
import { sizeIcon } from '../../Constant/Icon'
import { getQuestionAnswer } from '../../Redux/Action/InfoAction'

import RenderHTML from '@Components/RenderHTML/RenderHTML'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const ItemQA = (props) => {

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
                alignItems: 'center'
            }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={[stylesFont.fontNolanBold, { flex: 1, color: BASE_COLOR }]}>
                    {props?.indexX + 1}. {props?.data?.question}?
                </Text>

                <Animated.View style={animIcon}>
                    <IconRightArrow style={sizeIcon.sm} />
                </Animated.View>
            </View>

            <Collapsible collapsed={isExpaned}>
                <View style={{ flex: 1 }}>
                    <RenderHTML data={props?.data?.answer} />
                </View>
            </Collapsible>
        </TouchableOpacity>
    )
}

const QANewAffiliate = () => {

    const [listQA, setListQA] = useState([])

    useEffect(() => {
        _getQuestionAnswer()
    }, [])

    const { top } = useSafeAreaInsets();


    const _getQuestionAnswer = async () => {
        let result = await getQuestionAnswer({
            condition: {
                type: {
                    equal: 'collaborator'
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return
        setListQA(result?.data?.data)
    }

    const _renderItem = ({ item, index }) => {
        return (
            <ItemQA data={item} indexX={index} />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: top
                }} />
                <View style={styles.header__box}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => {
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
                data={listQA}
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
