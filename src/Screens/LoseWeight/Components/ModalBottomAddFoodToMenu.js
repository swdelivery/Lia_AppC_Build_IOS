import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _width } from '../../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB } from '../../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { styleElement } from '../../../Constant/StyleElement';


const ModalBottomAddFoodToMenu = memo((props) => {

    const [data, setData] = useState({})

    const [calo, setCalo] = useState(0);
    const [size, setSize] = useState(0)

    useEffect(() => {
        setData(props?.data)
        setCalo(props?.data?.calo)
        setSize(props?.data?.size)
    }, [props?.data])



    const _handleChangeSize = (e) => {
        console.log({
            sizeInput: e,
            calo: data?.calo,
            size: Number(data?.size)
        });
        if (isNaN(Number(e))) {
            return
        }
        setSize((e));
        setCalo(Number(e) * Number(data?.calo) / Number(data?.size))
    }

    const _handleAddFoodToMenu = async () => {
        props?.confirmAdd({
            size: size,
            foodCode: data?.code,
        })
    }

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'flex-end',
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
            <KeyboardAvoidingView
                // behavior="position"
                behavior={Platform.OS == 'ios' ? 'position' : null}
                enabled
            >
                <View style={styles.container}>
                    <ScrollView style={{ flexGrow: 1 }}>
                        <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2), flexDirection: 'row' }}>
                            {/* <Image 
                            style={{
                                width:_moderateScale(8*10),
                                height:_moderateScale(8*10),
                                backgroundColor:BG_GREY_OPACITY_2,
                                borderRadius:_moderateScale(8)
                            }}
                            source={{uri:`${URL_ORIGINAL}${props?.data?.representationFileArr[0]?.link}`}}/> */}
                            <View>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>
                                    {data?.name}
                                </Text>
                            </View>
                        </View>

                        <View style={[styleElement.rowAliCenter, styles.inputSize, { marginTop: _moderateScale(8) }]}>
                            <TextInput
                                onChangeText={(e) => _handleChangeSize(e)}
                                selectTextOnFocus
                                keyboardType={'number-pad'} 
                                value={`${size}`}
                                style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(16) }]}
                                placeholder={"Nhập khối lượng"} />
                            <Text style={{ marginHorizontal: _moderateScale(8), color: BG_GREY_OPACITY_5 }}>
                                |
                            </Text>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                                {data?.unit}
                            </Text>
                        </View>

                        <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>Carlo tương ứng</Text>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(22), alignSelf: 'center' }]}>
                                {parseFloat(Number(calo).toFixed(2))}
                            </Text>
                        </View>


                        <TouchableOpacity
                            onPress={_handleAddFoodToMenu}
                            style={styles.btnConfirm}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: WHITE }]}>Chọn</Text>
                        </TouchableOpacity>

                    </ScrollView>


                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
});

const styles = StyleSheet.create({
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
        width: _width - _moderateScale(8 * 4),
        // height: _moderateScale(8 * 30),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 4)
    }
})

export default ModalBottomAddFoodToMenu;