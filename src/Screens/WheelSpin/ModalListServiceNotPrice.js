import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width, _heightScale } from '../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, SECOND_COLOR, THIRD_COLOR, BLACK, RED, BASE_COLOR, GREY_FOR_TITLE } from '../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import moment from 'moment'
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { getDataLiaBonusEvent } from '../../Redux/Action/SpinWheelAction'
import RenderHtml from 'react-native-render-html';
import { getAllServiceByGroupId } from '../../Redux/Action/BookingAction';


const ModalListServiceNotPrice = memo((props) => {

    const [listService, setListService] = useState([])
    const [listServiceChoice, setListServiceChoice] = useState([])

    useEffect(() => {
        _getData()
    }, [])

    const _getData = async () => {
        let resultGetAllService = await getAllServiceByGroupId({
            limit: 1000,
            page: 1
        });
        if (resultGetAllService?.isAxiosError) return;
        setListService(resultGetAllService?.data?.data)

        if (resultGetAllService?.data?.data?.find(item => item?.code == "CATMIFULL")) {
            props?.setListServiceChoice([resultGetAllService?.data?.data?.find(item => item?.code == "CATMIFULL")])
        }
       
    }

    const _handleChoice = (data) => {

        let listServiceChoiceTemp = [...listServiceChoice];
        if (listServiceChoiceTemp?.find(item => item?._id == data?._id)) {
            listServiceChoiceTemp = listServiceChoiceTemp?.filter(item => item?._id !== data?._id)
        } else {
            listServiceChoiceTemp?.push(data)
        }

        setListServiceChoice(listServiceChoiceTemp)

    }

    const _onModalShow = () => {
        setListServiceChoice(props?.listServiceChoice)
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
            onModalShow={_onModalShow}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
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
                <ScrollView style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    {
                        listService?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: item?._id })
                                    }}
                                    style={{
                                        paddingVertical: _moderateScale(8 * 2),
                                        borderBottomWidth: _moderateScale(0.5),
                                        borderColor: BG_GREY_OPACITY_5,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        style={[{ width: _moderateScale(8 * 6), height: _moderateScale(8 * 6), backgroundColor: BG_GREY_OPACITY_2, borderRadius: _moderateScale(8) }]}
                                        source={{
                                            uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                        }} />
                                    <View style={{ flex: 1, marginHorizontal: _moderateScale(8 * 2) }}>
                                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: GREY_FOR_TITLE }}>
                                            {index + 1}. {item?.name}
                                        </Text>
                                        <Text numberOfLines={2} style={{ ...stylesFont.fontNolan, color: GREY, fontSize: _moderateScale(14) }}>
                                            {item?.description}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => _handleChoice(item)}
                                        hitSlop={styleElement.hitslopSm}>
                                        {
                                            listServiceChoice?.find(itemFind => itemFind?._id == item?._id) ?
                                                <Image style={sizeIcon.lg} source={require('../../NewIcon/squareChecked.png')} />
                                                :
                                                <Image style={sizeIcon.lg} source={require('../../NewIcon/squareUnChecked.png')} />
                                        }
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                <TouchableOpacity
                    onPress={() => {
                        props?.confirm(listServiceChoice)
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: BASE_COLOR,
                        marginBottom: _moderateScale(8) + getBottomSpace(),
                        marginTop: _moderateScale(8),
                        marginHorizontal: _moderateScale(8 * 2)
                    }]}>

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                        Xác nhận ({`${listServiceChoice?.length}`})
                    </Text>
                </TouchableOpacity>

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
        // paddingBottom: _moderateScale(8 * 4)
    }
})

export default ModalListServiceNotPrice;