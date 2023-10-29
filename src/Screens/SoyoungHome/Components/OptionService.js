import React, { memo, useEffect } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale'
import { useDispatch, useSelector } from 'react-redux'
import { URL_ORIGINAL } from '../../../Constant/Url'
import { dispatch, navigation } from '../../../../rootNavigation'
import { getAllServiceGroup } from '../../../Redux/Action/ServiceGroup'
import { stylesFont } from '../../../Constant/Font'
import ScreenKey from '../../../Navigation/ScreenKey'

const OptionService = memo(() => {

    const listServiceGroupRedux = useSelector(state => state.serviceGroupReducer?.listServiceGroup)
    const dispatch = useDispatch()

    console.log({ listServiceGroupRedux });

    useEffect(() => {
        _getData()
    }, [])

    const _getData = () => {
        var condition = {
            condition: {
                parentCode: {
                    equal: null
                }
            },
            "sort": {
                "orderNumber": -1
            },
            "limit": 100,
            "page": 1
        }

        dispatch(getAllServiceGroup(condition))
    }

    return (
        <View style={{
            width: _widthScale(350),
            height: _widthScale(130),
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 8,
            justifyContent: 'center',
        }}>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>

                {
                    [...listServiceGroupRedux]?.map((item, index) => {
                        return (
                            <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_SERVICE, { currServiceGr: item })
                            }}
                            style={{
                                alignItems: 'center',
                                width: _widthScale(65),
                                marginTop:_moderateScale(4),
                            }}>
                                <View style={styles.item__option} >
                                    <Image style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                        source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }}
                                    />

                                </View>
                                <Text style={[stylesFont.fontNolan500,{
                                    fontSize:_moderateScale(12)
                                }]}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>

        </View>
    )
})

const styles = StyleSheet.create({
    item__option: {
        width: _widthScale(8 * 5),
        height: _widthScale(8 * 5),
        borderRadius: _widthScale(8 * 5 / 2),
    },
})


export default OptionService
