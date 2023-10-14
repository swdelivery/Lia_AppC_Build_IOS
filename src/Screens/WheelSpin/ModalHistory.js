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

const ModalHistory = memo((props) => {

    const [listData, setListData] = useState([])
    const [isFirstLoad, setIsFirstLoad] = useState(false)

    const _getData = async () => {
        // setIsFirstLoad(false)
        let result = await getDataLiaBonusEvent({
            limit:10,
            condition: {
                eventCode: {
                    equal: "SPIN_WHEEL"
                }
            }
        })
        if (result?.isAxiosError) return
        console.log({ result });

        setListData(result?.data?.data)
        // setIsFirstLoad(true)
    }


    const _renderTitle = (data) => {

        if (data?.awards?.length == 0) {
            return (
                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15) }}>
                    Không trúng thưởng
            </Text>
            )
        }

        let tempText = [];

        data?.awards?.map(item => {
            if(item?.displayName){
                tempText?.push(`+${item?.displayName}`)
            }else{
                tempText?.push(`+${item?.amount} ${item?.name}`)
            }
        })

        if (tempText?.length > 0) {
            return (
                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15) }}>
                    {
                        tempText?.join(', ')
                    }
                </Text>
            )
        }


    }

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
            onModalShow={_getData}
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
                {
                    true ?
                        <>
                            {
                                listData?.length > 0 ?
                                    <ScrollView>
                                        {
                                            listData?.map((item, index) => {
                                                return (
                                                    <>
                                                        <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginVertical: _moderateScale(8) }}>
                                                            {
                                                                _renderTitle(item)
                                                            }
                                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), color: GREY }}>
                                                                {moment(item?.created).format('LT')} - {moment(item?.created).format('DD/MM/YYYY')}
                                                            </Text>

                                                        </View>
                                                        <View style={{ width: '100%', height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />

                                                    </>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                                            Lịch sử trống
                                        </Text>
                                    </View>
                            }
                        </>
                        :
                        <></>
                }




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

export default ModalHistory;