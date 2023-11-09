import React, { Component } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

const HEADER_EXPANDED_HEIGHT = 300
const HEADER_COLLAPSED_HEIGHT = 60


class index extends Component {
    constructor() {
        super()
        this.state = {
            scrollY: new Animated.Value(0)
        }
    } 

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        })
        return (
            <View style={styles.container}>
                <Animated.View style={{ height: headerHeight }} />
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }
                            }
                        }])}
                    scrollEventThrottle={16}>
                    <Text>
                        

                    </Text>
              </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    scrollContainer: {
      padding: 16
    }, 
    title: {
      fontSize: 24,
      marginVertical: 16
    }
  })


export default index;