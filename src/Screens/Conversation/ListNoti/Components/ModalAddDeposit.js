import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { _moderateScale } from '../../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, BLACK_OPACITY_8, BLUE_FB, BG_GREY_OPACITY_5, RED } from '../../../../Constant/Color';
import { stylesFont } from '../../../../Constant/Font';
import { styleElement } from '../../../../Constant/StyleElement';
import { sizeIcon } from '../../../../Constant/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import _isEmpty from 'lodash/isEmpty'
import { alertCustomNotAction } from '../../../../Constant/Utils';
import { uploadModule, createPaymentRequest } from '../../../../Redux/Action/BookingAction';
import { navigation } from '../../../../../rootNavigation';
import ScreenKey from '../../../../Navigation/ScreenKey';

const ModalInfoBooking = memo((props) => {

    const [currTab, setCurrTab] = useState('1')

    const [listImageBanking, setListImageBanking] = useState([])
    const [noteDeposit, setNoteDeposit] = useState('')

    const [moneyDepositTab1, setMoneyDepositTab1] = useState('')

    const _handlePickImage = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 6,
            mediaType: 'photo',
            // cropping:true,
            compressImageQuality: 0.5,
            compressImageMaxWidth: 700,
            // compressVideoPreset:'LowQuality' 
        }).then(async (images) => {

            setListImageBanking(old => [...old, ...images])
            // let listImages = images.map((i, index) => {
            //     return {
            //         uri: i.path,
            //         width: i.width,
            //         height: i.height,
            //         mime: i.mime,
            //         type: i.mime,
            //         name: `${i.modificationDate}_${index}`
            //     };
            // })
            // let resultUploadImageMessage = await handleApi(_uploadModule({
            //     moduleName: 'chatMessage',
            //     files: listImages
            // }))
            // if (resultUploadImageMessage.error) return

            // let listIdImageHasUpload = resultUploadImageMessage.data.map(item => item._id);
        }).catch(e => { });
    }

    const _handleConfirmCreatePaymentRequest = async () => {



        if (currTab == '1') {
            if (_isEmpty(moneyDepositTab1) || _isEmpty(listImageBanking)) {
                return alertCustomNotAction(`Lỗi`, `Nhập đầy đủ các trường cần thiết`)
            }
            if (isNaN(Number(moneyDepositTab1.split('.')?.join('')))) {
                return alertCustomNotAction(`Lỗi`, `Sai định dạng giá tiền`)
            }

            let listImages = listImageBanking.map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })

            let resultUploadImage = await uploadModule({
                moduleName: 'paymentRequest',
                files: listImages
            })
            if (resultUploadImage.isAxiosError) return

            let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);
            console.log({ listIdImageHasUpload });

            let dataFetchCreatePaymentRequest = {
                bookingId: props?.data?._id,
                paymentFor: "DEPOSIT",
                amount: Number(moneyDepositTab1?.split('.')?.join('')),
                isRefund: false,
                methodCode: "CARDTRANSFER",
                currencyCode: "VND",
                description: noteDeposit,
                images: listIdImageHasUpload
            }
            console.log({ dataFetchCreatePaymentRequest });

            let resultCreatePaymentRequest = await createPaymentRequest(dataFetchCreatePaymentRequest);
            if (resultCreatePaymentRequest?.isAxiosError) return;

            setListImageBanking([])
            setNoteDeposit('')
            setMoneyDepositTab1('')
            props?.hideAll()
            navigation.navigate(ScreenKey.LIST_DEPOSIT_REQUEST)

        }
    }

    console.log('list', listImageBanking)

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
                <KeyboardAwareScrollView
                    extraHeight={100}
                    enableAutomaticScroll={true}
                    extraScrollHeight={100}
                >

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: "#EC3A79", alignSelf: 'center' }]}>
                        ĐẶT CỌC
                    </Text>


                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8 * 3) }]}>
                        <TouchableOpacity
                            onPress={() => setCurrTab('1')}
                            style={[styles.btnTab, currTab == '1' && styles.btnTabActive]}>
                            <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '1' && ({ color: "#EC3A79" })]}>
                                Chuyển khoản
                            </Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            onPress={() => setCurrTab('2')}
                            style={[styles.btnTab, currTab == '2' && styles.btnTabActive]}>
                            <Text style={[stylesFont.fontNolan500, styles.btnTab__text, currTab == '2' && ({ color: "#EC3A79" })]}>
                                Ví
                            </Text>
                        </TouchableOpacity> */}
                    </View>

                    {
                        currTab == '1' ?
                            <View style={{ height: _moderateScale(8 * 32) }}>
                                {/* <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), marginTop: _moderateScale(8 * 2), fontStyle: 'italic', color: BLACK_OPACITY_8 }]}>
                                    Thông tin tài khoản ngân hàng
                                </Text> */}
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), marginTop: _moderateScale(8 * 2), color: BG_SERVICE }]}>
                                HO KINH DOANH TRANG BEAUTY
                                </Text>
                                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), marginTop: _moderateScale(0), color: BLACK_OPACITY_8 }]}>
                                Vietcombank, chi nhánh Thủ Thiêm
                                </Text>
                                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(4) }]}>
                                    <Text style={[stylesFont.fontNolanBold, { flex: 1, fontSize: _moderateScale(14), color: BG_SERVICE }]}>
                                        STK: {
                                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), marginTop: _moderateScale(4), color: BG_SERVICE }]}>
                                                8886668866
                                        </Text>
                                        }
                                    </Text>
                                    <TouchableOpacity 
                                    onPress={() => {
                                        Clipboard.setString('8886668866')
                                    }}
                                    style={styles.btnCopy}>
                                        <Text style={[stylesFont.fontNolan, styles.btnCopy__text]}>Copy</Text>
                                    </TouchableOpacity>
                                </View>

                                <TextInput
                                    value={moneyDepositTab1}

                                    onChangeText={(e) => {
                                        setMoneyDepositTab1(e.split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
                                    }}
                                    keyboardType={'number-pad'}
                                    style={[stylesFont.fontNolan, styles.inputDeposit, { marginTop: _moderateScale(8) }]}
                                    placeholder={"Nhập số tiền cọc"} />

                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BASE_COLOR, marginTop: _moderateScale(8) }]}>
                                    Ảnh chuyển khoản
                                </Text>
                                <View style={{ flex: 1 }}>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                        {
                                            listImageBanking?.map((item, index) => {
                                                return (
                                                    <View key={index}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setListImageBanking(old => old.filter(itemFilter => itemFilter?.path !== item?.path))
                                                            }}
                                                            hitSlop={styleElement.hitslopSm}
                                                            style={{
                                                                backgroundColor: RED,
                                                                width: _moderateScale(8 * 2),
                                                                height: _moderateScale(8 * 2),
                                                                borderRadius: _moderateScale(8 * 2 / 2),
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                position: 'absolute',
                                                                zIndex: 1,
                                                                right: 0
                                                            }}>
                                                            <View style={{
                                                                width: _moderateScale(8),
                                                                height: _moderateScale(1),
                                                                backgroundColor: WHITE
                                                            }} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ flex: 1 }}>
                                                            <Image style={styles.btnAddImage} source={{ uri: item?.path }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }

                                        <TouchableOpacity
                                            onPress={_handlePickImage}
                                            style={styles.btnAddImage}>
                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                                                + Thêm
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>

                            </View>
                            : <></>
                    }
                    {
                        currTab == '2' ?
                            <View style={{ height: _moderateScale(8 * 32) }}>
                                <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), marginTop: _moderateScale(8 * 2), fontStyle: 'italic', color: BLACK_OPACITY_8 }]}>
                                    Số dư ví hiện tại
                                </Text>
                                <Text style={[stylesFont.fontNolanBold, { alignSelf: 'center', fontSize: _moderateScale(22), marginTop: _moderateScale(4), color: BG_SERVICE }]}>
                                    5.500.000
                                </Text>

                                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                    <Text style={[stylesFont.fontNolan500, { marginBottom: _moderateScale(8), fontSize: _moderateScale(16), color: BASE_COLOR, marginTop: _moderateScale(16) }]}>
                                        Số tiền cọc
                                    </Text>
                                    <TextInput
                                        style={[stylesFont.fontNolan, styles.inputDeposit]}
                                        placeholder={"vd: 1.500.000"} />
                                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), marginTop: _moderateScale(8), color: BLACK_OPACITY_8, fontStyle: 'italic' }]}>
                                        {`Nhập tổng tiền muốn cọc cho booking \n`}{
                                            <Text style={[stylesFont.fontNolan500]}>{`(số tiền < số dư ví)`}</Text>
                                        }
                                    </Text>

                                </View>

                            </View>
                            : <></>
                    }

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BASE_COLOR, marginTop: _moderateScale(8 * 2), marginLeft: _moderateScale(8) }]}>
                        Ghi chú
                    </Text>
                    <View style={{ backgroundColor: FIFTH_COLOR, width: "100%", padding: _moderateScale(8 * 2), borderRadius: _moderateScale(8), marginTop: _moderateScale(8) }}>
                        <TextInput
                            // scrollEnabled={false}
                            value={noteDeposit}
                            onChangeText={(e) => {
                                setNoteDeposit(e)
                            }}
                            multiline
                            placeholder={'Nhập chú thích'}
                            style={styles.textInput} />
                    </View>

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 5) }]}>

                        <TouchableOpacity
                            onPress={_handleConfirmCreatePaymentRequest}
                            style={[styles.btnConfirm, { backgroundColor: BTN_PRICE }]}>
                            <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                                Đặt cọc
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
    inputDeposit: {
        fontSize: _moderateScale(14),
        color: BLACK_OPACITY_8,
        borderWidth: _moderateScale(0.75),
        borderColor: BASE_COLOR,
        borderRadius: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    btnAddImage: {
        marginHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: _moderateScale(8),
        width: _moderateScale(8 * 10),
        // height:_moderateScale(8*25)
    },
    btnCopy__text: {
        fontSize: _moderateScale(12),
        color: BLUE_FB,
        bottom: 1
    },
    btnCopy: {
        paddingVertical: _moderateScale(2),
        paddingHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(4),
        borderWidth: _moderateScale(1),
        borderColor: BLUE_FB
    },
    btnTabActive: {
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: BTN_PRICE,
    },
    btnTab__text: {
        fontSize: _moderateScale(16),
        color: GREY
    },
    btnTab: {
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: _moderateScale(4),
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: 'transparent'
    },
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
        width: "100%",
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        height: _moderateScale(8 * 4)
    },
    textInput: {
        height: _moderateScale(8 * 4),
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
})

export default ModalInfoBooking;