import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { BASE_COLOR } from '../../../Constant/Color'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { styleElement } from '../../../Constant/StyleElement'

const HorizontalBanner = memo(() => {

    const FlatListRef = useRef(null)
    const [listImage, setListImage] = useState([])
    const [currIndexBanner, setCurrIndexBanner] = useState(0)

    useEffect(() => {
        setListImage([
            {
                _id: '1',
                url: `https://img2.soyoung.com/upload/20210924/2/9a0441f5159d66125f5252bd886c3946.jpg`
            },
            {
                _id: '2',
                url: `https://img2.soyoung.com/upload/20210924/6/642739b17effba4d31b163757e4d0114.jpg`
            },
            {
                _id: '3',
                url: `https://img2.soyoung.com/upload/20210924/4/b61733f1b5fafde858db04c7bcb04869.jpg`
            },
            {
                _id: '4',
                url: `https://img2.soyoung.com/upload/20210924/9/e4b63471060c8d9cfd934752fb3dafe8.jpg`
            }
        ])
    }, [])

    const _renderImage = ({ item, index }) => {
        return (
            <View style={styles.box}>
                <Image
                    style={styles.box__image}
                    source={{
                        uri: `${item?.url}`
                    }} />
            </View>
        )
    }

    return (
        <View style={styles.banner}>
            <View style={{
                height: _widthScale(130)
            }}>
                <FlatList
                    ref={FlatListRef}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    scrollEventThrottle={16}
                    onScrollBeginDrag={() => {
                        // setIsDragingBanner(true)
                    }}
                    onScrollEndDrag={() => {
                        // setIsDragingBanner(false)
                    }}
                    onMomentumScrollEnd={(event) => {
                        console.log({ contentOffsetX: event.nativeEvent.contentOffset.x, layoutMeasurementWidth: event.nativeEvent.layoutMeasurement.width });
                        const index = (
                            event.nativeEvent.contentOffset.x /
                            event.nativeEvent.layoutMeasurement.width
                        );
                        console.log({ index });
                        setCurrIndexBanner(index.toFixed())
                    }}
                    pagingEnabled
                    renderItem={_renderImage}
                    data={listImage}
                    keyExtractor={item => item._id}
                />

                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 8 * 1,
                    alignSelf: 'center'
                }}>
                    {
                        listImage?.map((item, index) => {
                            return (
                                <View style={[{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 8 * 2,
                                    backgroundColor: '#a6a2a2',
                                    marginHorizontal: 2
                                }, index == currIndexBanner && { width: 6 * 2, backgroundColor: 'white' }]} />
                            )
                        })
                    }
                </View>

            </View>
        </View>
    )
})

export default HorizontalBanner

const styles = StyleSheet.create({
    box__image: {
        width: _widthScale(350),
        height: _widthScale(130),
        borderRadius: _moderateScale(8)
    },
    box: {
        // width: _widthScale(350),
        width: _width,
        height: _widthScale(130),
        ...styleElement.centerChild
    },
    banner: {
        height: _widthScale(8 * 22),
        backgroundColor: BASE_COLOR,
        justifyContent: 'flex-end',
        paddingBottom: _moderateScale(8 * 4)
    }
})