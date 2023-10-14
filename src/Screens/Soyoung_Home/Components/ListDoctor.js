import React, { memo, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { _widthScale } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const ListDoctor = memo(() => {

    const [listDoctor, setListDoctor] = useState([])

    useEffect(() => {
        setListDoctor([
            {
                _id: '1',
                url: `https://img2.soyoung.com/tieba/android/shortpost/20220917/6/0815271a9df9b46916123420ac8afcfb.jpg`
            },
            {
                _id: '2',
                url: `https://img2.soyoung.com/message/ios/20200530/9/3d02989d3d3baa00b484de8b61093828.jpg`
            },
            {
                _id: '3',
                url: `https://img2.soyoung.com/tieba/ios/shortpost/20221105/4/67b048799b6d9303d2cfe3037bec1be2.jpg`
            },
            {
                _id: '4',
                url: `https://img2.soyoung.com/tieba/ios/shortpost/20210402/6/b45afb7b245aa9309851183a5294654e.jpg`
            },
            {
                _id: '5',
                url: `https://img2.soyoung.com/tieba/ios/shortpost/20221105/4/67b048799b6d9303d2cfe3037bec1be2.jpg`
            },
            {
                _id: '6',
                url: `https://img2.soyoung.com/tieba/ios/shortpost/20210402/6/b45afb7b245aa9309851183a5294654e.jpg`
            },
        ])
    }, [])

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
            onPress={()=>{
                navigation.navigate(ScreenKey.DETAIL_DOCTOR)
            }}
            style={{
                marginLeft: 8,
                // alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    style={{
                        width: 100,
                        height: 120,
                        borderRadius: 8
                    }}
                    source={{ uri: `${item.url}` }}
                />
                <Text style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginTop: 4
                }}>
                    BS. Pham Thi A
                </Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    {/* <Image style={styles.start} source={require('../../../Image/locationRed.png')}/> */}
                    <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                    <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                    <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                    <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                    <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                    <Text style={{
                        fontSize:10,
                        marginLeft:4
                    }}>
                        (320)
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>


            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={_renderItem}
                data={listDoctor}
                keyExtractor={({ item, index }) => index}
            />

        </View>
    )
})

export default ListDoctor

const styles = StyleSheet.create({
    start: {
        width: 8 * 1.25,
        height: 8 * 1.25,
        marginLeft:1,
        resizeMode:'contain'
    },
    btnFls: {
        paddingHorizontal: 8 * 1,
        paddingVertical: 4,
        borderRadius: 8 * 2,
        backgroundColor: '#EB4D49'
    },
    fls__title: {
        width: 100,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: _widthScale(350),
        height: _widthScale(160),
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,1)',
        flexDirection: 'row'
    }
})