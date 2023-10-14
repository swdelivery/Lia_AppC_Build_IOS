import React, { memo, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_5, BG_GREY_OPACITY_9, WHITE, BLUE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { getDataSuggestionSearch } from '../../../Redux/Action/Service'



const HeaderSearch = memo((props) => {

    const [keySearch, setKeySearch] = useState('')
    const [listSg, setListSg] = useState([])

    const _handleGetSuggest = async (key) => {
        let result = await getDataSuggestionSearch(key)
        if (result?.isAxiosError) return
        setListSg(result?.data?.data)
    }

    useEffect(() => {
        setKeySearch(props?.keySearch)
    }, [props?.keySearch])

    return (
        <View style={{
            borderBottomWidth: 2,
            borderColor: BG_GREY_OPACITY_5,
        }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image style={sizeIcon.llg} source={require('../../../Icon/backBlack.png')} />
                </TouchableOpacity>
                <View style={styles.input}>
                    <Image style={[sizeIcon.sm, { opacity: 0.8 }]} source={require('../../../NewIcon/searchGrey.png')} />
                    <TextInput
                        autoFocus={false}
                        onBlur={() => {
                            props?.saveKeySearch(keySearch)
                            props?.pressSearch(keySearch) 
                            setListSg([])
                        }}
                        value={keySearch}
                        onChangeText={(e) => {
                            setKeySearch(e)
                            _handleGetSuggest(e)
                        }}
                        style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), flex: 1, marginHorizontal: _moderateScale(8), paddingVertical: 0 }}
                        placeholder={"vd: Cắt mí T2020"}
                    />
                    {
                        keySearch?.length > 0 ?
                            <TouchableOpacity
                                onPress={() => {
                                    setKeySearch('')
                                }}
                                style={{ padding: _moderateScale(4), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                                <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                            </TouchableOpacity>
                            : <></>
                    }

                </View>
                <TouchableOpacity
                    style={{ marginRight: _moderateScale(8) }}
                    onPress={() => {
                        props?.pressSearch(keySearch)
                        Keyboard.dismiss()
                        setListSg([])
                    }}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                        Tìm
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: _moderateScale(8 * 1.5) }}>
                {
                    listSg?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    props?.saveKeySearch(item?.content)
                                    setKeySearch(item?.content)
                                    props?.pressSearch(item?.content)
                                    Keyboard.dismiss()
                                    setListSg([])
                                }}
                                style={styles.btnSG}>
                                <Text>
                                    {item?.content}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    );
});


const styles = StyleSheet.create({
    btnSG: {
        marginHorizontal: _moderateScale(4),
        marginBottom: _moderateScale(8),
        backgroundColor: BLUE,
        // borderWidth:0.5,
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4)
    },
    categoryFinded__text: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14)
    },
    categoryFinded__image: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5 / 2),
        borderWidth: 1
    },
    categoryFinded: {
        width: (_width - _moderateScale(8 * 2)) / 5,
        height: (_width - _moderateScale(8 * 2)) / 5,
        ...styleElement.centerChild,
        paddingHorizontal: _moderateScale(4)
    },
    input: {
        borderWidth: 1,
        flex: 1,
        marginHorizontal: _moderateScale(8 * 2),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(4),
        borderColor: BG_GREY_OPACITY_9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8)
    },
    header: {
        // height: _moderateScale(8 * 7),
        paddingVertical: _moderateScale(8 * 1.5),
        // borderBottomWidth: 2,
        borderColor: BG_GREY_OPACITY_5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8)
    },
    lineActive: {
        height: _moderateScale(2),
        width: '100%',
        backgroundColor: BASE_COLOR,
        position: 'absolute',
        bottom: -_moderateScale(6),
        zIndex: 1
    },
    titleTab: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        letterSpacing: -1,
        opacity: 0.5
    },
    titleTabActive: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        letterSpacing: -1,
        color: "black",
        opacity: 1
    },
    inputHeader: {
        width: _moderateScale(8 * 25),
        backgroundColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 1.5),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarLia: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        bottom: -_moderateScale(8 * 2)
    },
})


export default HeaderSearch;