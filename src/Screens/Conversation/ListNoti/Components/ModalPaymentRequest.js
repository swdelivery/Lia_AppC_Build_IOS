import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { _moderateScale } from '../../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, GREY_FOR_TITLE } from '../../../../Constant/Color';
import { stylesFont } from '../../../../Constant/Font';
import { styleElement } from '../../../../Constant/StyleElement';
import { sizeIcon } from '../../../../Constant/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ModalAddDeposit from './ModalAddDeposit'
import { alertCustomNotAction, formatMonney } from '../../../../Constant/Utils';
import moment from 'moment'
import { URL_ORIGINAL } from '../../../../Constant/Url';
import ImageView from "react-native-image-viewing";



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


                <KeyboardAwareScrollView
                    extraHeight={100}
                    enableAutomaticScroll={true}
                    extraScrollHeight={100}
                >

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: "#EC3A79", alignSelf: 'center' }]}>
                        CHI TIẾT YÊU CẦU
                    </Text>


                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: GREY, marginTop: _moderateScale(8) }]}>
                       Tiền: {
                             <Text style={[stylesFont.fontNolan500, { textTransform: 'uppercase', fontSize: _moderateScale(16), color: "#EC3A79", marginTop: _moderateScale(8) }]}>
                                    {formatMonney(props?.data?.amount)}
                                </Text>
                        }
                        
                    </Text>
                    <Text style={{fontSize: _moderateScale(14), color: GREY_FOR_TITLE}}>
                            ({props?.data?.method?.name})
                        </Text>
                    {/* <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(0) }]}>
                        {props?.data?.branch?.address}
                    </Text> */}

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: _moderateScale(8) }}>
                    
                    </View>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: GREY, marginTop: _moderateScale(8) }]}>
                        Thời gian tạo:     {
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: '#EC3A79' }]}>
                                {moment(props?.data?.created).format('DD-MM-YYYY HH:mm')} 
                            </Text>
                        }
                    </Text>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BASE_COLOR, marginTop: _moderateScale(8 * 2)}]}>
                        Hình ảnh
                    </Text>
                    <View>
                        {/* <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: GREY,marginLeft: _moderateScale(8), marginTop: _moderateScale(8) }]}>
                            Trước điều trị:
                        </Text> */}
                        <View style={[styles.listImage]}>
                            {
                                
                                props?.data?.images.map((item,index)=>{
                                    return <>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowImageViewing(true)
                                                setIndexCurrImageView(index)
                                                setListImagesSeeCurr(props?.data?.images)
                                            }}>

                                        <Image
                                        style={[styles.image,{width:_moderateScale(80), height:_moderateScale(80)}]}
                                        resizeMode="cover"
                                        source={{uri:(`${URL_ORIGINAL}/${item?.path}`)}} />

                                        </TouchableOpacity>
                                    </>
                                })
                            }
                        </View>
                    </View>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BASE_COLOR, marginTop: _moderateScale(8 * 2), marginLeft: _moderateScale(8) }]}>
                        Ghi chú
                    </Text>
                    <View style={{ backgroundColor: FIFTH_COLOR, width: "100%", padding: _moderateScale(8 * 2), borderRadius: _moderateScale(8), marginTop: _moderateScale(8) }}>
                    
                        <Text style={styles.textInput} >
                            {props?.data?.description}
                        </Text>
                    </View>

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 5) }]}>
                        <TouchableOpacity
                            onPress={props?.hide}
                            style={[styles.btnConfirm, { backgroundColor: BTN_PRICE }]}>
                            <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                                Đóng
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: _moderateScale(8 * 3) }} />

                </KeyboardAwareScrollView>

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
        borderRadius: _moderateScale(8)
    },
    listImage:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    image:{
        margin: _moderateScale(4)
    }
})

export default ModalInfoBooking;