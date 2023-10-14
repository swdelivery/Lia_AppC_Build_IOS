import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { _moderateScale } from '../../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, SECOND_COLOR, BLACK, BLACK_OPACITY_7, BLUE_FB, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK_OPACITY_8, PRICE_ORANGE } from '../../../../Constant/Color';
import { stylesFont } from '../../../../Constant/Font';
import { styleElement } from '../../../../Constant/StyleElement';
import { sizeIcon } from '../../../../Constant/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ModalAddDeposit from './ModalAddDeposit'
import { alertCustomNotAction, formatMonney } from '../../../../Constant/Utils';
import moment from 'moment'
import { URL_ORIGINAL } from '../../../../Constant/Url';
import ImageView from "react-native-image-viewing";
import FastImage from 'react-native-fast-image';



const ModalInfoBooking = memo((props) => {

    const [showModalAddDeposit, setShowModalAddDeposit] = useState(false)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    useEffect(() => {
    }, [props?.data])


    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center',
            marginHorizontal: _moderateScale(8 * 4)
        }}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={150}
            animationOutTiming={500}
            isVisible={props.show}
            backdropTransitionOutTiming={0}
            useNativeDriverForBackdrop={true}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? true : true}
            onBackButtonPress={() => {
                props.hide()
            }}
            onBackdropPress={() => {
                props.hide()
            }}>
            <View style={[styles.container]}>

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

                <ModalAddDeposit
                    data={props?.data}
                    hide={() => setShowModalAddDeposit(false)}
                    show={showModalAddDeposit} />



                <View style={{ width: '100%', height: _moderateScale(8 * 4), backgroundColor: SECOND_COLOR, alignItems: 'center', justifyContent: 'center', borderRadius: _moderateScale(8) }}>


                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: WHITE, alignSelf: 'center' }]}>
                        CHI TIẾT ĐIỀU TRỊ
                    </Text>
                </View>

                <KeyboardAwareScrollView
                    extraHeight={100}
                    enableAutomaticScroll={true}
                    extraScrollHeight={100}
                >


                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(8 * 3) }]}>
                        Bác sĩ điều trị:
                    </Text>
                    <Text style={[stylesFont.fontNolanBold, { textTransform: 'uppercase', fontSize: _moderateScale(14), color: BLACK_OPACITY_7, marginTop: _moderateScale(0) }]}>
                        {props?.data?.doctor?.name}
                    </Text>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(8 * 2) }]}>
                        Chi nhánh: {

                        }
                    </Text>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }]}>
                        {
                            props?.data?.branch?.name
                        }
                    </Text>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(8 * 2) }]}>
                        Dịch vụ: {

                        }
                    </Text>
                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: _moderateScale(0) }}>

                        <View style={[styles.btnService]}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                                {props?.data?.serviceName}
                            </Text>
                        </View>

                    </View> */}


                    <View style={{ flexDirection: 'row', marginBottom: _moderateScale(8) }}>
                        {/* {
                            props?.data?.orderService?.service?.
                        } */}
                        {/* <FastImage
                            style={{
                                borderWidth: 1,
                                borderRadius: _moderateScale(8),
                                borderColor: BG_GREY_OPACITY_2,
                                backgroundColor: BG_GREY_OPACITY_2,
                                width: _moderateScale(8 * 7),
                                height: _moderateScale(8 * 7),
                            }}
                            source={{
                                uri: `${URL_ORIGINAL}${item?.service?.representationFileArr[0]?.link}`
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        /> */}
                        <View style={{ paddingLeft: _moderateScale(0), flex: 1 }}>
                            <Text numberOfLines={1} style={[stylesFont.fontNolanBold, {
                                fontSize: _moderateScale(15),
                                color: BLACK_OPACITY_8,
                                marginTop: _moderateScale(0),
                            }]}>
                                {props?.data?.orderService?.serviceName}
                            </Text>
                            {/* <Text style={[stylesFont.fontNolanBold, {
                                fontSize: _moderateScale(14),
                                color: GREY,
                                marginTop: _moderateScale(0),
                            }]}>
                                {props?.data?.orderService?.options?.map((itemTopping, indexTopping) => {
                                    if (indexTopping == props?.data?.orderService?.options?.length - 1) {
                                        return `${itemTopping?.name}.`
                                    }
                                    return `${itemTopping?.name}, `
                                })}
                            </Text> */}
                            {
                                props?.data?.orderService?.options?.map((itemTopping, indexTopping) => {
                                    return (
                                        <View>
                                            <Text style={[stylesFont.fontNolanBold, {
                                                fontSize: _moderateScale(14),
                                                color: GREY,
                                                marginTop: _moderateScale(0),
                                            }]}>
                                                - {itemTopping?.name}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{ marginLeft: _moderateScale(4) }}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: PRICE_ORANGE }}>
                                {
                                    formatMonney(props?.data?.orderService?.finalPrice)
                                }
                            </Text>
                        </View>
                    </View>


                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(8 * 2) }]}>
                        Thời gian bắt đầu
                    </Text>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }]}>
                        {moment(props?.data?.created).format('LT')} -  {moment(props?.data?.created).format('DD/MM/YYYY')}
                    </Text>

                    {
                        props?.data?.completeAt ?
                            <>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(8 * 2) }]}>
                                    Thời gian hoàn thành
                                </Text>
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BLUE_FB }]}>
                                    {moment(props?.data?.completeAt).format('LT')} -  {moment(props?.data?.completeAt).format('DD/MM/YYYY')}
                                </Text>
                            </>
                            :
                            <></>
                    }




                    {/* <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: GREY, marginTop: _moderateScale(8) }]}>
                        Thời gian:     {
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: '#EC3A79' }]}>
                                {moment(props?.data?.created).format('LT')} -  {moment(props?.data?.completeAt).format('LT')}
                            </Text>
                        }
                    </Text>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(18), color: BG_SERVICE, alignSelf: 'flex-end' }]}>
                        {moment(props?.data?.appointmentDateFinal?.date).format("DD/MM/YYYY")}
                    </Text> */}


                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(8 * 2) }]}>
                        Hình ảnh
                    </Text>

                    <View>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginLeft: _moderateScale(8), marginTop: _moderateScale(8) }]}>
                            Trước điều trị:
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    props?.data?.imageBeforeTreatment.map((item, index) => {
                                        return <>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowImageViewing(true)
                                                    setIndexCurrImageView(index)
                                                    setListImagesSeeCurr(props?.data?.imageBeforeTreatment)
                                                }}>

                                                <Image
                                                    style={[styles.image, { width: _moderateScale(80), height: _moderateScale(80), borderRadius: _moderateScale(8), borderWidth: 1, borderColor: BG_GREY_OPACITY_5 }]}
                                                    resizeMode="cover"
                                                    source={{ uri: (`${URL_ORIGINAL}/${item?.path}`) }} />

                                            </TouchableOpacity>
                                        </>
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>

                    <View>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, marginLeft: _moderateScale(8), marginTop: _moderateScale(8) }]}>
                            Sau điều trị:
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    props?.data?.imageAfterTreatment.map((item, index) => {
                                        return <>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowImageViewing(true)
                                                    setIndexCurrImageView(index)
                                                    setListImagesSeeCurr(props?.data?.imageAfterTreatment)
                                                }}>
                                                <Image
                                                    style={[styles.image, { width: _moderateScale(80), height: _moderateScale(80), borderRadius: _moderateScale(8), borderWidth: 1, borderColor: BG_GREY_OPACITY_5 }]}
                                                    resizeMode="cover"
                                                    source={{ uri: (`${URL_ORIGINAL}/${item?.path}`) }} />
                                            </TouchableOpacity>
                                        </>
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>

                    {
                        props?.data?.description?.length > 0 ?
                            <>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BASE_COLOR, marginTop: _moderateScale(8 * 2), marginLeft: _moderateScale(8) }]}>
                                    Ghi chú
                                </Text>
                                <View style={{ backgroundColor: FIFTH_COLOR, width: "100%", padding: _moderateScale(8 * 2), borderRadius: _moderateScale(8), marginTop: _moderateScale(8) }}>

                                    <Text style={styles.textInput} >
                                        {props?.data?.description}
                                    </Text>
                                </View>
                            </>
                            :
                            <></>
                    }


                    <View style={{ height: _moderateScale(8 * 3) }} />

                </KeyboardAwareScrollView>
                <View style={[{ alignItems: 'flex-end', marginVertical: _moderateScale(8 * 1.5) }]}>
                    <TouchableOpacity
                        onPress={props?.hide}
                        style={[styles.btnConfirm, { backgroundColor: SECOND_COLOR, borderRadius: _moderateScale(8) }]}>
                        <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                            Đóng
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
});


const styles = StyleSheet.create({
    btnService: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_SERVICE,
        marginRight: _moderateScale(8),
        marginTop: _moderateScale(8)
    },
    btnConfirm__text: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    btnConfirm: {
        width: "45%",
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        height: _moderateScale(8 * 4)
    },
    textInput: {
        height: _moderateScale(8 * 8),
        fontSize: _moderateScale(14),
        textAlignVertical: 'top'
    },
    btnStar: {
        padding: _moderateScale(8),

    },
    container: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingTop: _moderateScale(20),
        // paddingBottom: _moderateScale(50),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(23),
        borderRadius: _moderateScale(8),
        height: '80%'
    },
    listImage: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    image: {
        margin: _moderateScale(4)
    }
})

export default ModalInfoBooking;