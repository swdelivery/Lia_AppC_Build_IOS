import { isEmpty } from 'lodash';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _moderateScale } from '../../Constant/Scale';
import { URL_ORIGINAL } from '../../Constant/Url';





const EditGalleryCurr = props => {



    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center',
        }}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={150}
            animationOutTiming={500}
            isVisible={props.isShowEditGalleryCurr}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props.closeModalShowEditGalleryCurr()
            }}
            onBackdropPress={() => {
                props.closeModalShowEditGalleryCurr()
            }}>
            <View style={styles.modalFilter}>
                <Text style={[stylesFont.fontNolan500, { color: Color.GREY_FOR_TITLE, fontSize: _moderateScale(16), alignSelf: 'center', marginBottom: _moderateScale(8 * 2) }]}>
                    Chỉnh sửa danh sách
                </Text>
                <ScrollView scrollIndicatorInsets={{right:1}} showsVerticalScrollIndicator={false}>
                    <View style={{ height: _moderateScale(8 * 2) }} />
                    {
                        !isEmpty(props?.galleryCurr) && props?.galleryCurr?.map((itemGall, indexGall) => {
                            return (
                                <View
                                    key={`${itemGall.name}`}
                                    style={{ alignSelf: 'center', marginTop: _moderateScale(8 * 2) }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.confirmRemoveImage(itemGall.name)
                                        }}
                                        style={{
                                            position: 'absolute',
                                            zIndex: 1,
                                            right: -10,
                                            top: -10,
                                            width: _moderateScale(8 * 3),
                                            height: _moderateScale(8 * 3),
                                            borderRadius: _moderateScale(8 * 3 / 2),
                                            backgroundColor: Color.RED,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <View style={{
                                            width: _moderateScale(8 * 1.5),
                                            height: _moderateScale(8 * 0.5),
                                            backgroundColor: Color.WHITE,
                                            borderRadius: _moderateScale(0)
                                        }} />
                                    </TouchableOpacity>
                                    <Image
                                        style={[styles.itemGall]}
                                        source={{
                                            // uri: `${itemGall.uri}`
                                            uri: itemGall?.link ? `${URL_ORIGINAL}${itemGall?.link}` : itemGall?.uri
                                        }} />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    itemGall: {
        width: _moderateScale(8 * 32),
        height: _moderateScale(8 * 25),
        borderRadius: _moderateScale(8)
    },
    itemUser: {
        marginTop: _moderateScale(8)
    },
    modalFilter: {
        width: "90%",
        height: "80%",
        // paddingVertical: _heightScale(30),
        paddingTop: _heightScale(20),
        paddingBottom: _heightScale(8 * 3),
        backgroundColor: Color.WHITE,
        borderRadius: _moderateScale(8)
    },
})

export default EditGalleryCurr;