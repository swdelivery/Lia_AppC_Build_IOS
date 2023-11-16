import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { _width } from '@Constant/Scale'
import { URL_ORIGINAL } from '@Constant/Url';
import Image from '@Components/Image';

const HorizontalListImage = memo((props) => {

    const _renderItemImage = ({ item, index }) => {
        return (
            <Image
                style={styles.image}
                avatar={null} />
        )
    }

    return (
        <View>
            <FlatList
                horizontal
                pagingEnabled={true}
                data={[1, 2, 3]}
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
