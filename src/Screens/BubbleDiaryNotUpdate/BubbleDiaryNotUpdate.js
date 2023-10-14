import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { styleElement } from '../../Constant/StyleElement';
import { stylesFont } from '../../Constant/Font';
import { RED, WHITE, BLACK, BLACK_OPACITY_7 } from '../../Constant/Color';
import ModalListDiaryNotUpdate from './ModalListDiaryNotUpdate';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'

const BubbleDiaryNotUpdate = memo((props) => {

    const [showMdal, setShowModal] = useState(false)

    return (
        <>
            <ModalListDiaryNotUpdate
                hide={() => {
                    setShowModal(false)
                }}
                data={props?.data}
                show={showMdal} />

            <TouchableOpacity
                onPress={() => {
                    setShowModal(true)
                }}
                style={[{
                    width: _moderateScale(8 * 7),
                    height: _moderateScale(8 * 7),
                    borderRadius: _moderateScale(8 * 7 / 2),
                    position: 'absolute',
                    right: _moderateScale(8 * 3),
                    bottom: _heightScale(8*15),
                    backgroundColor: 'skyblue',
                    zIndex:100
                }, styleElement.centerChild]}>

                <View style={[{
                    width: _moderateScale(8 * 3),
                    height: _moderateScale(8 * 3),
                    borderRadius: _moderateScale(8 * 1.5),
                    backgroundColor: RED,
                    position: 'absolute',
                    left: -_moderateScale(6),
                    top: -_moderateScale(6)
                }, styleElement.centerChild]}>
                    <Text style={{ textAlign: 'center', ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: WHITE }}>
                        {props?.data?.length}
                    </Text>
                </View>

                <TouchableOpacity
                    // hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        store.dispatch({
                            type: ActionType.SHOW_BAGED_DIARY,
                            payload: {
                                data: false
                            }
                        })
                    }}
                    style={[{
                        width: _moderateScale(8 * 2),
                        height: _moderateScale(8 * 2),
                        borderRadius: _moderateScale(8),
                        backgroundColor: RED,
                        position: 'absolute',
                        right: -_moderateScale(2),
                        top: -_moderateScale(2),
                        zIndex:100
                    }, styleElement.centerChild]}>
                    <View style={{
                        width: _moderateScale(8 * 1.25),
                        height: _moderateScale(3),
                        backgroundColor: WHITE
                    }} />
                </TouchableOpacity>


                <Image style={{
                    // width: _moderateScale(8 * 10),
                    // height: _moderateScale(8 * 8),
                    width: _moderateScale(8 * 7),
                    height: _moderateScale(8 * 7),
                    borderRadius: _moderateScale(8 * 7 / 2),
                    resizeMode: 'contain'
                }} source={require('../../Image/2doctor.png')} />

                {/* <Text style={{ textAlign: 'center', ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                    Hậu phẫu
                </Text> */}
            </TouchableOpacity>

            {/* <TouchableOpacity style={{
                position: 'absolute',
                right: _moderateScale(8 * 3),
                bottom: _moderateScale(8 * 18) + getBottomSpace(),
            }}>
                <Image style={{
                    width: _moderateScale(8*10), height: _moderateScale(8*8),resizeMode:'contain'
                }} source={require('../../Image/2doctor.png')} />
            </TouchableOpacity> */}

        </>
    );
});



export default BubbleDiaryNotUpdate;