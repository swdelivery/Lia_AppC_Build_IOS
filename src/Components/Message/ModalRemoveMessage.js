import { isEmpty } from 'lodash';
import React from 'react';
import { Platform, StyleSheet, Text, View, Alert,TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import FastImage from '../../Components/Image/FastImage';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _moderateScale, _widthScale, _width } from '../../Constant/Scale';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useDispatch } from 'react-redux';

import { removeMessage } from '../../Redux/Action/MessageAction'


const ModalRemoveMessage = props => {

    const dispatch = useDispatch()

    const _handleRemoveMessage = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn thu hồi tin nhắn này?",
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: () => {
                        dispatch(removeMessage(props?.data?._id))
                        props.closeModalRemoveMessage()
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'flex-end'
        }}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={150}
            animationOutTiming={500}
            isVisible={props.isShowModalRemoveMessage}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props.closeModalRemoveMessage()
            }}
            onBackdropPress={() => {
                props.closeModalRemoveMessage()
            }}>
            <View style={styles.modalFilter}>
                {/* <Text style={[stylesFont.fontNolan500, { color: Color.GREY_FOR_TITLE, fontSize: _moderateScale(16), alignSelf: 'center' }]}>
                    Danh sách đã xem
                </Text> */}
                <TouchableOpacity onPress={_handleRemoveMessage}>
                    <Text style={[stylesFont.fontNolan500, { color: Color.GREY_FOR_TITLE, fontSize: _moderateScale(16) }]}>
                        Thu hồi tin nhắn
                    </Text>
                </TouchableOpacity>

            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({
    modalFilter: {
        width: _width - _moderateScale(8 * 4),
        // paddingVertical: _heightScale(30),
        // paddingTop: _heightScale(20),
        // paddingBottom: _heightScale(50), 
        paddingVertical: _moderateScale(8 * 4),
        backgroundColor: Color.WHITE,
        paddingHorizontal: _widthScale(23),
        borderTopStartRadius: _widthScale(10),
        borderTopEndRadius: _widthScale(10),
        marginBottom: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8 * 2)
    },
})

export default ModalRemoveMessage;