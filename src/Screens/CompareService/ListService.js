import match from 'autosuggest-highlight/match';
import { escapeRegExp, isEmpty, remove } from 'lodash';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View, FlatList, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import slugify from 'slugify';
import { navigation } from '../../../rootNavigation';
import * as Color from '../../Constant/Color';

import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";
// API
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getServicev2 } from '../../Redux/Action/Service';
import { formatMonney } from '../../Constant/Utils';
import ScreenKey from '../../Navigation/ScreenKey';










if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


const ListService = memo((props) => {
    // ==========>
    const [currListChoice, setCurrListChoice] = useState([])
    const [listService, setListService] = useState([])
    const [listServiceAfterFilter, setListServiceAfterFilter] = useState([])
    const [valueInput, setValueInput] = useState('')

    const scrollViewRef = useRef(null)

    useEffect(() => {
        console.log({ a: props?.route?.params?.propsListService });
        setCurrListChoice(props?.route?.params?.propsListService)
    }, [props?.route?.params?.propsListService])

    useEffect(() => {
        _getListService()
    }, [])

    const _getListService = async () => {
        let result = await getServicev2({});
        if (result?.isAxiosError) return
        setListService(result?.data?.data)
    }

    const _addService = (item) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCurrListChoice(oldLists => [...oldLists, item])
        setTimeout(() => {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }, 200);
    }


    const _removeService = (itemForRemove) => {
        let temp = [...currListChoice]
        remove(temp, (item) => {
            return item?._id == itemForRemove?._id
        })
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCurrListChoice(temp)
    }

    const _removeMembersFromListDefault = (itemForRemoveFromListDefault) => {

    }


    const _confirmAddMembersToGroupChat = async () => {

    }


    const filterByNames = (data, inputValue) => {
        // const re = new RegExp(escapeRegExp(inputValue), "i");
        // const results = data.filter((item) => {
        //     console.log(slugify(item?.name, ''));


        //     if (re.test(slugify(item?.name, ' '))) {
        //         const matches = match(slugify(item?.name, ''), inputValue);
        //         return true;
        //     }
        //     else {
        //         return false;
        //     }
        // });
        // console.log({ results });

        // if (!isEmpty(results)) {
        //     setListServiceAfterFilter(results)
        // }

        const re = new RegExp(escapeRegExp(inputValue), "i");
        const results = data.filter((item) => {
            if (item?.name) {
                if (re.test(slugify(item.name, ' '))) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
        if (!isEmpty(results)) {
            setListServiceAfterFilter(results)
        }

        // return results;
    };

    const _renderItemService = ({ item, index }) => {
        // let flag = currChattingRedux?.memberArr?.find(itemFind => itemFind.userId._id == item._id)
        // if (flag) return

        return (
            <View style={[styleElement.rowAliCenter, { flex: 1, borderBottomWidth: _moderateScale(0.5), borderColor: Color.BG_GREY_OPACITY_5, paddingBottom: _moderateScale(8 * 2) }, (index == listService.length - 1 || index == listServiceAfterFilter.length - 1) && { marginBottom: _moderateScale(8 * 6) }]}>
                <Image
                    style={{
                        width: _moderateScale(8 * 8),
                        height: _moderateScale(8 * 8),
                        borderRadius: _moderateScale(4),
                        marginHorizontal: _widthScale(16),
                        marginTop: _moderateScale(16)
                    }}
                    source={{ uri: item?.representationFileArr?.length > 0 && item?.representationFileArr[0]?.link ? `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` : URL_AVATAR_DEFAULT }} />
                <TouchableOpacity
                    onPress={() => {
                        navigation.push(ScreenKey.DETAIL_SERVICE, { idService: item?._id })
                    }}
                    style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, {
                        fontSize: _moderateScale(15),
                        color: Color.GREY_FOR_TITLE
                    }]}>
                        {
                            item?.name
                        }
                    </Text>
                    <Text style={[stylesFont.fontNolanBold, {
                        fontSize: _moderateScale(16),
                        color: Color.PRICE_ORANGE,
                    }]}>
                        {
                            formatMonney(item?.price)
                        }đ
                    </Text>
                </TouchableOpacity>


                {
                    currListChoice.find(itemFind => itemFind._id == item._id) ?
                        <TouchableOpacity
                            hitSlop={styleElement.hitslopMd}
                            onPress={() => _removeService(item)}
                            style={{
                                marginHorizontal: _moderateScale(16),
                            }}>
                            <View style={{
                                width: _moderateScale(8 * 3),
                                height: _moderateScale(8 * 3),
                                borderRadius: _moderateScale(8 * 3 / 2),
                                backgroundColor: Color.BASE_COLOR,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} >
                                <Image style={sizeIcon.md} source={require('../../Icon/tick_white.png')} />
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            hitSlop={styleElement.hitslopMd}
                            onPress={() => _addService(item)}
                            style={{
                                marginHorizontal: _moderateScale(16),
                            }}>
                            <View style={{
                                width: _moderateScale(8 * 3),
                                height: _moderateScale(8 * 3),
                                borderRadius: _moderateScale(8 * 3 / 2),
                                borderWidth: _moderateScale(2),
                                borderColor: Color.BG_GREY_OPACITY_7
                            }} />
                        </TouchableOpacity>
                }


            </View>
        )
    }
    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);


    return (
        <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
            <StatusBarCustom bgColor={Color.WHITE} barStyle={'dark-content'} />

            <View style={[styles.content__header, styleElement.rowAliCenter, { justifyContent: 'space-between' }]} key="0">
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[styleElement.rowAliCenter, styles.btnGoBack]}>
                    <Image
                        style={sizeIcon.lg}
                        source={require('../../Icon/cancel.png')} />
                </TouchableOpacity>
                {
                    currListChoice?.length > 0 ?
                        <TouchableOpacity
                            hitSlop={styleElement.hitslopSm}
                            onPress={() => {
                                navigation.navigate(ScreenKey.COMPARE_SERVICE, { currListChoice: currListChoice })
                            }}
                            style={[styleElement.rowAliCenter, styles.btnGoBack]}>
                            <Image
                                style={sizeIcon.lllg}
                                source={require('../../Icon/accepted.png')} />
                        </TouchableOpacity>
                        :
                        <></>
                }



            </View>

            <View style={{ width: _width, paddingHorizontal: _moderateScale(14), marginBottom: _moderateScale(8) }}>
                <View style={[styleElement.rowAliCenter, { width: "100%", backgroundColor: Color.BG_GREY_OPACITY, borderRadius: _moderateScale(8) }]}>
                    <Image
                        style={[sizeIcon.lg, { marginHorizontal: _moderateScale(8) }]}
                        source={require('../../Icon/search_grey.png')} />
                    <TextInput
                        onChangeText={(c) => {
                            setValueInput(c)
                            filterByNames(listService, c)
                        }}
                        value={valueInput}
                        placeholderTextColor={Color.GREY}
                        placeholder={"Tìm kiếm..."}
                        style={[{ marginVertical: _heightScale(12), paddingVertical: 0, fontSize: _moderateScale(14), flex: 1, paddingRight: _moderateScale(16) }]} />
                    {
                        valueInput?.trim()?.length > 0 ?
                            <View style={{
                                opacity: 0.5,
                                marginRight: _moderateScale(8 * 2),
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setListServiceAfterFilter([])
                                        setValueInput('')
                                    }}
                                    style={[styleElement.centerChild, {
                                        width: _moderateScale(8 * 2.5),
                                        height: _moderateScale(8 * 2.5),
                                        backgroundColor: Color.BG_GREY_OPACITY_7,
                                        borderRadius: _moderateScale(8 * 2.5 / 2),
                                    }]}>
                                    <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                                </TouchableOpacity>
                            </View>
                            :
                            <></>
                    }

                </View>
            </View>
            <View style={styleElement.lineHorizontal} />
            <View>
                <ScrollView
                    // onContentSizeChange={() => {
                    // }}
                    contentContainerStyle={{ paddingVertical: _moderateScale(8 * 1), paddingRight: _moderateScale(8 * 4) }}
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRef}
                    horizontal>
                    {
                        !isEmpty(currListChoice) && currListChoice.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => _removeService(item)}
                                    style={{
                                        marginLeft: _widthScale(16),
                                        marginTop: _moderateScale(8),
                                        borderRadius: _moderateScale(8),
                                        paddingHorizontal: _moderateScale(8),
                                        paddingVertical: _moderateScale(4),
                                        backgroundColor: Color.BASE_COLOR
                                    }}>
                                    <View style={{
                                        position: 'absolute',
                                        right: -_moderateScale(8),
                                        top: -_moderateScale(8),
                                        width: _moderateScale(16),
                                        height: _moderateScale(16),
                                        borderRadius: _moderateScale(8),
                                        backgroundColor: Color.RED,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 100
                                    }}>
                                        <View style={{
                                            width: _moderateScale(10),
                                            height: _moderateScale(3),
                                            backgroundColor: Color.WHITE
                                        }} />
                                    </View>
                                    < Text style={{
                                        ...stylesFont.fontNolan500,
                                        fontSize: _moderateScale(15),
                                        color: Color.WHITE
                                    }}>
                                        {index + 1}. {item?.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={styleElement.lineHorizontal} />

            <View style={{ flex: 1 }}>
                {
                    !isEmpty(listServiceAfterFilter) ?
                        <FlatList
                            data={!isEmpty(listServiceAfterFilter) ? listServiceAfterFilter : []}
                            renderItem={_renderItemService}
                            keyExtractor={_awesomeChildListKeyExtractor}
                        />
                        :
                        <>
                            {
                                !isEmpty(listService) ?
                                    <FlatList
                                        data={!isEmpty(listService) ? listService : []}
                                        renderItem={_renderItemService}
                                        keyExtractor={_awesomeChildListKeyExtractor}
                                    />
                                    :
                                    <>
                                    </>
                            }
                        </>
                }
            </View>
        </View>
    );
});


const styles = StyleSheet.create({
    btnCamera: {
        width: _moderateScale(8 * 7),
        height: _moderateScale(8 * 7),
        borderRadius: _moderateScale(8 * 7 / 2),
        backgroundColor: Color.BG_GREY_OPACITY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnGoBack: {
        marginVertical: _heightScale(12)
    },
    btnAddPeopleToTask: {
        width: _moderateScale(60),
        height: _moderateScale(30),
        borderRadius: _moderateScale(8),
        backgroundColor: Color.BG_GREY_OPACITY,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: _moderateScale(16)
    },
    checkBox_inActive: {
        width: _moderateScale(20),
        height: _moderateScale(20),
        borderWidth: _moderateScale(2),
        borderColor: Color.GREY,
        borderRadius: _moderateScale(4),
        marginHorizontal: _moderateScale(16)

    },
    checkBox_active: {
        width: _moderateScale(20),
        height: _moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BASE_COLOR,
        borderRadius: _moderateScale(4),
        marginHorizontal: _moderateScale(16)
    },
    textInputDescription: {
        width: "100%",
        paddingHorizontal: _moderateScale(16),
        paddingVertical: 0,
        // backgroundColor:'red',
        fontSize: _moderateScale(16),
        color: Color.GREY_FOR_TITLE,
        marginVertical: _moderateScale(16),
    },
    title: {
        padding: _moderateScale(16)
    },
    content__header: {
        height: _moderateScale(50),
        width: _width,
        backgroundColor: Color.WHITE,
        paddingHorizontal: _widthScale(16),
        alignItems: 'center'
    },
    content__heading: {
        fontSize: _moderateScale(16)
    },
    progressBar: {
        width: _widthScale(270 / [1, 2, 3, 4, 5, 6, 7, 8].length),
        height: _moderateScale(4),
        backgroundColor: Color.BG_GREY_OPACITY_3,
        marginHorizontal: _widthScale(2),
        marginTop: _moderateScale(4),
    },
    card: {
        width: _widthScale(330),
        // height: _moderateScale(100),
        borderRadius: _moderateScale(8),
        backgroundColor: Color.WHITE,
        alignSelf: 'center',
        marginTop: _moderateScale(16),
        paddingVertical: _moderateScale(16)
    },
    tabRight__title: {
        fontSize: _moderateScale(16),
        color: Color.GREY_FOR_TITLE
    },
    tabRightNotifi: {
        width: "85%",
        backgroundColor: Color.WHITE,
        paddingBottom: _heightScale(8),
        height: "100%"
    },
    header__title: {
        fontSize: _moderateScale(16),
        color: Color.GREY_FOR_TITLE,
        width: _widthScale(250),
        textAlign: 'center',
        // backgroundColor:'red'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: _width,
        height: _moderateScale(45),
        backgroundColor: Color.WHITE,
    },
    scene: {
        flex: 1,
    },
    box: {
        // padding: _heightScale(15),
        // paddingVertical: _heightScale(10),
        // paddingLeft:_widthScale(40),
        flex: 1,
        backgroundColor: Color.WHITE,
        borderRadius: _widthScale(10)
    },
    box_text1: {
        fontSize: _heightScale(16),
        // marginBottom: _heightScale(5),
        color: Color.GREY,
    },
    box_text2: {
        color: Color.GREEN,
        fontSize: _heightScale(18)
    },
    box_child: {
        flexDirection: 'row',
        // justifyContent: '',
        alignItems: 'center',
        // paddingHorizontal: _widthScale(5),
    },
    box_child_text: {
        fontSize: _heightScale(13),
        // marginBottom: _heightScale(5),
        color: Color.GREY
    },
    icon: {
        width: _moderateScale(22),
        height: _moderateScale(22),
        resizeMode: 'contain'
    },
    iconSm: {
        width: _moderateScale(19),
        height: _moderateScale(19),
        resizeMode: 'contain'
    },
    dotNewNotifi: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: Color.RED,
        position: 'absolute',
        right: _moderateScale(2),
        top: _moderateScale(2)
    }
});

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.68,

    elevation: 1.5
}



export default ListService;