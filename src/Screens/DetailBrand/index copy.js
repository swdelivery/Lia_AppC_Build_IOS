import React, { memo, useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Animated,
    Text,
    ScrollView,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import InfoBranch from './InfoBranch'
import FeedBackBranch from './FeedBackBranch'

import { BASE_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const HEADER_HEIGHT = 240;
const COLLAPSED_HEIGHT = 52;
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - COLLAPSED_HEIGHT;

const index = memo((props) => {

    const [routes] = useState([
        { key: 'first', title: 'Lịch sử điều trị' },
        { key: 'second', title: 'Thông tin phòng chat' },
    ]);
    const [index, setIndex] = useState(0);

    const scroll = useRef(new Animated.Value(0)).current;

    let listOffset = useRef({});

    useEffect(() => {
        scroll.addListener(({value}) => {
        const curRoute = routes[index].key;
        listOffset.current[curRoute] = value;
        });
        
        return () => {
            scroll.removeAllListeners();
        };
      }, [routes, index]);


    const _renderHeader = (props) => {
        const translateY = scroll.interpolate({
            inputRange: [0, SCROLLABLE_HEIGHT],
            outputRange: [0, -SCROLLABLE_HEIGHT],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View style={[styles.header,{ transform: [{ translateY }] }]}>
                <ImageBackground
                    source={{ uri: 'https://picsum.photos/900' }}
                    style={styles.cover}>
                    <View style={styles.overlay} />
                    {/* <TabBar {...props} style={styles.tabbar} /> */}
                    <TabBar
                        tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
                        {...props}
                        indicatorStyle={{ backgroundColor: BASE_COLOR }}
                        style={{
                            backgroundColor: WHITE,
                        }}
                        inactiveColor="grey"
                        activeColor={BASE_COLOR}
                        labelStyle={[stylesFont.fontDinTextPro, {
                            fontSize: _moderateScale(16),
                        }]}
                        getLabelText={({ route }) => route.title}
                    />
                </ImageBackground>
            </Animated.View>
        );
    }
    // const renderTabBar = (props) => {
    //     return (
    //         <TabBar
    //             tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
    //             {...props}
    //             indicatorStyle={{ backgroundColor: BASE_COLOR }}
    //             style={{
    //                 backgroundColor: WHITE,
    //             }}
    //             inactiveColor="grey"
    //             activeColor={BASE_COLOR}
    //             labelStyle={[stylesFont.fontDinTextPro, {
    //                 fontSize: _moderateScale(16),
    //             }]}
    //             getLabelText={({ route }) => route.title}
    //         />
    //     )
    // }

    const _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <Animated.ScrollView
                        scrollEventThrottle={1}
                        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scroll } } }],
                            { useNativeDriver: true }
                        )}
                        style={{ flex: 1 }}>
                        <Text style={{ height: 100 }}>awd 1</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd 2</Text>

                    </Animated.ScrollView>
                );
            case 'second':
                return (
                    <Animated.ScrollView
                        scrollEventThrottle={1}
                        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scroll } } }],
                            { useNativeDriver: true }
                        )}
                        style={{ flex: 1 }}>
                        <Text style={{ height: 100 }}>b 1</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>awd</Text>
                        <Text style={{ height: 100 }}>b 2</Text>

                    </Animated.ScrollView>
                );
            default:
                return null;
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <TabView
                style={styles.container}
                navigationState={{ index, routes }}
                // renderTabBar={renderTabBar}
                renderScene={_renderScene}
                renderTabBar={_renderHeader}
                onIndexChange={setIndex}
            // initialLayout={initialLayout}
            />
        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .32)',
    },
    cover: {
        height: HEADER_HEIGHT,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    tabbar: {
        backgroundColor: 'rgba(0, 0, 0, .32)',
        elevation: 0,
        shadowOpacity: 0,
    },
});

export default index;