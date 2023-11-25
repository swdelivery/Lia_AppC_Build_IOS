import React, { memo, useState } from 'react';
import { Text, View, StyleSheet, Image ,ScrollView, TouchableOpacity } from 'react-native';
import {
    BG_GREY_OPACITY_5,
    BLUE_2,
    GREY,
    GREY_FOR_TITLE,
    WHITE,
    BG_GREY_OPACITY_2,
    BG_LIGHT_BLUE,
    RED, BLUE_FB,
    GREEN_SUCCESS
} from '../../../Constant/Color';
import { _moderateScale } from '../../../Constant/Scale';

import moment from 'moment';
import { TRANG_BI_URL } from '../../../Constant/Url';
import ImageView from "react-native-image-viewing";
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import _min from 'lodash/min'
import { URL_ORIGINAL } from '../../../Constant/Url';
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'


const ItemTreatmentDetail = memo((props) => {

    const listDoctorRedux = useSelector(state => state?.membersReducer?.listDoctor)

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)



    const _renderStatusTreatment = (status) => {
        switch (status) {
            case "NOT_COMPLETE":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dot, { backgroundColor: BLUE_FB }]} />
                        <Text style={[stylesFont.fontNolan500, styles.statusTreatment, { color: BLUE_FB }]}>
                            Chưa hoàn thành
                        </Text>
                    </View>
                )
            case "PENDING":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dot, { backgroundColor: RED }]} />
                        <Text style={[stylesFont.fontNolan500, styles.statusTreatment, { color: RED }]}>
                            Tạm hoãn
                        </Text>
                    </View>
                )
            case "COMPLETE":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dot, { backgroundColor: GREEN_SUCCESS }]} />
                        <Text style={[stylesFont.fontNolan500, styles.statusTreatment, { color: GREEN_SUCCESS }]}>
                            Hoàn thành
                        </Text>
                    </View>
                )

            default:
                break;
        }
    }

    const _renderReactionReview = (reaction) => {

        switch (reaction) {
            case 'VERY_GOOD':
                return (
                    <Image
                        // resizeMode={'stretch'}
                        style={[styles.fb1]}
                        source={require('../../../Icon/a_fb_11.png')}
                    />
                )
            case "GOOD":
                return (
                    <Image
                        style={[styles.fb1]}
                        source={require('../../../Icon/a_fb_1.png')} />
                )
            case "NOT_GOOD":
                return (
                    <Image
                        style={[styles.fb1]}
                        source={require('../../../Icon/a_fb_2.png')} />
                )
            case "BAD":
                return (
                    <Image
                        style={[styles.fb1]}
                        source={require('../../../Icon/a_fb_3.png')} />
                )
            case 'VERY_BAD':
                return (
                    <Image
                        // resizeMode={'stretch'}
                        style={[styles.fb1]}
                        source={require('../../../Icon/a_fb_33.png')}
                    />
                )

            default:
                break;
        }
    }

    const _renderTotalStar = () => {
        let arrayKey = ['branchReview', 'serviceReview', 'staffReview'];
        let listAllStar = []

        arrayKey.forEach(element => {
            listAllStar.push(props?.data?.review?.[element]?.rating)
        });
        let minStar = _min(listAllStar);

        return (
            <View style={[styleElement.rowAliCenter, { justifyContent: 'center', marginLeft: _moderateScale(8) }]}>
                {
                    [1, 2, 3, 4, 5]?.map((item, index) => {
                        if (index + 1 > minStar) {
                            return (
                                <View
                                    key={index}>
                                    <Image
                                        style={[sizeIcon.md]}
                                        source={require('../../../Icon/i_star.png')} />
                                </View>
                            )
                        }
                        return (
                            <View
                                key={index}>
                                <Image
                                    style={[sizeIcon.md]}
                                    source={require('../../../Icon/a_star.png')} />
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <>

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

            <View style={[{
                width: "100%",
                borderRadius: _moderateScale(8),
                borderWidth: _moderateScale(0.5),
                borderColor: BG_GREY_OPACITY_2,
                paddingHorizontal: _moderateScale(8 * 2),
                paddingVertical: _moderateScale(8 * 2),
                backgroundColor: BG_LIGHT_BLUE,
                // marginTop: _moderateScale(8),
                marginBottom: _moderateScale(16)
            }, props?.bgWhite && { backgroundColor: WHITE }]}>
                <View style={[styleElement.rowAliTop]}>
                    <Text style={[stylesFont.fontNolan500, { flex: 1, textTransform: 'capitalize', fontSize: _moderateScale(14), color: GREY_FOR_TITLE }]}>
                        {
                            moment(props?.data?.created).format('LLL')
                        }
                    </Text>
                    {_renderStatusTreatment(props?.data?.status)}
                </View>

                <View style={{ marginTop: _moderateScale(12) }}>
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY }]}>
                        Dịch vụ
                    </Text>
                    <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8) }]}>
                        {/* <View style={{
                        width: _moderateScale(8 * 1),
                        height: _moderateScale(8 * 1),
                        borderRadius: _moderateScale(8 / 2),
                        backgroundColor: GREY,
                        marginRight: _moderateScale(4)
                    }} /> */}
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE }]}>
                            {
                                props?.data?.serviceName
                            }
                        </Text>
                    </View>
                </View>
                {
                    props?.data?.description?.trim()?.length > 0 ?
                        <View style={{ marginTop: _moderateScale(12) }}>
                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY }]}>
                                Ghi chú
                            </Text>
                            {
                                props?.data?.description ?
                                    <Text style={[stylesFont.fontNolan, { marginLeft: _moderateScale(8), fontSize: _moderateScale(14), color: GREY_FOR_TITLE }]}>
                                        {
                                            props?.data?.description
                                        }
                                    </Text>
                                    : <></>
                            }

                        </View>
                        : <></>
                }


                <View style={{ marginTop: _moderateScale(12) }}>
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY }]}>
                        Bác sĩ chính
                    </Text>

                    {
                        props?.data?.doctorId ?
                            <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8) }]}>
                                {/* <Image
                                    source={{
                                        uri: `${URL_ORIGINAL}${listDoctorRedux?.find(itemFind => itemFind?.userId == props?.data?.doctorId)?.user?.profile?.fileAvatar?.link}`
                                    }}
                                    style={[{
                                        width: _moderateScale(8 * 4),
                                        height: _moderateScale(8 * 4),
                                        borderRadius: _moderateScale(8 * 4 / 2),
                                        marginTop: _moderateScale(4)
                                    }]}
                                /> */}
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE }]}>
                                    {
                                        `${listDoctorRedux?.find(itemFind => itemFind?.userId == props?.data?.doctorId)?.name}`
                                    }
                                </Text>
                            </View>
                            : <></>
                    }
                </View>

                {
                    !isEmpty(props?.data?.supporterIdArr) ?
                        <View style={{ marginTop: _moderateScale(12) }}>
                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY }]}>
                                Bác sĩ phụ {
                                    console.log({ alo: listDoctorRedux, doctorId: props?.data?.doctorId })
                                }
                            </Text>

                            {
                                !isEmpty(props?.data?.supporterIdArr) ?
                                    <>
                                        {
                                            props?.data?.supporterIdArr?.map((item, index) => {
                                                return (
                                                    < View key={index} style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8) }]}>
                                                        {/* <Image
                                                    source={{
                                                        uri: `${URL_ORIGINAL}${listDoctorRedux?.find(itemFind => itemFind?.userId == item)?.user?.profile?.fileAvatar?.link}`
                                                    }}
                                                    style={[{
                                                        width: _moderateScale(8 * 4),
                                                        height: _moderateScale(8 * 4),
                                                        borderRadius: _moderateScale(8 * 4 / 2),
                                                        marginTop: _moderateScale(4),
                                                        backgroundColor: BG_GREY_OPACITY_5
                                                    }]}
                                                /> */}
                                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE }]}>
                                                            {
                                                                `${listDoctorRedux?.find(itemFind => itemFind?.userId == item)?.name}`
                                                            }
                                                        </Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </>

                                    : <></>
                            }
                        </View>
                        : <></>
                }


                <View style={{ marginTop: _moderateScale(12) }}>
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY }]}>
                        Hình ảnh trước điều trị
                    </Text>

                    <View style={{ flexDirection: 'row', width: "100%", marginTop: _moderateScale(8), paddingLeft: _moderateScale(8) }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                props?.data?.imageBeforeTreatment?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowImageViewing(true)
                                                setIndexCurrImageView(index)
                                                setListImagesSeeCurr(props?.data?.imageBeforeTreatment)
                                            }}
                                            key={index}>
                                            <Image
                                                style={[{
                                                    width: _moderateScale(8 * 10),
                                                    height: _moderateScale(8 * 10),
                                                    borderRadius: _moderateScale(8),
                                                    marginRight: _moderateScale(8)
                                                }]}
                                                source={{ uri: `${URL_ORIGINAL}${item?.link}` }}
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

                <View style={{ marginTop: _moderateScale(12) }}>
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY }]}>
                        Hình ảnh sau điều trị
                </Text>

                    <View style={{ flexDirection: 'row', width: "100%", marginTop: _moderateScale(8), paddingLeft: _moderateScale(8) }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                props?.data?.imageAfterTreatment?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowImageViewing(true)
                                                setIndexCurrImageView(index)
                                                setListImagesSeeCurr(props?.data?.imageAfterTreatment)
                                            }}
                                            key={index}>
                                            <Image
                                                style={[{
                                                    width: _moderateScale(8 * 10),
                                                    height: _moderateScale(8 * 10),
                                                    borderRadius: _moderateScale(8),
                                                    marginRight: _moderateScale(8)
                                                }]}
                                                source={{ uri: `${URL_ORIGINAL}${item?.link}` }}
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={{ width: "100%", height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5, marginVertical: _moderateScale(8 * 2) }} />

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                        Đánh giá dịch vụ
                    </Text>

                    {
                        props?.data?.review?._id ?
                            <View style={[styleElement.rowAliCenter, { marginVertical: _moderateScale(8), justifyContent: 'space-between' }]}>
                                <View style={[styleElement.rowAliCenter]}>
                                    {
                                        _renderReactionReview(props?.data?.review?.reaction)
                                    }
                                    {
                                        _renderTotalStar()
                                    }
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.MODAL_SERVICE_REVIEW, {
                                            flag: 'fromTreatmentDetail',
                                            data: {
                                                treatmentDetailId: props?.data?._id,
                                                doctorCode: props?.data?.treatmentDoctorCode,
                                                serviceCode: props?.data?.serviceCode,
                                                branchCode: props?.data?.branchCode,
                                                hasReview: true
                                            }
                                        })
                                    }}
                                    style={[styles.btnSeeInfo, { backgroundColor: GREEN_SUCCESS }]}>
                                    <Text style={[stylesFont.fontNolanBold, styles.btnSeeInfo__text]}>
                                        Xem đánh giá
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <>
                                <View style={[styleElement.rowAliCenter, { marginVertical: _moderateScale(8), justifyContent: 'space-between' }]}>
                                    <View style={[styleElement.rowAliCenter]}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), fontStyle: 'italic', color: GREY }]}>Chưa có đánh giá</Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(ScreenKey.MODAL_SERVICE_REVIEW, {
                                                flag: 'fromTreatmentDetail',
                                                data: {
                                                    treatmentDetailId: props?.data?._id,
                                                    doctorCode: props?.data?.treatmentDoctorCode,
                                                    serviceCode: props?.data?.serviceCode,
                                                    branchCode: props?.data?.branchCode,
                                                    hasReview: false
                                                }
                                            })
                                        }}
                                        style={[styles.btnSeeInfo, { backgroundColor: BLUE_FB }]}>
                                        <Text style={[stylesFont.fontNolanBold, styles.btnSeeInfo__text]}>
                                            Đánh giá
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                    }

                </View>
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    btnSeeInfo__text: {
        fontSize: _moderateScale(14),
        color: WHITE
    },
    btnSeeInfo: {
        paddingVertical: _moderateScale(6),
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        backgroundColor: BLUE_FB,
        alignSelf: 'flex-start'
    },
    fb1: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        resizeMode: 'contain'
    },
    dot: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(8)
    },
    labelStatus: {
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8),
    },
    statusTreatment: {
        fontSize: _moderateScale(14),
        color: WHITE,
    }
})

export default ItemTreatmentDetail;