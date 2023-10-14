import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _width } from '../../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB } from '../../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import InputSearch from './InputSearch';
import _isEmpty from 'lodash/isEmpty'
import { navigation } from '../../../../rootNavigation';
import { getAssetGroup } from '../../../Redux/Action/LoseWeightAction'
import slugify from 'slugify';

const ModalPickCategoryFood = memo((props) => {


    const [listCategory, setListCategory] = useState([])
    const [listCategoryActive, setListCategoryActive] = useState([])

    const [regrexSearchName, setRegrexSearchName] = useState('')

    useEffect(() => {
        _getAssetGr()
    }, [])

    useEffect(() => {
        setListCategoryActive(props?.dataActive)
    }, [props?.dataActive])

    const _getAssetGr = async () => {
        let result = await getAssetGroup({
            condition: {
                type: {
                    equal: 'food'
                }
            }
        })
        if (result?.isAxiosError) return
        setListCategory(result?.data?.data)
    }

    const _handleConfirm = () => {
        props?.confirm(listCategoryActive)
    }

    const _renderItemCategory = ({ item, index }) => {

        if (listCategoryActive?.find(itemFind => itemFind?._id == item?._id)) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        setListCategoryActive([...listCategoryActive]?.filter(itemFilter => itemFilter?._id !== item?._id))
                    }}
                    style={{
                        width: "50%",
                        paddingHorizontal: _moderateScale(8),
                        marginBottom: _moderateScale(8),
                    }}>
                    <View style={[styleElement.rowAliCenter]}>
                        <Image
                            resizeMode="contain"
                            style={{
                                width: _moderateScale(8 * 5),
                                height: _moderateScale(8 * 5),
                                borderWidth: _moderateScale(0.5),
                                borderColor: BLUE_FB,
                                borderRadius: _moderateScale(8),
                                marginRight: _moderateScale(8)
                            }} source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }} />
                        <Text numberOfLines={2} style={[stylesFont.fontNolanBold, { color: BLUE_FB, fontSize: _moderateScale(13), flex: 1 }]}>
                            {item?.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    setListCategoryActive([...listCategoryActive, item])
                }}
                style={{
                    width: "50%",
                    paddingHorizontal: _moderateScale(8),
                    marginBottom: _moderateScale(8)
                }}>
                <View style={[styleElement.rowAliCenter]}>
                    <Image
                        resizeMode="contain"
                        style={{
                            width: _moderateScale(8 * 5),
                            height: _moderateScale(8 * 5),
                            borderWidth: _moderateScale(0.5),
                            borderColor: BG_GREY_OPACITY_5,
                            borderRadius: _moderateScale(8),
                            marginRight: _moderateScale(8)
                        }} source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }} />
                    <Text numberOfLines={2} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), flex: 1, color: BLACK_OPACITY_8 }]}>
                        {item?.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )

    }

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item?._id}`, []);

    const _handleClearSearch = async() => {
        setRegrexSearchName("")
        _getAssetGr()
    }

    const _handleSearching = async (text) => {
        setRegrexSearchName(text)
        let result = await getAssetGroup({
            condition: {
                type: {
                    equal: 'food'
                },
                slug: {
                    regex: slugify(text, {
                        locale: 'vi',
                        replacement: '-',
                        lower: true,
                        trim: true
                    }),
                    options: 'i'
                }
            },
            limit:1000,
            page:1
        })
        if (result?.isAxiosError) return
        setListCategory(result?.data?.data)
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

                    <View style={styles.backAndTitle}>
                        <TouchableOpacity onPress={props?.hide}>
                            <Image style={[sizeIcon.md]} source={require('../../../Icon/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16) }]}>Lọc danh mục thực phẩm</Text>
                        <Image style={[sizeIcon.md, { opacity: 0 }]} source={require('../../../Icon/cancel.png')} />
                    </View>

                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                        <InputSearch  clearSearch={_handleClearSearch}
                            value={regrexSearchName}
                            onChangeText={_handleSearching}/>
                    </View>

                    <FlatList
                        numColumns={2}
                        contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(8 * 2) }}
                        data={!_isEmpty(listCategory) ? listCategory : []}
                        renderItem={_renderItemCategory}
                        keyExtractor={_awesomeChildListKeyExtractor}
                    />

                    {/* <ScrollView style={{ flexGrow: 1}}>
                    </ScrollView> */}

                    <TouchableOpacity
                        onPress={_handleConfirm}
                        style={styles.btnConfirm}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE }]}>Chọn</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
});

const styles = StyleSheet.create({
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
        width: _width - _moderateScale(8 * 4),
        height: _moderateScale(8 * 55),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 3)
    }
})

export default ModalPickCategoryFood;