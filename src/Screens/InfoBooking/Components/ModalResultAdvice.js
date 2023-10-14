import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageView from "react-native-image-viewing";
import Modal from 'react-native-modal';
import { BG_GREY_OPACITY_2, BLACK, BLUE_FB, GREEN_SUCCESS, GREY, GREY_FOR_TITLE } from '../../../Constant/Color';
import * as Color from '../../../Constant/Color';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';

const ModalResultAdvice = props => {

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)


    const _onModalShow = () => {
        console.log({ x: props });
    }

    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'flex-end'
        }}
            animationIn='zoomIn'
            animationOut='zoomOut'
            isVisible={props?.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? true : true}
            onModalShow={_onModalShow}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
            }}>

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

            <View style={styles.modalFilter}>
                <View style={{ alignItems: 'flex-end', paddingRight: _moderateScale(8 * 2), marginBottom: 0 }}>
                    <TouchableOpacity
                        onPress={() => {
                            props?.hide()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={{
                    ...stylesFont.fontNolan500,
                    fontSize: _moderateScale(16),
                    color: GREY_FOR_TITLE,
                    alignSelf: 'center'
                }}>
                    Chi tiết Tư vấn  {props?.data?.booking?.partner?.name}
                </Text>
                <ScrollView>
                    {/* <View style={{ padding: _moderateScale(8),flexDirection:'row',alignItems:'center' }}> */}
                    <ScrollView style={{padding: _moderateScale(8)}} horizontal>
                        {
                            props?.data?.booking?.evidenceImages?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setShowImageViewing(true)
                                            setIndexCurrImageView(index)
                                            setListImagesSeeCurr(props?.data?.booking?.evidenceImages)
                                        }}
                                        style={{
                                            marginRight: _moderateScale(8 * 1.5),
                                            paddingRight: _moderateScale(8 * 2.5) / 2,
                                            paddingTop: _moderateScale(8 * 2.5) / 2,
                                        }}>

                                        <Image
                                            style={{
                                                width: _moderateScale(8 * 15),
                                                height: _moderateScale(8 * 20),
                                                borderRadius: _moderateScale(8)
                                            }}
                                            source={{ uri: `${URL_ORIGINAL}${item?.link}` }} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    {/* </View> */}

                    <View style={{
                        padding: _moderateScale(8)
                    }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), marginBottom: _moderateScale(4), color: BLUE_FB }}>
                            Tình trạng khách hàng
                        </Text>
                        {
                            props?.data?.booking?.consultationInfo?.tags?.map((item, index) => {
                                return (
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), color: BLACK }}>
                                        {`  `} {index + 1}. {item?.name}
                                    </Text>
                                )
                            })
                        }
                    </View>
                    <View style={{
                        width: '100%',
                        height: _moderateScale(8),
                        backgroundColor: BG_GREY_OPACITY_2
                    }} />

                    <View style={{
                        padding: _moderateScale(8)
                    }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), marginBottom: _moderateScale(4), color: BLUE_FB }}>
                            Dịch vụ khuyến nghị:
                        </Text>
                        {
                            props?.data?.booking?.consultationInfo?.consultedServices?.map((item, index) => {

                                if (props?.data?.booking?.consultationInfo?.acceptedServices?.find(itemFind => itemFind?.code == item?.code)) {
                                    return (
                                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), color: GREEN_SUCCESS }}>
                                            {`  `} {index + 1}. {item?.name} {`( Khách chọn )`}
                                        </Text>
                                    )
                                } else {
                                    return (
                                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), color: GREY }}>
                                            {`  `} {index + 1}. {item?.name}
                                        </Text>
                                    )
                                }


                            })
                        }
                    </View>
                    <View style={{
                        width: '100%',
                        height: _moderateScale(8),
                        backgroundColor: BG_GREY_OPACITY_2
                    }} />

                    <View style={{
                        padding: _moderateScale(8)
                    }}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), marginBottom: _moderateScale(4), color: BLUE_FB }}>
                            Ghi chú tư vấn
                        </Text>
                        <View style={{
                            padding: _moderateScale(8),
                            // paddingTop:0
                        }}>
                            <Text>
                                {props?.data?.booking?.consultationNote?.trim()}
                            </Text>
                        </View>
                    </View>



                    <View style={{ height: 100 }} />
                </ScrollView>





            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalFilter: {
        width: "100%",
        backgroundColor: Color.WHITE,
        borderRadius: _widthScale(8 * 2),
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        backgroundColor: Color.WHITE,
        paddingVertical: _heightScale(8 * 2),
        height: "85%"
    },
    viewContent: {
        paddingHorizontal: _widthScale(8 * 3),
    },
    content: {
        fontSize: _widthScale(14),
        // lineHeight: _heightScale(16),
        color: Color.GREY
    },
    cancelBtn: {
        alignSelf: 'flex-end',
        padding: _widthScale(8),
        marginTop: _heightScale(8),
    },
    cancelBtn__text: {
        fontSize: _widthScale(16),
        color: Color.BASE_COLOR
    }
})



export default ModalResultAdvice;