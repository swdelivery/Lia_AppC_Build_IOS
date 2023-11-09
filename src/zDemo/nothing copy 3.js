import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text,TouchableOpacity } from 'react-native';
import { WHITE, BASE_COLOR } from '../Constant/Color';
import Scrollnothing from './nothing copy';
import { TabBar, TabView } from 'react-native-tab-view';
import Scrollnothing2 from './nothing copy 2';
import Header from './header'

const HEADER_HEIGHT = 220;

const nothing = memo((props) => {

  useEffect(()=>{
    // SplashScreen.hide();
  },[])

  const [routes] = useState([
    { key: 'first', title: 'Nhiệm vụ' },
    { key: 'second', title: 'Lịch sử' }
  ]);
  const [index, setIndex] = useState(0);

  const [offset, setOffset] = useState(new Animated.Value(0));

  const [x, setX] = useState(false)

  useEffect(()=>{
    setOffset(old=> old)
  },[index])

  const renderTabBar = (props) => {
    return (
      <TabBar
        tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
        {...props}
        indicatorStyle={{ backgroundColor: BASE_COLOR }}
        style={{
          backgroundColor: WHITE,
        }}
        inactiveColor="grey"
        activeColor={BASE_COLOR}
        // labelStyle={[stylesFont.fontNolan500, {
        //   fontSize: _moderateScale(14),
        // }]}
        getLabelText={({ route }) => route.title}
      />
    )
  }
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Scrollnothing screenProps={{ scrollY: offset }} />;
      case 'second':
        return <Scrollnothing2 screenProps={{ scrollY: offset }} />;

      default:
        return null;
    }
  };


  const translateY = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
            backgroundColor: "grey",
            height: HEADER_HEIGHT,
          },
          { transform: [{ translateY }] },
        ]}
      >
        <Text>Test</Text>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => {
            setX(old => !old)
          }}>
            <Text>Change!</Text>
          </TouchableOpacity>
        </View>
      </Animated.View> */}
      <Header offset={offset} />



      <Animated.View
        style={[
          {
            marginTop: HEADER_HEIGHT,
            flex: 1,
            marginBottom: -HEADER_HEIGHT,
          },
          { transform: [{ translateY }] },
        ]}
      >
        {/* <Scrollnothing
          screenProps={{ scrollY: offset }} /> */}
        <TabView
          renderTabBar={renderTabBar}
          swipeEnabled={true}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          lazy
        />
      </Animated.View>

    </View>
  );
});



export default nothing;