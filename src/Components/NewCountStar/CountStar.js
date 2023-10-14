import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const CountStar2 = memo((props) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            {/* <Image style={styles.start} source={require('../../../Image/locationRed.png')}/> */}
            <Image style={[styles.star, props?.larger && styles.starLarge]} source={require('../../Image/a_star2.png')} />
            <Image style={[styles.star, props?.larger && styles.starLarge]} source={require('../../Image/a_star2.png')} />
            <Image style={[styles.star, props?.larger && styles.starLarge]} source={require('../../Image/a_star2.png')} />
            <Image style={[styles.star, props?.larger && styles.starLarge]} source={require('../../Image/a_star2.png')} />
            <Image style={[styles.star, props?.larger && styles.starLarge]} source={require('../../Image/a_star2.png')} />
            <Text style={[{
                fontSize: 10,
                marginLeft: 4,

            }, props?.lightContent && { color: 'white' }]}>
                (320)
            </Text>
            <View style={{ width: 8 }} />
            <Text style={[props?.lightContent && { color: 'white' }]}>|</Text>
            <View style={{ width: 8 }} />
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.star} source={require('../../Image/people.png')} />
                <Text style={[{
                    fontSize: 10,
                    marginLeft: 4
                }, props?.lightContent && { color: 'white' }]}>
                    (157)
                </Text>
            </View>
        </View>
    )
})

export default CountStar2

const styles = StyleSheet.create({
    starLarge: {
        width: 8 * 2,
        height: 8 * 2,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    star: {
        width: 8 * 1.75,
        height: 8 * 1.75,
        marginLeft: 1,
        resizeMode: 'contain'
    }
})