import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_CLEAR, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BG_GREY_OPACITY_9, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, TITLE_GREY, WHITE, BG_GREY_OPACITY_2, BLACK, BLACK_OPACITY_7 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import FastImage from '../../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ListComment from './ListComment'
import ScreenKey from '../../../Navigation/ScreenKey';
import ListImage from './ListImage';
import ActionFeed from './ActionFeed';
import { SET_CURRENT_POST, SET_IS_FOCUS_COMMENT } from '../../../Redux/Constants/ActionType';
import ActionSheet from 'react-native-actionsheet';
import { deletePost } from '../../../Redux/Action/PostAction';
import ImageView from "react-native-image-viewing";


const ItemFeed = (props) => {
    const dispatch = useDispatch()
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const [lengthMore, setLengthMore] = useState(false);
    const ActionSheetRef = useRef()

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    _handleDetail = () => {
        // dispatch({ 
        //     type: SET_CURRENT_POST,
        //     payload: props?.data
        // })
        dispatch({
            type: SET_IS_FOCUS_COMMENT,
            payload: false
        })
        navigation.navigate(ScreenKey.DETAIL_NEW_FEED, { idPost: props?.data?._id })
    }

    const _handleEditFeed = () => {
        dispatch({
            type: SET_CURRENT_POST,
            payload: props?.data
        })
        navigation.navigate(ScreenKey.EDIT_NEW_FEED, { idPost: props?.data?._id })
    }

    const _handleDeleteFeed = () => {

        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn xoá bài viết này?",
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Đồng ý", onPress: () => _deletePost() }
            ],
            { cancelable: false }
        );


        console.log('delete', props?.data);
    }

    const _deletePost = async () => {
        const result = await deletePost(props?.data._id)
        if (result?.isAxiosError) return

    }

    return (
        <>
            <ActionSheet
                ref={ActionSheetRef}
                // title={'Which one do you like ?'}
                options={["Sửa", "Xóa", "Huỷ"]}
                cancelButtonIndex={2}
                // destructiveButtonIndex={0} 
                onPress={(index) => {
                    switch (index) {
                        case 0:
                            _handleEditFeed()
                            break;
                        case 1:
                            _handleDeleteFeed()
                            break;

                        default:
                            break;
                    }
                }}
            />

            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            <View
                // onPress={_handleDetail} 
                style={[styles.itemFeed]}>
                <View style={[styles.headOfFeed]}>
                    <TouchableOpacity
                        onPress={() => {
                            if (props?.data?.partner?._id == infoUserRedux?._id) {
                                navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                            } else {
                                navigation.navigate(ScreenKey.OTHER_PERSONAL_PAGE, { userId: props?.data?.partner?._id })
                            }
                        }}
                        style={[styles.leftOfHead]}>
                        <FastImage
                            style={[styles.bannerProfile__avatar]}
                            uri={props?.data?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                        />
                        <View style={[styles.titOfFeed]}>
                            <Text style={[styles.titFeed]}>{props?.data?.partner?.name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(4) }}>
                                {
                                    props?.data?.scope == 'PUBLIC' ?
                                        <Image style={sizeIcon.xxs} source={require('../../../NewIcon/earthGrey.png')} />
                                        : <></>
                                }
                                {
                                    props?.data?.scope == 'PRIVATE' ?
                                        <Image style={sizeIcon.xxs} source={require('../../../NewIcon/lockGrey.png')} />
                                        : <></>
                                }
                                <Text style={[styles.timeFeed, { marginLeft: _moderateScale(4) }]}>{moment(props?.data?.created).fromNow()}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {infoUserRedux?._id === props?.data?.partnerId ?
                        <TouchableOpacity
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                            onPress={() => ActionSheetRef.current.show()}
                            style={[styles.moreFeed]}>
                            <Image
                                source={require('../../../Image/component/more.png')} />
                        </TouchableOpacity>
                        : <></>
                    }
                </View>

                <View style={[styles.contentFeed]}>

                    {
                        props?.data?.content?.length > 0 ?
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={_handleDetail}
                            >
                                <Text
                                    numberOfLines={4}
                                    onTextLayout={(e) => setLengthMore(e.nativeEvent.lines.length >= 4)}
                                    style={[styles.textFeed]}>
                                    {`${props?.data?.content}`}
                                </Text>
                                {/* {
                                    lengthMore ? <TouchableOpacity
                                        onPress={_handleDetail}><Text
                                            style={{
                                                color: BLUE_FB, lineHeight: 21
                                            }}>{'Xem tiếp...'}</Text></TouchableOpacity>
                                        : null
                                } */}
                            </TouchableOpacity>
                            : <></>
                    }

                    {
                        props?.data?.hashTagCodeArr?.length > 0 ?
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: _moderateScale(8 * 2) }}>
                                {
                                    props?.data?.hashTagCodeArr?.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate(ScreenKey.SEARCH_NEW_FEED, { keySearch: `#${item}` })
                                                }}
                                                style={{
                                                    paddingHorizontal: _moderateScale(8),
                                                    paddingVertical: _moderateScale(4),
                                                    borderRadius: _moderateScale(4),
                                                    backgroundColor: BLUE,
                                                    marginRight: _moderateScale(8),
                                                    marginBottom: _moderateScale(8)
                                                }}>
                                                <Text style={{ ...stylesFont.fontNolan500, color: BLACK_OPACITY_8, fontStyle: 'italic' }}>
                                                    #{item}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            :
                            <>
                            </>
                    }



                    <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), justifyContent: 'space-between' }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowImageViewing(true)
                                setIndexCurrImageView(0)
                                setListImagesSeeCurr([...props?.data?.template?.data?.imageBeforeTreatment, ...props?.data?.template?.data?.imageAfterTreatment])
                            }}
                            style={{ height: _moderateScale(8 * 20), flex: 1 }}>
                            <View style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 8),
                                height: _moderateScale(8 * 3),
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                position: 'absolute',
                                zIndex: 1,
                                bottom: 0,
                                borderTopRightRadius: _moderateScale(8),
                                borderBottomLeftRadius: _moderateScale(4),
                            }]}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                    Trước
                                </Text>
                            </View>
                            {
                                props?.data?.template?.data?.imageBeforeTreatment?.length > 0 ?
                                    <FastImage
                                        style={[{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: _moderateScale(4 * 1)
                                        }]}
                                        uri={`${URL_ORIGINAL}${props?.data?.template?.data?.imageBeforeTreatment[0]?.link}`}
                                    />
                                    : <></>
                            }
                        </TouchableOpacity>
                        <View style={{ width: _moderateScale(8 * 1.5) }} />
                        <TouchableOpacity
                            onPress={() => {
                                setShowImageViewing(true)
                                setIndexCurrImageView(props?.data?.template?.data?.imageBeforeTreatment?.length)
                                // setListImagesSeeCurr(props?.data?.template?.data?.imageAfterTreatment)
                                setListImagesSeeCurr([...props?.data?.template?.data?.imageBeforeTreatment, ...props?.data?.template?.data?.imageAfterTreatment])
                            }}
                            style={{ height: _moderateScale(8 * 20), flex: 1 }}>
                            <View style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 8),
                                height: _moderateScale(8 * 3),
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                position: 'absolute',
                                zIndex: 1,
                                bottom: 0,
                                borderTopRightRadius: _moderateScale(8 * 1),
                                borderBottomLeftRadius: _moderateScale(4),
                            }]}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                    Sau
                                </Text>
                            </View>
                            {
                                props?.data?.template?.data?.imageAfterTreatment?.length > 0 ?
                                    <FastImage
                                        style={[{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: _moderateScale(4 * 1)
                                        }]}
                                        uri={`${URL_ORIGINAL}${props?.data?.template?.data?.imageAfterTreatment[0]?.link}`}
                                    />
                                    : <></>
                            }
                        </TouchableOpacity>

                    </View>
                    {
                        props?.data?.images?.length > 0 ?
                            <ListImage data={props?.data?.images ? props?.data?.images : []} />
                            : <></>
                    }

                    <TouchableOpacity
                        onPress={_handleDetail}
                        style={[styles.shareFeed]}>
                        {
                            props?.data?.template?.type === "PartnerDiary_TreatmentDetail" ?
                                <View style={[styles.contentShare, { alignItems: 'center' }]}>

                                    <View style={[styles.briefContentShare]}>
                                        <Text style={[stylesFont.fontNolanBold, styles.titContentShare]}>
                                            {`NHẬT KÝ ĐIỀU TRỊ ${props?.data?.template?.data?.serviceName}`}
                                        </Text>
                                        <Text style={[styles.descriptionShare]}>
                                            {`Thời gian: ${moment(props?.data?.template?.data?.dateTime).format('DD-MM-YYYY')}`}
                                        </Text>
                                        <Text style={[styles.descriptionShare]}>
                                            {`Điều trị tại ${props?.data?.template?.data?.branchName}`}
                                        </Text>
                                    </View>

                                    <Image style={[sizeIcon.lg]} source={require('../../../Icon/arrowRight_grey.png')} />

                                </View>
                                : <></>
                        }
                    </TouchableOpacity>

                </View>

                <ActionFeed data={props?.data} handleDetail={_handleDetail} />

            </View>
            {/* enditemFeed */}
        </>
    )
}


const styles = StyleSheet.create({

    bannerProfile__avatar: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(48),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    },
    ///------start feed-----///
    itemFeed: {
        backgroundColor: WHITE,
        // marginTop: _moderateScale(8),
        // borderRadius: _moderateScale(8),
        //    paddingHorizontal: _moderateScale(8*2) ,
        paddingVertical: _moderateScale(8),
        // borderWidth:1

    },
    headOfFeed: {
        flexDirection: 'row',
        marginBottom: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    leftOfHead: {
        flex: 1,
        flexDirection: 'row',
    },
    titOfFeed: {
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4)
    },
    titFeed: {
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    timeFeed: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(11)
    },
    moreFeed: {
        marginTop: _moderateScale(8)
    },
    contentFeed: {
        flex: 1,
    },
    textFeed: {
        fontSize: _moderateScale(15),
        color: BLACK_OPACITY_8,
        paddingHorizontal: _moderateScale(8 * 2),
        marginBottom: _moderateScale(12)
    },

    shareFeed: {
        flex: 1,
        marginTop: _moderateScale(8 * 2),
        backgroundColor: 'rgba(125, 61, 168,0.2)',
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8)
    },
    headShare: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titShare: {
        marginLeft: _moderateScale(4),
        color: BLUE_TITLE,
        ...stylesFont.fontNolan500
    },
    contentShare: {
        flexDirection: 'row',
    },
    imgShare: {
        width: _widthScale(8 * 6),
        height: _heightScale(8 * 6),
        marginRight: _moderateScale(8)
    },
    briefContentShare: {
        flex: 1,
    },
    titContentShare: {
        fontSize: _moderateScale(14),
        color: BASE_COLOR,
        marginBottom: _moderateScale(1),
        textTransform: 'uppercase'
    },
    descriptionShare: {
        fontSize: _moderateScale(13),
        color: GREY_FOR_TITLE,
        // fontStyle: 'italic'
    },


    ///-----end feed-----///


})


export default ItemFeed
