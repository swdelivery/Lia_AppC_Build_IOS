import React, { useRef, useState, memo, useEffect } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, Alert, ScrollView } from 'react-native';
import { GREY, WHITE, BASE_COLOR, RED, BG_GREY_OPACITY_5, BLACK, BLACK_OPACITY_8, BLUE_FB, FIFTH_COLOR, GREEN_SUCCESS } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';


import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'

// import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import _isEmpty from 'lodash/isEmpty'
import _min from 'lodash/min'
import CountStar from '../../Components/CountStar/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { createReviewTreatment, getReviewByTreatmentDetailForPartner, getPrepareReviewForTreatmentDetail } from '../../Redux/Action/BookingAction';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import ModalCongrats from './ModalCongrats';

const index = memo((props) => {

    const [reaction, setReaction] = useState('GOOD')
    const [indexCountStar, setIndexCountStar] = useState(5)
    const [description, setDescription] = useState('')

    const [listItem, setListItem] = useState([
        { _id: '1', code: 'serviceReview', name: "Dịch vụ" },
        { _id: '2', code: 'staffReview', name: "Bác sĩ" },
        { _id: '3', code: 'branchReview', name: "Chi nhánh" },
        // { _id: '4', code: 'saleReview', name: "Sale" },
        // { _id: '5', code: 'consultantReview', name: "Tư vấn viên" },
        // { _id: '6', code: 'auditReview', name: "Audit" },
    ])
    const [listItemNotGood, setListItemNotGood] = useState([])

    const [dataForFetch, setDataForFetch] = useState({})

    const [showModalCongrats, setShowModalCongrats] = useState(false)


    useEffect(() => {
        console.log({ props });

        if (props?.route?.params?.flag == 'fromTreatmentDetail') {

            _prepareReviewForTreatmentDetail(props?.route?.params?.data?.treatmentDetailId)

            if (props?.route?.params?.data?.treatmentDetailId && props?.route?.params?.data?.hasReview) {
                _getDataReview(props?.route?.params?.data?.treatmentDetailId)
            } else {
                setDataForFetch({
                    reaction: 'GOOD',
                    treatmentDetailId: props?.route?.params?.data?.treatmentDetailId,
                    doctorCode: props?.route?.params?.data?.doctorCode,
                    serviceCode: props?.route?.params?.data?.serviceCode,
                    branchCode: props?.route?.params?.data?.branchCode,
                    serviceReview: {
                        comment: "",
                        rating: 5
                    },
                    branchReview: {
                        comment: "",
                        rating: 5
                    },
                    staffReview: {
                        comment: "",
                        rating: 5
                    }
                })
            }
        }

        if (props?.route?.params?.flag == "fromMessage") {
            if (!_isEmpty(props?.route?.params?.data)) {

                _prepareReviewForTreatmentDetail(props?.route?.params?.data?.template?.data?.treatmentDetailId)

                if (props?.route?.params?.data?.template?.data?.interacted) {
                    _getDataReview(props?.route?.params?.data?.template?.data?.treatmentDetailId)
                    return
                } else {
                    setDataForFetch({
                        reaction: 'GOOD',
                        messageId: props?.route?.params?.data?._id,
                        treatmentDetailId: props?.route?.params?.data?.template?.data?.treatmentDetailId,
                        doctorCode: props?.route?.params?.data?.template?.data?.doctorCode,
                        serviceCode: props?.route?.params?.data?.template?.data?.serviceCode,
                        branchCode: props?.route?.params?.data?.template?.data?.branchCode,
                        serviceReview: {
                            comment: "",
                            rating: 5
                        },
                        branchReview: {
                            comment: "",
                            rating: 5
                        },
                        staffReview: {
                            comment: "",
                            rating: 5
                        }
                    })
                }
            }
        }



    }, [])

    const _prepareReviewForTreatmentDetail = async (treatmentDetailIdProps) => {
        let result = await getPrepareReviewForTreatmentDetail(treatmentDetailIdProps);
        if (result?.isAxiosError) return

        let listItemTemp = [...listItem];
        console.log({ listItemTemp });

        // { _id: '4', code: 'saleReview', name: "Sale" },
        // { _id: '5', code: 'consultantReview', name: "Tư vấn viên" },
        // { _id: '6', code: 'auditReview', name: "Audit" },

        if (result?.data?.data?.saleId) {
            listItemTemp?.push({ _id: '4', code: 'saleReview', name: "Sale" })
        }
        if (result?.data?.data?.consultantId) {
            listItemTemp?.push({ _id: '5', code: 'consultantReview', name: "Tư vấn viên" })
        }
        if (result?.data?.data?.auditId) {
            listItemTemp?.push({ _id: '6', code: 'auditReview', name: "Audit" })
        }
        setListItem(listItemTemp)

    }

    const _getDataReview = async (treatmentDetailIdProps) => {

        let resultGetReviewByTreatmentDetailForPartner = await getReviewByTreatmentDetailForPartner(treatmentDetailIdProps)
        if (resultGetReviewByTreatmentDetailForPartner?.isAxiosError) return

        setDataForFetch(resultGetReviewByTreatmentDetailForPartner?.data?.data)

        setReaction(resultGetReviewByTreatmentDetailForPartner?.data?.data?.reaction)

        let arrayKey = ['branchReview', 'serviceReview', 'staffReview', 'saleReview', 'consultantReview', 'auditReview'];
        let listAllStar = []
        let descriptionFetch = ""
        let listItemNotGoodTemp = []

        arrayKey.forEach(element => {

            if (resultGetReviewByTreatmentDetailForPartner?.data?.data[element]?.isSelected == true) {
                let itemFind = listItem?.find(item => item?.code == element);
                listItemNotGoodTemp.push(itemFind)
            }

            if (!_isEmpty(resultGetReviewByTreatmentDetailForPartner?.data?.data[element]?.comment)) {
                descriptionFetch = resultGetReviewByTreatmentDetailForPartner?.data?.data[element]?.comment
            }
            listAllStar.push(resultGetReviewByTreatmentDetailForPartner?.data?.data[element]?.rating)
        });
        let minStar = _min(listAllStar);

        setIndexCountStar(Number(minStar))
        setDescription(descriptionFetch)
        setListItemNotGood(listItemNotGoodTemp)



    }

    const _handleSetStar = (star) => {

        setDataForFetch(old => {
            return {
                ...old,
                serviceReview: {
                    ...old?.serviceReview,
                    rating: star
                },
                branchReview: {
                    ...old?.branchReview,
                    rating: star
                },
                staffReview: {
                    ...old?.staffReview,
                    rating: star
                },
                saleReview: {
                    ...old?.saleReview,
                    rating: star
                },
                consultantReview: {
                    ...old?.consultantReview,
                    rating: star
                },
                auditReview: {
                    ...old?.auditReview,
                    rating: star
                },
            }
        })
    }
    const _handleOnchangeText = (text) => {
        setDescription(text)
        setDataForFetch(old => {
            return {
                ...old,
                serviceReview: {
                    ...old?.serviceReview,
                    comment: text
                },
                branchReview: {
                    ...old?.branchReview,
                    comment: text
                },
                staffReview: {
                    ...old?.staffReview,
                    comment: text
                },
                saleReview: {
                    ...old?.saleReview,
                    comment: text
                },
                consultantReview: {
                    ...old?.consultantReview,
                    comment: text
                },
                auditReview: {
                    ...old?.auditReview,
                    comment: text
                },
            }
        })
    }

    const _handleConfirmFeedBack = async () => {
        console.log({ dataForFetch, listItemNotGood });

        let dataForFetchTemp = { ...dataForFetch, reaction }

        if (!_isEmpty(listItemNotGood)) {
            // let arrayKey = ['branchReview', 'serviceReview', 'staffReview','saleReview','consultantReview','auditReview'];
            let arrayKey = listItem?.map(item => item?.code);
            arrayKey.forEach(element => {
                let checkKeyExist = listItemNotGood?.find(itemFind => itemFind?.code == element);

                if (checkKeyExist) {
                    dataForFetchTemp[element] = {
                        ...dataForFetchTemp[element],
                        isSelected: true
                    }
                }

                if (!checkKeyExist) {
                    dataForFetchTemp[element] = {
                        comment: "",
                        rating: 5
                    }
                }
            });
        }



        console.log({ dataForFetchTemp });

        let resultCreateReviewTreatment = await createReviewTreatment(dataForFetchTemp)
        if (resultCreateReviewTreatment?.isAxiosError) return

        setShowModalCongrats(true)

        // navigation.goBack()

    }


    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>

            <ModalCongrats
                hide={() => {
                    setShowModalCongrats(false)
                }}
                show={showModalCongrats} />

            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <View style={{ width: "100%", paddingVertical: _moderateScale(8 * 2), borderBottomWidth: _moderateScale(0.5), borderBottomColor: BG_GREY_OPACITY_5 }}>
                <View style={[styleElement.rowAliCenter]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/cancel.png')} />
                    </TouchableOpacity>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]}>
                        ĐÁNH GIÁ DỊCH VỤ
                    </Text>
                </View>
            </View>
            <KeyboardAwareScrollView>
                <Text style={[stylesFont.fontNolan500, styles.title]}>
                    {`Cảm nhận của bạn về \n dịch vụ này?`}
                </Text>
                <Text style={[stylesFont.fontNolan500, styles.title_2]}>
                    Giúp chúng tôi nâng cao trải nghiệm của bạn vào những lần tới
                </Text>

                <View style={[styleElement.rowAliCenter, { justifyContent: 'center', marginTop: _moderateScale(8 * 2) }]}>
                    {
                        reaction == 'GOOD' ?
                            <TouchableOpacity>
                                <Image
                                    style={[styles.fb1]}
                                    source={require('../../Icon/a_fb_1.png')} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setReaction('GOOD')}>
                                <Image
                                    style={styles.fb1}
                                    source={require('../../Icon/i_fb_1.png')} />
                            </TouchableOpacity>
                    }
                    {
                        reaction == 'NOT_GOOD' ?
                            <TouchableOpacity style={{ marginHorizontal: _moderateScale(8 * 4) }}>
                                <Image
                                    style={styles.fb2}
                                    source={require('../../Icon/a_fb_2.png')} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{ marginHorizontal: _moderateScale(8 * 4) }}
                                onPress={() => setReaction('NOT_GOOD')}>
                                <Image
                                    style={styles.fb2}
                                    source={require('../../Icon/i_fb_2.png')} />
                            </TouchableOpacity>
                    }
                    {
                        reaction == 'BAD' ?
                            <TouchableOpacity>
                                <Image
                                    style={styles.fb2}
                                    source={require('../../Icon/a_fb_3.png')} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setReaction('BAD')}>
                                <Image
                                    style={styles.fb2}
                                    source={require('../../Icon/i_fb_3.png')} />
                            </TouchableOpacity>
                    }
                </View>

                {
                    reaction == 'GOOD' ?
                        <Text style={[stylesFont.fontNolanBold, styles.textReaction]}>
                            Hài lòng
                        </Text>
                        : <></>
                }
                {
                    reaction == 'NOT_GOOD' ?
                        <Text style={[stylesFont.fontNolanBold, styles.textReaction]}>
                            Chưa hài lòng
                        </Text>
                        : <></>
                }
                {
                    reaction == 'BAD' ?
                        <Text style={[stylesFont.fontNolanBold, styles.textReaction]}>
                            Không hài lòng
                        </Text>
                        : <></>
                }

                <View style={[styleElement.rowAliCenter, { justifyContent: 'center', marginVertical: _moderateScale(8) }]}>
                    {
                        [1, 2, 3, 4, 5]?.map((item, index) => {
                            if (index + 1 > indexCountStar) {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setIndexCountStar(index + 1)
                                            _handleSetStar(index + 1)
                                        }}
                                        style={styles.btnStar}>
                                        <Image
                                            style={[sizeIcon.xlllg]}
                                            source={require('../../Icon/i_star.png')} />
                                    </TouchableOpacity>
                                )
                            }
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setIndexCountStar(index + 1)
                                        _handleSetStar(index + 1)
                                    }}
                                    style={styles.btnStar}>
                                    <Image
                                        style={[sizeIcon.xlllg]}
                                        source={require('../../Icon/a_star.png')} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                {
                    reaction == 'NOT_GOOD' || reaction == 'BAD' ?
                        <View style={{ marginBottom: _moderateScale(8 * 2) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), marginLeft: _moderateScale(8 * 3) }]}>
                                Bạn không hài lòng về điều gì?
                            </Text>
                            <View style={[styleElement.rowAliCenter, { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8) }]}>
                                {
                                    listItem.map((item, index) => {

                                        if (listItemNotGood?.find(itemFind => itemFind?.code == item?.code)) {
                                            return (
                                                <TouchableOpacity
                                                    key={item?._id}
                                                    onPress={() => {
                                                        setListItemNotGood(old => [...old].filter(itemFilter => itemFilter?.code !== item?.code))
                                                    }}
                                                    style={[{
                                                        // width: "30%",
                                                        paddingHorizontal: _moderateScale(8 * 2),
                                                        borderWidth: _moderateScale(1),
                                                        borderRadius: _moderateScale(8),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingVertical: _moderateScale(4),
                                                        borderColor: BASE_COLOR,
                                                        backgroundColor: BASE_COLOR,
                                                        marginBottom: _moderateScale(8 * 1),
                                                    }, { marginHorizontal: _moderateScale(8) }]}>
                                                    <Text style={[stylesFont.fontNolanBold, { color: WHITE }]}>
                                                        {item?.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }

                                        return (
                                            <TouchableOpacity
                                                key={item?._id}
                                                onPress={() => {
                                                    setListItemNotGood(old => [...old, item])
                                                    // _handleSetStarSpecific(item)
                                                }}
                                                style={[{
                                                    // width: "30%",
                                                    paddingHorizontal: _moderateScale(8 * 2),
                                                    borderWidth: _moderateScale(1),
                                                    borderRadius: _moderateScale(8),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingVertical: _moderateScale(4),
                                                    borderColor: BASE_COLOR,
                                                    marginBottom: _moderateScale(8 * 1),

                                                }, { marginHorizontal: _moderateScale(8) }]}>
                                                <Text style={[stylesFont.fontNolan500, { color: BASE_COLOR }]}>
                                                    {item?.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        : <></>
                }

                {/* {
                    reaction == '1' ?
                        <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(18), color: BASE_COLOR }]}>
                                Nội dung
                            </Text>
                            <View style={{
                                minHeight: _moderateScale(8 * 10),
                                backgroundColor: FIFTH_COLOR,
                                marginTop: _moderateScale(8),
                                borderRadius: _moderateScale(8),
                                padding: _moderateScale(8),
                                paddingHorizontal: _moderateScale(8 * 2),
                            }}>
                                <TextInput
                                    onChangeText={(e) => _handleOnchangeText(e)}
                                    placeholder={'Nhập nội dung bình luận'}
                                    multiline
                                    style={{
                                        flex: 1,
                                        fontSize: _moderateScale(16)
                                    }} />
                            </View>
                        </View>
                        : <></>
                } */}
                {
                    true ?
                        <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(18), color: BASE_COLOR }]}>
                                Nội dung
                            </Text>
                            <View style={{
                                minHeight: _moderateScale(8 * 10),
                                backgroundColor: FIFTH_COLOR,
                                marginTop: _moderateScale(8),
                                borderRadius: _moderateScale(8),
                                padding: _moderateScale(8),
                                paddingHorizontal: _moderateScale(8 * 2),
                            }}>
                                <TextInput
                                    value={description}
                                    onChangeText={(e) => _handleOnchangeText(e)}
                                    placeholder={'Nhập nội dung bình luận'}
                                    multiline
                                    style={{
                                        flex: 1,
                                        fontSize: _moderateScale(16)
                                    }} />
                            </View>
                        </View>
                        : <></>
                }





            </KeyboardAwareScrollView>

            <View style={{}}>
                <TouchableOpacity
                    onPress={_handleConfirmFeedBack}
                    style={styles.btnConfirm}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                        Gửi đánh giá
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 3),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getBottomSpace() + _moderateScale(8 * 2),
        backgroundColor: GREEN_SUCCESS,
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8)
    },
    btnStar: {
        padding: _moderateScale(8),

    },
    textReaction: {
        color: BLUE_FB,
        alignSelf: 'center',
        fontSize: _moderateScale(20),
        marginTop: _moderateScale(8 * 2)
    },
    fb2: {
        width: _moderateScale(56),
        height: _moderateScale(56),
        resizeMode: 'contain'
    },
    fb1: {
        width: _moderateScale(56),
        height: _moderateScale(56),
        resizeMode: 'contain'
    },
    title_2: {
        fontSize: _moderateScale(12),
        color: GREY,
        alignSelf: 'center',
        textAlign: 'center'
    },
    title: {
        fontSize: _moderateScale(20),
        color: BLACK_OPACITY_8,
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: _moderateScale(8 * 2)
    }
})

export default index;