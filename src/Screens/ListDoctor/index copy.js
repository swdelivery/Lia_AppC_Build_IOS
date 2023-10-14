import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import * as Color from '../../Constant/Color';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE } from '../../Constant/Color';
import { FONT_DINTEXT_PRO, stylesFont } from '../../Constant/Font';
import { _height, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { ImageBackground, Image, Dimensions } from 'react-native';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import _, { isEmpty } from 'lodash';
import { navigate, navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey';
import { setShowModalAllNotifi } from '../../Redux/Action/NotificationAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctor } from '../../Redux/Action/DoctorAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../Constant/Url';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';
import HeaderLeft from '../../Components/HeaderLeft';
import CountStar from '../../Components/CountStar/index';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import FastImage from '../../Components/Image/FastImage';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';


const ITEM_SIZE = _width * 0.7
const EMPTY_ITEM_SIZE = (_width - ITEM_SIZE) / 2
const BACKDROP_HEIGHT = _height * 0.65;

const ListDoctor = props => {
    const dispatch = useDispatch()
    const scrollX = useRef(new Animated.Value(0)).current;

    const imageOpacity = useRef(new Animated.Value(1)).current;
    const nextImageOpacity = useRef(new Animated.Value(0)).current;

    const refDemo = useRef(null)

    const onViewRef = React.useRef((viewableItems) => {
        console.log(viewableItems)
        if (viewableItems?.viewableItems[viewableItems?.viewableItems?.length - 1].item?._id && refDemo.current !== viewableItems?.viewableItems[viewableItems?.viewableItems?.length - 1].index) {


            setCurrIndexImage(viewableItems?.viewableItems[viewableItems?.viewableItems?.length - 1].index)
            setNextIndexImage(viewableItems?.viewableItems[viewableItems?.viewableItems?.length - 1].index + 1)


            // Animated.timing(imageOpacity, {
            //     toValue: 0,
            //     duration: 700
            // }).start(() => {

            //     setCurrIndexImage(viewableItems?.viewableItems[viewableItems?.viewableItems?.length - 1].index)
            //     setNextIndexImage(currIndexImage + 1)
            //     refDemo.current = viewableItems?.viewableItems[viewableItems?.viewableItems?.length - 1].index
            // });

        }
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })


    const listDoctorRedux = useSelector(state => state?.doctorReducer?.listDoctor)
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [currDoctorSee, setCurrDoctorSee] = useState({})
    const [currIndexImage, setCurrIndexImage] = useState(0)
    const [nextIndexImage, setNextIndexImage] = useState(0)

    useEffect(() => {
        dispatch(getAllDoctor())
    }, [])

    useEffect(() => {
        if (currIndexImage) {
            Animated.timing(imageOpacity, {
                toValue: 0.8,
                duration: 700
            }).start(() => {

            });
        }
    }, [currIndexImage])

    useEffect(() => {
        if (nextIndexImage) {
            setTimeout(() => {
                imageOpacity.setValue(1)
            }, 400);
        }
    }, [nextIndexImage])


    const _renderItemMember = ({ item, index }) => {

        if (!item._id) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
        }

        const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,

        ];

        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0]
        })

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(ScreenKey.DETAIL_DOCTOR, { idDoctor: item?._id })}
                activeOpacity={0.9}
                style={{ width: ITEM_SIZE }}>
                <Animated.View style={[{
                    borderRadius: 16,
                    padding: 16,
                    marginHorizontal: 8,
                    transform: [{ translateY }],
                    backgroundColor: WHITE,
                }, shadow]}>
                    <Image
                        style={{
                            width: '100%',
                            height: 300,
                            borderRadius: 16
                        }}
                        source={{
                            uri: `${URL_ORIGINAL}${item?.avatar?.link}`
                        }} />

                    <View style={{ alignItems: 'center', marginTop: 16, width: '100%' }}>
                        <Text numberOfLines={1} style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_7 }}>
                            {item?.name}
                        </Text>

                        <View style={[styleElement.rowAliTop, { marginVertical: _moderateScale(4) }]}>
                            <Image style={sizeIcon.xxs} source={require('../../NewIcon/location.png')} />
                            <Text style={{ marginLeft: _moderateScale(8), ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY }} numberOfLines={1}>
                                {item?.branch?.name}
                            </Text>
                        </View>
                        <View style={[styleElement.rowAliCenter]}>
                            <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} medium />
                        </View>

                        <Text style={{ marginTop: 8, marginLeft: _moderateScale(8), ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY }} numberOfLines={3}>
                            {/* Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, */}
                            {item?.description}
                        </Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    const _awesomeChildListKeyExtractor = useCallback((item, index) => `awesome-child-key-${index}`, []);


    return (

        <View style={styles.container}>
            <StatusBarCustom />

            <View style={[{ alignItems: 'flex-start', marginTop: _moderateScale(0), paddingRight: _moderateScale(8 * 2), position: 'absolute', left: _moderateScale(8 * 2), zIndex: 1 }, shadow, Platform.OS == 'ios' ? { top: _moderateScale(8 * 3) + getStatusBarHeight() } : { top: _moderateScale(8 * 3) }]}>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => navigation.goBack()}
                    style={[{
                        width: _moderateScale(8 * 3),
                        height: _moderateScale(8 * 3),
                        borderRadius: _moderateScale(8 * 3 / 2),
                        backgroundColor: WHITE
                    }, styleElement.centerChild, shadow]}>
                    <Image style={[sizeIcon.sm]} source={require('../../Icon/back_bold.png')} />
                </TouchableOpacity>
            </View>

            {/* <HeaderLeft hasSetting title={"Danh sách bác sĩ"} /> */}
            <Animated.View style={{
                width: _width, height: BACKDROP_HEIGHT,
                position: 'absolute',
                opacity: imageOpacity,
                zIndex: -9
            }}>
                <Animated.Image
                    style={{ flex: 1, }} source={{
                        uri: `${URL_ORIGINAL}${[{ key: 'empty-left' }, ...listDoctorRedux, { key: 'empty-right' }][currIndexImage]?.avatar?.link}`
                        // uri: `${URL_ORIGINAL}${currDoctorSee?.avatar?.link}`
                    }} />
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'white']}
                    style={{
                        height: BACKDROP_HEIGHT,
                        width: _width,
                        position: 'absolute',
                        bottom: 0,
                    }}
                />
            </Animated.View>
            {/* <Animated.View style={{
                width: _width, height: BACKDROP_HEIGHT,
                position: 'absolute',
                opacity: 1,
                zIndex: -10
            }}>
                <Animated.Image
                    style={{ flex: 1, }} source={{
                        uri: `${URL_ORIGINAL}${[{ key: 'empty-left' }, ...listDoctorRedux, { key: 'empty-right' }][nextIndexImage]?.avatar?.link}`
                        // uri: `${URL_ORIGINAL}${currDoctorSee?.avatar?.link}`
                    }} />
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'white']}
                    style={{
                        height: BACKDROP_HEIGHT,
                        width: _width,
                        position: 'absolute',
                        bottom: 0,
                    }}
                />
            </Animated.View> */}

            <Animated.FlatList
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                decelerationRate={0}
                snapToAlignment='start'
                snapToInterval={ITEM_SIZE}
                data={!isEmpty(listDoctorRedux) ? [{ key: 'empty-left' }, ...listDoctorRedux, { key: 'empty-right' }] : []}
                contentContainerStyle={{ alignItems: 'center', paddingTop: 128 }}
                renderItem={_renderItemMember}
                keyExtractor={_awesomeChildListKeyExtractor}
            />

        </View>
    );
};




const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BG_BEAUTY_OPACITY_2
    },
    title: {
        fontSize: _moderateScale(20),
        color: WHITE,
        marginLeft: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 3)
    },

    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },

    main: {
        // position:'relative',
        flex: 1,
    },

    listBooking: {
        // paddingHorizontal: _moderateScale(16),
        // paddingTop: _moderateScale(32),
    },
    FaItemBooing: {
        backgroundColor: WHITE,
        marginVertical: _moderateScale(12),
        marginHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(12),
        // borderWidth: 0.5,
        // borderColor: '#000',
    },
    itemBooking: {
        flexDirection: 'row',

        paddingVertical: _moderateScale(12),
        backgroundColor: 'rgba(255, 255, 255,0.3)',
        // borderRadius: _moderateScale(12),


        // shadowColor: WHITE,
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 10,
    },
    leftItemBooking: {
        justifyContent: 'center',
        alignItems: 'center',

        flex: 0.3,
    },
    containAvatar: {
        backgroundColor: '#fff',
        width: _moderateScale(90),
        height: _moderateScale(90),
        borderRadius: _moderateScale(90 / 2),
        overflow: 'hidden',
        // shadowColor: Color.BASE_COLOR,
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: _moderateScale(90),
        height: _moderateScale(90),
    },
    rightItemBooking: {
        justifyContent: 'center',
        flex: 0.7,
        paddingHorizontal: _moderateScale(12)
    },
    titBooking: {
        fontSize: 18,
        ...stylesFont.fontNolanBold,
        color: Color.SECOND_COLOR
    },
    lineItem: {
        flexDirection: 'row',
        marginBottom: _moderateScale(4),
    },
    iCon: {
        marginRight: _moderateScale(4)
    },
    briefLine: {
        fontSize: _moderateScale(13),
        flexWrap: 'wrap',
        flex: 1,
        color: GREY_FOR_TITLE
    },
    btnBoooking: {
        backgroundColor: Color.BASE_COLOR,
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(4)
    },
    headOfLine: {
        paddingBottom: _moderateScale(4),
        marginBottom: _moderateScale(4),
        // borderBottomWidth: _moderateScale(0.5),
        // borderColor: Color.BG_GREY_OPACITY_9
    }
})


export default ListDoctor;