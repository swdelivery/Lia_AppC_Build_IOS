import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'

const OverViewFeedBack = memo(() => {
    return (
        <View style={styles.container}>
            <View style={styles.listAvatar}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `https://i.ibb.co/7jbTH44/A-nh-ma-n-hi-nh-2023-09-26-lu-c-14-36-22.png`
                    }} />
                <Image
                    style={styles.image}
                    source={{
                        uri: `https://i.ibb.co/7jbTH44/A-nh-ma-n-hi-nh-2023-09-26-lu-c-14-36-22.png`
                    }} />
                <Image
                    style={styles.image}
                    source={{
                        uri: `https://i.ibb.co/7jbTH44/A-nh-ma-n-hi-nh-2023-09-26-lu-c-14-36-22.png`
                    }} />
            </View>

            <Text style={styles.text}>
                Lorem Ipsum is simply dummy
            </Text>

            <TouchableOpacity>
                <Text style={styles.textFeedback}>
                    {`79 đánh giá >`}
                </Text>
            </TouchableOpacity>


        </View>
    )
})

export default OverViewFeedBack

const styles = StyleSheet.create({
    textFeedback: {
        fontSize: _moderateScale(12)
    },
    text: {
        fontSize: _moderateScale(12),
        fontStyle: 'italic',
        marginLeft: _moderateScale(8),
        flex: 1
    },
    image: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 1.5)
    },
    listAvatar: {
        flexDirection: 'row'
    },
    container: {
        width: _widthScale(360),
        alignSelf: 'center',
        marginTop: _moderateScale(8),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8),
        backgroundColor: 'white',
        borderRadius: _moderateScale(8),
        flexDirection: 'row',
        alignItems: 'center',
    }
})