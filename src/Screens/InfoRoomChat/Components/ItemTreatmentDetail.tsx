import React, { memo, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
    BG_GREY_OPACITY_5,
    BLUE_2,
    GREY,
    GREY_FOR_TITLE,
    WHITE,
    BG_GREY_OPACITY_2,
    BG_LIGHT_BLUE,
    RED, BLUE_FB,
    GREEN_SUCCESS,
    BORDER_COLOR,
    BLACK
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
import ScreenKey from '../../../Navigation/ScreenKey'
import Row from '@Components/Row';
import Text from '@Components/Text';
import Column from '@Components/Column';
import HorizontalLine from '@Components/Line/HorizontalLine';
import { useNavigate } from 'src/Hooks/useNavigation';


const ItemTreatmentDetail = memo((props) => {

    const { navigation } = useNavigate()

    const { data: {
        _id,
        serviceName,
        doctorId,
        created,
        status,
        imageBeforeTreatment,
        imageAfterTreatment,
        review,
        treatmentDoctorCode,
        serviceCode,
        branchCode
    } } = props

    const listDoctorRedux = useSelector(state => state?.membersReducer?.listDoctor)

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)


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
            listAllStar.push(review?.[element]?.rating)
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

    const RowInfo = ({ name, value, colorValue = BLACK }) => {
        return (
            <Row gap={8} alignItems='flex-start' justifyContent='space-between'>
                <Text>
                    {name}
                </Text>
                <Column flex={1}>
                    <Text color={colorValue} style={{ textAlign: 'right' }} weight='bold'>
                        {value}
                    </Text>
                </Column>
            </Row>
        )
    }

    const _renderStatusTreatment = (status) => {
        switch (status) {
            case "NOT_COMPLETE":
                return `Chưa hoàn thành`
            case "PENDING":
                return `Tạm hoãn`
            case "COMPLETE":
                return `Hoàn thành`
            default:
                break;
        }
    }
    const _renderColorStatus = (status) => {
        switch (status) {
            case "NOT_COMPLETE":
                return BLUE_FB
            case "PENDING":
                return RED
            case "COMPLETE":
                return GREEN_SUCCESS
            default:
                break;
        }
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

            <View style={[styles.main, { gap: 8 * 2 }]}>
                <Column gap={8}>
                    <RowInfo
                        name={"Dịch vụ điều trị:"}
                        value={serviceName} />
                    <RowInfo
                        name={"Bác sĩ chính:"}
                        value={`${listDoctorRedux?.find(itemFind => itemFind?.userId == doctorId)?.name}`} />
                    <RowInfo
                        name={"Thời gian:"}
                        value={`${moment(created).format('LL')} - ${moment(created).format('LT')}`} />
                    <RowInfo
                        colorValue={_renderColorStatus(status)}
                        name={"Trạng thái:"}
                        value={_renderStatusTreatment(status)} />
                </Column>

                <Row>
                    <Column gap={8} alignItems='center' flex={1}>
                        <Text>Ảnh trước điều trị</Text>
                        <TouchableOpacity onPress={() => {
                            setShowImageViewing(true)
                            setIndexCurrImageView(0)
                            setListImagesSeeCurr(imageBeforeTreatment)
                        }}>
                            <Image
                                style={styles.imageTreatment}
                                source={{ uri: `${URL_ORIGINAL}${imageBeforeTreatment[0]?.link}` }} />
                        </TouchableOpacity>
                    </Column>
                    <Column flex={1}>
                        <Column gap={8} alignItems='center' flex={1}>
                            <Text>Ảnh sau điều trị</Text>
                            <TouchableOpacity onPress={() => {
                                setShowImageViewing(true)
                                setIndexCurrImageView(0)
                                setListImagesSeeCurr(imageAfterTreatment)
                            }}>
                                <Image
                                    style={styles.imageTreatment}
                                    source={{ uri: `${URL_ORIGINAL}${imageAfterTreatment[0]?.link}` }} />
                            </TouchableOpacity>
                        </Column>
                    </Column>
                </Row>
                <HorizontalLine />

                <Row alignItems='flex-end'>
                    <Column gap={8} flex={1}>
                        <Text weight='bold'>
                            Đánh giá dịch vụ
                        </Text>
                        {
                            review?._id ?
                                <Row>
                                    {
                                        _renderReactionReview(review?.reaction)
                                    }
                                    {
                                        _renderTotalStar()
                                    }
                                </Row>
                                :
                                <Text>
                                    Bạn chưa đánh giá dịch vụ
                                </Text>
                        }
                    </Column>
                    {
                        review?._id ?
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.MODAL_SERVICE_REVIEW, {
                                        flag: 'fromTreatmentDetail',
                                        data: {
                                            treatmentDetailId: _id,
                                            doctorCode: treatmentDoctorCode,
                                            serviceCode: serviceCode,
                                            branchCode: branchCode,
                                            hasReview: true
                                        }
                                    })
                                }}
                                style={[styles.btnSeeInfo, { backgroundColor: GREEN_SUCCESS }]}>
                                <Text weight='bold' color={WHITE}>
                                    Xem đánh giá
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.MODAL_SERVICE_REVIEW, {
                                        flag: 'fromTreatmentDetail',
                                        data: {
                                            treatmentDetailId: _id,
                                            doctorCode: treatmentDoctorCode,
                                            serviceCode: serviceCode,
                                            branchCode: branchCode,
                                            hasReview: false
                                        }
                                    })
                                }}
                                style={styles.btnSeeInfo}>
                                <Text weight='bold' color={WHITE}>
                                    Đánh giá
                                </Text>
                            </TouchableOpacity>
                    }

                </Row>


            </View>

        </>
    );
});

const styles = StyleSheet.create({
    fb1: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        resizeMode: 'contain'
    },
    btnSeeInfo: {
        paddingVertical: _moderateScale(6),
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        backgroundColor: BLUE_FB,
    },
    imageTreatment: {
        width: _moderateScale(8 * 16),
        height: _moderateScale(8 * 20),
        borderRadius: _moderateScale(8),
        marginRight: _moderateScale(8)
    },
    main: {
        marginHorizontal: 8 * 0,
        borderWidth: 1,
        borderEndColor: BORDER_COLOR,
        borderRadius: _moderateScale(8),
        borderColor: BG_GREY_OPACITY_2,
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2),
        backgroundColor: WHITE,
    }
})

export default ItemTreatmentDetail;
