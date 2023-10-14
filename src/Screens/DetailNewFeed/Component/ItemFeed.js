import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View ,ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_CLEAR, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BG_GREY_OPACITY_9, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, TITLE_GREY, WHITE } from '../../../Constant/Color';
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
import ItemDiary from './ItemDiary';
import { SET_CURRENT_POST } from '../../../Redux/Constants/ActionType';
import ActionComment from './ActionComment';
const ItemFeed = (props) => {
    const dispatch = useDispatch()
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [textShown, setTextShown] = useState(false);
    const [numLines, setNumLines] = useState(undefined);
    const toggleTextShown = () => {
        setTextShown(!textShown);
    };
    useEffect(() => {
        setNumLines(textShown ? undefined : 8);
    }, [textShown]);
    const onTextLayout = useCallback(
        (e) => {
            if (e.nativeEvent.lines.length > 8 && !textShown) {
                setShowMoreButton(true);
                setNumLines(8);
            }
        },
        [textShown],
    );
    const currentPostRedux = useSelector(state => state.postReducer?.currentPost)
    console.log({currentPostRedux})
    return (
        <>
            <View style={[styles.itemFeed]}>
                <View style={[styles.headOfFeed]}>
                    <View style={[styles.leftOfHead]}>
                        <FastImage
                            style={[styles.bannerProfile__avatar]}
                            uri={currentPostRedux?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${currentPostRedux?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                        />
                        <View style={[styles.titOfFeed]}>
                            <Text style={[styles.titFeed]}>{currentPostRedux?.partner?.name}</Text>
                            <Text style={[styles.timeFeed]}>{moment(currentPostRedux?.created).fromNow()}</Text>
                        </View>
                    </View>
                    {/* {infoUserRedux?._id === currentPostRedux?.partnerId ?
                        <TouchableOpacity style={[styles.moreFeed]}>
                            <Image
                                source={require('../../../Image/component/more.png')} />
                        </TouchableOpacity>
                        : <></>
                    } */}
                </View>
                <View style={[styles.contentFeed]}>
                    <Text
                        numberOfLines={numLines}
                        onTextLayout={onTextLayout}
                        ellipsizeMode="tail"
                        style={[styles.textFeed]}>
                        {`${currentPostRedux?.content}`}
                    </Text>
                    {
                        showMoreButton ? (
                            <Text
                                onPress={toggleTextShown}
                                style={{
                                    color: BLUE_FB, lineHeight: 21, marginTop: _moderateScale(4)
                                }}>{textShown ? 'Thu gọn' : 'Đọc thêm'}</Text>
                        ) : null
                    }
                    <ListImage data={currentPostRedux?.images ? currentPostRedux?.images : []} />
                    <View
                        style={[styles.shareFeed]}>
                        {/* <View style={[styles.headShare]}>
                            <Image
                                style={[sizeIcon.xs]}
                                source={require('../../../Image/component/share.png')} />
                            <Text style={[styles.titShare]}>
                                Đã chia sẻ
                            </Text>
                        </View> */}
                        {
                            currentPostRedux?.template?.type === "PartnerDiary_TreatmentDetail" ?
                                <View style={[styles.contentShare]}>
                                    {/* <Image
                                        style={[styles.imgShare]}
                                        source={require('../../../Image/component/logoLinear.png')} /> */}
                                    <View style={[styles.briefContentShare]}>
                                        <Text style={[styles.titContentShare]}>
                                            {`NHẬT KÝ ĐIỀU TRỊ ${currentPostRedux?.template?.data?.serviceName}`}
                                        </Text>
                                        <Text style={[styles.descriptionShare]}>
                                            {`Thời gian: ${moment(currentPostRedux?.template?.data?.dateTime).format('DD-MM-YYYY')}`}
                                        </Text>
                                        <Text style={[styles.descriptionShare]}>
                                            {`Điều trị tại ${currentPostRedux?.template?.data?.branchName}`}
                                        </Text>
                                    </View>
                                </View>
                                : <></>
                        }
                    </View>
                </View>
                {/* end feed content */}
            </View>
            {/* enditemFeed */}
            <ItemDiary />
            <ActionFeed data={currentPostRedux} />
            {/* end Tool */}
            <ListComment data={currentPostRedux?.comments} />
        </>
    )
}
const styles = StyleSheet.create({
    bannerProfile__avatar: {
        width: _moderateScale(48),
        height: _moderateScale(48),
        borderRadius: _moderateScale(48),
        borderWidth: _moderateScale(2),
        backgroundColor: WHITE,
        borderColor: WHITE,
    },
    ///------start feed-----///
    itemFeed: {
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(8),
        borderBottomEndRadius: 0,
        borderBottomStartRadius:0
    },
    headOfFeed: {
        flexDirection: 'row',
        marginBottom: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),

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
        fontSize: _moderateScale(12)
    },
    moreFeed: {
        marginTop: _moderateScale(8)
    },
    contentFeed: {
        flex: 1
    },
    textFeed: {
        fontSize: _moderateScale(14),
        paddingHorizontal: _moderateScale(8 * 2),

    },
    shareFeed: {
        flex: 1,
        marginTop: _moderateScale(8 * 3),
        backgroundColor:BG_CLEAR,
        paddingHorizontal: _moderateScale(8 * 2),

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
        paddingVertical: _moderateScale(8)
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
        textTransform: 'uppercase',
        color: SECOND_COLOR,
        marginBottom: _moderateScale(1)
    },
    descriptionShare: {
        fontSize: _moderateScale(12),
        color: GREY_FOR_TITLE,
    },
    ///-----end feed-----///
})
export default ItemFeed
