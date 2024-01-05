import React, { useRef, useState, memo, useEffect, useMemo } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, Alert, ScrollView, LayoutAnimation, Platform, KeyboardAvoidingView } from 'react-native';
import { GREY, WHITE, BASE_COLOR, RED, BG_GREY_OPACITY_5, BLACK, BLACK_OPACITY_8, BLUE_FB, FIFTH_COLOR, GREEN_SUCCESS, BG_GREY_OPACITY_2 } from '../../Constant/Color';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const index = memo((props) => {

    const { top, bottom } = useSafeAreaInsets()

    const [reaction, setReaction] = useState('VERY_GOOD')
    const [indexCountStar, setIndexCountStar] = useState(5)
    const [description, setDescription] = useState('')

    const [listItem, setListItem] = useState([
        { _id: '1', code: 'serviceReview', name: "Chất lượng dịch vụ" },
        { _id: '2', code: 'securityReview', name: "Bảo vệ" },
        { _id: '3', code: 'receptionReview', name: "Lễ tân" },
        { _id: '4', code: 'consultantReview', name: "Tư vấn viên" },
        { _id: '5', code: 'staffReview', name: "Bác sĩ" },
        { _id: '6', code: 'csReview', name: "Chăm sóc khách hàng" },
        { _id: '7', code: 'branchReview', name: "Chi nhánh" },

        // { _id: '2', code: 'staffReview', name: "Bác sĩ" },
        // { _id: '3', code: 'branchReview', name: "Chi nhánh" },
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
                    reaction: 'VERY_GOOD',
                    treatmentDetailId: props?.route?.params?.data?.treatmentDetailId,
                    doctorCode: props?.route?.params?.data?.doctorCode,
                    serviceCode: props?.route?.params?.data?.serviceCode,
                    branchCode: props?.route?.params?.data?.branchCode,
                    serviceReview: {
                        comment: "",
                        rating: 5,
                        isSelected: false
                    },
                    securityReview: {
                        comment: "",
                        rating: 5,
                        isSelected: false
                    },
                    receptionReview: {
                        comment: "",
                        rating: 5,
                        isSelected: false
                    },
                    consultantReview: {
                        comment: "",
                        rating: 5,
                        isSelected: false
                    },
                    staffReview: {
                        comment: "",
                        rating: 5,
                        isSelected: false
                    },
                    csReview: {
                        comment: "",
                        rating: 5,
                        isSelected: false
                    },
                    branchReview: {
                        comment: "",
                        rating: 5,
                        isSelected: false
                    },
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
                        reaction: 'VERY_GOOD',
                        messageId: props?.route?.params?.data?._id,
                        treatmentDetailId: props?.route?.params?.data?.template?.data?.treatmentDetailId,
                        doctorCode: props?.route?.params?.data?.template?.data?.doctorCode,
                        serviceCode: props?.route?.params?.data?.template?.data?.serviceCode,
                        branchCode: props?.route?.params?.data?.template?.data?.branchCode,
                        serviceReview: {
                            comment: "",
                            rating: 5,
                            isSelected: false
                        },
                        securityReview: {
                            comment: "",
                            rating: 5,
                            isSelected: false
                        },
                        receptionReview: {
                            comment: "",
                            rating: 5,
                            isSelected: false
                        },
                        consultantReview: {
                            comment: "",
                            rating: 5,
                            isSelected: false
                        },
                        staffReview: {
                            comment: "",
                            rating: 5,
                            isSelected: false
                        },
                        csReview: {
                            comment: "",
                            rating: 5,
                            isSelected: false
                        },
                        branchReview: {
                            comment: "",
                            rating: 5,
                            isSelected: false
                        },
                    })
                }
            }
        }



    }, [])

    const _prepareReviewForTreatmentDetail = async (treatmentDetailIdProps) => {
        // let result = await getPrepareReviewForTreatmentDetail(treatmentDetailIdProps);
        // if (result?.isAxiosError) return

        // let listItemTemp = [...listItem];
        // console.log({ listItemTemp });
        // if (result?.data?.data?.saleId) {
        //     listItemTemp?.push({ _id: '4', code: 'saleReview', name: "Sale" })
        // }
        // if (result?.data?.data?.consultantId) {
        //     listItemTemp?.push({ _id: '4', code: 'consultantReview', name: "Tư vấn viên" })
        // }
        // if (result?.data?.data?.auditId) {
        //     listItemTemp?.push({ _id: '6', code: 'auditReview', name: "Audit" })
        // }
        // setListItem(listItemTemp)

    }

    const _getDataReview = async (treatmentDetailIdProps) => {

        let resultGetReviewByTreatmentDetailForPartner = await getReviewByTreatmentDetailForPartner(treatmentDetailIdProps)
        if (resultGetReviewByTreatmentDetailForPartner?.isAxiosError) return

        setDataForFetch(resultGetReviewByTreatmentDetailForPartner?.data?.data)

        setReaction(resultGetReviewByTreatmentDetailForPartner?.data?.data?.reaction)

        // let arrayKey = ['branchReview', 'serviceReview', 'staffReview', 'saleReview', 'consultantReview', 'auditReview'];
        let arrayKey = [
            "serviceReview",
            "securityReview",
            "receptionReview",
            "consultantReview",
            "staffReview",
            "csReview",
            "branchReview"
        ];
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
                securityReview: {
                    ...old?.securityReview,
                    rating: star
                },
                receptionReview: {
                    ...old?.receptionReview,
                    rating: star
                },
                consultantReview: {
                    ...old?.consultantReview,
                    rating: star
                },
                staffReview: {
                    ...old?.staffReview,
                    rating: star
                },
                csReview: {
                    ...old?.csReview,
                    rating: star
                },
                branchReview: {
                    ...old?.branchReview,
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
                securityReview: {
                    ...old?.securityReview,
                    comment: text
                },
                receptionReview: {
                    ...old?.receptionReview,
                    comment: text
                },
                consultantReview: {
                    ...old?.consultantReview,
                    comment: text
                },
                staffReview: {
                    ...old?.staffReview,
                    comment: text
                },
                csReview: {
                    ...old?.csReview,
                    comment: text
                },
                branchReview: {
                    ...old?.branchReview,
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
                        rating: 5,
                        isSelected: false
                    }
                }
            });
        }

        //    return setShowModalCongrats(true)

        // return console.log({ dataForFetchTemp });

        let resultCreateReviewTreatment = await createReviewTreatment(dataForFetchTemp)
        if (resultCreateReviewTreatment?.isAxiosError) return

        // setShowModalCongrats(true)

        navigation.goBack()

    }

    const _handleSetReaction = (starCount) => {
        console.log({ starCount });
        switch (starCount) {
            case 1:
                setReaction("VERY_BAD")
                break;
            case 2:
                setReaction("BAD")
                break;
            case 3:
                setReaction("NOT_GOOD")
                break;
            case 4:
                setReaction("GOOD")
                break;
            case 5:
                setReaction("VERY_GOOD")
                break;

            default:
                break;
        }
    }

    const renderGif = (indexCountStar) => {
        switch (indexCountStar) {
            case 1:
                return (
                    <Image
                        style={styles.gif}
                        source={require('../../Gif/1-g.gif')} />
                )
            case 2:
                return (
                    <Image
                        style={styles.gif}
                        source={require('../../Gif/2-g.gif')} />
                )
            case 3:
                return (
                    <Image
                        style={styles.gif}
                        source={require('../../Gif/3-g.gif')} />
                )
            case 4:
                return (
                    <Image
                        style={styles.gif}
                        source={require('../../Gif/4-g.gif')} />
                )
            case 5:
                return (
                    <Image
                        style={styles.gif}
                        source={require('../../Gif/5-g.gif')} />
                )

            default:
                break;
        }
    }

    const isDisableEdited = useMemo(() => {
        if (props?.route?.params?.data?.template?.data?.interacted || props?.route?.params?.data?.hasReview) {
            return true
        } else {
            return false
        }
    }, [props?.route?.params?.data])

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <View style={{ height: top }} />

                {/* <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} /> */}
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

                {/* {
                    props?.route?.params?.data?.template?.data?.interacted || props?.route?.params?.data?.hasReview ?
                        <View style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                            zIndex: 100
                        }} />
                        :
                        <></>
                } */}

                <ScrollView>

                    <Text style={[stylesFont.fontNolan500, styles.title]}>
                        Cảm nhận của bạn về dịch vụ như thế nào?
                    </Text>
                    <Text style={[stylesFont.fontNolan500, styles.title_2, { marginHorizontal: _moderateScale(16) }]}>
                        Ý kiến của bạn sẽ giúp chúng tôi tiếp tục cải thiện  và cung cấp trải nghiệm dịch vụ tốt nhất có thể.
                    </Text>

                    {
                        renderGif(indexCountStar)
                    }

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'center', marginVertical: _moderateScale(0), borderRadius: _moderateScale(32), backgroundColor: 'white', marginHorizontal: _moderateScale(8 * 5) }, shadow]}>

                        {
                            [1, 2, 3, 4, 5]?.map((item, index) => {
                                if (index + 1 > indexCountStar) {
                                    return (
                                        <TouchableOpacity
                                            disabled={isDisableEdited}
                                            key={index}
                                            onPress={() => {
                                                _handleSetReaction(index + 1)
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
                                        disabled={isDisableEdited}
                                        key={index}
                                        onPress={() => {
                                            _handleSetReaction(index + 1)
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
                        true ?
                            <View style={{ marginBottom: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), alignSelf: 'center', marginTop: 8 }]}>
                                    Điều gì khiến bạn <Text style={{ ...stylesFont.fontNolanBold, color: RED }}>KHÔNG</Text> hài lòng?
                                </Text>
                                <View style={[styleElement.rowAliCenter, { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                                    {
                                        listItem.map((item, index) => {

                                            if (listItemNotGood?.find(itemFind => itemFind?.code == item?.code)) {
                                                return (
                                                    <TouchableOpacity
                                                        disabled={isDisableEdited}
                                                        key={item?._id}
                                                        onPress={() => {
                                                            setListItemNotGood(old => [...old].filter(itemFilter => itemFilter?.code !== item?.code))
                                                        }}
                                                        style={[{
                                                            // width: "30%",
                                                            paddingHorizontal: _moderateScale(8 * 2),
                                                            borderWidth: _moderateScale(1),
                                                            borderRadius: _moderateScale(4),
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            paddingVertical: _moderateScale(4),
                                                            borderColor: RED,
                                                            backgroundColor: RED,
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
                                                    disabled={isDisableEdited}
                                                    key={item?._id}
                                                    onPress={() => {
                                                        setListItemNotGood(old => [...old, item])
                                                        // _handleSetStarSpecific(item) 
                                                    }}
                                                    style={[{
                                                        // width: "30%",
                                                        paddingHorizontal: _moderateScale(8 * 2),
                                                        borderWidth: _moderateScale(1),
                                                        borderRadius: _moderateScale(4),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingVertical: _moderateScale(4),
                                                        borderColor: BASE_COLOR,
                                                        marginBottom: _moderateScale(8 * 1),

                                                    }, { marginHorizontal: _moderateScale(8) }]}>
                                                    <Text style={[stylesFont.fontNolan500, { color: BLACK }]}>
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

                    <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), alignSelf: 'center' }]}>
                            Chia sẽ thêm với chúng tôi nhé!
                        </Text>
                        <View style={{
                            minHeight: _moderateScale(8 * 12),
                            // backgroundColor: FIFTH_COLOR,
                            marginTop: _moderateScale(8),
                            borderRadius: _moderateScale(4),
                            padding: _moderateScale(8),
                            paddingHorizontal: _moderateScale(8 * 2),
                            borderWidth: 1,
                            borderColor: BASE_COLOR
                        }}>
                            <TextInput
                                editable={!isDisableEdited}
                                value={description}
                                onChangeText={(e) => _handleOnchangeText(e)}
                                placeholder={'Ý kiến của bạn sẽ giúp chúng tôi tiếp tục cải thiện  và cung cấp trải nghiệm dịch vụ tốt nhất có thể.'}
                                multiline
                                style={{
                                    flex: 1,
                                    fontSize: _moderateScale(14)
                                }} />
                        </View>
                    </View>

                </ScrollView>
                <View style={{ flex: 1 }} />
                {
                    isDisableEdited ?
                        <>
                        </>
                        :
                        <View style={{}}>
                            <TouchableOpacity
                                onPress={_handleConfirmFeedBack}
                                style={[styles.btnConfirm, { marginBottom: bottom }]}>
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                    Gửi đánh giá
                                </Text>
                            </TouchableOpacity>
                        </View>
                }


            </KeyboardAvoidingView>
        </View>
    );
});

const styles = StyleSheet.create({
    gif: {
        width: _moderateScale(8 * 18),
        height: _moderateScale(8 * 18),
        alignSelf: 'center'
    },
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 3),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getBottomSpace() + _moderateScale(8 * 2),
        backgroundColor: BASE_COLOR,
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
        fontSize: _moderateScale(14),
        color: GREY,
        alignSelf: 'center',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    title: {
        fontSize: _moderateScale(16),
        color: BLACK_OPACITY_8,
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: _moderateScale(8 * 2)
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}


export default index;
