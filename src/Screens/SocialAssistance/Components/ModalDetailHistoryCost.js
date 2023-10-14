import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _width } from '../../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BTN_PRICE, BASE_COLOR } from '../../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { styleElement } from '../../../Constant/StyleElement';
import { formatMonney } from '../../../Constant/Utils';
import moment from 'moment'
import ImageView from "react-native-image-viewing";
import _isEmpty from 'lodash/isEmpty'

const ModalDetailHistoryCost = memo((props) => {

    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [showListImagesSee, setShowListImagesSee] = useState(false)
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'center',
                paddingBottom: getBottomSpace() + _moderateScale(8 * 2)
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
            }}>

            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item.link}`,
                    }
                })}

                onRequestClose={() => {
                    setShowListImagesSee(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showListImagesSee}
            />

            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BASE_COLOR }]}>CHI TIẾT</Text>
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BASE_COLOR }]}>{props?.data?.title}</Text>

                    <View style={{ height: _moderateScale(8) }} />
                    <View style={[styleElement.rowAliCenter]}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>Thời gian: </Text>
                        <Text style={[stylesFont.fontNolanBold, { marginLeft: _moderateScale(8 * 2), fontSize: _moderateScale(16), color: BASE_COLOR }]}>
                            {moment(props?.data?.time).format('LL')}
                        </Text>
                    </View>
                    <View style={[styleElement.rowAliCenter]}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>Tổng tiền: </Text>
                        <Text style={[stylesFont.fontNolanBold, { marginLeft: _moderateScale(8 * 2), fontSize: _moderateScale(16), color: BASE_COLOR }]}>
                            {formatMonney(props?.data?.amount)}
                        </Text>
                    </View>
                    <View style={{ height: _moderateScale(8) }} />
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                        {props?.data?.description}
                    </Text>
                    <View style={{ height: _moderateScale(8) }} />
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BASE_COLOR }]}>Hình ảnh</Text>

                    {
                        !_isEmpty(props?.data?.images) ?
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: _moderateScale(4) }}>
                                {
                                    props?.data?.images?.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setListImagesSeeCurr(props?.data?.images)
                                                    setShowListImagesSee(true)
                                                    setIndexCurrImageView(index)
                                                }}
                                                key={item?._id} style={{ marginRight: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2), borderRadius: _moderateScale(8), overflow: 'hidden' }}>
                                                <Image
                                                    style={styles.image}
                                                    source={{ uri: `${URL_ORIGINAL}${item?.link}` }} />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            :
                            <View>
                                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }]}>
                                    Chưa có dữ liệu ảnh
                                </Text>
                            </View>
                    }


                    <View style={{ height: _moderateScale(8 * 4) }} />
                    <TouchableOpacity
                        onPress={props?.hide}
                        style={{
                            paddingHorizontal: _moderateScale(8 * 2),
                            paddingVertical: _moderateScale(4),
                            backgroundColor: BTN_PRICE,
                            alignSelf: 'flex-start',
                            borderRadius: _moderateScale(8)
                        }}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>
                            Đóng
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
});


const styles = StyleSheet.create({
    image: {
        width: _widthScale(8 * 9),
        height: _moderateScale(8 * 10)
    },
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: BLUE_FB,
        paddingVertical: _moderateScale(6),
        marginTop: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputSize: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: BG_GREY_OPACITY_2,
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        borderRadius: _moderateScale(8)
    },
    container: {
        width: _width - _moderateScale(8 * 6),
        // height: _moderateScale(8 * 30),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2)
    }
})

export default ModalDetailHistoryCost;