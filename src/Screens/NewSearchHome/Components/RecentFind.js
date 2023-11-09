import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { _moderateScale } from '../../../Constant/Scale'
import { stylesFont } from '../../../Constant/Font'
import { getDataSuggestionSearch } from '../../../Redux/Action/Service'
import { IconAffiliate, IconComment, IconHand, IconMirror, IconTrash } from '../../../Components/Icon/Icon'
import { sizeIcon } from '../../../Constant/Icon'
import AsyncStorage from '@react-native-community/async-storage'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const RecentFind = memo((props) => {

    const [listRecent, setListRecent] = useState([]);
    const [listRecommend, setListRecommend] = useState([])

    useEffect(() => {
        _setListRecommend()
        _getListHistorySearchKey()
    }, [])

    const _setListRecommend = async () => {
        let result = await getDataSuggestionSearch("")
        console.log({ result });
        setListRecommend(result?.data?.data);
    }

    const _getListHistorySearchKey = async () => {
        let result = await AsyncStorage.getItem('listHistorySearchKey');
        
        // console.log({ listHistorySearchKey: result });
        setListRecent(JSON.parse(result))
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.title,]}>Tìm kiếm gần đây</Text>

                <TouchableOpacity 
                onPress={async()=>{
                    await AsyncStorage.removeItem('listHistorySearchKey')
                    setListRecent([])
                }}
                >
                    <IconTrash style={sizeIcon.lg} />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    listRecent?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    props?.pressSearch(item)
                                    props?.setKeySearch(item)
                                }}
                                style={styles.btn}>
                                <Text>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={{ height: _moderateScale(8 * 4) }} />

            <Text style={[styles.title,]}>Gợi ý tìm kiếm</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    listRecommend?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    props?.pressSearch(item.content)
                                    props?.setKeySearch(item.content)
                                }}
                                style={styles.btn}>
                                <Text>
                                    {item?.content}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={{ height: _moderateScale(8 * 4) }} />

            <Text style={[styles.title, { marginBottom: _moderateScale(8 * 2) }]}>Danh mục khuyến nghị</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('FACE_AI')
                }}
                style={styles.btnRecommend}>
                    <View style={styles.btnRecommend__box}>
                        <IconMirror />
                    </View>
                    <Text style={styles.btnRecommend__text}>
                        Gương thần
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress={()=>{
                    navigation.navigate(ScreenKey.NEW_AFFILIATE)
                    // navigation.navigate(ScreenKey.AFFILIATE)
                }}
                style={styles.btnRecommend}>
                    <View style={styles.btnRecommend__box}>
                        <IconAffiliate />
                    </View>
                    <Text style={styles.btnRecommend__text}>
                        Tri Ân
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRecommend}>
                    <View style={styles.btnRecommend__box}>
                        <IconComment />
                    </View>
                    <Text style={styles.btnRecommend__text}>
                        Hồ sơ{`\n`}điện tử
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRecommend}>
                    <View style={styles.btnRecommend__box}>
                        <IconComment />
                    </View>
                    <Text style={styles.btnRecommend__text}>
                        Nhật ký{`\n`}điều trị
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRecommend}>
                    <View style={styles.btnRecommend__box}>
                        <IconHand />
                    </View>
                    <Text style={styles.btnRecommend__text}>
                        Ví LiA
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
})

export default RecentFind

const styles = StyleSheet.create({
    btnRecommend__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(12),
        textAlign: 'center'
    },
    btnRecommend__box: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: _moderateScale(8),
        borderRadius: _moderateScale(10),
        borderColor: 'rgba(0,0,0,.3)'
    },
    btnRecommend: {
        alignItems: 'center',
        marginHorizontal: _moderateScale(8),
        flex: 1,
    },
    btn: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8),
        backgroundColor: "#F6F6F6",
        marginTop: _moderateScale(8),
        marginRight: _moderateScale(8)
    },
    title: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14)
    },
    container: {
        padding: _moderateScale(8 * 4)
    }
})