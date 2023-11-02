import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const New = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)'
        }}>
            {/* <Image
                source={{
                    uri: `https://i.ibb.co/4fkY58N/IMG-3419.jpg`
                }}
                style={{
                    flex: 1
                }}

            /> */}

            
                <LottieView
                    speed={1}
                    autoPlay={true}
                    loop={true}
                    style={{ width: 300, height: 300 ,borderWidth:1}}
                    // ref={animationLoadRef}
                    source={require('./src/Json/circleSpin.json')}
                />
            {/* <Text>New</Text> */}
        </View>
    )
}

export default New

const styles = StyleSheet.create({})