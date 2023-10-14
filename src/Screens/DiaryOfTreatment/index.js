import isEmpty from 'lodash/isEmpty';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { getServiceDiaryGuide, getTreatmentDiaryByTreatmentDetail } from '../../Redux/Action/Diary';
import ItemDate from './Components/ItemDate';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { TabBar, TabView } from 'react-native-tab-view';



const DiaryOfTreatment = (props) => {

    const diary = useSelector(state => state?.diaryReducer?.currentTreatmentDiary)


    const scrollA = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef();
    const dispatch = useDispatch()

    const [currDateData, setCurrDateData] = useState(0)
    const [treatmentDetail, setTreatmentDetail] = useState(null)
    const [listServiceDiaryGuide, setListServiceDiaryGuide] = useState({})



    const [routes, setRoutes] = useState([
    ]);
    const [index, setIndex] = useState(0);

    useEffect(() => {

        // console.log({props});

        console.log({ xxx: props })


        if (!_isEmpty(props?.route?.params?.treatmentDetail)) {
            console.log("x");

            setTreatmentDetail(props?.route?.params?.treatmentDetail)
            _serviceDiaryGuide(props?.route?.params?.treatmentDetail?.service?._id)

            dispatch(getTreatmentDiaryByTreatmentDetail(props?.route?.params?.treatmentDetail?._id))
        }

        if (!_isEmpty(props?.route?.params?.treatmentDailyDiary)) {
            console.log("x2");
            setTreatmentDetail(props?.route?.params?.treatmentDailyDiary)
            dispatch(getTreatmentDiaryByTreatmentDetail(props?.route?.params?.treatmentDailyDiary?.treatmentDetailId))
        }

        store.dispatch({
            type: ActionType.SHOW_BAGED_DIARY,
            payload: {
                data: false
            }
        })


        return () => {
            store.dispatch({
                type: ActionType.CLEAR_CURRENT_TREATMENT_DIARY,
                payload: null
            })

            store.dispatch({
                type: ActionType.SHOW_BAGED_DIARY,
                payload: {
                    data: true
                }
            })
        }
    }, [])

    const _serviceDiaryGuide = async (_id) => {
        let result = await getServiceDiaryGuide(_id)
        if (result?.isAxiosError) return
        setListServiceDiaryGuide(result?.data?.data)
    }

    const _updateListDiary = () => {

        if (!_isEmpty(props?.route?.params?.treatmentDetail)) {
            dispatch(getTreatmentDiaryByTreatmentDetail(props?.route?.params?.treatmentDetail?._id))
        }

        if (!_isEmpty(props?.route?.params?.treatmentDailyDiary)) {
            dispatch(getTreatmentDiaryByTreatmentDetail(props?.route?.params?.treatmentDailyDiary?.treatmentDetailId))
        }

        // dispatch(getTreatmentDiaryByTreatmentDetail(props?.route?.params?.treatmentDetail?._id))
    }


    useEffect(() => {
        console.log({ diary });

        if (diary?._id) {
            let tempList = [...diary?.dailyDiaryArr].map((item, index) => {
                return {
                    title: item?.date,
                    _id: item?._id,
                    key: item?._id,
                    index: index,
                    isComplete: item?.isComplete
                }
            })
            console.log({ tempList });

            setRoutes(tempList)
        }

        var dailyDiaryArr = diary?.dailyDiaryArr ? diary?.dailyDiaryArr : []

        if (dailyDiaryArr.length > 0) {
            var idex = dailyDiaryArr.filter(item => moment(item.date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY'))
            if (idex.length > 0) {
                console.log({ idex });

                setIndex(idex[0].index - 1)
            }
        }

    }, [diary])

    const renderTabBar = (props) => {
        return (
            <>
                <TabBar
                    tabStyle={{ flexDirection: 'row', alignItems: 'center', width: 'auto', height: 'auto', marginTop: _moderateScale(0) }}
                    {...props}
                    indicatorStyle={{ backgroundColor: 'transparent' }}
                    style={{
                        backgroundColor: BLUE,
                        shadowOffset: { height: 0, width: 0 },
                        shadowColor: 'transparent',
                        shadowOpacity: 0,
                        elevation: 0,
                        paddingLeft: _moderateScale(6),
                    }}
                    inactiveColor="grey"
                    activeColor={BASE_COLOR}
                    scrollEnabled
                    getLabelText={({ route }) => route.title}
                    renderLabel={({ route, focused, color }) => (
                        <TouchableOpacity
                            style={[styles.itemTab, focused ? styles.itemTabActive : '']}>
                            {
                                route?.isComplete ?
                                    // <Image style={[{ ...sizeIcon.lxlg, zIndex: 1, position: 'absolute', right:0, top:-10 }]} source={require('../../NewIcon/tickRed.png')} />
                                    <Image style={[{ width: _moderateScale(8 * 8), height: _moderateScale(8 * 5), resizeMode: 'contain', zIndex: 1, position: 'absolute' }]} source={require('../../NewIcon/conplete.png')} />
                                    : <></>
                            }

                            <Text style={[focused ? styles.textTabActive : styles.textTab]}>Ngày {route?.index + 1} </Text>
                            <Text style={[focused ? styles.briefTabActive : styles.briefTab]}>{moment(route?.title).format('DD-MM-YYYY')}</Text>
                        </TouchableOpacity>
                    )}
                />
            </>
        )
    }

    const renderScene = ({ route }) => {
        return (
            <ItemDate
                serviceDiaryGuide={listServiceDiaryGuide?.dailyArr?.length > 0 ? listServiceDiaryGuide?.dailyArr[route?.index] : null}
                updateListDiary={_updateListDiary}
                data={diary?.dailyDiaryArr?.length > 0 ? diary?.dailyDiaryArr[route?.index] : null}
                index={route?.index} />
        )
    };


    return (
        <View style={styles.container}>
            <StatusBarCustom />

            {!isEmpty(diary) ?
                <View
                    style={{ flexGrow: 1 }}>
                    <View style={[styles.bannerContainer]}>
                        <Animated.Image
                            resizeMode={'cover'}
                            style={[styles.banner(scrollA),]}
                            source={require('../../NewImage/banner2Color.png')}
                        />
                        <View style={{
                            position: 'absolute',
                            top: _moderateScale(500),
                            width: "100%"
                        }}>
                            <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }]}>
                                <TouchableOpacity
                                    hitSlop={styleElement.hitslopSm}
                                    onPress={() => {
                                        navigation.goBack()
                                    }}>
                                    <Image
                                        style={[sizeIcon.llg]}
                                        source={require('../../Icon/back_left_white.png')} />
                                </TouchableOpacity>
                                <Text numberOfLines={1} style={[stylesFont.fontNolan500, { color: WHITE, fontSize: _moderateScale(20) }]}>
                                    {treatmentDetail?.serviceName}
                                </Text>
                                <Image
                                    style={[sizeIcon.llg, { opacity: 0 }]}
                                    source={require('../../Icon/back_left_white.png')} />
                            </View>
                        </View>

                    </View>


                    <View style={{
                        backgroundColor: WHITE,
                        flex: 1,
                    }}>
                        {/* <View style={{
                            flexDirection: 'row',
                            paddingVertical: _moderateScale(8),
                            marginBottom: _moderateScale(8),
                            backgroundColor: BLUE, paddingHorizontal: _moderateScale(8)
                        }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                ref={scrollViewRef}
                                horizontal showsHorizontalScrollIndicator={false}>

                                {
                                    diary?.dailyDiaryArr?.map((item, index) => {
                                        return <TouchableOpacity key={index}
                                            onPress={() => setCurrDateData(index)}
                                            style={[styles.itemTab, index === currDateData ? styles.itemTabActive : '']}>
                                            <Text style={[index === currDateData ? styles.textTabActive : styles.textTab]}>Ngày {item?.index}</Text>
                                            <Text style={[index === currDateData ? styles.briefTabActive : styles.briefTab]}>{moment(item?.date).format('DD-MM-YYYY')}</Text>
                                        </TouchableOpacity>
                                    })
                                }


                            </ScrollView>
                        </View> */}

                        {/* <ItemDate data={diary?.dailyDiaryArr?.length > 0 ? diary?.dailyDiaryArr[currDateData] : null} index={currDateData} /> */}

                        {
                            routes?.length > 0 ?
                                <TabView
                                    renderTabBar={renderTabBar}
                                    swipeEnabled={true}
                                    navigationState={{ index, routes }}
                                    renderScene={renderScene}
                                    onIndexChange={setIndex}
                                    lazy
                                />
                                : <></>
                        }

                    </View>

                </View>
                :
                <View style={{
                    backgroundColor: THIRD_COLOR,
                    flex: 1
                }}>
                    <View style={[styleElement.rowAliCenter, {
                        backgroundColor: SECOND_COLOR,
                        justifyContent: 'space-between',
                        padding: _moderateScale(8 * 2)
                    }]}>
                        <TouchableOpacity
                            hitSlop={styleElement.hitslopSm}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <Image
                                style={[sizeIcon.llg]}
                                source={require('../../Icon/back_left_white.png')} />
                        </TouchableOpacity>
                        <Text style={[stylesFont.fontNolan500, { color: WHITE, fontSize: _moderateScale(20) }]}>Nhật ký hậu phẫu</Text>
                        <TouchableOpacity>

                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: WHITE,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} >

                        <Text style={{ ...stylesFont.fontNolan500 }}>Không tìm thấy nhật ký của bạn.</Text>
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        padding: _moderateScale(12),
        fontSize: _widthScale(14),
        marginHorizontal: _moderateScale(16),
        padding: _moderateScale(8),
        minHeight: _moderateScale(80),
        maxHeight: _moderateScale(80),
        borderWidth: 1,
        borderColor: BG_GREY_OPACITY_3,
        backgroundColor: BG_GREY_OPACITY_3,
        marginTop: _moderateScale(10),
        color: BLACK_OPACITY_8,
        borderRadius: _moderateScale(8)
    },
    btnOptions: {
        width: _moderateScale(120),
        borderWidth: 0.5,
        borderColor: BASE_COLOR,
        backgroundColor: BASE_COLOR,
        paddingVertical: _moderateScale(8),
        borderRadius: _moderateScale(24),
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: SECOND_COLOR
    },
    title: {
        fontSize: _moderateScale(20),
        color: WHITE,
    },

    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(60),
        width: "100%",
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(130), 0, _moderateScale(130), _moderateScale(130) + 1],
                    outputRange: [-_moderateScale(130) / 2, 0, _moderateScale(130) * 0.75, _moderateScale(130) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(130), 0, _moderateScale(130), _moderateScale(130) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),

    itemTab: {
        backgroundColor: BLUE,
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        marginRight: _moderateScale(8),
        borderRadius: _moderateScale(8),
        width: _moderateScale(80),
        alignItems: 'center'
    },
    textTab: {
        fontSize: _moderateScale(13),
        color: GREY
    },
    briefTab: {
        fontSize: _moderateScale(10),
        color: GREY
    },
    itemTabActive: {
        backgroundColor: SECOND_COLOR
    },
    textTabActive: {
        color: WHITE
    },
    briefTabActive: {
        fontSize: _moderateScale(10),
        color: WHITE
    },
    titleRow: {
        flexDirection: 'row',
        marginTop: _moderateScale(8),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    titSection: {
        fontSize: _moderateScale(16),
        ...stylesFont.fontNolan500
    },
    actionRow: {
        fontSize: _moderateScale(13),
        color: SECOND_COLOR
    },
    listAction: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: _moderateScale(4),
        marginTop: _moderateScale(16)
    },
    itemImage: {
        width: _widthScale(8 * 10),
        // height: _heightScale(8*10),
        marginRight: _moderateScale(16),
    },
    contentImage: {
        borderWidth: 0.5,
        padding: _moderateScale(4),
        borderColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8)
    },
    imageV: {
        width: _widthScale(8 * 9),
        height: _heightScale(8 * 9)
    },
    textImage: {
        color: SECOND_COLOR,
        ...stylesFont.fontNolanBold,
        alignSelf: 'center',
        fontSize: _moderateScale(14),
        marginBottom: _moderateScale(6)
    },
    btnAddImage: {
        marginHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: GREY,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: _moderateScale(32),
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderStyle: 'dashed',
        alignSelf: 'center',
        justifyContent: 'center'
    },
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 11
}


export default DiaryOfTreatment;