import _ from 'lodash';
import { isEmpty } from 'lodash-es';
import React, { memo, useState, useEffect } from 'react';
import {
    Animated, Image, StyleSheet, Text,
    PanResponder, TouchableOpacity, View
} from 'react-native';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_5, BLUE_FB, GREY, GREY_FOR_TITLE, ORANGE, RED, WHITE } from '../../../Constant/Color';
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
const ActionFeed = ((props) => {
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

    const [_opacityAnimation, set_ScaleAnimation] = useState(new Animated.Value(0))
    const [_transYAnimation, set_TransYAnimation] = useState(new Animated.Value(0))

    const [selected, setSelected] = useState('')

    const openFunc = () => {
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (open === false) {

            Animated.stagger(100, [
                Animated.parallel(getImageAnimationArray(55).reverse()),
                Animated.timing(_opacityAnimation, {
                    duration: 100,
                    toValue: 0,
                }),
            ]).start()
        }
        if (open === true) {
            Animated.parallel([
                Animated.timing(_opacityAnimation, {
                    duration: 200,
                    toValue: 1,
                }),
                Animated.stagger(50, getImageAnimationArray(0)),
            ]).start(() => setOpen(true));
        }
    }, [open])



    const handleReaction = (val) => {
        close()
        console.log('data', props?.data?.reaction?.type, val)
        if(props?.data?.reaction?.type!==val.toUpperCase())
        {
            dispatch(createPostReaction({
                postId: props?.data?._id,
                type: val.toUpperCase()
            }))
        }
    }


    const getImageAnimationArray = (toValue) => {
        return images.map((img) => {
            return Animated.timing(_imageAnimations[img.id]?.position, {
                duration: 200,
                toValue: toValue,
            });
        });
    }


    const getImages = () => {
        return images.map((img, ind) => {
            return (
                <TouchableOpacity
                key={img.id}
                
                onPress={() => handleReaction(img?.id)}>
                    <Animated.Image
                        source={{ uri: img.img }}
                        // source={require(img.imageActive)}
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
                </TouchableOpacity>
            );
        })
    }

    const getLikeContainerStyle = () => {
        return {
            overflow: open ? "visible" : "hidden",
            //transform: [{ scaleY: _opacityAnimation }],
        };
    }

    const actionLike = () => {
        dispatch(createPostReaction({
            postId: props?.data?._id,
            type: 'LIKE'
        }))
    }


    const _reactionRender = (val, index) => {
        switch (val?._id) {
            case 'LIKE':
                return <Image
                key={index}
                    style={[sizeIcon.xs, index > 0 && styles.iconAfter,
                        index > 0 && { left: _moderateScale(16 + 10 * (index+1)), zIndex: -(index+1) }
                    ]}
                    source={require(`../../../Image/reaction/ic_like.png`)} />

            case 'LOVE':
                return <Image
                key={index}
                    style={[sizeIcon.xs, index > 0 && styles.iconAfter,
                        index > 0 && { left: _moderateScale(16 + 10 * (index+1)), zIndex: -(index+1) }
                    ]}
                    source={require(`../../../Image/reaction/love2.png`)} />

            case 'WOW':
                return <Image key={index}
                    style={[sizeIcon.xs, index > 0 && styles.iconAfter,
                        index > 0 && { left: _moderateScale(16 + 10 * (index+1)), zIndex: -(index+1) }
                    ]}
                    source={require(`../../../Image/reaction/wow2.png`)} />

            case 'SAD':
                return <Image key={index}
                    style={[sizeIcon.xs, index > 0 && styles.iconAfter,
                        index > 0 && { left: _moderateScale(16 + 10 * (index+1)), zIndex: -(index+1) }
                    ]}
                    source={require(`../../../Image/reaction/sad2.png`)} />

            case 'HAHA':
                return <Image key={index}
                    style={[sizeIcon.xs, index > 0 && styles.iconAfter,
                        index > 0 && { left: _moderateScale(16 + 10 * (index+1)), zIndex: -(index+1) }
                    ]}
                    source={require(`../../../Image/reaction/haha2.png`)} />

            case 'YAY':
                return <Image key={index}
                    style={[sizeIcon.xs, index > 0 && styles.iconAfter,
                        index > 0 && { left: _moderateScale(16 + 10 * (index+1)), zIndex: -(index+1) }
                    ]}
                    source={require(`../../../Image/reaction/yay2.png`)} />

            case 'ANGRY':
                return <Image key={index}
                    style={[sizeIcon.xs, index > 0 && styles.iconAfter,
                        index > 0 && { left: _moderateScale(16 + 10 * (index+1)), zIndex: -(index+1) }
                    ]}
                    source={require(`../../../Image/reaction/angry2.png`)} />

            default:
                return <></>

        }
    }


    const _reactionActionRender = (val, index) => {
        switch (val?.type) {
            case 'LIKE':
                return <>
                    <Image key={index}
                    style={[sizeIcon.xs]}
                    source={require(`../../../Image/reaction/ic_like.png`)} />
                    <Text style={[styles.titAction,{color: BLUE_FB}]}>
                        {
                        props?.data?.reaction?.type.charAt(0).toUpperCase() + props?.data?.reaction?.type.slice(1).toLowerCase()
                        } 
                    </Text>
                </>

            case 'LOVE':
                return <>
                        <Image key={index}
                        style={[sizeIcon.xs]}
                        source={require(`../../../Image/reaction/love2.png`)} />
                        <Text style={[styles.titAction,{color: BASE_COLOR}]}>
                            {
                            props?.data?.reaction?.type.charAt(0).toUpperCase() + props?.data?.reaction?.type.slice(1).toLowerCase()
                            } 
                        </Text>
                    </>

            case 'WOW':
                return <>
                    <Image key={index}
                    style={[sizeIcon.xs]}
                    source={require(`../../../Image/reaction/wow2.png`)} />
                    <Text style={[styles.titAction,{color: ORANGE}]}>
                        {
                        props?.data?.reaction?.type.charAt(0).toUpperCase() + props?.data?.reaction?.type.slice(1).toLowerCase()
                        } 
                    </Text>
                </>

            case 'SAD':
                return<>
                    <Image key={index}
                    style={[sizeIcon.xs]}
                    source={require(`../../../Image/reaction/sad2.png`)} />
                    <Text style={[styles.titAction,{color: GREY}]}>
                        {
                        props?.data?.reaction?.type.charAt(0).toUpperCase() + props?.data?.reaction?.type.slice(1).toLowerCase()
                        } 
                    </Text>
                </>

            case 'HAHA':
                return <>
                    <Image key={index}
                    style={[sizeIcon.xs]}
                    source={require(`../../../Image/reaction/haha2.png`)} />
                    <Text style={[styles.titAction,{color: BLUE_FB}]}>
                        {
                        props?.data?.reaction?.type.charAt(0).toUpperCase() + props?.data?.reaction?.type.slice(1).toLowerCase()
                        } 
                    </Text>
                </>

            case 'YAY':
                return <>
                    <Image key={index}
                    style={[sizeIcon.xs]}
                    source={require(`../../../Image/reaction/yay2.png`)} />
                    <Text style={[styles.titAction,{color: ORANGE}]}>
                        {
                        props?.data?.reaction?.type.charAt(0).toUpperCase() + props?.data?.reaction?.type.slice(1).toLowerCase()
                        } 
                    </Text>
                </>
            case 'ANGRY':
                return <>
                    <Image key={index}
                    style={[sizeIcon.xs]}
                    source={require(`../../../Image/reaction/angry2.png`)} />
                    <Text style={[styles.titAction,{color: RED}]}>
                        {
                        props?.data?.reaction?.type.charAt(0).toUpperCase() + props?.data?.reaction?.type.slice(1).toLowerCase()
                        } 
                    </Text>
                </>
            
            default:
                return <></>

        }
    }

   
    return (
        <>
            <View style={[styles.curentAction]}>
                {props?.data?.reactionCount > 0 ?
                    <>
                        {props?.data?.reactionStatistics?.map((act, index) => {
                            return index<4?_reactionRender(act, index ):<></>
                        })}
                        {props?.data?.reaction !== null ?
                            <Text style={[stylesFont.fontNolan,
                            {
                                marginLeft: _moderateScale(4+8*(props?.data?.reactionStatistics.length)), fontSize: _moderateScale(12),
                            }]}>Bạn,</Text>
                            : <></>}
                        {(props?.data?.reaction !== null &&
                            props?.data?.reactionStatistics?.length - 1 > 0)
                            ||
                            (props?.data?.reaction == null &&
                                props?.data?.reactionStatistics?.length > 0) ?
                            <Text style={[stylesFont.fontNolan,
                            {
                                marginLeft: _moderateScale(4), fontSize: _moderateScale(12)
                            }]}>và {props?.data?.reaction !== null ? props?.data?.reactionCount - 1 : props?.data?.reactionCount} người khác</Text>
                            : <></>}

                    </>

                    : <></>}
            </View>
            <View style={[styles.actionFeed,]}>

                <View style={[styles.containAction, getLikeContainerStyle()]}>

                    <Animated.View style={[styles.likeContainer, { opacity: _opacityAnimation }]}>
                        {getImages()}
                    </Animated.View>

                </View>
                <View style={[styles.itemActionFeed]} >

                    <TouchableOpacity
                        onPress={() => actionLike()}
                        onLongPress={() => openFunc()}
                        style={[styles.itemActionFeed]}>
                        {
                            !isEmpty(props?.data?.reaction)?
                            _reactionActionRender(props?.data?.reaction)
                            :<>
                            <Image
                            style={[sizeIcon.xs]}
                            source={require('../../../Image/component/like.png')} />
                            <Text style={[styles.titAction]}>
                                Like 
                            </Text>
                            </>
                        }
                        
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
    curentAction: {
        backgroundColor: WHITE,
        marginTop: _moderateScale(6),
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(24),
        paddingVertical: _moderateScale(8),
        alignItems: 'center',
        position: 'relative'
    },
    iconAfter: {
        position: 'absolute',
        left: _moderateScale(24),
    },
    containAction: {
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
        backgroundColor: BG_BEAUTY,
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