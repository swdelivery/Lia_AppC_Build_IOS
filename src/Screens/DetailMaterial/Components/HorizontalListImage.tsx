import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { _width } from '@Constant/Scale'
import { URL_ORIGINAL } from '@Constant/Url';

const HorizontalListImage = memo((props) => {

    const { infoMaterial } = props;


    const _renderItemImage = ({ item, index }) => {
        return (
            <Image
                resizeMode='cover'
                style={styles.image}
                source={{ uri: `${URL_ORIGINAL}${item?.link}` }} />
        )
    }

    return (
        <View>

            <FlatList
                horizontal
                pagingEnabled={true}
                data={infoMaterial?.materialFileArr}
                renderItem={_renderItemImage}
            />
        </View>
    )
})

export default HorizontalListImage

const styles = StyleSheet.create({
    image: {
        width: _width,
        height: _width / 2,
        borderWidth: .5,
        borderColor: 'rgba(0,0,0,.3)'
    }
})