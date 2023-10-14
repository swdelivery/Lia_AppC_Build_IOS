import React, { memo, useEffect } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { BASE_COLOR, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLUE_FB, GREEN, RED, WHITE } from '../../../../Constant/Color';
import { stylesFont } from '../../../../Constant/Font';
import { sizeIcon } from '../../../../Constant/Icon';
import { _moderateScale } from '../../../../Constant/Scale';




const ModalInfo = memo((props) => {
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])


    return (
        <>
            <Modal
                supportedOrientations={['portrait', 'landscape']}
                style={{
                    margin: 0,
                    alignItems: "center",
                    justifyContent: 'flex-end',
                    paddingHorizontal: _moderateScale(8 * 2),
                    paddingVertical: _moderateScale(8 * 2),
                    paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() + _moderateScale(8 * 2) : _moderateScale(8 * 2)
                }}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                animationOutTiming={100}
                isVisible={props?.show}
                useNativeDriver={true}
                coverScreen={Platform.OS == "ios" ? true : true}
                backdropTransitionOutTiming={0}
                onBackButtonPress={() => {
                    props?.hide()
                }}
                onBackdropPress={() => {
                    props?.hide()
                }}
                hideModalContentWhileAnimating>

                <View style={styles.modalFilter}>
                    <View style={{ alignItems: 'flex-end', padding: _moderateScale(8 * 0), marginTop: _moderateScale(8) }}>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                            }}
                            style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../../../NewIcon/xWhite.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(18) }}>
                            {
                                props?.data?.partner?.name
                            }
                        </Text>
                        <Text style={{ ...stylesFont.fontNolanBold,marginTop:_moderateScale(8), fontSize: _moderateScale(18),color:BLUE_FB }}>
                            {
                                props?.data?.partner?.phone[0]?.fullPhoneNumber
                            }
                        </Text>
                    </View>
                </View>

            </Modal>
        </>
    );
});


const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        'rgba(104, 47, 144,.7)',
        BASE_COLOR,
    ]
}


const styles = StyleSheet.create({
    btnGoBack: {
        marginVertical: _moderateScale(12)
    },
    btnCancel: {
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_7,
        width: _moderateScale(8 * 12),
        borderRadius: _moderateScale(8),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalFilter: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        // paddingTop: _moderateScale(getStatusBarHeight() + 8 * 1),
        // paddingBottom: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        // paddingHorizontal: _moderateScale(23),
        borderRadius: _moderateScale(8),
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2),
        // maxHeight: "100%",
        height: "20%"
    },
})

export default ModalInfo;