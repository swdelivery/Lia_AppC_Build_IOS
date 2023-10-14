import _ from 'lodash';
import { isEmpty } from 'lodash-es';
import React, { memo, useState, useEffect } from 'react';
import {
    Animated, Image, StyleSheet, Text,
    PanResponder, TouchableOpacity, View
} from 'react-native';
import { BG_BEAUTY, BG_GREY_OPACITY_5, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale } from '../../../Constant/Scale';
import { createPostReaction } from '../../../Redux/Action/PostAction';
import { useDispatch, useSelector } from 'react-redux';
import { stylesFont } from '../../../Constant/Font';


 
var images = [
    { id: "like", img: "http://i.imgur.com/LwCYmcM.gif", imgActive: '../Images/ic_like.png' },
    { id: "love", img: "http://i.imgur.com/k5jMsaH.gif", imgActive: '../Images/love2.png' },
    { id: "haha", img: "http://i.imgur.com/f93vCxM.gif", imgActive: '../Images/haha2.png' },
    { id: "yay", img: "http://i.imgur.com/a44ke8c.gif", imgActive: '../Images/ic_like.png' },
    { id: "wow", img: "http://i.imgur.com/9xTkN93.gif", imgActive: '../Images/wow2.png' },
    { id: "sad", img: "http://i.imgur.com/tFOrN5d.gif", imgActive: '../Images/sad2.png' },
    { id: "angry", img: "http://i.imgur.com/1MgcQg0.gif", imgActive: '../Images/angry2.png' },
];

var _imgLayouts = {}
var _hoveredImg = ""
const ActionFeed = memo((props) => {
    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)


    const [open, setOpen] = useState('')
    const [_imageAnimations, set_ImageAnimations] = useState({
        like: { position: new Animated.Value(75), scale: new Animated.Value(1) },
        love: { position: new Animated.Value(75), scale: new Animated.Value(1) },
        haha: { position: new Animated.Value(75), scale: new Animated.Value(1) },
        yay: { position: new Animated.Value(75), scale: new Animated.Value(1) },
        wow: { position: new Animated.Value(75), scale: new Animated.Value(1) },
        sad: { position: new Animated.Value(75), scale: new Animated.Value(1) },
        angry: { position: new Animated.Value(75), scale: new Animated.Value(1) }
    })

    // const [_imgLayouts, set_ImgLayouts] = useState({})
    const [_scaleAnimation, set_ScaleAnimation] = useState(new Animated.Value(0))
    // const [_hoveredImg, set_HoveredImg] = useState("")
    const [selected, setSelected] = useState('')

    const [_panResponder, set_panResponder] = useState(PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: open,
        onPanResponderMove: (evt, gestureState) => {
            console.log("onPanResponderMove")
          var hoveredImg = getHoveredImg(
            Math.ceil(evt.nativeEvent.locationX)
          );
          if (hoveredImg && _hoveredImg !== hoveredImg) {
                console.log('animateSelected')
               animateSelected(_imageAnimations[hoveredImg]);
          }
          if (_hoveredImg !== hoveredImg && _hoveredImg) {
                console.log('animateFromSelect')
               animateFromSelect(_imageAnimations[_hoveredImg]);
          }
          _hoveredImg = hoveredImg
           // set_HoveredImg(hoveredImg);
          
        },
        onPanResponderRelease: (evt, gestureState) => {
            console.log('onPanResponderRelease')
            console.log("onPanResponderRelease",_hoveredImg)

          if (_hoveredImg) {
            animateFromSelect(_imageAnimations[_hoveredImg]);
          } 
          else {
            close();
          }
        },
    }))

    const openFunc = () => {
        console.log('setOpen')
        Animated.parallel([
            Animated.timing(_scaleAnimation, {
                duration: 100,
                toValue: 1,
            }),
            Animated.stagger(50, getImageAnimationArray(0)),
        ]).start(() => setOpen(true));
    }

    const close = () => {
        setOpen(false)
        console.log('setClose', open)

        //start(cb);
    }


    useEffect(() => {
        console.log('open', open)
        if (open === false) {
            console.log('changeClose')

            // afterClose()
            Animated.stagger(100, [
                Animated.parallel(getImageAnimationArray(55).reverse()),
                Animated.timing(_scaleAnimation, {
                    duration: 100,
                    toValue: 0,
                }),
            ]).start(()=>afterClose())
        }
    }, [open])

    const afterClose = () => {
        console.log('afterClose', _hoveredImg)
        if (!isEmpty(_hoveredImg)) {
            setSelected(_hoveredImg)
        }
        // set_HoveredImg("")
        _hoveredImg  = ""
    }

    const getImageAnimationArray = (toValue) => {
        return images.map((img) => {
            return Animated.timing(_imageAnimations[img.id]?.position, {
                duration: 200,
                toValue: toValue,
            });
        });
    }

    const handleLayoutPosition = (img, position) => {
        if(position?.nativeEvent?.layout)
        {
            _imgLayouts[img] = {
                left: position.nativeEvent.layout.x,
                right: position.nativeEvent.layout.x + position.nativeEvent.layout.width,
            }
        }
    }

    const animateSelected = (imgAnimations) => {
        Animated.parallel([
          Animated.timing(imgAnimations.position, {
            duration: 200,
            toValue: -5,
          }),
          Animated.timing(imgAnimations.scale, {
            duration: 200,
            toValue: 1.4
          })
        ]).start();
      }

    const animateFromSelect = (imgAnimations, cb) => {
        Animated.parallel([
          Animated.timing(imgAnimations.position, {
            duration: 200,
            toValue: 0
          }),
          Animated.timing(imgAnimations.scale, {
            duration: 200,
            toValue: 1
          })
        ]).start(()=>close());
      }

    const getImages = () => {
        return images.map((img, ind) => {
            return (
               
                    <Animated.Image
                        onLayout={e => handleLayoutPosition(img.id, e)}
                        key={img.id}
                        source={{ uri: img.img }}
                        style={[
                            {
                                width: _moderateScale(24),
                                height: _moderateScale(24),
                                borderWidth: 0.5,
                                borderColor: BG_BEAUTY,
                                borderRadius: 32
                            },
                            {
                                transform: [
                                    { scale: _imageAnimations[img.id]?.scale },
                                    { translateY: _imageAnimations[img.id]?.position }
                                ],
                            },
                        ]}
                    />
            );
        })
    }

    const getLikeContainerStyle = () => {
        return {
            transform: [{ scaleY: _scaleAnimation }],
            overflow: open ? "visible" : "hidden",
        };
    }

    const getHoveredImg = (x) => {
        
        return Object.keys(_imgLayouts).find((key) => {
          return (
            x >= _imgLayouts[key].left && x <= _imgLayouts[key].right
          );
        });
      }

    const actionLike = () =>{
        dispatch(createPostReaction({
            postId:  props?.data?._id,
            type: 'LIKE'
        }))
    }

    return (
        <>
            <View style={[styles.curentAction]}>
                {props?.data?.reactionCount>0?
                <>
                <Image
                style={sizeIcon.xs}
                source={require(`../../../Image/reaction/ic_like.png`)} />
                {/* <Image
                style={[sizeIcon.xs, styles.iconAfter,{left: _moderateScale(24+10*1),zIndex:-1}]}
                source={require(`../../../Image/reaction/love2.png`)} />
                <Image
                style={[sizeIcon.xs, styles.iconAfter,{left: _moderateScale(24+10*2), zIndex:-2}]}
                source={require(`../../../Image/reaction/haha2.png`)} /> */}
                    {props?.data?.reaction!==null?
                    <Text style={[stylesFont.fontNolan, 
                        {marginLeft: _moderateScale(4),fontSize: _moderateScale(12)
                        }]}>Bạn,</Text>
                    :<></>}
                    {(props?.data?.reaction!==null&&
                        props?.data?.reactionStatistics?.count - 1>0)
                    ||
                    (props?.data?.reaction==null&&
                        props?.data?.reactionStatistics?.count>0)?
                        <Text style={[stylesFont.fontNolan, 
                            {marginLeft: _moderateScale(4), fontSize: _moderateScale(12)
                            }]}>và {props?.data?.reaction!==null?props?.data?.reactionCount - 1:props?.data?.reactionCount} người khác</Text>
                    :<></>}
                    
                   </>
                   
                :<></>}
            </View>
            <View style={[styles.actionFeed,]}>

                <View style={[styles.containAction]} {..._panResponder.panHandlers} >

                    <Animated.View style={[styles.likeContainer, getLikeContainerStyle()]}>
                        {getImages()}
                    </Animated.View>

                </View>
                <View style={[styles.itemActionFeed]} >

                    <TouchableOpacity
                        onPress={() => actionLike()}
                        onLongPress={()=> openFunc()}
                        style={[styles.itemActionFeed]}>
                        <Image
                            style={[sizeIcon.xs]}
                            source={require('../../../Image/component/like.png')} />
                        <Text style={[styles.titAction]}>
                            Like {selected}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.itemActionFeed]}>
                    <Image
                        style={[sizeIcon.xs]}
                        source={require('../../../Image/component/comment.png')} />
                    <Text style={[styles.titAction]}>
                        Bình luận
                    </Text>
                </View>

            </View>
        </>
    );
});

const styles = StyleSheet.create({
    curentAction:{
        backgroundColor:WHITE,
        marginTop: _moderateScale(6),
        flexDirection:'row',
        paddingHorizontal: _moderateScale(24),
        paddingVertical: _moderateScale(8),
        alignItems:'center',
        position:'relative'
    },
    iconAfter:{
        position:'absolute',
        left: _moderateScale(24),
    },
    containAction:{
        position: "absolute",
                    left: 50,
                    top: 0,
                    backgroundColor: 'red'
    },
    likeContainer: {
        position: 'absolute',
        left: -10, 
        top: -30,
        right: 0,
        padding: 5,
        flex: 1,
        backgroundColor: WHITE,
        borderRadius: _moderateScale(32),
        flexDirection: 'row',
        width: 280,
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        justifyContent: 'space-between',
    },

    ///////8888888/

    actionFeed: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTopWidth: _heightScale(0.5),
        borderBottomWidth: _heightScale(0.5),
        paddingVertical: _moderateScale(8 * 1.5),
        borderColor: BG_GREY_OPACITY_5,
        backgroundColor: WHITE,
        position: 'relative'
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