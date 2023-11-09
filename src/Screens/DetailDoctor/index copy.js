import _isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageView from "react-native-image-viewing";
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BG_GREY_OPACITY_9, BLACK, BLACK_OPACITY_8, BLUE_FB, BTN_PRICE, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import { getDoctorById, getDoctorReviewByCode } from '../../Redux/Action/DoctorAction';
import { formatMonney } from '../../Constant/Utils';
import { BOOKING_FOR_BRANCH, BOOKING_MAIN } from '../../Navigation/ScreenKey';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';

 


const DetailDoctorScreen = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;

    const [listImage, setListImage] = useState([
        {
            path: `https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
        {
            path: `https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
        {
            path: `https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
        {
            path: `https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
        {
            path: `https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3BhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`,
        },
    ])
    const [currIndexImage, setCurrIndexImage] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [currTab, setCurrTab] = useState('1')
    const [currentDoctor, setCurrDoctor] = useState(null)
    const [listReview, setListReview] = useState([])


    const infoUserRedux = useSelector(state => state?.infoUserReducer)

    useEffect(() => {
        if (!_isEmpty(props?.route?.params?.idDoctor)) {
            _getDoctor()
        }
    }, [])

    const _getDoctor = async () => {
        var currentDoctor = await getDoctorById(props?.route?.params?.idDoctor)
        if (currentDoctor?.isAxiosError) return
        setCurrDoctor(currentDoctor)
        setListImage(currentDoctor?.representationFileArr)
        setListImagesSeeCurr(currentDoctor?.representationFileArr)
    }
    useEffect(() => {
        _getReview()
    }, [currentDoctor])

    const _getReview = async () => {
        var review = await getDoctorReviewByCode(currentDoctor?.code)
        if (review?.isAxiosError) return
        setListReview(review)
    }

    const _getReviewMore = async (_idMore) => {
        var review = await getDoctorReviewByCode(currentDoctor?.code, _idMore)
        if (review?.isAxiosError) return
        setListReview(old => {
            return [
                ...old,
                ...review
            ]
        })
    }


    const _handleOnpressBooking = () => {

        navigation.navigate(BOOKING_FOR_BRANCH, { branchCode: currentDoctor?.code,  refCode:""})
    }

    const renderStatus = (type) =>{
        switch (type) {
            case 'GOOD':
                return <View style={[styles.statusOfPartner]}>
                    <Text style={{color: BG_GREY_OPACITY_9  }}>| </Text>
                            <Image
                                resizeMode={'stretch'}
                                style={[sizeIcon.xs]}
                                source={require('../../Icon/a_fb_1.png')}
                            />
                            <Text style={[stylesFont.fontNolan, 
                                {marginLeft: _moderateScale(4), color: BLUE_FB,fontSize: _moderateScale(12)}]}>Hài lòng</Text>
                        </View>
                break;

            case 'NOT_GOOD':
                return <View style={[styles.statusOfPartner]}>

                            <Text style={{color: BG_GREY_OPACITY_9  }}>| </Text>
                            <Image
                                resizeMode={'stretch'}
                                style={[sizeIcon.xs]}
                                source={require('../../Icon/a_fb_2.png')}
                            />
                            <Text style={[stylesFont.fontNolan, 
                                {marginLeft: _moderateScale(4), color: BLUE_FB,fontSize: _moderateScale(12)}]}>Chưa hài lòng</Text>
                        </View>
                break;

            case 'BAD':
                return <View style={[styles.statusOfPartner]}>
                    <Text style={{color: BG_GREY_OPACITY_9  }}>| </Text>
                            <Image
                                resizeMode={'stretch'}
                                style={[sizeIcon.xs]}
                                source={require('../../Icon/a_fb_3.png')}
                            />
                            <Text style={[stylesFont.fontNolan, 
                                {marginLeft: _moderateScale(4), color: GREY,fontSize: _moderateScale(12)}]}>Không hài lòng</Text>
                        </View>
                break;
        
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom/>
            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}/${item?.path}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />


            <View style={[styles.bannerContainer]}>
                <Animated.Image
                    resizeMode={'stretch'}
                    style={[styles.banner(scrollA),]}
                    source={require('../../Image/header/header1.png')}
                />

                <View style={{
                    position: 'absolute',
                    top: _moderateScale(500),
                    width: "100%"
                }}>
                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }}>
                            <Image
                                style={[sizeIcon.llg]}
                                source={require('../../Icon/back_left_white.png')} />
                        </TouchableOpacity>
                        <Image
                            style={[sizeLogo.xl]}
                            source={require('../../Image/auth/logo.png')} />
                        <TouchableOpacity>
                            {/* <Image
                                    style={[sizeIcon.lllg]}
                                    source={require('../../Icon/i_heart.png')} /> */}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    position: 'absolute',
                    top: _moderateScale(590),
                    width: "100%",
                }}>

                    <View style={styles.bannerProfile}>
                        <TouchableOpacity onPress={() => {
                            // setShowGallery(true)
                        }}>
                            <FastImage
                                style={[styles.bannerProfile__avatar]}
                                uri={currentDoctor?.representationFileArr[0]?.link ? `${URL_ORIGINAL}${currentDoctor?.representationFileArr[0]?.link}` : URL_AVATAR_DEFAULT}
                            />
                        </TouchableOpacity>
                        <View style={styles.bannerProfile__nameAndJob}>

                            <Text style={[stylesFont.fontNolanBold, styles.bannerProfile__nameAndJob__name]}>
                                {
                                    `${currentDoctor?.name}`
                                }
                            </Text>
                            <View style={[styleElement.rowAliCenter]}>
                                <Image
                                    style={[sizeIcon.xxxs, styles.iCon]}
                                    source={require('../../Icon/w_call.png')}
                                />
                                <Text style={[stylesFont.fontNolan500, styles.bannerProfile__nameAndJob__job,
                                { fontSize: _moderateScale(16), opacity: 1, paddingLeft: _moderateScale(4) }]}>
                                    {
                                        `${currentDoctor?.branch?.phone}`
                                    }
                                </Text>
                            </View>

                            <View style={[styleElement.rowAliCenter]}>
                                <Image
                                    style={[sizeIcon.xs, styles.iCon]}
                                    source={require('../../Icon/w_address.png')}
                                />
                                <Text style={[stylesFont.fontNolan500, styles.bannerProfile__nameAndJob__job,
                                {flex:1, opacity: 1, paddingLeft: _moderateScale(4) }]}>
                                    {
                                        `${currentDoctor?.branch?.address}`
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={[styleElement.rowAliCenter, {
                    position: 'absolute',
                    bottom: 0,
                    justifyContent: 'center', marginTop: _moderateScale(8 * 4),
                    paddingHorizontal: _moderateScale(8 * 2)
                }]}>
                    <TouchableOpacity
                        onPress={() => { setCurrTab('1') }}
                        style={[styles.btnTab, currTab == '1' && { borderBottomWidth: _moderateScale(2), borderBottomColor: WHITE }]}>
                        <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '1' && { color: WHITE }]}>
                            Thông tin
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setCurrTab('2') }}
                        style={[styles.btnTab, currTab == '2' && { borderBottomWidth: _moderateScale(2), borderBottomColor: WHITE }]}>
                        <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '2' && { color: WHITE }]}>
                            Đánh giá
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>

            <View style={{
                backgroundColor: WHITE,
                flex: 1,
                paddingBottom: _moderateScale(8 * 6)
            }}>

                
                    {
                        currTab === '1' && <View style={{ marginTop: _moderateScale(8 * 2) }}>
                        <ScrollView>
                            <View style={[styles.contentRow, { paddingHorizontal: _moderateScale(8 * 4) }]}>
                                <Text style={[stylesFont.fontNolanBold,
                                { flex: 1, fontSize: _moderateScale(18), color: BLACK_OPACITY_8 }]}>
                                    Chi tiết
                                </Text>
                                <View style={{ paddingVertical: _moderateScale(8) }}>
                                    <Text>
                                        {currentDoctor?.description}
                                    </Text> 
                                </View>
                            </View>
                            <View style={[styles.contentRow, { paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 4) }]}>
                                <Text style={[stylesFont.fontNolanBold, { flex: 1, fontSize: _moderateScale(18), color: BLACK_OPACITY_8 }]}>
                                    Hình ảnh
                                </Text>
                            </View>
                            <View style={{
                                width: "100%",
                                paddingHorizontal: _moderateScale(24),
                                marginTop: _moderateScale(16)
                            }}>
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    style={{
                                        alignSelf: 'flex-start',

                                        maxWidth: "100%", marginBottom: _moderateScale(8)
                                    }}
                                    horizontal>
                                    {
                                        listImage?.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index}
                                                    onPress={() => {
                                                        setShowImageViewing(true)
                                                        setIndexCurrImageView(currIndexImage)
                                                        setListImagesSeeCurr(listImage)
                                                    }}
                                                    style={{
                                                        marginHorizontal: _moderateScale(8),
                                                    }}>
                                                    <Image
                                                        style={[styles.imageSmall]}
                                                        source={{
                                                            uri: `${URL_ORIGINAL}/${item?.path}`
                                                        }} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styles.btnBooking}
                                onPress={() => _handleOnpressBooking()}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={gradient.color}
                                    style={gradient.container}>
                                    <Text style={[stylesFont.fontNolanBold, styles.btnBooking__text]}>
                                        ĐẶT HẸN NGAY
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            </ScrollView>
                        </View>}
                    {
                        currTab === '2' && <View style={{ marginTop: _moderateScale(8 * 2) }}>
                                <ScrollView>
                            <View style={[styles.listRow, { paddingHorizontal: _moderateScale(8 * 4) }]}>
                                 {listReview?.map((item, index)=>{
                                     let i = 0
                                     return <View style={[styles.itemReview]}>
                                                <View style={[styles.leftReview]}>
                                                    <Image
                                                        style={[styles.avatar]}
                                                        source={{uri: `${URL_ORIGINAL}${item?.partner?.fileAvatar?.link}`}}
                                                    />
                                                </View>
                                                <View style={[styles.rightReview]}>
                                                        <Text style={[stylesFont.fontNolan500,{marginBottom: _moderateScale(4) ,color: SECOND_COLOR}]}>
                                                            {item?.partner?.name}
                                                        </Text>
                                                        <View style={[styles.briefName]}>
                                                            <View style={[styles.lineStar]}>
                                                                  {
                                                                      [1, 2, 3, 4, 5]?.map((star, index) => {
                                                                          if(star <= item?.serviceReview?.rating )
                                                                            {
                                                                                return <Image
                                                                                        resizeMode={'stretch'}
                                                                                        style={[sizeIcon.xxxxs]}
                                                                                        source={require('../../Icon/a_star.png')}
                                                                                    />
                                                                            }
                                                                            else
                                                                            {
                                                                                 return <Image
                                                                                        resizeMode={'stretch'}
                                                                                        style={[sizeIcon.xxxxs]}
                                                                                        source={require('../../Icon/i_star.png')}
                                                                                    />
                                                                            }
                                                                      })
                                                                  } 
                                                            </View>
                                                             {/* {renderStatus(item.reaction)} */}
                                                        </View>
                                                        <View style={[styles.contentBrief]}>
                                                            <Text style={{color: GREY_FOR_TITLE, flex:1}} numberOfLines={2}>
                                                                {item?.serviceReview?.comment!==''?item?.serviceReview?.comment:'...'}
                                                            </Text>
                                                        </View>
                                                </View>
                                            </View>
                                 })}
                            </View>
                            </ScrollView>
                        </View>
                    }

            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    btnTab__text: {
        fontSize: _moderateScale(16),
        color: GREY
    },
    btnTab: {
        width: "40%",
        alignItems: 'center',
        paddingBottom: _moderateScale(4)
    },
    imageChoice: {
        width: _moderateScale(50),
        height: _moderateScale(50),
        resizeMode: 'contain'
    },
    btnBooking__text: {
        fontSize: _moderateScale(14),
        color: WHITE
    },
    btnBooking: {
        // paddingHorizontal: _moderateScale(8 * 2),
        // paddingVertical: _moderateScale(8),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: BASE_COLOR,
        marginHorizontal: _moderateScale(8 * 7),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: _moderateScale(8 * 2),
        height: _moderateScale(8 * 4.5),
        overflow: 'hidden'
    },
    price: {
        fontSize: _moderateScale(22),
        alignSelf: 'center',
        color: BLUE_FB,
    },
    title: {
        fontSize: _moderateScale(18),
        alignSelf: 'center',
        color: BLACK,
    },
    imageLarge: {
        width: "85%",
        height: _moderateScale(8 * 18),
        resizeMode: 'cover',
        borderRadius: _moderateScale(8 * 2),
        alignSelf: 'center',
    },
    imageSmall: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        resizeMode: 'cover',
        borderRadius: _moderateScale(4)
    },
    btnOptions__icon: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain'
    },
    btnOptions: {
        width: _moderateScale(100),
        height: _moderateScale(100),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: BTN_PRICE
    },
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center'
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
        height: _moderateScale(260),
        // width: '100%', 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(260), 0, _moderateScale(260), _moderateScale(260) + 1],
                    outputRange: [-_moderateScale(260) / 2, 0, _moderateScale(260) * 0.75, _moderateScale(260) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(260), 0, _moderateScale(260), _moderateScale(260) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
    bannerProfile__avatar: {
        width: _moderateScale(90),
        height: _moderateScale(90),
        borderRadius: _moderateScale(120),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    },
    bannerProfile: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: _moderateScale(336),
        alignSelf: 'center',
        height: _moderateScale(8 * 12 + 24),
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(16),
        padding: _moderateScale(16)
    },
    bannerProfile__nameAndJob__job: {
        fontSize: _moderateScale(14),
        color: WHITE,
        flexWrap: 'wrap'
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
    avatar: {
        width: _moderateScale(60),
        height: _moderateScale(60),
        borderRadius: _moderateScale(60),
        borderWidth: _moderateScale(1),
        backgroundColor: THIRD_COLOR,
        borderColor: WHITE,
    },
    itemReview:{
        flex:1,
        flexDirection:'row',
        paddingBottom: _moderateScale(6),
        marginBottom: _moderateScale(6)
    },
    rightReview:{
        flex:1,
        paddingLeft: _moderateScale(6),
        borderBottomWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_3,
        paddingBottom: _moderateScale(6)
    },
    briefName:{
        flexDirection:'row',
        alignItems:'center',
    },
    statusOfPartner:{
        flexDirection:'row',
    },
    lineStar:{
        flexDirection:'row',
        marginRight: _moderateScale(6)
    },
    contentBrief:{
        marginVertical: _moderateScale(4)
    }
}
)


const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        BASE_COLOR,
        SECOND_COLOR,
        `rgba(255, 168, 198,1)`,
    ]
}

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


export default DetailDoctorScreen;