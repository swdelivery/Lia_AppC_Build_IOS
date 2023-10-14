import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'

const MainInfoService = memo(() => {
    return (
        <View style={styles.container}>
            <Text style={styles.tutorial}>
                Thông tin
            </Text>
            <View style={{height:8}}/>
            <Text style={{color:'grey'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </Text>
        </View>
    )
})

export default MainInfoService

const styles = StyleSheet.create({
    tutorial: {
        fontSize: _moderateScale(14),
        fontWeight: 'bold'
    },
    container: {
        width: _widthScale(360),
        minHeight: 200,
        borderRadius: _moderateScale(8),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: _moderateScale(8),
        padding: _moderateScale(8 * 2)
    }
})