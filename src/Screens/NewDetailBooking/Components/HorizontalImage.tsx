import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const HorizontalImage = () => {
    return (
        <View style={styles.container}>
            <Image style={styleElement.flex} source={{uri:`http://14.161.18.75:5143/public/service/1700031428278gBJk.png`}} />
        </View>
    )
}

export default HorizontalImage

const styles = StyleSheet.create({
    container: {
        width: _width,
        height: _width * 9 / 16,
        marginBottom:8
    }
})