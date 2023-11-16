import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { _moderateScale } from '@Constant/Scale'
import { BORDER_COLOR, GREY, WHITE } from '@Constant/Color'
import Text from '@Components/Text'

const InputRefCode = () => {

    

    return (
        <View style={styles.container}>
            <View style={styles.topTitle}>
                <Text weight='bold'>Mã giới thiệu</Text>
            </View>
            <View style={{paddingHorizontal:8*3}}>
                <TextInput placeholder='VD: VJSIFOJWS67' />
            </View>
        </View>
    )
}

export default InputRefCode

const styles = StyleSheet.create({
    topTitle: {
        top: -10,
        alignSelf: 'flex-start',
        left: 8 * 2,
        backgroundColor: WHITE,
        paddingHorizontal: 8,
        position: 'absolute'
    },
    container: {
        marginHorizontal: _moderateScale(8 * 2),
        borderWidth: 1,
        height: _moderateScale(8 * 6),
        borderColor: BORDER_COLOR,
        borderRadius: 8,
        justifyContent: 'center'
    }
})