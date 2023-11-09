import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import ImageView from "react-native-image-viewing";
import { navigation } from '../../../rootNavigation';
import SocketInstance from '../../../SocketInstance';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, GREY, GREY_FOR_TITLE, SECOND_COLOR, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, BTN_PRICE, RED, THIRD_COLOR, BG_GREY_OPACITY_9, FOURTH_COLOR, FIFTH_COLOR, BLACK_OPACITY_7, BLUE_FB } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";
import { _logout } from '../../Services/api';
import { handleApi } from '../../Services/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ItemInfo from './Components/ItemInfo'
import ItemHistory from './Components/ItemHistory'
import { useSelector, useDispatch } from "react-redux";
import { getHealthRecord } from '../../Redux/Action/ProfileAction';
import _, { find } from 'lodash'
import { partnerLevel } from '../../Constant/PartnerLevel';
import ScreenKey from '../../Navigation/ScreenKey';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';





const Profile = props => {
    const infoUserRedux = useSelector(state => state.infoUserReducer)
    const treatmentDetailRedux = useSelector(state => state?.infoReducer?.treatmentDetail)
    const scrollA = useRef(new Animated.Value(0)).current;

    const [isShowGallery, setShowGallery] = useState(false)
    // const [healthRecordStatus, setHealthRecordStatus] = useState(
    //     {
    //         basicInfo: { bloodGroup: 'O+', age: 0, height: 0, weight: 0 },
    //         healthMetric: { bloodPressure: '0', bloodSugar: '0', axitUric: '0', cholesteron: '0' },
    //         medicalHistory: {
    //             heartRelatedDiseaes: false,
    //             drugAllergy: false,
    //             cancer: false,
    //             breastfeeding: false,
    //             pregnant: false,
    //             inMenstrualCycle: false,
    //             hyperthyroidism: false,
    //             seafoodPollenWeatherAllergies: false,
    //             otherIllness: '',
    //         }
    //     }
    // )

    // useEffect(() => {
    //     _getHealthRecord()
    // }, [])

    // const _getHealthRecord = async () => {
    //     var currentRecord = await getHealthRecord()
    //     if (currentRecord?.isAxiosError) return
    //     currentRecord !== null && setHealthRecordStatus(currentRecord)
    // }

    const _renderLevelImage = (code) => {

        switch (code) {
            case 'SILVER':
                return <Image style={[sizeIcon.xlllg]}
                    source={require('../../Image/component/rank_bac.png')} />
                break;
            case 'GOLD':
                return <Image style={[sizeIcon.xlllg]}
                    source={require('../../Image/component/rank_vang.png')} />
                break;
            case 'PLATINUM':
                return <Image style={[sizeIcon.xlllg]}
                    source={require('../../Image/component/rank_bk.png')} />
                break;
            case 'VIP':
                return <Image style={[sizeIcon.xlllg]}
                    source={require('../../Image/component/rank_vip.png')} />
                break;
            default:
                break;
        }
    }



    return (
        <View style={styles.container}>

            <ImageView
                images={[`${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}`].map(item => {
                    return {
                        uri: item,
                    }
                })}
                onRequestClose={() => {
                    setShowGallery(false)
                }}
                imageIndex={0}
                visible={isShowGallery} />

            <StatusBarCustom />
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
                        source={require('../../NewImage/bannerLinear.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                            <TouchableOpacity
                                hitSlop={styleElement.hitslopSm}
                                onPress={() => navigation.goBack()}>
                                <Image style={[sizeIcon.llg]} source={require('../../Icon/back_left_white.png')} />
                            </TouchableOpacity>
                        </View>


                        {/* <View style={styles.coverTop}>

                            <View style={styles.bannerProfile}>
                                <TouchableOpacity onPress={() => {
                                    setShowGallery(true)
                                }}>
                                    <FastImage
                                        style={[styles.bannerProfile__avatar]}
                                        uri={infoUserRedux?.infoUser?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                    />
                                </TouchableOpacity>
                                <View style={styles.bannerProfile__nameAndJob}>
                                    <Text style={[stylesFont.fontNolanBold, styles.bannerProfile__nameAndJob__name]}>
                                        {
                                            `${infoUserRedux?.infoUser?.name} `
                                        }
                                    </Text>
                                    <Text style={[stylesFont.fontNolan500, styles.bannerProfile__nameAndJob__job, { opacity: 0.9 }]}>
                                        {
                                            `${infoUserRedux?.infoUser?.fullPhone[0]}`
                                        }
                                    </Text>
                                    <View style={[styles.ranking]}>

                                        {_renderLevelImage(infoUserRedux?.infoUser?.levelCode)}

                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            marginLeft: _moderateScale(8),
                                            fontSize: _moderateScale(20),
                                            color: WHITE
                                        }}>{find(partnerLevel, { code: infoUserRedux?.infoUser?.levelCode })?.name}</Text>
                                    </View>
                                </View>
                            </View>

                        </View> */}
                    </View>
                </View>



                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    // paddingBottom: _moderateScale(8 * 20),
                }}>
                    <View style={[styles.wave, { alignItems: 'center' }]} >
                        <View style={{
                            position: 'absolute',
                            top: -_moderateScale(8 * 10),
                            alignItems: 'center'
                        }}>
                            <FastImage style={[{
                                width: _moderateScale(8 * 14),
                                height: _moderateScale(8 * 14),
                                borderRadius: _moderateScale(8 * 7),
                                borderWidth: _moderateScale(6),
                                borderColor: WHITE
                            }]}
                                // source={
                                //     infoUserRedux?.infoUser?.fileAvatar?.link ? { uri: `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` } : { uri: URL_AVATAR_DEFAULT }
                                // } 
                                uri={infoUserRedux?.infoUser?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                            />

                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLACK_OPACITY_7 }]}>
                                {
                                    `${infoUserRedux?.infoUser?.name} `
                                }
                            </Text>

                        </View>
                    </View>

                    <View style={[styles.containTitle]}>
                        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                            Thông tin
                        </Text>
                    </View>

                    <View style={{ paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 2) }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.EDIT_PROFILE)
                            }}
                            style={[styleElement.rowAliCenter]}>
                            <View style={{ width: _moderateScale(24) }}>
                                <Image style={sizeIcon.md} source={require('../../NewIcon/peopleBlue.png')} />
                            </View>
                            <Text style={{ ...stylesFont.fontNolan500, flex: 1, marginLeft: _moderateScale(8), fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                                Thông tin cá nhân
                            </Text>

                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: BLUE_FB }}>
                                Chi tiết
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate(ScreenKey.HEALTH_RECORD)}
                            style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ width: _moderateScale(24) }}>
                                <Image style={sizeIcon.md} source={require('../../NewIcon/heart.png')} />
                            </View>
                            <Text style={{ ...stylesFont.fontNolan500, flex: 1, marginLeft: _moderateScale(8), fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                                Hồ sơ sức khỏe
                            </Text>

                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: BLUE_FB }}>
                                Chi tiết
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate(ScreenKey.LIST_PARTNER_DIARY)}
                            style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 2) }]}>
                            <View style={{ width: _moderateScale(24) }}>
                                <Image style={sizeIcon.md} source={require('../../NewIcon/diary.png')} />
                            </View>
                            <Text style={{ ...stylesFont.fontNolan500, flex: 1, marginLeft: _moderateScale(8), fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                                Nhật ký
                            </Text>

                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: BLUE_FB }}>
                                Chi tiết
                            </Text>
                        </TouchableOpacity>
                    </View>



                    

                    {/* <View style={[styles.containTitle, { marginTop: _moderateScale(8 * 4) }]}>
                        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                            Lịch sử điều trị
                        </Text>
                    </View>
                    <View style={[styles.rowContent]}>
                        <ScrollView horizontal
                            contentContainerStyle={{
                                paddingVertical: _moderateScale(8),
                                paddingHorizontal: _moderateScale(6)
                            }}
                            showsHorizontalScrollIndicator={false}>
                            <View style={[styles.listHistory]}>
                                {treatmentDetailRedux.map((item, index) => {
                                    return <ItemHistory key={index} data={item} />
                                })}
                            </View>
                        </ScrollView>
                    </View> */}


                    <View style={[styles.containTitle, { marginTop: _moderateScale(8 * 5) }]}>
                        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                            Hồ sơ người thân
                        </Text>
                    </View>

                    <View style={[styles.bannerPatient,
                    {
                        height: _moderateScale(140),
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderRadius: _moderateScale(16),
                        backgroundColor: FIFTH_COLOR, paddingVertical: 0
                    }]}>

                        <View style={{
                            flexDirection: 'row',
                            width: _moderateScale(200),
                            alignSelf: 'center',
                            padding: _moderateScale(8),
                            justifyContent: 'center',
                            borderRadius: _moderateScale(4),
                            backgroundColor: BASE_COLOR
                        }}>
                            <Text style={{ color: WHITE, fontSize: _moderateScale(16) }}>
                                Liên kết hồ sơ </Text>
                        </View>
                    </View>

                    <View style={{ height: 100 }} />

                </View>
            </Animated.ScrollView>
        </View >

    );
};

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    elevation: 3
}



const styles = StyleSheet.create({
    btnAbsoluteEdit: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 2.5),
        backgroundColor: WHITE,
        borderWidth: _moderateScale(2),
        borderColor: THIRD_COLOR,
        position: 'absolute',
        zIndex: 2,
        right: -_moderateScale(8 * 2),
        top: -_moderateScale(8 * 2),
    },
    inputTreatment: {
        color: BLACK_OPACITY_8,
        height: _moderateScale(8 * 8),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5,
        marginTop: _moderateScale(8),
        padding: _moderateScale(8),
        borderRadius: _moderateScale(8)
    },
    bannerPatient: {
        marginHorizontal: _moderateScale(8 * 3),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2),
        borderRadius: _moderateScale(4),
        marginTop: _moderateScale(16)
    },
    input: {
        width: _moderateScale(120),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        borderRadius: _moderateScale(4),
        color: BLACK_OPACITY_8
    },
    btnChoice_a__text: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    btnChoice_a: {
        width: _moderateScale(40),
        height: _moderateScale(40),
        borderWidth: _moderateScale(0.5),
        borderColor: BTN_PRICE,
        backgroundColor: BTN_PRICE,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: _moderateScale(6),
        borderRadius: _moderateScale(4)
    },
    wrapScrollView: {
        marginLeft: _moderateScale(8 * 3),
        marginTop: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        padding: _moderateScale(8),
        borderRadius: _moderateScale(4)
    },
    btnChoice_i__text: {
        fontSize: _moderateScale(14),
        color: BLACK_OPACITY_8
    },
    btnChoice_i: {
        width: _moderateScale(40),
        height: _moderateScale(40),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: _moderateScale(6),
        borderRadius: _moderateScale(4)

    },

    btnLogOut: {
        marginRight: _widthScale(8 * 4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    bannerProfile__nameAndJob__job: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    bannerProfile__nameAndJob__name: {
        fontSize: _moderateScale(20),
        color: WHITE
    },
    bannerProfile__nameAndJob: {
        marginLeft: _widthScale(8 * 2),
        marginBottom: _heightScale(8 * 6),
        flex: 1,
    },
    bannerProfile__avatar: {
        width: _moderateScale(90),
        height: _moderateScale(90),
        borderRadius: _moderateScale(120),
        borderWidth: _moderateScale(2),
        borderColor: WHITE,
    },
    bannerProfile: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        maxWidth: _moderateScale(336),
        alignSelf: 'center',
        height: _moderateScale(8 * 12 + 24),
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(16),
        padding: _moderateScale(16)
    },
    coverTop: {
        height: '100%',
        // justifyContent: 'center',
        marginTop: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    ranking: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: _moderateScale(10)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(188),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(168), 0, _moderateScale(168), _moderateScale(168) + 1],
                    outputRange: [-_moderateScale(168) / 2, 0, _moderateScale(168) * 0.75, _moderateScale(168) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(168), 0, _moderateScale(168), _moderateScale(168) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    containTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: _moderateScale(32)
    },
    titleMain: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(8 * 2)
    },
    absoluteTitle: {
        position: 'absolute',
        top: - _moderateScale(8 * 9),
        backgroundColor: WHITE,
        alignSelf: 'center',
        width: _moderateScale(320),
        // height: _moderateScale(8 *30),
        borderWidth: 1,
        borderColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        shadowColor: GREY,
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(8 * 2),
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    rowContent: {
        marginHorizontal: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 3),
    },
    rowActionProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemActionProfile: {
        backgroundColor: SECOND_COLOR,
        width: _moderateScale(90),
        height: _moderateScale(90),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: _moderateScale(8)
    },
    nameActionProfile: {
        color: WHITE,
        ...stylesFont.fontNolanBold,
        marginTop: _moderateScale(8)
    },
    listHistory: {
        flexDirection: 'row',
    },
    rightCalendar: {
        paddingHorizontal: _moderateScale(16)
    },
    itemCalendar: {
        paddingBottom: _moderateScale(8),
        marginBottom: _moderateScale(8)
    },

    absoluteTitle1: {
        position: 'absolute',
        top: _moderateScale(-8 * 6),
        backgroundColor: WHITE,
        alignSelf: 'center',
        minWidth: _moderateScale(320),
        height: _moderateScale(8 * 4.5),
        borderWidth: 1,
        borderColor: WHITE,
        borderRadius: _moderateScale(32),
        shadowColor: GREY,
        alignItems: 'center',
        paddingHorizontal: _moderateScale(16),
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
})


const gradient = {
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        'rgba(104, 47, 144,1)',
        'rgba(104, 47, 144,.9)',
        'rgba(104, 47, 144,.7)',
        'rgba(104, 47, 144,.4)'
    ]
}


export default Profile;