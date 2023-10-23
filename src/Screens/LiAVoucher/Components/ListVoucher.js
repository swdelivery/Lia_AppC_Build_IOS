import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const ListVoucher = () => {
    return (
        <View style={styles.container}>
            {/* <Text>ListVoucher</Text> */}
            <LinearGradient
                style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#AF7169', 'white']}
            />
        </View>
    )
}

export default ListVoucher

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})