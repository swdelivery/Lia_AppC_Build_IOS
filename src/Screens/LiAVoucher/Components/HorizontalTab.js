import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import { _moderateScale } from '../../../Constant/Scale'
import { BASE_COLOR } from '../../../Constant/Color'
import { IconVoucher } from '../../../Components/Icon/Icon'

const HorizontalTab = memo(() => {

    const [currTab, setCurrTab] = useState('1')

    return (
        <View style={styles.tab}>
            <View style={[styles.tab__child, {
                backgroundColor:"#AF7169",
                borderTopLeftRadius:_moderateScale(8)
            }]}>
                <IconVoucher/>
            </View>
            <View style={styles.tab__child}>

            </View>
            <View style={styles.tab__child}>

            </View>
            <View style={styles.tab__child}>

            </View>
        </View>
    )
})

export default HorizontalTab

const styles = StyleSheet.create({
    tab__child:{
        flex:1,
        backgroundColor:BASE_COLOR
    },
    tab: {
        height: _moderateScale(8 * 8),
        flexDirection:'row'
    }
})