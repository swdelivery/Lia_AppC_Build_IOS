import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _widthScale } from '../../Constant/Scale';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";

const NetworkErr = props => {
    

    const stateRedux = useSelector(state => state.userReducer)  


    const closeModal = () => {
        Store.dispatch({
            type: ActionType.NETWORK_ERROR,
            payload: {
                flag: false
            }
        })
    }
    

    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center'
        }}
            animationIn='fadeIn'
            animationOut='fadeOut'
            animationInTiming={500}
            animationOutTiming={500}
            isVisible={stateRedux.isErrorNetWork}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {

            }}
            onBackdropPress={() => {

            }}>

            <View style={styles.modalFilter}>
                <Image style={{
                    width: _widthScale(100),
                    height: _widthScale(120),
                    resizeMode: 'contain',
                    alignSelf: 'center'
                }} source={require('../../Icon/networkErr.jpg')} />
                <View style={styles.viewContent}>
                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _widthScale(20), marginBottom: _heightScale(8) }]}>
                        Lỗi kết nối
                    </Text>
                    <Text style={[stylesFont.fontNolan500, styles.content]}>
                        Không thể kết nối đến máy chủ do các nguyên nhân sau: {`\n`}
                        - Thiết bị của bạn không có kết nối mạng. {`\n`}
                        - Máy chủ không ổn định ở thời điểm hiện tại. {`\n`}
                        Bạn vui lòng thử kiểm tra kết nối mạng hoặc thử lại sau ít phút.
                    </Text>
                    <TouchableOpacity
                        onPress={closeModal}
                        style={styles.cancelBtn}>
                        <Text style={[stylesFont.fontNolan500, styles.cancelBtn__text]}>
                            ĐÓNG
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalFilter: {
        width: "85%",
        backgroundColor: Color.WHITE,
        borderRadius: _widthScale(10),
        backgroundColor: Color.WHITE,
        paddingBottom: _heightScale(8)
    },
    viewContent: {
        paddingHorizontal: _widthScale(16),
    },
    content: {
        fontSize: _widthScale(13),
        lineHeight: _heightScale(16),
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



export default NetworkErr;