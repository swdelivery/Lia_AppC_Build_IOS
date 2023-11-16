import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _moderateScale, _width } from '@Constant/Scale'
import Text from '@Components/Text'
import { BORDER_COLOR, WHITE } from '@Constant/Color'
import LinearGradient from 'react-native-linear-gradient'

const ActionBottom = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnAction}>
                <LinearGradient
                    style={[StyleSheet.absoluteFillObject, { borderRadius: 8, }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={["#01AB84", "#186A57"]}
                />
                <Text color={WHITE} weight='bold' size={14}>
                    Xác nhận lịch hẹn
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActionBottom

const styles = StyleSheet.create({
    btnAction: {
        marginHorizontal: _moderateScale(8 * 2),
        height: _moderateScale(8 * 5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: _moderateScale(8 * 7),
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
        width: _width,
        justifyContent: 'center',
        // alignItems:'center'
    }
})