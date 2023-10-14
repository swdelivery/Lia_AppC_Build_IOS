import { isEmpty } from 'lodash-es';
import React, { memo, useState, useEffect } from 'react';
import { Animated, Image, StyleSheet, Text,
     PanResponder, TouchableOpacity, View } from 'react-native';
import { BG_BEAUTY, BG_GREY_OPACITY_5, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale } from '../../../Constant/Scale';

var images = [
    { id: "like", img: "http://i.imgur.com/LwCYmcM.gif" },
    { id: "love", img: "http://i.imgur.com/k5jMsaH.gif" },
    { id: "haha", img: "http://i.imgur.com/f93vCxM.gif" },
    { id: "yay", img: "http://i.imgur.com/a44ke8c.gif" },
    { id: "wow", img: "http://i.imgur.com/9xTkN93.gif" },
    { id: "sad", img: "http://i.imgur.com/tFOrN5d.gif" },
    { id: "angry", img: "http://i.imgur.com/1MgcQg0.gif" },
];

const ActionFeed = memo((props) => {

    const [open, setOpen] = useState(true)
    const [_imageAnimations, set_ImageAnimations] = useState({})
    const [_imgLayouts, set_ImgLayouts] = useState({})

    const [_scaleAnimation, set_ScaleAnimation] = useState(new Animated.Value(0))
    const [_hoveredImg, set_HoveredImg] = useState(new Animated.Value(0))
    const [selected, setSelected] = useState('')
    const [_panResponder, set_PanResponder] = useState(PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      }))



    useEffect(() => {
        var data = {}
        images.forEach((img) => {
                data[img.id] = {
                    position: new Animated.Value(55),
                    scale: new Animated.Value(1),
                  };
            })
        set_ImageAnimations(data)    
        console.log('data', data)

        set_PanResponder(PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: openFunc,
            onPanResponderMove: (evt, gestureState) => {
              var hoveredImg = getHoveredImg(
                Math.ceil(evt.nativeEvent.locationX)
              );
      
              if (hoveredImg && _hoveredImg !== hoveredImg) {
                animateSelected(_imageAnimations[hoveredImg]);
              }
              if (_hoveredImg !== hoveredImg && _hoveredImg) {
                animateFromSelect(_imageAnimations[_hoveredImg]);
              }
      
              _hoveredImg = hoveredImg;
            },
            onPanResponderRelease: (evt, gestureState) => {
              if (_hoveredImg) {
                animateFromSelect(
                  _imageAnimations[_hoveredImg],
                //   this.close.bind(this, this.afterClose)
                 'close'
                );
              } else {
                 close()
               // this.close(this.afterClose);
              }
            },
          }))
          
    }, [])

    const openFunc = () =>{
        Animated.parallel([
          Animated.timing(_scaleAnimation, {
            duration: 100,
            toValue: 1,
          }),
          Animated.stagger(50, getImageAnimationArray(0)),
        ]).start(() => setOpen(true));
      }

      const close =  () => {
        // this.setState({ open: false }, () => {
        //     Animated.stagger(100, [
        //         Animated.parallel(this.getImageAnimationArray(55, 0).reverse()),
        //         Animated.timing(this._scaleAnimation, {
        //           duration: 100,
        //           toValue: 0,
        //         }),
        //       ]).start()//start(cb);
        // });
        setOpen(false)
      }
    
      useEffect(() => {
         if(open===false)
         {
            Animated.stagger(100, [
                Animated.parallel(getImageAnimationArray(55, 0).reverse()),
                Animated.timing(_scaleAnimation, {
                  duration: 100,
                  toValue: 0,
                }),
              ]).start(afterClose)//start(cb);
         }
      }, [open])

    const  afterClose = () => {
        if (_hoveredImg) {
            setSelected(_hoveredImg)
        //   setState({
        //     selected: _hoveredImg,
        //   });
        }
    
        _hoveredImg = "";
      }


     const animateSelected =  (imgAnimations) => {
        Animated.parallel([
          Animated.timing(imgAnimations.position, {
            duration: 150,
            toValue: -30,
          }),
          Animated.timing(imgAnimations.scale, {
            duration: 150,
            toValue: 1.8,
          }),
        ]).start();
      }

      const animateFromSelect = (imgAnimations, cb) => {
        Animated.parallel([
          Animated.timing(imgAnimations?.position, {
            duration: 50,
            toValue: 0,
          }),
          Animated.timing(imgAnimations?.scale, {
            duration: 50,
            toValue: 1,
          }),
        ]).start(cb==='close'&&close());
      }

     const getHoveredImg = (x) => {
        return Object.keys(_imgLayouts).find((key) => {
          return (
            x >= _imgLayouts[key].left && x <= _imgLayouts[key].right
          );
        });
      }
    
     const getImageAnimationArray = (toValue) => {
        return images.map((img) => {
          return Animated.timing(_imageAnimations[img.id]?.position, {
            duration: 200,
            toValue: toValue,
          });
        });
      }


     const handleLayoutPosition =  (img, position)=> {
        // this._imgLayouts[img] = {
        //   left: position.nativeEvent.layout.x,
        //   right: position.nativeEvent.layout.x + position.nativeEvent.layout.width,
        // };
        console.log({position})
        set_ImgLayouts(old=> {
            return {
                ...old,
                [img]:{
                    left: position.nativeEvent?.layout.x,
                    right: position.nativeEvent?.layout.x + position.nativeEvent?.layout.width,
                  }
            }
        })
      }
      
     const getImages =  () => {
        return images.map((img) => {
            console.log('_imageAnimations[img.id]', img)
            console.log('_imageAnimations', _imageAnimations)
          return (
            <Animated.Image
              onLayout={e=>handleLayoutPosition(img.id, e)}
              key={img.id}
              source={{ uri: img.img }}
              style={[
                styles.img,
                {
                  transform: [
                    { scale: _imageAnimations[img.id].scale },
                    { translateY: _imageAnimations[img.id].position },
                  ],
                },
              ]}
            />
          );
        });
      }

    const  getLikeContainerStyle =  () => {
        return {
          transform: [{ scaleY: _scaleAnimation }],
          overflow: open ? "visible" : "hidden",
        };
      }
 

    const handleSelect = (val) => {
        console.log('val', val)
    }

    return (
        <>
            <View style={[styles.actionFeed]}>
                <View style={styles.center} {..._panResponder.panHandlers}>
                <Text>Like</Text>
                <Text>You selected: {selected}</Text>
                <Animated.View
                    style={[styles.likeContainer, !isEmpty(_imageAnimations)&&getLikeContainerStyle()]}
                >
                    <View style={styles.borderContainer} />
                    <View style={styles.imgContainer}>{!isEmpty(_imageAnimations)?getImages():<></>}</View>
                </Animated.View>
                </View>
                {/* {open ?
                    <View style={[styles.rowAction]}>
                        {images.map((it, ind) => {
                            return <Image
                                key={ind}
                                style={{
                                    width:_moderateScale(32),
                                    height:_moderateScale(32),
                                    borderWidth: 0.5,
                                    borderColor:BG_BEAUTY,
                                    borderRadius:32
                                }}
                                source={{ uri: it.img }}
                            />
                        })}
                    </View>
                    : <></>}


                <TouchableOpacity
                    onPress={() => setOpen(!open)}
                    style={[styles.itemActionFeed]}>
                    <Image
                        style={[sizeIcon.xs]}
                        source={require('../../../Image/component/like.png')} />
                    <Text style={[styles.titAction]}>
                        Like
                    </Text>
                </TouchableOpacity>
                <View style={[styles.itemActionFeed]}>
                    <Image
                        style={[sizeIcon.xs]}
                        source={require('../../../Image/component/comment.png')} />
                    <Text style={[styles.titAction]}>
                        Bình luận
                    </Text>
                </View> */}
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    likeContainer: {
        position: 'absolute',
        left: -10,
        top: -30,
        padding: 5,
        flex: 1,
        backgroundColor: '#FFF',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 20,
      },
      borderContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 20
      },
      imgContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
      },
      ///////8888888/


    rowAction: {
        position: 'absolute',
        backgroundColor: WHITE,
        borderWidth: _moderateScale(0.5),
        borderColor: BG_BEAUTY,
        flexDirection: 'row',
        paddingVertical: _moderateScale(6),
        paddingHorizontal: _moderateScale(16),
        justifyContent: 'space-between',
        width: 320,
        borderRadius: _moderateScale(23),
        left: 24,
        top: _moderateScale(-40)
    }
    ,
    actionFeed: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTopWidth: _heightScale(0.5),
        borderBottomWidth: _heightScale(0.5),
        marginTop: _moderateScale(6),
        paddingVertical: _moderateScale(8 * 1.5),
        borderColor: BG_GREY_OPACITY_5,
        backgroundColor: WHITE
    },
    itemActionFeed: {
        flexDirection: 'row',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titAction: {
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(4)
    },
})

export default ActionFeed;