import React, { useRef, useEffect, useState, memo } from 'react';
import { StyleSheet, View, Text, Animated,ScrollView ,TouchableOpacity} from 'react-native';
import * as Color from '../../Constant/Color';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE } from '../../Constant/Color';
import { FONT_DINTEXT_PRO, stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { ImageBackground, Image, Dimensions } from 'react-native';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';

import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey';
import ItemService from './Component/ItemService'
import { getAllServiceGroup, getServiceByGroup } from '../../Redux/Action/ServiceGroup';
import { filter, find } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { URL_ORIGINAL } from '../../Constant/Url';
import { getDataServiceFiles } from '../../Redux/Action/Service';
import ImageView from "react-native-image-viewing";
import { alertCustomNotAction } from '../../Constant/Utils';
import ModalIframeYoutube from '../../Components/ModalIframeYoutube/ModalIframeYoutube';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';


const ListService = () => {
    const scrollA = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch()


    const listServiceGroupRedux = useSelector(state => state.serviceGroupReducer?.listServiceGroup)
    const listServiceRedux = useSelector(state => state.serviceReducer?.listService)

    const [currentGroup, setCurrentGroup] = useState('')

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    const [playingYoutube, setPlayingYoutube] = useState({
        show: false,
        playList: []
    })

    useEffect(() => {
        var condition = {
            "sort": {
                "orderNumber": -1
            },
            "limit": 100,
            "page": 1
        }
       
        dispatch(getAllServiceGroup(condition))
    }, [])

    useEffect(() => {
        if (listServiceGroupRedux.length > 0) {
            setCurrentGroup(listServiceGroupRedux[0].code)
        }
    }, [listServiceGroupRedux])

    useEffect(() => {
        if (currentGroup !== '') {
            var condition = {
                "condition": {
                    "codeGroup": {
                        "in": [currentGroup]
                    }
                },
                "limit": 100,
                "page": 1
            }
            dispatch(getServiceByGroup(condition))
        }
    }, [currentGroup])

    const _handlePressImage = async (id) => {
        console.log({ id });
        let result = await getDataServiceFiles(id, {
            condition: {
                type: {
                    equal: 'image'
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return
        if (result?.data?.data?.length == 0) {
            return alertCustomNotAction(`Lỗi`, `Chưa có dữ liệu ảnh về dịch vụ này`)
        }

        setShowImageViewing(true)
        setListImagesSeeCurr(result?.data?.data)
    }

    const _handlePressVideo = async (id) => {
        console.log({ id });
        let result = await getDataServiceFiles(id, {
            condition: {
                type: {
                    equal: 'video'
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return

        if (result?.data?.data?.length == 0) {
            return alertCustomNotAction(`Lỗi`, `Chưa có dữ liệu video về dịch vụ này`)
        }


        setPlayingYoutube(old => {
            return {
                ...old,
                show: true,
                playList: result?.data?.data?.map(item=> item?.file?.link)
            }
        })

    }

    return (

        <View style={styles.container}>
            <StatusBarCustom/>
            {/* <YoutubePlayer
                height={300}
                play={playingYoutube}
                playList={['4yCch6x85Q8','iee2TATGMyI']}
            /> */}
            <ModalIframeYoutube
                playList={playingYoutube?.playList}
                hide={() => {
                    setPlayingYoutube(old => {
                        return {
                            ...old,
                            show: false,
                            playList: []
                        }
                    })
                }}
                show={playingYoutube?.show} />

            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.file?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            <Animated.ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../Image/header/header1.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 2) }]}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Image
                                    style={[sizeIcon.lllg]}
                                    source={require('../../Image/component/back.png')} />
                            </TouchableOpacity>

                            <View>
                                <Text style={{
                                    fontSize: _moderateScale(20),
                                    color: WHITE, ...stylesFont.fontNolanBold
                                }}>DANH SÁCH DỊCH VỤ</Text>
                            </View>
                            <AlarmNotifi />
                        </View>


                        <View style={[styles.listCategoryService]} >
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {
                                    listServiceGroupRedux.map((item, index) => {
                                        // return item.code!==currentGroup?

                                        return (
                                            <TouchableOpacity
                                                onPress={() => setCurrentGroup(item.code)}
                                                style={[styles.categoryService]} key={index} >
                                                <View style={[styles.viewCircle, item.code == currentGroup && { borderWidth: _moderateScale(2), borderColor: 'yellow' }]}>
                                                    <Image
                                                        style={{ width: '100%', height: '100%' }}
                                                        source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }} />
                                                </View>
                                                <Text style={[styles.nameCategory]}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                        // :<></>
                                    })
                                }


                            </ScrollView>
                        </View>

                        <Text style={{
                            alignSelf: 'center',
                            ...stylesFont.fontNolanBold,
                            marginTop: _moderateScale(16),
                            fontSize: _moderateScale(24),
                            color: WHITE
                        }}>
                            {find(listServiceGroupRedux, { code: currentGroup })?.name}
                        </Text>

                    </View>
                </View>

                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    marginTop: _moderateScale(12)
                }}>
                    <View style={styles.wave} />
                    <View style={[styles.main]}>

                        <View style={[styles.containTitle]}>
                            <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                Danh sách dịch vụ
                        </Text>
                        </View>

                        <View style={[styles.columnContent]}>
                            {
                                listServiceRedux.map((item, index) => {
                                    return <ItemService
                                        pressVideo={_handlePressVideo}
                                        pressImage={_handlePressImage}
                                        data={item} key={index} />
                                })
                            }

                        </View>

                    </View>
                </View>

            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    banner: scrollA => ({
        height: _moderateScale(300),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),

    containTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleMain: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(8 * 2)
    },
    listCategoryService: {
        width: _moderateScale(320),
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: _moderateScale(24),
        alignSelf: 'center',
    },
    categoryService: {
        width: _moderateScale(70),
        alignItems: 'center',
        marginRight: _moderateScale(8),
    },
    viewCircle: {
        width: _moderateScale(56),
        height: _moderateScale(56),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(40),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    nameCategory: {
        fontSize: _moderateScale(13),
        color: WHITE,
        ...stylesFont.fontNolanBold,
        marginTop: _moderateScale(8)
    },
    columnContent: {
        flexDirection: 'column',
        paddingHorizontal: _moderateScale(8 * 2),
        marginTop: _moderateScale(8 * 3),
        marginBottom: _moderateScale(8 * 5)
    },
})


export default ListService;