import match from 'autosuggest-highlight/match';
import { escapeRegExp, isEmpty, remove } from 'lodash';
import React, { createRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View, FlatList, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import slugify from 'slugify';
import { navigation } from '../../../rootNavigation';
import * as Color from '../../Constant/Color';

import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from '../../Redux/Store';
// API
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getServiceProperties, getServicev2 } from '../../Redux/Action/Service';
import { formatMonney } from '../../Constant/Utils';
import ScreenKey from '../../Navigation/ScreenKey';


const CompareService = memo((props) => {

    const [listProperty, setListProperty] = useState([])
    const [listService, setListService] = useState([])

    const scrollRef = useRef(null);
    const scrollRef2 = useRef(null)

    const [accordionContent, setAccordionContent] = useState([])

    const arrLength = useRef(0);
    const elRefs = React.useRef([]);

    const flatlistRef = useRef();

    const isDoneFirstAnimated = useRef(false)

    useEffect(() => {

        _getServiceProperties(props?.route?.params?.currListChoice);
        arrLength.current = props?.route?.params?.currListChoice?.length
    }, [])

    useEffect(() => {
        if (listProperty?.length > 5) {
            console.log({ ...flatlistRef });
            setTimeout(() => {
                flatlistRef?.current?.scrollToIndex({ animated: true, index: 3 })
            }, 200);
            setTimeout(() => {
                flatlistRef?.current?.scrollToIndex({ animated: true, index: 0 })
                isDoneFirstAnimated.current = true
            }, 1000);

        }
    }, [listProperty])

    const _getServiceProperties = async (listService) => {

        let listKey = []
        let listServiceTemp = []

        if (listService?.length > 0) {
            // (async () => {
            for (const item of listService) {
                let result = await getServiceProperties(item._id, {})
                if (result?.isAxiosError) return

                listServiceTemp.push({
                    info: item,
                    data: result?.data?.data
                })

                result?.data?.data?.map((itemChild, index) => {
                    if (listKey?.find(itemFind => itemFind?.code == itemChild?.property?.code)) return
                    listKey?.push(itemChild?.property)
                })
            }
            // })()
        }

        console.log({listKey})

        setListProperty(listKey)
        setListService(listServiceTemp)



    }

    const _renderValue = (value) => {
        switch (value.trim().toLowerCase()) {
            case 'có':
            case 'co':
                return (
                    <Image style={sizeIcon.lg} source={require('../../NewIcon/tick.png')} />
                )
            default:
                return (
                    <Text style={{ ...stylesFont.fontNolan500, color: Color.BLACK, fontSize: _moderateScale(15) }}>
                        {
                            value
                        }
                    </Text>
                )
        }
    }

    if (elRefs.current.length !== arrLength.current) {
        // add or remove refs
        elRefs.current = Array(arrLength.current)
            .fill()
            .map((_, i) => elRefs.current[i] || createRef());
    }

    return (
        <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
            <StatusBarCustom bgColor={Color.WHITE} barStyle={'dark-content'} />

            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingTop: _moderateScale(8 * 1.5),
                paddingBottom: _moderateScale(4),
                // borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: Color.BG_GREY_OPACITY_3,
                backgroundColor: Color.WHITE,
            }}>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/back_bold.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: Color.BLACK }]} numberOfLines={2}>
                        So sánh dịch vụ
                    </Text>
                </View>
            </View>

            <View style={{ flex: 1, marginTop: _moderateScale(8 * 2) }}>

                <View style={{ width: '100%', flexDirection: 'row', maxHeight: _moderateScale(8 * 10) * 8 }}>
                    <View>
                        <View style={{
                            width: _moderateScale(8 * 13),
                            height: _moderateScale(8 * 10),
                            borderWidth: 0.5,
                            borderColor: Color.GREY,
                            paddingVertical: _moderateScale(8),
                            justifyContent: 'center',
                        }}>
                            <Text style={[{
                                textAlign: 'center'
                            }]}>
                                Tiêu chí đánh giá
                            </Text>
                        </View>
                        <FlatList
                            ref={flatlistRef}
                            pagingEnabled
                            decelerationRate={1}
                            snapToInterval={_moderateScale(8 * 10)}
                            onMomentumScrollEnd={(e) => {
                                console.log({ ...e });
                                if (!isDoneFirstAnimated?.current) return
                                for (const item of elRefs?.current) {
                                    item?.current?.scrollTo({
                                        y: e.nativeEvent.contentOffset.y,
                                        animated: true,
                                    })
                                }
                            }}
                            scrollEventThrottle={16}
                            data={listProperty?.length > 0 ? listProperty : []}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        width: _moderateScale(8 * 13),
                                        height: _moderateScale(8 * 10),
                                        borderWidth: 0.5,
                                        borderColor: Color.BG_GREY_OPACITY_5,
                                        paddingVertical: _moderateScale(8),
                                        justifyContent: 'center',
                                        paddingHorizontal: _moderateScale(4),
                                        backgroundColor: 'rgba(98, 189, 80,0.4)'
                                    }}>
                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            color: Color.BLACK,
                                            fontSize: _moderateScale(14),
                                            textAlign: 'center'
                                        }}>
                                            {index + 1}. {item?.name}
                                        </Text>
                                    </View>
                                )
                            }}
                        />
                       
                    </View>
                    <ScrollView horizontal>
                        {
                            listService?.map((item, index) => {
                                console.log({x: item});
                                return (
                                    <View style={{
                                        width: _moderateScale(8 * 17),
                                    }}>
                                        <View style={{
                                            width: _moderateScale(8 * 17),
                                            height: _moderateScale(8 * 10),
                                            borderWidth: 0.5,
                                            borderColor: Color.GREY,
                                            paddingVertical: _moderateScale(8),
                                            justifyContent: 'center',
                                            paddingHorizontal: _moderateScale(4)
                                        }}>
                                            <Text numberOfLines={2} style={{
                                                ...stylesFont.fontNolanBold,
                                                color: Color.BLUE_FB,
                                                fontSize: _moderateScale(14),
                                                textAlign: 'center'
                                            }}>
                                                {item?.info?.name}
                                            </Text>
                                            <Text style={{
                                                ...stylesFont.fontNolanBold,
                                                color: Color.PRICE_ORANGE,
                                                fontSize: _moderateScale(14),
                                                textAlign: 'center'
                                            }}>
                                                {formatMonney(item?.info?.price)}
                                            </Text>
                                        </View>
                                        <ScrollView
                                            ref={elRefs.current[index]}
                                            scrollEnabled={false}
                                        >
                                            {
                                                listProperty?.map((itemProperty, index) => {
                                                    return (
                                                        <View style={[{
                                                            width: _moderateScale(8 * 17),
                                                            height: _moderateScale(8 * 10),
                                                            borderWidth: 0.5,
                                                            borderColor: Color.BG_GREY_OPACITY_5,
                                                            paddingVertical: _moderateScale(8),
                                                            paddingHorizontal: _moderateScale(4),
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        },
                                                        index % 2 == 0 && {backgroundColor:'#EEF0F0'}
                                                        ]}>
                                                            {
                                                                item?.data?.find(itemFind => itemFind?.propertyCode == itemProperty?.code) ?
                                                                    <>
                                                                        {
                                                                            _renderValue(item?.data?.find(itemFind => itemFind?.propertyCode == itemProperty?.code)?.value)
                                                                        }
                                                                    </>
                                                                    :
                                                                    <Image style={sizeIcon.xs} source={require('../../NewIcon/cancelRed.png')} />
                                                            }
                                                        </View>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>

            </View >

        </View >
    );
});


const styles = StyleSheet.create({

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



export default CompareService;