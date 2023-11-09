import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Animated, LayoutAnimation, PanResponder, Easing, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { _width } from '../Constant/Scale';
import { BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, GREY, RED, WHITE } from '../Constant/Color';
import { randomStringFixLengthCode } from '../Constant/Utils';
import Collapsible from 'react-native-collapsible';




const nothing = memo((props) => {

  const translateBottomY = useRef(new Animated.Value(0)).current;

  const [isShowModal, setIsShowModal] = useState(false)

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log({ dy: gestureState.dy });
        if (gestureState.dy < -10) return
        translateBottomY.setValue(gestureState.dy)
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (gestureState?.dy > 100) {
          setIsShowModal(false)
        }
        else {
          Animated.timing(translateBottomY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start()
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  ).current;

  useEffect(() => {
    if (isShowModal) {
      Animated.timing(translateBottomY, {
        toValue: 0,
        duration: 150,
        // easing: Easing.in,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(translateBottomY, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true
      }).start()
    }
  }, [isShowModal])

  return (
    <>
      <View style={{ flex: 1, backgroundColor: WHITE }}>

        <Animated.View style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: 'rgba(0,0,0,0.5)' },
          {
            opacity: translateBottomY.interpolate({
              inputRange: [0, 400],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            })
          }
        ]} />

        {
          isShowModal ?
            <TouchableOpacity
              onPress={() => {
                setIsShowModal(false)
              }}
              activeOpacity={1} style={[StyleSheet.absoluteFillObject, {
                position: 'absolute',

                backgroundColor: 'transparent',
                zIndex: 1
              }]} />
            :
            <></>
        }


        <View style={{ marginTop: 200 }}>
          <TouchableOpacity onPress={() => {
            setIsShowModal(true)
          }}>
            <Text>Show</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setIsShowModal(false)
          }}>
            <Text>hide</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[{
            height: 400,
            width: _width,
            backgroundColor: WHITE,
            position: 'absolute',
            zIndex: 2,
            bottom: -10,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderWidth: 0.5
          },
          {
            transform: [
              {
                translateY: translateBottomY
              },
            ],
          }
          ]}>

          <View style={{ alignItems: 'center', marginTop: 8 }}>
            <View style={{
              width: 60,
              height: 8,
              borderRadius: 16,
              backgroundColor: GREY
            }} />
          </View>

          <ScrollView>
            {
              [1,2,3,4,5,6,1,1,1,1,1,1,1].map((item, index) => {
                return(
                  <View style={{height:50,borderBottomWidth:0.5}}>
                    <Text>
                      {index}. {randomStringFixLengthCode(10)}
                    </Text>
                  </View>
                )
              })
            }
          </ScrollView>

        </Animated.View>
      </View>


    </>
  );
});



export default nothing;