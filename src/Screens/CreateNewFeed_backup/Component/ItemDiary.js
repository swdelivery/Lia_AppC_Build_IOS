import React, { memo, useEffect, useState } from 'react';
import { BASE_COLOR, BG_GREY_OPACITY_5, BLACK_OPACITY, BLACK_OPACITY_8, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, RED, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { sizeIcon } from '../../../Constant/Icon';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { useSelector } from 'react-redux';
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import moment from 'moment';
import { getTreatmentDetailById } from '../../../Redux/Action/TreatmentAction';
import { URL_ORIGINAL } from '../../../Constant/Url';

const ItemDiary = memo((props) => {

    const currentTreatmentDiaryRedux = useSelector(state => state?.diaryReducer?.currentTreatmentDiary)
    const [currentTreatment, setCurrentTreatment] = useState(null)
    const [currentDay, setCurrentDay] = useState(1)


    useEffect(() => {
        if (!_isEmpty(currentTreatmentDiaryRedux?.treatmentDetailId)) {
            _getTreatment()
        }
    }, [currentTreatmentDiaryRedux])

    const _getTreatment = async () => {
        var currentTreatment = await getTreatmentDetailById(currentTreatmentDiaryRedux?.treatmentDetailId)
        if (currentTreatment?.isAxiosError) return
        setCurrentTreatment(currentTreatment)
    }

    const hasDiary = _get(currentTreatmentDiaryRedux, 'id', '')

    const _handleHiddenImage = (id) => {
       props?._handleHiddenImage(id)
    }


    return (
        hasDiary !== '' ? <>
            <View style={[styles.shareFeed]}>
                <View style={[styles.headShare]}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <Image
                            style={[sizeIcon.xs]}
                            source={require('../../../Image/component/share.png')} />
                        <Text style={[styles.titShare]}>
                            Chia sẻ
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.moreFeed]}>
                        <Image
                            source={require('../../../Image/component/more.png')} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.contentShare]}>
                    <Image
                        style={[styles.imgShare]}
                        source={require('../../../Image/component/logoLinear.png')} />
                    <View style={[styles.briefContentShare]}>
                        <Text style={[styles.titContentShare]}>
                            {`NHẬT KÝ ĐIỀU TRỊ ${currentTreatmentDiaryRedux?.serviceName}`}
                        </Text>
                        <Text style={[styles.descriptionShare]}>
                            {`Thời gian: ${moment(currentTreatmentDiaryRedux?.startDate).format('DD-MM-YYYY')}`}
                        </Text>
                        <Text style={[styles.descriptionShare]}>
                            {`Điều trị tại ${currentTreatment?.branch?.name}`}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={[styles.treatment]}>
                <View style={[styles.headTreatment]}>
                    {/* <Image 
                                style={[sizeIcon.xs]}
                                source={require('../../../Image/component/share.png')} /> */}
                    <Text style={[styles.titTreatment]}>
                        Điều trị
                    </Text>
                </View>
                <View style={[styles.imageRow]}>
                    <View style={[styles.itemImgRow]}>
                        <Text style={[styles.titImgRow]}>Trước</Text>
                        <View style={[styles.multiImg]}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {
                                    currentTreatment?.imageBeforeTreatment?.map((res, index) => {
                                        return <TouchableOpacity
                                        onPress={() => _handleHiddenImage(res?.id)} 
                                        style={[styles.imgWrapper]} key={index}>
                                            <Image
                                                style={[styles.imgDetail]}
                                                source={{
                                                    uri: `${URL_ORIGINAL}${res?.link}`
                                                }} />
                                            {props?.hiddenIdArr.indexOf(res?.id) > -1 ? <TouchableOpacity
                                                onPress={() => _handleHiddenImage(res?.id)}
                                                style={[styles.overHiddenImg]}>
                                                <Image
                                                    style={[sizeIcon.xs]}
                                                    source={require('../../../Image/component/hidden.png')} />
                                            </TouchableOpacity> : <></>}
                                        </TouchableOpacity>
                                    })
                                }


                            </ScrollView>
                        </View>
                    </View>
                    <View style={[styles.itemImgRow]}>
                        <Text style={[styles.titImgRow]}>Sau</Text>
                        <View style={[styles.multiImg]}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {
                                    currentTreatment?.imageAfterTreatment?.map((res, index) => {
                                        return <TouchableOpacity
                                        onPress={() => _handleHiddenImage(res?.id)}
                                        style={[styles.imgWrapper]} key={index}>
                                            <Image
                                                style={[styles.imgDetail]}
                                                source={{
                                                    uri: `${URL_ORIGINAL}${res?.link}`
                                                }} />
                                            {props?.hiddenIdArr.indexOf(res?.id) > -1 ? <TouchableOpacity
                                                onPress={() => _handleHiddenImage(res?.id)}
                                                style={[styles.overHiddenImg]}>
                                                <Image
                                                    style={[sizeIcon.xs]}
                                                    source={require('../../../Image/component/hidden.png')} />
                                            </TouchableOpacity> : <></>}
                                        </TouchableOpacity>
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.treatment]}>
                <View style={[styles.headTreatment]}>
                    {/* <Image 
                                style={[sizeIcon.xs]}
                                source={require('../../../Image/component/share.png')} /> */}
                    <Text style={[styles.titTreatment]}>
                        Hậu phẫu
                    </Text>
                    <View style={[styles.timeLine]}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {currentTreatmentDiaryRedux?.dailyDiaryArr?.map((day, index) => {
                                return <TouchableOpacity
                                    onPress={() => setCurrentDay(day?.index)}
                                >
                                    <Text style={[styles.textTime,
                                    currentDay === day?.index && styles.textTimeActive
                                    ]}>{`Ngày ${day?.index}`}</Text>
                                </TouchableOpacity>
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={[styles.imageRow]}>
                        <View style={[styles.multiImg]}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {currentTreatmentDiaryRedux?.dailyDiaryArr[currentDay - 1]?.images?.map((img, index) => {
                                    return <TouchableOpacity
                                        onPress={() => _handleHiddenImage(img?.image?.id)}
                                        style={[styles.imgWrapper]} key={index}>
                                        <Image
                                            style={[styles.imgDetail]}
                                            source={{ uri: `${URL_ORIGINAL}${img?.image?.link}` }} />
                                        {props?.hiddenIdArr.indexOf(img?.image?.id) > -1 ? <TouchableOpacity
                                            onPress={() => _handleHiddenImage(img?.image?.id)}
                                            style={[styles.overHiddenImg]}>
                                            <Image
                                                style={[sizeIcon.xs]}
                                                source={require('../../../Image/component/hidden.png')} />
                                        </TouchableOpacity> : <></>}
                                    </TouchableOpacity>
                                })}
                                {currentTreatmentDiaryRedux?.dailyDiaryArr[currentDay - 1]?.images.length === 0 &&
                                    <Text style={{
                                        fontSize: _moderateScale(12),
                                        color: GREY_FOR_TITLE
                                    }}>
                                        Bạn chưa cập nhật hình ảnh cho nhật ký ngày {currentDay}...</Text>}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: _moderateScale(12) }}>
                        <Text style={{ fontSize: _moderateScale(13), ...stylesFont.fontNolan500, color: BLUE_TITLE, }}>
                            Cảm nghĩ:
                        </Text>
                        <Text style={{
                            fontSize: _moderateScale(13), flex: 1, ...stylesFont.fontNolan,
                            paddingLeft: _moderateScale(4),
                            color: BLACK_OPACITY
                        }}>
                            {currentTreatmentDiaryRedux?.dailyDiaryArr[currentDay - 1]?.description}
                        </Text>
                    </View>
                </View>
            </View>
        </> : <></>
    );
});

const styles = StyleSheet.create({
    treatment: {
        flex: 1,
        backgroundColor: WHITE,
        marginTop: _moderateScale(6),
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(8),
        marginBottom: _moderateScale(1)
    },

    overHiddenImg: {
        position: 'absolute',
        backgroundColor: 'rgba(133,133,133,0.8)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    headTreatment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titTreatment: {
        color: BLUE_TITLE,
        ...stylesFont.fontNolan500
    },
    imageRow: {
        flexDirection: 'row',
        marginTop: _moderateScale(12),
        justifyContent: 'space-between'
    },
    titImgRow: {
        color: SECOND_COLOR,
        fontSize: _moderateScale(12)
    },
    itemImgRow: {
        flex: 0.49,
    },
    multiImg: {
        flexDirection: 'row',
        flex: 1
    },
    imgWrapper: {
        width: _widthScale(52),
        height: _heightScale(52),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5,
        marginRight: _moderateScale(6),
        position: 'relative',
        borderRadius: _moderateScale(4)
    },
    imgDetail: {
        width: _widthScale(44),
        height: _heightScale(44)
    },
    overHiddenImg: {
        position: 'absolute',
        backgroundColor: 'rgba(133,133,133,0.8)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    timeLine: {
        flexDirection: 'row',
        paddingLeft: _moderateScale(8 * 4),
        alignSelf: 'flex-end',
        flex: 1,
    },
    textTime: {
        color: GREY,
        fontSize: _moderateScale(12),
        marginHorizontal: _moderateScale(8)
    },
    textTimeActive: {
        color: SECOND_COLOR
    },
    imgHorizontal: {
        marginRight: _moderateScale(4)
    },
    shareFeed: {
        flex: 1,
        marginTop: _moderateScale(6),
        backgroundColor: WHITE,
        paddingVertical: _moderateScale(12),
        paddingHorizontal: _moderateScale(8 * 2)
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
        marginTop: _moderateScale(8)
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
        fontSize: _moderateScale(16),
        color: SECOND_COLOR,
        marginBottom: _moderateScale(4),
        textTransform: 'uppercase',
        flexWrap: 'wrap'
    },
    descriptionShare: {
        fontSize: _moderateScale(11),
        color: GREY_FOR_TITLE,
        fontStyle: 'italic',
        marginBottom: _moderateScale(2)
    },
})

export default ItemDiary;