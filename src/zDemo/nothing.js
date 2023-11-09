import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, ImageBackground, Image, Animated, Easing } from 'react-native'
import { useAsync, useToggle, useWhyDidYouUpdate } from '../UseHooks/UseHooks';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BLACK, RED, WHITE } from '../Constant/Color';
import { _height, _width } from '../Constant/Scale';
import { styleElement } from '../Constant/StyleElement';
import { stylesFont } from '../Constant/Font';



const nothing = props => {


  const widthDynamicIsland = useRef(new Animated.Value(120)).current
  const heightDynamicIsland = useRef(new Animated.Value(35)).current

  const scaleFaceIdIcon = useRef(new Animated.Value(0)).current

  const [modeOn, setModeOn] = useToggle()
  const [modeOn2, setModeOn2] = useToggle()

  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);

  const [showGifFaceId, setShowGifFaceId] = useState(false)

  const counterStyle = {
    fontSize: 16,
    color: "red",
  };

  useEffect(() => {
    // SplashScreen.hide();
  })

  useEffect(() => {
    if (showGifFaceId) {
      // Animated.timing(heightDynamicIsland, {
      //   toValue: 120,
      //   duration: 350
      // }).start(() => {
      //   setTimeout(() => {
      //     setShowGifFaceId(false)
      //   }, 3500);
      // });
      Animated.sequence([
        Animated.timing(heightDynamicIsland, {
          toValue: 120,
          duration: 300,
        }),
        Animated.timing(scaleFaceIdIcon, {
          toValue: 1,
          duration: 1500,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.timing(scaleFaceIdIcon, {
            toValue: 0,
            duration: 200
          }).start(() => {
            setShowGifFaceId(false)
          })
          // setShowGifFaceId(false)
        }, 1700);
      });
    } else {
      Animated.timing(heightDynamicIsland, {
        toValue: 35,
        duration: 250,
        easing: Easing.ease
      }).start(() => { });
      // Animated.sequence([
      //   Animated.timing(heightDynamicIsland, {
      //     toValue: 35,
      //     duration: 350
      //   }),
      // ]).start(() => {});
    }
  }, [showGifFaceId])

  const _handleUnlockPhone = () => {
    setShowGifFaceId(true)
  }


  return (
    <View style={{ flex: 1, backgroundColor: BLACK }}>
      {/* <View style={styles.statusBar} >
        <View style={styles.statusBar__border}/>
      </View> */}


      <ImageBackground imageStyle={{ borderRadius: 32 }} source={{ uri: `https://www.guidingtech.com/wp-content/uploads/Space-Black.jpg` }} style={styles.container}>


        <Animated.View style={[
          styles.dynamicIsland,
          {
            width: widthDynamicIsland,
            height: heightDynamicIsland
          }
        ]}>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={_handleUnlockPhone}
          >
            {
              showGifFaceId ?
                <Animated.View style={[
                  { flex: 1, justifyContent: 'center', alignItems: 'center' },
                  {
                    opacity: scaleFaceIdIcon
                  }
                  // {
                  //   transform: [
                  //     {
                  //       scale: scaleFaceIdIcon
                  //     },
                  //   ],
                  // }
                ]}>
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 16 }}
                    // source={{
                    //   uri: `https://i.pinimg.com/originals/70/a5/52/70a552e8e955049c8587b2d7606cd6a6.gif`
                    // }}
                    // source={require('../Gif/faceID.gif')}
                     />
                </Animated.View>
                :
                <></>
            }
          </TouchableOpacity>

        </Animated.View>

        <View style={styles.statusBar}>
          <View>
            <Text style={{
              ...stylesFont.fontNolanBold,
              fontSize: 18,
              marginLeft: 32
            }}>
              9:41
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 4 }}
              source={{ uri: `https://i.ibb.co/ZcnMMgz/Signal.png` }} />
            <Image
              style={{ width: 20, height: 20, resizeMode: 'contain', marginHorizontal: 4 }}
              source={{ uri: `https://i.ibb.co/s1hxmZ6/Wifi.png` }} />
            <Image
              style={{ width: 40, height: 15, resizeMode: 'contain' }}
              source={{ uri: `https://i.ibb.co/0J49LPL/Group-3.png` }} />

          </View>
        </View>
      </ImageBackground>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: _width,
    height: _height - 34,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    position: 'absolute',
    bottom: 0,
    backgroundColor: WHITE
  },
  dynamicIsland: {
    // width: 120,
    // height: 35,
    backgroundColor: BLACK,
    borderRadius: 32,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 100,
    top: 10
  },
  statusBar__border: {
    height: 40,
    width: _width,
    backgroundColor: WHITE,
    position: 'absolute',
    zIndex: 100,
    top: 40,
    borderTopStartRadius: 64,
    borderTopEndRadius: 64,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  statusBar: {
    width: _width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 16
  }
})


export default nothing;