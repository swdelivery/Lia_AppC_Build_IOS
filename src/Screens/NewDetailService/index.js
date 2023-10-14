import React, { memo, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import ImageColors from 'react-native-image-colors'
import LinearGradient from 'react-native-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { _moderateScale, _width, _widthScale } from '../../Constant/Scale'
import Feedback from './Components/Feedback'
import FlashSale from './Components/FlashSale'
import Header from './Components/Header'
import HorizonListImage from './Components/HorizonListImage'
import InfoBranch from './Components/InfoBranch'
import ListBottonService from './Components/ListBottonService'
import MainInfoService from './Components/MainInfoService'
import Material from './Components/Material'
import NameService from './Components/NameService'
import OverViewFeedBack from './Components/OverViewFeedBack'
import RecomendService from './Components/RecomendService'
import Tutorial from './Components/Tutorial'

const HEIGHT_IMAGE_SERVICE = _width * 926 / 1242

const DetailService = memo(() => {

    const [bgColorImage, setBgColorImage] = useState(null)


    useEffect(() => {
        _getBGColorImage()
    }, [])

    const _getBGColorImage = async() => {
        const result = await ImageColors.getColors(`https://i.ibb.co/F7VK3zW/bg-Service.jpg`, {
            fallback: '#228B22',
            cache: false,
            key: '',
        })
        setBgColorImage(result?.background)
    }

    return (
        <View style={styles.container}>
            <View style={{
                height: _moderateScale(getStatusBarHeight())
            }} />
            <Header  />
            <ScrollView>
                <HorizonListImage  />

                <View style={styles.body}>
                    <LinearGradient
                        style={[StyleSheet.absoluteFill, { zIndex: -1, borderRadius: _moderateScale(8 * 2), borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#EC54C3', 'white', '#F7F8FA']}
                    />
                    <FlashSale />
                    <NameService />
                    <OverViewFeedBack />
                </View>
                {/* <Certificate /> */}
                <InfoBranch />
                <Material />
                <Tutorial/>
                <MainInfoService/>
                <RecomendService/>
                <Feedback/>

                <View style={{height:_moderateScale(8*2)}}/>
                <ListBottonService/>

                {/* <Text>awd</Text> */}

                <View style={{height:100}}/>
            </ScrollView>
        </View>
    )
})

export default DetailService

const styles = StyleSheet.create({
    start: {
        width: 8 * 1.75,
        height: 8 * 1.75,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    infoService: {
        paddingTop: _moderateScale(8),
        width: _widthScale(360),
        height: _moderateScale(8 * 20),
        alignSelf: 'center',
        marginTop: _moderateScale(4),
        backgroundColor: 'white',
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 1.5)
    },
    priceFlashSale__filnalPrice: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    priceFlashSale: {
        width: _widthScale(360),
        height: _moderateScale(8 * 8),
        alignSelf: 'center',
        marginTop: _moderateScale(8 * 1),
        backgroundColor: 'white',
        borderRadius: _moderateScale(8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    flashsale__text: {
        fontSize: _moderateScale(16)
    },
    flashsale: {
        flexDirection: 'row',
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'space-between'
    },
    body: {
        width: _width,
        marginTop: 8,
        borderTopStartRadius: _moderateScale(8 * 2),
        borderTopEndRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 2),
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA'
    }
})