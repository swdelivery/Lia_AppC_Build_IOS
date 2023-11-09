import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const CountDownTimer = memo(() => {
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <View style={{
                backgroundColor: 'black',
                paddingHorizontal: 2,
                paddingVertical: 2,
                borderRadius: 4
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                    00
                </Text>
            </View>
            <View style={{ width: 2 }} />
            <View>
                <Text>
                    :
                </Text>
            </View>
            <View style={{ width: 2 }} />
            <View style={{
                backgroundColor: 'black',
                paddingHorizontal: 2,
                paddingVertical: 2,
                borderRadius: 4
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                    30
                </Text>
            </View>
            <View style={{ width: 2 }} />
            <View>
                <Text>
                    :
                </Text>
            </View>
            <View style={{ width: 2 }} />
            <View style={{
                backgroundColor: 'black',
                paddingHorizontal: 2,
                paddingVertical: 2,
                borderRadius: 4
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                    59
                </Text>
            </View>
        </View>
    )
})

export default CountDownTimer

const styles = StyleSheet.create({})