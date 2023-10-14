import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'
import CountStar2 from '../../../Components/NewCountStar/CountStar'

const NameService = () => {
    return (
        <View style={styles.infoService}>
            <View style={{
                paddingHorizontal: _moderateScale(8 * 1),
                paddingVertical: _moderateScale(4),
                borderRadius: _moderateScale(8),
                backgroundColor: "#FAF0EF",
                alignSelf: 'flex-start'
            }}>
                <Text style={{
                    fontSize: _moderateScale(12),
                    color: 'red'
                }}>
                    Reference site about
                </Text>
            </View>
            <Text style={{
                fontSize: _moderateScale(16),
                fontWeight: 'bold',
                marginTop: _moderateScale(8)
            }}>
                Cắt Mí T2022 - Công nghệ cao
            </Text>

            <CountStar2 />

        </View>
    )
}

export default NameService

const styles = StyleSheet.create({
    infoService: {
        paddingVertical: _moderateScale(8),
        width: _widthScale(360),
        // height: _moderateScale(8 * 20),
        alignSelf: 'center',
        marginTop: _moderateScale(4),
        backgroundColor: 'white',
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 1.5)
    },
})