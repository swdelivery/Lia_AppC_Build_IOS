import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import IconRight from '../../../SGV/right.svg'
import IconFind from '../../../SGV/find_grey.svg'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const Search = memo(() => {
    return (
        <View style={[styles.search,shadow]}>
            <View style={{ width: 8 }} />
            <View style={styles.search__option}>
                <Text style={{ fontWeight: '500' }}>
                    Mắt
                </Text>
            </View>
            <TouchableOpacity style={[styles.search_down_icon, {
                transform: [
                    {
                        rotate: '90deg'
                    }
                ]
            }]}>
                <IconRight
                    width={8 * 1.7}
                    height={8 * 1.7} />
            </TouchableOpacity>
            <View style={{ width: 8 }} />

            <TouchableOpacity
            onPress={()=>{
                navigation.navigate("FACE_AI")
                // navigation.navigate(ScreenKey.RESULT_AI_SCAN_EYES)
            }}
            style={styles.search__input}>
                <IconFind
                    width={8 * 2}
                    height={8 * 2} />
                <View style={{ width: 8 }} />
                <Text style={{
                    fontSize:13,
                    color:'#454444'
                }}>
                    Mắt một mí phải làm thế nào?
                </Text>
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
        width: _widthScale(350),
        height: _moderateScale(8 * 4.5),
        borderRadius: 8,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
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