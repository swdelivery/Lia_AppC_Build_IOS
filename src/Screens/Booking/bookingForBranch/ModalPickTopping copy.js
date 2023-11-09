import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, FlatList, LayoutAnimation } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _width } from '../../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, GREY_FOR_TITLE, PRICE_ORANGE, BLACK_OPACITY_7, BLACK, BASE_COLOR, BLUE } from '../../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import InputSearch from '../../LoseWeight/Components/InputSearch';
import _isEmpty from 'lodash/isEmpty'
import { navigation } from '../../../../rootNavigation';
import { getAssetGroup } from '../../../Redux/Action/LoseWeightAction'
import slugify from 'slugify';
import { getListBranchV2 } from '../../../Redux/Action/BranchAction';
import ScreenKey from '../../../Navigation/ScreenKey';
import { formatMonney } from '../../../Constant/Utils';
import { cloneDeep } from 'lodash';


const ItemDescription = ((props) => {

    const [isCollap, setIsCollap] = useState(false)

    useEffect(() => {
        if (props?.data?.length > 120) {
            setIsCollap(true)
        } else {
            setIsCollap(false)
        }
    }, [props?.data])

    return (
        <>
            {
                isCollap ?
                    <Text
                        onLayout={(e) => {
                            console.log({ ...e });
                        }}
                        style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(14),
                            color: BLACK_OPACITY_7,
                            marginRight: 4
                        }}>
                        {
                            props?.data?.slice(0, 120)
                        }... {` `}
                        <Text
                            style={{
                                color: BLUE_FB,
                                marginLeft: _moderateScale(8 * 2)
                            }}
                            onPress={() => {
                                setIsCollap(false)
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            }}>
                            Xem thêm
                        </Text>
                    </Text>
                    :
                    <Text style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: BLACK_OPACITY_7,
                        marginRight: 4
                    }}>
                        {
                            props?.data
                        } {` `}
                        <Text
                            style={{
                                color: BLACK_OPACITY_7,
                                marginLeft: _moderateScale(8 * 2)
                            }}
                            onPress={() => {
                                setIsCollap(true)
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            }}>
                            Thu gọn
                        </Text>
                    </Text>
            }

        </>
    )
})

const ModalPickTopping = memo((props) => {

    const [listChoice, setListChoice] = useState([])
    const [isCollapDescription, setIsCollapDescription] = useState(false)

    console.log({ alo: props?.data });

    useEffect(() => {
        if (props?.data?._id && props?.data?.listTopping) {
            console.log({ axaxax: props?.data, data: props?.data });
            setListChoice(props?.data?.listTopping)
        }
    }, [props?.data])

    useEffect(() => {
        if (props?.data?.description?.length > 85) {
            setIsCollapDescription(true)
        } else {
            setIsCollapDescription(false)
        }
    }, [props?.data?.description])

    const _handleChoiceSingle = (data, groupCode) => {
        console.log({ data, listChoice });
        let tempListChoice = cloneDeep(listChoice);



        let indexItem = tempListChoice?.findIndex(item => item?.code == data?.code);
        if (indexItem !== -1) {
            tempListChoice.splice(indexItem, 1);
        } else {
            tempListChoice = tempListChoice?.filter(itemFilter => itemFilter?.groupCode !== groupCode)
            tempListChoice.push({ ...data, groupCode })
        }
        setListChoice(tempListChoice)
    }

    const _handleChoiceMulti = (data, groupCode) => {
        console.log({ data, listChoice });
        let tempListChoice = cloneDeep(listChoice);

        let indexItem = tempListChoice?.findIndex(item => item?.code == data?.code);
        if (indexItem !== -1) {
            tempListChoice.splice(indexItem, 1);
        } else {
            tempListChoice.push({ ...data, groupCode })
        }
        setListChoice(tempListChoice)
    }

    const _handleConfirm = () => {
        console.log({ listChoice });
        props?.confirm(props?.data, listChoice)
        props?.hide()
    }


    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'flex-end',
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? true : true}
            // animationIn={'slideInUp'}
            // animationOut={'fadeOut'}
            backdropTransitionOutTiming={0}
            onModalShow={() => {
                console.log({ props });
            }}
            onModalHide={() => {
                setListChoice([])
            }}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'position' : null}
                enabled
            >
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: _moderateScale(8 * 2), paddingTop: _moderateScale(8 * 2) }}>
                        <View style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100, opacity: 0 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                            Chọn dịch vụ
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                            }}
                            style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{}}>
                        <View style={{ height: _moderateScale(8 * 2) }} />
                        <View style={{ flexDirection: 'row', paddingHorizontal: _moderateScale(8 * 2) }}>
                            <View style={{ width: _moderateScale(8 * 12) }}>
                                {
                                    props?.data?.representationFileArr?.length > 0 ?
                                        <Image
                                            style={{
                                                width: _moderateScale(8 * 12),
                                                height: _moderateScale(8 * 12),
                                                borderRadius: _moderateScale(4)
                                            }}
                                            source={{
                                                uri: `${URL_ORIGINAL}${props?.data?.representationFileArr[0]?.link}`
                                            }} />
                                        : <></>
                                }

                            </View>
                            <View style={{ flex: 1, paddingLeft: _moderateScale(8) }}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: BASE_COLOR }}>
                                    {props?.data?.name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: PRICE_ORANGE }]}>
                                        {formatMonney(props?.data?.price)}
                                    </Text>
                                    <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: PRICE_ORANGE, fontSize: _moderateScale(16), }}>đ</Text>
                                </View>
                                {/* <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY }}>
                                    {props?.data?.description}
                                </Text> */}
                                {
                                    isCollapDescription ?
                                        <Text
                                            onLayout={(e) => {
                                                console.log({ ...e });
                                            }}
                                            style={{
                                                ...stylesFont.fontNolan500,
                                                fontSize: _moderateScale(14),
                                                color: BLACK_OPACITY_7,
                                                marginRight: 4
                                            }}>
                                            {
                                                props?.data?.description?.slice(0, 85)
                                            }... {` `}
                                            <Text
                                                style={{
                                                    color: BLUE_FB,
                                                    marginLeft: _moderateScale(8 * 2)
                                                }}
                                                onPress={() => {
                                                    setIsCollapDescription(false)
                                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                                }}>
                                                Xem thêm
                                            </Text>
                                        </Text>
                                        :
                                        <Text style={{
                                            ...stylesFont.fontNolan500,
                                            fontSize: _moderateScale(14),
                                            color: BLACK_OPACITY_7,
                                            marginRight: 4
                                        }}>
                                            {
                                               props?.data?.description
                                            } {` `}
                                            <Text
                                                style={{
                                                    color: BLACK,
                                                    marginLeft: _moderateScale(8 * 2)
                                                }}
                                                onPress={() => {
                                                    setIsCollapDescription(true)
                                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                                }}>
                                                Thu gọn
                                            </Text>
                                        </Text>
                                }
                            </View>
                        </View>

                        <View style={{ height: _moderateScale(8 * 2) }} />

                        {
                            props?.data?.options?.map((item, index) => {
                                return (
                                    <>
                                        <View style={{
                                            width: _width,
                                            height: _moderateScale(8 * 4),
                                            backgroundColor: BG_GREY_OPACITY_5,
                                            // marginTop: _moderateScale(8 * 2),
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), color: BLACK_OPACITY_7, paddingHorizontal: _moderateScale(8 * 2) }}>
                                                {item?.groupName}
                                            </Text>
                                        </View>
                                        {
                                            item?.data?.map((itemChild, indexChild) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', paddingHorizontal: _moderateScale(8 * 2), borderBottomWidth: _moderateScale(0.5), paddingVertical: _moderateScale(8 * 2), borderColor: BG_GREY_OPACITY_5 }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{
                                                                ...stylesFont.fontNolanBold,
                                                                fontSize: _moderateScale(14),
                                                                color: BASE_COLOR
                                                            }}>
                                                                {
                                                                    itemChild?.name
                                                                }
                                                            </Text>
                                                            {
                                                                itemChild?.description?.length > 0 &&
                                                                <ItemDescription data={itemChild?.description} />
                                                            }

                                                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(4) }}>
                                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(15), color: PRICE_ORANGE }]}>
                                                                    {formatMonney(itemChild?.extraAmount)}
                                                                </Text>
                                                                <Text style={{ top: -_moderateScale(2), marginLeft: _moderateScale(2), ...stylesFont.fontNolanBold, color: PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ justifyContent: 'center' }}>
                                                            {
                                                                item?.type == 'single' ?
                                                                    <>
                                                                        {
                                                                            listChoice?.find(itemFind => itemFind?.code == itemChild?.code) ?
                                                                                <TouchableOpacity onPress={() => {
                                                                                    _handleChoiceSingle(itemChild, item?.groupCode)
                                                                                }}>
                                                                                    <Image style={sizeIcon.lg} source={require('../../../NewIcon/circleChecked.png')} />
                                                                                </TouchableOpacity>
                                                                                :
                                                                                <TouchableOpacity onPress={() => {
                                                                                    _handleChoiceSingle(itemChild, item?.groupCode)
                                                                                }}>
                                                                                    <Image style={sizeIcon.lg} source={require('../../../NewIcon/circleUnChecked.png')} />
                                                                                </TouchableOpacity>
                                                                        }

                                                                    </>
                                                                    :
                                                                    <></>
                                                            }
                                                            {
                                                                item?.type == 'multiple' ?
                                                                    <>
                                                                        {
                                                                            listChoice?.find(itemFind => itemFind?.code == itemChild?.code) ?
                                                                                <TouchableOpacity onPress={() => {
                                                                                    _handleChoiceMulti(itemChild, item?.groupCode)
                                                                                }}>
                                                                                    <Image style={sizeIcon.lg} source={require('../../../NewIcon/squareChecked.png')} />
                                                                                </TouchableOpacity>
                                                                                :
                                                                                <TouchableOpacity onPress={() => {
                                                                                    _handleChoiceMulti(itemChild, item?.groupCode)
                                                                                }}>
                                                                                    <Image style={sizeIcon.lg} source={require('../../../NewIcon/squareUnChecked.png')} />
                                                                                </TouchableOpacity>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <></>
                                                            }
                                                        </View>

                                                    </View>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }

                        <View style={{ height: 100 }} />
                    </ScrollView>

                    <View style={[{
                        flexDirection: 'row', paddingVertical: _moderateScale(8),
                        paddingBottom: getBottomSpace() + _moderateScale(8),
                        paddingHorizontal: _moderateScale(8 * 2),
                        backgroundColor: WHITE,
                        borderTopWidth: 0.5,
                        borderColor: BG_GREY_OPACITY_5,
                        // borderWidth: 2,
                        position: 'absolute',
                        bottom: 0
                    },
                    ]}>
                        <TouchableOpacity
                            onPress={() => {
                                _handleConfirm()
                            }}
                            style={[{
                                height: _moderateScale(8 * 5),
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: BASE_COLOR,
                                flex: 1

                            }]}>

                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
});


const styles = StyleSheet.create({
    btnBranch__nameBranch: {
        flex: 1,
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    btnBranch: {
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(8),
        marginBottom: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    backAndTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingTop: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: BLUE_FB,
        paddingVertical: _moderateScale(6),
        marginTop: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: _width,
        height: _moderateScale(8 * 80),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 3)
    }
})

export default ModalPickTopping;