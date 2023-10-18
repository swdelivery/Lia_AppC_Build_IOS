import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import IconRight from '../../../SGV/right.svg'
import IconFind from '../../../SGV/find_grey.svg'
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { WHITE } from '../../../Constant/Color'
import { stylesFont } from '../../../Constant/Font'
import { useSelector } from 'react-redux'
import ModalPickSingleNotSearch from '../../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import { IconArrowDown, IconQRScaner } from '../../../Components/Icon/Icon'
import { sizeIcon } from '../../../Constant/Icon'

const Search = memo((props) => {

    const listServiceGroupRedux = useSelector(state => state.serviceGroupReducer?.listServiceGroup)


    const heightExpandServiceGr = useSharedValue(0)

    const [expandServiceGr, setExpandServiceGr] = useState(false)

    useEffect(() => {
        if (expandServiceGr) {
            heightExpandServiceGr.value = withTiming(_heightScale(300), { duration: 300 })
        } else {
            heightExpandServiceGr.value = withTiming(0, { duration: 300 })
        }
    }, [expandServiceGr])

    const animHeightExpandServiceGr = useAnimatedStyle(() => {
        return {
            height: heightExpandServiceGr.value
        }
    })

    return (
        <View style={{
            flexDirection:'row'
        }}>
            <View style={[styles.search, shadow]}>

                <ModalPickSingleNotSearch
                    hide={() => {
                        setExpandServiceGr(false)
                    }}
                    onSelect={(item) => {
                        // _handleChoiceItemFilter(item)
                        // navigation.navigate(ScreenKey.SEARCHING_HOME)
                        navigation.navigate(ScreenKey.SEARCHING_HOME, { keySearch: item?.name, })
                    }}
                    data={(listServiceGroupRedux?.length > 0) ? listServiceGroupRedux : []} show={expandServiceGr} />


                <View style={{ width: 8 }} />
                <TouchableOpacity
                    onPress={() => {
                        setExpandServiceGr(old => !old)
                    }}
                >
                    <View style={styles.search__option}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12) }]}>
                            Mắt
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setExpandServiceGr(old => !old)
                    }}
                    // onPress={props?.press}
                    style={[styles.search_down_icon, {
                        // transform: [
                        //     {
                        //         rotate: '90deg'
                        //     }
                        // ]
                    }]}>

                    <IconArrowDown style={sizeIcon.sm} />

                    {/* <IconRight
                    width={8 * 1.7}
                    height={8 * 1.7} /> */}
                </TouchableOpacity>
                <View style={{ width: 8 }} />

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.SEARCHING_HOME)
                    }}
                    style={styles.search__input}>
                    <IconFind
                        width={8 * 2}
                        height={8 * 2} />
                    <View style={{ width: 8 }} />
                    <Text style={{
                        fontSize: 13,
                        color: '#454444'
                    }}>
                        Nhập thông tin tìm kiếm
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={{width:_moderateScale(8)}}/>

            <TouchableOpacity style={[{
                height: _moderateScale(8 * 4.5),
                width: _moderateScale(8 * 4.5),
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:WHITE,
                borderRadius:_moderateScale(8)
            },shadow]}>
                <IconQRScaner style={sizeIcon.lg}/>
            </TouchableOpacity>
        </View>
    )
})

const styles = StyleSheet.create({
    search__input: {
        width: 250,
        height: 8 * 3.5,
        borderRadius: 8,
        backgroundColor: '#f0f1f2',
        alignItems: 'center',
        paddingHorizontal: 8,
        flexDirection: 'row'
    },
    search_down_icon: {
        height: 8 * 3,
        width: 8 * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search__option: {
        height: 8 * 4,
        width: 8 * 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        width: _widthScale(310),
        height: _moderateScale(8 * 4.5),
        borderRadius: 8,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}

export default Search