
import React, { memo, useState } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { BASE_COLOR, SECOND_COLOR } from '../../Constant/Color';

const HEADER_MAX_HEIGHT = 160;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const index = memo(function index(props) {

    const [scrollYState, setScrollYState] = useState(new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ))
    const [refreshing, setRefreshing] = useState(false)
    
    const _renderScrollViewContent = () => {
        const data = Array.from({ length: 30 });
        return (
          <View style={styles.scrollViewContent}>
            {data.map((_, i) => (
              <View key={i} style={styles.row}>
                <Text>{i}</Text>
              </View>
            ))}
          </View>
        );
      }

      const scrollY = Animated.add(
        scrollYState,
        Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
      );
      const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
      });
      const titleScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.8],
        extrapolate: 'clamp',
      });
      const titleTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, -8],
        extrapolate: 'clamp',
      });
  

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          // backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYState } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // sử dụng offset cho android
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // sử dụng offset cho IOS
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
          {_renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <Text style={styles.title}>Làm thử hidden header</Text>
        </Animated.View>
      </View>
    );
})


const styles = StyleSheet.create({
        fill: {
          flex: 1,
        },
        content: {
          flex: 1,
        },
        header: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: BASE_COLOR,
          overflow: 'hidden',
          height: HEADER_MAX_HEIGHT,
        },
        bar: {
          backgroundColor: 'transparent',
          marginTop: Platform.OS === 'ios' ? 28 : 38,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        },
        title: {
          color: 'white',
          fontSize: 18,
        },
        scrollViewContent: {
          paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        },
        row: {
          height: 40,
          margin: 16,
          backgroundColor: SECOND_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
        },
})


export default index
