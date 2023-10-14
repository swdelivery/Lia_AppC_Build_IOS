import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width, _heightScale } from '../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, SECOND_COLOR, THIRD_COLOR, BLACK, RED } from '../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import moment from 'moment'
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { getDataLiaBonusEvent } from '../../Redux/Action/SpinWheelAction'
import RenderHtml from 'react-native-render-html';


const ModalThele = memo((props) => {

    const [listData, setListData] = useState([])
    const [isFirstLoad, setIsFirstLoad] = useState(false)





    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'flex-end',
                // paddingBottom: getBottomSpace() + _moderateScale(8 * 2)
            }}
            isVisible={props.show}
            useNativeDriver={true}
            // onModalShow={_getData}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props?.hide()
                setIsFirstLoad(false)
                // setListData([])
            }}
            onBackdropPress={() => {
                props?.hide()
                setIsFirstLoad(false)
                // setListData([])
            }}>

            <View style={styles.container}>
                <View style={[styleElement.rowAliCenter, { padding: _moderateScale(8 * 2), paddingBottom: 0 }]}>
                    <Text style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>

                    </Text>
                    <View style={{ alignItems: 'flex-end', }}>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                            }}
                            style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{paddingHorizontal:_moderateScale(8*2)}}>
                    <RenderHtml
                        contentWidth={_width - _widthScale(8 * 4)}
                        source={{ html: `${props?.data?.value}` }}
                        enableExperimentalBRCollapsing={true}
                        enableExperimentalMarginCollapsing={true}
                    />
                </ScrollView>



            </View>

        </Modal>
    );
});


const styles = StyleSheet.create({
    container: {
        width: _width,
        height: _heightScale(8 * 80),
        backgroundColor: WHITE,
        borderTopLeftRadius: _moderateScale(8 * 2),
        borderTopRightRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 4)
    }
})

export default ModalThele;