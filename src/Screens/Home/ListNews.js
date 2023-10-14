import React, { memo, useEffect } from 'react'
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { WHITE, BLACK_OPACITY_8 } from '../../Constant/Color';
import { _moderateScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { getAllNews } from '../../Redux/Action/News'
import ItemNews from './Components/ItemNews';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'


const ListNews = (function ListNews(props) {
    const dispatch = useDispatch()

    const newsRedux = useSelector(state => state?.newsReducer?.listNewsHome)

    useEffect(() => {
        let condition = {
            "condition": {
                isPin: {
                    equal: false
                },
            },
            "sort": {
                "created": -1
            },
            "limit": 5,
            "page": 1
        };
        dispatch(getAllNews(condition, 'home'))
    }, [])


    return (
        <>

            {/* <View style={{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[stylesFont.fontNolanBold, {
                    fontSize: _moderateScale(16),
                    color: BLACK_OPACITY_8, marginLeft: _moderateScale(8 * 1)
                }]}>
                    Tin tức
                </Text>
            </View> */}

            <View style={{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[stylesFont.fontNolanBold, {
                    fontSize: _moderateScale(16),
                    color: BLACK_OPACITY_8, marginLeft: _moderateScale(8 * 1)
                }]}>
                    Tin tức
                </Text>

                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={() => {
                        navigation.navigate(ScreenKey.LIST_ALL_NEWS)
                    }}
                    style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                    <Image
                        style={[sizeIcon.xs]}
                        source={require('../../Icon/rightArrow.png')} />
                </TouchableOpacity>
            </View>

            <View style={[{
                paddingVertical: _moderateScale(8),
                marginHorizontal: _moderateScale(8 * 3),
                borderRadius: _moderateScale(8 * 1),

            }]}>
                {newsRedux.map((res, index) => {
                    return (
                        <ItemNews key={index} data={res} isLast={index !== newsRedux.length - 1} />
                    )
                })}
            </View>
        </>
    )
})


const styles = StyleSheet.create({



}
)


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 1
}



export default ListNews
