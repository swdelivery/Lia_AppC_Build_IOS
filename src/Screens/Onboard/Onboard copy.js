import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList, StatusBar, ImageBackground } from 'react-native'
import { BASE_COLOR, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK, BLUE_FB, GREY, GREY_FOR_TITLE, PRICE_ORANGE, RED, WHITE } from '../../Constant/Color';
import { _height, _moderateScale, _width } from '../../Constant/Scale';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { stylesFont } from '../../Constant/Font';
import ScreenKey from '../../Navigation/ScreenKey';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { styleElement } from '../../Constant/StyleElement';
import LinearGradient from 'react-native-linear-gradient';
import { getAllNewsv2 } from '../../Redux/Action/News';
import { URL_ORIGINAL } from '../../Constant/Url';


const Onboard = memo((props) => {



    const [listImage, setListImage] = useState([
        // {
        //     _id: '1',
        //     image: `https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294455740_178373951317183_6031313393334086604_n.png?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=YBBEdadlYL0AX8oh6R9&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT9TJzI_ht4o4p8nRTz_w8bLHlb0vAgfAYNapn0j_qfnTA&oe=62DD48D2`,
        //     title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
        //     description: `When an unknown printer took a galley of type and scrambled it to make a type specimen book`
        // },
        // {
        //     _id: '2',
        //     image: `https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/291971160_175407671613811_1440606260479797292_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9267fe&_nc_ohc=xPqvr30B3QgAX9trCW6&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT-xc0SWyYfPYAsbuFNU9cY-JOfArvUr7mP-ZEftrsEHMA&oe=62DBA9E6`,
        //     title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
        //     description: `When an unknown printer took a galley of type and scrambled it to make a type specimen book`
        // },
        // {
        //     _id: '3',
        //     image: `https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/292055401_175406644947247_8193238031685561586_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9267fe&_nc_ohc=3wjWRbTfW8gAX_Zkd9y&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT8kvGO0BKBKIjD0HZ_UAtLyJ0aAlgrQRuWTJ1AuoO-foQ&oe=62DD4F3D`,
        //     title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
        //     description: `When an unknown printer took a galley of type and scrambled it to make a type specimen book`
        // },
    ])

    const [currIndexImage, setCurrIndexImage] = useState(0)

    const onViewRef = React.useRef((viewableItems) => {
        setCurrIndexImage(viewableItems?.changed[0]?.index)
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    useEffect(() => {
        console.log({ _width, _height });
        _getData()
    }, [])

    const _getData = async () => {
        let result = await getAllNewsv2({
            condition: {
                isStartup: { equal: true }
            },
            limit: 5
        })
        if (result?.isAxiosError) return;
        setListImage(result?.data?.data)
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={gradient.color}
                style={gradient.container}>
                {/* <View style={{ height: getStatusBarHeight() }} /> */}
                <StatusBar backgroundColor={'transparent'} translucent={false} barStyle={props?.barStyle || 'light-content'} />
                {/* <StatusBarCustom barStyle={"light-content"} bgColor={BASE_COLOR} /> */}

                <View style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: getStatusBarHeight() + _moderateScale(8 * 1),
                    right: _moderateScale(8 * 2),
                    // marginTop: _moderateScale(8 * 2),
                    // marginRight: _moderateScale(8 * 2),
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            props?.setShow(false, null)
                        }}
                        style={[shadow, styles.btnSkip]}>
                        <Text style={{
                            ...stylesFont.fontNolanBold,
                            fontSize: _moderateScale(15),
                            color: GREY_FOR_TITLE
                        }}>
                            Bỏ qua
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    <FlatList
                        // bounces={false}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={listImage}
                        pagingEnabled
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: _width, height: _height }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            // props?.setShow(false, null)
                                            // navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: props?.data?._id })

                                            props?.setShow(false, {
                                                screenKey: ScreenKey.DETAIL_NEWS,
                                                params: {
                                                    idNews : item?._id
                                                }
                                            })
                                        }}
                                        style={{
                                            width: _width,
                                            height: _height,
                                        }}>

                                        <ImageBackground style={{ flex: 1 }} source={{ uri: `${URL_ORIGINAL}${item?.startUpFileArr[0]?.link}` }} >
                                            <LinearGradient
                                                start={{ x: 1, y: 1 }}
                                                end={{ x: 1, y: 0 }}
                                                colors={[
                                                    // 'rgba(0,0,0,0.9)',
                                                    // 'rgba(255,255,255,0.0)',
                                                    // 'rgba(255,255,255,0.0)',

                                                    'rgba(0,0,0,0.9)',
                                                    'rgba(255,255,255,0.0)',
                                                    'rgba(255,255,255,0.0)',
                                                    'rgba(255,255,255,0.0)'
                                                
                                                ]}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}>
                                            </LinearGradient>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    {/* <View style={{ marginTop: _moderateScale(8 * 2) }}>
                                        <Text style={{ alignSelf: 'center', marginHorizontal: _moderateScale(8 * 3), textAlign: 'center', ...stylesFont.fontNolanBold, color: WHITE, fontSize: _moderateScale(18) }}>
                                            {item?.title}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: _moderateScale(8 * 1) }}>
                                        <Text style={{ alignSelf: 'center', marginHorizontal: _moderateScale(8 * 3), textAlign: 'center', ...stylesFont.fontNolan500, color: WHITE, fontSize: _moderateScale(14) }}>
                                            {item?.description}
                                        </Text>
                                    </View> */}
                                </View>
                            )
                        }}
                    />

                </View>

                <View style={{
                    alignSelf: 'center',
                    marginTop: _moderateScale(8 * 4),
                    flexDirection: 'row'
                }}>
                    {
                        listImage?.map((item, index) => {
                            return (
                                <View style={[{
                                    width: _moderateScale(8 * 3),
                                    height: _moderateScale(8 * 1),
                                    borderRadius: _moderateScale(4),
                                    marginHorizontal: _moderateScale(4),
                                    backgroundColor: BG_GREY_OPACITY_5
                                },
                                index == currIndexImage && { backgroundColor: '#147869' }

                                ]} />
                            )
                        })
                    }
                </View>

                {/* <View style={{ flex: 1 }} /> */}


                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: _width
                }}>

                    <View style={{
                        alignSelf: 'center',
                        marginTop: _moderateScale(8 * 4),
                        flexDirection: 'row',
                        marginBottom: _moderateScale(8 * 4)
                    }}>
                        {
                            listImage?.map((item, index) => {
                                return (
                                    <View style={[{
                                        width: _moderateScale(8 * 3),
                                        height: _moderateScale(8 * 1),
                                        borderRadius: _moderateScale(4),
                                        marginHorizontal: _moderateScale(4),
                                        backgroundColor: BG_GREY_OPACITY_5
                                    },
                                    index == currIndexImage && { backgroundColor: '#147869' }

                                    ]} />
                                )
                            })
                        }
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            // props?.setShow(false, ScreenKey.REGISTER_IN_APP)
                            // props?.setShow(false, {
                            //     screenKey: ScreenKey.REGISTER_IN_APP,
                            //     params: null
                            // })
                            props?.setShow(false, {
                                screenKey: ScreenKey.LOGIN_IN_APP,
                                params: null
                            })
                        }}
                        style={[styleElement.centerChild, {
                            marginHorizontal: _moderateScale(8 * 3),
                            height: _moderateScale(8 * 6),
                            backgroundColor: WHITE,
                            borderRadius: _moderateScale(8)
                        }]}>
                        <Text style={{
                            ...stylesFont.fontNolanBold,
                            color: BASE_COLOR,
                            fontSize: _moderateScale(18)
                        }}>
                            Đăng nhập ngay!
                        </Text>
                    </TouchableOpacity>

                    <View style={{ height: _moderateScale(8 * 2) }} />

                    <TouchableOpacity
                        onPress={() => {
                            // props?.setShow(false, ScreenKey.LOGIN_IN_APP)
                            // props?.setShow(false, {
                            //     screenKey: ScreenKey.LOGIN_IN_APP,
                            //     params: null
                            // })
                            props?.setShow(false, {
                                screenKey: ScreenKey.REGISTER_IN_APP,
                                params: null
                            })
                        }}
                        style={[styleElement.rowAliCenter, { alignSelf: 'center' }]}>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            color: WHITE,
                            fontSize: _moderateScale(16)
                        }}>
                            Bạn chưa có tài khoản?
                        </Text>
                        <View style={{ width: _moderateScale(8) }} />
                        <Text style={{
                            ...stylesFont.fontNolanBold,
                            color: WHITE,
                            fontSize: _moderateScale(18)
                        }}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: getBottomSpace() + _moderateScale(8 * 2) }} />

                </View>

            </LinearGradient>
        </View>
    );
});

const styles = StyleSheet.create({
    btnSkip: {
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(4),
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(256,256,256,0.5)',
        // borderWidth: _moderateScale(0.5)
    },
    container: {
        flex: 1,
        backgroundColor: BASE_COLOR
    }
})



const gradient = {
    container: {
        width: '100%',
        height: '100%',
    },
    color: [
        BASE_COLOR,
        'rgba(256,256,256,.1)',
    ]
}


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

export default Onboard;