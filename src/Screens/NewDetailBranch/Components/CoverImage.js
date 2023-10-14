import { StyleSheet, Text, View, Image } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width } from '../../../Constant/Scale'

const HEIGHT_COVER_IMAGE = _width * 564 / 1125;

const CoverImage = memo(() => {
    return (
        <View style={styles.coverImage}>
            <Image
                style={styles.coverImage__image}
                source={require('../../../Image/coverBranch.png')}
            />
        </View>
    )
})

export default CoverImage

const styles = StyleSheet.create({
    coverImage__image: {
        width: _width,
        height: HEIGHT_COVER_IMAGE
    },
    coverImage: {
        width: _width,
        height: _moderateScale(8 * 25),
        borderWidth: 1
    }
})