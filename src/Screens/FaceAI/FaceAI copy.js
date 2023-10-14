import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { _height, _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale'
import Animated, { Extrapolation, interpolate, runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import RightEffectDotEye from './Components/RightEffectDotEye';
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import RightEffectTextEye from './Components/RightEffectTextEye';
import RightEyeResult from './Components/RightEyeResult';
import LeftEffectDotEye from './Components/LeftEffectDotEye';
import LeftEffectTextEye from './Components/LeftEffectTextEye';
import LeftEyeResult from './Components/LeftEyeResult';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey';


// const PosEyeX = 290;
// const PosEyeY = 490


// const PosEyeX = _widthScale(243);
// const PosEyeY = _heightScale(260)

// const PosEyeX = 245;
// const PosEyeY = 310

// const PosLeftEyeX = 133;
// const PosLeftEyeY = 315

// const PosEyeX = _widthScale(240);
// const PosEyeY = _heightScale(380)

const FaceAI = () => {
  const device = useCameraDevice('front')
  const refCamera = useRef(null)


  const [PosEyeX, setPosEyeX] = useState(_widthScale(230))
  const [PosEyeY, setPosEyeY] = useState(_heightScale(360))
  const [leftPosEyeX, leftsetPosEyeX] = useState(_widthScale(120))
  const [leftPosEyeY, leftsetPosEyeY] = useState(_heightScale(360))

  const [imageHasTake, setImageHasTake] = useState(null)

  const [flagDoneZoom, setFlagDoneZoom] = useState(false)
  const [startTextEye, setStartTextEye] = useState(false)
  const [startRightResult, setStartRightResult] = useState(false)
  const [endProcessAnimCirleText, setEndProcessAnimCirleText] = useState(false)
  const rotateFlag1 = useSharedValue(0);
  const rotateFlag2 = useSharedValue(0);
  const opacityCircle1 = useSharedValue(0);
  const opacityCircle2 = useSharedValue(0);
  const opacityGridEffect = useSharedValue(0);

  const [leftflagDoneZoom, leftsetFlagDoneZoom] = useState(false)
  const [leftstartTextEye, leftsetStartTextEye] = useState(false)
  const [leftstartRightResult, leftsetStartRightResult] = useState(false)
  const [leftendProcessAnimCirleText, leftsetEndProcessAnimCirleText] = useState(false)
  const leftrotateFlag1 = useSharedValue(0);
  const leftrotateFlag2 = useSharedValue(0);
  const leftopacityCircle1 = useSharedValue(0);
  const leftopacityCircle2 = useSharedValue(0);
  const leftopacityGridEffect = useSharedValue(0);

  const [startLeftAnimEye, setStartLeftAnimEye] = useState(false)


  const scaleImage = useSharedValue(1)
  const tranX = useSharedValue(0);
  const tranY = useSharedValue(0);



  // const flagDoneZoom = useSharedValue(0);



  const [stateX, setStateX] = useState(false)

  useEffect(() => {
    // setImageHasTake(`https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3086&q=80`)
    // setImageHasTake(`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80`)
    // setImageHasTake(`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80`)
  }, [])

  useEffect(() => {
    if (endProcessAnimCirleText) {
      setTimeout(() => {
        scaleImage.value = withTiming(1, {
          duration: 500
        }, (isFinished) => {
          if (isFinished) {
            tranX.value = withTiming(0, {
              duration: 500
            })
            tranY.value = withTiming(0, {
              duration: 700
            })
            runOnJS(_handleDoneAnimRightEye)()
          }
        })
      }, 0);
      // tranX.value = withTiming(-100, { duration: 500 })
      // setStartRightResult(true)
    }
  }, [endProcessAnimCirleText])

  useEffect(() => {
    if (leftendProcessAnimCirleText) {
      opacityGridEffect.value = withTiming(0, { duration: 1000 })
      setTimeout(() => {
        scaleImage.value = withTiming(1, {
          duration: 500
        }, (isFinished) => {
          if (isFinished) {
            tranX.value = withTiming(0, {
              duration: 500
            })
            tranY.value = withTiming(0, {
              duration: 700
            })
            runOnJS(_handleDoneAnimLeftEye)()
          }
        })
      }, 0);
      // tranX.value = withTiming(-100, { duration: 500 })
      // setStartRightResult(true)
      setStartRightResult(true)
      leftsetStartRightResult(true)
    }
  }, [leftendProcessAnimCirleText])

  const _handleDoneAnimRightEye = () => {
    // Alert.alert('awd')
    setPosEyeX(leftPosEyeX)
    setPosEyeY(leftPosEyeY)
    setStartLeftAnimEye(true)
  }
  const _handleDoneAnimLeftEye = () => {
    // Alert.alert('awd')
    // setPosEyeX(133)
    // setPosEyeY(315)
    setStartLeftAnimEye(true)
    setTimeout(() => {
    //   navigation.navigate(ScreenKey.RESULT_AI_SCAN_EYES)
    }, 2000);
  }

  useEffect(() => {
    if (startLeftAnimEye) return
    if (PosEyeX && imageHasTake) {

      setTimeout(() => {
        opacityGridEffect.value = withTiming(0.3, {
          duration: 500
        }, (isFinished) => {

        })
      }, 1500);

      setTimeout(() => {
        tranX.value = withTiming(-(PosEyeX - (_width / 2 - 80 - 5) - (160 / 2)), {
          duration: 500
        })
        tranY.value = withTiming(-(PosEyeY - ((_height / 2 - 80) + 75)), {
          duration: 700
        })
        setTimeout(() => {
          scaleImage.value = withTiming(2, {
            duration: 500
          }, (isFinished) => {
            if (isFinished) {
              runOnJS(_handleDoneAnim)()
            }
          })
        }, 0);

      }, 2000);
    }
  }, [PosEyeX, imageHasTake])

  useEffect(() => {
    if (startLeftAnimEye) {
      setTimeout(() => {
        opacityGridEffect.value = withTiming(0.3, {
          duration: 500
        }, (isFinished) => {
        })
      }, 1500);
      setTimeout(() => {
        tranX.value = withTiming(-(PosEyeX - (_width / 2 - 80 - 5) - (160 / 2)), {
          duration: 500
        })
        tranY.value = withTiming(-(PosEyeY - ((_height / 2 - 80) + 75)), {
          duration: 700
        })
        setTimeout(() => {
          scaleImage.value = withTiming(2, {
            duration: 500
          }, (isFinished) => {
            if (isFinished) {
              runOnJS(_handleDoneAnimLeft)()
            }
          })
        }, 0);
      }, 2000);
    }
  }, [startLeftAnimEye])



  const _handleTakePhoto = async () => {

    const photo = await refCamera.current.takePhoto({
    })
    console.log({photo});
    // alert(photo?.path)
    setImageHasTake(photo?.path);
  }

  const _handleDoneAnim = () => {
    setFlagDoneZoom(true)
  }
  const _handleDoneAnimLeft = () => {
    leftsetFlagDoneZoom(true)
  }

  const _startCircleAnim = () => {

    setStartTextEye(true)

    opacityCircle1.value = withTiming(1, {
      duration: 300
    })
    opacityCircle2.value = withTiming(1, {
      duration: 300
    })

    rotateFlag1.value = withTiming(1, {
      duration: 2000
    }, (isFinished) => {
      if (isFinished) {
        rotateFlag1.value = 0
      }
    })
    rotateFlag2.value = withTiming(1, {
      duration: 2000
    }, (isFinished) => {
      if (isFinished) {
        rotateFlag2.value = 0
        runOnJS(_startCircleAnim)()
      }
    })
  }
  const _startCircleAnimLeft = () => {
    // return
    leftsetStartTextEye(true)

    leftopacityCircle1.value = withTiming(1, {
      duration: 300
    })
    leftopacityCircle2.value = withTiming(1, {
      duration: 300
    })

    leftrotateFlag1.value = withTiming(1, {
      duration: 2000
    }, (isFinished) => {
      if (isFinished) {
        leftrotateFlag1.value = 0
      }
    })
    leftrotateFlag2.value = withTiming(1, {
      duration: 2000
    }, (isFinished) => {
      if (isFinished) {
        leftrotateFlag2.value = 0
        runOnJS(_startCircleAnimLeft)()
      }
    })
  }


  useEffect(() => {
    if (imageHasTake) {

      // setTimeout(() => {
      //   opacityGridEffect.value = withTiming(0.3, {
      //     duration: 500
      //   }, (isFinished) => {

      //   })
      // }, 1500);

      // setTimeout(() => {

      //   tranX.value = withTiming(-(PosEyeX - (_width / 2 - 80 - 5) - (160 / 2)), {
      //     duration: 500
      //   })
      //   tranY.value = withTiming(-(PosEyeY - ((_height / 2 - 80) + 75)), {
      //     duration: 700
      //   })

      //   setTimeout(() => {
      //     scaleImage.value = withTiming(2, {
      //       duration: 500
      //     }, (isFinished) => {
      //       if (isFinished) {

      //         runOnJS(_handleDoneAnim)()
      //       }
      //     })
      //   }, 0);

      // }, 2000);

    }
  }, [imageHasTake])



  const animScaleImage = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleImage.value
        },
        {
          translateX: tranX.value,
        },
        {
          translateY: tranY.value,
        },
      ],
    };
  })

  const animCircle1 = useAnimatedStyle(() => {

    const interpolateRotate = interpolate(rotateFlag1.value, [0, 1], ['0', '360'], {});


    return {
      transform: [{
        rotate: `${interpolateRotate}deg`
      }],
      opacity: opacityCircle1.value
    }
  })
  const animCircle2 = useAnimatedStyle(() => {

    const interpolateRotate = interpolate(rotateFlag2.value, [0, 1], ['0', '360'], {});
    return {
      transform: [{
        rotate: `-${interpolateRotate}deg`
      }],
      opacity: opacityCircle2.value
    }
  })

  const leftanimCircle1 = useAnimatedStyle(() => {

    const interpolateRotate = interpolate(leftrotateFlag1.value, [0, 1], ['0', '360'], {});


    return {
      transform: [{
        rotate: `${interpolateRotate}deg`
      }],
      opacity: leftopacityCircle1.value
    }
  })
  const leftanimCircle2 = useAnimatedStyle(() => {

    const interpolateRotate = interpolate(leftrotateFlag2.value, [0, 1], ['0', '360'], {});
    return {
      transform: [{
        rotate: `-${interpolateRotate}deg`
      }],
      opacity: leftopacityCircle2.value
    }
  })

  const animOpacityGridEffect = useAnimatedStyle(() => {
    return {
      opacity: opacityGridEffect.value
    }
  })

  return (
    <View style={{ flex: 1 }}>

      {
        imageHasTake ?
          <View>


            <RightEyeResult startRightResult={startRightResult} />
            <LeftEyeResult startRightResult={leftstartRightResult} />


            {
              !endProcessAnimCirleText ?
                <View style={{
                  width: 160,
                  height: 160,
                  borderRadius: 16,
                  // borderWidth: 1,
                  position: 'absolute',
                  zIndex: 10,
                  top: _height / 2 - 80,
                  left: _width / 2 - 80,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>

                  <Animated.Image
                    source={require('../../Image/circle.png')}
                    style={[{
                      width: _widthScale(200),
                      height: _widthScale(200),
                      position: 'absolute'
                    }, animCircle1]} />

                  <Animated.Image
                    source={require('../../Image/circle.png')}
                    style={[{
                      width: _widthScale(250),
                      height: _widthScale(250),
                      position: 'absolute'
                    }, animCircle2]} />

                  <View style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    // backgroundColor: 'red',
                    position: 'absolute'
                  }} />
                </View>
                : <></>
            }

            {
              !leftendProcessAnimCirleText ?
                <View style={{
                  width: 160,
                  height: 160,
                  borderRadius: 16,
                  // borderWidth: 1,
                  position: 'absolute',
                  zIndex: 10,
                  top: _height / 2 - 80,
                  left: _width / 2 - 80,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>

                  <Animated.Image
                    source={require('../../Image/circle.png')}
                    style={[{
                      width: _widthScale(200),
                      height: _widthScale(200),
                      position: 'absolute'
                    }, leftanimCircle1]} />

                  <Animated.Image
                    source={require('../../Image/circle.png')}
                    style={[{
                      width: _widthScale(250),
                      height: _widthScale(250),
                      position: 'absolute'
                    }, leftanimCircle2]} />

                  <View style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    // backgroundColor: 'red',
                    position: 'absolute'
                  }} />
                </View>
                : <></>
            }



            <RightEffectTextEye setEndProcessAnimCirleText={setEndProcessAnimCirleText} startTextEye={startTextEye} />
            <LeftEffectTextEye setEndProcessAnimCirleText={leftsetEndProcessAnimCirleText} startTextEye={leftstartTextEye} />


            <Animated.View style={[{
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 1
            }, animOpacityGridEffect]}>

              <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,1)', zIndex: 1 }]} />

              <View style={{
                position: 'absolute',
                alignSelf: 'center',
                top: _moderateScale(8 * 10),
                zIndex: 1
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: _moderateScale(50),
                  fontWeight: 'bold',
                  opacity: .7
                }}>
                  EYE ANALYSIS
                </Text>
              </View>
              {/* <Image
                style={[{
                  width: '100%',
                  height: '100%',
                  zIndex: 2
                },]}
                source={require('../../Image/Portrait_effect.png')} /> */}
            </Animated.View>

            <Animated.View
              style={animScaleImage}>
              <Image
                style={[{
                  width: _width,
                  height: _height,
                },]}
                source={{ uri: `${imageHasTake}` }} />
              <View
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  // backgroundColor: 'green',
                  zIndex: 10,
                  top: PosEyeY,
                  left: PosEyeX
                }} >
                <RightEffectDotEye _startCircleAnim={_startCircleAnim} setFlagDoneZoom={setFlagDoneZoom} flagDoneZoom={flagDoneZoom} PosEyeX={PosEyeY} PosEyeY={PosEyeX} />
                <LeftEffectDotEye _startCircleAnim={_startCircleAnimLeft} setFlagDoneZoom={leftsetFlagDoneZoom} flagDoneZoom={leftflagDoneZoom} PosEyeX={PosEyeY} PosEyeY={PosEyeX} />
              </View>


            </Animated.View>
          </View>
          :
          <View style={{ flex: 1 }}>
            <View style={{
              ...StyleSheet.absoluteFill,
              position: 'absolute',
              borderWidth: 1,
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,.5)'
            }}>

              <View
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'green',
                  zIndex: 10,
                  top: PosEyeY,
                  left: PosEyeX
                }} />
              <View
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'green',
                  zIndex: 10,
                  top: leftPosEyeY,
                  left: leftPosEyeX
                }} />

              <View style={{
                flex: 1, justifyContent: 'center',
                alignItems: 'center'
              }}>

                <Camera
                  ref={refCamera}
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={true}
                  photo={true}
                />
                <View style={{
                  position: 'absolute',
                  top: _heightScale(8 * 15)
                }}>
                  <Text style={{
                    fontSize: _moderateScale(14),
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {`[Hãy đưa trọn gương mặt vào khung hình]`}
                  </Text>
                </View>

                <Animated.Image
                  source={require('../../Image/circle.png')}
                  style={{
                    width: _widthScale(360),
                    height: _widthScale(360)
                  }} />


                <TouchableOpacity
                  onPress={_handleTakePhoto}
                  style={{
                    position: 'absolute',
                    bottom: _heightScale(8 * 10),
                    width: _moderateScale(8 * 10),
                    height: _moderateScale(8 * 10),
                    borderRadius: _moderateScale(8 * 10) / 2,
                    borderWidth: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'white'
                  }}>
                  <View style={{
                    width: _moderateScale(8 * 8),
                    height: _moderateScale(8 * 8),
                    borderRadius: _moderateScale(8 * 8) / 2,
                    backgroundColor: 'white'
                  }}>

                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </View>
      }
    </View>
  )
}

export default FaceAI

const styles = StyleSheet.create({})